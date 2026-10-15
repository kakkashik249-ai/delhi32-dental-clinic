import React from 'react';
import {
  X,
  Clock,
  DollarSign,
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Calendar,
  HelpCircle,
  HeartPulse,
} from 'lucide-react';
import { Treatment } from '../../types/dental';

interface TreatmentModalProps {
  treatment: Treatment | null;
  onClose: () => void;
  onBookTreatment: (treatmentId: string) => void;
}

export const TreatmentModal: React.FC<TreatmentModalProps> = ({
  treatment,
  onClose,
  onBookTreatment,
}) => {
  if (!treatment) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-4xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header Banner */}
        <div className="relative h-60 sm:h-72 w-full overflow-hidden shrink-0">
          <img
            src={treatment.image}
            alt={treatment.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/60 to-transparent" />

          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2.5 rounded-full bg-slate-900/60 hover:bg-slate-900 text-white transition-all cursor-pointer backdrop-blur-md"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Header Title Info */}
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500 text-white uppercase tracking-wider mb-2">
              {treatment.category}
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold font-display leading-tight">
              {treatment.title}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-slate-200 mt-2">
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-teal-400" />
                Approx. {treatment.durationMinutes} mins
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <DollarSign className="w-4 h-4 text-teal-400" />
                {treatment.priceRange}
              </span>
              <span className="hidden sm:inline">·</span>
              <span className="flex items-center gap-1.5 text-teal-300">
                <ShieldCheck className="w-4 h-4" />
                {treatment.insuranceCovered}
              </span>
            </div>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 flex-1 text-slate-700">
          {/* Overview */}
          <div className="space-y-3">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-teal-600" />
              Treatment Overview
            </h3>
            <p className="text-slate-600 leading-relaxed text-sm sm:text-base">
              {treatment.overview}
            </p>
          </div>

          {/* Common Reasons */}
          <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 space-y-3">
            <h3 className="text-base font-bold text-slate-900">
              Common Reasons Patients Seek This Treatment
            </h3>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-sm">
              {treatment.reasons.map((reason, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* General Treatment Process */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Step-by-Step Clinical Process</h3>
            <div className="space-y-3">
              {treatment.process.map((step) => (
                <div
                  key={step.step}
                  className="flex items-start gap-4 p-4 rounded-xl border border-slate-200/80 bg-white hover:border-teal-300 transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-teal-50 text-teal-700 font-bold flex items-center justify-center shrink-0 border border-teal-200 text-sm">
                    {step.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">{step.title}</h4>
                    <p className="text-slate-600 text-xs sm:text-sm mt-1 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Benefits & Limitations (Two columns) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-teal-50/50 rounded-xl p-5 border border-teal-100 space-y-3">
              <h4 className="font-bold text-teal-900 text-sm flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-600" />
                Key Clinical Benefits
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-teal-950">
                {treatment.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-teal-600 font-bold">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-amber-50/50 rounded-xl p-5 border border-amber-100 space-y-3">
              <h4 className="font-bold text-amber-900 text-sm flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600" />
                Important Considerations & Limitations
              </h4>
              <ul className="space-y-2 text-xs sm:text-sm text-amber-950">
                {treatment.limitations.map((lim, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="text-amber-600 font-bold">•</span>
                    <span>{lim}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Aftercare Guidance */}
          {treatment.aftercare && treatment.aftercare.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HeartPulse className="w-5 h-5 text-rose-500" />
                Post-Treatment Aftercare & Home Guidelines
              </h3>
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2 text-xs sm:text-sm">
                {treatment.aftercare.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-slate-700">
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0"></span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Treatment Specific FAQs */}
          {treatment.faqs && treatment.faqs.length > 0 && (
            <div className="space-y-3 pt-2">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-600" />
                Frequently Asked Questions About {treatment.title}
              </h3>
              <div className="space-y-3">
                {treatment.faqs.map((faq, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-slate-50/80 border border-slate-200/60"
                  >
                    <p className="font-semibold text-slate-900 text-sm mb-1.5">{faq.question}</p>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer CTA */}
        <div className="p-4 sm:p-6 bg-slate-50 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 shrink-0">
          <div className="text-xs text-slate-500 text-center sm:text-left">
            <p>Ready to discuss suitability with our specialists?</p>
            <p className="text-slate-400 font-medium">No referral needed · Transparent quote</p>
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              onClick={onClose}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
            >
              Close
            </button>
            <button
              onClick={() => {
                onClose();
                onBookTreatment(treatment.id);
              }}
              className="flex-1 sm:flex-none px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/20 transition-all flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>Book Appointment for {treatment.title}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
