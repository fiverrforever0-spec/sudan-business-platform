# متجرك الرقمي المصغر — بناء البزنس الأونلاين | السودان 2026

منصة تعليمية تفاعلية كاملة، عربي RTL، مبنية بـ Next.js 16 + TypeScript + Zustand + Tailwind + Framer Motion.

## التشغيل محلياً

```bash
npm install
npm run dev
```

افتح http://localhost:3000

## البناء للإنتاج

```bash
npm run build
npm run start
```

## هيكل المشروع

```
src/
├── app/
│   ├── layout.tsx        # RTL + خطوط Tajawal / IBM Plex Sans Arabic
│   ├── page.tsx           # نقطة الدخول -> AppShell
│   └── globals.css        # التوكنز والأنماط الأساسية
├── data/
│   ├── types.ts           # نموذج البيانات (Unit, PathMeta, Badge...)
│   ├── paths.ts           # المسارات الثلاثة (مبتدئ/متوسط/محترف)
│   ├── units-1-2.ts       # محتوى الوحدتين 1-2
│   ├── units-3-4.ts       # محتوى الوحدتين 3-4
│   ├── units-5-6.ts       # محتوى الوحدتين 5-6
│   ├── units-7-8.ts       # محتوى الوحدتين 7-8
│   ├── curriculum.ts      # دمج كل الوحدات + هيلبرز
│   ├── quizzes.ts         # اختبارات أسبوعية
│   ├── badges.ts          # نظام الشارات
│   ├── daily-plan.ts      # خطة الـ30 يوماً
│   └── tools.ts           # دليل الأدوات المجانية
├── lib/
│   ├── store.ts           # Zustand + persist (localStorage)
│   └── utils.ts           # cn() helper
└── components/
    ├── ui/                 # عناصر واجهة أساسية (button, card, progress...)
    └── platform/
        ├── app-shell.tsx       # الموجّه الرئيسي (orchestrator)
        ├── path-select.tsx     # شاشة اختيار المسار + استبيان تصنيف
        ├── path-detail.tsx     # تفاصيل المسار المختار
        ├── sidebar.tsx         # القائمة الجانبية (مع درج للموبايل)
        ├── dashboard.tsx       # لوحة التحكم
        ├── unit-view.tsx       # عرض الوحدة التعليمية الكامل
        ├── daily-plan.tsx      # متتبع خطة الـ30 يوماً
        ├── quiz-view.tsx       # الاختبارات الأسبوعية
        ├── badges-page.tsx     # لوحة الشرف والشارات
        ├── tools-page.tsx      # صندوق الأدوات
        └── journey-path.tsx    # العنصر البصري المميز (تيك توك→فيسبوك→واتساب)
```

## المسارات الثلاثة

- 🌱 **مبتدئ**: كل المحتوى ظاهر، دعم كامل خطوة بخطوة
- ⚡ **متوسط**: تخطي الأساسيات، تركيز على التحليل والإعلانات
- 🚀 **محترف**: محتوى متقدم، أتمتة، وحساب ROI

كل وحدة تعرض ملاحظة مخصصة (`pathNotes`) حسب المسار المختار.

## نظام التخزين

كل تقدم المستخدم (الوحدات المكتملة، إجابات الاختبارات، المهام اليومية، النقاط، الشارات)
محفوظ في `localStorage` عبر Zustand `persist` middleware تحت المفتاح
`sudan-business-platform-storage`. لا حاجة لأي قاعدة بيانات خارجية.

## ملاحظة حول التحقق من البناء

تم بناء هذا المشروع بالكامل يدوياً مع مراجعة دقيقة لكل الـ imports/exports للتأكد من
تطابقها. لم يتمكن Claude من تشغيل `npm install` فعلياً بسبب تعطيل الوصول للشبكة في
بيئة التنفيذ، لذا يُنصح بتشغيل `npm run build` بعد التثبيت للتأكد النهائي، وإبلاغي
بأي خطأ TypeScript إن ظهر ليتم إصلاحه فوراً.
