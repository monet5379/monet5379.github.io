# projects 템플릿 — 개인 OSS·케이스 스터디 (`project_kind: personal`)

사이트 미게시 (`docs/` exclude). 새 개인 프로젝트 글을 쓸 때 이 골격을 복사해 `projects/<슬러그>.md`로 채운다.

**독자가 얻는 것:** 어떤 문제를 타이틀에서 분리해 어떻게 잘랐는지.  
**독자 전제:** 코드·레포 없음 — 설치·API는 README 링크, 개념·기각은 notes.  
**설치·API 정본:** GitHub README (있을 때). 개념·기각은 notes.  
**채우기 예:** `projects/conditional-log.md` · `projects/tmp-font-pipeline.md` · `projects/save-layout.md`

공통 front matter·이미지 규칙은 [`../site-content-rules.md`](../site-content-rules.md). 톤·역할 분리는 [`../writing-guide.md`](../writing-guide.md).  
회사 출시 템플릿: [`project-company.md`](project-company.md).

---

## Front matter

```yaml
---
layout: page
title: 짧은 제목
permalink: /projects/슬러그/
date: YYYY-MM-DD
order: 30
project_kind: personal
role: 설계·구현
excerpt: "본문 lead와 동일 — 문제와 분리 단위가 한 눈에"
# private: true
---
```

- `order`: 목록을 `order`로 정렬할 때 (작을수록 앞). `/projects/` 기본 목록은 `date` 최신순
- `private: true`: production 목록 제외 (선택)
- 개념·경계 도식은 본문 live Mermaid (`mermaid: true`). **Mermaid만 있으면 목록 썸네일·캐러셀 PNG를 두지 않음.**
- Demo·실기 캡처가 있으면 `{% include screenshot-carousel.html slug="슬러그" %}` (없으면 생략).

---

## 본문 골격

```markdown
lead (excerpt와 동일)

(선택) 원천 타이틀·노트 한두 문장 — 왜 이 repo가 생겼는지.

## 개요

- 형태: 개인 Unity 케이스 스터디 / OSS (한 줄)
- 역할: 설계·구현·문서
- 초점: (불변조건·배포 단위 — 짧게)
- 배포: (폴더 복사·UPM 등, 해당 시)
- 연관: [원천 타이틀](/projects/…/) · [관련 노트](/notes/…/)

## 문제

한두 문단으로 “잘 되면 그만”이 아닌 이유를 쓴다. 이어서 증상·함정 불릿.

- …
- …

타이틀 코드에만 두면 무엇이 섞여 재현·설명이 어려운지 한 줄.

## 설계

한 문장으로: …

| 축 | 선택 |
|----|------|
| … | … |
| … | … |

Install·API·조작 절차는 README가 정본이면 여기서 반복하지 않고 링크한다.

## 원천 타이틀과의 차이

(선택) 출시본과 Demo/OSS가 갈라진 축이 있을 때만.

| 항목 | 원천 (출시) | 이 프로젝트 |
|------|-------------|-------------|
| … | … | … |

## 이 프로젝트가 아닌 것

- …
- …

증명·전달하려는 것은 … 이다.

## 계보

| 프로젝트 | 가져온 / 남긴 것 |
|----------|------------------|
| [원천](/projects/…/) | … |

개념은 notes, 복사 단위·Demo는 여기와 README.

## 스택

…

## 링크

### 외부

- [GitHub]

### 내부

- [관련 노트]
- [원천 프로젝트]
- [홈 · 경력](/#경력)
```

---

## 체크 (Quality)

게시 전 Gate: [`../content-review.md`](../content-review.md) §Gate — projects. 아래는 **personal** Quality:

- [ ] `excerpt` = lead
- [ ] `project_kind: personal`
- [ ] 문제 → 설계(한 줄 + 표) → 이 프로젝트가 아닌 것 → 계보 순서
- [ ] “증명하려는 것”이 비범위와 맞음
- [ ] API·설치 세부는 README로 위임 (중복 최소화)
- [ ] NDA·비공개 수치 없음
