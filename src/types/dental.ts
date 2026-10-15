export type TreatmentCategory =
  | 'preventive'
  | 'cosmetic'
  | 'restorative'
  | 'orthodontics'
  | 'surgical'
  | 'pediatric'
  | 'emergency';

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  category: TreatmentCategory;
  durationMinutes: number;
  priceRange: string;
  insuranceCovered: string;
  image: string;
  iconName: string;
  overview: string;
  reasons: string[];
  process: {
    step: number;
    title: string;
    description: string;
  }[];
  benefits: string[];
  limitations: string[];
  aftercare: string[];
  faqs: {
    question: string;
    answer: string;
  }[];
}

export interface Dentist {
  id: string;
  name: string;
  title: string;
  qualifications: string;
  specialty: string;
  registrationNumber: string;
  experienceYears: number;
  image: string;
  bio: string;
  focusAreas: string[];
  languages: string[];
  availableDays: string[];
}

export type AppointmentStatus =
  | 'pending'
  | 'confirmed'
  | 'rescheduled'
  | 'completed'
  | 'cancelled';

export interface Appointment {
  id: string;
  referenceCode: string;
  patientName: string;
  phone: string;
  email: string;
  treatmentId: string;
  treatmentTitle: string;
  dentistId?: string;
  dentistName?: string;
  preferredDate: string;
  preferredTimeSlot: 'morning' | 'afternoon' | 'evening';
  patientType: 'new' | 'returning';
  notes?: string;
  status: AppointmentStatus;
  internalNotes?: string;
  createdAt: string;
  updatedAt: string;
  statusHistory: {
    status: AppointmentStatus;
    timestamp: string;
    changedBy: string;
    comment?: string;
  }[];
}

export interface ContactInquiry {
  id: string;
  name: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  status: 'new' | 'in_progress' | 'resolved';
  createdAt: string;
}

export interface Testimonial {
  id: string;
  patientName: string;
  treatmentSlug: string;
  treatmentName: string;
  rating: number;
  comment: string;
  date: string;
  verifiedPatient: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'reception' | 'operatory' | 'equipment' | 'sterilization' | 'team';
  image: string;
  description: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  category: 'Oral Hygiene' | 'Preventive' | 'Pediatric' | 'Treatment Guides' | 'Post-Care';
  readTime: string;
  publishedDate: string;
  author: string;
  authorRole: string;
  image: string;
  content: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Booking' | 'Treatments' | 'Insurance' | 'Pediatric' | 'Emergency';
}

export interface ClinicSettings {
  name: string;
  tagline: string;
  headline: string;
  subheadline: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  emergencyPhone: string;
  whatsapp: string;
  email: string;
  hours: {
    mondayFriday: string;
    saturday: string;
    sunday: string;
  };
  announcement: string;
  googleMapsEmbedUrl: string;
  directionsUrl: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userName: string;
  userRole: string;
  action: string;
  target: string;
  details: string;
}

export type AdminRole = 'Super Admin' | 'Clinic Manager' | 'Receptionist' | 'Content Editor';

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: AdminRole;
}
