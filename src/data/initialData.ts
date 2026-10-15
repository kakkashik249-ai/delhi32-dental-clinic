import {
  Treatment,
  Dentist,
  Appointment,
  ContactInquiry,
  Testimonial,
  GalleryItem,
  BlogPost,
  FAQ,
  ClinicSettings,
  AuditLog,
} from '../types/dental';

export const initialClinicSettings: ClinicSettings = {
  name: 'AuraDental Clinic & Implant Center',
  tagline: 'Precision Dentistry · Gentle Care · Enduring Smiles',
  headline: 'Your Smile Deserves Exceptional Care.',
  subheadline:
    'Experience bespoke, pain-free dental healthcare delivered with hospital-grade sterilization, advanced 3D diagnostics, and masters-level clinical expertise.',
  address: '450 Sutter Health Plaza, Suite 820',
  city: 'San Francisco',
  state: 'CA',
  zip: '94108',
  phone: '+1 (415) 890-3342',
  emergencyPhone: '+1 (415) 890-3399',
  whatsapp: '+14158903342',
  email: 'care@auradentalclinic.com',
  hours: {
    mondayFriday: '8:00 AM – 7:00 PM',
    saturday: '8:30 AM – 4:00 PM',
    sunday: 'Emergency On-Call Only (10:00 AM – 2:00 PM)',
  },
  announcement: '✨ Now welcoming new patients · Same-day emergency slots reserved daily',
  googleMapsEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.019253457199!2d-122.408713!3d37.789643!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085808f23f8510f%3A0x7d018d4e9ecba974!2s450%20Sutter%20St%2C%20San%20Francisco%2C%20CA%2094108!5e0!3m2!1sen!2sus!4v1710000000000!5m2!1sen!2sus',
  directionsUrl: 'https://maps.google.com/?q=450+Sutter+St+San+Francisco+CA+94108',
};

export const initialTreatments: Treatment[] = [
  {
    id: 't-1',
    slug: 'general-dentistry',
    title: 'General Dentistry',
    shortDescription:
      'Foundational preventive and restorative oral care focused on early detection, enamel preservation, and whole-mouth wellness.',
    category: 'preventive',
    durationMinutes: 45,
    priceRange: '$120 - $280',
    insuranceCovered: 'Widely covered (80% - 100% under standard PPO plans)',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    iconName: 'ShieldCheck',
    overview:
      'General dentistry represents the core pillar of lifelong oral health. Our conservative clinical approach focuses on proactive prevention, gentle restorations, and comprehensive wellness evaluations using digital x-rays with 90% lower radiation.',
    reasons: [
      'Routine routine maintenance and plaque control',
      'Mild sensitivity or discomfort during hot or cold meals',
      'Early detection of minor cavities or gum inflammation',
      'Custom mouthguards for sports or nighttime teeth grinding',
    ],
    process: [
      {
        step: 1,
        title: 'Diagnostic Imaging & Digital Scans',
        description: 'Ultra-low radiation digital bitewings and high-resolution intraoral camera photography.',
      },
      {
        step: 2,
        title: 'Oral Soft Tissue & Cancer Screening',
        description: 'Gentle tactile and visual examination of gums, palate, tongue, and jaw joints.',
      },
      {
        step: 3,
        title: 'Tailored Treatment Planning',
        description: 'Clear, transparent explanation of findings with conservative recommendations.',
      },
    ],
    benefits: [
      'Identifies potential issues before pain or tooth destruction occurs',
      'Preserves maximum natural tooth structure',
      'Helps maintain systemic health connected to oral bacterial balance',
    ],
    limitations: [
      'Severe infections or structural loss may require specialized endodontic or surgical intervention.',
    ],
    aftercare: [
      'Maintain twice-daily brushing with fluoride or hydroxyapatite toothpaste',
      'Floss gently between contact points once every evening',
      'Schedule routine maintenance every six months',
    ],
    faqs: [
      {
        question: 'How often should I come in for general dental exams?',
        answer:
          'For most adults and children, once every six months is ideal. Patients with active periodontal history may benefit from three to four-month intervals.',
      },
      {
        question: 'Do general appointments hurt?',
        answer:
          'No. We utilize topical anesthetics, ultra-gentle ultrasonic scalers, and optional laughing gas sedation to guarantee total comfort.',
      },
    ],
  },
  {
    id: 't-2',
    slug: 'teeth-cleaning-and-scaling',
    title: 'Teeth Cleaning and Scaling',
    shortDescription:
      'Ultrasonic biofilm removal and deep tartar debridement to reverse gingivitis and restore sparkling fresh breath.',
    category: 'preventive',
    durationMinutes: 50,
    priceRange: '$150 - $350',
    insuranceCovered: 'Typically 100% covered twice annually by dental plans',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sparkles',
    overview:
      'Plaque mineralizes into stubborn calculus that ordinary brushing cannot shift. Our hygienists use piezoelectric ultrasonic instrumentation and warm water irrigation to gently lift tartar above and beneath the gumline.',
    reasons: [
      'Persistent bad breath (halitosis) not resolving with brushing',
      'Bleeding or puffy gums while flossing',
      'Visible yellowish or brown staining along the gumline',
      'Preparation prior to professional teeth whitening',
    ],
    process: [
      {
        step: 1,
        title: 'Gingival Pocket Assessment',
        description: 'Six-point charting to evaluate pocket depths and gum tightness.',
      },
      {
        step: 2,
        title: 'Ultrasonic Biofilm Debridement',
        description: 'Micro-vibrations shatter hard calculus without scraping healthy enamel.',
      },
      {
        step: 3,
        title: 'Air Polishing & Enamel Re-mineralization',
        description: 'Micro-fine glycine powder polish and remineralizing fluoride varnish.',
      },
    ],
    benefits: [
      'Eliminates bacterial reservoirs that cause periodontal bone loss',
      'Noticeably smooth, glossy enamel finish',
      'Immediate reduction in gum bleeding and inflammation',
    ],
    limitations: [
      'Patients with advanced periodontitis may require quadrant deep scaling under localized anesthesia.',
    ],
    aftercare: [
      'Avoid intensely colored beverages (red wine, black coffee) for 24 hours if air-polished',
      'Mild sensitivity to cold may occur for 24-48 hours and resolves spontaneously',
    ],
    faqs: [
      {
        question: 'Will teeth scaling weaken my enamel?',
        answer:
          'No. Ultrasonic scalers only target bacterial tartar. Enamel is the hardest mineral substance in the body and remains completely intact.',
      },
    ],
  },
  {
    id: 't-3',
    slug: 'dental-check-ups',
    title: 'Comprehensive Dental Check-ups',
    shortDescription:
      'In-depth 360° examination covering tooth integrity, bite alignment, TMJ health, and digital cavity screening.',
    category: 'preventive',
    durationMinutes: 40,
    priceRange: '$100 - $220',
    insuranceCovered: 'Typically covered twice per calendar year',
    image:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
    iconName: 'ClipboardCheck',
    overview:
      'Our comprehensive examination goes far beyond looking for cavities. We evaluate your masticatory muscles, TMJ joints, airway anatomy, existing restorations, and soft tissue health with full HD digital imaging.',
    reasons: [
      'New patient baseline assessment',
      'Annual or bi-annual oral wellness check',
      'Jaw clicking, popping, or morning headaches',
      'Pre-wedding or pre-event dental health confirmation',
    ],
    process: [
      {
        step: 1,
        title: 'Medical History & Lifestyle Review',
        description: 'Understanding medications, diet, stress factors, and smile goals.',
      },
      {
        step: 2,
        title: '3D Intraoral Digital Scanning',
        description: 'No gooey impression trays; high-precision 3D digital model of your teeth.',
      },
      {
        step: 3,
        title: 'Doctor Consultation & Co-Discovery',
        description: 'Review your photos together on an oversized 4K display with transparent options.',
      },
    ],
    benefits: [
      'Catches silent micro-fractures and hidden interproximal decay',
      'Comprehensive records tracking tooth wear across years',
      'Empowers you to make informed decisions without sales pressure',
    ],
    limitations: [
      'Diagnostic appointment only; therapeutic restorations are scheduled as separate visits.',
    ],
    aftercare: [
      'You will receive a digital report summarizing findings and personalized preventive tips.',
    ],
    faqs: [
      {
        question: 'What if I haven’t seen a dentist in several years?',
        answer:
          'We practice strictly zero-judgment dentistry. Our focus is exclusively on your comfort today and your radiant health tomorrow.',
      },
    ],
  },
  {
    id: 't-4',
    slug: 'cosmetic-dentistry',
    title: 'Cosmetic Dentistry & Smile Design',
    shortDescription:
      'Bespoke aesthetic transformations utilizing ultra-thin porcelain veneers, composite bonding, and gum re-contouring.',
    category: 'cosmetic',
    durationMinutes: 90,
    priceRange: '$900 - $2,400 per tooth',
    insuranceCovered: 'Usually elective; flexible payment plans available',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Smile',
    overview:
      'Cosmetic dentistry combines biological harmony with artistic craftsmanship. Through Digital Smile Design (DSD), we preview your harmonious facial aesthetics before any treatment begins, ensuring results that look organically stunning rather than artificial.',
    reasons: [
      'Chipped, worn, or unevenly sized front teeth',
      'Persistent tetracycline or internal enamel discoloration',
      'Gaps (diastema) between teeth you wish to close gracefully',
      'Excessive gum show (gummy smile)',
    ],
    process: [
      {
        step: 1,
        title: 'Digital Smile Simulation & Mockup',
        description: 'High-res portrait photography and 3D preview tried in your mouth prior to prep.',
      },
      {
        step: 2,
        title: 'Micro-Preparation & Master Impressions',
        description: 'Minimal tooth enamel shaping with master laboratory shade-matching.',
      },
      {
        step: 3,
        title: 'Precision Adhesive Bonding',
        description: 'Bonding of handcrafted ceramic veneers with microscopic margin adaptation.',
      },
    ],
    benefits: [
      'Stain-resistant feldspathic or lithium disilicate porcelain',
      'Tailored to your facial symmetry, skin tone, and lip dynamics',
      'Long-lasting durability (15–20+ years with proper oral care)',
    ],
    limitations: [
      'Irreversible enamel reduction is required for standard porcelain veneers',
      'Severe bruxism requires a protective nightguard',
    ],
    aftercare: [
      'Wear your custom nightguard if prescribed',
      'Avoid biting into rigid objects like ice cubes, pens, or hard nutshells',
    ],
    faqs: [
      {
        question: 'Will porcelain veneers look like fake white chiclets?',
        answer:
          'Never. Our master ceramists hand-layer multi-chromatic translucency, micro-textures, and incisal halos that replicate genuine enamel.',
      },
    ],
  },
  {
    id: 't-5',
    slug: 'teeth-whitening',
    title: 'Professional In-Office Teeth Whitening',
    shortDescription:
      'Safe, medical-grade LED laser whitening brightening smiles up to 8 shades in a single relaxing 60-minute session.',
    category: 'cosmetic',
    durationMinutes: 60,
    priceRange: '$350 - $650',
    insuranceCovered: 'Elective cosmetic procedure; HSA/FSA often eligible',
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sun',
    overview:
      'Over-the-counter strips often irritate gums and produce uneven results. Our in-office Philips Zoom! and laser whitening systems utilize light-activated hydrogen peroxide buffered with calcium phosphate to safeguard enamel and minimize tooth sensitivity.',
    reasons: [
      'Stains from coffee, tea, red wine, turmeric, or tobacco',
      'Natural yellowing associated with aging and thinning enamel',
      'Special events: weddings, graduations, or professional photography',
    ],
    process: [
      {
        step: 1,
        title: 'Protective Barrier Application',
        description: 'Gums and lips are carefully shielded with a curing resin isolation barrier.',
      },
      {
        step: 2,
        title: 'Triple 15-Minute Whitening Cycles',
        description: 'Fresh clinical gel applied and energized with cold-light LED technology.',
      },
      {
        step: 3,
        title: 'Relief ACP Desensitizing Treatment',
        description: 'Enamel sealed with soothing amorphous calcium phosphate for zero lingering ache.',
      },
    ],
    benefits: [
      'Immediate, dramatic transformation in one single appointment',
      'Supervised by medical professionals for guaranteed gum safety',
      'Includes custom take-home touch-up trays and maintenance gel',
    ],
    limitations: [
      'Does not lighten existing ceramic crowns, composite fillings, or veneers',
    ],
    aftercare: [
      'Adhere to the "White Diet" (avoid dark sauces, coffee, red wine) for the first 48 hours',
      'Use sensitivity toothpaste if minor tingling occurs',
    ],
    faqs: [
      {
        question: 'Is teeth whitening painful?',
        answer:
          'Our desensitizing protocol ensures 95% of patients experience zero or minimal brief sensitivity that disappears within 24 hours.',
      },
    ],
  },
  {
    id: 't-6',
    slug: 'braces-and-orthodontics',
    title: 'Braces and Orthodontics',
    shortDescription:
      'Modern low-profile metal and aesthetic ceramic bracket systems to correct complex crowding, bites, and jaw discrepancies.',
    category: 'orthodontics',
    durationMinutes: 60,
    priceRange: '$3,800 - $6,500',
    insuranceCovered: 'Frequently covered up to 50% under orthodontic lifetime benefits',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Compass',
    overview:
      'Orthodontics is as much about functional chewing mechanics and TMJ relief as it is about straight teeth. We provide self-ligating Damon brackets and clear ceramic systems that exert gentle, biologically sound continuous forces for faster, more comfortable tooth movement.',
    reasons: [
      'Severe dental crowding, overlapping, or ectopic canine eruption',
      'Overbites, underbites, crossbites, and open bites',
      'Facial asymmetry linked to malocclusion',
      'Premature tooth wear caused by misaligned chewing loads',
    ],
    process: [
      {
        step: 1,
        title: 'Cephalometric & 3D CBCT Analysis',
        description: 'Precise bone and root measurements to plan tooth trajectories safely.',
      },
      {
        step: 2,
        title: 'Indirect Bracket Bonding',
        description: 'Digitally positioned brackets placed in minutes with maximum accuracy.',
      },
      {
        step: 3,
        title: 'Periodic Wire Progressions',
        description: 'Visits every 6-8 weeks using heat-activated nickel-titanium memory wires.',
      },
    ],
    benefits: [
      'Capable of correcting severe, multi-directional orthopedic cases',
      'No need to remember taking aligners in and out',
      'Creates lifetime airway, jaw joint, and chewing improvements',
    ],
    limitations: [
      'Requires meticulous flossing with orthodontic threaders',
      'Hard and sticky foods must be avoided during treatment',
    ],
    aftercare: [
      'Wear fixed or removable retainers faithfully as instructed post-debonding',
    ],
    faqs: [
      {
        question: 'Am I too old for braces?',
        answer:
          'No! Nearly 40% of our orthodontic patients are adults. Healthy bone responds to orthodontic forces regardless of age.',
      },
    ],
  },
  {
    id: 't-7',
    slug: 'clear-aligners',
    title: 'Clear Aligners (Invisalign & Spark)',
    shortDescription:
      'Discreet, removable clear orthodontic trays custom-fabricated with digital precision to gently reposition your teeth.',
    category: 'orthodontics',
    durationMinutes: 45,
    priceRange: '$3,400 - $5,900',
    insuranceCovered: 'Eligible under standard orthodontic insurance coverage',
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Sparkle',
    overview:
      'Straighten your teeth without wires or brackets. Our clear aligner therapy uses medical-grade SmartTrack polyurethane materials engineered for predictable, discreet tooth movement. You can remove them to eat, drink, brush, and floss normally.',
    reasons: [
      'Relapse from childhood braces',
      'Mild to moderate crowding or spacing',
      'Desire for an invisible orthodontic option for work and social life',
      'Active lifestyle with sports or wind instruments',
    ],
    process: [
      {
        step: 1,
        title: 'iTero 5D Digital Scan',
        description: 'Immediate 3D simulation of your completed smile in seconds.',
      },
      {
        step: 2,
        title: 'Custom ClinCheck Biomechanical Plan',
        description: 'Dentist-engineered staging to avoid unnecessary tooth extractions.',
      },
      {
        step: 3,
        title: 'Tray Delivery & Remote AI Monitoring',
        description: 'Receive your aligners with regular weekly progressions and smart check-ins.',
      },
    ],
    benefits: [
      'Virtually invisible to colleagues and friends',
      'No dietary restrictions since you remove trays during meals',
      'Fewer emergency appointments compared to wire brackets',
    ],
    limitations: [
      'Requires strict patient compliance: must be worn 20–22 hours per day',
    ],
    aftercare: [
      'Clean aligners with lukewarm water and aligner crystals',
      'Wear Vivera retainers nightly after alignment phase is complete',
    ],
    faqs: [
      {
        question: 'How often do I switch to a new set of aligners?',
        answer:
          'Most patients switch trays every 7 to 10 days as prescribed by your doctor.',
      },
    ],
  },
  {
    id: 't-8',
    slug: 'dental-implants',
    title: 'Dental Implants & Bone Grafting',
    shortDescription:
      'Gold-standard permanent tooth replacement with surgical titanium or zirconia roots and custom ceramic crowns.',
    category: 'surgical',
    durationMinutes: 90,
    priceRange: '$2,200 - $4,800 per implant',
    insuranceCovered: 'Partially covered by many major dental plans; financing available',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Anchor',
    overview:
      'Dental implants are the only restoration that mimics the natural tooth root, halting bone resorption and preserving facial structure. We utilize computer-guided 3D surgical templates for micron-accurate implant placement with minimal postoperative downtime.',
    reasons: [
      'Single or multiple missing teeth from injury or decay',
      'Loose or uncomfortable removable dentures',
      'Desire to preserve adjacent teeth without grinding them for a bridge',
      'Restoration of full bite strength to enjoy all foods',
    ],
    process: [
      {
        step: 1,
        title: '3D CBCT Bone Density Mapping',
        description: 'Sub-millimeter volumetric assessment of nerves, sinuses, and bone volume.',
      },
      {
        step: 2,
        title: 'Guided Micro-Surgical Placement',
        description: 'Titanium fixture placed with sterile precision under gentle local anesthesia.',
      },
      {
        step: 3,
        title: 'Osseointegration & Custom Abutment',
        description: 'Bone fuses solidly to implant over 8–12 weeks before ceramic crown seating.',
      },
    ],
    benefits: [
      'Over 98% clinical success rate',
      'Restores 100% natural chewing efficiency',
      'Never decays and can last for decades with regular hygiene care',
    ],
    limitations: [
      'Requires adequate jawbone density (bone grafting may be necessary)',
      'Uncontrolled diabetes or heavy smoking can lower integration rates',
    ],
    aftercare: [
      'Soft food diet for the initial 5-7 days after surgical placement',
      'Rinse with warm salt water or prescribed chlorhexidine mouthwash',
    ],
    faqs: [
      {
        question: 'Does dental implant surgery hurt?',
        answer:
          'Patients are surprised to learn implant placement is often more comfortable than a simple extraction! Local numbing completely eliminates pain.',
      },
    ],
  },
  {
    id: 't-9',
    slug: 'root-canal-treatment',
    title: 'Endodontic Root Canal Therapy',
    shortDescription:
      'Gentle, modern microscope-assisted root canal procedures that relieve excruciating tooth pain and save your natural tooth.',
    category: 'restorative',
    durationMinutes: 75,
    priceRange: '$850 - $1,600',
    insuranceCovered: 'Standard coverage 50% - 80% on endodontic procedures',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Activity',
    overview:
      'Modern root canal treatment does not cause pain; it eliminates it. Using surgical operatory microscopes and rotary nickel-titanium files, we remove inflamed or infected pulp tissue, sanitize the complex root canal anatomy, and hermetically seal the canals.',
    reasons: [
      'Severe throbbing toothache, especially when lying down',
      'Prolonged sensitivity to hot temperatures that lingers after stimulus',
      'Pimple-like abscess or swelling on the gums near a tooth root',
      'Deep dental trauma causing pulp necrosis',
    ],
    process: [
      {
        step: 1,
        title: 'Microscopic Canal Localization',
        description: 'High-magnification visualization to identify all accessory and curved canals.',
      },
      {
        step: 2,
        title: 'Sonic Irrigation & Disinfection',
        description: 'Gentle bio-compatible irrigants flush out all bacteria without heat or pressure.',
      },
      {
        step: 3,
        title: 'Warm Bioceramic Sealing',
        description: 'Canals are sealed three-dimensionally with biocompatible gutta-percha.',
      },
    ],
    benefits: [
      'Saves your natural tooth from extraction and preserves your natural bite',
      'Immediate relief from throbbing inflammatory pain',
      'Prevents infection from spreading into jaw bone and facial tissues',
    ],
    limitations: [
      'Treated posterior teeth become brittle and typically require a protective crown.',
    ],
    aftercare: [
      'Avoid chewing on the treated tooth until the final permanent crown is cemented',
      'Mild post-treatment tenderness responds readily to ibuprofen',
    ],
    faqs: [
      {
        question: 'Why not just pull the tooth instead of a root canal?',
        answer:
          'Nothing looks, feels, or functions like your own natural tooth. Keeping your tooth prevents adjacent teeth from drifting and avoids costlier implant surgery.',
      },
    ],
  },
  {
    id: 't-10',
    slug: 'crowns-and-bridges',
    title: 'Ceramic Crowns and Fixed Bridges',
    shortDescription:
      'High-strength zirconia and E-max ceramic restorations that reinforce fractured teeth and bridge empty spaces flawlessly.',
    category: 'restorative',
    durationMinutes: 60,
    priceRange: '$950 - $1,800',
    insuranceCovered: 'Typically covered at 50% under major restorative benefits',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Crown',
    overview:
      'When a tooth suffers structural damage exceeding 50%, a crown encases the remaining tooth structure like a protective helmet. Our dental crowns are milled from biocompatible monolithic zirconia or lithium disilicate, blending effortlessly with adjacent teeth.',
    reasons: [
      'Large old fillings with cracked surrounding tooth walls',
      'Teeth weakened following root canal therapy',
      'Severely broken, worn down, or misshapen teeth',
      'Bridging gaps where one or two missing teeth leave empty spaces',
    ],
    process: [
      {
        step: 1,
        title: 'Precision Margin Preparation',
        description: 'Microscopic reduction with smooth finish lines preserving healthy dentin.',
      },
      {
        step: 2,
        title: '3D Optical Scan & Shade Characterization',
        description: 'Digital impressions with custom photographic shade transmission to the lab.',
      },
      {
        step: 3,
        title: 'Permanent Resin Bonding',
        description: 'Seated with dual-cure dental cement for airtight micro-leakage prevention.',
      },
    ],
    benefits: [
      'Shields compromised teeth from catastrophic fracture',
      'Metal-free: no ugly dark gray lines along the gum margin',
      'Natural translucency and smooth contour comfortable for tongue',
    ],
    limitations: [
      'Requires irreversible reduction of outer enamel',
      'Bridges require shaping healthy anchor teeth if implants are not chosen',
    ],
    aftercare: [
      'Floss around margins daily; use interdental brushes or floss threaders under bridges',
    ],
    faqs: [
      {
        question: 'How long do dental crowns last?',
        answer:
          'With good oral hygiene and routine dental cleanings, our high-grade ceramic crowns consistently last 15 to 25+ years.',
      },
    ],
  },
  {
    id: 't-11',
    slug: 'tooth-extraction',
    title: 'Atraumatic Tooth & Wisdom Tooth Extraction',
    shortDescription:
      'Conservative, bone-preserving extractions with platelet-rich fibrin (PRF) therapy for rapid, painless healing.',
    category: 'surgical',
    durationMinutes: 50,
    priceRange: '$220 - $650 per tooth',
    insuranceCovered: 'Frequently covered at 80% under standard surgical benefits',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Scissors',
    overview:
      'We exhaust every conservative avenue to preserve your natural teeth. When extraction is unavoidable due to extensive trauma, impaction, or crowding, our surgeons employ atraumatic piezosurgery and socket preservation to protect your jawbone.',
    reasons: [
      'Impacted or painfully erupting third molars (wisdom teeth)',
      'Severe vertical root fracture that cannot be repaired',
      'Extensive subgingival decay reaching the root apex',
      'Orthodontic decompensation when planned by our specialist',
    ],
    process: [
      {
        step: 1,
        title: 'Profound Local Anesthesia & Sedation Options',
        description: 'Complete numbing ensuring you feel only gentle pressure, zero sharp pain.',
      },
      {
        step: 2,
        title: 'Atraumatic Sectioning',
        description: 'Tooth is divided into small fragments to ease removal without bone damage.',
      },
      {
        step: 3,
        title: 'Socket Preservation & PRF Membrane',
        description: 'Biocompatible graft and healing factors sealed with dissolvable sutures.',
      },
    ],
    benefits: [
      'Prepares the site ideally for a future dental implant',
      'Minimizes swelling and drastically lowers the risk of dry socket',
      'Rapid recovery within 48 to 72 hours',
    ],
    limitations: [
      'Requires temporary dietary modification and rest for 2-3 days',
    ],
    aftercare: [
      'Bite gently on the sterile gauze pack for 45 minutes',
      'Do NOT use straws, smoke, or spit forcefully for 72 hours to protect blood clots',
      'Stick to cold soft foods (yogurt, smoothies, broth) for the first 24 hours',
    ],
    faqs: [
      {
        question: 'Will I feel the extraction?',
        answer:
          'You will feel gentle physical pressure and movement, but our anesthetic protocol blocks all pain nerve transmission completely.',
      },
    ],
  },
  {
    id: 't-12',
    slug: 'pediatric-dentistry',
    title: 'Pediatric Dental Care',
    shortDescription:
      'Gentle, joyful dental experiences for infants, children, and teens with child-friendly language, fluoride treatments, and dental sealants.',
    category: 'pediatric',
    durationMinutes: 40,
    priceRange: '$95 - $220',
    insuranceCovered: '100% preventive coverage on most children dental policies',
    image:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
    iconName: 'HeartHandshake',
    overview:
      'Positive early dental memories establish healthy habits for life. Our pediatric team uses "Tell-Show-Do" techniques, soothing sensory accommodations, cavity-stopping silver diamine fluoride (SDF), and BPA-free groove sealants in an engaging atmosphere.',
    reasons: [
      'First dental birthday visit (recommended by AAPD at age 1)',
      'Preventive fissure sealants on erupting 6-year and 12-year molars',
      'Early childhood tooth decay (baby bottle cavities)',
      'Thumb-sucking habit interception and sports mouthguards',
    ],
    process: [
      {
        step: 1,
        title: 'Friendly Welcome & "Tell-Show-Do"',
        description: 'Showing tools as "Mr. Thirsty" and "Tooth Sweeper" to eliminate anxiety.',
      },
      {
        step: 2,
        title: 'Gentle Plaque Removal & Fluoride Glaze',
        description: 'Sweet berry-flavored polish and protective mineral coating.',
      },
      {
        step: 3,
        title: 'Parent Consultation & Growth Check',
        description: 'Assessing jaw expansion, airway breathing, and nutritional guidance.',
      },
    ],
    benefits: [
      'Builds confident, fear-free patients for adulthood',
      'BPA-free dental sealants reduce molar cavity risk by over 80%',
      'Detects childhood airway or bite problems early for easier correction',
    ],
    limitations: [
      'Highly anxious toddlers may require gradual familiarization visits.',
    ],
    aftercare: [
      'Parents should assist with flossing until child reaches age 8',
      'Limit sticky fruit snacks and gummy candies',
    ],
    faqs: [
      {
        question: 'When should my child first visit the dentist?',
        answer:
          'The American Academy of Pediatric Dentistry recommends scheduling a first checkup as soon as the first tooth appears, or by your child’s first birthday.',
      },
    ],
  },
  {
    id: 't-13',
    slug: 'gum-disease-treatment',
    title: 'Periodontal Care & Gum Disease Therapy',
    shortDescription:
      'Specialized antimicrobial therapy, laser pocket debridement, and regenerative grafting to arrest periodontitis and stabilize loose teeth.',
    category: 'restorative',
    durationMinutes: 60,
    priceRange: '$280 - $900 per quadrant',
    insuranceCovered: 'Covered between 50% - 80% under periodontal insurance benefits',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    iconName: 'ShieldAlert',
    overview:
      'Periodontal disease is a chronic bacterial infection affecting the bone and ligaments anchoring your teeth. Left untreated, it leads to tooth mobility and increases systemic cardiovascular risks. We utilize soft-tissue dental lasers and localized antibiotics to eliminate deep infection.',
    reasons: [
      'Bleeding, tender, or receding gum margins',
      'Teeth feeling loose or shifting position',
      'Persistent halitosis unaffected by mouthwash',
      'Deep gum pockets measured above 4 millimeters',
    ],
    process: [
      {
        step: 1,
        title: 'Full-Mouth Periodontal Mapping',
        description: 'Detailed microscopic measurement of all sulcus depths and bone levels.',
      },
      {
        step: 2,
        title: 'Laser Decontamination (LANAP Protocol)',
        description: 'Targeted laser light selectively evaporates diseased epithelium without scalpel cuts.',
      },
      {
        step: 3,
        title: 'Locally Delivered Antimicrobials',
        description: 'Controlled-release minocycline microspheres placed in deep pockets.',
      },
    ],
    benefits: [
      'Halts progressive alveolar jawbone loss',
      'Reduces systemic inflammatory load linked to diabetes and heart health',
      'Tightens gums around teeth and reduces tooth looseness',
    ],
    limitations: [
      'Requires disciplined ongoing 3-month periodontal maintenance visits.',
    ],
    aftercare: [
      'Use an electric sonic toothbrush with ultra-soft bristles',
      'Incorporate water flossing with warm saline or antiseptic rinse daily',
    ],
    faqs: [
      {
        question: 'Can gum disease be cured completely?',
        answer:
          'Gingivitis can be completely reversed. Once bone loss occurs (periodontitis), it cannot regrow naturally, but our therapies arrest the disease and stabilize your teeth for decades.',
      },
    ],
  },
  {
    id: 't-14',
    slug: 'dentures',
    title: 'Modern Custom Dentures & Implant Overdentures',
    shortDescription:
      'Naturally contoured full and partial prosthetics engineered for stable retention, comfortable chewing, and facial support.',
    category: 'restorative',
    durationMinutes: 60,
    priceRange: '$1,400 - $4,200',
    insuranceCovered: 'Typically covered at 50% under major prosthetic benefits',
    image:
      'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1000&q=80',
    iconName: 'Layers',
    overview:
      'Say goodbye to slipping, painful dentures. Our clinical prosthodontic protocols blend digitally scanned tissue models with high-impact acrylics and optional mini-implant locator attachments (snap-in dentures) that lock dentures securely in place.',
    reasons: [
      'Loss of multiple or all teeth in upper or lower dental arch',
      'Old dentures that rock, slip, or cause persistent sores',
      'Collapsed lower facial height and sunken lip profile',
      'Desire for a budget-friendly full arch solution',
    ],
    process: [
      {
        step: 1,
        title: 'Border Molding & Dynamic Impression',
        description: 'Capturing dynamic muscle movements for superior peripheral suction seal.',
      },
      {
        step: 2,
        title: 'Wax Try-in & Phonetic Verification',
        description: 'Testing speech sounds (S, F, V) and verifying shade and smile line before finishing.',
      },
      {
        step: 3,
        title: 'Delivery & Precision Occlusal Balancing',
        description: 'Refining contact points so chewing forces distribute evenly without sore spots.',
      },
    ],
    benefits: [
      'Restores youthful facial fullness and cheek volume',
      'Customized teeth shade and gum stippling for organic realism',
      'Implant-supported options eliminate messy adhesives entirely',
    ],
    limitations: [
      'Traditional lower dentures require tongue coordination without implants',
      'Periodic relining is needed as jawbone naturally remodels over years',
    ],
    aftercare: [
      'Remove dentures at night and soak in mild prosthetic cleansing solution',
      'Brush prosthetic teeth with non-abrasive denture paste',
    ],
    faqs: [
      {
        question: 'Can my dentures snap onto implants so they never slip?',
        answer:
          'Yes! With just two to four locator implants, your denture snaps firmly into place, allowing you to eat apples and steak with complete confidence.',
      },
    ],
  },
  {
    id: 't-15',
    slug: 'emergency-dental-care',
    title: 'Same-Day Emergency Dental Care',
    shortDescription:
      'Immediate triage and treatment for acute dental emergencies: severe pain, knocked-out teeth, broken crowns, and facial swelling.',
    category: 'emergency',
    durationMinutes: 45,
    priceRange: '$180 - $450 (eval + urgent relief)',
    insuranceCovered: 'Emergency evaluations and palliative care are widely covered',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
    iconName: 'AlertCircle',
    overview:
      'Dental emergencies cannot wait. We reserve dedicated urgent care slots every morning and afternoon. Whether you have sustained sporting facial trauma, suffered a chipped front tooth, or woke with an unbearable abscess, our on-call dentists are ready.',
    reasons: [
      'Severe, unremitting toothache keeping you awake at night',
      'Knocked-out (avulsed) or loosened permanent tooth',
      'Rapidly spreading facial or submandibular swelling',
      'Uncontrolled bleeding after oral trauma or lost restoration',
    ],
    process: [
      {
        step: 1,
        title: 'Rapid Triage & Digital Radiograph',
        description: 'Immediate diagnostic x-ray to pinpoint infection source or fractures.',
      },
      {
        step: 2,
        title: 'Immediate Pain Elimination',
        description: 'Gentle localized anesthesia and palliative therapeutic treatment.',
      },
      {
        step: 3,
        title: 'Stabilization & Comprehensive Plan',
        description: 'Temporary or definitive repair with clear follow-up care instructions.',
      },
    ],
    benefits: [
      'Prompt attention reduces permanent tooth loss risk',
      'Avoids costly and frustrating visits to the hospital emergency room',
      'Same-day pain relief restores your peace of mind immediately',
    ],
    limitations: [
      'Life-threatening emergencies with airway compromise or profuse trauma must call 911 first.',
    ],
    aftercare: [
      'Adhere strictly to prescribed antibiotics or anti-inflammatories if dispensed',
      'Follow up for scheduled permanent restoration within recommended timeframe',
    ],
    faqs: [
      {
        question: 'What should I do if a permanent tooth is completely knocked out?',
        answer:
          'Handle it ONLY by the white crown (do not touch the root). Gently rinse with milk or saline if dirty. Try re-inserting into the socket immediately, or place in a cup of cold whole milk and come to our clinic within 60 minutes for highest re-implantation success.',
      },
    ],
  },
];

export const initialDentists: Dentist[] = [
  {
    id: 'd-1',
    name: 'Dr. Julian Vance',
    title: 'Clinical Director & Master Prosthodontist',
    qualifications: 'DDS, MS (Prosthodontics), FACP',
    specialty: 'Restorative & Implant Rehabilitation',
    registrationNumber: 'CA-DDS #482910',
    experienceYears: 18,
    image:
      'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=800&q=80',
    bio:
      'Dr. Julian Vance earned his DDS with highest honors from UCSF School of Dentistry before completing a three-year surgical Prosthodontics residency. With over 18 years of clinical leadership, Dr. Vance lectures internationally on guided bone regeneration and digital smile engineering.',
    focusAreas: [
      'Full Arch Implant Reconstruction (All-on-X)',
      'Digital Smile Design & Feldspathic Veneers',
      'Complex Occlusal Rehabilitation & TMJ',
    ],
    languages: ['English', 'Spanish'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Thursday'],
  },
  {
    id: 'd-2',
    name: 'Dr. Elena Rostova',
    title: 'Lead Orthodontist & Dentofacial Orthopedist',
    qualifications: 'DMD, MS (Orthodontics), Diplomate ABO',
    specialty: 'Clear Aligners & Orthodontics',
    registrationNumber: 'CA-DDS #510492',
    experienceYears: 14,
    image:
      'https://images.unsplash.com/photo-1594824813583-8a39bd5d0d61?auto=format&fit=crop&w=800&q=80',
    bio:
      'Board-Certified by the American Board of Orthodontics, Dr. Elena Rostova completed her orthodontic residency at Harvard School of Dental Medicine. She has treated over 3,200 clear aligner cases with a gentle focus on airway enhancement and facial balance.',
    focusAreas: [
      'Invisalign Diamond Top 1% Provider',
      'Early Interceptive Orthodontics for Children',
      'Surgical Orthodontics & Accelerated Tooth Movement',
    ],
    languages: ['English', 'Russian', 'French'],
    availableDays: ['Tuesday', 'Wednesday', 'Friday', 'Saturday'],
  },
  {
    id: 'd-3',
    name: 'Dr. Marcus Lin',
    title: 'Endodontist & Microscopic Dental Surgeon',
    qualifications: 'DDS, Certificate in Endodontics, FACD',
    specialty: 'Micro-Endodontics & Pain Management',
    registrationNumber: 'CA-DDS #538194',
    experienceYears: 12,
    image:
      'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=800&q=80',
    bio:
      'Dr. Marcus Lin specializes exclusively in saving compromised teeth. Trained at UCLA, he utilizes 3D Zeiss dental surgical operating microscopes to resolve complex calcified canals and retreat failed previous root canals with gentle bedside manner.',
    focusAreas: [
      'Painless Microscope Root Canal Therapy',
      'Endodontic Micro-Surgery (Apicoectomy)',
      'Traumatic Dental Injury Triage & Splinting',
    ],
    languages: ['English', 'Mandarin'],
    availableDays: ['Monday', 'Thursday', 'Friday', 'Saturday'],
  },
  {
    id: 'd-4',
    name: 'Dr. Sophia Bennett',
    title: 'Pediatric & Preventive Dentistry Specialist',
    qualifications: 'DMD, Certificate in Pediatric Dentistry',
    specialty: 'Pediatric Care & Anxious Patient Sedation',
    registrationNumber: 'CA-DDS #562301',
    experienceYears: 9,
    image:
      'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=800&q=80',
    bio:
      'Known affectionately as "Dr. Sophia" by our youngest patients, Dr. Bennett dedicated her post-doctoral training at Boston Children’s Hospital to gentle pediatric dentistry and special healthcare needs care. She specializes in trauma-informed anxiety reduction.',
    focusAreas: [
      'Minimally Invasive Pediatric Dentistry',
      'Nitrous Oxide & Conscious Sedation',
      'Infant Lip & Tongue Tie Evaluations',
    ],
    languages: ['English', 'Tagalog'],
    availableDays: ['Monday', 'Tuesday', 'Wednesday', 'Friday'],
  },
];

export const initialTestimonials: Testimonial[] = [
  {
    id: 'test-1',
    patientName: 'Claire Abernathy',
    treatmentSlug: 'cosmetic-dentistry',
    treatmentName: 'Porcelain Veneers & Smile Design',
    rating: 5,
    comment:
      'I spent five years hiding my smile in photos due to tetracycline staining. Dr. Vance created a bespoke digital mockup that looked so natural I cried with relief. The process was seamless, completely pain-free, and my confidence has never been higher.',
    date: '2026-08-14',
    verifiedPatient: true,
  },
  {
    id: 'test-2',
    patientName: 'David K. Hoffman',
    treatmentSlug: 'dental-implants',
    treatmentName: 'Single Tooth Dental Implant',
    rating: 5,
    comment:
      'I was terrified of implant surgery after losing a molar in an accident. Dr. Lin and Dr. Vance explained the 3D guided plan in detail. The procedure was so gentle I barely needed ibuprofen the next day. Today I can eat anything without thinking twice.',
    date: '2026-09-02',
    verifiedPatient: true,
  },
  {
    id: 'test-3',
    patientName: 'Samantha & Leo M.',
    treatmentSlug: 'pediatric-dentistry',
    treatmentName: 'Pediatric Preventive Care',
    rating: 5,
    comment:
      'My 5-year-old was previously terrified of dentists. Dr. Sophia and the staff turned the entire visit into a magical game. Leo walked out wearing a badge and asked when he could go back! Absolutely stellar pediatric team.',
    date: '2026-09-21',
    verifiedPatient: true,
  },
  {
    id: 'test-4',
    patientName: 'Marcus T. Reed',
    treatmentSlug: 'clear-aligners',
    treatmentName: 'Invisalign Clear Aligners',
    rating: 5,
    comment:
      'As a lawyer in court every week, traditional braces were out of the question. Dr. Rostova designed a 10-month aligner plan with remote scan check-ins. No one at the firm even noticed I was wearing them. Remarkable precision.',
    date: '2026-09-28',
    verifiedPatient: true,
  },
  {
    id: 'test-5',
    patientName: 'Helena Berg',
    treatmentSlug: 'emergency-dental-care',
    treatmentName: 'Same-Day Emergency Root Canal',
    rating: 5,
    comment:
      'Woke up on a Saturday morning with unbearable throbbing pain. AuraDental answered within minutes, got me into an emergency operatory by 11 AM, and Dr. Lin relieved the infection under the microscope. Life savers.',
    date: '2026-10-04',
    verifiedPatient: true,
  },
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'Hospital-Grade Sterilization Center',
    category: 'sterilization',
    image:
      'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&w=1200&q=80',
    description:
      'Enclosed Class B vacuum autoclaves with biologic spore indicator testing and sterile cassette tracking.',
  },
  {
    id: 'g-2',
    title: 'Aura Suite Treatment Operatory',
    category: 'operatory',
    image:
      'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1200&q=80',
    description:
      'Ergonomic Italian leather dental chair with ceiling entertainment display and panoramic natural sunlight.',
  },
  {
    id: 'g-3',
    title: 'Concierge Reception & Patient Lounge',
    category: 'reception',
    image:
      'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=1200&q=80',
    description:
      'Tranquil hospitality lounge featuring organic herbal teas, HEPA air filtration, and acoustic soundproofing.',
  },
  {
    id: 'g-4',
    title: '3D CBCT & Panoramic Imaging Suite',
    category: 'equipment',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1200&q=80',
    description:
      'Green CBCT low-radiation 3D imaging producing sub-millimeter volumetric diagnostics in under 15 seconds.',
  },
  {
    id: 'g-5',
    title: 'Clinical Team Consultation Center',
    category: 'team',
    image:
      'https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=1200&q=80',
    description:
      'Collaborative inter-disciplinary treatment planning room where surgeons, prosthodontists, and orthodontists co-evaluate cases.',
  },
  {
    id: 'g-6',
    title: 'Intraoral Digital 3D Scanning Operatory',
    category: 'equipment',
    image:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1200&q=80',
    description:
      'Optical scanning eliminating sticky silicone impression trays with real-time micron margin accuracy.',
  },
];

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'b-1',
    slug: 'preventing-enamel-erosion-modern-habits',
    title: 'Hidden Causes of Enamel Erosion: Beyond Just Sugar and Soda',
    excerpt:
      'Discover why sparkling water, morning citrus wellness shots, and nighttime silent acid reflux might be wearing away your protective enamel layer.',
    category: 'Preventive',
    readTime: '5 min read',
    publishedDate: '2026-09-15',
    author: 'Dr. Julian Vance',
    authorRole: 'Clinical Director & Prosthodontist',
    image:
      'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Enamel is the most mineralized tissue in the human body, but once dissolved by acidic chemical attacks, it cannot regenerate biologically. While most patients know sugary sodas are harmful, modern health trends pose surprising risks.',
      'Sipping on lemon water or unflavored seltzer throughout the day keeps mouth pH below the critical 5.5 demineralization threshold. When saliva is not given time to neutralize acidity, enamel loses calcium ions.',
      'Key Prevention Protocols: (1) Drink acidic beverages in one sitting rather than sipping over hours; (2) Rinse immediately with plain tap water, never brush immediately after acid exposure; (3) Wait 30 minutes before brushing to allow saliva to re-harden enamel surfaces.',
      'If you notice translucency along the edges of your front teeth or increased cold sensitivity, schedule a preventive consultation for customized remineralizing therapies.',
    ],
  },
  {
    id: 'b-2',
    slug: 'clear-aligners-vs-traditional-braces-guide',
    title: 'Clear Aligners vs. Modern Braces: Making the Right Choice in 2026',
    excerpt:
      'An objective, clinical comparison of comfort, biomechanics, treatment timeline, and lifestyle impact for teens and adults.',
    category: 'Treatment Guides',
    readTime: '7 min read',
    publishedDate: '2026-09-24',
    author: 'Dr. Elena Rostova',
    authorRole: 'Board-Certified Orthodontist',
    image:
      'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Choosing between clear aligners and modern fixed brackets is no longer just about aesthetics. Both modalities have evolved dramatically with computerized biomechanical algorithms.',
      'Clear aligners offer unparalleled discretion, freedom from dietary restrictions, and simpler home hygiene. However, they rely 100% on patient discipline—wearing them 22 hours per day.',
      'Modern self-ligating braces remain the gold standard for severe skeletal rotations, deeply impacted teeth, and complex vertical jaw corrections where 24/7 continuous anchorage is critical.',
      'During your orthodontic evaluation, our team evaluates root angulations and bone levels to recommend the modality that guarantees the safest, most stable biological outcome.',
    ],
  },
  {
    id: 'b-3',
    slug: 'post-operative-care-dental-implants',
    title: 'The Essential Post-Operative Guide to Rapid Dental Implant Healing',
    excerpt:
      'What to eat, how to sleep, and key precautions in the first 7 days following surgical implant placement to ensure permanent osseointegration.',
    category: 'Post-Care',
    readTime: '6 min read',
    publishedDate: '2026-10-02',
    author: 'Dr. Marcus Lin',
    authorRole: 'Microscopic Dental Surgeon',
    image:
      'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1000&q=80',
    content: [
      'The initial 72 hours after implant surgery set the foundation for osseointegration—the biological fusion between titanium or zirconia and living bone cells.',
      'Immediately following placement, protect the blood clot. Do not spit forcefully, drink through a straw, or probe the surgical site with your tongue or fingers. Elevate your head with two pillows while sleeping to reduce interstitial fluid pressure.',
      'Dietary Strategy: Stick to cool or lukewarm nutrient-dense soft foods such as Greek yogurt, pureed soups, scrambled eggs, and avocado smoothies. Avoid seeds, popcorn kernels, and hard crusts.',
      'If you experience sudden swelling, uncontrolled bleeding, or temperature above 101°F, contact our dedicated direct patient on-call hotline immediately.',
    ],
  },
  {
    id: 'b-4',
    slug: 'parents-guide-to-children-first-dental-visit',
    title: "A Parent's Guide to Fear-Free First Dental Visits",
    excerpt:
      'How to speak to your child about the dentist, prevent dental phobia, and establish wholesome oral habits from age one.',
    category: 'Pediatric',
    readTime: '4 min read',
    publishedDate: '2026-10-05',
    author: 'Dr. Sophia Bennett',
    authorRole: 'Pediatric Dentistry Specialist',
    image:
      'https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&w=1000&q=80',
    content: [
      'Dental fear is learned, not innate. How parents speak about the dentist before the appointment determines 80% of how a child responds in the dental chair.',
      'Avoid trigger words like "hurt", "shot", "needle", or saying "it won’t hurt a bit"—the subconscious mind focuses on the danger word. Instead, use positive framing: "The dentist is going to count your teeth and help them sparkle!"',
      'At AuraDental, we introduce children gently through our Tell-Show-Do protocol, letting them touch the soft polishing cup and see how the water mister works before anything enters the mouth.',
      'Regular positive visits starting at age one ensure children grow up seeing oral healthcare as a routine, empowering part of feeling their best.',
    ],
  },
];

export const initialFAQs: FAQ[] = [
  {
    id: 'faq-1',
    category: 'Booking',
    question: 'How can I book an appointment?',
    answer:
      'You can request an appointment 24/7 directly through our website booking form, click our WhatsApp coordinator button, or call our front desk at +1 (415) 890-3342. All online requests are prioritized and confirmed within one business hour.',
  },
  {
    id: 'faq-2',
    category: 'General',
    question: 'What are the clinic’s opening hours?',
    answer:
      'We are open Monday through Friday from 8:00 AM to 7:00 PM, and Saturday from 8:30 AM to 4:00 PM. Sundays are staffed by our on-call dental surgeon for urgent triage between 10:00 AM and 2:00 PM.',
  },
  {
    id: 'faq-3',
    category: 'Treatments',
    question: 'Which dental treatments are available at AuraDental?',
    answer:
      'We are a comprehensive multi-specialty center providing 15 clinical services: General Dentistry, Ultrasonic Scaling, Comprehensive Exams, Smile Design Veneers, Laser Whitening, Braces, Clear Aligners (Invisalign), Dental Implants, Microscope Root Canals, Ceramic Crowns/Bridges, Atraumatic Extractions, Pediatric Care, Periodontal Laser Therapy, Custom Dentures, and Emergency Care.',
  },
  {
    id: 'faq-4',
    category: 'Booking',
    question: 'Do you accept walk-in patients?',
    answer:
      'Yes, we welcome walk-ins for emergency dental trauma and acute pain, though appointments are encouraged so our team can prepare dedicated operatory time for you without waiting.',
  },
  {
    id: 'faq-5',
    category: 'Booking',
    question: 'How can I reschedule or cancel an appointment?',
    answer:
      'We respectfully request at least 24 hours advance notice to reschedule or cancel so another patient in discomfort can utilize the time. You can reschedule by phone, email, or through your booking reference code.',
  },
  {
    id: 'faq-6',
    category: 'Insurance',
    question: 'What payment methods and dental insurances do you accept?',
    answer:
      'We accept all major credit cards, Apple Pay, HSA/FSA debit cards, and low-interest monthly financing through CareCredit and Sunbit. We are in-network with premier PPO providers (Delta Dental Premier, MetLife, Cigna, Aetna, Guardian) and file out-of-network claims on your behalf.',
  },
  {
    id: 'faq-7',
    category: 'Pediatric',
    question: 'Do you treat infants, children, and teenagers?',
    answer:
      'Absolutely. Our pediatric specialist, Dr. Sophia Bennett, provides gentle, specialized care from infant first teeth to adolescent orthodontic monitoring in an anxiety-free environment.',
  },
  {
    id: 'faq-8',
    category: 'General',
    question: 'How do I find the clinic and where do I park?',
    answer:
      'We are located at 450 Sutter Health Plaza, Suite 820, San Francisco, CA. The historic 450 Sutter Garage offers valet and self-parking on-site with validation available for our patients.',
  },
  {
    id: 'faq-9',
    category: 'General',
    question: 'What should I bring to my first visit?',
    answer:
      'Please bring a valid photo ID, dental insurance card (if applicable), a current list of prescription medications, and any dental x-rays taken within the past 12 months (or we can take fresh digital scans on-site).',
  },
  {
    id: 'faq-10',
    category: 'Emergency',
    question: 'How can I contact the clinic for urgent dental concerns after hours?',
    answer:
      'For acute dental trauma, severe bleeding, or swelling, call our dedicated 24/7 emergency line at +1 (415) 890-3399 to reach our on-call dental surgeon. If experiencing airway compromise, call 911 immediately.',
  },
];

export const initialAppointments: Appointment[] = [
  {
    id: 'apt-101',
    referenceCode: 'APT-2026-8941',
    patientName: 'Victoria Hastings',
    phone: '+1 (415) 555-0182',
    email: 'victoria.hastings@example.com',
    treatmentId: 't-4',
    treatmentTitle: 'Cosmetic Dentistry & Smile Design',
    dentistId: 'd-1',
    dentistName: 'Dr. Julian Vance',
    preferredDate: '2026-10-15',
    preferredTimeSlot: 'morning',
    patientType: 'new',
    notes: 'Interested in porcelain veneers for upper front teeth to close slight gap before wedding in December.',
    status: 'pending',
    createdAt: '2026-10-08T14:32:00Z',
    updatedAt: '2026-10-08T14:32:00Z',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-08T14:32:00Z',
        changedBy: 'Patient Web Request',
        comment: 'Appointment requested via website portal.',
      },
    ],
  },
  {
    id: 'apt-102',
    referenceCode: 'APT-2026-8942',
    patientName: 'Gregory Chen',
    phone: '+1 (415) 555-0199',
    email: 'gchen.tech@example.com',
    treatmentId: 't-8',
    treatmentTitle: 'Dental Implants & Bone Grafting',
    dentistId: 'd-1',
    dentistName: 'Dr. Julian Vance',
    preferredDate: '2026-10-14',
    preferredTimeSlot: 'afternoon',
    patientType: 'returning',
    notes: 'Follow-up for lower right molar implant fixture evaluation.',
    status: 'confirmed',
    internalNotes: 'Bone density scan confirmed healthy healing; ready for impression stage.',
    createdAt: '2026-10-07T09:15:00Z',
    updatedAt: '2026-10-07T11:20:00Z',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-07T09:15:00Z',
        changedBy: 'Patient Web Request',
      },
      {
        status: 'confirmed',
        timestamp: '2026-10-07T11:20:00Z',
        changedBy: 'Receptionist (Sarah Jenkins)',
        comment: 'Confirmed via phone call with patient.',
      },
    ],
  },
  {
    id: 'apt-103',
    referenceCode: 'APT-2026-8943',
    patientName: 'Maya Rodriguez',
    phone: '+1 (415) 555-0211',
    email: 'maya.rodriguez@example.com',
    treatmentId: 't-7',
    treatmentTitle: 'Clear Aligners (Invisalign & Spark)',
    dentistId: 'd-2',
    dentistName: 'Dr. Elena Rostova',
    preferredDate: '2026-10-16',
    preferredTimeSlot: 'evening',
    patientType: 'new',
    notes: 'Consultation for clear aligners; mild crowding on lower anterior teeth.',
    status: 'pending',
    createdAt: '2026-10-09T18:40:00Z',
    updatedAt: '2026-10-09T18:40:00Z',
    statusHistory: [
      {
        status: 'pending',
        timestamp: '2026-10-09T18:40:00Z',
        changedBy: 'Patient Web Request',
      },
    ],
  },
];

export const initialInquiries: ContactInquiry[] = [
  {
    id: 'inq-1',
    name: 'Robert Sterling',
    phone: '+1 (415) 555-8821',
    email: 'robert.sterling@example.com',
    subject: 'Insurance coverage verification for full arch restoration',
    message: 'Hello, does AuraDental accept MetLife Dental PPO for implant overdentures? Looking forward to details on pre-authorization.',
    status: 'new',
    createdAt: '2026-10-09T16:10:00Z',
  },
  {
    id: 'inq-2',
    name: 'Emily Watson',
    phone: '+1 (415) 555-3349',
    email: 'emily.w@example.com',
    subject: 'Sedation options for anxious patients',
    message: 'I have severe dental phobia and need two fillings replaced. Do you offer conscious oral sedation or nitrous oxide for general visits?',
    status: 'in_progress',
    createdAt: '2026-10-08T11:05:00Z',
  },
];

export const initialAuditLogs: AuditLog[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-08T14:32:00Z',
    userName: 'Web System',
    userRole: 'System',
    action: 'CREATE_APPOINTMENT',
    target: 'APT-2026-8941',
    details: 'New appointment request submitted for Victoria Hastings (Cosmetic Dentistry).',
  },
  {
    id: 'log-2',
    timestamp: '2026-10-07T11:20:00Z',
    userName: 'Sarah Jenkins',
    userRole: 'Receptionist',
    action: 'UPDATE_STATUS',
    target: 'APT-2026-8942',
    details: 'Changed status from Pending to Confirmed following patient phone verification.',
  },
  {
    id: 'log-3',
    timestamp: '2026-10-06T09:00:00Z',
    userName: 'Dr. Julian Vance',
    userRole: 'Super Admin',
    action: 'UPDATE_SETTINGS',
    target: 'Clinic Settings',
    details: 'Updated weekend emergency on-call schedule and notification preferences.',
  },
];
