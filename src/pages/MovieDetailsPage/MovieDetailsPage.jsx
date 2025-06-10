import { useEffect, useState, Suspense } from 'react';
import { useParams, useLocation, Outlet, Link } from 'react-router-dom';
import { getMovieDetails } from '../../services/api';
import css from './MovieDetailsPage.module.css';

export default function MovieDetailsPage() {
  const { movieId } = useParams();
  const location = useLocation();
  const backLink = location.state?.from || '/movies';

  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await getMovieDetails(movieId);
        setMovie(data);
      } catch (err) {
        setError('Не вдалося завантажити інформацію про фільм.');
      }
    };

    fetchDetails();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (!movie) return <p>Завантаження...</p>;

  const { title, overview, poster_path, vote_average, genres } = movie;

  const posterPath = `${poster_path}`;
  const baseUrl = 'https://image.tmdb.org/t/p/';
  const size = 'w500';
  const fullImageUrl = `${baseUrl}${size}${posterPath}`;

  return (
    <div className={css.container}>
      <Link to={backLink} className={css.backLink}>
        ← Go back
      </Link>
      <div className={css.movieInfo}>
        <img src={fullImageUrl} alt={title} className={css.poster} />

        <div className={css.details}>
          <h2 className={css.title}>{title}</h2>
          <p className={css.score}>
            User score: {Math.round(vote_average * 10)}%
          </p>
          <h3 className={css.sectionTitle}>Overview</h3>
          <p className={css.overview}>{overview}</p>
          <h3 className={css.sectionTitle}>Genres</h3>
          <p className={css.genres}>{genres.map((g) => g.name).join(', ')}</p>
        </div>
      </div>

      <hr className={css.hr} />
      <div className={css.additionalInfo}>
        <h3 className={css.sectionTitle}>Additional information</h3>
        <div className={css.additionalLinks}>
          <Link to="cast" state={{ from: backLink }}>
            Cast
          </Link>
          <Link to="reviews" state={{ from: backLink }}>
            Reviews
          </Link>
        </div>
        <hr className={css.hr} />
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
    </div>
  );
}
