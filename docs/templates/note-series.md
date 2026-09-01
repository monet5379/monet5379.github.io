# notes 템플릿 — 깊은 이해 / 시리즈

사이트 미게시 (`docs/` exclude). 경계·Why·시리즈 노트를 쓸 때 이 골격을 복사해 `notes/<슬러그>.md`로 채운다.

**독자가 얻는 것:** 경계·불변조건·기각·읽기 순서.  
**독자 전제:** 코드·레포 없음 — [`../writing-guide.md`](../writing-guide.md) §외부 독자.  
**채우기 예:** `notes/dragon-combat-cluster-read.md` · `notes/dragon-combat-one-hit.md`

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
project: dragon-is-dead
---
```

`project`는 선택. 있으면 제목 아래에 `프로젝트 : {한글 짧은 제목}` 링크가 자동으로 붙습니다. 여러 타이틀을 동등하게 다루면 생략 ([`site-content-rules.md`](../site-content-rules.md) 「주 프로젝트」).  
`series`가 있으면 제목 아래에 `시리즈 : {series_title} {n}/{total}`이 붙습니다 ([`site-content-rules.md`](../site-content-rules.md) 「시리즈」).

시리즈·구조 세트:

```yaml
---
layout: page
title: 전투 클러스터를 어떻게 읽을까
permalink: /notes/dragon-combat-cluster-read/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [전투]
project: dragon-is-dead
series: combat-presence
series_title: 타격·데미지
series_order: 1
series_total: 4
series_nav: true
---
```

- `title`은 이 편만. `{series_title} {n}/{total}`은 FM·킥커 · `series_nav: true`로 하단 목록
- Why / How는 `series` 슬러그를 다르게 (예: `combat-presence` / `combat-reaction`)

---

## 본문 골격

```markdown
lead (excerpt와 동일 — 체감·질문·가치 먼저. 클래스명 나열 금지)

## 맥락

- 프로젝트·전제
- (선택) QA·플레이 체감 — 왜 이 경계가 필요한지
- (선택) ## 이 글에서 쓰는 말 — 역할 | 코드(참고)
- 1편이면 전체 구조·경계 지도(본문). 형제·읽기 순서는 본문 **하단**

## 핵심

표·다이어그램·경계·불변조건.

(선택) 축·용어 표 직후 또는 해결/경계 절 — 제목 + mermaid + 1–2문장
  front matter `mermaid: true`. lead 직후는 지도가 입구일 때만.
  Cursor direct. 규칙: [`mermaid-diagram.md`](mermaid-diagram.md) · site-content-rules「notes 도식 둘 곳」.

## 기각·보류 / 출시에서 지킨 것

(해당 시)

## 이 글에서 다루지 않는 것

(선택) `series_nav: true`이면 **같은 series 형제 링크 없음** — 시리즈 밖·범위 밖·후속만.

| 주제 | 위치 |
|------|------|
| … | 전투 층 / Architecture / 범위 밖 / 후속 과제 |

## 정리

한 줄.

<!-- series_nav: true — 권장 읽기·수동 시리즈 줄 없음. note-series-nav · notes-adjacent -->
```
