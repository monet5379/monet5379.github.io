---
layout: page
title: 조건부 로그
permalink: /projects/conditional-log/
date: 2026-08-21
order: 40
project_kind: personal
role: 개발 로그
excerpt: "에디터 가시성 필터와 플레이어 빌드 호출 제거는 다른 문제입니다. Conditional 로그를 타이틀에서 분리해 정리한 케이스 스터디입니다."
---


에디터 가시성 필터와 플레이어 빌드 호출 제거는 다른 문제입니다. Conditional 로그를 타이틀에서 분리해 정리한 케이스 스터디입니다.

{% include screenshot-carousel.html slug="conditional-log" %}

[드래곤 이즈 데드]({{ "/projects/dragon-is-dead/" | relative_url }}) 성능 작업에서 필터 off = 비용 없음이 깨졌습니다. 그 경험을 반영해, 게임이 없어도 복사해 쓸 수 있는 최소 로그 레이어를 목표로 합니다.

## 개요

- 형태: 개인 Unity 케이스 스터디 (에디터 전용 로그)
- 역할: 설계·구현·문서
- 초점: `[Conditional("UNITY_EDITOR")]`, 레벨·태그 필터, Settings·F1, 폴더 복사 배포
- 연관: [드래곤 이즈 데드]({{ "/projects/dragon-is-dead/" | relative_url }}) · [Conditional로 플레이어 빌드 로그 비용 제거]({{ "/notes/conditional-log-build-cost/" | relative_url }})

## 문제

개발 로그는 “콘솔에 안 찍히면 끝”이 아닙니다.

- 레벨·태그를 꺼도 호출부의 `$""`·계산은 평가됩니다.
- 메서드 안 early return이나 `#if`만으로는 플레이어 빌드에 호출문이 남습니다.
- 에디터 UX와 릴리스 경로를 한 API에 섞으면, 빌드에 남는지를 호출부마다 짐작해야 합니다.

타이틀 코드 안에만 두면 전투·스테이지와 섞여, “필터 vs Conditional”만 재현·설명하기 어렵습니다. 불변조건이 드러나는 별도 프로젝트로 정리했습니다.

## 설계

한 문장으로: 출력 API는 Conditional로 플레이어에서 지우고, 레벨·태그는 에디터 가시성만 바꿉니다.

| 축 | 선택 |
|----|------|
| 컴파일 제거 | `Log.Progress` / `Info` / `Warning` / `Error` / `Except`에 `[Conditional("UNITY_EDITOR")]` |
| 필터 | `Write` 안 early return — 호출문은 남음 |
| 태그 | 호출부 string. 복사 단위에 도메인 enum 없음 |
| 출력 | 통과 시 전부 `Debug.Log` (경고·에러 채널과 분리) |
| 배포 | `Assets/ConditionalLog` 통째 복사 (UPM 아님) |
| UX | 조건부 로그 → Settings, Play 중 F1 오버레이 |

## 한계

`[Conditional]`은 `UNITY_EDITOR`에만 걸려 있습니다. 에디터(Play 포함)에서 레벨·태그를 꺼도 호출부 인자 평가는 남습니다. 필터는 가시성만 바꿉니다. 에디터 핫 패스 비용을 필터로 없애지 않는 것이 이 패키지의 현재 한계입니다 — 상세는 [Conditional로 플레이어 빌드 로그 비용 제거]({{ "/notes/conditional-log-build-cost/" | relative_url }})·[README](https://github.com/monet5379/unity-conditional-log).

## 이 프로젝트가 아닌 것

- 게임플레이·전투·스테이지 본편이 아닙니다.
- 릴리스 리포팅·파일 로그·Unity Logging 패키지 대체가 아닙니다.
- 타이틀별 태그 enum/`GameLog` 규약을 강제하지 않습니다 — 필요하면 게임 코드에 둡니다.

증명하려는 것은 필터와 Conditional을 어떻게 나누고, 핫 패스에서 호출 자체를 두지 않는가입니다.

## 계보

| 프로젝트 | 로그에서 가져온 / 남긴 것 |
|----------|---------------------------|
| [드래곤 이즈 데드]({{ "/projects/dragon-is-dead/" | relative_url }}) | Player Profiler에 남은 로그 경로 → Conditional·필터 분리의 계기 |

개념·실무 체크는 [Conditional로 플레이어 빌드 로그 비용 제거]({{ "/notes/conditional-log-build-cost/" | relative_url }})에 두고, 여기서는 복사 단위와 에디터 UX를 담습니다.

## 스택

Unity, C#

## 링크

### 외부

- [GitHub — unity-conditional-log](https://github.com/monet5379/unity-conditional-log)

### 내부

- [드래곤 이즈 데드]({{ "/projects/dragon-is-dead/" | relative_url }})
- [Conditional로 플레이어 빌드 로그 비용 제거]({{ "/notes/conditional-log-build-cost/" | relative_url }})
- [홈 · 경력]({{ "/#경력" | relative_url }})
