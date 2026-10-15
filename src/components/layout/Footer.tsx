import React from 'react';
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  ShieldCheck,
  Award,
  ExternalLink,
  Heart,
  ChevronRight,
  AlertTriangle,
} from 'lucide-react';
import { ClinicSettings, Treatment } from '../../types/dental';

interface FooterProps {
  settings: ClinicSettings;
  treatments: Treatment[];
  onSelectTreatment: (treatment: Treatment) => void;
  onOpenLegal: (type: string) => void;
  onOpenBooking: () => void;
  onNavigate: (section: string) => void;
}

export const Footer: React.FC<FooterProps> = ({
  settings,
  treatments,
  onSelectTreatment,
  onOpenLegal,
  onOpenBooking,
  onNavigate,
}) => {
  return (
    <footer className="bg-slate-950 text-slate-300 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-slate-800/80">
          {/* Col 1 & 2: Clinic Identity & Accreditations */}
          <div className="lg:col-span-2 space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-teal-500 to-teal-700 flex items-center justify-center text-white shadow-lg shadow-teal-500/20">
                <svg
                  className="w-5 h-5 text-white"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2C7 2 4 5 4 10c0 4 2 8 3 12h10c1-4 3-8 3-12 0-5-3-8-8-8z" />
                  <path d="M9 10c1.5-1 4.5-1 6 0" />
                </svg>
              </div>
              <div>
                <span className="font-extrabold text-2xl tracking-tight text-white font-display">
                  Aura<span className="text-teal-400">Dental</span>
                </span>
                <p className="text-xs text-slate-400">Clinic & Implant Center</p>
              </div>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-md">
              A patient-first dental institute combining master-level restorative craftsmanship,
              3D guided surgical precision, and hospital-grade sterilization protocols in a serene,
              anxiety-free clinical environment.
            </p>

            {/* Direct Contact Info */}
            <div className="space-y-3 text-sm text-slate-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
                <span>
                  {settings.address}, {settings.city}, {settings.state} {settings.zip}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <a
                  href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-teal-400 transition-colors font-medium text-white"
                >
                  {settings.phone}
                </a>
                <span className="text-xs text-slate-500">· Main Clinic</span>
              </div>
              <div className="flex items-center gap-3">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <a
                  href={`tel:${settings.emergencyPhone.replace(/[^0-9+]/g, '')}`}
                  className="hover:text-amber-400 transition-colors font-medium text-amber-300"
                >
                  {settings.emergencyPhone}
                </a>
                <span className="text-xs text-amber-400/80">· 24/7 Dental Emergency</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-teal-400 shrink-0" />
                <a href={`mailto:${settings.email}`} className="hover:text-teal-400 transition-colors">
                  {settings.email}
                </a>
              </div>
            </div>

            {/* Accreditations badges */}
            <div className="pt-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                Accreditations & Memberships
              </p>
              <div className="flex flex-wrap items-center gap-2 text-[11px] text-slate-300">
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> ADA Member
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <Award className="w-3.5 h-3.5 text-teal-400" /> AACD Accredited
                </span>
                <span className="px-2.5 py-1 rounded bg-slate-900 border border-slate-800 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-teal-400" /> ISO 9001 Sterile
                </span>
              </div>
            </div>
          </div>

          {/* Col 3: Treatments List (Part 1) */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Dental Treatments
            </h4>
            <ul className="space-y-2.5 text-xs">
              {treatments.slice(0, 8).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTreatment(t)}
                    className="text-slate-400 hover:text-teal-300 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors" />
                    <span>{t.title}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Treatments List (Part 2) & Quick Links */}
          <div>
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase mb-4">
              Advanced Services
            </h4>
            <ul className="space-y-2.5 text-xs">
              {treatments.slice(8, 15).map((t) => (
                <li key={t.id}>
                  <button
                    onClick={() => onSelectTreatment(t)}
                    className="text-slate-400 hover:text-teal-300 transition-colors text-left flex items-center gap-1 group cursor-pointer"
                  >
                    <ChevronRight className="w-3 h-3 text-slate-600 group-hover:text-teal-400 transition-colors" />
                    <span>{t.title}</span>
                  </button>
                </li>
              ))}
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('dentists')}
                  className="text-teal-400 hover:text-teal-300 font-medium transition-colors"
                >
                  Meet Our Specialist Dentists →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Operating Hours & Direct Directions */}
          <div className="space-y-4">
            <h4 className="text-white text-sm font-semibold tracking-wider uppercase">
              Clinic Opening Hours
            </h4>
            <div className="bg-slate-900/90 rounded-xl p-4 border border-slate-800 text-xs space-y-3">
              <div>
                <p className="text-slate-400 font-medium">Monday – Friday</p>
                <p className="text-white font-semibold">{settings.hours.mondayFriday}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-slate-400 font-medium">Saturday</p>
                <p className="text-white font-semibold">{settings.hours.saturday}</p>
              </div>
              <div className="pt-2 border-t border-slate-800/80">
                <p className="text-slate-400 font-medium">Sunday</p>
                <p className="text-amber-400 font-semibold">{settings.hours.sunday}</p>
              </div>
            </div>

            <div className="pt-2 flex flex-col gap-2">
              <a
                href={settings.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-colors"
              >
                <MapPin className="w-3.5 h-3.5 text-teal-400" />
                <span>Get Google Maps Directions</span>
                <ExternalLink className="w-3 h-3 text-slate-400" />
              </a>

              <button
                onClick={onOpenBooking}
                className="w-full py-2.5 px-4 rounded-lg bg-teal-600 hover:bg-teal-500 text-white text-xs font-semibold transition-colors shadow-sm"
              >
                Request Appointment Online
              </button>
            </div>
          </div>
        </div>

        {/* Legal & Medical Disclaimer Notice */}
        <div className="pt-8 pb-6 text-xs text-slate-400 space-y-4">
          <div className="p-3.5 rounded-lg bg-slate-900/60 border border-slate-800/80 flex items-start gap-3">
            <ShieldCheck className="w-4 h-4 text-teal-400 shrink-0 mt-0.5" />
            <p className="leading-relaxed text-[11px] text-slate-300">
              <strong className="text-white">Medical Notice:</strong> Information presented on AuraDental is
              for general patient education and clinic navigation only. Content does not constitute personal
              dental diagnosis or replace individual clinical evaluation by a licensed healthcare professional.
              In case of severe acute trauma, profuse bleeding, or airway compromise, seek immediate hospital
              emergency attention or call 911.
            </p>
          </div>

          {/* Legal Navigation Links */}
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-x-6 gap-y-2 text-xs text-slate-400 pt-2">
            <button
              onClick={() => onOpenLegal('terms')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Terms & Conditions
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('privacy')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('cookies')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cookie Policy
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('disclaimer')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Medical Disclaimer
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('accessibility')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Accessibility Statement (WCAG 2.2 AA)
            </button>
            <span>·</span>
            <button
              onClick={() => onOpenLegal('refund')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Cancellation & Refund Policy
            </button>
          </div>

          {/* Copyright Row */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 border-t border-slate-800/40">
            <p>© 2026 AuraDental Clinic & Implant Center. All rights reserved.</p>
            <p className="mt-2 sm:mt-0 flex items-center gap-1 text-slate-400">
              San Francisco, California · CA Dental Board Licensure #482910
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};
