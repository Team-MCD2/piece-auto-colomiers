/**
 * VehiclePanel — "Mon véhicule" Oscaro-style chip + modal selector.
 *
 * Single React island that owns BOTH the always-visible chip in the
 * header and the on-demand modal selector. Mounts once per page,
 * client:load (we need localStorage hydration before paint to avoid
 * an empty-state flash on returning visitors).
 *
 * Behaviour :
 *   - empty state : "🚗 Renseignez votre véhicule" — subtle pill.
 *     Click → opens modal.
 *   - set state   : "Pour votre <marque> <modèle> <année>" pill with
 *     a pencil (edit) and an × (clear).
 *   - modal       : 2-tab panel (Cascade / Manuelle). Cascade uses
 *     `data/vehicles.js` MMY data ; Manuelle is a free-typed escape
 *     hatch for vehicles not in our dataset.
 *   - external    : any surface can call `requestOpenVehicleModal()`
 *     to surface the modal (catalogue compat banner, home hero CTA).
 *
 * State sync :
 *   - localStorage `pac-last-vehicle` is the source of truth (read
 *     on mount via useEffect — SSR-safe).
 *   - cross-component sync via the `pac:vehicle-changed` window
 *     CustomEvent dispatched by `writeVehicle` / `clearVehicle`
 *     (catalogue banner + contact form prefill listen to it).
 *
 * Cf. .project-store/decisions.md ADR-008 ;
 *     .project-store/knowledge.md T-pac-oscaro-patterns ;
 *     .project-store/roadmap.md Phase 5.
 */

import { useEffect, useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  readVehicle,
  writeVehicle,
  clearVehicle,
  vehicleLabel,
  onVehicleChange,
  onOpenRequest,
  type Vehicle,
} from '../lib/my-vehicle';
import { MARQUES, getModeles, getYearsForModel } from '../data/vehicles';

type Tab = 'cascade' | 'manual';

const CURRENT_YEAR = new Date().getFullYear();

export default function VehiclePanel() {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [tab, setTab] = useState<Tab>('cascade');

  // Cascade form state
  const [cMarque, setCMarque] = useState('');
  const [cModele, setCModele] = useState('');
  const [cAnnee, setCAnnee] = useState('');

  // Manual form state
  const [mMarque, setMMarque] = useState('');
  const [mModele, setMModele] = useState('');
  const [mAnnee, setMAnnee] = useState('');

  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFocusableRef = useRef<HTMLButtonElement>(null);

  // Hydrate from localStorage on mount + subscribe to external changes
  useEffect(() => {
    setVehicle(readVehicle());
    setHydrated(true);
    const unsubChange = onVehicleChange((v) => setVehicle(v));
    const unsubOpen = onOpenRequest(() => setOpen(true));
    return () => {
      unsubChange();
      unsubOpen();
    };
  }, []);

  // Pre-fill the modal form when opening with an existing vehicle
  useEffect(() => {
    if (!isOpen || !vehicle) return;
    if (vehicle.source === 'cascade' && MARQUES.includes(vehicle.marque)) {
      setTab('cascade');
      setCMarque(vehicle.marque);
      setCModele(vehicle.modele);
      setCAnnee(String(vehicle.annee));
    } else {
      setTab('manual');
      setMMarque(vehicle.marque);
      setMModele(vehicle.modele);
      setMAnnee(String(vehicle.annee));
    }
  }, [isOpen, vehicle]);

  // ESC closes + body scroll lock
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', onKey);
    document.body.classList.add('scroll-locked');
    // Focus the first interactive control for a11y
    setTimeout(() => firstFocusableRef.current?.focus(), 50);
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.classList.remove('scroll-locked');
    };
  }, [isOpen]);

  const modeles = useMemo(() => (cMarque ? getModeles(cMarque) : []), [cMarque]);
  const years = useMemo(
    () => (cMarque && cModele ? getYearsForModel(cMarque, cModele) : []),
    [cMarque, cModele],
  );

  const cascadeValid = !!cMarque && !!cModele && !!cAnnee;
  const manualValid =
    mMarque.trim().length >= 2 &&
    mModele.trim().length >= 1 &&
    /^\d{4}$/.test(mAnnee.trim()) &&
    Number(mAnnee) >= 1950 &&
    Number(mAnnee) <= CURRENT_YEAR + 1;

  const handleOpen = () => setOpen(true);

  const handleClose = () => setOpen(false);

  const handleSaveCascade = () => {
    if (!cascadeValid) return;
    writeVehicle({
      marque: cMarque,
      modele: cModele,
      annee: parseInt(cAnnee, 10),
      source: 'cascade',
    });
    setOpen(false);
  };

  const handleSaveManual = () => {
    if (!manualValid) return;
    writeVehicle({
      marque: mMarque.trim(),
      modele: mModele.trim(),
      annee: parseInt(mAnnee.trim(), 10),
      source: 'manual',
    });
    setOpen(false);
  };

  const handleClear = () => {
    clearVehicle();
    setCMarque('');
    setCModele('');
    setCAnnee('');
    setMMarque('');
    setMModele('');
    setMAnnee('');
  };

  // Avoid a state-mismatch flash before localStorage hydrates
  if (!hydrated) {
    return (
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-pill text-xs text-white/70" aria-hidden="true">
        <CarIcon />
        <span>Mon véhicule</span>
      </div>
    );
  }

  return (
    <>
      {/* === CHIP ===================================================== */}
      {vehicle ? (
        <div className="inline-flex items-center gap-1.5 rounded-pill bg-sky-400/15 border border-sky-400/40 backdrop-blur-sm pl-3 pr-1 py-1 text-xs lg:text-sm">
          <CarIcon className="text-sky-300 shrink-0" />
          <span className="text-white">
            <span className="text-sky-200/90 hidden sm:inline">Pour votre </span>
            <strong className="font-semibold text-white">{vehicleLabel(vehicle)}</strong>
          </span>
          <button
            type="button"
            onClick={handleOpen}
            className="ml-1.5 inline-flex items-center justify-center size-7 rounded-full hover:bg-white/15 transition-colors"
            aria-label="Modifier mon véhicule"
            title="Modifier"
          >
            <PencilIcon />
          </button>
          <button
            type="button"
            onClick={handleClear}
            className="inline-flex items-center justify-center size-7 rounded-full hover:bg-white/15 transition-colors"
            aria-label="Effacer mon véhicule"
            title="Effacer"
          >
            <XIcon />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={handleOpen}
          className="inline-flex items-center gap-2 rounded-pill bg-white/5 hover:bg-white/10 border border-white/15 hover:border-sky-400/50 px-3 py-1.5 text-xs lg:text-sm font-semibold text-white transition-colors"
          aria-label="Renseigner mon véhicule"
        >
          <CarIcon className="text-sky-300" />
          <span className="hidden sm:inline">Renseignez votre véhicule</span>
          <span className="sm:hidden">Mon véhicule</span>
        </button>
      )}

      {/* === MODAL (rendered via Portal to escape header containing block) === */}
      {isOpen && hydrated && createPortal(
        <div
          className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center bg-marine-900/85 backdrop-blur-sm animate-fade-in p-0 sm:p-4"
          onClick={(e) => e.target === e.currentTarget && handleClose()}
          role="presentation"
        >
          <div
            ref={dialogRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby="vehicle-dialog-title"
            className="bg-white text-charcoal-700 rounded-t-card sm:rounded-card shadow-2xl w-full sm:max-w-lg max-h-[90vh] overflow-y-auto animate-fade-up"
          >
            {/* Header */}
            <header className="flex items-center justify-between gap-3 px-5 sm:px-6 pt-5 sm:pt-6 pb-3 border-b border-charcoal-100">
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center justify-center size-10 rounded-pill bg-marine-800 text-white">
                  <CarIcon />
                </span>
                <div>
                  <h2 id="vehicle-dialog-title" className="font-display uppercase text-base sm:text-lg leading-tight text-marine-900">
                    Mon véhicule
                  </h2>
                  <p className="text-xs text-charcoal-500 leading-tight mt-0.5">Pour des devis pré-remplis et une navigation contextualisée.</p>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClose}
                ref={firstFocusableRef}
                className="inline-flex items-center justify-center size-9 rounded-pill hover:bg-charcoal-50 text-charcoal-500 transition-colors"
                aria-label="Fermer la fenêtre"
              >
                <XIcon />
              </button>
            </header>

            {/* Tabs */}
            <div className="px-5 sm:px-6 pt-4">
              <div role="tablist" aria-label="Méthode de saisie" className="flex gap-1 p-1 bg-charcoal-50 rounded-pill">
                <TabButton active={tab === 'cascade'} onClick={() => setTab('cascade')} label="Marque / Modèle" />
                <TabButton active={tab === 'manual'} onClick={() => setTab('manual')} label="Saisie manuelle" />
              </div>
            </div>

            {/* Body */}
            <div className="px-5 sm:px-6 pb-6 pt-4">
              {tab === 'cascade' ? (
                <div className="space-y-3">
                  <Field label="Marque" htmlFor="vp-marque">
                    <select
                      id="vp-marque"
                      value={cMarque}
                      onChange={(e) => {
                        setCMarque(e.target.value);
                        setCModele('');
                        setCAnnee('');
                      }}
                      className="form-select"
                    >
                      <option value="">Choisir une marque…</option>
                      {MARQUES.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Modèle" htmlFor="vp-modele">
                    <select
                      id="vp-modele"
                      value={cModele}
                      onChange={(e) => {
                        setCModele(e.target.value);
                        setCAnnee('');
                      }}
                      disabled={!cMarque}
                      className="form-select disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">{cMarque ? 'Choisir un modèle…' : 'Choisissez d’abord une marque'}</option>
                      {modeles.map((m) => (
                        <option key={m} value={m}>
                          {m}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <Field label="Année" htmlFor="vp-annee">
                    <select
                      id="vp-annee"
                      value={cAnnee}
                      onChange={(e) => setCAnnee(e.target.value)}
                      disabled={!cModele}
                      className="form-select disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <option value="">{cModele ? 'Choisir une année…' : 'Choisissez d’abord un modèle'}</option>
                      {years.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                  </Field>
                  <p className="text-xs text-charcoal-500 pt-1">
                    Marque ou modèle absent ?{' '}
                    <button
                      type="button"
                      onClick={() => setTab('manual')}
                      className="text-sky-600 hover:text-sky-700 underline font-semibold"
                    >
                      Saisir manuellement
                    </button>
                    .
                  </p>
                  <button
                    type="button"
                    onClick={handleSaveCascade}
                    disabled={!cascadeValid}
                    className="btn-primary btn-md w-full mt-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Enregistrer mon véhicule
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  <Field label="Marque" htmlFor="vp-mmarque">
                    <input
                      id="vp-mmarque"
                      type="text"
                      value={mMarque}
                      onChange={(e) => setMMarque(e.target.value)}
                      placeholder="Ex : Alfa Romeo, Lexus, SsangYong…"
                      className="form-input"
                      autoComplete="off"
                    />
                  </Field>
                  <Field label="Modèle" htmlFor="vp-mmodele">
                    <input
                      id="vp-mmodele"
                      type="text"
                      value={mModele}
                      onChange={(e) => setMModele(e.target.value)}
                      placeholder="Ex : Giulietta, IS 250, Tivoli…"
                      className="form-input"
                      autoComplete="off"
                    />
                  </Field>
                  <Field label="Année" htmlFor="vp-mannee">
                    <input
                      id="vp-mannee"
                      type="number"
                      inputMode="numeric"
                      value={mAnnee}
                      min="1950"
                      max={CURRENT_YEAR + 1}
                      onChange={(e) => setMAnnee(e.target.value)}
                      placeholder="Ex : 2018"
                      className="form-input"
                    />
                  </Field>
                  <button
                    type="button"
                    onClick={handleSaveManual}
                    disabled={!manualValid}
                    className="btn-primary btn-md w-full mt-3 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    Enregistrer mon véhicule
                  </button>
                </div>
              )}

              {vehicle && (
                <button
                  type="button"
                  onClick={() => {
                    handleClear();
                    handleClose();
                  }}
                  className="w-full text-xs text-charcoal-500 hover:text-charcoal-700 mt-4 underline transition-colors"
                >
                  Effacer mon véhicule
                </button>
              )}

              <p className="text-xs text-charcoal-400 mt-4 leading-relaxed">
                Information stockée localement sur votre navigateur ({' '}
                <code className="font-mono">localStorage</code>). Aucun envoi serveur,
                aucune donnée RGPD-sensible.
              </p>
            </div>
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}

// =====================================================================
// Sub-components & icons
// =====================================================================

function TabButton({ active, onClick, label }: { active: boolean; onClick: () => void; label: string }) {
  return (
    <button
      type="button"
      role="tab"
      aria-selected={active}
      onClick={onClick}
      className={`flex-1 px-3 py-2 rounded-pill text-xs sm:text-sm font-semibold transition-colors ${
        active ? 'bg-white text-marine-900 shadow-sm' : 'text-charcoal-500 hover:text-charcoal-700'
      }`}
    >
      {label}
    </button>
  );
}

function Field({ label, htmlFor, children }: { label: string; htmlFor: string; children: React.ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="block">
      <span className="block text-xs font-semibold uppercase tracking-wider text-charcoal-600 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

function CarIcon({ className = '' }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2" />
      <circle cx="6.5" cy="16.5" r="2.5" />
      <circle cx="16.5" cy="16.5" r="2.5" />
    </svg>
  );
}

function PencilIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  );
}
