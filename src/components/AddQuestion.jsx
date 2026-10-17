import React, { useState, useEffect } from "react";
import { useTracker } from "../context/TrackerContext";

export default function AddQuestion({ onClose }) {
  const { addQuestion, updateQuestion, editingQuestion, setEditingQuestion } =
    useTracker();

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("DSA");
  const [difficulty, setDifficulty] = useState("Medium");

  useEffect(() => {
    if (editingQuestion) {
      setTitle(editingQuestion.title || "");
      setCategory(editingQuestion.category || "DSA");
      setDifficulty(editingQuestion.difficulty || "Medium");
    }
  }, [editingQuestion]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingQuestion) {
      updateQuestion(editingQuestion.id, { title, category, difficulty });
    } else {
      addQuestion({ title, category, difficulty });
    }

    handleClose();
  };

  const handleClose = () => {
    setTitle("");
    setCategory("DSA");
    setDifficulty("Medium");
    if (setEditingQuestion) setEditingQuestion(null);
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 shadow-2xl overflow-hidden p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="text-sm font-bold text-slate-900">
            {editingQuestion ? "Edit Question" : "Add New Question"}
          </h3>
          <button
            onClick={handleClose}
            className="text-slate-400 hover:text-slate-600 text-lg font-bold"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">
              QUESTION TITLE
            </label>
            <input
              type="text"
              placeholder="e.g., Two Sum, Binary Search..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs outline-none focus:border-orange-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white outline-none focus:border-orange-500"
              >
                <option value="DSA">DSA</option>
                <option value="Git">Git</option>
                <option value="Machine Coding">Machine Coding</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-semibold text-slate-500 mb-1">
                DIFFICULTY
              </label>
              <select
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-xs bg-white outline-none focus:border-orange-500"
              >
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-3 border-t border-slate-100">
            <button
              type="button"
              onClick={handleClose}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium px-4 py-2 rounded-lg"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-orange-600 hover:bg-orange-700 text-white text-xs font-medium px-4 py-2 rounded-lg"
            >
              {editingQuestion ? "Update Question" : "Add Question"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
