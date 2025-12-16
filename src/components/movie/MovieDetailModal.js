import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faStar, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import { getBackdropUrl, getPosterUrl } from '../../utils/imageUrl';
import { useMovieDetail } from '../../hooks/useMovies';
import './MovieDetailModal.css';

const MovieDetailModal = ({ movieId, onClose }) => {
  const { movie, loading, error } = useMovieDetail(movieId);

  // 모달이 열려있을 때 body 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  // 배경 클릭 시 닫기
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!movieId) return null;

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-content">
        <button className="close-btn" onClick={onClose}>
          <FontAwesomeIcon icon={faTimes} />
        </button>

        {loading && <div className="modal-loading">로딩 중...</div>}
        {error && <div className="modal-error">{error}</div>}

        {movie && !loading && (
          <>
            <div 
              className="modal-banner"
              style={{
                backgroundImage: `linear-gradient(to top, #141414, transparent), url(${getBackdropUrl(movie.backdrop_path)})`
              }}
            >
              <div className="modal-poster-wrapper">
                <img 
                  src={getPosterUrl(movie.poster_path)} 
                  alt={movie.title} 
                  className="modal-poster"
                />
              </div>
            </div>

            <div className="modal-info">
              <h2 className="modal-title">{movie.title}</h2>
              <div className="modal-meta">
                <span className="meta-item">
                  <FontAwesomeIcon icon={faStar} className="meta-icon star" />
                  {movie.vote_average?.toFixed(1)}
                </span>
                <span className="meta-item">
                  <FontAwesomeIcon icon={faCalendarAlt} className="meta-icon" />
                  {movie.release_date?.split('-')[0]}
                </span>
                <span className="meta-item">
                  <FontAwesomeIcon icon={faClock} className="meta-icon" />
                  {movie.runtime}분
                </span>
              </div>

              <div className="modal-genres">
                {movie.genres?.map(genre => (
                  <span key={genre.id} className="genre-tag">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="modal-overview">{movie.overview || "상세 설명이 없습니다."}</p>
              
              {movie.tagline && (
                <p className="modal-tagline">"{movie.tagline}"</p>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetailModal;

