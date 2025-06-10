import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieCast } from '../../services/api';
import css from './MovieCast.module.css';

export default function MovieCast() {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const data = await getMovieCast(movieId);
        console.log(data);
        setCast(data);
      } catch (err) {
        setError('Не вдалося завантажити акторський склад.');
      }
    };

    fetchCast();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (cast.length === 0) return <p>Немає інформації про акторів.</p>;

  return (
    <ul className={css.castList}>
      {cast.map(({ id, name, character, profile_path }) => (
        <li key={id} className={css.castItem}>
          <img
            src={
              profile_path
                ? `https://image.tmdb.org/t/p/w200${profile_path}`
                : 'https://via.placeholder.com/100x150?text=No+Image'
            }
            alt={name}
            width="100"
            height="150"
            className={css.castImage}
          />
          <div className={css.castInfo}>
            <p>
              <strong>{name}</strong>
            </p>
            <p>
              as <em>{character}</em>
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}
