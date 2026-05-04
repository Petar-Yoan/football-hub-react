import { useEffect, useState } from 'react';
import { getAllMatches } from '../services/matchesService';

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  stadium: string;
  score: string;
};

function Matches() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllMatches()
      .then((result) => {
        setMatches(result);
        setError('');
      })
      .catch(() => {
        setError('Failed to load matches.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="page-section">
      <h1>Matches</h1>

      {loading && <p>Loading matches...</p>}
      {error && <p className="form-error">{error}</p>}

      <div className="matches-list">
        {matches.map((match) => (
          <article key={match.id} className="match-card">
            <div className="match-card__top">
              <span className="match-card__date">{match.date}</span>
              <span className="match-card__score">{match.score}</span>
            </div>

            <h2 className="match-card__title">
              {match.homeTeam} <span>vs</span> {match.awayTeam}
            </h2>

            <div className="match-card__info">
              <p>
                <strong>Stadium:</strong> {match.stadium}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Matches;