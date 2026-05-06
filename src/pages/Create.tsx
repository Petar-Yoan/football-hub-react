import { useState } from 'react';
import { useNavigate } from 'react-router';
import { createTeam } from '../services/createService';

function Create() {
  const navigate = useNavigate();

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
  const [error, setError] = useState('');

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

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
  };

  return (
    <section className="form-page">
      <div className="form-card form-card--wide">
        <h1>Create Team</h1>

        <form className="auth-form" onSubmit={submitHandler}>
          {error && <p className="form-error">{error}</p>}

          <div className="form-group">
            <label htmlFor="team-name">Team Name</label>
            <input
              id="team-name"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-country">Country</label>
            <input
              id="team-country"
              type="text"
              value={country}
              onChange={(event) => setCountry(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-stadium">Stadium</label>
            <input
              id="team-stadium"
              type="text"
              value={stadium}
              onChange={(event) => setStadium(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-coach">Coach</label>
            <input
              id="team-coach"
              type="text"
              value={coach}
              onChange={(event) => setCoach(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-image">Image URL</label>
            <input
              id="team-image"
              type="text"
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-description">Description</label>
            <input
              id="team-description"
              type="text"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-founded">Founded</label>
            <input
              id="team-founded"
              type="number"
              value={founded}
              onChange={(event) => setFounded(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-capacity">Stadium Capacity</label>
            <input
              id="team-capacity"
              type="number"
              value={stadiumCapacity}
              onChange={(event) => setStadiumCapacity(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-league-titles">League Titles</label>
            <input
              id="team-league-titles"
              type="number"
              value={leagueTitles}
              onChange={(event) => setLeagueTitles(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-cup-titles">Cup Titles</label>
            <input
              id="team-cup-titles"
              type="number"
              value={cupTitles}
              onChange={(event) => setCupTitles(event.target.value)}
            />
          </div>

          <div className="form-group">
            <label htmlFor="team-super-cup-titles">Super Cup Titles</label>
            <input
              id="team-super-cup-titles"
              type="number"
              value={superCupTitles}
              onChange={(event) => setSuperCupTitles(event.target.value)}
            />
          </div>

          <button type="submit" className="form-button">
            Create Team
          </button>
        </form>
      </div>
    </section>
  );
}

export default Create;