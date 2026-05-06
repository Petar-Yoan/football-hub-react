import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { deleteNews, getNewsById } from '../services/newsService';
import { useAuth } from '../contexts/AuthContext';

type NewsItem = {
  id: number;
  title: string;
  content: string;
};

function NewsDetails() {
  const { newsId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [news, setNews] = useState<NewsItem | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!newsId) {
      setError('Invalid news id.');
      setLoading(false);
      return;
    }

    getNewsById(newsId)
      .then((result) => {
        setNews(result);
        setError('');
      })
      .catch(() => {
        setError('Failed to load news details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [newsId]);

  const deleteHandler = async () => {
    if (!newsId) {
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this news item?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteNews(newsId);
      navigate('/');
    } catch {
      setError('Failed to delete news.');
    }
  };

  return (
    <section className="page-section">
      {loading && <p>Loading news details...</p>}
      {error && <p className="form-error">{error}</p>}

      {news && (
        <article className="news-details-card">
          <span className="news-card__tag">Football News</span>
          <h1>{news.title}</h1>
          <p>{news.content}</p>

          <div className="details-actions">
            <Link to="/" className="details-back-button">
              Back to Home
            </Link>

            {user && (
              <button type="button" className="delete-button" onClick={deleteHandler}>
                Delete News
              </button>
            )}
          </div>
        </article>
      )}
    </section>
  );
}

export default NewsDetails;