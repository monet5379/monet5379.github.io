# Fidelity ledger — stage-spawn-area-preload (diagram preload)

Source: `notes/stage-spawn-area-preload.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Process

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 6 (E, P, A, I, G, S) | 6 |
| Edges | 5 | 5 |
| Zones | 2 (PRELOAD, MOVE) | 2 |

## Kept

- Area 진입 → 일괄 스폰 → 현재 활성 → inactive root
- inactive → 페이드 → 활성↔비활성만
- 재 Instantiate 없음

## Transformed

- Mermaid TD → LR process (PRELOAD then MOVE)
- PRELOAD zone + entry = focal

## Dropped

None.

## Deliverables

- `docs/export/diagrams/stage-spawn-area-preload-preload-dark.html`
- `assets/images/notes/stage-spawn-area-preload/diagram-preload-dark.png` (2560×1440 @2x)
- `notes/stage-spawn-area-preload.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
