import { toast } from "sonner";
import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";

import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import { pt } from "date-fns/locale";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function convertAmountFromMiliunits(amount: number) {
  return amount / 1000;
}

export function convertAmountToMiliunits(amount: number) {
  return amount * 1000;
}

export function formatCurrency(value: number) {
  // const finalValue = convertAmountFromMiliunits(value);
  //? now, I append the correct value on the API side.

  return Intl.NumberFormat("pt-PT", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(value);
}

export function toastAlert(message: string, type: "success" | "danger") {
  if (type === "success") {
    toast.success(message, { richColors: true });
  } else {
    toast.error(message, { richColors: true });
  }
}

export function calculatePercentageChange(current: number, previous: number) {
  if (previous === 0) {
    return previous === current ? 0 : 100;
  }

  return ((current - previous) / previous) * 1000;
}

export function fillMissingDays(
  activeDays: {
    date: Date;
    income: number;
    expenses: number;
  }[],
  startDate: Date,
  endDate: Date
) {
  if (activeDays.length === 0) {
    return [];
  }

  const allDays = eachDayOfInterval({ start: startDate, end: endDate });

  const transactionsByDay = allDays.map((day) => {
    const found = activeDays.find((d) => isSameDay(d.date, day));

    if (found) {
      return found;
    } else {
      return {
        date: day,
        income: 0,
        expenses: 0,
      };
    }
  });

  return transactionsByDay;
}

type Period = {
  from: string | Date | undefined;
  to: string | Date | undefined;
};

export function formatDateRange(period?: Period) {
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, 30);

  if (!period?.from) {
    return `${format(defaultFrom, "d MMMM", { locale: pt })} — ${format(
      defaultTo,
      "d MMMM y",
      { locale: pt }
    )}`;
  }

  if (period.to) {
    return `${format(period.from, "d MMMM", { locale: pt })} — ${format(
      period.to,
      "d MMMM y",
      { locale: pt }
    )}`;
  }

  return format(period.from, "d MMMM y", { locale: pt });
}

export function formatPercentage(
  value: number,
  options: { addPrefix?: boolean } = {
    addPrefix: false,
  }
) {
  const result = new Intl.NumberFormat("pt-PT", {
    style: "percent",
  }).format(value / 100);

  if (options.addPrefix && value > 0) {
    return `+${result}`;
  }

  return result;
}
