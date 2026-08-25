---
layout: page
title: Blade Assault
permalink: /projects/blade-assault/
date: 2022-01-18
order: 20
project_kind: company
role: 전체 프로그래밍
excerpt: "기획 1 · 아트 2 · 프로그래머 1 규모 팀에서 전체 프로그래밍을 담당해 Steam에 출시한 액션 게임입니다."
---


기획 1 · 아트 2 · 프로그래머 1 규모 팀에서 전체 프로그래밍을 담당해 Steam에 출시한 액션 게임입니다.

{% include screenshot-carousel.html slug="blade-assault" %}

## 개요

- 착수: 2019.03.12 퇴사 직후. 이후 휴지·타사 재직과 병행하며 개발
- 기간: 2020.02.10 – 2022.01.22 (팀써니트 설립 후 본격 개발·출시)
- 플랫폼: Steam (PC)
- 팀 규모: 기획 1 · 아트 2 · 프로그래머 1
- 내 역할: 전체 프로그래밍
- 성과: 경기게임오디션 3위, BIC 참가, 2021.06.06 얼리 액세스 발매, 2022.01.18 정식 출시

## 기여

- 2019.03 착수 후 휴지·타사 재직과 병행하다, 팀써니트를 만들며 본격 개발로 전환했습니다.
- 프로그래머 단독으로 클라이언트 전 영역(게임플레이·UI·세이브·빌드·출시)을 구현·유지했습니다.
- 런 빌드(Core·Gear·개조·Risk), 액션 척추(Command·게이트·무기 hitmark), 스테이지 루프(Room·미션·Progress), 메타(Trait·부활)를 소유 경계로 나눠, 콘텐츠를 늘릴 때 회귀 범위를 가늠할 수 있게 했습니다.
- 얼리 액세스 피드백을 «빌드 쪽 / 손맛(게이트·무기) 쪽»으로 가른 뒤 정식 출시까지 반영했습니다.

## 담당 시스템

{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

입구: [솔로 출시에서 지킨 경계]({{ "/notes/ba-solo-boundaries/" | relative_url }})

</div>
{% endif %}

### 런 빌드

세션에 «무엇을 장착했는가»를 두고, 타격 파이프라인과 수치 복제를 갈랐습니다.

- Core: 런 세션 소유. Buff·Passive·(필요 시) Hyper 실행으로만 전투에 반영. 피해 식·무기 hitmark는 두지 않음
- Gear: 획득 즉시 Buff/Passive 또는 Active로 반영. 일부는 Core 레벨 신호로만 넘김
- 무기 개조: Core·Gear와 다른 세션. 반영은 무기 Buff/Passive로 모음
- Risk: 이번 스테이지·런의 위험 덱. 캐릭터 Trait와 같은 Add API를 쓰지 않음

{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

- 관련 notes: [1/4 Core]({{ "/notes/ba-run-core/" | relative_url }}) · [2/4 Gear]({{ "/notes/ba-run-gear/" | relative_url }}) · [3/4 개조]({{ "/notes/ba-run-enhance/" | relative_url }}) · [4/4 Risk]({{ "/notes/ba-run-risk/" | relative_url }})

</div>
{% endif %}

### 액션 척추

한 프레임 의도 → 가능 여부 → 타격을 Player·AI가 같은 순서로 타게 했습니다.

- Command: 디바이스 입력을 프레임 의도 버스로 모음. 키 바인드·피해 식은 두지 않음
- 게이트: 대시·스킬·차지·탄약 가능 여부를 Command 밖에 둠
- 무기 hitmark 슬롯: Attack·공중·차지·스킬·대시 타격을 카탈로그로 모음
- 보스: phase·패턴·step이 전용 행동 트리 대신 기존 Command를 밀게 둠

{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

- 관련 notes: [1/3 Command]({{ "/notes/ba-action-command/" | relative_url }}) · [2/3 게이트]({{ "/notes/ba-action-gates/" | relative_url }}) · [3/3 무기 슬롯]({{ "/notes/ba-action-weapon/" | relative_url }}) · [보스]({{ "/notes/ba-boss-pattern/" | relative_url }})

</div>
{% endif %}

### 스테이지 루프

스테이지 수명과 방 안 전투 루프·목표·진행 플래그를 나눴습니다.

- Stage: 입장·플레이어 스폰·포트·스테이지 열림/닫힘
- Room·Wave: 방 전투 시작 → 웨이브 → 종료. 일반·섬멸·보스 방이 같은 골격 위에서만 갈림
- 미션: 목표 HUD·씬 콜백을 중앙 매니저 없이 이벤트 계약·씬 배선으로 둠
- Progress: 스테이지·전투·보상 수령 플래그로 지난 구간을 다시 열지 않음

{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

- 관련 notes: [1/3 Room]({{ "/notes/ba-stage-room/" | relative_url }}) · [2/3 미션]({{ "/notes/ba-stage-mission/" | relative_url }}) · [3/3 Progress]({{ "/notes/ba-stage-progress/" | relative_url }})

</div>
{% endif %}

### 메타

런 위험(Risk)과 캐릭터 정체성·부활을 다른 세션으로 뒀습니다.

- Trait: 캐릭터 프리셋·해금 축. Risk 덱과 섞지 않음
- 부활: 충전·사망 경로를 런 종료와 가름

{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

- 관련 notes: [Trait·부활]({{ "/notes/ba-trait-resurrection/" | relative_url }})

</div>
{% endif %}

## 스택

Unity, C#

## 링크

### 외부

- [Steam](https://store.steampowered.com/app/1367300/Blade_Assault/)
- [YouTube](https://youtu.be/uV-fWC5zbfw?si=6V-LhUHCYGCOzR3C)

{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

### 내부

- [솔로 출시에서 지킨 경계]({{ "/notes/ba-solo-boundaries/" | relative_url }})

</div>
{% endif %}
