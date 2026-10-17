import React, { useState, useEffect } from "react";
import { useTracker } from "../context/TrackerContext";

export default function AddQuestion({ onClose }) {
  const { addQuestion, updateQuestion, editingQuestion, setEditingQuestion } =
    useTracker();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Medium");
  const [date, setDate] = useState(new Date().toLocaleDateString("en-CA"));

  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title || "");
      setCategory(editingQuestion.category || "DSA");
      setDifficulty(editingQuestion.difficulty || "Medium");
      setDate(editingQuestion.date || new Date().toLocaleDateString("en-CA"));
    } else {
      setTitle("");
      setCategory("DSA");
      setDifficulty("Medium");
      setDate(new Date().toLocaleDateString("en-CA"));
    }
  }, [editingQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !date) return;

    const questionData = {
      title: title.trim(),
      category,
      difficulty,
      date,
    };

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, questionData);
    } else {
      addQuestion(questionData);
    }

    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setCategory("DSA");
    setDifficulty("Medium");
    setDate(new Date().toLocaleDateString("en-CA"));

    if (setEditingQuestion) setEditingQuestion(null);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 shadow-2xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            {editingQuestion ? "Edit Question" : "Add New Question"}
          </h3>

          <button
            type="button"
            onClick={handleClose}
            className="text-lg font-bold text-slate-400 hover:text-slate-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-500">
              QUESTION TITLE
            </label>

            <input
              type="text"
              placeholder="e.g., Two Sum, Binary Search..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs outline-none focus:border-orange-500"
              autoFocus
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                CATEGORY
              </label>

              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-orange-500"
              >
                <option value="DSA">DSA</option>
                <option value="Git">Git</option>
                <option value="Machine Coding">Machine Coding</option>
              </select>
            </div>

            <div>
              <label className="mb-1 block text-[11px] font-semibold text-slate-500">
                DIFFICULTY
              </label>

              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-orange-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block text-[11px] font-semibold text-slate-500">
              DATE SOLVED / ADDED
            </label>

            <input
              type="date"
              value={date}
              max={new Date().toLocaleDateString("en-CA")}
              onChange={(e) => setDate(e.target.value)}
              className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs outline-none focus:border-orange-500"
              required
            />

            <p className="mt-1 text-[10px] text-slate-400">
              Select the date you practiced this question.
            </p>
          </div>

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-3">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-medium text-slate-600 hover:bg-slate-200"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="rounded-lg bg-orange-600 px-4 py-2 text-xs font-medium text-white hover:bg-orange-700"
            >
              {editingQuestion ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
