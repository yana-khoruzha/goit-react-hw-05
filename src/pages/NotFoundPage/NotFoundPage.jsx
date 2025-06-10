import { Link } from 'react-router-dom';
import css from './NotFoundPage.module.css';

export default function NotFoundPage() {
  return (
    <div className={css.container}>
      <h1>404 - Сторінку не знайдено</h1>
      <p>Sorry, this page doesn't exist</p>
      <Link to="/" className={css.homeLink}>To Home Page</Link>
    </div>
  );
}
