import Link from "next/link";

const seats = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"];

export default function SeatsPage() {
  return (
    <main className="min-h-screen bg-[#f7f1f3] px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm tracking-[0.25em] text-[#9a7485]">الخطوة 3</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">اختيار المقاعد</h1>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {seats.map((seat, index) => (
            <button
              key={seat}
              className={`rounded-2xl px-4 py-6 font-bold ${
                index < 2 ? "bg-[#5f0f40] text-white" : "bg-[#f6ebef] text-[#4d102f]"
              }`}
            >
              {seat}
            </button>
          ))}
        </div>
        <div className="mt-8 flex justify-between">
          <Link href="/step3" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
            رجوع
          </Link>
          <Link href="/step5" className="rounded-full bg-[#5f0f40] px-5 py-3 text-white">
            متابعة الدفع
          </Link>
        </div>
      </div>
    </main>
  );
}
