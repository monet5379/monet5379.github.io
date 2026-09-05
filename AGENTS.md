# AGENTS.md

개인 사이트 `monet5379.github.io`. 채용·포트폴리오·공개 기술.  
Intem Studio(`intemstudio.github.io`)와 **별개**. 스튜디오 글 전문 복제 금지 · 필요 시 링크만.

## 작성 vs 검토

| | 정본 |
|---|------|
| **작성** · 초고 | [`docs/writing-guide.md`](docs/writing-guide.md) · [`docs/templates/`](docs/templates/) |
| **검토** · 게시 전 | [`docs/content-review.md`](docs/content-review.md) · [`.cursor/rules/content-review.mdc`](.cursor/rules/content-review.mdc) |
| **FM·공개** (Gate 근거) | [`docs/site-content-rules.md`](docs/site-content-rules.md) |
| **윤문** (검토 이후) | [`.cursor/rules/korean-humanize.mdc`](.cursor/rules/korean-humanize.mdc) |

## 정본

| 주제 | 문서 |
|------|------|
| UI/UX (SCSS·layout) | [`.cursor/skills/monet5379-site-ui/SKILL.md`](.cursor/skills/monet5379-site-ui/SKILL.md) — 글/FM과 분리 |
| 글쓰기(Craft) | [`docs/writing-guide.md`](docs/writing-guide.md) |
| 콘텐츠 검토 | [`docs/content-review.md`](docs/content-review.md) |
| FM·공개·이미지·커밋 | [`docs/site-content-rules.md`](docs/site-content-rules.md) |
| notes Mermaid | [`docs/templates/mermaid-diagram.md`](docs/templates/mermaid-diagram.md) — 정본은 note `.md` |
| projects · notes · reviews 채우기 | writing-guide §notes 작성 — 규칙 3층 · templates |
| docs 목차 | [`docs/README.md`](docs/README.md) |
| 에이전트 효율 | [`docs/agent-efficiency.md`](docs/agent-efficiency.md) — 탐색·컨텍스트·스코프 |
| 윤문 | korean-humanize — 충돌 시 writing-guide 우선 · **검토 Gate 이후** |

unity-studio-kit `WritingGuide`(해요체·Unity docs)는 이 사이트에 적용하지 않는다. 경계: writing-guide §Kit과의 경계.

## 에이전트 효율

상세: [`docs/agent-efficiency.md`](docs/agent-efficiency.md)

- **정본만 연다.** 주제별 표(위) · 작성/검토/윤문 라우팅. 관련 없는 `docs/`·형제 repo 전체를 읽지 않는다.
- **notes 탐색은 FM으로 좁힌다.** `series` → `project` → `tags` 순. 같은 `series`면 형제만. 전 `notes/**` 풀스캔은 후보 0일 때만.
- **요청 범위만.** 글 작업에 UI 스킬·전 SCSS를 끌어오지 않는다. UI는 SCSS/HTML만, 글은 md/FM만.
- **최소 diff.** 요청 없는 리팩터·일괄 포맷·`jekyll serve`/커밋/push 금지(기존 Must와 동일).
- **워크스페이스.** 이 사이트 작업 중에는 가능하면 이 repo만. 멀티 루트 Unity 트리는 건드리지 않는다.
- **옵시디언**은 사람용 로컬 편집기. AI 검색·MCP에 의존하지 않는다.

## Must

Gate — 상세·체크리스트: [`docs/content-review.md`](docs/content-review.md). 요약:

- **`excerpt` = lead** · `title` 부제(`—`) 금지 · notes `title`에 시리즈 `{n}/{total}` 접두 금지
- notes `tags` 1개 · `project` 0~N YAML 목록(`있으면` h1 아래 `프로젝트 : {한글 제목}` · 복수 시 ` · ` · underline) · 시리즈 킥커·`series_nav` ([`site-content-rules`](docs/site-content-rules.md))
- projects `project_kind` (`company` \| `personal`) · reviews `subtitle` 선택
- 커밋 제목·본문 한글 · 사이트 콘텐츠와 docs/설정 커밋 분리 · 요청 없이 commit·push 금지

Craft·외부 독자·목차: [`writing-guide.md`](docs/writing-guide.md) (검토 Quality).

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
