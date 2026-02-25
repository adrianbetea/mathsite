import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Heart, Zap, ShieldCheck, Globe, Code, Users } from "lucide-react";

const AboutUs = () => {
  const { language } = useLanguage();

  const content: Record<string, {
    heroTitle: string;
    heroSubtitle: string;
    missionTitle: string;
    missionP1: string;
    missionP2: string;
    missionP3: string;
    whyTitle: string;
    whyIntro: string;
    reason1Title: string;
    reason1Desc: string;
    reason2Title: string;
    reason2Desc: string;
    reason3Title: string;
    reason3Desc: string;
    techTitle: string;
    techIntro: string;
    techBullet1: string;
    techBullet2: string;
    techBullet3: string;
    whatWeOfferTitle: string;
    offer1Title: string;
    offer1Desc: string;
    offer2Title: string;
    offer2Desc: string;
    offer3Title: string;
    offer3Desc: string;
    offer4Title: string;
    offer4Desc: string;
    visionTitle: string;
    visionP1: string;
    visionP2: string;
    contactTitle: string;
    contactDesc: string;
  }> = {
    en: {
      heroTitle: "About MathHub",
      heroSubtitle: "Built by a student, for students. One developer's mission to make advanced math tools free for everyone.",
      missionTitle: "Our Mission: Free Math for Everyone",
      missionP1: "MathHub was born from a simple frustration. As a student, I spent hours struggling with complex math problems — matrices, integrals, polynomial factorization — only to find that the tools that could actually show me the step-by-step solutions were locked behind expensive paywalls. Platforms like Symbolab, Mathway, and Wolfram Alpha all charge monthly subscriptions just to see how a problem is solved.",
      missionP2: "That felt fundamentally wrong. Mathematics is the universal language of science, engineering, and technology. Understanding it shouldn't depend on your wallet. So I built MathHub — a completely free, no-login-required math platform that gives you the same professional-grade step-by-step solutions that the big corporations charge for.",
      missionP3: "This isn't a venture-funded startup. It's an indie project driven by a single belief: if you're willing to learn, the tools should never be what holds you back.",
      whyTitle: "Why MathHub Exists",
      whyIntro: "Every feature on MathHub was designed to solve a real problem that students face every day:",
      reason1Title: "No Paywalls, Ever",
      reason1Desc: "Every step-by-step solution on MathHub is 100% free. We don't gate features behind a \"Pro\" plan or limit the number of problems you can solve per day. Education tools should be accessible, period.",
      reason2Title: "No Accounts Required",
      reason2Desc: "You don't need to create an account, verify an email, or hand over any personal information. Just open the site and start solving. Your math problems are your business, not ours.",
      reason3Title: "Globally Accessible",
      reason3Desc: "MathHub is available in multiple languages and designed to work on any device — from a school computer in Bucharest to a smartphone in Buenos Aires. Math is universal, and so is MathHub.",
      techTitle: "Our Technical Edge: 100% On-Device Processing",
      techIntro: "Here's what truly sets MathHub apart from every other math platform: every single calculation happens entirely inside your browser. There is no server processing your equations. When you type a derivative or a matrix operation, your own device does all the work.",
      techBullet1: "Lightning Fast — No waiting for server responses. Results appear instantly because the computation happens right where you are.",
      techBullet2: "Completely Private — We literally cannot see your math problems. Your data never leaves your device. No tracking, no logging, no data harvesting.",
      techBullet3: "Works Offline — Once the page loads, the core engine runs locally. This means MathHub works even on slow or unreliable internet connections.",
      whatWeOfferTitle: "What We Offer",
      offer1Title: "Matrix Algebra",
      offer1Desc: "Full-featured matrix calculator supporting multiplication, determinants, inverses, eigenvalues, LU/QR/SVD decompositions, Gaussian elimination, and more — all with detailed step-by-step breakdowns.",
      offer2Title: "Calculus",
      offer2Desc: "Solve derivatives, indefinite integrals, definite integrals, limits, and Taylor series with clear, human-readable explanations of every rule applied (Chain Rule, Integration by Parts, U-Substitution, etc.).",
      offer3Title: "Polynomials",
      offer3Desc: "Find roots, factorize expressions, perform polynomial arithmetic, and visualize functions on interactive graphs. From quadratics to higher-degree polynomials, every step is shown.",
      offer4Title: "Daily Challenges & Learning Courses",
      offer4Desc: "Sharpen your skills with fresh daily math challenges across all topics. Our structured learning courses help you build foundational knowledge in linear algebra, calculus, and polynomial theory — at your own pace.",
      visionTitle: "Our Vision",
      visionP1: "MathHub started as a personal project, but it's grown into something bigger — a platform used by students, educators, and lifelong learners around the world. The goal has never changed: democratize access to the mathematical tools that help people learn, understand, and succeed.",
      visionP2: "We're committed to keeping MathHub free, fast, and transparent. If you find value in what we've built, share it with a classmate or a friend. That's the best way to support this mission.",
      contactTitle: "Get in Touch",
      contactDesc: "Have feedback, a feature request, or just want to say hello? We'd love to hear from you.",
    },
    es: {
      heroTitle: "Sobre MathHub",
      heroSubtitle: "Creado por un estudiante, para estudiantes. La misión de un desarrollador independiente de hacer las herramientas matemáticas avanzadas gratuitas para todos.",
      missionTitle: "Nuestra Misión: Matemáticas Gratuitas para Todos",
      missionP1: "MathHub nació de una simple frustración. Como estudiante, pasé horas luchando con problemas matemáticos complejos — matrices, integrales, factorización de polinomios — solo para descubrir que las herramientas que podían mostrarme las soluciones paso a paso estaban bloqueadas detrás de costosas suscripciones. Plataformas como Symbolab, Mathway y Wolfram Alpha cobran mensualidades solo para ver cómo se resuelve un problema.",
      missionP2: "Eso me pareció fundamentalmente injusto. Las matemáticas son el lenguaje universal de la ciencia, la ingeniería y la tecnología. Entenderlas no debería depender de tu billetera. Así que creé MathHub — una plataforma matemática completamente gratuita, sin necesidad de registro, que te da las mismas soluciones paso a paso de nivel profesional por las que las grandes corporaciones cobran.",
      missionP3: "Esto no es una startup con financiación de riesgo. Es un proyecto independiente impulsado por una sola creencia: si estás dispuesto a aprender, las herramientas nunca deberían ser lo que te frene.",
      whyTitle: "Por Qué Existe MathHub",
      whyIntro: "Cada función en MathHub fue diseñada para resolver un problema real que los estudiantes enfrentan cada día:",
      reason1Title: "Sin Muros de Pago, Nunca",
      reason1Desc: "Cada solución paso a paso en MathHub es 100% gratuita. No ocultamos funciones detrás de un plan \"Pro\" ni limitamos la cantidad de problemas que puedes resolver por día. Las herramientas educativas deben ser accesibles, punto.",
      reason2Title: "Sin Cuentas Necesarias",
      reason2Desc: "No necesitas crear una cuenta, verificar un correo electrónico ni entregar información personal. Solo abre el sitio y comienza a resolver. Tus problemas matemáticos son tu asunto, no el nuestro.",
      reason3Title: "Accesible Globalmente",
      reason3Desc: "MathHub está disponible en múltiples idiomas y diseñado para funcionar en cualquier dispositivo — desde una computadora escolar en Bucarest hasta un teléfono inteligente en Buenos Aires. Las matemáticas son universales, y MathHub también.",
      techTitle: "Nuestra Ventaja Técnica: Procesamiento 100% en Tu Dispositivo",
      techIntro: "Esto es lo que realmente diferencia a MathHub de cualquier otra plataforma: cada cálculo ocurre completamente dentro de tu navegador. No hay ningún servidor procesando tus ecuaciones. Cuando escribes una derivada u operación de matrices, tu propio dispositivo hace todo el trabajo.",
      techBullet1: "Ultra Rápido — Sin esperar respuestas del servidor. Los resultados aparecen al instante porque la computación ocurre justo donde estás.",
      techBullet2: "Completamente Privado — Literalmente no podemos ver tus problemas matemáticos. Tus datos nunca salen de tu dispositivo. Sin rastreo, sin registros, sin recolección de datos.",
      techBullet3: "Funciona Sin Conexión — Una vez que la página carga, el motor central funciona localmente. Esto significa que MathHub funciona incluso con conexiones de internet lentas o inestables.",
      whatWeOfferTitle: "Lo Que Ofrecemos",
      offer1Title: "Álgebra Matricial",
      offer1Desc: "Calculadora de matrices completa: multiplicación, determinantes, inversas, autovalores, descomposiciones LU/QR/SVD, eliminación gaussiana y más — todo con explicaciones detalladas paso a paso.",
      offer2Title: "Cálculo",
      offer2Desc: "Resuelve derivadas, integrales indefinidas, integrales definidas, límites y series de Taylor con explicaciones claras de cada regla aplicada (Regla de la Cadena, Integración por Partes, Sustitución, etc.).",
      offer3Title: "Polinomios",
      offer3Desc: "Encuentra raíces, factoriza expresiones, realiza aritmética polinómica y visualiza funciones en gráficas interactivas. Desde cuadráticas hasta polinomios de grado superior, cada paso se muestra.",
      offer4Title: "Desafíos Diarios y Cursos de Aprendizaje",
      offer4Desc: "Agudiza tus habilidades con nuevos desafíos matemáticos diarios en todos los temas. Nuestros cursos estructurados te ayudan a construir conocimientos fundamentales en álgebra lineal, cálculo y teoría de polinomios — a tu propio ritmo.",
      visionTitle: "Nuestra Visión",
      visionP1: "MathHub comenzó como un proyecto personal, pero ha crecido hasta convertirse en algo más grande — una plataforma utilizada por estudiantes, educadores y aprendices de todo el mundo. El objetivo nunca ha cambiado: democratizar el acceso a las herramientas matemáticas que ayudan a las personas a aprender, entender y tener éxito.",
      visionP2: "Estamos comprometidos a mantener MathHub gratuito, rápido y transparente. Si encuentras valor en lo que hemos construido, compártelo con un compañero o amigo. Esa es la mejor forma de apoyar esta misión.",
      contactTitle: "Contáctanos",
      contactDesc: "¿Tienes comentarios, una solicitud de función o simplemente quieres saludar? Nos encantaría saber de ti.",
    },
    fr: {
      heroTitle: "À Propos de MathHub",
      heroSubtitle: "Créé par un étudiant, pour les étudiants. La mission d'un développeur indépendant pour rendre les outils mathématiques avancés gratuits pour tous.",
      missionTitle: "Notre Mission : Des Maths Gratuites pour Tous",
      missionP1: "MathHub est né d'une simple frustration. En tant qu'étudiant, j'ai passé des heures à lutter avec des problèmes mathématiques complexes — matrices, intégrales, factorisation de polynômes — pour découvrir que les outils capables de me montrer les solutions étape par étape étaient verrouillés derrière des abonnements coûteux. Des plateformes comme Symbolab, Mathway et Wolfram Alpha facturent des abonnements mensuels juste pour voir comment un problème est résolu.",
      missionP2: "Cela m'a semblé fondamentalement injuste. Les mathématiques sont le langage universel de la science, de l'ingénierie et de la technologie. Les comprendre ne devrait pas dépendre de votre portefeuille. J'ai donc créé MathHub — une plateforme mathématique entièrement gratuite, sans inscription requise, qui vous offre les mêmes solutions détaillées de qualité professionnelle que celles facturées par les grandes entreprises.",
      missionP3: "Ce n'est pas une startup financée par du capital-risque. C'est un projet indépendant porté par une seule conviction : si vous êtes prêt à apprendre, les outils ne devraient jamais être ce qui vous freine.",
      whyTitle: "Pourquoi MathHub Existe",
      whyIntro: "Chaque fonctionnalité de MathHub a été conçue pour résoudre un problème réel que les étudiants rencontrent chaque jour :",
      reason1Title: "Aucun Mur Payant, Jamais",
      reason1Desc: "Chaque solution étape par étape sur MathHub est 100% gratuite. Nous ne cachons pas de fonctionnalités derrière un plan « Pro » et ne limitons pas le nombre de problèmes que vous pouvez résoudre par jour. Les outils éducatifs doivent être accessibles, point final.",
      reason2Title: "Aucun Compte Requis",
      reason2Desc: "Vous n'avez pas besoin de créer un compte, de vérifier un email ou de fournir des informations personnelles. Ouvrez simplement le site et commencez à résoudre. Vos problèmes de maths ne regardent que vous.",
      reason3Title: "Accessible Mondialement",
      reason3Desc: "MathHub est disponible en plusieurs langues et conçu pour fonctionner sur n'importe quel appareil — d'un ordinateur scolaire à Bucarest à un smartphone à Buenos Aires. Les maths sont universelles, et MathHub aussi.",
      techTitle: "Notre Avantage Technique : Traitement 100% Sur Votre Appareil",
      techIntro: "Voici ce qui distingue véritablement MathHub de toute autre plateforme : chaque calcul se fait entièrement dans votre navigateur. Aucun serveur ne traite vos équations. Quand vous tapez une dérivée ou une opération matricielle, c'est votre propre appareil qui fait tout le travail.",
      techBullet1: "Ultra Rapide — Pas d'attente de réponse serveur. Les résultats apparaissent instantanément car le calcul se fait directement chez vous.",
      techBullet2: "Totalement Privé — Nous ne pouvons littéralement pas voir vos problèmes de maths. Vos données ne quittent jamais votre appareil. Aucun suivi, aucun enregistrement, aucune collecte de données.",
      techBullet3: "Fonctionne Hors Ligne — Une fois la page chargée, le moteur principal tourne localement. Cela signifie que MathHub fonctionne même avec des connexions internet lentes ou instables.",
      whatWeOfferTitle: "Ce Que Nous Offrons",
      offer1Title: "Algèbre Matricielle",
      offer1Desc: "Calculatrice matricielle complète : multiplication, déterminants, inverses, valeurs propres, décompositions LU/QR/SVD, élimination de Gauss et plus — le tout avec des explications détaillées étape par étape.",
      offer2Title: "Calcul Différentiel et Intégral",
      offer2Desc: "Résolvez dérivées, intégrales indéfinies, intégrales définies, limites et séries de Taylor avec des explications claires de chaque règle appliquée (Règle de la Chaîne, Intégration par Parties, Substitution, etc.).",
      offer3Title: "Polynômes",
      offer3Desc: "Trouvez les racines, factorisez des expressions, effectuez de l'arithmétique polynomiale et visualisez les fonctions sur des graphiques interactifs. Des quadratiques aux polynômes de degré supérieur, chaque étape est montrée.",
      offer4Title: "Défis Quotidiens et Cours d'Apprentissage",
      offer4Desc: "Affûtez vos compétences avec de nouveaux défis mathématiques quotidiens sur tous les sujets. Nos cours structurés vous aident à construire des connaissances fondamentales en algèbre linéaire, calcul et théorie des polynômes — à votre rythme.",
      visionTitle: "Notre Vision",
      visionP1: "MathHub a commencé comme un projet personnel, mais il est devenu quelque chose de plus grand — une plateforme utilisée par des étudiants, des éducateurs et des apprenants du monde entier. L'objectif n'a jamais changé : démocratiser l'accès aux outils mathématiques qui aident les gens à apprendre, comprendre et réussir.",
      visionP2: "Nous nous engageons à garder MathHub gratuit, rapide et transparent. Si vous trouvez de la valeur dans ce que nous avons construit, partagez-le avec un camarade ou un ami. C'est la meilleure façon de soutenir cette mission.",
      contactTitle: "Nous Contacter",
      contactDesc: "Vous avez des commentaires, une demande de fonctionnalité ou simplement envie de dire bonjour ? Nous serions ravis de vous entendre.",
    },
    de: {
      heroTitle: "Über MathHub",
      heroSubtitle: "Von einem Studenten gebaut, für Studenten. Die Mission eines unabhängigen Entwicklers, fortgeschrittene Mathe-Tools für alle kostenlos zu machen.",
      missionTitle: "Unsere Mission: Kostenlose Mathematik für Alle",
      missionP1: "MathHub entstand aus einer einfachen Frustration. Als Student verbrachte ich Stunden mit komplexen mathematischen Problemen — Matrizen, Integrale, Polynomfaktorisierung — nur um festzustellen, dass die Tools, die mir die Schritt-für-Schritt-Lösungen zeigen konnten, hinter teuren Bezahlschranken versteckt waren. Plattformen wie Symbolab, Mathway und Wolfram Alpha verlangen monatliche Abonnements, nur um zu sehen, wie ein Problem gelöst wird.",
      missionP2: "Das fühlte sich grundlegend falsch an. Mathematik ist die universelle Sprache von Wissenschaft, Ingenieurwesen und Technologie. Sie zu verstehen sollte nicht vom Geldbeutel abhängen. Also habe ich MathHub gebaut — eine komplett kostenlose Mathe-Plattform ohne Registrierung, die Ihnen die gleichen professionellen Schritt-für-Schritt-Lösungen bietet, für die große Unternehmen Geld verlangen.",
      missionP3: "Dies ist kein risikofinanziertes Startup. Es ist ein unabhängiges Projekt, angetrieben von einer einzigen Überzeugung: Wenn Sie bereit sind zu lernen, sollten die Werkzeuge Sie niemals zurückhalten.",
      whyTitle: "Warum MathHub Existiert",
      whyIntro: "Jede Funktion auf MathHub wurde entwickelt, um ein reales Problem zu lösen, dem Studenten jeden Tag begegnen:",
      reason1Title: "Keine Bezahlschranken, Niemals",
      reason1Desc: "Jede Schritt-für-Schritt-Lösung auf MathHub ist 100% kostenlos. Wir verstecken keine Funktionen hinter einem \"Pro\"-Plan und begrenzen nicht die Anzahl der Probleme, die Sie pro Tag lösen können. Bildungswerkzeuge müssen zugänglich sein, Punkt.",
      reason2Title: "Kein Konto Erforderlich",
      reason2Desc: "Sie müssen kein Konto erstellen, keine E-Mail verifizieren oder persönliche Informationen preisgeben. Öffnen Sie einfach die Seite und fangen Sie an zu rechnen. Ihre Matheprobleme sind Ihre Sache, nicht unsere.",
      reason3Title: "Global Zugänglich",
      reason3Desc: "MathHub ist in mehreren Sprachen verfügbar und für jedes Gerät konzipiert — vom Schulcomputer in Bukarest bis zum Smartphone in Buenos Aires. Mathematik ist universal, und MathHub ist es auch.",
      techTitle: "Unser Technischer Vorteil: 100% On-Device-Verarbeitung",
      techIntro: "Das unterscheidet MathHub wirklich von jeder anderen Plattform: Jede einzelne Berechnung findet vollständig in Ihrem Browser statt. Kein Server verarbeitet Ihre Gleichungen. Wenn Sie eine Ableitung oder Matrizenoperation eingeben, erledigt Ihr eigenes Gerät die gesamte Arbeit.",
      techBullet1: "Blitzschnell — Kein Warten auf Serverantworten. Ergebnisse erscheinen sofort, weil die Berechnung direkt bei Ihnen stattfindet.",
      techBullet2: "Vollständig Privat — Wir können Ihre Matheprobleme buchstäblich nicht sehen. Ihre Daten verlassen niemals Ihr Gerät. Kein Tracking, kein Logging, kein Data-Harvesting.",
      techBullet3: "Funktioniert Offline — Sobald die Seite geladen ist, läuft der Kern lokal. Das bedeutet, MathHub funktioniert auch bei langsamen oder unzuverlässigen Internetverbindungen.",
      whatWeOfferTitle: "Was Wir Bieten",
      offer1Title: "Matrizenalgebra",
      offer1Desc: "Voll ausgestatteter Matrizenrechner: Multiplikation, Determinanten, Inverse, Eigenwerte, LU/QR/SVD-Zerlegungen, Gaußsche Elimination und mehr — alles mit detaillierten Schritt-für-Schritt-Erklärungen.",
      offer2Title: "Analysis",
      offer2Desc: "Lösen Sie Ableitungen, unbestimmte Integrale, bestimmte Integrale, Grenzwerte und Taylor-Reihen mit klaren Erklärungen jeder angewandten Regel (Kettenregel, partielle Integration, Substitution usw.).",
      offer3Title: "Polynome",
      offer3Desc: "Finden Sie Nullstellen, faktorisieren Sie Ausdrücke, führen Sie Polynomarithmetik durch und visualisieren Sie Funktionen auf interaktiven Graphen. Von quadratischen bis zu höhergradigen Polynomen wird jeder Schritt gezeigt.",
      offer4Title: "Tägliche Herausforderungen & Lernkurse",
      offer4Desc: "Schärfen Sie Ihre Fähigkeiten mit frischen täglichen Mathe-Herausforderungen zu allen Themen. Unsere strukturierten Kurse helfen Ihnen, Grundlagenwissen in linearer Algebra, Analysis und Polynomtheorie aufzubauen — in Ihrem eigenen Tempo.",
      visionTitle: "Unsere Vision",
      visionP1: "MathHub begann als persönliches Projekt, ist aber zu etwas Größerem gewachsen — einer Plattform, die von Studenten, Pädagogen und lebenslangen Lernenden weltweit genutzt wird. Das Ziel hat sich nie geändert: den Zugang zu mathematischen Werkzeugen zu demokratisieren, die Menschen beim Lernen, Verstehen und Erfolg haben helfen.",
      visionP2: "Wir verpflichten uns, MathHub kostenlos, schnell und transparent zu halten. Wenn Sie Wert in dem finden, was wir gebaut haben, teilen Sie es mit einem Kommilitonen oder Freund. Das ist der beste Weg, diese Mission zu unterstützen.",
      contactTitle: "Kontaktieren Sie Uns",
      contactDesc: "Haben Sie Feedback, einen Feature-Wunsch oder möchten einfach nur Hallo sagen? Wir freuen uns von Ihnen zu hören.",
    },
    pl: {
      heroTitle: "O MathHub",
      heroSubtitle: "Stworzone przez studenta, dla studentów. Misja niezależnego programisty, by zaawansowane narzędzia matematyczne były darmowe dla wszystkich.",
      missionTitle: "Nasza Misja: Darmowa Matematyka dla Każdego",
      missionP1: "MathHub narodził się z prostej frustracji. Jako student spędzałem godziny zmagając się ze złożonymi problemami matematycznymi — macierze, całki, rozkład wielomianów — tylko po to, by odkryć, że narzędzia mogące pokazać mi rozwiązania krok po kroku były zablokowane za kosztownymi płatnościami. Platformy takie jak Symbolab, Mathway i Wolfram Alpha pobierają miesięczne subskrypcje tylko za to, by zobaczyć, jak problem jest rozwiązany.",
      missionP2: "To wydało mi się fundamentalnie niesprawiedliwe. Matematyka jest uniwersalnym językiem nauki, inżynierii i technologii. Jej zrozumienie nie powinno zależeć od portfela. Dlatego stworzyłem MathHub — całkowicie darmową platformę matematyczną bez konieczności rejestracji, która daje te same profesjonalne rozwiązania krok po kroku, za które wielkie korporacje pobierają opłaty.",
      missionP3: "To nie jest startup finansowany przez venture capital. To niezależny projekt napędzany jednym przekonaniem: jeśli chcesz się uczyć, narzędzia nigdy nie powinny być tym, co cię powstrzymuje.",
      whyTitle: "Dlaczego MathHub Istnieje",
      whyIntro: "Każda funkcja w MathHub została zaprojektowana, by rozwiązać realny problem, z którym studenci borykają się każdego dnia:",
      reason1Title: "Bez Opłat, Nigdy",
      reason1Desc: "Każde rozwiązanie krok po kroku na MathHub jest w 100% darmowe. Nie ukrywamy funkcji za planem \"Pro\" ani nie ograniczamy liczby problemów, które możesz rozwiązać dziennie. Narzędzia edukacyjne muszą być dostępne, kropka.",
      reason2Title: "Bez Konieczności Rejestracji",
      reason2Desc: "Nie musisz zakładać konta, weryfikować emaila ani podawać żadnych danych osobowych. Po prostu otwórz stronę i zacznij rozwiązywać. Twoje problemy matematyczne to twoja sprawa, nie nasza.",
      reason3Title: "Dostępny Globalnie",
      reason3Desc: "MathHub jest dostępny w wielu językach i zaprojektowany do działania na każdym urządzeniu — od szkolnego komputera w Bukareszcie po smartfon w Buenos Aires. Matematyka jest uniwersalna, tak jak MathHub.",
      techTitle: "Nasza Przewaga Techniczna: 100% Przetwarzania na Twoim Urządzeniu",
      techIntro: "Oto, co naprawdę wyróżnia MathHub spośród innych platform: każde obliczenie odbywa się całkowicie w Twojej przeglądarce. Żaden serwer nie przetwarza Twoich równań. Kiedy wpisujesz pochodną lub operację na macierzach, Twoje własne urządzenie wykonuje całą pracę.",
      techBullet1: "Błyskawicznie — Bez czekania na odpowiedzi serwera. Wyniki pojawiają się natychmiast, bo obliczenia dzieją się bezpośrednio u Ciebie.",
      techBullet2: "Całkowicie Prywatne — Dosłownie nie możemy zobaczyć Twoich problemów matematycznych. Twoje dane nigdy nie opuszczają Twojego urządzenia. Żadnego śledzenia, żadnego logowania, żadnego zbierania danych.",
      techBullet3: "Działa Offline — Po załadowaniu strony silnik działa lokalnie. To oznacza, że MathHub działa nawet przy wolnym lub niestabilnym połączeniu internetowym.",
      whatWeOfferTitle: "Co Oferujemy",
      offer1Title: "Algebra Macierzy",
      offer1Desc: "Pełnowymiarowy kalkulator macierzy: mnożenie, wyznaczniki, macierze odwrotne, wartości własne, rozkłady LU/QR/SVD, eliminacja Gaussa i więcej — wszystko ze szczegółowymi wyjaśnieniami krok po kroku.",
      offer2Title: "Analiza Matematyczna",
      offer2Desc: "Rozwiązuj pochodne, całki nieoznaczone, całki oznaczone, granice i szeregi Taylora z jasnymi wyjaśnieniami każdej zastosowanej reguły (reguła łańcuchowa, całkowanie przez części, podstawianie itd.).",
      offer3Title: "Wielomiany",
      offer3Desc: "Znajdź pierwiastki, rozłóż na czynniki, wykonuj arytmetykę wielomianów i wizualizuj funkcje na interaktywnych wykresach. Od funkcji kwadratowych po wielomiany wyższego stopnia — każdy krok jest pokazany.",
      offer4Title: "Codzienne Wyzwania i Kursy",
      offer4Desc: "Doskonal swoje umiejętności dzięki codziennym wyzwaniom matematycznym ze wszystkich tematów. Nasze ustrukturyzowane kursy pomagają budować podstawową wiedzę z algebry liniowej, analizy i teorii wielomianów — we własnym tempie.",
      visionTitle: "Nasza Wizja",
      visionP1: "MathHub zaczął się jako osobisty projekt, ale wyrósł na coś większego — platformę używaną przez studentów, nauczycieli i uczących się przez całe życie na całym świecie. Cel nigdy się nie zmienił: zdemokratyzować dostęp do narzędzi matematycznych, które pomagają ludziom uczyć się, rozumieć i odnosić sukcesy.",
      visionP2: "Jesteśmy zobowiązani do utrzymania MathHub darmowym, szybkim i przejrzystym. Jeśli znajdziesz wartość w tym, co zbudowaliśmy, podziel się nim z kolegą lub przyjacielem. To najlepszy sposób, by wesprzeć tę misję.",
      contactTitle: "Skontaktuj Się z Nami",
      contactDesc: "Masz uwagi, propozycję funkcji lub po prostu chcesz się przywitać? Chętnie od Ciebie usłyszymy.",
    },
    ro: {
      heroTitle: "Despre MathHub",
      heroSubtitle: "Creat de un student, pentru studenți. Misiunea unui dezvoltator independent de a face instrumentele matematice avansate gratuite pentru toată lumea.",
      missionTitle: "Misiunea Noastră: Matematică Gratuită pentru Toți",
      missionP1: "MathHub s-a născut dintr-o simplă frustrare. Ca student, am petrecut ore întregi luptându-mă cu probleme matematice complexe — matrici, integrale, factorizarea polinoamelor — doar ca să descopăr că instrumentele care puteau să-mi arate soluțiile pas cu pas erau blocate în spatele unor abonamente costisitoare. Platforme precum Symbolab, Mathway și Wolfram Alpha percep abonamente lunare doar pentru a vedea cum se rezolvă o problemă.",
      missionP2: "Asta mi s-a părut fundamental greșit. Matematica este limbajul universal al științei, ingineriei și tehnologiei. Înțelegerea ei nu ar trebui să depindă de portofel. Așa că am creat MathHub — o platformă matematică complet gratuită, fără necesitatea de logare, care îți oferă aceleași soluții detaliate pas cu pas de calitate profesională pentru care marile corporații percep bani.",
      missionP3: "Acesta nu este un startup finanțat cu capital de risc. Este un proiect independent condus de o singură convingere: dacă ești dispus să înveți, instrumentele nu ar trebui niciodată să fie ceea ce te oprește.",
      whyTitle: "De Ce Există MathHub",
      whyIntro: "Fiecare funcție din MathHub a fost concepută pentru a rezolva o problemă reală cu care studenții se confruntă în fiecare zi:",
      reason1Title: "Fără Plăți, Niciodată",
      reason1Desc: "Fiecare soluție pas cu pas pe MathHub este 100% gratuită. Nu ascundem funcții în spatele unui plan \"Pro\" și nu limităm numărul de probleme pe care le poți rezolva pe zi. Instrumentele educaționale trebuie să fie accesibile, punct.",
      reason2Title: "Fără Cont Necesar",
      reason2Desc: "Nu trebuie să creezi un cont, să verifici un email sau să predai informații personale. Deschide pur și simplu site-ul și începe să rezolvi. Problemele tale de matematică sunt treaba ta, nu a noastră.",
      reason3Title: "Accesibil Global",
      reason3Desc: "MathHub este disponibil în mai multe limbi și conceput să funcționeze pe orice dispozitiv — de la un computer de școală din București la un smartphone din Buenos Aires. Matematica este universală, la fel și MathHub.",
      techTitle: "Avantajul Nostru Tehnic: Procesare 100% pe Dispozitivul Tău",
      techIntro: "Iată ce diferențiază cu adevărat MathHub de orice altă platformă: fiecare calcul are loc în întregime în browserul tău. Niciun server nu îți procesează ecuațiile. Când tastezi o derivată sau o operație cu matrici, propriul tău dispozitiv face toată munca.",
      techBullet1: "Ultra Rapid — Fără așteptare pentru răspunsuri de la server. Rezultatele apar instantaneu pentru că procesarea se face chiar la tine.",
      techBullet2: "Complet Privat — Nu putem literalmente să vedem problemele tale de matematică. Datele tale nu părăsesc niciodată dispozitivul tău. Fără urmărire, fără înregistrare, fără colectare de date.",
      techBullet3: "Funcționează Offline — Odată ce pagina se încarcă, motorul principal rulează local. Asta înseamnă că MathHub funcționează chiar și cu conexiuni de internet lente sau instabile.",
      whatWeOfferTitle: "Ce Oferim",
      offer1Title: "Algebră Matriceală",
      offer1Desc: "Calculator de matrici complet: înmulțire, determinanți, inverse, valori proprii, descompuneri LU/QR/SVD, eliminare gaussiană și mai mult — totul cu explicații detaliate pas cu pas.",
      offer2Title: "Analiză Matematică",
      offer2Desc: "Rezolvă derivate, integrale nedefinite, integrale definite, limite și serii Taylor cu explicații clare ale fiecărei reguli aplicate (Regula Lanțului, Integrare prin Părți, Substituție etc.).",
      offer3Title: "Polinoame",
      offer3Desc: "Găsește rădăcini, factorizează expresii, efectuează aritmetică polinomială și vizualizează funcții pe grafice interactive. De la pătratice la polinoame de grad superior, fiecare pas este arătat.",
      offer4Title: "Provocări Zilnice și Cursuri de Învățare",
      offer4Desc: "Ascute-ți abilitățile cu provocări matematice zilnice noi din toate subiectele. Cursurile noastre structurate te ajută să construiești cunoștințe fundamentale în algebră liniară, analiză și teoria polinoamelor — în ritmul tău.",
      visionTitle: "Viziunea Noastră",
      visionP1: "MathHub a început ca un proiect personal, dar a crescut în ceva mai mare — o platformă folosită de studenți, educatori și cursanți pe viață din întreaga lume. Obiectivul nu s-a schimbat niciodată: să democratizeze accesul la instrumentele matematice care ajută oamenii să învețe, să înțeleagă și să aibă succes.",
      visionP2: "Ne angajăm să menținem MathHub gratuit, rapid și transparent. Dacă găsești valoare în ceea ce am construit, împărtășește-l cu un coleg sau prieten. Aceasta este cea mai bună modalitate de a susține această misiune.",
      contactTitle: "Contactează-ne",
      contactDesc: "Ai feedback, o cerere de funcționalitate sau pur și simplu vrei să ne saluti? Ne-ar face plăcere să auzim de la tine.",
    },
  };

  const c = content[language] ?? content.en;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">

          {/* Hero Section */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Heart className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {c.heroTitle}
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {c.heroSubtitle}
            </p>
          </div>

          {/* Mission Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Heart className="w-7 h-7 text-red-500 shrink-0" />
              {c.missionTitle}
            </h2>
            <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
              <p>{c.missionP1}</p>
              <p>{c.missionP2}</p>
              <p className="italic font-medium text-foreground">{c.missionP3}</p>
            </div>
          </section>

          {/* Why MathHub Exists */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Users className="w-7 h-7 text-blue-500 shrink-0" />
              {c.whyTitle}
            </h2>
            <p className="text-muted-foreground mb-6 text-base md:text-lg">{c.whyIntro}</p>
            <div className="grid gap-6 md:grid-cols-3">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-green-500/10">
                    <ShieldCheck className="w-5 h-5 text-green-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{c.reason1Title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.reason1Desc}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-blue-500/10">
                    <Users className="w-5 h-5 text-blue-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{c.reason2Title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.reason2Desc}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 rounded-lg bg-purple-500/10">
                    <Globe className="w-5 h-5 text-purple-500" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">{c.reason3Title}</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.reason3Desc}</p>
              </div>
            </div>
          </section>

          {/* Technical Edge Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-4 flex items-center gap-3">
              <Code className="w-7 h-7 text-orange-500 shrink-0" />
              {c.techTitle}
            </h2>
            <p className="text-muted-foreground mb-6 text-base md:text-lg leading-relaxed">{c.techIntro}</p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 bg-gradient-to-r from-yellow-500/5 to-transparent border border-yellow-500/20 rounded-xl p-5">
                <div className="p-2 rounded-lg bg-yellow-500/10 mt-0.5 shrink-0">
                  <Zap className="w-5 h-5 text-yellow-500" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{c.techBullet1.split("—")[0]}—</strong>
                  {c.techBullet1.split("—").slice(1).join("—")}
                </p>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-r from-green-500/5 to-transparent border border-green-500/20 rounded-xl p-5">
                <div className="p-2 rounded-lg bg-green-500/10 mt-0.5 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-green-500" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{c.techBullet2.split("—")[0]}—</strong>
                  {c.techBullet2.split("—").slice(1).join("—")}
                </p>
              </div>
              <div className="flex items-start gap-4 bg-gradient-to-r from-blue-500/5 to-transparent border border-blue-500/20 rounded-xl p-5">
                <div className="p-2 rounded-lg bg-blue-500/10 mt-0.5 shrink-0">
                  <Globe className="w-5 h-5 text-blue-500" />
                </div>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">{c.techBullet3.split("—")[0]}—</strong>
                  {c.techBullet3.split("—").slice(1).join("—")}
                </p>
              </div>
            </div>
          </section>

          {/* What We Offer Section */}
          <section className="mb-16">
            <h2 className="text-3xl font-bold text-foreground mb-6 flex items-center gap-3">
              <Zap className="w-7 h-7 text-yellow-500 shrink-0" />
              {c.whatWeOfferTitle}
            </h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.offer1Title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.offer1Desc}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.offer2Title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.offer2Desc}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.offer3Title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.offer3Desc}</p>
              </div>
              <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                <h3 className="text-xl font-semibold text-foreground mb-2">{c.offer4Title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm">{c.offer4Desc}</p>
              </div>
            </div>
          </section>

          {/* Vision Section */}
          <section className="mb-16">
            <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-8">
              <h2 className="text-3xl font-bold text-foreground mb-4">{c.visionTitle}</h2>
              <div className="space-y-4 text-muted-foreground leading-relaxed text-base md:text-lg">
                <p>{c.visionP1}</p>
                <p>{c.visionP2}</p>
              </div>
            </div>
          </section>

          {/* Contact Section */}
          <section className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-3">{c.contactTitle}</h2>
            <p className="text-muted-foreground mb-4">{c.contactDesc}</p>
            <a
              href="mailto:mathhub.app@gmail.com"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-colors font-medium"
            >
              mathhub.app@gmail.com
            </a>
          </section>

        </div>
      </main>
    </div>
  );
};

export default AboutUs;
