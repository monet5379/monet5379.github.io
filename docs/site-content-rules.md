# 사이트 콘텐츠·운영 규칙

게시 규약(front matter·공개·이미지·커밋). 글의 유형·목차·톤·**외부 독자**(코드·레포 없이 읽음)는 [`writing-guide.md`](writing-guide.md). 채우기 골격은 [`templates/`](templates/).

## 커밋

- 제목·본문: 한글
- 의미 있는 한 문장으로 무엇을 왜 바꿨는지 적습니다
- 사이트 콘텐츠와 `docs`/설정 변경은 커밋을 분리합니다

## 공개 범위

- NDA·비공개 수치·내부명 금지
- 회사·프로젝트 실명은 본인이 허용한 범위만 사용합니다
- Steam **판매·매출 추정**은 공개 페이지에 두지 않음. 정본은 sibling `career-private/steam-sales-estimates.md`. 공개 성과는 발매 마일스톤·플랫폼·수상·역할·스토어 링크로

## Studio

- Intem Studio 글 전문 복제 금지
- 필요 시 링크만 연결합니다

## 공통 front matter

`projects` · `notes` · `reviews` 페이지(및 홈의 경력 블록):

- `date`, `excerpt` 필수 (`projects` · `notes` · `reviews`)
- `title` 짧게 · 부제(`—`) 금지 · notes 시리즈 접두(`{series_title} n/total`) 금지
- `excerpt` = 본문 lead
- 상단 nav·본문 h1용 카테고리 `title`은 **한글** (예: `프로젝트`). 경력 본문은 홈(`index.md`)에 두고, `/career/`는 홈 `#경력` 리다이렉트만 유지(nav 미포함)

### 홈 경력 미디어

홈 경력 항목마다 `{% include career-media.html ... %}`:

- `youtube`(video id)가 있으면 임베드 재생 (`start` 초 선택)
- 없으면 `slug`의 `ss-*` 스크린샷 캐러셀
- 둘 다 있으면면 YouTube 우선

재직 기간 표시는 **월까지** (`YYYY.MM – YYYY.MM`). 일자 정본은 sibling `career-private/employment-dates.md`. 출시·발매일은 제품 일정이라 일자 유지 가능.

`projects/` · `notes/` · `reviews/` 목록은 `_includes/section-index-list.html`로 자동 생성 (`index.md` 제외).

## notes

### Front matter

```yaml
---
layout: page
title: 짧은 제목
permalink: /notes/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [최적화]
project: dragon-is-dead
---
```

시리즈·구조 세트일 때 (선택):

```yaml
title: 캐릭터는 필드에 어떻게 서는가
project: dragon-is-dead
series: combat-presence
series_title: 타격·데미지
series_order: 1
series_total: 4
```

```yaml
title: 스킬은 어디서 전투로 넘기는가
project: dragon-is-dead
series: combat-reaction
series_title: 트리거·연쇄
series_order: 1
series_total: 4
```

- `notes/<슬러그>.md`를 추가하면 `notes/index.md` 목록에 자동으로 포함됩니다 (`date` 최신순. 같은 날짜는 `series`·`series_order` tie-break).
- **공개·비공개:** `_config.yml` `notes_production_visible_tags`에 있는 분류만 공개입니다. GitHub Pages 목록에는 공개 글만 들어갑니다. 로컬(`jekyll serve`)은 비공개 글도 HTML에 넣고, footer **비공개: 숨김/표시** 토글로 가립니다(기본 숨김, `localStorage`에 유지). 개별 permalink는 환경과 무관하게 빌드됩니다. 프로젝트 본문의 비공개 노트 링크도 같은 토글을 씁니다 (`data-private-notes`).

### 분류 (`tags`)

목록 **분류** 필터용. 글당 **정확히 1개**만 둡니다.

| 분류 | 질문 | 예 |
|------|------|-----|
| **전투** | 맞힌 뒤 무엇이 일어나는가 | Hitmark·Buff·Passive·Apply |
| **액션** | 이 프레임의 의도는 누가 실행하는가 | Command·게이트·Room·Wave·보스 |
| **스킬** | 스킬을 어떻게 얻고·슬롯에 두고·시전하는가 | 학습·할당·TryCast·SkillAnimation |
| **인벤** | 아이템을 어떻게 쌓고·배치하고·착용해 Stat·Skill에 반영하는가 | VItem·획득·Equip·Apply |
| **성장** | 이번 세션이 무엇을 들고 전투에 붙는가 | Core·Gear·Risk·Trait |
| **세이브** | 진행을 디스크에 어떻게 나누·복구하는가 | Main·Side·Meta, Side vs Backup |
| **데이터** | 고정 정의를 어디서 고치고 빌드에 어떻게 굳히는가 | Excel→JSON, Facade |
| **폰트** | TMP·로컬라이즈 글리프·워밍업 | Static atlas, warmup |
| **최적화** | 로드·렌더·GPU 비용 | Stage preload, 비주얼 |
| **출시** | 팀·스코프로 어디까지 지켰는가 | 소유 경계 회고 |
| **내러티브** | 세계관·대사·설정 소유와 직군 경계 | 프로그래머가 내러티브를 작성할 수 있었던 회고 |

- 애매하면 **시리즈 소속**을 따릅니다. 시리즈를 분류 축으로 쪼개지 않습니다.
- 필터 목록은 `notes/index.md`의 `filter_categories`에서 관리합니다. 목록 UI는 **왼쪽 사이드바**(분류 · 프로젝트). 분류는 허용 목록 순서이되 **그 태그를 단 노트가 있을 때만** 버튼을 냅니다. 프로젝트 필터는 그룹 제목 없이, **노트에 `project:`가 있는** `projects/` 페이지만 회사 `order` → 개인 `order`로 나열합니다. 분류와 프로젝트는 **AND**입니다. 페이지당 글 수는 `notes_page_size`(기본 5)이며 `<< < 1 2 … > >>` 페이지네이션을 씁니다.
- 노트 본문 하단 **이전 글 / 다음 글**은 **공개 노트 전체**에서 `/notes/` 기본 목록과 같은 정렬(date 최신순 · `series`·`series_order` tie-break)입니다. 이전 = 목록에서 위, 다음 = 아래. 라벨 분류는 **상대 글**의 `tags`. 시리즈 형제는 `series_nav`(`note-series-nav`)와 별개입니다. `/notes/` 분류·프로젝트 필터와 무관합니다.

### 주 프로젝트 (`project`)

글당 **0개 또는 1개**. 값은 `projects/<슬러그>/` permalink와 같은 슬러그입니다. 회사/개인 구분은 notes가 아니라 그 페이지의 `project_kind`입니다.

고르는 질문: **이 글이 증명하는 페이지가 어디인가.** 본문에서 다른 타이틀·OSS를 링크하는 것은 그대로입니다.

- **있으면:** 그 프로젝트 페이지 **관련 노트**와 `/notes/` 프로젝트 필터에 포함합니다. 필터에서 해당 버튼을 고르면 이 글이 남습니다. 노트 **h1 아래** 표시는 아래 「제목 아래 프로젝트 링크」.
- **없으면:** 분류만 있는 글입니다. 여러 타이틀을 동등하게 다루는 회고 등. 프로젝트 필터·프로젝트 페이지 자동 목록에는 넣지 않습니다. 제목 아래 프로젝트 줄도 두지 않습니다. 타이틀 페이지에서는 본문 링크로 안내합니다.

시리즈는 가능하면 같은 `project`를 씁니다. **세이브 레이아웃**은 예외입니다. 1편은 출시 세이브(`dragon-is-dead`), 2·3편은 레이아웃 계약(`save-layout`).

| 슬러그 | `project_kind` |
|--------|----------------|
| `dragon-is-dead` | company |
| `blade-assault` | company |
| `save-layout` | personal |
| `conditional-log` | personal |
| `tmp-font-pipeline` | personal |
| `studio-kit` | personal |

공개·비공개는 `tags`만 봅니다. `project`는 공개 축이 아닙니다.

#### 제목 아래 프로젝트 링크

`project`가 있으면 노트 h1 아래에 `프로젝트 : 드래곤 이즈 데드`처럼 표시합니다. `프로젝트 :` 는 라벨, 제목만 링크입니다.

- 라벨 `프로젝트 :` 는 텍스트, 제목만 `projects/<슬러그>/` 링크
- 제목은 `projects/<슬러그>.md`의 `title`(한글). `_includes/list-subtitle.html`로 라틴 병기 `(English)`가 남아 있으면 제거
- 링크는 본문 인라인과 같이 **항상 underline** (`.post-project a`)
- `/notes/` 목록 킥커는 제목만 링크하고 `프로젝트 :` 접두는 두지 않음
- 구현: `_layouts/page.html` · `_includes/note-project-link.html` · `_includes/section-index-list.html`(프로젝트 목록 h3)

### 시리즈

- `series`(슬러그)·`series_title`·`series_order`·`series_total`을 넣습니다.
- `title`은 이 편의 **무엇을/왜**만. `{series_title} {n}/{total}` 접두를 붙이지 않습니다. reviews `subtitle`도 쓰지 않습니다.
- 세트임은 FM으로 두고, 목록·페이지에 킥커로 표시합니다.
- 날짜가 같으면 목록 정렬 tie-break로 같은 `series`끼리 `series_order` 오름차순(1→N)입니다.
- How 세트와 Why 시리즈는 `series` 슬러그를 다르게 둡니다 (예: `combat-presence` / `combat-reaction`).
- 시리즈 노트는 `series_nav: true`를 둡니다.
- **본문 내비 위치:** `**구조 노트:**`(해당 시, 시리즈 밖 How 세트) · 수동 `**시리즈:**`·`**구조:**` 줄은 `series_nav`로 대체. lead·맥락·다이어그램 **위가 아니라** 본문 **하단**(보통 `## 정리` 다음)에 두던 **권장 읽기**는 `series_nav`·이전/다음에 맡기고 **두지 않습니다**. 첫 화면은 주제·도식에 쓰고, 형제·발행 순은 하단 UI에 둡니다.

#### 시리즈 킥커

`series`가 있으면 `{series_title} {n}/{total}`을 표시합니다 (예: `세이브 레이아웃 1/3`).

- **노트 h1 아래:** `시리즈 : 세이브 레이아웃 1/3`. `시리즈 :` 는 라벨, 나머지 텍스트. 링크 없음(형제 목록은 `series_nav`). `project`가 있으면 **시리즈 다음**에 `프로젝트 : …`.
- **`/notes/` 목록 킥커:** `세이브 레이아웃 1/3`만. `시리즈 :` 접두는 두지 않음. 순서: 분류 → 시리즈 → 프로젝트 → 날짜.
- 구현: `_layouts/page.html` · `_includes/section-index-list.html` (프로젝트 킥커와 같은 자리)

#### 시리즈 목록 (자동)

`series_nav: true`이면 본문 **아래**·이전/다음 **위**에 같은 `series` 형제 목록을 냅니다 (`_includes/note-series-nav.html`). 각 항목: `series_order` · `title` · `excerpt` · 현재 편 강조. **권장 읽기**·수동 `**시리즈:**` 줄은 두지 않습니다.

#### `## 이 글에서 다루지 않는 것` (시리즈)

`series_nav: true`이면 **같은 `series` 형제**를 표에 넣지 않습니다. 편 분할은 lead·`series_nav`가 담당합니다. 표에는 **시리즈 밖**만 — 다른 분류·전투 층·UI·Architecture·NDA·후속 과제·아직 없는 노트 등.

본문 골격: [`templates/note-problem.md`](templates/note-problem.md) · [`templates/note-series.md`](templates/note-series.md).

### Mermaid

- **정본:** `notes/<슬러그>.md` 본문 ` ```mermaid ` 블록. Cursor·에이전트가 여기에 직접 작성한다.
- **렌더:** `mermaid: true`인 note만 `assets/js/mermaid-notes.js` (Mermaid 11, `securityLevel: strict`).
- **init:** `%%{init:…}%%`는 사이트에서 strip — 테마·스타일은 사이트 light/dark에 맡긴다. init에 의존하지 않는다.
- **캡션:** 블록 **위** 짧은 제목(`**한 이야기**`), **아래** 1–2문장 또는 callout. lead·인접 문단과 제목 중복 금지.
- **위치:** lead 직후 고정 아님 — 설명하는 절 옆. 작성·Cursor 요청: [`templates/mermaid-diagram.md`](templates/mermaid-diagram.md).
- **긴 코드 접기:** 노트 개별 글에서 8줄 이상 fenced 블록은 `assets/js/code-collapse.js`가 기본 접힘. Mermaid·짧은 스니펫은 제외.

| notes 도식 둘 곳 | 맞는 경우 |
|------------------|-----------|
| `## 해결` 초입 | 문제 해결 노트에서 목표 경계·`≠` 구조를 그릴 때 (증상 상태가 아님) |
| `## 맥락` / 축·용어 표 직후 | 용어를 소개한 뒤 한 장으로 고정할 때 |
| lead 직후 | 시리즈 1편처럼 **지도가 입구**이고 라벨이 lead만으로 읽힐 때 |
| 피함 | `## 문제`에 해결 구조도를 두기 (현재 증상으로 오해), `## 정리`·권장 읽기·시리즈 내비 옆 |

## reviews

### Front matter

```yaml
---
layout: page
title: 짧은 훅·제목
subtitle: 할로우 나이트 리뷰
permalink: /reviews/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
---
```

- `reviews/<슬러그>.md`를 추가하면 `reviews/index.md` 목록에 자동으로 포함됩니다 (`date` 최신순).
- `subtitle`(선택): 본문 h1 아래·목록 제목 아래에 표시. `title`에 `—` 부제를 붙이지 말고 이 필드를 씁니다.
- notes `tags`·`project`·projects `project_kind`와 별개. 분류 필터는 두지 않습니다.
- 이미지(선택): `assets/images/reviews/<슬러그>/` — `cover.*` · `ss-*` 규칙은 projects와 동일 취지. 본문 캐러셀: `{% include screenshot-carousel.html dir="assets/images/reviews/<슬러그>/" title="…" %}`

## projects

### Front matter

- `title`: **한글** 짧은 이름. 영문 공식명 `(English)` 병기는 쓰지 않는다. Steam 등 외부 링크·본문 첫 언급에서 확인 가능
- `project_kind`: `company`(회사 소속 출시) | `personal`(개인 OSS·케이스 스터디). `/projects/` 목록을 두 섹션으로 나눕니다. 본문 골격: [`templates/project-company.md`](templates/project-company.md) · [`templates/project-personal.md`](templates/project-personal.md)
- `private`: `true`면 production `/projects/` 목록에서 제외. 로컬 serve는 footer **비공개** 토글(기본 숨김, `localStorage`). permalink는 항상 빌드.
- `order`: 목록을 `order`로 정렬할 때 사용 (작을수록 앞). `/projects/` 회사·개인 섹션은 `date` 최신순
- `role`: 목록 메타 (권장)

### 이미지

경로: `assets/images/projects/<슬러그>/`

- 소문자 · kebab-case · ASCII만
- Steam 해시·해상도 접미사(`.1920x1080` 등) 금지
- 대표: `cover.jpg` (또는 `cover.webp`) — projects 목록 썸네일
- **개념도:** 본문 live Mermaid (`mermaid: true`). 목록·캐러셀용 PNG는 **두지 않음** — `cover`/`ss-*`가 없으면 목록은 텍스트만 (`section-index-list`).
- **기본 (실기 UI·Demo):** `ss-01.jpg`, `ss-02.jpg`, … (두 자리 번호, 표시 순서)
- **선택 — 캐러셀용 개념 PNG:** 실기 캡처와 **같이** 둘 때만 notes와 **같은** Mermaid를 dark 테마로 export → `ss-01-dark.png`. 정본이 아니며 Mermaid 수정 시 재export. `.mmd` 단독 정본은 두지 않는다. **Mermaid만 있는 글은 export하지 않음.**
- 개념 PNG + 실기 캡처를 같이 두면 개념 PNG를 `ss-01-dark.png`, 캡처를 `ss-02.jpg`… (캐러셀은 `ss-*` 이름순)
- 설명형 이름이 필요하면 `combat-01.jpg`처럼 역할 + 번호
- 폴더에 실제 이미지가 있으면 `.gitkeep` 제거
- 목록 썸네일: `cover.*` 우선, 없으면 첫 `ss-*` (`section-index-list`, projects · reviews)
- 캐러셀: `{% include screenshot-carousel.html slug="<슬러그>" %}` — `ss-*`를 이름순으로 Steam식 미리보기. `youtube`(video id)가 있으면 캐러셀 위에 임베드 (`start` 초 선택). `steam`(스토어 URL)이 있으면 임베드 바로 아래(없으면 캐러셀 위)에 Steam 링크
- **company** (`project_kind: company`): 히어로는 실기 스크린샷 유지. Mermaid로 대체하지 않는다.

#### 기존 게시물 (2026-09 이전)

- 이미 올라간 `ss-*-dark.png`·note Mermaid는 **그대로 둔다**. 정본 이전·PNG 삭제는 글 수정 시에만.
- 신규·대폭 개정부터 위 규칙과 notes 「Mermaid」를 따른다.

## 규칙 추가

- 이 파일에 요지를 추가하고 `AGENTS.md`에서 링크합니다
