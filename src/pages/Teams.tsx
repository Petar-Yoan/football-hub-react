import { useEffect, useState } from 'react';
import { getAllTeams } from '../services/teamsService';

type Team = {
  id: number;
  name: string;
  country: string;
  stadium: string;
  coach: string;
  imageUrl: string;
  description: string;
};

function getTeamClass(name: string) {
  if (name === 'Sporting CP') {
    return 'team-card team-card--sporting';
  }

  if (name === 'SL Benfica') {
    return 'team-card team-card--benfica';
  }

  if (name === 'FC Porto') {
    return 'team-card team-card--porto';
  }

  return 'team-card';
}

function Teams() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAllTeams()
      .then((result) => {
        setTeams(result);
        setError('');
      })
      .catch(() => {
        setError('Failed to load teams.');
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <section className="page-section">
      <h1>Teams</h1>

      {loading && <p>Loading teams...</p>}
      {error && <p className="form-error">{error}</p>}

      <div className="teams-list">
        {teams.map((team) => (
          <article key={team.id} className={getTeamClass(team.name)}>
            <img src={team.imageUrl} alt={team.name} className="team-card__image" />
            <h2 className="team-card__title">{team.name}</h2>
            <p>
              <strong>Country:</strong> {team.country}
            </p>
            <p>
              <strong>Stadium:</strong> {team.stadium}
            </p>
            <p>
              <strong>Coach:</strong> {team.coach}
            </p>
            <p>{team.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export default Teams;