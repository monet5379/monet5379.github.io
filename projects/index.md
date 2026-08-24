---
layout: page
title: 프로젝트(Projects)
permalink: /projects/
date: 2026-07-22
excerpt: "참여 프로젝트와 내 기여를 모아 둡니다."
---

참여 프로젝트와 내 기여를 모아 둡니다.

타임라인·회사별 요약은 [경력]({{ "/career/" | relative_url }})을 참고하세요.

{% if jekyll.environment != "production" %}
{% assign section_dir = "projects/" %}
{% assign section_sort = "order" %}
{% assign render_private_toggle = true %}
{% assign render_section_list = false %}
{% include section-index-list.html %}
{% assign render_private_toggle = false %}
{% assign render_section_list = true %}
{% endif %}

## 회사 소속 출시

팀에 소속된 상태에서 Steam 등으로 출시한 타이틀입니다.

{% assign section_dir = "projects/" %}
{% assign section_sort = "order" %}
{% assign section_filter_kind = "company" %}
{% include section-index-list.html %}

## 개인

타이틀 경험을 바탕으로 게임 밖에서 정리한 OSS·케이스 스터디입니다.

{% assign section_dir = "projects/" %}
{% assign section_sort = "order" %}
{% assign section_filter_kind = "personal" %}
{% include section-index-list.html %}
