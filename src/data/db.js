export const initialUsers = [
  { name: "Administrateur", login: "admin", pw: "admin", role: "admin" }
];

export const MATIERES = {
  maths: {
    name: "Mathématiques", icon: "🧮", color: "#f7971e",
    fiches: [
      { title: "Les nombres et calculs", niveau: "Fondamental", content: `
        <h3>Les fractions</h3>
        <p>Une fraction représente une partie d'un tout. Elle est composée d'un numérateur (en haut) et d'un dénominateur (en bas).</p>
        <div class="formula">a/b × c/d = (a×c)/(b×d)</div>
        <p>Pour additionner deux fractions, on les met au même dénominateur.</p>
        <h3>Les puissances</h3>
        <p>a<sup>n</sup> signifie a multiplié par lui-même n fois.</p>
        <div class="formula">a^n × a^m = a^(n+m)</div>
        <ul>
          <li>a⁰ = 1 (pour tout a ≠ 0)</li>
          <li>a¹ = a</li>
          <li>(a^n)^m = a^(n×m)</li>
        </ul>
        <h3>Les racines carrées</h3>
        <div class="formula">√(a×b) = √a × √b</div>
        <p>La racine carrée de 4 est 2 car 2² = 4.</p>
      `},
      { title: "Algèbre et équations", niveau: "Essentiel", content: `
        <h3>Développer et factoriser</h3>
        <p>Développer consiste à supprimer les parenthèses. Factoriser est l'opération inverse.</p>
        <div class="formula">(a+b)² = a² + 2ab + b²</div>
        <div class="formula">(a-b)² = a² - 2ab + b²</div>
        <div class="formula">(a+b)(a-b) = a² - b²</div>
        <h3>Résoudre une équation du 1er degré</h3>
        <p>Le but est d'isoler l'inconnue x d'un côté de l'équation.</p>
        <div class="formula">ax + b = c → x = (c-b)/a</div>
        <h3>Systèmes d'équations</h3>
        <p>Méthode par substitution ou par combinaison linéaire.</p>
      `},
      { title: "Géométrie", niveau: "Essentiel", content: `
        <h3>Théorème de Pythagore</h3>
        <p>Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.</p>
        <div class="formula">a² + b² = c² (c = hypoténuse)</div>
        <h3>Théorème de Thalès</h3>
        <p>Si deux droites sont parallèles, elles coupent deux sécantes proportionnellement.</p>
        <div class="formula">AB/AE = AC/AF = BC/EF</div>
        <h3>Trigonométrie</h3>
        <div class="formula">cos(A) = adjacent/hypoténuse</div>
        <div class="formula">sin(A) = opposé/hypoténuse</div>
        <div class="formula">tan(A) = opposé/adjacent</div>
      `},
      { title: "Statistiques et probabilités", niveau: "Maîtrise", content: `
        <h3>Moyenne, médiane, mode</h3>
        <p>La <b>moyenne</b> est la somme des valeurs divisée par leur nombre.</p>
        <p>La <b>médiane</b> est la valeur du milieu d'une série ordonnée.</p>
        <p>Le <b>mode</b> est la valeur la plus fréquente.</p>
        <h3>Probabilités</h3>
        <div class="formula">P(A) = nombre de cas favorables / nombre de cas possibles</div>
        <ul>
          <li>0 ≤ P(A) ≤ 1</li>
          <li>P(A) + P(Ā) = 1</li>
          <li>P(impossible) = 0, P(certain) = 1</li>
        </ul>
      `}
    ],
    qcm: [
      { q: "Quelle est la valeur de 2³ ?", opts: ["4","6","8","16"], answer: 2, expl: "2³ = 2×2×2 = 8" },
      { q: "Quel est le résultat de (a+b)² ?", opts: ["a²+b²","a²+2ab+b²","2a+2b","a²+ab+b²"], answer: 1, expl: "(a+b)² = a²+2ab+b² est une identité remarquable" },
      { q: "Dans un triangle rectangle, si les deux cathètes mesurent 3 et 4, l'hypoténuse mesure :", opts: ["5","6","7","√7"], answer: 0, expl: "3²+4² = 9+16 = 25 = 5²" },
      { q: "La probabilité d'obtenir un 6 en lançant un dé équilibré est :", opts: ["1/3","1/2","1/6","1/4"], answer: 2, expl: "Il y a 6 faces, donc P(6) = 1/6" },
      { q: "Si x + 5 = 12, alors x =", opts: ["7","17","2","60"], answer: 0, expl: "x = 12 - 5 = 7" },
    ],
    videos: [
      { title: "Les équations du 1er degré", channel: "Mathrix", id: "9UbHRUWq8-Y" },
      { title: "Théorème de Pythagore", channel: "Yvan Monka", id: "CAkFVJJHwXc" },
      { title: "Probabilités – Cours complet", channel: "Mathrix", id: "oQ0N2x7BFSE" },
    ]
  },
  francais: {
    name: "Français", icon: "📖", color: "#ee0979",
    fiches: [
      { title: "Grammaire – Les propositions", niveau: "Fondamental", content: `
        <h3>Types de propositions</h3>
        <p>Une <b>proposition indépendante</b> ne dépend d'aucune autre et n'en commande aucune.</p>
        <p>Une <b>proposition principale</b> commande une ou plusieurs subordonnées.</p>
        <p>Une <b>proposition subordonnée</b> dépend de la principale.</p>
        <h3>Les subordonnées relatives</h3>
        <p>Elles complètent un nom (antécédent) et sont introduites par un pronom relatif : qui, que, dont, où, lequel...</p>
        <h3>Les subordonnées conjonctives</h3>
        <p>Introduites par que, quand, parce que, si, bien que, pour que...</p>
      `},
      { title: "Figures de style", niveau: "Essentiel", content: `
        <h3>Figures d'analogie</h3>
        <ul>
          <li><b>Métaphore</b> : comparaison sans outil comparatif (« la vie est un long fleuve »)</li>
          <li><b>Comparaison</b> : rapprochement avec outil (comme, tel, pareil à...)</li>
          <li><b>Personnification</b> : attributs humains à un objet/animal</li>
        </ul>
        <h3>Figures d'opposition</h3>
        <ul>
          <li><b>Antithèse</b> : opposition de deux idées</li>
          <li><b>Oxymore</b> : alliance de deux termes contraires (« obscure clarté »)</li>
        </ul>
        <h3>Figures d'insistance</h3>
        <ul>
          <li><b>Anaphore</b> : répétition en début de phrase</li>
          <li><b>Gradation</b> : progression des termes</li>
          <li><b>Hyperbole</b> : exagération volontaire</li>
        </ul>
      `},
      { title: "Méthodologie – La dissertation", niveau: "Maîtrise", content: `
        <h3>Structure d'une dissertation</h3>
        <ul>
          <li><b>Introduction</b> : accroche, présentation du sujet, problématique, annonce du plan</li>
          <li><b>Développement</b> : 2 ou 3 parties avec arguments et exemples</li>
          <li><b>Conclusion</b> : bilan, réponse à la problématique, ouverture</li>
        </ul>
        <h3>Les connecteurs logiques</h3>
        <p><b>Addition</b> : de plus, en outre, par ailleurs</p>
        <p><b>Opposition</b> : cependant, néanmoins, or, mais</p>
        <p><b>Cause</b> : car, parce que, en effet</p>
        <p><b>Conséquence</b> : donc, ainsi, c'est pourquoi</p>
      `},
      { title: "Les mouvements littéraires", niveau: "Culture", content: `
        <h3>Le Classicisme (XVIIe)</h3>
        <p>Recherche de la raison, de l'ordre, de l'équilibre. Auteurs : Molière, Racine, La Fontaine.</p>
        <h3>Le Romantisme (XIXe)</h3>
        <p>Valorisation des sentiments, de la nature, du moi. Auteurs : Hugo, Lamartine, Musset.</p>
        <h3>Le Réalisme (XIXe)</h3>
        <p>Représentation fidèle de la réalité sociale. Auteurs : Balzac, Flaubert, Zola.</p>
        <h3>Le Surréalisme (XXe)</h3>
        <p>Libération de l'inconscient, écriture automatique. Auteurs : Breton, Éluard, Aragon.</p>
      `}
    ],
    qcm: [
      { q: "Qu'est-ce qu'une métaphore ?", opts: ["Une comparaison avec outil","Une comparaison sans outil","Une répétition","Une exagération"], answer: 1, expl: "La métaphore compare sans utiliser de mot outil (comme, tel, pareil à...)" },
      { q: "Victor Hugo appartient au mouvement :", opts: ["Classicisme","Réalisme","Romantisme","Surréalisme"], answer: 2, expl: "Victor Hugo est le chef de file du Romantisme français" },
      { q: "L'oxymore est :", opts: ["Une répétition","L'alliance de deux contraires","Une exagération","Une comparaison"], answer: 1, expl: "L'oxymore associe deux termes contradictoires, comme 'obscure clarté'" },
      { q: "Dans une dissertation, qu'annonce-t-on en introduction ?", opts: ["La conclusion","Le plan","Uniquement le sujet","Rien"], answer: 1, expl: "L'introduction présente l'accroche, le sujet, la problématique et annonce le plan" },
      { q: "La proposition subordonnée relative est introduite par :", opts: ["Que (conjonction)","Un pronom relatif","Une préposition","Un adverbe"], answer: 1, expl: "Elle est introduite par qui, que, dont, où, lequel..." },
    ],
    videos: [
      { title: "Les figures de style – Tout réviser", channel: "Prof en Poche", id: "2n8-g73JR6Q" },
      { title: "Méthodologie de la dissertation", channel: "Amélie Vioux", id: "3lqd2cE9IqM" },
      { title: "Les mouvements littéraires", channel: "Prof en Poche", id: "GQRhWoT7Gy4" },
    ]
  },
  histgeo: {
    name: "Histoire-Géographie", icon: "🌍", color: "#4facfe",
    fiches: [
      { title: "La Première Guerre mondiale", niveau: "Fondamental", content: `
        <h3>Les causes de la guerre</h3>
        <ul>
          <li>Crise des Balkans (assassinat de l'archiduc François-Ferdinand, juin 1914)</li>
          <li>Système des alliances (Triple Alliance vs Triple Entente)</li>
          <li>Rivalités coloniales et économiques entre puissances européennes</li>
          <li>Montée des nationalismes</li>
        </ul>
        <h3>Chronologie</h3>
        <p><b>1914</b> : Début de la guerre, guerre de mouvement, front de l'Ouest stabilisé</p>
        <p><b>1916</b> : Batailles de Verdun et de la Somme (guerre de tranchées)</p>
        <p><b>1917</b> : Entrée en guerre des États-Unis, révolution russe</p>
        <p><b>1918</b> : Armistice du 11 novembre</p>
        <h3>Conséquences</h3>
        <p>18 millions de morts. Traité de Versailles (1919). Nouvelle carte de l'Europe.</p>
      `},
      { title: "La Seconde Guerre mondiale", niveau: "Essentiel", content: `
        <h3>Causes</h3>
        <p>Montée des totalitarismes (nazisme, fascisme), crise économique de 1929, politique d'apaisement.</p>
        <h3>Les grandes phases</h3>
        <p><b>1939-1941</b> : Victoires allemandes en Europe</p>
        <p><b>1941</b> : Attaque de l'URSS, entrée en guerre des USA (Pearl Harbor)</p>
        <p><b>1942-1943</b> : Retournement (Stalingrad, Afrique du Nord)</p>
        <p><b>1944-1945</b> : Libération (Débarquement 6 juin 1944)</p>
        <h3>La Shoah</h3>
        <p>Génocide des Juifs d'Europe par les nazis : 6 millions de victimes.</p>
      `},
      { title: "La mondialisation", niveau: "Géographie", content: `
        <h3>Définition</h3>
        <p>Processus d'intégration croissante des économies, cultures et sociétés à l'échelle mondiale.</p>
        <h3>Les acteurs</h3>
        <ul>
          <li>Les FTN (Firmes Transnationales) : Apple, Toyota, Shell...</li>
          <li>Les États et organisations internationales (ONU, FMI, OMC)</li>
          <li>Les consommateurs et la société civile</li>
        </ul>
        <h3>Les espaces de la mondialisation</h3>
        <p>Les métropoles mondiales (New York, Londres, Tokyo) concentrent la finance et les décisions.</p>
        <p>Les façades maritimes (Asie orientale, Europe du Nord, côte Est américaine) dominent les échanges.</p>
      `},
      { title: "La France sous la Ve République", niveau: "Institutions", content: `
        <h3>Les institutions</h3>
        <ul>
          <li><b>Président de la République</b> : élu au suffrage universel direct pour 5 ans</li>
          <li><b>Premier ministre</b> : nommé par le Président</li>
          <li><b>Parlement</b> : Assemblée nationale + Sénat</li>
          <li><b>Conseil constitutionnel</b> : vérifie la conformité des lois</li>
        </ul>
        <h3>Naissance de la Ve République</h3>
        <p>Fondée en 1958 par Charles de Gaulle pour répondre à la crise algérienne et à l'instabilité politique de la IVe République.</p>
      `}
    ],
    qcm: [
      { q: "En quelle année débute la Première Guerre mondiale ?", opts: ["1912","1914","1916","1918"], answer: 1, expl: "La Première Guerre mondiale débute en août 1914 après l'assassinat de François-Ferdinand" },
      { q: "Quel événement marque le retournement de la Seconde Guerre mondiale à l'Est ?", opts: ["Débarquement","Pearl Harbor","Bataille de Stalingrad","Bataille de Verdun"], answer: 2, expl: "La bataille de Stalingrad (1942-43) marque le début de la défaite allemande" },
      { q: "Le Débarquement en Normandie a lieu le :", opts: ["6 juin 1944","8 mai 1945","6 juin 1940","11 novembre 1918"], answer: 0, expl: "Le Débarquement allié en Normandie (Opération Overlord) a lieu le 6 juin 1944" },
      { q: "La Ve République est fondée par :", opts: ["Léon Blum","François Mitterrand","Charles de Gaulle","Georges Pompidou"], answer: 2, expl: "De Gaulle fonde la Ve République en 1958" },
      { q: "Une FTN est :", opts: ["Une institution française","Une firme multinationale","Un syndicat","Un traité"], answer: 1, expl: "FTN = Firme Transnationale, entreprise opérant dans plusieurs pays" },
    ],
    videos: [
      { title: "La Première Guerre mondiale", channel: "Le Monde", id: "LNSB-kZQRkE" },
      { title: "La Seconde Guerre mondiale résumée", channel: "Nota Bene", id: "wVMSt6bYEso" },
      { title: "La mondialisation expliquée", channel: "C'est une autre histoire", id: "2BplzUFAkSk" },
    ]
  },
  svt: {
    name: "SVT", icon: "🧬", color: "#43e97b",
    fiches: [
      { title: "La cellule – Unité du vivant", niveau: "Fondamental", content: `
        <h3>Structure de la cellule</h3>
        <ul>
          <li><b>Membrane plasmique</b> : délimite la cellule, contrôle les échanges</li>
          <li><b>Cytoplasme</b> : milieu intérieur liquide</li>
          <li><b>Noyau</b> : contient l'ADN (information génétique)</li>
          <li><b>Mitochondries</b> : production d'énergie (respiration cellulaire)</li>
          <li><b>Chloroplastes</b> : photosynthèse (cellules végétales seulement)</li>
        </ul>
        <h3>Cellule animale vs végétale</h3>
        <p>La cellule végétale possède en plus : une paroi cellulaire, des chloroplastes et des vacuoles.</p>
      `},
      { title: "La génétique et l'ADN", niveau: "Essentiel", content: `
        <h3>L'ADN</h3>
        <p>L'ADN (Acide DésoxyriboNucléique) est la molécule qui porte l'information génétique. Il est organisé en chromosomes dans le noyau.</p>
        <h3>Les chromosomes</h3>
        <p>Les cellules humaines contiennent 46 chromosomes (23 paires). Les gamètes (ovules, spermatozoïdes) en contiennent 23.</p>
        <h3>Gène et allèles</h3>
        <p>Un <b>gène</b> est une portion d'ADN codant pour une protéine.</p>
        <p>Un <b>allèle</b> est une version d'un gène (ex : allèle yeux bleus / yeux marrons).</p>
        <h3>Mutations</h3>
        <p>Modification de la séquence d'ADN pouvant être héritée ou acquise.</p>
      `},
      { title: "La nutrition et la digestion", niveau: "Corps humain", content: `
        <h3>Les nutriments essentiels</h3>
        <ul>
          <li><b>Glucides</b> : énergie rapide (pain, sucre, fruits)</li>
          <li><b>Lipides</b> : réserves d'énergie (huile, beurre)</li>
          <li><b>Protéines</b> : construction des cellules (viande, œufs, légumineuses)</li>
          <li><b>Vitamines et minéraux</b> : régulation du métabolisme</li>
        </ul>
        <h3>La digestion</h3>
        <p>Bouche → Œsophage → Estomac → Intestin grêle (absorption) → Gros intestin → Rectum</p>
        <p>Les enzymes digestives décomposent les nutriments pour les rendre assimilables.</p>
      `},
      { title: "L'évolution des êtres vivants", niveau: "Évolution", content: `
        <h3>La théorie de l'évolution (Darwin)</h3>
        <p>Les espèces évoluent au fil du temps par <b>sélection naturelle</b> : les individus les mieux adaptés à leur environnement survivent et se reproduisent.</p>
        <h3>Les preuves de l'évolution</h3>
        <ul>
          <li>Fossiles montrant des formes intermédiaires</li>
          <li>Similitudes anatomiques (membres homologues)</li>
          <li>Comparaisons génétiques (ADN)</li>
        </ul>
        <h3>La classification du vivant</h3>
        <p>Les êtres vivants sont classés selon leurs caractères partagés : Règne → Embranchement → Classe → Ordre → Famille → Genre → Espèce</p>
      `}
    ],
    qcm: [
      { q: "Combien de chromosomes possèdent les cellules humaines ?", opts: ["23","44","46","48"], answer: 2, expl: "Les cellules humaines possèdent 46 chromosomes (23 paires)" },
      { q: "Quel organite réalise la photosynthèse ?", opts: ["Mitochondrie","Noyau","Chloroplaste","Ribosome"], answer: 2, expl: "La photosynthèse se réalise dans les chloroplastes des cellules végétales" },
      { q: "La sélection naturelle est un concept développé par :", opts: ["Mendel","Pasteur","Darwin","Lamarck"], answer: 2, expl: "Charles Darwin a développé la théorie de la sélection naturelle" },
      { q: "Les nutriments servant à construire les cellules sont :", opts: ["Glucides","Lipides","Protéines","Vitamines"], answer: 2, expl: "Les protéines sont les briques de construction des cellules" },
      { q: "L'ADN se trouve principalement :", opts: ["Dans la membrane","Dans le cytoplasme","Dans le noyau","Dans les mitochondries"], answer: 2, expl: "L'ADN est localisé dans le noyau des cellules eucaryotes" },
    ],
    videos: [
      { title: "L'ADN et les gènes", channel: "Osmosis France", id: "AE6K_uFWBcg" },
      { title: "La digestion", channel: "Scilabus", id: "G3-5u0MPnm0" },
      { title: "L'évolution expliquée", channel: "ScienceEtonnante", id: "6UUs9tWKtVs" },
    ]
  },
  physchim: {
    name: "Physique-Chimie", icon: "⚗️", color: "#a18cd1",
    fiches: [
      { title: "Les atomes et la matière", niveau: "Fondamental", content: `
        <h3>Structure de l'atome</h3>
        <ul>
          <li><b>Noyau</b> : protons (+) et neutrons (neutres)</li>
          <li><b>Électrons</b> (-) : en orbite autour du noyau</li>
          <li>Nombre de protons = numéro atomique Z</li>
        </ul>
        <h3>Les ions</h3>
        <p>Un <b>cation</b> est un ion positif (perd des électrons). Un <b>anion</b> est un ion négatif (gagne des électrons).</p>
        <h3>Tableau périodique</h3>
        <p>Les éléments sont classés par numéro atomique croissant. Les propriétés chimiques se répètent périodiquement.</p>
      `},
      { title: "Les réactions chimiques", niveau: "Essentiel", content: `
        <h3>Équation chimique</h3>
        <p>Une réaction chimique transforme des réactifs en produits. L'équation doit être équilibrée (conservation de la matière).</p>
        <div class="formula">2H₂ + O₂ → 2H₂O</div>
        <h3>Conservation de la masse</h3>
        <p>La masse des réactifs = la masse des produits (loi de Lavoisier).</p>
        <h3>Types de réactions</h3>
        <ul>
          <li>Combustion (réaction avec O₂)</li>
          <li>Oxydoréduction</li>
          <li>Réaction acide-base</li>
        </ul>
      `},
      { title: "L'électricité", niveau: "Physique", content: `
        <h3>Circuit électrique</h3>
        <p>Un circuit doit être fermé pour que le courant circule.</p>
        <h3>Loi d'Ohm</h3>
        <div class="formula">U = R × I</div>
        <p>U (tension en V), R (résistance en Ω), I (intensité en A)</p>
        <h3>Circuits en série vs parallèle</h3>
        <p><b>Série</b> : même intensité, tensions additives</p>
        <p><b>Parallèle</b> : même tension, intensités additives</p>
        <h3>Puissance électrique</h3>
        <div class="formula">P = U × I (en watts)</div>
      `},
      { title: "La lumière et l'optique", niveau: "Physique", content: `
        <h3>Propagation de la lumière</h3>
        <p>La lumière se propage en ligne droite dans un milieu homogène à 300 000 km/s dans le vide.</p>
        <h3>Réflexion et réfraction</h3>
        <p>La lumière se réfléchit sur une surface (angle d'incidence = angle de réflexion).</p>
        <p>Elle se réfracte en changeant de milieu (loi de Snell-Descartes).</p>
        <h3>Spectre de la lumière</h3>
        <p>La lumière blanche est composée de toutes les couleurs de l'arc-en-ciel (rouge, orange, jaune, vert, bleu, indigo, violet).</p>
      `}
    ],
    qcm: [
      { q: "Quelle est la formule de la loi d'Ohm ?", opts: ["P=UI","U=RI","F=ma","E=mc²"], answer: 1, expl: "La loi d'Ohm : U (tension) = R (résistance) × I (intensité)" },
      { q: "Un proton est chargé :", opts: ["Négativement","Positivement","Neutrement","Variable"], answer: 1, expl: "Les protons portent une charge positive, les électrons négative, les neutrons sont neutres" },
      { q: "La vitesse de la lumière dans le vide est :", opts: ["3×10⁶ m/s","3×10⁸ m/s","3×10¹⁰ m/s","3×10⁴ m/s"], answer: 1, expl: "c = 3×10⁸ m/s = 300 000 km/s" },
      { q: "Dans un circuit en série, l'intensité est :", opts: ["Différente partout","Nulle","La même partout","Divisée"], answer: 2, expl: "Dans un circuit en série, l'intensité est identique en tout point" },
      { q: "La loi de conservation de la masse est due à :", opts: ["Newton","Lavoisier","Curie","Einstein"], answer: 1, expl: "Antoine Lavoisier a formulé : rien ne se perd, rien ne se crée, tout se transforme" },
    ],
    videos: [
      { title: "Loi d'Ohm – Cours et exercices", channel: "Prof Shadoko", id: "7Zc_j1LoqI8" },
      { title: "Les atomes et la matière", channel: "ScienceEtonnante", id: "MXXD3XFR4pU" },
      { title: "La lumière et l'optique", channel: "Yvan Monka", id: "dQw4w9WgXcQ" },
    ]
  },
  anglais: {
    name: "Anglais", icon: "🇬🇧", color: "#f093fb",
    fiches: [
      { title: "Les temps principaux", niveau: "Fondamental", content: `
        <h3>Present Simple</h3>
        <p>Actions habituelles ou faits permanents. Sujet + verbe (+ s à la 3e pers.)</p>
        <div class="formula">She works every day.</div>
        <h3>Present Continuous</h3>
        <p>Action en cours au moment de parler. Sujet + am/is/are + V-ing</p>
        <div class="formula">She is working right now.</div>
        <h3>Preterit (Past Simple)</h3>
        <p>Action terminée dans le passé. Verbes réguliers : + ed / Verbes irréguliers : forme 2</p>
        <div class="formula">She worked yesterday. / She went to school.</div>
        <h3>Present Perfect</h3>
        <p>Action passée avec lien avec le présent. Sujet + have/has + participe passé</p>
        <div class="formula">She has worked here for 5 years.</div>
      `},
      { title: "Les modaux", niveau: "Essentiel", content: `
        <h3>CAN / COULD</h3>
        <p>Capacité ou permission : I can swim. / Could you help me?</p>
        <h3>MUST / HAVE TO</h3>
        <p>Obligation : You must wear a seatbelt. / I have to study.</p>
        <h3>SHOULD</h3>
        <p>Conseil : You should sleep more.</p>
        <h3>WILL / WOULD</h3>
        <p>Futur et conditionnel : It will rain. / I would like a coffee.</p>
        <h3>MAY / MIGHT</h3>
        <p>Possibilité : It may rain. / He might come.</p>
      `},
      { title: "Le vocabulaire thématique DNB", niveau: "Vocabulaire", content: `
        <h3>L'environnement</h3>
        <p>climate change, global warming, renewable energy, pollution, deforestation, sustainable, greenhouse gas</p>
        <h3>La société</h3>
        <p>immigration, equality, human rights, poverty, democracy, discrimination, freedom</p>
        <h3>La technologie</h3>
        <p>artificial intelligence, social media, smartphone, internet, innovation, data, digital</p>
        <h3>La santé</h3>
        <p>healthcare, mental health, epidemic, vaccine, disease, well-being, hospital</p>
      `},
      { title: "Méthodologie – Compréhension écrite", niveau: "Méthode", content: `
        <h3>Étapes pour comprendre un texte</h3>
        <ul>
          <li>1. Lire les questions avant le texte</li>
          <li>2. Identifier le type de document (article, lettre, dialogue...)</li>
          <li>3. Repérer les mots-clés</li>
          <li>4. Inférer le sens des mots inconnus par le contexte</li>
          <li>5. Répondre aux questions en cherchant des preuves dans le texte</li>
        </ul>
        <h3>Mots de liaison utiles</h3>
        <p>However, Nevertheless, On the other hand, Therefore, Moreover, In addition, Although, Despite</p>
      `}
    ],
    qcm: [
      { q: "Quelle forme est correcte au Present Perfect ?", opts: ["She worked","She has worked","She is working","She works"], answer: 1, expl: "Le Present Perfect se forme avec have/has + participe passé" },
      { q: "Le modal SHOULD exprime :", opts: ["Une obligation","Un conseil","Une capacité","Une interdiction"], answer: 1, expl: "SHOULD est utilisé pour donner un conseil (tu devrais...)" },
      { q: "Comment dit-on 'réchauffement climatique' en anglais ?", opts: ["climate change","global warming","greenhouse effect","pollution"], answer: 1, expl: "Global warming = réchauffement climatique" },
      { q: "Au Past Simple, 'go' devient :", opts: ["goed","goes","went","gone"], answer: 2, expl: "Go est irrégulier : go → went → gone" },
      { q: "MAY exprime :", opts: ["Obligation","Capacité","Possibilité","Interdiction"], answer: 2, expl: "MAY/MIGHT expriment une possibilité (il se peut que...)" },
    ],
    videos: [
      { title: "Les temps en anglais", channel: "Gymglish", id: "LqTdBHjXzlM" },
      { title: "Les modaux – Cours complet", channel: "Anglais avec Hugo", id: "aXRTczAd-1M" },
      { title: "Vocabulaire DNB Anglais", channel: "Learn English with TV Series", id: "2jQhWTmjzfY" },
    ]
  }
};
