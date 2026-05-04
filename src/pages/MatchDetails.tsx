import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getMatchById } from '../services/matchesService';

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  stadium: string;
  score: string;
};

function MatchDetails() {
  const { matchId } = useParams();
  const [match, setMatch] = useState<Match | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!matchId) {
      setError('Invalid match id.');
      setLoading(false);
      return;
    }

    getMatchById(matchId)
      .then((result) => {
        setMatch(result);
        setError('');
      })
      .catch(() => {
        setError('Failed to load match details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [matchId]);

  return (
    <section className="page-section">
      {loading && <p>Loading match details...</p>}
      {error && <p className="form-error">{error}</p>}

      {match && (
        <article className="details-card">
          <div className="details-card__content">
            <h1>
              {match.homeTeam} vs {match.awayTeam}
            </h1>
            <p>
              <strong>Date:</strong> {match.date}
            </p>
            <p>
              <strong>Stadium:</strong> {match.stadium}
            </p>
            <p>
              <strong>Score:</strong> {match.score}
            </p>

            <Link to="/matches" className="details-back-button">
              Back to Matches
            </Link>
          </div>
        </article>
      )}
    </section>
  );
}

export default MatchDetails;