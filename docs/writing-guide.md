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

- `notes/<슬러그>.md`를 추가하면 `notes/index.md` 목록에 자동으로 포함됩니다 (기본 `date` 최신순, 목록에서 오래된 순 전환 가능).
- `tags`는 목록 필터용입니다. front matter는 한 배열로 두고, 목록 UI만 Project / Topic으로 나눕니다.
  - 프로젝트에서 진행한 내용이면 프로젝트 태그 **1개** (`DragonIsDead`, `BladeAssault`) → `filter_projects`.
  - 주제 태그는 글 내용에 맞게 **2~4개** (영문 PascalCase, 예: `Performance`, `TMP`) → `filter_topics`.
  - 기존 태그를 우선 재사용하고, 새 태그는 `notes/index.md`의 해당 `filter_*`에도 추가합니다.
- 필터 칩은 `notes/index.md`의 `filter_projects` / `filter_topics`에서 관리합니다. 각 행은 **하나만** 선택하며, Project와 Topic을 같이 고르면 **둘 다 포함한** 글만 보입니다.
- 날짜 정렬 UI는 `notes/index.md`의 `show_sort_filter`로 켭니다.
