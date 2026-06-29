import Link from "next/link";
import { siteContent } from "@/lib/site-content";

export default function SearchResultsPage() {
  return (
    <main className="min-h-screen bg-[#fcf6f8] px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 text-right">
          <p className="text-sm tracking-[0.25em] text-[#9a7485]">نتائج البحث</p>
          <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">اختر رحلتك القادمة</h1>
          <p className="mt-3 text-[#6d4a5b]">
            هذه الصفحة تعرض الرحلات المتاحة وتفاصيلها ضمن تدفق حجز طيران كامل.
          </p>
        </div>

        <div className="grid gap-4">
          {siteContent.destinations.map((destination, index) => (
            <article
              key={destination.id}
              className="grid gap-4 rounded-[1.6rem] border border-[#eadbe1] bg-white p-5 shadow-sm md:grid-cols-[220px_1fr_auto]"
            >
              <img
                src={destination.image}
                alt={destination.city}
                className="h-44 w-full rounded-[1.2rem] object-cover"
              />
              <div className="text-right">
                <p className="text-sm text-[#8a6d7b]">
                  {destination.city}، {destination.country}
                </p>
                <h2 className="mt-1 text-2xl font-bold text-[#4d102f]">
                  {index % 2 === 0 ? "رحلة مباشرة" : "رحلة مع توقف قصير"}
                </h2>
                <p className="mt-2 text-[#6d4a5b]">{destination.description}</p>
                <div className="mt-4 flex flex-wrap justify-end gap-2 text-sm text-[#6d4a5b]">
                  <span className="rounded-full bg-[#f5edf0] px-3 py-1">أمتعة 30 كغ</span>
                  <span className="rounded-full bg-[#f5edf0] px-3 py-1">وجبات مجانية</span>
                  <span className="rounded-full bg-[#f5edf0] px-3 py-1">اختيار مقعد</span>
                </div>
              </div>
              <div className="flex flex-col justify-between text-right">
                <div>
                  <div className="text-sm text-[#8a6d7b]">السعر</div>
                  <div className="text-2xl font-bold text-[#4d102f]">{destination.price}</div>
                </div>
                <Link
                  href="/step2"
                  className="rounded-full bg-[#5f0f40] px-5 py-3 text-center font-semibold text-white transition hover:bg-[#7b124d]"
                >
                  متابعة الحجز
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </main>
  );
}
