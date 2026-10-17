import { createContext, useState, useContext, useEffect } from "react";

export const TrackerContext = createContext();

export const ContextProvider = ({ children }) => {
  const [questions, setQuestions] = useState(() => {
    try {
      const saved = localStorage.getItem("interview_tracker_questions");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      return [];
    }
  });

  const [editingQuestion, setEditingQuestion] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeQuick, setActiveQuick] = useState("All");

  useEffect(() => {
    try {
      localStorage.setItem(
        "interview_tracker_questions",
        JSON.stringify(questions),
      );
    } catch (error) {
      console.error(error);
    }
  }, [questions]);

  const addQuestion = (newQuestion) => {
    setQuestions((prev) => [
      ...prev,
      {
        ...newQuestion,
        id: crypto.randomUUID(),
        solved: false,
        status: "Pending",
        difficulty: newQuestion.difficulty || "Medium",
      },
    ]);
  };

  const updateQuestion = (id, updatedData) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, ...updatedData } : q)),
    );
    setEditingQuestion(null);
  };

  const toggleStatus = (id) => {
    setQuestions((prev) =>
      prev.map((question) => {
        if (question.id === id) {
          const isCompleted = question.solved;
          return {
            ...question,
            solved: !isCompleted,
            status: !isCompleted ? "Completed" : "Pending",
          };
        }
        return question;
      }),
    );
  };

  const deleteQuestion = (id) => {
    setQuestions((prev) => prev.filter((question) => question.id !== id));
  };

  const filteredQuestions = questions.filter((q) => {
    const itemCategory = q.category?.trim() || "";
    const selectedCategory = activeQuick.trim();

    const matchesCategory =
      selectedCategory === "All" ||
      itemCategory.toLowerCase() === selectedCategory.toLowerCase();

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !query ||
      q.title?.toLowerCase().includes(query) ||
      itemCategory.toLowerCase().includes(query) ||
      q.difficulty?.toLowerCase().includes(query);

    return matchesCategory && matchesSearch;
  });

  return (
    <TrackerContext.Provider
      value={{
        questions,
        filteredQuestions,
        searchQuery,
        setSearchQuery,
        activeQuick,
        setActiveQuick,
        addQuestion,
        updateQuestion,
        editingQuestion,
        setEditingQuestion,
        toggleStatus,
        deleteQuestion,
      }}
    >
      {children}
    </TrackerContext.Provider>
  );
};

export const useTracker = () => useContext(TrackerContext);
