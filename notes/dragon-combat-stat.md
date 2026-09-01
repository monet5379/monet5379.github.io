---
layout: page
title: 능력치는 어디서 쓰이고 어디서 읽히는가
permalink: /notes/dragon-combat-stat/
date: 2026-09-02
excerpt: "장비·버프·레벨이 섞여 공격력·체력이 바뀔 때, 어디서 숫자를 넣고 빼며, 타격·UI는 어디서만 읽는지를 정리합니다."
tags: [전투]
project: dragon-is-dead
series: combat-presence
series_title: 타격·데미지
series_order: 2
series_total: 4
series_nav: true
mermaid: true
---


장비·버프·레벨이 섞여 공격력·체력이 바뀔 때, 어디서 숫자를 넣고 빼며, 타격·UI는 어디서만 읽는지를 정리합니다.

[타격·데미지]({{ "/notes/dragon-combat-cluster-read/" | relative_url }}) 시리즈 2편입니다. [1편]({{ "/notes/dragon-combat-character/" | relative_url }})에서 Initialize·Death Clear가 캐릭터 생명주기에 붙어 있었습니다. 이 글은 **StatSystem** — 능력치 **쓰기**의 유일한 입구와 **읽기** API만 다룹니다. Hitmark Apply는 [3편]({{ "/notes/dragon-combat-hit-flow/" | relative_url }})에서 소비 측으로 봅니다.

## 맥락

전투에서 “공격력이 올랐다”는 체감은 Buff·장비·레벨·스킬이 한꺼번에 섞입니다. QA에서는 **스킬 UI 예상 피해와 실제 타격 숫자 불일치**, **버프 해제 후 스탯 잔존**이 자주 Stat·Combat 경계 문제입니다.

구현에서는 **StatSystem**이 Modifier를 Add/Remove하고, **DamageCalculator**·UI 등은 **FindCalculateValue**로만 읽습니다. combat 층이 식을 복제하지 않게 하려면 이 경계를 지킵니다.

| 축 | Stat | Combat |
|----|------|--------|
| Modifier Add/Remove | ✓ 유일한 쓰기 입구 | 소비만 |
| OnStatChanged · Refresh | ✓ | — |
| Hitmark Apply · Vital | Owner 연결 | ✓ |

## Initialize

[1편]({{ "/notes/dragon-combat-character/" | relative_url }}) Initialize 안에서 Stat이 들어옵니다.

**플레이어** — 세이브·장비·유물·성장이 섞이는 경로

1. `AddDefaultStats` — Camp Json `StatData.Camps`
2. `AddCharacterStats` — `CharacterData.Stats` (+ StatConditionArea)
3. `OnLevelUp`(CharacterGrow) · 프로필 Essence/Elixir/Food · 장비 `RefreshEquippedItemStats`
4. BattleReady — SkillBook · Relic → `MyVital.Initialize`

**몬스터** — 테이블 base만. 프로필·장비·유물 경로 없음.

Json StatData 정본·clone 경로는 [`excel-json-fixed-data`]({{ "/notes/excel-json-fixed-data/" | relative_url }})를 참고합니다.

## Modifier Add · Remove

**Producer → AddWithSourceInfo / RemoveBySource(SID)**

```mermaid
flowchart TD
  P["Buff · Skill · Equip · Relic · Grow"] --> A["AddWithModifier"]
  A --> M["CharacterStat + StatModifier"]
  M --> C["OnStatChanged"]
  C --> R["RefreshLife · Speed · Skill level …"]
  RM["RemoveBySource/SID"] --> C
```

| Producer | SourceType | Remove 키 |
|----------|------------|-----------|
| Buff | BuffEntity | RemoveBySource |
| Skill | SkillEntity | 동일 패턴 |
| 장비 | Item | SID + OptionIndex |
| Relic · CharacterGrow | 각 Source | Source/SID 쌍 |

**반드시 지킬 것:** Add/Remove **쌍**(동일 Source/SID). 버프 해제 후 스탯이 안 돌아오면 여기부터 봅니다. `StatModType.Once`는 Modifier 리스트에 남지 않고 OnAdd만. Death 시 `Stat.Clear()` — Attack·Passive·Buff Clear와 함께([1편]({{ "/notes/dragon-combat-character/" | relative_url }})).

## Read — FindCalculateValue

Consumer(DamageCalculator, UI, Movement) → `FindValueOrDefault` / **`FindCalculateValue`**(Life · Armor · AttackPower …) → [3편]({{ "/notes/dragon-combat-hit-flow/" | relative_url }}) `ComputeByType`.

**쓰기 vs 읽기:** Buff·장비·스킬이 Stat에 Modifier를 **넣고 빼고**, 타격·UI·이동은 **읽기만** 합니다. Stat을 바꾼 뒤 **같은 Hitmark**로 재측정하는 것은 Stat·Combat 공통 QA입니다.

STR/INT ↔ 물리/마법 공격력 **설계 계약**과 generic `AttackPower` 구현은 아직 어긋날 수 있습니다([읽기 지도 출시 갭]({{ "/notes/dragon-combat-cluster-read/" | relative_url }})). Apply에서 Stat을 읽는 경로는 [3편]({{ "/notes/dragon-combat-hit-flow/" | relative_url }})과 같습니다.

## 이 글에서 다루지 않는 것

| 주제 | 위치 |
|------|------|
| Hitmark Apply · Vital.TakeDamage | [3편]({{ "/notes/dragon-combat-hit-flow/" | relative_url }}) |
| Buff Trigger → RefreshStats | [트리거·연쇄 2편]({{ "/notes/dragon-combat-buff-bridge/" | relative_url }}) |
| StatData Json 필드 표 | [`excel-json-fixed-data`]({{ "/notes/excel-json-fixed-data/" | relative_url }}) · Architecture |
| Attribute 파생·Optimization hot path | Architecture / Optimization (내부) |

## 정리

Stat은 **Modifier 쓰기**와 **FindCalculateValue 읽기**의 기준입니다. Initialize로 base가 깔리고, Buff·Skill·장비가 Add/Remove하며, combat은 Apply 시점에만 읽습니다. 다음 [3편]({{ "/notes/dragon-combat-hit-flow/" | relative_url }})에서 그 읽기가 Vital까지 이어지는 한 줄기를 봅니다.
