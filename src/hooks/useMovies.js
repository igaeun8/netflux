// 영화 데이터를 가져오는 커스텀 훅
import { useState, useEffect } from 'react';
import { movieApi } from '../services/api';

export const usePopularMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.getPopular(page);
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '영화 데이터를 불러오는데 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, loading, error };
};

export const useNowPlayingMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.getNowPlaying(page);
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '영화 데이터를 불러오는데 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, loading, error };
};

export const useTopRatedMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.getTopRated(page);
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '영화 데이터를 불러오는데 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, loading, error };
};

export const useUpcomingMovies = (page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.getUpcoming(page);
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '영화 데이터를 불러오는데 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

  return { movies, loading, error };
};

export const useMovieSearch = (query, page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.searchMovies(query, page);
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '영화 검색에 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    // 디바운싱: 500ms 후 검색 실행
    const timeoutId = setTimeout(() => {
      fetchMovies();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [query, page]);

  return { movies, loading, error };
};

export const useMovieDetail = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) {
      setMovie(null);
      setLoading(false);
      return;
    }

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const [detailResponse, videosResponse, recommendationsResponse] = await Promise.all([
          movieApi.getMovieDetail(movieId),
          movieApi.getMovieVideos(movieId),
          movieApi.getMovieRecommendations(movieId)
        ]);
        
        setMovie({
          ...detailResponse.data,
          videos: videosResponse.data.results || [],
          recommendations: recommendationsResponse.data.results || []
        });
      } catch (err) {
        setError(err.message || '영화 상세 정보를 불러오는데 실패했습니다.');
        setMovie(null);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  return { movie, loading, error };
};

export const useGenres = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.getGenres();
        setGenres(response.data.genres || []);
      } catch (err) {
        setError(err.message || '장르 목록을 불러오는데 실패했습니다.');
        setGenres([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGenres();
  }, []);

  return { genres, loading, error };
};

export const useGenreMovies = (genreId, page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!genreId) {
      setMovies([]);
      setLoading(false);
      return;
    }

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await movieApi.discoverMovies({
          with_genres: genreId,
          page
        });
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '장르별 영화를 불러오는데 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [genreId, page]);

  return { movies, loading, error };
};

// 필터링된 영화 검색 훅
export const useFilteredMovies = (filters, page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // filters가 없으면 빈 배열 반환
    if (!filters) {
      setMovies([]);
      setLoading(false);
      return;
    }

    // filters의 개별 값을 추출
    const genreId = filters.genreId || null;
    const minRating = filters.minRating || 0;
    const sortBy = filters.sortBy || 'popularity.desc';
    const year = filters.year || null;

    const fetchMovies = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const params = {
          page
        };

        // 장르 필터
        if (genreId) {
          params.with_genres = genreId;
        }

        // 평점 필터
        if (minRating > 0) {
          params['vote_average.gte'] = minRating;
        }

        // 정렬
        params.sort_by = sortBy;

        // 개봉년도 필터
        if (year) {
          params.primary_release_year = year;
        }

        const response = await movieApi.discoverMovies(params);
        setMovies(response.data.results || []);
      } catch (err) {
        setError(err.message || '영화를 불러오는데 실패했습니다.');
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters?.genreId, filters?.minRating, filters?.sortBy, filters?.year, page]);

  return { movies, loading, error };
};



