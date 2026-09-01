---
layout: page
title: 전투 경계 1/5 네 층으로 나눈 이유
permalink: /notes/combat-four-layers/
date: 2026-08-04
excerpt: "Dragon is Dead 전투를 Skill·Hitmark·Buff·Passive 네 층으로 나눈 경계와, 그렇게 둔 이유를 정리합니다."
tags: [전투]
series: combat-boundaries
series_title: 전투 경계
series_order: 1
series_total: 5
---


Dragon is Dead 전투를 Skill·Hitmark·Buff·Passive 네 층으로 나눈 경계와, 그렇게 둔 이유를 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투·성장 담당에서 설계·유지한 내용입니다. 클래스 목록이 아니라 **소유 경계**와 **왜 그렇게 나눴는지**에 초점을 둡니다. 층별 How는 구조 노트에, 이 시리즈는 지도·Why·출시에 둡니다.

**권장 읽기** — 구조(How·개요) 1→4 후, 경계(Why·출시) 1→5.

**시리즈: 전투 경계 (1/5)** — **1** · [2]({{ "/notes/combat-skill-happy-path/" | relative_url }}) · [3]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · [4]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) · [5]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

**구조 노트:** [1 Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) · [2 Skill]({{ "/notes/combat-skill/" | relative_url }}) · [3 Passive]({{ "/notes/combat-passive/" | relative_url }}) · [4 Buff]({{ "/notes/combat-buff/" | relative_url }})

## 맥락

실시간 사이드뷰 액션에서 전투는 스킬 시전, 한 번의 타격, 지속 상태, 조건 반응, 스탯·Vital이 한꺼번에 얽힙니다. 콘텐츠가 늘수록 “스킬 클래스 하나”에 피해·도트·발동 조건을 몰아넣으면, 추가·수정·밸런스가 서로를 깨기 쉽습니다.

얼리 액세스부터 정식 출시까지 스킬·히트·버프·패시브 콘텐츠를 같은 경계 위에서 뽑았습니다. 이 글은 그 경계의 **지도**입니다. 각 층의 런타임·데이터 상세는 구조 노트를, 깊은 Why는 이어지는 시리즈 편을 보면 됩니다.

## 네 층

한 줄로 보면 역할은 이렇게 나뉩니다.

| 층 | 질문에 답한다 | 소유하는 것 | 넘기지 않는 것 | 구조 노트 |
|----|---------------|-------------|----------------|-----------|
| **Skill** | 언제 쓰는가 | 입력, 쿨다운, 시전 Rest, 입력 버퍼, 슬롯·레벨 | 피해 공식, 스택·CC 규칙 | [Skill]({{ "/notes/combat-skill/" | relative_url }}) |
| **Hitmark** | 무엇이 맞는가 | 타격 정의 → 피해 계산 → Vital 적용 | 쿨다운, 패시브 조건식 | [Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) |
| **Buff** | 지금 어떤 상태인가 | 스택, 지속 시간, 상태이상(CC), 스탯, 자체 주기 트리거 | 이벤트 자동 규칙 전체 | [Buff]({{ "/notes/combat-buff/" | relative_url }}) |
| **Passive** | 무슨 일이면 무엇을 하는가 | 트리거 → 조건 → 효과, 지연 실행·프레임 상한 | 피해 식 자체, Buff 스택 정책 | [Passive]({{ "/notes/combat-passive/" | relative_url }}) |

의존은 대략 한 방향으로 둡니다. Skill이 시전을 오케스트레이션하고, Hitmark가 타격을 적용하며, Buff·Passive는 그 결과와 이벤트에 반응하거나 Skill이 부여합니다. Passive·Buff 효과는 다시 Hitmark나 Buff API를 호출할 수 있지만, **피해 공식과 스택 정책**의 소유자는 바뀌지 않습니다.

```
Skill (시전)
  ├─ Hitmark  → 피해 계산 → Vital
  ├─ Buff Add
  └─ Passive Add
         ↓ (전투 이벤트)
Passive / Buff 반응 → Buff · Hitmark · Skill API (위임)
```

프로젝트 페이지에 적어 둔 히트마크 → 피해 계산 → Vital은 이 지도에서 **Hitmark 층**의 한 줄기입니다. Skill·Buff·Passive는 그 앞과 뒤를 담당합니다.

## 왜 네 층인가

경계를 나눈 이유는 레이어를 예쁘게가 아니라, **콘텐츠를 늘려도 한 시스템이 다른 시스템을 삼키지 않게** 하려는 것이었습니다.

**재사용.** 같은 타격 정의를 스킬·투사체·버프 주기 피해가 ID로 공유합니다. 스킬마다 피해 로직을 복제하지 않습니다. Hitmark를 Skill 안에 두지 않은 이유는 [3편]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }})에서 더 짚습니다.

**역할 충돌 방지.** 캐릭터에 붙어 있는 지속 상태와 사건 기반 자동 규칙은 겉보기에 비슷한 효과를 낼 수 있어도, 수명·재발동·스택 정책이 다릅니다. 전자는 Buff, 후자는 Passive로 두고, Passive 효과는 Buff·Attack·Skill API에 위임합니다. 차이의 세부와 폭주 제어는 [4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }})에서 다룹니다.

**폭주 제어.** 패시브는 공격 성공 같은 이벤트에 연쇄될 수 있습니다. 실행을 전역 큐와 프레임당 상한으로 모으면, 한 프레임에 반응이 폭주하는 경로를 줄일 수 있습니다.

**데이터 변경 속도.** 스킬 슬롯·레벨·테이블성 수치는 Json 쪽에 두고, Hitmark·Buff·Passive처럼 에디터에서 조합·검증하기 좋은 정의는 Scriptable 쪽에 둡니다. 모든 전투 데이터를 한 포맷에보다, **누가 얼마나 자주 고치는가**에 맞춘 선택입니다.

**확장 비용.** Buff의 이벤트 반응은 거대 switch보다 트리거 종류별 핸들러로 나누는 편이, 새 트리거를 넣을 때 기존 분기를 덜 건드립니다. 이 또한 Buff 층의 책임 안에서 끝난 일입니다.

정리하면, Skill은 **의도**, Hitmark는 **한 방**, Buff는 **상태**, Passive는 **규칙**입니다. 출시 전까지 이 네 질문이 섞이지 않게 유지하는 것이 목표였습니다.

## 이 글에서 다루지 않는 것

| 주제 | 다룰 곳 |
|------|---------|
| Hitmark·Skill·Passive·Buff 런타임·데이터 | [구조 노트]({{ "/notes/combat-hitmark/" | relative_url }}) |
| 입력 → 시전 → Hitmark → Vital 한 줄기 | [2편]({{ "/notes/combat-skill-happy-path/" | relative_url }}) |
| Hitmark를 Skill 밖에 둔 이유 | [3편]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) |
| Buff vs Passive, 연쇄·Rest·상한 | [4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) |
| EA→정식에서 경계가 버틴 점과 남은 구현 갭 | [5편]({{ "/notes/combat-boundaries-shipped/" | relative_url }}) |
| 애니 클립·VFX·트리거 카탈로그 | 구조 노트 요지 또는 범위 밖 |
| GC·풀링·핫패스 할당 | 별도 성능 노트 |

코드 경로·필드 목록은 스튜디오 내부 Architecture 문서를 정본으로 두고, 이 시리즈는 채용·외부 독자용으로 **설계 의도**만 공개합니다.

## 정리

Dragon is Dead 전투는 Skill·Hitmark·Buff·Passive 네 층의 소유 경계로 나뉘어 있습니다. 시전 타이밍, 타격 정의, 지속 상태, 사건 반응을 섞지 않은 덕분에, 콘텐츠를 늘리면서도 어디에 넣을지를 같은 기준으로 결정할 수 있었습니다.

다음: 구조는 [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }})부터, 시리즈는 [스킬 한 번의 해피 패스]({{ "/notes/combat-skill-happy-path/" | relative_url }}).
