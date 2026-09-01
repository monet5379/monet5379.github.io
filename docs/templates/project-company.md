# projects 템플릿 — 회사 출시 (`project_kind: company`)

사이트 미게시 (`docs/` exclude). 새 회사 소속 출시 글을 쓸 때 이 골격을 복사해 `projects/<슬러그>.md`로 채운다.

**독자가 얻는 것:** 무엇을 출시했고, 내가 어디까지 담당했는지.  
**상세 설계·경계:** notes에 두고 여기서는 입구·범위만.  
**채우기 예:** `projects/dragon-is-dead.md` · `projects/blade-assault.md`

공통 front matter·이미지 규칙은 [`../site-content-rules.md`](../site-content-rules.md). 톤·역할 분리는 [`../writing-guide.md`](../writing-guide.md).  
개인 케이스 스터디 템플릿: [`project-personal.md`](project-personal.md).

---

## Front matter

```yaml
---
layout: page
title: 짧은 제목
permalink: /projects/슬러그/
date: YYYY-MM-DD
order: 10
project_kind: company
role: 개발 리드
excerpt: "본문 lead와 동일 — 팀·역할·출시가 한 눈에"
---
```

- `order`: 목록을 `order`로 정렬할 때 (작을수록 앞). `/projects/` 기본 목록은 `date` 최신순
- `role`: 목록 메타 (권장)
- `private: true`: production 목록 제외 (선택)

---

## 본문 골격

```markdown
lead (excerpt와 동일)

{% include screenshot-carousel.html slug="슬러그" youtube="videoId" steam="https://store.steampowered.com/app/…" %}

## 개요

- 기간: YYYY.MM – YYYY.MM (소속). 공개 사이트는 월까지. 일자 정본은 sibling `career-private/employment-dates.md`
- 플랫폼:
- 팀 규모:
- 내 역할:
- 성과: (얼리 액세스·정식 등, 공개 가능한 범위만)

## 기여

- (필수) 역할·일정·담당 범위 — 추상어만으로 끝내지 않기
- (권장) 출시·라이브에서 줄인 이슈 축 (수치·NDA 없이)

## 담당 시스템

아래 중 **하나**를 고른다. 둘을 섞어도 되나, 같은 내용을 두 번 링크하지 않는다.

### A — 시스템 요약 (Dragon형)

도메인별 불릿으로 범위만. 깊은 Why/How는 notes 링크.

### 전투·성장
- …
- 관련 notes: …

### (다른 도메인)
- …

### B — 노트 허브 (Blade형)

시리즈·입구 링크만. 허브만 둘 때도 위 **기여**는 구체화한다.

로컬에서 비공개 노트 링크를 쓸 때: 링크 블록을 `<div data-private-notes markdown="1">…</div>`로 감싼다 (`jekyll.environment != "production"`). footer 전역 **비공개** 토글·`localStorage`를 쓴다. production HTML에는 비공개 노트 링크를 넣지 않는다.

입구: […노트…](/notes/…/)

### 주제 묶음
- [1/N …](/notes/…/) · …

## 출시 후 / 운영

(선택) 수치 없이 문서·구조 기준 이슈 축.

### 크래시·데이터
- …

### 성능 · 플랫폼
- …

## 스택

…

## 링크

### 외부

- [Steam / 스토어]
- [YouTube] (선택)

### 내부

- 관련 notes 입구 (선택)
```

---

## 체크

- [ ] `excerpt` = lead
- [ ] `project_kind: company`
- [ ] 개요 메타 5항목(기간·플랫폼·팀·역할·성과) 채움
- [ ] 기여가 “전 영역 담당” 수준으로만 끝나지 않음
- [ ] 담당 = A 또는 B, 노트 링크 중복 없음
- [ ] NDA·비공개 수치 없음

## 개인 템플릿과의 차이

| | company | personal |
|--|---------|----------|
| 중심 | 출시·역할·담당 범위 | 문제·설계·비범위·계보 |
| `문제` / `설계` 표 | 넣지 않음 (notes) | 본문 필수 |
| `이 프로젝트가 아닌 것` | 보통 없음 | 필수 |
