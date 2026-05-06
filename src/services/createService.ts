const teamsUrl = 'http://localhost:3000/teams';
const matchesUrl = 'http://localhost:3000/matches';

type TeamData = {
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

type MatchData = {
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

export async function createTeam(teamData: TeamData) {
  const response = await fetch(teamsUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(teamData),
  });

  if (!response.ok) {
    throw new Error('Failed to create team.');
  }

  return response.json();
}

export async function createMatch(matchData: MatchData) {
  const response = await fetch(matchesUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(matchData),
  });

  if (!response.ok) {
    throw new Error('Failed to create match.');
  }

  return response.json();
}