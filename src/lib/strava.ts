import "server-only";
const STRAVA_BASE = "https://www.strava.com/api/v3";
export async function fetchAllActivities(token: string) {
  const perPage = 200;
  let page = 1, done = false, all: any[] = [];
  while (!done) {
    const res = await fetch(
      `${STRAVA_BASE}/athlete/activities?page=${page}&per_page=${perPage}`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    const chunk = await res.json();
    all.push(...chunk);
    done = chunk.length < perPage;
    page += 1;
  }
  return all;
}
