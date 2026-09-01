# notes 템플릿 — 깊은 이해 / 시리즈

사이트 미게시 (`docs/` exclude). 경계·Why·시리즈 노트를 쓸 때 이 골격을 복사해 `notes/<슬러그>.md`로 채운다.

**독자가 얻는 것:** 경계·불변조건·기각·읽기 순서.  
**채우기 예:** `notes/combat-four-layers.md` · `notes/combat-boundaries-shipped.md`

공통 FM·분류·시리즈 필드는 [`../site-content-rules.md`](../site-content-rules.md). 톤·유형은 [`../writing-guide.md`](../writing-guide.md).  
문제 해결 템플릿: [`note-problem.md`](note-problem.md).

---

## Front matter

단독 글:

```yaml
---
layout: page
title: 짧은 제목
permalink: /notes/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [전투]
---
```

시리즈·구조 세트:

```yaml
---
layout: page
title: 전투 경계 1/5 네 층으로 나눈 이유
permalink: /notes/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [전투]
series: combat-boundaries
series_title: 전투 경계
series_order: 1
series_total: 5
---
```

- `title` 앞에 `{series_title} {n}/{total}`
- Why / How는 `series` 슬러그를 다르게 (예: `combat-boundaries` / `combat-structure`)

---

## 본문 골격

```markdown
lead (excerpt와 동일)

## 맥락

- 프로젝트·전제
- 1편이면 전체 구조·경계 지도(본문). 형제·읽기 순서는 본문 **하단**

## 핵심

표·다이어그램·경계·불변조건.

(선택) 축·용어 표 직후 또는 해결/경계 절 — 제목 + mermaid + 1–2문장
  front matter `mermaid: true`. lead 직후는 지도가 입구일 때만.
  Cursor direct. 규칙: [`mermaid-diagram.md`](mermaid-diagram.md) · site-content-rules「notes 도식 둘 곳」.

## 기각·보류 / 출시에서 지킨 것

(해당 시)

## 정리

한 줄.

**권장 읽기** — … → … (형제·트랙 순서. lead·맥락 위에 두지 않음)

**시리즈: {제목} (N/M)** — [1](…) · … · **N**   ← `series`가 있을 때. 정리·권장 읽기 **아래**
```
