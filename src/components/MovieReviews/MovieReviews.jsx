import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReviews } from '../../services/api';
import css from './MovieReviews.module.css';

export default function MovieReviews() {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getReviews(movieId);
        setReviews(data);
      } catch (err) {
        setError('Fail to download reviews');
      }
    };

    fetchReviews();
  }, [movieId]);

  if (error) return <p>{error}</p>;
  if (reviews.length === 0) return <p>This movie doesn't have any reviews yet</p>;

  return (
    <ul className={css.reviewList}>
      {reviews.map(({ id, author, content }) => (
        <li key={id} className={css.reviewItem}>
          <h4>{author}</h4>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
}
