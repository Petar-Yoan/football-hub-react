const baseUrl = 'http://localhost:3000/matches';

export async function getAllMatches() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch matches.');
  }

  return response.json();
}