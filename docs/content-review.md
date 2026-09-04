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
- [ ] Mermaid: `mermaid: true` ↔ 본문 ` ```mermaid ` 블록 일치 · `%%{init:…}%%` 없음 ([§Mermaid](site-content-rules.md#mermaid))
- [ ] 공개 `tags`는 `notes_production_visible_tags`에 포함 (배포 목록 의도)

---

## Gate — projects

- [ ] `project_kind`: `company` | `personal`
- [ ] `title` 한글 · `(English)` 병기 없음
- [ ] 이미지 경로·`cover`/`ss-*` 규칙 ([§projects 이미지](site-content-rules.md#이미지))

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

### projects

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
