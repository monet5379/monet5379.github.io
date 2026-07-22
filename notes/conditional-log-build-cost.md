---
layout: page
title: Conditional 로그와 빌드 비용
permalink: /notes/conditional-log-build-cost/
date: 2026-07-23
excerpt: "에디터 레벨·태그 필터와 플레이어 빌드에서 호출·인자 평가를 없애는 [Conditional]은 다른 문제라는 점을, Dragon is Dead Log API 기준으로 정리합니다."
tags: [DragonIsDead, Logging, Build, Performance]
---


에디터 레벨·태그 필터와 플레이어 빌드에서 호출·인자 평가를 없애는 [Conditional]은 다른 문제라는 점을, Dragon is Dead Log API 기준으로 정리합니다.

[Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) 성능 작업에서 적용한 내용입니다. 계기는 Player 빌드 Profiler에 로그 경로(문자열·할당)가 남아, «필터 off = 비용 없음» 가정이 깨진 것이었습니다.

## 맥락

프로젝트 `Log` API의 역할을 나눕니다.

| API | 용도 | 플레이어 빌드 |
|-----|------|----------------|
| `Log.Progress` / `Info` / `Warning` / `Error` 등 | 개발 가시성(레벨·태그 필터) | `[Conditional("UNITY_EDITOR")]`로 **호출문·인자 평가 제거** |
| `Debug.Log*` / 리포팅 | 릴리스에 남길 메시지 | `Log` 밖 **별도 경로** |

에디터 필터는 콘솔 가시성만 바꿉니다. 바이너리 비용은 Conditional이 담당합니다.

## 문제

레벨·태그를 꺼도 플레이어 빌드 Profiler에 로그 경로 비용이 남는 경우가 있습니다. C#은 호출 **전에** 인자를 평가하기 때문입니다.

| 증상 | 원인 |
|------|------|
| 에디터에서 필터 off인데 빌드 Profiler에 문자열·할당이 남음 | 메서드 안 early return / `#if`는 **출력만** 막음. 호출문은 바이너리에 잔류 |
| `Update`마다 `CalcDamage()`·`$""`·`string.Format`이 돔 | “콘솔에 안 찍힌다” ≠ “비용이 없다” |
| 한 클래스에 에디터 UX + 릴리스 경로를 섞음 | “이 호출이 빌드에 남는가”를 호출부마다 짐작해야 함 |

**핵심:** 컴파일 제거(`[Conditional]`)와 에디터 필터(레벨·태그)는 다른 문제입니다. 전자는 바이너리 비용, 후자는 개발 중 가시성입니다.

잘못된 패턴 예:

```csharp
// 필터 off여도 CalcDamage·보간 문자열이 매 프레임 평가됨
Log.Info($"dmg={CalcDamage()}");
```

`[Conditional("UNITY_EDITOR")]`가 붙은 API는 플레이어 빌드에서 위 호출문 자체가 사라집니다.

## 해결

| # | 합격선 | 적용 |
|---|--------|------|
| 1 | 플레이어 빌드에서 출력 API **호출문·인자 평가**가 바이너리에 없음 | `Progress` / `Info` / `Warning` / `Error` 등에 `[Conditional("UNITY_EDITOR")]` |
| 2 | 레벨·태그 필터는 **에디터 가시성**만 | 필터 off ≠ 컴파일 제거 |
| 3 | 릴리스에 남길 메시지 | `Log` 밖 `Debug.Log*` 등 **별도 경로** |

### 컴파일 제거 vs 런타임 차단

| 구분 | 시점 | 호출문 | 호출부 인자 평가 |
|------|------|--------|------------------|
| early return / 레벨 off / `#if`만 | 런타임 | 바이너리에 **남음** | **실행됨** |
| `[Conditional("UNITY_EDITOR")]` (플레이어 빌드) | **컴파일** | **제거됨** | **제거됨** |
| 에디터 (레벨·태그 off) | — | 남음 | **실행됨** (`$""`·`params` 포함) |

에디터에서도 핫 패스에 `$""` + `Log.*`를 두면 필터와 무관하게 비용이 납니다. **호출 자체를 두지 않는 것**이 정답입니다.

## 실무

1. **가변 디버그** → 태그·레벨로 좁히기
2. **릴리스에 남길 메시지** → `Debug.Log*` / 리포팅 — `Log`와 분리
3. **프레임마다 도는 로그** → 기본 off, 필요할 때만 켬
4. **무거운 문자열·계산** → 핫 패스에는 호출 자체를 두지 않기

## 기각·보류

| 결정 | 사유 |
|------|------|
| 런타임 early return / `#if`만으로 플레이어 비용 제어 | 호출부 인자 평가 잔류 — 기각 |
| `Log` 안에 릴리스 전용 Error·파일 로그 유지 | “빌드에 남는가” 경계 혼재 — 출력 API는 Conditional로 분리 |
| Unity Logging 패키지·API 대폭 축소 | 빌드 비용 합격선과 무관 — 보류 |

## 확인 포인트

- Player(비에디터) 빌드: 빈번한 `Log.Info` / `Progress` 경로가 Profiler Scripts·GC Alloc에 유의미하게 나타나지 않음
- 에디터: 레벨·태그 off 시 해당 메시지가 콘솔에 안 찍힘
- 릴리스에 남길 메시지: `Debug.Log*` 등 `Log` 래퍼 밖
- `Update` / `FixedUpdate`에 `$""` 또는 무거운 인자 + `Log.*`를 상시 두지 않음

## 정리

필터는 가시성, Conditional은 바이너리 비용입니다. 둘을 한 메커니즘으로 취급하지 않고, 핫 패스에서는 호출 자체를 두지 않습니다.
