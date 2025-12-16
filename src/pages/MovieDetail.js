import { useState, useEffect } from 'react';
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

  const handleTabScroll = () => {
    if (window.innerWidth <= 768) {
      setTimeout(() => {
        const content = document.getElementById('detail-content');
        if (content) {
          const headerHeight = 80;
          const contentTop = content.getBoundingClientRect().top + window.pageYOffset;
          window.scrollTo({
            top: contentTop - headerHeight,
            behavior: 'smooth'
          });
        }
      }, 100);
    }
  };

  // 모달이 열릴 때 body 스크롤 방지
  useEffect(() => {
    if (showTrailer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [showTrailer]);

  // 화면 회전 대응
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 768) {
        document.body.style.overflowX = 'hidden';
      } else {
        document.body.style.overflowX = '';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('orientationchange', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      document.body.style.overflowX = '';
    };
  }, []);

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

      <main className="detail-content" id="detail-content">
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

            <div className="detail-tabs" role="tablist">
              <button 
                role="tab"
                aria-selected={activeTab === 'overview'}
                aria-controls="overview-panel"
                id="overview-tab"
                className={`tab-btn ${activeTab === 'overview' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('overview');
                  handleTabScroll();
                }}
              >
                주요 정보
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'recommendations'}
                aria-controls="recommendations-panel"
                id="recommendations-tab"
                className={`tab-btn ${activeTab === 'recommendations' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('recommendations');
                  handleTabScroll();
                }}
              >
                추천 영화
              </button>
              <button 
                role="tab"
                aria-selected={activeTab === 'production'}
                aria-controls="production-panel"
                id="production-tab"
                className={`tab-btn ${activeTab === 'production' ? 'active' : ''}`}
                onClick={() => {
                  setActiveTab('production');
                  handleTabScroll();
                }}
              >
                제작 정보
              </button>
            </div>

            <div className="tab-content" role="tabpanel">
              {activeTab === 'overview' && (
                <div 
                  id="overview-panel"
                  role="tabpanel"
                  aria-labelledby="overview-tab"
                  className="overview-section fade-in"
                >
                  <h3>줄거리</h3>
                  <p className="overview">{movie.overview || "상세 줄거리가 없습니다."}</p>
                </div>
              )}

              {activeTab === 'recommendations' && (
                <div 
                  id="recommendations-panel"
                  role="tabpanel"
                  aria-labelledby="recommendations-tab"
                  className="recommendations-section fade-in"
                >
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
                <div 
                  id="production-panel"
                  role="tabpanel"
                  aria-labelledby="production-tab"
                  className="production-section fade-in"
                >
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
                              loading="lazy"
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
          <div className="trailer-content" onClick={(e) => e.stopPropagation()}>
            <div className="trailer-iframe-wrapper">
              <iframe
                src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&rel=0`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                loading="eager"
              ></iframe>
            </div>
            <button 
              className="close-trailer" 
              onClick={(e) => {
                e.stopPropagation();
                setShowTrailer(false);
              }}
              aria-label="닫기"
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
