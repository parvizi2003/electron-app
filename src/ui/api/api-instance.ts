export const API_URL = "http://laravel-pizza.test:8000/api";
export const IMAGE_URL = "http://laravel-pizza.test:8000/storage/";

export class ApiError extends Error {
  constructor(response: Response) {
    super("ApiError: " + response.statusText);
  }
}

export const jsonApiInstance = async <T>(
  url: string,
  init?: RequestInit & { json?: unknown }
) => {
  let headers = init?.headers ?? {};

  const token = await window.electron.getToken("auth");

  if (token) {
    headers = {
      ...headers,
      Authorization: `Bearer ${token}`,
    };
  }

  if (init?.json) {
    headers = {
      "Content-Type": "application/json",
      ...headers,
    };
    init.body = JSON.stringify(init.json);
  }

  const result = await fetch(`${API_URL}${url}`, {
    ...init,
    headers,
    // credentials: "include",
  });

  if (!result.ok) {
    throw new ApiError(result);
  }

  const data = await result.json();
  return data as T;
};
