---
layout: page
title: Notes
permalink: /notes/
date: 2026-07-22
excerpt: "개인 공개 기술 노트. 회고·짧은 팁·포트폴리오를 보완하는 글을 모읍니다."
---

개인 공개 기술 노트. 회고·짧은 팁·포트폴리오를 보완하는 글을 모읍니다.

## 글 목록

{% assign section_dir = "notes/" %}
{% assign section_sort = "date" %}
{% assign show_tag_filter = true %}
{% assign show_sort_filter = true %}
{% assign filter_projects = "DragonIsDead|BladeAssault" | split: "|" %}
{% assign filter_topics = "Architecture|Build|Lighting|Loading|Localization|Logging|Performance|Rendering|TMP" | split: "|" %}
{% include section-index-list.html %}
