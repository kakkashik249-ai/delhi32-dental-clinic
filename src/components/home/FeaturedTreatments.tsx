import React, { useState } from 'react';
import {
  Sparkles,
  Clock,
  DollarSign,
  ShieldCheck,
  ChevronRight,
  Search,
  Filter,
} from 'lucide-react';
import { Treatment, TreatmentCategory } from '../../types/dental';

interface FeaturedTreatmentsProps {
  treatments: Treatment[];
  onSelectTreatment: (treatment: Treatment) => void;
  onBookTreatment: (treatmentId: string) => void;
}

export const FeaturedTreatments: React.FC<FeaturedTreatmentsProps> = ({
  treatments,
  onSelectTreatment,
  onBookTreatment,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All 15 Services' },
    { id: 'preventive', label: 'Preventive Care' },
    { id: 'cosmetic', label: 'Cosmetic & Veneers' },
    { id: 'orthodontics', label: 'Aligners & Braces' },
    { id: 'restorative', label: 'Restorative & Crowns' },
    { id: 'surgical', label: 'Implants & Surgery' },
    { id: 'pediatric', label: 'Pediatric' },
    { id: 'emergency', label: 'Emergency Care' },
  ];

  const filtered = treatments.filter((t) => {
    const matchesCategory =
      selectedCategory === 'all' || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section id="treatments" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>Comprehensive Dental Specialties</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Advanced Treatments & Gentle Procedures
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Every smile is unique. We provide complete diagnostics and customized treatment plans
            utilizing micro-invasive techniques to safeguard your natural enamel.
          </p>
        </div>

        {/* Filter Tabs & Search Bar */}
        <div className="mt-10 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-white text-slate-600 hover:bg-slate-200/80 border border-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 15 dental treatments..."
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
            />
          </div>
        </div>

        {/* Treatment Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200/90 shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col overflow-hidden group cursor-pointer"
              onClick={() => onSelectTreatment(t)}
            >
              {/* Card Image */}
              <div className="h-48 w-full overflow-hidden relative shrink-0">
                <img
                  src={t.image}
                  alt={t.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-white/95 text-slate-800 shadow-xs backdrop-blur-xs uppercase tracking-wider">
                    {t.category}
                  </span>
                </div>
                <div className="absolute bottom-3 right-3">
                  <span className="px-2.5 py-1 rounded-lg text-xs font-bold bg-slate-900/90 text-teal-300 backdrop-blur-xs">
                    {t.priceRange}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display">
                    {t.title}
                  </h3>
                  <p className="text-slate-600 text-xs mt-1.5 leading-relaxed line-clamp-3">
                    {t.shortDescription}
                  </p>
                </div>

                {/* Metadata */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <span className="flex items-center gap-1 text-[11px]">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    ~{t.durationMinutes} mins
                  </span>
                  <span className="flex items-center gap-1 text-teal-700 font-semibold text-[11px]">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Insurance Eligible
                  </span>
                </div>

                {/* Card CTA row */}
                <div className="flex items-center gap-2 pt-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectTreatment(t);
                    }}
                    className="flex-1 py-2 px-3 rounded-xl border border-slate-200 text-slate-700 text-xs font-semibold hover:bg-slate-50 transition-colors"
                  >
                    View Details & Process
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onBookTreatment(t.id);
                    }}
                    className="py-2 px-3.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors shadow-xs"
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="col-span-full py-16 text-center text-slate-400">
              No treatments match your search filter. Try clearing your query.
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
