import { Link, useParams } from 'react-router-dom';
import { articles } from '../data/content';
import { PageHeader } from '../components/ui';
import { useSeo } from '../lib/seo';
import NotFound from './NotFound';

const fmt = (d: string) =>
  new Date(d + 'T00:00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
const Cover = ({ category }: { category: string }) => (
  <div
    aria-hidden
    className="flex h-32 items-end rounded-md bg-gradient-to-br from-navy to-teal-dark p-3 eyebrow text-white"
  >
    {category}
  </div>
);

export function BlogList() {
  useSeo(
    'Patient Education',
    'Educational articles on PCOS, pregnancy, fibroids, infertility and menopause from Dr. Karishma Prajapat’s clinic.',
    '/patient-education',
  );
  const cats = [...new Set(articles.map((a) => a.category))];
  return (
    <>
      <PageHeader title="Patient Education" lead={`Categories: ${cats.join(', ')}`} />
      <ul className="container-x section grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((a) => (
          <li key={a.slug} className="card">
            <Cover category={a.category} />
            <time className="mt-3 block text-caption text-muted" dateTime={a.date}>
              {fmt(a.date)}
            </time>
            <h2 className="mt-1 text-h3">
              <Link className="hover:underline" to={`/patient-education/${a.slug}`}>
                {a.title}
              </Link>
            </h2>
            <p className="mt-2 text-small text-muted">{a.summary}</p>
          </li>
        ))}
      </ul>
    </>
  );
}

export function BlogPost() {
  const { slug } = useParams();
  const a = articles.find((x) => x.slug === slug);
  useSeo(a?.title ?? 'Not found', a?.summary ?? 'Page not found', `/patient-education/${slug ?? ''}`);
  if (!a) return <NotFound />;
  const related = articles.filter((x) => a.related.includes(x.slug));
  return (
    <article>
      <PageHeader title={a.title} lead={`${a.category} · ${fmt(a.date)}`} />
      <div className="container-x section reading max-w-3xl space-y-4 text-ink">
        {a.body.map((p, i) => (
          <p key={i} className={i === a.body.length - 1 ? 'text-small text-muted' : ''}>
            {p}
          </p>
        ))}
        <Link to="/contact#appointment" className="btn-primary">
          Book an Appointment
        </Link>
        {related.length > 0 && (
          <aside className="pt-8">
            <h2 className="text-h3">Related articles</h2>
            <ul className="mt-3 list-disc pl-5">
              {related.map((r) => (
                <li key={r.slug}>
                  <Link className="text-teal-dark underline" to={`/patient-education/${r.slug}`}>
                    {r.title}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )}
      </div>
    </article>
  );
}
