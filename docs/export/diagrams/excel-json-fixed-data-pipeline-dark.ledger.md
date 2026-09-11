# Fidelity ledger — excel-json-fixed-data (diagram pipeline)

Source: `notes/excel-json-fixed-data.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Data flow

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 6 (X, C, J, L, P, F) | 6 |
| Edges | 5 | 5 |
| Zones | 2 (EDITOR, RUNTIME) | 2 |

## Kept

- EDITOR: xlsx → Excel4Unity → Resources JSON
- RUNTIME: Load → Parse → Find*Clone
- J → L hand-off

## Transformed

- Mermaid subgraph → editorial zone cards
- JSON + Find*Clone = focal
- Scriptable remains italic caption (out of diagram)

## Dropped

None.

## Deliverables

- `docs/export/diagrams/excel-json-fixed-data-pipeline-dark.html`
- `assets/images/notes/excel-json-fixed-data/diagram-pipeline-dark.png` (2560×1440 @2x)
- `notes/excel-json-fixed-data.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
