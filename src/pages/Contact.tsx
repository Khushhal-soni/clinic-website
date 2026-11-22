import { useEffect, useState, type FormEvent } from 'react';
import { useLocation } from 'react-router-dom';
import { ExternalLink, MapPin, Phone } from 'lucide-react';
import { categories, clinic } from '../config/clinic';
import { buildEnquiryMessage, buildWhatsAppUrl, generalEnquiryUrl, type Enquiry } from '../lib/whatsapp';
import { normaliseMobile, todayISO, validateEnquiry, type Errors } from '../lib/validate';
import { InstagramIcon, PageHeader } from '../components/ui';
import { useSeo } from '../lib/seo';

const empty: Enquiry = { name: '', mobile: '', date: '', category: '', message: '' };

export default function Contact() {
  useSeo(
    'Contact & Appointment Enquiry',
    'Contact Dr. Karishma Prajapat at Sujla Hospital, Sujangarh. Call, WhatsApp or send an appointment enquiry.',
    '/contact',
  );
  const [form, setForm] = useState<Enquiry>(empty);
  const [consent, setConsent] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const { hash } = useLocation();
  useEffect(() => {
    if (hash) document.getElementById(hash.slice(1))?.scrollIntoView();
  }, [hash]);

  const set = (k: keyof Enquiry) => (e: { target: { value: string } }) =>
    setForm({ ...form, [k]: e.target.value });
  const submit = (e: FormEvent) => {
    e.preventDefault();
    const errs = validateEnquiry(form, consent);
    setErrors(errs);
    setSent(false);
    if (Object.keys(errs).length) return;
    const url = buildWhatsAppUrl(buildEnquiryMessage({ ...form, mobile: normaliseMobile(form.mobile) }));
    window.open(url, '_blank', 'noopener,noreferrer');
    setSent(true);
  };
  const field = (id: keyof Errors, label: string, el: React.ReactNode) => (
    <div>
      <label htmlFor={id} className="block text-small font-medium">
        {label}
      </label>
      {el}
      {errors[id] && (
        <p id={`${id}-err`} role="alert" className="mt-1 text-small text-red-700">
          {errors[id]}
        </p>
      )}
    </div>
  );
  const inp = 'mt-1 min-h-[44px] w-full rounded-md border border-slate-300 bg-white px-3';
  const aria = (id: keyof Errors) => ({
    'aria-invalid': !!errors[id],
    'aria-describedby': errors[id] ? `${id}-err` : undefined,
  });

  return (
    <>
      <PageHeader title="Contact & Appointment" />
      <div className="container-x section grid gap-10 lg:grid-cols-2">
        <section aria-labelledby="clinic-h">
          <h2 id="clinic-h">{clinic.hospital}</h2>
          <address className="mt-4 space-y-3 not-italic text-muted">
            <p className="flex gap-2">
              <MapPin className="shrink-0 text-teal-dark" aria-hidden /> {clinic.address}
            </p>
            <p className="flex gap-2">
              <Phone className="shrink-0 text-teal-dark" aria-hidden />
              <a className="underline" href={`tel:${clinic.phoneTel}`}>
                {clinic.phoneDisplay}
              </a>
            </p>
            <p className="flex gap-2">
              <span className="shrink-0 text-teal-dark">
                <InstagramIcon size={24} />
              </span>
              <a className="underline" href={clinic.instagram} target="_blank" rel="noopener noreferrer">
                @drkarishmagynec
              </a>
            </p>
            <p>{clinic.timings}</p>
          </address>
          <div className="mt-5 flex flex-wrap gap-3">
            <a className="btn-outline" href={clinic.mapsUrl} target="_blank" rel="noopener noreferrer">
              <ExternalLink size={16} aria-hidden /> Open in Google Maps
            </a>
            <a className="btn-outline" href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer">
              WhatsApp Enquiry
            </a>
          </div>
        </section>

        <section id="appointment" aria-labelledby="appt-h" className="card scroll-mt-24">
          <h2 id="appt-h">Appointment Enquiry</h2>
          <p className="mt-2 text-small text-muted">
            This sends a pre-filled WhatsApp message to the clinic.{' '}
            <strong>
              Nothing is saved on this website, and your appointment is not confirmed until the clinic
              replies.
            </strong>{' '}
            Please do not share detailed medical information here.
          </p>
          <form noValidate onSubmit={submit} className="mt-5 space-y-4">
            {field(
              'name',
              'Patient name',
              <input
                id="name"
                autoComplete="name"
                className={inp}
                value={form.name}
                onChange={set('name')}
                {...aria('name')}
              />,
            )}
            {field(
              'mobile',
              'Mobile number',
              <input
                id="mobile"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                className={inp}
                value={form.mobile}
                onChange={set('mobile')}
                {...aria('mobile')}
              />,
            )}
            {field(
              'date',
              'Preferred date',
              <input
                id="date"
                type="date"
                min={todayISO()}
                className={inp}
                value={form.date}
                onChange={set('date')}
                {...aria('date')}
              />,
            )}
            {field(
              'category',
              'Consultation category',
              <select
                id="category"
                className={inp}
                value={form.category}
                onChange={set('category')}
                {...aria('category')}
              >
                <option value="">Select…</option>
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>,
            )}
            {field(
              'message',
              'Message (optional)',
              <textarea
                id="message"
                rows={3}
                maxLength={300}
                className={inp}
                value={form.message}
                onChange={set('message')}
                {...aria('message')}
              />,
            )}
            <div>
              <label className="flex items-start gap-2 text-small">
                <input
                  id="consent"
                  type="checkbox"
                  className="mt-1 h-5 w-5"
                  checked={consent}
                  onChange={(e) => setConsent(e.target.checked)}
                  {...aria('consent')}
                />{' '}
                I agree to open WhatsApp and send these details to the clinic.
              </label>
              {errors.consent && (
                <p id="consent-err" role="alert" className="mt-1 text-small text-red-700">
                  {errors.consent}
                </p>
              )}
            </div>
            <button className="btn-primary w-full" type="submit">
              Send enquiry on WhatsApp
            </button>
            <p role="status" className="text-small text-teal-dark">
              {sent &&
                'WhatsApp opened with your message. Please press send there. The clinic will reply to confirm.'}
            </p>
          </form>
        </section>
      </div>
    </>
  );
}
