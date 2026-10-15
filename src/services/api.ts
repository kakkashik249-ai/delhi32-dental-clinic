import {
  ClinicSettings,
  Treatment,
  Dentist,
  Appointment,
  ContactInquiry,
  Testimonial,
  GalleryItem,
  BlogPost,
  FAQ,
  AuditLog,
  AdminUser,
  AppointmentStatus,
} from '../types/dental';

export async function fetchClinicSettings(): Promise<ClinicSettings> {
  const res = await fetch('/api/clinic-info');
  const json = await res.json();
  return json.data;
}

export async function updateClinicSettings(data: Partial<ClinicSettings>): Promise<ClinicSettings> {
  const res = await fetch('/api/clinic-info', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function fetchTreatments(): Promise<Treatment[]> {
  const res = await fetch('/api/treatments');
  const json = await res.json();
  return json.data;
}

export async function updateTreatment(id: string, data: Partial<Treatment>): Promise<Treatment> {
  const res = await fetch(`/api/treatments/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function fetchDentists(): Promise<Dentist[]> {
  const res = await fetch('/api/dentists');
  const json = await res.json();
  return json.data;
}

export async function updateDentist(id: string, data: Partial<Dentist>): Promise<Dentist> {
  const res = await fetch(`/api/dentists/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function fetchTestimonials(): Promise<Testimonial[]> {
  const res = await fetch('/api/testimonials');
  const json = await res.json();
  return json.data;
}

export async function submitTestimonial(data: {
  patientName: string;
  treatmentName: string;
  rating: number;
  comment: string;
}): Promise<Testimonial> {
  const res = await fetch('/api/testimonials', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function fetchGallery(): Promise<GalleryItem[]> {
  const res = await fetch('/api/gallery');
  const json = await res.json();
  return json.data;
}

export async function fetchFAQs(): Promise<FAQ[]> {
  const res = await fetch('/api/faqs');
  const json = await res.json();
  return json.data;
}

export async function createFAQ(data: Partial<FAQ>): Promise<FAQ> {
  const res = await fetch('/api/faqs', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function updateFAQ(id: string, data: Partial<FAQ>): Promise<FAQ> {
  const res = await fetch(`/api/faqs/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  const json = await res.json();
  return json.data;
}

export async function deleteFAQ(id: string): Promise<boolean> {
  const res = await fetch(`/api/faqs/${id}`, { method: 'DELETE' });
  const json = await res.json();
  return json.success;
}

export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch('/api/blog');
  const json = await res.json();
  return json.data;
}

export async function fetchAppointments(status?: string, search?: string): Promise<Appointment[]> {
  const params = new URLSearchParams();
  if (status && status !== 'all') params.append('status', status);
  if (search) params.append('search', search);

  const res = await fetch(`/api/appointments?${params.toString()}`);
  const json = await res.json();
  return json.data;
}

export async function bookAppointment(payload: {
  patientName: string;
  phone: string;
  email?: string;
  treatmentId: string;
  dentistId?: string;
  preferredDate: string;
  preferredTimeSlot: string;
  patientType: 'new' | 'returning';
  notes?: string;
  privacyAccepted: boolean;
  honeypot?: string;
}): Promise<{ appointment: Appointment; message: string }> {
  const res = await fetch('/api/appointments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.success) {
    throw new Error(json.error || 'Failed to submit appointment request.');
  }
  return { appointment: json.data, message: json.message };
}

export async function updateAppointmentStatus(
  id: string,
  status: AppointmentStatus,
  comment?: string,
  changedBy?: string
): Promise<Appointment> {
  const res = await fetch(`/api/appointments/${id}/status`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status, comment, changedBy }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function updateAppointmentNotes(
  id: string,
  internalNotes: string,
  changedBy?: string
): Promise<Appointment> {
  const res = await fetch(`/api/appointments/${id}/notes`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ internalNotes, changedBy }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error);
  return json.data;
}

export async function submitContactInquiry(payload: {
  name: string;
  phone?: string;
  email: string;
  subject?: string;
  message: string;
  honeypot?: string;
}): Promise<ContactInquiry> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Failed to submit message.');
  return json.data;
}

export async function fetchInquiries(): Promise<ContactInquiry[]> {
  const res = await fetch('/api/contact-inquiries');
  const json = await res.json();
  return json.data;
}

export async function fetchAuditLogs(): Promise<AuditLog[]> {
  const res = await fetch('/api/admin/audit-logs');
  const json = await res.json();
  return json.data;
}

export async function adminLogin(
  email: string,
  password: string
): Promise<{ user: AdminUser; token: string }> {
  const res = await fetch('/api/admin/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  const json = await res.json();
  if (!json.success) throw new Error(json.error || 'Authentication failed');
  return { user: json.user, token: json.token };
}

export async function sendAIChat(
  message: string,
  history?: Array<{ role: 'user' | 'assistant'; text: string }>
): Promise<{ reply: string; isEmergency?: boolean }> {
  const res = await fetch('/api/ai-chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, history }),
  });
  const json = await res.json();
  return { reply: json.reply, isEmergency: json.isEmergency };
}
