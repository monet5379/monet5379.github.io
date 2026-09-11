# Tier B — editorial 도식 (미게시 정본)

`docs/`는 Jekyll exclude다. 이 폴더의 `.html`·ledger는 **사이트에 올라가지 않는** 정본이고, 게시되는 산출물은 `assets/images/` 아래 PNG 하나뿐이다.

어떤 도식을 Tier B로 두는지·Tier A와의 경계: [`templates/mermaid-diagram.md`](../../templates/mermaid-diagram.md) §Tier · [`site-content-rules.md`](../../site-content-rules.md) §Mermaid · §projects 이미지.

## 한 도식 = 세 파일

| 파일 | 역할 |
|------|------|
| `<이름>-dark.html` | **정본.** 손으로 배치한 editorial SVG (존·focal·legend) |
| `<이름>-dark.ledger.md` | 출처·Kept / Transformed / Dropped·산출물 기록 |
| `assets/images/{notes,projects}/<슬러그>/diagram-<역할>-dark.png` | 본문에 삽입되는 유일한 산출물 |

이름: `<슬러그>-<역할>-dark`. 프로젝트 개요는 `<슬러그>-overview-dark`.

## 재생성

```bash
pip install playwright
playwright install chromium

cd docs/export/diagrams
python export_png.py <이름>-dark.html ../../../assets/images/notes/<슬러그>/diagram-<역할>-dark.png
```

`export_png.py`는 로컬 HTML을 열어 **첫 `svg`** 만 배경 없이 캡처한다. 세 번째 인자는 device scale factor(기본 `2`). `viewBox`가 `1280×720`이면 PNG는 2560×1440이다.

HTML을 고치면 **PNG를 다시 뽑고 ledger도 갱신한다.** PNG만 교체하거나 ledger만 고치면 정본이 갈린다.

## 규칙

- **dark 고정.** light variant는 두지 않는다. 사이트 light 모드에서도 같은 PNG가 뜬다.
- Tier B note는 본문 ` ```mermaid ` 블록과 `mermaid: true`를 **제거**한다. 같은 도식을 두 곳에 두지 않는다.
- `.mmd` 단독 정본·sibling mermaid-kit 파이프라인은 쓰지 않는다.
- 링크 미리보기(`_includes/link-preview-visual.html`)는 img를 mermaid보다 먼저 쓴다. Tier B 글은 PNG가 미리보기 visual이 된다.

## 현재 도식

| 정본 (`<이름>-dark`) | 쓰는 글 | 역할 |
|----------------------|---------|------|
| `blade-assault-overview` | `projects/blade-assault` | 프로젝트 개요 |
| `dragon-is-dead-overview` | `projects/dragon-is-dead` | 프로젝트 개요 |
| `blade-systems-read-map` | `notes/blade-systems-read` | 입구 지도 |
| `dragon-combat-cluster-map` | `notes/dragon-combat-cluster-read` | 입구 지도 |
| `dragon-combat-one-hit-one-hit` | `notes/dragon-combat-one-hit` | end-to-end 종합 |
| `blade-build-attach-session` | `notes/blade-build-attach` | 세션·표면 경계 |
| `save-layout-boundaries-lanes` | `notes/save-layout-boundaries` | 레인·존 경계 |
| `save-layout-side-lane-backup-vs-side` | `notes/save-layout-side-lane` | 대조 두 줄 |
| `dragon-save-shipped-recovery` | `notes/dragon-save-shipped` | 복구 순서 |
| `excel-json-fixed-data-pipeline` | `notes/excel-json-fixed-data` | 파이프라인 존 |
| `stage-spawn-area-preload-preload` | `notes/stage-spawn-area-preload` | preload 경로 |
| `narrative-ownership-shipped-workflow` | `notes/narrative-ownership-shipped` | 워크플로·역할 분담 |

도식을 추가·삭제하면 이 표를 갱신한다.
