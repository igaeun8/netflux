// 검색 페이지
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faBolt, 
  faMountain, 
  faGrinBeam, 
  faUserSecret,
  faTheaterMasks,
  faGhost,
  faHeart,
  faRocket,
  faExclamationTriangle,
  faFilter,
  faTimes,
  faSearch,
  faClock,
  faXmark,
  faList,
  faStream,
  faArrowUp
} from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/common/Header';
import MovieCard from '../../components/movie/MovieCard';
import { useGenres } from '../../hooks/useMovies';
import { movieApi } from '../../services/api';
import { STORAGE_KEYS } from '../../constants/storage';
import './Search.css';

// 장르 카테고리 정의 (빠른 선택용)
const GENRE_CATEGORIES = [
  { id: 28, name: '액션', icon: faBolt },
  { id: 12, name: '모험', icon: faMountain },
  { id: 35, name: '코미디', icon: faGrinBeam },
  { id: 80, name: '범죄', icon: faUserSecret },
  { id: 18, name: '드라마', icon: faTheaterMasks },
  { id: 27, name: '공포', icon: faGhost },
  { id: 10749, name: '로맨스', icon: faHeart },
  { id: 878, name: 'SF', icon: faRocket },
  { id: 53, name: '스릴러', icon: faExclamationTriangle },
];

// 최근 검색어 관리 함수
const MAX_SEARCH_HISTORY = 10;

const getSearchHistory = () => {
  try {
    const history = localStorage.getItem(STORAGE_KEYS.RECENT_SEARCHES);
    return history ? JSON.parse(history) : [];
  } catch (error) {
    return [];
  }
};

const saveSearchHistory = (history) => {
  try {
    localStorage.setItem(STORAGE_KEYS.RECENT_SEARCHES, JSON.stringify(history));
  } catch (error) {
    // 검색 기록 저장 실패 시 무시
  }
};

const addToSearchHistory = (searchQuery) => {
  if (!searchQuery || searchQuery.trim() === '') return;
  
  const trimmedQuery = searchQuery.trim();
  let history = getSearchHistory();
  
  // 중복 제거 (기존 항목이 있으면 제거)
  history = history.filter(item => item !== trimmedQuery);
  
  // 새로운 검색어를 맨 앞에 추가
  history.unshift(trimmedQuery);
  
  // 최대 개수 제한
  if (history.length > MAX_SEARCH_HISTORY) {
    history = history.slice(0, MAX_SEARCH_HISTORY);
  }
  
  saveSearchHistory(history);
};

const removeFromSearchHistory = (searchQuery) => {
  let history = getSearchHistory();
  history = history.filter(item => item !== searchQuery);
  saveSearchHistory(history);
};

const clearSearchHistory = () => {
  localStorage.removeItem(STORAGE_KEYS.RECENT_SEARCHES);
};

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  
  // 선택 중인 필터 (아직 적용되지 않은 상태)
  const [pendingGenreId, setPendingGenreId] = useState(null);
  const [pendingMinRating, setPendingMinRating] = useState(0);
  const [pendingSortBy, setPendingSortBy] = useState('popularity.desc');
  const [pendingYear, setPendingYear] = useState('');
  
  // 실제로 적용된 필터 (API 호출에 사용)
  const [appliedGenreId, setAppliedGenreId] = useState(null);
  const [appliedMinRating, setAppliedMinRating] = useState(0);
  const [appliedSortBy, setAppliedSortBy] = useState('popularity.desc');
  const [appliedYear, setAppliedYear] = useState('');
  
  const [showFilters, setShowFilters] = useState(false);
  const [showSearchHistory, setShowSearchHistory] = useState(false);
  const [searchHistory, setSearchHistory] = useState(getSearchHistory());
  const searchBarRef = useRef(null);
  
  // 뷰 모드 및 페이지네이션 상태
  const [viewMode, setViewMode] = useState('infinite'); // 'table' or 'infinite'
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  // 무한 스크롤용 observer
  const observer = useRef();

  // 장르 목록 가져오기
  const { genres } = useGenres();

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    if (newQuery) {
      // 검색어가 있으면 필터 초기화
      setAppliedGenreId(null);
      setPendingGenreId(null);
      setShowSearchHistory(true); // 검색어 입력 중에는 검색 기록 표시
    } else {
      setShowSearchHistory(false);
    }
    setSearchParams({ q: newQuery });
  };

  // 검색 실행 (엔터 키 또는 검색 기록 클릭 시)
  const handleSearch = (searchQuery) => {
    if (!searchQuery || searchQuery.trim() === '') return;
    
    const trimmedQuery = searchQuery.trim();
    setQuery(trimmedQuery);
    setSearchParams({ q: trimmedQuery });
    // 검색어로 검색할 때는 필터 초기화
    setAppliedGenreId(null);
    setPendingGenreId(null);
    setShowSearchHistory(false);
    
    // 검색 기록에 추가
    addToSearchHistory(trimmedQuery);
    setSearchHistory(getSearchHistory());
  };

  // 검색어 입력창 포커스 핸들러
  const handleSearchFocus = () => {
    if (!query) {
      setShowSearchHistory(true);
    }
  };

  // 검색어 입력창 포커스 아웃 핸들러
  const handleSearchBlur = (e) => {
    // 클릭한 요소가 검색 기록 영역이 아닐 경우에만 닫기
    setTimeout(() => {
      const currentTarget = e?.currentTarget || searchBarRef.current;
      const activeElement = document.activeElement;
      
      if (currentTarget && activeElement) {
        try {
          if (!currentTarget.contains(activeElement)) {
            setShowSearchHistory(false);
          }
        } catch {
          setShowSearchHistory(false);
        }
      } else {
        // currentTarget이나 activeElement가 null인 경우 닫기
        setShowSearchHistory(false);
      }
    }, 200);
  };

  // 검색 기록에서 항목 제거
  const handleRemoveHistoryItem = (e, historyItem) => {
    e.stopPropagation();
    removeFromSearchHistory(historyItem);
    setSearchHistory(getSearchHistory());
  };

  // 검색 기록 전체 삭제
  const handleClearHistory = () => {
    clearSearchHistory();
    setSearchHistory([]);
  };

  // 장르 버튼 클릭 핸들러 (바로 적용)
  const handleGenreClick = (genreId) => {
    if (appliedGenreId === genreId) {
      // 같은 장르를 다시 클릭하면 해제
      setAppliedGenreId(null);
      setPendingGenreId(null);
    } else {
      // 바로 적용된 필터에 반영
      setAppliedGenreId(genreId);
      setPendingGenreId(genreId); // 필터 패널에도 반영
      setQuery(''); // 장르 선택 시 검색어 초기화
      setSearchParams({});
    }
  };

  // 필터 검색 실행 (검색 버튼 클릭 시)
  const handleFilterSearch = () => {
    // 선택 중인 필터를 적용된 필터로 복사
    // 장르는 장르 버튼에서 바로 적용되므로, 필터 패널에서 선택했다면 그것도 적용
    if (pendingGenreId !== null) {
      setAppliedGenreId(pendingGenreId);
    }
    setAppliedMinRating(pendingMinRating);
    setAppliedSortBy(pendingSortBy);
    setAppliedYear(pendingYear);
    setShowFilters(false);
    setQuery('');
    setSearchParams({});
  };

  // 영화 로드 함수
  const loadMovies = useCallback(async (pageNum, isReset = false) => {
    try {
      setLoading(true);
      setError(null);
      
      let response;
      
    if (query) {
        // 검색어가 있으면 검색 API 사용
        response = await movieApi.searchMovies(query, pageNum);
      } else if (appliedGenreId || appliedMinRating > 0 || appliedSortBy !== 'popularity.desc' || appliedYear) {
        // 필터가 적용된 경우
        const params = { page: pageNum };
        if (appliedGenreId) params.with_genres = appliedGenreId;
        if (appliedMinRating > 0) params['vote_average.gte'] = appliedMinRating;
        params.sort_by = appliedSortBy;
        if (appliedYear) params.primary_release_year = parseInt(appliedYear);
        
        response = await movieApi.discoverMovies(params);
    } else {
        // 기본값: 인기 영화
        response = await movieApi.getPopular(pageNum);
      }
      
      const newMovies = response.data.results || [];
      setTotalPages(response.data.total_pages || 0);
      
      if (isReset) {
        setAllMovies(newMovies);
      } else {
        setAllMovies(prev => [...prev, ...newMovies]);
      }
    } catch (err) {
      setError(err.message || '영화를 불러오는데 실패했습니다.');
      setAllMovies([]);
    } finally {
      setLoading(false);
    }
  }, [query, appliedGenreId, appliedMinRating, appliedSortBy, appliedYear]);

  // 필터나 검색어 변경 시 영화 다시 로드
  useEffect(() => {
    setPage(1);
    loadMovies(1, true);
  }, [query, appliedGenreId, appliedMinRating, appliedSortBy, appliedYear, loadMovies]);

  // 스크롤 이벤트 (Top 버튼 표시)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 무한 스크롤: 마지막 요소 감지
  const lastMovieElementRef = useCallback(node => {
    if (loading) return;
    if (viewMode === 'table') return; // 테이블 뷰에서는 무한 스크롤 비활성화
    
    if (observer.current) observer.current.disconnect();
    
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && page < totalPages) {
        setPage(prevPage => {
          const nextPage = prevPage + 1;
          loadMovies(nextPage);
          return nextPage;
        });
      }
    });
    
    if (node) observer.current.observe(node);
  }, [loading, viewMode, page, totalPages, loadMovies]);

  // 개봉년도 옵션 생성 (최근 20년)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 20 }, (_, i) => currentYear - i);

  // 초기화 핸들러
  const handleReset = () => {
    setQuery('');
    setSearchParams({});
    // 선택 중인 필터와 적용된 필터 모두 초기화
    setPendingGenreId(null);
    setPendingMinRating(0);
    setPendingSortBy('popularity.desc');
    setPendingYear('');
    setAppliedGenreId(null);
    setAppliedMinRating(0);
    setAppliedSortBy('popularity.desc');
    setAppliedYear('');
    setShowFilters(false);
  };

  // 필터가 적용되었는지 확인
  const hasActiveFilters = appliedGenreId || appliedMinRating > 0 || appliedSortBy !== 'popularity.desc' || appliedYear;

  // 뷰 모드 변경 핸들러
  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setPage(1);
    loadMovies(1, true);
    window.scrollTo(0, 0);
  };

  // 페이지 변경 핸들러 (Table View)
  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setPage(newPage);
      loadMovies(newPage, true);
      window.scrollTo(0, 0);
    }
  };

  // 맨 위로 이동
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 테이블 뷰에서는 allMovies가 현재 페이지의 영화만 포함하므로 그대로 사용

  return (
    <div className="search-page">
      <Header />
      <main className="search-content">
        <div className="search-header">
          <div className="header-top-section">
            <div className="header-title-section">
              <h1>찾아보기</h1>
              <p className="page-description">취향에 맞는 콘텐츠를 직접 찾아보세요</p>
            </div>
            
            {/* 뷰 모드 토글 버튼 */}
            {allMovies.length > 0 && (
              <div className="view-toggle">
                <button 
                  className={`toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('table')}
                  title="테이블 뷰"
                >
                  <FontAwesomeIcon icon={faList} /> Table
                </button>
                <button 
                  className={`toggle-btn ${viewMode === 'infinite' ? 'active' : ''}`}
                  onClick={() => handleViewModeChange('infinite')}
                  title="무한 스크롤"
                >
                  <FontAwesomeIcon icon={faStream} /> Infinite
                </button>
              </div>
            )}
          </div>
          
          <div className="search-bar-wrapper">
            <div className="search-bar" ref={searchBarRef}>
              <FontAwesomeIcon icon={faSearch} className="search-icon" />
            <input
              type="text"
                id="movie-search-input"
                name="movie-search"
              placeholder="영화 제목을 입력하세요..."
              value={query}
              onChange={handleSearchChange}
                onFocus={handleSearchFocus}
                onBlur={handleSearchBlur}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleSearch(query);
                  }
                }}
              className="search-input"
                autoComplete="off"
            />
          </div>

            {showSearchHistory && searchHistory.length > 0 && (
              <div className="search-history-dropdown">
                <div className="search-history-header">
                  <span>최근 검색어</span>
                  <button 
                    className="clear-history-btn"
                    onClick={handleClearHistory}
                    title="전체 삭제"
                  >
                    전체 삭제
                  </button>
                </div>
                <ul className="search-history-list">
                  {searchHistory.map((historyItem, index) => (
                    <li 
                      key={index}
                      className="search-history-item"
                      onClick={() => handleSearch(historyItem)}
                    >
                      <FontAwesomeIcon icon={faClock} className="history-icon" />
                      <span className="history-text">{historyItem}</span>
                      <button
                        className="remove-history-btn"
                        onClick={(e) => handleRemoveHistoryItem(e, historyItem)}
                        title="삭제"
                      >
                        <FontAwesomeIcon icon={faXmark} />
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="genre-categories">
            {GENRE_CATEGORIES.map(genre => (
              <button
                key={genre.id}
                className={`genre-category-btn ${appliedGenreId === genre.id ? 'active' : ''}`}
                onClick={() => handleGenreClick(genre.id)}
              >
                <FontAwesomeIcon icon={genre.icon} />
                <span>{genre.name}</span>
              </button>
            ))}
          </div>

          <div className="filters-section">
            <button 
              className={`filter-toggle-btn ${showFilters ? 'active' : ''} ${hasActiveFilters ? 'has-filters' : ''}`}
              onClick={() => setShowFilters(!showFilters)}
            >
              <FontAwesomeIcon icon={faFilter} />
              <span>필터</span>
              {hasActiveFilters && <span className="filter-count">●</span>}
            </button>

            {showFilters && (
              <div className="filters-panel">
                <div className="filters-header">
                  <h3>필터 옵션</h3>
                  <button className="close-filters-btn" onClick={() => setShowFilters(false)}>
                    <FontAwesomeIcon icon={faTimes} />
                  </button>
                </div>

                <div className="filters-content">
                  <div className="filter-group">
                    <label>장르</label>
            <select 
                      value={pendingGenreId || ''} 
                      onChange={(e) => setPendingGenreId(e.target.value ? Number(e.target.value) : null)}
              className="filter-select"
            >
              <option value="">모든 장르</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>
                  </div>

                  <div className="filter-group">
                    <label>평점</label>
            <select 
                      value={pendingMinRating} 
                      onChange={(e) => setPendingMinRating(Number(e.target.value))}
              className="filter-select"
            >
              <option value="0">모든 평점</option>
              <option value="5">5점 이상</option>
              <option value="6">6점 이상</option>
              <option value="7">7점 이상</option>
              <option value="8">8점 이상</option>
              <option value="9">9점 이상</option>
            </select>
                  </div>

                  <div className="filter-group">
                    <label>정렬</label>
                    <select 
                      value={pendingSortBy} 
                      onChange={(e) => setPendingSortBy(e.target.value)}
                      className="filter-select"
                    >
                      <option value="popularity.desc">인기순</option>
                      <option value="vote_average.desc">평점순</option>
                      <option value="release_date.desc">최신순</option>
                      <option value="release_date.asc">오래된순</option>
                      <option value="title.asc">제목순 (A-Z)</option>
                      <option value="title.desc">제목순 (Z-A)</option>
                    </select>
                  </div>

                  <div className="filter-group">
                    <label>개봉년도</label>
                    <select 
                      value={pendingYear} 
                      onChange={(e) => setPendingYear(e.target.value)}
                      className="filter-select"
                    >
                      <option value="">모든 연도</option>
                      {years.map(y => (
                        <option key={y} value={y}>{y}년</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="filters-footer">
                  <button onClick={handleFilterSearch} className="reset-btn">
                    <FontAwesomeIcon icon={faSearch} />
                    <span>검색</span>
                  </button>
                </div>
              </div>
            )}

            {hasActiveFilters && !showFilters && (
              <button onClick={handleReset} className="reset-btn-inline">
                <FontAwesomeIcon icon={faTimes} />
                <span>초기화</span>
            </button>
            )}
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

          <div className="search-results">
          {loading && page === 1 ? (
            <div className="skeleton-grid">
              {[...Array(12)].map((_, index) => (
                <div key={index} className="skeleton-card">
                  <div className="skeleton-poster"></div>
                  <div className="skeleton-title"></div>
                  <div className="skeleton-rating"></div>
                </div>
              ))}
            </div>
          ) : allMovies.length > 0 ? (
            <>
              {viewMode === 'infinite' ? (
                // 무한 스크롤 뷰
                <div className="movie-grid infinite-view">
                  {allMovies.map((movie, index) => {
                    if (allMovies.length === index + 1) {
                      return (
                        <div ref={lastMovieElementRef} key={`${movie.id}-${index}`}>
                          <MovieCard movie={movie} />
                        </div>
                      );
                    } else {
                      return <MovieCard key={`${movie.id}-${index}`} movie={movie} />;
                    }
                  })}
                </div>
              ) : (
                // 테이블 뷰
                <div className="table-view-container">
                  <div className="movie-grid table-view">
                    {allMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
                  
                  <div className="pagination">
                    <button 
                      onClick={() => handlePageChange(page - 1)} 
                      disabled={page === 1}
                      className="page-btn"
                    >
                      이전
                    </button>
                    <span className="page-info">{page} / {totalPages}</span>
                    <button 
                      onClick={() => handlePageChange(page + 1)} 
                      disabled={page >= totalPages}
                      className="page-btn"
                    >
                      다음
                    </button>
                  </div>
                </div>
              )}
            </>
            ) : (
              <div className="no-results">
              {appliedGenreId 
                ? '해당 장르의 영화가 없습니다.' 
                : query 
                ? '검색 결과가 없습니다.' 
                : '장르를 선택하거나 검색어를 입력해주세요.'}
              </div>
            )}
          </div>

        {/* Top 버튼 */}
        {showTopBtn && (
          <button className="top-btn" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
      </main>
    </div>
  );
};

export default Search;
