import React from 'react';
import {
  X,
  Award,
  Calendar,
  CheckCircle2,
  Globe,
  Clock,
  ShieldCheck,
} from 'lucide-react';
import { Dentist } from '../../types/dental';

interface DentistDetailModalProps {
  dentist: Dentist | null;
  onClose: () => void;
  onBookWithDentist: (dentistId: string) => void;
}

export const DentistDetailModal: React.FC<DentistDetailModalProps> = ({
  dentist,
  onClose,
  onBookWithDentist,
}) => {
  if (!dentist) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with Photo & Credentials */}
        <div className="p-6 bg-slate-900 text-white flex flex-col sm:flex-row items-center sm:items-start gap-5 relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>

          <img
            src={dentist.image}
            alt={dentist.name}
            className="w-28 h-28 sm:w-32 sm:h-32 rounded-2xl object-cover border-2 border-teal-500 shadow-lg shrink-0"
          />

          <div className="text-center sm:text-left space-y-1.5">
            <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
              {dentist.specialty}
            </span>
            <h2 className="text-2xl font-bold font-display text-white">{dentist.name}</h2>
            <p className="text-sm text-teal-300 font-medium">{dentist.title}</p>
            <div className="pt-1 flex flex-wrap items-center justify-center sm:justify-start gap-x-4 gap-y-1 text-xs text-slate-300">
              <span className="flex items-center gap-1">
                <Award className="w-3.5 h-3.5 text-teal-400" />
                {dentist.qualifications}
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-teal-400" />
                {dentist.registrationNumber}
              </span>
              <span>·</span>
              <span>{dentist.experienceYears}+ Years Clinical Practice</span>
            </div>
          </div>
        </div>

        {/* Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-slate-700">
          {/* Biography */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Professional Biography
            </h3>
            <p className="text-slate-600 text-sm leading-relaxed">{dentist.bio}</p>
          </div>

          {/* Clinical Focus Areas */}
          <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900">
              Key Clinical Interests & Advanced Procedures
            </h3>
            <ul className="space-y-2 text-sm">
              {dentist.focusAreas.map((focus, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{focus}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Languages & Schedule */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs sm:text-sm">
            <div className="p-4 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Globe className="w-4 h-4 text-teal-600" /> Languages Spoken
              </span>
              <p className="text-slate-600">{dentist.languages.join(', ')}</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200">
              <span className="font-semibold text-slate-900 flex items-center gap-1.5 mb-2">
                <Clock className="w-4 h-4 text-teal-600" /> Clinical Schedule
              </span>
              <p className="text-slate-600">{dentist.availableDays.join(', ')}</p>
            </div>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-end gap-3 shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              onClose();
              onBookWithDentist(dentist.id);
            }}
            className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md transition-all flex items-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>Book Consultation with {dentist.name}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
