// 영화 상세 정보 페이지
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCalendarAlt, faClock, faPlay, faHeart as faHeartSolid } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Header from '../components/common/Header';
import MovieList from '../components/movie/MovieList';
import { useMovieDetail } from '../hooks/useMovies';
import { getBackdropUrl, getPosterUrl } from '../utils/imageUrl';
import { toggleWishlist, isInWishlist } from '../services/wishlist';
import './MovieDetail.css';

const MovieDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(id);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);
  const [activeTab, setActiveTab] = useState('overview');
  const [isWished, setIsWished] = useState(false);

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

  useEffect(() => {
    if (movie) {
      setIsWished(isInWishlist(movie.id));
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

            <div className="action-buttons">
              {trailerKey && (
                <button className="trailer-btn" onClick={() => setShowTrailer(true)}>
                  <FontAwesomeIcon icon={faPlay} /> 예고편 보기
                </button>
              )}
              <button 
                className={`wishlist-btn-detail ${isWished ? 'active' : ''}`}
                onClick={() => {
                  toggleWishlist(movie);
                  setIsWished(!isWished);
                  // 위시리스트 업데이트 이벤트 발생
                  window.dispatchEvent(new CustomEvent('wishlist-updated'));
                }}
                aria-label={isWished ? "위시리스트에서 제거" : "위시리스트에 추가"}
              >
                <FontAwesomeIcon icon={isWished ? faHeartSolid : faHeartRegular} />
                {isWished ? ' 찜한 작품' : ' 찜하기'}
              </button>
            </div>

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

            <div className="detail-tabs">
              <button 
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => setActiveTab('overview')}
              >
                주요 정보
              </button>
              <button 
                className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
                onClick={() => setActiveTab('recommendations')}
              >
                추천 영화
              </button>
              <button 
                className={`tab-btn ${activeTab === 'production' ? 'active' : ''}`}
                onClick={() => setActiveTab('production')}
              >
                제작 정보
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'overview' && (
                <div className="overview-section fade-in">
                  <h3>줄거리</h3>
                  <p className="overview">{movie.overview || "상세 줄거리가 없습니다."}</p>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div className="recommendations-section fade-in">
                  {movie.recommendations && movie.recommendations.length > 0 ? (
                    <div className="recommendations-list">
                      <MovieList 
                        title="" 
                        movies={movie.recommendations} 
                        loading={false} 
                        error={null} 
                      />
                    </div>
                  ) : (
                    <p className="no-data">추천 영화가 없습니다.</p>
                  )}
                </div>
              )}

              {activeTab === 'production' && (
                <div className="production-section fade-in">
                  <h3>제작사</h3>
                  {movie.production_companies && movie.production_companies.length > 0 ? (
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
                  ) : (
                    <p className="no-data">제작사 정보가 없습니다.</p>
                  )}
                </div>
              )}
            </div>
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
