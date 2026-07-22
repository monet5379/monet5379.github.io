# AGENTS.md

개인 사이트 `monet5379.github.io` 에이전트 지침.

## 정체성

- 채용 · 포트폴리오 · 공개 기술
- Intem Studio(`intemstudio.github.io`)와 **별개**. 스튜디오 글 전문 복제 금지. 필요 시 링크만.

## 구조

- `index.md` — 소개·CTA
- `career.md` — 경력
- `projects/` — 포트폴리오
- `notes/` — 개인 공개 기술 글
- `docs/` — 내부 규칙·참고 목록 (Jekyll exclude, 미게시). 예: `project-rules.md`, `writing-guide.md`, `reference-sites.md`

## 규칙

- 커밋 제목·본문: 한글 (`docs/project-rules.md`)
- 사이트 콘텐츠와 docs/설정은 커밋 분리
- `career` · `projects` · `notes` 페이지: `date`, `excerpt` 필수. `title` 짧게, 부제(`—`) 금지. `excerpt` = 본문 lead
- `projects/` · `notes/` 목록은 `_includes/section-index-list.html`로 자동 생성 (`index.md` 제외)
- notes 목록 태그·정렬 필터: front matter `tags` + `notes/index.md`의 `filter_projects` / `filter_topics` / `show_sort_filter` (`docs/writing-guide.md`)

- `projects` 상세: 목록용 `order`(작을수록 앞), `role` 권장
- 프로젝트 이미지: `assets/images/projects/<슬러그>/` — `cover.jpg`, `ss-01.jpg`… (`docs/project-rules.md`)
- projects 목록 썸네일: `cover.*` 우선, 없으면 첫 `ss-*`
- 스크린샷 캐러셀: `{% include screenshot-carousel.html slug="<슬러그>" %}`
- 요청 없이 커밋·push 하지 않음


## 빌드

```bash
bundle exec jekyll build
bundle exec jekyll serve
```
