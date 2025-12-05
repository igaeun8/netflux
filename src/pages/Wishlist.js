// 내가 찜한 리스트 페이지
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList, faHeartBroken } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import MovieCard from '../components/movie/MovieCard';
import { getWishlist } from '../services/wishlist';
import './Wishlist.css';

const Wishlist = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'list'
  
  // 위시리스트 불러오기 (페이지 로드 시 및 주기적으로 확인)
  useEffect(() => {
    const loadWishlist = () => {
      const wishlist = getWishlist();
      setMovies(wishlist);
    };

    loadWishlist();

    // 다른 탭/창에서 변경사항이 있을 수 있으므로 이벤트 리스너 추가
    window.addEventListener('storage', loadWishlist);
    
    // 커스텀 이벤트 리스너 (앱 내에서 변경 시)
    window.addEventListener('wishlist-updated', loadWishlist);

    return () => {
      window.removeEventListener('storage', loadWishlist);
      window.removeEventListener('wishlist-updated', loadWishlist);
    };
  }, []);

  // 위시리스트 변경 감지를 위한 폴링 (간단한 해결책)
  useEffect(() => {
    const interval = setInterval(() => {
      const currentWishlist = getWishlist();
      if (JSON.stringify(currentWishlist) !== JSON.stringify(movies)) {
        setMovies(currentWishlist);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [movies]);

  return (
    <div className="wishlist-page">
      <Header />
      <main className="wishlist-content">
        <div className="wishlist-header">
          <h1>내가 찜한 리스트</h1>
          
          {movies.length > 0 && (
            <div className="view-toggle">
              <button 
                className={`toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="그리드 뷰"
              >
                <FontAwesomeIcon icon={faTh} /> Grid
              </button>
              <button 
                className={`toggle-btn ${viewMode === 'list' ? 'active' : ''}`}
                onClick={() => setViewMode('list')}
                title="리스트 뷰"
              >
                <FontAwesomeIcon icon={faList} /> List
              </button>
            </div>
          )}
        </div>

        {movies.length > 0 ? (
          <div className={`movie-container ${viewMode}-view`}>
            {movies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        ) : (
          <div className="empty-wishlist">
            <FontAwesomeIcon icon={faHeartBroken} className="empty-icon" />
            <h2>아직 찜한 콘텐츠가 없어요.</h2>
            <p>마음에 드는 콘텐츠를 찾아 찜해보세요!</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Wishlist;
