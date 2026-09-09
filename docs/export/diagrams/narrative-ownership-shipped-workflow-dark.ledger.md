# Fidelity ledger — narrative-ownership-shipped (diagram workflow)

Source: `notes/narrative-ownership-shipped.md` · prose `## 작업 흐름과 역할 분담`  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Process

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 4 roles (팀, 기획, 아트, 프로그래머) | 4 |
| Edges | 3 forward + 1 bidirectional loop | 4 (팀→기획, 기획→아트, 기획→프로그래머, 아트↔프로그래머) |

## Kept

- 팀 → 기획 → 아트 ↔ 프로그래머 순서
- 역할별 소유 (줄기 / 볼륨·기능 / 비주얼 / 설정·대사)
- 프로그래머 focal

## Transformed

- Prose handoff → Process columns 01–03
- Bidirectional Art↔Programmer as parallel accent arrows

## Dropped

None (예시 몬스터·지역 세부 prose만).

## Deliverables

- `docs/export/diagrams/narrative-ownership-shipped-workflow-dark.html`
- `assets/images/notes/narrative-ownership-shipped/diagram-workflow-dark.png` (2560×1440 @2x)
- `notes/narrative-ownership-shipped.md`: PNG 삽입 (`mermaid: true` 없음)
