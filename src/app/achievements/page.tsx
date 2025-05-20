import AchievementsGrid from "@/components/AchievementsGrid";
export const metadata = { title: "Achievements" };
export default function AchievementsPage() {
  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold">Achievements</h1>
      <AchievementsGrid />
    </div>
  );
}
