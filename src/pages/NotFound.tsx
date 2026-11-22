import { Link } from 'react-router-dom';
import { useSeo } from '../lib/seo';

export default function NotFound() {
  useSeo('Page not found', 'The page you are looking for does not exist.', '/404');
  return (
    <div className="container-x section text-center">
      <h1>Page not found</h1>
      <p className="mt-3 text-muted">The page you requested does not exist.</p>
      <Link to="/" className="btn-primary mt-6">
        Back to home
      </Link>
    </div>
  );
}
