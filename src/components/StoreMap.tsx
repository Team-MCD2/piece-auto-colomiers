/**
 * StoreMap — carte interactive Leaflet centrée sur le magasin.
 *
 * Architecture :
 *   - React island (client:visible) — Leaflet n'est pas SSR-safe
 *   - OSM tiles (gratuit, attribution OpenStreetMap requise)
 *   - Custom marker DivIcon : pin sky-400 (#5BA8D9) sur liseré marine —
 *     owner F8 strict logo palette, zero jaune. Reste visible sur tuiles OSM.
 *   - Popup avec adresse + horaires synthétiques + CTA Google Maps
 *   - Scroll-wheel zoom désactivé par défaut (a11y/UX) — activé sur click
 *   - dragging désactivé sur mobile pour ne pas piéger le scroll
 *
 * Cf. plan.md §8 (notre-magasin) et §9 (contact).
 */

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import { DivIcon } from 'leaflet';
import { useEffect, useState } from 'react';
import 'leaflet/dist/leaflet.css';

interface StoreMapProps {
  /** Latitude du magasin (cf. STORE.coords.lat). */
  lat: number;
  /** Longitude du magasin (cf. STORE.coords.lng). */
  lng: number;
  /** Raison sociale ou nom commercial (popup title). */
  name: string;
  /** Adresse complète (popup body). */
  address: string;
  /** Téléphone E.164 (lien click-to-call). */
  tel: string;
  /** Téléphone format humain. */
  telDisplay: string;
  /** Hauteur CSS de la map (default 420px). */
  height?: string;
  /** Niveau de zoom initial (default 15). */
  zoom?: number;
}

const MARKER_SVG = `
<svg viewBox="0 0 40 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" flood-opacity="0.3"/>
    </filter>
  </defs>
  <path
    d="M20 0C9 0 0 9 0 20c0 11 20 30 20 30s20-19 20-30C40 9 31 0 20 0z"
    fill="#5BA8D9"
    stroke="#0F2C5A"
    stroke-width="2.5"
    filter="url(#shadow)"
  />
  <circle cx="20" cy="20" r="7" fill="#0F2C5A"/>
</svg>
`.trim();

const customIcon = new DivIcon({
  html: MARKER_SVG,
  className: 'pac-store-marker',
  iconSize: [40, 50],
  iconAnchor: [20, 50],
  popupAnchor: [0, -45],
});

export default function StoreMap({
  lat,
  lng,
  name,
  address,
  tel,
  telDisplay,
  height = '420px',
  zoom = 15,
}: StoreMapProps) {
  const [scrollEnabled, setScrollEnabled] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Évite le mismatch SSR/CSR (même si client:visible le couvre déjà)
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Skeleton shimmering — matches the shimmer utility from globals.css.
    // Keeps the same aspect as the final map so there's no layout shift
    // when Leaflet hydrates. Polish per ADR-007 (Oscaro-grade loading).
    return (
      <div
        style={{ height }}
        className="skeleton flex items-center justify-center"
        role="status"
        aria-label="Chargement de la carte"
      >
        <div className="flex items-center gap-2 text-charcoal-500 text-sm font-medium">
          <svg
            className="animate-pulse-soft"
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          Chargement de la carte…
        </div>
      </div>
    );
  }

  const gmapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <div className="relative">
      <MapContainer
        center={[lat, lng]}
        zoom={zoom}
        scrollWheelZoom={scrollEnabled}
        style={{ height, width: '100%', borderRadius: '12px', zIndex: 0 }}
        aria-label={`Carte du magasin ${name}`}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={customIcon}>
          <Popup>
            <div className="text-sm leading-relaxed">
              <strong className="block text-base mb-1" style={{ color: '#0F2C5A' }}>
                {name}
              </strong>
              <span className="block text-xs">{address}</span>
              <div className="mt-2 flex flex-col gap-1">
                <a
                  href={`tel:${tel}`}
                  className="text-xs font-semibold"
                  style={{ color: '#0F2C5A' }}
                >
                  📞 {telDisplay}
                </a>
                <a
                  href={gmapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold"
                  style={{ color: '#0F2C5A' }}
                >
                  → Itinéraire Google Maps
                </a>
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>

      {/* Overlay click-to-zoom (UX a11y : la map ne capture pas le scroll page) */}
      {!scrollEnabled && (
        <button
          type="button"
          onClick={() => setScrollEnabled(true)}
          className="absolute inset-0 z-10 flex items-center justify-center bg-marine-900/0 hover:bg-marine-900/10 transition-colors group cursor-pointer"
          aria-label="Activer le zoom à la molette"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-marine-800 text-white text-xs font-semibold px-3 py-1.5 rounded-pill shadow-lg pointer-events-none">
            Cliquez pour activer le zoom
          </span>
        </button>
      )}
    </div>
  );
}
