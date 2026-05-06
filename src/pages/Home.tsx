import { useEffect, useState } from 'react';
import { getAllNews } from '../services/newsService';
import { Link } from 'react-router';

type NewsItem = {
  id: number;
  title: string;
  content: string;
};

function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllNews()
      .then((result) => {
        setNews(result);
        setError('');
      })
      .catch(() => {
        setError('Failed to load news.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="home-page">
      <div className="home-hero">
        <div className="home-hero__content">
          <p className="home-hero__label">Portuguese Football Hub</p>
          <h1>Football Hub</h1>
          <p>
            Follow the biggest Portuguese clubs, their latest matches, and the most
            important football news in one place.
          </p>
          <a href="/teams" className="home-hero__button">
            Explore Teams
          </a>
        </div>
      </div>

      <div className="home-news">
        <h2>Latest News</h2>

        {loading && <p>Loading news...</p>}
        {error && <p className="form-error">{error}</p>}

        <div className="news-list">
          {news.map((item) => (
           <article key={item.id} className="news-card">
  <span className="news-card__tag">Football News</span>
  <h3>{item.title}</h3>
  <p>
    {item.content.length > 140
      ? `${item.content.slice(0, 140)}...`
      : item.content}
  </p>

  <Link to={`/news/${item.id}`} className="details-button">
    Read More
  </Link>
</article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Home;