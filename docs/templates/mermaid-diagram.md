# Mermaid 도식 (notes 정본)

사이트 미게시. notes·projects 본문 도식 작성·Cursor 요청용.
목록·캐러셀 PNG는 [`../site-content-rules.md`](../site-content-rules.md) 「projects 이미지」.

## 정본

| 항목 | 위치 |
|------|------|
| 도식 소스 | `notes/<슬러그>.md` — ` ```mermaid ` fenced 블록 |
| 활성화 | front matter `mermaid: true` |
| 렌더 | `assets/js/mermaid-notes.js` (테마 토글 시 재렌더) |

Cursor·에이전트가 note 본문에 직접 작성한다. sibling mermaid-kit·`.mmd` 단독 정본은 쓰지 않는다.

## 한 장 규칙

- **한 블록 = 한 이야기:** entry → main 분기. subgraph로 레인·축 구분.
- **도식 안 `≠` / `NOTE`:** **강제하지 않는다.** 기본은 없음.
  - **넣을 때:** 아래 prose·callout만으로는 경계가 안 보이고, 도식만 보면 오해될 때 — 짧게 하나.
  - **빼는 때:** 아래 요약이 이미 `≠`·경계를 말하면 — **중복 금지**.
- **라벨:** 짧게. 표·lead와 같은 말 반복하지 않음.
- **언어:** notes 본문과 동일 (한국어 라벨 OK). README용 영문이 필요하면 README에만 별도 블록.
- **형식:** `flowchart TD` 또는 `flowchart LR`.
- **피함:** `%%{init:…}%%`, 과한 노드 수, 구현 파일명 나열, Plan용 임시 라벨 그대로 붙이기.

## 본문 배치

- 블록 **위:** `**Main · Side · Meta**` 같은 한 줄 제목.
- 블록 **아래:** 도식 요약 1–2문장 또는 `<div class="callout" markdown="1">` 불릿. 경계·`≠`는 **여기가 기본 채널**.
- **위치:** [`site-content-rules.md`](../site-content-rules.md) 「notes 도식 둘 곳」표.

## Cursor 요청 (복사용)

```text
notes/<슬러그>.md에 Mermaid 도식을 넣어 줘.

규칙: docs/templates/mermaid-diagram.md
- front matter mermaid: true
- 설명하는 절: <예: ## 해결 초입>
- 한 장: entry → 분기
- 도식 안 ≠/NOTE는 아래 prose에 경계가 없을 때만
- 위 제목 + 아래 callout 1–2문장
- init 없음, save-layout-boundaries 노트 톤·밀도 참고

확인: bundle exec jekyll serve 후 light/dark 토글.
```

## projects와의 관계

- **기본:** 개념은 live Mermaid. 실기 UI가 있으면 Demo 캡처 캐러셀.
- **목록:** Mermaid만 있는 프로젝트는 `ss-01-dark.png`를 두지 않음 (썸네일 없음).

## 쓸 때 / 안 쓸 때

- **쓴다:** 분기·레인·경계가 한 장으로 보일 때.
- **안 쓴다:** 실기 UI가 본체, 규칙 나열만, 뚜렷한 한 이야기 없을 때.
