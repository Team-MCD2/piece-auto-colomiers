/**
 * vehicles — MMY (Marque / Modèle / Année) cascade seed data.
 *
 * Used by <VehiclePanel /> for the cascade tab of the vehicle selector.
 * Coverage : ~20 marques × 4-7 modèles each, year ranges roughly
 * 2000-2026 depending on model lifecycle. NOT exhaustive — the
 * "Saisie manuelle" tab in the modal is the escape hatch for any
 * marque or modèle absent from this list.
 *
 * Selection criteria (FR market, 2026) :
 *   - all common European brands (Renault / Peugeot / Citroën / VW /
 *     Opel / Ford / Fiat / Mercedes / BMW / Audi / Mini / Dacia)
 *   - common Japanese (Toyota / Nissan / Honda / Mazda / Suzuki /
 *     Mitsubishi)
 *   - common Korean (Hyundai / Kia)
 *   - 4x4 staples for the Colomiers store positioning (Land Rover,
 *     Jeep)
 *
 * Each value is a [yearStart, yearEnd] tuple representing the
 * range of model-years we recognise. The year cascade in the UI
 * generates the dropdown options descending from yearEnd (capped
 * at the current year) down to yearStart.
 *
 * Cf. .project-store/decisions.md ADR-008, ADR-003 (cascade form) ;
 *     .project-store/knowledge.md T-pac-oscaro-patterns,
 *     T-pac-cascade-without-plate.
 */

export const VEHICLES = {
  Audi: {
    'A1': [2010, 2026],
    'A3': [2003, 2026],
    'A4': [2000, 2026],
    'A6': [2000, 2026],
    'Q3': [2011, 2026],
    'Q5': [2008, 2026],
  },
  BMW: {
    'Série 1': [2004, 2026],
    'Série 2': [2014, 2026],
    'Série 3': [2000, 2026],
    'Série 5': [2000, 2026],
    'X1': [2009, 2026],
    'X3': [2003, 2026],
  },
  Citroën: {
    'C1': [2005, 2022],
    'C3': [2002, 2026],
    'C4': [2004, 2026],
    'C5 Aircross': [2018, 2026],
    'Berlingo': [2000, 2026],
    'Jumpy': [2007, 2026],
  },
  Dacia: {
    'Sandero': [2008, 2026],
    'Duster': [2010, 2026],
    'Logan': [2004, 2026],
    'Lodgy': [2012, 2024],
    'Spring': [2021, 2026],
  },
  Fiat: {
    '500': [2007, 2026],
    'Panda': [2003, 2026],
    'Punto': [2000, 2018],
    'Tipo': [2015, 2026],
    'Ducato': [2006, 2026],
  },
  Ford: {
    'Fiesta': [2002, 2026],
    'Focus': [2000, 2026],
    'Kuga': [2008, 2026],
    'Puma': [2019, 2026],
    'Transit': [2000, 2026],
  },
  Honda: {
    'Civic': [2000, 2026],
    'CR-V': [2002, 2026],
    'HR-V': [2015, 2026],
    'Jazz': [2002, 2026],
  },
  Hyundai: {
    'i10': [2008, 2026],
    'i20': [2008, 2026],
    'i30': [2007, 2026],
    'Tucson': [2004, 2026],
    'Kona': [2017, 2026],
  },
  Jeep: {
    'Renegade': [2014, 2026],
    'Compass': [2007, 2026],
    'Cherokee': [2000, 2026],
    'Wrangler': [2000, 2026],
  },
  Kia: {
    'Picanto': [2004, 2026],
    'Rio': [2000, 2026],
    'Ceed': [2006, 2026],
    'Sportage': [2004, 2026],
    'Niro': [2016, 2026],
  },
  'Land Rover': {
    'Discovery': [2000, 2026],
    'Range Rover Evoque': [2011, 2026],
    'Defender': [2000, 2026],
    'Freelander': [2000, 2014],
  },
  Mazda: {
    'Mazda 2': [2003, 2026],
    'Mazda 3': [2003, 2026],
    'CX-3': [2015, 2026],
    'CX-5': [2012, 2026],
  },
  Mercedes: {
    'Classe A': [2004, 2026],
    'Classe B': [2005, 2026],
    'Classe C': [2000, 2026],
    'Classe E': [2000, 2026],
    'GLA': [2014, 2026],
    'Vito': [2003, 2026],
  },
  Mini: {
    'Cooper': [2001, 2026],
    'Countryman': [2010, 2026],
    'Clubman': [2007, 2024],
  },
  Mitsubishi: {
    'ASX': [2010, 2026],
    'Outlander': [2003, 2024],
    'L200': [2006, 2026],
    'Space Star': [2013, 2026],
  },
  Nissan: {
    'Micra': [2002, 2026],
    'Qashqai': [2007, 2026],
    'Juke': [2010, 2026],
    'X-Trail': [2001, 2026],
    'NV200': [2010, 2026],
    'Navara': [2005, 2026],
  },
  Opel: {
    'Corsa': [2000, 2026],
    'Astra': [2000, 2026],
    'Mokka': [2012, 2026],
    'Zafira': [2000, 2019],
    'Vivaro': [2001, 2026],
  },
  Peugeot: {
    '208': [2012, 2026],
    '308': [2007, 2026],
    '2008': [2013, 2026],
    '3008': [2009, 2026],
    '5008': [2009, 2026],
    'Partner': [2000, 2026],
    '508': [2010, 2026],
  },
  Renault: {
    'Clio': [2000, 2026],
    'Mégane': [2002, 2026],
    'Captur': [2013, 2026],
    'Scénic': [2000, 2024],
    'Kangoo': [2000, 2026],
    'Trafic': [2000, 2026],
    'Twingo': [2000, 2024],
    'Master': [2000, 2026],
  },
  Suzuki: {
    'Swift': [2005, 2026],
    'Vitara': [2015, 2026],
    'Jimny': [2000, 2026],
    'SX4': [2006, 2014],
    'Ignis': [2017, 2026],
  },
  Toyota: {
    'Yaris': [2000, 2026],
    'Aygo': [2005, 2026],
    'Auris': [2007, 2018],
    'Corolla': [2002, 2026],
    'RAV4': [2000, 2026],
    'Hilux': [2005, 2026],
    'Land Cruiser': [2000, 2026],
  },
  Volkswagen: {
    'Polo': [2002, 2026],
    'Golf': [2000, 2026],
    'Passat': [2000, 2026],
    'Tiguan': [2007, 2026],
    'T-Roc': [2017, 2026],
    'Caddy': [2003, 2026],
    'Transporter': [2000, 2026],
  },
};

/** Sorted list of all marques. */
export const MARQUES = Object.keys(VEHICLES).sort((a, b) => a.localeCompare(b, 'fr'));

/**
 * Models for a given marque. Returns sorted list, empty array if
 * marque unknown.
 */
export function getModeles(marque) {
  if (!marque || !VEHICLES[marque]) return [];
  return Object.keys(VEHICLES[marque]).sort((a, b) => a.localeCompare(b, 'fr'));
}

/**
 * Year options for a given marque + modèle. Returns descending list
 * of years from `yearEnd` (capped at current year) down to `yearStart`.
 * Empty array if marque or modèle unknown.
 */
export function getYearsForModel(marque, modele) {
  const range = VEHICLES[marque]?.[modele];
  if (!range) return [];
  const [yearStart, yearEnd] = range;
  const currentYear = new Date().getFullYear();
  const top = Math.min(yearEnd, currentYear);
  const years = [];
  for (let y = top; y >= yearStart; y--) {
    years.push(y);
  }
  return years;
}
