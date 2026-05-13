/**
 * CATEGORY_FAQS — FAQs éducatives par catégorie (format problème/solution).
 *
 * Chaque clé est un slug de catégorie (cf. categories.js).
 * Chaque valeur est un tableau de {q, a} utilisé dans [slug].astro
 * et injecté en JSON-LD FAQPage pour le SEO.
 */

export const CATEGORY_FAQS = {
  'plaquettes-de-frein': [
    { q: 'Vos freins grincent ou sifflent au freinage ?', a: "C'est le signe que vos plaquettes sont usées jusqu'au témoin d'usure métallique. Remplacer les plaquettes dès les premiers bruits évite d'endommager les disques — une réparation bien plus coûteuse." },
    { q: 'Quand faut-il changer ses plaquettes de frein ?', a: "En moyenne tous les 30 000 à 50 000 km, mais cela dépend de votre conduite (ville vs autoroute) et du véhicule. Un contrôle visuel de l'épaisseur est recommandé à chaque révision." },
    { q: 'Faut-il changer les plaquettes et les disques en même temps ?', a: "Pas toujours. Si les disques sont encore dans les tolérances d'épaisseur et ne présentent pas de rainures profondes, vous pouvez ne changer que les plaquettes. En cas de doute, demandez-nous un devis complet." },
  ],
  'disques-de-frein': [
    { q: 'Comment savoir si mes disques de frein sont usés ?', a: "Des vibrations dans le volant au freinage, un sillon visible sur le disque ou une épaisseur inférieure au minimum indiqué par le constructeur sont les signes clés. Un contrôle visuel simple suffit souvent." },
    { q: 'Disques ventilés ou disques pleins : quelle différence ?', a: "Les disques ventilés dissipent mieux la chaleur grâce à leurs ailettes internes — idéaux pour les véhicules lourds ou sportifs. Les disques pleins conviennent aux petites citadines et aux trains arrière." },
  ],
  'courroie-de-distribution': [
    { q: 'Quand faut-il changer sa courroie de distribution ?', a: "En général entre 60 000 et 160 000 km ou tous les 5 à 6 ans, selon le constructeur. Une courroie cassée peut détruire le moteur — ne repoussez jamais cet entretien." },
    { q: 'Faut-il remplacer la pompe à eau avec la courroie ?', a: "C'est fortement recommandé. La pompe à eau est entraînée par la courroie sur la majorité des moteurs. La remplacer en même temps évite de refaire l'opération (et le coût de main-d'œuvre) deux ans plus tard." },
    { q: "Courroie de distribution ou chaîne : comment savoir ?", a: "Consultez le carnet d'entretien de votre véhicule ou indiquez-nous votre code moteur. Les chaînes durent plus longtemps mais ne sont pas éternelles — elles aussi s'usent." },
  ],
  'embrayage': [
    { q: "Votre pédale d'embrayage patine ou vibre ?", a: "Un embrayage qui patine (le moteur monte en régime sans accélérer) ou qui vibre au point de patinage est en fin de vie. Rouler avec un embrayage usé endommage le volant moteur." },
    { q: 'Kit embrayage ou pièces séparées ?', a: "Le kit complet (disque + mécanisme + butée) est toujours préférable : les pièces sont calibrées ensemble et vous évitez une seconde dépose coûteuse si une seule pièce lâche." },
  ],
  'kit-embrayage': [
    { q: 'Que contient un kit embrayage complet ?', a: "Un kit standard comprend le disque d'embrayage, le mécanisme (plateau de pression) et la butée de débrayage. Certains kits incluent aussi le volant moteur bimasse." },
    { q: 'Combien de kilomètres dure un embrayage ?', a: "Entre 100 000 et 200 000 km en conduite normale. La conduite en ville avec beaucoup de démarrages/arrêts use l'embrayage plus vite." },
  ],
  'batterie': [
    { q: 'Votre voiture a du mal à démarrer le matin ?', a: "Un démarreur lent ou un voyant batterie allumé signalent une batterie en fin de vie. La durée moyenne est de 4 à 5 ans. Testez-la gratuitement chez votre garagiste ou avec un multimètre." },
    { q: 'Comment choisir la bonne batterie pour mon véhicule ?', a: "Trois critères : la capacité (Ah), l'intensité de démarrage (A) et les dimensions physiques. Donnez-nous votre marque, modèle et année — on vous trouve la référence exacte." },
  ],
  'alternateur': [
    { q: 'Voyant batterie allumé en roulant ?', a: "Si le voyant s'allume moteur tournant, c'est souvent l'alternateur qui ne charge plus. Faites-le tester rapidement — rouler sans charge épuise la batterie en quelques kilomètres." },
    { q: 'Alternateur neuf ou échange standard ?', a: "L'échange standard est une option économique fiable : l'alternateur est entièrement reconditionné avec des pièces neuves. Le neuf offre une garantie plus longue." },
  ],
  'demarreur': [
    { q: 'Votre démarreur tourne dans le vide ou claque ?', a: "Un clic sans démarrage ou un bruit de crécelle signalent un démarreur défaillant. Avant de le remplacer, vérifiez aussi la batterie et les connexions — parfois c'est plus simple." },
  ],
  'amortisseurs': [
    { q: 'Votre voiture rebondit ou tire d\'un côté ?', a: "Des amortisseurs usés allongent les distances de freinage de 20%, provoquent une tenue de route dégradée et une usure inégale des pneus. Remplacez-les par paire (avant ou arrière)." },
    { q: 'Tous les combien faut-il changer ses amortisseurs ?', a: "En moyenne tous les 80 000 à 100 000 km ou quand vous constatez une perte de confort. Un test simple : appuyez fort sur un coin du véhicule et relâchez — s'il rebondit plus d'une fois, c'est le moment." },
  ],
  'phares': [
    { q: 'Un de vos phares est opaque ou jauni ?', a: "L'opacité réduit jusqu'à 40% l'éclairage. Un polissage peut suffire si le verre n'est pas fissuré. Sinon, le remplacement de l'optique complète est nécessaire pour passer le contrôle technique." },
    { q: 'Halogène, xénon ou LED : quel phare choisir ?', a: "Remplacez par le même type que l'origine pour rester conforme. Les kits LED de remplacement homologués existent pour certains modèles — demandez-nous la compatibilité." },
  ],
  'huile-moteur': [
    { q: 'Quelle huile moteur pour ma voiture ?', a: "La viscosité (5W30, 5W40, 0W20...) et la norme (ACEA, API) dépendent de votre moteur. Indiquez-nous votre code moteur et on vous recommande la bonne référence parmi Castrol, TotalEnergies ou Mobil 1." },
    { q: 'Tous les combien faut-il faire la vidange ?', a: "Entre 10 000 et 30 000 km selon le constructeur et le type d'huile. Un moteur diesel en ville se vidange plus souvent. Consultez votre carnet d'entretien." },
  ],
  'filtre-a-huile': [
    { q: 'Pourquoi changer le filtre à huile à chaque vidange ?', a: "Le filtre retient les impuretés métalliques et les résidus de combustion. Un filtre saturé laisse passer ces particules, accélérant l'usure du moteur. Il coûte quelques euros — ne faites pas l'impasse." },
  ],
  'pot-d-echappement': [
    { q: 'Votre voiture fait un bruit anormal à l\'échappement ?', a: "Un pot percé ou un joint de collecteur défaillant se traduisent par un bruit métallique ou un sifflement. Au-delà du confort, cela peut causer un refus au contrôle technique et une surconsommation." },
  ],
  'catalyseur': [
    { q: 'Voyant moteur allumé et perte de puissance ?', a: "Un catalyseur colmaté ou défaillant déclenche souvent le voyant moteur (code P0420). Il provoque une perte de puissance et une surconsommation. Le remplacement par un catalyseur homologué CE est obligatoire." },
  ],
  'fap': [
    { q: 'Le voyant FAP s\'allume régulièrement ?', a: "Le filtre à particules se régénère automatiquement sur autoroute. Si vous roulez uniquement en ville, la régénération échoue et le voyant s'allume. Un nettoyage ou un remplacement peut être nécessaire." },
  ],
  'radiateur': [
    { q: 'Votre moteur surchauffe ou le niveau de liquide baisse ?', a: "Une fuite de radiateur ou un radiateur obstrué sont les causes les plus fréquentes de surchauffe. Ne roulez jamais avec un moteur en surchauffe — les dégâts peuvent être irréversibles." },
  ],
  'turbo': [
    { q: 'Fumée bleue ou perte de puissance soudaine ?', a: "Un turbo défaillant peut produire de la fumée bleue (huile brûlée), un sifflement anormal ou une perte de puissance. Le turbo travaille à plus de 100 000 tr/min — son remplacement demande de la précision." },
  ],
  'cardans': [
    { q: 'Claquements en tournant le volant à fond ?', a: "C'est le signe classique d'un cardan usé (joint homocinétique). Si le soufflet est déchiré, la graisse s'échappe et le joint s'use rapidement. Remplacez le cardan complet pour plus de fiabilité." },
  ],
  'pieces-4x4': [
    { q: 'Quelles pièces d\'usure sont spécifiques aux 4×4 ?', a: "Les 4×4 sollicitent davantage la transmission (cardans, différentiels), la suspension (amortisseurs renforcés, rotules) et le freinage (disques plus grands). Nous sommes spécialistes de ces pièces." },
  ],
  'pieces-japonaises': [
    { q: 'Trouvez-vous des pièces pour Toyota, Honda, Nissan ?', a: "Oui, c'est une de nos spécialités. Nous couvrons Toyota, Honda, Mazda, Subaru, Nissan et Mitsubishi avec des pièces de qualité origine (OEM) ou équivalente." },
  ],
  'pieces-utilitaires': [
    { q: 'Fournissez-vous les garages et flottes professionnelles ?', a: "Absolument. Nous travaillons avec des garages locaux et des gestionnaires de flotte sur Toulouse Ouest. Tarifs professionnels sur devis, délais respectés." },
  ],
};

/** Helper : récupérer les FAQs pour un slug de catégorie. */
export function getCategoryFaqs(slug) {
  return CATEGORY_FAQS[slug] || [];
}

/**
 * FAQs générales pour les pages sans catégorie spécifique.
 */
export const GENERAL_FAQS = {
  catalogue: [
    { q: 'Combien de catégories de pièces proposez-vous ?', a: "Notre catalogue couvre 47 catégories de pièces auto neuves, du freinage à la carrosserie, pour véhicules tourisme, 4×4, utilitaires et japonaises." },
    { q: 'Comment trouver la bonne pièce pour mon véhicule ?', a: "Renseignez votre véhicule (marque, modèle, année) via le sélecteur en haut de page. Le catalogue se filtre automatiquement pour n'afficher que les pièces compatibles." },
    { q: 'Proposez-vous des pièces d\'origine constructeur (OEM) ?', a: "Nous proposons principalement des pièces de qualité équivalente OEM (Bosch, Valeo, Brembo...). Sur demande, nous pouvons commander la référence constructeur exacte." },
  ],
  services: [
    { q: 'Quels services proposez-vous exactement ?', a: "Vente de pièces auto neuves multi-marques, devis sous 24h, conseil technique, expédition Mondial Relay et retrait gratuit en magasin à Colomiers." },
    { q: 'Proposez-vous le montage des pièces ?', a: "Non, nous sommes vendeurs de pièces. Nous pouvons vous orienter vers des garages partenaires à Colomiers et Toulouse Ouest pour le montage." },
    { q: 'Faites-vous du diagnostic automobile ?', a: "Nous conseillons sur l'identification des pièces à remplacer en fonction de vos symptômes (bruit, voyant, vibration). Pour un diagnostic électronique complet, consultez un garagiste équipé." },
  ],
  magasin: [
    { q: 'Où se trouve votre magasin exactement ?', a: "Au 16 allée de l'Adour, 31770 Colomiers. À 5 minutes de la rocade, accessible facilement depuis Toulouse, Tournefeuille, Plaisance-du-Touch et Blagnac." },
    { q: 'Y a-t-il un parking devant le magasin ?', a: "Oui, vous pouvez vous garer facilement dans l'allée. L'accès est simple et direct." },
    { q: 'Acceptez-vous les paiements en espèces ?', a: "Oui. Nous acceptons espèces, CB (Visa, Mastercard), Apple Pay et Google Pay." },
  ],
};
