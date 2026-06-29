export default function ManageBookingPage() {
  return (
    <main className="min-h-screen bg-[#f7f1f3] px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-3xl rounded-[2rem] bg-white p-8 shadow-[0_18px_45px_rgba(86,25,55,0.08)]">
        <p className="text-sm tracking-[0.25em] text-[#9a7485]">إدارة الحجز</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">استعرض أو عدّل رحلتك</h1>
        <p className="mt-3 text-[#6d4a5b]">
          أدخل رقم الحجز والبريد الإلكتروني للوصول إلى تفاصيل الرحلة، المقاعد، الأمتعة،
          أو طلب تغيير التاريخ.
        </p>

        <div className="mt-8 grid gap-4">
          <input
            placeholder="رقم الحجز"
            className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none"
          />
          <input
            placeholder="البريد الإلكتروني"
            className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3 outline-none"
          />
          <button className="rounded-full bg-[#5f0f40] px-5 py-3 font-semibold text-white">
            عرض الحجز
          </button>
        </div>
      </div>
    </main>
  );
}
