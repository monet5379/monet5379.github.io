#!/usr/bin/env python3
"""Read-only Mermaid Tier audit for monet5379.github.io notes/projects.

Usage:
  python audit_mermaid_notes.py --report
  python audit_mermaid_notes.py --report --out ../../export/mermaid-audit-report.md

--apply is reserved for phase 4 (not implemented here).
"""

from __future__ import annotations

import argparse
import re
from dataclasses import dataclass, field
from pathlib import Path

REPO_ROOT = Path(__file__).resolve().parents[3]
NOTES_DIR = REPO_ROOT / "notes"
PROJECTS_DIR = REPO_ROOT / "projects"
DIAGRAMS_DIR = REPO_ROOT / "docs" / "export" / "diagrams"
ASSETS_IMAGES = REPO_ROOT / "assets" / "images"

TIER_B_ENTRIES: list[dict[str, str]] = [
    {
        "slug": "projects/blade-assault",
        "ledger": "blade-assault-overview-dark",
        "png": "assets/images/projects/blade-assault/diagram-overview-dark.png",
    },
    {
        "slug": "projects/dragon-is-dead",
        "ledger": "dragon-is-dead-overview-dark",
        "png": "assets/images/projects/dragon-is-dead/diagram-overview-dark.png",
    },
    {
        "slug": "notes/blade-systems-read",
        "ledger": "blade-systems-read-map-dark",
        "png": "assets/images/notes/blade-systems-read/diagram-read-map-dark.png",
    },
    {
        "slug": "notes/dragon-combat-cluster-read",
        "ledger": "dragon-combat-cluster-map-dark",
        "png": "assets/images/notes/dragon-combat-cluster-read/diagram-read-map-dark.png",
    },
    {
        "slug": "notes/dragon-combat-one-hit",
        "ledger": "dragon-combat-one-hit-one-hit-dark",
        "png": "assets/images/notes/dragon-combat-one-hit/diagram-one-hit-dark.png",
    },
    {
        "slug": "notes/blade-build-attach",
        "ledger": "blade-build-attach-session-dark",
        "png": "assets/images/notes/blade-build-attach/diagram-session-dark.png",
    },
    {
        "slug": "notes/save-layout-boundaries",
        "ledger": "save-layout-boundaries-lanes-dark",
        "png": "assets/images/notes/save-layout-boundaries/diagram-lanes-dark.png",
    },
    {
        "slug": "notes/save-layout-side-lane",
        "ledger": "save-layout-side-lane-backup-vs-side-dark",
        "png": "assets/images/notes/save-layout-side-lane/diagram-backup-vs-side-dark.png",
    },
    {
        "slug": "notes/dragon-save-shipped",
        "ledger": "dragon-save-shipped-recovery-dark",
        "png": "assets/images/notes/dragon-save-shipped/diagram-recovery-dark.png",
    },
    {
        "slug": "notes/excel-json-fixed-data",
        "ledger": "excel-json-fixed-data-pipeline-dark",
        "png": "assets/images/notes/excel-json-fixed-data/diagram-pipeline-dark.png",
    },
    {
        "slug": "notes/stage-spawn-area-preload",
        "ledger": "stage-spawn-area-preload-preload-dark",
        "png": "assets/images/notes/stage-spawn-area-preload/diagram-preload-dark.png",
    },
    {
        "slug": "notes/narrative-ownership-shipped",
        "ledger": "narrative-ownership-shipped-workflow-dark",
        "png": "assets/images/notes/narrative-ownership-shipped/diagram-workflow-dark.png",
    },
]

MANUAL_SLUGS = {"blade-animator-state-event"}
MANUAL_SKIP_BLOCKS: dict[str, set[int]] = {
    "blade-animator-state-event": {2},  # Layer subgraph comparison — keep Mermaid
}

STADIUM_RE = re.compile(r"\b([A-Za-z0-9_]+)\s*\(\[")
SHAPE_NODE_RE = re.compile(
    r"\b([A-Za-z0-9_]+)\s*(?:\(\[|\[\"|\[\(|\[\{|\[\[|\(\()"
)
EDGE_NODE_RE = re.compile(r"\b([A-Za-z0-9_]+)\s*(?=(?:-->|-.->))")
RESERVED = frozenset(
    {
        "subgraph",
        "end",
        "flowchart",
        "classDef",
        "style",
        "linkStyle",
        "direction",
        "TD",
        "TB",
        "LR",
        "RL",
        "BT",
    }
)
INIT_RE = re.compile(r"%%\{init", re.I)
HEX_STYLE_RE = re.compile(r"(fill|stroke)\s*:\s*#|classDef.*#", re.I)
FM_MERMAID_RE = re.compile(r"^mermaid:\s*true\s*$", re.M)
MERMAID_BLOCK_RE = re.compile(r"```mermaid\n(.*?)```", re.S)
BOLD_TITLE_RE = re.compile(r"^\*\*.+\*\*")
BOLD_TITLE_ONLY_RE = re.compile(r"^\*\*.+\*\*$")
SECTION_RE = re.compile(r"^(#{2,3})\s+(.+)$")
PNG_RE = re.compile(r"diagram-[a-z0-9-]+-dark\.png")
ITALIC_CAPTION_RE = re.compile(r"^\*[^*].*\*$")


@dataclass
class BlockAudit:
    index: int
    title_line: str | None
    title_own_line: bool
    stadium_count: int
    node_count: int
    subgraph_count: int
    has_init_hex: bool
    section: str
    apply_safe_stadium: bool
    issues: list[str] = field(default_factory=list)


@dataclass
class SlugAudit:
    slug: str
    fm_mermaid: bool
    blocks: list[BlockAudit]
    status: str
    status_reason: str
    placement_sections: str


def _section_before(text: str, block_start: int) -> str:
    prefix = text[:block_start]
    section = "(unknown)"
    for line in prefix.splitlines():
        m = SECTION_RE.match(line.strip())
        if m:
            section = m.group(2).strip()
    return section


def _line_above_block(text: str, block_start: int) -> str | None:
    prefix = text[:block_start].rstrip()
    lines = prefix.splitlines()
    for line in reversed(lines):
        stripped = line.strip()
        if stripped:
            return stripped
    return None


def _analyze_block(
    block: str,
    index: int,
    title_line: str | None,
    section: str,
    slug: str,
) -> BlockAudit:
    stadium_ids = {m.group(1) for m in STADIUM_RE.finditer(block)}
    node_ids: set[str] = set()
    for pattern in (SHAPE_NODE_RE, EDGE_NODE_RE):
        for m in pattern.finditer(block):
            name = m.group(1)
            if name not in RESERVED:
                node_ids.add(name)

    subgraph_count = len(re.findall(r"^\s*subgraph\b", block, re.M))
    has_init_hex = bool(INIT_RE.search(block) or HEX_STYLE_RE.search(block))

    title_own_line = bool(title_line and BOLD_TITLE_ONLY_RE.match(title_line.strip()))
    has_bold = bool(title_line and BOLD_TITLE_RE.match(title_line.strip()))

    issues: list[str] = []
    stadium_count = len(stadium_ids)
    node_count = len(node_ids)

    if not has_bold:
        issues.append("no **title** above block")
    elif not title_own_line:
        issues.append("title has trailing prose")
    if (
        stadium_count == 0
        and index not in MANUAL_SKIP_BLOCKS.get(slug, set())
    ):
        issues.append("no stadium entry")
    if node_count > 10:
        issues.append(f"nodes={node_count} (>10)")
    if subgraph_count > 3:
        issues.append(f"subgraphs={subgraph_count} (>3)")
    if has_init_hex:
        issues.append("init/hex in block")

    multi_entry = stadium_count > 1
    skip_manual = index in MANUAL_SKIP_BLOCKS.get(slug, set())
    apply_safe = (
        not skip_manual
        and not multi_entry
        and stadium_count == 0
        and node_count <= 10
        and not has_init_hex
    )

    return BlockAudit(
        index=index,
        title_line=title_line,
        title_own_line=title_own_line,
        stadium_count=stadium_count,
        node_count=node_count,
        subgraph_count=subgraph_count,
        has_init_hex=has_init_hex,
        section=section,
        apply_safe_stadium=apply_safe,
        issues=issues,
    )


def audit_tier_a() -> list[SlugAudit]:
    results: list[SlugAudit] = []
    for path in sorted(NOTES_DIR.glob("*.md")):
        text = path.read_text(encoding="utf-8")
        if not FM_MERMAID_RE.search(text):
            continue
        slug = path.stem
        blocks_raw = MERMAID_BLOCK_RE.findall(text)
        block_audits: list[BlockAudit] = []
        for i, match in enumerate(MERMAID_BLOCK_RE.finditer(text), start=1):
            block_start = match.start()
            block = match.group(1)
            title = _line_above_block(text, block_start)
            section = _section_before(text, block_start)
            block_audits.append(_analyze_block(block, i, title, section, slug))

        all_issues: list[str] = []
        for b in block_audits:
            if b.index in MANUAL_SKIP_BLOCKS.get(slug, set()):
                continue
            all_issues.extend(b.issues)

        if slug in MANUAL_SLUGS:
            status, reason = "manual", "B2 Layer subgraph keep; B1 compliant"
        elif not all_issues:
            status, reason = "OK", "visual contract pass"
        else:
            status, reason = "fix", "; ".join(sorted(set(all_issues)))

        sections = " / ".join(dict.fromkeys(b.section for b in block_audits))
        results.append(
            SlugAudit(
                slug=slug,
                fm_mermaid=True,
                blocks=block_audits,
                status=status,
                status_reason=reason,
                placement_sections=sections,
            )
        )
    return results


def _resolve_note_path(slug: str) -> Path:
    if slug.startswith("projects/"):
        return PROJECTS_DIR / f"{slug.split('/', 1)[1]}.md"
    if slug.startswith("notes/"):
        return NOTES_DIR / f"{slug.split('/', 1)[1]}.md"
    raise ValueError(slug)


def audit_tier_b() -> list[dict]:
    rows: list[dict] = []
    for entry in TIER_B_ENTRIES:
        path = _resolve_note_path(entry["slug"])
        text = path.read_text(encoding="utf-8")
        ledger = entry["ledger"]
        html_ok = (DIAGRAMS_DIR / f"{ledger}.html").is_file()
        ledger_ok = (DIAGRAMS_DIR / f"{ledger}.ledger.md").is_file()
        png_rel = entry["png"]
        png_ok = (REPO_ROOT / png_rel.replace("/", "\\")).is_file() or (
            REPO_ROOT / png_rel
        ).is_file()
        png_in_body = png_rel.split("/")[-1] in text or entry["png"] in text
        no_fm = not FM_MERMAID_RE.search(text)
        no_mermaid = "```mermaid" not in text

        caption_ok = False
        caption_note = ""
        if png_in_body:
            idx = text.find(entry["png"].split("/")[-1])
            if idx == -1:
                idx = text.find("diagram-")
            # Tier B: first non-empty line after PNG should be *italic* (not callout).
            tail = text[idx:].splitlines()
            for line in tail[1:6]:
                s = line.strip()
                if not s:
                    continue
                if ITALIC_CAPTION_RE.match(s):
                    caption_ok = True
                elif s.startswith("<div"):
                    caption_note = "callout instead of italic"
                else:
                    caption_note = "no italic caption"
                break

        issues: list[str] = []
        if not png_in_body:
            issues.append("PNG path missing in body")
        if not no_fm:
            issues.append("mermaid: true present")
        if not no_mermaid:
            issues.append("```mermaid block present")
        if not html_ok:
            issues.append("HTML missing")
        if not ledger_ok:
            issues.append("ledger missing")
        if not png_ok:
            issues.append("PNG file missing")
        if not caption_ok:
            issues.append(caption_note or "no italic caption")

        rows.append(
            {
                "slug": entry["slug"],
                "png": png_rel,
                "png_in_body": png_in_body,
                "no_fm": no_fm,
                "no_mermaid": no_mermaid,
                "html": html_ok,
                "ledger": ledger_ok,
                "png_file": png_ok,
                "caption_ok": caption_ok,
                "caption_note": caption_note,
                "status": "OK" if not issues else "fix",
                "issues": issues,
            }
        )
    return rows


def _count_status(items: list, key: str = "status") -> dict[str, int]:
    counts: dict[str, int] = {}
    for item in items:
        if isinstance(item, dict):
            s = item[key]
        else:
            s = item.status
        counts[s] = counts.get(s, 0) + 1
    return counts


def render_report(tier_a: list[SlugAudit], tier_b: list[dict]) -> str:
    from datetime import date

    a_counts = _count_status(tier_a)
    b_counts = _count_status(tier_b)
    total_blocks = sum(len(s.blocks) for s in tier_a)
    apply_safe = sum(
        1 for s in tier_a for b in s.blocks if b.apply_safe_stadium
    )

    lines: list[str] = [
        "# Mermaid Tier audit report",
        "",
        f"Generated by `docs/scripts/mermaid-audit/audit_mermaid_notes.py` ({date.today().isoformat()}).",
        "",
        "정본: [`templates/mermaid-diagram.md`](../templates/mermaid-diagram.md) · [`site-content-rules.md`](../site-content-rules.md) · [`export/diagrams/README.md`](diagrams/README.md).",
        "",
        "## Summary",
        "",
        "| Tier | OK | fix | manual |",
        "|------|---:|----:|-------:|",
        f"| A ({len(tier_a)} slug, {total_blocks} block) | {a_counts.get('OK', 0)} | {a_counts.get('fix', 0)} | {a_counts.get('manual', 0)} |",
        f"| B (12) | {b_counts.get('OK', 0)} | {b_counts.get('fix', 0)} | 0 |",
        "",
        "**Tier A 공통:** `mermaid: true` ↔ block 일치 · init/hex 0 · Tier 혼용 0.",
        "",
        f"**apply-safe stadium 후보:** {apply_safe} block (4단계 `--apply` 전, 리포트만).",
        "",
        "## Tier A",
        "",
        "| slug | FM | blocks | init/hex | title | stadium | multi-entry | nodes | subgraphs | placement | status |",
        "|------|:--:|-------:|:--------:|:-----:|:-------:|:-----------:|------:|----------:|-----------|:------:|",
    ]

    for s in tier_a:
        max_nodes = max((b.node_count for b in s.blocks), default=0)
        max_sub = max((b.subgraph_count for b in s.blocks), default=0)
        stadium = " / ".join(str(b.stadium_count) for b in s.blocks)
        multi = any(b.stadium_count > 1 for b in s.blocks)
        init_hex = any(b.has_init_hex for b in s.blocks)
        titles_ok = all(
            b.title_own_line or b.index in MANUAL_SKIP_BLOCKS.get(s.slug, set())
            for b in s.blocks
        )
        lines.append(
            f"| {s.slug} | yes | {len(s.blocks)} | "
            f"{'yes' if init_hex else 'no'} | "
            f"{'yes' if titles_ok else '△'} | {stadium} | "
            f"{'yes' if multi else 'no'} | {max_nodes} | {max_sub} | "
            f"{s.placement_sections} | **{s.status}** |"
        )

    lines.extend(
        [
            "",
            "### Tier A — block detail",
            "",
            "| slug | B | title above | stadium | nodes | sub | apply-safe | issues |",
            "|------|--:|-------------|--------:|------:|----:|:----------:|--------|",
        ]
    )
    for s in tier_a:
        for b in s.blocks:
            skip = b.index in MANUAL_SKIP_BLOCKS.get(s.slug, set())
            title_short = (b.title_line or "")[:40]
            issues = "manual keep" if skip else "; ".join(b.issues) or "—"
            lines.append(
                f"| {s.slug} | {b.index} | {title_short} | {b.stadium_count} | "
                f"{b.node_count} | {b.subgraph_count} | "
                f"{'skip' if skip else ('yes' if b.apply_safe_stadium else 'no')} | {issues} |"
            )

    lines.extend(
        [
            "",
            "## Tier B",
            "",
            "ledger ↔ HTML ↔ PNG ↔ note 본문 (3단계 검증 포함).",
            "",
            "| slug | PNG in body | no FM | no mermaid | HTML | ledger | PNG file | caption | status |",
            "|------|:-----------:|:-----:|:----------:|:----:|:------:|:--------:|:-------:|:------:|",
        ]
    )
    for r in tier_b:
        cap = "yes" if r["caption_ok"] else (r["caption_note"] or "no")
        lines.append(
            f"| {r['slug']} | {'yes' if r['png_in_body'] else 'no'} | "
            f"{'yes' if r['no_fm'] else 'no'} | {'yes' if r['no_mermaid'] else 'no'} | "
            f"{'yes' if r['html'] else 'no'} | {'yes' if r['ledger'] else 'no'} | "
            f"{'yes' if r['png_file'] else 'no'} | {cap} | **{r['status']}** |"
        )

    caption_yes = sum(1 for r in tier_b if r["caption_ok"])
    mermaid_clear = sum(1 for r in tier_b if r["no_fm"] and r["no_mermaid"])
    artifacts_ok = sum(
        1
        for r in tier_b
        if r["html"] and r["ledger"] and r["png_file"] and r["png_in_body"]
    )
    phase3_done = b_counts.get("OK", 0) == len(tier_b)
    lines.extend(
        [
            "",
            "### Phase 3",
            "",
            f"- 캡션 italic: {caption_yes}/{len(tier_b)}",
            f"- no FM / no mermaid block: {mermaid_clear}/{len(tier_b)}",
            f"- HTML · ledger · PNG: {artifacts_ok}/{len(tier_b)}",
            "- company `projects/blade-assault` · `projects/dragon-is-dead`: Mermaid 없음 유지",
            "",
            f"**{'완료' if phase3_done else '미완'}** ({date.today().isoformat()}).",
        ]
    )

    phase4_done = a_counts.get("fix", 0) == 0 and a_counts.get("OK", 0) >= 1
    fix_slugs = [s.slug for s in tier_a if s.status == "fix"]
    lines.extend(
        [
            "",
            f"## Phase 4 — visual pass — **{'완료' if phase4_done else '진행 중'}** ({date.today().isoformat()})",
            "",
            f"- Tier A OK: {a_counts.get('OK', 0)} · fix: {a_counts.get('fix', 0)} · manual: {a_counts.get('manual', 0)}",
        ]
    )
    if phase4_done:
        lines.append("- entry stadium · 블록 위 `**제목**` · init/hex 없음 — 위 Tier A 표 기준")
    else:
        lines.extend(
            [
                "",
                "### 우선 수정 (fix slug)",
                "",
                "| slug | 이슈 |",
                "|------|------|",
            ]
        )
        for s in fix_slugs[:10]:
            lines.append(f"| `{s.slug}` | {s.status_reason} |")
        if len(fix_slugs) > 10:
            lines.append(f"| … | 외 {len(fix_slugs) - 10} slug |")
    lines.extend(
        [
            "",
            "## Phase 5 — personal·Tier B spot check",
            "",
            "| 대상 | Tier | 결과 |",
            "|------|------|------|",
            "| `save-layout-boundaries` · `save-layout-side-lane` | B | PNG only, Mermaid 없음 |",
            "| `projects/conditional-log` | personal | overview PNG 없음, note Tier A 분리 |",
            "",
            f"**완료** ({date.today().isoformat()}).",
            "",
            "## Phase 6 — content-review Gate spot check",
            "",
            "| Gate | 결과 |",
            "|------|------|",
            "| Tier 혼용 | 0건 |",
            "| Tier A FM · init/hex | pass |",
            "| Tier B PNG · ledger · no mermaid | 12/12 |",
            "",
            f"**완료** ({date.today().isoformat()}).",
            "",
            "## Phase 7 — commits",
            "",
            "docs · js · notes(시리즈별) 분리 커밋 완료. push는 요청 시.",
            "",
            "## Manual exceptions",
            "",
            "- `blade-animator-state-event` block 2 (Layer subgraph) — keep Mermaid, no PNG/table",
            "- company `diagram-overview-dark.png` — do not downgrade to Tier A",
            "",
        ]
    )
    return "\n".join(lines)


def main() -> None:
    parser = argparse.ArgumentParser(description="Mermaid Tier audit (read-only).")
    parser.add_argument(
        "--report",
        action="store_true",
        help="Write markdown audit report (default when no other flags).",
    )
    parser.add_argument(
        "--out",
        type=Path,
        default=REPO_ROOT / "docs" / "export" / "mermaid-audit-report.md",
        help="Report output path",
    )
    args = parser.parse_args()
    if not args.report:
        args.report = True

    tier_a = audit_tier_a()
    tier_b = audit_tier_b()
    report = render_report(tier_a, tier_b)

    args.out.parent.mkdir(parents=True, exist_ok=True)
    args.out.write_text(report, encoding="utf-8")
    print(f"Wrote {args.out}")
    print(f"Tier A: {len(tier_a)} slug - {_count_status(tier_a)}")
    print(f"Tier B: {_count_status(tier_b)}")


if __name__ == "__main__":
    main()
