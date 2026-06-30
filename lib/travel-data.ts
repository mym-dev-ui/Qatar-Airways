export type TripType = "round-trip" | "one-way";
export type CabinClass = "economy" | "business" | "first";
export type PassengerType = "adult" | "child" | "infant";
export type SeatType = "standard" | "extra-legroom" | "window" | "aisle";

export interface DestinationRecord {
  id: string;
  city: string;
  country: string;
  teaser: string;
  description: string;
  image: string;
  featured: boolean;
}

export interface FareMatrix {
  oneWay: Record<CabinClass, Record<PassengerType, number>>;
  roundTrip: Record<CabinClass, Record<PassengerType, number>>;
}

export interface DestinationPricingRecord {
  destinationId: string;
  fares: FareMatrix;
}

export interface SeatMapSeat {
  id: string;
  row: number;
  column: string;
  label: string;
  type: SeatType;
  available: boolean;
  price: number;
}

export interface PromoCodeRecord {
  code: string;
  label: string;
  type: "percentage" | "fixed";
  value: number;
  active: boolean;
  destinationIds?: string[];
  cabinClasses?: CabinClass[];
}

export interface AutoDiscountRule {
  id: string;
  label: string;
  type: "early-bird" | "destination";
  value: number;
  minDaysBeforeDeparture?: number;
  destinationIds?: string[];
}

export interface TravelDataset {
  destinations: DestinationRecord[];
  pricing: DestinationPricingRecord[];
  seatMap: SeatMapSeat[];
  promoCodes: PromoCodeRecord[];
  autoDiscounts: AutoDiscountRule[];
}

const byPassenger = (adult: number, child: number, infant: number) => ({
  adult,
  child,
  infant,
});

const byTrip = (
  economy: ReturnType<typeof byPassenger>,
  business: ReturnType<typeof byPassenger>,
  first: ReturnType<typeof byPassenger>,
) => ({
  economy,
  business,
  first,
});

export const defaultTravelDataset: TravelDataset = {
  destinations: [
    {
      id: "london",
      city: "لندن",
      country: "المملكة المتحدة",
      teaser: "أناقة ملكية وأسواق راقية",
      description: "رحلات فاخرة إلى قلب لندن مع خيارات تسوق ومتاحف وفنادق تاريخية.",
      image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=1600&q=80",
      featured: true,
    },
    {
      id: "istanbul",
      city: "إسطنبول",
      country: "تركيا",
      teaser: "تاريخ حي يلتقي بالتسوق",
      description: "مدينة تجمع البوسفور والأسواق الكبرى والمطاعم الحديثة ضمن رحلة مباشرة مريحة.",
      image: "https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?auto=format&fit=crop&w=1600&q=80",
      featured: true,
    },
    {
      id: "paris",
      city: "باريس",
      country: "فرنسا",
      teaser: "فنون ومطاعم وتجربة أوروبية",
      description: "خطوط سفر راقية إلى باريس مع درجات مرنة وخيارات عائلية للأعمار المختلفة.",
      image: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1600&q=80",
      featured: true,
    },
    {
      id: "doha",
      city: "الدوحة",
      country: "قطر",
      teaser: "ضيافة قطرية ومشهد عصري",
      description: "وجهة متميزة للفعاليات والأعمال مع باقات مرنة ومقاعد مختارة.",
      image: "https://images.unsplash.com/photo-1578894381163-e72c17f2d45f?auto=format&fit=crop&w=1600&q=80",
      featured: false,
    },
  ],
  pricing: [
    {
      destinationId: "london",
      fares: {
        oneWay: byTrip(byPassenger(1320, 980, 390), byPassenger(2890, 2140, 720), byPassenger(4110, 3090, 990)),
        roundTrip: byTrip(byPassenger(2480, 1840, 650), byPassenger(5420, 4060, 1280), byPassenger(7890, 5940, 1890)),
      },
    },
    {
      destinationId: "istanbul",
      fares: {
        oneWay: byTrip(byPassenger(840, 620, 220), byPassenger(1850, 1380, 440), byPassenger(2790, 2080, 660)),
        roundTrip: byTrip(byPassenger(1560, 1140, 390), byPassenger(3480, 2610, 790), byPassenger(5240, 3920, 1240)),
      },
    },
    {
      destinationId: "paris",
      fares: {
        oneWay: byTrip(byPassenger(1210, 910, 320), byPassenger(2720, 2040, 610), byPassenger(3980, 2990, 910)),
        roundTrip: byTrip(byPassenger(2280, 1710, 590), byPassenger(5080, 3810, 1170), byPassenger(7420, 5570, 1710)),
      },
    },
    {
      destinationId: "doha",
      fares: {
        oneWay: byTrip(byPassenger(690, 520, 180), byPassenger(1510, 1130, 360), byPassenger(2260, 1690, 540)),
        roundTrip: byTrip(byPassenger(1280, 960, 320), byPassenger(2860, 2140, 680), byPassenger(4290, 3210, 1020)),
      },
    },
  ],
  seatMap: Array.from({ length: 6 }, (_, rowIndex) => {
    const row = rowIndex + 1;
    return ["A", "B", "C", "D", "E", "F"].map((column) => {
      const type: SeatType =
        row <= 2 ? "extra-legroom" : column === "A" || column === "F" ? "window" : column === "C" || column === "D" ? "aisle" : "standard";
      const price =
        type === "extra-legroom" ? 180 : type === "window" || type === "aisle" ? 45 : 0;

      return {
        id: `${row}${column}`,
        row,
        column,
        label: `${row}${column}`,
        type,
        available: !["2C", "3D"].includes(`${row}${column}`),
        price,
      };
    });
  }).flat(),
  promoCodes: [
    {
      code: "LONDON10",
      label: "خصم حصري على لندن",
      type: "percentage",
      value: 10,
      active: true,
      destinationIds: ["london"],
    },
    {
      code: "SKY200",
      label: "خصم ثابت على السلة",
      type: "fixed",
      value: 200,
      active: true,
    },
  ],
  autoDiscounts: [
    {
      id: "early-bird",
      label: "خصم 10% للحجز المبكر",
      type: "early-bird",
      value: 10,
      minDaysBeforeDeparture: 45,
    },
    {
      id: "istanbul-special",
      label: "عرض إسطنبول الحصري",
      type: "destination",
      value: 8,
      destinationIds: ["istanbul"],
    },
  ],
};

export const cabinClassLabels: Record<CabinClass, string> = {
  economy: "السياحية",
  business: "رجال الأعمال",
  first: "الأولى",
};

export const passengerTypeLabels: Record<PassengerType, string> = {
  adult: "بالغ",
  child: "طفل",
  infant: "رضيع",
};

export const seatTypeLabels: Record<SeatType, string> = {
  standard: "مقعد مجاني",
  "extra-legroom": "مساحة أرجل إضافية",
  window: "نافذة",
  aisle: "ممر",
};

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("ar-QA", {
    style: "currency",
    currency: "QAR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getDestinationPricing(
  dataset: TravelDataset,
  destinationId: string,
  tripType: TripType,
  cabinClass: CabinClass,
  passengerType: PassengerType,
) {
  const pricing = dataset.pricing.find((item) => item.destinationId === destinationId);
  if (!pricing) return 0;
  return pricing.fares[tripType === "one-way" ? "oneWay" : "roundTrip"][cabinClass][passengerType];
}

export function getFeaturedDestinations(dataset: TravelDataset) {
  return dataset.destinations.filter((destination) => destination.featured);
}
