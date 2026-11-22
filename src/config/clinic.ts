// Single source of truth for verified clinic facts. Anything unverified is flagged TBC.
export const clinic = {
  doctor: 'Dr. Karishma Prajapat',
  qualifications: ['MBBS', 'DNB', 'FMAS'],
  designations: [
    'Consultant Obstetrician',
    'Consultant Gynaecologist',
    'Laparoscopic Surgeon',
    'Infertility Specialist',
  ],
  hospital: 'Sujla Hospital',
  address: 'Opposite DYSP Office, Ladnun Road / Somani Road, Sujangarh, Rajasthan, India',
  phoneDisplay: '+91 95497 06060',
  phoneTel: '+919549706060',
  whatsappNumber: '919549706060',
  instagram: 'https://www.instagram.com/drkarishmagynec/',
  siteUrl: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://karishma.personal.clinic',
  timings: 'Consultation timings to be confirmed by the clinic.',
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('Sujla Hospital, Sujangarh, Rajasthan'),
} as const;

export const categories = [
  'Pregnancy care',
  'High-risk pregnancy',
  'General gynaecology',
  'Laparoscopic surgery',
  'Infertility consultation',
  'PCOS',
  'Menstrual health',
  'Uterine fibroids',
  'Menopause',
  'Other',
] as const;
