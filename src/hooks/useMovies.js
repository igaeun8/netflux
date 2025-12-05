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
        const response = await movieApi.getMovieDetail(movieId);
        setMovie(response.data);
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

