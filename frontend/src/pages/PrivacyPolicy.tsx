import Navbar from "@/components/Navbar";
import { useLanguage } from "@/contexts/LanguageContext";

const PrivacyPolicy = () => {
  const { language, t } = useLanguage();
  const policyByLanguage: Record<
    string,
    {
      intro: string;
      bullets: Array<string | JSX.Element>;
    }
  > = {
    en: {
      intro: "This site is an educational math website that runs only in your browser.",
      bullets: [
        "We do not require accounts, logins, or forms, and we do not collect personal information directly.",
        "All calculations (matrices, polynomials, derivatives, integrals) happen on your device.",
        "We use Google Ads for monetization. Google and its partners may use cookies and similar technologies to show ads and measure performance. This can include device information and approximate location.",
        "You can control or opt out of personalized ads in Google’s Ad Settings and through industry opt‑out tools (such as the NAI or YourOnlineChoices, depending on your region).",
        <>
          Google’s Privacy Policy: {" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            https://policies.google.com/privacy
          </a>
        </>,
        "If you are in the EU/EEA, you have GDPR rights such as access, correction, deletion, restriction, objection, and data portability. You may also lodge a complaint with your local data protection authority.",
      ],
    },
    fr: {
      intro: "Ce site est un site éducatif de mathématiques qui fonctionne uniquement dans votre navigateur.",
      bullets: [
        "Aucun compte, connexion ou formulaire n’est requis, et nous ne collectons pas directement de données personnelles.",
        "Tous les calculs (matrices, polynômes, dérivées, intégrales) sont effectués sur votre appareil.",
        "Nous utilisons Google Ads pour la monétisation. Google et ses partenaires peuvent utiliser des cookies et des technologies similaires pour afficher des publicités et mesurer leur performance. Cela peut inclure des informations sur l’appareil et une localisation approximative.",
        "Vous pouvez gérer ou refuser la personnalisation des annonces dans les paramètres des annonces Google et via des outils d’opt‑out (NAI ou YourOnlineChoices selon votre région).",
        <>
          Politique de confidentialité de Google : {" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            https://policies.google.com/privacy
          </a>
        </>,
        "Si vous êtes dans l’UE/EEE, vous disposez de droits RGPD tels que l’accès, la rectification, l’effacement, la limitation, l’opposition et la portabilité des données. Vous pouvez aussi déposer une plainte auprès de votre autorité locale.",
      ],
    },
    de: {
      intro: "Diese Website ist eine Bildungsseite für Mathematik, die nur im Browser läuft.",
      bullets: [
        "Es sind keine Konten, Logins oder Formulare erforderlich, und wir erfassen keine personenbezogenen Daten direkt.",
        "Alle Berechnungen (Matrizen, Polynome, Ableitungen, Integrale) erfolgen auf Ihrem Gerät.",
        "Wir verwenden Google Ads zur Monetarisierung. Google und seine Partner können Cookies und ähnliche Technologien verwenden, um Anzeigen anzuzeigen und deren Leistung zu messen. Dies kann Geräteinformationen und eine ungefähre Standortangabe umfassen.",
        "Sie können personalisierte Werbung in den Google‑Anzeigeneinstellungen und über branchenweite Opt‑out‑Tools (z. B. NAI oder YourOnlineChoices) steuern oder deaktivieren.",
        <>
          Google‑Datenschutzerklärung: {" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            https://policies.google.com/privacy
          </a>
        </>,
        "Wenn Sie sich in der EU/EWR befinden, haben Sie DSGVO‑Rechte wie Auskunft, Berichtigung, Löschung, Einschränkung, Widerspruch und Datenübertragbarkeit. Sie können außerdem eine Beschwerde bei Ihrer zuständigen Datenschutzbehörde einreichen.",
      ],
    },
    es: {
      intro: "Este sitio es un sitio educativo de matemáticas que funciona solo en tu navegador.",
      bullets: [
        "No requiere cuentas, inicios de sesión ni formularios, y no recopilamos información personal directamente.",
        "Todos los cálculos (matrices, polinomios, derivadas, integrales) se realizan en tu dispositivo.",
        "Usamos Google Ads para monetización. Google y sus socios pueden usar cookies y tecnologías similares para mostrar anuncios y medir su rendimiento. Esto puede incluir información del dispositivo y ubicación aproximada.",
        "Puedes controlar o desactivar los anuncios personalizados en la configuración de anuncios de Google y mediante herramientas de exclusión (NAI o YourOnlineChoices, según tu región).",
        <>
          Política de privacidad de Google: {" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            https://policies.google.com/privacy
          </a>
        </>,
        "Si estás en la UE/EEE, tienes derechos RGPD como acceso, rectificación, eliminación, limitación, oposición y portabilidad de datos. También puedes presentar una queja ante tu autoridad local de protección de datos.",
      ],
    },
    pl: {
      intro: "Ta strona to edukacyjny serwis matematyczny działający wyłącznie w przeglądarce.",
      bullets: [
        "Nie wymaga kont, logowania ani formularzy i nie zbiera bezpośrednio danych osobowych.",
        "Wszystkie obliczenia (macierze, wielomiany, pochodne, całki) wykonywane są na Twoim urządzeniu.",
        "Korzystamy z Google Ads w celu monetyzacji. Google i jego partnerzy mogą używać plików cookie i podobnych technologii do wyświetlania reklam i pomiaru ich skuteczności. Może to obejmować informacje o urządzeniu i przybliżoną lokalizację.",
        "Możesz kontrolować lub wyłączyć reklamy spersonalizowane w ustawieniach reklam Google oraz przez narzędzia opt‑out (np. NAI lub YourOnlineChoices, zależnie od regionu).",
        <>
          Polityka prywatności Google: {" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            https://policies.google.com/privacy
          </a>
        </>,
        "Jeśli jesteś w UE/EOG, przysługują Ci prawa RODO, takie jak dostęp, sprostowanie, usunięcie, ograniczenie, sprzeciw i przenoszenie danych. Możesz też złożyć skargę do lokalnego organu ochrony danych.",
      ],
    },
    ro: {
      intro: "Acest site este un site educațional de matematică care funcționează doar în browser.",
      bullets: [
        "Nu cere conturi, autentificare sau formulare și nu colectează direct date personale.",
        "Toate calculele (matrici, polinoame, derivate, integrale) se fac pe dispozitivul tău.",
        "Folosim Google Ads pentru monetizare. Google și partenerii săi pot folosi cookie‑uri și tehnologii similare pentru a afișa reclame și a măsura performanța. Acest lucru poate include informații despre dispozitiv și locație aproximativă.",
        "Poți controla sau dezactiva reclamele personalizate din setările Google Ads și prin instrumente de opt‑out (NAI sau YourOnlineChoices, în funcție de regiune).",
        <>
          Politica de confidențialitate Google: {" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noreferrer"
            className="underline hover:text-foreground"
          >
            https://policies.google.com/privacy
          </a>
        </>,
        "Dacă ești în UE/SEE, ai drepturi GDPR precum acces, rectificare, ștergere, restricționare, opoziție și portabilitatea datelor. Poți depune și o plângere la autoritatea locală de protecție a datelor.",
      ],
    },
  };

  const policy = policyByLanguage[language] ?? policyByLanguage.en;

  return (
    <div className="min-h-screen">
      <Navbar />

      <main className="container mx-auto px-4 pt-12 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4 text-center">
            {t.footer.privacyPolicy}
          </h1>

          <div className="text-muted-foreground">
            <p className="mb-4">{policy.intro}</p>
            <ul className="list-disc pl-6 space-y-2">
              {policy.bullets.map((bullet, index) => (
                <li key={index}>{bullet}</li>
              ))}
            </ul>
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPolicy;
