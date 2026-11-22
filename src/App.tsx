import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';

const About = lazy(() => import('./pages/About'));
const Contact = lazy(() => import('./pages/Contact'));
const Card = lazy(() => import('./pages/Card'));
const NotFound = lazy(() => import('./pages/NotFound'));
const SpecialitiesList = lazy(() =>
  import('./pages/Specialities').then((m) => ({ default: m.SpecialitiesList })),
);
const SpecialityDetail = lazy(() =>
  import('./pages/Specialities').then((m) => ({ default: m.SpecialityDetail })),
);
const BlogList = lazy(() => import('./pages/Blog').then((m) => ({ default: m.BlogList })));
const BlogPost = lazy(() => import('./pages/Blog').then((m) => ({ default: m.BlogPost })));
const Privacy = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Privacy })));
const Disclaimer = lazy(() => import('./pages/Legal').then((m) => ({ default: m.Disclaimer })));

export default function App() {
  return (
    <Suspense
      fallback={
        <p role="status" className="p-10 text-center text-muted">
          Loading…
        </p>
      }
    >
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="specialities" element={<SpecialitiesList />} />
          <Route path="specialities/:slug" element={<SpecialityDetail />} />
          <Route path="patient-education" element={<BlogList />} />
          <Route path="patient-education/:slug" element={<BlogPost />} />
          <Route path="contact" element={<Contact />} />
          <Route path="visiting-card" element={<Card />} />
          <Route path="privacy-policy" element={<Privacy />} />
          <Route path="medical-disclaimer" element={<Disclaimer />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
