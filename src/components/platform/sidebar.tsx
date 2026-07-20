"use client";
import { LayoutDashboard, CalendarDays, ClipboardCheck, Award, Wrench, RotateCcw, Menu, X, Check } from "lucide-react";
import { useState } from "react";
import { allUnits } from "@/data/curriculum";
import { pathById } from "@/data/paths";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

const weeks = [1, 2, 3, 4];

export function Sidebar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const currentView = useAppStore((s) => s.currentView);
  const activeUnitId = useAppStore((s) => s.activeUnitId);
  const setView = useAppStore((s) => s.setView);
  const selectedPath = useAppStore((s) => s.selectedPath);
  const resetPath = useAppStore((s) => s.resetPath);
  const completedUnits = useAppStore((s) => s.completedUnits);
  const points = useAppStore((s) => s.points);

  const meta = pathById(selectedPath ?? "beginner")!;
  const progressPct = Math.round((completedUnits.length / allUnits.length) * 100);

  const navItems = [
    { key: "dashboard" as const, label: "لوحة التحكم", icon: LayoutDashboard },
    { key: "daily-plan" as const, label: "خطة الـ30 يوماً", icon: CalendarDays },
    { key: "quiz" as const, label: "الاختبارات", icon: ClipboardCheck },
    { key: "badges" as const, label: "الشارات", icon: Award },
    { key: "tools" as const, label: "صندوق الأدوات", icon: Wrench },
  ];

  const content = (
    <div className="flex h-full flex-col">
      <div className="border-b border-border p-5">
        <p className="font-display text-lg font-black text-sand">متجرك الرقمي المصغر</p>
        <p className="mt-0.5 text-xs text-ink-muted">بناء البزنس الأونلاين · السودان 2026</p>
        <button
          onClick={resetPath}
          className="mt-4 flex w-full items-center justify-between rounded-sm border border-border bg-bg-elevated px-3 py-2 text-xs transition-colors hover:border-gold"
        >
          <span className="flex items-center gap-1.5 font-semibold text-ink">
            <span>{meta.emoji}</span>
            {meta.name}
          </span>
          <RotateCcw className="h-3 w-3 text-ink-muted" />
        </button>
      </div>

      <div className="border-b border-border p-5">
        <div className="mb-1.5 flex items-center justify-between text-xs">
          <span className="text-ink-muted">تقدمك في الوحدات</span>
          <span className="font-semibold text-gold-light">{progressPct}%</span>
        </div>
        <Progress value={progressPct} />
        <div className="mt-3 flex items-center justify-between text-xs">
          <span className="text-ink-muted">نقاطك</span>
          <span className="font-display font-bold text-gold-light stat-figure">{points} نقطة</span>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.key}>
              <button
                onClick={() => {
                  setView(item.key);
                  setMobileOpen(false);
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 rounded-sm px-3 py-2.5 text-sm font-medium transition-colors",
                  currentView === item.key
                    ? "bg-rust text-sand"
                    : "text-ink-muted hover:bg-bg-elevated hover:text-ink"
                )}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <p className="mb-2 mt-6 px-3 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          الوحدات التعليمية
        </p>
        {weeks.map((week) => (
          <div key={week} className="mb-2">
            <p className="px-3 py-1 text-[11px] font-semibold text-ink-muted/70">الأسبوع {week}</p>
            <ul className="space-y-1">
              {allUnits
                .filter((u) => u.week === week)
                .map((unit) => {
                  const isActive = currentView === "unit" && activeUnitId === unit.id;
                  const isDone = completedUnits.includes(unit.id);
                  return (
                    <li key={unit.id}>
                      <button
                        onClick={() => {
                          setView("unit", { unitId: unit.id });
                          setMobileOpen(false);
                        }}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-right text-xs transition-colors",
                          isActive ? "bg-bg-elevated text-gold-light" : "text-ink-muted hover:bg-bg-elevated hover:text-ink"
                        )}
                      >
                        <span
                          className={cn(
                            "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[10px] font-bold",
                            isDone ? "border-teal bg-teal text-sand" : "border-border text-ink-muted"
                          )}
                        >
                          {isDone ? <Check className="h-3 w-3" /> : unit.id}
                        </span>
                        <span className="line-clamp-1 flex-1">{unit.title}</span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(true)}
        className="fixed top-4 right-4 z-40 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-bg-card shadow-soft lg:hidden"
        aria-label="فتح القائمة"
      >
        <Menu className="h-5 w-5 text-ink" />
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden w-72 shrink-0 border-l border-border bg-bg-card lg:block">{content}</aside>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setMobileOpen(false)} />
          <aside className="absolute right-0 top-0 h-full w-80 max-w-[85vw] bg-bg-card shadow-2xl">
            <button
              onClick={() => setMobileOpen(false)}
              className="absolute left-3 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-border"
              aria-label="إغلاق"
            >
              <X className="h-4 w-4" />
            </button>
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
