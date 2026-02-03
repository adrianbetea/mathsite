import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Calculator, FunctionSquare, Grid3X3, Home, Globe, ChevronDown, Menu, X, Sun, Moon, BookOpen } from "lucide-react";
import { useLanguage } from "../contexts/LanguageContext";
import { useTheme } from "../contexts/ThemeContext";

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
  const { theme, toggleTheme } = useTheme();
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);

  const links = [
    { to: `/${languageCode}`, label: t.nav.home, icon: Home },
    { to: `/${languageCode}/matrix`, label: t.nav.matrix, icon: Grid3X3 },
    { to: `/${languageCode}/calculus`, label: t.nav.calculus, icon: FunctionSquare },
    { to: `/${languageCode}/polynomials`, label: t.nav.polynomials, icon: Calculator },
    { to: `/${languageCode}/learning`, label: t.nav.learning, icon: BookOpen },
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

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
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
                  <span>{link.label}</span>
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

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center w-14 h-8 px-1 bg-secondary/50 hover:bg-secondary rounded-full transition-all"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Sun className={`absolute left-1.5 w-4 h-4 transition-all ${theme === "light" ? "text-yellow-500 opacity-100" : "text-muted-foreground opacity-50"}`} />
              <Moon className={`absolute right-1.5 w-4 h-4 transition-all ${theme === "dark" ? "text-blue-400 opacity-100" : "text-muted-foreground opacity-50"}`} />
              <span 
                className={`w-5 h-5 bg-foreground rounded-full shadow-md transition-all duration-300 ${
                  theme === "dark" ? "translate-x-6" : "translate-x-0"
                }`}
              />
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="relative flex items-center w-12 h-7 px-0.5 bg-secondary/50 hover:bg-secondary rounded-full transition-all"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              <Sun className={`absolute left-1 w-3.5 h-3.5 transition-all ${theme === "light" ? "text-yellow-500 opacity-100" : "text-muted-foreground opacity-50"}`} />
              <Moon className={`absolute right-1 w-3.5 h-3.5 transition-all ${theme === "dark" ? "text-blue-400 opacity-100" : "text-muted-foreground opacity-50"}`} />
              <span 
                className={`w-4 h-4 bg-foreground rounded-full shadow-md transition-all duration-300 ${
                  theme === "dark" ? "translate-x-5" : "translate-x-0.5"
                }`}
              />
            </button>

            {/* Mobile Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center gap-1 px-2 py-2 text-sm font-medium text-muted-foreground hover:text-foreground bg-secondary/50 hover:bg-secondary rounded-lg transition-all"
              >
                <span>{currentLanguage.flag}</span>
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

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-foreground hover:bg-secondary rounded-lg transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 z-40 bg-background/95 backdrop-blur-sm">
          <div className="container mx-auto px-4 py-6">
            <div className="flex flex-col gap-2">
              {links.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.to;
                return (
                  <Link
                    key={link.to}
                    to={link.to}
                    className={`flex items-center gap-3 px-4 py-4 rounded-xl text-lg font-medium transition-colors ${
                      isActive 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-secondary/50 hover:bg-secondary text-foreground"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
