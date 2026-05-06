import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router';
import { deleteMatch, getMatchById } from '../services/matchesService';
import { useAuth } from '../contexts/AuthContext';

type Match = {
  id: number;
  homeTeam: string;
  awayTeam: string;
  date: string;
  stadium: string;
  score: string;
  competition: string;
  round: string;
  referee: string;
  status: string;
  description: string;
};

function MatchDetails() {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

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

  const deleteHandler = async () => {
    if (!matchId) {
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this match?');

    if (!confirmed) {
      return;
    }

    try {
      await deleteMatch(matchId);
      navigate('/matches');
    } catch {
      setError('Failed to delete match.');
    }
  };

  return (
    <section className="page-section">
      {loading && <p>Loading match details...</p>}
      {error && <p className="form-error">{error}</p>}

      {match && (
        <article className="match-details-card">
          <div className="match-details-card__hero">
            <span className="match-details-card__competition">
              {match.competition}
            </span>
            <span className="match-details-card__status">{match.status}</span>

            <h1>
              {match.homeTeam} <span>vs</span> {match.awayTeam}
            </h1>

            <div className="match-details-card__score">{match.score}</div>
          </div>

          <div className="match-details-card__content">
            <div className="match-details-grid">
              <div className="match-details-box">
                <span className="match-details-box__label">Date</span>
                <span className="match-details-box__value">{match.date}</span>
              </div>

              <div className="match-details-box">
                <span className="match-details-box__label">Round</span>
                <span className="match-details-box__value">{match.round}</span>
              </div>

              <div className="match-details-box">
                <span className="match-details-box__label">Referee</span>
                <span className="match-details-box__value">{match.referee}</span>
              </div>
            </div>

            <p>
              <strong>Stadium:</strong> {match.stadium}
            </p>

            <p>{match.description}</p>

            <div className="details-actions">
              <Link to="/matches" className="details-back-button">
                Back to Matches
              </Link>

              {user && (
                <button type="button" className="delete-button" onClick={deleteHandler}>
                  Delete Match
                </button>
              )}
            </div>
          </div>
        </article>
      )}
    </section>
  );
}

export default MatchDetails;