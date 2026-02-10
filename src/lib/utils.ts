import { getWhatsAppUrl } from "../config/contact";

export const buildWhatsAppLink = (phone?: string, message?: string): string | null =>
  getWhatsAppUrl(message, phone);

export const formatCLP = (value: number) =>
  value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });
