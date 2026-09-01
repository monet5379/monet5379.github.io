---
name: monet5379-site-ui
description: >-
  UI/UX for monet5379.github.io (Jekyll + Minima, text-first career/portfolio).
  Use when improving layout, typography, spacing, dark mode, nav, list pages,
  carousel, footer, or _sass styling — including requests to "make it prettier",
  apply frontend-design, or copy Montage/Wanted-style product UI. SCSS/HTML only;
  not for note/project/review copy or front matter (see writing-guide).
---

# monet5379.github.io — Site UI

채용·포트폴리오용 **텍스트 중심** 개인 사이트. UI 작업은 랜딩 꾸미기가 아니라 **읽기·스캔·접근성** 개선이다.

## 우선순위 (충돌 시)

`docs/writing-guide.md` · `docs/site-content-rules.md` · `AGENTS.md` **>** 이 스킬 **>** `frontend-design`(설치되어 있을 경우)

이 스킬은 **SCSS · HTML include · layout UX**만 다룬다. Markdown 본문 · front matter · excerpt · tags · 커밋 규칙은 건드리지 않는다.

## 정본 (필요 시 Read)

| 주제 | 경로 |
|------|------|
| 에이전트 공통 | `AGENTS.md` |
| UI 방향 · 안 가져올 패턴 | `docs/reference-sites.md` |
| 글 · 톤 · FM | `docs/writing-guide.md`, `docs/site-content-rules.md` |

## 스택 (변경 금지)

- Jekyll + theme **Minima** — `assets/main.scss` → `_sass/`
- Measure: `$content-width: 720px`, `$base-font-size: 17px`, `$base-line-height: 1.65`
- 색: `_sass/color-scheme.scss` (Obsidian `--color-*`, `html[data-theme="light|dark"]`)
- 로컬 확인: `serve.bat` → http://127.0.0.1:4000/
- 배포와 동일 목록·공개 범위: `JEKYLL_ENV=production bundle exec jekyll serve`

**금지:** React/Vite/Tailwind/shadcn, `@wanteddev/wds`, Minima gem 교체, npm 빌드 파이프라인 추가, Playwright/E2E 도입 **제안**.

## 디자인 원칙

1. **Content-first** — 본문 measure · 행간 · heading 리듬이 1순위.
2. **Editorial, not product** — Wanted/Montage · 대시보드 · 히어로 · 카드 그리드 홈 지양.
3. **작은 diff** — 한 작업당 `_sass` 1~2파일 또는 `_includes` 1개. layout 대수술 최소.
4. **토큰 우선** — 새 hex 남발 대신 `var(--…)` · 기존 Sass 변수.
5. **a11y** — focus ring, `prefers-reduced-motion`, 링크 대비, `aria-label`(theme toggle 등).
6. **AI slop 회피** — 새 webfont/display font 남발, 보라 그라데이션, 과한 radius · shadow · motion 금지. Minima 기본 sans는 유지.

`frontend-design` 설치 여부와 **관계없이** 이 스킬의 Must/Must not이 우선한다. frontend-design에서 가져올 것은 **hierarchy · whitespace · focus 일관성**뿐이다.

## Must

- 변경 전 in-scope 파일만 수정. 시작 전 **변경 예정 파일 목록**을 짧게 제시.
- 다크 · 라이트 모두 readable.
- Minima 클래스 · 구조(`.post-content`, `.page-content`, `.site-header`) 존중.
- 작업 후 `serve.bat`(또는 production serve)로 확인할 URL을 안내.
- 커밋 · push는 사용자 요청 시에만. 콘텐츠와 설정/docs 커밋 분리.

## Must not

- `index.md`를 타일/대ashboard형 홈으로 변경
- projects/notes/reviews 목록을 Pinterest형 카드 wall로 변경
- notes **2단 browse + sticky sidebar + tag filter** 레이아웃을 제거하거나 제품 UI로 교체 (미세 조정만)
- Intem Studio 사이트 톤 · 레이아웃 복제
- `docs/`(Jekyll exclude)를 nav에 노출하는 변경
- front matter · permalink · `_config.yml` 대규모 변경

## 목록 UX (섹션별 — 구조 유지)

| 섹션 | 패턴 | 손대도 되는 것 |
|------|------|----------------|
| **projects** | 썸네일 그리드 (`post-list--thumbs`) | thumb 비율 · gap · caption 리듬 |
| **notes** | 2단 browse · sticky sidebar · tag filter · (선택) 페이지네이션 | 필터 버튼 · sidebar · 목록 카드 padding |
| **reviews** | 날짜순 리스트 · 썸네일 (`post-list--thumbs`) · FM `subtitle` 선택 | thumb · subtitle · excerpt 간격 |

공통 include: `_includes/section-index-list.html` — production/development · 비공개 notes 동작을 깨지 말 것.

## 파일 맵

| 영역 | 파일 |
|------|------|
| 진입 · 토큰 | `assets/main.scss`, `_sass/color-scheme.scss` |
| 본문 타이포 | `_sass/typography.scss` |
| 헤더 · nav · 테마 | `_sass/color-scheme.scss` (`.site-header`, `.site-nav`, `.theme-toggle`), `_includes/header.html`, `assets/js/theme.js` |
| 푸터 · 비공개 토글 | `_includes/footer.html`, `_includes/private-notes-toggle.html` |
| 목록 · 필터 | `_includes/section-index-list.html`, `_sass/section-index-list.scss` (`.notes-browse`, `.tag-filter`, `.post-list--*`) |
| notes 필터 JS | `assets/js/notes-tag-filter.js` |
| 페이지 shell | `_layouts/page.html` (title · `post-subtitle`) |
| 경력(홈) | `_sass/career-entry.scss`, `_includes/career-media.html`, `_sass/youtube-embed.scss` |
| 캐러셀 | `_sass/screenshot-carousel.scss`, `_includes/screenshot-carousel.html`, `assets/js/screenshot-carousel.js` |
| callout · 코드 | `_sass/callout.scss`, `_sass/code-collapse.scss` |
| Mermaid | `_sass/mermaid-notes.scss`, `assets/js/mermaid-notes.js` |
| notes 인접 | `_sass/notes-adjacent.scss`, `_includes/notes-adjacent.html` |

## 작업 절차

1. **Pain point 하나** 확인 (예: 모바일 nav, notes 필터, 리뷰 subtitle 리듬).
2. 위 파일 맵에서 관련 파일만 Read. Minima · 기존 패턴 따르기.
3. SCSS 위주 최소 diff. HTML 변경 시 include/layout 영향 범위를 짧게 적기.
4. 확인 URL 제안:
   - `/` (경력 포함) · `/projects/` · `/notes/` · `/reviews/`
   - `/career/` — 홈 `#경력` 리다이렉트만 확인 (nav 없음)
   - 긴 note 1개 (`mermaid: true` 있으면 포함) · reviews 1편 · 다크/라이트 토글
   - `/notes/` — tag filter · sticky sidebar · palm(375px) 1단 전환
   - footer **비공개: 숨김/표시** 토글 on/off
   - (선택) `JEKYLL_ENV=production` serve — production 목록과 동일
5. 사용자에게 `serve.bat`로 확인하라고 안내.

## 참고 (코드 복제 X, 원칙만)

- `docs/reference-sites.md` — 정보 밀도 · 구역 (Hugo/Dean). **비주얼·인터랙션은 참고만, 텍스트 중심 유지.**
- no-style-please / Chirpy — 본문 measure · 목록 가독성 (레이아웃 이식 X)

## 완료 체크

- [ ] 720px 본문에서 표 · Mermaid · 코드블록 overflow 없음
- [ ] 링크 · visited · focus — dark/light 모두 readable
- [ ] 375px: nav · theme toggle usable
- [ ] `/notes/`: 필터 · sidebar · palm 1단
- [ ] footer 비공개 토글 동작
- [ ] 새 의존성 · 빌드 단계 없음
- [ ] `reference-sites` 「안 가져올 것」 위반 없음
