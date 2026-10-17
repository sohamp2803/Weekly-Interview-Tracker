import { useContext } from "react";
import { Layers, GitFork, Terminal, Monitor } from "lucide-react";
import { TrackerContext } from "../context/TrackerContext";

export default function StatsCards() {
  const { questions } = useContext(TrackerContext);

  const totalQuestions = questions.length;
  const completedTotal = questions.filter(
    (q) => q.solved || q.status === "Completed",
  ).length;
  const overallRate =
    totalQuestions === 0
      ? 0
      : Math.round((completedTotal / totalQuestions) * 100);

  // 1. DSA Category Stats
  const dsaQuestions = questions.filter((q) => q.category === "DSA");
  const dsaTotal = dsaQuestions.length;
  const dsaSolved = dsaQuestions.filter(
    (q) => q.solved || q.status === "Completed",
  ).length;
  const dsaProgressRate =
    dsaTotal === 0 ? 0 : Math.round((dsaSolved / dsaTotal) * 100);

  // 2. Technical & Git Category Stats
  const techQuestions = questions.filter(
    (q) => q.category === "Git" || q.category === "Technical",
  );
  const techTotal = techQuestions.length;
  const techSolved = techQuestions.filter(
    (q) => q.solved || q.status === "Completed",
  ).length;

  // 3. Machine Coding Category Stats
  const machineQuestions = questions.filter(
    (q) => q.category === "Machine Coding",
  );
  const machineTotal = machineQuestions.length;
  const machineSolved = machineQuestions.filter(
    (q) => q.solved || q.status === "Completed",
  ).length;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-4">
      {/* TOTAL TRACKED */}
      <article className="min-h-[130px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold tracking-wider text-slate-500">
            TOTAL TRACKED
          </h3>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
            <Layers size={17} />
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <strong className="text-[27px] font-bold leading-none text-slate-900">
            {totalQuestions}
          </strong>
          <span className="text-xs text-slate-500">problems</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
          <span className="text-[11px] text-slate-500">
            Overall completion rate
          </span>
          <span className="text-[11px] font-semibold text-slate-700">
            {overallRate}%
          </span>
        </div>
      </article>

      {/* DSA PROGRESS */}
      <article className="min-h-[130px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold tracking-wider text-blue-800">
            DSA PROGRESS
          </h3>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
            <GitFork size={17} />
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <strong className="text-[27px] font-bold leading-none text-slate-900">
            {dsaSolved}
          </strong>
          <span className="text-xs text-slate-500">/ {dsaTotal} solved</span>
        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${dsaProgressRate}%` }}
          />
        </div>
      </article>

      {/* TECHNICAL & GIT */}
      <article className="min-h-[130px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold tracking-wider text-purple-700">
            TECHNICAL & GIT
          </h3>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
            <Terminal size={17} />
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <strong className="text-[27px] font-bold leading-none text-slate-900">
            {techSolved}
          </strong>
          <span className="text-xs text-slate-500">/ {techTotal} cleared</span>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
          <span className="text-[11px] text-slate-500">
            Core web & version control
          </span>
          <span className="text-[11px] font-semibold text-purple-700">
            ✓ High Priority
          </span>
        </div>
      </article>

      {/* MACHINE CODING */}
      <article className="min-h-[130px] rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
        <div className="flex items-center justify-between">
          <h3 className="text-[10px] font-bold tracking-wider text-orange-800">
            MACHINE CODING
          </h3>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-orange-50 text-orange-700">
            <Monitor size={17} />
          </span>
        </div>

        <div className="mt-2 flex items-baseline gap-2">
          <strong className="text-[27px] font-bold leading-none text-slate-900">
            {machineSolved} of {machineTotal}
          </strong>
        </div>

        <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
          <span className="text-[11px] text-slate-500">Weekly Target</span>
          <span className="text-[11px] font-semibold text-orange-800">
            {machineSolved} Prototypes
          </span>
        </div>
      </article>
    </div>
  );
}
