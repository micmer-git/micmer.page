import StatsCard from "@/components/StatsCard";
import MovingTimeCalendar from "@/components/MovingTimeCalendar";
import activities from "@/public/data/activities.json";
import { dailySummary } from "@/lib/load";
import { Suspense } from "react";
export const metadata = { title: "Stats" };
export default function StatsPage() {
  const daily = dailySummary(activities as any);
  const total = daily.reduce(
    (acc, d) => {
      acc.seconds += d.seconds;
      acc.distance += d.distance;
      acc.elevation += d.elevation;
      acc.tss += d.tss;
      acc.calories += d.calories;
      return acc;
    },
    { seconds: 0, distance: 0, elevation: 0, tss: 0, calories: 0 }
  );
  const hours = total.seconds / 3600;
  const avgWeekDist = (total.distance / 1000) / (daily.length / 7);
  return (
    <main className="space-y-10">
      <section className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-6">
        <StatsCard label="Distance" value={(total.distance / 1000).toFixed(0)} unit="km" />
        <StatsCard label="Moving Time" value={hours.toFixed(0)} unit="h" />
        <StatsCard label="Elevation" value={total.elevation.toFixed(0)} unit="m" />
        <StatsCard label="TSS" value={total.tss.toFixed(0)} />
        <StatsCard label="Calories" value={total.calories.toFixed(0)} />
        <StatsCard label="Avg km/week" value={avgWeekDist.toFixed(0)} />
      </section>
      <section>
        <h2 className="mb-4 text-lg font-semibold">Moving Time Heat‑map ({new Date().getFullYear()})</h2>
        <Suspense fallback={<p>Loading calendar…</p>}>
          {/* @ts-expect-error Server Component wrapper */}
          <MovingTimeCalendar daily={daily.map((d) => ({ date: d.date, seconds: d.seconds }))} year={new Date().getFullYear()} />
        </Suspense>
      </section>
    </main>
  );
}
