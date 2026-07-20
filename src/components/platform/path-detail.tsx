"use client";
import { motion } from "framer-motion";
import { ArrowLeft, RotateCcw } from "lucide-react";
import { pathById } from "@/data/paths";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useAppStore } from "@/lib/store";

const weekMatrix = [
  { week: "الأول", topic: "اختيار المنتج", beginner: "منتج واحد فقط، لا فتح صفحة قبل اليوم 3", intermediate: "اختيار وتحليل منافسين خلال 3 أيام", professional: "الصفحة والكتالوج خلال 48 ساعة" },
  { week: "الثاني", topic: "الصفحة والإعلانات", beginner: "معمل تصوير: 10 صور و5 فيديوهات", intermediate: "نظري + مخطط إعلان بورقة وقلم", professional: "تشغيل حملتين A/B فعلياً" },
  { week: "الثالث", topic: "تيك توك وواتساب", beginner: "تعاون مجاني بدل الإعلانات", intermediate: "تشغيل أول إعلان فعلي (5$/يوم)", professional: "تصميم Chat Flow متكامل" },
  { week: "الرابع", topic: "الإطلاق النهائي", beginner: "اكتمال الملفات الرقمية", intermediate: "حساب تكلفة الاكتساب CPA", professional: "أول دفع إلكتروني + حساب ROI" },
];

export function PathDetail() {
  const selectedPath = useAppStore((s) => s.selectedPath);
  const setView = useAppStore((s) => s.setView);
  const resetPath = useAppStore((s) => s.resetPath);
  const meta = pathById(selectedPath ?? "beginner")!;

  return (
    <div className="min-h-screen px-6 py-14">
      <div className="mx-auto max-w-4xl">
        <button
          onClick={resetPath}
          className="mb-8 inline-flex items-center gap-1.5 text-sm text-ink-muted transition-colors hover:text-gold"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          تغيير المسار
        </button>

        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <div className="mb-2 text-5xl">{meta.emoji}</div>
          <h1 className="font-display text-3xl font-black text-sand sm:text-4xl">{meta.name}</h1>
          <p className="mt-1 text-sm font-semibold text-gold-light">{meta.tagline}</p>
          <p className="mt-5 max-w-2xl text-base leading-8 text-ink-muted">{meta.description}</p>
        </motion.div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          <Card className="p-5">
            <p className="text-xs font-semibold text-ink-muted">مدة الجلسة</p>
            <p className="mt-1 font-display text-base font-bold text-ink">{meta.sessionLength}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold text-ink-muted">التركيز الأساسي</p>
            <p className="mt-1 text-sm text-ink">{meta.focus}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold text-ink-muted">المحذوف أو المؤجل</p>
            <p className="mt-1 text-sm text-ink">{meta.removedOrDeferred}</p>
          </Card>
          <Card className="p-5">
            <p className="text-xs font-semibold text-ink-muted">آلية التقييم</p>
            <p className="mt-1 text-sm text-ink">{meta.evaluation}</p>
          </Card>
        </div>

        <Card className="mt-8 overflow-hidden">
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full text-right text-sm">
                <thead>
                  <tr className="border-b border-border bg-bg-elevated text-ink-muted">
                    <th className="p-4 font-semibold">الأسبوع</th>
                    <th className="p-4 font-semibold">المحور</th>
                    <th className="p-4 font-semibold">ماذا يختلف في مسارك</th>
                  </tr>
                </thead>
                <tbody>
                  {weekMatrix.map((row) => (
                    <tr key={row.week} className="border-b border-border last:border-0">
                      <td className="p-4 font-display font-bold text-gold-light">{row.week}</td>
                      <td className="p-4 text-ink">{row.topic}</td>
                      <td className="p-4 text-ink-muted">
                        {selectedPath === "beginner" && row.beginner}
                        {selectedPath === "intermediate" && row.intermediate}
                        {selectedPath === "professional" && row.professional}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        <div className="mt-10 flex justify-center">
          <Button size="lg" variant="gold" onClick={() => setView("dashboard")}>
            ابدأ رحلتك الآن
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
