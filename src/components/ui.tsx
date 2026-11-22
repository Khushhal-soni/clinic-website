import { useState } from 'react';
import {
  Baby,
  ShieldCheck,
  HeartPulse,
  Scissors,
  Sprout,
  Activity,
  CalendarDays,
  Circle,
  Phone,
  MessageCircle,
  type LucideIcon,
} from 'lucide-react';
import { clinic } from '../config/clinic';
import { generalEnquiryUrl } from '../lib/whatsapp';
import type { Speciality } from '../data/content';

const icons: Record<Speciality['icon'], LucideIcon> = {
  baby: Baby,
  shield: ShieldCheck,
  heart: HeartPulse,
  scissors: Scissors,
  sprout: Sprout,
  activity: Activity,
  calendar: CalendarDays,
  circle: Circle,
};
export const SpecIcon = ({ name, className }: { name: Speciality['icon']; className?: string }) => {
  const I = icons[name];
  return <I aria-hidden className={className} />;
};

export function DoctorPhoto({ className = '' }: { className?: string }) {
  const [failed, setFailed] = useState(false);
  if (failed)
    return (
      <div
        role="img"
        aria-label="Photograph of Dr. Karishma Prajapat to be added"
        className={`flex aspect-[4/5] items-center justify-center rounded-lg bg-light-blue text-center text-small text-muted ${className}`}
      >
        <span className="px-6">
          Doctor’s photograph to be supplied
          <br />
          (add <code>public/doctor.webp</code>)
        </span>
      </div>
    );
  return (
    <img
      src="/doctor.webp"
      width={480}
      height={600}
      alt="Dr. Karishma Prajapat, gynaecologist in Sujangarh"
      onError={() => setFailed(true)}
      className={`aspect-[4/5] w-full rounded-lg object-cover ${className}`}
    />
  );
}

export function CtaButtons() {
  return (
    <div className="flex flex-wrap gap-3">
      <a className="btn-primary" href={`tel:${clinic.phoneTel}`}>
        <Phone size={18} aria-hidden /> Call Now
      </a>
      <a className="btn-outline" href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer">
        <MessageCircle size={18} aria-hidden /> WhatsApp Enquiry
      </a>
    </div>
  );
}

export const PageHeader = ({ title, lead }: { title: string; lead?: string }) => (
  <div className="bg-light-blue">
    <div className="container-x py-12">
      <h1>{title}</h1>
      {lead && <p className="mt-3 max-w-2xl text-lead text-muted">{lead}</p>}
    </div>
  </div>
);

export const InstagramIcon = ({ size = 18 }: { size?: number }) => (
  <svg
    aria-hidden
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="3" y="3" width="18" height="18" rx="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" />
  </svg>
);
