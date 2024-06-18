import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import { toast } from "sonner";

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
