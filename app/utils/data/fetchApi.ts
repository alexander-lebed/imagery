import { isClientSide } from '@/app/utils';

export const fetchApi = async <T>(url: string): Promise<T> => {
  const baseUrl = isClientSide() ? '' : process.env.BASE_URL || '';
  const apiUrl = `${baseUrl}/api${url}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url} with status ${response.status}`);
    }
    return response.json();
  } catch (error) {
    console.error(`Fetch error (${apiUrl}):`, error);
    throw error;
  }
};
