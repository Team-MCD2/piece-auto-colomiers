/**
 * reveal.ts — scroll-triggered reveal animations (IntersectionObserver based).
 *
 * Zero-runtime lib. Adds a `revealed` class to `[data-reveal]` elements when
 * they enter the viewport (≥ 8% visible). Pair with the CSS rules in
 * `src/styles/globals.css` (`@layer utilities` section).
 *
 * Features:
 *   - Stagger : parent `[data-reveal-group]` auto-delays children via
 *     CSS custom property `--reveal-delay` (in units of 60ms).
 *   - Manual delay : a child may override via `data-reveal-delay="3"`.
 *   - One-shot : elements are unobserved after the first intersection.
 *   - Reduced-motion safe : if the user prefers reduced motion, everything
 *     reveals immediately (CSS handles the override).
 *   - Idempotent : re-running `initReveal()` is safe (DOMContentLoaded,
 *     astro:page-load, HMR, etc.).
 *   - SSR-safe : bails early when `window` / `IntersectionObserver` absent.
 *
 * Usage:
 *   <h2 data-reveal>Fade up on scroll</h2>
 *   <ul data-reveal-group>
 *     <li data-reveal>item 1 (auto idx 0)</li>
 *     <li data-reveal>item 2 (auto idx 1)</li>
 *     <li data-reveal data-reveal-delay="5">explicit override</li>
 *   </ul>
 *
 * Cf. .project-store/decisions.md ADR-007 (épurée motion canon) ;
 *     .project-store/roadmap.md Phase 5 (Oscaro-grade UX polish).
 */

let observer: IntersectionObserver | null = null;

/**
 * Shared observer. Lazy-created so we don't pay the cost on SSR.
 */
function getObserver(): IntersectionObserver | null {
  if (typeof window === 'undefined') return null;
  if (typeof IntersectionObserver === 'undefined') return null;
  if (observer) return observer;

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer?.unobserve(entry.target);
        }
      });
    },
    {
      // Trigger a hair before the element fully enters the viewport so
      // motion kicks in at a natural moment (not at the edge).
      rootMargin: '0px 0px -8% 0px',
      threshold: 0.08,
    },
  );
  return observer;
}

/**
 * Scan the DOM and observe every `[data-reveal]` element. Auto-computes
 * stagger indices for children of `[data-reveal-group]`.
 */
export function initReveal(root: ParentNode = document): void {
  if (typeof window === 'undefined') return;

  // Respect prefers-reduced-motion at the observer level : skip the
  // observer entirely, the CSS rule `@media (prefers-reduced-motion)`
  // will make everything visible by default.
  if (window.matchMedia?.('(prefers-reduced-motion: reduce)').matches) {
    root
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((el) => el.classList.add('revealed'));
    return;
  }

  const obs = getObserver();
  if (!obs) {
    // Graceful fallback : just reveal everything.
    root
      .querySelectorAll<HTMLElement>('[data-reveal]')
      .forEach((el) => el.classList.add('revealed'));
    return;
  }

  // Auto-assign indices inside `[data-reveal-group]` parents.
  root.querySelectorAll<HTMLElement>('[data-reveal-group]').forEach((parent) => {
    const children = parent.querySelectorAll<HTMLElement>(':scope > [data-reveal]');
    children.forEach((child, idx) => {
      if (!child.dataset.revealDelay) {
        child.style.setProperty('--reveal-delay', String(idx));
      }
    });
  });

  // Honor any manual `data-reveal-delay` override.
  root.querySelectorAll<HTMLElement>('[data-reveal][data-reveal-delay]').forEach((el) => {
    const d = parseInt(el.dataset.revealDelay ?? '0', 10);
    if (!Number.isNaN(d)) el.style.setProperty('--reveal-delay', String(d));
  });

  // Observe each candidate that hasn't been revealed yet.
  root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    if (el.classList.contains('revealed')) return;
    obs.observe(el);
  });
}

// --------------------------------------------------------------------
// Auto-init on load. Works with normal navigation + Astro's ClientRouter
// (harmless if unused). Re-runs if the user toggles reduced-motion via
// OS settings (rare, but correct).
// --------------------------------------------------------------------

if (typeof window !== 'undefined') {
  const run = () => initReveal();

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }

  // Astro ClientRouter compatibility (future-proof — no-op if not used).
  document.addEventListener('astro:page-load', run);
}
