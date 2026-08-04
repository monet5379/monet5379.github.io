# 글쓰기 가이드 (notes)

## 독자

- 채용 검토자·외부 개발자

## 톤

- 합니다체
- 1인칭 허용

## Front matter

```yaml
---
layout: page
title: 짧은 제목
permalink: /notes/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [DragonIsDead, Performance, Rendering]
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
- `tags`는 목록 필터용입니다. front matter는 한 배열로 두고, 목록 UI만 Project / Topic으로 나눕니다.
  - 프로젝트에서 진행한 내용이면 프로젝트 태그 **1개** (`DragonIsDead`, `BladeAssault`) → `filter_projects`.
  - 주제 태그는 글 내용에 맞게 **2~4개** (영문 PascalCase, 예: `Performance`, `TMP`) → `filter_topics`.
  - 기존 태그를 우선 재사용하고, 새 태그는 `notes/index.md`의 해당 `filter_*`에도 추가합니다.
- 필터는 `notes/index.md`의 `filter_projects` / `filter_topics`에서 관리합니다. 목록 UI는 **왼쪽 Topic 사이드바**, 위쪽 **Project·Sort 칩**입니다. 각 축은 **하나만** 선택하며, Project와 Topic을 같이 고르면 **둘 다 포함한** 글만 보입니다.
- 날짜 정렬 UI는 `notes/index.md`의 `show_sort_filter`로 켭니다.
- **시리즈/구조 세트:** `series`(슬러그)·`series_title`·`series_order`·`series_total`을 넣습니다. `title` 앞에 `{series_title} {n}/{total}`을 붙여 목록·페이지 제목에서 세트임을 보이게 합니다. 날짜가 같으면 목록 정렬 tie-break로 같은 `series`끼리 `series_order` 오름차순(1→N)입니다. How 세트와 Why 시리즈는 `series` 슬러그를 다르게 둡니다 (예: `combat-structure` / `combat-boundaries`).
