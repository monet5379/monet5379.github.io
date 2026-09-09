# Fidelity ledger — blade-build-attach (diagram session)

Source: `notes/blade-build-attach.md` · fenced mermaid block #0  
Dials: format=html+png · size=slide-16x9 · detail=balanced · audience=mixed · variant=minimal-dark  
Target type: Architecture

## Counts

| | Source (IR) | Drawn |
|---|-------------|-------|
| Nodes | 7 (C, R, T, RUN, STAGE, META, BP) | 7 |
| Edges | 6 | 6 |

## Kept

- 코어·기어·개조 → 런 세션
- 리스크 → 스테이지 · 런 위험
- 특성·부활 → 캐릭터 메타
- 세 세션 → 버프·패시브 반영 fan-in

## Transformed

- Mermaid TD → LR architecture (source → session → surface)
- 런 세션 = focal
- Title “세션과 버프 표면” (≠는 prose에만)

## Dropped

None.

## Deliverables

- `docs/export/diagrams/blade-build-attach-session-dark.html`
- `assets/images/notes/blade-build-attach/diagram-session-dark.png` (2560×1440 @2x)
- `notes/blade-build-attach.md`: Mermaid 제거 · PNG 삽입 · `mermaid: true` 제거
