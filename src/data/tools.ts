export interface ToolEntry {
  name: string;
  category: string;
  description: string;
  url: string;
  icon: string;
}

export const toolsDirectory: ToolEntry[] = [
  {
    name: "Canva",
    category: "تصميم",
    description: "تصميم الأغلفة والمنشورات والفيديوهات القصيرة بقوالب جاهزة، بدون أي خبرة تصميم مسبقة.",
    url: "https://www.canva.com",
    icon: "Palette",
  },
  {
    name: "CapCut",
    category: "تحرير فيديو",
    description: "تحرير فيديوهات تيك توك وفيسبوك القصيرة، وإضافة نصوص عربية وموسيقى وتأثيرات بسيطة.",
    url: "https://www.capcut.com",
    icon: "Clapperboard",
  },
  {
    name: "Google Sheets",
    category: "إدارة",
    description: "تتبع الطلبات والعملاء والمخزون في جدول واحد بسيط يعمل على الهاتف ويحفظ تلقائياً.",
    url: "https://sheets.google.com",
    icon: "Table",
  },
  {
    name: "Meta Business Suite",
    category: "إدارة إعلانات",
    description: "إدارة صفحة فيسبوك، جدولة المنشورات، وإنشاء الإعلانات المدفوعة ومتابعة نتائجها من مكان واحد.",
    url: "https://business.facebook.com",
    icon: "LayoutDashboard",
  },
  {
    name: "WhatsApp Business",
    category: "خدمة عملاء",
    description: "كتالوج منتجات مدمج، ردود آلية وترحيبية، رسائل سريعة جاهزة، وتصنيف المحادثات.",
    url: "https://business.whatsapp.com",
    icon: "MessageCircle",
  },
  {
    name: "Facebook Ads Library",
    category: "تحليل منافسين",
    description: "رؤية كل الإعلانات النشطة لأي صفحة منافسة مجاناً لفهم استراتيجياتهم الإعلانية.",
    url: "https://facebook.com/ads/library",
    icon: "Search",
  },
  {
    name: "Google Digital Garage",
    category: "تعلّم مستمر",
    description: "دورات مجانية معتمدة من جوجل في أساسيات التسويق الرقمي، مع شهادة إتمام مجانية.",
    url: "https://learndigital.withgoogle.com/digitalgarage",
    icon: "GraduationCap",
  },
];
