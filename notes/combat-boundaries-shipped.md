---
layout: page
title: 전투 경계 5/5 출시까지 지킨 경계와 남은 갭
permalink: /notes/combat-boundaries-shipped/
date: 2026-08-04
excerpt: "Skill·Hitmark·Buff·Passive 경계가 얼리 액세스부터 정식까지 준 이득과, 문서에 남긴 구현 갭을 정리합니다."
tags: [DragonIsDead, Architecture, Combat]
series: combat-boundaries
series_title: 전투 경계
series_order: 5
series_total: 5
---


Skill·Hitmark·Buff·Passive 경계가 얼리 액세스부터 정식까지 준 이득과, 문서에 남긴 구현 갭을 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 전투 경계 시리즈의 5편(마지막)입니다. 층별 How는 [전투 구조]({{ "/notes/combat-hitmark/" | relative_url }}) 노트에, [1편]({{ "/notes/combat-four-layers/" | relative_url }})~[4편]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) 지도가 출시 안에서 **무엇을 지키게 했는지**를 이 글에서 봅니다.

**시리즈:** [1]({{ "/notes/combat-four-layers/" | relative_url }}) · [2]({{ "/notes/combat-skill-happy-path/" | relative_url }}) · [3]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · [4]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) · **5**

## 맥락

소규모 팀에서 전투·성장 콘텐츠는 시즌·패치마다 늘어납니다. 경계가 없으면 «이번 스킬만 예외»가 쌓이고, 라이브 이슈의 재현 범위가 게임 전체로 커집니다.

Dragon은 2024.06 얼리 액세스, 2025.06 정식 출시까지 같은 전투 클러스터 위에서 스킬·히트·버프·패시브를 유지했습니다. 이 글의 주장은 «완벽한 설계»가 아니라, **출시 가능한 소유 경계를 문서와 코드에 남긴 것**입니다.

## 경계가 준 이득

**콘텐츠 배치 기준이 고정된다.** 새 효과가 들어오면 먼저 묻습니다. 시전 타이밍인가, 타격 정의인가, 지속 상태인가, 사건 규칙인가. 답이 갈리면 넣는 층이 갈립니다. 리뷰 시간이 «어디에 짜지?»에서 «이 층 불변조건을 깨나?»로 이동합니다.

**회귀 범위를 줄인다.** Hitmark 수치만 건드린 패치와 Passive 조건만 건드린 패치를 같은 PR에 섞지 않게 됩니다. 라이브에서 «특정 유물만 이상하다»와 «가드 계산이 이상하다»를 층으로 나눠 볼 수 있습니다.

**설명 가능한 파이프라인이 남는다.** 채용·인수인계·본인 회고에서 «히트마크 → 피해 계산 → Vital» 한 줄과, 그 앞의 Skill·뒤의 Buff/Passive를 같은 지도로 말할 수 있습니다. 구현을 외우지 않아도 경계를 설명할 수 있게 하는 것이 목표였습니다.

**문서를 정본 위치로 둔다.** 스튜디오 쪽에서는 층마다 Architecture를 나누고, 서로 로직을 복사하지 않고 링크만 걸도록 했습니다. 공개 노트(이 시리즈)는 그 정본의 복제가 아니라, 외부용으로 의도만 옮긴 것입니다.

## 출시 과정에서 단련된 규율

이론보다 패치에서 굳어진 것들입니다.

- Skill은 쿨·Rest·버퍼·슬롯을 지키고, 피해 식에 손을 넣지 않는다.
- Hitmark 로드 실패·무효 정의는 Apply를 밀어붙이지 않고 끊는다.
- Passive 실행은 전역 큐·프레임 상한·Rest를 전제로 한다. «이번만 직접 Effect»를 늘리지 않는다.
- Buff 제거 시 Stat 소스를 같이 제거한다. 상태이상 호환 맵과 실제 활성 상태를 어긋나게 두지 않는다.
- 데이터는 Facade로만 읽는다. 전투 핫패스에서 도메인 dict를 직접 갈라 타지 않는다.

이런 문장은 디자인 문서의 슬로건이 아니라, **깨지면 크래시·무한 연쇄·스탯 잔존**으로 이어진 경험에서 온 쪽에 가깝습니다.

## 남은 갭 (솔직히)

경계를 나눴다고 계약과 구현이 항상 일치한 것은 아닙니다.

**물리/마법 공격력 계약.** 타입별 공격력(물리·마법) 계약은 문서와 코드를 따로 맞춰 볼 지점입니다. 레이어를 나눴다고 수치 계약이 자동으로 맞는 것은 아니며, 감사 때 어긋남을 발견하면 구현 추적은 별 작업으로 둡니다.

**순서 민감도.** Passive·Buff·Damage 이벤트 순서는 규율로 묶어두지만, 콘텐츠가 늘수록 «한 타격의 반응 순서» QA가 필요합니다. 층 분리의 대가입니다.

**성능은 다른 축.** 입력 버퍼·Passive·Buff 경로의 할당·GC는 이 시리즈의 경계 이야기와 겹칠 수 있으나, 측정·처리는 [성능 노트]({{ "/notes/" | relative_url }}) 쪽 작업입니다. «설계가 깔끔하니 프레임도 안전하다»고 닫지 않습니다.

**Skill 데이터 매체.** Skill 로직·테이블은 Json 쪽을 쓰며, Scriptable SkillAsset으로의 이관은 목표로 남겨 둔 과도기가 있습니다. Hitmark/Buff/Passive와 매체가 다른 것 자체는 1·3편의 선택이지만, Skill 쪽 매체가 한곳에 모이지 않은 상태는 부채입니다.

## 이 시리즈를 어떻게 쓰면 좋은지

| 독자 | 권장 읽기 |
|------|-----------|
| 처음 | [구조 1→4]({{ "/notes/combat-hitmark/" | relative_url }}) 후 [경계 1]({{ "/notes/combat-four-layers/" | relative_url }})→5 |
| 짧게 | [1편]({{ "/notes/combat-four-layers/" | relative_url }}) + 위 «경계가 준 이득» |
| How / Why / 출시 | 구조 노트 · 경계 2~4 · 이 글 |

면접용 구어체 대본은 사이트 notes와 별도로 두는 편이 낫습니다. 여기서는 **합니다체로 설계 의도**만 고정합니다.

## 정리

네 층 경계의 메리트는 추상적인 우아함이 아니라, 얼리 액세스부터 정식까지 **콘텐츠를 같은 질문에 넣어 출시한 것**입니다. 그 과정에서 불변조건과 이벤트 순서가 단련되었고, 타입별 공격력 계약 감사·순서 QA·성능·Skill 매체 과도기는 남는 일로 열어 둡니다.

시리즈 전체의 한 줄은 처음과 같습니다. Skill은 의도, Hitmark는 한 방, Buff는 상태, Passive는 규칙입니다.
