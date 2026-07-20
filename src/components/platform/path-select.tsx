"use client";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, ArrowLeft, Sparkles } from "lucide-react";
import { paths } from "@/data/paths";
import { LearningPath } from "@/data/types";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { JourneyPath } from "./journey-path";
import { useAppStore } from "@/lib/store";

const classificationQuestions = [
  "هل سبق أن أنشأت صفحة فيسبوك أو حساب تيك توك من قبل؟",
  "هل تعرف الفرق بين المنشور العضوي والإعلان المدفوع؟",
  "هل لديك منتج أو خدمة جاهزة للبيع الآن، أو ميزانية تسويقية ولو صغيرة؟",
  "هل سبق أن صورت فيديو بهاتفك ونشرته لجمهور غير معارفك؟",
];

function classify(yesCount: number, hasProduct: boolean): LearningPath {
  if (yesCount <= 2) return "beginner";
  if (yesCount === 4 && hasProduct) return "professional";
  return "intermediate";
}

export function PathSelect() {
  const selectPath = useAppStore((s) => s.selectPath);
  const [answers, setAnswers] = useState<(boolean | null)[]>(Array(4).fill(null));
  const [showQuiz, setShowQuiz] = useState(false);

  const answeredAll = answers.every((a) => a !== null);
  const suggested = useMemo(() => {
    if (!answeredAll) return null;
    const yesCount = answers.filter(Boolean).length;
    return classify(yesCount, !!answers[2]);
  }, [answers, answeredAll]);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Hero */}
      <section className="relative border-b border-border px-6 py-16 sm:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-xs font-semibold text-gold-light"
          >
            <Sparkles className="h-3.5 w-3.5" />
            السودان 2026 · 8 وحدات · 30 يوماً للتنفيذ
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-display text-4xl font-black leading-[1.15] text-sand sm:text-6xl"
          >
            متجرك الرقمي المصغر
            <br />
            <span className="text-rust-light">يُبنى بيدك، لا يُقرأ فقط</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-base leading-8 text-ink-muted sm:text-lg"
          >
            من فكرة منتج إلى صفحة فيسبوك تعمل، وحساب تيك توك ينشر بانتظام، وكتالوج واتساب جاهز للبيع
            — خلال 4 أسابيع، بخطى تناسب مستواك بالضبط.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="mx-auto mt-12 max-w-md"
          >
            <JourneyPath />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="mx-auto max-w-5xl px-6 py-14">
        {!showQuiz ? (
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold text-ink">أي مسار يناسبك؟</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-ink-muted">
              أجب عن 4 أسئلة سريعة (30 ثانية) لنقترح عليك المسار الأنسب، أو اختر مباشرة إن كنت تعرف مستواك.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button size="lg" variant="gold" onClick={() => setShowQuiz(true)}>
                ابدأ الاستبيان السريع
              </Button>
              <Button size="lg" variant="outline" onClick={() => setShowQuiz(true)}>
                أو اختر مساري بنفسي
              </Button>
            </div>
          </div>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mx-auto max-w-xl">
            <h2 className="mb-6 text-center font-display text-xl font-bold text-ink">استبيان تصنيف المستوى</h2>
            <div className="space-y-3">
              {classificationQuestions.map((q, i) => (
                <Card key={i} className="flex items-center justify-between gap-4 p-4">
                  <p className="text-sm text-ink">{q}</p>
                  <div className="flex shrink-0 gap-2">
                    <button
                      onClick={() =>
                        setAnswers((prev) => prev.map((a, idx) => (idx === i ? true : a)))
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                        answers[i] === true
                          ? "border-teal bg-teal text-sand"
                          : "border-border text-ink-muted hover:border-teal"
                      }`}
                      aria-label="نعم"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() =>
                        setAnswers((prev) => prev.map((a, idx) => (idx === i ? false : a)))
                      }
                      className={`flex h-9 w-9 items-center justify-center rounded-full border transition-colors ${
                        answers[i] === false
                          ? "border-rust bg-rust text-sand"
                          : "border-border text-ink-muted hover:border-rust"
                      }`}
                      aria-label="لا"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        {/* Path cards */}
        <div className="mt-14 grid gap-5 sm:grid-cols-3">
          {paths.map((p, i) => {
            const isSuggested = suggested === p.id;
            return (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <Card
                  className={`relative flex h-full flex-col p-6 transition-all hover:-translate-y-1 ${
                    isSuggested ? "border-gold shadow-glow" : ""
                  }`}
                >
                  {isSuggested && (
                    <span className="absolute -top-3 right-6 rounded-full bg-gold px-3 py-1 text-xs font-bold text-clay">
                      المسار المقترح لك
                    </span>
                  )}
                  <div className="mb-3 text-4xl">{p.emoji}</div>
                  <h3 className="font-display text-lg font-bold text-ink">{p.name}</h3>
                  <p className="mt-1 text-xs font-semibold text-gold-light">{p.tagline}</p>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-muted">{p.description}</p>
                  <Button
                    className="mt-5 w-full"
                    variant={isSuggested ? "gold" : "outline"}
                    onClick={() => selectPath(p.id)}
                  >
                    اختر هذا المسار
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
