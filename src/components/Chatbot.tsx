import { useEffect, useRef, useState } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import { answerQuestion, DISCLAIMER, faqs, type Reply } from '../lib/faq';
import { buildWhatsAppUrl } from '../lib/whatsapp';

interface Msg {
  id: number;
  from: 'bot' | 'user';
  text: string;
  kind?: Reply['kind'];
}
const WELCOME: Msg = {
  id: 0,
  from: 'bot',
  text: `Hello! I’m Dr. Karishma’s Patient Assistant. ${DISCLAIMER} For emergencies, call 112 or go to the nearest hospital.`,
};

export default function Chatbot() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([WELCOME]);
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const next = useRef(1);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [msgs, typing]);
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const send = (q: string) => {
    const clean = q.trim().slice(0, 300);
    if (!clean || typing) return;
    setMsgs((m) => [...m, { id: next.current++, from: 'user', text: clean }]);
    setText('');
    setTyping(true);
    timer.current = window.setTimeout(() => {
      const r = answerQuestion(clean);
      setMsgs((m) => [...m, { id: next.current++, from: 'bot', text: r.text, kind: r.kind }]);
      setTyping(false);
    }, 450);
  };

  return (
    <div data-chatbot className="fixed bottom-4 right-4 z-50">
      {open && (
        <section
          role="dialog"
          aria-label="Dr. Karishma's Patient Assistant"
          onKeyDown={(e) => e.key === 'Escape' && setOpen(false)}
          className="mb-3 flex h-[min(32rem,calc(100vh-6rem))] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden rounded-lg bg-white shadow-xl ring-1 ring-slate-200"
        >
          <header className="flex items-center justify-between bg-navy px-4 py-3 text-white">
            <h2 className="font-heading text-small font-semibold !text-white">
              Dr. Karishma’s Patient Assistant
            </h2>
            <button aria-label="Close chat" onClick={() => setOpen(false)}>
              <X size={18} aria-hidden />
            </button>
          </header>
          <div
            role="log"
            aria-live="polite"
            aria-label="Conversation"
            className="flex-1 space-y-3 overflow-y-auto p-4 text-small"
          >
            {msgs.map((m) => (
              <div key={m.id} className={m.from === 'user' ? 'text-right' : ''}>
                <p
                  className={`inline-block max-w-[85%] rounded-lg px-3 py-2 text-left ${m.from === 'user' ? 'bg-navy text-white' : m.kind === 'emergency' ? 'bg-red-50 text-red-900 ring-1 ring-red-300' : 'bg-light-blue text-ink'}`}
                >
                  {m.text}
                </p>
              </div>
            ))}
            {typing && (
              <p className="text-muted" role="status">
                Assistant is typing…
              </p>
            )}
            <div ref={endRef} />
          </div>
          <div className="flex flex-wrap gap-2 border-t border-slate-100 px-3 pt-2">
            {faqs.slice(0, 5).map((f) => (
              <button
                key={f.id}
                className="rounded-full border border-slate-300 px-3 py-1 text-caption hover:bg-light-blue"
                onClick={() => send(f.question)}
              >
                {f.question}
              </button>
            ))}
          </div>
          <form
            className="flex gap-2 p-3"
            onSubmit={(e) => {
              e.preventDefault();
              send(text);
            }}
          >
            <label htmlFor="chat-input" className="sr-only">
              Type your question
            </label>
            <input
              id="chat-input"
              ref={inputRef}
              value={text}
              maxLength={300}
              onChange={(e) => setText(e.target.value)}
              placeholder="Ask a question…"
              className="min-h-[44px] flex-1 rounded-md border border-slate-300 px-3 text-base"
            />
            <button type="submit" aria-label="Send message" className="btn-primary px-3">
              <Send size={18} aria-hidden />
            </button>
          </form>
          <a
            className="border-t border-slate-100 px-4 py-2 text-center font-heading text-caption font-semibold text-teal-dark underline"
            target="_blank"
            rel="noopener noreferrer"
            href={buildWhatsAppUrl('Hello, I have a question for the clinic.')}
          >
            Continue on WhatsApp with the clinic
          </a>
        </section>
      )}
      <button
        aria-expanded={open}
        aria-label={open ? 'Close patient assistant' : 'Open patient assistant'}
        onClick={() => setOpen(!open)}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-navy text-white shadow-xl"
      >
        <MessageCircle aria-hidden />
      </button>
    </div>
  );
}
