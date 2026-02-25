import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Footer = () => {
  const { languageCode, t } = useLanguage();

  return (
    <footer className="border-t border-border mt-10">
      <div className="container mx-auto px-4 py-6 flex flex-col items-center justify-center gap-2">
        <div className="flex items-center gap-4">
          <Link
            to={`/${languageCode}/privacy`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.footer.privacyPolicy}
          </Link>
          <span className="text-muted-foreground">|</span>
          <Link
            to={`/${languageCode}/about`}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            {t.footer.aboutUs}
          </Link>
        </div>
        <div className="text-xs text-muted-foreground">
          Contact us at{" "}
          <a 
            href="mailto:mathhub.app@gmail.com" 
            className="text-primary hover:underline"
          >
            mathhub.app@gmail.com
          </a>
        </div>
        <div className="text-xs text-muted-foreground">
          © 2026 MathHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
