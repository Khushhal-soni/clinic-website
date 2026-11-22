import { useEffect, useState } from 'react';
import QRCode from 'qrcode';
import { Download, Printer } from 'lucide-react';
import { clinic } from '../config/clinic';
import { generalEnquiryUrl } from '../lib/whatsapp';
import { CtaButtons, DoctorPhoto, PageHeader } from '../components/ui';
import { useSeo } from '../lib/seo';

export function buildVCard(): string {
  return [
    'BEGIN:VCARD',
    'VERSION:3.0',
    `FN:${clinic.doctor}`,
    `TITLE:${clinic.designations.join(', ')}`,
    `ORG:${clinic.hospital}`,
    `TEL;TYPE=WORK:${clinic.phoneTel}`,
    `ADR;TYPE=WORK:;;${clinic.address};;;;`,
    `URL:${clinic.siteUrl}`,
    'END:VCARD',
  ].join('\r\n');
}

export default function Card() {
  useSeo(
    'Digital Visiting Card',
    'Digital visiting card for Dr. Karishma Prajapat with contact details and website QR code.',
    '/visiting-card',
  );
  const [qr, setQr] = useState('');
  useEffect(() => {
    QRCode.toDataURL(clinic.siteUrl, { width: 240, margin: 1 })
      .then(setQr)
      .catch(() => setQr(''));
  }, []);
  const download = () => {
    const url = URL.createObjectURL(new Blob([buildVCard()], { type: 'text/vcard' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'dr-karishma-prajapat.vcf' });
    a.click();
    URL.revokeObjectURL(url);
  };
  return (
    <>
      <div className="no-print">
        <PageHeader title="Digital Visiting Card" />
      </div>
      <div className="container-x section">
        <article
          className="mx-auto grid max-w-2xl gap-6 rounded-lg border border-slate-200 bg-white p-6 shadow-soft sm:grid-cols-[180px_1fr]"
          aria-label="Visiting card"
        >
          <DoctorPhoto />
          <div>
            <h2>{clinic.doctor}</h2>
            <p className="font-heading text-small font-semibold text-teal-dark">
              {clinic.qualifications.join(', ')}
            </p>
            <p className="mt-1 text-small text-muted">{clinic.designations.join(' · ')}</p>
            <p className="mt-3 text-small">
              {clinic.hospital}, {clinic.address}
            </p>
            <p className="mt-1 text-small">{clinic.phoneDisplay}</p>
            {qr && (
              <img
                src={qr}
                width={96}
                height={96}
                alt={`QR code linking to ${clinic.siteUrl}`}
                className="mt-3"
              />
            )}
          </div>
        </article>
        <div className="no-print mx-auto mt-6 flex max-w-2xl flex-wrap gap-3">
          <a className="btn-primary" href={`tel:${clinic.phoneTel}`}>
            Call
          </a>
          <a className="btn-outline" href={generalEnquiryUrl()} target="_blank" rel="noopener noreferrer">
            WhatsApp
          </a>
          <button className="btn-outline" onClick={download}>
            <Download size={16} aria-hidden /> Save contact (.vcf)
          </button>
          <button className="btn-outline" onClick={() => window.print()}>
            <Printer size={16} aria-hidden /> Print card
          </button>
        </div>
        <div className="no-print hidden">
          <CtaButtons />
        </div>
      </div>
    </>
  );
}
