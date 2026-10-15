import React, { useState, useEffect } from 'react';
import {
  X,
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
  ShieldCheck,
  CheckCircle,
  AlertCircle,
  Sparkles,
  Copy,
  Printer,
  ChevronRight,
} from 'lucide-react';
import { Treatment, Dentist, Appointment } from '../../types/dental';
import { bookAppointment } from '../../services/api';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  treatments: Treatment[];
  dentists: Dentist[];
  defaultTreatmentId?: string;
  defaultDentistId?: string;
  onOpenLegal: (type: string) => void;
}

export const AppointmentModal: React.FC<AppointmentModalProps> = ({
  isOpen,
  onClose,
  treatments,
  dentists,
  defaultTreatmentId,
  defaultDentistId,
  onOpenLegal,
}) => {
  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [treatmentId, setTreatmentId] = useState(defaultTreatmentId || '');
  const [dentistId, setDentistId] = useState(defaultDentistId || '');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTimeSlot, setPreferredTimeSlot] = useState<'morning' | 'afternoon' | 'evening'>('morning');
  const [patientType, setPatientType] = useState<'new' | 'returning'>('new');
  const [notes, setNotes] = useState('');
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [honeypot, setHoneypot] = useState(''); // Anti-spam trap

  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [confirmedAppointment, setConfirmedAppointment] = useState<Appointment | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  // Set default minimum date to tomorrow
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  useEffect(() => {
    if (defaultTreatmentId) setTreatmentId(defaultTreatmentId);
    if (defaultDentistId) setDentistId(defaultDentistId);
  }, [defaultTreatmentId, defaultDentistId]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!patientName.trim()) {
      setErrorMessage('Please provide your full legal name.');
      return;
    }
    if (!phone.trim()) {
      setErrorMessage('Please provide a valid phone number for appointment confirmation.');
      return;
    }
    if (!treatmentId) {
      setErrorMessage('Please select your preferred dental treatment.');
      return;
    }
    if (!preferredDate) {
      setErrorMessage('Please choose your preferred appointment date.');
      return;
    }
    if (!privacyAccepted) {
      setErrorMessage('Please consent to our patient privacy policy to submit.');
      return;
    }

    setLoading(true);
    try {
      const response = await bookAppointment({
        patientName,
        phone,
        email,
        treatmentId,
        dentistId: dentistId || undefined,
        preferredDate,
        preferredTimeSlot,
        patientType,
        notes,
        privacyAccepted,
        honeypot,
      });

      setConfirmedAppointment(response.appointment);
    } catch (err: any) {
      setErrorMessage(err.message || 'Unable to submit request. Please try again or call our clinic.');
    } finally {
      setLoading(false);
    }
  };

  const resetAndClose = () => {
    setConfirmedAppointment(null);
    setPatientName('');
    setPhone('');
    setEmail('');
    setNotes('');
    setPrivacyAccepted(false);
    setErrorMessage('');
    onClose();
  };

  const handleCopyRef = () => {
    if (confirmedAppointment?.referenceCode) {
      navigator.clipboard.writeText(confirmedAppointment.referenceCode);
      setCopiedRef(true);
      setTimeout(() => setCopiedRef(false), 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/75 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-6 flex flex-col max-h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shrink-0">
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-teal-400"></span>
              <span className="text-xs font-semibold tracking-wider uppercase text-teal-300">
                Patient Appointment Request
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-bold font-display mt-0.5">
              {confirmedAppointment ? 'Appointment Request Received' : 'Reserve Your Visit with AuraDental'}
            </h2>
          </div>
          <button
            onClick={resetAndClose}
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 text-slate-700">
          {confirmedAppointment ? (
            /* Confirmation Screen */
            <div className="space-y-6 text-center sm:text-left animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center mx-auto sm:mx-0 border border-teal-200">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-2">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
                  Status: Pending Reception Confirmation
                </span>
                <h3 className="text-2xl font-bold text-slate-900">
                  Thank You, {confirmedAppointment.patientName}
                </h3>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Your appointment request has been logged in our clinic management system. To guarantee
                  the highest quality of personalized care, our reception coordinator will contact you via
                  phone or email within <strong>1 business hour</strong> to confirm your exact appointment slot.
                </p>
              </div>

              {/* Reference Card */}
              <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-left space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-200 gap-2">
                  <div>
                    <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                      Booking Reference Code
                    </span>
                    <p className="text-xl font-mono font-bold text-teal-700">
                      {confirmedAppointment.referenceCode}
                    </p>
                  </div>
                  <button
                    onClick={handleCopyRef}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors w-fit"
                  >
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>{copiedRef ? 'Copied!' : 'Copy Code'}</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
                  <div>
                    <span className="text-slate-400">Treatment:</span>
                    <p className="font-semibold text-slate-800">{confirmedAppointment.treatmentTitle}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Preferred Doctor:</span>
                    <p className="font-semibold text-slate-800">
                      {confirmedAppointment.dentistName || 'First Available Specialist'}
                    </p>
                  </div>
                  <div>
                    <span className="text-slate-400">Requested Date:</span>
                    <p className="font-semibold text-slate-800">{confirmedAppointment.preferredDate}</p>
                  </div>
                  <div>
                    <span className="text-slate-400">Preferred Window:</span>
                    <p className="font-semibold text-slate-800 capitalize">
                      {confirmedAppointment.preferredTimeSlot} (
                      {confirmedAppointment.preferredTimeSlot === 'morning'
                        ? '8am - 12pm'
                        : confirmedAppointment.preferredTimeSlot === 'afternoon'
                        ? '1pm - 4pm'
                        : '4pm - 7pm'}
                      )
                    </p>
                  </div>
                </div>
              </div>

              {/* Next Steps Card */}
              <div className="bg-teal-50/60 p-4 rounded-xl border border-teal-100 text-xs text-teal-900 space-y-2 text-left">
                <p className="font-bold flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-teal-600" />
                  What happens next?
                </p>
                <ul className="list-disc list-inside space-y-1 text-teal-800/90 pl-1">
                  <li>Our coordinator will review room availability and call you to lock in the exact time.</li>
                  <li>We will send a welcome SMS with garage parking validation instructions.</li>
                  <li>For same-day emergencies, please call our direct emergency line: <strong>+1 (415) 890-3399</strong>.</li>
                </ul>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 px-4 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-4 h-4 text-slate-500" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={resetAndClose}
                  className="flex-1 py-3 px-4 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-semibold transition-colors shadow-sm"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            /* Booking Form */
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Spam Honeypot (hidden from real users) */}
              <input
                type="text"
                name="honeypot"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                style={{ display: 'none' }}
                tabIndex={-1}
                autoComplete="off"
              />

              {errorMessage && (
                <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs sm:text-sm flex items-start gap-2.5">
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Patient Type Radio */}
              <div className="flex items-center gap-3">
                <span className="text-xs font-semibold text-slate-600">Are you a:</span>
                <div className="flex items-center gap-4 text-xs font-medium">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="patientType"
                      checked={patientType === 'new'}
                      onChange={() => setPatientType('new')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span>New Patient</span>
                  </label>
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="radio"
                      name="patientType"
                      checked={patientType === 'returning'}
                      onChange={() => setPatientType('returning')}
                      className="text-teal-600 focus:ring-teal-500"
                    />
                    <span>Returning Patient</span>
                  </label>
                </div>
              </div>

              {/* Full Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Victoria Hastings"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Phone Number <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (415) 000-0000"
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal">(for digital confirmation)</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="patient@example.com"
                    className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                  />
                </div>
              </div>

              {/* Treatment Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Dental Treatment <span className="text-rose-500">*</span>
                </label>
                <select
                  required
                  value={treatmentId}
                  onChange={(e) => setTreatmentId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                >
                  <option value="">-- Select from 15 Clinical Services --</option>
                  {treatments.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.title} ({t.category}) · {t.priceRange}
                    </option>
                  ))}
                </select>
              </div>

              {/* Dentist Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Preferred Specialist Dentist <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <select
                  value={dentistId}
                  onChange={(e) => setDentistId(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                >
                  <option value="">First Available Specialist</option>
                  {dentists.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.name} — {d.specialty} ({d.qualifications})
                    </option>
                  ))}
                </select>
              </div>

              {/* Date & Time Slot */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Date <span className="text-rose-500">*</span>
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="date"
                      required
                      min={minDate}
                      value={preferredDate}
                      onChange={(e) => setPreferredDate(e.target.value)}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                    Preferred Time Window
                  </label>
                  <div className="relative">
                    <Clock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <select
                      value={preferredTimeSlot}
                      onChange={(e) =>
                        setPreferredTimeSlot(e.target.value as 'morning' | 'afternoon' | 'evening')
                      }
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-slate-300 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all"
                    >
                      <option value="morning">Morning (8:00 AM – 12:00 PM)</option>
                      <option value="afternoon">Afternoon (1:00 PM – 4:00 PM)</option>
                      <option value="evening">Evening (4:00 PM – 7:00 PM)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Short Message / Symptoms */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Symptoms or Notes <span className="text-slate-400 font-normal">(Optional)</span>
                </label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Tell us about any specific discomfort, cosmetic goals, or if you require nitrous oxide sedation."
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/30 focus:border-teal-500 transition-all resize-none"
                />
              </div>

              {/* Privacy Consent Checkbox */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200/80">
                <label className="flex items-start gap-2.5 text-xs text-slate-600 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    checked={privacyAccepted}
                    onChange={(e) => setPrivacyAccepted(e.target.checked)}
                    className="mt-0.5 rounded text-teal-600 focus:ring-teal-500 h-4 w-4"
                  />
                  <span>
                    I consent to AuraDental collecting and processing my contact information solely for
                    appointment scheduling and patient coordination in accordance with the{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal('privacy')}
                      className="text-teal-700 underline font-medium hover:text-teal-800"
                    >
                      Privacy Policy
                    </button>
                    . I understand online requests are confirmed individually by the clinic reception team.
                  </span>
                </label>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={resetAndClose}
                  className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-6 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-sm font-bold shadow-md shadow-teal-600/20 active:scale-95 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {loading ? (
                    <span>Submitting Request...</span>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Submit Appointment Request</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
