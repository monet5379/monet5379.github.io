---
layout: page
title: 프로젝트
permalink: /projects/
date: 2026-07-22
excerpt: "참여 프로젝트와 내 기여를 모아 둡니다."
---

참여 프로젝트와 내 기여를 모아 둡니다.
타임라인·회사별 요약은 [홈의 경력]({{ "/#경력" | relative_url }})을 참고하세요.

## 회사 소속 출시

팀에 소속된 상태에서 Steam 등으로 출시한 타이틀입니다.

{% assign section_dir = "projects/" %}
{% assign section_sort = "date" %}
{% assign section_filter_kind = "company" %}
{% include section-index-list.html %}

## 개인

타이틀 경험을 바탕으로 게임 밖에서 정리한 OSS·케이스 스터디입니다.

{% assign section_dir = "projects/" %}
{% assign section_sort = "date" %}
{% assign section_filter_kind = "personal" %}
{% include section-index-list.html %}
