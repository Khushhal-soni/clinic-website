import { Link, useParams } from 'react-router-dom';
import { specialities } from '../data/content';
import { CtaButtons, PageHeader, SpecIcon } from '../components/ui';
import { useSeo } from '../lib/seo';
import NotFound from './NotFound';

const Block = ({ h, items }: { h: string; items: string[] }) => (
  <section>
    <h2>{h}</h2>
    <ul className="mt-3 list-disc space-y-1 pl-5 text-muted">
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  </section>
);

export function SpecialitiesList() {
  useSeo(
    'Specialities and Treatments',
    'Pregnancy care, gynaecology, laparoscopic surgery, infertility, PCOS and more with Dr. Karishma Prajapat in Sujangarh.',
    '/specialities',
  );
  return (
    <>
      <PageHeader
        title="Specialities & Treatments"
        lead="Educational overviews. Treatment decisions are always individual and made after consultation."
      />
      <ul className="container-x section grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {specialities.map((s) => (
          <li key={s.slug} className="card">
            <SpecIcon name={s.icon} className="h-7 w-7 text-teal-dark" />
            <h2 className="mt-3 text-h3">
              <Link to={`/specialities/${s.slug}`} className="hover:underline">
                {s.title}
              </Link>
            </h2>
            <p className="mt-2 text-small text-muted">{s.short}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function SpecialityDetail() {
  const { slug } = useParams();
  const s = specialities.find((x) => x.slug === slug);
  useSeo(s?.title ?? 'Not found', s?.intro ?? 'Page not found', `/specialities/${slug ?? ''}`);
  if (!s) return <NotFound />;
  return (
    <>
      <PageHeader title={s.title} lead={s.intro} />
      <div className="container-x section max-w-3xl space-y-8">
        <Block h="Common concerns" items={s.concerns} />
        <Block h="When to seek consultation" items={s.whenToSeek} />
        <Block h="How a consultation may help" items={s.howHelps} />
        <p className="text-small text-muted">
          This page is general education. It does not diagnose or guarantee outcomes. If you have severe pain,
          heavy bleeding or feel unwell, seek urgent medical care.
        </p>
        <div className="flex flex-wrap gap-3">
          <Link to="/contact#appointment" className="btn-primary">
            Book an Appointment
          </Link>
          <CtaButtons />
        </div>
      </div>
    </>
  );
}
