---
layout: page
title: GameDataManager
permalink: /projects/game-data-manager/
date: 2026-08-06
order: 30
role: 세이브 시스템
excerpt: "출시·라이브에서 반복되던 세이브 손상·복구·스키마 변경 문제를 타이틀에서 분리해 정리한 시스템 케이스 스터디입니다."
---


출시·라이브에서 반복되던 세이브 손상·복구·스키마 변경 문제를 타이틀에서 분리해 정리한 시스템 케이스 스터디입니다.

Blade Assault·Dragon is Dead·Treasure의 세이브 경험을 반영해, 게임이 없어도 세이브 계약만으로 검증할 수 있는 최소 런타임을 목표로 합니다.

## 개요

- 형태: 개인 Unity 케이스 스터디 (세이브 레이어)
- 역할: 설계·구현·문서
- 초점: 프로필별 파일, Meta, 백업·복구, 레거시 마이그레이션, 진단 툴
- 연관: [Blade Assault]({{ "/projects/blade-assault/" | relative_url }}) · [Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }})

## 문제

출시한 클라이언트에서 세이브는 “잘 저장되면 그만”이 아닙니다.

- 저장 도중 종료·디스크 오류로 파일이 비거나 JSON이 깨집니다.
- 프로필을 한 파일에 묶으면 한 슬롯 손상이 다른 진행까지 위협합니다.
- 빈번한 저장이 I/O를 흔들고, 실패 시 메타데이터까지 어긋날 수 있습니다.
- 레이아웃·스키마 변경 시 구버전 파일을 읽지 못하거나 잘못된 기본값으로 덮일 수 있습니다.

타이틀 코드 안에 두면 전투·UI·밸런스 파이프라인과 섞여, 세이브만 재현·설명하기 어렵습니다. 계약·복구·진단에 초점을 둔 별도 프로젝트로 정리했습니다.

## 설계

한 문장으로: 프로필마다 Main 파일을 두고, Meta로 선택을 기록하며, 구 허브 파일은 로드 시 분리 레이아웃으로 옮깁니다.

| 축 | 선택 |
|----|------|
| 디스크 | Meta + Profile0~2 (개발 빌드는 `_Dev` 접미사) |
| 저장 | 쿨다운 + 지연 저장 → 선택 프로필 Main → Meta |
| 로드 | Meta와 프로필 파일을 조립해 런타임 허브 구성 |
| 실패 | 손상된 프로필만 백업 후 null, 다른 슬롯 유지 |
| 레거시 | 허브 순환 파일 → 프로필별 파일로 변환 후 백업 폴더로 이동 |
| 관측 | 인게임·에디터 진단·수동 복구 |

## 실패 시나리오

우선 검증하는 최소 회귀 목록입니다.

1. 프로필 파일 비어 있음 / JSON 손상 — 해당 슬롯만 null
2. Meta만 있음 — 선택 인덱스 보정 후 기동
3. 레거시 허브만 있음 — 최신 허브 변환 후 허브 파일 백업 이동
4. 구버전 허브 스키마 — 허브 마이그레이션 후 레이아웃 변환
5. 전부 없음 — 기본 게임 데이터 생성

## 이 프로젝트가 아닌 것

- 전투·스테이지·런 빌드 등 게임플레이 본편이 아닙니다.
- Excel→Json 밸런스 파이프라인 전체가 아닙니다.
- Treasure의 Rot 미러·암호화 전체 패리티가 아닙니다.

증명하려는 것은 세이브를 어떻게 안전하게 유지·복구·진화시키는가입니다.

## 계보

| 프로젝트 | 세이브에서 가져온 / 남긴 것 |
|----------|---------------------------|
| [Blade Assault]({{ "/projects/blade-assault/" | relative_url }}) | 실서비스 이중 파일·암호화 경험 → 복구·시퀀스·레이아웃으로 재정리 |
| [Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }}) | 타이틀에 결합된 프로필·슬롯·백업 → 계약만 추출 |

Dragon 프로젝트 페이지의 [세이브·데이터]({{ "/projects/dragon-is-dead/" | relative_url }}) 절과 같은 문제 의식을, 여기서는 시스템 단위로만 펼칩니다.

## 스택

Unity, C#, Newtonsoft.Json

## 링크

- [경력]({{ "/career/" | relative_url }})
- [Blade Assault]({{ "/projects/blade-assault/" | relative_url }})
- [Dragon is Dead]({{ "/projects/dragon-is-dead/" | relative_url }})
- [GitHub — GameDataManager](https://github.com/monet5379/GameDataManager)
