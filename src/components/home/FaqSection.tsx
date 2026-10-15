import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, MessageCircle } from 'lucide-react';
import { FAQ } from '../../types/dental';

interface FaqSectionProps {
  faqs: FAQ[];
  onOpenBooking: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ faqs, onOpenBooking }) => {
  const [openIds, setOpenIds] = useState<string[]>([faqs[0]?.id || '']);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <HelpCircle className="w-3.5 h-3.5 text-teal-600" />
            <span>Patient Guidance</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Quick, straightforward answers regarding appointment booking, insurance plans,
            first visits, and emergency protocols.
          </p>
        </div>

        {/* Accordion List */}
        <div className="mt-12 space-y-3">
          {faqs.map((faq) => {
            const isOpen = openIds.includes(faq.id);
            return (
              <div
                key={faq.id}
                className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs transition-colors"
              >
                <button
                  onClick={() => toggle(faq.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-50/60 transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 font-display">
                    {faq.question}
                  </span>
                  <div className="p-1 rounded-full bg-slate-100 text-slate-600 shrink-0">
                    {isOpen ? (
                      <ChevronUp className="w-4 h-4 text-teal-600" />
                    ) : (
                      <ChevronDown className="w-4 h-4" />
                    )}
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-slate-600 text-xs sm:text-sm leading-relaxed border-t border-slate-100 animate-fadeIn">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA */}
        <div className="mt-12 p-6 rounded-2xl bg-teal-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-lg shadow-teal-900/10">
          <div className="text-center sm:text-left space-y-1">
            <h4 className="text-base font-bold font-display">Still have a specific question?</h4>
            <p className="text-xs text-teal-200">
              Our front desk coordinator is delighted to assist via phone or live chat.
            </p>
          </div>
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-xl bg-teal-500 hover:bg-teal-400 text-slate-950 text-xs font-bold transition-all shadow-md shrink-0 cursor-pointer"
          >
            Ask Our Coordinator
          </button>
        </div>
      </div>
    </section>
  );
};
