import { ChartNoAxesColumnIncreasing } from "lucide-react";
import { useTracker } from "../context/TrackerContext";

export default function WeeklyProgress() {
  const { questions } = useTracker();

  // Dynamic calculations based on global state
  const totalTasks = questions.length;
  const completedTasks = questions.filter(
    (q) => q.status === "Completed" || q.solved === true,
  ).length;

  const progress =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-4 sm:px-5 sm:py-4">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
            <ChartNoAxesColumnIncreasing size={19} />
          </span>

          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Weekly Preparation Progress
            </h2>
            <p className="text-[11px] text-slate-500 sm:text-xs">
              {completedTasks} of {totalTasks} questions completed
            </p>
          </div>
        </div>

        <div className="shrink-0 text-right">
          <span className="text-xl font-bold tracking-tight text-slate-900 sm:text-2xl">
            {progress}%
          </span>
          <span className="ml-2 hidden text-[10px] font-semibold text-slate-500 sm:inline">
            COMPLETED
          </span>
        </div>
      </div>

      {/* Interactive Progress Bar */}
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-slate-100">
        <div
          className="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-400 transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </section>
  );
}
