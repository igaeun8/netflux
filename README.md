# [초급프로젝트] 과제 2) GPT와 함께 Front-End Demo Site 개발 
본 프로젝트는 GPT를 적극 활용하여 Netflix와 유사한 Front-End 데모 사이트를 제작하는 것을 목표로 합니다. React.js(또는 Vue.js)를 사용해 Single Page Application(SPA)을 개발하고, GitHub Pages를 통해 정적 웹사이트 배포까지 전 과정을 실습합니다.
React.js 기반의 Netflix 클론 프로젝트로, TMDB API를 활용하여 영화 정보를 동적으로 표시하며, Local Storage를 이용한 사용자 데이터 관리 기능을 구현합니다. 또한 다양한 디바이스 환경에서도 원활하게 사용할 수 있도록 반응형 웹 디자인을 적용합니다.
<img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/2bbd19e1-2a13-4498-97c2-39aaae2ae4f1" />


## 🚀 기술 스택

- **Frontend Framework**: React.js 19.2.1
- **Routing**: React Router DOM 6.21.3
- **HTTP Client**: Axios 1.6.5
- **Icons**: Font Awesome 6.5.1
- **Build Tool**: React Scripts 5.0.1

## 📁 프로젝트 구조

```
src/
├── assets/              # 이미지, 폰트 등 정적 파일
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/         # 공통 컴포넌트 (Header 등)
│   └── movie/          # 영화 관련 컴포넌트
├── constants/          # 상수 정의
│   ├── api.js         # API 관련 상수
│   ├── routes.js      # 라우트 경로
│   └── storage.js     # Local Storage 키
├── context/           # React Context (상태 관리)
├── hooks/             # Custom Hooks
├── pages/             # 페이지 컴포넌트
│   ├── Home.js        # 홈 페이지
│   ├── SignIn.js      # 로그인/회원가입
│   ├── Popular.js     # 대세 콘텐츠
│   ├── Search.js      # 찾아보기
│   └── Wishlist.js    # 찜한 리스트
├── services/          # API 서비스 및 비즈니스 로직
│   ├── api.js         # TMDB API 클라이언트
│   ├── auth.js        # 인증 관련 서비스
│   └── wishlist.js    # 위시리스트 관리
├── utils/             # 유틸리티 함수
│   ├── imageUrl.js    # 이미지 URL 생성
│   └── validation.js  # 유효성 검사
├── App.js             # 메인 App 컴포넌트
└── index.js           # 진입점
```

## 🛠️ 설치 및 실행

### 필수 요구사항

- Node.js (v14 이상)
- npm 또는 yarn
- TMDB API 키

### 설치 방법

1. 저장소 클론
```bash
git clone <repository-url>
cd netflix_clone
```

2. 의존성 설치
```bash
npm install
```

3. 개발 서버 실행
```bash
npm start
```

브라우저에서 [http://localhost:3000](http://localhost:3000)을 열어 확인하세요.

### 프로덕션 빌드

```bash
npm run build
```

빌드된 파일은 `build` 폴더에 생성됩니다.

## 📝 주요 기능

-  Single Page Application (SPA) 구현
-  React Router를 통한 라우팅
-  TMDB API를 활용한 영화 데이터 표시
-  Local Storage를 통한 사용자 데이터 관리
-  로그인/회원가입 기능
-  위시리스트 관리
-  영화 검색 및 필터링
-  반응형 웹 디자인
-  CSS 애니메이션 및 전환 효과

## 🌿 Git Flow 브랜치 전략

이 프로젝트는 Git Flow 전략을 따릅니다:

- `main`: 제품 출시 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `release/*`: 출시 준비 브랜치 (선택)
- `hotfix/*`: 긴급 수정 브랜치 (선택)

## 📚 개발 가이드

상세한 개발 가이드는 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)를 참고하세요.
