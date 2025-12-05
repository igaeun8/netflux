// TMDB API 서비스
import axios from 'axios';
import { TMDB_BASE_URL, TMDB_ENDPOINTS } from '../constants/api';
import { STORAGE_KEYS } from '../constants/storage';

const getApiKey = () => {
  return localStorage.getItem(STORAGE_KEYS.TMDB_API_KEY) || '';
};

const apiClient = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    language: 'ko-KR'
  },
  timeout: 10000 // 10초 타임아웃
});

// API 키를 자동으로 추가하는 인터셉터
apiClient.interceptors.request.use(
  (config) => {
    const apiKey = getApiKey();
    if (apiKey) {
      config.params = {
        ...config.params,
        api_key: apiKey
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 응답 인터셉터 - 에러 핸들링
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      // 서버에서 응답이 왔지만 에러 상태 코드
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          console.error('API 인증 실패: API 키를 확인해주세요.');
          break;
        case 404:
          console.error('요청한 리소스를 찾을 수 없습니다.');
          break;
        case 500:
          console.error('서버 오류가 발생했습니다.');
          break;
        default:
          console.error(`API 오류 (${status}):`, data?.status_message || error.message);
      }
    } else if (error.request) {
      // 요청은 보냈지만 응답을 받지 못함
      console.error('네트워크 오류: 서버에 연결할 수 없습니다.');
    } else {
      // 요청 설정 중 오류 발생
      console.error('요청 설정 오류:', error.message);
    }
    
    return Promise.reject(error);
  }
);

export const movieApi = {
  // 인기 영화 목록
  getPopular: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.POPULAR, {
      params: { page }
    });
  },

  // 현재 상영작
  getNowPlaying: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.NOW_PLAYING, {
      params: { page }
    });
  },

  // 평점 높은 영화
  getTopRated: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.TOP_RATED, {
      params: { page }
    });
  },

  // 개봉 예정작
  getUpcoming: (page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.UPCOMING, {
      params: { page }
    });
  },

  // 영화 검색
  searchMovies: (query, page = 1) => {
    return apiClient.get(TMDB_ENDPOINTS.SEARCH, {
      params: { query, page }
    });
  },

  // 영화 상세 정보
  getMovieDetail: (movieId) => {
    return apiClient.get(`${TMDB_ENDPOINTS.DETAIL}/${movieId}`);
  },

  // 장르별 영화
  discoverMovies: (params = {}) => {
    return apiClient.get(TMDB_ENDPOINTS.DISCOVER, {
      params: { page: 1, ...params }
    });
  },

  // 장르 목록
  getGenres: () => {
    return apiClient.get(TMDB_ENDPOINTS.GENRES);
  }
};

// API 키 검증 함수
export const validateApiKey = async (apiKey) => {
  try {
    const testClient = axios.create({
      baseURL: TMDB_BASE_URL,
      params: {
        api_key: apiKey,
        language: 'ko-KR'
      },
      timeout: 5000
    });
    
    // 간단한 요청으로 API 키 검증
    await testClient.get(TMDB_ENDPOINTS.GENRES);
    return { valid: true, message: 'API 키가 유효합니다.' };
  } catch (error) {
    if (error.response?.status === 401) {
      return { valid: false, message: 'API 키가 유효하지 않습니다.' };
    }
    return { valid: false, message: 'API 키 검증 중 오류가 발생했습니다.' };
  }
};

// API 키 설정 함수
export const setApiKey = (apiKey) => {
  if (apiKey) {
    localStorage.setItem(STORAGE_KEYS.TMDB_API_KEY, apiKey);
  }
};

// API 키 확인 함수
export const hasApiKey = () => {
  return !!getApiKey();
};

export default apiClient;

