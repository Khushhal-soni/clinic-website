import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom';
import { ArrowUp, Menu, X } from 'lucide-react';
import { clinic } from '../config/clinic';
import Chatbot from './Chatbot';
import { InstagramIcon } from './ui';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Doctor' },
  { to: '/specialities', label: 'Specialities' },
  { to: '/patient-education', label: 'Patient Education' },
  { to: '/contact', label: 'Contact' },
];

export default function Layout() {
  const { pathname } = useLocation();
  // Menu is open only for the page it was opened on, so navigating closes it without an effect.
  const [openAt, setOpenAt] = useState<string | null>(null);
  const open = openAt === pathname;
  const setOpen = (v: boolean) => setOpenAt(v ? pathname : null);
  const [showTop, setShowTop] = useState(false);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  useEffect(() => {
    const on = () => setShowTop(window.scrollY > 600);
    window.addEventListener('scroll', on, { passive: true });
    return () => window.removeEventListener('scroll', on);
  }, []);
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === 'Escape' && setOpenAt(null);
    document.addEventListener('keydown', esc);
    return () => document.removeEventListener('keydown', esc);
  }, [open]);

  const cls = ({ isActive }: { isActive: boolean }) =>
    `whitespace-nowrap rounded px-3 py-2 font-heading text-ui font-medium ${isActive ? 'text-navy underline decoration-rose decoration-2 underline-offset-8' : 'text-ink hover:text-teal-dark'}`;

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-2 focus:top-2 focus:z-[60] focus:rounded focus:bg-white focus:p-3"
      >
        Skip to content
      </a>
      <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="container-x flex h-16 items-center justify-between">
          <Link to="/" className="brand text-navy">
            {clinic.doctor}
          </Link>
          <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <NavLink key={l.to} to={l.to} end={l.to === '/'} className={cls}>
                {l.label}
              </NavLink>
            ))}
            <Link to="/contact#appointment" className="btn-primary ml-3">
              Book Appointment
            </Link>
          </nav>
          <button
            className="btn lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? 'Close menu' : 'Open menu'}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden /> : <Menu aria-hidden />}
          </button>
        </div>
        {open && (
          <nav id="mobile-nav" aria-label="Mobile" className="border-t border-slate-200 bg-white lg:hidden">
            <ul className="container-x flex flex-col py-3">
              {links.map((l) => (
                <li key={l.to}>
                  <NavLink to={l.to} end={l.to === '/'} className={(s) => cls(s) + ' block py-3'}>
                    {l.label}
                  </NavLink>
                </li>
              ))}
              <li className="pt-2">
                <Link to="/contact#appointment" className="btn-primary w-full">
                  Book Appointment
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </header>
      <main id="main">
        <Outlet />
      </main>
      <footer className="mt-10 bg-navy text-slate-200">
        <div className="container-x grid gap-8 py-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="brand text-white">{clinic.doctor}</p>
            <p className="mt-1 text-small">{clinic.qualifications.join(', ')}</p>
            <p className="mt-1 text-small">{clinic.designations.join(' · ')}</p>
          </div>
          <address className="text-small not-italic">
            <p className="font-heading font-semibold text-white">{clinic.hospital}</p>
            <p>{clinic.address}</p>
            <p className="mt-2">
              <a className="underline" href={`tel:${clinic.phoneTel}`}>
                {clinic.phoneDisplay}
              </a>
            </p>
          </address>
          <ul className="space-y-1 text-small">
            {links.map((l) => (
              <li key={l.to}>
                <Link className="underline-offset-2 hover:underline" to={l.to}>
                  {l.label}
                </Link>
              </li>
            ))}
            <li>
              <Link className="hover:underline" to="/visiting-card">
                Digital Visiting Card
              </Link>
            </li>
          </ul>
          <div className="text-small">
            <a
              className="inline-flex items-center gap-2 hover:underline"
              href={clinic.instagram}
              target="_blank"
              rel="noopener noreferrer"
            >
              <InstagramIcon /> Instagram
            </a>
            <p className="mt-4">
              <Link className="hover:underline" to="/privacy-policy">
                Privacy Policy
              </Link>{' '}
              ·{' '}
              <Link className="hover:underline" to="/medical-disclaimer">
                Medical Disclaimer
              </Link>
            </p>
          </div>
        </div>
        <p className="border-t border-white/10 py-4 text-center text-caption">
          © {new Date().getFullYear()} {clinic.doctor}. Information on this site is educational and not a
          substitute for medical advice.
        </p>
      </footer>
      {showTop && (
        <button
          aria-label="Back to top"
          className="fixed bottom-20 left-4 z-40 rounded-full bg-white p-3 shadow-soft ring-1 ring-slate-200"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          <ArrowUp aria-hidden />
        </button>
      )}
      <Chatbot />
    </>
  );
}
