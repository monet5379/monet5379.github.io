---
layout: page
title: Hitmark 타격 정의
permalink: /notes/combat-hitmark/
date: 2026-08-04
excerpt: "Hitmark 정의와 Target·Area·Projectile 공격 런타임 갈래, 피해 계산·Vital 적용까지를 정리합니다."
tags: [전투]
series: combat-structure
series_title: 전투 구조
series_order: 1
series_total: 4
series_nav: true
---


Hitmark 정의와 Target·Area·Projectile 공격 런타임 갈래, 피해 계산·Vital 적용까지를 정리합니다.

[드래곤 이즈 데드]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투에서 담당한 Hitmark(타격) 층입니다. 네 층 지도·Why는 [전투 경계 시리즈]({{ "/notes/combat-four-layers/" | relative_url }})를, 왜 Skill 밖에 두었는지는 [Hitmark를 스킬 밖에 둔 이유 (노트)]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }})를 보면 됩니다. 이 글은 **구조와 런타임 흐름**에 초점을 둡니다.

## 맥락

실시간 전투에서 데미지가 들어간다는 감각은 하나지만, 구현에서는 시전·판정·수치·HP가 섞이기 쉽습니다. 드래곤 이즈 데드에서는 **한 번의 공격이 무엇인지**를 Hitmark로 정의하고, 적용 파이프라인을 그 정의 소비로 모았습니다.

프로젝트 페이지에 적어 둔 히트마크 → 피해 계산 → Vital이 이 층의 한 줄 요약입니다. Skill·Buff·Passive는 이 Hitmark를 **언제 켤지**를 정하고, 피해 식 자체를 복제하지 않습니다.

| 용어 | 의미 |
|------|------|
| Hitmark | 재사용 가능한 타격 정의. ID로 조회 |
| Attack | 캐릭터에 붙은 공격 런타임. Hitmark ID를 들고 대상을 잡은 뒤 Apply |
| Target / Area / Projectile | Attack의 갈래. **어떻게 맞힐지** (대상 확정 방식) |
| 피해 계산 | Hitmark 정의 + 공격자·피격자 Stat → 결과 |
| Vital | Life·Guard·사망 등 생명력 결과의 소유 |

## 구조

Hitmark 층이 답하는 질문은 무엇이 맞는가와, 그와 붙는 어떻게 맞히는가입니다. 전자는 **정의**, 후자는 **공격 런타임 갈래**입니다.

| | 내용 |
|--|------|
| 소유 | 타격 정의, Attack 갈래(Target/Area/Projectile)로 대상 확정, Apply, 피해 계산, Vital 적용 |
| 소유하지 않음 | 스킬 쿨다운·입력 버퍼, Buff 스택 정책, Passive 조건식, 투사체 비행·풀 내부 |
| 데이터 | 정의는 Scriptable. Skill Json 등은 Hitmark **ID**만 참조 |
| 호출자 | Skill 시전, Buff 주기 피해, Passive 추가 공격, 애니 타이밍 등 |

캐릭터 아래 공격 시스템이 Hitmark ID를 가진 Attack 런타임을 둡니다. 갈래가 달라도 Apply 이후는 같은 Hitmark 정의·피해 파이프라인을 탑니다.

```
호출자 (Skill / Buff / Passive / 애니 타이밍)
  → Attack Activate (Hitmark ID)
  → 대상 Vital 확정  ← Target | Area | Projectile
  → Hitmark 정의 로드
  → 피해 계산 (정의 + Stat)
  → Vital에 피해 적용
  → (이후) 공격 성공/실패 이벤트 → Passive 등
```

## 공격 런타임 갈래

Hitmark **정의**는 이 타격의 수치·타입 묶음이고, Attack **갈래**는 그 정의를 누구에게 적용할지를 정합니다. Skill은 언제 Activate할지만 정하고, 맞히는 수단은 여기 있습니다.

| 갈래 | 맞히는 방식 | 그 다음 |
|------|-------------|---------|
| **Target** | 지정·근접 등 단일(계) 대상 | 동일: 정의 로드 → 피해 계산 → Vital |
| **Area** | 박스·원·호 등 범위로 Vital 검색 | 동일 |
| **Projectile** | 발사·비행 후 충돌. 타깃을 자식 Attack에 전달하는 transport | 동일 (데미지는 Hitmark Apply) |

Projectile은 피해 식을 따로 두지 않습니다. 비행·수명·관통은 transport 쪽이고, 맞은 뒤의 숫자는 child Attack이 같은 Hitmark 파이프라인으로 처리합니다. 이동 종류·풀·매니저 상세는 이 글 범위 밖입니다.

한 Hitmark 정의를 Target 근접과 Projectile 충돌이 **공유**할 수도 있습니다. 갈래를 바꿔도 한 방의 의미는 ID 한곳에 남습니다.

## 런타임 흐름

1. 호출자가 Hitmark ID로 Attack을 활성화합니다.
2. 갈래에 맞게 대상을 확정합니다. Target은 지정 대상, Area는 범위 검색, Projectile은 비행·충돌 후 타깃 전달.
3. Apply 시 Hitmark 정의를 로드합니다. 유효하지 않으면 적용을 밀어붙이지 않고 끊습니다.
4. 정의에 묶인 데미지 항목마다 피해를 계산합니다. 공격자·피격자 Stat을 소비하고, 회피·가드 등 조건이 결과에 반영됩니다.
5. 결과를 Vital에 넣어 Life·Guard·사망으로 이어집니다.
6. 플레이어 공격이면 다음 프레임 부근에 성공/실패 이벤트가 나가, Passive 등 반응 루프가 붙을 수 있습니다. 반응의 소유는 Hitmark가 아닙니다.

UI 스킬 상세에서 예상 피해를 보여줄 때도, 가능하면 **같은 피해 계산 경로**를 재사용합니다. 전투 씬에 적이 없어도 이 Hitmark면 어떤 식인가를 맞추기 위해서입니다.

## 예시

| 콘텐츠 | 갈래 · Hitmark | 다른 층 |
|--------|----------------|---------|
| 참격 스킬 | Target + 참격 Hitmark → 한 방 | Skill이 시전·쿨·애니 타이밍 |
| 지면 폭발 | Area + 폭발 Hitmark → 범위 다수 | Skill/Passive가 Activate |
| 화살 | Projectile transport 후 동일 Hitmark Apply | Skill이 발사 시전 |
| 화염 도트 | (틱마다) Target 등 + 작은 Hitmark | Buff가 스택·간격 |
| 유물 치명 시 폭발 | Area 또는 Target + 폭발 Hitmark | Passive가 조건 후 위임 |

참격과 도트가 **같은 작은 화상 Hitmark**를 쓰도록 맞출 수도 있습니다. 숫자를 Skill·Buff 행에 각각 적지 않고 Hitmark 한곳을 고칩니다.

## 데이터 요지

| 구분 | 요지 |
|------|------|
| Hitmark 본체 | Scriptable 정의. 런타임은 clone 소비 |
| Skill 등 테이블 | Hitmark ID 목록만. 피해 식 인라인 없음 |
| Stat | 공격력·방어 등은 계산기가 조회. Modifier 정책은 Stat 층 |

모든 전투 수치를 Json 한 종류로 모으지 않은 이유는, 타격 정의가 에디터에서 조합·검증하기 좋은 쪽이기 때문입니다. Skill 밖에 둔 **설계 Why**는 [시리즈 3편]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }})에 모아 두었습니다.

## 이 글에서 다루지 않는 것

| 주제 | 위치 |
|------|------|
| 네 층 전체 지도·Why | [전투 경계 시리즈]({{ "/notes/combat-four-layers/" | relative_url }}) |
| 입력부터 Vital 한 줄기 | [스킬 한 번의 해피 패스 (노트)]({{ "/notes/combat-skill-happy-path/" | relative_url }}) |
| Hitmark를 Skill 밖에 둔 이유 | [Hitmark를 스킬 밖에 둔 이유 (노트)]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) |
| Buff vs Passive Why | [Buff와 Passive를 나눈 이유 (노트)]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) |
| 물리/마법 공격력 계약과 구현 갭 | [출시까지 지킨 경계와 남은 갭 (노트)]({{ "/notes/combat-boundaries-shipped/" | relative_url }}) |
| 투사체 이동 종류·풀·매니저 | Projectile transport 상세 (요지만 위에) |
| 히트 VFX·플로팅 텍스트 연출 | 전투 피드백 쪽 (이 글 범위 밖) |

## 정리

Hitmark는 스킬 이름이 아니라 **재사용 타격 정의**이고, Target·Area·Projectile은 그 정의를 **누구에게 적용할지** 정하는 공격 런타임 갈래입니다. 갈래가 달라도 Apply 이후는 같은 피해·Vital 파이프라인입니다. 시전 타이밍과 상태·사건 규칙은 다른 층에 둡니다.
