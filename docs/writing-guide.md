# 글쓰기 가이드

notes · projects · reviews **본문**의 유형·목차·톤. Jekyll front matter·공개·이미지는 [`site-content-rules.md`](site-content-rules.md). 채우기 골격은 [`templates/`](templates/).

토스 [테크니컬 라이팅](https://technical-writing.dev/overview.html)의 유형·정보 구조·문장을 개인 포트폴리오에 맞게 축약했다. 토스 가이드는 **권장**이지 전부 따를 필요는 없다.

## Kit과의 경계

| | 이 사이트 | unity-studio-kit |
|--|-----------|------------------|
| 독자 | 채용 검토자·외부 개발자 | 본인·Unity 붙이기 |
| 톤 | 합니다체 | 해요체 |
| 유형 | 문제 해결 / 깊은 이해 / 참조 / 시리즈 · projects | 시작하기 / 개념 / 참조 / How-to / 프로세스 |
| 두지 않음 | DocsLite·Architecture·Locale·profile | notes·reviews·Jekyll·projects 템플릿 |

공유(토스 축약): 가치 먼저(lead)·한 페이지 한 주제·예측 목차·제목 부제(`—`) 금지·주어 분명·의도적 기각 유지.

사이트 산문의 SSOT는 **이 파일**이다. Kit `WritingGuide`를 사이트 notes·projects에 적용하지 않는다.

## 독자 · 톤

- 독자: 채용 검토자·외부 개발자
- 톤: 합니다체 · 1인칭 허용

## 페이지 역할

| 경로 | 한 페이지의 목적 | API·설치 정본 |
|------|------------------|---------------|
| **projects/** | 무엇을 만들었는지, 내 기여, 타 프로젝트와 차이. `company`=출시·역할, `personal`=케이스 스터디 | GitHub README (있을 때) |
| **notes/** | 왜 그렇게 설계했는지, 경계·기각·출시에서 지킨 것 | 본문 + projects·README 링크 |
| **reviews/** | 플레이·설계 관점의 게임 감상. notes의 출시 회고와 겹치지 않게 | 본문 (출처·스크린샷) |

한 주제를 projects와 notes에 나눌 때: **케이스 스터디(projects)** 와 **설계 회고(notes)** 로 역할을 겹치지 않게 둔다. 게임 감상·비평은 **reviews**에 둔다.

## 정보 구조

토스 [정보 구조](https://technical-writing.dev/information-architecture/introduction.html)에서 이 사이트에 쓰는 것만:

- **가치를 먼저** — `excerpt`와 본문 첫 문단(lead)을 동일하게. 목록·검색에서 “이 글이 뭘 주는지”가 바로 보이게.
- **개요를 빼지 않기** — lead 다음에 `맥락` 또는 `개요`로 배경·전제를 짧게.
- **한 페이지 한 주제** — notes는 `tags` 1개([`site-content-rules.md`](site-content-rules.md)), 시리즈는 Why(경계) / How(구조)처럼 **목적이 다른** 세트로만 묶는다.
- **예측 가능한 목차** — 아래 [유형별 채우기 템플릿](#유형별-채우기-템플릿)을 기본으로, 필요한 섹션만 추가·생략.

제목: [효과적인 제목](https://technical-writing.dev/information-architecture/effective-titles.html) — **무엇을 / 왜**가 드러나게. `title`에 부제(`—`)는 쓰지 않는다.

## 문서 유형

토스 [문서 유형](https://technical-writing.dev/document-types/introduction.html)을 이 사이트에 매핑한 것. 새 글 작성 전 **주 유형 하나**를 정하면 목차가 빨리 잡힌다.

| 유형 | 독자가 얻는 것 | 주로 쓰는 곳 |
|------|----------------|--------------|
| **문제 해결** | 증상 → 원인 → 해결 | notes (엔진·퍼포먼스) |
| **깊은 이해** | 경계·불변조건·기각·Why | notes (전투·액션·성장), 시리즈 지도 1편 |
| **참조** | 표·타임라인·확인 포인트 | notes·projects (상세는 README에 두고 링크) |
| **학습(시리즈)** | 읽기 순서·지도·개념 연결 | notes `series` — Why 세트 / How 세트 분리 |

문장 다듬기: 토스 [Step 3](https://technical-writing.dev/sentence/introduction.html)과 `.cursor/rules/korean-humanize.mdc` — 주어 분명, 필요한 정보만, 자연스러운 한국어. 윤문·AI 티 제거는 humanize 규칙을 따른다.

### humanize와 충돌할 때

humanize(im-not-ai)는 **AI 티·번역투 제거**용이다. **겹치면 토스 Step 2·3와 본 가이드(유형·목차·lead)가 우선**한다.

| 구간 | 우선 |
|------|------|
| lead·가치·`excerpt` | 토스 가치 먼저 — lead가 빈약하면 초고에서 보강. 윤문은 빈 수사만 제거 |
| 표·불릿·스캔용 **볼드** | writing-guide 목차·토스 예측 가능성 — prose로 풀지 않음 |
| 시리즈 내비 (`**권장 읽기** —`, 형제 링크) | 유지 |
| 용어 | 토스 일관성 — 시리즈·프로젝트 단위로 한 표기. humanize 후에도 통일 |
| 주어 | 설계 회고에서도 **설계자·독자** 주어를 우선. 시스템·컴포넌트 주어는 동작·경계 설명에만 |
| 모호함 | `기각·보류` 등 **의도적 범위 제한**은 유지. AI 틱한 `~할 수 있습니다` 남발은 토스 구체성으로 정리 |

적용 순서: **writing-guide(유형·목차) → 토스 정보 구조 → 토스 문장 → humanize(위와 안 겹칠 때만)**.

## 유형별 채우기 템플릿

고정이 아니라 **기본 골격**. 상세는 템플릿을 복사해 채운다. FM·공개·이미지는 [`site-content-rules.md`](site-content-rules.md).

### notes

| 유형 | 독자가 얻는 것 | 템플릿 |
|------|----------------|--------|
| **문제 해결** | 증상 → 원인 → 해결 | [`templates/note-problem.md`](templates/note-problem.md) |
| **깊은 이해 / 시리즈** | 경계·Why · 지도·형제 링크 | [`templates/note-series.md`](templates/note-series.md) |

시리즈 1편은 **지도** 역할. Why / How는 `series` 슬러그를 다르게 둔다.

**권장 읽기 · 시리즈 내비**는 lead·맥락 위가 아니라 본문 **하단**(`## 정리` 다음).  
**Mermaid**는 lead 직후 고정이 아니라, 설명하는 절 옆 ([`site-content-rules.md`](site-content-rules.md) 「notes 도식 둘 곳」 · [`templates/mermaid-diagram.md`](templates/mermaid-diagram.md)).

### projects

| `project_kind` | 독자가 얻는 것 | 템플릿 |
|----------------|----------------|--------|
| **company** | 출시·역할·담당 범위 (깊이는 notes) | [`templates/project-company.md`](templates/project-company.md) |
| **personal** | 문제·설계·비범위·계보 (설치는 README) | [`templates/project-personal.md`](templates/project-personal.md) |

공통: lead(= `excerpt`) → 개요 → … → 스택 · 링크.