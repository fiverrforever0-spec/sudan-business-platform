import { Badge } from "./types";

export const badges: Badge[] = [
  {
    id: "first-post",
    name: "شارة أول منشور",
    emoji: "📝",
    condition: "لأول متدرب ينشر منشوراً فعلياً على صفحته (لا مسودة).",
    points: 10,
  },
  {
    id: "best-identity",
    name: "شارة أفضل هوية بصرية",
    emoji: "🎨",
    condition: "لأكثر صفحة أو حساب يحمل شكلاً بصرياً متسقاً واحترافياً.",
    points: 15,
  },
  {
    id: "best-reply",
    name: "شارة أذكى رد على عميل",
    emoji: "💬",
    condition: "لأفضل رد موثّق في محاكاة العميل المتردد أو الرسائل الحقيقية.",
    points: 15,
  },
  {
    id: "first-sale",
    name: "شارة أول عملية بيع",
    emoji: "💰",
    condition: "لأول متدرب يوثق عملية بيع حقيقية واحدة ولو بسيطة.",
    points: 25,
  },
  {
    id: "most-views",
    name: "شارة أكثر فيديو مشاهدات",
    emoji: "🔥",
    condition: "لصاحب أعلى عدد مشاهدات موثق على فيديو تيك توك واحد خلال الورشة.",
    points: 20,
  },
];

export const CONSISTENCY_POINT = 1; // نقطة مواظبة لكل جلسة مكتملة
