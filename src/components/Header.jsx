import { Code2, Plus, CircleCheck } from "lucide-react";

export default function Header({ onAddQuestion }) {
  return (
    <header className="sticky top-0 z-10 border-b border-slate-200/80 bg-white/95 backdrop-blur">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-orange-600 text-white shadow-sm">
            <Code2 size={23} />
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-sm font-bold tracking-tight text-slate-900 sm:text-base">
                Interview Practice Tracker
              </h1>
            </div>
            <p className="mt-0.5 hidden text-xs text-slate-500 sm:block">
              Track weekly interview preparation: DSA, Git, and Technical
              challenges
            </p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <button
            onClick={onAddQuestion}
            className="flex items-center gap-1.5 rounded-lg bg-orange-600 px-3 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-orange-700 sm:px-4 sm:text-sm"
          >
            <Plus size={16} />{" "}
            <span className="hidden sm:inline">Add Question</span>
            <span className="sm:hidden">Add</span>
          </button>
        </div>
      </div>
    </header>
  );
}
