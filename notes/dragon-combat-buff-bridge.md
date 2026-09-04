---
layout: page
title: 버프는 상태로 무엇을 바꾸는가
permalink: /notes/dragon-combat-buff-bridge/
date: 2026-09-02
excerpt: "버프는 지속·중첩·주기 틱을 가진 상태이고, 붙을 때·틱마다 능력치·타격·스킬로 연결됩니다. CC(기절 등)가 스킬 입력을 막는 지점까지 정리합니다."
tags: [전투]
project:
  - dragon-is-dead
  - blade-assault
series: combat-reaction
series_title: 트리거·연쇄
series_order: 2
series_total: 4
series_nav: true
mermaid: true
---


버프는 지속·중첩·주기 틱을 가진 상태이고, 붙을 때·틱마다 능력치·타격·스킬로 연결됩니다. CC(기절 등)가 스킬 입력을 막는 지점까지 정리합니다.

[트리거·연쇄]({{ "/notes/dragon-combat-cluster-read/" | relative_url }}) 시리즈 2편입니다. 버프 층의 Add·Stack·Trigger How와 버프/패시브 **역할 분리**는 [읽기 지도]({{ "/notes/dragon-combat-cluster-read/" | relative_url }})·[3편 패시브]({{ "/notes/dragon-combat-passive-bridge/" | relative_url }})와 함께 봅니다. 이 글은 **전투 연동** — Add/Trigger → 능력치·combat, CC → 스킬 — 에 맞춥니다.

## 맥락

| | 버프 | 패시브 |
|--|------|--------|
| 단위 | BuffEntity · stack · duration | PassiveEntity · Manager queue |
| 비유 | **지금 걸린 상태** (독·공격력 up·기절) | **사건에 반응하는 규칙** |
| AddBuff | **본체** | Effect가 BuffSystem.Add **호출** |

지속·중첩 상태를 버프로 두고 패시브와 가른 축은 [블레이드 어썰트]({{ "/projects/blade-assault/" | relative_url }})에서도 출시했습니다.

게임 예:

- **공격력 버프** — Add → 능력치 Modifier → [2편 능력치]({{ "/notes/dragon-combat-stat/" | relative_url }})
- **독 DoT** — Trigger tick → 히트마크 → [3편 combat]({{ "/notes/dragon-combat-hit-flow/" | relative_url }}) (Projectile 없이 많음)
- **기절** — StateEffect → 스킬 버튼 차단

SkillEntity.Buff · Passive AddBuff Effect · Item 등이 `BuffSystem.Add`로 들어옵니다. Remove 시 Stat **RemoveBySource** 쌍([타격·데미지 2편]({{ "/notes/dragon-combat-stat/" | relative_url }}))을 지킵니다 — 버프 해제 후 능력치 잔존 QA.

## Add · Lifecycle

**Producer → Add → Spawn BuffEntity → Setup · Overlap → Activate**

```mermaid
flowchart TD
  P["스킬 · 패시브 · Item · 히트마크"] --> AD["BuffSystem.Add"]
  AD --> SP["SpawnBuffEntity · Setup"]
  SP --> OV["Overlap · stack++"]
  OV --> ACT["Activate · UI"]
  DUR["Duration · Interval · RestTime"] --> TRG["OnTrigger"]
  TRG --> H["TriggerTypes → Handler"]
  H --> ST["RefreshStats → 능력치"]
  H --> CM["HitmarkAttack → 전투 적용"]
  RM["Remove · Despawn"] --> ST
```

| 단계 | 요지 |
|------|------|
| Add | `FindBuffClone` — 런타임 SO mutate 금지 |
| Overlap | stack · 같은 버프 겹침 · `CheckRemovingStackSequentially` 중 Add 거부 |
| Duration/Interval | 코루틴 · RestTime(버프 전용 재발동 간격) |
| Remove | Stat Remove(source=BuffEntity) · Despawn |
| Death | BuffSystem.Clear — [1편]({{ "/notes/dragon-combat-character/" | relative_url }}) 연쇄 |

## Trigger Handler (family)

Handler 전수는 Architecture(스튜디오 내부)에 두고, **연동**만 표로 고릅니다.

| family | Handler 예 | 연결 |
|--------|------------|------|
| 전투 | HitmarkAttack · MaxStackHitmarkAttack | [전투 적용]({{ "/notes/dragon-combat-hit-flow/" | relative_url }}) |
| Stat | IncreaseStatFor* · RefreshStats | [능력치 Modifier]({{ "/notes/dragon-combat-stat/" | relative_url }}) |
| Skill | AddSkillPoint · ReduceCooldown* | [스킬]({{ "/notes/dragon-skill-cast/" | relative_url }}) |
| Item/Gold/Misc | 포션 · 재화 | Item |

DoT tick은 Trigger → Attack → **combat** 회귀 QA가 필요합니다. ExecuteAttack 순서(패시브 → 버프 → Damage)는 [3편 패시브]({{ "/notes/dragon-combat-passive-bridge/" | relative_url }})와 맞춥니다.

## StateEffect (CC)

StateEffect registry · Incompatible maps → **`CharacterHandleSkill` blocking**([1편]({{ "/notes/dragon-combat-character/" | relative_url }})). CC는 버프 층이 소유하고, 스킬은 **입력 차단**만 소비합니다 — **이 상태면 스킬 버튼이 막힌다**.

| | 버프 RestTime | 패시브 Rest | 스킬 Cast Rest |
|--|---------------|-------------|----------------|
| 역할 | 버프 재발동 간격 | 패시브 규칙 재발동 | 시전 쿨·Rest |
| 혼동 금지 | ✓ | ✓ | ✓ |

## 정리

버프는 **Add/Stack/Duration + Trigger Handler**로 능력치·combat·스킬에 연결됩니다. Remove는 능력치 쌍, CC는 스킬 입력과 만납니다. 다음 [3편]({{ "/notes/dragon-combat-passive-bridge/" | relative_url }})에서 이벤트 큐·ExecuteAttack을 봅니다. Buff partial·Handler 구현 표는 Architecture(스튜디오 내부)에, Buff SO Scriptable은 [`excel-json-fixed-data`]({{ "/notes/excel-json-fixed-data/" | relative_url }})에, save/load 후 인게임 버프 없음은 의도(세이브 범위 밖)입니다.
