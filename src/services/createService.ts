const teamsUrl = 'http://localhost:3000/teams';

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