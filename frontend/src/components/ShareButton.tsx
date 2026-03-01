import { useState, useCallback, useRef, useEffect } from "react";
import { Share2, Mail, Link2, Check, X } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// ── Inline brand SVGs (no external dependency needed) ─────────────────────────

const WhatsAppIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const MessengerIcon = () => (
  <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor" aria-hidden>
    <path d="M12 0C5.373 0 0 4.974 0 11.111c0 3.498 1.744 6.614 4.469 8.652V24l4.088-2.242C9.535 21.99 10.75 22.222 12 22.222c6.627 0 12-4.974 12-11.111S18.627 0 12 0zm1.191 14.963l-3.055-3.26-5.963 3.26L10.732 8.4l3.131 3.26L19.752 8.4l-6.561 6.563z" />
  </svg>
);

// ── Share option row ───────────────────────────────────────────────────────────

interface ShareOptionProps {
  icon: React.ReactNode;
  label: string;
  iconBg: string;
  onClick: () => void;
  isSuccess?: boolean;
  successLabel?: string;
}

const ShareOption = ({ icon, label, iconBg, onClick, isSuccess, successLabel }: ShareOptionProps) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-secondary/70 transition-colors text-sm text-left group"
  >
    <span className={`flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-white transition-transform group-hover:scale-105 ${iconBg}`}>
      {isSuccess ? <Check className="w-4 h-4" /> : icon}
    </span>
    <span className={`font-medium transition-colors ${isSuccess ? "text-green-600 dark:text-green-400" : "text-foreground"}`}>
      {isSuccess && successLabel ? successLabel : label}
    </span>
  </button>
);

// ── Main component ─────────────────────────────────────────────────────────────

const ShareButton = () => {
  const { t } = useLanguage();
  const [open, setOpen]   = useState(false);
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const resetTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const getUrl = () => window.location.href;

  const handleWhatsApp = useCallback(() => {
    const msg = encodeURIComponent(`${t.common.shareText}\n${getUrl()}`);
    window.open(`https://wa.me/?text=${msg}`, "_blank", "noopener,noreferrer");
    setOpen(false);
  }, [t]);

  const handleMessenger = useCallback(() => {
    const url = encodeURIComponent(getUrl());
    // Try the deep-link first (works in Messenger app); falls back to the web share dialog
    window.open(`fb-messenger://share?link=${url}`, "_blank", "noopener,noreferrer");
    // Fallback: open Facebook share page after a short delay in case deep-link fails silently
    setTimeout(() => {
      window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, "_blank", "noopener,noreferrer");
    }, 800);
    setOpen(false);
  }, []);

  const handleEmail = useCallback(() => {
    const subject = encodeURIComponent("MathHub – " + t.common.shareText);
    const body    = encodeURIComponent(`${t.common.shareText}\n\n${getUrl()}`);
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
    setOpen(false);
  }, [t]);

  const handleCopy = useCallback(async () => {
    const url = getUrl();
    try {
      await navigator.clipboard.writeText(url);
    } catch {
      try {
        const el = document.createElement("textarea");
        el.value = url;
        el.style.cssText = "position:fixed;opacity:0;pointer-events:none";
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
      } catch { return; }
    }
    setCopied(true);
    if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
    resetTimerRef.current = setTimeout(() => {
      setCopied(false);
      setOpen(false);
    }, 2000);
  }, []);

  return (
    <div ref={containerRef} className="relative inline-block">
      {/* Trigger button */}
      <button
        onClick={() => setOpen(v => !v)}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-sm font-medium text-muted-foreground bg-background hover:text-foreground hover:border-foreground/40 hover:bg-secondary/60 transition-all duration-200 select-none"
        aria-label={t.common.shareSolution}
        aria-expanded={open}
        aria-haspopup="dialog"
      >
        <Share2 className="w-4 h-4 flex-shrink-0" />
        <span>{t.common.shareSolution}</span>
      </button>

      {/* Popup panel */}
      {open && (
        <div
          role="dialog"
          aria-label={t.common.shareVia}
          className="absolute bottom-[calc(100%+8px)] left-0 z-50 w-64 rounded-xl border border-border bg-background shadow-xl animate-in fade-in slide-in-from-bottom-2 duration-150"
          style={{ animationDuration: "120ms" }}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
            <span className="text-sm font-semibold text-foreground">{t.common.shareVia}</span>
            <button
              onClick={() => setOpen(false)}
              className="text-muted-foreground hover:text-foreground transition-colors rounded-md p-0.5"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Options */}
          <div className="p-2 space-y-0.5">
            <ShareOption
              icon={<WhatsAppIcon />}
              label={t.common.shareWhatsApp}
              iconBg="bg-[#25D366]"
              onClick={handleWhatsApp}
            />
            <ShareOption
              icon={<MessengerIcon />}
              label={t.common.shareMessenger}
              iconBg="bg-[#0084FF]"
              onClick={handleMessenger}
            />
            <ShareOption
              icon={<Mail className="w-4 h-4" />}
              label={t.common.shareEmail}
              iconBg="bg-muted-foreground/70"
              onClick={handleEmail}
            />

            {/* Divider */}
            <div className="my-1 border-t border-border/50" />

            <ShareOption
              icon={<Link2 className="w-4 h-4" />}
              label={t.common.shareCopyLink}
              iconBg={copied ? "bg-green-500" : "bg-secondary-foreground/70"}
              onClick={handleCopy}
              isSuccess={copied}
              successLabel={t.common.copiedToClipboard}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ShareButton;

