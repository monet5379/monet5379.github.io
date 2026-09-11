# Mermaid 도식 (notes 정본)

사이트 미게시. notes·projects 본문 도식 작성·Cursor 요청용.
목록·캐러셀 PNG는 [`../site-content-rules.md`](../site-content-rules.md) 「projects 이미지」.

## 정본

| 항목 | 위치 |
|------|------|
| 도식 소스 | `notes/<슬러그>.md` — ` ```mermaid ` fenced 블록 |
| 활성화 | front matter `mermaid: true` |
| 렌더 | `assets/js/mermaid-theme.js` → `mermaid-notes.js` / `link-preview.js` (테마 토글 시 재렌더) |

Cursor·에이전트가 note 본문에 직접 작성한다. sibling mermaid-kit·`.mmd` 단독 정본은 쓰지 않는다.

## Tier — live Mermaid vs editorial PNG

사이트 본문 도식은 두 갈래다. **역할**로 고른다. 크기·노드 수로 고르지 않는다.

| | Tier A — live Mermaid (기본) | Tier B — editorial PNG |
|---|------------------------------|------------------------|
| 맡는 역할 | 한 절의 흐름·분기·겹침 (How) | 시리즈·프로젝트 **입구 지도** · **end-to-end 종합** · **레인·존 경계** |
| 정본 | `notes/<슬러그>.md` 본문 블록 | `docs/export/diagrams/<이름>-dark.html` + `.ledger.md` |
| 테마 | 사이트 light/dark (`mermaid-theme.js`) | dark 고정 PNG |
| 수정 비용 | md만 고침 | HTML 수정 → 재export → ledger 갱신 |
| 예 | `blade-animator-overlay-layer` · `blade-command-gate` · `dragon-combat-hit-flow` | `blade-systems-read`(지도) · `dragon-combat-one-hit`(종합) · `save-layout-boundaries`(레인) · projects 개요 2편 |

**기본은 Tier A.** 2026-09-04 이후 신규 도식은 모두 Tier A다.

### Tier B로 올릴 때

아래 중 하나일 때만. **노드 수는 기준이 아니다** — `save-layout-boundaries`는 4노드, `blade-systems-read`는 5노드로 Tier B다.

- 시리즈·프로젝트 **입구**에서 읽기 순서·도메인 지도를 맡는 도식
- 한 시리즈를 닫는 **end-to-end 종합** 한 장
- 존 containment·직교 배치가 의미의 본체이고, Mermaid auto-layout이 그것을 깨뜨릴 때

올리면 note 본문 Mermaid 블록과 `mermaid: true`를 **제거**하고 PNG만 남긴다. 같은 도식을 두 곳에 두지 않는다. export·ledger·재생성: [`export/diagrams/README.md`](../export/diagrams/README.md).

### 내리지 않는 것

company `projects` 본문 개요 PNG(`diagram-overview-dark.png`)는 live Mermaid로 되돌리지 않는다.

## 한 장 규칙

- **한 블록 = 한 이야기:** entry → main 분기. subgraph로 레인·축 구분.
- **도식 안 `≠` / `NOTE`:** **강제하지 않는다.** 기본은 없음.
  - **넣을 때:** 아래 prose·callout만으로는 경계가 안 보이고, 도식만 보면 오해될 때 — 짧게 하나.
  - **빼는 때:** 아래 요약이 이미 `≠`·경계를 말하면 — **중복 금지**.
- **라벨:** 짧게. 표·lead와 같은 말 반복하지 않음.
- **언어:** notes 본문과 동일 (한국어 라벨 OK). README용 영문이 필요하면 README에만 별도 블록.
- **형식:** `flowchart TD` 또는 `flowchart LR`.
- **피함:** `%%{init:…}%%`, 과한 노드 수, 구현 파일명 나열, Plan용 임시 라벨 그대로 붙이기.

## Visual contract (사이트 톤)

도식 **색·선·글꼴**은 글마다 `%%{init}%%` · `classDef` 색 hex · `style`로 두지 않는다.  
렌더는 `assets/js/mermaid-theme.js`가 light/dark 토큰을 일괄 적용한다.

### 원칙

1. **Structure is information** — subgraph·화살표 종류·노드 모양은 **의미**만 담는다. 장식용 번호·색 구분은 넣지 않는다.
2. **Site tokens, not Mermaid default** — 노란 `#fff4dd` 기본 팔레트를 쓰지 않는다. `_sass/color-scheme.scss` Obsidian 계열과 맞춘다.
3. **Bold in one place** — 한 블록에서 시선을 끄는 요소는 **하나**: entry 노드 모양(stadium) **또는** main subgraph **또는** solid main path. 나머지는 neutral.
4. **Match complexity** — 노드 ~10개·subgraph 3개 이하. 더 필요하면 prose·표로 넘긴다.
5. **Self-critique** — 작성 후 light/dark 토글, 720px overflow, lead·표·캡션과 라벨 중복 확인.

### 토큰 (정본: `assets/js/mermaid-theme.js`)

| 역할 | Light | Dark | CSS 변수 근거 |
|------|-------|------|----------------|
| canvas | `#fafafa` | `#1c1c1c` | `--color-base-00` |
| node fill | `#f0f0f0` | `#282828` | `--color-base-10` / `20` |
| node text | `#222222` | `#dadada` | `--color-base-100` |
| border / line | `#bdbdbd` | `#555555` | `--color-base-40` |
| subgraph fill | `#f5f5f5` | `#212121` | `--color-base-05` |
| subgraph border | `#dadada` | `#3f3f3f` | `--color-base-35` |
| accent (JS only) | `#086ddd` | `#3d7dd6` | `--color-blue` |

accent는 **중앙 테마**에서만 쓰고, 본문 Mermaid 소스에 hex를 쓰지 않는다.

### 구조로 쓰는 시각 장치 (색 대신)

| 의미 | Mermaid 표현 |
|------|----------------|
| entry / 시작 | `([라벨])` stadium |
| 일반 단계 | `["라벨"]` rectangle |
| main path | `-->` solid |
| optional / side | `-.->` dashed |
| 레인·축 | `subgraph id["짧은 제목"]` |
| 2줄 라벨 | `["첫줄<br/>둘째줄"]` — **2줄까지만** |

### 금지 (visual)

- `%%{init:…}%%`, `style A fill:#…`, 색이 들어간 `classDef`
- Mermaid default 노란 팔레트에 의존 (테마 미적용 상태로 두기)
- 노드마다 다른 색·이모지·장식 번호 (01/02/03)
- 사이트와 무관한 AI 템플릿 팔레트 (cream+terracotta, acid green on black 등)

### 허용 (content + visual 경계)

- `classDef`는 **모양만** (예: `stroke-width:2px`) — **fill/stroke 색 hex 금지**
- subgraph 제목은 짧은 한국어 (레인 이름)
- dashed edge로 “선택·부가”만 표현

### 작성 후 체크

- [ ] light / dark 모두 본문과 같은 회색 톤인가
- [ ] entry가 하나만 강조되는가
- [ ] 노드 라벨이 lead·표·블록 위 제목과 겹치지 않는가
- [ ] 720px에서 `.mermaid-wrap` 가로 스크롤만 허용, 잘림 없음

## 본문 배치

- **Tier A:** 블록 **위** `**Main · Side · Meta**` 같은 한 줄 제목 · **아래** 도식 요약 1–2문장 또는 `<div class="callout" markdown="1">` 불릿.
- **Tier B:** PNG **위** 짧은 제목(선택) · **아래** 이탤릭 1줄(`*…*`) — callout 쓰지 않음.
- 경계·`≠`는 **아래 prose가 기본 채널** (Tier A callout · Tier B italic 모두 보조).
- **위치:** [`site-content-rules.md`](../site-content-rules.md) 「notes 도식 둘 곳」표.

## Cursor 요청 (복사용)

```text
notes/<슬러그>.md에 Mermaid 도식을 넣어 줘.

규칙: docs/templates/mermaid-diagram.md
- front matter mermaid: true
- 설명하는 절: <예: ## 해결 초입>
- 한 장: entry → 분기
- 도식 안 ≠/NOTE는 아래 prose에 경계가 없을 때만
- 위 제목 + 아래 callout 1–2문장
- init·hex 색 없음 — visual은 mermaid-theme.js
- entry stadium 하나, optional은 -.->
- save-layout-boundaries 노트 톤·밀도 참고

확인: bundle exec jekyll serve 후 light/dark 토글.
```

## projects와의 관계

- **기본:** 절 단위 개념은 live Mermaid. 실기 UI가 있으면 Demo 캡처 캐러셀.
- **개요 한 장:** `## 담당 시스템` 상단 `diagram-overview-dark.png`는 Tier B (위 §Tier).
- **목록:** Mermaid만 있는 프로젝트는 `ss-01-dark.png`를 두지 않음 (썸네일 없음).

## 쓸 때 / 안 쓸 때

- **쓴다:** 분기·레인·경계가 한 장으로 보일 때.
- **안 쓴다:** 실기 UI가 본체, 규칙 나열만, 뚜렷한 한 이야기 없을 때.
