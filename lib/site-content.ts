export const siteContent = {
  brand: {
    name: "SkyLine Airways",
    shortName: "SkyLine",
    tagline: "Travel Beyond Ordinary",
    description:
      "واجهة طيران حديثة مع صور ديناميكية ووجهات قابلة للتعديل من ملف واحد.",
    phone: "+974 8000 1111",
    email: "hello@skyline-airways.com",
  },
  navigation: [
    { label: "احجز", href: "#booking" },
    { label: "الوجهات", href: "#destinations" },
    { label: "العروض", href: "#offers" },
    { label: "المزايا", href: "#benefits" },
  ],
  destinations: [
    {
      id: "doha",
      city: "الدوحة",
      country: "قطر",
      price: "ابتداءً من 1,240 ر.ق",
      description: "مركز عبور عالمي مع صالات راقية ورحلات مرنة على مدار اليوم.",
      image:
        "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "istanbul",
      city: "إسطنبول",
      country: "تركيا",
      price: "ابتداءً من 1,890 ر.ق",
      description: "رحلات مباشرة إلى مدينة نابضة بالتاريخ والتسوق والمطاعم الراقية.",
      image:
        "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "paris",
      city: "باريس",
      country: "فرنسا",
      price: "ابتداءً من 2,760 ر.ق",
      description: "تجربة سفر ممتازة إلى واحدة من أكثر الوجهات طلباً في أوروبا.",
      image:
        "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
    },
    {
      id: "bangkok",
      city: "بانكوك",
      country: "تايلند",
      price: "ابتداءً من 2,340 ر.ق",
      description: "مثالية للعطلات الطويلة مع أسعار منافسة وأمتعة سخية.",
      image:
        "https://images.unsplash.com/photo-1508009603885-50cf7c579365?auto=format&fit=crop&w=1600&q=80",
    },
  ],
  offers: [
    "خصم حتى 20% على الرحلات المختارة عند الحجز المبكر.",
    "ترقية إلى درجة رجال الأعمال على مسارات محددة.",
    "أميال إضافية ومزايا أولوية لعملاء العضوية.",
  ],
  benefits: [
    { value: "5s", label: "تبديل تلقائي للصور" },
    { value: "24/7", label: "دعم حجوزات ومساعدة" },
    { value: "4", label: "وجهات ديناميكية جاهزة" },
  ],
};
