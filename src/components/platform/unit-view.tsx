"use client";
import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft, ArrowRight, CheckCircle2, Sparkles, AlertTriangle, Lightbulb,
  ClipboardList, Bot, Home, Wrench, BookMarked, TrendingUp, Target, Facebook,
  Megaphone, Video, MessageCircle, Network, Rocket,
} from "lucide-react";
import { allUnits } from "@/data/curriculum";
import { useAppStore } from "@/lib/store";
import { pathById } from "@/data/paths";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion, AccordionItem, AccordionTrigger, AccordionContent,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";

const iconMap: Record<string, React.ElementType> = {
  TrendingUp, Target, Facebook, Megaphone, Video, MessageCircle, Network, Rocket,
};

export function UnitView() {
  const activeUnitId = useAppStore((s) => s.activeUnitId);
  const setView = useAppStore((s) => s.setView);
  const selectedPath = useAppStore((s) => s.selectedPath);
  const selfCheckState = useAppStore((s) => s.selfCheckState);
  const toggleSelfCheck = useAppStore((s) => s.toggleSelfCheck);
  const completedUnits = useAppStore((s) => s.completedUnits);
  const awardBadge = useAppStore((s) => s.awardBadge);

  const unit = useMemo(() => allUnits.find((u) => u.id === activeUnitId) ?? allUnits[0], [activeUnitId]);
  const Icon = iconMap[unit.icon] ?? BookMarked;
  const path = selectedPath ?? "beginner";
  const meta = pathById(path)!;

  const checks = selfCheckState[unit.id] ?? Array(unit.selfCheck.length).fill(false);
  const isComplete = completedUnits.includes(unit.id);
  const currentIndex = allUnits.findIndex((u) => u.id === unit.id);
  const prevUnit = allUnits[currentIndex - 1];
  const nextUnit = allUnits[currentIndex + 1];

  const handleCheck = (index: number) => {
    const wasComplete = completedUnits.includes(unit.id);
    toggleSelfCheck(unit.id, index, unit.selfCheck.length);
    const willAllBeTrue = checks.every((c, i) => (i === index ? true : c));
    // Award "first post" badge specifically when Unit 3 (page + first posts) is newly completed
    if (!wasComplete && willAllBeTrue && unit.id === 3) {
      awardBadge("first-post");
    }
  };

  return (
    <div className="px-6 py-8 sm:px-10 sm:py-10">
      <div className="mx-auto max-w-3xl">
        {/* Breadcrumb */}
        <button
          onClick={() => setView("dashboard")}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-gold"
        >
          <Home className="h-3.5 w-3.5" />
          العودة للوحة التحكم
        </button>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-rust/15 text-rust-light">
              <Icon className="h-6 w-6" />
            </div>
            <div>
              <p className="text-xs font-semibold text-gold-light">
                الوحدة {unit.id} · الأسبوع {unit.week} · {unit.duration}
              </p>
              <h1 className="font-display text-2xl font-black leading-snug text-sand sm:text-3xl">{unit.title}</h1>
            </div>
          </div>
          {isComplete && (
            <Badge variant="secondary" className="mt-4 gap-1">
              <CheckCircle2 className="h-3 w-3" /> مكتملة
            </Badge>
          )}
        </motion.div>

        {/* Objective */}
        <Card className="mt-6 border-r-4 border-r-gold p-5">
          <p className="text-xs font-semibold text-gold-light">🎯 الهدف من هذه الوحدة</p>
          <p className="mt-2 text-sm leading-7 text-ink">{unit.objective}</p>
        </Card>

        {/* Path-specific note */}
        <Card className="mt-4 border-r-4 border-r-teal bg-teal/5 p-5">
          <p className="text-xs font-semibold text-teal-light">
            {meta.emoji} ملاحظة خاصة بمسارك — {meta.name}
          </p>
          <p className="mt-2 text-sm leading-7 text-ink">{unit.pathNotes[path]}</p>
        </Card>

        {/* Tip */}
        <div className="mt-4 flex items-start gap-3 rounded-sm bg-gold/10 p-4 text-sm text-ink">
          <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
          <p className="leading-7">{unit.tip}</p>
        </div>

        {/* Theory sections */}
        <div className="mt-8">
          <h2 className="mb-3 font-display text-lg font-bold text-ink">📖 المحتوى التعليمي</h2>
          <Accordion type="multiple" defaultValue={["0"]} className="rounded-md border border-border bg-bg-card px-5">
            {unit.sections.map((section, i) => (
              <AccordionItem key={i} value={String(i)}>
                <AccordionTrigger>{section.heading}</AccordionTrigger>
                <AccordionContent>{section.body}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Case study */}
        <Card className="mt-8 overflow-hidden">
          <div className="bg-clay/40 px-5 py-4">
            <p className="text-xs font-semibold text-gold-light">📖 دراسة حالة سودانية</p>
            <h3 className="mt-1 font-display text-base font-bold text-ink">{unit.caseStudy.title}</h3>
          </div>
          <CardContent className="space-y-3 pt-4">
            <p className="text-sm leading-7 text-ink-muted">{unit.caseStudy.story}</p>
            <div className="rounded-sm border-r-2 border-r-rust bg-rust/5 p-3">
              <p className="text-xs font-semibold text-rust-light">التحليل</p>
              <p className="mt-1 text-sm leading-7 text-ink-muted">{unit.caseStudy.analysis}</p>
            </div>
          </CardContent>
        </Card>

        {/* Golden rule */}
        <div className="mt-6 flex items-start gap-3 rounded-md border border-gold/30 bg-gold/10 p-5">
          <Sparkles className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
          <div>
            <p className="text-xs font-semibold text-gold-light">⭐ القاعدة الذهبية</p>
            <p className="mt-1 text-sm font-medium leading-7 text-ink">{unit.goldenRule}</p>
          </div>
        </div>

        {/* Common mistake */}
        <Card className="mt-4 p-5">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-rust-light" />
            <div className="flex-1 space-y-2">
              <p className="text-xs font-semibold text-rust-light">⚠️ الخطأ الشائع</p>
              <p className="text-sm leading-7 text-ink-muted">{unit.commonMistake.problem}</p>
              <p className="text-xs font-semibold text-teal-light">✅ الحل</p>
              <p className="text-sm leading-7 text-ink-muted">{unit.commonMistake.solution}</p>
            </div>
          </div>
        </Card>

        {/* Exercises */}
        <div className="mt-8">
          <h2 className="mb-3 flex items-center gap-2 font-display text-lg font-bold text-ink">
            <ClipboardList className="h-5 w-5 text-gold" />
            التمارين العملية
          </h2>
          <div className="space-y-3">
            {unit.exercises.map((ex, i) => (
              <Card key={i} className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-display text-sm font-bold text-ink">
                    تمرين {i + 1}: {ex.title}
                  </p>
                  {ex.format && (
                    <Badge variant="outline" className="shrink-0 text-[10px]">
                      {ex.format}
                    </Badge>
                  )}
                </div>
                <p className="mt-2 text-sm leading-7 text-ink-muted">{ex.description}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Expected Q&A */}
        {unit.expectedQuestions.length > 0 && (
          <div className="mt-8">
            <h2 className="mb-3 font-display text-lg font-bold text-ink">أسئلة متوقعة</h2>
            <div className="space-y-3">
              {unit.expectedQuestions.map((qa, i) => (
                <Card key={i} className="p-4">
                  <p className="text-sm font-semibold text-gold-light">س: {qa.q}</p>
                  <p className="mt-2 text-sm leading-7 text-ink-muted">ج: {qa.a}</p>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* AI Prompt */}
        <Card className="mt-8 border-r-4 border-r-teal p-5">
          <p className="flex items-center gap-2 text-xs font-semibold text-teal-light">
            <Bot className="h-4 w-4" />
            🤖 أمر جاهز للذكاء الاصطناعي
          </p>
          <p
            dir="ltr"
            className="mt-3 rounded-sm bg-bg-elevated p-3 text-right text-sm leading-7 text-ink"
            style={{ direction: "rtl" }}
          >
            {unit.aiPrompt}
          </p>
        </Card>

        {/* Homework */}
        <Card className="mt-4 bg-rust/10 p-5">
          <p className="text-xs font-semibold text-rust-light">📝 الواجب المنزلي</p>
          <p className="mt-2 text-sm leading-7 text-ink">{unit.homework}</p>
        </Card>

        {/* Free tool */}
        <Card className="mt-4 flex items-center justify-between gap-3 p-5">
          <div className="flex items-center gap-3">
            <Wrench className="h-5 w-5 shrink-0 text-gold" />
            <div>
              <p className="font-display text-sm font-bold text-ink">🛠️ {unit.tool.name}</p>
              <p className="mt-1 text-xs leading-6 text-ink-muted">{unit.tool.description}</p>
            </div>
          </div>
          <a href={unit.tool.url} target="_blank" rel="noreferrer" className="shrink-0">
            <Button variant="outline" size="sm">
              فتح الأداة
            </Button>
          </a>
        </Card>

        {/* Self-check */}
        <div className="mt-10 rounded-md border border-border bg-bg-card p-5">
          <h2 className="mb-4 font-display text-base font-bold text-ink">✅ التقييم الذاتي</h2>
          <div className="space-y-3">
            {unit.selfCheck.map((item, i) => (
              <label key={i} className="flex cursor-pointer items-start gap-3 text-sm">
                <Checkbox checked={!!checks[i]} onCheckedChange={() => handleCheck(i)} className="mt-0.5" />
                <span className={checks[i] ? "text-ink-muted line-through" : "text-ink"}>{item}</span>
              </label>
            ))}
          </div>
          {isComplete && (
            <div className="mt-4 flex items-center gap-2 rounded-sm bg-teal/15 p-3 text-sm text-teal-light">
              <CheckCircle2 className="h-4 w-4" />
              أحسنت! أكملت كل بنود هذه الوحدة. +5 نقاط
            </div>
          )}
        </div>

        {/* Prev/Next nav */}
        <div className="mt-10 flex items-center justify-between gap-3 border-t border-border pt-6">
          {prevUnit ? (
            <Button variant="ghost" onClick={() => setView("unit", { unitId: prevUnit.id })}>
              <ArrowRight className="h-4 w-4" />
              الوحدة السابقة
            </Button>
          ) : (
            <div />
          )}
          {nextUnit ? (
            <Button variant="gold" onClick={() => setView("unit", { unitId: nextUnit.id })}>
              الوحدة التالية
              <ArrowLeft className="h-4 w-4" />
            </Button>
          ) : (
            <Button variant="gold" onClick={() => setView("dashboard")}>
              إنهاء المنهج 🎉
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
