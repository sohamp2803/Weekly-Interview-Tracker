import { Search, X } from "lucide-react";
import { useTracker } from "../context/TrackerContext";

const quickCategories = ["All", "DSA", "Git", "Machine Coding"];

export default function FilterBar({
  searchQuery,
  setSearchQuery,
  activeQuick,
  setActiveQuick,
}) {
  // Context fallback if props are not explicitly passed from parent
  const tracker = useTracker?.() || {};

  const query = searchQuery ?? tracker.searchQuery ?? "";
  const setQuery = setSearchQuery || tracker.setSearchQuery || (() => {});
  const active = activeQuick ?? tracker.activeQuick ?? "All";
  const setActive = setActiveQuick || tracker.setActiveQuick || (() => {});

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-3.5 sm:p-4 space-y-3">
      {/* Search Input Bar */}
      <div className="flex items-center">
        <label className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-slate-200 bg-slate-50/70 px-3 py-2 text-slate-400 focus-within:border-orange-500 focus-within:bg-white transition-all">
          <Search size={16} className="shrink-0 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-xs text-slate-700 outline-none placeholder:text-slate-400"
            placeholder="Search by question title, category, or difficulty..."
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery("")}
              className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer"
            >
              <X size={14} />
            </button>
          )}
        </label>
      </div>

      {/* Quick Select Buttons */}
      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-3">
        <span className="mr-1 text-[11px] font-medium text-slate-400">
          Quick Select:
        </span>
        {quickCategories.map((q) => {
          const isActive = active === q;
          return (
            <button
              key={q}
              onClick={() => setActive(q)}
              className={`rounded-md px-2.5 py-1 text-[11px] font-medium transition-all cursor-pointer ${
                isActive
                  ? "bg-orange-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900"
              }`}
            >
              {q}
            </button>
          );
        })}
      </div>
    </section>
  );
}
