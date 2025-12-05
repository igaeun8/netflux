// 영화 리스트 컴포넌트 (가로 스크롤)
import React, { useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import MovieCard from './MovieCard';
import './MovieList.css';

const MovieList = ({ title, movies, loading, error }) => {
  const listRef = useRef(null);
  const [isLeftVisible, setIsLeftVisible] = useState(false);
  const [isRightVisible, setIsRightVisible] = useState(true);

  // 스크롤 처리
  const scroll = (direction) => {
    if (listRef.current) {
      const { current } = listRef;
      const scrollAmount = direction === 'left' ? -current.clientWidth : current.clientWidth;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // 스크롤 버튼 표시 여부 업데이트
  const handleScroll = () => {
    if (listRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = listRef.current;
      setIsLeftVisible(scrollLeft > 0);
      setIsRightVisible(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  if (loading) return <div className="movie-list-loading">로딩 중...</div>;
  if (error) return <div className="movie-list-error">{error}</div>;
  if (!movies || movies.length === 0) return null;

  return (
    <div className="movie-list-container">
      <h2 className="movie-list-title">{title}</h2>
      
      <div className="movie-list-wrapper">
        {isLeftVisible && (
          <button 
            className="scroll-btn left" 
            onClick={() => scroll('left')}
            aria-label="이전 영화 보기"
          >
            <FontAwesomeIcon icon={faChevronLeft} />
          </button>
        )}
        
        <div 
          className="movie-list" 
          ref={listRef}
          onScroll={handleScroll}
        >
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        {isRightVisible && (
          <button 
            className="scroll-btn right" 
            onClick={() => scroll('right')}
            aria-label="다음 영화 보기"
          >
            <FontAwesomeIcon icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default MovieList;



