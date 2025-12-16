// 내가 찜한 리스트 페이지
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faList, faStream, faHeartBroken, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import Header from '../../components/common/Header';
import MovieCard from '../../components/movie/MovieCard';
import { getWishlist } from '../../services/wishlist';
import './Wishlist.css';

const Wishlist = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [viewMode, setViewMode] = useState('infinite');
  const [currentPage, setCurrentPage] = useState(1);
  const [showTopBtn, setShowTopBtn] = useState(false);
  const itemsPerPage = 20;
  
  useEffect(() => {
    const loadWishlist = () => {
      const wishlist = getWishlist();
      setAllMovies(wishlist);
      setCurrentPage(1);
    };

    loadWishlist();
    window.addEventListener('storage', loadWishlist);
    window.addEventListener('wishlist-updated', loadWishlist);

    return () => {
      window.removeEventListener('storage', loadWishlist);
      window.removeEventListener('wishlist-updated', loadWishlist);
    };
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      setShowTopBtn(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalPages = Math.ceil(allMovies.length / itemsPerPage);
  const currentPageMovies = viewMode === 'table' 
    ? allMovies.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
    : allMovies;

  const handleViewModeChange = (mode) => {
    setViewMode(mode);
    setCurrentPage(1);
    window.scrollTo(0, 0);
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      window.scrollTo(0, 0);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="wishlist-page">
      <Header />
      <main className="wishlist-content">
        <div className="wishlist-header">
          <h1>내가 찜한 리스트</h1>
          
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
                title="인피니티 뷰"
              >
                <FontAwesomeIcon icon={faStream} /> Infinite
              </button>
            </div>
          )}
        </div>

        {allMovies.length > 0 ? (
          <>
            {viewMode === 'infinite' && (
              <div className="movie-container infinite-view">
                {currentPageMovies.map((movie) => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            )}
            {viewMode === 'table' && (
              <div className="table-view-container">
                <div className="movie-container table-view">
                  {currentPageMovies.map((movie) => (
                    <MovieCard key={movie.id} movie={movie} />
                  ))}
                </div>
                
                {totalPages > 1 && (
                  <div className="pagination">
                    <button 
                      onClick={() => handlePageChange(currentPage - 1)} 
                      disabled={currentPage === 1}
                      className="page-btn"
                    >
                      이전
                    </button>
                    <span className="page-info">{currentPage} / {totalPages}</span>
                    <button 
                      onClick={() => handlePageChange(currentPage + 1)} 
                      disabled={currentPage === totalPages}
                      className="page-btn"
                    >
                      다음
                    </button>
                  </div>
                )}
              </div>
            )}
          </>
        ) : (
          <div className="empty-wishlist">
            <FontAwesomeIcon icon={faHeartBroken} className="empty-icon" />
            <h2>아직 찜한 콘텐츠가 없어요.</h2>
            <p>마음에 드는 콘텐츠를 찾아 찜해보세요!</p>
          </div>
        )}

        {showTopBtn && (
          <button className="top-btn" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faArrowUp} />
          </button>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
