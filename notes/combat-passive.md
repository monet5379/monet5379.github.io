---
layout: page
title: 전투 구조 3/4 Passive 사건 규칙
permalink: /notes/combat-passive/
date: 2026-08-04
excerpt: "트리거·조건·효과와 실행 큐로 동작하는 Passive 층의 구조를 정리합니다."
tags: [전투]
series: combat-structure
series_title: 전투 구조
series_order: 3
series_total: 4
---


트리거·조건·효과와 실행 큐로 동작하는 Passive 층의 구조를 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투에서 담당한 Passive(사건 규칙) 층입니다. 네 층 지도·Why는 [전투 경계 시리즈]({{ "/notes/combat-four-layers/" | relative_url }})·[시리즈 4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }})을, 시전·타격은 [Skill]({{ "/notes/combat-skill/" | relative_url }})·[Hitmark]({{ "/notes/combat-hitmark/" | relative_url }})로 넘깁니다. 이 글은 **구조와 런타임 흐름**에 초점을 둡니다.

**권장 읽기:** 구조(How) 1→4 후 [경계]({{ "/notes/combat-four-layers/" | relative_url }})(Why) 1→5

**구조:** [1 Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) · [2 Skill]({{ "/notes/combat-skill/" | relative_url }}) · **3** · [4 Buff]({{ "/notes/combat-buff/" | relative_url }})

## 맥락

공격하면 버프를 건다, 포션을 마시면 확률이 오른다처럼, 플레이어가 버튼을 누르지 않아도 돌아가는 규칙이 있습니다. 이런 규칙을 Skill이나 Buff 안에 녹이면, 수명·재발동·디버그 질문이 섞입니다.

Passive는 **무슨 일이면 무엇을 하는가**에만 답합니다. 피해 식과 Buff 스택 정책은 소유하지 않고, 조건이 맞으면 Buff·Hitmark·Skill API에 일을 위임합니다.

| 용어 | 의미 |
|------|------|
| Trigger | 규칙이 귀 기울이는 사건 (공격 성공, 스킬 시전, 포션 등) |
| Condition | 확률·횟수 등 발동 조건 |
| Effect | 실제 일. Buff Add, Hitmark, 쿨 감소 등으로 위임 |
| 실행 큐 | 전역에서 지연·프레임 상한을 두고 Effect를 돌림 |

## 구조

| | 내용 |
|--|------|
| 소유 | Trigger→Condition→Execute, Rest, 실행 큐 등록, Effect 위임 |
| 소유하지 않음 | 피해 공식, Vital 적용, Buff 스택·CC 정책, 스킬 쿨 본체 |
| 데이터 | Scriptable (트리거·조건·효과 설정 조합) |
| 부여 | Skill·아이템·유물 등이 Passive를 **장착**. 장착 후 사건이 규칙을 깨움 |

캐릭터마다 Passive 런타임이 있고, 실행은 전역 매니저 큐를 거칩니다. 이번만 Effect를 직접 호출을 늘리면 폭주·순서 규율이 깨지기 쉬워, Execute는 큐 경유를 전제로 둡니다.

```
Skill / Item / Relic → Passive 부여 (장착)
게임 이벤트
  → Trigger 매칭
  → Condition (확률·횟수 등)
  → TryExecute (Rest·최대 발동)
  → 전역 실행 큐 (delay 포함)
  → Effect → Buff / Hitmark / Skill API …
```

## 런타임 흐름

### 부여

1. Skill 시전·아이템·유물 등이 Passive를 추가합니다.
2. 정의를 읽어 런타임을 붙이고, 해당 Trigger 수신을 등록합니다.
3. 이후부터는 사건이 규칙을 깨웁니다. 부여 자체가 즉시 Effect인 경우와, 규칙만 장착인 경우를 구분해서 봅니다.

### 트리거·실행

1. 공격 성공/실패, 스킬 시전, 포션 등 이벤트가 들어옵니다.
2. Trigger가 맞으면 Condition을 검사합니다.
3. Rest·최대 실행 횟수를 통과하면 실행 큐에 올립니다. delay 0이어도 큐를 거칩니다.
4. 큐가 차례로 Effect를 돌립니다. Buff 부여, Hitmark 추가 공격, 쿨 감소, 보상 등이 대표적입니다.
5. Rest가 걸리면 같은 규칙의 재발동을 막거나 줄입니다.

### 폭주를 막는 장치

이 절이 폭주 제어 How의 **정본**입니다. 역할 분리 Why는 [시리즈 4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }})에 둡니다.

Passive는 전투 이벤트에 연쇄되기 쉽습니다.

- **전역 큐** — 캐릭터 로컬에서 Effect를 즉시 끝내지 않음
- **프레임당 실행 상한** — 한 프레임 반응 폭주 완화
- **Rest** — 동일 규칙의 재발동 간격

대가는 발동이 다음 프레임·지연 뒤로 밀리거나, 상한에 걸려 그 프레임에 못 돌 수 있다는 점입니다. 실시간 액션에서는 한 프레임에 규칙을 다 끝내는 것보다 프레임 예산을 지키는 쪽을 택했습니다.

이벤트 순서(공격 성공 계열과 Passive·Buff·Damage)도 민감합니다. 같은 타격인데 버프가 먼저인지 같은 이슈는 경계 문서에 함정으로 남기는 편입니다.

## 예시

가상의 유물 치명 후 폭발과 스킬이 부여하는 공격 시 화염을 떠올립니다.

| 콘텐츠 | Passive 쪽 | 위임 |
|--------|-----------|------|
| 치명 후 폭발 | 공격 성공 Trigger + 치명 조건 | 폭발 Hitmark 호출 |
| 공격 시 화염 | 공격 성공 Trigger + 확률 | 화염 Buff Add (스택·도트는 Buff) |
| 포션 마실 때 쉴드 | 포션 Trigger + 확률 | 쉴드 Buff Add |

화염 **도트 틱**의 피해는 Buff가 Hitmark를 다시 부르는 경로입니다. Passive는 공격 성공이면 화염 상태를 걸지까지만 정합니다.

## 데이터 요지

| 구분 | 요지 |
|------|------|
| Passive 정의 | Scriptable. 트리거·조건·효과 설정 |
| 소비 | 데이터 Facade로 정의 복사·조회. 런타임 SO 직접 변조 지양 |
| 효과 대상 | Buff·Hitmark·Skill 등 각 층 API. Passive 안에 피해 식 복제 없음 |

트리거 종류 전체 목록·Inspector 필드 나열은 이 글 범위 밖입니다. 새 규칙을 넣을 때의 질문은 어느 Trigger인가 / 조건은 무엇인가 / Effect는 어디에 위임하는가입니다.

## 이 글에서 다루지 않는 것

| 주제 | 위치 |
|------|------|
| Buff 스택·CC·DoT | [Buff 지속 상태]({{ "/notes/combat-buff/" | relative_url }}) · [시리즈 4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) |
| Hitmark 피해 파이프라인 | [Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }}) |
| 스킬 시전·쿨·버퍼 | [Skill 시전 구조]({{ "/notes/combat-skill/" | relative_url }}) |
| 출시·순서 갭·GC | [시리즈 5편]({{ "/notes/combat-boundaries-shipped/" | relative_url }}) · 성능 노트 |

## 정리

Passive는 캐릭터에 붙는 **사건 규칙**입니다. Trigger와 Condition으로 발동을 걸러 실행 큐에 올리고, Effect는 Buff·Hitmark·Skill에 위임합니다. 피해 식과 지속 상태 정책은 다른 층에 두고, 무슨 일이면 무엇을 할지만 여기서 고정합니다.

다음: [전투 구조 4/4 Buff 지속 상태]({{ "/notes/combat-buff/" | relative_url }})
