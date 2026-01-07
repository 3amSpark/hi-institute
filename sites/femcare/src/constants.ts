export const WHATSAPP_PHONE = "50252810472";
export const WHATSAPP_BASE_MESSAGE =
  "¡Hola! Estoy interesada(o) en Agendar una Consulta";

export function buildWhatsAppUrl(topic?: string): string {
  const message = topic
    ? `${WHATSAPP_BASE_MESSAGE} para: ${topic}`
    : WHATSAPP_BASE_MESSAGE;
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}
