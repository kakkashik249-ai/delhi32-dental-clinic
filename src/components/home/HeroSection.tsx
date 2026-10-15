import React from 'react';
import {
  Calendar,
  Sparkles,
  ShieldCheck,
  Award,
  Clock,
  ArrowRight,
  Star,
  CheckCircle,
} from 'lucide-react';
import { ClinicSettings } from '../../types/dental';

interface HeroSectionProps {
  settings: ClinicSettings;
  onOpenBooking: () => void;
  onExploreTreatments: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  onOpenBooking,
  onExploreTreatments,
}) => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white pt-12 pb-20 sm:pt-20 sm:pb-28">
      {/* Subtle background glow effect */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-80 h-80 bg-teal-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Accreditation Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-teal-300 text-xs font-semibold backdrop-blur-md">
              <Sparkles className="w-4 h-4 text-teal-400" />
              <span>San Francisco's Premier Center for Advanced Dentistry</span>
            </div>

            {/* Welcoming Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-display tracking-tight text-white leading-[1.1]">
              Your Smile Deserves <br className="hidden sm:inline" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-teal-400 to-teal-200">
                Exceptional Care.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 font-normal leading-relaxed">
              {settings.subheadline ||
                'Experience bespoke, pain-free dental healthcare delivered with hospital-grade sterilization, advanced 3D diagnostics, and masters-level clinical expertise.'}
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-xl bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-bold text-base shadow-lg shadow-teal-500/25 active:scale-95 transition-all cursor-pointer"
              >
                <Calendar className="w-5 h-5" />
                <span>Book an Appointment</span>
              </button>

              <button
                onClick={onExploreTreatments}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white font-semibold text-base border border-slate-700/80 active:scale-95 transition-all cursor-pointer"
              >
                <span>Explore Treatments</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </button>
            </div>

            {/* Trust Highlights */}
            <div className="pt-6 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">4.9 / 5.0 Rating</p>
                  <p className="text-xs text-slate-400">1,400+ Verified Reviews</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <Award className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">18+ Years</p>
                  <p className="text-xs text-slate-400">Clinical Leadership</p>
                </div>
              </div>

              <div className="col-span-2 sm:col-span-1 flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-slate-700">
                  <ShieldCheck className="w-4 h-4 text-teal-400" />
                </div>
                <div>
                  <p className="text-sm font-bold text-white">100% Sterile</p>
                  <p className="text-xs text-slate-400">Class B Autoclaves</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Clinical Operatory Image */}
              <div className="rounded-3xl overflow-hidden shadow-2xl border border-slate-700/60 relative group">
                <img
                  src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80"
                  alt="Modern AuraDental Operatory"
                  className="w-full h-[400px] sm:h-[460px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />

                {/* Floating Bottom Card */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-700/80 text-white space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-teal-300 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" /> Aura Suite Operatory
                    </span>
                    <span className="text-[11px] text-slate-400">San Francisco, CA</span>
                  </div>
                  <p className="text-xs text-slate-300">
                    Quiet acoustic isolation, digital 3D scans, and ceiling entertainment for relaxed appointments.
                  </p>
                </div>
              </div>

              {/* Floating Emergency Badge */}
              <div className="absolute -top-4 -left-4 sm:-left-6 p-3 rounded-2xl bg-white text-slate-900 shadow-xl border border-slate-200 hidden sm:flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold">
                  ✓
                </div>
                <div className="text-xs">
                  <p className="font-bold text-slate-900">Same-Day Emergency Care</p>
                  <p className="text-[11px] text-slate-500">Dedicated daily relief slots</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
