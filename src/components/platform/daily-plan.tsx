"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { Home, Sun, Moon, RefreshCw, CheckCircle2 } from "lucide-react";
import { dailyPlan, weekLabel } from "@/data/daily-plan";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const weekGroups = [1, 2, 3, 4];

export function DailyPlan() {
  const setView = useAppStore((s) => s.setView);
  const completedDailyTasks = useAppStore((s) => s.completedDailyTasks);
  const toggleDailyTask = useAppStore((s) => s.toggleDailyTask);
  const [activeWeek, setActiveWeek] = useState(1);

  const progressPct = Math.round((completedDailyTasks.length / dailyPlan.length) * 100);
  const daysInWeek = dailyPlan.filter((d) => Math.ceil(d.day / 7) === activeWeek || (activeWeek === 4 && d.day > 21));

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

        <h1 className="font-display text-2xl font-black text-sand">خطة الـ30 يوماً الموسعة</h1>
        <p className="mt-2 text-sm leading-7 text-ink-muted">
          مهام يومية شبه ساعية، صباحاً ومساءً، تحوّل ما تعلمته إلى تنفيذ فعلي. يوما 15 و22 أيام تعويضية
          احتياطية — إن تعطّل يوم بسبب انقطاع الكهرباء أو الإنترنت، عوّضه هناك دون شعور بالفشل.
        </p>

        <Card className="mt-6 p-5">
          <div className="mb-1.5 flex items-center justify-between text-xs">
            <span className="text-ink-muted">تقدمك في الخطة</span>
            <span className="font-semibold text-gold-light">
              {completedDailyTasks.length}/{dailyPlan.length} يوماً ({progressPct}%)
            </span>
          </div>
          <Progress value={progressPct} />
        </Card>

        <div className="mt-6 flex gap-2 overflow-x-auto pb-1">
          {weekGroups.map((w) => (
            <button
              key={w}
              onClick={() => setActiveWeek(w)}
              className={cn(
                "shrink-0 rounded-full border px-4 py-2 text-xs font-semibold transition-colors",
                activeWeek === w
                  ? "border-rust bg-rust text-sand"
                  : "border-border text-ink-muted hover:border-gold/50"
              )}
            >
              {weekLabel(w === 1 ? 1 : w === 2 ? 8 : w === 3 ? 15 : 22)}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-3">
          {daysInWeek.map((task, i) => {
            const isDone = completedDailyTasks.includes(task.day);
            return (
              <motion.div key={task.day} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.03 }}>
                <Card className={cn("p-4", task.isBuffer && "border-gold/40 bg-gold/5")}>
                  <div className="flex items-start gap-3">
                    <Checkbox
                      checked={isDone}
                      onCheckedChange={() => toggleDailyTask(task.day)}
                      className="mt-1"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className={cn("font-display text-sm font-bold", isDone ? "text-ink-muted line-through" : "text-ink")}>
                          اليوم {task.day}
                        </p>
                        {task.isBuffer && (
                          <Badge variant="gold" className="gap-1 text-[10px]">
                            <RefreshCw className="h-3 w-3" /> يوم تعويضي
                          </Badge>
                        )}
                        {isDone && <CheckCircle2 className="h-4 w-4 text-teal-light" />}
                      </div>
                      <div className="mt-2 space-y-1.5">
                        <p className="flex items-start gap-1.5 text-xs leading-6 text-ink-muted">
                          <Sun className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold" />
                          {task.morning}
                        </p>
                        <p className="flex items-start gap-1.5 text-xs leading-6 text-ink-muted">
                          <Moon className="mt-0.5 h-3.5 w-3.5 shrink-0 text-teal-light" />
                          {task.evening}
                        </p>
                      </div>
                    </div>
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
