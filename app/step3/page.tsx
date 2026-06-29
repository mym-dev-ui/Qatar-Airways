import Link from "next/link";

const extras = ["أمتعة إضافية", "دخول الصالة", "إنترنت على متن الطائرة", "وجبة خاصة"];

export default function ExtrasPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-[#fcf8fa] p-8">
        <p className="text-sm tracking-[0.25em] text-[#9a7485]">الخطوة 2</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">الخدمات الإضافية</h1>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {extras.map((extra) => (
            <label key={extra} className="flex items-center justify-between rounded-2xl border border-[#eadbe1] bg-white p-5">
              <span className="font-semibold text-[#4d102f]">{extra}</span>
              <input type="checkbox" className="h-5 w-5 accent-[#8a1538]" />
            </label>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <Link href="/compar" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
            رجوع
          </Link>
          <Link href="/step4" className="rounded-full bg-[#5f0f40] px-5 py-3 text-white">
            متابعة
          </Link>
        </div>
      </div>
    </main>
  );
}
