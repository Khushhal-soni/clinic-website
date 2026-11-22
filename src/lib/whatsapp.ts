import { clinic } from '../config/clinic';

export function buildWhatsAppUrl(message: string, number: string = clinic.whatsappNumber): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export interface Enquiry {
  name: string;
  mobile: string;
  date: string;
  category: string;
  message?: string;
}

export function buildEnquiryMessage(e: Enquiry): string {
  const lines = [
    `Hello ${clinic.doctor}'s clinic, I would like to request an appointment.`,
    `Name: ${e.name.trim()}`,
    `Mobile: ${e.mobile}`,
    `Preferred date: ${e.date}`,
    `Consultation type: ${e.category}`,
  ];
  if (e.message?.trim()) lines.push(`Note: ${e.message.trim()}`);
  lines.push('(Request sent via website; not confirmed until the clinic replies.)');
  return lines.join('\n');
}

export const generalEnquiryUrl = () =>
  buildWhatsAppUrl(`Hello, I would like to enquire about a consultation with ${clinic.doctor}.`);
