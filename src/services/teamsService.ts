const baseUrl = 'http://localhost:3000/teams';

export async function getAllTeams() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch teams.');
  }

  return response.json();
}