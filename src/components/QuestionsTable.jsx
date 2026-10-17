import { useContext } from "react";
import {
  Check,
  Circle,
  LoaderCircle,
  ExternalLink,
  Pencil,
  Trash2,
  CloudDownload,
  CalendarDays,
} from "lucide-react";
import { TrackerContext } from "../context/TrackerContext";

function Status({ status }) {
  if (status === "done") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
        <Check size={15} />
      </span>
    );
  }

  if (status === "progress") {
    return (
      <span className="flex h-6 w-6 items-center justify-center rounded-md bg-blue-50 text-blue-600">
        <LoaderCircle size={15} />
      </span>
    );
  }

  return (
    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-slate-100 text-slate-400">
      <Circle size={14} />
    </span>
  );
}

function Category({ value }) {
  const style =
    value === "DSA"
      ? "border-blue-200 bg-blue-50 text-blue-800"
      : value === "Git"
        ? "border-amber-200 bg-amber-50 text-amber-800"
        : value === "Technical"
          ? "border-purple-200 bg-purple-50 text-purple-800"
          : "border-rose-200 bg-rose-50 text-rose-800";

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-1 text-[10px] font-semibold ${style}`}
    >
      {value === "DSA"
        ? "‹/› "
        : value === "Git"
          ? "⑂ "
          : value === "Technical"
            ? "›_ "
            : "▣ "}
      {value}
    </span>
  );
}

function Difficulty({ value }) {
  const style =
    value === "Easy"
      ? "border-emerald-200 bg-emerald-50 text-emerald-700"
      : value === "Medium"
        ? "border-amber-200 bg-amber-50 text-amber-700"
        : "border-rose-200 bg-rose-50 text-rose-700";

  const dot =
    value === "Easy"
      ? "bg-emerald-500"
      : value === "Medium"
        ? "bg-amber-500"
        : "bg-rose-500";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[10px] font-medium ${style}`}
    >
      <i className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

export default function QuestionsTable() {
  // TrackerContext se filteredQuestions aur toggleStatus nikala
  const {
    questions,
    filteredQuestions,
    toggleStatus,
    deleteQuestion,
    setEditingQuestion,
  } = useContext(TrackerContext);

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 px-4 py-3.5 sm:px-5">
        <div className="flex items-center gap-3">
          <h2 className="text-sm font-bold text-slate-900">
            Practice Questions List
          </h2>

          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600">
            Showing {filteredQuestions?.length || 0} of {questions?.length || 0}{" "}
            items
          </span>
        </div>

        <button
          type="button"
          onClick={() => window.location.reload()}
          className="flex items-center gap-1.5 text-[11px] font-medium text-slate-500 hover:text-slate-700 cursor-pointer"
        >
          <CloudDownload size={14} />
          Reload Page
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr className="border-b border-slate-200 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-slate-500">
              <th className="w-16 px-4 py-3.5">Status</th>
              <th className="px-4 py-3.5">Question &amp; Key Concept</th>
              <th className="w-36 px-4 py-3.5">Category</th>
              <th className="w-28 px-4 py-3.5">Difficulty</th>
              <th className="w-40 px-4 py-3.5">Target / Last Run</th>
              <th className="w-24 px-4 py-3.5 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredQuestions &&
              filteredQuestions.map((q) => (
                <tr
                  key={q.id}
                  className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
                >
                  <td className="px-4 py-3.5">
                    <button
                      type="button"
                      onClick={() => toggleStatus(q.id)}
                      aria-label="Toggle question status"
                      className="cursor-pointer"
                    >
                      <Status status={q.solved ? "done" : "pending"} />
                    </button>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={`text-xs font-semibold ${
                          q.solved
                            ? "text-slate-400 line-through"
                            : "text-slate-900"
                        }`}
                      >
                        {q.title}
                      </span>
                      <ExternalLink
                        size={11}
                        className="shrink-0 text-slate-400"
                      />
                    </div>

                    {q.desc && (
                      <p className="mt-1 text-[10px] text-slate-500">
                        {q.desc}
                      </p>
                    )}
                  </td>

                  <td className="px-4 py-3">
                    <Category value={q.category} />
                  </td>

                  <td className="px-4 py-3">
                    <Difficulty value={q.difficulty} />
                  </td>

                  <td className="px-4 py-3">
                    <span className="flex items-center gap-1.5 whitespace-nowrap text-[10px] text-slate-500">
                      <CalendarDays size={12} />
                      {q.targetDate || "No date"}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-3 text-slate-400">
                      <button
                        type="button"
                        onClick={() =>
                          setEditingQuestion && setEditingQuestion(q)
                        }
                        aria-label="Edit question"
                        title="Edit question"
                        className="hover:text-blue-600 cursor-pointer"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => deleteQuestion(q.id)}
                        aria-label="Delete question"
                        title="Delete question"
                        className="hover:text-rose-600 cursor-pointer"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

            {(!filteredQuestions || filteredQuestions.length === 0) && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <div className="text-sm font-medium text-slate-600">
                    No questions found
                  </div>
                  <p className="mt-1 text-xs text-slate-400">
                    {questions.length === 0
                      ? "Click Add Question to start tracking your practice."
                      : "Try changing your filter or search query."}
                  </p>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
