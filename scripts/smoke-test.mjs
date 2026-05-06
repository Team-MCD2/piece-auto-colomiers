#!/usr/bin/env node
/**
 * Lightweight smoke test — runs against the local dev server.
 *
 * For each route, we check :
 *   - HTTP 200
 *   - Critical DOM markers (hero title, reveal attributes, VT names)
 *   - Expected scripts/islands wired up
 *
 * Run with : `node scripts/smoke-test.mjs [http://localhost:4327]`
 * No external deps — plain fetch.
 *
 * Extend the ROUTES array when adding new key pages. This is not a
 * replacement for Playwright, but it catches regressions in rendered
 * HTML cheaply (< 5 s on localhost).
 */

const HOST = process.argv[2] || process.env.SMOKE_HOST || 'http://localhost:4327';

const ROUTES = [
  {
    path: '/',
    must: [
      'view-transition-name: hero-title',
      // Chatbot FAB is always rendered (panel hidden until clicked).
      'aria-controls="pac-chatbot-panel"',
      `aria-label="Ouvrir l&#x27;assistant"`,
      'data-reveal',
      'data-opening-badge',
      'AggregateRating',         // JSON-LD Google rating
      'VehiclePanel',            // React island for the vehicle chip
    ],
    mustNot: [
      'bg-signal',               // legacy yellow palette
    ],
  },
  {
    path: '/catalogue',
    must: [
      'view-transition-name: hero-title',
      'data-family-section',
      'filter-pill',
    ],
  },
  {
    path: '/catalogue/plaquettes-de-frein',
    must: [
      'view-transition-name: hero-title',
      'data-wa-enhance',
      'data-wa-category',
      'vehicle-compat-banner',
    ],
  },
  {
    path: '/services',
    must: [
      'view-transition-name: hero-title',
      'data-reveal',
    ],
  },
  {
    path: '/notre-magasin',
    must: [
      'view-transition-name: hero-title',
      'data-reveal',
    ],
  },
  {
    path: '/contact',
    must: [
      'view-transition-name: hero-title',
      'devis-marque',
      'data-reveal',
    ],
  },
  {
    path: '/mentions-legales',
    must: [],
  },
  {
    path: '/404',
    must: [],
    expectStatus: 404,
  },
];

let failures = 0;

for (const route of ROUTES) {
  const url = HOST + route.path;
  try {
    const res = await fetch(url, { redirect: 'manual' });
    const expected = route.expectStatus ?? 200;
    const body = await res.text();

    if (res.status !== expected) {
      console.error(`✘ ${route.path}  status ${res.status} (expected ${expected})`);
      failures++;
      continue;
    }

    let localFails = 0;
    for (const needle of route.must ?? []) {
      if (!body.includes(needle)) {
        console.error(`  ✘ ${route.path}  missing "${needle}"`);
        localFails++;
      }
    }
    for (const needle of route.mustNot ?? []) {
      if (body.includes(needle)) {
        console.error(`  ✘ ${route.path}  forbidden "${needle}"`);
        localFails++;
      }
    }

    if (localFails === 0) {
      console.log(`✔ ${route.path}  ${res.status}  ${(body.length / 1024).toFixed(1)} KB`);
    } else {
      failures += localFails;
    }
  } catch (err) {
    console.error(`✘ ${route.path}  ${err.message}`);
    failures++;
  }
}

console.log('');
if (failures === 0) {
  console.log(`✔ All ${ROUTES.length} routes passed.`);
  process.exit(0);
}
console.error(`✘ ${failures} check(s) failed.`);
process.exit(1);
