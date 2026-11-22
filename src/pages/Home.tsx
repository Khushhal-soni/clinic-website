import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { clinic } from '../config/clinic';
import { articles, specialities } from '../data/content';
import { CtaButtons, DoctorPhoto, SpecIcon } from '../components/ui';
import { useSeo } from '../lib/seo';

const why = [
  ['Verified qualifications', 'MBBS, DNB and FMAS (Fellowship in Minimal Access Surgery).'],
  ['Specialist focus', 'Obstetrics, gynaecology, laparoscopic surgery and infertility care.'],
  ['Comprehensive women’s healthcare', 'Care from adolescence through pregnancy to menopause.'],
  ['Patient education', 'Clear, responsible explanations to help you make informed decisions.'],
];

export default function Home() {
  useSeo(
    'Gynaecologist in Sujangarh',
    'Dr. Karishma Prajapat – obstetrician, gynaecologist, laparoscopic surgeon and infertility specialist in Sujangarh, Rajasthan.',
    '/',
  );
  return (
    <>
      <section className="bg-light-blue">
        <div className="container-x grid items-center gap-10 py-12 sm:py-20 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <p className="eyebrow text-teal-dark">Women’s Healthcare · Sujangarh</p>
            <h1 className="mt-3 text-display">Compassionate Care for Every Stage of Womanhood.</h1>
            <p className="mt-4 max-w-xl text-lead text-muted">
              {clinic.doctor} is a Consultant Obstetrician, Gynaecologist, Laparoscopic Surgeon and
              Infertility Specialist at {clinic.hospital}.
            </p>
            <p className="mt-2 font-heading text-small font-semibold text-navy">
              {clinic.qualifications.join(' · ')}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/contact#appointment" className="btn-primary">
                Book an Appointment
              </Link>
              <Link to="/specialities" className="btn-outline">
                Explore Specialities
              </Link>
            </div>
          </motion.div>
          <div className="relative mx-auto w-full max-w-sm">
            <div aria-hidden className="absolute -bottom-3 -right-3 h-full w-full rounded-lg bg-rose/40" />
            <DoctorPhoto className="relative" />
          </div>
        </div>
      </section>

      <section className="section container-x">
        <h2>Meet Your Women’s Healthcare Specialist</h2>
        <p className="mt-4 max-w-3xl text-muted">
          {clinic.doctor} ({clinic.qualifications.join(', ')}) provides care in obstetrics, gynaecology,
          laparoscopic surgery and infertility. Her approach centres on listening to you, explaining your
          options clearly and involving you in every decision.
        </p>
        <Link
          to="/about"
          className="mt-4 inline-flex items-center gap-1 font-heading font-semibold text-teal-dark underline"
        >
          Read More <ArrowRight size={16} aria-hidden />
        </Link>
      </section>

      <section className="section bg-white">
        <div className="container-x">
          <h2>Specialities</h2>
          <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {specialities.map((s) => (
              <li key={s.slug} className="card flex flex-col">
                <SpecIcon name={s.icon} className="h-7 w-7 text-teal-dark" />
                <h3 className="mt-3">{s.title}</h3>
                <p className="mt-2 flex-1 text-small text-muted">{s.short}</p>
                <Link
                  to={`/specialities/${s.slug}`}
                  className="mt-4 font-heading text-small font-semibold text-teal-dark underline"
                  aria-label={`Learn more about ${s.title}`}
                >
                  Learn More
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section container-x">
        <h2>Why Choose Dr. Karishma?</h2>
        <dl className="mt-8 grid gap-6 sm:grid-cols-2">
          {why.map(([t, d]) => (
            <div key={t} className="border-l-4 border-rose pl-4">
              <dt className="font-heading font-semibold text-navy">{t}</dt>
              <dd className="mt-1 text-small text-muted">{d}</dd>
            </div>
          ))}
        </dl>
      </section>

      <section className="section bg-light-blue">
        <div className="container-x">
          <h2>Patient Education</h2>
          <ul className="mt-8 grid gap-5 md:grid-cols-3">
            {articles.slice(0, 3).map((a) => (
              <li key={a.slug} className="card">
                <p className="eyebrow text-teal-dark">{a.category}</p>
                <h3 className="mt-2">
                  <Link to={`/patient-education/${a.slug}`} className="hover:underline">
                    {a.title}
                  </Link>
                </h3>
                <p className="mt-2 text-small text-muted">{a.summary}</p>
              </li>
            ))}
          </ul>
          <Link
            to="/patient-education"
            className="mt-6 inline-flex items-center gap-1 font-heading font-semibold text-teal-dark underline"
          >
            All articles <ArrowRight size={16} aria-hidden />
          </Link>
        </div>
      </section>

      <section className="section container-x text-center">
        <h2>Your Health Deserves Expert Attention.</h2>
        <div className="mt-6 flex justify-center">
          <CtaButtons />
        </div>
      </section>
    </>
  );
}
