import React from 'react';
import {
  ShieldCheck,
  Cpu,
  HeartPulse,
  DollarSign,
  Smile,
  Leaf,
  CheckCircle2,
} from 'lucide-react';

export const WhyChooseUs: React.FC = () => {
  const pillars = [
    {
      icon: ShieldCheck,
      title: 'Hospital-Grade Sterilization Protocols',
      description:
        'We adhere to the highest standard of cross-infection prevention with closed-loop Class B vacuum autoclaves, enzymatic ultrasonic washes, and weekly biologic spore testing.',
    },
    {
      icon: Cpu,
      title: '3D Guided Computer Precision',
      description:
        'Green CBCT low-radiation volumetric scanners and iTero 5D optical impressions replace messy gooey trays and ensure micron-accurate restorations.',
    },
    {
      icon: HeartPulse,
      title: 'Anxiety-Free & Painless Philosophy',
      description:
        'Experience buffered local anesthetics that numb within seconds without burning, coupled with relaxing nitrous oxide laughing gas and noise-canceling headphones.',
    },
    {
      icon: Leaf,
      title: 'Conservative Biology-First Approach',
      description:
        'We practice minimally invasive restorative dentistry—preserving maximum natural tooth structure and using biomimetic materials that flex naturally with your enamel.',
    },
    {
      icon: DollarSign,
      title: 'Radical Financial Transparency',
      description:
        'No hidden surprise invoices. You receive a complete itemized printout before any procedure begins, with direct PPO insurance pre-determinations and flexible financing.',
    },
    {
      icon: Smile,
      title: 'Dedicated Concierge Patient Care',
      description:
        'From our serene reception lounge with organic herbal tea to same-day emergency access, we treat you like a cherished guest rather than a case number.',
    },
  ];

  return (
    <section id="about" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30 uppercase tracking-wider">
            The AuraDental Difference
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-display tracking-tight text-white">
            Why Discerning Patients Entrust Their Smiles to Us
          </h2>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            We hold ourselves to uncompromising standards of clinical excellence, sterility,
            and gentle patient empathy.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                className="bg-slate-800/70 border border-slate-700/80 rounded-2xl p-6 hover:border-teal-400/60 hover:bg-slate-800 transition-all duration-300 space-y-4"
              >
                <div className="w-12 h-12 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white font-display">{item.title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
