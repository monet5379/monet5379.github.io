# AGENTS.md

개인 사이트 `monet5379.github.io`. 채용·포트폴리오·공개 기술.  
Intem Studio(`intemstudio.github.io`)와 **별개**. 스튜디오 글 전문 복제 금지 · 필요 시 링크만.

## 정본

| 주제 | 문서 |
|------|------|
| UI/UX (SCSS·layout) | [`.cursor/skills/monet5379-site-ui/SKILL.md`](.cursor/skills/monet5379-site-ui/SKILL.md) — 글/FM과 분리 |
| 글쓰기(유형·목차·톤) | [`docs/writing-guide.md`](docs/writing-guide.md) |
| FM·공개·이미지·커밋 | [`docs/site-content-rules.md`](docs/site-content-rules.md) |
| notes Mermaid | [`docs/templates/mermaid-diagram.md`](docs/templates/mermaid-diagram.md) — 정본은 note `.md` |
| projects · notes · reviews 채우기 | [`docs/templates/`](docs/templates/) |
| docs 목차 | [`docs/README.md`](docs/README.md) |
| 윤문 | [`.cursor/rules/korean-humanize.mdc`](.cursor/rules/korean-humanize.mdc) — 충돌 시 writing-guide 우선 |

unity-studio-kit `WritingGuide`(해요체·Unity docs)는 이 사이트에 적용하지 않는다. 경계: writing-guide §Kit과의 경계.

## Must

- **독자:** 코드·레포 없이 읽는 외부인 — 홈·projects·notes·reviews 전부 ([`docs/writing-guide.md`](docs/writing-guide.md) §외부 독자) · `title` 부제(`—`) 금지 · notes 시리즈는 `title`에 `{series_title} n/total` 접두 금지 · `excerpt` = lead
- notes `tags` 정확히 1개 · `project`는 `projects/` 슬러그 0개 또는 1개(`있으면` h1 아래 `프로젝트 : {한글 제목}` 링크·underline) · 시리즈는 킥커·h1 아래 `시리즈 : {제목} n/total` (`site-content-rules` 「시리즈」) · projects에 `project_kind` (`company` \| `personal`) · reviews `subtitle` 선택(부제는 FM 필드)
- 커밋 제목·본문: 한글 · 사이트 콘텐츠와 docs/설정은 커밋 분리
- 요청 없이 커밋·push 하지 않음

## Must not

- Kit `WritingGuide`·해요체·Architecture 문서 톤을 **게시 본문**에 적용
- 공개 본문에 Canvas·Architecture를 **유일 근거**처럼 쓰기 (내부·생략·notes 링크로 대체)
- Intem Studio 글 전문 복제
- sibling mermaid-kit·`.mmd` 단독 정본 파이프라인 강제 (notes Mermaid는 [`docs/templates/mermaid-diagram.md`](docs/templates/mermaid-diagram.md))

## 구조

- `index.md` — 소개·경력(타임라인)·CTA
- `career.md` — `/career/` → 홈 `#경력` 리다이렉트(구 URL용, nav 없음)
- `projects/` — 포트폴리오
- `notes/` — 개인 공개 기술 글
- `reviews/` — 게임 리뷰
- `docs/` — 내부 규칙·참고 (Jekyll exclude, 미게시)

## 빌드

```bash
bundle exec jekyll build
bundle exec jekyll serve
# 비공개 글을 HTML에서 빼려면(배포와 동일): JEKYLL_ENV=production bundle exec jekyll serve
```
