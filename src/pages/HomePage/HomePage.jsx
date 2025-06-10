import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../../services/api';
import MovieList from '../../components/MovieList/MovieList';

export default function HomePage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    getTrendingMovies()
      .then(setMovies)
      .catch((err) => setError('Помилка при завантаженні популярних фільмів'));
  }, []);

  return (
    <main>
      <h1>Trending Today</h1>
      {error && <p>{error}</p>}
      <MovieList movies={movies} />
    </main>
  );
}
