import React, { useState, useEffect } from 'react';
import {
  ClinicSettings,
  Treatment,
  Dentist,
  Testimonial,
  GalleryItem,
  BlogPost,
  FAQ,
} from './types/dental';
import {
  fetchClinicSettings,
  fetchTreatments,
  fetchDentists,
  fetchTestimonials,
  fetchGallery,
  fetchBlogPosts,
  fetchFAQs,
} from './services/api';
import {
  initialClinicSettings,
  initialTreatments,
  initialDentists,
  initialTestimonials,
  initialGallery,
  initialBlogPosts,
  initialFAQs,
} from './data/initialData';

// Layout & Sections
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { HeroSection } from './components/home/HeroSection';
import { FeaturedTreatments } from './components/home/FeaturedTreatments';
import { DentistsSection } from './components/home/DentistsSection';
import { WhyChooseUs } from './components/home/WhyChooseUs';
import { FacilitiesSection } from './components/home/FacilitiesSection';
import { TestimonialsSection } from './components/home/TestimonialsSection';
import { BlogSection } from './components/home/BlogSection';
import { FaqSection } from './components/home/FaqSection';
import { ContactSection } from './components/home/ContactSection';
import { FinalCtaSection } from './components/home/FinalCtaSection';

// Modals
import { TreatmentModal } from './components/treatments/TreatmentModal';
import { DentistDetailModal } from './components/doctors/DentistDetailModal';
import { AppointmentModal } from './components/booking/AppointmentModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { LegalModal } from './components/legal/LegalModal';
import { AIChatWidget } from './components/ai/AIChatWidget';
import { CookieConsentBanner } from './components/common/CookieConsentBanner';

export default function App() {
  const [settings, setSettings] = useState<ClinicSettings>(initialClinicSettings);
  const [treatments, setTreatments] = useState<Treatment[]>(initialTreatments);
  const [dentists, setDentists] = useState<Dentist[]>(initialDentists);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials);
  const [gallery, setGallery] = useState<GalleryItem[]>(initialGallery);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs);

  // Active Modals & Dialogs
  const [activeTreatment, setActiveTreatment] = useState<Treatment | null>(null);
  const [activeDentist, setActiveDentist] = useState<Dentist | null>(null);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedBookingTreatmentId, setSelectedBookingTreatmentId] = useState<string | undefined>();
  const [selectedBookingDentistId, setSelectedBookingDentistId] = useState<string | undefined>();
  const [adminOpen, setAdminOpen] = useState(false);
  const [legalModalType, setLegalModalType] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');

  // Load backend data with fallback to initial data
  const loadClinicData = async () => {
    try {
      const [s, t, d, test, gal, b, f] = await Promise.all([
        fetchClinicSettings().catch(() => initialClinicSettings),
        fetchTreatments().catch(() => initialTreatments),
        fetchDentists().catch(() => initialDentists),
        fetchTestimonials().catch(() => initialTestimonials),
        fetchGallery().catch(() => initialGallery),
        fetchBlogPosts().catch(() => initialBlogPosts),
        fetchFAQs().catch(() => initialFAQs),
      ]);
      setSettings(s);
      setTreatments(t);
      setDentists(d);
      setTestimonials(test);
      setGallery(gal);
      setBlogPosts(b);
      setFaqs(f);
    } catch (err) {
      console.warn('API sync warning; running in resilient initial data state:', err);
    }
  };

  useEffect(() => {
    loadClinicData();
  }, []);

  const handleOpenBooking = (treatmentId?: string, dentistId?: string) => {
    setSelectedBookingTreatmentId(treatmentId);
    setSelectedBookingDentistId(dentistId);
    setBookingOpen(true);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    if (sectionId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-teal-500/20 selection:text-teal-900">
      {/* Schema.org Structured Data for Local Dental Clinic */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'DentalClinic',
            name: settings.name,
            description: settings.subheadline,
            image:
              'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1000&q=80',
            telephone: settings.phone,
            address: {
              '@type': 'PostalAddress',
              streetAddress: settings.address,
              addressLocality: settings.city,
              addressRegion: settings.state,
              postalCode: settings.zip,
              addressCountry: 'US',
            },
            openingHoursSpecification: [
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
                opens: '08:00',
                closes: '19:00',
              },
              {
                '@type': 'OpeningHoursSpecification',
                dayOfWeek: 'Saturday',
                opens: '08:30',
                closes: '16:00',
              },
            ],
            priceRange: '$$',
            paymentAccepted: 'Credit Card, Apple Pay, Insurance, CareCredit',
          }),
        }}
      />

      {/* Main Header & Navbar */}
      <Navbar
        settings={settings}
        activeSection={activeSection}
        onNavigate={handleNavigate}
        onOpenBooking={() => handleOpenBooking()}
        onOpenAdmin={() => setAdminOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <HeroSection
          settings={settings}
          onOpenBooking={() => handleOpenBooking()}
          onExploreTreatments={() => handleNavigate('treatments')}
        />

        {/* 2. All 15 Treatments & Services */}
        <FeaturedTreatments
          treatments={treatments}
          onSelectTreatment={(t) => setActiveTreatment(t)}
          onBookTreatment={(treatmentId) => handleOpenBooking(treatmentId)}
        />

        {/* 3. Meet Our Specialists */}
        <DentistsSection
          dentists={dentists}
          onSelectDentist={(d) => setActiveDentist(d)}
          onBookWithDentist={(dentistId) => handleOpenBooking(undefined, dentistId)}
        />

        {/* 4. Why Discerning Patients Choose Us (Philosophy & Sterilization) */}
        <WhyChooseUs />

        {/* 5. Modern Facilities & Equipment Gallery */}
        <FacilitiesSection gallery={gallery} />

        {/* 6. Patient Testimonials & Feedback */}
        <TestimonialsSection
          testimonials={testimonials}
          onRefresh={loadClinicData}
        />

        {/* 7. Blog & Dental Health Education */}
        <BlogSection
          posts={blogPosts}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 8. Frequently Asked Questions Accordion */}
        <FaqSection
          faqs={faqs}
          onOpenBooking={() => handleOpenBooking()}
        />

        {/* 9. Contact Us, Location & Emergency Info */}
        <ContactSection settings={settings} />

        {/* 10. Final Appointment CTA Banner */}
        <FinalCtaSection
          settings={settings}
          onOpenBooking={() => handleOpenBooking()}
        />
      </main>

      {/* Footer */}
      <Footer
        settings={settings}
        treatments={treatments}
        onSelectTreatment={(t) => setActiveTreatment(t)}
        onOpenLegal={(type) => setLegalModalType(type)}
        onOpenBooking={() => handleOpenBooking()}
        onNavigate={handleNavigate}
      />

      {/* Modals & Portals */}
      {/* Treatment Detail In-depth Modal */}
      <TreatmentModal
        treatment={activeTreatment}
        onClose={() => setActiveTreatment(null)}
        onBookTreatment={(id) => handleOpenBooking(id)}
      />

      {/* Dentist Credentials & Profile Modal */}
      <DentistDetailModal
        dentist={activeDentist}
        onClose={() => setActiveDentist(null)}
        onBookWithDentist={(id) => handleOpenBooking(undefined, id)}
      />

      {/* Appointment Booking Request Modal */}
      <AppointmentModal
        isOpen={bookingOpen}
        onClose={() => setBookingOpen(false)}
        treatments={treatments}
        dentists={dentists}
        defaultTreatmentId={selectedBookingTreatmentId}
        defaultDentistId={selectedBookingDentistId}
        onOpenLegal={(type) => setLegalModalType(type)}
      />

      {/* Secure Admin Dashboard */}
      <AdminDashboard
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        clinicSettings={settings}
        treatments={treatments}
        dentists={dentists}
        faqs={faqs}
        onRefreshData={loadClinicData}
      />

      {/* Legal Pages Modal (Terms, Privacy, Cookies, Medical Disclaimer, Accessibility, Cancellation) */}
      <LegalModal
        type={legalModalType}
        onClose={() => setLegalModalType(null)}
        onSwitchType={(type) => setLegalModalType(type)}
      />

      {/* Interactive AI Dental Website Assistant */}
      <AIChatWidget
        onOpenBooking={() => handleOpenBooking()}
        clinicPhone={settings.phone}
        emergencyPhone={settings.emergencyPhone}
      />

      {/* Cookie Consent Banner */}
      <CookieConsentBanner onOpenLegal={(type) => setLegalModalType(type)} />
    </div>
  );
}
