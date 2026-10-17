import { useContext, useEffect, useRef, useState } from "react";
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

const ITEMS_PER_LOAD = 5;

const formatQuestionDate = (q) => {
  const date = q.date || q.targetDate;

  if (!date) return "No date";

  const parsedDate = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsedDate.getTime())) return date;

  return parsedDate.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

function Status({ status }) {
  if (status === "done") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-emerald-100 text-emerald-700">
        <Check size={15} />
      </span>
    );
  }

  if (status === "progress") {
    return (
      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
        <LoaderCircle size={15} />
      </span>
    );
  }

  return (
    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-400">
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
      className={`inline-flex items-center whitespace-nowrap rounded-md border px-2 py-1 text-[10px] font-semibold ${style}`}
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
      className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-2 py-1 text-[10px] font-medium ${style}`}
    >
      <i className={`h-1.5 w-1.5 rounded-full ${dot}`} />
      {value}
    </span>
  );
}

export default function QuestionsTable() {
  const {
    questions = [],
    filteredQuestions = [],
    toggleStatus,
    deleteQuestion,
    setEditingQuestion,
  } = useContext(TrackerContext);

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_LOAD);
  const [isLoading, setIsLoading] = useState(false);

  const observerRef = useRef(null);
  const loadingRef = useRef(false);

  // Reset visible questions when search/filter results change.
  useEffect(() => {
    setVisibleCount(ITEMS_PER_LOAD);
    setIsLoading(false);
    loadingRef.current = false;
  }, [filteredQuestions]);

  const visibleQuestions = filteredQuestions.slice(0, visibleCount);

  const hasMore = visibleCount < filteredQuestions.length;

  // Load more questions when the bottom sentinel enters the viewport.
  useEffect(() => {
    const element = observerRef.current;

    if (!element || !hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          loadingRef.current = true;
          setIsLoading(true);

          setVisibleCount((previous) =>
            Math.min(previous + ITEMS_PER_LOAD, filteredQuestions.length),
          );

          setIsLoading(false);
          loadingRef.current = false;
        }
      },
      {
        rootMargin: "150px",
      },
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [hasMore, filteredQuestions.length, visibleCount]);

  return (
    <section className="min-w-0 overflow-hidden rounded-xl border border-slate-200 bg-white">
      {/* Header */}
      <div className="flex flex-col gap-3 border-b border-slate-200 px-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <h2 className="text-sm font-bold text-slate-900">
            Practice Questions List
          </h2>

          <span className="rounded-md border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] text-slate-600">
            Showing {visibleQuestions.length} of {questions.length} items
          </span>
        </div>
      </div>

      {/* Mobile Card Layout */}
      <div className="divide-y divide-slate-100 md:hidden">
        {visibleQuestions.map((q) => (
          <article
            key={q.id}
            className="p-3 transition hover:bg-slate-50/70 sm:p-4"
          >
            {/* Question and Status */}
            <div className="flex items-start gap-3">
              <button
                type="button"
                onClick={() => toggleStatus(q.id)}
                aria-label={`Toggle status for ${q.title}`}
                className="mt-0.5 rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
              >
                <Status status={q.solved ? "done" : "pending"} />
              </button>

              <div className="min-w-0 flex-1">
                <div className="flex items-start gap-1.5">
                  <h3
                    className={`break-words text-sm font-semibold ${
                      q.solved
                        ? "text-slate-400 line-through"
                        : "text-slate-900"
                    }`}
                  >
                    {q.title}
                  </h3>

                  {q.link && (
                    <a
                      href={q.link}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${q.title}`}
                      className="mt-0.5 shrink-0 text-slate-400 hover:text-blue-600"
                    >
                      <ExternalLink size={13} />
                    </a>
                  )}
                </div>

                {q.desc && (
                  <p className="mt-1 break-words text-xs leading-5 text-slate-500">
                    {q.desc}
                  </p>
                )}
              </div>
            </div>

            {/* Category and Difficulty */}
            <div className="mt-3 flex flex-wrap items-center gap-2 pl-9">
              <Category value={q.category} />
              <Difficulty value={q.difficulty} />
            </div>

            {/* Date and Actions */}
            <div className="mt-3 flex items-center justify-between gap-3 border-t border-slate-100 pt-3 pl-9">
              <span className="flex min-w-0 items-center gap-1.5 text-[11px] text-slate-500">
                <CalendarDays size={13} className="shrink-0" />
                <span className="break-words">{formatQuestionDate(q)}</span>
              </span>

              <div className="flex shrink-0 items-center gap-3">
                <button
                  type="button"
                  onClick={() => setEditingQuestion && setEditingQuestion(q)}
                  aria-label={`Edit ${q.title}`}
                  title="Edit question"
                  className="rounded-md p-1.5 text-slate-400 transition hover:bg-blue-50 hover:text-blue-600"
                >
                  <Pencil size={15} />
                </button>

                <button
                  type="button"
                  onClick={() => deleteQuestion(q.id)}
                  aria-label={`Delete ${q.title}`}
                  title="Delete question"
                  className="rounded-md p-1.5 text-slate-400 transition hover:bg-rose-50 hover:text-rose-600"
                >
                  <Trash2 size={15} />
                </button>
              </div>
            </div>
          </article>
        ))}

        {filteredQuestions.length === 0 && (
          <div className="px-4 py-12 text-center">
            <p className="text-sm font-medium text-slate-600">
              No questions found
            </p>
            <p className="mx-auto mt-1 max-w-xs text-xs leading-5 text-slate-400">
              {questions.length === 0
                ? "Click Add Question to start tracking your practice."
                : "Try changing your filter or search query."}
            </p>
          </div>
        )}
      </div>

      {/* Desktop and Tablet Table */}
      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[850px] border-collapse text-left">
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
            {visibleQuestions.map((q) => (
              <tr
                key={q.id}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/60"
              >
                <td className="px-4 py-3.5">
                  <button
                    type="button"
                    onClick={() => toggleStatus(q.id)}
                    aria-label={`Toggle status for ${q.title}`}
                    className="rounded-md focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                  >
                    <Status status={q.solved ? "done" : "pending"} />
                  </button>
                </td>

                <td className="max-w-md px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <span
                      className={`break-words text-xs font-semibold ${
                        q.solved
                          ? "text-slate-400 line-through"
                          : "text-slate-900"
                      }`}
                    >
                      {q.title}
                    </span>

                    {q.link && (
                      <a
                        href={q.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Open ${q.title}`}
                        className="shrink-0 text-slate-400 hover:text-blue-600"
                      >
                        <ExternalLink size={12} />
                      </a>
                    )}
                  </div>

                  {q.desc && (
                    <p className="mt-1 break-words text-[10px] text-slate-500">
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
                    {formatQuestionDate(q)}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <div className="flex items-center justify-end gap-3 text-slate-400">
                    <button
                      type="button"
                      onClick={() =>
                        setEditingQuestion && setEditingQuestion(q)
                      }
                      aria-label={`Edit ${q.title}`}
                      title="Edit question"
                      className="rounded p-1 transition hover:text-blue-600"
                    >
                      <Pencil size={14} />
                    </button>

                    <button
                      type="button"
                      onClick={() => deleteQuestion(q.id)}
                      aria-label={`Delete ${q.title}`}
                      title="Delete question"
                      className="rounded p-1 transition hover:text-rose-600"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}

            {filteredQuestions.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-12 text-center">
                  <p className="text-sm font-medium text-slate-600">
                    No questions found
                  </p>
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

      {/* Infinite Scroll Trigger */}
      {hasMore && (
        <div
          ref={observerRef}
          className="flex items-center justify-center gap-2 border-t border-slate-100 py-5 text-xs text-slate-500"
        >
          <LoaderCircle size={16} className="animate-spin" />
          Loading more questions...
        </div>
      )}

      {/* End of List */}
      {!hasMore && filteredQuestions.length > 0 && (
        <div className="border-t border-slate-100 py-5 text-center text-xs text-slate-400">
          You've reached the end of the list.
          <span className="ml-1">({filteredQuestions.length} questions)</span>
        </div>
      )}
    </section>
  );
}
