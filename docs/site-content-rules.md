# 사이트 콘텐츠·운영 규칙

게시 규약(front matter·공개·이미지·커밋). 글의 유형·목차·톤은 [`writing-guide.md`](writing-guide.md). 채우기 골격은 [`templates/`](templates/).

## 커밋

- 제목·본문: 한글
- 의미 있는 한 문장으로 무엇을 왜 바꿨는지 적습니다
- 사이트 콘텐츠와 `docs`/설정 변경은 커밋을 분리합니다

## 공개 범위

- NDA·비공개 수치·내부명 금지
- 회사·프로젝트 실명은 본인이 허용한 범위만 사용합니다

## Studio

- Intem Studio 글 전문 복제 금지
- 필요 시 링크만 연결합니다

## 공통 front matter

`career` · `projects` · `notes` 페이지:

- `date`, `excerpt` 필수
- `title` 짧게 · 부제(`—`) 금지
- `excerpt` = 본문 lead
- 상단 nav·본문 h1용 카테고리 `title`은 **한글(English)** (예: `경력(Career)`)

`projects/` · `notes/` 목록은 `_includes/section-index-list.html`로 자동 생성 (`index.md` 제외).

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
| **폰트** | TMP·로컬라이즈 글리프·워밍업 | Static atlas, warmup |
| **최적화** | 로드·렌더·GPU 비용 | Stage preload, 비주얼 |
| **출시** | 팀·스코프로 어디까지 지켰는가 | 소유 경계 회고 |

- 프로젝트(Dragon is Dead, Blade Assault)는 태그가 아니라 본문·프로젝트 링크로만 표시합니다.
- 애매하면 **시리즈 소속**을 따릅니다. 시리즈를 분류 축으로 쪼개지 않습니다.
- 필터 목록은 `notes/index.md`의 `filter_categories`에서 관리합니다. 목록 UI는 **왼쪽 분류 사이드바**입니다. 페이지당 글 수는 `notes_page_size`(기본 5)이며 `<< < 1 2 … > >>` 페이지네이션을 씁니다.

### 시리즈

- `series`(슬러그)·`series_title`·`series_order`·`series_total`을 넣습니다.
- `title` 앞에 `{series_title} {n}/{total}`을 붙여 목록·페이지 제목에서 세트임을 보이게 합니다.
- 날짜가 같으면 목록 정렬 tie-break로 같은 `series`끼리 `series_order` 오름차순(1→N)입니다.
- How 세트와 Why 시리즈는 `series` 슬러그를 다르게 둡니다 (예: `combat-structure` / `combat-boundaries`).

본문 골격: [`templates/note-problem.md`](templates/note-problem.md) · [`templates/note-series.md`](templates/note-series.md).

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
- 스크린샷: `ss-01.jpg`, `ss-02.jpg`, … (두 자리 번호, 표시 순서)
- 설명형 이름이 필요하면 `combat-01.jpg`처럼 역할 + 번호
- 폴더에 실제 이미지가 있으면 `.gitkeep` 제거
- 목록 썸네일: `cover.*` 우선, 없으면 첫 `ss-*` (`section-index-list`, projects만)
- 캐러셀: `{% include screenshot-carousel.html slug="<슬러그>" %}` — `ss-*`를 이름순으로 Steam식 미리보기

## 규칙 추가

- 이 파일에 요지를 추가하고 `AGENTS.md`에서 링크합니다
