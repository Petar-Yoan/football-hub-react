const baseUrl = 'http://localhost:3000/news';

export async function getAllNews() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch news.');
  }

  return response.json();
}