# 글쓰기 가이드

notes · projects · reviews **본문** 작성(Craft). **검토**는 [`content-review.md`](content-review.md). Jekyll front matter·공개·이미지는 [`site-content-rules.md`](site-content-rules.md). notes는 **§notes 작성 — 규칙 3층**. FM·샘플은 [`templates/`](templates/).

토스 [테크니컬 라이팅](https://technical-writing.dev/overview.html)의 유형·정보 구조·문장을 개인 포트폴리오에 맞게 축약했다. 토스 가이드는 **권장**이지 전부 따를 필요는 없다.

## Kit과의 경계

| | 이 사이트 | unity-studio-kit |
|--|-----------|------------------|
| 독자 | **코드·레포 없이** 읽는 채용 검토자·외부 개발자·일반 방문자 | 본인·Unity 붙이기 |
| 톤 | 합니다체 | 해요체 |
| 유형 | 문제 해결 / 깊은 이해 / 참조 / 시리즈 · projects | 시작하기 / 개념 / 참조 / How-to / 프로세스 |
| 두지 않음 | DocsLite·Architecture·Locale·profile | notes·reviews·Jekyll·projects 템플릿 |

공유(토스 축약): 가치 먼저(lead)·한 페이지 한 주제·예측 목차·제목 부제(`—`) 금지·주어 분명·의도적 기각 유지.

사이트 산문의 SSOT는 **이 파일**이다. Kit `WritingGuide`를 사이트 notes·projects에 적용하지 않는다.

## 독자 · 톤

- **독자:** 코드·GitHub·내부 Architecture에 **접근하지 않는** 채용 검토자·외부 개발자·일반 방문자. 레포를 열지 않아도 판단·이해할 수 있게 씁니다.
- **범위:** 게시 페이지 전부 — `index.md`(홈) · `projects/` · `notes/` · `reviews/`. `docs/`(미게시)는 에이전트·작성 규칙용.
- **톤:** 합니다체 · 1인칭 허용(reviews·회고·홈)

### 외부 독자 (사이트 전역)

Kit Architecture·Canvas·partial·SSOT처럼 **레포를 봐야만** 의미가 잡히는 쓰기는 공개 본문에 두지 않습니다. 설계 판단·경계·출시에서 남긴 것은 **코드 없이** 따라갈 수 있게 씁니다.

| 경로 | lead·맥락 | 코드·내부 |
|------|-----------|-----------|
| **홈** | 역할·성과·링크. 방문자가 30초 안에 무엇을 하는 사람인지 | 클래스·파일 경로 금지 |
| **projects/** | 무엇을 출시·만들었고, 내 기여·범위 | 상세 설계는 notes로. README API는 링크만 |
| **notes/** | 플레이·QA·제품 체감 → 설계 경계. 시리즈는 지도·용어표 | 클래스명은 표·「코드에서는」. Canvas/Architecture는 「내부」 또는 생략 |
| **reviews/** | 플레이·비평. 기술 내부명·구현 디테일 최소 | 출시 회고·Architecture 대체 금지 |

**lead·excerpt:** 가치·질문·체감 먼저. 클래스·메서드 나열로 시작하지 않습니다.

**용어 (권장):** 클래스·함수·변수·API·필드처럼 **코드 정체를 가리키지 않으면** 한글을 씁니다. 가리키면 영문을 유지합니다. prose는 한국어 역할. 필요 시 `## 이 글에서 쓰는 말`(또는 맥락 직후 표) — **역할 | 코드(참고)**.

lead·`excerpt`·h2·Mermaid 라벨·링크 텍스트·용어표 왼쪽에 적용하고, 일괄 치환하지 않습니다.

| 구분 | 한글 (권장) | 영문 유지 |
|------|-------------|-----------|
| 역할·체감·개념 | `명령을 모은다`, `능력치를 읽는다` | — |
| 타입·메서드·필드·API | — | `Command.Execute`, `BuffSystem.Add`, 용어표 오른쪽 · 「코드에서는」 |
| 식별자·슬러그 | — | permalink · 파일명 · `series` 슬러그 |
| 예외 | — | 업계 약어·제품명 · 한글이 더 불명확할 때 · 시스템명으로 고정된 문장(`Command 밖에`) |

시리즈·프로젝트에서 맞춘 **예** (닫힌 목록 아님):

| 개념 (역할·체감) | 코드 (타입·메서드·표「코드」칸) |
|------------------|--------------------------------|
| 능력치 | `Stat` |
| 히트마크 | `Hitmark` |
| 스킬 | `Skill` |
| 공격 | `Attack` |
| 명령 | `Command` |
| 버프 | `Buff` |
| 패시브 | `Passive` |

복합은 `무기 히트마크 슬롯`(개념) / 표에 `Hitmark`(코드). 시리즈·프로젝트 단위로 표기를 통일합니다.

**전제:** 「~를 읽었다고 가정」「Canvas와 같음」 대신, **앞에서 본 것 한 줄** 또는 **형제 노트 링크**.

**유지:** 기각·보류·출시 갭·Mermaid·시리즈 내비 — 포트폴리오 notes의 차별점. **표**는 지도·용어·비교에 쓰고, Why·회고·기각·범위 밖은 **prose 우선** ([§표와 prose](#notes--표와-prose)).

적용 순서: **writing-guide(유형·목차·외부 독자) → 용어 패스 → 토스 → humanize**.

## 페이지 역할

| 경로 | 한 페이지의 목적 | API·설치 정본 |
|------|------------------|---------------|
| **projects/** | 무엇을 만들었는지, 내 기여, 타 프로젝트와 차이. `company`=출시·역할, `personal`=케이스 스터디 | GitHub README (있을 때) |
| **notes/** | 왜 그렇게 설계했는지, 경계·기각·출시에서 남긴 것 | 본문 + projects·README 링크 |
| **reviews/** | 플레이·설계 관점의 게임 감상. notes의 출시 회고와 겹치지 않게 | 본문 (출처·스크린샷) |

한 주제를 projects와 notes에 나눌 때: **케이스 스터디(projects)** 와 **설계 회고(notes)** 로 역할을 겹치지 않게 둔다. 게임 감상·비평은 **reviews**에 둔다.

## 정보 구조

토스 [정보 구조](https://technical-writing.dev/information-architecture/introduction.html)에서 이 사이트에 쓰는 것만:

- **가치를 먼저** — `excerpt`와 본문 첫 문단(lead)을 동일하게. 목록·검색에서 “이 글이 뭘 주는지”가 바로 보이게.
- **개요를 빼지 않기** — lead 다음에 `맥락` 또는 `개요`로 배경·전제를 짧게.
- **한 페이지 한 주제** — notes는 `tags` 1개, `project`는 0개 이상 YAML 목록([`site-content-rules.md`](site-content-rules.md)). 시리즈는 Why(경계) / How(구조)처럼 **목적이 다른** 세트로만 묶는다.
- **예측 가능한 목차** — **정보 역할**(lead·맥락·본론·기각·정리)은 유지하고, `##` **제목 문자열**은 주제에 맞게 ([notes 목차 — 역할과 섹션명](#notes-목차--역할과-섹션명)).

제목: [효과적인 제목](https://technical-writing.dev/information-architecture/effective-titles.html) — **무엇을 / 왜**가 드러나게. `title`에 부제(`—`)와 시리즈 접두(`세이브 레이아웃 1/3`)는 쓰지 않는다. 세트 표시는 [`site-content-rules.md`](site-content-rules.md) 「시리즈」.

## 문서 유형

토스 [문서 유형](https://technical-writing.dev/document-types/introduction.html)을 이 사이트에 매핑한 것. **유형은 작성 전 힌트**입니다 — front matter 필드로 두지 않고, published notes를 **재분류·리네이밍할 필요도 없습니다.**

| 유형 | 독자가 얻는 것 | 주로 쓰는 곳 |
|------|----------------|--------------|
| **문제 해결** | 증상 → 원인 → 해결 | notes (최적화·퍼포먼스) |
| **깊은 이해** | 경계·불변조건·기각·Why · 출시 기능 흐름(How) | notes (전투·성장·세이브·엔진) |
| **참조** | 표·타임라인·확인 포인트 | notes·projects (상세는 README에 두고 링크) |
| **학습(시리즈)** | 읽기 순서·지도·개념 연결 | notes `series` — Why 세트 / How 세트 분리 |

유형을 **결합**해도 됩니다 (토스 — 분류는 출발점). 한 페이지 한 주제만 유지합니다.

### 깊은 이해 — 작성 힌트 (하위 구분)

코퍼스 대부분이 **깊은 이해**이며, 본론 형태만 다릅니다. **별도 템플릿·FM은 두지 않습니다.** 초고 전에 아래 중 **하나를 주로** 정하면 lead·본론 h2가 빨리 잡힙니다.

| 힌트 | 독자 질문 | lead | 본론 h2 | 정본 예 |
|------|-----------|------|---------|---------|
| **How** | 이 기능은 어떻게 동작? | 무엇을 설명·범위 | 흐름·경로 (`획득·교체`, `시전 경로`) | [`dragon-relic-acquire`](../notes/dragon-relic-acquire.md) |
| **Why** | 왜 이렇게 잘랐나? | 경계·기각 가치 | `왜 ~` · `기각한 대안`(prose) | [`save-layout-side-lane`](../notes/save-layout-side-lane.md) |
| **지도·복습** | 어디부터 읽나 / 한 장 복습 | 읽기 순서·시리즈 입구 | `권장 읽기`, `end-to-end`, `QA · 회귀` | [`dragon-combat-cluster-read`](../notes/dragon-combat-cluster-read.md) · [`dragon-combat-one-hit`](../notes/dragon-combat-one-hit.md) |

How에 **`## 문제`/`## 해결`을 억지로 넣지 않습니다.** 증상→해결 글만 [문제 해결 최소 골격](#유형별-최소-골격)을 씁니다. 프로세스·역할 회고(`narrative-ownership-shipped` 등)는 위 표 밖 **희귀 예외** — 맥락·흐름·기각만 맞추면 됩니다.

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

적용 순서: **writing-guide(유형·목차) → 용어 패스 → 토스 정보 구조 → 토스 문장 → humanize(위와 안 겹칠 때만)**.

## notes 작성 — 규칙 3층

notes 규칙은 **배선 → 역할 → 유형 힌트** 순입니다. 아래로 갈수록 느슨합니다.

| 층 | 강도 | 내용 |
|----|------|------|
| **1. 배선** | Must (검토) | [`site-content-rules.md`](site-content-rules.md) · Gate: [`content-review.md`](content-review.md) |
| **2. 역할** | Should (검토) | [공통 역할 슬롯](#공통-역할-슬롯) · [유형별 최소 골격](#유형별-최소-골격) — Quality: [`content-review.md`](content-review.md) · `##` 이름은 자유 |
| **3. 유형 힌트** | May | [문서 유형](#문서-유형) · [깊은 이해 하위 힌트](#깊은-이해--작성-힌트-하위-구분) — 초고 전에만, FM 없음 |

세부 유형 표·템플릿 파일을 늘리지 않습니다. published notes가 이미 How·Why·문제 해결·지도를 섞어 쓰므로, **역할만 맞으면** h2·절 순서는 주제에 맡깁니다.

## notes — 표와 prose

토스형 **읽히는 글**(lead·맥락·판단 서사)과 notes **스캔 자산**(용어·경계·지도 표·Mermaid)을 한 페이지에 섞지 않도록, **유형별로 표 밀도**를 나눕니다. 표를 기본값으로 두지 않습니다.

| 힌트 | 본문 표 | prose 우선 |
|------|---------|------------|
| **Why · 회고 · 프로세스** | 0~1 — 2~4축 **비교**만 (예: Backup/ vs Side) | lead·`## 맥락`·기각·범위 |
| **How · 지도 · 참조** | 2~3 — 용어·경계·흐름·QA 축 | 절 사이 **연결 문단** (표만 연속 금지) |
| **문제 해결** | 증상·대조 표는 **선택** | 기각·범위·해결 서사 |

**Should (Craft · Quality):**

- **lead → `## 맥락`:** Why·회고·문제 해결은 **표 없이** 전제·갈등·범위가 prose로 이어지게. (`**독자:**` 별도 줄 대신 intro·맥락에 흡수.)
- **기각·보류 / 기각한 대안:** 항목 ~4개 이하면 **표 대신** `**대안명** — 이유` 한 문장씩. 불릿도 됨 ([`save-layout-side-lane`](../notes/save-layout-side-lane.md) · [`conditional-log-build-cost`](../notes/conditional-log-build-cost.md)).
- **범위 밖:** 별도 `## 이 글에서 다루지 않는 것` h2·**표 금지**. `## 정리` **마지막 1~2문장** prose + 링크 ([`dragon-combat-passive-bridge`](../notes/dragon-combat-passive-bridge.md)). `series_nav: true`이면 **같은 series 형제**는 정리·범위 문장에 넣지 않음 — [`site-content-rules.md`](site-content-rules.md) 「범위 밖 · 시리즈」.
- **humanize:** 용어표·경계표·시리즈 내비·스캔용 볼드는 prose로 풀지 않음 ([§humanize와 충돌](#humanize와-충돌할-때)).

## notes 목차 — 역할과 섹션명

토스 [예측 가능하게 하기](https://technical-writing.dev/information-architecture/predictability.html)는 **같은 정보 슬롯**을 말하지, 매 글 `## 문제` 같은 **고정 제목**을 요구하지는 않습니다. published notes도 이미 주제별 제목(`Trigger → Effect`, `왜 별도 레인인가` 등)을 씁니다. 규칙은 **역할**을 기준으로 두고, `##` 이름은 **예시**로만 둡니다.

### 고정 vs 유연

| 구분 | 유지 (배선·독자) | 유연 (본문 목차) |
|------|------------------|------------------|
| **필수** | `excerpt` = lead · 외부 독자 · `tags` 1개 · 공개 범위 | 본론 `##` 제목·순서 · `실무`/`한계`/`트레이드오프` 등 추가 절 |
| **권장** | lead 다음 맥락 · 설계 회고의 기각·범위 · 문제 해결의 확인 | `기각·보류` ↔ `기각한 대안` ↔ `출시에서 남긴 것` 등 동의어 h2 |
| **시리즈만** | `series_nav` · 형제 링크 중복 금지 ([`site-content-rules.md`](site-content-rules.md)) | 지도 1편 vs How 편의 본론 제목 |

### 공통 역할 슬롯

| 역할 | 필수 | 예시 `##` · 위치 |
|------|------|------------------|
| **가치·요약** | ● | lead (= `excerpt`) |
| **전제·배경** | ○ | `맥락`, `이 글에서 쓰는 말` |
| **본론** | ● | 유형별 ([아래 최소 골격](#유형별-최소-골격)) |
| **판단·범위 제한** | ○ (설계·출시 회고) | `기각·보류`, `기각한 대안`, `출시에서 남긴 것` |
| **다루지 않음** | ○ | `## 정리` 마지막 prose + 링크 (별도 h2·표 없음) |
| **검증** | ○ (문제 해결) | `확인 포인트` |
| **마무리** | ○ | `정리` |

● = 빠지면 글 성격이 흐려짐 · ○ = 해당할 때 넣기.

### 유형별 최소 골격

**문제 해결** — 독자가 **증상 → 원인 → 해결**을 따라갈 수 있으면 됩니다. h2 `문제`/`해결`은 **권장**이지 필수가 아닙니다. `## 확인 포인트`는 이 힌트에서 특히 의미 있습니다.

```text
lead → (맥락) → 증상·원인 → 해결·동작 → (실무·한계·트레이드오프) → (기각·보류) → (확인 포인트) → (정리)
```

정본 예: [`conditional-log-build-cost.md`](../notes/conditional-log-build-cost.md) · [`stage-spawn-area-preload.md`](../notes/stage-spawn-area-preload.md)

**깊은 이해** — How / Why / 지도·복습 [힌트](#깊은-이해--작성-힌트-하위-구분) 중 하나를 주로 따릅니다. 공통 골격:

```text
lead → (맥락·용어) → 본론 (h2 주제별) → (기각·출시에서 남긴 것) → (정리 + 범위 밖 prose)
```

| 힌트 | 정본 예 |
|------|---------|
| How | [`dragon-relic-acquire.md`](../notes/dragon-relic-acquire.md) · [`dragon-combat-passive-bridge.md`](../notes/dragon-combat-passive-bridge.md) |
| Why | [`save-layout-side-lane.md`](../notes/save-layout-side-lane.md) · [`excel-json-fixed-data.md`](../notes/excel-json-fixed-data.md) |
| 지도·복습 | [`dragon-combat-cluster-read.md`](../notes/dragon-combat-cluster-read.md) · [`dragon-combat-one-hit.md`](../notes/dragon-combat-one-hit.md) |

**혼합** — 증상이 lead에 있어도 본론이 설계 선택이면 Why·How 골격을 우선합니다 (예: [`stage-visual-gpu-optimize.md`](../notes/stage-visual-gpu-optimize.md)). `## 문제`/`## 해결` h2는 **증상→해결**이 본문 중심일 때만 씁니다.

## 유형별 채우기 (샘플·체크리스트)

템플릿은 **복사용 mandatory 골격**이 아니라 **FM 예시 + 역할 체크리스트 + 샘플 목차**입니다. 새 글은 [유형별 최소 골격](#유형별-최소-골격)을 채운 뒤, h2는 주제에 맞게 이름을 붙입니다. FM·공개·이미지는 [`site-content-rules.md`](site-content-rules.md).

### notes

| 유형 | 독자가 얻는 것 | 샘플·체크리스트 |
|------|----------------|-----------------|
| **문제 해결** | 증상 → 원인 → 해결 | [`templates/note-problem.md`](templates/note-problem.md) |
| **깊은 이해** (How · Why · 지도) | 경계·흐름·기각 · 시리즈 | [`templates/note-series.md`](templates/note-series.md) |

시리즈 1편은 **지도** 힌트. Why / How는 `series` 슬러그를 다르게 둡니다 ([`site-content-rules.md`](site-content-rules.md)).

`project`가 있으면 제목 아래에 `프로젝트 : {한글 짧은 제목}` 링크가 붙습니다. 여러 개면 ` · `로 이어집니다. 표시·underline은 [`site-content-rules.md`](site-content-rules.md) 「주 프로젝트」.  
`series`가 있으면 제목 아래에 `시리즈 : {series_title} {n}/{total}`이 붙습니다. 표시는 [`site-content-rules.md`](site-content-rules.md) 「시리즈」.

`series_nav: true`이면 `## 정리` 다음 **권장 읽기·수동 시리즈·구조 줄 없이** — 시리즈 목록(`note-series-nav`) · 발행 순 이전/다음(`notes-adjacent`)이 layout에서 이어집니다. **범위 밖 prose**에 같은 `series` 형제 링크는 두지 않습니다 ([§표와 prose](#notes--표와-prose) · [`site-content-rules.md`](site-content-rules.md) 「범위 밖 · 시리즈」).
**Mermaid**는 lead 직후 고정이 아니라, 설명하는 절 옆 ([`site-content-rules.md`](site-content-rules.md) 「notes 도식 둘 곳」 · [`templates/mermaid-diagram.md`](templates/mermaid-diagram.md)).

### projects

| `project_kind` | 독자가 얻는 것 | 템플릿 |
|----------------|----------------|--------|
| **company** | 출시·역할·담당 범위 (깊이는 notes) | [`templates/project-company.md`](templates/project-company.md) |
| **personal** | 문제·설계·비범위·계보 (설치는 README) | [`templates/project-personal.md`](templates/project-personal.md) |

공통: lead(= `excerpt`) → 개요 → … → 스택 · 링크. **검토:** [`content-review.md`](content-review.md) · project 템플릿 `## 체크`.