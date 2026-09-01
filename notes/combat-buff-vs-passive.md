---
layout: page
title: 전투 경계 4/5 Buff와 Passive를 나눈 이유
permalink: /notes/combat-buff-vs-passive/
date: 2026-08-04
excerpt: "지속 상태(Buff)와 사건 규칙(Passive)을 나눈 이유와, 반응 루프에서의 역할 분리를 정리합니다."
tags: [전투]
series: combat-boundaries
series_title: 전투 경계
series_order: 4
series_total: 5
---


지속 상태(Buff)와 사건 규칙(Passive)을 나눈 이유와, 반응 루프에서의 역할 분리를 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투 경계 시리즈의 4편입니다. Buff·Passive **구조**는 [Buff 지속 상태]({{ "/notes/combat-buff/" | relative_url }})·[Passive 사건 규칙]({{ "/notes/combat-passive/" | relative_url }})에 두고, 이 글은 [2편]({{ "/notes/combat-skill-happy-path/" | relative_url }}) 이후 **반응 루프**와 둘을 나눈 이유를 봅니다. 실행 큐·프레임 상한 등 폭주 제어 How는 [Passive 구조]({{ "/notes/combat-passive/" | relative_url }})가 정본입니다.

**시리즈:** [1]({{ "/notes/combat-four-layers/" | relative_url }}) · [2]({{ "/notes/combat-skill-happy-path/" | relative_url }}) · [3]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · **4** · [5]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

## 맥락

겉보기 효과는 비슷한 경우가 많습니다. 공격하면 화염을 남긴다, 치명타 시 공격력이 오른다, 독이 틱마다 깎인다. 구현을 한 상태 시스템에 몰아넣으면 초반은 편하지만, 곧 두 질문이 섞입니다.

- 지금 캐릭터에 **붙어 있는 상태**인가?
- 어떤 **사건이 일어나면** 발동하는 규칙인가?

전자를 Buff, 후자를 Passive로 두었습니다. 둘 다 Rest(재발동 간격) 개념이 있어도 **경로가 다릅니다.**

## 한 줄 차이

| | Buff | Passive |
|--|------|---------|
| 질문에 답한다 | 지금 어떤 상태인가 | 무슨 일이면 무엇을 하는가 |
| 수명 | 스택·지속 시간·해제·호환 | 보유하는 동안 규칙이 대기 |
| 전형적인 일 | CC, 스탯 보정, DoT 틱 | 공격 성공 시 버프, 쿨 감소, 추가 Hitmark |
| 효과 구현 | 자체 트리거·Stat·필요 시 Hitmark 호출 | Effect가 Buff / Attack / Skill API에 **위임** |

Passive는 피해 공식이나 Buff 스택 정책을 소유하지 않습니다. 조건을 통과하면 어디에 일을 시킬지만 정합니다.

## 반응 루프

해피 패스 다음에 붙는 흐름을 단순화하면 다음과 같습니다.

```
Hitmark 적용 → Vital
  → (플레이어) 공격 성공/실패 이벤트
  → Passive: 트리거 매칭 → 조건 → 실행 큐
       → Effect: Buff Add / Hitmark / 쿨 감소 …
  → Buff: 스택·시간·CC·스탯
       → (필요 시) 자체 트리거로 Hitmark·Stat
```

Skill이 시전 시점에 Buff·Passive를 **부여**할 수도 있습니다. 그건 규칙을 장착하는 쪽이고, 장착된 Passive가 전투 이벤트에 반응하는 쪽과 단계를 나눠 생각합니다.

Buff 쪽 이벤트 반응은 종류가 늘어날수록 거대 분기보다 **트리거별 핸들러**로 나누는 편이 확장에 유리했습니다. 새 트리거를 넣을 때 기존 case 더미를 덜 건드리기 위해서입니다.

## 왜 합치지 않는가

**수명 모델이 다르다.** 독 5스택 3초와 포션을 마실 때마다 30%로 쉴드는 같은 `Add` API로 다루기 어렵습니다. 앞의 예는 overlap·해제·CC 호환이 핵심이고, 뒤의 예는 확률·횟수·Rest·최대 발동이 핵심입니다.

**중복 트리거를 역할로 가른다.** 공격 성공을 Buff와 Passive가 둘 다 들을 수 있어도, 상태로서의 반응과 빌드·유물형 규칙을 문서·데이터 위치에서 분리해 두면 어디에 넣을지 논쟁이 줄어듭니다. 같은 수치 효과를 양쪽에 복제하는 것은 피하고, Passive 효과는 Buff로 상태화하는 쪽을 기본으로 둡니다.

**디버그 질문이 달라진다.** Buff는 지금 뭐가 붙어 있나 / 스택·남은 시간이고, Passive는 어느 트리거가 조건을 통과했고 큐에 들어갔나입니다. 한 시스템에 합치면 로그와 재현 절차가 섞입니다.

## 폭주 제어 (요지)

Passive는 전투 이벤트에 연쇄되기 쉽습니다. 실행은 전역 큐·프레임당 상한·Rest를 전제로 두고, 한 프레임에 규칙을 다 끝내는 것보다 프레임 예산을 지키는 쪽을 택했습니다. 장치·대가·이벤트 순서의 상세는 [Passive 사건 규칙]({{ "/notes/combat-passive/" | relative_url }})에 둡니다.

## 정리

Buff는 캐릭터에 붙는 지속 상태이고, Passive는 사건에 반응하는 규칙입니다. Passive는 효과를 Buff·Hitmark·Skill에 위임합니다. 연쇄 폭주 제어 How는 구조 노트에 맡깁니다.

다음 편: [출시까지 지킨 경계와 남은 갭]({{ "/notes/combat-boundaries-shipped/" | relative_url }})
