// 홈 페이지
import React from 'react';
import Header from '../components/common/Header';
import MovieList from '../components/movie/MovieList';
import { 
  usePopularMovies, 
  useNowPlayingMovies, 
  useTopRatedMovies, 
  useUpcomingMovies 
} from '../hooks/useMovies';
import './Home.css';

const Home = () => {
  // 각 카테고리별 영화 데이터 가져오기
  const popular = usePopularMovies();
  const nowPlaying = useNowPlayingMovies();
  const topRated = useTopRatedMovies();
  const upcoming = useUpcomingMovies();

  // 메인 배너 영화 (인기 영화 중 첫 번째)
  const mainMovie = popular.movies && popular.movies.length > 0 ? popular.movies[0] : null;

  return (
    <div className="home-page">
      <Header />
      
      {/* 메인 배너 (나중에 별도 컴포넌트로 분리 가능) */}
      {mainMovie && (
        <div 
          className="main-banner"
          style={{
            backgroundImage: `linear-gradient(to top, #141414, transparent), url(https://image.tmdb.org/t/p/original${mainMovie.backdrop_path})`
          }}
        >
          <div className="banner-content">
            <h1 className="banner-title">{mainMovie.title}</h1>
            <p className="banner-description">{mainMovie.overview}</p>
            <div className="banner-buttons">
              <button className="banner-btn play">재생</button>
              <button className="banner-btn info">상세 정보</button>
            </div>
          </div>
        </div>
      )}

      <main className="home-content">
        <MovieList 
          title="대세 콘텐츠" 
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
          title="평점 높은 영화" 
          movies={topRated.movies} 
          loading={topRated.loading} 
          error={topRated.error} 
        />
        
        <MovieList 
          title="개봉 예정작" 
          movies={upcoming.movies} 
          loading={upcoming.loading} 
          error={upcoming.error} 
        />
      </main>
    </div>
  );
};

export default Home;
