export const buildWhatsAppLink = (phone: string, message?: string) => {
  const normalized = phone.replace(/[^0-9]/g, "");
  const encoded = message ? encodeURIComponent(message) : "";
  return `https://wa.me/${normalized}${encoded ? `?text=${encoded}` : ""}`;
};

export const formatCLP = (value: number) =>
  value.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    maximumFractionDigits: 0
  });
