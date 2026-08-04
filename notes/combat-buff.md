---
layout: page
title: 전투 구조 4/4 Buff 지속 상태
permalink: /notes/combat-buff/
date: 2026-08-04
excerpt: "스택·지속 시간·상태이상·스탯과 주기 트리거를 다루는 Buff 층의 구조를 정리합니다."
tags: [DragonIsDead, Architecture, Combat]
series: combat-structure
series_title: 전투 구조
series_order: 4
series_total: 4
---


스택·지속 시간·상태이상·스탯과 주기 트리거를 다루는 Buff 층의 구조를 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투에서 담당한 Buff(지속 상태) 층입니다. 네 층 지도·Why는 [전투 경계 시리즈]({{ "/notes/combat-four-layers/" | relative_url }})·[시리즈 4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }})을, Passive How는 [Passive]({{ "/notes/combat-passive/" | relative_url }})를, 도트 피해는 [Hitmark]({{ "/notes/combat-hitmark/" | relative_url }})로 넘깁니다. 이 글은 **구조와 런타임 흐름**에 초점을 둡니다.

**권장 읽기:** 구조(How) 1→4 후 [경계]({{ "/notes/combat-four-layers/" | relative_url }})(Why) 1→5

**구조:** [1 Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) · [2 Skill]({{ "/notes/combat-skill/" | relative_url }}) · [3 Passive]({{ "/notes/combat-passive/" | relative_url }}) · **4**

## 맥락

독·빙결·공격력 버프처럼 캐릭터에 **붙어 있는 동안** 의미가 있는 효과가 있습니다. 사건마다 새로 판정하는 규칙(Passive)과 겉보기는 비슷해도, 수명은 스택·지속 시간·해제·호환 쪽에 가깝습니다.

Buff는 **지금 어떤 상태인가**에 답합니다. Skill·Passive·아이템 등이 Add로 상태를 걸면, 이 층이 overlap·Stat·CC·주기 피해를 책임집니다.

| 용어 | 의미 |
|------|------|
| Stack / Overlap | 같은 버프가 다시 들어올 때 스택·시간 갱신 정책 |
| StateEffect | 기절·빙결 등 CC·상태이상 분류 |
| Incompatible | 함께 있을 수 없는 버프·상태 조합 |
| 주기 트리거 | 간격마다 Hitmark·Stat 등 반응 (DoT 등) |

## 구조

| | 내용 |
|--|------|
| 소유 | Add/Overlap/Remove, 스택·duration, StateEffect·호환, Stat Modifier, Buff 측 Trigger |
| 소유하지 않음 | 피해 공식 본체, Passive 조건식·실행 큐, 스킬 쿨·입력 버퍼 |
| 데이터 | Scriptable 정의. 런타임은 clone으로 Setup |
| 호출자 | Skill, Passive Effect, Hitmark, Item 등 → Buff Add |

캐릭터 아래 Buff 시스템이 엔티티·스택·활성 StateEffect·호환 맵을 둡니다. 엔티티는 Owner/Caster와 정의를 들고, 제거 시 Stat 소스를 같이 걷어 냅니다.

```
Skill / Passive / Item / …
  → Buff Add (정의 clone, level, caster)
  → 기존 있으면 Overlap (stack, 시간 정책)
  → Activate — 호환 등록, UI
  → Duration / Interval / Rest
  → (주기·이벤트) Trigger → Stat / Hitmark …
  → Remove — Stat 제거, 호환 해제
```

## 런타임 흐름

### 적용

1. 호출자가 Buff를 Add합니다.
2. 런타임을 붙이고 Setup합니다. 이미 있으면 Overlap으로 스택·스탯을 갱신합니다.
3. Activate로 호환 규칙과 UI를 맞춥니다.
4. 지속 시간·간격·Rest 코루틴이 돕니다.
5. Remove 때 Stat Modifier를 같은 source로 제거합니다. 남기면 스탯이 굳습니다.

### 상태이상·호환

StateEffect로 CC를 묶고, 함께 있을 수 없는 버프·상태를 맵으로 가집니다. Skill 입력·조건 쪽은 활성 CC를 보고 시전을 막을 수 있습니다. «지금 뭐가 붙어 있나»가 Buff 디버그의 기본 질문입니다.

### Buff 측 Trigger

버프가 피격·스탯·스킬 등 이벤트에 반응하거나, 간격마다 DoT Hitmark를 켤 수 있습니다. 종류가 늘수록 거대 switch보다 **트리거별 핸들러**로 나누는 편이 확장에 유리했습니다. Passive의 Trigger→Condition→실행 큐와는 경로가 다릅니다. 둘 다 Rest가 있어도 같은 API로 합치지 않습니다.

## 예시

| 콘텐츠 | Buff 쪽 | 다른 층 |
|--------|---------|---------|
| 화염 도트 5스택 | 스택·틱 간격, 틱마다 Hitmark | Passive/Skill이 «화염을 걸지» 결정 가능 |
| 빙결 | StateEffect, 시전·이동 블록 연동 | Skill이 Rest/조건으로 차단 |
| 공격력 버프 10초 | duration, Stat Modifier Add/Remove | — |
| 치명 시 공격력 상승 (유물) | (상태가 필요하면) Buff로 보정 | Passive가 치명 조건 후 Buff Add |

Passive 예시의 «공격 시 화염»은 Passive가 Buff를 걸고, **틱 피해**는 Buff→Hitmark입니다. 역할이 한 줄로 갈립니다.

## 데이터 요지

| 구분 | 요지 |
|------|------|
| Buff 정의 | Scriptable. 정의 복사 후 Setup, 런타임 SO 변조 지양 |
| Stat | Modifier는 Buff가 넣고, 제거 시 반드시 회수 |
| DoT 피해 | Hitmark ID 호출. 식은 Hitmark·Stat 층 |
| 호환·CC | StateEffect·Incompatible 맵과 활성 상태 일치 |

필드·밸런스 표와 핸들러 전수 목록은 이 글 범위 밖입니다. 새 상태를 넣을 때의 질문은 «스택·시간·CC인가 / Stat인가 / 주기 Hitmark인가»입니다.

## 이 글에서 다루지 않는 것

| 주제 | 위치 |
|------|------|
| Passive Trigger·실행 큐 | [Passive 사건 규칙]({{ "/notes/combat-passive/" | relative_url }}) |
| Buff vs Passive Why | [시리즈 4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) |
| Hitmark 피해 파이프라인 | [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }}) |
| 스킬 시전·CC 블로킹 입력 | [Skill 시전 구조]({{ "/notes/combat-skill/" | relative_url }}) |
| HUD 아이콘 레이아웃 | UI 쪽 (요지만) |

## 정리

Buff는 캐릭터에 붙는 **지속 상태**입니다. Add·스택·시간·CC·Stat·주기 트리거를 지키고, 피해 식은 Hitmark에, 사건 자동 규칙은 Passive에 맡깁니다. 제거 시 Stat을 같이 걷어 내는 것이 이 층의 기본 불변조건입니다.

구조 세트 다음은 [전투 경계 시리즈]({{ "/notes/combat-four-layers/" | relative_url }})(지도·Why·출시)입니다.
