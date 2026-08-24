# 글쓰기 가이드

notes · projects 공통. Jekyll front matter·분류 규칙과, 글 한 편의 **유형·목차** 기준.

참고: [토스 테크니컬 라이팅](https://technical-writing.dev/overview.html) — 문서 유형·정보 구조·문장 원칙. 본 가이드는 개인 포트폴리오에 맞게 축약했으며, 토스 가이드는 **권장**이지 전부 따를 필요는 없다.

## 독자

- 채용 검토자·외부 개발자

## 톤

- 합니다체
- 1인칭 허용

## 페이지 역할

| 경로 | 한 페이지의 목적 | API·설치 정본 |
|------|------------------|---------------|
| **projects/** | 무엇을 만들었는지, 내 기여, 타 프로젝트와 차이 | GitHub README (있을 때) |
| **notes/** | 왜 그렇게 설계했는지, 경계·기각·출시에서 지킨 것 | 본문 + projects·README 링크 |

한 주제를 projects와 notes에 나눌 때: **케이스 스터디(projects)** 와 **설계 회고(notes)** 로 역할을 겹치지 않게 둔다.

## 정보 구조 (공통)

토스 [정보 구조](https://technical-writing.dev/information-architecture/introduction.html)에서 이 사이트에 쓰는 것만:

- **가치를 먼저** — `excerpt`와 본문 첫 문단(lead)을 동일하게. 목록·검색에서 “이 글이 뭘 주는지”가 바로 보이게.
- **개요를 빼지 않기** — lead 다음에 `맥락` 또는 `개요`로 배경·전제를 짧게.
- **한 페이지 한 주제** — notes는 `tags` 1개, 시리즈는 Why(경계) / How(구조)처럼 **목적이 다른** 세트로만 묶는다.
- **예측 가능한 목차** — 아래 [유형별 권장 목차](#유형별-권장-목차)를 기본으로, 필요한 섹션만 추가·생략.

제목: [효과적인 제목](https://technical-writing.dev/information-architecture/effective-titles.html) — **무엇을 / 왜**가 드러나게. `title`에 부제(`—`)는 쓰지 않는다 (`AGENTS.md`).

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

## 유형별 권장 목차

고정 템플릿이 아니라 **기본 골격**. 글에 맞게 섹션을 빼거나 이름을 바꿔도 된다.

### notes — 문제 해결

1. lead (`excerpt`와 동일)
2. 맥락 (프로젝트·전제 링크)
3. 문제 (증상·원인 표)
4. 해결 (설계·동작)
5. 기각·보류 (선택)
6. 확인 포인트 (선택)
7. 정리 (한 줄, 선택)

### notes — 깊은 이해 / 시리즈

1. lead
2. 맥락 (시리즈면 **권장 읽기**·형제 링크)
3. 핵심 (표·다이어그램·경계)
4. 기각·보류 / 출시에서 지킨 것 (해당 시)
5. 정리 또는 다음 편 링크

시리즈 1편은 **지도** 역할 — 전체 구조·읽기 순서를 먼저 준다.

### projects — 케이스 스터디

1. lead
2. 개요 (형태·역할·연관 링크)
3. 문제
4. 설계 (한 줄 요약 + 표)
5. 타 프로젝트·Dragon과의 차이 (해당 시)
6. 이 프로젝트가 아닌 것
7. 계보 · 스택 · 링크

## Front matter (notes)

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

- `notes/<슬러그>.md`를 추가하면 `notes/index.md` 목록에 자동으로 포함됩니다 (기본 `date` 최신순, 목록에서 오래된 순 전환 가능).
- **공개·비공개:** `_config.yml` `notes_production_visible_tags`에 있는 분류만 공개입니다. GitHub Pages 목록에는 공개 글만 들어갑니다. 로컬(`jekyll serve`)은 비공개 글도 HTML에 넣고, 목록 위 **비공개: 숨김/표시** 토글로 가립니다(기본 숨김, `localStorage`에 유지). 개별 permalink는 환경과 무관하게 빌드됩니다.
- `tags`는 목록 **분류** 필터용입니다. 글당 **정확히 1개**만 둡니다.

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
- 필터 목록은 `notes/index.md`의 `filter_categories`에서 관리합니다. 목록 UI는 **왼쪽 분류 사이드바**, 위쪽 **정렬**입니다.
- 날짜 정렬 UI는 `notes/index.md`의 `show_sort_filter`로 켭니다.
- **시리즈/구조 세트:** `series`(슬러그)·`series_title`·`series_order`·`series_total`을 넣습니다. `title` 앞에 `{series_title} {n}/{total}`을 붙여 목록·페이지 제목에서 세트임을 보이게 합니다. 날짜가 같으면 목록 정렬 tie-break로 같은 `series`끼리 `series_order` 오름차순(1→N)입니다. How 세트와 Why 시리즈는 `series` 슬러그를 다르게 둡니다 (예: `combat-structure` / `combat-boundaries`).
