// 홈 페이지
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faInfoCircle, faHeart as faHeartSolid, faStar } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import Header from '../../components/common/Header';
import MovieList from '../../components/movie/MovieList';
import { 
  usePopularMovies, 
  useNowPlayingMovies, 
  useTopRatedMovies,
  useGenreMovies,
  useGenres
} from '../../hooks/useMovies';
import { getBackdropUrl } from '../../utils/imageUrl';
import { toggleWishlist, isInWishlist } from '../../services/wishlist';
import { ROUTES } from '../../constants/routes';
import { movieApi } from '../../services/api';
import './Home.css';

const Home = () => {
  const navigate = useNavigate();
  
  // 각 카테고리별 영화 데이터 가져오기
  const popular = usePopularMovies();
  const nowPlaying = useNowPlayingMovies();
  const topRated = useTopRatedMovies();

  
  // 장르별 인기 영화
  const actionMovies = useGenreMovies(28); // 액션
  const comedyMovies = useGenreMovies(35); // 코미디
  const romanceMovies = useGenreMovies(10749); // 로맨스
  const { genres } = useGenres();

  // 배너 슬라이드 관련 상태
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const [isWished, setIsWished] = useState(false);
  const [showTrailer, setShowTrailer] = useState(false);
  const [trailerKey, setTrailerKey] = useState(null);

  // 대세 콘텐츠 중 상위 5개를 배너로 사용
  const bannerMovies = popular.movies ? popular.movies.slice(0, 5) : [];
  const mainMovie = bannerMovies[currentBannerIndex] || null;

  // 배너 자동 슬라이드
  useEffect(() => {
    if (bannerMovies.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentBannerIndex((prev) => (prev + 1) % bannerMovies.length);
    }, 8000); // 8초마다 슬라이드

    return () => clearInterval(interval);
  }, [bannerMovies.length]);

  // 현재 영화의 찜 상태 확인
  useEffect(() => {
    if (mainMovie) {
      setIsWished(isInWishlist(mainMovie.id));
    }
  }, [mainMovie]);

  // 현재 영화의 예고편 가져오기
  useEffect(() => {
    if (!mainMovie) return;

    const fetchTrailer = async () => {
      try {
        const response = await movieApi.getMovieVideos(mainMovie.id);
        const videos = response.data.results || [];
        const trailer = videos.find(
          (video) => video.site === 'YouTube' && (video.type === 'Trailer' || video.type === 'Teaser')
        );
        if (trailer) {
          setTrailerKey(trailer.key);
        } else {
          setTrailerKey(null);
        }
      } catch (error) {
        console.error('예고편을 불러오는데 실패했습니다:', error);
        setTrailerKey(null);
      }
    };

    fetchTrailer();
  }, [mainMovie]);

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

  // 장르 이름 가져오기
  const getGenreNames = (genreIds) => {
    if (!genres || !genreIds) return [];
    return genreIds
      .map(id => genres.find(genre => genre.id === id))
      .filter(Boolean)
      .slice(0, 3) // 최대 3개만
      .map(genre => genre.name);
  };

  // 재생 버튼 클릭 핸들러
  const handlePlay = () => {
    if (trailerKey) {
      setShowTrailer(true);
    }
  };

  // 상세 정보 버튼 클릭 핸들러
  const handleInfo = () => {
    if (mainMovie) {
      navigate(ROUTES.MOVIE_DETAIL.replace(':id', mainMovie.id));
    }
  };

  // 찜하기 버튼 클릭 핸들러
  const handleWishlist = () => {
    if (mainMovie) {
      toggleWishlist(mainMovie);
      setIsWished(!isWished);
      window.dispatchEvent(new CustomEvent('wishlist-updated'));
    }
  };

  return (
    <div className="home-page">
      <Header />
      
      {/* 메인 배너 */}
      {mainMovie && (
        <div 
          className="main-banner"
          style={{
            backgroundImage: `linear-gradient(to top, #141414, transparent), url(${getBackdropUrl(mainMovie.backdrop_path, 'original')})`
          }}
        >
          <div className="banner-overlay"></div>
          
          {/* 슬라이드 인디케이터 */}
          {bannerMovies.length > 1 && (
            <div className="banner-indicators">
              {bannerMovies.map((_, index) => (
                <div
                  key={index}
                  className={`indicator ${index === currentBannerIndex ? 'active' : ''}`}
                  onClick={() => setCurrentBannerIndex(index)}
                />
              ))}
            </div>
          )}

          <div className="banner-content">
            {/* 별점 및 장르 정보 */}
            <div className="banner-meta">
              <div className="banner-rating">
                <FontAwesomeIcon icon={faStar} className="star-icon" />
                <span>{mainMovie.vote_average?.toFixed(1)}</span>
              </div>
              {getGenreNames(mainMovie.genre_ids).length > 0 && (
                <div className="banner-genres">
                  {getGenreNames(mainMovie.genre_ids).join(' • ')}
                </div>
              )}
            </div>

            <h1 className="banner-title">{mainMovie.title}</h1>
            <p className="banner-description">{mainMovie.overview}</p>
            
            <div className="banner-buttons">
              <button className="banner-btn play" onClick={handlePlay}>
                <FontAwesomeIcon icon={faPlay} />
                <span>재생</span>
              </button>
              <button className="banner-btn info" onClick={handleInfo} aria-label="상세 정보">
                <FontAwesomeIcon icon={faInfoCircle} />
              </button>
              <button 
                className={`banner-btn wishlist ${isWished ? 'active' : ''}`}
                onClick={handleWishlist}
                aria-label={isWished ? "위시리스트에서 제거" : "위시리스트에 추가"}
              >
                <FontAwesomeIcon icon={isWished ? faHeartSolid : faHeartRegular} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 예고편 모달 */}
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

      <main className="home-content">
        <MovieList 
          title="인기 콘텐츠" 
          movies={popular.movies} 
          loading={popular.loading} 
          error={popular.error} 
        />
        
        <MovieList 
          title="현재 상영작" 
          movies={nowPlaying.movies} 
          loading={nowPlaying.loading} 
          error={nowPlaying.error} 
        />
        
        <MovieList 
          title="최고 평점" 
          movies={topRated.movies} 
          loading={topRated.loading} 
          error={topRated.error} 
        />
        
        <MovieList 
          title="로맨스 영화" 
          movies={romanceMovies.movies} 
          loading={romanceMovies.loading} 
          error={romanceMovies.error} 
        />
        
        <MovieList 
          title="코미디 영화" 
          movies={comedyMovies.movies} 
          loading={comedyMovies.loading} 
          error={comedyMovies.error} 
        />
        
        <MovieList 
          title="액션 영화" 
          movies={actionMovies.movies} 
          loading={actionMovies.loading} 
          error={actionMovies.error} 
        />
      </main>
    </div>
  );
};

export default Home;
