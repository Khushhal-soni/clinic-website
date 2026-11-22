import { clinic } from '../config/clinic';
import { PageHeader } from '../components/ui';
import { useSeo } from '../lib/seo';

export function Privacy() {
  useSeo('Privacy Policy', 'How this website handles your information.', '/privacy-policy');
  return (
    <>
      <PageHeader title="Privacy Policy" />
      <div className="container-x section reading max-w-3xl space-y-4 text-muted">
        <p>
          This website does not have a database, user accounts or analytics, and it does not store the details
          you type into forms.
        </p>
        <p>
          When you use the appointment enquiry or chat hand-over, your message is composed in your browser and
          opened in WhatsApp, which is governed by WhatsApp’s own privacy policy. Only send what you are
          comfortable sharing, and avoid detailed medical information.
        </p>
        <p>
          The chat assistant runs in your browser. Its conversation exists only during your visit. Fonts are
          loaded from Google Fonts.
        </p>
        <p>Questions? Call {clinic.phoneDisplay}.</p>
      </div>
    </>
  );
}
export function Disclaimer() {
  useSeo('Medical Disclaimer', 'Medical disclaimer for this website.', '/medical-disclaimer');
  return (
    <>
      <PageHeader title="Medical Disclaimer" />
      <div className="container-x section reading max-w-3xl space-y-4 text-muted">
        <p>
          Content on this website, including the chat assistant, is general information and is not medical
          advice, diagnosis or treatment. It does not replace consultation with a qualified doctor.
        </p>
        <p>In an emergency, call 112 or go to the nearest hospital immediately.</p>
        <p>Appointment enquiries sent through this website are not bookings until confirmed by the clinic.</p>
      </div>
    </>
  );
}
