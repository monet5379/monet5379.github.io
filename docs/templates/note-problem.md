# notes 템플릿 — 문제 해결

사이트 미게시 (`docs/` exclude). 새 문제 해결 노트를 쓸 때 이 골격을 복사해 `notes/<슬러그>.md`로 채운다.

**독자가 얻는 것:** 증상 → 원인 → 해결.  
**독자 전제:** 코드·레포 없음 — [`../writing-guide.md`](../writing-guide.md) §외부 독자.  
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
tags: [최적화]
project: dragon-is-dead
---
```

`tags`는 분류 1개, `project`는 `projects/` 슬러그 0개 또는 1개. `project`가 있으면 제목 아래에 `프로젝트 : {한글 짧은 제목}` 링크가 자동으로 붙습니다 ([`site-content-rules.md`](../site-content-rules.md) 「주 프로젝트」).

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

(선택) 해결 초입 — 제목 + mermaid + 1–2문장
  목표 경계·`≠` 구조. `## 문제`에 두지 않음 (증상으로 오해).
  Cursor가 `notes/<슬러그>.md`에 직접 작성. 규칙: [`mermaid-diagram.md`](mermaid-diagram.md).
  front matter `mermaid: true`. 위치: site-content-rules「notes 도식 둘 곳」.

설계·동작. 무엇을 바꿨는지 구체적으로.

## 기각·보류

(선택) 안 한 것·나중에 할 것.

## 확인 포인트

(선택) 재현·Profiler·빌드 플래그 등.

## 정리

(선택) 한 줄.

**권장 읽기** — … (형제·트랙이 있을 때만. lead 위·직후에 두지 않음)
```
