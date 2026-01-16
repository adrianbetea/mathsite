import { useState, useEffect } from "react";
import { X } from "lucide-react";

interface CookiePreferences {
  essential: boolean;
  personalized_ads: boolean;
}

interface CookiePreferencesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CookiePreferencesModal = ({ isOpen, onClose }: CookiePreferencesModalProps) => {
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, can't be disabled
    personalized_ads: true,
  });

  useEffect(() => {
    // Load saved preferences from localStorage
    const saved = localStorage.getItem("cookie_preferences");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setPreferences({ ...preferences, ...parsed });
      } catch (e) {
        // Ignore parse errors
      }
    }
  }, []);

  useEffect(() => {
    // Handle ESC key
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  useEffect(() => {
    // Trap focus in modal
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleSave = () => {
    localStorage.setItem("cookie_preferences", JSON.stringify(preferences));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookie-modal-title"
    >
      <div
        className="relative w-full max-w-2xl mx-4 bg-background border border-border rounded-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
          <h2 id="cookie-modal-title" className="text-xl font-bold text-foreground">
            Cookie & Ads Preferences
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-secondary rounded-lg transition-colors"
            aria-label="Close preferences"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="px-6 py-6 space-y-6">
          <p className="text-sm text-muted-foreground">
            Manage how we use cookies and show you ads. Your choices are saved locally in your browser.
          </p>

          {/* Essential */}
          <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
            <input
              type="checkbox"
              checked={preferences.essential}
              disabled
              className="mt-1 w-5 h-5 rounded accent-primary cursor-not-allowed opacity-50"
              aria-label="Essential cookies (required)"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Essential</h3>
              <p className="text-sm text-muted-foreground">
                Required for the site to function. Cannot be disabled.
              </p>
            </div>
          </div>

          {/* Personalized Ads */}
          <div className="flex items-start gap-4 p-4 bg-secondary/30 rounded-xl">
            <input
              type="checkbox"
              checked={preferences.personalized_ads}
              onChange={(e) =>
                setPreferences({ ...preferences, personalized_ads: e.target.checked })
              }
              className="mt-1 w-5 h-5 rounded accent-primary cursor-pointer"
              aria-label="Personalized ads"
            />
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Personalized Ads (Google)</h3>
              <p className="text-sm text-muted-foreground mb-3">
                Allow Google and partners to show ads tailored to your interests. Disabling this will show
                generic ads but won't reduce the number of ads.
              </p>
              <div className="space-y-2 text-sm">
                <a
                  href="https://myadcenter.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  → Google Ad Settings
                </a>
                <a
                  href="https://optout.networkadvertising.org/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  → NAI Opt-Out Tool
                </a>
                <a
                  href="https://www.youronlinechoices.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-primary hover:underline"
                >
                  → YourOnlineChoices (EU)
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-background border-t border-border px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg border border-border hover:bg-secondary transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookiePreferencesModal;
