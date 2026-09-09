# Fidelity ledger — dragon-save-shipped (diagram recovery)

Source: `notes/dragon-save-shipped.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Flowchart

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 6 (START, MAIN, ESS, BAK, NEW, ONLOAD) | 6 steps + 3 decisions |
| Edges | 8 labeled | 8 (성공×3 · 실패×3 · START→① · ④→ONLOAD) |

## Kept

- ①→②→③→④ fallback spine
- 성공 분기 → ONLOAD merge
- 한국어 라벨 · Continue 정본 아님

## Transformed

- Mermaid edge labels → diamond decisions + 성공/실패 labels
- ① = focal step · START/ONLOAD = oval merge
- Separate orthogonal elbows (no shared trunk)

## Dropped

None.

## Deliverables

- `docs/export/diagrams/dragon-save-shipped-recovery-dark.html`
- `assets/images/notes/dragon-save-shipped/diagram-recovery-dark.png` (2560×1440 @2x)
- `notes/dragon-save-shipped.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
