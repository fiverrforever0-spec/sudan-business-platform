"use client";
import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";
import { PathSelect } from "./path-select";
import { PathDetail } from "./path-detail";
import { Sidebar } from "./sidebar";
import { Dashboard } from "./dashboard";
import { UnitView } from "./unit-view";
import { DailyPlan } from "./daily-plan";
import { QuizView } from "./quiz-view";
import { BadgesPage } from "./badges-page";
import { ToolsPage } from "./tools-page";

export function AppShell() {
  const [mounted, setMounted] = useState(false);
  const hasOnboarded = useAppStore((s) => s.hasOnboarded);
  const currentView = useAppStore((s) => s.currentView);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // avoid hydration mismatch with persisted zustand state
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-gold border-t-transparent" />
      </div>
    );
  }

  if (!hasOnboarded) {
    return <PathSelect />;
  }

  if (currentView === "path-detail") {
    return <PathDetail />;
  }

  return (
    <div className="flex min-h-screen">
      <main className="min-w-0 flex-1">
        {currentView === "dashboard" && <Dashboard />}
        {currentView === "unit" && <UnitView />}
        {currentView === "daily-plan" && <DailyPlan />}
        {currentView === "quiz" && <QuizView />}
        {currentView === "badges" && <BadgesPage />}
        {currentView === "tools" && <ToolsPage />}
      </main>
      <Sidebar />
    </div>
  );
}
