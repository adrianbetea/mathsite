import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, FunctionSquare, Grid3X3, Home, Globe, ChevronDown } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";

const languages = [
  { code: "en" as const, label: "English", flag: "🇺🇸" },
  { code: "es" as const, label: "Español", flag: "🇪🇸" },
  { code: "fr" as const, label: "Français", flag: "🇫🇷" },
  { code: "de" as const, label: "Deutsch", flag: "🇩🇪" },
  { code: "pl" as const, label: "Polski", flag: "🇵🇱" },
  { code: "ro" as const, label: "Română", flag: "🇷🇴" },
];

const Navbar = () => {
  const location = useLocation();
  const { language, languageCode, setLanguage, t } = useLanguage();
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const links = [
    { to: `/${languageCode}`, label: t.nav.home, icon: Home },
    { to: `/${languageCode}/matrix`, label: t.nav.matrix, icon: Grid3X3 },
    { to: `/${languageCode}/calculus`, label: t.nav.calculus, icon: FunctionSquare },
    { to: `/${languageCode}/polynomials`, label: t.nav.polynomials, icon: Calculator },
  ];

  const currentLanguage = languages.find((l) => l.code === language) || languages[0];

  return (
    <nav className="sticky top-0 z-50 w-full bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to={`/${languageCode}`} className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">∑</span>
            </div>
            <span className="font-semibold text-lg text-foreground">MathHub</span>
          </Link>

          <div className="flex items-center gap-1">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`nav-link flex items-center gap-2 ${isActive ? "active" : ""}`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{link.label}</span>
                </Link>
              );
            })}

            {/* Language Selector */}
            <div className="relative ml-2">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-all"
              >
                <Globe className="w-4 h-4" />
                <span className="hidden sm:inline">{currentLanguage.flag}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${langMenuOpen ? "rotate-180" : ""}`} />
              </button>

              {langMenuOpen && (
                <>
                  <div 
                    className="fixed inset-0 z-40" 
                    onClick={() => setLangMenuOpen(false)} 
                  />
                  <div className="absolute right-0 top-full mt-2 w-40 bg-card border border-border rounded-lg shadow-lg overflow-hidden z-50 animate-scale-in">
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setLanguage(lang.code);
                          setLangMenuOpen(false);
                        }}
                        className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-secondary transition-colors ${
                          language === lang.code ? "bg-secondary text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span>{lang.label}</span>
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
