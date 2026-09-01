---
layout: page
title: 전투 구조 2/4 Skill 시전 구조
permalink: /notes/combat-skill/
date: 2026-08-04
excerpt: "스킬의 입력·쿨다운·Rest·버퍼와 SkillAnimation 재생·애니 이벤트로 Hitmark·Buff·Passive를 적용하는 구조를 정리합니다."
tags: [전투]
series: combat-structure
series_title: 전투 구조
series_order: 2
series_total: 4
---


스킬의 입력·쿨다운·Rest·버퍼와 SkillAnimation 재생·애니 이벤트로 Hitmark·Buff·Passive를 적용하는 구조를 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투에서 담당한 Skill(시전) 층입니다. 네 층 지도·Why는 [전투 경계 시리즈]({{ "/notes/combat-four-layers/" | relative_url }})를, 직선 해피 패스는 [시리즈 2편]({{ "/notes/combat-skill-happy-path/" | relative_url }})을 보면 됩니다. 타격 이후 수치는 [Hitmark]({{ "/notes/combat-hitmark/" | relative_url }})로 넘깁니다. 이 글은 **구조와 런타임 흐름**에 초점을 둡니다.

**권장 읽기:** 구조(How) 1→4 후 [경계]({{ "/notes/combat-four-layers/" | relative_url }})(Why) 1→5

**구조:** [1 Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) · **2** · [3 Passive]({{ "/notes/combat-passive/" | relative_url }}) · [4 Buff]({{ "/notes/combat-buff/" | relative_url }})

## 맥락

플레이어가 버튼을 누르면 스킬이 나간다고 느끼지만, 구현에서는 입력 권한·쿨다운·애니 중 선입력·시전 직후 경직이 한곳에 섞이기 쉽습니다. Dragon에서 Skill 층은 **언제 쓰는지**만 소유하고, 한 방의 정의·피해 식은 Hitmark에 두지 않습니다.

시전 성공의 산출물은 지금 이 스킬을 쓴다는 결정과, **SkillAnimation 재생**입니다. Hitmark·Buff·Passive 적용은 대개 클립의 애니 이벤트 시점에 일어나며, 데미지 숫자 자체는 Skill의 책임이 아닙니다.

| 용어 | 의미 |
|------|------|
| Skill | 학습·슬롯·레벨이 있는 시전 단위. ID로 구분 |
| SkillAnimation | 시전 시 재생할 애니 정의(SO). 스킬 ID로 조회 |
| Animation Event | 클립 안의 시점 마커. Hitmark·Buff·Passive 등 적용을 여기서 침 |
| Ability Rest | 입력 Ability가 쉬는 구간. 시전 권한과 연동 |
| Cast Rest | 이 스킬을 쓴 뒤 붙는 시전 측 Rest. Ability Rest와 별개 |
| 입력 버퍼 | 애니·경직 중 들어온 입력을 잠시 보관했다가 시전 가능할 때 소비 |

## 구조

Skill 층이 답하는 질문은 언제 쓰는가입니다. 입력·쿨뿐 아니라 **연출 타임라인상의 적용 시점**도 여기에 포함됩니다.

| | 내용 |
|--|------|
| 소유 | 입력·시전 가능 검사, 쿨다운, Cast Rest, 입력 버퍼, 슬롯·레벨, SkillAnimation 재생 |
| 소유하지 않음 | 피해 공식, Vital 적용, Buff 스택 정책, Passive 조건식 본체, 클립·이벤트 키 전수 |
| 데이터 | 스킬 로직·테이블은 Json 쪽. SkillAnimation은 Scriptable. Hitmark/Buff/Passive는 ID·이름 연동 |
| 시전 후 | 애니 재생 → (이벤트 시점) Hitmark Activate / Buff Add / Passive Add |

캐릭터 아래에는 스킬 런타임 목록과 입력 Ability, 캐릭터당 입력 버퍼가 있습니다. 프로필의 학습·할당·레벨이 런타임과 맞춰지고, 전투 준비 이후에 입력이 열립니다.

```
프로필 (학습·슬롯·레벨)
  → Skill 런타임 등록 (+ SkillAnimation 조회)
입력 / 버퍼
  → 시전 가능 검사 (조건·이동 블록·Ability Rest·쿨)
  → TryCast — 쿨다운·Cast Rest 시작
  → SkillAnimation 재생
  → (클립 진행) Animation Event
  → Hitmark / Buff / Passive 적용
  → (Hitmark 층) 피해 계산 → Vital
```

## 런타임 흐름

### 전투 준비

1. 캐릭터 시작 시 스킬 런타임을 등록하고, 스킬 ID로 SkillAnimation을 불러 애니메이터에 등록합니다.
2. 입력 버퍼를 초기화합니다.
3. 전투 준비 게이트 이후 HUD·입력이 맞춰집니다. 허용 스킬 등록은 별 경로로 둘 수 있습니다.
4. 할당·조건·Rest를 통과해야 입력이 시전으로 이어집니다.

### 스킬 사용

1. 입력 Ability가 조건·이동 블록·Ability Rest를 검사합니다.
2. 필요하면 입력 버퍼에 넣었다가, 시전 가능해지면 TryCast로 꺼냅니다.
3. 쿨다운과 Cast Rest를 시작합니다.
4. SkillAnimation을 재생합니다. **시전 결정과 타격·효과 적용은 같은 프레임이 아닐 수 있습니다.**
5. 클립의 Animation Event가 실제 적용 시점에 Hitmark·Buff·Passive 등을 호출합니다.
6. Hitmark Apply 이후의 수치·Vital은 [Hitmark 노트]({{ "/notes/combat-hitmark/" | relative_url }}) 범위입니다.

### Rest를 나누는 이유

Ability Rest와 Cast Rest를 한 플래그로 합치면, 입력 전체가 쉬는 것과 이 스킬만 시전 직후 쉬는 것이 구분되지 않습니다. 연계·캔슬·재시전 QA가 어려워져, 두 경로를 나눠 두었습니다.

## SkillAnimation과 애니 이벤트

시전 연출의 정본은 **SkillAnimation**(Scriptable)입니다. 스킬 ID로 조회해 캐릭터 애니메이터에 붙이고, TryCast 성공 시 해당 클립을 재생합니다.

| 단계 | 하는 일 |
|------|---------|
| 데이터 | SkillAnimation SO — 어느 클립을 쓸지 |
| 시전 | Play — 연출 시작, 쿨·Cast Rest와 함께 돌아감 |
| 클립 중 | Animation Event — 지금 맞춰라 시점에 Hitmark/Buff/Passive 호출 |
| 이후 | Hitmark 갈래(Target/Area/Projectile)로 대상 확정·피해 |

언제 휘두를지·언제 맞힐지의 체감 타이밍은 애니 이벤트가 잡고, 그 타격의 수치·타입은 Hitmark가 잡습니다. 클립 이름·이벤트 키·무기별 교체 규칙 전수는 이 글 범위 밖입니다.

입력 버퍼는 이 재생 구간을 전제로 합니다. 애니 재생 중에도 다음 스킬 입력을 받아 두었다가, 시전 가능 시점에 소비해 연계가 끊기는 느낌을 줄입니다.

## 예시

가상의 참격을 슬롯에 할당해 쓰는 경우입니다.

| 단계 | Skill 쪽 | 다른 층 |
|------|----------|---------|
| 버튼 입력 | 할당 슬롯·쿨·Rest·버퍼 검사 | — |
| 시전 성공 | 쿨·Cast Rest, SkillAnimation(참격) 재생 | — |
| 휘두름 프레임 | 애니 이벤트로 참격 Hitmark Activate | Hitmark가 대상·피해·Vital |
| 부가 | 이벤트 또는 시전 흐름에서 Buff/Passive | Buff / Passive 층 |

같은 참격 Hitmark를 유물 Passive가 다시 호출할 수 있어도, Skill 경로는 시전 → 애니 → 이벤트 시점 적용을 책임집니다.

## 데이터 요지

| 구분 | 요지 |
|------|------|
| 스킬 로직·테이블 | Json 행(clone). 슬롯·레벨은 프로필 |
| SkillAnimation | Scriptable. 시전 연출·이벤트 타이밍의 뼈대 |
| Hitmark / Buff / Passive | ID·이름으로 연결. 본체 정의는 각 층. 적용 시점은 주로 애니 이벤트 |
| 과도기 | 스킬 로직의 Scriptable 이관은 목표로 남겨 둔 상태가 있음 ([시리즈 5편]({{ "/notes/combat-boundaries-shipped/" | relative_url }})) |

## 이 글에서 다루지 않는 것

| 주제 | 위치 |
|------|------|
| Hitmark → 피해 → Vital · Target/Area/Projectile | [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }}) |
| 입력부터 Vital까지 한 줄기 | [시리즈 2편]({{ "/notes/combat-skill-happy-path/" | relative_url }}) |
| Hitmark를 Skill 밖에 둔 이유 | [시리즈 3편]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) |
| Buff·Passive 상세 | [Buff 지속 상태]({{ "/notes/combat-buff/" | relative_url }}) · [Passive 사건 규칙]({{ "/notes/combat-passive/" | relative_url }}) · [시리즈 4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) |
| 클립명·이벤트 키·Animator 내부 | 범위 밖 (요지만 위에) |
| 스킬 트리 UI·학습 포인트 예외 전부 | UI·프로필 쪽 (요지만 언급) |

## 정리

Skill은 **시전 의도와 타이밍**의 층입니다. 입력·쿨·Rest·버퍼·슬롯을 지키고, TryCast 후 SkillAnimation을 재생한 뒤 **애니 이벤트 시점**에 Hitmark·Buff·Passive를 적용합니다. 한 방의 의미와 숫자는 Hitmark로 넘기고, 지속 상태·사건 규칙은 Buff·Passive에 맡깁니다.

다음: [전투 구조 3/4 Passive 사건 규칙]({{ "/notes/combat-passive/" | relative_url }})
