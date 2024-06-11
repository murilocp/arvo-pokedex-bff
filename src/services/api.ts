import axios from 'axios';

interface ResponseType<T> {
  data?: T;
  success: boolean;
  error?: any;
}

export default async function apiResponse<T = any>(
  url: string,
): Promise<ResponseType<T>> {
  try {
    const response = await axios.get<T>(url);

    return { data: response.data, success: true };
  } catch (err) {
    return { error: err, success: false };
  }
}
