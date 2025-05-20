"use client";
import { useState } from "react";
import achievements from "@/data/achievements";
export default function AchievementsGrid() {
  const [filter, setFilter] = useState<string>("all");
  const cats = Array.from(new Set(achievements.map((a) => a.category)));
  const list = achievements.filter((a) => filter === "all" || a.category === filter);
  return (
    <div>
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          className={`rounded-full px-4 py-1 text-sm ${filter === "all" ? "bg-primary-500 text-white" : "bg-gray-200"}`}
          onClick={() => setFilter("all")}
        >
          All ({achievements.length})
        </button>
        {cats.map((c) => (
          <button
            key={c}
            className={`rounded-full px-4 py-1 text-sm ${filter === c ? "bg-primary-500 text-white" : "bg-gray-200"}`}
            onClick={() => setFilter(c)}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8">
        {list.map((ach) => (
          <div key={ach.id} className="flex flex-col items-center gap-1">
            <img src={`/medals/${ach.id}.svg`} alt={ach.name} className="h-14 w-14 rounded-full shadow-md" />
            <span className="text-center text-xs leading-tight">{ach.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
