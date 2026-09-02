---
layout: page
title: 한 타격은 어떻게 모이는가
permalink: /notes/dragon-combat-one-hit/
date: 2026-09-02
excerpt: "스킬·버프·패시브·투사체가 한 번의 타격으로 모일 때, combat·HP·연쇄까지 이어지는 한 장 지도로 복습합니다. 시리즈 1·2를 마친 뒤 QA·회귀 확인 축으로 씁니다."
tags: [전투]
project:
  - dragon-is-dead
series: combat-reaction
series_title: 트리거·연쇄
series_order: 4
series_total: 4
series_nav: true
mermaid: true
---


스킬·버프·패시브·투사체가 한 번의 타격으로 모일 때, combat·HP·연쇄까지 이어지는 한 장 지도로 복습합니다. 시리즈 1·2를 마친 뒤 QA·회귀 확인 축으로 씁니다.

[트리거·연쇄]({{ "/notes/dragon-combat-cluster-read/" | relative_url }}) 시리즈 4편(마지막)입니다. **이 글은 새 개념을 추가하지 않습니다** — [타격·데미지]({{ "/notes/dragon-combat-character/" | relative_url }})·[트리거·연쇄 1~3편]({{ "/notes/dragon-combat-skill-bridge/" | relative_url }})을 한 장으로 묶는 capstone입니다. Skill→Hitmark **직선**만 보려면 [스킬 시전]({{ "/notes/dragon-skill-cast/" | relative_url }})과 [Apply 시점]({{ "/notes/dragon-combat-skill-bridge/" | relative_url }})을 먼저 보면 됩니다.

## 맥락

시리즈 1([타격·데미지]({{ "/notes/dragon-combat-character/" | relative_url }}))에서 Owner·Stat·Apply·Projectile transport를 봤고, 시리즈 2([1편]({{ "/notes/dragon-combat-skill-bridge/" | relative_url }}~[3편]({{ "/notes/dragon-combat-passive-bridge/" | relative_url }}))에서 트리거·연쇄를 봤습니다. 여기서 **한 번의 입력/이벤트가 Vital·연쇄까지** 어떻게 모이는지 한 장으로 고정합니다.

**읽는 순서:** 왼쪽(스킬·버프·패시브)에서 Activate/Add/Effect로 combat에 진입 → Apply·Vital → (선택) Passive 연쇄. Projectile은 transport([4편]({{ "/notes/dragon-combat-projectile/" | relative_url }}))만 거친 뒤 같은 Apply.

## end-to-end

**입력 또는 이벤트 → (skill/buff/passive) → combat Apply → Vital → (Passive 연쇄)**

```mermaid
flowchart TD
  subgraph S2["시리즈 2 — 트리거"]
    SK["skill<br/>TryCast · 애니 이벤트"]
    BF["buff<br/>Add · OnTrigger"]
    PS["passive<br/>queue · Effect"]
  end
  subgraph S1["시리즈 1 — Apply"]
    ACT["Activate<br/>타격 시작"]
    FORM["Target · Area · Projectile"]
    APP["Apply · DamageCalculator"]
    VIT["Vital<br/>HP · 가드"]
  end
  SK --> ACT
  BF --> ACT
  BF --> APP
  PS --> ACT
  PS --> BF
  ACT --> FORM
  FORM --> APP
  APP --> VIT
  VIT --> PS
  PJ["Projectile transport<br/>(4편)"] --> FORM
```

| 구간 | 시리즈 | 노트 |
|------|--------|------|
| BattleReady · Owner | 1 | [character]({{ "/notes/dragon-combat-character/" | relative_url }}) |
| Stat Read | 1 | [stat]({{ "/notes/dragon-combat-stat/" | relative_url }}) |
| Apply · Vital | 1 | [hit-flow]({{ "/notes/dragon-combat-hit-flow/" | relative_url }}) |
| Projectile만 | 1 | [projectile]({{ "/notes/dragon-combat-projectile/" | relative_url }}) |
| Apply 경계 | 2 | [skill-bridge]({{ "/notes/dragon-combat-skill-bridge/" | relative_url }}) |
| Buff·CC | 2 | [buff-bridge]({{ "/notes/dragon-combat-buff-bridge/" | relative_url }}) |
| ExecuteAttack | 2 | [passive-bridge]({{ "/notes/dragon-combat-passive-bridge/" | relative_url }}) |

## 트리거 진입 vs Apply (복습)

- **경로 A** — SkillEntity · Buff Handler · Passive Effect · 애니 → `Activate` (타격 **시작**만).
- **경로 B** — Apply → Hitmark clone → [Stat 읽기]({{ "/notes/dragon-combat-stat/" | relative_url }}) → Vital ([hit-flow]({{ "/notes/dragon-combat-hit-flow/" | relative_url }})).

Skill 노트는 Apply **앞**에서 끊고, combat은 Apply **뒤**만 소유합니다.

## 형태별 분기

| 형태 | 언제 [projectile]({{ "/notes/dragon-combat-projectile/" | relative_url }})를 다시 보나 |
|------|-------------------------------------------------------------------------------------|
| Target · Area | transport 없음 — 3편 hit-flow만 |
| Projectile | Spawn/Tick/Hit — 4편 후 Apply는 3편과 동일 |

## QA · 회귀 축

| 확인 | 증상 예 | 축 |
|------|---------|-----|
| Stat 변경 후 동일 Hitmark | 버프 on/off 후 숫자 불일치 | stat + combat |
| Buff on/off → Modifier 쌍 | 해제 후 공격력 잔존 | stat + buff |
| ExecuteAttack 연쇄 · 프레임 상한 | 한 프레임 연쇄 폭주 | passive |
| DoT Trigger → Hitmark | 틱마다 0 · 이중 적용 | buff + combat |
| Death Clear | 죽은 뒤 버프·스탯 잔존 | [character]({{ "/notes/dragon-combat-character/" | relative_url }}) |

## 다른 노트로

| 목적 | 노트 |
|------|------|
| 네 층 · 출시 요지 | [읽기 지도]({{ "/notes/dragon-combat-cluster-read/" | relative_url }}) |
| 플레이어 스킬 체감 | [스킬]({{ "/notes/dragon-skill-growth/" | relative_url }}) |
| 고정 데이터 | [`excel-json-fixed-data`]({{ "/notes/excel-json-fixed-data/" | relative_url }}) |

## 정리

한 타격은 **skill/buff/passive가 Activate·Add·Effect로 combat Apply에 들어가고, Stat을 읽어 Vital에 닿으며, 이벤트로 Passive가 다시 연쇄**할 수 있는 구조입니다. 시리즈 1·2를 마쳤으면 [읽기 지도]({{ "/notes/dragon-combat-cluster-read/" | relative_url }})로 돌아가 네 층·출시 요지를 복습하거나, [`excel-json-fixed-data`]({{ "/notes/excel-json-fixed-data/" | relative_url }})로 데이터 경로를 이어가면 됩니다. GC·pool hot path는 Optimization·성능 노트에, Stage·Wave는 액션 Architecture에, 코드 경로·Handler 전수는 Architecture(스튜디오 내부)에 둡니다.
