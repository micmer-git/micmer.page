"use client";
import dynamic from "next/dynamic";
import { endOfYear, format, parseISO, startOfYear } from "date-fns";
import { useMemo } from "react";
import classNames from "classnames";

const Heatmap = dynamic(() => import("react-calendar-heatmap"), { ssr: false });
interface Props {
  daily: { date: string; seconds: number }[];
  year: number;
}
export default function MovingTimeCalendar({ daily, year }: Props) {
  const data = useMemo(() => {
    const yearStart = startOfYear(new Date(year, 0, 1));
    const yearEnd = endOfYear(yearStart);
    const map = new Map<string, number>();
    for (const d of daily) {
      if (d.date.startsWith(String(year))) map.set(d.date, (map.get(d.date) || 0) + d.seconds);
    }
    // Convert seconds to hours for easier scale (GitHub uses counts)
    const arr: { date: string; count: number }[] = [];
    for (let dt = yearStart; dt <= yearEnd; dt.setDate(dt.getDate() + 1)) {
      const iso = format(dt, "yyyy-MM-dd");
      arr.push({ date: iso, count: Math.round((map.get(iso) || 0) / 3600) });
    }
    return arr;
  }, [daily, year]);
  return (
    <div className="mx-auto max-w-full overflow-x-auto">
      <Heatmap
        startDate={`${year}-01-01`}
        endDate={`${year}-12-31`}
        values={data}
        classForValue={(v) => {
          const c = v?.count ?? 0;
          return classNames("rlx", {
            "fill-gray-200": c === 0,
            "fill-blue-100": c > 0 && c < 1,
            "fill-blue-300": c >= 1 && c < 2,
            "fill-blue-500": c >= 2 && c < 4,
            "fill-blue-700": c >= 4
          });
        }}
        tooltipDataAttrs={(v) => {
          if (!v?.date) return {};
          return { "data-tip": `${v.date}: ${v.count}h` };
        }}
        showWeekdayLabels
      />
    </div>
  );
}
