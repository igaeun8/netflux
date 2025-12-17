// 대세 콘텐츠 페이지
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStream, faList, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/common/Header';
import MovieCard from '../../components/movie/MovieCard';
import { movieApi } from '../../services/api';
import './Popular.css';

const Popular = () => {
  const [viewMode, setViewMode] = useState('infinite'); // 'table' or 'infinite'
  const [page, setPage] = useState(1);
  const [allMovies, setAllMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(false);
  const [showTopBtn, setShowTopBtn] = useState(false);
  
  // 무한 스크롤용 observer
  const observer = useRef();
  
  // 초기 데이터 로드
  useEffect(() => {
    loadMovies(1, true);
  }, []);

  // 스크롤 이벤트 (Top 버튼 표시)
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const loadMovies = async (pageNum, isReset = false) => {
    try {
      setLoading(true);
      const response = await movieApi.getPopular(pageNum);
      const newMovies = response.data.results;
      setTotalPages(response.data.total_pages);
      
      if (isReset) {
        setAllMovies(newMovies);
      } else {
        setAllMovies(prev => [...prev, ...newMovies]);
      }
    } catch (error) {
      console.error('영화 데이터를 불러오는데 실패했습니다:', error);
    } finally {
      setLoading(false);
    }
  };

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
  }, [loading, viewMode, page, totalPages]);

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

  return (
    <div className="popular-page">
      <Header />
      <main className="popular-content">
        <div className="popular-header">
          <div className="header-title-section">
            <h1>대세 콘텐츠</h1>
            <p className="page-description">지금 가장 많이 선택받는 콘텐츠</p>
          </div>
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
        </div>

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
            {loading && <div className="loading-indicator">로딩 중...</div>}
          </div>
        ) : (
          // 테이블 뷰
          <div className="table-view-container">
            <div className="movie-grid table-view">
              {allMovies.map((movie) => (
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
                disabled={page === totalPages}
                className="page-btn"
              >
                다음
              </button>
            </div>
          </div>
        )}

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

export default Popular;
