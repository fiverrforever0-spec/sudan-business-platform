import type { Metadata } from "next";
import { Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import "./globals.css";

const tajawal = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700", "800", "900"],
  variable: "--font-tajawal",
  display: "swap",
});

const plex = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-plex",
  display: "swap",
});

export const metadata: Metadata = {
  title: "متجرك الرقمي المصغر | بناء البزنس الأونلاين - السودان 2026",
  description:
    "منصة تعليمية تفاعلية لبناء مشروعك الرقمي في السودان خلال 4 أسابيع: صفحة فيسبوك، تيك توك، وكتالوج واتساب.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className={`${tajawal.variable} ${plex.variable}`}>
      <body className="min-h-screen bg-bg font-body antialiased">
        <div className="pointer-events-none fixed inset-0 grain-overlay" />
        {children}
      </body>
    </html>
  );
}
