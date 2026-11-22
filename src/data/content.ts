export interface Speciality {
  slug: string;
  title: string;
  icon: 'baby' | 'shield' | 'heart' | 'scissors' | 'sprout' | 'activity' | 'calendar' | 'circle';
  short: string;
  intro: string;
  concerns: string[];
  whenToSeek: string[];
  howHelps: string[];
}
const help = [
  'A discussion of your history and symptoms',
  'Examination and tests where clinically appropriate',
  'An explanation of the options so you can decide with the doctor',
];

export const specialities: Speciality[] = [
  {
    slug: 'pregnancy-care',
    title: 'Pregnancy Care',
    icon: 'baby',
    short: 'Antenatal check-ups and guidance from planning to delivery.',
    intro: 'Regular antenatal care helps monitor the health of mother and baby throughout pregnancy.',
    concerns: [
      'Planning a pregnancy',
      'Routine check-ups and scans',
      'Nutrition and lifestyle questions',
      'Preparing for delivery',
    ],
    whenToSeek: [
      'You think you may be pregnant',
      'You are planning to conceive',
      'You have questions about any stage of pregnancy',
    ],
    howHelps: help,
  },
  {
    slug: 'high-risk-pregnancy',
    title: 'High-Risk Pregnancy',
    icon: 'shield',
    short: 'Closer monitoring when a pregnancy needs extra attention.',
    intro:
      'A pregnancy may be considered high-risk because of the mother’s health, age, previous pregnancy history or the baby’s condition. It often needs closer follow-up.',
    concerns: [
      'Pre-existing conditions such as diabetes or high blood pressure',
      'Previous pregnancy complications',
      'Twin or multiple pregnancy',
    ],
    whenToSeek: [
      'You have a medical condition and are pregnant or planning pregnancy',
      'You were told your pregnancy needs extra monitoring',
    ],
    howHelps: help,
  },
  {
    slug: 'gynaecology',
    title: 'Gynaecology',
    icon: 'heart',
    short: 'Consultation for common women’s health concerns.',
    intro: 'General gynaecology covers the health of the female reproductive system across all ages.',
    concerns: ['Pelvic pain', 'Unusual discharge', 'Screening and routine check-ups', 'Contraception advice'],
    whenToSeek: ['You have persistent pelvic pain or unusual symptoms', 'You are due for a routine check-up'],
    howHelps: help,
  },
  {
    slug: 'laparoscopic-surgery',
    title: 'Laparoscopic Surgery',
    icon: 'scissors',
    short: 'Minimal access (keyhole) surgery, where it is suitable.',
    intro:
      'Laparoscopic, or minimal access, surgery uses small incisions. Dr. Karishma holds an FMAS fellowship in this area. Whether it is suitable depends on your condition.',
    concerns: [
      'Conditions where surgery may be discussed',
      'Understanding surgical options',
      'Preparation and recovery questions',
    ],
    whenToSeek: [
      'You were advised surgery and want a specialist opinion',
      'You want to understand the options available',
    ],
    howHelps: help,
  },
  {
    slug: 'infertility-consultation',
    title: 'Infertility Consultation',
    icon: 'sprout',
    short: 'Evaluation and guidance if conceiving is taking longer.',
    intro:
      'Infertility is commonly considered when pregnancy has not occurred after about a year of trying (sooner if over 35). Causes can involve either partner.',
    concerns: ['Difficulty conceiving', 'Irregular ovulation', 'Recurrent pregnancy loss'],
    whenToSeek: [
      'You have been trying to conceive for a year or more',
      'You are over 35 and have been trying for six months',
    ],
    howHelps: help,
  },
  {
    slug: 'pcos-management',
    title: 'PCOS Management',
    icon: 'activity',
    short: 'Evaluation and lifestyle-based and medical guidance.',
    intro:
      'PCOS is a common hormonal condition. Symptoms and severity vary and management is individualised.',
    concerns: [
      'Irregular or missed periods',
      'Acne or excess hair growth',
      'Weight concerns',
      'Difficulty conceiving',
    ],
    whenToSeek: [
      'Your periods are irregular for several months',
      'You have symptoms such as acne or excess hair growth',
    ],
    howHelps: help,
  },
  {
    slug: 'menstrual-health',
    title: 'Menstrual Health',
    icon: 'calendar',
    short: 'Support for irregular, heavy or painful periods.',
    intro: 'Periods vary between women, but significant changes are worth discussing with a doctor.',
    concerns: ['Irregular cycles', 'Heavy bleeding', 'Painful periods', 'Missed periods'],
    whenToSeek: [
      'Your cycle changes suddenly',
      'Bleeding is heavy or lasts longer than usual',
      'Pain interferes with daily life',
    ],
    howHelps: help,
  },
  {
    slug: 'uterine-fibroids',
    title: 'Uterine Fibroids',
    icon: 'circle',
    short: 'Assessment of non-cancerous growths of the uterus.',
    intro:
      'Fibroids are common, non-cancerous growths. Many need no treatment, while some cause symptoms that merit care.',
    concerns: ['Heavy periods', 'Pelvic pressure or pain', 'Frequent urination'],
    whenToSeek: [
      'You have symptoms that may relate to fibroids',
      'A scan has shown fibroids and you want advice',
    ],
    howHelps: help,
  },
];

export interface Article {
  slug: string;
  title: string;
  category: string;
  date: string;
  summary: string;
  body: string[];
  related: string[];
}
const note =
  'This article is for general education and is not a substitute for medical advice. Please consult a doctor about your own situation.';
const D = '2026-11-22';
export const articles: Article[] = [
  {
    slug: 'understanding-pcos',
    title: 'Understanding PCOS',
    category: 'Hormonal health',
    date: D,
    summary: 'What polycystic ovary syndrome is and when to seek evaluation.',
    body: [
      'PCOS is a common hormonal condition in women of reproductive age. It may cause irregular periods, acne, excess hair growth and difficulty conceiving.',
      'Diagnosis involves a clinical assessment and sometimes blood tests and an ultrasound. Lifestyle measures are often an important part of management.',
      'If your periods are irregular or you have symptoms, a gynaecologist can evaluate you.',
      note,
    ],
    related: ['irregular-menstrual-cycles', 'infertility-awareness'],
  },
  {
    slug: 'irregular-menstrual-cycles',
    title: 'Irregular Menstrual Cycles',
    category: 'Menstrual health',
    date: D,
    summary: 'Common reasons cycles vary and when to see a doctor.',
    body: [
      'Cycles can vary because of stress, weight change, thyroid conditions, PCOS and other causes.',
      'Consider an evaluation if you miss several periods, bleed very heavily, or your pattern changes suddenly.',
      note,
    ],
    related: ['understanding-pcos', 'uterine-fibroids'],
  },
  {
    slug: 'pregnancy-care',
    title: 'Pregnancy Care: What to Expect',
    category: 'Pregnancy',
    date: D,
    summary: 'Why regular antenatal visits matter.',
    body: [
      'Antenatal care typically includes regular check-ups, blood tests and ultrasound scans at recommended stages.',
      'Share any concerns at each visit and seek help promptly if you notice warning signs such as heavy bleeding, severe pain or reduced baby movements.',
      note,
    ],
    related: ['high-risk-pregnancy-awareness'],
  },
  {
    slug: 'high-risk-pregnancy-awareness',
    title: 'High-Risk Pregnancy Awareness',
    category: 'Pregnancy',
    date: D,
    summary: 'What “high-risk” means and why closer follow-up helps.',
    body: [
      'A high-risk pregnancy is one where the mother or baby may face higher chances of complications. It does not mean problems are certain.',
      'Examples include existing conditions like diabetes or hypertension, or complications in an earlier pregnancy.',
      note,
    ],
    related: ['pregnancy-care'],
  },
  {
    slug: 'uterine-fibroids',
    title: 'Uterine Fibroids Explained',
    category: 'Gynaecology',
    date: D,
    summary: 'Common, usually non-cancerous growths of the uterus.',
    body: [
      'Fibroids are muscular growths of the uterus. Many cause no symptoms.',
      'When symptoms occur, they may include heavy periods, pelvic pressure or pain. Options depend on symptoms, size and your plans for pregnancy.',
      note,
    ],
    related: ['irregular-menstrual-cycles'],
  },
  {
    slug: 'infertility-awareness',
    title: 'Infertility Awareness',
    category: 'Fertility',
    date: D,
    summary: 'When to seek help and what an initial evaluation involves.',
    body: [
      'Many couples conceive within a year of trying. If it takes longer, an evaluation of both partners can help find contributing factors.',
      'Earlier assessment is often advised for women over 35.',
      note,
    ],
    related: ['understanding-pcos'],
  },
  {
    slug: 'menopause',
    title: 'Menopause: Understanding the Change',
    category: 'Menopause',
    date: D,
    summary: 'Symptoms and support during menopause.',
    body: [
      'Menopause is the point when periods have stopped for 12 months. Hot flushes, sleep changes and mood changes are common around this time.',
      'Many options exist to ease symptoms. A doctor can help you choose what suits you.',
      note,
    ],
    related: ['post-menopausal-bleeding'],
  },
  {
    slug: 'post-menopausal-bleeding',
    title: 'Post-Menopausal Bleeding',
    category: 'Menopause',
    date: D,
    summary: 'Why any bleeding after menopause should be evaluated.',
    body: [
      'Any vaginal bleeding after menopause should be checked by a doctor, even if it is light or happens only once.',
      'It is often due to benign causes, but evaluation is needed to rule out more serious conditions.',
      note,
    ],
    related: ['menopause'],
  },
];
