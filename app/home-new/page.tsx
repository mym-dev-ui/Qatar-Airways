"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { saveBookingDraft } from "@/lib/booking-store";
import {
  cabinClassLabels,
  formatCurrency,
  getDestinationPricing,
  passengerTypeLabels,
  type CabinClass,
  type PassengerType,
  type TripType,
} from "@/lib/travel-data";
import { getLandingDestinations, readTravelDataset } from "@/lib/travel-store";

export default function HomePage() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [tripType, setTripType] = useState<TripType>("round-trip");
  const [cabinClass, setCabinClass] = useState<CabinClass>("economy");
  const [passengerType, setPassengerType] = useState<PassengerType>("adult");
  const [dataset, setDataset] = useState(readTravelDataset());
  const featuredDestinations = useMemo(() => getLandingDestinations(dataset), [dataset]);
  const activeDestination = featuredDestinations[activeIndex] || featuredDestinations[0];
  const [formData, setFormData] = useState({
    from: "عمّان",
    to: activeDestination?.city || "",
    departure: "2026-07-20",
    returnDate: "2026-07-30",
    passengers: "1 مسافر",
  });

  useEffect(() => {
    setDataset(readTravelDataset());
  }, []);

  useEffect(() => {
    if (!featuredDestinations.length) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % featuredDestinations.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [featuredDestinations.length]);

  useEffect(() => {
    if (activeDestination) {
      setFormData((current) => ({ ...current, to: activeDestination.city }));
    }
  }, [activeDestination]);

  function updateField(name: string, value: string) {
    setFormData((current) => ({ ...current, [name]: value }));
  }

  function handleSearch() {
    if (!activeDestination) return;
    saveBookingDraft({
      status: "draft",
      search: {
        ...formData,
        tripType,
        destinationId: activeDestination.id,
      },
    });
    router.push("/insur");
  }

  if (!activeDestination) return null;

  const startingPrice = getDestinationPricing(
    dataset,
    activeDestination.id,
    tripType,
    cabinClass,
    passengerType,
  );

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(138,21,56,0.12),transparent_30%),linear-gradient(180deg,#fffafc_0%,#f7f1f3_100%)] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-[#d9c3cc]/50 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-4 md:px-8">
          <Link href="/admin/travel" className="rounded-full border border-[#eadbe1] px-4 py-2 text-sm font-semibold text-[#5b2940]">
            لوحة الإدارة
          </Link>
          <div className="text-right">
            <div className="font-bold text-[#4d102f]">SkyLine Airways</div>
            <div className="text-xs text-[#866474]">نظام رحلات وحجوزات متكامل</div>
          </div>
        </div>
      </header>

      <section className="mx-auto grid max-w-7xl gap-6 px-4 pt-6 md:px-8">
        <div
          className="grid min-h-[70vh] items-end gap-8 overflow-hidden rounded-[2rem] px-6 py-8 text-white shadow-[0_30px_70px_rgba(67,17,44,0.18)] md:grid-cols-[1.45fr_0.85fr] md:px-10 md:py-12"
          style={{
            backgroundImage: `linear-gradient(90deg, rgba(33, 5, 26, 0.94) 0%, rgba(33, 5, 26, 0.8) 42%, rgba(33, 5, 26, 0.2) 100%), url(${activeDestination.image})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="text-right">
            <p className="mb-3 text-xs uppercase tracking-[0.3em] text-[#e8bbc9]">رحلات مرنة وتسعير حي</p>
            <h1 className="max-w-[12ch] text-4xl font-extrabold leading-[1.05] md:text-7xl">
              احجز إلى {activeDestination.city} بثقة
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/85 md:text-lg">
              {activeDestination.description}
            </p>
            <div className="mt-8 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <Button
                variant="outline"
                className="border-white/25 bg-white/10 text-white hover:border-white hover:bg-white hover:text-[#5f0f40]"
                onClick={() => setActiveIndex((activeIndex + 1) % featuredDestinations.length)}
              >
                تبديل الوجهة
              </Button>
              <Button className="bg-white text-[#5f0f40] shadow-none hover:bg-[#f8e8ef]" asChild>
                <a href="#booking">ابدأ الحجز</a>
              </Button>
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-white/15 bg-white/10 p-6 text-right backdrop-blur-md">
            <div className="text-sm text-white/70">الوجهة الحالية</div>
            <h2 className="mt-2 text-3xl font-bold">{activeDestination.city}</h2>
            <p className="mt-1 text-white/80">{activeDestination.country}</p>
            <p className="mt-4 text-lg font-semibold">{activeDestination.teaser}</p>
            <p className="mt-2 text-2xl font-extrabold">{formatCurrency(startingPrice)}</p>
          </div>
        </div>

        <section id="booking" className="rounded-[1.75rem] border border-[#eadbe1] bg-white p-5 shadow-[0_18px_45px_rgba(86,25,55,0.08)] md:p-7">
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.25em] text-[#9a7485]">حجز سريع</p>
            <h3 className="mt-2 text-3xl font-bold text-[#4d102f]">ابحث وحدد نوع السعر من البداية</h3>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-4">
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">من</span>
              <input value={formData.from} onChange={(event) => updateField("from", event.target.value)} className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3" />
            </label>
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">إلى</span>
              <select
                value={formData.to}
                onChange={(event) => {
                  updateField("to", event.target.value);
                  const nextIndex = featuredDestinations.findIndex((item) => item.city === event.target.value);
                  if (nextIndex >= 0) setActiveIndex(nextIndex);
                }}
                className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3"
              >
                {featuredDestinations.map((destination) => (
                  <option key={destination.id} value={destination.city}>
                    {destination.city}
                  </option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">تاريخ المغادرة</span>
              <input type="date" value={formData.departure} onChange={(event) => updateField("departure", event.target.value)} className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3" />
            </label>
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">تاريخ العودة</span>
              <input type="date" value={formData.returnDate} onChange={(event) => updateField("returnDate", event.target.value)} className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3" />
            </label>
          </div>

          <div className="mt-4 grid gap-4 md:grid-cols-4">
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">نوع الرحلة</span>
              <select value={tripType} onChange={(event) => setTripType(event.target.value as TripType)} className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3">
                <option value="round-trip">ذهاب وعودة</option>
                <option value="one-way">ذهاب فقط</option>
              </select>
            </label>
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">درجة السفر</span>
              <select value={cabinClass} onChange={(event) => setCabinClass(event.target.value as CabinClass)} className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3">
                {Object.entries(cabinClassLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <label className="flex flex-col gap-2 text-right">
              <span className="text-sm text-[#7e6470]">الفئة العمرية</span>
              <select value={passengerType} onChange={(event) => setPassengerType(event.target.value as PassengerType)} className="rounded-2xl border border-[#e7d9df] bg-[#fcfafb] px-4 py-3">
                {Object.entries(passengerTypeLabels).map(([value, label]) => (
                  <option key={value} value={value}>{label}</option>
                ))}
              </select>
            </label>
            <Button className="h-auto rounded-full py-3 text-base font-bold" onClick={handleSearch}>
              عرض الرحلات
            </Button>
          </div>
        </section>
      </section>
    </main>
  );
}
