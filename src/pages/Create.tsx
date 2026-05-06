import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createMatch, createTeam } from '../services/createService';

function Create() {
  const navigate = useNavigate();

  const [type, setType] = useState('team');
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [country, setCountry] = useState('');
  const [stadium, setStadium] = useState('');
  const [coach, setCoach] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [founded, setFounded] = useState('');
  const [stadiumCapacity, setStadiumCapacity] = useState('');
  const [leagueTitles, setLeagueTitles] = useState('');
  const [cupTitles, setCupTitles] = useState('');
  const [superCupTitles, setSuperCupTitles] = useState('');

  const [homeTeam, setHomeTeam] = useState('');
  const [awayTeam, setAwayTeam] = useState('');
  const [matchDate, setMatchDate] = useState('');
  const [matchStadium, setMatchStadium] = useState('');
  const [score, setScore] = useState('');
  const [competition, setCompetition] = useState('');
  const [round, setRound] = useState('');
  const [referee, setReferee] = useState('');
  const [status, setStatus] = useState('');
  const [matchDescription, setMatchDescription] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (type === 'team') {
      if (
        !name.trim() ||
        !country.trim() ||
        !stadium.trim() ||
        !coach.trim() ||
        !imageUrl.trim() ||
        !description.trim() ||
        !founded.trim() ||
        !stadiumCapacity.trim() ||
        !leagueTitles.trim() ||
        !cupTitles.trim() ||
        !superCupTitles.trim()
      ) {
        setError('Please fill in all fields.');
        return;
      }

      try {
        await createTeam({
          name,
          country,
          stadium,
          coach,
          imageUrl,
          description,
          founded: Number(founded),
          stadiumCapacity: Number(stadiumCapacity),
          leagueTitles: Number(leagueTitles),
          cupTitles: Number(cupTitles),
          superCupTitles: Number(superCupTitles),
        });

        setError('');
        navigate('/teams');
      } catch {
        setError('Failed to create team.');
      }

      return;
    }

    if (
      !homeTeam.trim() ||
      !awayTeam.trim() ||
      !matchDate.trim() ||
      !matchStadium.trim() ||
      !score.trim() ||
      !competition.trim() ||
      !round.trim() ||
      !referee.trim() ||
      !status.trim() ||
      !matchDescription.trim()
    ) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      await createMatch({
        homeTeam,
        awayTeam,
        date: matchDate,
        stadium: matchStadium,
        score,
        competition,
        round,
        referee,
        status,
        description: matchDescription,
      });

      setError('');
      navigate('/matches');
    } catch {
      setError('Failed to create match.');
    }
  };

  return (
    <section className="form-page">
      <div className="form-card form-card--wide">
        <h1>Create</h1>

        <form className="auth-form" onSubmit={submitHandler}>
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="create-type">Create Type</label>
            <select
              id="create-type"
              value={type}
              onChange={(event) => setType(event.target.value)}
              className="form-select"
            >
              <option value="team">Team</option>
              <option value="match">Match</option>
            </select>
          </div>

          {type === 'team' ? (
            <>
              <div className="form-group">
                <label htmlFor="team-name">Team Name</label>
                <input id="team-name" type="text" value={name} onChange={(event) => setName(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-country">Country</label>
                <input id="team-country" type="text" value={country} onChange={(event) => setCountry(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-stadium">Stadium</label>
                <input id="team-stadium" type="text" value={stadium} onChange={(event) => setStadium(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-coach">Coach</label>
                <input id="team-coach" type="text" value={coach} onChange={(event) => setCoach(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-image">Image URL</label>
                <input id="team-image" type="text" value={imageUrl} onChange={(event) => setImageUrl(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-description">Description</label>
                <input id="team-description" type="text" value={description} onChange={(event) => setDescription(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-founded">Founded</label>
                <input id="team-founded" type="number" value={founded} onChange={(event) => setFounded(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-capacity">Stadium Capacity</label>
                <input id="team-capacity" type="number" value={stadiumCapacity} onChange={(event) => setStadiumCapacity(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-league-titles">League Titles</label>
                <input id="team-league-titles" type="number" value={leagueTitles} onChange={(event) => setLeagueTitles(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-cup-titles">Cup Titles</label>
                <input id="team-cup-titles" type="number" value={cupTitles} onChange={(event) => setCupTitles(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="team-super-cup-titles">Super Cup Titles</label>
                <input id="team-super-cup-titles" type="number" value={superCupTitles} onChange={(event) => setSuperCupTitles(event.target.value)} />
              </div>

              <button type="submit" className="form-button">
                Create Team
              </button>
            </>
          ) : (
            <>
              <div className="form-group">
                <label htmlFor="match-home-team">Home Team</label>
                <input id="match-home-team" type="text" value={homeTeam} onChange={(event) => setHomeTeam(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-away-team">Away Team</label>
                <input id="match-away-team" type="text" value={awayTeam} onChange={(event) => setAwayTeam(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-date">Date</label>
                <input id="match-date" type="date" value={matchDate} onChange={(event) => setMatchDate(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-stadium">Stadium</label>
                <input id="match-stadium" type="text" value={matchStadium} onChange={(event) => setMatchStadium(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-score">Score</label>
                <input id="match-score" type="text" value={score} onChange={(event) => setScore(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-competition">Competition</label>
                <input id="match-competition" type="text" value={competition} onChange={(event) => setCompetition(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-round">Round</label>
                <input id="match-round" type="text" value={round} onChange={(event) => setRound(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-referee">Referee</label>
                <input id="match-referee" type="text" value={referee} onChange={(event) => setReferee(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-status">Status</label>
                <input id="match-status" type="text" value={status} onChange={(event) => setStatus(event.target.value)} />
              </div>

              <div className="form-group">
                <label htmlFor="match-description">Description</label>
                <input
                  id="match-description"
                  type="text"
                  value={matchDescription}
                  onChange={(event) => setMatchDescription(event.target.value)}
                />
              </div>

              <button type="submit" className="form-button">
                Create Match
              </button>
            </>
          )}
        </form>
      </div>
    </section>
  );
}

export default Create;