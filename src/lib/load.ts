import { parseISO } from "date-fns";
export interface DailyLoad {
  date: string; // YYYY-MM-DD
  seconds: number;
  distance: number;
  elevation: number;
  tss: number;
  calories: number;
}
export function dailySummary(acts: any[]): DailyLoad[] {
  const map = new Map<string, DailyLoad>();
  for (const a of acts) {
    const day = parseISO(a.start_date_local).toISOString().slice(0, 10);
    const cur = map.get(day) || {
      date: day,
      seconds: 0,
      distance: 0,
      elevation: 0,
      tss: 0,
      calories: 0
    };
    cur.seconds += a.moving_time;
    cur.distance += a.distance;
    cur.elevation += a.total_elevation_gain;
    cur.tss += (a.moving_time * Math.pow((a.weighted_average_watts || 0) / 250, 2) * 100) / 3600;
    cur.calories += a.calories || 0;
    map.set(day, cur);
  }
  return Array.from(map.values()).sort((a, b) => (a.date < b.date ? -1 : 1));
}
