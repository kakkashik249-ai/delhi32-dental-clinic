import React, { useState } from 'react';
import { Sparkles, Eye, X, ShieldCheck } from 'lucide-react';
import { GalleryItem } from '../../types/dental';

interface FacilitiesSectionProps {
  gallery: GalleryItem[];
}

export const FacilitiesSection: React.FC<FacilitiesSectionProps> = ({ gallery }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryItem | null>(null);

  const categories = [
    { id: 'all', label: 'All Facilities' },
    { id: 'operatory', label: 'Treatment Rooms' },
    { id: 'sterilization', label: 'Sterilization Center' },
    { id: 'equipment', label: '3D Imaging & Lasers' },
    { id: 'reception', label: 'Patient Lounge' },
    { id: 'team', label: 'Clinical Team' },
  ];

  const filtered = gallery.filter((item) =>
    activeCategory === 'all' ? true : item.category === activeCategory
  );

  return (
    <section id="gallery" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-teal-600" />
            <span>State-of-the-Art Facilities</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Tour Our Modern Dental Center
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Engineered from the ground up for acoustic comfort, sterile isolation, and peaceful
            relaxation in downtown San Francisco.
          </p>
        </div>

        {/* Filter categories */}
        <div className="mt-8 flex items-center justify-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              onClick={() => setSelectedPhoto(item)}
              className="group relative rounded-2xl overflow-hidden border border-slate-200 shadow-xs hover:shadow-lg transition-all duration-300 cursor-pointer h-72"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-900/30 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

              <div className="absolute bottom-4 left-4 right-4 text-white space-y-1">
                <span className="inline-block px-2 py-0.5 rounded text-[10px] font-bold bg-teal-500/80 text-white uppercase tracking-wider mb-1">
                  {item.category}
                </span>
                <h3 className="text-base font-bold font-display">{item.title}</h3>
                <p className="text-xs text-slate-300 line-clamp-2">{item.description}</p>
              </div>

              <div className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-xs">
                <Eye className="w-4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedPhoto && (
          <div
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="max-h-[60vh] overflow-hidden">
                <img
                  src={selectedPhoto.image}
                  alt={selectedPhoto.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-6 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-600">
                  {selectedPhoto.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900">{selectedPhoto.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {selectedPhoto.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
