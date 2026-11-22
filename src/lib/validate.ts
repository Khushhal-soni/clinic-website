import { categories } from '../config/clinic';
import type { Enquiry } from './whatsapp';

export type Errors = Partial<Record<keyof Enquiry | 'consent', string>>;

export function normaliseMobile(raw: string): string {
  const digits = raw
    .replace(/[\s\-()]/g, '')
    .replace(/^\+?91/, '')
    .replace(/^0/, '');
  return digits;
}

export function todayISO(d = new Date()): string {
  const off = d.getTimezoneOffset() * 60000;
  return new Date(d.getTime() - off).toISOString().slice(0, 10);
}

export function validateEnquiry(e: Enquiry, consent: boolean, today = todayISO()): Errors {
  const errors: Errors = {};
  const name = e.name.trim();
  if (name.length < 2 || name.length > 60 || !/^[\p{L}][\p{L} .'-]*$/u.test(name))
    errors.name = 'Enter your name (letters only, 2–60 characters).';
  if (!/^[6-9]\d{9}$/.test(normaliseMobile(e.mobile)))
    errors.mobile = 'Enter a valid 10-digit Indian mobile number.';
  if (!/^\d{4}-\d{2}-\d{2}$/.test(e.date) || e.date < today) errors.date = 'Choose today or a future date.';
  if (!(categories as readonly string[]).includes(e.category))
    errors.category = 'Select a consultation type.';
  if ((e.message ?? '').length > 300) errors.message = 'Please keep the note under 300 characters.';
  if (!consent) errors.consent = 'Please agree to open WhatsApp with this message.';
  return errors;
}
