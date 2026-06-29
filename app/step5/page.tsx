import Link from "next/link";

export default function PaymentPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-[2rem] border border-[#eadbe1] bg-[#fcf8fa] p-8">
        <p className="text-sm tracking-[0.25em] text-[#9a7485]">الخطوة 4</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">الدفع وإصدار التذكرة</h1>
        <div className="mt-8 grid gap-4">
          <input placeholder="اسم حامل البطاقة" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <input placeholder="رقم البطاقة" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <div className="grid gap-4 md:grid-cols-2">
            <input placeholder="MM/YY" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
            <input placeholder="CVV" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          </div>
        </div>
        <div className="mt-8 flex justify-between">
          <Link href="/step4" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
            رجوع
          </Link>
          <Link href="/step6" className="rounded-full bg-[#5f0f40] px-5 py-3 text-white">
            تأكيد الحجز
          </Link>
        </div>
      </div>
    </main>
  );
}
