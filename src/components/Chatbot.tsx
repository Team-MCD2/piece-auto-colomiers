/**
 * Chatbot — guided assistant React island (`client:idle`).
 *
 * Architecture :
 *   - Pure finite-state machine over `props.intents` (no LLM, no network).
 *   - Floating action button (FAB) bottom-right of the viewport.
 *   - Panel opens on click, greeting + root chips rendered first.
 *   - Each chip push : append user bubble, then bot bubble with answer +
 *     optional CTA links + follow-up chips.
 *   - ESC closes, click outside closes, focus trap while open.
 *   - Mobile (<640px) : panel takes full width, anchored to bottom with
 *     rounded top corners — dialog pattern.
 *
 * Props come from `src/data/chatbot.js` via the Astro wrapper — the
 * payload is ~2 KB gzipped, acceptable for an idle island.
 *
 * Cf. plan.md §4.8 and ADR D-chatbot-v1.
 */

import { forwardRef, useEffect, useMemo, useRef, useState } from 'react';
import type { Ref } from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type LinkKind = 'primary' | 'secondary' | 'whatsapp' | 'tel';

export interface ChatLink {
  href: string;
  label: string;
  kind?: LinkKind;
}

export interface Intent {
  id: string;
  label: string;
  answer: string;
  links?: ChatLink[];
  children?: string[];
}

export interface RootLabel {
  id: string;
  label: string;
}

export interface Greeting {
  text: string;
  prompt: string;
}

interface Props {
  greeting: Greeting;
  rootLabels: RootLabel[];
  intents: Record<string, Intent>;
}

interface BotMessage {
  from: 'bot';
  text: string;
  links?: ChatLink[];
  chips?: RootLabel[];
  /** Optional "escape hatch" chip set — shown after two consecutive misses */
  showEscape?: boolean;
}

interface UserMessage {
  from: 'user';
  text: string;
}

type Message = BotMessage | UserMessage;

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function intentToChips(intent: Intent, allIntents: Record<string, Intent>): RootLabel[] {
  if (!intent.children) return [];
  return intent.children
    .map((id) => {
      const child = allIntents[id];
      return child ? { id: child.id, label: child.label } : null;
    })
    .filter((c): c is RootLabel => c !== null);
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function Chatbot({ greeting, rootLabels, intents }: Props) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const panelRef = useRef<HTMLDivElement | null>(null);
  const fabRef = useRef<HTMLButtonElement | null>(null);
  const logRef = useRef<HTMLDivElement | null>(null);

  // --------------------------------------------------------------------
  // Greeting seeded on first open. Reseed if user closes+reopens after
  // clearing history (we keep messages across open/close by default).
  // --------------------------------------------------------------------
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          from: 'bot',
          text: `${greeting.text}\n\n**${greeting.prompt}**`,
          chips: rootLabels,
        },
      ]);
    }
  }, [isOpen, messages.length, greeting, rootLabels]);

  // --------------------------------------------------------------------
  // ESC closes + click-outside closes (only when open).
  // --------------------------------------------------------------------
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
    };
    const onClick = (e: MouseEvent) => {
      const target = e.target as Node;
      if (
        panelRef.current &&
        !panelRef.current.contains(target) &&
        fabRef.current &&
        !fabRef.current.contains(target)
      ) {
        close();
      }
    };
    document.addEventListener('keydown', onKey);
    document.addEventListener('mousedown', onClick);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.removeEventListener('mousedown', onClick);
    };
  }, [isOpen]);

  // Auto-scroll log to bottom on new message.
  useEffect(() => {
    if (!logRef.current) return;
    logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [messages, isTyping]);

  // --------------------------------------------------------------------
  // Handlers
  // --------------------------------------------------------------------
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen((v) => !v);

  const reset = () => {
    setMessages([]);
  };

  const pickIntent = (id: string) => {
    const intent = intents[id];
    if (!intent) return;

    // 1) Append user message echoing the chip label.
    setMessages((prev) => [...prev, { from: 'user', text: intent.label }]);

    // 2) Simulate bot typing, then append bot answer.
    setIsTyping(true);
    window.setTimeout(() => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          from: 'bot',
          text: intent.answer,
          links: intent.links,
          chips: intentToChips(intent, intents),
        },
      ]);
    }, 420);
  };

  // --------------------------------------------------------------------
  // Rendering
  // --------------------------------------------------------------------
  return (
    <>
      {/* FAB toggle — sits bottom-right, visible on all pages */}
      <button
        ref={fabRef}
        type="button"
        onClick={toggle}
        aria-label={isOpen ? "Fermer l'assistant" : "Ouvrir l'assistant"}
        aria-expanded={isOpen}
        aria-controls="pac-chatbot-panel"
        className={`fixed right-4 md:right-5 z-[1000] inline-flex size-14 items-center justify-center rounded-full shadow-card-hover transition-all duration-300 ease-brand focus:outline-none focus-visible:ring-4 focus-visible:ring-sky-300/60 bottom-[calc(env(safe-area-inset-bottom,0px)+88px)] md:bottom-5 ${
          isOpen
            ? 'bg-marine-800 text-white rotate-90'
            : 'bg-gradient-to-br from-marine-700 to-marine-900 text-sky-300 hover:scale-105 hover:shadow-card animate-pulse-soft'
        }`}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M18 6 6 18" />
            <path d="m6 6 12 12" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
            <circle cx="8.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="12" cy="12" r="0.9" fill="currentColor" stroke="none" />
            <circle cx="15.5" cy="12" r="0.9" fill="currentColor" stroke="none" />
          </svg>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div
          ref={panelRef}
          id="pac-chatbot-panel"
          role="dialog"
          aria-label="Assistant Pièces Auto Colomiers"
          className="fixed z-[999] bg-white shadow-card-hover border border-charcoal-100 rounded-card overflow-hidden flex flex-col
                     inset-x-4 bottom-[calc(env(safe-area-inset-bottom,0px)+160px)] md:inset-x-auto md:right-5 md:bottom-24 md:w-[380px]
                     max-h-[min(600px,calc(100vh-200px))] md:max-h-[min(600px,calc(100vh-120px))] animate-fade-up"
        >
          <ChatbotHeader onClose={close} onReset={reset} />
          <ChatLog
            ref={logRef}
            messages={messages}
            isTyping={isTyping}
            onChip={pickIntent}
          />
          <ChatbotFooter />
        </div>
      )}
    </>
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function ChatbotHeader({ onClose, onReset }: { onClose: () => void; onReset: () => void }) {
  return (
    <header className="px-4 py-3 bg-gradient-to-r from-marine-800 to-marine-900 text-white flex items-center gap-3">
      <div className="size-9 rounded-full bg-sky-400/20 flex items-center justify-center text-sky-300 shrink-0">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-display uppercase text-sm leading-tight">Assistant PAC</div>
        <div className="text-xs text-offwhite-200/80 leading-tight">Réponse immédiate · non-humaine</div>
      </div>
      <button
        type="button"
        onClick={onReset}
        aria-label="Recommencer la conversation"
        title="Recommencer"
        className="inline-flex size-8 items-center justify-center rounded-full text-offwhite-200 hover:bg-white/10 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
          <path d="M3 3v5h5" />
        </svg>
      </button>
      <button
        type="button"
        onClick={onClose}
        aria-label="Fermer l'assistant"
        className="inline-flex size-8 items-center justify-center rounded-full text-offwhite-200 hover:bg-white/10 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 6 6 18" />
          <path d="m6 6 12 12" />
        </svg>
      </button>
    </header>
  );
}

interface ChatLogProps {
  messages: Message[];
  isTyping: boolean;
  onChip: (id: string) => void;
}

const ChatLog = forwardRef<HTMLDivElement, ChatLogProps>(function ChatLog(
  { messages, isTyping, onChip },
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className="flex-1 overflow-y-auto p-4 space-y-3 bg-offwhite-50 text-sm"
    >
      {messages.map((m, idx) => (
        <MessageBubble key={idx} message={m} onChip={onChip} />
      ))}
      {isTyping && <TypingBubble />}
    </div>
  );
});

function MessageBubble({
  message,
  onChip,
}: {
  message: Message;
  onChip: (id: string) => void;
}) {
  if (message.from === 'user') {
    return (
      <div className="flex justify-end">
        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-marine-800 text-white px-3.5 py-2 leading-relaxed">
          {message.text}
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-start gap-2">
      <div className="max-w-[90%] rounded-2xl rounded-bl-sm bg-white border border-charcoal-100 text-charcoal-800 px-3.5 py-2.5 leading-relaxed shadow-sm">
        <BotText text={message.text} />
        {message.links && message.links.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {message.links.map((l, i) => (
              <LinkPill key={i} link={l} />
            ))}
          </div>
        )}
      </div>
      {message.chips && message.chips.length > 0 && (
        <div className="flex flex-wrap gap-1.5 pl-1">
          {message.chips.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => onChip(c.id)}
              className="rounded-pill bg-sky-50 hover:bg-sky-100 border border-sky-200 text-marine-800 px-3 py-1 text-xs font-semibold transition-colors"
            >
              {c.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/** Renders bot text with bare **bold** support + inline line breaks. */
function BotText({ text }: { text: string }) {
  const parts = useMemo(() => {
    // Split on bold markers. Preserves order.
    const segments: Array<{ bold: boolean; text: string }> = [];
    const regex = /\*\*([^*]+)\*\*/g;
    let lastIndex = 0;
    let match: RegExpExecArray | null;
    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        segments.push({ bold: false, text: text.slice(lastIndex, match.index) });
      }
      segments.push({ bold: true, text: match[1] });
      lastIndex = match.index + match[0].length;
    }
    if (lastIndex < text.length) {
      segments.push({ bold: false, text: text.slice(lastIndex) });
    }
    return segments;
  }, [text]);

  return (
    <span className="whitespace-pre-wrap">
      {parts.map((p, i) =>
        p.bold ? (
          <strong key={i} className="text-marine-900">
            {p.text}
          </strong>
        ) : (
          <span key={i}>{p.text}</span>
        ),
      )}
    </span>
  );
}

function LinkPill({ link }: { link: ChatLink }) {
  const kind = link.kind ?? 'secondary';
  const isExternal = link.href.startsWith('http') || link.href.startsWith('tel:') || link.href.startsWith('mailto:');
  const classes =
    kind === 'whatsapp'
      ? 'bg-brand-whatsapp text-white hover:bg-brand-whatsapp-dark'
      : kind === 'tel'
      ? 'bg-marine-800 text-white hover:bg-marine-900'
      : kind === 'primary'
      ? 'bg-sky-400 text-marine-900 hover:bg-sky-300'
      : 'bg-charcoal-100 text-charcoal-800 hover:bg-charcoal-200';
  return (
    <a
      href={link.href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className={`inline-flex items-center gap-1 rounded-pill px-3 py-1.5 text-xs font-semibold transition-colors ${classes}`}
    >
      {link.label}
      {isExternal && (
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M15 3h6v6" />
          <path d="M10 14 21 3" />
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
        </svg>
      )}
    </a>
  );
}

function TypingBubble() {
  return (
    <div className="flex items-start">
      <div className="rounded-2xl rounded-bl-sm bg-white border border-charcoal-100 px-3.5 py-2.5 shadow-sm">
        <span className="inline-flex items-center gap-1">
          <span className="size-1.5 rounded-full bg-charcoal-400 animate-bounce [animation-delay:-0.3s]" />
          <span className="size-1.5 rounded-full bg-charcoal-400 animate-bounce [animation-delay:-0.15s]" />
          <span className="size-1.5 rounded-full bg-charcoal-400 animate-bounce" />
        </span>
      </div>
    </div>
  );
}

function ChatbotFooter() {
  return (
    <footer className="px-4 py-2.5 border-t border-charcoal-100 bg-white text-[11px] text-charcoal-500 leading-snug">
      Assistant non-humain · réponses préétablies. Pour un échange personnalisé,{' '}
      <a href="/contact" className="text-marine-700 hover:text-sky-600 font-semibold underline decoration-2 decoration-sky-300 underline-offset-2">
        contactez-nous
      </a>
      .
    </footer>
  );
}
