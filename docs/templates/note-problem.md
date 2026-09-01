# notes — 문제 해결 (샘플·체크리스트)

사이트 미게시 (`docs/` exclude).

**독자가 얻는 것:** 증상 → 원인 → 해결.  
**독자 전제:** 코드·레포 없음 — [`../writing-guide.md`](../writing-guide.md) §외부 독자.  
**정본 예:** [`notes/conditional-log-build-cost.md`](../../notes/conditional-log-build-cost.md) · [`notes/stage-spawn-area-preload.md`](../../notes/stage-spawn-area-preload.md)

[`../writing-guide.md`](../writing-guide.md) §notes 작성 — 규칙 3층. **검토:** [`../content-review.md`](../content-review.md). **증상→해결** 글만 아래 샘플·`## 문제`/`## 해결` 사용. How·Why·지도: [`note-series.md`](note-series.md). FM: [`../site-content-rules.md`](../site-content-rules.md).

---

## 역할 체크리스트

| 역할 | 이 유형 | 비고 |
|------|---------|------|
| lead = `excerpt` | ● | |
| 맥락·전제 | ○ | |
| 증상·원인 | ● | h2 `문제` **권장**, 다른 이름 가능 |
| 해결·동작 | ● | h2 `해결` **권장** |
| 실무·한계·트레이드오프 | ○ | 필요 시 별도 h2 |
| 기각·보류 | ○ | |
| 확인 포인트 | ○ | Profiler·재현 등 |
| 정리 | ○ | |

---

## Front matter (예시)

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

## 샘플 목차 (`##` 이름은 예시)

아래 `## 문제` · `## 해결`은 **가장 흔한 패턴**일 뿐 필수가 아닙니다. 본론 h2는 주제에 맞게 바꿉니다.

```markdown
lead (excerpt와 동일)

## 맥락

- 프로젝트·전제 링크
- (선택) 관련 projects / README

## 문제

증상·원인. 2~3축 대조가 필요할 때만 표.

| 증상 | 원인 (가설→확정) |
|------|------------------|
| … | … |

## 해결

(선택) 본론 초입 — 제목 + mermaid + 1–2문장
  목표 경계·`≠` 구조. 증상 절에 두지 않음.
  규칙: [`mermaid-diagram.md`](mermaid-diagram.md) · site-content-rules「notes 도식 둘 곳」.
  front matter `mermaid: true`.

설계·동작. 무엇을 바꿨는지 구체적으로.

## (선택) 실무 · 한계 · 트레이드오프

필요할 때만. `## 해결` 안에 넣어도 됩니다.

## 기각·보류

(선택) `**대안·결정** — 이유` prose 또는 불릿. ~4항목이면 표 대신 prose ([`writing-guide` §표와 prose](../writing-guide.md#notes--표와-prose)).

## 확인 포인트

(선택) 재현·Profiler·빌드 플래그 등.

## 정리

(선택) 한 줄 + 범위 밖·README prose + 링크.

**권장 읽기** — … (형제·트랙이 있을 때만. `series_nav`가 있으면 두지 않음)
```

---

## 검토

게시 전 [`content-review.md`](../content-review.md) — Gate(notes) · Quality(notes 역할).
