import { create } from "zustand";
import { persist } from "zustand/middleware";
import { LearningPath } from "@/data/types";
import { badges as badgeDefs, CONSISTENCY_POINT } from "@/data/badges";

export type ViewKey =
  | "path-select"
  | "path-detail"
  | "dashboard"
  | "unit"
  | "daily-plan"
  | "quiz"
  | "badges"
  | "tools";

interface EarnedBadge {
  id: string;
  earnedAt: string;
}

interface AppState {
  // navigation
  currentView: ViewKey;
  activeUnitId: number | null;
  activeQuizWeek: number | null;

  // onboarding / path
  selectedPath: LearningPath | null;
  hasOnboarded: boolean;

  // progress
  completedUnits: number[];
  selfCheckState: Record<number, boolean[]>; // unitId -> checkbox states
  completedDailyTasks: number[]; // day numbers
  quizAnswers: Record<number, Record<number, string>>; // week -> questionIndex -> answer
  submittedQuizzes: number[]; // week numbers

  // gamification
  points: number;
  earnedBadges: EarnedBadge[];

  // actions
  setView: (view: ViewKey, payload?: { unitId?: number; week?: number }) => void;
  selectPath: (path: LearningPath) => void;
  resetPath: () => void;
  toggleSelfCheck: (unitId: number, index: number, total: number) => void;
  markUnitComplete: (unitId: number) => void;
  toggleDailyTask: (day: number) => void;
  answerQuizQuestion: (week: number, questionIndex: number, answer: string) => void;
  submitQuiz: (week: number) => void;
  awardBadge: (badgeId: string) => void;
  addPoints: (amount: number) => void;
  resetAll: () => void;
}

const initialState = {
  currentView: "path-select" as ViewKey,
  activeUnitId: null as number | null,
  activeQuizWeek: null as number | null,
  selectedPath: null as LearningPath | null,
  hasOnboarded: false,
  completedUnits: [] as number[],
  selfCheckState: {} as Record<number, boolean[]>,
  completedDailyTasks: [] as number[],
  quizAnswers: {} as Record<number, Record<number, string>>,
  submittedQuizzes: [] as number[],
  points: 0,
  earnedBadges: [] as EarnedBadge[],
};

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setView: (view, payload) =>
        set(() => ({
          currentView: view,
          ...(payload?.unitId !== undefined ? { activeUnitId: payload.unitId } : {}),
          ...(payload?.week !== undefined ? { activeQuizWeek: payload.week } : {}),
        })),

      selectPath: (path) =>
        set(() => ({
          selectedPath: path,
          hasOnboarded: true,
          currentView: "path-detail",
        })),

      resetPath: () =>
        set(() => ({
          selectedPath: null,
          hasOnboarded: false,
          currentView: "path-select",
        })),

      toggleSelfCheck: (unitId, index, total) =>
        set((state) => {
          const current = state.selfCheckState[unitId] ?? Array(total).fill(false);
          const updated = [...current];
          updated[index] = !updated[index];
          const allDone = updated.every(Boolean);
          const wasComplete = state.completedUnits.includes(unitId);
          const newCompleted = allDone
            ? Array.from(new Set([...state.completedUnits, unitId]))
            : state.completedUnits.filter((id) => id !== unitId);
          const pointsDelta = allDone && !wasComplete ? 5 : !allDone && wasComplete ? -5 : 0;
          return {
            selfCheckState: { ...state.selfCheckState, [unitId]: updated },
            completedUnits: newCompleted,
            points: Math.max(0, state.points + pointsDelta),
          };
        }),

      markUnitComplete: (unitId) =>
        set((state) => ({
          completedUnits: Array.from(new Set([...state.completedUnits, unitId])),
        })),

      toggleDailyTask: (day) =>
        set((state) => {
          const isDone = state.completedDailyTasks.includes(day);
          return {
            completedDailyTasks: isDone
              ? state.completedDailyTasks.filter((d) => d !== day)
              : [...state.completedDailyTasks, day],
            points: Math.max(0, state.points + (isDone ? -CONSISTENCY_POINT : CONSISTENCY_POINT)),
          };
        }),

      answerQuizQuestion: (week, questionIndex, answer) =>
        set((state) => ({
          quizAnswers: {
            ...state.quizAnswers,
            [week]: { ...(state.quizAnswers[week] ?? {}), [questionIndex]: answer },
          },
        })),

      submitQuiz: (week) =>
        set((state) => ({
          submittedQuizzes: Array.from(new Set([...state.submittedQuizzes, week])),
          points: state.submittedQuizzes.includes(week) ? state.points : state.points + 10,
        })),

      awardBadge: (badgeId) =>
        set((state) => {
          if (state.earnedBadges.some((b) => b.id === badgeId)) return {};
          const def = badgeDefs.find((b) => b.id === badgeId);
          return {
            earnedBadges: [...state.earnedBadges, { id: badgeId, earnedAt: new Date().toISOString() }],
            points: state.points + (def?.points ?? 0),
          };
        }),

      addPoints: (amount) => set((state) => ({ points: Math.max(0, state.points + amount) })),

      resetAll: () => set(() => ({ ...initialState })),
    }),
    {
      name: "sudan-business-platform-storage",
    }
  )
);
