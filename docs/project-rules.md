# 프로젝트 규칙

## 커밋

- 제목·본문: 한글
- 의미 있는 한 문장으로 무엇을 왜 바꿨는지 적습니다
- 사이트 콘텐츠와 `docs`/설정 변경은 커밋을 분리합니다

## 공개 범위

- NDA·비공개 수치·내부명 금지
- 회사·프로젝트 실명은 본인이 허용한 범위만 사용합니다

## Studio

- Intem Studio 글 전문 복제 금지
- 필요 시 링크만 연결합니다

## projects front matter

- `project_kind`: `company`(회사 소속 출시) | `personal`(개인 OSS·케이스 스터디). `/projects/` 목록을 두 섹션으로 나눕니다.
- `private`: `true`면 production `/projects/` 목록에서 제외. 로컬 serve는 notes와 같은 **비공개** 토글(기본 숨김). permalink는 항상 빌드.
- `order`: 섹션 안 정렬 (작을수록 앞)
- `role`: 목록 메타 (권장)

## 프로젝트 이미지

경로: `assets/images/projects/<슬러그>/`

- 소문자 · kebab-case · ASCII만
- Steam 해시·해상도 접미사(`.1920x1080` 등) 금지
- 대표: `cover.jpg` (또는 `cover.webp`) — projects 목록 썸네일
- 스크린샷: `ss-01.jpg`, `ss-02.jpg`, … (두 자리 번호, 표시 순서)
- 설명형 이름이 필요하면 `combat-01.jpg`처럼 역할 + 번호
- 폴더에 실제 이미지가 있으면 `.gitkeep` 제거
- 목록 썸네일: `cover.*` 우선, 없으면 첫 `ss-*` (`section-index-list`, projects만)
- 캐러셀: `{% include screenshot-carousel.html slug="<슬러그>" %}` — `ss-*`를 이름순으로 Steam식 미리보기

## 규칙 추가

- 이 파일에 요지를 추가하고 `AGENTS.md`에서 링크합니다
