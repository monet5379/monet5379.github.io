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

**이 페이지에서 볼 것**

- **콘텐츠** — Area Instantiate 끊김 · BattleReady 레이스 → 선스폰·활성 토글, Initialize/BattleReady 계약으로 탐험·동기화 축 완화
- **도구·데이터** — 세이브 손상·스키마 · 밸런스 표 반영 → 슬롯·백업·마이그레이션, Excel→Json·Scriptable 파이프라인
- **성능·플랫폼** — 빌드 로그 · GPU·TMP hitch · Deck/저사양 → Conditional 제거, 렌더 레버, Static atlas — [성능 노트 (노트)]({{ "/notes/conditional-log-build-cost/" | relative_url }})

콘솔 SDK 직접 경험은 없습니다. Deck UX 분기·포팅용 성능 가드는 [성능](#성능-외부-업체-포팅-대응)에 있습니다.

## 맥락

드래곤 이즈 데드는 [블레이드 어썰트 (프로젝트)]({{ "/projects/blade-assault/" | relative_url }})를 출시한 뒤, 더 큰 세계를 만들기로 하면서 시작했습니다. 처음에는 2D 플랫포머 RPG였습니다. 디아블로 2처럼 마을이 있고, NPC가 지역마다 퀘스트를 내주는 방향이었습니다. 퀘스트 진행에 따라 NPC를 마을이나 특정 지역에 등장시키고, 메인·서브 퀘스트를 깨게 했습니다. 스킬 트리와 인벤토리는 디아블로 4에서 영감을 받았습니다. 1년이 넘는 동안 얼리 액세스 스펙이던 액트 1(지역 8곳)을 만든 뒤에, 원래 계획했던 액트 4까지는 진행할 수 없다고 판단했습니다. 이후 장르를 로그라이트로 바꾸고 수정과 개선을 많이 했습니다. 얼리 액세스로 액트 1까지 작업한 뒤, 콘텐츠를 대폭 고쳐 정식 출시에 필요한 지역을 하나 더 넣었습니다.

## 기여

- 소규모 팀에서 클라이언트 개발을 리드하며 출시까지 일정을 조율했습니다.
- 성장·입력·전투, 적 AI·스테이지, 카메라·연출, UI·설정, 세이브·데이터, 로컬라이즈, Steamworks, 애널리틱스를 포함한 게임플레이·클라이언트 전반을 담당했습니다.
- 얼리 액세스 이후 정식 출시까지 세이브 손상·복구, 고정 데이터 파이프라인, 외부 업체 포팅(저사양·Deck)에 맞춘 성능·연동 가드로 라이브 이슈를 줄여 갔습니다.

## 담당 시스템

### 플레이 루프

스킬 후보([성장](#성장)) → 키를 행동으로([입력 · Ability](#입력--ability)) → 한 방·상태·Vital([전투](#전투))를 한 축으로 둡니다.

#### 성장

- **스킬** (기획: 디아블로 4 액션바·스킬 트리 참고)

  ![스킬 트리 — Sword of Frost]({{ "/assets/images/projects/dragon-is-dead/ss-03.jpg" | relative_url }})

  기획에서 디아블로 4를 참고해 잡은 **기본 / 핵심 / 보조 / 숙련 / 궁극** 카테고리를 기준으로 구현했습니다.

  - **구조**: 스킬 습득 → 액션 슬롯 할당 → 레벨. SkillSystem이 런타임 인스턴스를 두고, 시전 의도(Skill)와 타격 정의(Hitmark)·상태(Buff)·규칙(Passive)을 분리합니다. 레벨업·장비(룬워드)·유물에서도 스킬을 부여합니다.
  - **데이터**: 스킬 로직·테이블은 Excel→Json, 학습·슬롯·레벨은 프로필에 저장합니다. Hitmark/Buff/Passive는 Scriptable로 두고 ID·이름으로 연결합니다.
  - **애니메이션**: SkillAnimation(Scriptable)을 스킬 ID로 조회해 애니메이터에 붙입니다. 시전 시 클립을 재생하고, Animation Event 시점에 Hitmark·Buff·Passive를 적용합니다(시전과 타격 프레임 분리).
  - **입력**: 액션 슬롯에 할당한 스킬만 입력이 받습니다. 버퍼·Cast/Ability Rest 등 적용 경로는 [입력 · Ability](#입력--ability)에 둡니다.
- **인벤토리**

  ![인벤토리·장비 — Frost Wolf's Teeth]({{ "/assets/images/projects/dragon-is-dead/ss-06.jpg" | relative_url }})

  기획에서 디아블로 시리즈를 참고한 장비 슬롯·격자 가방·등급/옵션 툴팁을 구현했습니다.

  장비 인스턴스(등급·Stat 옵션·룬워드·신화·균열 보석)를 프로필에 보관하고, 착용 시 Stat·Skill을 캐릭터에 반영합니다. 가방·장비·Essence 슬롯, 창고, 필드 픽업·버리기·판매 흐름을 연결합니다.
- **유물**

  ![유물·시너지]({{ "/assets/images/projects/dragon-is-dead/ss-13.webp" | relative_url }})

  장비와 별도 슬롯에 유물을 두고, 보유 태그 합으로 Synergy 임계(예: Rapidity 3/5)를 넘기면 쿨 감소 등 효과를 켭니다.

  캐릭터별 슬롯에 보관하고, 드랍 후보 풀에서 등급별 추첨·획득·슬롯 교체·버리기를 처리합니다. 착용 시 Stat·Relic Skill·Synergy Skill을 갱신하며, 캠프 강화·Passive 부여·애널리틱스 획득·시너지 이벤트와 연동합니다.

#### 입력 · Ability

키·패드의 «명령»은 중앙 Command 큐가 아니라, 캐릭터에 붙은 **Ability**가 매 프레임 읽어 적용합니다. 성장의 스킬 할당과 전투의 Hitmark 파이프라인 사이에 있습니다.

- **루프**: `GameManager` → `CharacterManager` → `TSCharacter` Ability 배열(Early/Process/Late). 이동·점프·대시·스킬·상호작용이 각각 Ability로 나뉩니다.
- **입력 게이트**: 전역 `IsBlockCharacterInput`(팝업·타임라인), 캐릭터 `IsBlockInput`, Ability `IsAuthorized`(이동·Condition·Rest). BattleReady와 «입력 가능»은 별개입니다 — Ready 후에도 스폰 애니·UI가 입력을 막을 수 있습니다.
- **스킬 적용**: 할당된 액션 슬롯만 `CharacterHandleSkill`이 받습니다. 조건·이동 블록·Ability Rest를 통과하면 `TryCast`(쿨·Cast Rest·SkillAnimation). 당장 불가하면 입력 버퍼에 두었다가 시전 가능 시 소비합니다.
- **시전 이후**: Animation Event 시점에 Hitmark/Buff/Passive를 켜고, 피해·Vital은 [전투](#전투)가 소유합니다. Ability Rest(입력 Ability)와 Cast Rest(이 스킬 직후)는 나눕니다.
- **몬스터**: 기기 입력 대신 AI Brain이 이동·공격 의도를 Character API에 위임합니다. 플레이어 스킬 입력 경로와는 갈라집니다.

#### 전투

성장의 스킬이 «무엇을 할당·시전할 후보로 두는가», [입력 · Ability](#입력--ability)가 «키를 행동으로 바꾸는가»라면, 전투는 «한 방·상태·사건 반응·Vital»을 소유합니다. Skill · Hitmark · Buff · Passive 네 층으로 나눴습니다.

- **Hitmark (타격)**: 재사용 가능한 타격 정의(Scriptable, ID). Apply → 피해 계산 → Vital(HP/가드) → 사망. Target / Area / Projectile 갈래로 «어떻게 맞힐지»만 갈라지고, Apply 이후는 같은 파이프라인을 탑니다. 스킬·도트·패시브 추가 타격이 같은 정의를 ID로 공유합니다.
- **Buff (상태)**: 스택·지속·CC·Stat 보정. 스킬·유물·패시브가 Add합니다. 주기 피해 등은 Buff가 Hitmark를 다시 켜고, 스택·CC 정책은 이 층이 소유합니다.
- **Passive (규칙)**: Trigger → Condition → Effect. 피해 식·Buff 스택 정책은 소유하지 않고 Buff / Hitmark / Skill API에 위임합니다. 연쇄는 실행 큐·프레임 상한으로 폭주를 막습니다.
- **Stat · 피드백**: Modifier 합산이 피해·Vital에 반영됩니다. VFX/카메라/오디오는 Feedbacks로 묶고, 카메라·컷신 본체는 [카메라·연출](#카메라연출)에 둡니다.
- **캐릭터**: 플레이어·몬스터·보스 분기와 Vital 소유. 이동·스킬 Ability 루프는 [입력 · Ability](#입력--ability)에, 스킬 트리·학습 UI는 [성장](#성장)에 둡니다.
{% if jekyll.environment != "production" %}
<div data-private-notes markdown="1">

- 관련 notes (구조 후 경계): 구조 [1/4 Hitmark (노트)]({{ "/notes/combat-hitmark/" | relative_url }}) · [2/4 Skill (노트)]({{ "/notes/combat-skill/" | relative_url }}) · [3/4 Passive (노트)]({{ "/notes/combat-passive/" | relative_url }}) · [4/4 Buff (노트)]({{ "/notes/combat-buff/" | relative_url }}) · 경계 [1/5 (노트)]({{ "/notes/combat-four-layers/" | relative_url }}) · [2/5 (노트)]({{ "/notes/combat-skill-happy-path/" | relative_url }}) · [3/5 (노트)]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · [4/5 (노트)]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) · [5/5 (노트)]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

</div>
{% endif %}

### 적 AI·스테이지

- FSM 기반 적 AI(Brain / State / Action / Decision) — 이동·공격 의도는 Character API에 위임
- **Area · Stage**: 지역마다 전투 스테이지 개수·슬롯을 둡니다. 도전 시작 때 Order·슬롯 기준으로 한 번에 골라 프로필에 올리고(정규화), 지역에 들어갈 때는 그 목록을 로딩에서 일괄로 읽어 스폰합니다. 같은 지역 안 이동은 활성/비활성만 바꿉니다 ([Area 선스폰 (노트)]({{ "/notes/stage-spawn-area-preload/" | relative_url }})).
- 웨이브 스폰, 상호작용·드랍·퀘스트 연동

### 카메라·연출

- Cinemachine 기반 follow / bound / zoom / shake / 미니맵 카메라
- Timeline 컷신·시그널, Feedbacks로 전투 연출 일원화

### UI·설정

- Scene UI 허브(팝업·HUD·게이지·플로팅 텍스트), 입력·HUD 동기화
- 오디오/비디오/언어 설정 영속화, 게임패드·키보드 라우팅

### 세이브·데이터

- **드래곤 세이브 구조**: 슬롯별 프로필을 `persistentDataPath`에 두고, 저장 쿨다운·필수 세이브·다중 백업·스키마 마이그레이션·손상 복구를 타이틀 `GameData` 안에서 처리했습니다. Steam Cloud는 Auto-Cloud 경로로 맞추고, 세이브 API를 Steam RemoteStorage에 직접 묶지는 않았습니다.
- **출시 후**: 얼리 액세스 이후 세이브 손상·복구·마이그레이션을 다듬어 라이브에서 진행 유실을 줄였습니다.
- **한계**: Main·Side·Meta처럼 디스크 레인으로 나눈 구조는 아닙니다. 영구 진행·짧은 진행·실패 백업·선택 메타가 타이틀 세이브 코드에 함께 있어, 손상·이어하기·저장 주기의 역할이 한곳에 섞이기 쉽고, 세이브 레이아웃만 따로 재현·설명하기 어렵습니다.
- **개선**: 그 경계를 레이아웃 계약으로만 뽑아 개인 프로젝트로 정리했습니다 — [세이브 레이아웃(Save Layout) (프로젝트)]({{ "/projects/save-layout/" | relative_url }})
  - [세이브 레이아웃 1/2 Main·Side·Meta로 나눈 이유 (노트)]({{ "/notes/save-layout-boundaries/" | relative_url }}) — 슬롯당 Main(영구), 선택적 Side(짧은 진행), 공유 Meta(선택 슬롯)
  - [세이브 레이아웃 2/2 슬롯 백업 대신 Side 레인을 둔 이유 (노트)]({{ "/notes/save-layout-side-lane/" | relative_url }}) — 손상 치우기용 `Backup/`과 Continue·오토용 Side를 같은 폴더·API에 두지 않음
- 고정 데이터는 Excel로 관리하고 Json으로 변환해 인게임에 사용. 기획 표가 아닌 고정 데이터는 ScriptableObject로 사용. 출시 후에도 고정 데이터 파이프라인을 유지·보강했습니다. ([Excel을 JSON으로 바꿔 고정 데이터를 읽은 이유 (노트)]({{ "/notes/excel-json-fixed-data/" | relative_url }}))

### 로컬라이즈

- 다국어 문자열(JSON)·StringGetter·언어 전환 시 폰트 워밍업·UI 일괄 갱신
- TMP Dynamic atlas 히치를 피하기 위해 String 데이터 기반 Static 문자셋 추출·배포 ([TMP Static 아틀라스로 Dynamic hitch 피하기 (노트)]({{ "/notes/tmp-static-font-atlas/" | relative_url }}))
- 부팅·언어 전환 시 TMP 최초 사용 스파이크를 스플래시·옵션 대기로 이전 ([스플래시·옵션으로 옮긴 TMP 폰트 워밍업 (노트)]({{ "/notes/tmp-font-warmup/" | relative_url }}))
- 동일 설계를 게임 밖 패키지로 정리한 [TMP Font Pipeline (프로젝트)]({{ "/projects/tmp-font-pipeline/" | relative_url }}) (Dragon European 합집합 · Title/Content 타입 — OSS Demo와 차이는 projects 참고)
- **출시 후**: 외부 포팅·다국어 환경에서 TMP hitch가 드러나며, Static 아틀라스·워밍업으로 프레임 비용을 줄였습니다.

### Steamworks / 플랫폼

- Steam 초기화·Stats, 업적(보스/난이도/수집 등), 시즌 리더보드(업로드·다운로드·아바타)
- Steam Deck 런타임 감지(튜토리얼 등 UX 분기)
- **출시·포팅 대응**: Deck에서 재생되지 않는 동영상 포맷·입력 UI 아이콘 유효성 가드로 라이브 이슈를 줄였습니다.
- 세이브 클라우드는 `SteamRemoteStorage` 직접 호출 대신 **Steam Cloud Auto-Cloud**를 썼습니다. 세이브는 `persistentDataPath`에 두고 슬롯·쿨다운·백업·복구는 타이틀이 책임지며, Steam은 그 경로 동기화만 맡게 해 원자 기록·손상 복구가 Steam 콜백 타이밍과 섞이지 않게 했습니다.

### 성능 (외부 업체 포팅 대응)

얼리 액세스 이후, 닌텐도처럼 낮은 프레임을 허용하는 기기용 외부 업체 포팅에 맞춰 성능을 측정하고 프레임 비용을 줄였습니다.

- 플레이어 빌드에서 개발 로그 호출·인자 평가를 컴파일 단계에서 제거 ([Conditional로 플레이어 빌드 로그 비용 제거 (노트)]({{ "/notes/conditional-log-build-cost/" | relative_url }}))
- 스테이지 리소스 선로드로 이동 중 로딩 끊김 완화 ([Area 선스폰 (노트)]({{ "/notes/stage-spawn-area-preload/" | relative_url }}))
- 그려지는 배경을 끌 수 있게 해 카메라 이동 GPU 비용을 분리 ([Global·Ambient 두 레버 (노트)]({{ "/notes/stage-visual-gpu-optimize/" | relative_url }}))
- TMP Static 아틀라스·폰트 워밍업은 [로컬라이즈](#로컬라이즈)와 동일 축입니다.

### 애널리틱스

- Unity Gaming Services Analytics 연동: 릴리스 클라이언트 텔레메트리 초기화·수집 시작, 도메인 `Report*` → CustomEvent 기록
- 게임플레이 이벤트: 도전 종료, 플레이어 사망, 스킬/유물(아티팩트) 획득·시너지 등 특정 구간에 데이터를 모았습니다. 치명 클라이언트 에러(Error/Exception)는 메시지로 받아, 부족한 QA 커버리지를 보완하는 쪽에 가깝게 썼습니다.
- 에디터·Development·`DISABLEANALYTICS` 게이트로 원격 전송과 로컬 로그를 분리 (Steam 리더보드·세이브 통계와는 별 파이프)
- **한계**: 텔레메트리는 관련 메시지를 받기만 했을 뿐, 이벤트·에러를 분석해 실제 게임에 유의미한 밸런스 패치로 이어진 적은 없었습니다.

## 스택

Unity, C#, Cinemachine, Timeline, Steamworks, Unity Gaming Services Analytics

## 링크

### 외부

- [Steam](https://store.steampowered.com/app/2803280/Dragon_Is_Dead/)
- [YouTube](https://youtu.be/0f0ZXseDMUM?si=VXCv4QvJkLEn-ji9)
