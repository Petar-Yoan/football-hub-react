const baseUrl = 'http://localhost:3000/news';

export async function getAllNews() {
  const response = await fetch(baseUrl);

  if (!response.ok) {
    throw new Error('Failed to fetch news.');
  }

  return response.json();
}

export async function getNewsById(newsId: string) {
  const response = await fetch(`${baseUrl}/${newsId}`);

  if (!response.ok) {
    throw new Error('Failed to fetch news details.');
  }

  return response.json();
}

export async function deleteNews(newsId: string) {
  const response = await fetch(`${baseUrl}/${newsId}`, {
    method: 'DELETE',
  });

  if (!response.ok) {
    throw new Error('Failed to delete news.');
  }
}