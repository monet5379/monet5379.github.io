---
layout: page
title: TMP 폰트 파이프라인(TMP Font Pipeline)
permalink: /projects/tmp-font-pipeline/
date: 2026-08-25
order: 50
project_kind: personal
role: 설계·구현
excerpt: "Dragon 로컬라이즈에서 Static 문자셋 추출·TMP warmup을 게임 밖으로 분리한 Unity Editor·Runtime 패키지입니다."
---


Dragon 로컬라이즈에서 Static 문자셋 추출·TMP warmup을 게임 밖으로 분리한 Unity Editor·Runtime 패키지입니다.

{% include screenshot-carousel.html slug="tmp-font-pipeline" %}

[Dragon is Dead (프로젝트)]({{ "/projects/dragon-is-dead/" | relative_url }}) 다국어 TMP 작업에서 «어떤 글자가 아틀라스에 있는가»와 «언제 처음 그리는가»를 나눈 경험을, `Assets/TmpFontPipeline` 통째 복사로 재현·검증할 수 있게 정리했습니다.

## 개요

- 형태: 개인 Unity OSS (`unity-tmp-font`)
- 역할: 설계·구현·문서
- 배포: `Assets/TmpFontPipeline` 폴더 복사 (UPM 아님)
- Demo: `Assets/Demo` — SampleScene, Extract/Apply 샘플 (놀이터, 출시 템플릿 아님)
- 연관: [Dragon is Dead (프로젝트)]({{ "/projects/dragon-is-dead/" | relative_url }}) · [TMP Static 아틀라스로 Dynamic hitch 피하기 (노트)]({{ "/notes/tmp-static-font-atlas/" | relative_url }}) · [스플래시·옵션으로 옮긴 TMP 폰트 워밍업 (노트)]({{ "/notes/tmp-font-warmup/" | relative_url }})

## 문제

다국어·CJK에서 TMP Dynamic atlas는 첫 표시·언어 전환 hitch와 메모리 상한 예측 불가를 만듭니다. Static으로 고정해도 **첫 mesh draw·material 경로** 비용은 남고, 옵션에서 언어를 바꿀 때 입력과 warmup이 겹치면 플레이가 끊깁니다.

타이틀 코드 안에만 두면 전투·UI·데이터와 섞여, «추출 sanitize → Static bake → warmup supersede»만 재현·설명하기 어렵습니다. Dragon에서 쓴 불변조건을 **별도 저장소**로 뺐습니다.

## 설계

한 줄: `String*.json` → sanitize · extract → Static SDF Apply → 런타임 `FontRoleCatalog` + `FontWarmupService`.

| 축 | 선택 |
|----|------|
| 문자셋 SSOT | Extract 출력 → TMP Character Table (Static) |
| Editor | Window **Extract** / **Apply** / **Help**, `FontAtlasApplyProfile` |
| Role | **Ui** · **Dialogue** — extract 버킷·Font Asset 역할 (TMP weight 아님) |
| Warmup | `IFontWarmupTarget`, **역할별** sample, font 1프레임당 1개, supersede |
| Sanitize | TMP 태그, `{0}`, `[token]` 등 — 추출 전 제거; **표시**는 JSON 그대로 |

Install·Window 조작·API 시그니처는 [GitHub README](https://github.com/monet5379/unity-tmp-font)가 정본입니다.

## Dragon과의 차이

| 항목 | Dragon (출시) | 이 repo (Demo/OSS) |
|------|---------------|---------------------|
| 유럽어 버킷 | English~Spanish **합집합** 1 Static | **언어별** EN/FR/DE/IT/ES 분리 |
| Warmup 단위 | Title · Content · Number 등 font type | **Ui · Dialogue** role |
| Warmup sample | 언어군 공통 짧은 문장 | 역할별 — Ui `Confirm`, Dialogue `dlg_intro` 등 |
| 로컬라이즈 | StringGetter · 게임 UI 전체 | Demo만 — `DemoStringTable` · label refresh |

원칙(Static SSOT, warmup ≠ glyph 보장, Dialogue 버킷 분리, input block)은 [노트 2편 (노트)]({{ "/notes/tmp-static-font-atlas/" | relative_url }})과 같습니다.

## 이 프로젝트가 아닌 것

- Dragon·타이틀 본편 로컬라이즈 프레임워크가 아닙니다.
- Addressables String 테이블·In-game `[token]` 치환을 제공하지 않습니다.
- UPM 배포·Noto 폰트 재배포가 아닙니다 — Demo 폰트는 `Assets/Demo/Fonts/` 참고용입니다.

증명·전달하려는 것은 **데이터 기반 Static charset + 분리된 warmup 경로**를 최소 패키지로 옮기는 방법입니다.

## 계보

| 프로젝트 | TMP에서 가져온 / 남긴 것 |
|----------|---------------------------|
| [Dragon is Dead (프로젝트)]({{ "/projects/dragon-is-dead/" | relative_url }}) | Static extract · Dialogue 버킷 · Splash/옵션 warmup · supersede |
| 이 repo | Editor Apply Window · `FontRoleCatalog` · `FontWarmupService` · Demo |

개념·기각은 노트, 복사 단위·Demo는 여기와 GitHub README에 둡니다.

## 스택

Unity, TextMesh Pro, C#

## 링크

### 외부

- [GitHub — unity-tmp-font](https://github.com/monet5379/unity-tmp-font)

### 내부

- [TMP Static 아틀라스로 Dynamic hitch 피하기 (노트)]({{ "/notes/tmp-static-font-atlas/" | relative_url }})
- [스플래시·옵션으로 옮긴 TMP 폰트 워밍업 (노트)]({{ "/notes/tmp-font-warmup/" | relative_url }})
- [Dragon is Dead (프로젝트)]({{ "/projects/dragon-is-dead/" | relative_url }})
- [홈 · 경력]({{ "/#경력" | relative_url }})
