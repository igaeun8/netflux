// 영화 카드 컴포넌트
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { getPosterUrl } from '../../utils/imageUrl';
import { toggleWishlist, isInWishlist } from '../../services/wishlist';
import { ROUTES } from '../../constants/routes';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isWished, setIsWished] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setIsWished(isInWishlist(movie.id));
  }, [movie.id]);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);
    setIsWished(!isWished);
  };

  const handleCardClick = () => {
    navigate(ROUTES.MOVIE_DETAIL.replace(':movieId', movie.id));
  };

  return (
    <div 
      className="movie-card"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      <div className="movie-poster-container">
        <img 
          src={getPosterUrl(movie.poster_path, 'medium')} 
          alt={movie.title} 
          className="movie-poster"
          loading="lazy"
        />
        
        {/* 호버 시 보여질 오버레이 */}
        <div className={`movie-overlay ${isHovered ? 'visible' : ''}`}>
          <div className="movie-info">
            <h3 className="movie-title">{movie.title}</h3>
            <div className="movie-meta">
              <span className="movie-rating">⭐ {movie.vote_average?.toFixed(1)}</span>
            </div>
            <button 
              className={`wishlist-btn ${isWished ? 'active' : ''}`}
              onClick={handleWishlistClick}
              aria-label={isWished ? "위시리스트에서 제거" : "위시리스트에 추가"}
            >
              <FontAwesomeIcon icon={isWished ? faHeartSolid : faHeartRegular} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;



