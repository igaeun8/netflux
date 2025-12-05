// 영화 상세 정보 페이지
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCalendarAlt, faClock, faPlay } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import { useMovieDetail } from '../hooks/useMovies';
import { getBackdropUrl, getPosterUrl } from '../utils/imageUrl';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    if (movie && movie.videos) {
      const trailer = movie.videos.find(
        (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
      );
      if (trailer) {
        setTrailerKey(trailer.key);
      }
    }
  }, [movie]);

  if (loading) return <div className="detail-loading">로딩 중...</div>;
  if (error) return <div className="detail-error">{error}</div>;
  if (!movie) return <div className="detail-error">영화 정보를 찾을 수 없습니다.</div>;

  const backdropUrl = getBackdropUrl(movie.backdrop_path, 'original');
  const posterUrl = getPosterUrl(movie.poster_path, 'large');

  return (
    <div className="movie-detail-page">
      <Header />
      
      <div 
        className="detail-backdrop"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="backdrop-overlay"></div>
      </div>

      <main className="detail-content">
        <button onClick={() => navigate(-1)} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> 뒤로 가기
        </button>

        <div className="detail-grid">
          <div className="poster-section">
            <img src={posterUrl} alt={movie.title} className="detail-poster" />
          </div>

          <div className="info-section">
            <h1 className="detail-title">{movie.title}</h1>
            {movie.tagline && <p className="tagline">"{movie.tagline}"</p>}

            {trailerKey && (
              <button className="trailer-btn" onClick={() => setShowTrailer(true)}>
                <FontAwesomeIcon icon={faPlay} /> 예고편 보기
              </button>
            )}

            <div className="meta-info">
              <span className="rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                {movie.vote_average?.toFixed(1)}
              </span>
              <span className="year">
                <FontAwesomeIcon icon={faCalendarAlt} />
                {movie.release_date}
              </span>
              <span className="runtime">
                <FontAwesomeIcon icon={faClock} />
                {movie.runtime}분
              </span>
            </div>

            <div className="genres">
              {movie.genres?.map(genre => (
                <span key={genre.id} className="genre-tag">{genre.name}</span>
              ))}
            </div>

            <div className="overview-section">
              <h3>개요</h3>
              <p className="overview">{movie.overview || "상세 줄거리가 없습니다."}</p>
            </div>

            {/* 제작사 정보 */}
            {movie.production_companies && movie.production_companies.length > 0 && (
              <div className="production-section">
                <h3>제작사</h3>
                <div className="companies">
                  {movie.production_companies.map(company => (
                    <div key={company.id} className="company-item">
                      {company.logo_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w200${company.logo_path}`} 
                          alt={company.name} 
                          className="company-logo"
                          title={company.name}
                        />
                      ) : (
                        <span className="company-name">{company.name}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {showTrailer && trailerKey && (
        <div className="trailer-modal" onClick={() => setShowTrailer(false)}>
          <div className="trailer-content">
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <button 
              className="close-trailer" 
              onClick={(e) => {
                e.stopPropagation();
                setShowTrailer(false);
              }}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
