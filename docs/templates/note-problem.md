# notes 템플릿 — 문제 해결

사이트 미게시 (`docs/` exclude). 새 문제 해결 노트를 쓸 때 이 골격을 복사해 `notes/<슬러그>.md`로 채운다.

**독자가 얻는 것:** 증상 → 원인 → 해결.  
**채우기 예:** `notes/conditional-log-build-cost.md` · `notes/stage-spawn-area-preload.md`

공통 FM·분류·공개는 [`../site-content-rules.md`](../site-content-rules.md). 톤·유형은 [`../writing-guide.md`](../writing-guide.md).  
시리즈·깊은 이해 템플릿: [`note-series.md`](note-series.md).

---

## Front matter

```yaml
---
layout: page
title: 짧은 제목
permalink: /notes/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일 — 증상과 해결이 한 눈에"
tags: [엔진]
---
```

`tags`는 분류 1개 ([`site-content-rules.md`](../site-content-rules.md) 표).

---

## 본문 골격

```markdown
lead (excerpt와 동일)

## 맥락

- 프로젝트·전제 링크
- (선택) 관련 projects / README

## 문제

증상·원인. 가능하면 표.

| 증상 | 원인 (가설→확정) |
|------|------------------|
| … | … |

## 해결

설계·동작. 무엇을 바꿨는지 구체적으로.

## 기각·보류

(선택) 안 한 것·나중에 할 것.

## 확인 포인트

(선택) 재현·Profiler·빌드 플래그 등.

## 정리

(선택) 한 줄.
```
