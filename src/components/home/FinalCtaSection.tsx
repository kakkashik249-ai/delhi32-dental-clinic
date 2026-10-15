import React from 'react';
import { Calendar, Phone, ShieldCheck, HeartHandshake } from 'lucide-react';
import { ClinicSettings } from '../../types/dental';

interface FinalCtaSectionProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
}

export const FinalCtaSection: React.FC<FinalCtaSectionProps> = ({
  settings,
  onOpenBooking,
}) => {
  return (
    <section className="py-20 bg-gradient-to-tr from-slate-950 via-slate-900 to-teal-950 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10 text-center space-y-6">
        <span className="inline-block px-3.5 py-1.5 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
          Begin Your Smile Journey
        </span>

        <h2 className="text-3xl sm:text-5xl font-black font-display tracking-tight text-white max-w-3xl mx-auto leading-tight">
          Ready to Experience Gentle, Bespoke Dental Care?
        </h2>

        <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto leading-relaxed">
          Whether you need a routine ultrasonic cleaning, pediatric care for your child,
          or full-mouth smile restoration, our specialist team is ready to welcome you.
        </p>

        <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 font-bold text-sm shadow-xl shadow-teal-500/20 active:scale-95 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>Book an Appointment Online</span>
          </button>

          <a
            href={`tel:${settings.phone.replace(/[^0-9+]/g, '')}`}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-white font-semibold text-sm border border-slate-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-teal-400" />
            <span>Speak with Reception: {settings.phone}</span>
          </a>
        </div>

        <div className="pt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-teal-400" />
            Strict Zero-Judgment Dentistry
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <HeartHandshake className="w-4 h-4 text-teal-400" />
            Transparent Pricing Upfront
          </span>
          <span>·</span>
          <span className="flex items-center gap-1.5">
            <Calendar className="w-4 h-4 text-teal-400" />
            Same-Day Emergency Reservations
          </span>
        </div>
      </div>
    </section>
  );
};
