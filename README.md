# [초급프로젝트] 과제 2) GPT와 함께 Front-End Demo Site 개발

React.js를 활용한 Netflix 스타일의 영화 스트리밍 플랫폼 클론 프로젝트입니다. TMDB API를 사용하여 실시간 영화 정보를 제공하고, Local Storage를 활용한 사용자 데이터 관리 및 반응형 웹 디자인을 구현합니다.

![Netflux](https://github.com/user-attachments/assets/2bbd19e1-2a13-4498-97c2-39aaae2ae4f1)

🌐 **라이브 데모**: [https://igaeun8.github.io/netflux](https://igaeun8.github.io/netflux)

---

## 📋 프로젝트 기본 정보

### 프로젝트 소개

Netflux는 Netflix의 UI/UX를 참고하여 제작된 영화 스트리밍 플랫폼 클론입니다. React.js를 기반으로 Single Page Application(SPA)을 구현하고, TMDB API를 통해 실시간 영화 데이터를 제공합니다.

### 주요 특징

- **TMDB API 연동**: 실시간 영화 데이터 표시 (인기, 상영중, 개봉예정, 장르별 등)
- **사용자 인증**: 로그인/회원가입 기능 (Local Storage 기반)
- **위시리스트**: 마음에 드는 영화를 찜하고 관리
- **검색 및 필터링**: 영화 제목 검색, 장르 필터, 평점/연도 필터
- **완전한 반응형**: 모바일, 태블릿, 데스크톱 최적화
- **Netflix 스타일 UI**: 다크 테마와 세련된 디자인
- **부드러운 애니메이션**: 페이지 전환, 호버 효과, 인터랙션
- **다양한 뷰 모드**: 테이블 뷰(24개/페이지), 무한 스크롤 뷰

---

## 🚀 기술 스택

### Frontend
- **React.js** 19.2.1 - UI 라이브러리
- **React Router DOM** 6.21.3 - 클라이언트 사이드 라우팅
- **Axios** 1.6.5 - HTTP 클라이언트
- **Font Awesome** 6.7.2 - 아이콘 라이브러리

### Build & Tools
- **React Scripts** 5.0.1 - 빌드 도구
- **ESLint** - 코드 린팅
- **Jest** - 테스트 프레임워크

### State Management & Storage
- **React Context API** - 전역 상태 관리
- **Local Storage** - 클라이언트 사이드 저장소

### API
- **TMDB (The Movie Database)** - 영화 데이터 제공

---

## 🛠️ 설치 및 실행 가이드

### 필수 요구사항

- **Node.js** (v14 이상 권장)
- **npm** 또는 **yarn**
- **TMDB API 키** ([TMDB 웹사이트](https://www.themoviedb.org/)에서 발급)

### 설치 방법

1. **저장소 클론**
```bash
git clone https://github.com/igaeun8/netflux.git
cd netflux
```

2. **의존성 설치**
```bash
npm install
```

3. **TMDB API 키 설정**
   - 프로젝트 실행 후 로그인 페이지에서 API 키를 입력하거나
   - Local Storage에 `tmdb_api_key` 키로 API 키를 저장

4. **개발 서버 실행**
```bash
npm start
```

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `build` 폴더에 생성되며, 정적 파일 서버를 통해 배포할 수 있습니다.

### 테스트 실행

```bash
npm test
```

---

## 📁 프로젝트 (폴더) 구조

```
netflux/
├── public/                    # 정적 파일
│   ├── index.html            # HTML 템플릿
│   ├── manifest.json         # PWA 매니페스트
│   └── robots.txt            # 검색 엔진 크롤러 설정
│
├── src/                      # 소스 코드
│   ├── assets/               # 이미지, 폰트 등 정적 리소스
│   │   └── images/
│   │
│   ├── components/           # 재사용 가능한 컴포넌트
│   │   ├── auth/            # 인증 관련 컴포넌트
│   │   │   ├── AuthForm.js      # 로그인/회원가입 폼
│   │   │   └── AuthForm.css
│   │   │
│   │   ├── common/          # 공통 컴포넌트
│   │   │   ├── Header.js        # 헤더 네비게이션
│   │   │   ├── Header.css
│   │   │   ├── PageTransition.js # 페이지 전환 효과
│   │   │   ├── PageTransition.css
│   │   │   └── ProtectedRoute.js # 인증 보호 라우트
│   │   │
│   │   └── movie/           # 영화 관련 컴포넌트
│   │       ├── MovieCard.js      # 영화 카드 컴포넌트
│   │       ├── MovieCard.css
│   │       ├── MovieList.js      # 영화 리스트 컴포넌트
│   │       ├── MovieList.css
│   │       ├── MovieDetailModal.js # 영화 상세 모달
│   │       └── MovieDetailModal.css
│   │
│   ├── constants/            # 상수 정의
│   │   ├── api.js          # API 관련 상수 (TMDB API URL 등)
│   │   ├── routes.js       # 라우트 경로 상수
│   │   └── storage.js      # Local Storage 키 상수
│   │
│   ├── context/             # React Context (전역 상태 관리)
│   │   └── ModalContext.js    # 모달 상태 관리
│   │
│   ├── hooks/               # Custom Hooks
│   │   ├── useApiKey.js       # API 키 관리 훅
│   │   └── useMovies.js       # 영화 데이터 페칭 훅
│   │
│   ├── pages/               # 페이지 컴포넌트
│   │   ├── Home/            # 홈 페이지
│   │   │   ├── Home.js
│   │   │   └── Home.css
│   │   │
│   │   ├── SignIn/          # 로그인/회원가입 페이지
│   │   │   ├── SignIn.js
│   │   │   └── SignIn.css
│   │   │
│   │   ├── Popular/         # 대세 콘텐츠 페이지
│   │   │   ├── Popular.js
│   │   │   └── Popular.css
│   │   │
│   │   ├── Search/          # 검색 페이지
│   │   │   ├── Search.js
│   │   │   └── Search.css
│   │   │
│   │   ├── Wishlist/        # 찜한 리스트 페이지
│   │   │   ├── Wishlist.js
│   │   │   └── Wishlist.css
│   │   │
│   │   ├── MovieDetail.js   # 영화 상세 페이지
│   │   └── MovieDetail.css
│   │
│   ├── services/            # API 서비스 및 비즈니스 로직
│   │   ├── api.js          # TMDB API 클라이언트
│   │   ├── auth.js         # 인증 관련 서비스
│   │   └── wishlist.js     # 위시리스트 관리 서비스
│   │
│   ├── styles/              # 전역 스타일
│   │   └── animations.css    # CSS 애니메이션 정의
│   │
│   ├── utils/               # 유틸리티 함수
│   │   ├── animations.js     # JavaScript 애니메이션 제어
│   │   ├── imageUrl.js      # TMDB 이미지 URL 생성
│   │   └── validation.js    # 폼 유효성 검사
│   │
│   ├── App.js               # 메인 App 컴포넌트 (라우팅 설정)
│   ├── App.css              # App 스타일
│   ├── index.js             # React 진입점
│   └── index.css            # 전역 CSS
│
├── package.json             # 프로젝트 의존성 및 스크립트
└── README.md               # 프로젝트 문서
```

### 주요 폴더 설명

- **`components/`**: 재사용 가능한 UI 컴포넌트들
  - `auth/`: 로그인/회원가입 관련 컴포넌트
  - `common/`: 헤더, 페이지 전환 등 공통 컴포넌트
  - `movie/`: 영화 카드, 리스트 등 영화 관련 컴포넌트

- **`pages/`**: 각 페이지별 컴포넌트와 스타일 파일
  - 각 페이지는 독립적인 폴더로 구성되어 관리

- **`services/`**: API 호출 및 비즈니스 로직 처리
  - TMDB API 통신, 인증, 위시리스트 관리 등

- **`context/`**: React Context를 통한 전역 상태 관리
  - 모달 상태 등

- **`hooks/`**: 재사용 가능한 Custom Hooks
  - API 키 관리, 영화 데이터 페칭 등

- **`utils/`**: 범용 유틸리티 함수들
  - 이미지 URL 생성, 유효성 검사, 애니메이션 제어 등

---

## 📚 개발 가이드 (Optional)

### 개발 환경 설정

1. **IDE 추천**: VS Code
2. **추천 확장 프로그램**:
   - ESLint
   - Prettier
   - React snippets

### 코드 실행 순서

1. `npm install` - 의존성 설치
2. `npm start` - 개발 서버 실행
3. 브라우저에서 `http://localhost:3000` 접속
4. 로그인 페이지에서 TMDB API 키 입력

### 주요 개발 패턴

- **컴포넌트 구조**: 함수형 컴포넌트 + Hooks
- **상태 관리**: useState, useContext, Custom Hooks
- **스타일링**: CSS Modules 방식 (컴포넌트별 CSS 파일)
- **라우팅**: React Router DOM v6
- **API 통신**: Axios + Custom Service Layer

---

## 💻 코딩 컨벤션

### 네이밍 규칙

- **컴포넌트**: PascalCase (예: `MovieCard.js`)
- **함수/변수**: camelCase (예: `handleClick`, `movieList`)
- **상수**: UPPER_SNAKE_CASE (예: `STORAGE_KEYS`)
- **CSS 클래스**: kebab-case (예: `movie-card`)

### 파일 구조

- 각 컴포넌트는 자체 폴더 또는 동일한 이름의 CSS 파일과 함께 배치
- 페이지 컴포넌트는 `pages/` 폴더 내 독립적인 폴더로 구성

### 코드 스타일

- **들여쓰기**: 2 spaces
- **세미콜론**: 사용
- **따옴표**: 작은따옴표(`'`) 사용
- **JSX**: 자체 닫는 태그 사용 (`<div />`)

### 예시

```javascript
// 컴포넌트 예시
const MovieCard = ({ movie }) => {
  const [isHovered, setIsHovered] = useState(false);
  
  const handleClick = () => {
    // 이벤트 처리
  };
  
  return (
    <div className="movie-card" onClick={handleClick}>
      {/* JSX 내용 */}
    </div>
  );
};
```

---

## 📝 Git 커밋 메시지 규칙

이 프로젝트는 [Conventional Commits](https://www.conventionalcommits.org/) 규칙을 따릅니다.

### 커밋 타입

- `feat`: 새로운 기능 추가
- `fix`: 버그 수정
- `docs`: 문서 수정
- `style`: 코드 포맷팅, 세미콜론 누락 등 (코드 변경 없음)
- `refactor`: 코드 리팩토링
- `test`: 테스트 코드 추가/수정
- `chore`: 빌드 업무 수정, 패키지 매니저 설정 등

### 커밋 메시지 형식

```
<type>(<scope>): <subject>

<body>

<footer>
```

### 예시

```bash
feat(ui): 홈 페이지 카테고리 네비게이션 추가

- 배너 아래 카테고리 네비게이션 카드 4개 추가
- 각 카테고리별 대표 영화 배경 이미지 표시
- 중복 방지 로직 구현

fix(pagination): 테이블 뷰에서 24개씩 표시하도록 수정

chore: GitHub Pages 주소를 netflux로 변경
```

---

## 🌿 브랜치 전략

이 프로젝트는 **Git Flow** 전략을 따릅니다.

### 브랜치 종류

- **`main`**: 제품 출시 브랜치 (프로덕션)
  - 항상 배포 가능한 상태 유지
  - 직접 커밋 금지, PR을 통해서만 병합

- **`develop`**: 개발 통합 브랜치
  - 다음 출시를 위한 개발 브랜치
  - 기능 브랜치에서 병합

- **`feature/*`**: 기능 개발 브랜치
  - 예: `feature/login-page`, `feature/movie-search`
  - `develop`에서 분기하여 작업 후 병합

- **`release/*`**: 출시 준비 브랜치 (선택)
  - 예: `release/v1.0.0`
  - 버그 수정 및 문서 업데이트

- **`hotfix/*`**: 긴급 수정 브랜치 (선택)
  - 예: `hotfix/critical-bug`
  - 프로덕션 버그 긴급 수정

### 브랜치 생성 예시

```bash
# 기능 브랜치 생성
git checkout -b feature/new-feature develop

# 작업 후 PR 생성
git push origin feature/new-feature
```

---

## 🔀 PR (Pull Request) 템플릿 안내

### PR 제목 형식

```
[타입] 간단한 설명
```

예: `[feat] 영화 검색 기능 추가`, `[fix] 로그인 오류 수정`

### PR 본문 템플릿

```markdown
## 변경 사항
- 변경 내용 1
- 변경 내용 2

## 스크린샷 (선택)
<!-- UI 변경이 있는 경우 스크린샷 첨부 -->

```

---

## 🐛 이슈 등록 방법

### 이슈 템플릿

1. **버그 리포트**
   - 제목: `[Bug] 버그 설명`
   - 내용: 재현 단계, 예상 동작, 실제 동작, 환경 정보

2. **기능 제안**
   - 제목: `[Feature] 기능 설명`
   - 내용: 기능 설명, 사용 사례, 추가 고려사항

3. **문서 개선**
   - 제목: `[Docs] 문서 개선 내용`
   - 내용: 개선할 내용 설명

### 이슈 등록 예시

```markdown
## 버그 설명
영화 카드를 클릭했을 때 상세 페이지로 이동하지 않습니다.

## 재현 단계
1. 홈 페이지 접속
2. 영화 카드 클릭
3. 페이지 이동 없음

## 예상 동작
영화 상세 페이지로 이동해야 합니다.

## 환경
- 브라우저: Chrome 120
- OS: macOS 14
```

---

## 📖 추가 문서 링크 (Optional)

### API 문서

- **TMDB API 공식 문서**: [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)
- **프로젝트 API 사용 가이드**: `src/services/api.js` 참고

### 사용자 가이드

1. **로그인/회원가입**
   - 회원가입 시 TMDB API 키를 비밀번호로 입력
   - "Remember me" 체크 시 자동 로그인

2. **영화 검색**
   - 검색 바에 영화 제목 입력
   - 장르 버튼 클릭으로 빠른 필터링
   - 필터 패널에서 상세 필터 설정

3. **위시리스트 관리**
   - 영화 카드의 하트 버튼 클릭
   - 위시리스트 페이지에서 테이블/무한 스크롤 뷰 선택

### 개발자 문서

- **컴포넌트 구조**: `src/components/` 참고
- **Custom Hooks**: `src/hooks/` 참고
- **서비스 레이어**: `src/services/` 참고
- **유틸리티 함수**: `src/utils/` 참고

---

## 📝 변경 이력

### v0.1.0 (최신)

- ✅ 홈 페이지 카테고리 네비게이션 추가
- ✅ 테이블 뷰에서 페이지당 24개 표시
- ✅ 페이지 헤더 UI 개선 (제목/설명 왼쪽 정렬, 뷰 토글 오른쪽 정렬)
- ✅ 반응형 디자인 개선
- ✅ GitHub Pages 주소 변경 (netflux)

### 주요 변경사항

- **UI/UX 개선**: 카테고리 네비게이션 카드에 배경 이미지 추가
- **페이지네이션**: 테이블 뷰에서 24개씩 표시하도록 최적화
- **레이아웃**: 모든 페이지 헤더 레이아웃 통일

---

## 🔗 관련 프로젝트 링크

- **라이브 데모**: [https://igaeun8.github.io/netflux](https://igaeun8.github.io/netflux)
- **GitHub 저장소**: [https://github.com/igaeun8/netflux](https://github.com/igaeun8/netflux)
- **TMDB API**: [https://www.themoviedb.org/documentation/api](https://www.themoviedb.org/documentation/api)
- **React 공식 문서**: [https://react.dev](https://react.dev)
- **React Router 문서**: [https://reactrouter.com](https://reactrouter.com)

---

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.

---

## 👥 기여하기

이슈 등록 및 Pull Request는 언제나 환영합니다! 

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
