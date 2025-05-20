"use client";
import { Card, CardContent } from "@/components/ui/card";
export default function StatsCard({ label, value, unit }: { label: string; value: string | number; unit?: string }) {
  return (
    <Card className="flex flex-col items-center gap-1 p-4 shadow-sm">
      <span className="text-xs text-gray-500">{label}</span>
      <CardContent className="text-2xl font-semibold text-primary-700">
        {value}
        {unit && <span className="text-base font-normal text-gray-600">{unit}</span>}
      </CardContent>
    </Card>
  );
}
