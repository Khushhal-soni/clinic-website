import { clinic } from '../config/clinic';

export interface Faq {
  id: string;
  question: string;
  keywords: string[];
  answer: string;
}

export const DISCLAIMER = 'This assistant gives general information only, not medical advice or diagnosis.';

export const faqs: Faq[] = [
  {
    id: 'who',
    question: 'Who is Dr. Karishma?',
    keywords: ['who', 'doctor', 'karishma', 'about'],
    answer: `${clinic.doctor} is a ${clinic.designations.join(', ')} practising at ${clinic.hospital}, Sujangarh, Rajasthan.`,
  },
  {
    id: 'qual',
    question: 'What are her qualifications?',
    keywords: ['qualification', 'qualifications', 'degree', 'mbbs', 'dnb', 'fmas', 'qualified'],
    answer: 'Her qualifications are MBBS, DNB and FMAS (Fellowship in Minimal Access Surgery).',
  },
  {
    id: 'spec',
    question: 'Which specialities does she provide?',
    keywords: [
      'speciality',
      'specialities',
      'specialty',
      'services',
      'treat',
      'treatment',
      'treatments',
      'provide',
    ],
    answer:
      'Pregnancy care, high-risk pregnancy, general gynaecology, laparoscopic surgery, uterine fibroids, infertility consultation, PCOS, menstrual health, and menopause care.',
  },
  {
    id: 'where',
    question: 'Where is the clinic?',
    keywords: ['where', 'address', 'location', 'clinic', 'hospital', 'reach', 'map'],
    answer: `${clinic.hospital}, ${clinic.address}. Opening Google Maps from the Contact page gives directions.`,
  },
  {
    id: 'contact',
    question: 'How can I contact the clinic?',
    keywords: ['contact', 'phone', 'call', 'number', 'whatsapp', 'instagram'],
    answer: `Call ${clinic.phoneDisplay}, send a WhatsApp enquiry, or message on Instagram (@drkarishmagynec). ${clinic.timings}`,
  },
  {
    id: 'appt',
    question: 'How do I request an appointment?',
    keywords: ['appointment', 'book', 'booking', 'schedule', 'visit', 'consultation'],
    answer:
      'Use the appointment form on the Contact page. It opens WhatsApp with your details pre-filled. Your request is not confirmed until the clinic replies.',
  },
  {
    id: 'pcos',
    question: 'What is PCOS?',
    keywords: ['pcos', 'pcod', 'polycystic'],
    answer:
      'PCOS (polycystic ovary syndrome) is a common hormonal condition that can cause irregular periods, excess androgen effects and difficulty conceiving. It needs a clinical evaluation to diagnose and manage.',
  },
  {
    id: 'fibroids',
    question: 'What are uterine fibroids?',
    keywords: ['fibroid', 'fibroids', 'myoma'],
    answer:
      'Uterine fibroids are non-cancerous growths of the uterus. Many cause no symptoms; some cause heavy periods, pelvic pressure or pain. A gynaecologist can assess whether any treatment is needed.',
  },
  {
    id: 'pregnancy',
    question: 'What is pregnancy care?',
    keywords: ['pregnancy', 'pregnant', 'antenatal', 'prenatal', 'delivery', 'obstetric'],
    answer:
      'Pregnancy care covers regular check-ups, scans and tests, nutrition and lifestyle guidance, and planning for delivery, so mother and baby stay healthy.',
  },
];

const EMERGENCY = [
  'emergency',
  'severe pain',
  'heavy bleeding',
  'bleeding heavily',
  'unconscious',
  'seizure',
  'fits',
  'cannot breathe',
  "can't breathe",
  'no fetal movement',
  'baby not moving',
];
const MEDICAL_ADVICE = ['diagnose', 'prescribe', 'dose', 'dosage', 'medicine for', 'tablet', 'which drug'];

export interface Reply {
  text: string;
  kind: 'answer' | 'emergency' | 'refusal' | 'fallback';
}

const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s']/gu, ' ')
    .split(/\s+/)
    .filter(Boolean);

export function answerQuestion(input: string): Reply {
  const text = input.toLowerCase();
  if (EMERGENCY.some((k) => text.includes(k)))
    return {
      kind: 'emergency',
      text: `This may be an emergency. Please go to the nearest hospital or call 112 right away. Do not wait for a chat reply.`,
    };
  if (MEDICAL_ADVICE.some((k) => text.includes(k)))
    return {
      kind: 'refusal',
      text: `I can't diagnose or recommend medicines. Please consult the doctor. You can call ${clinic.phoneDisplay} or send a WhatsApp enquiry.`,
    };
  const words = new Set(tokens(input));
  let best: Faq | null = null;
  let bestScore = 0;
  for (const f of faqs) {
    const score = f.keywords.filter((k) => words.has(k)).length;
    if (score > bestScore) {
      best = f;
      bestScore = score;
    }
  }
  if (best) return { kind: 'answer', text: best.answer };
  return {
    kind: 'fallback',
    text: "I'm not sure about that. Please ask the clinic directly on WhatsApp or by phone, or pick one of the suggested questions.",
  };
}
