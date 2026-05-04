const baseUrl = 'http://localhost:3000/teams';

export async function getAllTeams() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch teams.');
  }

  return response.json();
}

export async function getTeamById(teamId: string) {
  const response = await fetch(`${baseUrl}/${teamId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch team details.');
  }

  return response.json();
}