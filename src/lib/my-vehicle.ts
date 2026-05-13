/**
 * my-vehicle — "Mon véhicule" persistence layer (Oscaro pattern, ADR-008).
 *
 * Source of truth for the user-selected vehicle across the site.
 * Persists in localStorage under `pac-last-vehicle`. Cross-component
 * sync via the `pac:vehicle-changed` window CustomEvent (detail: Vehicle | null).
 *
 * Consumers :
 *   - <VehiclePanel /> (Header) — chip + modal
 *   - catalogue/[slug] — compatibility banner
 *   - contact.astro — devis form prefill
 *   - any future surface that wants vehicle context
 *
 * SSR-safe : every function checks `typeof window` before touching
 * localStorage / window APIs. Astro pre-renders pages at build time;
 * this file must not crash in that context.
 *
 * Cf. .project-store/decisions.md ADR-008, ADR-009 ;
 *     .project-store/knowledge.md T-pac-oscaro-patterns ;
 *     .project-store/roadmap.md Phase 5.
 */

export type VehicleSource = 'cascade' | 'manual' | 'plate';

export interface Vehicle {
  /** Marque (constructeur) — ex. "Renault", "Toyota". */
  marque: string;
  /** Modèle — ex. "Clio", "RAV4". */
  modele: string;
  /** Année — 4-digit integer. */
  annee: number;
  /** Motorisation libre — ex. "1.5 dCi", "TDI 110". Optional. */
  motorisation?: string;
  /** How the vehicle was captured. `cascade` = picked from MMY data, `manual` = free-typed. */
  source: VehicleSource;
  /** ISO timestamp written by `writeVehicle`. */
  savedAt: string;
}

const STORAGE_KEY = 'pac-last-vehicle';
const CHANGE_EVENT = 'pac:vehicle-changed';
const OPEN_EVENT = 'pac:vehicle-open';

/**
 * Read the persisted vehicle. Returns `null` on SSR, missing, or
 * malformed payload. Never throws.
 */
export function readVehicle(): Vehicle | null {
  if (typeof window === 'undefined') return null;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<Vehicle>;
    if (
      typeof parsed?.marque !== 'string' ||
      typeof parsed?.modele !== 'string' ||
      typeof parsed?.annee !== 'number' ||
      !parsed.marque.trim() ||
      !parsed.modele.trim() ||
      !Number.isFinite(parsed.annee)
    ) {
      return null;
    }
    return {
      marque: parsed.marque,
      modele: parsed.modele,
      annee: parsed.annee,
      motorisation: parsed.motorisation,
      source: parsed.source === 'manual' ? 'manual' : parsed.source === 'plate' ? 'plate' : 'cascade',
      savedAt: parsed.savedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

/**
 * Persist a vehicle. Stamps `savedAt` automatically. Dispatches
 * `pac:vehicle-changed` with the new vehicle as detail. Returns the
 * persisted record.
 */
export function writeVehicle(v: Omit<Vehicle, 'savedAt'>): Vehicle {
  const stamped: Vehicle = { ...v, savedAt: new Date().toISOString() };
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(stamped));
    } catch {
      // localStorage may throw in privacy mode / quota — silent fail OK
    }
    window.dispatchEvent(new CustomEvent<Vehicle>(CHANGE_EVENT, { detail: stamped }));
  }
  return stamped;
}

/**
 * Drop the persisted vehicle. Dispatches `pac:vehicle-changed` with
 * `null` as detail.
 */
export function clearVehicle(): void {
  if (typeof window === 'undefined') return;
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  window.dispatchEvent(new CustomEvent<Vehicle | null>(CHANGE_EVENT, { detail: null }));
}

/**
 * Format a vehicle as a single human-friendly line.
 * Ex. `vehicleLabel({marque:"Renault", modele:"Clio", annee:2018})` → `"Renault Clio 2018"`.
 */
export function vehicleLabel(v: Vehicle): string {
  return [v.marque, v.modele, v.annee].filter(Boolean).join(' ');
}

/**
 * Subscribe to vehicle changes. Returns an unsubscribe function.
 * Use in React effects, vanilla JS scripts, etc.
 */
export function onVehicleChange(handler: (v: Vehicle | null) => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = (e: Event) => handler((e as CustomEvent<Vehicle | null>).detail);
  window.addEventListener(CHANGE_EVENT, listener);
  return () => window.removeEventListener(CHANGE_EVENT, listener);
}

/**
 * Programmatically request the vehicle modal to open. Used by the
 * catalogue compat banner CTA, the home hero CTA, etc. The
 * <VehiclePanel /> island listens for this event.
 */
export function requestOpenVehicleModal(): void {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
}

/**
 * Subscribe to "open the modal please" requests. Used internally by
 * <VehiclePanel />.
 */
export function onOpenRequest(handler: () => void): () => void {
  if (typeof window === 'undefined') return () => {};
  const listener = () => handler();
  window.addEventListener(OPEN_EVENT, listener);
  return () => window.removeEventListener(OPEN_EVENT, listener);
}
