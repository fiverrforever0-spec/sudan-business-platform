"use client";
import { motion } from "framer-motion";
import { ArrowLeft, Flame, Trophy, BookOpen } from "lucide-react";
import { allUnits } from "@/data/curriculum";
import { pathById } from "@/data/paths";
import { badges as badgeDefs } from "@/data/badges";
import { useAppStore } from "@/lib/store";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { JourneyPath } from "./journey-path";

export function Dashboard() {
  const selectedPath = useAppStore((s) => s.selectedPath);
  const completedUnits = useAppStore((s) => s.completedUnits);
  const completedDailyTasks = useAppStore((s) => s.completedDailyTasks);
  const earnedBadges = useAppStore((s) => s.earnedBadges);
  const points = useAppStore((s) => s.points);
  const setView = useAppStore((s) => s.setView);

  const meta = pathById(selectedPath ?? "beginner")!;
  const nextUnit = allUnits.find((u) => !completedUnits.includes(u.id)) ?? allUnits[0];
  const progressPct = Math.round((completedUnits.length / allUnits.length) * 100);

  const stats = [
    { label: "وحدات مكتملة", value: `${completedUnits.length}/${allUnits.length}`, icon: BookOpen },
    { label: "أيام منجزة من الخطة", value: `${completedDailyTasks.length}/30`, icon: Flame },
    { label: "شارات محققة", value: `${earnedBadges.length}/${badgeDefs.length}`, icon: Trophy },
  ];

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-5xl">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-sm text-ink-muted">
            {meta.emoji} أهلاً بك في {meta.name} — {meta.tagline}
          </p>
          <h1 className="mt-1 font-display text-3xl font-black text-sand">لوحة تحكم متجرك</h1>
        </motion.div>

        <div className="mt-8">
          <JourneyPath className="mx-auto max-w-lg" />
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {stats.map((s) => (
            <Card key={s.label} className="p-5">
              <div className="flex items-center justify-between">
                <s.icon className="h-5 w-5 text-gold" />
              </div>
              <p className="mt-3 font-display text-2xl font-black stat-figure text-ink">{s.value}</p>
              <p className="text-xs text-ink-muted">{s.label}</p>
            </Card>
          ))}
        </div>

        <Card className="mt-6 overflow-hidden">
          <CardContent className="p-6">
            <div className="mb-3 flex items-center justify-between">
              <p className="text-sm font-semibold text-ink">تقدمك الكلي في المتجر الرقمي المصغر</p>
              <span className="font-display text-sm font-bold text-gold-light">{progressPct}%</span>
            </div>
            <Progress value={progressPct} />
          </CardContent>
        </Card>

        <Card className="mt-6 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold text-gold-light">التالي في رحلتك</p>
            <h3 className="mt-1 font-display text-lg font-bold text-ink">
              الوحدة {nextUnit.id}: {nextUnit.title}
            </h3>
            <p className="mt-1 text-sm text-ink-muted">{nextUnit.duration} · الأسبوع {nextUnit.week}</p>
          </div>
          <Button variant="gold" onClick={() => setView("unit", { unitId: nextUnit.id })}>
            متابعة التعلّم
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Card>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Card
            className="cursor-pointer p-6 transition-colors hover:border-gold"
            onClick={() => setView("daily-plan")}
          >
            <p className="font-display text-base font-bold text-ink">خطة الـ30 يوماً</p>
            <p className="mt-1 text-sm text-ink-muted">جدول مهام يومي شبه ساعي بعد انتهاء كل وحدة.</p>
          </Card>
          <Card
            className="cursor-pointer p-6 transition-colors hover:border-gold"
            onClick={() => setView("badges")}
          >
            <p className="font-display text-base font-bold text-ink">نظام الشارات</p>
            <p className="mt-1 text-sm text-ink-muted">تابع إنجازاتك واجمع نقاط \"بطل الورشة\".</p>
          </Card>
        </div>

        <p className="mt-10 text-center text-xs text-ink-muted">{points} نقطة متراكمة — استمر ولا توقف 🌟</p>
      </div>
    </div>
  );
}
