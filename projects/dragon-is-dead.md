---
layout: page
title: 드래곤 이즈 데드
permalink: /projects/dragon-is-dead/
date: 2025-06-06
order: 10
project_kind: company
role: 개발 리드
excerpt: "프로그래머 1~2명 규모 개발 리드. Steam EA·정식 출시. 전투·세이브·데이터·성능까지 클라이언트를 출시 후까지 지킨 액션 게임입니다."
---

{% include screenshot-carousel.html slug="dragon-is-dead" youtube="0f0ZXseDMUM" steam="https://store.steampowered.com/app/2803280/Dragon_Is_Dead/" %}

## 개요

프로그래머 1~2명 규모 개발 리드. Steam EA·정식 출시. 전투·세이브·데이터·성능까지 클라이언트를 출시 후까지 지킨 액션 게임입니다.
클라이언트 전반을 구현하고, 출시 후 유저 체감 축(끊김·세이브·성능·플랫폼)을 줄였습니다.

- 기간: 2022.05 – 2026.06 (팀써니트)
- 플랫폼: Steam (PC) · Deck 대응
- 팀 규모: 프로그래머 1~2명
- 내 역할: 개발 리드 / 프로그래밍
- 성과: 2024.06.07 얼리 액세스 발매, 2025.06.06 정식 출시

## 맥락

드래곤 이즈 데드는 [블레이드 어썰트]({{ "/projects/blade-assault/" | relative_url }})를 출시한 뒤, 더 큰 세계를 만들기로 하면서 시작했습니다. 처음에는 2D 플랫포머 RPG였습니다. 디아블로 2처럼 마을이 있고, NPC가 지역마다 퀘스트를 내주는 방향이었습니다. 퀘스트 진행에 따라 NPC를 마을이나 특정 지역에 등장시키고, 메인·서브 퀘스트를 깨게 했습니다. 스킬 트리와 인벤토리는 디아블로 4에서 영감을 받았습니다. 1년이 넘는 동안 얼리 액세스 스펙이던 액트 1(지역 8곳)을 만든 뒤에, 원래 계획했던 액트 4까지는 진행할 수 없다고 판단했습니다. 이후 장르를 로그라이트로 바꾸고 수정과 개선을 많이 했습니다. 얼리 액세스로 액트 1까지 작업한 뒤, 콘텐츠를 대폭 고쳐 정식 출시에 필요한 지역을 하나 더 넣었습니다.

## 기여

- 소규모 팀에서 출시까지 클라이언트 개발을 리드했습니다.
- 성장·입력·전투, 적 AI·스테이지, 카메라·연출, UI·설정, 세이브·데이터, 로컬라이즈, Steamworks, 애널리틱스를 포함한 게임플레이·클라이언트 전반을 담당했습니다.
- 얼리 액세스 이후 정식 출시까지 세이브 손상·복구, 고정 데이터 파이프라인, 외부 업체 포팅(저사양·Deck)에 맞춘 성능·연동 가드로 라이브 이슈를 줄였습니다.

## 담당 시스템

### 게임플레이 · 전투

#### 타격·데미지

**맞으면 HP가 어떻게 줄어드나** — 필드에 누가 있는지, 피해 숫자는 어디서 오는지, 맞았을 때 HP·투사체까지 어떻게 처리되는지를 캐릭터 → Stat → Hit flow → 투사체 네 편으로 나눈 시리즈입니다. 스킬 시전·버프·패시브가 한 타격으로 이어지는 아래 트리거·연쇄보다 먼저 다루는 축(피격·수치)입니다.

노트: [전투 클러스터 읽기 지도]({{ "/notes/dragon-combat-cluster-read/" | relative_url }}) · [1 — 캐릭터]({{ "/notes/dragon-combat-character/" | relative_url }}) · [2 — Stat]({{ "/notes/dragon-combat-stat/" | relative_url }}) · [3 — Hit flow]({{ "/notes/dragon-combat-hit-flow/" | relative_url }}) · [4 — 투사체]({{ "/notes/dragon-combat-projectile/" | relative_url }})

#### 트리거·연쇄

**한 번의 공격 입력이 버프·패시브·최종 피해까지 이어지는 경로**입니다. 스킬 시전(애니·타이밍) 뒤 타격이 적용되는 시점부터, 버프 중첩·패시브 발동·한 타격으로 모이는 값까지 네 편으로 나눴습니다.

노트: [1 — Apply 시점]({{ "/notes/dragon-combat-skill-bridge/" | relative_url }}) · [2 — Buff]({{ "/notes/dragon-combat-buff-bridge/" | relative_url }}) · [3 — Passive]({{ "/notes/dragon-combat-passive-bridge/" | relative_url }}) · [4 — 한 타격]({{ "/notes/dragon-combat-one-hit/" | relative_url }})

#### 입력 · Ability

키·패드 입력은 캐릭터 **Ability**가 매 프레임 읽습니다. 이동·점프·대시·스킬·상호작용을 Early/Process/Late로 나누고, 전투 준비(BattleReady)와 입력 게이트를 분리했습니다. 몬스터는 AI가 같은 캐릭터 API에 위임합니다.

노트: [타격·데미지 1 — 캐릭터]({{ "/notes/dragon-combat-character/" | relative_url }}) · [스킬이 어떻게 시전되는가]({{ "/notes/dragon-skill-cast/" | relative_url }})

#### 스킬 (기획: 디아블로 4 액션바·스킬 트리 참고)

기획에서 디아블로 4를 참고해 잡은 **기본 / 핵심 / 보조 / 숙련 / 궁극** 카테고리를 기준으로 구현했습니다. **습득 → 액션 슬롯 할당 → 레벨** 순으로 프로필에 쌓이고, 레벨업·장비(룬워드)·유물에서도 스킬을 부여합니다. 시전 의도(Skill)와 타격(Hitmark)·상태(Buff)·규칙(Passive)은 분리했습니다.

노트: [스킬이 어떻게 성장하는가]({{ "/notes/dragon-skill-growth/" | relative_url }}) · [스킬이 어떻게 시전되는가]({{ "/notes/dragon-skill-cast/" | relative_url }})

### 성장 · 빌드

#### 인벤토리

기획에서 디아블로 시리즈를 참고한 장비 슬롯·격자 가방·등급/옵션 툴팁을 구현했습니다.

장비 인스턴스(등급·Stat 옵션·룬워드·신화·균열 보석)를 프로필에 보관하고, 착용 시 Stat·Skill을 캐릭터에 반영합니다. 가방·장비·Essence 슬롯, 창고, 필드 픽업·버리기·판매 흐름을 연결합니다.

노트: [1 — 보관·획득]({{ "/notes/dragon-inventory-store/" | relative_url }}) · [2 — 착용·Stat·Skill]({{ "/notes/dragon-inventory-equip/" | relative_url }})

#### 유물

장비와 별도 슬롯에 유물을 두고, 보유 태그 합으로 Synergy 임계(예: Rapidity 3/5)를 넘기면 쿨 감소 등 효과를 켭니다.

캐릭터별 슬롯에 보관하고, 드랍 후보 풀에서 등급별 추첨·획득·슬롯 교체·버리기를 처리합니다. 착용 시 Stat·Relic Skill·Synergy Skill을 갱신하며, 캠프 강화·Passive 부여·획득·시너지 Analytics 이벤트와 연동합니다.

노트: [1 — 획득·슬롯]({{ "/notes/dragon-relic-acquire/" | relative_url }}) · [2 — Apply·Synergy]({{ "/notes/dragon-relic-apply/" | relative_url }})

### 월드 · 연출

#### 적 AI·스테이지

- FSM 기반 적 AI(Brain / State / Action / Decision) — 이동·공격 의도는 Character API에 위임
- Area · Stage: 도전 시작 시 지역 전투 스테이지 일괄 스폰 · [지역 안 이동은 활성/비활성]({{ "/notes/stage-spawn-area-preload/" | relative_url }})
- 웨이브 스폰, 상호작용·드랍·퀘스트 연동

#### 카메라·연출

- Cinemachine 기반 follow / bound / zoom / shake / 미니맵 카메라
- Timeline 컷신·시그널, Feedbacks로 전투 연출 일원화

#### UI·설정

- Scene UI 허브(팝업·HUD·게이지·플로팅 텍스트), 입력·HUD 동기화
- 오디오/비디오/언어 설정 영속화, 게임패드·키보드 라우팅

### 출시 · 운영

#### 세이브·데이터

- [Excel→Json]({{ "/notes/excel-json-fixed-data/" | relative_url }}) 고정 데이터 · 기획 표가 아닌 것은 ScriptableObject
- 슬롯 프로필 `persistentDataPath` · 쿨다운·백업·마이그레이션·복구는 타이틀 · Auto-Cloud · [슬롯 로테이션·Essential·복구 체인]({{ "/notes/dragon-save-shipped/" | relative_url }})
- 한계: 디스크를 Main·Side·Meta 레인으로 나누지는 않았습니다. 설계상 경계는 [세이브 레이아웃]({{ "/projects/save-layout/" | relative_url }})의 [Main·Side·Meta]({{ "/notes/save-layout-boundaries/" | relative_url }})와 [Side 레인]({{ "/notes/save-layout-side-lane/" | relative_url }}) 문서에 정리해 두었습니다.

#### 로컬라이즈

- 다국어 문자열(JSON)·StringGetter·언어 전환 시 UI 일괄 갱신
- 언어별 [Static 문자셋 추출]({{ "/notes/tmp-static-font-atlas/" | relative_url }}) · 부팅·언어 전환 [폰트 워밍업]({{ "/notes/tmp-font-warmup/" | relative_url }})
- 패키지 [TMP 폰트 파이프라인]({{ "/projects/tmp-font-pipeline/" | relative_url }})

#### Steamworks / 플랫폼

- Steam 초기화·Stats, 업적(보스/난이도/수집 등), 시즌 리더보드(업로드·다운로드·아바타)
- Steam Deck 런타임 감지(튜토리얼 등 UX 분기)
- **출시·포팅 대응**: Deck에서 재생되지 않는 동영상 포맷·입력 UI 아이콘 유효성 가드로 라이브 이슈를 줄였습니다.
- 세이브는 Auto-Cloud로 경로만 동기화하고, [RemoteStorage에 API를 묶지 않았습니다]({{ "/notes/dragon-save-shipped/" | relative_url }}).

### 성능 (외부 업체 포팅 대응)

얼리 액세스 이후, 닌텐도처럼 낮은 프레임을 허용하는 기기용 외부 업체 포팅에 맞춰 성능을 측정하고 프레임 비용을 줄였습니다.

- [플레이어 빌드 로그 호출·인자 평가 제거]({{ "/notes/conditional-log-build-cost/" | relative_url }})
- [지역 내 이동 hitch 완화(선스폰)]({{ "/notes/stage-spawn-area-preload/" | relative_url }})
- [카메라 이동 GPU를 Global·Ambient 레버로 분리]({{ "/notes/stage-visual-gpu-optimize/" | relative_url }})
- TMP hitch — 로컬라이즈와 동일 축

#### 애널리틱스

- Unity Gaming Services Analytics 연동 — 릴리스 텔레메트리 초기화 · `Report*` → CustomEvent
- 게임플레이 이벤트(도전 종료, 사망, 스킬/유물 획득·시너지) · 치명 클라이언트 에러는 메시지로 QA 보완
- 에디터·Development·`DISABLEANALYTICS`로 원격 전송과 로컬 로그 분리 (Steam 리더보드·세이브 통계와는 별 파이프)
- **한계**: 텔레메트리는 관련 메시지를 받기만 했을 뿐, 이벤트·에러를 분석해 실제 게임에 유의미한 밸런스 패치로 이어진 적은 없었습니다.

## 스택

Unity, C#, Cinemachine, Timeline, Steamworks, Unity Gaming Services Analytics

## 링크

### 외부

- [Steam](https://store.steampowered.com/app/2803280/Dragon_Is_Dead/)
- [YouTube](https://youtu.be/0f0ZXseDMUM?si=VXCv4QvJkLEn-ji9)
