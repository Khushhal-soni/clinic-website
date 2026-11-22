import { buildEnquiryMessage, buildWhatsAppUrl } from './whatsapp';
import { normaliseMobile, validateEnquiry } from './validate';
import { answerQuestion } from './faq';

const ok = { name: 'Asha Sharma', mobile: '98765 43210', date: '2030-01-10', category: 'PCOS', message: '' };

describe('whatsapp', () => {
  it('builds an encoded wa.me URL for the clinic number', () => {
    const u = buildWhatsAppUrl('Hi & bye');
    expect(u).toBe('https://wa.me/919549706060?text=Hi%20%26%20bye');
  });
  it('includes details and the not-confirmed note', () => {
    const m = buildEnquiryMessage({ ...ok, message: 'Morning please' });
    expect(m).toContain('Asha Sharma');
    expect(m).toContain('Note: Morning please');
    expect(m).toContain('not confirmed');
  });
});

describe('validation', () => {
  it('accepts a valid enquiry', () => expect(validateEnquiry(ok, true, '2029-01-01')).toEqual({}));
  it('normalises +91 and spaces', () => expect(normaliseMobile('+91 98765-43210')).toBe('9876543210'));
  it.each([
    ['mobile', { mobile: '12345' }],
    ['name', { name: '1' }],
    ['date', { date: '2020-01-01' }],
    ['category', { category: '' }],
  ])('rejects bad %s', (k, patch) => {
    expect(validateEnquiry({ ...ok, ...patch }, true, '2029-01-01')).toHaveProperty(k);
  });
  it('requires consent', () => expect(validateEnquiry(ok, false, '2029-01-01')).toHaveProperty('consent'));
});

describe('faq matching', () => {
  it('answers qualifications', () =>
    expect(answerQuestion('What are her qualifications?').text).toContain('FMAS'));
  it('answers PCOS', () => expect(answerQuestion('what is pcos').kind).toBe('answer'));
  it('escalates emergencies', () => expect(answerQuestion('I have heavy bleeding').kind).toBe('emergency'));
  it('refuses prescribing', () => expect(answerQuestion('prescribe a tablet').kind).toBe('refusal'));
  it('falls back for unknown questions', () =>
    expect(answerQuestion('best pizza nearby').kind).toBe('fallback'));
});
