import Link from "next/link";

export default function PassengerDetailsPage() {
  return (
    <main className="min-h-screen bg-[#fcf6f8] px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm tracking-[0.25em] text-[#9a7485]">الخطوة 1</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">بيانات المسافرين</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <input placeholder="الاسم الأول" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <input placeholder="اسم العائلة" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <input placeholder="البريد الإلكتروني" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <input placeholder="رقم الهاتف" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <input placeholder="الجنسية" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
          <input placeholder="رقم الجواز" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
        </div>
        <div className="mt-8 flex justify-between">
          <Link href="/insur" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
            رجوع
          </Link>
          <Link href="/step3" className="rounded-full bg-[#5f0f40] px-5 py-3 text-white">
            متابعة
          </Link>
        </div>
      </div>
    </main>
  );
}
