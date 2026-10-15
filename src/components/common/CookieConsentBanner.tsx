import React, { useState, useEffect } from 'react';
import { ShieldCheck, Cookie, X } from 'lucide-react';

interface CookieConsentBannerProps {
  onOpenLegal: (type: string) => void;
}

export const CookieConsentBanner: React.FC<CookieConsentBannerProps> = ({ onOpenLegal }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('auradental_cookie_consent');
    if (!consent) {
      const timer = setTimeout(() => setIsVisible(true), 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('auradental_cookie_consent', 'all');
    setIsVisible(false);
  };

  const handleAcceptEssential = () => {
    localStorage.setItem('auradental_cookie_consent', 'essential');
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-6 sm:right-auto sm:max-w-md z-50 bg-white rounded-2xl shadow-2xl border border-slate-200/90 p-5 animate-slideUp text-slate-700">
      <div className="flex items-start gap-3">
        <div className="w-9 h-9 rounded-xl bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 border border-teal-100">
          <Cookie className="w-5 h-5" />
        </div>
        <div className="space-y-1.5 flex-1">
          <h4 className="text-sm font-bold text-slate-900">Patient Privacy & Cookies</h4>
          <p className="text-xs text-slate-600 leading-relaxed">
            We use strictly essential cookies for secure appointment requests and anonymous analytics to
            enhance dental care guides. No personal health records are shared with advertisers.
          </p>
          <div className="pt-1 flex items-center gap-2 text-xs">
            <button
              onClick={() => onOpenLegal('cookies')}
              className="text-teal-700 hover:text-teal-900 underline font-medium"
            >
              Read Cookie Policy
            </button>
          </div>
        </div>
        <button
          onClick={handleAcceptEssential}
          className="text-slate-400 hover:text-slate-600 p-1"
          aria-label="Dismiss"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
        <button
          onClick={handleAcceptEssential}
          className="px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
        >
          Essential Only
        </button>
        <button
          onClick={handleAcceptAll}
          className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold shadow-xs transition-colors"
        >
          Accept All
        </button>
      </div>
    </div>
  );
};
