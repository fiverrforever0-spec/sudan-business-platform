"use client";
import { motion } from "framer-motion";
import { Home, ExternalLink, Palette, Clapperboard, Table, LayoutDashboard, MessageCircle, Search, GraduationCap } from "lucide-react";
import { toolsDirectory } from "@/data/tools";
import { useAppStore } from "@/lib/store";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const iconMap: Record<string, React.ElementType> = {
  Palette, Clapperboard, Table, LayoutDashboard, MessageCircle, Search, GraduationCap,
};

export function ToolsPage() {
  const setView = useAppStore((s) => s.setView);

  return (
    <div className="px-6 py-10 sm:px-10">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={() => setView("dashboard")}
          className="mb-6 inline-flex items-center gap-1.5 text-xs text-ink-muted transition-colors hover:text-gold"
        >
          <Home className="h-3.5 w-3.5" />
          العودة للوحة التحكم
        </button>

        <h1 className="font-display text-2xl font-black text-sand">صندوق الأدوات المجانية</h1>
        <p className="mt-2 text-sm leading-7 text-ink-muted">
          كل أداة استخدمتها عبر الوحدات الثمانية، في مكان واحد. كلها مجانية بالكامل وتكفي لأول 3 أشهر
          على الأقل من مشروعك.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {toolsDirectory.map((tool, i) => {
            const Icon = iconMap[tool.icon] ?? Palette;
            return (
              <motion.div key={tool.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}>
                <Card className="flex h-full flex-col p-5">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-teal/15 text-teal-light">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-display text-sm font-bold text-ink">{tool.name}</p>
                      <p className="text-[11px] font-semibold text-gold-light">{tool.category}</p>
                    </div>
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-7 text-ink-muted">{tool.description}</p>
                  <a href={tool.url} target="_blank" rel="noreferrer" className="mt-4">
                    <Button variant="outline" size="sm" className="w-full">
                      فتح الأداة
                      <ExternalLink className="h-3.5 w-3.5" />
                    </Button>
                  </a>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
