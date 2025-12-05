# Netflix Clone

React.js를 활용한 Netflix 클론 프로젝트입니다. TMDB API를 사용하여 영화 정보를 표시하고, Local Storage를 활용한 사용자 데이터 관리 및 반응형 웹 디자인을 구현합니다.

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

- ✅ Single Page Application (SPA) 구현
- ✅ React Router를 통한 라우팅
- ✅ TMDB API를 활용한 영화 데이터 표시
- ✅ Local Storage를 통한 사용자 데이터 관리
- ✅ 로그인/회원가입 기능
- ✅ 위시리스트 관리
- ✅ 영화 검색 및 필터링
- ✅ 반응형 웹 디자인
- ✅ CSS 애니메이션 및 전환 효과

## 🌿 Git Flow 브랜치 전략

이 프로젝트는 Git Flow 전략을 따릅니다:

- `main`: 제품 출시 브랜치
- `develop`: 개발 브랜치
- `feature/*`: 기능 개발 브랜치
- `release/*`: 출시 준비 브랜치 (선택)
- `hotfix/*`: 긴급 수정 브랜치 (선택)

## 📚 개발 가이드

상세한 개발 가이드는 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)를 참고하세요.

## 🎯 구현 상태

- [ ] 로그인/회원가입 페이지
- [ ] 홈 페이지
- [ ] 대세 콘텐츠 페이지
- [ ] 찾아보기 페이지
- [ ] 찜한 리스트 페이지
- [ ] 배포 자동화

## 📄 라이선스

이 프로젝트는 교육 목적으로 제작되었습니다.
