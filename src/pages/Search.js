// 검색 페이지
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Header from '../components/common/Header';
import MovieCard from '../components/movie/MovieCard';
import { useMovieSearch, useGenres } from '../hooks/useMovies';
import './Search.css';

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  
  const [query, setQuery] = useState(initialQuery);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [minRating, setMinRating] = useState(0);
  const [filteredMovies, setFilteredMovies] = useState([]);

  // 검색 훅 사용
  const { movies, loading, error } = useMovieSearch(query);
  const { genres } = useGenres();

  // 검색어 변경 핸들러
  const handleSearchChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setSearchParams({ q: newQuery });
  };

  // 필터링 로직
  useEffect(() => {
    if (!movies) {
      setFilteredMovies([]);
      return;
    }

    let result = [...movies];

    // 장르 필터링
    if (selectedGenre) {
      result = result.filter(movie => 
        movie.genre_ids && movie.genre_ids.includes(parseInt(selectedGenre))
      );
    }

    // 평점 필터링
    if (minRating > 0) {
      result = result.filter(movie => movie.vote_average >= minRating);
    }

    setFilteredMovies(result);
  }, [movies, selectedGenre, minRating]);

  // 초기화 핸들러
  const handleReset = () => {
    setQuery('');
    setSearchParams({});
    setSelectedGenre('');
    setMinRating(0);
  };

  return (
    <div className="search-page">
      <Header />
      <main className="search-content">
        <div className="search-header">
          <h1>영화 검색</h1>
          <div className="search-bar">
            <input
              type="text"
              placeholder="영화 제목을 입력하세요..."
              value={query}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          <div className="filters">
            <select 
              value={selectedGenre} 
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="filter-select"
            >
              <option value="">모든 장르</option>
              {genres.map(genre => (
                <option key={genre.id} value={genre.id}>{genre.name}</option>
              ))}
            </select>

            <select 
              value={minRating} 
              onChange={(e) => setMinRating(Number(e.target.value))}
              className="filter-select"
            >
              <option value="0">모든 평점</option>
              <option value="5">5점 이상</option>
              <option value="6">6점 이상</option>
              <option value="7">7점 이상</option>
              <option value="8">8점 이상</option>
              <option value="9">9점 이상</option>
            </select>

            <button onClick={handleReset} className="reset-btn">
              초기화
            </button>
          </div>
        </div>

        {loading && <div className="loading-message">검색 중...</div>}
        {error && <div className="error-message">{error}</div>}

        {!loading && !error && (
          <div className="search-results">
            {filteredMovies.length > 0 ? (
              <div className="movie-grid">
                {filteredMovies.map(movie => (
                  <MovieCard key={movie.id} movie={movie} />
                ))}
              </div>
            ) : (
              <div className="no-results">
                {query ? '검색 결과가 없습니다.' : '검색어를 입력해주세요.'}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Search;
