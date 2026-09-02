# notes — 깊은 이해 (How · Why · 지도) 샘플·체크리스트

사이트 미게시 (`docs/` exclude).

**독자 전제:** 코드·레포 없음 — [`../writing-guide.md`](../writing-guide.md) §외부 독자.  
**규칙 SSOT:** [`../writing-guide.md`](../writing-guide.md) §notes 작성 — 규칙 3층 · §깊은 이해 — 작성 힌트.  
**문제 해결 샘플:** [`note-problem.md`](note-problem.md). FM·시리즈: [`../site-content-rules.md`](../site-content-rules.md).  
**검토:** [`../content-review.md`](../content-review.md).

초고 전 **How / Why / 지도·복습** 중 하나를 주로 정합니다. **FM·별도 템플릿 파일은 없습니다.**

| 힌트 | 정본 예 |
|------|---------|
| **How** | [`dragon-relic-acquire`](../../notes/dragon-relic-acquire.md) · [`dragon-combat-passive-bridge`](../../notes/dragon-combat-passive-bridge.md) |
| **Why** | [`save-layout-side-lane`](../../notes/save-layout-side-lane.md) · [`excel-json-fixed-data`](../../notes/excel-json-fixed-data.md) |
| **지도·복습** | [`dragon-combat-cluster-read`](../../notes/dragon-combat-cluster-read.md) · [`dragon-combat-one-hit`](../../notes/dragon-combat-one-hit.md) |

---

## 공통 역할 체크리스트

| 역할 | | 비고 |
|------|---|------|
| lead = `excerpt` | ● | How=동작·범위 · Why=경계·기각 · 지도=읽기 순서 |
| 맥락·용어 | ○ | `이 글에서 쓰는 말` 표 |
| 본론 | ● | **h2 주제별** — `## 핵심` / `## 문제` 필수 아님 |
| 기각·출시에서 남긴 것 | ○ | Why·How 모두 |
| 이 글에서 다루지 않음 | ○ | `## 정리` 마지막 prose · `series_nav` 시 형제 링크 금지 |
| 정리 | ○ | |
| 확인 포인트 | — | 문제 해결 힌트에만 ([`note-problem.md`](note-problem.md)) |
| 시리즈 내비 | 시리즈만 | `series_nav: true` — layout |

---

## 힌트별 — lead·본론만 다름

### How (출시 기능·흐름)

- **lead:** 무엇을 설명하는지 · 이 글 **범위** · 형제 편 링크
- **본론 h2:** 흐름·경로 (`후보 풀 → 필드 드랍`, `Trigger → Effect`)
- **QA:** `## 맥락`에 “갈라지는 체감” — `## 문제`로 올리지 않음

### Why (경계·기각)

- **lead:** 왜 이 경계·축이 필요한지
- **본론 h2:** 비교 표(0~1) · `왜 ~` · `기각한 대안`(prose)
- **`## 문제`/`## 해결`:** 쓰지 않음 (증상→해결 글이 아님)

### 지도·복습

- **lead:** 시리즈 입구 · 두 줄기·읽기 순서
- **본론 h2:** `권장 읽기 순서`, `end-to-end`, `QA · 회귀 축`
- **FM:** 지도만 단독이면 `series` 없어도 됨 (`dragon-combat-cluster-read`)

---

## Front matter (예시)

단독 How/Why:

```yaml
---
layout: page
title: 짧은 제목
permalink: /notes/슬러그/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [전투]
project:
  - dragon-is-dead
---
```

시리즈 How/Why:

```yaml
---
layout: page
title: 유물을 어디에 두고 어떻게 얻는가
permalink: /notes/dragon-relic-acquire/
date: YYYY-MM-DD
excerpt: "본문 lead와 동일"
tags: [성장]
project:
  - dragon-is-dead
series: relic-how
series_title: 유물
series_order: 1
series_total: 2
series_nav: true
---
```

- Why / How는 `series` 슬러그를 다르게 (예: `save-layout-why` / `relic-how`)
- `project` 선택 — [`site-content-rules.md`](../site-content-rules.md) 「주 프로젝트」

---

## 샘플 목차 (How — h2 자유)

```markdown
lead (동작·범위)

## 맥락
## 이 글에서 쓰는 말
## (예) 후보 풀 → 필드 드랍
## (예) 획득·교체·버리기
## 출시에서 남긴 것
## 정리
(범위 밖·README·Architecture — prose + 링크)
```

## 샘플 목차 (Why)

```markdown
lead (경계·기각)

## 맥락
## (예) Backup/과 Side — 무엇이 다른가
## (예) 왜 별도 레인인가
## 기각한 대안
## 정리
(범위 밖·README·프로젝트 — prose + 링크)
```

## 샘플 목차 (지도)

```markdown
lead (읽기 순서)

## 맥락
## (예) 네 층 경계
## 권장 읽기 순서
## 정리
(범위 밖 — prose + 링크)
```

Mermaid: [`mermaid-diagram.md`](mermaid-diagram.md) · site-content-rules「notes 도식 둘 곳」. 지도 1편만 lead 직후 허용.

---

## 검토

게시 전 [`content-review.md`](../content-review.md) — Gate(notes) · Quality(notes 역할). How/Why/지도 **유형 일치는 검사하지 않음**.
