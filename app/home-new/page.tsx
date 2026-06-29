"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { siteContent } from "@/lib/site-content";
import { saveBookingDraft } from "@/lib/booking-store";

export default function HomePage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tripType, setTripType] = useState("round-trip");
  const [formData, setFormData] = useState({
    from: "عمّان",
    to: siteContent.destinations[0].city,
    departure: "2026-07-15",
    returnDate: "2026-07-24",
    passengers: "2 بالغين",
  });

  const activeDestination = siteContent.destinations[activeIndex];

  useEffect(() => {
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % siteContent.destinations.length);
    }, 5000);

    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    setFormData((current) => ({ ...current, to: activeDestination.city }));
  }, [activeDestination.city]);

  function updateField(name: string, value: string) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSearch() {
    saveBookingDraft({
      status: "draft",
      search: {
        ...formData,
        tripType: tripType as "round-trip" | "one-way",
      },
    });
    router.push("/insur");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(138,21,56,0.12),transparent_30%),linear-gradient(180deg,#fffafc_0%,#f7f1f3_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-[#d9c3cc]/50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-full bg-gradient-to-br from-[#5f0f40] to-[#8a1538] text-lg font-bold text-white">
              S
            </div>
            <div className="text-right">
              <div className="font-bold text-[#4d102f]">{siteContent.brand.name}</div>
              <div className="text-xs text-[#866474]">{siteContent.brand.tagline}</div>
            </div>
          </div>
          <nav className="hidden items-center gap-6 md:flex">
            {siteContent.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm font-semibold text-[#5b2940] transition hover:text-[#8a1538]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pt-6 md:px-8">
        <div
          className="grid min-h-[70vh] items-end gap-8 overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-[0_30px_70px_rgba(67,17,44,0.18)] md:grid-cols-[1.45fr_0.85fr] md:px-10 md:py-12"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(33, 5, 26, 0.94) 0%, rgba(33, 5, 26, 0.8) 42%, rgba(33, 5, 26, 0.2) 100%), url(${activeDestination.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-right">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#e8bbc9]">
              صور ومحتوى ديناميكي
            </p>
            <h1 className="max-w-[11ch] text-4xl font-extrabold leading-[1.05] md:text-7xl">
              سافر بأناقة إلى {activeDestination.city}
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              {activeDestination.description}
            </p>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:border-white hover:bg-white hover:text-[#5f0f40]"
                onClick={() =>
                  setActiveIndex((activeIndex + 1) % siteContent.destinations.length)
                }
              >
                تغيير الصورة
              </Button>
              <Button
                className="bg-white text-[#5f0f40] shadow-none hover:bg-[#f8e8ef]"
                asChild
              >
                <a href="#booking">ابدأ الحجز</a>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 text-right backdrop-blur-md">
            <div className="text-sm text-white/70">الوجهة الحالية</div>
            <h2 className="mt-2 text-3xl font-bold">{activeDestination.city}</h2>
            <p className="mt-1 text-white/80">{activeDestination.country}</p>
            <p className="mt-4 text-lg font-semibold">{activeDestination.price}</p>
            <div className="mt-6 flex justify-end gap-2">
              {siteContent.destinations.map((destination, index) => (
                <button
                  key={destination.id}
                  type="button"
                  aria-label={`عرض ${destination.city}`}
                  onClick={() => setActiveIndex(index)}
                  className={`h-3 w-3 rounded-full transition ${
                    index === activeIndex ? "scale-110 bg-white" : "bg-white/35"
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <section
          id="booking"
          className="rounded-[1.75rem] border border-[#eadbe1] bg-white p-5 shadow-[0_18px_45px_rgba(86,25,55,0.08)] md:p-7"
        >
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-right">
              <p className="text-xs uppercase tracking-[0.25em] text-[#9a7485]">حجز سريع</p>
              <h3 className="mt-2 text-3xl font-bold text-[#4d102f]">ابحث عن رحلتك القادمة</h3>
            </div>
            <div className="inline-flex w-fit rounded-full bg-[#f5edf0] p-1">
              <button
                type="button"
                onClick={() => setTripType("round-trip")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  tripType === "round-trip" ? "bg-[#5f0f40] text-white" : "text-[#6a4757]"
                }`}
              >
                ذهاب وعودة
              </button>
              <button
                type="button"
                onClick={() => setTripType("one-way")}
                className={`rounded-full px-4 py-2 text-sm font-semibold ${
                  tripType === "one-way" ? "bg-[#5f0f40] text-white" : "text-[#6a4757]"
                }`}
              >
                ذهاب فقط
              </button>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-5">
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">من</span>
              <input
                value={formData.from}
                onChange={(event) => updateField("from", event.target.value)}
                className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none transition focus:border-[#8a1538]"
              />
            </label>

            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">إلى</span>
              <select
                value={formData.to}
                onChange={(event) => updateField("to", event.target.value)}
                className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none transition focus:border-[#8a1538]"
              >
                {siteContent.destinations.map((destination) => (
                  <option key={destination.id} value={destination.city}>
                    {destination.city}
                  </option>
                ))}
              </select>
            </label>

            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">تاريخ المغادرة</span>
              <input
                type="date"
                value={formData.departure}
                onChange={(event) => updateField("departure", event.target.value)}
                className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none transition focus:border-[#8a1538]"
              />
            </label>

            {tripType === "round-trip" ? (
              <label className="flex flex-col gap-2 text-right">
                <span className="text-sm text-[#7e6470]">تاريخ العودة</span>
                <input
                  type="date"
                  value={formData.returnDate}
                  onChange={(event) => updateField("returnDate", event.target.value)}
                  className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none transition focus:border-[#8a1538]"
                />
              </label>
            ) : (
              <label className="flex flex-col gap-2 text-right">
                <span className="text-sm text-[#7e6470]">المسافرون</span>
                <input
                  value={formData.passengers}
                  onChange={(event) => updateField("passengers", event.target.value)}
                  className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none transition focus:border-[#8a1538]"
                />
              </label>
            )}

            <Button
              className="h-auto rounded-full py-3 text-base font-bold"
              onClick={handleSearch}
            >
              ابحث عن الرحلات
            </Button>
          </div>
        </section>

        <section
          id="destinations"
          className="rounded-[1.75rem] bg-[linear-gradient(180deg,#fffdfd,#f7f0f2)] p-5 md:p-8"
        >
          <div className="flex flex-col gap-4 text-right md:flex-row md:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-[#9a7485]">الوجهات</p>
              <h3 className="mt-2 text-3xl font-bold text-[#4d102f]">
                عدّل الاسم والمعلومات والصور من ملف واحد
              </h3>
            </div>
            <p className="max-w-2xl text-[#745866]">
              جميع بيانات الواجهة موجودة في <code className="rounded bg-white px-2 py-1 text-sm">lib/site-content.ts</code>
              ، ويمكنك لاحقاً استبدالها بقاعدة بيانات أو API.
            </p>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {siteContent.destinations.map((destination, index) => (
              <article
                key={destination.id}
                className={`overflow-hidden rounded-[1.4rem] bg-white shadow-[0_10px_30px_rgba(78,24,50,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_45px_rgba(78,24,50,0.12)] ${
                  index === activeIndex ? "ring-2 ring-[#8a1538]/20" : ""
                }`}
                onMouseEnter={() => setActiveIndex(index)}
              >
                <img
                  src={destination.image}
                  alt={destination.city}
                  className="h-56 w-full object-cover"
                />
                <div className="p-4 text-right">
                  <p className="text-sm text-[#8a6d7b]">
                    {destination.city}، {destination.country}
                  </p>
                  <h4 className="mt-1 text-2xl font-bold text-[#4d102f]">{destination.price}</h4>
                  <p className="mt-2 text-sm leading-7 text-[#6c5360]">
                    {destination.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="grid gap-5 rounded-[1.75rem] bg-[linear-gradient(135deg,#2d0a20,#5f0f40)] p-5 text-white md:grid-cols-[1fr_1fr] md:p-8">
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-[#e3b5c4]">قطر 2022</p>
            <h3 className="mt-2 text-3xl font-bold">{siteContent.featuredExperience.title}</h3>
            <p className="mt-4 leading-8 text-white/80">
              {siteContent.featuredExperience.description}
            </p>
          </div>
          <div className="grid gap-3">
            {siteContent.featuredExperience.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 text-right"
              >
                {highlight}
              </div>
            ))}
          </div>
        </section>

        <section
          id="offers"
          className="grid gap-5 rounded-[1.75rem] bg-[#4b0d31] p-5 text-white md:grid-cols-[0.9fr_1.1fr] md:p-8"
        >
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-[#e3b5c4]">العروض</p>
            <h3 className="mt-2 text-3xl font-bold">واجهة حديثة قابلة للتوسيع</h3>
            <p className="mt-4 leading-8 text-white/80">
              بنيت الصفحة الجديدة داخل نفس مشروعك الحالي، لكن بشكل أنظف وأسهل للتخصيص
              وإعادة تسمية العلامة التجارية لاحقاً.
            </p>
          </div>
          <div className="grid gap-3">
            {siteContent.offers.map((offer) => (
              <div
                key={offer}
                className="rounded-2xl border border-white/10 bg-white/10 p-4 text-right"
              >
                {offer}
              </div>
            ))}
          </div>
        </section>

        <section
          id="benefits"
          className="mb-8 grid gap-5 rounded-[1.75rem] bg-[#f0e3e8] p-5 md:grid-cols-[0.8fr_1.2fr] md:items-center md:p-8"
        >
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9a7485]">المزايا</p>
            <h3 className="mt-2 text-3xl font-bold text-[#4d102f]">بنية جاهزة للتطوير الحقيقي</h3>
            <p className="mt-4 leading-8 text-[#6d4a5b]">
              يمكنك لاحقاً ربط نموذج الحجز بـ API حقيقي، أو نقل بيانات الوجهات إلى
              لوحة تحكم بدون إعادة تصميم الواجهة.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {siteContent.benefits.map((benefit) => (
              <div
                key={benefit.label}
                className="rounded-[1.2rem] bg-white/70 p-5 text-center shadow-sm"
              >
                <strong className="block text-3xl font-extrabold text-[#4d102f]">
                  {benefit.value}
                </strong>
                <span className="mt-2 block text-sm text-[#6d4a5b]">{benefit.label}</span>
              </div>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
