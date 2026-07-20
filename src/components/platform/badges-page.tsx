"use client";
import { motion } from "framer-motion";
import { Home, Lock } from "lucide-react";
import { badges as badgeDefs, CONSISTENCY_POINT } from "@/data/badges";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function BadgesPage() {
  const setView = useAppStore((s) => s.setView);
  const earnedBadges = useAppStore((s) => s.earnedBadges);
  const points = useAppStore((s) => s.points);
  const completedDailyTasks = useAppStore((s) => s.completedDailyTasks);

  const earnedIds = new Set(earnedBadges.map((b) => b.id));
  const totalBadgePoints = badgeDefs.reduce((sum, b) => (earnedIds.has(b.id) ? sum + b.points : sum), 0);
  const consistencyPoints = completedDailyTasks.length * CONSISTENCY_POINT;

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

        <h1 className="font-display text-2xl font-black text-sand">لوحة الشرف والشارات</h1>
        <p className="mt-2 text-sm leading-7 text-ink-muted">
          التلعيب هنا ليس زخرفة، بل أداة دفع إيجابي. اجمع الشارات الذهبية وحقق أعلى مجموع نقاط لتصبح
          "بطل الورشة" وتُرشَّح كـ"سفير" في خطة الاستدامة بعد انتهاء المنهج.
        </p>

        <Card className="mt-8 grid grid-cols-2 gap-4 p-6 sm:grid-cols-3">
          <div className="text-center">
            <p className="font-display text-3xl font-black stat-figure text-gold-light">{points}</p>
            <p className="mt-1 text-xs text-ink-muted">إجمالي النقاط</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-black stat-figure text-teal-light">{totalBadgePoints}</p>
            <p className="mt-1 text-xs text-ink-muted">من الشارات</p>
          </div>
          <div className="text-center">
            <p className="font-display text-3xl font-black stat-figure text-rust-light">{consistencyPoints}</p>
            <p className="mt-1 text-xs text-ink-muted">نقاط مواظبة</p>
          </div>
        </Card>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {badgeDefs.map((badge, i) => {
            const earned = earnedIds.has(badge.id);
            return (
              <motion.div key={badge.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card
                  className={cn(
                    "flex items-center gap-4 p-5 transition-all",
                    earned ? "border-gold shadow-glow" : "opacity-60"
                  )}
                >
                  <div
                    className={cn(
                      "flex h-14 w-14 shrink-0 items-center justify-center rounded-full text-2xl",
                      earned ? "bg-gold/15" : "bg-bg-elevated grayscale"
                    )}
                  >
                    {earned ? badge.emoji : <Lock className="h-5 w-5 text-ink-muted" />}
                  </div>
                  <div className="flex-1">
                    <p className="font-display text-sm font-bold text-ink">{badge.name}</p>
                    <p className="mt-1 text-xs leading-6 text-ink-muted">{badge.condition}</p>
                    <p className="mt-1 text-xs font-semibold text-gold-light">{badge.points} نقطة</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
