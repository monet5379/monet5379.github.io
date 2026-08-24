---
layout: page
title: Dragon is Dead
permalink: /projects/dragon-is-dead/
date: 2025-06-06
order: 10
role: 개발 리드
excerpt: "팀써니트에서 프로그래머 1~2명 규모로 개발 리드하며 Steam 얼리 액세스·정식 출시까지 이끈 액션 게임입니다."
---


팀써니트에서 프로그래머 1~2명 규모로 개발 리드하며 Steam 얼리 액세스·정식 출시까지 이끈 액션 게임입니다.

{% include screenshot-carousel.html slug="dragon-is-dead" %}

## 개요

- 기간: 2022.05.06 – 2026.06.13 (팀써니트)
- 플랫폼: Steam (PC)
- 팀 규모: 프로그래머 1~2명
- 내 역할: 개발 리드 / 프로그래밍
- 성과: 2024.06.07 얼리 액세스 발매, 2025.06.06 정식 출시

## 기여

- 소규모 팀에서 클라이언트 개발을 리드하며 출시까지 일정을 조율했습니다.
- 전투·성장, 적 AI·스테이지, 카메라·연출, UI·설정, 세이브·데이터, 로컬라이즈, Steamworks, 애널리틱스를 포함한 게임플레이·클라이언트 전반을 담당했습니다.
- 얼리 액세스 이후 정식 출시까지 크래시·데이터 손상, 밸런스 회귀, 성능, 플랫폼 연동 축으로 라이브 이슈를 줄여 갔습니다.

## 담당 시스템

### 전투·성장

- 실시간 전투 파이프라인: 히트마크 → 피해 계산 → Vital(HP/가드) → 사망, Stat Modifier 연동
- 스킬(시전·쿨다운·입력 버퍼), 버프/패시브, 투사체, 피드백(VFX/카메라/오디오)
- 캐릭터 런타임: 스폰·BattleReady 게이트, 이동/점프/대시 등 Ability, 플레이어·몬스터·보스 분기
- 전투 노트 권장 읽기: 구조 [1 Hitmark]({{ "/notes/combat-hitmark/" | relative_url }}) → [2 Skill]({{ "/notes/combat-skill/" | relative_url }}) → [3 Passive]({{ "/notes/combat-passive/" | relative_url }}) → [4 Buff]({{ "/notes/combat-buff/" | relative_url }}) 후, 경계 [1]({{ "/notes/combat-four-layers/" | relative_url }}) → [2]({{ "/notes/combat-skill-happy-path/" | relative_url }}) → [3]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) → [4]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) → [5]({{ "/notes/combat-boundaries-shipped/" | relative_url }})
- 구조 노트 [전투 구조]({{ "/notes/combat-hitmark/" | relative_url }}): [1/4]({{ "/notes/combat-hitmark/" | relative_url }}) · [2/4]({{ "/notes/combat-skill/" | relative_url }}) · [3/4]({{ "/notes/combat-passive/" | relative_url }}) · [4/4]({{ "/notes/combat-buff/" | relative_url }})
- 경계 시리즈 [전투 경계]({{ "/notes/combat-four-layers/" | relative_url }}): [1/5]({{ "/notes/combat-four-layers/" | relative_url }}) · [2/5]({{ "/notes/combat-skill-happy-path/" | relative_url }}) · [3/5]({{ "/notes/combat-hitmark-outside-skill/" | relative_url }}) · [4/5]({{ "/notes/combat-buff-vs-passive/" | relative_url }}) · [5/5]({{ "/notes/combat-boundaries-shipped/" | relative_url }})

### 적 AI·스테이지

- FSM 기반 적 AI(Brain / State / Action / Decision) — 이동·공격 의도는 Character API에 위임
- Area·Stage 전환, 웨이브 스폰, 상호작용·드랍·인벤토리·장비·유물·퀘스트 연동

### 카메라·연출

- Cinemachine 기반 follow / bound / zoom / shake / 미니맵 카메라
- Timeline 컷신·시그널, Feedbacks로 전투 연출 일원화

### UI·설정

- Scene UI 허브(팝업·HUD·게이지·플로팅 텍스트), BattleReady 이후 입력·HUD 동기화
- 오디오/비디오/언어 설정 영속화, 게임패드·키보드 라우팅

### 세이브·데이터

- 프로필 세이브(슬롯·쿨다운·필수 세이브·백업), Json/Scriptable 데이터 파이프라인(부트 로드 순서 고정)
- 밸런스·콘텐츠는 Excel/표 → Json·SO, 런타임은 Facade로만 조회하는 계약

### 로컬라이즈

- 다국어 문자열(JSON)·StringGetter·언어 전환 시 폰트 워밍업·UI 일괄 갱신
- TMP Dynamic atlas 히치를 피하기 위해 String 데이터 기반 Static 문자셋 추출·배포 ([TMP Static 폰트 아틀라스]({{ "/notes/tmp-static-font-atlas/" | relative_url }}))
- 부팅·언어 전환 시 TMP 최초 사용 스파이크를 스플래시·옵션 대기로 이전 ([TMP 폰트 워밍업]({{ "/notes/tmp-font-warmup/" | relative_url }}))
- 동일 설계를 게임 밖 패키지로 정리한 [TMP Font Pipeline]({{ "/projects/tmp-font-pipeline/" | relative_url }}) (Dragon European 합집합 · Title/Content 타입 — OSS Demo와 차이는 projects 참고)

### Steamworks / 플랫폼

- Steam 초기화·Stats, 업적(보스/난이도/수집 등), 시즌 리더보드(업로드·다운로드·아바타)
- Steam Deck 런타임 감지(튜토리얼 등 UX 분기)
- 세이브는 `persistentDataPath` 기반 — Steam Cloud(Auto-Cloud)와 맞추는 경로 설계
- 업적·리더보드·Deck 연동은 명확히 두고, `SteamRemoteStorage` 직접 호출 구조는 두지 않음

### 애널리틱스

- Unity Gaming Services Analytics 연동: 릴리스 클라이언트 텔레메트리 초기화·수집 시작, 도메인 `Report*` → CustomEvent 기록
- 게임플레이 이벤트: 플레이어 사망, 스킬/유물(아티팩트) 획득·시너지, 치명 클라이언트 에러(Error/Exception)
- 에디터·Development·`DISABLEANALYTICS` 게이트로 원격 전송과 로컬 로그를 분리 (Steam 리더보드·세이브 통계와는 별 파이프)

## 출시 후 / 운영

수치 없이, 문서·구조 기준으로 줄인 이슈 축입니다.

### 크래시·데이터 손상

- 세이브 쿨다운·슬롯 순환·필수 세이브·백업

### 플랫폼 / 연동

- Steam Stats 준비 전 업적/리더보드 호출 가드
- Deck·언어·설정 분기, 콘솔 빌드에서 Steam 제외

### 성능

- 플레이어 빌드에서 개발 로그 호출·인자 평가를 컴파일 단계에서 제거 ([Conditional 로그와 빌드 비용]({{ "/notes/conditional-log-build-cost/" | relative_url }}))
- 카메라 이동에 따른 스테이지 렌더 비용을 Global Light 구조와 Switch Ambient 토글로 분리 ([스테이지 비주얼 최적화]({{ "/notes/stage-visual-gpu-optimize/" | relative_url }}))

## 스택

Unity, C#, Cinemachine, Timeline, Steamworks, Unity Gaming Services Analytics

## 링크

- [Steam](https://store.steampowered.com/app/2803280/Dragon_Is_Dead/)
- [YouTube](https://youtu.be/0f0ZXseDMUM?si=VXCv4QvJkLEn-ji9)
- [경력]({{ "/career/" | relative_url }})
