const DEFAULT_WHATSAPP_PHONE = "56975274598";

const stripPhoneDigits = (value?: string | null): string =>
  typeof value === "string" ? value.replace(/\D/g, "") : "";

const normalizeChilePhone = (value?: string | null): string => {
  const digits = stripPhoneDigits(value);
  if (!digits) return "";
  if (digits.startsWith("56")) return digits;
  if (digits.length === 9 && digits.startsWith("9")) return `56${digits}`;
  return digits;
};

export const getWhatsAppPhone = (phoneOverride?: string | null): string => {
  const envPhone = normalizeChilePhone(import.meta.env.PUBLIC_WHATSAPP_PHONE);
  const overridePhone = normalizeChilePhone(phoneOverride);
  const defaultPhone = normalizeChilePhone(DEFAULT_WHATSAPP_PHONE);
  return envPhone || overridePhone || defaultPhone;
};

/**
 * Builds a wa.me URL from a single normalized Chilean phone source.
 */
export const getWhatsAppUrl = (
  message?: string,
  phoneOverride?: string | null,
): string | null => {
  const phone = getWhatsAppPhone(phoneOverride);
  if (!phone) return null;

  const cleanMessage = typeof message === "string" ? message.trim() : "";
  const encodedMessage = cleanMessage ? encodeURIComponent(cleanMessage) : "";
  return `https://wa.me/${phone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
};

