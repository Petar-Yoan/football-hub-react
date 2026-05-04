import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router';
import { getTeamById } from '../services/teamsService';

type Team = {
  id: string;
  name: string;
  country: string;
  stadium: string;
  coach: string;
  imageUrl: string;
  description: string;
  founded: number;
  stadiumCapacity: number;
  leagueTitles: number;
  cupTitles: number;
  superCupTitles: number;
};

function getTeamDetailsClass(name: string) {
  if (name === 'Sporting CP') {
    return 'details-card details-card--sporting';
  }

  if (name === 'SL Benfica') {
    return 'details-card details-card--benfica';
  }

  if (name === 'FC Porto') {
    return 'details-card details-card--porto';
  }

  return 'details-card';
}

function TeamDetails() {
  const { teamId } = useParams();
  const [team, setTeam] = useState<Team | null>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!teamId) {
      setError('Invalid team id.');
      setLoading(false);
      return;
    }

    getTeamById(teamId)
      .then((result) => {
        setTeam(result);
        setError('');
      })
      .catch(() => {
        setError('Failed to load team details.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [teamId]);

  return (
    <section className="page-section">
      {loading && <p>Loading team details...</p>}
      {error && <p className="form-error">{error}</p>}

      {team && (
        <article className={getTeamDetailsClass(team.name)}>
          <img src={team.imageUrl} alt={team.name} className="details-card__image" />

          <div className="details-card__content">
            <h1>{team.name}</h1>

            <p>
              <strong>Country:</strong> {team.country}
            </p>
            <p>
              <strong>Founded:</strong> {team.founded}
            </p>
            <p>
              <strong>Stadium:</strong> {team.stadium}
            </p>
            <p>
              <strong>Stadium Capacity:</strong> {team.stadiumCapacity.toLocaleString()}
            </p>
            <p>
              <strong>Coach:</strong> {team.coach}
            </p>
            <p>{team.description}</p>

            <div className="team-stats-grid">
              <div className="team-stat-box">
                <span className="team-stat-box__number">{team.leagueTitles}</span>
                <span className="team-stat-box__label">League Titles</span>
              </div>

              <div className="team-stat-box">
                <span className="team-stat-box__number">{team.cupTitles}</span>
                <span className="team-stat-box__label">Portuguese Cups</span>
              </div>

              <div className="team-stat-box">
                <span className="team-stat-box__number">{team.superCupTitles}</span>
                <span className="team-stat-box__label">Super Cups</span>
              </div>
            </div>

            <Link to="/teams" className="details-back-button">
              Back to Teams
            </Link>
          </div>
        </article>
      )}
    </section>
  );
}

export default TeamDetails;