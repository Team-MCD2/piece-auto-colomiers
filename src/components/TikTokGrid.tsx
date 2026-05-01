/**
 * TikTokGrid — React island présentant les vidéos TikTok en self-host.
 *
 * Pourquoi React ?
 *   Lightbox avec focus trap + navigation clavier + body scroll lock =
 *   interactivité non-triviale, useState/useEffect natural fit.
 *
 * Pourquoi self-host et pas iframe TikTok ?
 *   - RGPD : iframe TikTok dépose cookies tiers (consentement requis)
 *   - Perf : iframe ajoute ~800 KB JS + LCP dégradé
 *   - Fiabilité : pas de dépendance runtime au CDN TikTok
 *   → MP4 téléchargés via yt-dlp dans /public/assets/tiktoks/
 *
 * Architecture :
 *   - Props filtrées build-time : seules les vidéos dont le MP4 existe
 *     réellement dans /public sont passées (helper publicAssetExists)
 *   - Grid : 3 col desktop / 2 tablet / 1 mobile (ratio 9:16)
 *   - Video muted loop playsInline poster : autoplay sur hover desktop, tap mobile
 *   - Lightbox modal : keyboard (ESC/←/→), focus trap, scroll lock, return focus
 *
 * Hydration : client:visible (safe, pas d'import window-touching).
 */

import { useEffect, useRef, useState } from 'react';

export interface TikTok {
  id: string;
  url: string;
  mp4: string;
  poster: string;
  title: string;
  viewCount?: number;
  duration?: number;
  width?: number;
  height?: number;
}

interface Props {
  tiktoks: TikTok[];
  profileUrl: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatViews(n?: number): string | null {
  if (!n || n < 1) return null;
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return `${n}`;
}

function formatDuration(sec?: number): string | null {
  if (!sec || sec < 1) return null;
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

export default function TikTokGrid({ tiktoks, profileUrl }: Props) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const modalRef = useRef<HTMLDivElement | null>(null);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const open = (idx: number) => setOpenIdx(idx);
  const close = () => setOpenIdx(null);
  const prev = () => {
    setOpenIdx((i) => (i === null ? null : (i - 1 + tiktoks.length) % tiktoks.length));
  };
  const next = () => {
    setOpenIdx((i) => (i === null ? null : (i + 1) % tiktoks.length));
  };

  // --- Keyboard navigation + body scroll lock + focus trap ----------------
  useEffect(() => {
    if (openIdx === null) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        close();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        next();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        prev();
      } else if (e.key === 'Tab') {
        // Focus trap — keep tab inside modal
        const modal = modalRef.current;
        if (!modal) return;
        const focusables = modal.querySelectorAll<HTMLElement>(
          'button, a[href], video, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener('keydown', onKey);

    // Auto-focus close button on open for screen readers
    const closeBtn = modalRef.current?.querySelector<HTMLButtonElement>('[data-modal-close]');
    closeBtn?.focus();

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = originalOverflow;
      // Return focus to the trigger card that opened this
      if (openIdx !== null) triggerRefs.current[openIdx]?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [openIdx]);

  // --- Hover/touch : play preview muted -----------------------------------
  const handleEnter = (idx: number) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    v.play().catch(() => {
      /* autoplay bloqué (Safari mobile first-load) — silencieux */
    });
  };
  const handleLeave = (idx: number) => {
    const v = videoRefs.current[idx];
    if (!v) return;
    v.pause();
    try {
      v.currentTime = 0;
    } catch {
      /* no-op */
    }
  };

  if (tiktoks.length === 0) return null;

  const openTok = openIdx !== null ? tiktoks[openIdx] : null;

  return (
    <div>
      {/* Grid */}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {tiktoks.map((tok, idx) => {
          const views = formatViews(tok.viewCount);
          const duration = formatDuration(tok.duration);
          return (
            <li key={tok.id} className="relative">
              <button
                ref={(el) => {
                  triggerRefs.current[idx] = el;
                }}
                type="button"
                onClick={() => open(idx)}
                onMouseEnter={() => handleEnter(idx)}
                onMouseLeave={() => handleLeave(idx)}
                onTouchStart={() => handleEnter(idx)}
                onFocus={() => handleEnter(idx)}
                onBlur={() => handleLeave(idx)}
                className="group relative block w-full aspect-[9/16] overflow-hidden rounded-card bg-charcoal-900 shadow-card hover:shadow-card-lg focus-visible:ring-2 focus-visible:ring-signal-400 focus-visible:ring-offset-2 transition-all duration-300"
                aria-label={`Ouvrir la vidéo : ${tok.title || 'TikTok Pièces Auto Colomiers'}`}
              >
                <video
                  ref={(el) => {
                    videoRefs.current[idx] = el;
                  }}
                  src={tok.mp4}
                  poster={tok.poster}
                  muted
                  loop
                  playsInline
                  preload="metadata"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Gradient overlay pour lisibilité du titre */}
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent pointer-events-none" />

                {/* Play badge + durée en haut-droite */}
                <div className="absolute top-3 right-3 flex items-center gap-1.5">
                  {duration && (
                    <span className="text-xs text-white bg-charcoal-900/70 backdrop-blur-sm rounded px-1.5 py-0.5 font-medium">
                      {duration}
                    </span>
                  )}
                </div>

                <div className="absolute top-3 left-3 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-marine-800 translate-x-0.5" aria-hidden="true">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>

                {/* Titre + vues en bas */}
                <div className="absolute bottom-0 inset-x-0 p-4 text-left">
                  {tok.title && (
                    <p className="text-white text-sm font-medium line-clamp-2 drop-shadow-md">
                      {tok.title}
                    </p>
                  )}
                  {views && (
                    <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden="true">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                        <circle cx="12" cy="12" r="3" />
                      </svg>
                      {views} vues
                    </p>
                  )}
                </div>
              </button>
            </li>
          );
        })}
      </ul>

      {/* CTA profil */}
      <div className="mt-8 text-center">
        <a
          href={profileUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-marine-800 hover:text-marine-900 font-medium underline-offset-4 hover:underline"
        >
          Voir toutes nos vidéos sur TikTok
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </a>
      </div>

      {/* Lightbox modal */}
      {openTok !== null && openIdx !== null && (
        <div
          ref={modalRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Vidéo TikTok : ${openTok.title || 'Pièces Auto Colomiers'}`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal-900/90 backdrop-blur-md p-4 animate-in fade-in duration-200"
          onClick={(e) => {
            if (e.target === e.currentTarget) close();
          }}
        >
          {/* Close */}
          <button
            type="button"
            data-modal-close
            onClick={close}
            className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-signal-400"
            aria-label="Fermer la vidéo"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Prev */}
          {tiktoks.length > 1 && (
            <button
              type="button"
              onClick={prev}
              className="absolute left-2 sm:left-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-signal-400"
              aria-label="Vidéo précédente"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          )}

          {/* Player */}
          <div className="relative w-full max-w-[min(90vw,420px)] aspect-[9/16] rounded-2xl overflow-hidden bg-black shadow-2xl">
            <video
              key={openTok.id} /* force reload on index change */
              src={openTok.mp4}
              poster={openTok.poster}
              controls
              autoPlay
              playsInline
              className="w-full h-full object-contain bg-black"
            />
          </div>

          {/* Next */}
          {tiktoks.length > 1 && (
            <button
              type="button"
              onClick={next}
              className="absolute right-2 sm:right-4 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors focus-visible:ring-2 focus-visible:ring-signal-400"
              aria-label="Vidéo suivante"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          )}

          {/* Caption + lien TikTok */}
          <div className="absolute bottom-4 inset-x-0 px-6 text-center text-white">
            {openTok.title && (
              <p className="text-sm sm:text-base mb-2 max-w-2xl mx-auto line-clamp-2 drop-shadow-md">
                {openTok.title}
              </p>
            )}
            <a
              href={openTok.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-white/90 hover:text-white underline underline-offset-4"
            >
              Voir sur TikTok
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-3.5 h-3.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <p className="text-[10px] text-white/50 mt-2">
              ESC ferme · ← → change de vidéo
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
