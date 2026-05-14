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
    { q: 'Quels véhicules utilitaires couvrez-vous ?', a: "Renault Trafic et Master, Citroën Jumpy et Jumper, Fiat Ducato, Iveco Daily, Mercedes Sprinter, Volkswagen Crafter et Transporter. Donnez-nous le VIN exact pour une référence garantie compatible." },
    { q: "Délais d'approvisionnement sur les utilitaires ?", a: "Pièces courantes (freinage, batterie, ampoules) en stock magasin. Pièces moteur ou transmission spécifiques : 24 à 72 h en sourcing express. Devis flotte sur volume pour gestionnaires." },
  ],

  // Ajouts D-2026-05-13d (owner brief 2026-05-14) — 26 slugs orphelins.
  // Le screenshot owner pointait spécifiquement bougies-allumage comme
  // exemple ("no faq on bougue d'allumage"), mais tous ces slugs
  // étaient silencieux. Chaque entrée respecte le format
  // problème/solution pour rich snippets Google.

  'etriers-de-frein': [
    { q: "Étrier flottant ou étrier fixe : quelle différence ?", a: "L'étrier flottant (1 ou 2 pistons d'un seul côté) coulisse latéralement — le standard sur 90% des véhicules. L'étrier fixe (Brembo 4 pistons par exemple) reste immobile, les pistons agissent des deux côtés — réservé aux sportives." },
    { q: "Mon étrier est grippé : nettoyer ou remplacer ?", a: "Si le piston ressort encore au compresseur : kit de réparation (joints, soufflets) suffit (40-80 €). Si le piston est rouillé/coincé : remplacement de l'étrier complet (120-300 €). En cas de doute, faites-nous parvenir une photo." },
    { q: "Peut-on rouler avec un étrier qui fuit ?", a: "Non. Une fuite de liquide de frein réduit la pression du circuit et allonge les distances d'arrêt. Le remplacement est urgent — ne reprenez pas la route." },
  ],

  'bougies-allumage': [
    { q: "À quelle fréquence faut-il remplacer les bougies d'allumage ?", a: "Bougies standard nickel : tous les 30 000 à 40 000 km. Bougies platine : 60 000 à 80 000 km. Bougies iridium : 80 000 à 100 000 km. Consultez le carnet d'entretien ou indiquez-nous votre code moteur pour la référence exacte." },
    { q: "Bougies essence ou bougies de préchauffage diesel : quelle différence ?", a: "Les bougies d'allumage essence créent l'étincelle qui enflamme le mélange air/essence (en continu). Les bougies de préchauffage diesel chauffent simplement l'air d'admission au démarrage à froid (jamais d'étincelle). Pas interchangeables." },
    { q: "Voyant moteur allumé : peut-il s'agir d'une bougie ?", a: "Oui, code défaut P0300-P0308 = ratés d'allumage liés à une bougie ou bobine défectueuse. Diagnostic à la valise OBD2 pour identifier le cylindre exact. Souvent, remplacer les 4 bougies en même temps évite un retour rapide en garage." },
  ],

  'injecteurs': [
    { q: "Comment savoir si un injecteur est défaillant ?", a: "Symptômes : fumée noire (diesel) ou ratés d'allumage (essence), voyant moteur P0200-P0299, sur-consommation, démarrage difficile à chaud. Test au banc débit + étanchéité confirme le diagnostic — on peut le faire à votre demande avant commande." },
    { q: "Injecteur neuf ou échange-standard : que choisir ?", a: "Neuf : qualité maximale, garantie pleine, prix +30%. Échange-standard : entièrement reconditionné en usine avec pièces neuves, fiable, consigne reprise sur l'ancien (-30 à -50%). Pour usage normal, l'échange-standard est souvent le meilleur compromis." },
    { q: "Faut-il coder un injecteur neuf ?", a: "Sur diesel common-rail (HDi, dCi, TDI récents) : OUI, obligatoire. Le calculateur doit apprendre le code IMA (Injector Mean Adjustment) du nouvel injecteur via la valise. Sans codage : ratés moteur et casse rapide." },
  ],

  'culasse': [
    { q: "Émulsion blanche sous le bouchon d'huile : que faire ?", a: "C'est le signe d'un joint de culasse fendu ou d'une fissure : huile et liquide de refroidissement se mélangent. Ne roulez plus — la combustion va détruire le moteur. Diagnostic test étanchéité chambre obligatoire pour confirmer." },
    { q: "Réparer le joint ou remplacer la culasse ?", a: "Si la culasse est plane (pas voilée à la règle métallique) et non fissurée : joint de culasse + boulons TTY neufs (300-700 € avec main d'œuvre). Si culasse voilée ou fissurée : remplacement complet obligatoire (1200-3000 €)." },
    { q: "Boulons TTY : peut-on les réutiliser ?", a: "JAMAIS. Les boulons TTY (Torque-To-Yield) sont conçus pour s'étirer une seule fois lors du serrage angulaire. Réutilisés = serrage non conforme + casse moteur quasi-certaine. Kit boulons neufs OBLIGATOIRE." },
  ],

  'chargeur-de-batterie': [
    { q: "Comment choisir entre un chargeur et un mainteneur ?", a: "Chargeur (5-15 A) : pour batterie déchargée à recharger en 4-12 h. Mainteneur (0,8-1 A) : pour préserver une batterie pleine sur véhicule peu roulant (moto, camping-car, voiture loisir). Les deux peuvent être combinés dans un chargeur intelligent." },
    { q: "Peut-on laisser un mainteneur branché en permanence ?", a: "Oui, c'est exactement son rôle. Un mainteneur intelligent passe en mode \"floating\" (entretien) une fois la batterie pleine, évitant la surcharge. Idéal pour véhicules saisonniers stockés l'hiver." },
  ],

  'pieces-electriques': [
    { q: "Mon voyant ABS est allumé : que faire ?", a: "Le code défaut C0040-C0050 désigne souvent un capteur ABS roue défaillant. Diagnostic à la valise pour identifier la roue exacte. Capteur ABS = 30-80 € pièce, intervention rapide (1 h chez garage)." },
    { q: "Sonde lambda : amont ou aval ?", a: "Sonde amont (avant catalyseur) : mesure le mélange air/essence pour réguler l'injection. Sonde aval (après catalyseur) : vérifie l'efficacité du catalyseur. Pas interchangeables — le calculateur attend des signaux différents." },
    { q: "Mon véhicule décharge la batterie la nuit : que faire ?", a: "Consommation parasite = composant qui reste sous tension contact coupé. Diagnostic au multimètre (ampère) sur la batterie : courant > 80 mA après 20 min = anormal. Capteur de hayon, autoradio ou boîtier BSI sont les causes fréquentes." },
  ],

  'phares-led': [
    { q: "Kit LED retrofit : est-ce homologué en France ?", a: "OUI, UNIQUEMENT si le kit porte le marquage CE + lettre E (homologation européenne). Les kits chinois sans marquage = refus contrôle technique + risque amende. Vérifiez avant achat — nous ne vendons que des produits homologués." },
    { q: "Mes LED font apparaître un voyant ampoule au tableau de bord ?", a: "Sur véhicules récents (post-2010), le calculateur surveille la consommation des ampoules. Une LED consomme moins qu'une halogène → erreur détectée. Solution : ajouter un boîtier Canbus anti-erreur (15-30 €) en série avec chaque LED." },
  ],

  'optiques-de-phares': [
    { q: "Mon phare est jauni : rénover ou remplacer ?", a: "Opacité légère = kit rénovation polish + vernis anti-UV (30-60 €). Le résultat dure 2-5 ans si vernis 2K. Opacité forte, fissure, ou buée intérieure = remplacement optique complet (200-500 €) — seule solution durable." },
    { q: "Le vernis du kit rénovation est-il indispensable ?", a: "OUI. Sans vernis anti-UV en finition, le polish redonne brillance pour 6-12 mois max — puis l'opacité revient (les rayons UV continuent d'attaquer le polycarbonate nu). Vernis 2K = protection longue durée." },
  ],

  'ampoules-auto': [
    { q: "H4 ou H7 : comment savoir ?", a: "H4 = ampoule à double filament (croisement + route dans la même ampoule). H7 = ampoule à filament unique (généralement le croisement seulement, route séparée). NON interchangeables — culots différents. Lire la référence sur l'ampoule existante." },
    { q: "Ampoules +130% : ça vaut le coup ?", a: "Pour le confort de nuit : oui, faisceau visiblement plus blanc et plus loin. Attention : durée de vie réduite (200-400 h vs 800-1500 h standard). Pour usage routier intensif : standard longue durée est plus rentable." },
    { q: "Comment éviter de griller une ampoule trop vite ?", a: "NE JAMAIS toucher le verre d'une halogène avec les doigts — l'huile cutanée crée des points chauds qui font éclater le verre en quelques heures de fonctionnement. Toujours utiliser un chiffon propre ou des gants." },
  ],

  'condenseur-clim': [
    { q: "Ma clim souffle tiède : c'est forcément le condenseur ?", a: "Pas forcément. Causes possibles dans l'ordre de fréquence : manque de fluide (fuite), filtre déshydrateur saturé, compresseur HS, et seulement ensuite condenseur. Diagnostic en atelier avec station clim recommandé avant remplacement." },
    { q: "Le condenseur peut-il être réparé ?", a: "En théorie oui (soudure alu), en pratique non rentable. Le condenseur est exposé à la pression et aux chocs gravillons — une soudure tient rarement plus de quelques mois. Remplacement complet conseillé." },
  ],

  'compresseur-clim': [
    { q: "Que faire si le compresseur casse en libérant des copeaux ?", a: "Tous les tuyaux + condenseur + évaporateur DOIVENT être rincés au liquide spécial. Filtre déshydrateur OBLIGATOIREMENT remplacé. Sinon le compresseur neuf est détruit en 100 km. C'est une réparation complète (compresseur + flush + déshydrateur)." },
    { q: "Compresseur neuf ou échange-standard ?", a: "Échange-standard avec consigne reprise : option économique fiable (-30 à -50%). Compresseur entièrement reconditionné en usine avec garantie. Pour véhicule de plus de 8 ans, c'est souvent le meilleur compromis budget/qualité." },
  ],

  'amortisseurs-suspension': [
    { q: "Faut-il changer tous les ressorts en même temps que les amortisseurs ?", a: "Pas obligatoire, mais conseillé si > 100 000 km ou si tassement visible (caisse asymétrique). Les ressorts perdent 5-10% de tension après 150 000 km, déséquilibrant la nouvelle suspension. Kit complet = solution durable." },
    { q: "Suspension sport rabaissée : homologation ?", a: "Légale UNIQUEMENT si le kit est homologué CE avec procès-verbal de réception (au mention sur les flancs). Rabaissement max 40 mm sans modification homologuée. Sinon : refus contrôle technique + risque amende + non-assurance en cas d'accident." },
  ],

  'rotules': [
    { q: "Comment savoir précisément quelle rotule est défaillante ?", a: "Test au cric : levée de la roue, tirer verticalement (rotule de triangle) puis horizontalement (rotule de direction). Le jeu se sent au toucher. Bruit en virage = rotule de direction. Bruit en passage de bosse = rotule de triangle." },
    { q: "Après changement de rotule, faut-il refaire la géométrie ?", a: "OUI, obligatoire. Toute rotule changée décale le pincement et le carrossage. Sans géométrie : usure pneus accélérée (1000-3000 km au lieu de 30 000 km) + direction décalée. Banc géométrie chez garage partenaire : 50-80 €." },
  ],

  'train-arriere': [
    { q: "Un bruit de roulement à l'arrière : roulement ou train complet ?", a: "Test : virage à droite augmente le bruit = roulement gauche en charge (HS). Virage à gauche augmente le bruit = roulement droit. Si le bruit est uniforme sans variation : potentiellement train complet, diagnostic atelier obligatoire." },
    { q: "Mon train arrière est décalé après nid-de-poule : réparer ou remplacer ?", a: "Diagnostic obligatoire chez garage avec banc géométrie 4 points. Si décalage < 5 mm : réglage possible. Si > 5 mm ou bras tordu visuellement : remplacement essieu complet ou bras concerné. Conseil : ne pas rouler longtemps avec un train décalé." },
  ],

  'roulements-de-roue': [
    { q: "Quel est le bruit typique d'un roulement HS ?", a: "Ronflement continu qui augmente avec la vitesse, comme un avion qui décolle. Le bruit varie selon le virage (gauche/droite) — c'est le marqueur qui distingue le roulement du pneu (qui sonnerait identique en virage)." },
    { q: "Roulement avec capteur ABS intégré : différence ?", a: "Sur véhicules récents (post-2005), le capteur ABS est intégré au roulement (bague magnétique). Remplacement plus cher (+30-50%) mais nécessaire — le capteur ne se vend pas séparément. Référence exacte sur le numéro de châssis." },
  ],

  'essieux': [
    { q: "Mon essieu arrière est tordu : comment savoir ?", a: "Symptômes : véhicule qui \"chasse\" à l'arrière en ligne droite, usure pneus très irrégulière (diagonale), carrossage visible (la roue penche). Diagnostic banc géométrie obligatoire — il mesure les angles avec précision." },
    { q: "Réparer un essieu tordu ou le remplacer ?", a: "Réparation par redressage chez tôlier-carrossier : possible pour décalages mineurs, mais risque de re-déformation rapide. Remplacement essieu complet : plus cher mais durable. Diagnostic + devis comparatif avant décision." },
  ],

  'volants': [
    { q: "Changer le volant : faut-il déclencher l'airbag ?", a: "NON, surtout pas. La manipulation correcte : débrancher la batterie 5 minutes minimum (déchargement condensateurs airbag), puis déposer l'airbag à l'aide des vis arrière SANS appuyer dessus. Airbag déposé face contre table. Sécurité absolue." },
    { q: "Volant sport sur véhicule série : faut-il un adaptateur ?", a: "OUI, presque toujours. Le volant sport (Momo, Sparco) a un boulonnage \"6 vis 70 mm\" ou \"6 vis 74 mm\". Le moyeu série a un boulonnage propriétaire. Boss/adaptateur spécifique au véhicule (40-100 €) fait la conversion." },
  ],

  'carburateur': [
    { q: "Carburateur ou injection : comment savoir sur ma voiture ?", a: "Véhicules pré-1995 essence : majoritairement carburateur. Véhicules post-2000 : tous injection (essence et diesel). Entre 1995 et 2000 : transition, à vérifier au cas par cas. Bouchon métal en haut du moteur + tringlerie = carburateur." },
    { q: "Mon carbu noie : que faire ?", a: "Symptôme : moteur cale à chaud, démarrage difficile, odeur d'essence. Causes : flotteur percé (essence qui passe sans contrôle), aiguille de gicleur usée, ou filtre essence saturé. Démontage + nettoyage + kit joints = 80% des cas." },
  ],

  'retroviseurs': [
    { q: "Glace de rétroviseur seule : possible ?", a: "OUI, c'est l'option la plus économique (30-50 € vs 80-300 € pour le rétro complet). Possible si la coque extérieure et le moteur électrique sont intacts. La glace se déclipse, la neuve se reclipse — 5 minutes d'intervention." },
    { q: "Rétroviseur électrique HS : moteur ou commande ?", a: "Test : si UN seul rétro est HS = moteur du rétro. Si LES DEUX sont HS = commande au tableau de bord, fusible, ou faisceau électrique. Le diagnostic au multimètre identifie en 10 minutes la pièce à changer." },
  ],

  'essuie-glaces': [
    { q: "Mes essuie-glaces laissent des traces : nouveaux balais ?", a: "Pas toujours. D'abord : nettoyer le caoutchouc avec un chiffon imbibé d'alcool (graisse accumulée). Puis nettoyer le pare-brise au produit lave-glace concentré (résidu de bombe insectes). Si les traces persistent : balais à remplacer (10-30 € la paire)." },
    { q: "Balais Bosch Aerotwin vs balais standards : différence ?", a: "Aerotwin (flat-blade) : caoutchouc maintenu par un seul cintrage longitudinal, contact uniforme, silencieux, durée +30%. Standard (à étriers) : moins cher mais bruits + traces plus vite. Pour autoroute fréquente, Aerotwin est rentable." },
  ],

  'bouchons-reservoir': [
    { q: "Voyant moteur P0440 : c'est forcément le bouchon ?", a: "Cause #1 du P0440 dans 70% des cas. Le bouchon perd son étanchéité avec le temps, provoquant une fuite de vapeurs d'essence et un code défaut. Remplacement 15-40 € — solution la moins chère avant de chercher ailleurs." },
    { q: "Bouchon à clé ou sans clé ?", a: "Sans clé : suffit pour véhicule tourisme stationné en lieu privé. À clé : recommandé pour utilitaires, véhicules garés en rue ou véhicules diesel (vol de carburant). Quelques euros de différence — la sécurité justifie le surcoût." },
  ],

  'pommeaux-de-vitesse': [
    { q: "Mon pommeau se dévisse : que faire ?", a: "Le filet du levier est usé. Tester avec un peu de frein-filet bleu (modéré) sur le filet : ça tient 6-12 mois. Solution durable : taraud de remise en état (M10×1,5 ou M12×1,25 selon véhicule) ou pommeau avec système de blocage à insert." },
    { q: "Pommeau boîte auto avec bouton P : compatible ?", a: "Boîtes automatiques avec bouton P (Mercedes, BMW, Audi récents) nécessitent un pommeau SPÉCIFIQUE — pas universellement compatible. Donnez-nous votre véhicule + année pour la référence exacte." },
  ],

  'pare-chocs': [
    { q: "Pare-chocs peint usine ou brut à peindre ?", a: "Peint usine (couleur véhicule) : prêt à monter, 50-100% plus cher mais zéro main d'œuvre carrosserie. Brut (apprêté noir) : 50% moins cher, mais 2-3 jours d'atelier carrosserie pour peinture (300-600 €). Selon urgence et budget." },
    { q: "Capteurs radar de stationnement : à transférer ?", a: "OUI. Les capteurs radar de l'ancien pare-chocs doivent être démontés, vérifiés (continuité électrique) et remontés sur le neuf. Capteurs HS = remplacement à l'unité 30-80 €. Vérification avant remontage évite une 2e dépose." },
  ],

  'bas-de-caisse': [
    { q: "Clips de bas de caisse cassés au démontage : grave ?", a: "Très fréquent après 10 ans (plastique fragilisé). Solution : en commander quelques-uns d'avance (1-3 € pièce). Nous les fournissons avec le bas de caisse de remplacement sur demande." },
    { q: "Bas de caisse plastique vs alu (4×4) ?", a: "Plastique : tourisme et SUV urbains, léger, coût faible, mais fragile aux trottoirs. Alu : SUV et 4×4 à usage routier intensif, plus cher mais résistant aux chocs. Selon votre véhicule et usage." },
  ],

  'attelages': [
    { q: "Quelle charge maximum mon véhicule peut-il tracter ?", a: "Information sur la carte grise rubrique F.2 (Poids Total Roulant Autorisé) moins le PTAC (Poids Total Autorisé en Charge) = capacité de traction max. Exemple : 2 500 kg PTRA - 1 500 kg PTAC = 1 000 kg traction max." },
    { q: "Attelage démontable ou fixe ?", a: "Démontable (col de cygne) : esthétique préservée hors usage, +30% prix. Fixe : visible en permanence, plus économique, idéal usage régulier remorque/caravane. Démontable conseillé en ville pour éviter chocs piétons." },
    { q: "Faisceau 7 ou 13 broches ?", a: "7 broches : suffisant pour remorque simple (clignotants, stop, position). 13 broches : nécessaire pour caravane (alimentation 12V intérieur + frigo, recul). Faisceau dédié au modèle (pas universel) pour respecter le CAN-Bus des véhicules récents." },
  ],

  'chaines-neige': [
    { q: "Chaussettes B58 ou chaînes métal : quoi choisir ?", a: "Chaussettes B58 (homologuées loi montagne) : faciles à monter, légères, suffisantes pour neige tassée ou occasionnelle. Chaînes métal : plus efficaces sur neige fraîche profonde et verglas, mais plus encombrantes. Pour station ski régulière : métal. Pour traversée hivernale occasionnelle : chaussettes." },
    { q: "Sur quelles roues monter les chaînes ?", a: "Roues motrices : avant pour traction (la plupart des voitures), arrière pour propulsion (BMW, Mercedes anciennes), 4 roues pour 4×4 permanent. Vérifier le manuel constructeur pour confirmer." },
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
