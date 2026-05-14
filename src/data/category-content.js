/**
 * CATEGORY_CONTENT — contenu rédactionnel SPÉCIFIQUE par slug L1.5.
 *
 * Origine D-2026-05-13d (owner brief 2026-05-14) : "does the section
 * that shows wear out signs and what you offer vary for each item ??
 * if not, that's poor work done".
 *
 * La V1 utilisait `data/family-copy.js` (16 jeux génériques par famille).
 * Résultat : `culasse`, `injecteurs`, `bougies-allumage`, etc. partageaient
 * TOUS le même copy famille `moteur` — pas de spécificité.
 *
 * Ce fichier override `family-copy` par slug avec pour chaque entrée :
 *   - offre[]         : 3-4 bullets précis sur ce slug
 *   - signes[]        : 3-4 symptômes spécifiques à cette pièce
 *   - intervention[]  : 4 étapes du remplacement (remplace la vidéo cassée)
 *   - seoLong         : 1-2 phrases SEO long-tail Colomiers / Toulouse Ouest
 *
 * Couverture : 47/47 L1.5. Helper `getCategoryContent()` retourne `null`
 * si absent → `[slug].astro` retombe sur `family-copy`.
 *
 * Cf. ADR-013, log D-2026-05-13d, family-copy.js (legacy fallback).
 */

/** @typedef {{step:number, title:string, body:string}} InterventionStep */
/** @typedef {{offre:string[], signes:string[], intervention:InterventionStep[], seoLong?:string}} CategoryContent */

/** @type {Record<string, CategoryContent>} */
export const CATEGORY_CONTENT = {

  'plaquettes-de-frein': {
    offre: [
      "Plaquettes avant et arrière, montage ABS et non-ABS.",
      "Marques OEM : Brembo, Bosch, ATE, Ferodo, TRW, Textar.",
      "Plaquettes céramiques basse-poussière sur demande.",
      "Témoins d'usure intégrés livrés avec les plaquettes compatibles.",
    ],
    signes: [
      "Bruit métallique aigu au freinage (témoin d'usure qui touche le disque).",
      "Distance d'arrêt anormalement longue, même freinage à fond.",
      "Voyant frein orange ou rouge au tableau de bord.",
      "Vibrations dans la pédale ou le volant en freinage appuyé.",
    ],
    intervention: [
      { step: 1, title: "Lever le véhicule et démonter la roue", body: "Cric et chandelles obligatoires, jamais cric hydraulique seul. Roue déposée, étrier accessible." },
      { step: 2, title: "Ouvrir l'étrier et déposer les plaquettes usées", body: "Goupille ou vis dévissées, piston repoussé au compresseur. Les plaquettes glissent par le haut." },
      { step: 3, title: "Nettoyer le support et poser les neuves", body: "Brosse métallique sur les portées, graisse cuivre sur les zones de contact, ressorts d'origine réutilisés." },
      { step: 4, title: "Remonter et roder", body: "Étrier au couple constructeur. Rodage doux sur 500 km avec freinages progressifs pour mater les garnitures." },
    ],
    seoLong: "Spécialiste plaquettes de frein à Colomiers (31770) pour tourisme, 4×4, utilitaires et japonaises. Marques OEM Brembo, Bosch, Ferodo. Retrait gratuit ou Mondial Relay sous 24-48 h.",
  },

  'disques-de-frein': {
    offre: [
      "Disques pleins, ventilés ou rainurés, avant et arrière.",
      "Diamètres 240-380 mm selon véhicule, épaisseur constructeur respectée.",
      "Marques de référence : Brembo, ATE, Bosch, Ferodo, TRW.",
      "Disques sport (rainurés/percés) pour usage intensif sur demande.",
    ],
    signes: [
      "Sillon profond visible à la surface du disque (> 1 mm).",
      "Épaisseur inférieure à la valeur min gravée sur la tranche du disque.",
      "Vibrations dans le volant ou la pédale au freinage (disque voilé).",
      "Grincement même plaquettes neuves (rouille ou bord lèvre).",
    ],
    intervention: [
      { step: 1, title: "Lever, déposer roue et étrier complet", body: "Étrier libéré du chapeau et accroché par-dessus la suspension pour ne pas tendre le flexible." },
      { step: 2, title: "Dévisser le disque et le déposer", body: "Vis de maintien à l'arrière du disque. Disque collé par la rouille : frapper en alternance sur le pourtour au marteau plastique." },
      { step: 3, title: "Nettoyer le moyeu et poser le disque neuf", body: "Moyeu propre et plan obligatoire — toute irrégularité provoque un voile. Disque monté côté serti vers la voiture." },
      { step: 4, title: "Remonter étrier + plaquettes neuves", body: "Couple précis sur les vis d'étrier. Toujours changer plaquettes ET disques ensemble si plaquettes > 50% usées." },
    ],
    seoLong: "Disques de frein neufs multi-marques à Colomiers. Conseil personnalisé ventilé vs plein, percé/rainuré selon usage. Devis 24 h, retrait magasin Toulouse Ouest.",
  },

  'etriers-de-frein': {
    offre: [
      "Étriers fixes (Brembo 4 pistons) et flottants (mono-piston).",
      "Étriers neufs ou échange-standard (consigne reprise).",
      "Étriers arrière avec frein de parking mécanique ou électrique.",
      "Kits de réparation (joints, pistons, soufflets) sur demande.",
    ],
    signes: [
      "Frein qui tire d'un côté au freinage (étrier grippé).",
      "Pédale qui s'enfonce molle même purge récente.",
      "Disque ou plaquette qui ne s'use que d'un seul côté.",
      "Fuite de liquide de frein visible au niveau de l'étrier.",
    ],
    intervention: [
      { step: 1, title: "Déposer plaquettes et flexible", body: "Étrier sorti, plaquettes mises de côté. Flexible pincé ou clampé avant dévissage pour ne pas vider le circuit." },
      { step: 2, title: "Démonter l'ancien étrier", body: "Deux vis de fixation au chapeau de fusée. Étrier neuf ou refabriqué pré-rempli si livré avec joints." },
      { step: 3, title: "Reconnecter, purger, remonter", body: "Joint cuivre neuf sur le flexible. Purge complète du circuit de frein (4 roues) pour évacuer l'air." },
      { step: 4, title: "Test pédale et roulage prudent", body: "Pédale ferme moteur tournant. Premier roulage doux avec freinages progressifs pour vérifier serrage." },
    ],
    seoLong: "Étriers de frein neufs ou échange-standard à Colomiers — solution économique fiable. Étriers fixes Brembo, flottants OEM, selon usage et budget.",
  },

  'filtre-a-huile': {
    offre: [
      "Filtres cartouche papier (norme OEM) ou filtres vissés à visser.",
      "Marques de référence : Mann-Filter, Mahle, Bosch, Hengst, Purflux.",
      "Filtres bypass haute filtration pour gros kilométrage.",
      "Joints toriques + bouchons de vidange livrés selon kit.",
    ],
    signes: [
      "Filtre saturé visuellement (couleur noire, particules métalliques).",
      "Pression d'huile basse au tableau de bord à chaud.",
      "Vidange retardée au-delà de l'intervalle constructeur.",
      "Bruit de claquement moteur au démarrage à froid.",
    ],
    intervention: [
      { step: 1, title: "Mettre le moteur à température", body: "Quelques minutes de tournage pour fluidifier l'huile. Couper, ouvrir le bouchon supérieur du moteur." },
      { step: 2, title: "Vidanger l'huile usée", body: "Bac sous le carter, bouchon dévissé. Attendre 10 minutes pour égoutter. Joint de bouchon remplacé par un neuf." },
      { step: 3, title: "Déposer l'ancien filtre", body: "Clé à filtre adaptée. Vissé : sens horaire. Cartouche : démonter le carter, sortir l'élément, joint torique neuf." },
      { step: 4, title: "Poser le filtre neuf et faire le plein", body: "Vissé manuellement + 3/4 de tour. Pré-graisser le joint. Remplir au MAX, vérifier pression au démarrage." },
    ],
    seoLong: "Filtres à huile multi-marques pour vidange entretien à Colomiers (31770). Compatible toutes motorisations essence, diesel, hybride. Conseil sur l'intervalle constructeur exact.",
  },

  'huile-moteur': {
    offre: [
      "Castrol Edge, TotalEnergies Quartz, Mobil 1 — gammes pros.",
      "Viscosités 0W-20, 5W-30, 5W-40, 10W-40, 15W-40 poids lourd.",
      "Normes ACEA A3/B4, C2, C3 + approbations VW 504/507, MB 229.5.",
      "Bidons 1 L, 5 L, 20 L et fûts 60 L (devis flotte).",
    ],
    signes: [
      "Niveau bas à la jauge (en-dessous du repère MIN).",
      "Aspect noir-épais ou laiteux (mélange eau = joint culasse).",
      "Voyant pression d'huile orange au démarrage à froid.",
      "Échéance constructeur dépassée (10 000 à 30 000 km).",
    ],
    intervention: [
      { step: 1, title: "Identifier la bonne viscosité et la bonne norme", body: "Carnet d'entretien, bouchon de remplissage, ou code moteur via nous. Mélanger des viscosités tue l'huile." },
      { step: 2, title: "Faire la vidange complète", body: "Moteur tiède pas brûlant. Bac sous carter, attente 10 minutes. Joint de bouchon neuf systématique." },
      { step: 3, title: "Changer le filtre dans la foulée", body: "Le filtre ne se sépare jamais de la vidange — il retient les particules retirées. Cf. fiche filtre-à-huile." },
      { step: 4, title: "Remplir et vérifier", body: "Volume précis constructeur (3,5-5 L). À 90% du max, démarrer 30 s, attendre 5 minutes, compléter au MAX." },
    ],
    seoLong: "Huile moteur premium Castrol, TotalEnergies, Mobil 1 à Colomiers. Conseil personnalisé sur la viscosité exacte selon votre code moteur. Référence approuvée constructeur sous 24 h.",
  },

  'bougies-allumage': {
    offre: [
      "Bougies d'allumage essence (NGK, Bosch, Denso, Champion).",
      "Bougies de préchauffage diesel (Beru, NGK, Bosch).",
      "Bougies iridium ou platine longue durée (jusqu'à 100 000 km).",
      "Têtes d'allumage, bobines d'allumage, faisceaux haute tension.",
    ],
    signes: [
      "Démarrage difficile à froid ou impossible (préchauffage HS).",
      "Ratés d'allumage à l'accélération (à-coups, voyant moteur).",
      "Consommation en hausse sans raison apparente.",
      "Échéance constructeur dépassée (40 000 à 100 000 km selon type).",
    ],
    intervention: [
      { step: 1, title: "Repérer les bougies sous le cache moteur", body: "Essence : 4-6 bobines individuelles au-dessus des cylindres. Diesel : bougies de préchauffage sous les injecteurs ou en latéral." },
      { step: 2, title: "Débrancher la bobine et dévisser", body: "Bobine soulevée verticalement (pas par le câble). Clé à bougie longue + rallonge pour atteindre le siège." },
      { step: 3, title: "Vérifier l'écartement et poser la neuve", body: "Essence : écartement 0,7-1,1 mm selon constructeur, vérifier à la cale. Vissée à la main puis serrée au couple (15-25 N·m)." },
      { step: 4, title: "Réinstaller la bobine et tester", body: "Bobine remise jusqu'au clic, connecteur enclenché. Démarrage doit être franc. Effacer codes défaut si voyant moteur." },
    ],
    seoLong: "Bougies d'allumage essence (NGK, Bosch, Denso) et bougies de préchauffage diesel à Colomiers. Bougies iridium longue durée pour espacer l'entretien. Code moteur = référence exacte.",
  },

  'injecteurs': {
    offre: [
      "Injecteurs essence multipoint et injection directe (GDI, FSI, TFSI).",
      "Injecteurs diesel common-rail (Bosch, Delphi, Denso, Siemens VDO).",
      "Injecteurs neufs ou échange-standard avec consigne reprise.",
      "Tests débit / étanchéité sur banc avant expédition (sur demande).",
    ],
    signes: [
      "Fumée noire à l'accélération (diesel) ou ratés moteur (essence).",
      "Voyant moteur allumé avec code défaut P0200-P0299.",
      "Sur-consommation soudaine + perte de puissance.",
      "Démarrage difficile à chaud (perte d'étanchéité injecteur).",
    ],
    intervention: [
      { step: 1, title: "Repérer le cylindre défaillant", body: "Diagnostic électronique : P0201 = cyl. 1, P0202 = cyl. 2, etc. Vérifier aussi qualité carburant et filtre." },
      { step: 2, title: "Dépressuriser et démonter le rail", body: "Diesel common-rail : pression résiduelle énorme (2000 bars). Attendre 1 h moteur froid avant d'ouvrir." },
      { step: 3, title: "Extraire et remplacer l'injecteur", body: "Extracteur dédié si calaminé. Joints cuivre et toriques systématiquement remplacés (livrés avec le kit)." },
      { step: 4, title: "Coder l'injecteur et purger", body: "Common-rail : le calculateur apprend le code IMA du nouvel injecteur via valise. Purger l'air + premier démarrage." },
    ],
    seoLong: "Injecteurs essence et diesel neufs ou échange-standard à Colomiers. Spécialiste common-rail Bosch, Delphi, Denso pour HDi, dCi, TDI, CDI. Test débit + étanchéité sur demande.",
  },

  'culasse': {
    offre: [
      "Culasses neuves ou échange-standard, alu ou fonte selon moteur.",
      "Culasses complètes prêtes au montage : soupapes + joints + arbres.",
      "Joints de culasse multi-couches MLS (Elring, Victor Reinz).",
      "Boulons de culasse TTY (Torque-To-Yield) — kit complet livré.",
    ],
    signes: [
      "Émulsion blanche au bouchon d'huile (huile + eau mélangées).",
      "Vapeur blanche permanente à l'échappement (eau brûlée).",
      "Pertes de liquide de refroidissement sans fuite externe visible.",
      "Surchauffe répétée + voyant température au tableau de bord.",
    ],
    intervention: [
      { step: 1, title: "Vidanger l'huile + liquide refroidissement", body: "L'opération culasse demande un démontage du haut moteur. Vider huile et eau, débrancher la batterie." },
      { step: 2, title: "Déposer la distribution + collecteurs", body: "Courroie ou chaîne déposée en respectant le calage. Collecteurs d'admission et d'échappement démontés." },
      { step: 3, title: "Démonter et inspecter la culasse", body: "Boulons TTY dévissés dans l'ordre constructeur (spirale du centre). Joint de culasse remplacé systématiquement MLS." },
      { step: 4, title: "Remonter au couple + angle constructeur", body: "Boulons TTY neufs (jamais réutiliser). Couple en plusieurs passes + serrage angulaire. Calage refait, plein huile + eau + purge." },
    ],
    seoLong: "Culasses neuves ou échange-standard à Colomiers pour interventions lourdes moteur. Kits joints + boulons TTY complets. Spécialiste diesel HDi, dCi, TDI.",
  },

  'courroie-de-distribution': {
    offre: [
      "Kits complets distribution (courroie + galets tendeur + fixes).",
      "Kits distribution + pompe à eau associée (recommandé constructeur).",
      "Marques pros : Gates, Dayco, INA, SKF, Continental.",
      "Chaînes de distribution sur demande pour véhicules concernés.",
    ],
    signes: [
      "Échéance constructeur dépassée (60 000 à 160 000 km).",
      "Bruit de claquement métallique côté distribution au ralenti.",
      "Fuite d'huile au niveau du carter de distribution.",
      "Vibrations anormales au démarrage à froid.",
    ],
    intervention: [
      { step: 1, title: "Caler le moteur au PMH", body: "Repères de distribution sur poulie vilebrequin et arbres à cames alignés. Outils de calage constructeur obligatoires — improvisation = moteur détruit." },
      { step: 2, title: "Déposer l'ancienne courroie + galets", body: "Tendeur relâché, courroie retirée. Galets tendeur ET fixes systématiquement remplacés (jamais réutiliser)." },
      { step: 3, title: "Poser la pompe à eau si kit le prévoit", body: "Sur 80% des moteurs, pompe à eau entraînée par la courroie. La changer en même temps coûte 30 € de plus et évite une 2e dépose." },
      { step: 4, title: "Remonter, tendre, vérifier le calage", body: "Courroie passée selon l'ordre, tension réglée au tendeur. Faire 2 tours moteur à la main pour vérifier que le calage est préservé." },
    ],
    seoLong: "Kit distribution complet à Colomiers : courroie + galets + pompe à eau associée. Marques pros Gates, Dayco, INA. Ne repoussez jamais cet entretien — courroie cassée = moteur détruit.",
  },

  'embrayage': {
    offre: [
      "Disques d'embrayage seuls (rechange minimum).",
      "Mécanismes d'embrayage seuls (plateaux de pression).",
      "Butées de débrayage hydrauliques ou mécaniques.",
      "Marques de référence : LUK, Sachs, Valeo, Borg & Beck.",
    ],
    signes: [
      "Pédale qui patine (régime moteur monte sans accélération).",
      "Difficulté à passer les vitesses, surtout à froid.",
      "Vibrations dans la pédale au point de patinage.",
      "Odeur de brûlé (garniture qui frotte sans agripper).",
    ],
    intervention: [
      { step: 1, title: "Démonter la boîte de vitesses", body: "L'embrayage est entre le moteur et la boîte. Boîte déposée (4-8 h selon véhicule), accès direct au mécanisme + disque." },
      { step: 2, title: "Inspecter le volant moteur", body: "Surface plane, sans gravures ni fissures. Si marqué : rectification ou remplacement obligatoire pour la durée de vie du neuf." },
      { step: 3, title: "Poser kit complet (disque + mécanisme + butée)", body: "Centrer le disque au mandrin (sinon impossible de remonter la boîte). Mécanisme vissé au couple constructeur en croix." },
      { step: 4, title: "Remonter boîte et purger l'hydraulique", body: "Boîte remise en place. Embrayage hydraulique : purger émetteur + récepteur au DOT 4. Pédale ferme à 30% de course." },
    ],
    seoLong: "Embrayage neuf à Colomiers — disques, mécanismes, butées séparés ou kit complet 3 pièces. Marques pros LUK, Sachs, Valeo. Conseil sur réutilisation du volant bi-masse ou remplacement complet.",
  },

  'kit-embrayage': {
    offre: [
      "Kit 3 pièces : disque + mécanisme + butée de débrayage.",
      "Kit avec volant moteur bi-masse intégré (recommandé sur diesel récent).",
      "Marques pros : LUK Rep-Set, Sachs Performance, Valeo Service.",
      "Outils de centrage du disque livrés avec certains kits.",
    ],
    signes: [
      "Patinage de l'embrayage (régime monte sans accélération).",
      "Difficulté à passer les vitesses (1re, marche arrière surtout).",
      "Vibrations au démarrage en côte ou en charge.",
      "Plus de 150 000 km au compteur (entretien préventif).",
    ],
    intervention: [
      { step: 1, title: "Vérifier l'état du volant moteur AVANT commande", body: "Diesel récent : volant bi-masse souvent en fin de vie en même temps. Si oui, kit avec volant — sinon 2e dépose dans 6 mois." },
      { step: 2, title: "Démonter la boîte de vitesses", body: "Cardans, support moteur, tringlerie, faisceau débranchés. Boîte sortie par-dessous avec cric spécial transmissions." },
      { step: 3, title: "Poser le kit complet sur le volant", body: "Volant nettoyé. Disque centré au mandrin. Mécanisme vissé en croix au couple. Butée graissée légèrement." },
      { step: 4, title: "Remonter la boîte + premier essai", body: "Boîte remontée, hydraulique purgé. Pédale ferme à 30% de course, point de patinage clair. Rodage doux 500 km." },
    ],
    seoLong: "Kit embrayage complet 3 pièces ou avec volant bi-masse à Colomiers. Spécialiste diesel HDi, dCi, TDI dont volants bi-masse. Devis 24 h pour kit + main d'œuvre garage partenaire.",
  },

  'batterie': {
    offre: [
      "Batteries voiture 45-100 Ah (Bosch, Varta, Yuasa, Banner).",
      "Batteries AGM Start-Stop pour véhicules à fonction stop & start.",
      "Batteries utilitaires haute capacité 80-120 Ah.",
      "Batteries 4×4 et loisir camping-car (décharge profonde).",
    ],
    signes: [
      "Démarreur lent ou bruit de cliquetis sans démarrage.",
      "Voyant batterie orange ou rouge au tableau de bord.",
      "Phares qui faiblissent au ralenti, écran qui se dim.",
      "Plus de 4-5 ans d'âge (durée de vie moyenne en France).",
    ],
    intervention: [
      { step: 1, title: "Tester la batterie avant remplacement", body: "Multimètre : 12,6 V moteur arrêté, 13,8-14,4 V moteur tournant. < 12 V à vide : fin de vie. Tester aussi l'alternateur." },
      { step: 2, title: "Identifier le bon format + ampérage", body: "Dimensions L × l × H, polarité, ampérage (Ah) et intensité de démarrage (A). Bornes B0 (standard) ou B1 (utilitaire)." },
      { step: 3, title: "Déconnecter dans l'ordre : moins puis plus", body: "Toujours débrancher la borne (-) en premier puis (+). Inverse au remontage. Pince à serrage net sans tordre les cosses." },
      { step: 4, title: "Coder la batterie sur véhicules récents", body: "BMW, Mercedes, Audi récents : le calculateur de charge apprend la nouvelle batterie via valise. Sinon batterie morte en 12 mois." },
    ],
    seoLong: "Batteries auto à Colomiers (31770) : tourisme, Start-Stop AGM, utilitaire, 4×4. Marques Bosch, Varta, Yuasa, Banner. Test gratuit batterie sur place sur RDV avant achat.",
  },

  'alternateur': {
    offre: [
      "Alternateurs neufs (Bosch, Valeo, Denso, Magneti Marelli).",
      "Alternateurs échange-standard avec consigne reprise (-30 à -50%).",
      "Régulateurs et porte-balais en pièces détachées.",
      "Alternateurs renforcés pour véhicules avec accessoires lourds.",
    ],
    signes: [
      "Voyant batterie allumé MOTEUR TOURNANT (= alternateur ne charge plus).",
      "Tension batterie < 13,5 V moteur en marche au multimètre.",
      "Phares qui faiblissent quand on accélère ou au ralenti.",
      "Bruit de roulement aigu côté alternateur (roulement HS).",
    ],
    intervention: [
      { step: 1, title: "Diagnostiquer l'alternateur avant remplacement", body: "Multimètre aux bornes batterie : 13,8-14,4 V moteur à 1500 tr/min. Sous 13 V : alternateur HS. Sur 15 V : régulateur fou." },
      { step: 2, title: "Débrancher batterie + faisceau alternateur", body: "Déconnecter le (-) batterie. Sur l'alternateur : connecteur multi-pôles + cosse B+. Repérer la position." },
      { step: 3, title: "Déposer la courroie d'accessoires", body: "Tendeur automatique : clé sur le tendeur pour relâcher. Courroie démontée — bonne occasion pour la remplacer si > 50 000 km." },
      { step: 4, title: "Démonter alternateur + poser le neuf", body: "Vis de fixation dévissées. Alternateur sorti, neuf posé, courroie remise selon schéma. Test charge au multimètre." },
    ],
    seoLong: "Alternateurs neufs et échange-standard à Colomiers pour tourisme, 4×4 et utilitaires. Marques Bosch, Valeo, Denso, Magneti Marelli. Échange-standard = solution économique fiable.",
  },

  'demarreur': {
    offre: [
      "Démarreurs neufs ou échange-standard (Bosch, Valeo, Denso).",
      "Démarreurs renforcés pour utilitaires et 4×4 lourds.",
      "Démarreurs Stop & Start pour véhicules à arrêt automatique.",
      "Pièces détachées : solénoïdes, pignons lanceurs, balais charbon.",
    ],
    signes: [
      "Bruit de cliquetis sans rotation du moteur au démarrage.",
      "Démarreur qui tourne dans le vide (pignon lanceur HS).",
      "Démarrage qui se déclenche mais s'arrête immédiatement.",
      "Bruit métallique pendant que le démarreur fonctionne (roulement).",
    ],
    intervention: [
      { step: 1, title: "Différencier batterie / alternateur / démarreur", body: "Tension batterie OK (12,4 V+) ? Phares brillent fort ? Si oui et démarreur ne tourne pas : c'est le démarreur." },
      { step: 2, title: "Localiser le démarreur sous le moteur", body: "Vis au pied du bloc moteur côté boîte. Accès par dessous (cric) ou dessus (cache moteur). 2-3 boulons de fixation." },
      { step: 3, title: "Débrancher câbles + démonter", body: "Câble B+ (gros, batterie permanente) et fil de commande (petit, du contact). Débrancher la batterie d'abord." },
      { step: 4, title: "Poser le neuf + test démarrage", body: "Démarreur positionné, vis au couple. Câbles reconnectés (B+ en premier puis commande). Test démarrage immédiat — doit démarrer sec." },
    ],
    seoLong: "Démarreurs neufs et échange-standard à Colomiers pour tourisme, 4×4 et utilitaires. Diagnostic préalable conseillé : batterie ou alternateur peuvent être la vraie cause.",
  },

  'chargeur-de-batterie': {
    offre: [
      "Chargeurs intelligents 6V/12V (CTEK, Bosch, Telwin, GYS).",
      "Mainteneurs de charge pour batteries de loisir / hivernage.",
      "Démarreurs autonomes (boosters lithium 12V/24V).",
      "Conseils sur l'usage : voiture, moto, camping-car, bateau.",
    ],
    signes: [
      "Batterie qui se décharge si véhicule peu utilisé (< 2 fois/semaine).",
      "Voyant batterie au démarrage à froid en hiver.",
      "Tension batterie < 12,4 V au repos (multimètre, moteur arrêté).",
      "Véhicule loisir / saisonnier laissé inactif l'hiver.",
    ],
    intervention: [
      { step: 1, title: "Choisir le chargeur selon le besoin", body: "Charge rapide (8-15 A) pour atelier. Mainteneur < 1 A pour préserver. Booster lithium pour dépannage immédiat." },
      { step: 2, title: "Connecter dans l'ordre + au bon endroit", body: "Pince rouge sur (+) batterie. Pince noire sur masse châssis (PAS sur la borne -) pour éviter les étincelles." },
      { step: 3, title: "Sélectionner programme + type de batterie", body: "Standard, AGM, gel, lithium — chaque type a sa courbe. Une AGM en mode standard peut être détruite en quelques heures." },
      { step: 4, title: "Surveiller la fin de charge", body: "Chargeur intelligent : passe auto en maintenance après 100%. Basique : déconnecter dès voyant vert pour éviter surcharge." },
    ],
    seoLong: "Chargeurs et mainteneurs de charge batterie à Colomiers : CTEK, Bosch, GYS, Telwin. Solution idéale pour véhicules peu roulants, motos, camping-cars.",
  },

  'pieces-electriques': {
    offre: [
      "Capteurs : ABS, vilebrequin, cames, oxygène (sondes lambda).",
      "Faisceaux, fusibles, relais, connecteurs étanches.",
      "Bobines d'allumage, modules d'allumage, boîtiers BSI.",
      "Outils de diagnostic (valises OBD2) sur demande.",
    ],
    signes: [
      "Voyants tableau de bord (ABS, ESP, moteur) allumés.",
      "Fonctions intermittentes (vitres, clignotants, ventilation).",
      "Décharge batterie nocturne (consommation parasite).",
      "Codes défauts P0xxx ou C0xxx à la valise OBD2.",
    ],
    intervention: [
      { step: 1, title: "Lire les codes défaut à la valise", body: "Branchement OBD2 sous le volant. Codes P (moteur), C (châssis/ABS), B (carrosserie), U (réseau CAN). Le code pointe la zone — pas toujours le composant exact." },
      { step: 2, title: "Confirmer par mesure électrique", body: "Multimètre sur le connecteur : tension d'alimentation, masse, signal. Comparer aux valeurs constructeur. Un capteur peut être mort sans code défaut." },
      { step: 3, title: "Remplacer le composant identifié", body: "Capteur, fusible, relais ou faisceau remplacé. Connecteur étanche neuf si exposition humidité (ABS, lambda, vilebrequin)." },
      { step: 4, title: "Effacer les codes + test", body: "Effacement valise des défauts. Roulage 10 km minimum pour que le calculateur revalide tous les capteurs. Si code revient = mauvais composant." },
    ],
    seoLong: "Capteurs, faisceaux, relais et pièces électriques auto à Colomiers. Spécialiste diagnostic électronique multi-marques. Capteur de vilebrequin, sonde lambda, capteur ABS — on identifie la bonne référence.",
  },

  'phares': {
    offre: [
      "Phares avant complets gauche / droite, halogène ou xénon.",
      "Phares LED de série (gamme constructeur).",
      "Phares OEM (Hella, Valeo, Magneti Marelli, Depo).",
      "Phares antibrouillards et feux additionnels longue portée.",
    ],
    signes: [
      "Phare cassé suite à choc (fissure, joint qui prend l'eau).",
      "Optique opacifiée / jaunie (verre dégradé par UV).",
      "Réglage déporté impossible à corriger (vis de réglage cassée).",
      "Mise en demeure au contrôle technique (faisceau non conforme).",
    ],
    intervention: [
      { step: 1, title: "Démonter le pare-chocs ou la calandre", body: "Pare-chocs déposé pour accéder aux fixations arrière des phares (3-4 vis Torx). Bouchons cache retirés doucement." },
      { step: 2, title: "Débrancher connecteurs + déposer le phare", body: "Connecteur multi-pôles (LED) ou ampoules individuelles (halogène). Débrancher avec précaution les clip / leviers." },
      { step: 3, title: "Poser le phare neuf + recâbler", body: "Fixations remontées, connecteur enclenché. Vérifier l'ouverture/fermeture du joint d'étanchéité (entrée d'eau = phare HS dans 6 mois)." },
      { step: 4, title: "Faire le réglage faisceau à la chaîne", body: "Réglage vertical + horizontal à effectuer au mur (5 m) ou par garage avec banc de réglage. Crucial pour le contrôle technique." },
    ],
    seoLong: "Phares neufs avant et arrière à Colomiers : halogène, xénon, LED. Marques OEM Hella, Valeo, Depo, Magneti Marelli. Optique seule, ampoule seule ou phare complet selon besoin.",
  },

  'phares-led': {
    offre: [
      "Kits LED retrofit homologués CE (Philips, Osram Night Breaker).",
      "Phares LED d'origine pour véhicules concernés.",
      "Calculateurs Canbus anti-erreur pour éviter le voyant tableau.",
      "Lentilles bi-LED projecteurs (montage atelier).",
    ],
    signes: [
      "Halogène d'origine insuffisant (sentiment d'éclairage faible).",
      "Souhait d'améliorer la sécurité de nuit ou par mauvais temps.",
      "Phare avant en fin de vie (occasion de monter LED).",
      "Vérification homologation E (obligatoire en France).",
    ],
    intervention: [
      { step: 1, title: "Vérifier la compatibilité du kit", body: "Tous les kits LED ne passent pas le contrôle technique. UNIQUEMENT kits homologués CE avec marquage E + ampoule type (H7, H4, H11)." },
      { step: 2, title: "Démonter l'ampoule halogène existante", body: "Cache plastique au dos du phare retiré. Connecteur débranché, bague de blocage retirée." },
      { step: 3, title: "Poser la LED + boîtier Canbus si nécessaire", body: "Bague de fixation montée sur le bloc LED. Insertion dans le phare. Boîtier Canbus branché si voyant erreur." },
      { step: 4, title: "Régler la hauteur et tester", body: "Le faisceau LED est très focal — refaire absolument le réglage hauteur. Tester de nuit que le faisceau ne dépasse pas la limite réglementaire." },
    ],
    seoLong: "Kits LED retrofit homologués CE à Colomiers — solution sécurité pour remplacer halogène par LED durables. Marques Philips, Osram Night Breaker. Attention homologation pour contrôle technique.",
  },

  'optiques-de-phares': {
    offre: [
      "Optiques de remplacement (vitre + coque) sans ampoule.",
      "Optiques avec lentille focalisante intégrée (xénon, LED).",
      "Kits de rénovation : ponçage + polish + vernis anti-UV.",
      "Optiques OEM (Hella, Depo, TYC) ou équivalent qualité.",
    ],
    signes: [
      "Opacité jaune/blanche sur le verre extérieur (UV solaire).",
      "Fissure du verre sans casse complète (entrée d'eau imminente).",
      "Buée permanente dans le phare (joint qui n'est plus étanche).",
      "Recalage faisceau impossible (lentille interne déformée).",
    ],
    intervention: [
      { step: 1, title: "Évaluer : rénover ou remplacer ?", body: "Opacité légère : kit rénovation polish + vernis suffit (30-60 €). Fissure ou buée : remplacement (200-500 €). Photos pour conseil." },
      { step: 2, title: "Sur rénovation : démonter ou non", body: "Possible sur phare en place (masquage carrosserie) ou phare déposé (plus propre). Ponçage progressif 600 → 800 → 1200 → 2000 grit." },
      { step: 3, title: "Polir + vernis anti-UV", body: "Polish au mécha rotative ou à la main. Vernis 2K anti-UV en finition obligatoire (sinon : ré-opacification en 6-12 mois)." },
      { step: 4, title: "Sur remplacement : transférer l'ampoule", body: "Optique neuve, ampoule récupérée de l'ancienne, remontée dans la nouvelle. Phare remonté, faisceau réglé au mur." },
    ],
    seoLong: "Optiques de phares neuves ou kit de rénovation à Colomiers. Solution économique (rénovation 60 €) ou définitive (optique neuve avec joint étanche). Conseil pour contrôle technique conforme.",
  },

  'ampoules-auto': {
    offre: [
      "Ampoules halogène standard H1, H3, H4, H7, H8, H11, H15.",
      "Ampoules longue durée +30%, +50%, +130% (Philips, Osram).",
      "Ampoules clignotants P21W, position W5W, plaque C5W.",
      "Ampoules LED retrofit CE pour phares et habitacle.",
    ],
    signes: [
      "Ampoule grillée (phare ou clignotant qui ne s'allume plus).",
      "Faisceau faible ou jaunâtre (ampoule en fin de vie).",
      "Voyant tableau \"ampoule défaillante\" sur véhicules récents.",
      "Souhait d'améliorer l'éclairage sans changer tout le phare.",
    ],
    intervention: [
      { step: 1, title: "Identifier le bon type d'ampoule", body: "Lire la référence sur l'ampoule existante (H7, H4, etc.). NE PAS confondre H4 (bifilament) et H7 (mono) — pas interchangeables." },
      { step: 2, title: "Accéder à l'arrière du phare", body: "Cache plastique au dos du phare retiré. Bague de blocage tournée d'un quart de tour. Connecteur débranché." },
      { step: 3, title: "Manipuler la neuve avec un chiffon", body: "JAMAIS toucher le verre halogène avec les doigts — l'huile cutanée crée des points chauds qui font éclater. Chiffon ou gants." },
      { step: 4, title: "Reposer et tester", body: "Ampoule clipsée, bague tournée à fond, connecteur enclenché. Test phare au tableau de bord. Remettre à zéro compteur ampoule à la valise sur certains modèles." },
    ],
    seoLong: "Ampoules auto à Colomiers : halogène, xénon, LED retrofit. Toutes culots (H1, H4, H7, H11, H15). Versions longue durée +50%, +130% Philips et Osram pour phares principaux, antibrouillards, clignotants.",
  },

  'radiateur': {
    offre: [
      "Radiateurs moteur en alu (Valeo, Nissens, Behr, Denso).",
      "Radiateurs avec ventilateur intégré ou séparé.",
      "Radiateurs pour utilitaires lourds et 4×4 (capacités renforcées).",
      "Durites et colliers haute température pour remontage propre.",
    ],
    signes: [
      "Température moteur instable ou en hausse au tableau de bord.",
      "Fuite de liquide de refroidissement sous le véhicule.",
      "Niveau du vase d'expansion qui baisse régulièrement.",
      "Air dans le circuit (ventilation faible chauffage habitacle).",
    ],
    intervention: [
      { step: 1, title: "Vidanger le liquide de refroidissement", body: "Bouchon de vidange au pied du radiateur ou durite basse débranchée. Vidange complète + récupération du liquide (déchet à éliminer en déchetterie)." },
      { step: 2, title: "Débrancher durites + ventilateur", body: "Durite haute et basse retirées (souvent collées par les ans — couteau fin pour décoller). Connecteur électrique du ventilateur débranché." },
      { step: 3, title: "Déposer + poser le radiateur neuf", body: "Vis ou clips de fixation au cadre avant. Radiateur sorti par le haut. Neuf positionné, durites remises avec colliers neufs." },
      { step: 4, title: "Remplir + purger l'air", body: "Liquide constructeur (G12, G13, etc.) au vase d'expansion. Purge moteur tournant chauffage à fond — l'air sort par les durites de chauffage. Niveau MAX à froid." },
    ],
    seoLong: "Radiateurs moteur multi-marques à Colomiers : Valeo, Nissens, Behr, Denso. Pour tourisme, 4×4 et utilitaires. Liquide de refroidissement constructeur fourni si besoin.",
  },

  'condenseur-clim': {
    offre: [
      "Condenseurs de clim alu (Valeo, Behr, Nissens, Denso).",
      "Condenseurs avec déshydrateur intégré ou séparé.",
      "Joints toriques et fluide R134a / R1234yf sur demande.",
      "Recharge clim sur site partenaire après installation.",
    ],
    signes: [
      "Clim qui souffle tiède même au max (manque de fluide).",
      "Fuite huile + fluide visible côté avant du véhicule.",
      "Bruit anormal du compresseur (lié à pression irrégulière).",
      "Condenseur écrasé suite à choc avant (gravillon ou impact).",
    ],
    intervention: [
      { step: 1, title: "Récupérer le fluide frigorigène (atelier agréé)", body: "OBLIGATOIRE : récupération du fluide par atelier agréé avant tout démontage. Rejet à l'atmosphère = délit environnemental." },
      { step: 2, title: "Déposer le pare-chocs avant", body: "Le condenseur est devant le radiateur moteur. Pare-chocs démonté, calandre déposée pour accéder aux fixations." },
      { step: 3, title: "Démonter condenseur + tuyaux", body: "Tuyaux haute pression dévissés avec clés plates (joints toriques systématiquement remplacés). Condenseur extrait par le haut ou le bas selon véhicule." },
      { step: 4, title: "Remplacer + recharger en atelier", body: "Condenseur neuf monté, déshydrateur changé en même temps (impératif). Recharge fluide + huile compresseur en atelier — pas d'auto-recharge." },
    ],
    seoLong: "Condenseurs de climatisation auto à Colomiers : Valeo, Behr, Nissens, Denso. Compatible R134a et R1234yf. Recharge clim chez atelier partenaire après installation.",
  },

  'compresseur-clim': {
    offre: [
      "Compresseurs neufs ou échange-standard (Denso, Sanden, Valeo).",
      "Compresseurs électriques pour hybrides et électriques.",
      "Embrayages magnétiques de compresseur séparés.",
      "Kits joints + huile compresseur livrés avec.",
    ],
    signes: [
      "Clim qui ne souffle plus du tout du froid (compresseur HS).",
      "Bruit métallique au démarrage de la clim (palier interne).",
      "Embrayage électromagnétique qui ne s'enclenche plus.",
      "Présence de copeaux métalliques dans le circuit (clim sale).",
    ],
    intervention: [
      { step: 1, title: "Récupérer le fluide en atelier agréé", body: "Comme pour le condenseur : récupération obligatoire avant démontage. Récupérer aussi l'huile compresseur si possible." },
      { step: 2, title: "Démonter courroie + déposer compresseur", body: "Compresseur sur le côté du moteur, entraîné par courroie d'accessoires. Tuyaux HP/BP dévissés, compresseur extrait après 3-4 vis." },
      { step: 3, title: "Rincer le circuit si compresseur grippé", body: "Si l'ancien compresseur a libéré des copeaux : rincer condenseur, évaporateur et tuyaux au liquide spécial. Sinon : nouveau compresseur détruit en 100 km." },
      { step: 4, title: "Poser le neuf + recharge en atelier", body: "Compresseur neuf monté avec joints toriques neufs. Filtre déshydrateur changé. Recharge fluide + huile compresseur en quantité précise (constructeur)." },
    ],
    seoLong: "Compresseurs de climatisation auto à Colomiers : Denso, Sanden, Valeo. Compresseurs neufs ou échange-standard avec consigne reprise. Filtre déshydrateur systématiquement changé.",
  },

  'pot-d-echappement': {
    offre: [
      "Pots d'échappement complets ou silencieux arrière seuls.",
      "Lignes complètes inox ou acier (Walker, Bosal, Eberspächer).",
      "Colliers, joints, supports caoutchouc en pièces détachées.",
      "Lignes sport homologuées CE sur demande (sportives uniquement).",
    ],
    signes: [
      "Bruit de souffle au démarrage ou à l'accélération.",
      "Trou ou rouille perforante visible sous le véhicule.",
      "Vibrations dans le plancher (silencieux qui tape la caisse).",
      "Refus au contrôle technique pour échappement non étanche.",
    ],
    intervention: [
      { step: 1, title: "Lever le véhicule sur chandelles", body: "Accès complet sous le véhicule. La ligne d'échappement court du collecteur à l'arrière, passant souvent près du tunnel de transmission." },
      { step: 2, title: "Dévisser les colliers et supports", body: "Boulons d'échappement souvent grippés par la chaleur — pulvériser dégrippant 30 min avant. Supports caoutchouc décrochés à la main." },
      { step: 3, title: "Sortir l'ancienne ligne + nettoyer", body: "Ligne sortie d'un seul tenant ou en sections selon âge. Brides nettoyées à la brosse métal pour bonne portée des joints neufs." },
      { step: 4, title: "Poser le neuf + serrer aux couples", body: "Joints toriques neufs aux brides. Colliers serrés progressivement aux couples constructeur. Test moteur tournant pour vérifier l'étanchéité." },
    ],
    seoLong: "Pots d'échappement à Colomiers : silencieux arrière, lignes complètes, supports caoutchouc. Marques Walker, Bosal, Eberspächer. Solution standard ou sport homologuée CE.",
  },

  'catalyseur': {
    offre: [
      "Catalyseurs homologués CE (Walker, Bosal, EEC).",
      "Catalyseurs spécifiques 4 cyl / 6 cyl / V8 selon véhicule.",
      "Sondes lambda haute température en accessoire.",
      "Code OBD + numéro châssis pour référence exacte garantie.",
    ],
    signes: [
      "Voyant moteur allumé avec code P0420 (efficacité catalyseur).",
      "Perte de puissance et sur-consommation soudaine.",
      "Mode dégradé à haute charge (échappement saturé).",
      "Bruit de billes dans le pot d'échappement (catalyseur fondu).",
    ],
    intervention: [
      { step: 1, title: "Confirmer le diagnostic avec valise", body: "Code P0420 peut venir du catalyseur OU des sondes lambda. Tester les sondes amont/aval AVANT de remplacer le catalyseur (souvent 10× moins cher)." },
      { step: 2, title: "Repérer + déposer le catalyseur", body: "Sur la ligne d'échappement, proche du moteur. Sondes lambda dévissées (clé spéciale 22 mm). Brides amont et aval dévissées." },
      { step: 3, title: "Inspecter les sondes lambda", body: "Si > 100 000 km : remplacer les sondes EN MÊME TEMPS que le catalyseur. Sinon le voyant revient en 2000 km et il faut démonter à nouveau." },
      { step: 4, title: "Monter le neuf + effacer codes", body: "Catalyseur neuf positionné. Joints neufs aux brides. Sondes lambda vissées + reliées. Effacer code défaut, roulage 50 km pour valider l'efficacité." },
    ],
    seoLong: "Catalyseurs homologués CE à Colomiers — multi-marques Walker, Bosal, EEC. Solution conforme contrôle technique pour effacer le code P0420. Conseil diagnostic sondes lambda avant remplacement.",
  },

  'fap': {
    offre: [
      "FAP de remplacement diesel multi-marques (Walker, Klarius, EEC).",
      "Service de nettoyage FAP par ultrasons (sur demande, atelier).",
      "Capteurs de pression différentielle FAP en pièces détachées.",
      "Additifs cérium pour régénération assistée FAP.",
    ],
    signes: [
      "Voyant FAP qui s'allume régulièrement même après long trajet.",
      "Mode dégradé à 80 km/h max (régénération impossible).",
      "Fumée noire dense même hors accélération forte.",
      "Sur-consommation soudaine (FAP qui s'auto-régénère en permanence).",
    ],
    intervention: [
      { step: 1, title: "Identifier l'état réel du FAP via valise", body: "Lire le taux de saturation FAP. < 50% : régénération forcée possible (autoroute 30 min). 60-80% : nettoyage atelier. > 80% : remplacement." },
      { step: 2, title: "Si nettoyage : démonter le FAP", body: "FAP déposé entier de la ligne d'échappement. Sondes lambda et capteur de pression débranchés. Nettoyage ultrasons en atelier (3-4 h)." },
      { step: 3, title: "Si remplacement : poser le FAP neuf", body: "Le FAP neuf est livré avec ses brides et joints. Capteur de pression et sondes transférés ou neufs si > 100 000 km." },
      { step: 4, title: "Réinitialiser le calculateur", body: "Indispensable : remettre à zéro le compteur de saturation FAP via valise. Sinon le voyant revient en 100 km. Roulage 30 min autoroute pour validation." },
    ],
    seoLong: "FAP (filtre à particules) diesel à Colomiers — remplacement ou nettoyage ultrasons. Spécialiste HDi, dCi, TDI, CDI. Diagnostic préalable obligatoire : régénération forcée possible avant remplacement.",
  },

  'amortisseurs': {
    offre: [
      "Amortisseurs avant et arrière (Bilstein, Sachs, Monroe, KYB).",
      "Amortisseurs à gaz haute pression pour usage routier intensif.",
      "Amortisseurs à huile pour tourisme classique.",
      "Kits suspension complets (amortisseur + ressort + butée).",
    ],
    signes: [
      "Voiture qui rebondit après un dos d'âne (test du rebond).",
      "Tenue de route dégradée, sensation de flottement en virage.",
      "Usure irrégulière des pneus (creux ou plats locaux).",
      "Distance de freinage allongée de 20% (mesures normalisées).",
    ],
    intervention: [
      { step: 1, title: "Tester chaque amortisseur", body: "Appuyer fort sur un coin du véhicule, relâcher. S'il rebondit plus d'1 fois : amortisseur HS. Test à faire sur les 4 coins indépendamment." },
      { step: 2, title: "Toujours changer par paire (avant ou arrière)", body: "Un seul amortisseur neuf déséquilibre la tenue de route. Toujours travailler par paire essieu. Idéalement les 4 si > 100 000 km." },
      { step: 3, title: "Démonter l'amortisseur + le ressort", body: "Comprimer le ressort au compresseur dédié (DANGER : ressort détendu sans précaution = projectile). Amortisseur sorti avec son ressort comprimé." },
      { step: 4, title: "Poser le neuf + recompresser", body: "Amortisseur neuf positionné. Ressort recompressé puis détendu progressivement sur le neuf. Couples de serrage constructeur respectés." },
    ],
    seoLong: "Amortisseurs neufs avant et arrière à Colomiers : Bilstein, Sachs, Monroe, KYB. Toujours changer par paire pour préserver la tenue de route. Kits complets disponibles.",
  },

  'amortisseurs-suspension': {
    offre: [
      "Kits suspension complets : amortisseurs + ressorts + butées.",
      "Suspensions sport rabaissées homologuées CE.",
      "Ressorts hélicoïdaux progressifs ou linéaires.",
      "Coupelles d'amortisseur, butées + roulements en pièces.",
    ],
    signes: [
      "Hauteur de caisse asymétrique (un côté plus bas).",
      "Bruit de claquement sur les bosses (butée morte).",
      "Roulis excessif en virage rapide.",
      "Ressort cassé visible à l'œil (spire fendue ou tordue).",
    ],
    intervention: [
      { step: 1, title: "Diagnostiquer toutes les pièces de la suspension", body: "Amortisseur, ressort, butée, coupelle, roulement — chaque pièce a sa durée de vie. Kit complet = pas de 2e dépose dans 6 mois." },
      { step: 2, title: "Compresser le ressort avec sécurité", body: "Compresseur de ressort à 4 points OBLIGATOIRE. Improvisation = risque de blessure grave. Ressort détendu pour démontage." },
      { step: 3, title: "Remplacer toute la jambe de suspension", body: "Sur véhicules McPherson : amortisseur + ressort + butée + coupelle = une seule unité. Remplacement complet de la jambe gauche puis droite." },
      { step: 4, title: "Géométrie obligatoire après remontage", body: "Tout démontage de suspension décale la géométrie. Passage au banc géométrie chez garage partenaire (50-80 €). Sinon : usure pneus accélérée." },
    ],
    seoLong: "Kits suspension complète à Colomiers : amortisseurs + ressorts + butées montés en kit pré-assemblé ou pièces séparées. Suspensions sport rabaissées homologuées CE sur demande.",
  },

  'rotules': {
    offre: [
      "Rotules de suspension (triangle, biellette, axiale).",
      "Rotules de direction (extérieures, intérieures).",
      "Marques pros : SKF, Sasic, Lemförder, Febi Bilstein.",
      "Soufflets de rotule en pièces détachées.",
    ],
    signes: [
      "Claquement net en tournant le volant à fond (rotule grippée).",
      "Vibrations dans le volant à vitesse stable (rotule avec jeu).",
      "Bruit sourd en passage de dos d'âne (rotule de triangle).",
      "Direction qui devient floue (perte de précision).",
    ],
    intervention: [
      { step: 1, title: "Identifier précisément la rotule défaillante", body: "Sur cric : tirer la roue verticalement (rotule de triangle) puis horizontalement (rotule de direction). Le jeu se sent au toucher." },
      { step: 2, title: "Sortir la rotule de son logement", body: "Outil arrache-rotule spécifique (jamais coup de marteau directe — abime le porte-moyeu). Écrou de cône dévissé, rotule extraite à l'arrache." },
      { step: 3, title: "Poser la rotule neuve", body: "Cône nettoyé au papier abrasif fin. Rotule neuve enfoncée à la main, écrou serré au couple constructeur. Goupille fendue neuve obligatoire si applicable." },
      { step: 4, title: "Géométrie obligatoire après remplacement", body: "Toute rotule changée décale le pincement. Passage au banc géométrie chez garage partenaire. Sinon : usure pneus accélérée + direction décalée." },
    ],
    seoLong: "Rotules de direction et de suspension à Colomiers : SKF, Sasic, Lemförder, Febi Bilstein. Toutes positions (triangle, biellette, axiale). Géométrie chez garage partenaire après remplacement.",
  },

  'train-arriere': {
    offre: [
      "Trains arrière complets pour Renault Twingo, Clio, Mégane.",
      "Roulements de roue arrière en pièces détachées.",
      "Barres de torsion, bras de suspension, biellettes.",
      "Diagnostic préalable conseillé pour grosse intervention.",
    ],
    signes: [
      "Bruit de roulement à vitesse stable (50-80 km/h).",
      "Décalage du train arrière (carrossage négatif visuel).",
      "Pneus arrière usés sur le bord interne uniquement.",
      "Bruit de grincement au passage de bosse.",
    ],
    intervention: [
      { step: 1, title: "Identifier la pièce exacte qui pose problème", body: "Roulement seul ? Bras de suspension ? Train complet ? Chaque intervention a une difficulté très différente. Diagnostic chez garage partenaire conseillé." },
      { step: 2, title: "Si train complet : 6-8 h de main d'œuvre", body: "Démontage des étriers, disques, cardans, ressorts, amortisseurs. Train sorti d'un bloc, neuf positionné, tout remonté. Travail de garage." },
      { step: 3, title: "Si roulement seul : presse hydraulique", body: "Roulement extrait à la presse hydraulique (jamais au marteau — porte-moyeu détruit). Neuf inséré à la presse en respectant le calage." },
      { step: 4, title: "Géométrie obligatoire après intervention", body: "Train arrière touché = géométrie OBLIGATOIRE chez garage avec banc. Sans : usure pneus accélérée + risque sécurité." },
    ],
    seoLong: "Trains arrière et pièces détachées à Colomiers — Renault Twingo, Clio, Mégane et autres modèles concernés. Roulements de roue arrière SKF, FAG. Diagnostic conseillé pour intervention lourde.",
  },

  'roulements-de-roue': {
    offre: [
      "Roulements de roue avant et arrière (SKF, FAG, INA, NTN).",
      "Kits moyeu complets (roulement + moyeu + boulons).",
      "Roulements avec capteur ABS intégré pour véhicules récents.",
      "Outils de presse en location ou installation chez partenaire.",
    ],
    signes: [
      "Bruit de ronflement qui augmente avec la vitesse.",
      "Bruit qui varie selon le virage (gauche vs droite → côté HS).",
      "Vibrations dans le volant à vitesse stable.",
      "Voyant ABS allumé (capteur ABS intégré au roulement).",
    ],
    intervention: [
      { step: 1, title: "Identifier le côté + l'essieu défaillant", body: "Bruit qui augmente en virant à droite = roulement gauche en charge = HS. Confirmer en levant la roue : tourner à la main, vérifier jeu + bruit." },
      { step: 2, title: "Démonter étrier, disque, moyeu", body: "Étrier accroché par-dessus suspension. Disque retiré. Écrou de moyeu dévissé (couple souvent énorme : 300 N·m, douille à choc indispensable)." },
      { step: 3, title: "Extraire l'ancien roulement à la presse", body: "Roulement souvent emmanché à force. Presse hydraulique obligatoire — jamais au marteau (porte-moyeu détruit). Bague intérieure et extérieure extraites." },
      { step: 4, title: "Poser le neuf + serrer au couple", body: "Roulement neuf inséré à la presse. Cardan repassé. Écrou de moyeu serré au couple précis constructeur (souvent 280-320 N·m). Goupille fendue si applicable." },
    ],
    seoLong: "Roulements de roue avant et arrière à Colomiers : SKF, FAG, INA, NTN. Kits moyeu complets disponibles. Pose chez garage partenaire avec presse hydraulique conseillée.",
  },

  'cardans': {
    offre: [
      "Cardans complets avec soufflets et joints homocinétiques.",
      "Soufflets de cardan en pièces détachées (caoutchouc EPDM).",
      "Joints homocinétiques côté roue ou côté boîte.",
      "Marques pros : GKN, Spidan, Ina, Loebro.",
    ],
    signes: [
      "Claquement net en tournant le volant à fond (cardan HS).",
      "Soufflet de cardan déchiré + graisse projetée sous le véhicule.",
      "Vibrations à l'accélération en virage.",
      "Bruit de grincement métallique à basse vitesse.",
    ],
    intervention: [
      { step: 1, title: "Vérifier l'état du soufflet d'abord", body: "Souvent : c'est seulement le soufflet qui est déchiré. Si la graisse est encore présente et le joint homocinétique intact = remplacer SEULEMENT le soufflet (30 €)." },
      { step: 2, title: "Démonter le cardan complet", body: "Vidange boîte de vitesses (sortie côté boîte). Écrou de moyeu dévissé (douille à choc). Étrier déposé. Cardan extrait par la fusée." },
      { step: 3, title: "Poser le cardan neuf", body: "Côté boîte : enfoncer le cardan jusqu'au clic du circlip. Côté roue : cardan passé dans la fusée + serrage écrou de moyeu au couple." },
      { step: 4, title: "Plein boîte + test essai", body: "Remplir la boîte au niveau (huile constructeur 75W-90 ou autre selon BV). Roulage 5 km avec virages serrés pour vérifier absence de claquement." },
    ],
    seoLong: "Cardans complets et joints homocinétiques à Colomiers : GKN, Spidan, Ina, Loebro. Kits soufflets de cardan en pièces détachées pour intervention économique avant remplacement complet.",
  },

  'essieux': {
    offre: [
      "Essieux avant et arrière complets pour véhicules concernés.",
      "Pièces détachées : moyeux, fusées, bras de suspension.",
      "Diagnostic préalable conseillé (grosse intervention atelier).",
      "Spécialiste Renault Twingo, Mégane, et autres concernés.",
    ],
    signes: [
      "Bruit de roulement sourd à vitesse stable.",
      "Carrossage anormal (roue vue de derrière : pas droite).",
      "Suite à choc latéral ou nid-de-poule violent.",
      "Pneus avec usure très irrégulière diagonale.",
    ],
    intervention: [
      { step: 1, title: "Diagnostic atelier OBLIGATOIRE", body: "Essieu = travail lourd (6-12 h). Diagnostic préalable par garage avec banc géométrie pour confirmer que l'essieu est bien la cause." },
      { step: 2, title: "Démontage complet du train", body: "Roues, étriers, disques, cardans, ressorts, amortisseurs, biellettes — tout déposé pour accéder à l'essieu. Cric spécial transmissions." },
      { step: 3, title: "Essieu sorti + neuf positionné", body: "Essieu extrait d'un bloc, neuf positionné au cric. Vis de fixation au châssis serrées au couple constructeur (très précis)." },
      { step: 4, title: "Remontage + géométrie complète", body: "Tout le train remonté. Géométrie OBLIGATOIRE chez garage avec banc 4 points. Sans : impossible de rouler droit + usure pneus immédiate." },
    ],
    seoLong: "Essieux avant et arrière à Colomiers pour véhicules tourisme et utilitaires. Pièces détachées (moyeux, fusées) ou essieu complet selon diagnostic. Travail garage uniquement.",
  },

  'volants': {
    offre: [
      "Volants origine constructeur (cuir, plastique, bois).",
      "Volants sport pour véhicules sportifs ou tuning.",
      "Adaptateurs (boss) pour volants sport sur véhicule série.",
      "Volants chauffants pour confort hiver.",
    ],
    signes: [
      "Volant usé visuellement (cuir craquelé, plastique lustré).",
      "Vibrations dans le volant (équilibrage roues / cardan).",
      "Souhait esthétique (volant sport ou cuir prémium).",
      "Volant d'origine cassé ou airbag à remplacer.",
    ],
    intervention: [
      { step: 1, title: "Débrancher la batterie + attendre 5 min", body: "OBLIGATOIRE pour décharger les condensateurs de l'airbag. Travailler sur un airbag chargé = risque de déclenchement (blessures graves)." },
      { step: 2, title: "Déposer l'airbag du volant", body: "Vis à l'arrière du volant (Torx ou hex selon véhicule). Airbag dégagé, connecteur jaune débranché. POSER l'airbag face contre table (pas face en l'air)." },
      { step: 3, title: "Démonter le volant existant", body: "Écrou central du volant dévissé (clé 24 mm). Volant extrait à la main ou à l'extracteur. Repérer la position des roues droites pour l'angle." },
      { step: 4, title: "Poser le neuf + tester", body: "Volant neuf positionné aux mêmes repères. Écrou central au couple (40-60 N·m). Airbag remonté, connecteur enclenché. Batterie reconnectée — voyant airbag doit s'éteindre après 5 s." },
    ],
    seoLong: "Volants d'origine ou sport à Colomiers — cuir, plastique, bois, chauffant. Adaptateurs (boss) pour volants sport sur véhicule série. Attention manipulation airbag : sécurité d'abord.",
  },

  'turbo': {
    offre: [
      "Turbocompresseurs neufs (Garrett, BorgWarner, Mitsubishi).",
      "Turbos échange-standard avec consigne reprise.",
      "Cartouches CHRA pour rebuild atelier sur certains turbos.",
      "Vannes wastegate et capteurs de pression boost.",
    ],
    signes: [
      "Perte de puissance soudaine + mode dégradé activé.",
      "Sifflement aigu anormal à l'accélération.",
      "Fumée bleue à l'échappement (huile brûlée par le turbo).",
      "Voyant moteur allumé avec code P0299 (pression turbo basse).",
    ],
    intervention: [
      { step: 1, title: "Diagnostiquer la cause exacte", body: "Turbo HS peut être une conséquence : huile sale, filtre à air bouché, vanne EGR collée. Identifier la cause root sinon le neuf grille en 5000 km." },
      { step: 2, title: "Préparer la dépose (turbo très chaud)", body: "Attendre 2 h après arrêt moteur (turbo à 800°C en fonctionnement). Vidanger l'huile et déposer durite échappement + admission." },
      { step: 3, title: "Démonter + nettoyer le circuit huile", body: "Turbo extrait. Tube d'arrivée huile rincé impérativement (souvent obstrué = nouvelle casse). Tube de retour vérifié libre." },
      { step: 4, title: "Poser le neuf + amorçage huile", body: "Avant 1er démarrage : amorcer manuellement le turbo en huile au burette (sinon démarrage à sec = palier détruit en 10 s). 1er démarrage 5 min ralenti." },
    ],
    seoLong: "Turbocompresseurs neufs et échange-standard à Colomiers : Garrett, BorgWarner, Mitsubishi, IHI. Diagnostic cause root obligatoire avant pose pour éviter casse répétée. Spécialiste HDi, dCi, TDI.",
  },

  'carburateur': {
    offre: [
      "Carburateurs neufs ou rénovés (Solex, Weber, Stromberg).",
      "Kits de rénovation : joints, gicleurs, flotteur.",
      "Pour véhicules anciens (avant 1990) : 2CV, R4, R5, GS, etc.",
      "Conseil sur réglages richesse + ralenti.",
    ],
    signes: [
      "Démarrage difficile à froid OU à chaud (typique carbu).",
      "Ralenti instable, qui s'éteint au feu rouge.",
      "Consommation anormalement élevée (gicleurs élargis).",
      "Fumée noire (mélange trop riche, gicleur principal usé).",
    ],
    intervention: [
      { step: 1, title: "Démonter le carburateur du collecteur", body: "Tuyaux essence pincés + débranchés. Câble accélérateur, gicleur de starter, tringleries détachés. Carburateur sorti d'un bloc." },
      { step: 2, title: "Démontage complet + nettoyage ultrasons", body: "Démontage par étages (couvercle, corps, base). Toutes les pièces nettoyées au bain ultrasons + bombe carburateur. Inspection des gicleurs au calibre." },
      { step: 3, title: "Remontage avec kit joints neufs", body: "Joints membrane neufs (sinon fuite essence garantie). Gicleurs vérifiés ou remplacés si usés. Flotteur réglé à la hauteur constructeur." },
      { step: 4, title: "Réglages au moteur tournant", body: "Vis de ralenti (vis A), vis de richesse (vis B) — tournevis fin. Réglage moteur chaud au régime constructeur + CO en sortie d'échappement si possible." },
    ],
    seoLong: "Carburateurs neufs ou rénovés à Colomiers pour véhicules anciens : Solex, Weber, Stromberg. Kits joints + gicleurs pour rénovation maison. Spécialiste 2CV, R4, R5, GS et autres collections.",
  },

  'retroviseurs': {
    offre: [
      "Rétroviseurs extérieurs gauche et droit (manuels ou électriques).",
      "Rétroviseurs avec dégivrage, rabattement électrique, mémoires.",
      "Glaces de rétroviseur seules (économique si coque OK).",
      "Rétroviseurs intérieurs avec ou sans anti-éblouissement.",
    ],
    signes: [
      "Rétro extérieur cassé suite à choc latéral ou stationnement.",
      "Glace fissurée mais coque intacte (glace seule suffit).",
      "Moteur électrique HS (rétro qui ne se règle plus).",
      "Dégivrage qui ne fonctionne plus (fil chauffant coupé).",
    ],
    intervention: [
      { step: 1, title: "Identifier ce qu'il faut remplacer", body: "Glace seule (30 €) ou rétro complet (80-300 €) ? Inspecter coque + moteur. Souvent glace seule suffit après un choc léger." },
      { step: 2, title: "Démonter la garniture de porte", body: "Pour rétro complet : démonter la garniture intérieure de portière (clips, vis sous poignée). Connecteur électrique débranché." },
      { step: 3, title: "Dévisser le rétro + poser le neuf", body: "3 vis Torx à l'intérieur de la portière maintiennent le rétro. Neuf positionné, vis serrées, connecteur enclenché." },
      { step: 4, title: "Pour glace seule : clipsage à froid", body: "Glace seule = clipsée directement. Faire levier en haut au plat de la main, déclipser. Glace neuve enfoncée au centre jusqu'au clic." },
    ],
    seoLong: "Rétroviseurs extérieurs et intérieurs à Colomiers — gauche, droit, manuels ou électriques avec dégivrage. Glaces de rétro seules pour remplacement économique post-choc.",
  },

  'essuie-glaces': {
    offre: [
      "Balais d'essuie-glaces avant et arrière toutes longueurs.",
      "Balais hybrides (flexibles + traditionnels) Bosch Aerotwin.",
      "Bras d'essuie-glaces complets pour casses ou usure.",
      "Liquide lave-glace concentré + dégivrant hiver.",
    ],
    signes: [
      "Traces de bandes sur le pare-brise après passage.",
      "Bruit de frottement (caoutchouc dur, glace abrasive).",
      "Balai qui ne touche pas le verre (cintrage cassé).",
      "Bras d'essuie-glace bloqué ou avec jeu en hauteur.",
    ],
    intervention: [
      { step: 1, title: "Identifier la longueur exacte des balais", body: "Longueur balai gauche + balai droit (souvent différentes : ex. 650 mm + 400 mm). Carnet d'entretien ou nous communiquer le véhicule." },
      { step: 2, title: "Déclipser l'ancien balai", body: "Lever le bras d'essuie-glace à la verticale. Sous le balai, languette ou bouton-poussoir à actionner. Balai glissé vers le bas pour se déclipser." },
      { step: 3, title: "Clipser le balai neuf", body: "Adaptateur (souvent livré) à clipser sur le balai pour s'adapter au bras. Balai neuf glissé en position jusqu'au clic d'arrêt." },
      { step: 4, title: "Tester sur pare-brise mouillé", body: "Mouiller le pare-brise au lave-glace. Essai cycle complet : doit balayer sans bandes, sans bruit. Si bande : balai mal clipsé ou pare-brise sale (nettoyer)." },
    ],
    seoLong: "Balais d'essuie-glaces avant et arrière à Colomiers : Bosch Aerotwin, Valeo Silencio, Champion. Bras complets et liquide lave-glace concentré disponibles.",
  },

  'bouchons-reservoir': {
    offre: [
      "Bouchons de réservoir essence et diesel avec ou sans clé.",
      "Bouchons à pression (anti-fuite si renversement).",
      "Bouchons sécurisés anti-vol pour utilitaires.",
      "Joints toriques en pièces détachées si besoin uniquement.",
    ],
    signes: [
      "Voyant moteur orange avec code P0440-P0457 (étanchéité réservoir).",
      "Odeur de carburant à proximité du véhicule.",
      "Bouchon perdu ou cassé.",
      "Verrouillage à clé HS (cylindre cassé)."
    ],
    intervention: [
      { step: 1, title: "Identifier le bon diamètre + filetage", body: "Bouchons normalisés par marque/modèle. Apporter l'ancien ou nous communiquer le véhicule pour la référence exacte." },
      { step: 2, title: "Dévisser et déposer l'ancien", body: "Ouvrir la trappe à carburant. Dévisser dans le sens anti-horaire (clic clic clic en fin de course = pression libérée)." },
      { step: 3, title: "Comparer + visser le neuf", body: "Vérifier que le joint torique du neuf est en place. Visser à fond jusqu'aux clics du cliquet anti-surpression. Trappe refermée." },
      { step: 4, title: "Effacer code défaut si voyant moteur", body: "Si voyant moteur allumé pour étanchéité : effacer le code à la valise. Le bouchon défaillant est la cause #1 du P0440." },
    ],
    seoLong: "Bouchons de réservoir essence et diesel à Colomiers — à clé ou sans, anti-vol pour utilitaires. Cause fréquente du voyant moteur P0440 — pièce économique pour effacer le défaut.",
  },

  'pommeaux-de-vitesse': {
    offre: [
      "Pommeaux origine pour confort retrouvé.",
      "Pommeaux sport (alu, carbone) pour BVM tuning.",
      "Pommeaux de levier de vitesse boîte auto (PRND).",
      "Adaptateurs pour pommeaux universels.",
    ],
    signes: [
      "Pommeau usé esthétiquement (cuir craquelé, plastique lustré).",
      "Pommeau qui se dévisse tout seul (filet usé).",
      "Souhait d'amélioration sport ou cuir prémium.",
      "Casse du pommeau d'origine.",
    ],
    intervention: [
      { step: 1, title: "Dévisser l'ancien pommeau", body: "Boîte mécanique : tourner anti-horaire à la main. Souvent collé par les ans — saisir fermement avec un torchon, tourner d'un coup sec." },
      { step: 2, title: "Vérifier le filet du levier", body: "Filet doit être propre et droit. Si abimé : taraud de remise en état (M10×1,5 ou M12×1,25 selon véhicule). Sinon le neuf ne tient pas." },
      { step: 3, title: "Visser le pommeau neuf", body: "Visser à fond à la main puis 1/4 tour supplémentaire. Si pommeau orienté : tester la position des chiffres au point neutre." },
      { step: 4, title: "Pour boîte auto : adaptateur spécifique", body: "Levier auto avec bouton P : nécessite kit d'adaptation. Lire la notice du pommeau neuf — selon véhicule, démontage du soufflet peut être nécessaire." },
    ],
    seoLong: "Pommeaux de levier de vitesse à Colomiers : origine, sport (alu, carbone), boîte auto. Adaptateurs pour pommeaux universels. Solution rapide pour rajeunir un intérieur usé.",
  },

  'pare-chocs': {
    offre: [
      "Pare-chocs avant et arrière, peints couleur véhicule ou bruts.",
      "Pare-chocs avec ou sans capteurs (radar, lavage, antibrouillards).",
      "Grilles de pare-chocs et accessoires de fixation.",
      "Marques OEM ou équivalent qualité (Magneti Marelli, TYC)."
    ],
    signes: [
      "Pare-chocs cassé ou fissuré suite à choc / accrochage.",
      "Fixations cassées (pare-chocs qui pendouille).",
      "Peinture grossièrement abimée non rénovable.",
      "Capteurs radar de stationnement endommagés.",
    ],
    intervention: [
      { step: 1, title: "Choisir : peint ou brut ?", body: "Peint usine = prêt à monter (plus cher). Brut = à peindre par garage carrossier (moins cher mais 2-3 jours d'atelier). Selon votre budget et urgence." },
      { step: 2, title: "Démonter l'ancien pare-chocs", body: "Vis sous le pare-chocs, dans les passages de roue + au-dessus (sous capot). Connecteurs antibrouillards / radar débranchés. Pare-chocs déclipsé latéralement." },
      { step: 3, title: "Transférer accessoires + capteurs", body: "Antibrouillards, capteurs radar, grilles : démontés de l'ancien, vérifiés, remontés sur le neuf. Tester la continuité électrique avant remontage." },
      { step: 4, title: "Poser le neuf + recâbler", body: "Pare-chocs positionné aux clips latéraux. Vis remises. Connecteurs enclenchés. Test radar de stationnement + antibrouillards." },
    ],
    seoLong: "Pare-chocs avant et arrière à Colomiers — peints ou bruts, avec ou sans capteurs radar. Marques OEM ou équivalent qualité. Conseil sur peint vs brut selon votre budget.",
  },

  'bas-de-caisse': {
    offre: [
      "Bas de caisse plastique de remplacement.",
      "Bas de caisse alu pour SUV et 4×4.",
      "Habillages décoratifs (carbone, chromés) pour tuning.",
      "Fixations et clips spécifiques par véhicule.",
    ],
    signes: [
      "Bas de caisse cassé suite à choc trottoir ou nid-de-poule.",
      "Fixations rompues (bas de caisse qui pend).",
      "Rouille sur bas de caisse métallique d'origine.",
      "Souhait esthétique de remise à neuf.",
    ],
    intervention: [
      { step: 1, title: "Identifier les fixations exactes", body: "Selon véhicule : vis cachées sous l'ouverture de porte, clips au-dessus, écrous-cage. Pas le même mécanisme partout — apporter l'ancien pour comparaison." },
      { step: 2, title: "Démonter avec patience (clips cassants)", body: "Les clips plastique de bas de caisse cassent facilement après 10 ans. En commander quelques-uns d'avance. Démonter lentement de l'arrière vers l'avant." },
      { step: 3, title: "Poser le neuf + clips neufs", body: "Bas de caisse positionné, clips neufs montés à la main aux emplacements. Vis remises au couple constructeur (pas trop fort = plastique fendu)." },
      { step: 4, title: "Vérifier l'alignement", body: "Bas de caisse doit être à plat sur la portière + carrosserie. Aucun jour visible. Si décalage : revérifier les clips et l'alignement avant serrage final." },
    ],
    seoLong: "Bas de caisse plastique ou alu à Colomiers — remplacement post-choc trottoir / nid-de-poule. Habillages décoratifs carbone ou chromés pour tuning. Clips de fixation spécifiques par véhicule.",
  },

  'attelages': {
    offre: [
      "Attelages remorque démontables (col de cygne) ou fixes.",
      "Faisceaux électriques 7 ou 13 broches avec ou sans dispatch.",
      "Boules d'attelage + protections en accessoire.",
      "Marques homologuées CE : Westfalia, Brink, GDW, Auto-Hak.",
    ],
    signes: [
      "Besoin de tracter une caravane / remorque / porte-vélos.",
      "Attelage existant en mauvais état (rouille, boule abîmée).",
      "Faisceau électrique défaillant (clignos remorque qui clignote pas).",
      "Achat d'un véhicule sans attelage d'origine.",
    ],
    intervention: [
      { step: 1, title: "Vérifier la charge maximum tractable", body: "Carte grise rubrique F.2 (PTRA - poids véhicule) = charge max remorque. Attelage choisi DOIT supporter cette charge. Sinon : illégal + dangereux." },
      { step: 2, title: "Démonter pare-chocs arrière", body: "Pour fixer la traverse d'attelage au châssis. Le pare-chocs sera percé d'une encoche (rabattable sur certains véhicules) pour laisser passer le col de cygne." },
      { step: 3, title: "Boulonner la traverse au châssis", body: "Traverse d'attelage vissée aux points de fixation prévus par le constructeur du véhicule (Westfalia/Brink ont des kits dédiés). Couples constructeur respectés." },
      { step: 4, title: "Câbler le faisceau électrique", body: "Faisceau dédié au modèle (pas universel) — prise 7 broches (remorque) ou 13 broches (caravane). Boîtier dispatch sur véhicules récents pour respecter le CAN-Bus." },
    ],
    seoLong: "Attelages remorque à Colomiers : démontables ou fixes, 7 ou 13 broches. Marques homologuées CE (Westfalia, Brink, GDW). Conseil sur la charge maximum tractable selon votre carte grise.",
  },

  'chaines-neige': {
    offre: [
      "Chaînes neige métal (poids lourd, robustes).",
      "Chaînes neige textile (légères, faciles à monter).",
      "Toutes tailles de pneus (155 à 285 mm de section).",
      "Chaussettes neige homologuées B58 pour obligation hivernale.",
    ],
    signes: [
      "Trajet montagne en saison hivernale (obligation B58).",
      "Pneus 4-saisons à compléter pour conditions extrêmes.",
      "Vacances ski en autonomie totale.",
      "Obligation préfectorale en cas d'épisode neigeux.",
    ],
    intervention: [
      { step: 1, title: "Identifier la bonne taille de chaîne", body: "Dimension pneu sur le flanc : 195/65 R15. Tableau de correspondance chaîne par dimension. Acheter EN AMONT du trajet (impossible à monter sous la neige sinon)." },
      { step: 2, title: "Tester le montage à sec en garage", body: "AVANT le voyage : monter et démonter les chaînes une fois à sec. Sinon en condition réelle (-10°C, neige, nuit) c'est l'enfer." },
      { step: 3, title: "Monter les chaînes sur les roues motrices", body: "Traction : roues avant. Propulsion : roues arrière. Étendre la chaîne au sol, avancer la voiture dessus, refermer derrière. Tendeur central serré." },
      { step: 4, title: "Rouler max 50 km/h + arrêt 100 m", body: "Vitesse limitée à 50 km/h chaînes posées. Arrêt après 100 m pour resserrer les tendeurs (chaînes se détendent avec la chaleur des pneus)." },
    ],
    seoLong: "Chaînes neige métal et textile à Colomiers — toutes tailles 155 à 285 mm. Chaussettes neige homologuées B58 pour obligation hivernale Pyrénées et zones montagne. Préparation avant départ ski.",
  },

  'pieces-4x4': {
    offre: [
      "Freinage renforcé : disques épaisseur surdimensionnée.",
      "Suspension lourde charge : amortisseurs gaz, ressorts renforcés.",
      "Transmission : cardans renforcés, croisillons standards.",
      "Pièces spécifiques Toyota Land Cruiser, Jeep Wrangler, Defender.",
    ],
    signes: [
      "Usure accélérée par usage TT, charge ou remorquage.",
      "Pièces tourisme inadéquates pour gabarit 4×4.",
      "Préparation expédition (Maroc, traversée Sahara, etc.).",
      "Conservation valeur résiduelle 4×4 ancien.",
    ],
    intervention: [
      { step: 1, title: "Identifier l'usage : occasion ou intensif", body: "4×4 ville : pièces tourisme renforcées suffisent. 4×4 TT régulier : sourcing spécifique offroad. Préparation expédition : tout renforcé." },
      { step: 2, title: "Vérifier les côtes constructeur", body: "Disques 4×4 sont plus épais que tourisme — ne pas confondre. Amortisseurs 4×4 ont des tarages spécifiques. Apporter les références constructeur." },
      { step: 3, title: "Renforcer par paire (jamais 1 seule pièce)", body: "Sur 4×4 : équilibre essentiel. Amortisseurs par paire essieu, disques par paire essieu, cardans par paire si possible." },
      { step: 4, title: "Banc d'essai après remplacement", body: "Géométrie OBLIGATOIRE après suspension ou direction 4×4 — sinon usure pneus accélérée + sécurité dégradée. Banc 4 points chez garage partenaire." },
    ],
    seoLong: "Pièces 4×4 et SUV à Colomiers — freinage, suspension, transmission renforcés. Spécialiste Toyota Land Cruiser, Jeep Wrangler, Land Rover Defender. Préparation expédition possible.",
  },

  'pieces-japonaises': {
    offre: [
      "Pièces Toyota, Honda, Mazda, Subaru, Nissan, Mitsubishi.",
      "Sourcing OEM japonais ou équivalent qualité européen.",
      "Pièces pour modèles import (Skyline, RX7, Land Cruiser anciens).",
      "Conseil sur spécificités d'entretien et calendrier vidange.",
    ],
    signes: [
      "Pièce introuvable en concession généraliste française.",
      "Modèle import non vendu officiellement en France.",
      "Référence OEM exigée par le garage spécialiste.",
      "Conservation valeur résiduelle véhicule japonais ancien.",
    ],
    intervention: [
      { step: 1, title: "Communiquer la VIN du véhicule", body: "Le numéro de châssis (VIN, 17 caractères) permet une identification précise. Ne pas se fier au seul modèle + année — les variantes japonaises sont nombreuses." },
      { step: 2, title: "Sourcing OEM ou équivalent ?", body: "OEM japonais : original constructeur, qualité garantie, délai 5-15 jours. Équivalent européen (Bosch, Mahle) : qualité équivalente, dispo immédiate, 30-50% moins cher." },
      { step: 3, title: "Vérifier la compatibilité VIN précise", body: "Pièces japonaises évoluent par millésime. Une pièce Honda Civic 2008 ≠ Honda Civic 2009. Validation côté fournisseur sur la base de la VIN avant commande." },
      { step: 4, title: "Livraison + montage chez partenaire", body: "Pièce reçue en magasin Colomiers, possibilité de retrait gratuit ou expédition Mondial Relay. Garages partenaires spécialistes japonaises à Toulouse pour le montage." },
    ],
    seoLong: "Spécialiste pièces japonaises à Colomiers : Toyota, Honda, Mazda, Subaru, Nissan, Mitsubishi. Sourcing OEM japonais ou équivalent qualité. Modèles import (Skyline, RX7, Land Cruiser anciens) sur devis.",
  },

  'pieces-utilitaires': {
    offre: [
      "Renault Trafic, Master ; Citroën Jumpy, Jumper ; Fiat Ducato.",
      "Iveco Daily, Mercedes Sprinter, VW Crafter / Transporter.",
      "Pièces renforcées charge utile (suspension, freinage).",
      "Tarifs professionnels sur devis pour flottes et garages.",
    ],
    signes: [
      "Usure rapide due au kilométrage intensif (>50 000 km/an).",
      "Charge utile élevée (suspension, freinage, transmission).",
      "Réparation flotte d'entreprise — sourcing à l'unité ou par lot.",
      "Disponibilité critique (immobilisation = perte de chiffre d'affaires).",
    ],
    intervention: [
      { step: 1, title: "Identifier la motorisation + variante", body: "Utilitaires ont MULTIPLES variantes (court/long, surélevé, frigorifique). VIN + plaque constructeur essentiels. Donnée incomplète = mauvaise pièce." },
      { step: 2, title: "Privilégier les pièces renforcées", body: "Pour usage pro : pièces \"heavy duty\" (HD) plutôt qu'équivalent tourisme. Coûte 10-20% plus cher mais dure 2× plus. Calcul rapide : moins d'immobilisation." },
      { step: 3, title: "Devis flotte si plus de 3 véhicules", body: "Gestionnaire de flotte : nous contacter pour tarification spécifique. Devis incluant délais d'approvisionnement par pièce + remise sur volume." },
      { step: 4, title: "Livraison rapide ou garage partenaire", body: "Stock magasin pour pièces les plus courantes (freinage, batterie, ampoules). Sourcing 24-48h pour pièces plus spécifiques. Garages utilitaires partenaires à Toulouse Ouest." },
    ],
    seoLong: "Spécialiste pièces utilitaires à Colomiers : Renault Trafic/Master, Citroën Jumpy/Jumper, Fiat Ducato, Iveco Daily, Mercedes Sprinter. Tarifs flotte sur devis. Service prioritaire pour gestionnaires de flotte et garages partenaires.",
  },

};

/** Helper : retourne le contenu spécifique d'un slug, ou null. */
export function getCategoryContent(slug) {
  return CATEGORY_CONTENT[slug] ?? null;
}
