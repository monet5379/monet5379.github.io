---
layout: page
title: 스튜디오 키트(Studio Kit)
permalink: /projects/studio-kit/
date: 2026-08-26
order: 20
project_kind: personal
role: 설계·문서
excerpt: "Unity 프로젝트를 열 때마다 Cursor 규칙을 복사하지 않도록, 공통 규약과 프로필을 한곳에 모은 Kit입니다."
---


Unity 프로젝트를 열 때마다 Cursor 규칙을 복사하지 않도록, 공통 규약과 프로필을 한곳에 모은 Kit입니다.

출시 타이틀과 개인 OSS를 오가며 `.cursor`·`AGENTS`가 갈라지는 경험을 반영해, 게임 없이도 같은 기준으로 에이전트와 본인이 작업할 수 있는 규칙·문서 묶음을 목표로 합니다. Unity 런타임 패키지가 아닙니다.

## 개요

- 형태: 개인 케이스 스터디 (Cursor 규칙·문서 Kit — Unity 런타임 패키지 아님)
- 역할: 설계·문서
- 초점: common 항상 + personal|game 중 하나, 멀티 루트 워크스페이스, `AGENTS` 템플릿
- 배포: 저장소 clone 후 프로젝트와 함께 Cursor 멀티 루트로 열기 (선택: submodule + junction)
- 연관: [Conditional Log (프로젝트)]({{ "/projects/conditional-log/" | relative_url }}) · [TMP Font Pipeline (프로젝트)]({{ "/projects/tmp-font-pipeline/" | relative_url }}) · [Save Layout (프로젝트)]({{ "/projects/save-layout/" | relative_url }})

## 문제

에이전트 규칙은 “한 번 적어 두면 끝”이 아닙니다.

- 타이틀·패키지마다 `.cursor`를 복사하면 기준이 갈라지고, 어떤 버전이 맞는지 짐작해야 합니다.
- 공개 유틸과 출시 타이틀에 같은 문서 무게(Plan·Architecture)를 쓰면 작은 repo가 무거워집니다.
- 타이틀 전용 경로·도메인을 공통 Kit에 모으면, 다른 프로젝트에서 쓸 수 없는 규약이 됩니다.

런타임 코드와 섞어두면 “규칙만” 재현·설명이 어렵습니다. 재사용 규약만 드러나는 별도 저장소로 정리했습니다.

## 설계

한 문장으로: common은 항상 쓰고, personal과 game 중 하나만 고르며, 타이틀 전용 규칙은 각 게임 repo에 둡니다.

| 축 | 선택 |
|----|------|
| 층 | **common** (`.meta`, C#, ponytail, Shell, 커밋) + **personal** 또는 **game** |
| 문서 무게 | personal = README + Invariants / game = Architecture · Plan · 7단계 |
| 적용 | `AGENTS.md`에 `profile: personal` 또는 `game` |
| 열기 | 프로젝트 + Kit를 Cursor 멀티 루트로 연다 |
| 타이틀 전용 | 프로젝트 쪽 `.cursor/rules/<title>/`에만 둔다 |
| alwaysApply | common 기본·스코프·포니테일·Shell만. 프로필 규칙은 `alwaysApply: false` |

시작 절차·폴더 구조·프로필 문서는 [GitHub README](https://github.com/monet5379/unity-studio-kit)가 정본입니다.

## 이 프로젝트가 아닌 것

- Unity 런타임 코드·UPM 패키지 소스가 아닙니다.
- 이 사이트(Jekyll)용 글쓰기 규칙이 아닙니다.
- 타이틀 전용 경로·도메인·enum을 Kit에 모으지 않습니다 — 각 게임 repo에 둡니다.
- 스튜디오 내부 Kit·프레임워크 문서 전문을 복제하지 않습니다.

증명하려는 것은 공통 규약과 프로필 무게를 어떻게 나누고, 복사 없이 같은 기준으로 프로젝트를 여는가입니다.

## 계보

| 프로젝트 | 가져온 / 남긴 것 |
|----------|------------------|
| [Dragon is Dead (프로젝트)]({{ "/projects/dragon-is-dead/" | relative_url }}) | 출시 타이틀 규모의 문서·에이전트 규약 → game 프로필 무게의 계기 |
| [Conditional Log (프로젝트)]({{ "/projects/conditional-log/" | relative_url }}) · [TMP Font Pipeline (프로젝트)]({{ "/projects/tmp-font-pipeline/" | relative_url }}) · [Save Layout (프로젝트)]({{ "/projects/save-layout/" | relative_url }}) | 공개 패키지·케이스 스터디 → personal (README + Invariants) |

설치·프로필 선택·템플릿은 GitHub README에 두고, 여기서는 분리 단위와 설계 축만 담습니다.

## 스택

Cursor rules, Markdown, Unity 워크플로 가이드

## 링크

### 외부

- [GitHub — unity-studio-kit](https://github.com/monet5379/unity-studio-kit)

### 내부

- [Conditional Log (프로젝트)]({{ "/projects/conditional-log/" | relative_url }})
- [TMP Font Pipeline (프로젝트)]({{ "/projects/tmp-font-pipeline/" | relative_url }})
- [Save Layout (프로젝트)]({{ "/projects/save-layout/" | relative_url }})
- [Dragon is Dead (프로젝트)]({{ "/projects/dragon-is-dead/" | relative_url }})
- [홈 · 경력]({{ "/#경력" | relative_url }})
