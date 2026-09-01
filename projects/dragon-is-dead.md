---
layout: page
title: 드래곤 이즈 데드(Dragon is Dead)
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

- 소규모 팀에서 클라이언트 개발을 리드하며 출시까지 일정을 조율했습니다.
- 성장·입력·전투, 적 AI·스테이지, 카메라·연출, UI·설정, 세이브·데이터, 로컬라이즈, Steamworks, 애널리틱스를 포함한 게임플레이·클라이언트 전반을 담당했습니다.
- 얼리 액세스 이후 정식 출시까지 세이브 손상·복구, 고정 데이터 파이프라인, 외부 업체 포팅(저사양·Deck)에 맞춘 성능·연동 가드로 라이브 이슈를 줄여 갔습니다.

## 담당 시스템

### 플레이 루프

스킬 후보(성장) → 키를 행동으로(입력 · Ability) → 한 방·상태·Vital(전투)를 한 축으로 둡니다.

#### 성장

- **스킬** (기획: 디아블로 4 액션바·스킬 트리 참고)

  ![스킬 트리 — Sword of Frost]({{ "/assets/images/projects/dragon-is-dead/ss-03.jpg" | relative_url }})

  기획에서 디아블로 4를 참고해 잡은 **기본 / 핵심 / 보조 / 숙련 / 궁극** 카테고리를 기준으로 구현했습니다.

  - **구조**: 스킬 습득 → 액션 슬롯 할당 → 레벨. SkillSystem이 런타임 인스턴스를 두고, 시전 의도(Skill)와 타격 정의(Hitmark)·상태(Buff)·규칙(Passive)을 분리합니다. 레벨업·장비(룬워드)·유물에서도 스킬을 부여합니다.
  - **데이터**: 스킬 로직·테이블은 Excel→Json, 학습·슬롯·레벨은 프로필에 저장합니다. Hitmark/Buff/Passive는 Scriptable로 두고 ID·이름으로 연결합니다.
  - **애니메이션**: SkillAnimation(Scriptable)을 스킬 ID로 조회해 애니메이터에 붙입니다. 시전 시 클립을 재생하고, Animation Event 시점에 Hitmark·Buff·Passive를 적용합니다(시전과 타격 프레임 분리).
  - **입력**: 액션 슬롯에 할당한 스킬만 입력이 받습니다. 버퍼·Cast/Ability Rest 등 적용 경로는 입력 · Ability에 둡니다.
- **인벤토리**

  ![인벤토리·장비 — Frost Wolf's Teeth]({{ "/assets/images/projects/dragon-is-dead/ss-06.jpg" | relative_url }})

  기획에서 디아블로 시리즈를 참고한 장비 슬롯·격자 가방·등급/옵션 툴팁을 구현했습니다.

  장비 인스턴스(등급·Stat 옵션·룬워드·신화·균열 보석)를 프로필에 보관하고, 착용 시 Stat·Skill을 캐릭터에 반영합니다. 가방·장비·Essence 슬롯, 창고, 필드 픽업·버리기·판매 흐름을 연결합니다.
- **유물**

  ![유물·시너지]({{ "/assets/images/projects/dragon-is-dead/ss-13.webp" | relative_url }})

  장비와 별도 슬롯에 유물을 두고, 보유 태그 합으로 Synergy 임계(예: Rapidity 3/5)를 넘기면 쿨 감소 등 효과를 켭니다.

  캐릭터별 슬롯에 보관하고, 드랍 후보 풀에서 등급별 추첨·획득·슬롯 교체·버리기를 처리합니다. 착용 시 Stat·Relic Skill·Synergy Skill을 갱신하며, 캠프 강화·Passive 부여·애널리틱스 획득·시너지 이벤트와 연동합니다.

#### 입력 · Ability

키·패드의 명령은 중앙 Command 큐가 아니라, 캐릭터에 붙은 **Ability**가 매 프레임 읽어 적용합니다. 성장의 스킬 할당과 전투의 Hitmark 파이프라인 사이에 있습니다.

- **루프**: `GameManager` → `CharacterManager` → `TSCharacter` Ability 배열(Early/Process/Late). 이동·점프·대시·스킬·상호작용이 각각 Ability로 나뉩니다.
- **입력 게이트**: 전역 `IsBlockCharacterInput`(팝업·타임라인), 캐릭터 `IsBlockInput`, Ability `IsAuthorized`(이동·Condition·Rest). BattleReady와 입력 가능은 별개입니다 — Ready 후에도 스폰 애니·UI가 입력을 막을 수 있습니다.
- **스킬 적용**: 할당된 액션 슬롯만 `CharacterHandleSkill`이 받습니다. 조건·이동 블록·Ability Rest를 통과하면 `TryCast`(쿨·Cast Rest·SkillAnimation). 당장 불가하면 입력 버퍼에 두었다가 시전 가능 시 소비합니다.
- **시전 이후**: Animation Event 시점에 Hitmark/Buff/Passive를 켜고, 피해·Vital은 전투가 소유합니다. Ability Rest(입력 Ability)와 Cast Rest(이 스킬 직후)는 나눕니다.
- **몬스터**: 기기 입력 대신 AI Brain이 이동·공격 의도를 Character API에 위임합니다. 플레이어 스킬 입력 경로와는 갈라집니다.

#### 전투

성장의 스킬이 무엇을 할당·시전할 후보로 두는가, 입력 · Ability가 키를 행동으로 바꾸는가라면, 전투는 한 방·상태·사건 반응·Vital을 소유합니다. Skill · Hitmark · Buff · Passive 네 층으로 나눴습니다.

- **Hitmark (타격)**: 재사용 가능한 타격 정의(Scriptable, ID). Apply → 피해 계산 → Vital(HP/가드) → 사망. Target / Area / Projectile 갈래로 어떻게 맞힐지만 갈라지고, Apply 이후는 같은 파이프라인을 탑니다. 스킬·도트·패시브 추가 타격이 같은 정의를 ID로 공유합니다.
- **Buff (상태)**: 스택·지속·CC·Stat 보정. 스킬·유물·패시브가 Add합니다. 주기 피해 등은 Buff가 Hitmark를 다시 켜고, 스택·CC 정책은 이 층이 소유합니다.
- **Passive (규칙)**: Trigger → Condition → Effect. 피해 식·Buff 스택 정책은 소유하지 않고 Buff / Hitmark / Skill API에 위임합니다. 연쇄는 실행 큐·프레임 상한으로 폭주를 막습니다.
- **Stat · 피드백**: Modifier 합산이 피해·Vital에 반영됩니다. VFX/카메라/오디오는 Feedbacks로 묶고, 카메라·컷신 본체는 카메라·연출에 둡니다.
- **캐릭터**: 플레이어·몬스터·보스 분기와 Vital 소유. 이동·스킬 Ability 루프는 입력 · Ability에, 스킬 트리·학습 UI는 성장에 둡니다.
{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

- 구조: [전투 구조 1/4 Hitmark 타격 정의]({{ "/notes/combat-hitmark/" | relative_url }}) · [전투 구조 2/4 Skill 시전 구조]({{ "/notes/combat-skill/" | relative_url }}) · [전투 구조 3/4 Passive 사건 규칙]({{ "/notes/combat-passive/" | relative_url }}) · [전투 구조 4/4 Buff 지속 상태]({{ "/notes/combat-buff/" | relative_url }})
- 경계: [전투 경계 1/5 네 층으로 나눈 이유]({{ "/notes/combat-four-layers/" | relative_url }}) · [전투 경계 2/5 스킬 한 번의 해피 패스]({{ "/notes/combat-skill-happy-path/" | relative_url }}) · [전투 경계 3/5 Hitmark를 스킬 밖에 둔 이유]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · [전투 경계 4/5 Buff와 Passive를 나눈 이유]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) · [전투 경계 5/5 출시까지 지킨 경계와 남은 갭]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

</div>
{% endif %}

### 적 AI·스테이지

- FSM 기반 적 AI(Brain / State / Action / Decision) — 이동·공격 의도는 Character API에 위임
- **Area · Stage**: 도전 시작 때 지역 전투 스테이지 일괄 스폰 · [지역 안 이동은 활성/비활성]({{ "/notes/stage-spawn-area-preload/" | relative_url }})
- 웨이브 스폰, 상호작용·드랍·퀘스트 연동

### 카메라·연출

- Cinemachine 기반 follow / bound / zoom / shake / 미니맵 카메라
- Timeline 컷신·시그널, Feedbacks로 전투 연출 일원화

### UI·설정

- Scene UI 허브(팝업·HUD·게이지·플로팅 텍스트), 입력·HUD 동기화
- 오디오/비디오/언어 설정 영속화, 게임패드·키보드 라우팅

### 세이브·데이터

- [Excel→Json]({{ "/notes/excel-json-fixed-data/" | relative_url }}) 고정 데이터 · 기획 표가 아닌 것은 ScriptableObject
- 슬롯 프로필 `persistentDataPath` · 쿨다운·백업·마이그레이션·복구는 타이틀 · Auto-Cloud · [슬롯 로테이션·Essential·복구 체인]({{ "/notes/dragon-save-shipped/" | relative_url }})
- **한계**: 디스크를 Main·Side·Meta 레인으로 나누지는 않았습니다. 계약은 [세이브 레이아웃]({{ "/projects/save-layout/" | relative_url }})의 [Main·Side·Meta]({{ "/notes/save-layout-boundaries/" | relative_url }})와 [Side 레인]({{ "/notes/save-layout-side-lane/" | relative_url }})입니다.


### 로컬라이즈

- 다국어 문자열(JSON)·StringGetter·언어 전환 시 UI 일괄 갱신
- 언어별 [Static 문자셋 추출]({{ "/notes/tmp-static-font-atlas/" | relative_url }}) · 부팅·언어 전환 [폰트 워밍업]({{ "/notes/tmp-font-warmup/" | relative_url }})
- 패키지 [TMP 폰트 파이프라인]({{ "/projects/tmp-font-pipeline/" | relative_url }})

### Steamworks / 플랫폼

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

### 애널리틱스

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
