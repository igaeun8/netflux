// 영화 상세 정보 페이지
import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faStar, faCalendarAlt, faClock } from '@fortawesome/free-solid-svg-icons';
import Header from '../components/common/Header';
import { useMovieDetail } from '../hooks/useMovies';
import { getBackdropUrl, getPosterUrl } from '../utils/imageUrl';
import './MovieDetail.css';

const MovieDetail = () => {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { movie, loading, error } = useMovieDetail(movieId);

  // 상단으로 스크롤 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <div className="detail-loading">로딩 중...</div>;
  if (error) return <div className="detail-error">{error}</div>;
  if (!movie) return <div className="detail-error">영화를 찾을 수 없습니다.</div>;

  return (
    <div className="movie-detail-page">
      <Header />
      
      <div 
        className="detail-backdrop"
        style={{
          backgroundImage: `linear-gradient(to top, #141414 10%, transparent 100%), url(${getBackdropUrl(movie.backdrop_path, 'original')})`
        }}
      >
        <button onClick={() => navigate(-1)} className="back-btn">
          <FontAwesomeIcon icon={faArrowLeft} /> 뒤로 가기
        </button>
      </div>

      <div className="detail-content">
        <div className="detail-poster-wrapper">
          <img 
            src={getPosterUrl(movie.poster_path, 'large')} 
            alt={movie.title} 
            className="detail-poster"
          />
        </div>

        <div className="detail-info">
          <h1 className="detail-title">{movie.title}</h1>
          {movie.tagline && <p className="detail-tagline">"{movie.tagline}"</p>}
          
          <div className="detail-meta">
            <span className="meta-item">
              <FontAwesomeIcon icon={faStar} className="meta-icon star" />
              {movie.vote_average?.toFixed(1)}
            </span>
            <span className="meta-item">
              <FontAwesomeIcon icon={faCalendarAlt} className="meta-icon" />
              {movie.release_date}
            </span>
            <span className="meta-item">
              <FontAwesomeIcon icon={faClock} className="meta-icon" />
              {movie.runtime}분
            </span>
          </div>

          <div className="detail-genres">
            {movie.genres?.map(genre => (
              <span key={genre.id} className="genre-tag">{genre.name}</span>
            ))}
          </div>

          <div className="detail-section">
            <h3>개요</h3>
            <p className="detail-overview">{movie.overview || "상세 설명이 없습니다."}</p>
          </div>

          {movie.production_companies?.length > 0 && (
            <div className="detail-section">
              <h3>제작사</h3>
              <div className="production-list">
                {movie.production_companies.map(company => (
                  <span key={company.id} className="company-name">
                    {company.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;

