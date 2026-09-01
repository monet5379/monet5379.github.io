# 사이트 콘텐츠·운영 규칙

게시 규약(front matter·공개·이미지·커밋). 글의 유형·목차·톤은 [`writing-guide.md`](writing-guide.md). 채우기 골격은 [`templates/`](templates/).

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
- `title` 짧게 · 부제(`—`) 금지
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
tags: [엔진]
---
```

시리즈·구조 세트일 때 (선택):

```yaml
title: 전투 경계 1/5 네 층으로 나눈 이유
series: combat-boundaries
series_title: 전투 경계
series_order: 1
series_total: 5
```

```yaml
title: 전투 구조 1/4 Hitmark 타격 정의
series: combat-structure
series_title: 전투 구조
series_order: 1
series_total: 4
```

- `notes/<슬러그>.md`를 추가하면 `notes/index.md` 목록에 자동으로 포함됩니다 (`date` 최신순. 같은 날짜는 `series`·`series_order` tie-break).
- **공개·비공개:** `_config.yml` `notes_production_visible_tags`에 있는 분류만 공개입니다. GitHub Pages 목록에는 공개 글만 들어갑니다. 로컬(`jekyll serve`)은 비공개 글도 HTML에 넣고, footer **비공개: 숨김/표시** 토글로 가립니다(기본 숨김, `localStorage`에 유지). 개별 permalink는 환경과 무관하게 빌드됩니다. 프로젝트 본문의 비공개 노트 링크도 같은 토글을 씁니다 (`data-private-notes`).

### 분류 (`tags`)

목록 **분류** 필터용. 글당 **정확히 1개**만 둡니다.

| 분류 | 질문 | 예 |
|------|------|-----|
| **전투** | 맞힌 뒤 무엇이 일어나는가 | Skill·Hitmark·Buff·Passive |
| **액션** | 이 프레임의 의도는 누가 실행하는가 | Command·게이트·Room·Wave·보스 |
| **성장** | 이번 세션이 무엇을 들고 전투에 붙는가 | Core·Gear·Risk·Trait |
| **엔진** | 비용을 언제·어디서 치르는가 | Conditional 로그 등 |
| **세이브** | 진행을 디스크에 어떻게 나누·복구하는가 | Main·Side·Meta, Side vs Backup |
| **폰트** | TMP·로컬라이즈 글리프·워밍업 | Static atlas, warmup |
| **최적화** | 로드·렌더·GPU 비용 | Stage preload, 비주얼 |
| **출시** | 팀·스코프로 어디까지 지켰는가 | 소유 경계 회고 |
| **내러티브** | 세계관·대사·설정 소유와 직군 경계 | 프로그래머가 내러티브를 작성할 수 있었던 회고 |

- 프로젝트(Dragon is Dead, Blade Assault)는 태그가 아니라 본문·프로젝트 링크로만 표시합니다.
- 애매하면 **시리즈 소속**을 따릅니다. 시리즈를 분류 축으로 쪼개지 않습니다.
- 필터 목록은 `notes/index.md`의 `filter_categories`에서 관리합니다. 목록 UI는 **왼쪽 분류 사이드바**입니다. 페이지당 글 수는 `notes_page_size`(기본 5)이며 `<< < 1 2 … > >>` 페이지네이션을 씁니다.

### 시리즈

- `series`(슬러그)·`series_title`·`series_order`·`series_total`을 넣습니다.
- `title` 앞에 `{series_title} {n}/{total}`을 붙여 목록·페이지 제목에서 세트임을 보이게 합니다.
- 날짜가 같으면 목록 정렬 tie-break로 같은 `series`끼리 `series_order` 오름차순(1→N)입니다.
- How 세트와 Why 시리즈는 `series` 슬러그를 다르게 둡니다 (예: `combat-structure` / `combat-boundaries`).
- **본문 내비 위치:** `**권장 읽기** —` · `**시리즈: …**` · `**구조 노트:**` 는 lead·맥락·다이어그램 **위가 아니라** 본문 **하단**(보통 `## 정리` 다음)에 둡니다. 첫 화면은 주제·도식에 쓰고, 형제 링크는 읽은 뒤에 둡니다.

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
- notes `tags`·projects `project_kind`와 별개. 분류 필터는 두지 않습니다.
- 이미지(선택): `assets/images/reviews/<슬러그>/` — `cover.*` · `ss-*` 규칙은 projects와 동일 취지. 본문 캐러셀: `{% include screenshot-carousel.html dir="assets/images/reviews/<슬러그>/" title="…" %}`

## projects

### Front matter

- `project_kind`: `company`(회사 소속 출시) | `personal`(개인 OSS·케이스 스터디). `/projects/` 목록을 두 섹션으로 나눕니다. 본문 골격: [`templates/project-company.md`](templates/project-company.md) · [`templates/project-personal.md`](templates/project-personal.md)
- `private`: `true`면 production `/projects/` 목록에서 제외. 로컬 serve는 footer **비공개** 토글(기본 숨김, `localStorage`). permalink는 항상 빌드.
- `order`: 목록을 `order`로 정렬할 때 사용 (작을수록 앞). `/projects/` 회사·개인 섹션은 `date` 최신순
- `role`: 목록 메타 (권장)

### 이미지

경로: `assets/images/projects/<슬러그>/`

- 소문자 · kebab-case · ASCII만
- Steam 해시·해상도 접미사(`.1920x1080` 등) 금지
- 대표: `cover.jpg` (또는 `cover.webp`) — projects 목록 썸네일
- **기본:** 실기 UI·Demo 캡처 `ss-01.jpg`, `ss-02.jpg`, … (두 자리 번호, 표시 순서)
- **개념도:** notes에 live Mermaid로 둔다 ([`templates/mermaid-diagram.md`](templates/mermaid-diagram.md)). 프로젝트 본문·개요·연관에서 해당 note 링크.
- **선택 — 캐러셀/목록용 개념 PNG:** notes와 **같은** Mermaid를 dark 테마로 export → `ss-01-dark.png`. 정본이 아니며 notes 수정 시 재export. `.mmd` 단독 정본은 두지 않는다.
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
