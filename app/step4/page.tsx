"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { readBookingDraft, saveBookingDraft } from "@/lib/booking-store";

const seats = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"];

export default function SeatsPage() {
  const router = useRouter();
  const [selectedSeat, setSelectedSeat] = useState("1A");

  useEffect(() => {
    const booking = readBookingDraft();
    if (!booking.passenger) {
      router.replace("/step2");
      return;
    }
    setSelectedSeat(booking.seat || "1A");
  }, [router]);

  function handleContinue() {
    saveBookingDraft({ seat: selectedSeat });
    router.push("/step5");
  }

  return (
    <main className="min-h-screen bg-[#f7f1f3] px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto max-w-4xl rounded-[2rem] bg-white p-8 shadow-sm">
        <p className="text-sm tracking-[0.25em] text-[#9a7485]">الخطوة 3</p>
        <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">اختيار المقاعد</h1>
        <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
          {seats.map((seat) => (
            <button
              key={seat}
              type="button"
              onClick={() => setSelectedSeat(seat)}
              className={`rounded-2xl px-4 py-6 font-bold ${
                selectedSeat === seat ? "bg-[#5f0f40] text-white" : "bg-[#f6ebef] text-[#4d102f]"
              }`}
            >
              {seat}
            </button>
          ))}
        </div>
        <div className="mt-4 text-right text-sm text-[#6d4a5b]">المقعد المختار: {selectedSeat}</div>
        <div className="mt-8 flex justify-between">
          <Link href="/step3" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
            رجوع
          </Link>
          <button onClick={handleContinue} className="rounded-full bg-[#5f0f40] px-5 py-3 text-white">
            متابعة الدفع
          </button>
        </div>
      </div>
    </main>
  );
}
