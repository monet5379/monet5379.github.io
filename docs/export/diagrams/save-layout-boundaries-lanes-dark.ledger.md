# Fidelity ledger — save-layout-boundaries (diagram lanes)

Source: `notes/save-layout-boundaries.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Nested + Architecture

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 4 (E, M, P, S) | 4 |
| Edges | 3 (E→M, M→P, P⇢S) | 3 |
| Zones | 3 subgraphs | 3 (메타 / 메인 / 사이드) + outer path |

## Kept

- persistentDataPath → 메타 → Profile 메인 (solid hub)
- Profile ⇢ Side (dashed optional)
- 한국어 라벨 · 영구 / 선택 구분

## Transformed

- Mermaid TD subgraph → nested containment zones
- E node folded into outer zone eyebrow
- Main zone = focal (accent)

## Dropped

None.

## Deliverables

- `docs/export/diagrams/save-layout-boundaries-lanes-dark.html`
- `assets/images/notes/save-layout-boundaries/diagram-lanes-dark.png` (2560×1440 @2x)
- `notes/save-layout-boundaries.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
