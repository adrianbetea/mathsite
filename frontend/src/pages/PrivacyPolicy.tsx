import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";
import { Shield, Monitor, Cookie, Settings, Scale, ExternalLink } from "lucide-react";

const PrivacyPolicy = () => {
  const { language, t } = useLanguage();

  const content: Record<string, {
    intro: string;
    noAccount: string;
    localCalc: string;
    googleAds: string;
    optOut: string;
    gdpr: string;
    sections: {
      privacy: string;
      device: string;
      cookies: string;
      control: string;
      rights: string;
    };
  }> = {
    en: {
      intro: "This site is an educational math website that runs only in your browser.",
      noAccount: "We do not require accounts, logins, or forms, and we do not collect personal information directly.",
      localCalc: "All calculations (matrices, polynomials, derivatives, integrals) happen on your device.",
      googleAds: "We use Google Ads for monetization. Google and its partners may use cookies and similar technologies to show ads and measure performance. This can include device information and approximate location.",
      optOut: "You can control or opt out of personalized ads in Google's Ad Settings and through industry opt‑out tools (such as the NAI or YourOnlineChoices, depending on your region).",
      gdpr: "If you are in the EU/EEA, you have GDPR rights such as access, correction, deletion, restriction, objection, and data portability. You may also lodge a complaint with your local data protection authority.",
      sections: { privacy: "Your Privacy", device: "On-Device Processing", cookies: "Cookies & Ads", control: "Your Control", rights: "Your Rights" },
    },
    fr: {
      intro: "Ce site est un site éducatif de mathématiques qui fonctionne uniquement dans votre navigateur.",
      noAccount: "Aucun compte, connexion ou formulaire n'est requis, et nous ne collectons pas directement de données personnelles.",
      localCalc: "Tous les calculs (matrices, polynômes, dérivées, intégrales) sont effectués sur votre appareil.",
      googleAds: "Nous utilisons Google Ads pour la monétisation. Google et ses partenaires peuvent utiliser des cookies et des technologies similaires pour afficher des publicités et mesurer leur performance.",
      optOut: "Vous pouvez gérer ou refuser la personnalisation des annonces dans les paramètres des annonces Google et via des outils d'opt‑out (NAI ou YourOnlineChoices selon votre région).",
      gdpr: "Si vous êtes dans l'UE/EEE, vous disposez de droits RGPD tels que l'accès, la rectification, l'effacement, la limitation, l'opposition et la portabilité des données.",
      sections: { privacy: "Votre Vie Privée", device: "Traitement Local", cookies: "Cookies & Publicités", control: "Votre Contrôle", rights: "Vos Droits" },
    },
    de: {
      intro: "Diese Website ist eine Bildungsseite für Mathematik, die nur im Browser läuft.",
      noAccount: "Es sind keine Konten, Logins oder Formulare erforderlich, und wir erfassen keine personenbezogenen Daten direkt.",
      localCalc: "Alle Berechnungen (Matrizen, Polynome, Ableitungen, Integrale) erfolgen auf Ihrem Gerät.",
      googleAds: "Wir verwenden Google Ads zur Monetarisierung. Google und seine Partner können Cookies und ähnliche Technologien verwenden, um Anzeigen anzuzeigen und deren Leistung zu messen.",
      optOut: "Sie können personalisierte Werbung in den Google‑Anzeigeneinstellungen und über branchenweite Opt‑out‑Tools (z. B. NAI oder YourOnlineChoices) steuern oder deaktivieren.",
      gdpr: "Wenn Sie sich in der EU/EWR befinden, haben Sie DSGVO‑Rechte wie Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit.",
      sections: { privacy: "Ihre Privatsphäre", device: "Lokale Verarbeitung", cookies: "Cookies & Werbung", control: "Ihre Kontrolle", rights: "Ihre Rechte" },
    },
    es: {
      intro: "Este sitio es un sitio educativo de matemáticas que funciona solo en tu navegador.",
      noAccount: "No requiere cuentas, inicios de sesión ni formularios, y no recopilamos información personal directamente.",
      localCalc: "Todos los cálculos (matrices, polinomios, derivadas, integrales) se realizan en tu dispositivo.",
      googleAds: "Usamos Google Ads para monetización. Google y sus socios pueden usar cookies y tecnologías similares para mostrar anuncios y medir su rendimiento.",
      optOut: "Puedes controlar o desactivar los anuncios personalizados en la configuración de anuncios de Google y mediante herramientas de exclusión (NAI o YourOnlineChoices, según tu región).",
      gdpr: "Si estás en la UE/EEE, tienes derechos RGPD como acceso, rectificación, eliminación, limitación, oposición y portabilidad de datos.",
      sections: { privacy: "Tu Privacidad", device: "Procesamiento Local", cookies: "Cookies y Anuncios", control: "Tu Control", rights: "Tus Derechos" },
    },
    pl: {
      intro: "Ta strona to edukacyjny serwis matematyczny działający wyłącznie w przeglądarce.",
      noAccount: "Nie wymaga kont, logowania ani formularzy i nie zbiera bezpośrednio danych osobowych.",
      localCalc: "Wszystkie obliczenia (macierze, wielomiany, pochodne, całki) wykonywane są na Twoim urządzeniu.",
      googleAds: "Korzystamy z Google Ads w celu monetyzacji. Google i jego partnerzy mogą używać plików cookie i podobnych technologii do wyświetlania reklam i pomiaru ich skuteczności.",
      optOut: "Możesz kontrolować lub wyłączyć reklamy spersonalizowane w ustawieniach reklam Google oraz przez narzędzia opt‑out (np. NAI lub YourOnlineChoices).",
      gdpr: "Jeśli jesteś w UE/EOG, przysługują Ci prawa RODO, takie jak dostęp, sprostowanie, usunięcie, ograniczenie, sprzeciw i przenoszenie danych.",
      sections: { privacy: "Twoja Prywatność", device: "Lokalne Przetwarzanie", cookies: "Ciasteczka i Reklamy", control: "Twoja Kontrola", rights: "Twoje Prawa" },
    },
    ro: {
      intro: "Acest site este un site educațional de matematică care funcționează doar în browser.",
      noAccount: "Nu cere conturi, autentificare sau formulare și nu colectează direct date personale.",
      localCalc: "Toate calculele (matrici, polinoame, derivate, integrale) se fac pe dispozitivul tău.",
      googleAds: "Folosim Google Ads pentru monetizare. Google și partenerii săi pot folosi cookie‑uri și tehnologii similare pentru a afișa reclame și a măsura performanța.",
      optOut: "Poți controla sau dezactiva reclamele personalizate din setările Google Ads și prin instrumente de opt‑out (NAI sau YourOnlineChoices, în funcție de regiune).",
      gdpr: "Dacă ești în UE/SEE, ai drepturi GDPR precum acces, rectificare, ștergere, restricționare, opoziție și portabilitatea datelor.",
      sections: { privacy: "Confidențialitatea Ta", device: "Procesare Locală", cookies: "Cookie-uri și Reclame", control: "Controlul Tău", rights: "Drepturile Tale" },
    },
  };

  const c = content[language] ?? content.en;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Shield className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t.footer.privacyPolicy}
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {c.intro}
            </p>
          </div>

          {/* Cards Grid */}
          <div className="grid gap-6 md:grid-cols-2 mb-8">
            {/* Privacy Card */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-green-500/10">
                  <Shield className="w-5 h-5 text-green-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{c.sections.privacy}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{c.noAccount}</p>
            </div>

            {/* Device Card */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-blue-500/10">
                  <Monitor className="w-5 h-5 text-blue-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{c.sections.device}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{c.localCalc}</p>
            </div>

            {/* Cookies Card */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-orange-500/10">
                  <Cookie className="w-5 h-5 text-orange-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{c.sections.cookies}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{c.googleAds}</p>
            </div>

            {/* Control Card */}
            <div className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 rounded-lg bg-purple-500/10">
                  <Settings className="w-5 h-5 text-purple-500" />
                </div>
                <h2 className="text-xl font-semibold text-foreground">{c.sections.control}</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">{c.optOut}</p>
            </div>
          </div>

          {/* GDPR Section */}
          <div className="bg-gradient-to-r from-primary/5 to-primary/10 border border-primary/20 rounded-xl p-6 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 rounded-lg bg-primary/10">
                <Scale className="w-5 h-5 text-primary" />
              </div>
              <h2 className="text-xl font-semibold text-foreground">{c.sections.rights}</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">{c.gdpr}</p>
          </div>

          {/* Google Policy Link */}
          <div className="text-center">
            <a
              href="https://policies.google.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-secondary hover:bg-secondary/80 text-foreground rounded-lg transition-colors"
            >
              <span>Google Privacy Policy</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
