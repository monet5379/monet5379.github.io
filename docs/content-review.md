# 콘텐츠 검토

게시 전 **검사·검토** 체크리스트. **작성(Craft)** 은 [`writing-guide.md`](writing-guide.md) · [`templates/`](templates/).

| | 작성 | 검토 |
|---|------|------|
| **문서** | writing-guide · templates | **이 파일** |
| **배선 FM** | site-content-rules 참고 | Gate **Must** |
| **본문·톤** | 유형 힌트 · 골격 · 토스 | Quality **Should** |
| **윤문** | — | humanize ([`.cursor/rules/korean-humanize.mdc`](../.cursor/rules/korean-humanize.mdc)) — Quality 이후 |

규칙 3층 대응: **1층 배선 = Gate**, **2층 역할 = Quality**, **3층 유형 힌트(How/Why/지도) = 검사하지 않음**.

## 적용 시점

- 커밋·push 전, PR 전, 「검토해줘」 요청
- humanize·윤문 **전에** Gate → Quality 순
- **새 글 작성 중**에는 [`writing-guide.md`](writing-guide.md) 우선 — 이 파일 전체를 매번 적용하지 않음

## 검토 순서

```text
1. Gate (Must)     — 실패 시 수정 후 재검
2. Quality (Should)— 코멘트·보강 제안
3. humanize (선택) — 요청 시만, Craft 우선
4. (선택) bundle exec jekyll build
```

---

## Gate — Must (전 페이지)

실패 시 **게시·커밋 전 수정**. 상세 근거는 [`site-content-rules.md`](site-content-rules.md).

- [ ] `date`, `excerpt` 있음 · `excerpt` = 본문 **lead**(첫 문단, 공백·HTML 제외 후 동일 의미)
- [ ] `title`에 부제 `—` 없음 · notes `title`에 `{series_title} n/total` 접두 없음
- [ ] NDA·비공개 수치·허용 범위 밖 회사 실명 없음 ([site-content-rules §공개](site-content-rules.md#공개-범위))
- [ ] Steam 판매·매출 추정 없음
- [ ] Intem Studio 글 **전문** 복제 없음 · 필요 시 링크만
- [ ] Kit 해요체·Unity Architecture 톤을 **게시 본문**에 쓰지 않음 ([`writing-guide §Kit`](writing-guide.md#kit과의-경계))
- [ ] Canvas·Architecture를 공개 본문 **유일 근거**로 쓰지 않음

---

## Gate — notes

- [ ] `tags` **정확히 1개** · [`site-content-rules §분류`](site-content-rules.md#분류-tags) 허용 목록
- [ ] `project` 0개 이상(YAML 목록) · 각 슬러그에 `projects/<슬러그>.md` 존재
- [ ] `series` 있으면 `series_title`, `series_order`, `series_total` · 시리즈 편은 `series_nav: true` ([§시리즈](site-content-rules.md#시리즈))
- [ ] `series_nav: true`이면 본문에 수동 `**권장 읽기**`·`**시리즈:**` 줄 없음 · **범위 밖 prose**(보통 `## 정리` 마지막)에 **같은 series 형제** 링크 없음
- [ ] 도식 Tier: 같은 글에 `mermaid: true`/` ```mermaid ` 와 `diagram-*-dark.png`를 **동시에 두지 않음** ([§Mermaid](site-content-rules.md#mermaid) · [`mermaid-diagram.md`](templates/mermaid-diagram.md) §Tier)
- [ ] Tier A: `mermaid: true` ↔ 본문 ` ```mermaid ` 블록 일치 · `%%{init:…}%%`·글 속 hex 없음
- [ ] Tier B: `diagram-*-dark.png` + 캡션 · `mermaid: true` 없음 · ledger/HTML 정본 있음 ([`export/diagrams/`](export/diagrams/README.md))
- [ ] 공개 `tags`는 `notes_production_visible_tags`에 포함 (배포 목록 의도)

---

## Gate — projects

- [ ] `project_kind`: `company` | `personal`
- [ ] `title` 한글 · `(English)` 병기 없음
- [ ] 이미지 경로·`cover`/`ss-*` 규칙 ([§projects 이미지](site-content-rules.md#이미지))
- [ ] **company** 개요: `diagram-overview-dark.png`(Tier B) · **personal** 절 How: live Mermaid(Tier A) 혼동 없음

---

## Gate — reviews

- [ ] 부제는 `subtitle` FM · `title`에 `—` 없음
- [ ] notes `tags`/`project`/`project_kind`와 혼동 없음

---

## Quality — Should (Craft)

실패해도 **분류 오류가 아님** — 보강 제안. 기준: [`writing-guide §외부 독자`](writing-guide.md#외부-독자-사이트-전역) · [§notes 목차](writing-guide.md#notes-목차--역할과-섹션명).

### 공통

- [ ] lead가 **가치·질문·범위**를 먼저 말함 · 클래스·파일 나열로 시작하지 않음
- [ ] 코드·레포 없이 읽을 수 있음 · 「~를 읽었다고 가정」 대신 한 줄 전제 또는 형제 링크
- [ ] prose 용어는 한국어 역할 · 필요 시 `이 글에서 쓰는 말` 표
- [ ] 코드 정체(클래스·함수·변수·API)가 아니면 **한글 권장** · 타입·API·슬러그는 영문 ([writing-guide §용어](writing-guide.md#외부-독자-사이트-전역))
- [ ] 한 페이지 한 주제 · projects와 notes 역할 겹침 없음

### notes — 역할 (유형 라벨은 검사 안 함)

- [ ] 본론이 비어 있지 않음 (흐름·경계·증상→해결 중 하나)
- [ ] **How/Why** 글에 억지 `## 문제`/`## 해결` 없음 — 증상→해결이 **중심**일 때만 ([writing-guide §혼합](writing-guide.md#유형별-최소-골격))
- [ ] 설계·출시 회고면 **기각·범위·출시에서 남긴 것** 중 해당 슬롯 고려
- [ ] 문제 해결 힌트면 **확인 포인트** 또는 동등한 검증 절 검토
- [ ] [**표와 prose**](writing-guide.md#notes--표와-prose): Why·회고·문제 해결 — lead·`## 맥락`까지 표 없이 읽히는지 · 기각 ~4항목이 표가 아닌 prose인지 · 범위 밖이 `## 정리` prose(별도 h2·표 없음)인지
- [ ] **Tier A Mermaid:** 블록 위 `**제목**` · visual contract ([`mermaid-diagram.md`](templates/mermaid-diagram.md) §Visual contract) · light/dark에서 site 토큰 톤

### projects

- [ ] Craft·다듬기: [`writing-guide §projects 작성`](writing-guide.md#projects-작성--규칙-2층)
- [ ] `excerpt` = lead
- [ ] **company:** [`templates/project-company.md §체크`](templates/project-company.md#체크) 항목
- [ ] **personal:** [`templates/project-personal.md §체크`](templates/project-personal.md#체크) 항목

---

## 검사하지 않는 것

- How vs Why vs 지도 **유형 일치** · h2 제목 표준화
- `기각·보류` **필수 여부** (Quality 제안만)
- humanize 전 문장 아름다움 (별도 요청 시)

---

## 에이전트

| 요청 | 읽을 정본 |
|------|-----------|
| 글 **작성** | writing-guide · templates · site-content-rules(배선) |
| 글 **검토** | **content-review (이 파일)** · site-content-rules · writing-guide §외부 독자 |
| **윤문** | humanize · 충돌 시 writing-guide 우선 |

진입: [`AGENTS.md`](../AGENTS.md).

### 검토 출력·선택 절차

「검토해줘」「체크해줘」 등 **검토** 요청 시 아래 순서·형식을 따른다. Gate·Quality 상세는 위 본문.

1. **Gate** — 항목별 통과/실패. 실패는 수정 제안.
2. **Quality** — Should 미충족만 bullet. 유형·h2 표준화는 검사하지 않음(§검사하지 않는 것).
3. **수정** — 사용자가 「수정까지」「적용」을 요청했을 때만 패치. **기본은 발견·제안만.**

#### 요청에서 정하는 것 (`@` · 한 줄)

| 항목 | 기본 | 명시 시 |
|------|------|---------|
| 대상 | `@`로 연 md | 그 파일(들)만 |
| 산출 | 발견·제안 | 「수정까지」「적용」→ diff |
| 구현 대조 | **하지 않음** | `@`로 코드·Architecture 경로가 **함께** 오면 해당 파일만 Read로 사실 확인 |

형제 Unity repo·프로젝트 코드 **전체** 스캔은 하지 않는다 — [`agent-efficiency.md`](agent-efficiency.md). `@` 없이 멀티 루트를 열지 않음.

#### notes 검토 시 추가 (Quality)

- **`mermaid: true`:** 노드 줄바꿈은 `<br/>` ([`mermaid-diagram.md`](templates/mermaid-diagram.md)). fenced 블록 안 `\n`은 Quality 이슈.
- **표 밀도:** How·참조·문제 해결형 — 본문 표가 ~4개를 넘으면 prose로 줄일 후보 ([`writing-guide` §표와 prose](writing-guide.md#notes--표와-prose)). lead·맥락·기각은 표 없이.
- **용어표:** 본문 prose에서 실제로 부르는 역할만. 코드 타입만 있고 본문에 없으면 Quality.

#### 한 줄 요청 예

```text
문서 검토: content-review Gate→Quality. 발견만.
@notes/dragon-runtime-performance-session.md
```

```text
문서 검토: Gate→Quality. 수정까지.
@notes/foo.md @dragon-is-dead/Project/.../PerformanceProbe.cs
```
