import React from 'react';
import { X, ShieldCheck, FileText, CheckCircle, Lock, AlertTriangle, Eye } from 'lucide-react';

interface LegalModalProps {
  type: string | null;
  onClose: () => void;
  onSwitchType: (type: string) => void;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  type,
  onClose,
  onSwitchType,
}) => {
  if (!type) return null;

  const legalTabs = [
    { id: 'terms', label: 'Terms & Conditions' },
    { id: 'privacy', label: 'Privacy Policy' },
    { id: 'cookies', label: 'Cookie Policy' },
    { id: 'disclaimer', label: 'Medical Disclaimer' },
    { id: 'accessibility', label: 'Accessibility Statement' },
    { id: 'refund', label: 'Cancellation & Refund' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-5 h-5 text-teal-400" />
            <h2 className="text-xl font-bold font-display">AuraDental Legal & Compliance</h2>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab switcher */}
        <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center gap-2 overflow-x-auto shrink-0">
          {legalTabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => onSwitchType(tab.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                type === tab.id
                  ? 'bg-teal-600 text-white shadow-xs'
                  : 'text-slate-600 hover:bg-slate-200/70 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Legal Text Body */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-slate-700 text-sm leading-relaxed">
          {type === 'terms' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Terms & Conditions of Service</h3>
              <p className="text-xs text-slate-500 font-medium">Last Updated: October 2026</p>
              
              <h4 className="font-bold text-slate-800">1. Acceptance of Terms</h4>
              <p>
                By accessing, browsing, or utilizing the web portals and services operated by AuraDental
                Clinic & Implant Center ("AuraDental", "we", "us", or "our"), you acknowledge that you
                have read, understood, and agreed to be legally bound by these Terms & Conditions.
              </p>

              <h4 className="font-bold text-slate-800">2. Appointment Request & Cancellation Rules</h4>
              <p>
                Submitting an appointment request through our website initiates an inquiry and provisional
                scheduling request. An appointment is only deemed binding once our clinical reception
                staff has contacted you and confirmed the allocated operatory time.
              </p>
              <p>
                We kindly request a minimum of <strong>24 business hours</strong> advance notice for all
                cancellations or rescheduling. Late cancellations prevent other patients with acute dental
                emergencies from obtaining necessary clinical care.
              </p>

              <h4 className="font-bold text-slate-800">3. Intellectual Property Rights</h4>
              <p>
                All original clinic photography, clinical diagrams, proprietary smile design methodologies,
                brand trademarks, and written health content displayed on this website are the protected
                intellectual property of AuraDental and may not be reproduced without written consent.
              </p>

              <h4 className="font-bold text-slate-800">4. Limitation of Liability</h4>
              <p>
                While AuraDental strives to ensure all clinical descriptions and pricing ranges are accurate,
                final restorative fees and clinical plans are determined exclusively during personalized
                in-person diagnostic evaluations with diagnostic dental radiographs.
              </p>
            </div>
          )}

          {type === 'privacy' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Privacy & Health Data Protection Policy</h3>
              <p className="text-xs text-slate-500 font-medium">HIPAA Compliant Data Standards · Last Updated: October 2026</p>

              <h4 className="font-bold text-slate-800">1. Information We Collect</h4>
              <p>
                To coordinate your care, we collect personal contact details (legal name, phone number,
                email address) and appointment preferences (desired treatment, symptoms notes, preferred
                doctor). We collect only data strictly necessary to fulfill your appointment inquiry.
              </p>

              <h4 className="font-bold text-slate-800">2. How Your Information Is Handled</h4>
              <p>
                Your personal details are stored in encrypted clinical administrative databases accessible
                strictly to authorized clinical staff under least-privilege security controls. We never sell,
                rent, or license patient contact information to third-party marketing brokers.
              </p>

              <h4 className="font-bold text-slate-800">3. Data Retention & Patient Rights</h4>
              <p>
                In compliance with California medical board guidelines and federal healthcare standards,
                clinical records are retained securely. Patients retain the legal right to request access,
                copies, or corrections to their personal contact details by contacting{' '}
                <strong className="text-slate-900">privacy@auradentalclinic.com</strong>.
              </p>

              <h4 className="font-bold text-slate-800">4. Third-Party Service Providers</h4>
              <p>
                We utilize encrypted communication channels for SMS appointment confirmations and transactional
                emails. These partners are bound by strict business associate agreements (BAAs) prohibiting
                unauthorized data utilization.
              </p>
            </div>
          )}

          {type === 'cookies' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Cookie & Tracking Policy</h3>
              <p className="text-xs text-slate-500 font-medium">Last Updated: October 2026</p>

              <p>
                AuraDental utilizes cookies and local storage tokens to deliver a smooth, secure, and
                personalized browsing experience. We prioritize patient privacy and adhere to zero
                unauthorized tracking principles.
              </p>

              <h4 className="font-bold text-slate-800">1. Essential Cookies (Strictly Necessary)</h4>
              <p>
                These cookies enable core website functionality such as security session validation,
                form anti-spam tokens, and remembering your cookie consent choices. The site cannot function
                properly without these.
              </p>

              <h4 className="font-bold text-slate-800">2. Analytics & Preference Cookies</h4>
              <p>
                These anonymous cookies allow us to aggregate metrics regarding which treatment pages are most
                frequently consulted so we can improve patient educational resources. No personally identifiable
                medical information is attached to analytics tokens.
              </p>

              <h4 className="font-bold text-slate-800">3. Managing Your Preferences</h4>
              <p>
                You can adjust your cookie settings at any time using our on-site privacy controls or
                through your browser preferences.
              </p>
            </div>
          )}

          {type === 'disclaimer' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Medical & Dental Disclaimer</h3>
              <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm">
                <AlertTriangle className="w-5 h-5 text-amber-600 mb-2" />
                <p className="font-semibold">Important Clinical Warning:</p>
                <p>
                  The educational text, treatment overviews, pricing ranges, and AI assistant answers provided
                  on this website are designed for general informational and navigational purposes only.
                  None of the information on this website constitutes personal dental diagnosis, medical advice,
                  or treatment recommendations.
                </p>
              </div>

              <h4 className="font-bold text-slate-800">No Doctor-Patient Relationship</h4>
              <p>
                Viewing this website, communicating with our digital assistant, or submitting an online
                appointment inquiry does not establish an official doctor-patient relationship. A formal
                relationship is created solely upon an in-person clinical examination, review of medical history,
                and mutual consent to an individualized treatment plan.
              </p>

              <h4 className="font-bold text-slate-800">Emergency Protocol</h4>
              <p>
                If you are experiencing acute facial trauma, severe uncontrolled bleeding, swelling causing
                respiratory difficulty, or high systemic fever, do not wait for an email response. Call 911 or
                visit your nearest emergency room immediately.
              </p>
            </div>
          )}

          {type === 'accessibility' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Accessibility Statement</h3>
              <p className="text-xs text-slate-500 font-medium">Commitment to WCAG 2.2 AA Standards</p>

              <p>
                AuraDental is dedicated to ensuring that digital healthcare access is barrier-free for all
                patients, including individuals with visual, auditory, cognitive, and motor impairments.
              </p>

              <h4 className="font-bold text-slate-800">Accessibility Measures Implemented</h4>
              <ul className="list-disc list-inside space-y-1 pl-1">
                <li>High contrast color pairings adhering to WCAG 2.2 AA ratios (4.5:1 text contrast).</li>
                <li>Full keyboard navigation capability with visible focus outlines on all interactive buttons and inputs.</li>
                <li>Descriptive alternative text (alt text) on clinical imagery and doctor portraits.</li>
                <li>Scalable typography accommodating up to 200% browser zoom without layout breakage.</li>
                <li>Accessible ARIA landmarks and modal focus trapping.</li>
              </ul>

              <h4 className="font-bold text-slate-800">Feedback & Support</h4>
              <p>
                If you encounter any accessibility barrier on our website, please notify our coordinator at{' '}
                <strong className="text-slate-900">accessibility@auradentalclinic.com</strong> or call us at{' '}
                <strong className="text-slate-900">+1 (415) 890-3342</strong>. We prioritize prompt remediation.
              </p>
            </div>
          )}

          {type === 'refund' && (
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-slate-900">Cancellation, Rescheduling & Refund Policy</h3>
              <p className="text-xs text-slate-500 font-medium">Last Updated: October 2026</p>

              <h4 className="font-bold text-slate-800">1. Appointment Cancellation Window</h4>
              <p>
                We ask all patients to notify us at least <strong>24 business hours</strong> in advance if they
                need to reschedule or cancel a hygiene or consultation visit. For major surgical procedures
                (e.g., implant placement, full-arch reconstruction), we request <strong>48 hours</strong> notice.
              </p>

              <h4 className="font-bold text-slate-800">2. Deposits for Extended Surgical Procedures</h4>
              <p>
                Procedures requiring multi-hour dedicated operatory blocks or custom laboratory-milled ceramics
                may require a scheduling deposit. Deposits are 100% refundable or transferable when notice is
                provided prior to the cancellation window.
              </p>

              <h4 className="font-bold text-slate-800">3. Treatment Adjustments & Refunds</h4>
              <p>
                Clinical healthcare services delivered by licensed practitioners are not retail merchandise.
                However, if custom restorative appliances (such as ceramic crowns, veneers, or retainers) require
                shade or margin modifications, AuraDental coordinates necessary laboratory revisions at zero
                additional charge under our restorative clinical warranty.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition-colors"
          >
            Close Document
          </button>
        </div>
      </div>
    </div>
  );
};
