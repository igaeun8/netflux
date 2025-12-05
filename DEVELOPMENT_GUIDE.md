# Netflix Clone 개발 가이드

## 프로젝트 개요
React.js를 활용한 Netflix 클론 프로젝트입니다. TMDB API를 사용하여 영화 정보를 표시하고, Local Storage를 활용한 사용자 데이터 관리 및 반응형 웹 디자인을 구현합니다.

## 기술 스택
- **Frontend Framework**: React.js 19.2.1
- **Routing**: React Router DOM 6.21.3
- **HTTP Client**: Axios 1.6.5
- **Icons**: Font Awesome 6.5.1
- **Build Tool**: React Scripts 5.0.1

## 프로젝트 구조

```
src/
├── assets/              # 이미지, 폰트 등 정적 파일
│   └── images/
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
├── styles/            # 전역 스타일
├── utils/             # 유틸리티 함수
│   ├── imageUrl.js    # 이미지 URL 생성
│   └── validation.js  # 유효성 검사
├── App.js             # 메인 App 컴포넌트
└── index.js           # 진입점
```

## 개발 단계별 가이드

### 1단계: 환경 설정 및 의존성 설치

```bash
# 패키지 설치
npm install

# 개발 서버 실행
npm start
```

**체크리스트:**
- [ ] 모든 패키지가 정상적으로 설치되었는지 확인
- [ ] 개발 서버가 localhost:3000에서 실행되는지 확인
- [ ] 브라우저에서 기본 페이지가 표시되는지 확인

### 2단계: TMDB API 키 발급 및 설정

1. **TMDB 계정 생성 및 API 키 발급**
   - https://www.themoviedb.org 접속
   - 계정 생성 후 API 키 발급
   - API 키를 안전하게 보관 (환경 변수로 관리 권장)

2. **API 키 설정 방법**
   - 회원가입 시 비밀번호로 API 키를 저장 (과제 요구사항)
   - 또는 `.env` 파일에 `REACT_APP_TMDB_API_KEY`로 저장 (권장)

**체크리스트:**
- [ ] TMDB API 키 발급 완료
- [ ] API 키 테스트 (Postman 또는 브라우저에서 확인)

### 3단계: 로그인/회원가입 페이지 구현

**구현해야 할 기능:**
- [ ] 로그인 폼 (이메일, 비밀번호)
- [ ] 회원가입 폼 (이메일, 비밀번호, 비밀번호 확인)
- [ ] 로그인-회원가입 전환 애니메이션
- [ ] 이메일 형식 검증
- [ ] Remember me 기능
- [ ] 약관 동의 (회원가입 시)
- [ ] Local Storage에 사용자 정보 저장
- [ ] Custom Toast 메시지 (추가 점수)

**참고 파일:**
- `src/services/auth.js` - 인증 로직
- `src/utils/validation.js` - 유효성 검사

**체크리스트:**
- [ ] 로그인 성공 시 홈으로 이동
- [ ] 회원가입 성공 시 로그인 폼으로 전환
- [ ] 에러 메시지 표시
- [ ] Local Storage에 데이터 저장 확인

### 4단계: 홈 페이지 구현

**구현해야 할 기능:**
- [ ] 최소 4개 이상의 TMDB API를 사용한 영화 리스트
  - 인기 영화 (Popular)
  - 현재 상영작 (Now Playing)
  - 평점 높은 영화 (Top Rated)
  - 개봉 예정작 (Upcoming)
- [ ] 영화 포스터 카드 컴포넌트
- [ ] 호버 시 포스터 확대 효과
- [ ] 클릭 시 위시리스트 추가/제거
- [ ] Loading 상태 표시
- [ ] 반응형 디자인

**구현 순서:**
1. `src/components/movie/MovieCard.js` 컴포넌트 생성
2. `src/components/movie/MovieList.js` 컴포넌트 생성
3. `src/pages/Home.js`에서 여러 영화 리스트 표시
4. CSS 애니메이션 추가

**체크리스트:**
- [ ] 4개 이상의 영화 섹션 표시
- [ ] 포스터 호버 효과
- [ ] 위시리스트 추가/제거 기능
- [ ] 로딩 상태 표시
- [ ] 모바일 반응형 확인

### 5단계: 대세 콘텐츠 페이지 구현

**구현해야 할 기능:**
- [ ] Table View / 무한 스크롤 토글 버튼
- [ ] Table View 모드:
  - [ ] Pagination 구현
  - [ ] 한 페이지에 모든 영화 표시
  - [ ] 스크롤 비활성화
- [ ] 무한 스크롤 모드:
  - [ ] 스크롤 끝에 도달 시 다음 페이지 로드
  - [ ] 로딩 인디케이터
  - [ ] Top 버튼

**체크리스트:**
- [ ] View 모드 전환 동작
- [ ] Pagination 정상 작동
- [ ] 무한 스크롤 정상 작동
- [ ] Top 버튼 기능

### 6단계: 찾아보기 페이지 구현

**구현해야 할 기능:**
- [ ] 영화 검색 기능
- [ ] 필터링 UI:
  - [ ] 장르별 필터링
  - [ ] 평점별 필터링
  - [ ] 정렬 옵션 (인기순, 개봉년도 등)
- [ ] 필터 초기화 버튼
- [ ] 최근 검색어 기록 (Local Storage)

**체크리스트:**
- [ ] 검색 기능 정상 작동
- [ ] 필터링 기능 정상 작동
- [ ] 검색어 기록 저장
- [ ] 필터 초기화 기능

### 7단계: 찜한 리스트 페이지 구현

**구현해야 할 기능:**
- [ ] Local Storage에서 위시리스트 불러오기
- [ ] 위시리스트 영화 표시
- [ ] 위시리스트에서 제거 기능
- [ ] 빈 리스트 상태 처리
- [ ] API 호출 없이 Local Storage만 사용

**체크리스트:**
- [ ] 위시리스트 영화 표시
- [ ] 제거 기능 정상 작동
- [ ] API 호출 안 함

### 8단계: CSS 애니메이션 및 전환 효과

**구현해야 할 기능:**
- [ ] 페이지 전환 애니메이션 (React Router)
- [ ] 로그인-회원가입 전환 효과 (필수)
- [ ] 영화 카드 호버 효과
- [ ] 버튼 상호작용 애니메이션
- [ ] Header 스크롤 애니메이션

**참고 예제:**
- 예제 링크 확인 (과제 문서 참조)

**체크리스트:**
- [ ] 모든 전환 효과 구현
- [ ] 부드러운 애니메이션
- [ ] 성능 최적화 (transform 사용)

### 9단계: Local Storage 활용

**저장해야 할 데이터 (최소 3개):**
- [ ] 사용자 정보 (`users`)
- [ ] 현재 로그인 사용자 (`currentUser`)
- [ ] TMDB API 키 (`TMDb-Key`)
- [ ] 위시리스트 (`movieWishlist`)
- [ ] Keep Login 상태 (`keepLogin`)
- [ ] 최근 검색어 (`recentSearches`) - 추가 점수

**체크리스트:**
- [ ] 최소 3개 이상의 키-값 쌍 저장
- [ ] 데이터 구조화 (JSON)
- [ ] 에러 핸들링

### 10단계: 반응형 웹 구현

**구현해야 할 기능:**
- [ ] 모바일 환경 대응
- [ ] 태블릿 환경 대응
- [ ] 데스크탑 환경 최적화
- [ ] 미디어 쿼리 활용
- [ ] 터치 이벤트 지원
- [ ] 모바일 화면 촬영 및 제출

**체크리스트:**
- [ ] 모든 페이지 모바일에서 정상 작동
- [ ] 레이아웃이 깨지지 않음
- [ ] 터치 이벤트 정상 작동
- [ ] 스마트폰 화면 촬영 완료

### 11단계: 라우팅 보호 (미들웨어)

**구현해야 할 기능:**
- [ ] 로그인하지 않은 사용자 보호
- [ ] 로그인 페이지로 리다이렉트
- [ ] Protected Route 컴포넌트 생성

**체크리스트:**
- [ ] 비로그인 시 보호된 페이지 접근 불가
- [ ] 자동 리다이렉트 동작

### 12단계: Git Flow 브랜치 전략

**브랜치 구조:**
```
main          # 제품 출시 브랜치
develop       # 개발 브랜치
feature/*     # 기능 개발 브랜치
release/*     # 출시 준비 브랜치 (선택)
hotfix/*      # 긴급 수정 브랜치 (선택)
```

**작업 흐름:**
1. `develop` 브랜치에서 시작
2. 기능별로 `feature/기능명` 브랜치 생성
3. 작업 완료 후 `develop`에 머지
4. 충분한 기능이 쌓이면 `main`에 머지

**체크리스트:**
- [ ] Git Flow 전략 적용
- [ ] 의미 있는 커밋 메시지
- [ ] Pull Request 작성 (선택)

### 13단계: 배포 자동화

**옵션 1: GitHub Pages**
- [ ] GitHub Repository 생성
- [ ] GitHub Actions workflow 설정
- [ ] 자동 배포 설정

**옵션 2: Netlify**
- [ ] Netlify 계정 생성
- [ ] Git Repository 연동
- [ ] Continuous Deployment 설정

**체크리스트:**
- [ ] 배포 자동화 설정 완료
- [ ] 빌드 및 배포 성공
- [ ] 배포된 사이트 접근 가능

### 14단계: README.md 작성

**포함해야 할 내용:**
- [ ] 프로젝트 기본 정보
- [ ] 기술 스택 명시
- [ ] 프로젝트 구조 설명
- [ ] 설치 및 실행 가이드
- [ ] 브랜치 전략 설명
- [ ] 개발 가이드 링크

### 15단계: AI 활용 (Prompt Engineering)

**최소 2개 이상의 기법 활용:**
- [ ] UI/UX 개선 제안 요청
- [ ] 코드 리뷰 및 개선
- [ ] 애니메이션 구현 도움
- [ ] 반응형 디자인 조언
- [ ] 버그 발견 및 디버깅
- [ ] 문서화 지원

**체크리스트:**
- [ ] AI를 활용한 개발 기록
- [ ] 사용한 Prompt 기법 문서화

## 주요 구현 팁

### 1. TMDB API 사용
```javascript
import { movieApi } from './services/api';

// 인기 영화 가져오기
const response = await movieApi.getPopular(1);
const movies = response.data.results;
```

### 2. Local Storage 사용
```javascript
import { STORAGE_KEYS } from './constants/storage';

// 저장
localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(data));

// 불러오기
const data = JSON.parse(localStorage.getItem(STORAGE_KEYS.WISHLIST) || '[]');
```

### 3. 이미지 URL 생성
```javascript
import { getPosterUrl } from './utils/imageUrl';

const imageUrl = getPosterUrl(movie.poster_path, 'medium');
```

### 4. 위시리스트 관리
```javascript
import { toggleWishlist, isInWishlist } from './services/wishlist';

// 토글
toggleWishlist(movie);

// 확인
const isWished = isInWishlist(movie.id);
```

## 개발 우선순위

1. **필수 기능 (먼저 구현)**
   - 로그인/회원가입
   - 홈 페이지 기본 구조
   - TMDB API 연동
   - 위시리스트 기능

2. **핵심 기능 (다음 구현)**
   - 각 페이지 완성
   - 필터링 및 검색
   - Pagination / 무한 스크롤

3. **부가 기능 (마지막 구현)**
   - 애니메이션
   - 반응형 최적화
   - 배포 자동화

## 문제 해결 가이드

### CORS 에러
- TMDB API는 CORS를 지원하므로 문제없어야 합니다.
- 만약 문제가 발생하면 프록시 설정을 확인하세요.

### 이미지가 로드되지 않음
- `getPosterUrl` 유틸리티 함수 사용 확인
- 이미지 경로가 올바른지 확인
- 기본 이미지 placeholder 설정

### Local Storage 데이터 손실
- 브라우저 개발자 도구에서 확인
- JSON.stringify/parse 올바르게 사용 확인

## 참고 자료

- [TMDB API 문서](https://developers.themoviedb.org/3)
- [React Router 문서](https://reactrouter.com/)
- [Font Awesome 문서](https://fontawesome.com/docs)

## 다음 단계

1. 패키지 설치: `npm install`
2. 개발 서버 실행: `npm start`
3. TMDB API 키 발급
4. 로그인/회원가입 페이지부터 시작!

Good luck! 🚀

