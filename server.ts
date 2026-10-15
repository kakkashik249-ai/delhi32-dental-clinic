import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';
import {
  initialClinicSettings,
  initialTreatments,
  initialDentists,
  initialTestimonials,
  initialGallery,
  initialBlogPosts,
  initialFAQs,
  initialAppointments,
  initialInquiries,
  initialAuditLogs,
} from './src/data/initialData.ts';
import {
  Appointment,
  AppointmentStatus,
  ContactInquiry,
  AuditLog,
  ClinicSettings,
  Treatment,
  Dentist,
  FAQ,
  BlogPost,
  AdminUser,
} from './src/types/dental.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// In-memory persistent state initialized with rich clinical data
let clinicSettings: ClinicSettings = { ...initialClinicSettings };
let treatments: Treatment[] = [...initialTreatments];
let dentists: Dentist[] = [...initialDentists];
let appointments: Appointment[] = [...initialAppointments];
let inquiries: ContactInquiry[] = [...initialInquiries];
let testimonials = [...initialTestimonials];
let gallery = [...initialGallery];
let blogPosts: BlogPost[] = [...initialBlogPosts];
let faqs: FAQ[] = [...initialFAQs];
let auditLogs: AuditLog[] = [...initialAuditLogs];

// Helper to log audit actions
function recordAudit(userName: string, userRole: string, action: string, target: string, details: string) {
  const newLog: AuditLog = {
    id: `log-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    timestamp: new Date().toISOString(),
    userName,
    userRole,
    action,
    target,
    details,
  };
  auditLogs.unshift(newLog);
}

// -------------------------------------------------------------
// Public & Management API Endpoints
// -------------------------------------------------------------

// Clinic Settings
app.get('/api/clinic-info', (_req: Request, res: Response) => {
  res.json({ success: true, data: clinicSettings });
});

app.put('/api/clinic-info', (req: Request, res: Response) => {
  const updated = req.body;
  clinicSettings = { ...clinicSettings, ...updated };
  recordAudit('Admin', 'Clinic Manager', 'UPDATE_SETTINGS', 'Clinic Info', 'Updated clinic settings and hours');
  res.json({ success: true, data: clinicSettings });
});

// Treatments
app.get('/api/treatments', (_req: Request, res: Response) => {
  res.json({ success: true, data: treatments });
});

app.get('/api/treatments/:slug', (req: Request, res: Response) => {
  const item = treatments.find((t) => t.slug === req.params.slug);
  if (!item) {
    return res.status(404).json({ success: false, error: 'Treatment not found' });
  }
  res.json({ success: true, data: item });
});

app.put('/api/treatments/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const index = treatments.findIndex((t) => t.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Treatment not found' });
  }
  treatments[index] = { ...treatments[index], ...req.body };
  recordAudit('Admin', 'Content Editor', 'UPDATE_TREATMENT', treatments[index].title, 'Updated treatment details');
  res.json({ success: true, data: treatments[index] });
});

// Dentists
app.get('/api/dentists', (_req: Request, res: Response) => {
  res.json({ success: true, data: dentists });
});

app.put('/api/dentists/:id', (req: Request, res: Response) => {
  const id = req.params.id;
  const index = dentists.findIndex((d) => d.id === id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'Dentist not found' });
  }
  dentists[index] = { ...dentists[index], ...req.body };
  recordAudit('Admin', 'Content Editor', 'UPDATE_DENTIST', dentists[index].name, 'Updated doctor profile');
  res.json({ success: true, data: dentists[index] });
});

// Testimonials
app.get('/api/testimonials', (_req: Request, res: Response) => {
  res.json({ success: true, data: testimonials });
});

app.post('/api/testimonials', (req: Request, res: Response) => {
  const { patientName, treatmentName, rating, comment } = req.body;
  if (!patientName || !comment || !rating) {
    return res.status(400).json({ success: false, error: 'Patient name, rating, and feedback are required.' });
  }
  const newTestimonial = {
    id: `test-${Date.now()}`,
    patientName,
    treatmentSlug: 'patient-feedback',
    treatmentName: treatmentName || 'General Care',
    rating: Number(rating),
    comment,
    date: new Date().toISOString().split('T')[0],
    verifiedPatient: true,
  };
  testimonials.unshift(newTestimonial);
  res.json({ success: true, data: newTestimonial });
});

// Gallery
app.get('/api/gallery', (_req: Request, res: Response) => {
  res.json({ success: true, data: gallery });
});

// FAQs
app.get('/api/faqs', (_req: Request, res: Response) => {
  res.json({ success: true, data: faqs });
});

app.post('/api/faqs', (req: Request, res: Response) => {
  const { question, answer, category } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ success: false, error: 'Question and answer are required' });
  }
  const newFaq: FAQ = {
    id: `faq-${Date.now()}`,
    question,
    answer,
    category: category || 'General',
  };
  faqs.push(newFaq);
  recordAudit('Admin', 'Content Editor', 'CREATE_FAQ', question, 'Created new FAQ entry');
  res.json({ success: true, data: newFaq });
});

app.put('/api/faqs/:id', (req: Request, res: Response) => {
  const index = faqs.findIndex((f) => f.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, error: 'FAQ not found' });
  }
  faqs[index] = { ...faqs[index], ...req.body };
  recordAudit('Admin', 'Content Editor', 'UPDATE_FAQ', faqs[index].question, 'Updated FAQ content');
  res.json({ success: true, data: faqs[index] });
});

app.delete('/api/faqs/:id', (req: Request, res: Response) => {
  faqs = faqs.filter((f) => f.id !== req.params.id);
  recordAudit('Admin', 'Content Editor', 'DELETE_FAQ', req.params.id, 'Removed FAQ item');
  res.json({ success: true });
});

// Blog
app.get('/api/blog', (_req: Request, res: Response) => {
  res.json({ success: true, data: blogPosts });
});

app.get('/api/blog/:slug', (req: Request, res: Response) => {
  const post = blogPosts.find((p) => p.slug === req.params.slug);
  if (!post) {
    return res.status(404).json({ success: false, error: 'Article not found' });
  }
  res.json({ success: true, data: post });
});

// Appointments Booking & Management
app.get('/api/appointments', (req: Request, res: Response) => {
  const { status, search } = req.query;
  let result = [...appointments];

  if (status && status !== 'all') {
    result = result.filter((a) => a.status === status);
  }

  if (search && typeof search === 'string') {
    const q = search.toLowerCase();
    result = result.filter(
      (a) =>
        a.patientName.toLowerCase().includes(q) ||
        a.phone.includes(q) ||
        a.email.toLowerCase().includes(q) ||
        a.referenceCode.toLowerCase().includes(q) ||
        a.treatmentTitle.toLowerCase().includes(q)
    );
  }

  res.json({ success: true, data: result });
});

// Submit Appointment Request (Patient)
app.post('/api/appointments', (req: Request, res: Response) => {
  const {
    patientName,
    phone,
    email,
    treatmentId,
    dentistId,
    preferredDate,
    preferredTimeSlot,
    patientType,
    notes,
    privacyAccepted,
    honeypot, // spam protection
  } = req.body;

  // Bot spam trap check
  if (honeypot) {
    return res.status(400).json({ success: false, error: 'Invalid submission detected.' });
  }

  if (!patientName || !phone || !preferredDate || !treatmentId) {
    return res.status(400).json({
      success: false,
      error: 'Please complete all required fields: full name, phone number, treatment, and preferred date.',
    });
  }

  if (!privacyAccepted) {
    return res.status(400).json({
      success: false,
      error: 'You must review and agree to the privacy consent terms to submit a request.',
    });
  }

  const selectedTreatment = treatments.find((t) => t.id === treatmentId);
  const selectedDentist = dentists.find((d) => d.id === dentistId);

  const referenceCode = `APT-2026-${Math.floor(1000 + Math.random() * 9000)}`;
  const now = new Date().toISOString();

  const newAppointment: Appointment = {
    id: `apt-${Date.now()}`,
    referenceCode,
    patientName: patientName.trim(),
    phone: phone.trim(),
    email: email ? email.trim() : '',
    treatmentId,
    treatmentTitle: selectedTreatment ? selectedTreatment.title : 'General Dental Consultation',
    dentistId: selectedDentist?.id,
    dentistName: selectedDentist ? selectedDentist.name : 'First Available Specialist',
    preferredDate,
    preferredTimeSlot: preferredTimeSlot || 'morning',
    patientType: patientType === 'returning' ? 'returning' : 'new',
    notes: notes ? notes.trim() : '',
    status: 'pending',
    createdAt: now,
    updatedAt: now,
    statusHistory: [
      {
        status: 'pending',
        timestamp: now,
        changedBy: 'Patient Web Portal',
        comment: 'Appointment request received; pending reception coordinator verification.',
      },
    ],
  };

  appointments.unshift(newAppointment);

  recordAudit(
    'Patient Web Portal',
    'Patient',
    'CREATE_APPOINTMENT',
    referenceCode,
    `New request from ${patientName} (${newAppointment.treatmentTitle})`
  );

  res.status(201).json({
    success: true,
    data: newAppointment,
    message: 'Your appointment request has been received. Our reception team will confirm your slot within 1 business hour.',
  });
});

// Update appointment status (Admin)
app.patch('/api/appointments/:id/status', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, comment, changedBy } = req.body as {
    status: AppointmentStatus;
    comment?: string;
    changedBy?: string;
  };

  const appt = appointments.find((a) => a.id === id);
  if (!appt) {
    return res.status(404).json({ success: false, error: 'Appointment not found' });
  }

  const now = new Date().toISOString();
  appt.status = status;
  appt.updatedAt = now;
  appt.statusHistory.push({
    status,
    timestamp: now,
    changedBy: changedBy || 'Staff Member',
    comment: comment || `Status updated to ${status}.`,
  });

  recordAudit(
    changedBy || 'Staff Member',
    'Admin Staff',
    'UPDATE_STATUS',
    appt.referenceCode,
    `Changed status of appointment ${appt.referenceCode} to ${status}`
  );

  res.json({ success: true, data: appt });
});

// Update internal notes (Admin)
app.patch('/api/appointments/:id/notes', (req: Request, res: Response) => {
  const { id } = req.params;
  const { internalNotes, changedBy } = req.body;

  const appt = appointments.find((a) => a.id === id);
  if (!appt) {
    return res.status(404).json({ success: false, error: 'Appointment not found' });
  }

  appt.internalNotes = internalNotes;
  appt.updatedAt = new Date().toISOString();

  recordAudit(
    changedBy || 'Clinical Staff',
    'Admin Staff',
    'UPDATE_NOTES',
    appt.referenceCode,
    `Updated internal clinical notes for ${appt.referenceCode}`
  );

  res.json({ success: true, data: appt });
});

// Contact Inquiries
app.get('/api/contact-inquiries', (_req: Request, res: Response) => {
  res.json({ success: true, data: inquiries });
});

app.post('/api/contact', (req: Request, res: Response) => {
  const { name, phone, email, subject, message, honeypot } = req.body;

  if (honeypot) {
    return res.status(400).json({ success: false, error: 'Submission rejected.' });
  }

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Name, email, and message are required.' });
  }

  const newInquiry: ContactInquiry = {
    id: `inq-${Date.now()}`,
    name: name.trim(),
    phone: phone ? phone.trim() : '',
    email: email.trim(),
    subject: subject ? subject.trim() : 'General Inquiry',
    message: message.trim(),
    status: 'new',
    createdAt: new Date().toISOString(),
  };

  inquiries.unshift(newInquiry);
  recordAudit('Website Visitor', 'Patient', 'CREATE_INQUIRY', newInquiry.id, `Inquiry received from ${name}`);

  res.status(201).json({
    success: true,
    data: newInquiry,
    message: 'Thank you for reaching out. A coordinator will review your inquiry and reply promptly.',
  });
});

// Admin Authentication (Simulated role-based session with sample users)
const ADMIN_USERS: Record<string, AdminUser> = {
  'superadmin@auradental.com': {
    id: 'usr-1',
    email: 'superadmin@auradental.com',
    name: 'Dr. Julian Vance',
    role: 'Super Admin',
  },
  'manager@auradental.com': {
    id: 'usr-2',
    email: 'manager@auradental.com',
    name: 'Rachel Sterling',
    role: 'Clinic Manager',
  },
  'reception@auradental.com': {
    id: 'usr-3',
    email: 'reception@auradental.com',
    name: 'Sarah Jenkins',
    role: 'Receptionist',
  },
  'editor@auradental.com': {
    id: 'usr-4',
    email: 'editor@auradental.com',
    name: 'Alex Turner',
    role: 'Content Editor',
  },
};

app.post('/api/admin/login', (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ success: false, error: 'Email and password are required.' });
  }

  const user = ADMIN_USERS[email.toLowerCase().trim()];
  // Allow demo passwords "aura2026" or "admin123"
  if (!user || (password !== 'aura2026' && password !== 'admin123')) {
    return res.status(401).json({ success: false, error: 'Invalid staff credentials. Please check your email or password.' });
  }

  recordAudit(user.name, user.role, 'LOGIN', 'Admin Portal', 'Successful authentication');

  res.json({
    success: true,
    user,
    token: `token-${user.id}-${Date.now()}`,
  });
});

// Audit Logs
app.get('/api/admin/audit-logs', (_req: Request, res: Response) => {
  res.json({ success: true, data: auditLogs });
});

// Export Appointments
app.get('/api/admin/export', (req: Request, res: Response) => {
  const format = req.query.format || 'json';
  if (format === 'csv') {
    const headers = 'Reference,PatientName,Phone,Email,Treatment,Dentist,Date,TimeSlot,Status,CreatedAt\n';
    const rows = appointments
      .map(
        (a) =>
          `"${a.referenceCode}","${a.patientName}","${a.phone}","${a.email}","${a.treatmentTitle}","${a.dentistName || ''}","${a.preferredDate}","${a.preferredTimeSlot}","${a.status}","${a.createdAt}"`
      )
      .join('\n');
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename="appointments-export.csv"');
    return res.send(headers + rows);
  }

  res.json({ success: true, data: appointments });
});

// -------------------------------------------------------------
// AI Dental Website Assistant via @google/genai SDK
// -------------------------------------------------------------
app.post('/api/ai-chat', async (req: Request, res: Response) => {
  const { message, history } = req.body;

  if (!message || typeof message !== 'string') {
    return res.status(400).json({ success: false, error: 'Message text is required.' });
  }

  // Safety triage filter
  const emergencyKeywords = ['bleeding heavily', 'difficulty breathing', 'cannot breathe', 'throat swelling', 'unconscious', 'fever 104', 'jaw fracture'];
  const isSevereTrauma = emergencyKeywords.some((k) => message.toLowerCase().includes(k));

  if (isSevereTrauma) {
    return res.json({
      success: true,
      reply:
        '⚠️ **URGENT MEDICAL ADVICE**: If you are experiencing difficulty breathing, severe continuous bleeding that does not stop with pressure, or high fever with swelling under the eye or neck, please **call 911 immediately or go to the nearest emergency hospital room**.\n\nFor non-life-threatening urgent dental trauma (such as a knocked-out tooth or severe throbbing toothache), our clinic on-call emergency direct line is **+1 (415) 890-3399**.',
      isEmergency: true,
    });
  }

  const systemInstruction = `
You are the official digital concierge and patient navigator for "AuraDental Clinic & Implant Center" in San Francisco.
Your role:
1. Greet visitors warmly, professionally, and empathetically.
2. Provide accurate information about our 15 treatments: General Dentistry, Teeth Cleaning and Scaling, Dental Check-ups, Cosmetic Dentistry (Veneers), Teeth Whitening, Braces and Orthodontics, Clear Aligners (Invisalign), Dental Implants, Root Canal Treatment, Ceramic Crowns and Bridges, Tooth Extraction, Pediatric Dentistry, Gum Disease Treatment, Dentures, and Emergency Dental Care.
3. Share clinic hours: Monday–Friday 8:00 AM – 7:00 PM, Saturday 8:30 AM – 4:00 PM, Sunday Emergency on-call (10:00 AM – 2:00 PM).
4. Share location: 450 Sutter Health Plaza, Suite 820, San Francisco, CA. Phone: +1 (415) 890-3342.
5. Highlight our specialist doctors: Dr. Julian Vance (Prosthodontics & Implants), Dr. Elena Rostova (Orthodontics & Clear Aligners), Dr. Marcus Lin (Micro-Endodontics), and Dr. Sophia Bennett (Pediatric Dentistry).
6. Guide users smoothly to book an appointment using the website's booking form.
7. CRITICAL MEDICAL BOUNDARY: You NEVER diagnose conditions, NEVER prescribe medications, and NEVER claim guaranteed clinical outcomes. Always state that an in-person clinical evaluation with dental radiographs is necessary.
Keep answers concise (under 3 paragraphs), well-formatted, and patient-centered.
`;

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = `${systemInstruction}\n\nPatient User Question: ${message}`;
      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
      });

      const replyText = response.text || 'Thank you for reaching out to AuraDental. How else may I assist your smile today?';
      return res.json({ success: true, reply: replyText });
    } catch (err: any) {
      console.warn('Gemini API call returned error, switching to graceful dental navigator fallback:', err?.message || err);
    }
  }

  // Graceful rule-based healthcare navigator fallback
  const lower = message.toLowerCase();
  let fallbackReply = '';

  if (lower.includes('hour') || lower.includes('open') || lower.includes('when')) {
    fallbackReply =
      `Our clinic is open:\n- **Monday – Friday**: 8:00 AM – 7:00 PM\n- **Saturday**: 8:30 AM – 4:00 PM\n- **Sunday**: Emergency On-Call Only (10:00 AM – 2:00 PM)\n\nYou can request an appointment anytime through our online booking button!`;
  } else if (lower.includes('cost') || lower.includes('price') || lower.includes('insurance')) {
    fallbackReply =
      `We believe in transparent, upfront healthcare pricing. Routine cleanings and preventive exams are typically 80–100% covered by premier PPO dental plans. We also provide zero-interest monthly financing through CareCredit and Sunbit.\n\nWould you like to schedule a consultation so our team can provide an exact personalized insurance breakdown?`;
  } else if (lower.includes('invisalign') || lower.includes('aligner') || lower.includes('brace')) {
    fallbackReply =
      `We offer both discrete Clear Aligners (Invisalign Diamond Provider Dr. Elena Rostova) and modern low-profile braces. Clear aligners are removable and virtually invisible, while braces are ideal for comprehensive bite alignment.\n\nWe provide 3D iTero digital scans that simulate your new smile in under 60 seconds!`;
  } else if (lower.includes('implant') || lower.includes('missing tooth')) {
    fallbackReply =
      `Our Dental Implant Center is led by Dr. Julian Vance (Master Prosthodontist). We utilize 3D CBCT computer-guided placement for maximum precision and rapid healing.\n\nDental implants look, feel, and function like natural teeth and prevent jawbone loss. Would you like to schedule an implant consultation?`;
  } else if (lower.includes('emergency') || lower.includes('pain') || lower.includes('hurt') || lower.includes('toothache')) {
    fallbackReply =
      `We reserve dedicated emergency slots every single day. If you have an urgent toothache, cracked tooth, or swelling, please call our direct front desk immediately at **+1 (415) 890-3342** or our 24/7 emergency line at **+1 (415) 890-3399** so we can treat you without delay.`;
  } else {
    fallbackReply =
      `Welcome to AuraDental! We offer comprehensive dental care across 15 specialties—from routine ultrasonic cleanings and pediatric care to smile veneers and computer-guided implants.\n\nOur clinic is located at 450 Sutter Health Plaza in San Francisco. You can explore our services or click **Book Appointment** to reserve your visit with our specialist team!`;
  }

  return res.json({ success: true, reply: fallbackReply });
});

// -------------------------------------------------------------
// Vite Middleware / Static Server setup
// -------------------------------------------------------------
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Dental Clinic server running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
});
