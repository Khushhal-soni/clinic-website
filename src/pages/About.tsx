import { clinic } from '../config/clinic';
import { CtaButtons, DoctorPhoto, PageHeader } from '../components/ui';
import { useSeo } from '../lib/seo';

export default function About() {
  useSeo(
    'About Dr. Karishma Prajapat',
    'Qualifications, specialities and approach of Dr. Karishma Prajapat, gynaecologist and laparoscopic surgeon in Sujangarh.',
    '/about',
  );
  return (
    <>
      <PageHeader title="About Dr. Karishma Prajapat" lead={clinic.designations.join(' · ')} />
      <div className="container-x section grid gap-10 lg:grid-cols-[1fr_2fr]">
        <DoctorPhoto />
        <div className="space-y-8">
          <section>
            <h2>Profile</h2>
            <p className="mt-3 text-muted">
              {clinic.doctor} is a consultant obstetrician, gynaecologist, laparoscopic surgeon and
              infertility specialist practising at {clinic.hospital} in Sujangarh, Rajasthan. A fuller
              biography will be added once supplied by the doctor.
            </p>
          </section>
          <section>
            <h2>Qualifications</h2>
            <ul className="mt-3 list-disc pl-5 text-muted">
              <li>MBBS</li>
              <li>DNB</li>
              <li>FMAS – Fellowship in Minimal Access Surgery</li>
            </ul>
          </section>
          <section>
            <h2>Clinical interests</h2>
            <ul className="mt-3 list-disc pl-5 text-muted">
              <li>Pregnancy and high-risk pregnancy care</li>
              <li>Laparoscopic (minimal access) surgery</li>
              <li>Infertility, PCOS and menstrual health</li>
              <li>Uterine fibroids, menopause and post-menopausal health</li>
            </ul>
          </section>
          <section>
            <h2>Healthcare philosophy</h2>
            <p className="mt-3 text-muted">
              Respectful, patient-centred care: listening carefully, explaining clearly and making decisions
              together.
            </p>
          </section>
          <section>
            <h2>Practice location</h2>
            <p className="mt-3 text-muted">
              {clinic.hospital}, {clinic.address}
            </p>
          </section>
          <CtaButtons />
        </div>
      </div>
    </>
  );
}
