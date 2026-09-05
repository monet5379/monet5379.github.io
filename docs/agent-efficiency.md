# 에이전트 효율

AI가 **덜 읽고 · 덜 헤매고 · 덜 다시 하게** 하기 위한 내부 정책.  
콘텐츠 Craft(writing-guide) · Gate(content-review)와 별층이다. 충돌 시 **Gate · site-content-rules · writing-guide**가 우선한다.

진입: [`AGENTS.md`](../AGENTS.md).

## 목표

| 줄인다 | 줄이지 않는다 |
|--------|----------------|
| 불필요 Read · 전수 grep · 왕복 질문 | Gate 검사 · 정본 준수 · 요청한 산출물 |
| always 컨텍스트 · 빌드/커밋 습관 | 사용자가 명시한 검증·커밋 |

## 1. 정본 라우팅 (판단 속도)

요청 종류 → **먼저 이 파일만** ([`content-review.md`](content-review.md) §에이전트와 동일).

| 요청 | 읽을 것 | 읽지 말 것 (기본) |
|------|---------|-------------------|
| 작성·초고 | writing-guide · templates · site-content-rules | content-review 전문, UI 스킬 |
| 검토 | content-review · site-content-rules · writing-guide §외부 독자 | humanize 전문 |
| 윤문 | korean-humanize (Gate 이후·요청 시) | Gate를 humanize로 대체 |
| UI/SCSS | monet5379-site-ui 스킬 | notes 본문 Craft 재작성 |
| Mermaid | templates/mermaid-diagram · site-content-rules Mermaid | sibling mermaid-kit을 정본으로 |

한 요청에 작성+검토+윤문을 **동시에** 넓히지 않는다. 사용자가 명시하면 그 순서만.

## 2. notes · projects 탐색 (검색 범위)

「다른 노트도 같은지」「시리즈 맞춰줘」「비슷한 구조」류:

1. **앵커 노트** front matter를 읽는다 (`series`, `project`, `tags`, `series_order`).
2. **후보 집합**
   - `series` 있음 → 같은 `series`만 (보통 ≤ `series_total`)
   - 없고 `project` 있음 → 해당 `project` 목록만
   - 둘 다 없으면 → `tags` 1개로 한정 후, 그래도 부족할 때만 `notes/` 확장
3. 후보는 **경로 목록을 만든 뒤** 필요한 본문만 Read. 패턴 비교면 lead·h2·표 유무 등 **요청한 축만**.
4. 프로젝트 허브(`projects/<slug>.md`의 노트 지도)가 있으면 **그 링크 목록을 FM grep보다 우선**해도 된다.
5. Obsidian Graph · MCP · `/understand`에 **의존하지 않는다** (없어도 동일 절차). 옵시디언은 사람용 로컬 편집기로만 쓴다.

금지(기본): 질문과 무관한 `reviews/`·`_sass/`·형제 Unity repo 동시 탐색.

## 3. 컨텍스트 다이어트

- 큰 가이드 전문을 규칙에 복사하지 않는다. **링크 + 요약** (이 문서·AGENTS 패턴 유지).
- `alwaysApply: true` 규칙은 **짧고 횡단인 것만**. 검토·윤문·Mermaid는 기존처럼 요청/glob 트리거.
- 빌드 산출물·벤더·`.obsidian/`은 인덱싱에서 제외한다 → 루트 [`.cursorignore`](../.cursorignore).

## 4. 작업 스코프 · 최소 diff

- In scope = 사용자 요청과 **직접 관련** 파일만.
- 글 1편 수정 시 형제 시리즈 **전체 일괄 통일**은 요청이 있을 때만.
- 포맷만의 전파일 정리·무관 링크 리팩터 금지.
- `bundle exec jekyll *` · 브라우저 확인 · commit/push 는 **요청 시** (AGENTS Must와 동일).

## 5. 워크스페이스

- 사이트 콘텐츠·docs·`.cursor` 작업: **`monet5379.github.io`를 정본 루트**로 본다.
- 멀티 루트에 Unity/Kit이 있어도, 요청이 가리키지 않으면 **읽거나 수정하지 않는다**.
- Kit WritingGuide·해요체를 게시 본문에 적용하지 않는다 (AGENTS Must not).

## 6. 사용자에게 부탁하는 한 줄 (습관)

에이전트만으로 부족할 때, 요청에 범위를 붙이면 같다.

- 예: `@notes/dragon-combat-hit-flow.md` 기준으로 `series: combat-presence` 형제만 비교해줘.

## 체크 (에이전트 자가)

- [ ] 정본 라우팅에 맞는 문서만 열었는가
- [ ] notes면 FM/허브로 후보를 먼저 만들었는가
- [ ] 요청 밖 파일·빌드·커밋을 하지 않았는가
