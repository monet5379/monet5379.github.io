# Fidelity ledger — dragon-combat-one-hit (diagram one-hit)

Source: `notes/dragon-combat-one-hit.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Architecture

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 8 (SK, BF, PS, ACT, FORM, APP, VIT, PJ) | 8 |
| Edges | 11 | 11 |
| Zones | 2 (S2, S1) | 2 |

## Kept

- S2 triggers → Activate
- BF → APP (경로 B)
- PS → BF · VIT ⇢ PS cascade
- ACT → FORM → APP → VIT spine
- PJ ⇢ FORM transport

## Transformed

- Mermaid subgraph → editorial zones
- Apply spine = focal (accent)
- Cascade/transport = dashed

## Dropped

None (node budget 8 ≤ 9).

## Deliverables

- `docs/export/diagrams/dragon-combat-one-hit-one-hit-dark.html`
- `assets/images/notes/dragon-combat-one-hit/diagram-one-hit-dark.png` (2560×1440 @2x)
- `notes/dragon-combat-one-hit.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
