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
- `docs/` — 내부 규칙·참고 목록 (Jekyll exclude, 미게시). 예: `project-rules.md`, `writing-guide.md`, `reference-sites.md`, `templates/`

## 규칙

- 커밋 제목·본문: 한글 (`docs/project-rules.md`)
- 사이트 콘텐츠와 docs/설정은 커밋 분리
- `career` · `projects` · `notes` 페이지: `date`, `excerpt` 필수. `title` 짧게, 부제(`—`) 금지. `excerpt` = 본문 lead. 상단 nav·본문 h1용 카테고리 `title`은 **한글(English)** (예: `경력(Career)`)
- `projects/` · `notes/` 목록은 `_includes/section-index-list.html`로 자동 생성 (`index.md` 제외)
- notes · projects 글쓰기: 유형·목차·톤 — `docs/writing-guide.md` (토스 테크니컬 라이팅 축약). humanize 윤문과 충돌 시 **토스·writing-guide 우선** (`writing-guide.md` §humanize와 충돌할 때)
- notes 목록 분류 필터: front matter `tags`(분류 1개) + `notes/index.md`의 `filter_categories` (`docs/writing-guide.md`). 목록은 `date` 최신순, `notes_page_size`(5) 페이지네이션
- notes 목록: 공개 분류는 `_config.yml` `notes_production_visible_tags`. production은 그 태그만 빌드. 로컬은 전 글 + footer **비공개** 토글(기본 숨김, `localStorage`)
- projects 비공개: front matter `private: true`. production 목록에서 제외. 로컬은 footer **비공개** 토글(기본 숨김, `localStorage`). 개별 URL은 항상 빌드

- `projects` 상세: 목록용 `order`(작을수록 앞), `project_kind`(`company` | `personal`), `private`(선택), `role` 권장. `/projects/` 회사·개인 목록은 `date` 최신순. 종류별 채우기 템플릿: `docs/templates/project-company.md` · `project-personal.md` (`docs/writing-guide.md`)

- 프로젝트 이미지: `assets/images/projects/<슬러그>/` — `cover.jpg`, `ss-01.jpg`… (`docs/project-rules.md`)
- projects 목록 썸네일: `cover.*` 우선, 없으면 첫 `ss-*`
- 스크린샷 캐러셀: `{% include screenshot-carousel.html slug="<슬러그>" %}`
- 요청 없이 커밋·push 하지 않음


## 빌드

```bash
bundle exec jekyll build
bundle exec jekyll serve
# 비공개 글을 HTML에서 빼려면(배포와 동일): JEKYLL_ENV=production bundle exec jekyll serve
```
