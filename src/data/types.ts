export type LearningPath = "beginner" | "intermediate" | "professional";

export interface PathMeta {
  id: LearningPath;
  emoji: string;
  name: string;
  tagline: string;
  description: string;
  removedOrDeferred: string;
  sessionLength: string;
  focus: string;
  evaluation: string;
  outcomeGoal: string;
}

export interface ContentSection {
  heading: string;
  body: string;
}

export interface CaseStudy {
  title: string;
  story: string;
  analysis: string;
}

export interface CommonMistake {
  problem: string;
  solution: string;
}

export interface Exercise {
  title: string;
  description: string;
  format?: "نصي" | "رفع ملف" | "محاكاة" | "رابط";
}

export interface FreeTool {
  name: string;
  description: string;
  url: string;
}

export interface ExpectedQA {
  q: string;
  a: string;
}

export interface Unit {
  id: number;
  week: number;
  title: string;
  duration: string;
  icon: string;
  objective: string;
  tip: string;
  expertTip: string;
  openingScript: string;
  sections: ContentSection[];
  caseStudy: CaseStudy;
  goldenRule: string;
  commonMistake: CommonMistake;
  exercises: Exercise[];
  expectedQuestions: ExpectedQA[];
  aiPrompt: string;
  homework: string;
  tool: FreeTool;
  selfCheck: string[];
  projectComponent: string;
  pathNotes: Record<LearningPath, string>;
}

export interface QuizQuestion {
  question: string;
  options?: string[];
  answer?: string;
  openEnded?: boolean;
}

export interface WeekQuiz {
  week: number;
  unitsCovered: [number, number];
  questions: QuizQuestion[];
}

export interface Badge {
  id: string;
  name: string;
  emoji: string;
  condition: string;
  points: number;
}

export interface DailyTask {
  day: number;
  isBuffer?: boolean;
  morning: string;
  evening: string;
}
