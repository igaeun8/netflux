import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faStar, faInfoCircle, faShare } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { getPosterUrl } from '../../utils/imageUrl';
import { toggleWishlist, isInWishlist } from '../../services/wishlist';
import { ROUTES } from '../../constants/routes';
import './MovieCard.css';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const [isWished, setIsWished] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [shareCopied, setShareCopied] = useState(false);

  useEffect(() => {
    setIsWished(isInWishlist(movie.id));
  }, [movie.id]);

  const handleDetailClick = (e) => {
    e.stopPropagation();
    navigate(ROUTES.MOVIE_DETAIL.replace(':id', movie.id));
  };

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    toggleWishlist(movie);
    setIsWished(!isWished);
    window.dispatchEvent(new CustomEvent('wishlist-updated'));
  };

  const handleShareClick = async (e) => {
    e.stopPropagation();
    const movieUrl = `${window.location.origin}${ROUTES.MOVIE_DETAIL.replace(':id', movie.id)}`;
    
    try {
      if (navigator.share) {
        await navigator.share({
          title: movie.title,
          text: `${movie.title} 영화를 확인해보세요!`,
          url: movieUrl
        });
      } else {
        await navigator.clipboard.writeText(movieUrl);
        setShareCopied(true);
        setTimeout(() => setShareCopied(false), 2000);
      }
    } catch (error) {
      if (error.name !== 'AbortError') {
        try {
          await navigator.clipboard.writeText(movieUrl);
          setShareCopied(true);
          setTimeout(() => setShareCopied(false), 2000);
        } catch {
          // 링크 복사 실패 (조용히 처리)
        }
      }
    }
  };

  const handleCardClick = () => {
    navigate(ROUTES.MOVIE_DETAIL.replace(':id', movie.id));
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
              <div className="movie-rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <span>{movie.vote_average?.toFixed(1)}</span>
              </div>
              {movie.release_date && (
                <span className="movie-year">{movie.release_date.split('-')[0]}</span>
              )}
            </div>

            {/* 동그란 버튼들 - 한 줄로 배치 */}
            <div className="movie-actions">
              <button 
                className="action-btn detail-btn"
                onClick={handleDetailClick}
                aria-label="상세 정보 보기"
              >
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
              <button 
                className={`action-btn share-btn ${shareCopied ? 'copied' : ''}`}
                onClick={handleShareClick}
                aria-label="공유하기"
                title={shareCopied ? "링크가 복사되었습니다!" : "영화 링크 공유하기"}
              >
                <FontAwesomeIcon icon={faShare} />
              </button>
              <button 
                className={`action-btn wishlist-btn ${isWished ? 'active' : ''}`}
                onClick={handleWishlistClick}
                aria-label={isWished ? "위시리스트에서 제거" : "위시리스트에 추가"}
              >
                <FontAwesomeIcon icon={isWished ? faHeartSolid : faHeartRegular} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
