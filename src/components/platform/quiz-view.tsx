"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Home, PenLine } from "lucide-react";
import { quizzes } from "@/data/quizzes";
import { useAppStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function QuizView() {
  const activeQuizWeek = useAppStore((s) => s.activeQuizWeek);
  const setView = useAppStore((s) => s.setView);
  const quizAnswers = useAppStore((s) => s.quizAnswers);
  const answerQuizQuestion = useAppStore((s) => s.answerQuizQuestion);
  const submitQuiz = useAppStore((s) => s.submitQuiz);
  const submittedQuizzes = useAppStore((s) => s.submittedQuizzes);

  const [selectedWeek, setSelectedWeek] = useState<number | null>(activeQuizWeek);

  if (!selectedWeek) {
    return (
      <div className="px-6 py-10 sm:px-10">
        <div className="mx-auto max-w-3xl">
          <button
            onClick={() => setView("dashboard")}
            className="mb-6 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-gold"
          >
            <Home className="h-3.5 w-3.5" />
            العودة للوحة التحكم
          </button>
          <h1 className="font-display text-2xl font-black text-sand">اختبارات المنهج</h1>
          <p className="mt-2 text-sm text-ink-muted">
            اختبار قصير من 5 أسئلة بعد نهاية كل أسبوعين من الوحدات لتثبيت ما تعلمته.
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {quizzes.map((q) => {
              const isDone = submittedQuizzes.includes(q.week);
              return (
                <Card
                  key={q.week}
                  className="cursor-pointer p-5 transition-colors hover:border-gold"
                  onClick={() => setSelectedWeek(q.week)}
                >
                  <div className="flex items-center justify-between">
                    <p className="font-display text-base font-bold text-ink">اختبار الأسبوع {q.week}</p>
                    {isDone && (
                      <Badge variant="secondary" className="gap-1">
                        <CheckCircle2 className="h-3 w-3" /> مكتمل
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">
                    يغطي الوحدتين {q.unitsCovered[0]} و {q.unitsCovered[1]} · {q.questions.length} أسئلة
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const quiz = quizzes.find((q) => q.week === selectedWeek)!;
  const answers = quizAnswers[selectedWeek] ?? {};
  const isSubmitted = submittedQuizzes.includes(selectedWeek);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-2xl">
        <button
          onClick={() => setSelectedWeek(null)}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-gold"
        >
          <Home className="h-3.5 w-3.5" />
          كل الاختبارات
        </button>

        <h1 className="font-display text-2xl font-black text-sand">
          اختبار الأسبوع {quiz.week}
        </h1>
        <p className="mt-1 text-sm text-ink-muted">
          يغطي الوحدتين {quiz.unitsCovered[0]} و {quiz.unitsCovered[1]}
        </p>

        <div className="mt-8 space-y-5">
          {quiz.questions.map((q, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="p-5">
                <p className="text-sm font-semibold text-ink">
                  {i + 1}. {q.question}
                </p>
                {q.options ? (
                  <div className="mt-3 flex flex-col gap-2">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        disabled={isSubmitted}
                        onClick={() => answerQuizQuestion(selectedWeek, i, opt)}
                        className={cn(
                          "rounded-sm border px-3 py-2 text-right text-sm transition-colors",
                          answers[i] === opt
                            ? isSubmitted
                              ? opt === q.answer
                                ? "border-teal bg-teal/15 text-teal-light"
                                : "border-rust bg-rust/15 text-rust-light"
                              : "border-gold bg-gold/10 text-gold-light"
                            : "border-border text-ink-muted hover:border-gold/50"
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                    {isSubmitted && answers[i] !== q.answer && (
                      <p className="mt-1 text-xs text-teal-light">الإجابة الصحيحة: {q.answer}</p>
                    )}
                  </div>
                ) : (
                  <div className="mt-3">
                    <div className="mb-1.5 flex items-center gap-1.5 text-xs text-ink-muted">
                      <PenLine className="h-3 w-3" />
                      إجابة مفتوحة قصيرة
                    </div>
                    <textarea
                      disabled={isSubmitted}
                      value={answers[i] ?? ""}
                      onChange={(e) => answerQuizQuestion(selectedWeek, i, e.target.value)}
                      rows={3}
                      className="w-full rounded-sm border border-border bg-bg-elevated p-3 text-sm text-ink outline-none focus:border-gold disabled:opacity-70"
                      placeholder="اكتب إجابتك هنا..."
                    />
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-between">
          <p className="text-xs text-ink-muted">
            أجبت على {answeredCount} من {quiz.questions.length}
          </p>
          {!isSubmitted ? (
            <Button
              variant="gold"
              disabled={answeredCount < quiz.questions.length}
              onClick={() => submitQuiz(selectedWeek)}
            >
              تسليم الاختبار
            </Button>
          ) : (
            <Badge variant="secondary" className="gap-1 px-3 py-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" /> تم التسليم · +10 نقاط
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
}
