import { useState } from "react";
import { ContextProvider, useTracker } from "./context/TrackerContext.jsx";

import Header from "./components/Header.jsx";
import StatsCards from "./components/StatsCards.jsx";
import WeeklyProgress from "./components/WeeklyProgress.jsx";
import FilterBar from "./components/FilterBar.jsx";
import QuestionsTable from "./components/QuestionsTable.jsx";
import AddQuestion from "./components/AddQuestion.jsx";

function Dashboard() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const { editingQuestion } = useTracker();

  const showForm = isFormOpen || Boolean(editingQuestion);

  return (
    <div className="min-h-screen bg-[#f7f9fc]">
      <Header onAddQuestion={() => setIsFormOpen(true)} />

      <main className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-4 sm:gap-5 sm:px-6 sm:py-5 lg:px-8">
        <StatsCards />
        <WeeklyProgress />
        <FilterBar />
        <QuestionsTable />
      </main>

      {showForm && <AddQuestion onClose={() => setIsFormOpen(false)} />}
    </div>
  );
}

export default function App() {
  return (
    <ContextProvider>
      <Dashboard />
    </ContextProvider>
  );
}
