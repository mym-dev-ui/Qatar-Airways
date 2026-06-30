"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import {
  confirmBooking,
  formatCardNumber,
  readBookingDraft,
  saveBookingDraft,
  validatePayment,
  type PaymentDetails,
} from "@/lib/booking-store";
import { formatCurrency } from "@/lib/travel-data";
import { readTravelDataset } from "@/lib/travel-store";

const defaultPayment: PaymentDetails = {
  cardholderName: "",
  cardNumber: "",
  expiry: "",
  cvv: "",
};

const extrasPricing: Record<string, number> = {
  "أمتعة إضافية": 160,
  "دخول الصالة": 220,
  "إنترنت على متن الطائرة": 55,
  "وجبة خاصة": 35,
};

export default function PaymentPage() {
  const router = useRouter();
  const dataset = useMemo(() => readTravelDataset(), []);
  const [payment, setPayment] = useState<PaymentDetails>(defaultPayment);
  const [promoCode, setPromoCode] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [summary, setSummary] = useState({
    route: "",
    baseFare: 0,
    seatFee: 0,
    extrasTotal: 0,
    taxes: 220,
    departure: "",
    destinationId: "",
  });

  const autoDiscounts = useMemo(() => {
    const booking = readBookingDraft();
    const departureDate = booking.search?.departure ? new Date(booking.search.departure) : null;
    const base = summary.baseFare + summary.extrasTotal + summary.seatFee;
    return dataset.autoDiscounts
      .filter((rule) => {
        if (rule.type === "early-bird" && departureDate) {
          const diffDays = Math.ceil((departureDate.getTime() - Date.now()) / 86400000);
          return diffDays >= (rule.minDaysBeforeDeparture || 0);
        }
        if (rule.type === "destination") {
          return rule.destinationIds?.includes(summary.destinationId);
        }
        return false;
      })
      .map((rule) => ({
        label: rule.label,
        amount: Math.round(base * (rule.value / 100)),
      }));
  }, [dataset.autoDiscounts, summary.baseFare, summary.destinationId, summary.extrasTotal, summary.seatFee]);

  const appliedPromo = useMemo(() => {
    const booking = readBookingDraft();
    const promo = dataset.promoCodes.find((item) => item.code === promoCode.trim().toUpperCase() && item.active);
    if (!promo) return null;
    if (promo.destinationIds?.length && !promo.destinationIds.includes(booking.flight?.destinationId || "")) return null;
    return promo;
  }, [dataset.promoCodes, promoCode]);

  const total = useMemo(() => {
    const subtotal = summary.baseFare + summary.extrasTotal + summary.seatFee;
    const promoDiscount = appliedPromo
      ? appliedPromo.type === "percentage"
        ? Math.round(subtotal * (appliedPromo.value / 100))
        : appliedPromo.value
      : 0;
    const autoDiscountTotal = autoDiscounts.reduce((sum, item) => sum + item.amount, 0);
    const discountTotal = promoDiscount + autoDiscountTotal;
    return {
      subtotal,
      promoDiscount,
      autoDiscountTotal,
      discountTotal,
      grandTotal: Math.max(subtotal + summary.taxes - discountTotal, 0),
    };
  }, [appliedPromo, autoDiscounts, summary.baseFare, summary.extrasTotal, summary.seatFee, summary.taxes]);

  useEffect(() => {
    const booking = readBookingDraft();
    if (!booking.passenger || !booking.flight) {
      router.replace("/step2");
      return;
    }

    const extrasTotal = (booking.extras || []).reduce((sum, extra) => sum + (extrasPricing[extra] || 0), 0);
    const seatFee = booking.seatSelection?.price || 0;
    setPromoCode(booking.promoCode || "");
    setSummary({
      route: `${booking.search?.from || ""} ← ${booking.flight.destinationCity}`,
      baseFare: booking.flight.baseFare || 0,
      seatFee,
      extrasTotal,
      taxes: 220,
      departure: booking.search?.departure || "",
      destinationId: booking.flight.destinationId,
    });
  }, [router]);

  function updateField(name: keyof PaymentDetails, value: string) {
    if (name === "cardNumber") value = formatCardNumber(value);
    if (name === "expiry") {
      const digits = value.replace(/\D/g, "").slice(0, 4);
      value = digits.length > 2 ? `${digits.slice(0, 2)}/${digits.slice(2)}` : digits;
    }
    if (name === "cvv") value = value.replace(/\D/g, "").slice(0, 4);
    setPayment((current) => ({ ...current, [name]: value }));
  }

  function handleConfirm() {
    const validationError = validatePayment(payment);
    if (validationError) {
      setError(validationError);
      return;
    }

    saveBookingDraft({
      promoCode: promoCode.trim().toUpperCase(),
      promoDiscount: total.promoDiscount,
      appliedPromo,
      autoDiscounts,
      totals: {
        baseFare: summary.baseFare,
        extrasTotal: summary.extrasTotal,
        seatTotal: summary.seatFee,
        taxes: summary.taxes,
        subtotal: total.subtotal,
        discountTotal: total.discountTotal,
        grandTotal: total.grandTotal,
      },
    });

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
            <div className="rounded-[1.5rem] border border-dashed border-[#d7c0ca] bg-white p-4">
              <label className="text-right">
                <span className="mb-2 block text-sm text-[#7e6470]">كود الخصم</span>
                <input value={promoCode} onChange={(event) => setPromoCode(event.target.value.toUpperCase())} placeholder="مثال: LONDON10" className="w-full rounded-2xl border border-[#e7d9df] px-4 py-3" />
              </label>
              <p className="mt-2 text-sm text-[#8a6d7b]">
                {appliedPromo ? `تم تفعيل ${appliedPromo.label}` : "يمكنك إدخال كود خصم صالح في صفحة الدفع."}
              </p>
            </div>
          </div>

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
          <div className="mt-3 text-white/80">السعر الأساسي: {formatCurrency(summary.baseFare)}</div>
          <div className="mt-2 text-white/80">رسوم المقعد: {formatCurrency(summary.seatFee)}</div>
          <div className="mt-2 text-white/80">الخدمات الإضافية: {formatCurrency(summary.extrasTotal)}</div>
          <div className="mt-2 text-white/80">الضرائب والرسوم: {formatCurrency(summary.taxes)}</div>
          {autoDiscounts.map((item) => (
            <div key={item.label} className="mt-2 text-[#d8f3e5]">{item.label}: -{formatCurrency(item.amount)}</div>
          ))}
          {appliedPromo ? (
            <div className="mt-2 text-[#d8f3e5]">كود الخصم: -{formatCurrency(total.promoDiscount)}</div>
          ) : null}
          <div className="mt-6 rounded-2xl bg-white/10 p-5">
            <div className="text-sm text-white/70">الإجمالي</div>
            <div className="mt-2 text-3xl font-extrabold">{formatCurrency(total.grandTotal)}</div>
          </div>
        </aside>
      </div>
    </main>
  );
}
