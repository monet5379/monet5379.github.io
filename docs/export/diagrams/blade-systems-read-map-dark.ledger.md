# Fidelity ledger — blade-systems-read (diagram 0)

Source: `notes/blade-systems-read.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Flowchart

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 5 | 5 |
| Edges | 5 | 5 |

## Kept

- P → A → W (solid): 읽기 순서 spine
- P → B (solid): 병렬 Why 분기
- W ⇢ D, B ⇢ D (dashed): 겹침 층
- 한국어 라벨 전부

## Transformed

- Mermaid LR auto-layout → editorial orthogonal elbows
- `<br/>` → 두 줄 텍스트 (title + mono sublabel)
- D 라벨: note의 한 줄을 두 줄로 나눔 (드래곤 전투·세이브 / Excel)

## Dropped

None.

## Deliverables

- `docs/export/diagrams/blade-systems-read-map-dark.html`
- `assets/images/notes/blade-systems-read/diagram-read-map-dark.png` (2560×1440 @2x)
- `notes/blade-systems-read.md`: Mermaid 제거 · 위 PNG 삽입 (`## 권장 읽기 순서`)
