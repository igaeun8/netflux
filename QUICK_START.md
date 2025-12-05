# 빠른 시작 가이드

## 📋 프로젝트 설정 완료 체크리스트

### ✅ 완료된 항목
- [x] 프로젝트 폴더 구조 생성
- [x] 필요한 의존성 패키지 추가
- [x] 기본 컴포넌트 및 페이지 파일 생성
- [x] API 서비스 구조 설정
- [x] 라우팅 설정
- [x] 개발 가이드 문서 작성

### ⏭️ 다음 단계

#### 1. 패키지 설치 (필수)
```bash
npm install
```

#### 2. TMDB API 키 발급 (필수)
1. https://www.themoviedb.org 접속
2. 계정 생성
3. Settings > API에서 API 키 발급
4. API 키를 안전하게 보관

#### 3. 개발 서버 실행
```bash
npm start
```

#### 4. 구현 우선순위

**1단계: 기본 인증 구현**
- `src/pages/SignIn.js` 완성
- 로그인/회원가입 폼 구현
- 애니메이션 전환 효과 추가

**2단계: 홈 페이지 구현**
- `src/components/movie/MovieCard.js` 생성
- `src/components/movie/MovieList.js` 생성
- TMDB API 연동
- 위시리스트 기능 추가

**3단계: 나머지 페이지 구현**
- Popular 페이지 (Table View / 무한 스크롤)
- Search 페이지 (검색 및 필터링)
- Wishlist 페이지 (Local Storage 활용)

**4단계: 스타일링 및 애니메이션**
- CSS 애니메이션 추가
- 반응형 디자인 구현
- Header 스크롤 효과

**5단계: 배포 준비**
- Git Flow 브랜치 전략 적용
- 배포 자동화 설정
- README.md 업데이트

## 📁 생성된 폴더 구조

```
src/
├── components/
│   ├── common/
│   │   ├── Header.js          ✅ 생성 완료
│   │   └── Header.css         ✅ 생성 완료
│   └── movie/                 📁 준비됨 (컴포넌트 추가 필요)
├── pages/
│   ├── Home.js                ✅ 생성 완료
│   ├── SignIn.js              ✅ 생성 완료
│   ├── Popular.js             ✅ 생성 완료
│   ├── Search.js              ✅ 생성 완료
│   └── Wishlist.js            ✅ 생성 완료
├── services/
│   ├── api.js                 ✅ TMDB API 클라이언트
│   ├── auth.js                ✅ 인증 서비스
│   └── wishlist.js            ✅ 위시리스트 관리
├── utils/
│   ├── imageUrl.js            ✅ 이미지 URL 생성
│   └── validation.js          ✅ 유효성 검사
└── constants/
    ├── api.js                 ✅ API 상수
    ├── routes.js              ✅ 라우트 상수
    └── storage.js             ✅ Local Storage 키
```

## 🎯 즉시 시작하기

### 가장 먼저 해야 할 일

1. **패키지 설치**
   ```bash
   npm install
   ```

2. **기본 페이지 확인**
   ```bash
   npm start
   ```
   브라우저에서 http://localhost:3000 접속

3. **로그인 페이지부터 구현 시작**
   - `src/pages/SignIn.js` 파일 열기
   - 과제 요구사항에 맞춰 폼 구현
   - `src/services/auth.js`의 함수 활용

## 💡 구현 팁

### TMDB API 사용 예시
```javascript
import { movieApi } from './services/api';

// 인기 영화 가져오기
const fetchPopularMovies = async () => {
  try {
    const response = await movieApi.getPopular(1);
    const movies = response.data.results;
    console.log(movies);
  } catch (error) {
    console.error('Error fetching movies:', error);
  }
};
```

### Local Storage 사용 예시
```javascript
import { STORAGE_KEYS } from './constants/storage';
import { toggleWishlist, getWishlist } from './services/wishlist';

// 위시리스트에 추가/제거
toggleWishlist(movie);

// 위시리스트 가져오기
const wishlist = getWishlist();
```

### 이미지 URL 생성 예시
```javascript
import { getPosterUrl } from './utils/imageUrl';

const imageUrl = getPosterUrl(movie.poster_path, 'medium');
// 결과: https://image.tmdb.org/t/p/w342/poster_path.jpg
```

## 📖 상세 가이드

더 자세한 개발 가이드는 [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)를 참고하세요.

## 🆘 문제 해결

### 패키지 설치 오류
- Node.js 버전 확인 (v14 이상 권장)
- `npm cache clean --force` 실행 후 재설치

### API 호출 오류
- TMDB API 키가 올바른지 확인
- 네트워크 연결 확인
- 브라우저 콘솔에서 에러 메시지 확인

### 라우팅이 작동하지 않음
- `react-router-dom` 패키지 설치 확인
- `App.js`에서 라우트 설정 확인

## 🎉 시작 준비 완료!

이제 프로젝트를 시작할 준비가 되었습니다. 
단계별로 천천히 구현해 나가시면 됩니다.

행운을 빕니다! 🚀

