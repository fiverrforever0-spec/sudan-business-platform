import { WeekQuiz } from "./types";

export const quizzes: WeekQuiz[] = [
  {
    week: 1,
    unitsCovered: [1, 2],
    questions: [
      {
        question: "ما هي نسبة اختراق الإنترنت التقريبية في السودان؟",
        options: ["10%", "28.7%", "60%"],
        answer: "28.7%",
      },
      {
        question: "أي منصة تهيمن على استخدام التواصل الاجتماعي في السودان؟",
        options: ["إكس", "يوتيوب", "فيسبوك"],
        answer: "فيسبوك",
      },
      { question: "ما هي المعايير الأربعة لاختيار المجال الصحيح؟", openEnded: true },
      { question: "لماذا يجب اختبار الفكرة قبل الاستثمار الكامل؟", openEnded: true },
      { question: "اذكر مهارتين من المهارات الثلاث الأساسية لرائد الأعمال الرقمي.", openEnded: true },
    ],
  },
  {
    week: 2,
    unitsCovered: [3, 4],
    questions: [
      {
        question: "ما هي المدة المثالية المقترحة لفيديو فيسبوك؟",
        options: ["30-60 ثانية", "5 دقائق", "10 ثوانٍ"],
        answer: "30-60 ثانية",
      },
      {
        question: "كم عدد المنشورات العضوية المقترح قبل بدء أي إعلان مدفوع؟",
        options: ["5", "20", "100"],
        answer: "20",
      },
      { question: "ما الفرق بين CTR وCPC؟", openEnded: true },
      { question: "لماذا يُفضَّل الاستهداف الدقيق على الاستهداف الواسع في الميزانيات المحدودة؟", openEnded: true },
      { question: "اذكر عنصرين من عناصر الصفحة الاحترافية على فيسبوك.", openEnded: true },
    ],
  },
  {
    week: 3,
    unitsCovered: [5, 6],
    questions: [
      {
        question: "بكم بالمئة نما تيك توك في السودان خلال عام واحد؟",
        options: ["5%", "26.3%", "90%"],
        answer: "26.3%",
      },
      {
        question: "ما هو الحد الأقصى المقترح للرد على استفسار عميل عبر واتساب؟",
        options: ["5 دقائق", "ساعة", "يوم كامل"],
        answer: "5 دقائق",
      },
      { question: "اذكر نوعين من أنواع محتوى تيك توك الأفضل أداءً.", openEnded: true },
      { question: "ما وظيفة كتالوج واتساب للأعمال؟", openEnded: true },
      { question: "كيف يمكن ربط حساب تيك توك بواتساب فعلياً؟", openEnded: true },
    ],
  },
  {
    week: 4,
    unitsCovered: [7, 8],
    questions: [
      {
        question: "ما هي طريقة الدفع الأكثر شيوعاً في السودان؟",
        options: ["التحويل البنكي", "الدفع عند الاستلام", "العملات الرقمية"],
        answer: "الدفع عند الاستلام",
      },
      { question: "صف قمع المبيعات المتكامل بين المنصات الثلاث في جملة واحدة.", openEnded: true },
      { question: "اذكر عنصرين يجب تسجيلهما في جدول تتبع الطلبات.", openEnded: true },
      { question: "ما تعريف مصطلح Funnel؟", openEnded: true },
      { question: "اذكر أداة مجانية واحدة تعلمتها في هذا المنهج ووظيفتها.", openEnded: true },
    ],
  },
];
