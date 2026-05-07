const API_URL = 'https://jsonplaceholder.typicode.com/users';

/**
 * Fetches contacts from JSONPlaceholder API.
 * @returns {Promise<{ data: Array|null, error: string|null }>}
 */
export async function fetchContacts() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: error.message || 'Failed to fetch contacts' };
  }
}
