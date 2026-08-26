# 관계도·개념도 (개인 프로젝트)

사이트 미게시. 개인 프로젝트 글(`projects/`, `project_kind: personal`)과 GitHub README에 넣을 **히어로 개념도 1장**용.

**정본(작성·렌더·히어로 규칙):** sibling [`private/mermaid-kit`](../../../private/mermaid-kit/) — [`conventions.md`](../../../private/mermaid-kit/conventions.md) · [`AGENTS.md`](../../../private/mermaid-kit/AGENTS.md) · [`tools/render.ps1`](../../../private/mermaid-kit/tools/render.ps1)

실기 UI 캡처(설정 창, 오버레이, Demo 씬 등)는 이 문서 밖이다. 스크린샷은 따로 찍고 [`../site-content-rules.md`](../site-content-rules.md) 파일명을 따른다.

본문 골격: [`project-personal.md`](project-personal.md).

---

## 사이트에서 할 일

| 단계 | 위치 |
|------|------|
| `.mmd` 정본 | 대상 개인 repo `docs/diagrams/<name>.mmd` |
| README PNG | 같은 repo `docs/images/<name>.png` (locale면 `.ko` 쌍) |
| 사이트 PNG | `assets/images/projects/<슬러그>/ss-01-dark.png` |
| 본문 | `{% include screenshot-carousel.html slug="<슬러그>" %}` |

- 캐러셀은 `ss-*`를 이름순으로 표시한다. 개념도만 둘 때는 `ss-01-dark.png` 한 장이면 된다.
- 실기 캡처를 같이 두면 `ss-02.jpg`…로 뒤에 둔다 (개념도가 앞에 오도록).
- **projects / README:** PNG만 게시한다 (이 템플릿 범위).
- **notes:** `mermaid: true` + 본문 mermaid fenced 블록으로 사이트에서 직접 그린다 — [`../site-content-rules.md`](../site-content-rules.md). 블록 위 제목·아래 설명. **위치는 절별로** (lead 직후 고정 아님). projects 캐러셀에는 쓰지 않는다.
- 출시 타이틀(`project_kind: company`) 히어로는 실기 스크린샷을 유지한다. Mermaid로 바꾸지 않는다.

## Cursor 요청

멀티루트에 **mermaid-kit + 대상 개인 프로젝트**(필요 시 이 사이트)를 연 뒤, kit `conventions.md`의 복사용 요청을 쓴다. 요약:

```text
연 개인 프로젝트용 관계도 Mermaid(.mmd)를 작성해 줘.
규칙: mermaid-kit/conventions.md (히어로 1장).
정본: 대상 repo docs/diagrams/. English labels, dark theme.
entry → main fork → one ≠ callout. 렌더 후 README PNG + 사이트 ss-01-dark.png.
```

## 쓸 때 / 안 쓸 때

- **쓴다:** Editor/Runtime·필터≠스트리핑처럼 분기·경계·`≠`가 한 장으로 보이는 개인 케이스 스터디.
- **안 쓴다:** 규칙 묶음만인 Kit, 실기 스크린샷이 본체인 출시작, 뚜렷한 한 이야기가 없을 때.
