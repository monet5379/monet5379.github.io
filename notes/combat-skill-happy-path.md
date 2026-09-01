---
layout: page
title: 전투 경계 2/5 스킬 한 번의 해피 패스
permalink: /notes/combat-skill-happy-path/
date: 2026-08-04
excerpt: "스킬 입력부터 Hitmark·피해 계산·Vital까지, 반응 루프를 빼 둔 해피 패스만 따라갑니다."
tags: [전투]
series: combat-boundaries
series_title: 전투 경계
series_order: 2
series_total: 5
---


스킬 입력부터 Hitmark·피해 계산·Vital까지, 반응 루프를 빼 둔 해피 패스만 따라갑니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투 경계 시리즈의 2편입니다. Rest·버퍼·애니 연동 등 Skill How는 [Skill 시전 구조]({{ "/notes/combat-skill/" | relative_url }})에, 타격 파이프라인은 [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }})에 둡니다. 이 글은 [1편]({{ "/notes/combat-four-layers/" | relative_url }}) 지도 위에서 **직선 경로 한 줄기**만 고정합니다.

**시리즈:** [1]({{ "/notes/combat-four-layers/" | relative_url }}) · **2** · [3]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · [4]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) · [5]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

## 맥락

면접·리뷰에서 가장 먼저 묻는 흐름은 보통 이것입니다.

> 버튼을 누르면 데미지가 어떻게 들어가나요?

Buff·Passive 연쇄까지 한 번에 설명하면 지도가 흐려집니다. 성공 경로만 보고, 반응 루프는 [4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }})으로 미룹니다.

## 해피 패스

플레이어가 할당된 스킬을 쓰는 경우를 기준으로 합니다.

```
입력
  → 시전 가능 검사 (조건·이동 블록·Ability Rest)
  → (선택) 입력 버퍼
  → Skill 시전 — 쿨다운·Cast Rest · SkillAnimation 재생
  → (클립) Animation Event
  → Hitmark ID로 공격 Activate
  → Attack 적용 — 대상 Vital 확정
  → 피해 계산 (Hitmark 정의 + 공격자·피격자 Stat)
  → Vital에 적용 — Life / Guard / 사망
```

| 단계 | 층 | 상세 |
|------|-----|------|
| 입력·버퍼·쿨·Rest·SkillAnimation | Skill | [Skill 시전 구조]({{ "/notes/combat-skill/" | relative_url }}) |
| 애니 이벤트 → Hitmark Activate · Apply · 피해 | Hitmark | [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }}) |
| HP·가드 반영 | Vital | Hitmark 노트와 동일 파이프라인 |

이 줄기의 핵심은 한 문장입니다. **Skill이 치고(시전·애니·이벤트), Hitmark가 맞힌다.** 시전 직후가 아니라 애니 이벤트 시점에 ID로 Hitmark를 부르는 경우가 많습니다.

## 이 글에서 멈추는 지점

Vital 적용까지입니다.

| 이후 | 위치 |
|------|------|
| Rest·버퍼·애니 연동 상세 | [Skill 시전 구조]({{ "/notes/combat-skill/" | relative_url }}) |
| Hitmark 데이터·공유 | [Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) · [3편]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) |
| 공격 성공 → Passive / Buff | [4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) |
| 물리/마법 계약 갭 | [5편]({{ "/notes/combat-boundaries-shipped/" | relative_url }}) |

## 정리

스킬 한 번의 직선 경로는 입력·시전·SkillAnimation(Skill) → 애니 이벤트 → Hitmark 적용 → 피해 계산 → Vital입니다. 층 내부 How는 구조 노트에 맡기고, 시리즈는 이 연결만 기억하면 됩니다.

다음 편: [Hitmark를 스킬 밖에 둔 이유]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }})
