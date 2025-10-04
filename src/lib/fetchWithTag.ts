export async function fetchWithTag<T>(
  url: string,
  tag: string
): Promise<T> {
  const res = await fetch(url, {
    next: { tags: [tag] }, 
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch data from ${url}`);
  }

  return res.json();
}
