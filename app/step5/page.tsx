"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  confirmBooking,
  formatCardNumber,
  readBookingDraft,
  validatePayment,
  type PaymentDetails,
} from "@/lib/booking-store";

const defaultPayment: PaymentDetails = {
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

export default function PaymentPage() {
  const router = useRouter();
  const [payment, setPayment] = useState<PaymentDetails>(defaultPayment);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState({
    route: "",
    fare: "",
    seat: "",
  });

  useEffect(() => {
    const booking = readBookingDraft();
    if (!booking.passenger || !booking.flight) {
      router.replace("/step2");
      return;
    }

    setSummary({
      route: `${booking.search?.from || ""} ← ${booking.flight.destinationCity}`,
      fare: booking.flight.farePrice,
      seat: booking.seat || "1A",
    });
  }, [router]);

  const total = useMemo(() => {
    const digits = summary.fare.replace(/[^\d]/g, "");
    const base = Number(digits || "0");
    return `${base + 220} ر.ق`;
  }, [summary.fare]);

  function updateField(name: keyof PaymentDetails, value: string) {
    if (name === "cardNumber") {
      value = formatCardNumber(value);
    }
    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }
    if (name === "cvv") {
      value = value.replace(/\D/g, "").slice(0, 4);
    }
    setPayment((current) => ({ ...current, [name]: value }));
  }

  function handleConfirm() {
    const validationError = validatePayment(payment);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSubmitting(true);
    const booking = confirmBooking(payment);
    if (!booking) {
      setError("تعذر إنشاء الحجز");
      setSubmitting(false);
      return;
    }

    router.push("/step6");
  }

  return (
    <main className="min-h-screen bg-white px-4 py-10 md:px-8" dir="rtl">
      <div className="mx-auto grid max-w-6xl gap-6 md:grid-cols-[1.1fr_0.8fr]">
        <div className="rounded-[2rem] border border-[#eadbe1] bg-[#fcf8fa] p-8">
          <p className="text-sm tracking-[0.25em] text-[#9a7485]">الخطوة 4</p>
          <h1 className="mt-2 text-4xl font-bold text-[#4d102f]">الدفع بالبطاقة وإصدار التذكرة</h1>
          <div className="mt-8 grid gap-4">
            <input value={payment.cardholderName} onChange={(event) => updateField("cardholderName", event.target.value)} placeholder="اسم حامل البطاقة" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
            <input value={payment.cardNumber} onChange={(event) => updateField("cardNumber", event.target.value)} placeholder="رقم البطاقة" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
            <div className="grid gap-4 md:grid-cols-2">
              <input value={payment.expiry} onChange={(event) => updateField("expiry", event.target.value)} placeholder="MM/YY" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
              <input value={payment.cvv} onChange={(event) => updateField("cvv", event.target.value)} placeholder="CVV" className="rounded-2xl border border-[#e7d9df] px-4 py-3" />
            </div>
          </div>
          <p className="mt-3 text-right text-sm text-[#8a6d7b]">
            هذه بوابة دفع تجريبية داخل الموقع تحفظ آخر 4 أرقام فقط مع الحجز.
          </p>
          {error ? <p className="mt-4 text-right text-sm text-red-600">{error}</p> : null}
          <div className="mt-8 flex justify-between">
            <Link href="/step4" className="rounded-full border border-[#d7c0ca] px-5 py-3 text-[#5f0f40]">
              رجوع
            </Link>
            <button onClick={handleConfirm} disabled={submitting} className="rounded-full bg-[#5f0f40] px-5 py-3 text-white disabled:opacity-60">
              {submitting ? "جارٍ التأكيد..." : "تأكيد الحجز"}
            </button>
          </div>
        </div>

        <aside className="rounded-[2rem] bg-[#4b0d31] p-8 text-white">
          <div className="text-sm text-white/70">ملخص الحجز</div>
          <div className="mt-4 text-2xl font-bold">{summary.route || "رحلتك"}</div>
          <div className="mt-2 text-white/80">المقعد: {summary.seat}</div>
          <div className="mt-2 text-white/80">السعر الأساسي: {summary.fare}</div>
          <div className="mt-2 text-white/80">الضرائب والرسوم: 220 ر.ق</div>
          <div className="mt-6 rounded-2xl bg-white/10 p-5">
            <div className="text-sm text-white/70">الإجمالي</div>
            <div className="mt-2 text-3xl font-extrabold">{total}</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
