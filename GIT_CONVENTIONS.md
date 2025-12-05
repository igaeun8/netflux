# Git 커밋 메시지 컨벤션 및 태깅 전략

## 📝 커밋 메시지 컨벤션

### 기본 형식
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Type (타입)
- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 변경
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등
- `design`: UI/UX 디자인 변경
- `build`: 빌드 시스템 또는 외부 종속성 변경

### Scope (범위) - 선택사항
- `auth`: 인증 관련
- `movie`: 영화 관련
- `api`: API 관련
- `ui`: UI 컴포넌트
- `router`: 라우팅
- `storage`: Local Storage
- `config`: 설정 파일

### Subject (제목)
- 50자 이내로 간결하게
- 첫 글자는 대문자
- 마침표(.) 사용하지 않음
- 명령형으로 작성 (예: "Add" not "Added")

### Body (본문) - 선택사항
- 72자마다 줄바꿈
- 무엇을, 왜 변경했는지 설명
- 어떻게 변경했는지는 가능하면 제외

### Footer (푸터) - 선택사항
- Issue 번호 참조: `Closes #123`
- Breaking Changes: `BREAKING CHANGE: 설명`

### 예시

#### 좋은 예시
```
feat(auth): 로그인/회원가입 페이지 기본 구조 추가

- SignIn 컴포넌트 생성
- 라우팅 설정 추가
- 기본 CSS 스타일 적용

Closes #1
```

```
fix(api): TMDB API 키 인터셉터 수정

API 키가 요청마다 올바르게 포함되도록 수정
```

```
docs: 개발 가이드 문서 추가

- DEVELOPMENT_GUIDE.md 작성
- QUICK_START.md 작성
- 프로젝트 구조 설명 추가
```

#### 나쁜 예시
```
수정함
```
```
커밋
```
```
asdf
```

## 🏷️ 태깅 전략

### 태그 형식
- **버전 태그**: `v<major>.<minor>.<patch>`
  - `major`: 주요 기능 추가 또는 호환성 깨짐
  - `minor`: 새로운 기능 추가 (하위 호환)
  - `patch`: 버그 수정

### 태그 종류
1. **릴리즈 태그** (v1.0.0, v1.1.0 등)
   - `main` 브랜치에만 태깅
   - 주요 마일스톤 달성 시

2. **베타 태그** (v1.0.0-beta.1)
   - 테스트 목적
   - `develop` 브랜치에 태깅 가능

### 태깅 규칙
- 의미 있는 버전에만 태깅
- 태그 메시지에 변경 사항 요약 포함
- `main` 브랜치에만 릴리즈 태그

### 예시
```bash
# 주요 기능 완성
git tag -a v1.0.0 -m "초기 프로젝트 구조 및 기본 페이지 완성"

# 버그 수정
git tag -a v1.0.1 -m "API 키 인증 버그 수정"

# 새 기능 추가
git tag -a v1.1.0 -m "위시리스트 기능 추가"
```

## 🔀 브랜치 전략 (Git Flow)

### 브랜치 구조
```
main          # 제품 출시 브랜치 (항상 배포 가능)
develop       # 개발 브랜치 (통합 브랜치)
feature/*     # 기능 개발 브랜치
```

### 브랜치 네이밍
- `feature/기능명`: `feature/user-authentication`
- `feature/페이지명`: `feature/home-page`
- `feature/컴포넌트명`: `feature/movie-card`

### 브랜치 사용 규칙
1. `main`: 항상 안정적인 상태 유지
2. `develop`: 모든 기능 개발이 통합되는 브랜치
3. `feature/*`: 각 기능별로 브랜치 분기하여 개발

### 작업 흐름
```
1. develop 브랜치에서 시작
2. feature/xxx 브랜치 생성
3. 개발 및 커밋
4. develop에 머지
5. 충분히 테스트 후 main에 머지
```

## 📋 Pull Request 규칙

### PR 제목 형식
```
[Type] 제목
```
예: `[Feat] 로그인/회원가입 페이지 구현`

### PR 본문 템플릿
```markdown
## 변경 사항
- 변경 내용 1
- 변경 내용 2

## 관련 이슈
Closes #이슈번호

## 체크리스트
- [ ] 코드 리뷰 완료
- [ ] 테스트 완료
- [ ] 문서 업데이트
```

## 🎯 커밋 예시 시나리오

### 시나리오 1: 프로젝트 초기 설정
```
chore: 프로젝트 초기 설정 및 폴더 구조 생성

- package.json 의존성 추가
- 폴더 구조 생성
- 기본 설정 파일 추가
```

### 시나리오 2: 새로운 페이지 추가
```
feat(pages): 홈 페이지 컴포넌트 추가

- Home.js 컴포넌트 생성
- 기본 라우팅 설정
- CSS 스타일 추가
```

### 시나리오 3: API 서비스 추가
```
feat(api): TMDB API 클라이언트 구현

- api.js 서비스 파일 생성
- 인기 영화 API 엔드포인트 추가
- 에러 핸들링 구현
```

### 시나리오 4: 버그 수정
```
fix(auth): 로그인 시 API 키 저장 오류 수정

localStorage에 API 키가 저장되지 않던 문제 해결
```

### 시나리오 5: 문서 업데이트
```
docs: 개발 가이드 문서 작성

- DEVELOPMENT_GUIDE.md 추가
- QUICK_START.md 추가
- 프로젝트 구조 설명
```

## ✅ 커밋 체크리스트

커밋 전 확인사항:
- [ ] 커밋 메시지가 컨벤션을 따르는가?
- [ ] 하나의 논리적 단위만 커밋하는가?
- [ ] 불필요한 파일이 포함되지 않았는가?
- [ ] 테스트가 통과하는가?

