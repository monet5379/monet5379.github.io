# Fidelity ledger — save-layout-side-lane (diagram backup vs side)

Source: `notes/save-layout-side-lane.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Architecture

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 4 (E, T, B, S) | 4 |
| Edges | 2 | 2 |
| Zones | 2 subgraphs | 2 (BACKUP/ · 사이드) |

## Kept

- 손상·빈 파일 → Backup/ (dashed failure)
- 타이틀 안전 지점 → Side (solid intentional)
- 한국어 라벨 · Continue 정본 아님 / valid 힌트

## Transformed

- Mermaid TD → editorial two-row contrast
- Side zone = focal (accent)
- `≠` 경계는 prose에만 (도식 안 NOTE 없음)

## Dropped

None.

## Deliverables

- `docs/export/diagrams/save-layout-side-lane-backup-vs-side-dark.html`
- `assets/images/notes/save-layout-side-lane/diagram-backup-vs-side-dark.png` (2560×1440 @2x)
- `notes/save-layout-side-lane.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
