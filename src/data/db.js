export const initialUsers = [
  { name: "Administrateur", login: "admin", pw: "admin", role: "admin" }
];

export const MATIERES = {
  maths: {
    name: "Mathématiques", icon: "🧮", color: "#f7971e",
    fiches: [
      { title: "Les nombres et calculs", niveau: "Fondamental", content: `
### Les fractions
Une fraction représente une partie d'un tout. Elle est composée d'un numérateur (en haut) et d'un dénominateur (en bas).

\`\`\`math
a/b × c/d = (a×c)/(b×d)
\`\`\`

Pour additionner deux fractions, on les met au même dénominateur.

### Les puissances
a^n signifie a multiplié par lui-même n fois.

\`\`\`math
a^n × a^m = a^(n+m)
\`\`\`

- a^0 = 1 (pour tout a ≠ 0)
- a^1 = a
- (a^n)^m = a^(n×m)

### Les racines carrées
\`\`\`math
√(a×b) = √a × √b
\`\`\`

La racine carrée de 4 est 2 car 2² = 4.
      `},
      { title: "Algèbre et équations", niveau: "Essentiel", content: `
### Développer et factoriser
Développer consiste à supprimer les parenthèses. Factoriser est l'opération inverse.

\`\`\`math
(a+b)² = a² + 2ab + b²
(a-b)² = a² - 2ab + b²
(a+b)(a-b) = a² - b²
\`\`\`

### Résoudre une équation du 1er degré
Le but est d'isoler l'inconnue x d'un côté de l'équation.

\`\`\`math
ax + b = c  ->  x = (c-b)/a
\`\`\`

### Systèmes d'équations
Méthode par substitution ou par combinaison linéaire.
      `},
      { title: "Géométrie", niveau: "Essentiel", content: `
### Théorème de Pythagore
Dans un triangle rectangle, le carré de l'hypoténuse est égal à la somme des carrés des deux autres côtés.

\`\`\`math
a² + b² = c² (c = hypoténuse)
\`\`\`

### Théorème de Thalès
Si deux droites sont parallèles, elles coupent deux sécantes proportionnellement.

\`\`\`math
AB/AE = AC/AF = BC/EF
\`\`\`

### Trigonométrie
\`\`\`math
cos(A) = adjacent/hypoténuse
sin(A) = opposé/hypoténuse
tan(A) = opposé/adjacent
\`\`\`
      `},
      { title: "Statistiques et probabilités", niveau: "Maîtrise", content: `
### Moyenne, médiane, mode
La **moyenne** est la somme des valeurs divisée par leur nombre.

La **médiane** est la valeur du milieu d'une série ordonnée.

Le **mode** est la valeur la plus fréquente.

### Probabilités
\`\`\`math
P(A) = nombre de cas favorables / nombre de cas possibles
\`\`\`

- 0 ≤ P(A) ≤ 1
- P(A) + P(Ā) = 1
- P(impossible) = 0, P(certain) = 1
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
### Types de propositions
Une **proposition indépendante** ne dépend d'aucune autre et n'en commande aucune.

Une **proposition principale** commande une ou plusieurs subordonnées.

Une **proposition subordonnée** dépend de la principale.

### Les subordonnées relatives
Elles complètent un nom (antécédent) et sont introduites par un pronom relatif : qui, que, dont, où, lequel...

### Les subordonnées conjonctives
Introduites par que, quand, parce que, si, bien que, pour que...
      `},
      { title: "Figures de style", niveau: "Essentiel", content: `
### Figures d'analogie
- **Métaphore** : comparaison sans outil comparatif (« la vie est un long fleuve »)
- **Comparaison** : rapprochement avec outil (comme, tel, pareil à...)
- **Personnification** : attributs humains à un objet/animal

### Figures d'opposition
- **Antithèse** : opposition de deux idées
- **Oxymore** : alliance de deux termes contraires (« obscure clarté »)

### Figures d'insistance
- **Anaphore** : répétition en début de phrase
- **Gradation** : progression des termes
- **Hyperbole** : exagération volontaire
      `},
      { title: "Méthodologie – La dissertation", niveau: "Maîtrise", content: `
### Structure d'une dissertation
- **Introduction** : accroche, présentation du sujet, problématique, annonce du plan
- **Développement** : 2 ou 3 parties avec arguments et exemples
- **Conclusion** : bilan, réponse à la problématique, ouverture

### Les connecteurs logiques
**Addition** : de plus, en outre, par ailleurs
**Opposition** : cependant, néanmoins, or, mais
**Cause** : car, parce que, en effet
**Conséquence** : donc, ainsi, c'est pourquoi
      `},
      { title: "Les mouvements littéraires", niveau: "Culture", content: `
### Le Classicisme (XVIIe)
Recherche de la raison, de l'ordre, de l'équilibre. Auteurs : Molière, Racine, La Fontaine.

### Le Romantisme (XIXe)
Valorisation des sentiments, de la nature, du moi. Auteurs : Hugo, Lamartine, Musset.

### Le Réalisme (XIXe)
Représentation fidèle de la réalité sociale. Auteurs : Balzac, Flaubert, Zola.

### Le Surréalisme (XXe)
Libération de l'inconscient, écriture automatique. Auteurs : Breton, Éluard, Aragon.
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
### Les causes de la guerre
- Crise des Balkans (assassinat de l'archiduc François-Ferdinand, juin 1914)
- Système des alliances (Triple Alliance vs Triple Entente)
- Rivalités coloniales et économiques entre puissances européennes
- Montée des nationalismes

### Chronologie
**1914** : Début de la guerre, guerre de mouvement, front de l'Ouest stabilisé
**1916** : Batailles de Verdun et de la Somme (guerre de tranchées)
**1917** : Entrée en guerre des États-Unis, révolution russe
**1918** : Armistice du 11 novembre

### Conséquences
18 millions de morts. Traité de Versailles (1919). Nouvelle carte de l'Europe.
      `},
      { title: "La Seconde Guerre mondiale", niveau: "Essentiel", content: `
### Causes
Montée des totalitarismes (nazisme, fascisme), crise économique de 1929, politique d'apaisement.

### Les grandes phases
**1939-1941** : Victoires allemandes en Europe
**1941** : Attaque de l'URSS, entrée en guerre des USA (Pearl Harbor)
**1942-1943** : Retournement (Stalingrad, Afrique du Nord)
**1944-1945** : Libération (Débarquement 6 juin 1944)

### La Shoah
Génocide des Juifs d'Europe par les nazis : 6 millions de victimes.
      `},
      { title: "La mondialisation", niveau: "Géographie", content: `
### Définition
Processus d'intégration croissante des économies, cultures et sociétés à l'échelle mondiale.

### Les acteurs
- Les FTN (Firmes Transnationales) : Apple, Toyota, Shell...
- Les États et organisations internationales (ONU, FMI, OMC)
- Les consommateurs et la société civile

### Les espaces de la mondialisation
Les métropoles mondiales (New York, Londres, Tokyo) concentrent la finance et les décisions.

Les façades maritimes (Asie orientale, Europe du Nord, côte Est américaine) dominent les échanges.
      `},
      { title: "La France sous la Ve République", niveau: "Institutions", content: `
### Les institutions
- **Président de la République** : élu au suffrage universel direct pour 5 ans
- **Premier ministre** : nommé par le Président
- **Parlement** : Assemblée nationale + Sénat
- **Conseil constitutionnel** : vérifie la conformité des lois

### Naissance de la Ve République
Fondée en 1958 par Charles de Gaulle pour répondre à la crise algérienne et à l'instabilité politique de la IVe République.
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
### Structure de la cellule
- **Membrane plasmique** : délimite la cellule, contrôle les échanges
- **Cytoplasme** : milieu intérieur liquide
- **Noyau** : contient l'ADN (information génétique)
- **Mitochondries** : production d'énergie (respiration cellulaire)
- **Chloroplastes** : photosynthèse (cellules végétales seulement)

### Cellule animale vs végétale
La cellule végétale possède en plus : une paroi cellulaire, des chloroplastes et des vacuoles.
      `},
      { title: "La génétique et l'ADN", niveau: "Essentiel", content: `
### L'ADN
L'ADN (Acide DésoxyriboNucléique) est la molécule qui porte l'information génétique. Il est organisé en chromosomes dans le noyau.

### Les chromosomes
Les cellules humaines contiennent 46 chromosomes (23 paires). Les gamètes (ovules, spermatozoïdes) en contiennent 23.

### Gène et allèles
Un **gène** est une portion d'ADN codant pour une protéine.

Un **allèle** est une version d'un gène (ex : allèle yeux bleus / yeux marrons).

### Mutations
Modification de la séquence d'ADN pouvant être héritée ou acquise.
      `},
      { title: "La nutrition et la digestion", niveau: "Corps humain", content: `
### Les nutriments essentiels
- **Glucides** : énergie rapide (pain, sucre, fruits)
- **Lipides** : réserves d'énergie (huile, beurre)
- **Protéines** : construction des cellules (viande, œufs, légumineuses)
- **Vitamines et minéraux** : régulation du métabolisme

### La digestion
Bouche -> Œsophage -> Estomac -> Intestin grêle (absorption) -> Gros intestin -> Rectum

Les enzymes digestives décomposent les nutriments pour les rendre assimilables.
      `},
      { title: "L'évolution des êtres vivants", niveau: "Évolution", content: `
### La théorie de l'évolution (Darwin)
Les espèces évoluent au fil du temps par **sélection naturelle** : les individus les mieux adaptés à leur environnement survivent et se reproduisent.

### Les preuves de l'évolution
- Fossiles montrant des formes intermédiaires
- Similitudes anatomiques (membres homologues)
- Comparaisons génétiques (ADN)

### La classification du vivant
Les êtres vivants sont classés selon leurs caractères partagés : Règne -> Embranchement -> Classe -> Ordre -> Famille -> Genre -> Espèce
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
### Structure de l'atome
- **Noyau** : protons (+) et neutrons (neutres)
- **Électrons** (-) : en orbite autour du noyau
- Nombre de protons = numéro atomique Z

### Les ions
Un **cation** est un ion positif (perd des électrons). Un **anion** est un ion négatif (gagne des électrons).

### Tableau périodique
Les éléments sont classés par numéro atomique croissant. Les propriétés chimiques se répètent périodiquement.
      `},
      { title: "Les réactions chimiques", niveau: "Essentiel", content: `
### Équation chimique
Une réaction chimique transforme des réactifs en produits. L'équation doit être équilibrée (conservation de la matière).

\`\`\`math
2H₂ + O₂ -> 2H₂O
\`\`\`

### Conservation de la masse
La masse des réactifs = la masse des produits (loi de Lavoisier).

### Types de réactions
- Combustion (réaction avec O₂)
- Oxydoréduction
- Réaction acide-base
      `},
      { title: "L'électricité", niveau: "Physique", content: `
### Circuit électrique
Un circuit doit être fermé pour que le courant circule.

### Loi d'Ohm
\`\`\`math
U = R × I
\`\`\`
U (tension en V), R (résistance en Ω), I (intensité en A)

### Circuits en série vs parallèle
**Série** : même intensité, tensions additives

**Parallèle** : même tension, intensités additives

### Puissance électrique
\`\`\`math
P = U × I (en watts)
\`\`\`
      `},
      { title: "La lumière et l'optique", niveau: "Physique", content: `
### Propagation de la lumière
La lumière se propage en ligne droite dans un milieu homogène à 300 000 km/s dans le vide.

### Réflexion et réfraction
La lumière se réfléchit sur une surface (angle d'incidence = angle de réflexion).

Elle se réfracte en changeant de milieu (loi de Snell-Descartes).

### Spectre de la lumière
La lumière blanche est composée de toutes les couleurs de l'arc-en-ciel (rouge, orange, jaune, vert, bleu, indigo, violet).
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
### Present Simple
Actions habituelles ou faits permanents. Sujet + verbe (+ s à la 3e pers.)

\`\`\`math
She works every day.
\`\`\`

### Present Continuous
Action en cours au moment de parler. Sujet + am/is/are + V-ing

\`\`\`math
She is working right now.
\`\`\`

### Preterit (Past Simple)
Action terminée dans le passé. Verbes réguliers : + ed / Verbes irréguliers : forme 2

\`\`\`math
She worked yesterday. / She went to school.
\`\`\`

### Present Perfect
Action passée avec lien avec le présent. Sujet + have/has + participe passé

\`\`\`math
She has worked here for 5 years.
\`\`\`
      `},
      { title: "Les modaux", niveau: "Essentiel", content: `
### CAN / COULD
Capacité ou permission : I can swim. / Could you help me?

### MUST / HAVE TO
Obligation : You must wear a seatbelt. / I have to study.

### SHOULD
Conseil : You should sleep more.

### WILL / WOULD
Futur et conditionnel : It will rain. / I would like a coffee.

### MAY / MIGHT
Possibilité : It may rain. / He might come.
      `},
      { title: "Le vocabulaire thématique DNB", niveau: "Vocabulaire", content: `
### L'environnement
climate change, global warming, renewable energy, pollution, deforestation, sustainable, greenhouse gas

### La société
immigration, equality, human rights, poverty, democracy, discrimination, freedom

### La technologie
artificial intelligence, social media, smartphone, internet, innovation, data, digital

### La santé
healthcare, mental health, epidemic, vaccine, disease, well-being, hospital
      `},
      { title: "Méthodologie – Compréhension écrite", niveau: "Méthode", content: `
### Étapes pour comprendre un texte
- 1. Lire les questions avant le texte
- 2. Identifier le type de document (article, lettre, dialogue...)
- 3. Repérer les mots-clés
- 4. Inférer le sens des mots inconnus par le contexte
- 5. Répondre aux questions en cherchant des preuves dans le texte

### Mots de liaison utiles
However, Nevertheless, On the other hand, Therefore, Moreover, In addition, Although, Despite
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
