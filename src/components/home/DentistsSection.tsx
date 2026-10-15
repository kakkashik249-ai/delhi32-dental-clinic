import React from 'react';
import { Award, ShieldCheck, Calendar, ArrowRight, UserCheck } from 'lucide-react';
import { Dentist } from '../../types/dental';

interface DentistsSectionProps {
  dentists: Dentist[];
  onSelectDentist: (dentist: Dentist) => void;
  onBookWithDentist: (dentistId: string) => void;
}

export const DentistsSection: React.FC<DentistsSectionProps> = ({
  dentists,
  onSelectDentist,
  onBookWithDentist,
}) => {
  return (
    <section id="dentists" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <UserCheck className="w-3.5 h-3.5 text-teal-600" />
            <span>Master Clinicians & Board-Certified Specialists</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Meet Our Specialist Dentists
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Our multi-disciplinary team brings together decades of university faculty tenure,
            advanced post-doctoral residencies, and artistic eye for natural tooth aesthetics.
          </p>
        </div>

        {/* Doctor Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {dentists.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-lg hover:border-teal-300 transition-all duration-300 flex flex-col group"
            >
              {/* Photo */}
              <div className="h-64 w-full overflow-hidden relative bg-slate-100">
                <img
                  src={doc.image}
                  alt={doc.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-900/80 text-teal-300 backdrop-blur-xs">
                    {doc.experienceYears}+ Yrs Exp
                  </span>
                </div>
              </div>

              {/* Bio & Details */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                    {doc.name}
                  </h3>
                  <p className="text-xs font-semibold text-teal-700 mt-0.5">{doc.specialty}</p>

                  <div className="mt-2 flex items-center gap-1.5 text-xs text-slate-500">
                    <Award className="w-3.5 h-3.5 text-teal-600 shrink-0" />
                    <span className="font-medium text-slate-700">{doc.qualifications}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1">
                    License: {doc.registrationNumber}
                  </p>

                  <p className="text-slate-600 text-xs mt-3 line-clamp-3 leading-relaxed">
                    {doc.bio}
                  </p>
                </div>

                {/* Focus Areas list */}
                <div className="pt-3 border-t border-slate-100">
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    Core Focus:
                  </span>
                  <p className="text-xs font-medium text-slate-700 mt-0.5 truncate">
                    {doc.focusAreas[0]}
                  </p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-2">
                  <button
                    onClick={() => onSelectDentist(doc)}
                    className="flex-1 py-2 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors"
                  >
                    View Bio
                  </button>
                  <button
                    onClick={() => onBookWithDentist(doc.id)}
                    className="py-2 px-3 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors flex items-center gap-1 shadow-xs"
                    title={`Book with ${doc.name}`}
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    <span>Book</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
