/* eslint-disable @typescript-eslint/no-explicit-any */
export interface FetchOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE";
  data?: any; 
  tag?: string;
  isFormData?: boolean;
  headers?: Record<string, string>;
}

export interface ResponsePayload<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T | null; 
}

  const baseUrl = `${process.env.NEXT_PUBLIC_API_URL}`;

// Generic fetch function
export async function fetchWithTag<T>(
  url: string,
  {
    method = "GET",
    data,
    tag,
    isFormData = false,
    headers = {},
  }: FetchOptions = {}
): Promise<ResponsePayload<T>> {
  const fetchOptions: RequestInit & { next?: { tags?: string[] } } = {
    method,
    next: tag ? { tags: [tag] } : undefined,
    credentials: "include",
 
    headers: isFormData
      ? headers
      : {
          "Content-Type": "application/json",
          ...headers,
        },
  };

  if (method !== "GET" && data) {
    fetchOptions.body = isFormData ? data : JSON.stringify(data);
  }

  const res = await fetch(`${baseUrl}${url}` , fetchOptions);

  if (!res.ok) {
    const text = await res.text();
    console.error(`❌ Error fetching from ${url}:`, text);
    throw new Error(`Failed request (${method}): ${res.statusText}`);
  }

  const json: ResponsePayload<T> = await res.json();
  return json;
}
