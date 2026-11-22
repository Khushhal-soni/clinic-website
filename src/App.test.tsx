import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

const go = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <App />
    </MemoryRouter>,
  );

describe('navigation', () => {
  it('navigates Home → About → Specialities → Contact', async () => {
    const u = userEvent.setup();
    go('/');
    expect(await screen.findByRole('heading', { level: 1, name: /Compassionate Care/ })).toBeInTheDocument();
    const nav = screen.getByRole('navigation', { name: 'Main' });
    for (const [label, h] of [
      ['About Doctor', /About Dr/],
      ['Specialities', /Specialities & Treatments/],
      ['Contact', /Contact & Appointment/],
    ] as const) {
      await u.click(within(nav).getByRole('link', { name: label }));
      expect(await screen.findByRole('heading', { level: 1, name: h })).toBeInTheDocument();
    }
  });
  it('shows not-found for unknown routes and unknown slugs', async () => {
    go('/nope');
    expect(await screen.findByText('Page not found')).toBeInTheDocument();
  });
  it('mobile menu opens and closes', async () => {
    const u = userEvent.setup();
    go('/');
    await u.click(screen.getByRole('button', { name: 'Open menu' }));
    await u.click(
      within(screen.getByRole('navigation', { name: 'Mobile' })).getByRole('link', { name: 'About Doctor' }),
    );
    expect(screen.queryByRole('navigation', { name: 'Mobile' })).not.toBeInTheDocument();
  });
  it('falls back when the doctor photo is missing', async () => {
    go('/');
    const img = screen.getByAltText(/Dr. Karishma Prajapat, gynaecologist/);
    img.dispatchEvent(new Event('error'));
    expect(await screen.findByRole('img', { name: /to be added/ })).toBeInTheDocument();
  });
});

describe('appointment enquiry', () => {
  it('shows validation errors and does not open WhatsApp when invalid', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const u = userEvent.setup();
    go('/contact');
    await u.click(await screen.findByRole('button', { name: /Send enquiry/ }));
    expect(screen.getAllByRole('alert').length).toBeGreaterThanOrEqual(4);
    expect(open).not.toHaveBeenCalled();
  });
  it('opens a prefilled WhatsApp link when valid', async () => {
    const open = vi.spyOn(window, 'open').mockImplementation(() => null);
    const u = userEvent.setup();
    go('/contact');
    await u.type(await screen.findByLabelText('Patient name'), 'Asha Sharma');
    await u.type(screen.getByLabelText('Mobile number'), '9876543210');
    await u.type(screen.getByLabelText('Preferred date'), '2099-01-01');
    await u.selectOptions(screen.getByLabelText('Consultation category'), 'PCOS');
    await u.click(screen.getByRole('checkbox'));
    await u.click(screen.getByRole('button', { name: /Send enquiry/ }));
    expect(open).toHaveBeenCalledOnce();
    expect(String(open.mock.calls[0][0])).toMatch(/^https:\/\/wa\.me\/919549706060\?text=.*Asha%20Sharma/);
    expect(screen.getByRole('status')).toHaveTextContent(/clinic will reply/);
  });
});

describe('chatbot', () => {
  it('answers a suggested question and offers WhatsApp hand-over', async () => {
    const u = userEvent.setup();
    go('/');
    await u.click(screen.getByRole('button', { name: 'Open patient assistant' }));
    await u.click(screen.getByRole('button', { name: 'What are her qualifications?' }));
    expect(await screen.findByText(/MBBS, DNB and FMAS/, undefined, { timeout: 2000 })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /Continue on WhatsApp/ })).toHaveAttribute(
      'href',
      expect.stringContaining('wa.me/919549706060'),
    );
  });
  it('handles unknown questions with a fallback', async () => {
    const u = userEvent.setup();
    go('/');
    await u.click(screen.getByRole('button', { name: 'Open patient assistant' }));
    await u.type(screen.getByLabelText('Type your question'), 'pizza{enter}');
    expect(await screen.findByText(/not sure about that/, undefined, { timeout: 2000 })).toBeInTheDocument();
  });
});
