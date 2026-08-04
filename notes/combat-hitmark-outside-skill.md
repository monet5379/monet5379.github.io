---
layout: page
title: 전투 경계 3/5 Hitmark를 스킬 밖에 둔 이유
permalink: /notes/combat-hitmark-outside-skill/
date: 2026-08-04
excerpt: "타격 정의를 Skill에 넣지 않고 Hitmark로 분리한 이유와, 그 선택이 콘텐츠·수정 단위에 준 이득을 정리합니다."
tags: [DragonIsDead, Architecture, Combat]
series: combat-boundaries
series_title: 전투 경계
series_order: 3
series_total: 5
---


타격 정의를 Skill에 넣지 않고 Hitmark로 분리한 이유와, 그 선택이 콘텐츠·수정 단위에 준 이득을 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투 경계 시리즈의 3편입니다. Apply·데이터·예시 등 Hitmark How는 [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }})에 두고, 이 글은 [2편]({{ "/notes/combat-skill-happy-path/" | relative_url }})의 ID 참조가 **왜 필요한지**만 풉니다.

**시리즈: 전투 경계 (3/5)**

1. [네 층으로 나눈 이유]({{ "/notes/combat-four-layers/" | relative_url }})
2. [스킬 한 번의 해피 패스]({{ "/notes/combat-skill-happy-path/" | relative_url }})
3. Hitmark를 스킬 밖에 둔 이유 ← 현재
4. [Buff와 Passive를 나눈 이유]({{ "/notes/combat-buff-vs-passive/" | relative_url }})
5. [출시까지 지킨 경계와 남은 갭]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

## 맥락

스킬 행에 데미지·판정·이펙트를 다 넣으면 초반은 빠릅니다. 같은 타격이 스킬·투사체·버프 틱·패시브 추가타에 반복되면, 수치가 **복사본마다 어긋나기** 시작합니다. Hitmark는 타격을 ID로 빼 내 공유하게 한 선택입니다.

호출 관계의 요지는 구조 노트와 같습니다. Skill·Buff·Passive → Hitmark ID → 정의 → 피해 → Vital. [2편]({{ "/notes/combat-skill-happy-path/" | relative_url }})은 그중 Skill → Hitmark 가지만 따라갑니다.

## 왜 Skill 밖에 두는가

**한 정의를 여러 생산자가 쓴다.** 기본 공격과 유물·패시브가 같은 타격 느낌을 공유하거나, DoT가 같은 파이프라인으로 틱하려면, 정의가 Skill 행의 사유 필드이면 안 됩니다.

**시전과 타격을 따로 고친다.** 쿨·애니·버퍼는 Skill, 판정·피해 타입·가드는 Hitmark 쪽입니다. «스킬 체감만 고치려다 데미지 식이 흔들리는» 일을 줄입니다.

**수정 단위가 바뀐다.** 콘텐츠 추가의 기본 질문이 «새 스킬 클래스?»가 아니라 «새 Hitmark인가, 기존 Hitmark를 누가 부르는가?»로 바뀝니다. ID 관리·로드 실패 시 Apply 중단 같은 참조 규율이 대가입니다.

Json 테이블(Skill 등)과 Scriptable 정의(Hitmark 등)를 나눈 매체 선택·기각안 표는 [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }})의 데이터 요지에 모아 두었습니다. 이 편의 초점은 **왜 분리했는지**입니다.

## 정리

Hitmark는 Skill의 내부 필드가 아니라 공유 타격 정의입니다. Skill은 시전과 ID 참조를, Hitmark는 한 방의 의미와 피해 파이프라인을 맡깁니다. How는 구조 노트, Why는 이 편입니다.

다음 편: [Buff와 Passive를 나눈 이유]({{ "/notes/combat-buff-vs-passive/" | relative_url }})
