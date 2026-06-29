import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <main className="min-h-screen bg-[#f7f1f3] px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-10 text-center shadow-[0_18px_45px_rgba(86,25,55,0.08)]">
        <div className="mx-auto grid h-20 w-20 place-items-center rounded-full bg-[#e8f6ef] text-3xl text-[#128a52]">
          ✓
        </div>
        <h1 className="mt-6 text-4xl font-bold text-[#4d102f]">تم تأكيد الحجز</h1>
        <p className="mt-4 leading-8 text-[#6d4a5b]">
          تم إصدار التذكرة بنجاح. يمكنك الآن إدارة رحلتك أو مراجعة تفاصيل الحجز من
          صفحة إدارة الحجز.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/check" className="rounded-full bg-[#5f0f40] px-5 py-3 text-white">
            إدارة الحجز
          </Link>
          <Link href="/" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
            العودة للرئيسية
          </Link>
        </div>
      </div>
    </main>
  );
}
