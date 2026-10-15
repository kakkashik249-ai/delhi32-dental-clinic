import React, { useState, useEffect } from 'react';
import {
  X,
  Lock,
  LogOut,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  Filter,
  Download,
  FileText,
  Users,
  Settings,
  HelpCircle,
  History,
  ShieldAlert,
  ChevronRight,
  Eye,
  MessageSquare,
  Sparkles,
  Save,
  Plus,
  Trash2,
} from 'lucide-react';
import {
  AdminUser,
  AdminRole,
  Appointment,
  AppointmentStatus,
  ContactInquiry,
  AuditLog,
  ClinicSettings,
  Treatment,
  Dentist,
  FAQ,
} from '../../types/dental';
import {
  adminLogin,
  fetchAppointments,
  updateAppointmentStatus,
  updateAppointmentNotes,
  fetchInquiries,
  fetchAuditLogs,
  updateClinicSettings,
  updateTreatment,
  updateDentist,
  createFAQ,
  deleteFAQ,
} from '../../services/api';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  clinicSettings: ClinicSettings;
  treatments: Treatment[];
  dentists: Dentist[];
  faqs: FAQ[];
  onRefreshData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  clinicSettings,
  treatments,
  dentists,
  faqs,
  onRefreshData,
}) => {
  const [currentUser, setCurrentUser] = useState<AdminUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Login form state
  const [loginEmail, setLoginEmail] = useState('superadmin@auradental.com');
  const [loginPassword, setLoginPassword] = useState('aura2026');
  const [loginError, setLoginError] = useState('');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // Active Admin Tab
  const [activeTab, setActiveTab] = useState<
    'overview' | 'appointments' | 'inquiries' | 'content' | 'settings' | 'audit'
  >('overview');

  // Appointments table state
  const [appointmentsList, setAppointmentsList] = useState<Appointment[]>([]);
  const [statusFilter, setStatusFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedAppointment, setSelectedAppointment] = useState<Appointment | null>(null);
  const [noteText, setNoteText] = useState('');
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  // Inquiries & Audit Logs
  const [inquiriesList, setInquiriesList] = useState<ContactInquiry[]>([]);
  const [auditLogsList, setAuditLogsList] = useState<AuditLog[]>([]);

  // Content editing state
  const [selectedTreatmentId, setSelectedTreatmentId] = useState(treatments[0]?.id || '');
  const [editingPrice, setEditingPrice] = useState('');
  const [editingDesc, setEditingDesc] = useState('');

  // Settings editing state
  const [settingsForm, setSettingsForm] = useState<ClinicSettings>(clinicSettings);
  const [settingsSaved, setSettingsSaved] = useState(false);

  // New FAQ form
  const [newFaqQuestion, setNewFaqQuestion] = useState('');
  const [newFaqAnswer, setNewFaqAnswer] = useState('');
  const [newFaqCategory, setNewFaqCategory] = useState<'General' | 'Booking' | 'Treatments'>('General');

  useEffect(() => {
    if (isOpen && currentUser) {
      loadData();
    }
  }, [isOpen, currentUser, statusFilter, searchTerm]);

  useEffect(() => {
    if (clinicSettings) {
      setSettingsForm(clinicSettings);
    }
  }, [clinicSettings]);

  if (!isOpen) return null;

  const loadData = async () => {
    try {
      const appts = await fetchAppointments(statusFilter, searchTerm);
      setAppointmentsList(appts);
      const inqs = await fetchInquiries();
      setInquiriesList(inqs);
      const logs = await fetchAuditLogs();
      setAuditLogsList(logs);
    } catch (e) {
      console.error(e);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');
    setIsLoggingIn(true);
    try {
      const res = await adminLogin(loginEmail, loginPassword);
      setCurrentUser(res.user);
      setToken(res.token);
      loadData();
    } catch (err: any) {
      setLoginError(err.message || 'Login failed');
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleRoleQuickSelect = (email: string) => {
    setLoginEmail(email);
    setLoginPassword('aura2026');
  };

  const handleStatusChange = async (id: string, newStatus: AppointmentStatus) => {
    if (!currentUser) return;
    setUpdatingId(id);
    try {
      await updateAppointmentStatus(
        id,
        newStatus,
        `Status updated by ${currentUser.name} (${currentUser.role})`,
        currentUser.name
      );
      await loadData();
      if (selectedAppointment && selectedAppointment.id === id) {
        setSelectedAppointment((prev) => (prev ? { ...prev, status: newStatus } : null));
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdatingId(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedAppointment || !currentUser) return;
    try {
      await updateAppointmentNotes(selectedAppointment.id, noteText, currentUser.name);
      selectedAppointment.internalNotes = noteText;
      await loadData();
      alert('Internal clinical notes saved successfully.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/admin/export?format=csv', '_blank');
  };

  const handleSaveSettings = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateClinicSettings(settingsForm);
      setSettingsSaved(true);
      setTimeout(() => setSettingsSaved(false), 2500);
      onRefreshData();
    } catch (e) {
      console.error(e);
    }
  };

  const handleCreateFaq = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFaqQuestion.trim() || !newFaqAnswer.trim()) return;
    try {
      await createFAQ({
        question: newFaqQuestion,
        answer: newFaqAnswer,
        category: newFaqCategory,
      });
      setNewFaqQuestion('');
      setNewFaqAnswer('');
      onRefreshData();
      alert('New FAQ added.');
    } catch (e) {
      console.error(e);
    }
  };

  const handleDeleteFaq = async (id: string) => {
    if (confirm('Are you sure you want to delete this FAQ item?')) {
      await deleteFAQ(id);
      onRefreshData();
    }
  };

  // KPI Metrics
  const totalRequests = appointmentsList.length;
  const pendingRequests = appointmentsList.filter((a) => a.status === 'pending').length;
  const confirmedRequests = appointmentsList.filter((a) => a.status === 'confirmed').length;
  const cancelledRequests = appointmentsList.filter((a) => a.status === 'cancelled').length;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
      <div
        className="relative w-full max-w-6xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-4 flex flex-col h-[92vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Navbar */}
        <div className="p-4 sm:p-5 bg-slate-900 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold font-display text-white">AuraDental Staff Portal</h2>
                {currentUser && (
                  <span className="px-2 py-0.5 rounded text-[11px] font-semibold bg-teal-500/20 text-teal-300 border border-teal-500/30">
                    {currentUser.role}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-400">
                {currentUser
                  ? `Signed in as ${currentUser.name} (${currentUser.email})`
                  : 'Authorized Personnel Access Only'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {currentUser && (
              <button
                onClick={() => {
                  setCurrentUser(null);
                  setToken(null);
                }}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              aria-label="Close Admin Portal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Body Container */}
        {!currentUser ? (
          /* Authentication Screen */
          <div className="flex-1 overflow-y-auto p-6 sm:p-10 flex items-center justify-center bg-slate-50">
            <div className="w-full max-w-md bg-white p-6 sm:p-8 rounded-2xl shadow-xl border border-slate-200/90 space-y-6">
              <div className="text-center space-y-1">
                <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto border border-teal-100">
                  <ShieldAlert className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 font-display">Staff Authentication</h3>
                <p className="text-xs text-slate-500">
                  Select a clinical role or enter your staff credentials
                </p>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                  {loginError}
                </div>
              )}

              {/* Quick Role Tester Pills */}
              <div className="space-y-1.5">
                <span className="text-[11px] font-semibold uppercase text-slate-400 tracking-wider">
                  Quick Demo Roles (Click to test):
                </span>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => handleRoleQuickSelect('superadmin@auradental.com')}
                    className="p-2 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-left transition-all"
                  >
                    <p className="font-bold text-slate-800">Super Admin</p>
                    <p className="text-[10px] text-slate-500">Dr. Julian Vance</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleQuickSelect('manager@auradental.com')}
                    className="p-2 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-left transition-all"
                  >
                    <p className="font-bold text-slate-800">Clinic Manager</p>
                    <p className="text-[10px] text-slate-500">Rachel Sterling</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleQuickSelect('reception@auradental.com')}
                    className="p-2 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-left transition-all"
                  >
                    <p className="font-bold text-slate-800">Receptionist</p>
                    <p className="text-[10px] text-slate-500">Sarah Jenkins</p>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRoleQuickSelect('editor@auradental.com')}
                    className="p-2 rounded-lg border border-slate-200 hover:border-teal-500 hover:bg-teal-50 text-left transition-all"
                  >
                    <p className="font-bold text-slate-800">Content Editor</p>
                    <p className="text-[10px] text-slate-500">Alex Turner</p>
                  </button>
                </div>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Staff Email</label>
                  <input
                    type="email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
                  <input
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    placeholder="aura2026 or admin123"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Default demo password: aura2026</p>
                </div>

                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-all shadow-md cursor-pointer disabled:opacity-50"
                >
                  {isLoggingIn ? 'Authenticating...' : 'Sign In to Portal'}
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authorized Dashboard Suite */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden bg-slate-50">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-white border-r border-slate-200 p-3 sm:p-4 flex flex-row md:flex-col gap-1 overflow-x-auto shrink-0">
              <button
                onClick={() => setActiveTab('overview')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'overview'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <Sparkles className="w-4 h-4 text-teal-600" />
                <span>Dashboard KPIs</span>
              </button>

              <button
                onClick={() => setActiveTab('appointments')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'appointments'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <Calendar className="w-4 h-4 text-teal-600" />
                  <span>Appointments</span>
                </span>
                {pendingRequests > 0 && (
                  <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-amber-500 text-white font-bold">
                    {pendingRequests}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'inquiries'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <MessageSquare className="w-4 h-4 text-teal-600" />
                  <span>Inquiries</span>
                </span>
                <span className="text-[10px] text-slate-400 font-mono">{inquiriesList.length}</span>
              </button>

              <button
                onClick={() => setActiveTab('content')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'content'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <FileText className="w-4 h-4 text-teal-600" />
                <span>Content & FAQs</span>
              </button>

              {currentUser.role === 'Super Admin' || currentUser.role === 'Clinic Manager' ? (
                <button
                  onClick={() => setActiveTab('settings')}
                  className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                    activeTab === 'settings'
                      ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Settings className="w-4 h-4 text-teal-600" />
                  <span>Clinic Settings</span>
                </button>
              ) : null}

              <button
                onClick={() => setActiveTab('audit')}
                className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                  activeTab === 'audit'
                    ? 'bg-teal-50 text-teal-800 border border-teal-200/80'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                <History className="w-4 h-4 text-teal-600" />
                <span>Security Audit Trail</span>
              </button>
            </aside>

            {/* Tab Panels */}
            <main className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
              {/* Tab 1: Overview KPIs */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Clinic Performance & Queue
                    </h3>
                    <p className="text-xs text-slate-500">
                      Real-time patient request metrics and clinical operations
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-400 font-semibold">Total Requests</span>
                      <p className="text-2xl font-bold text-slate-900 font-mono mt-1">
                        {totalRequests}
                      </p>
                      <span className="text-[11px] text-teal-600 font-medium">All recorded visits</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-amber-200 shadow-xs bg-amber-50/20">
                      <span className="text-xs text-amber-700 font-semibold">Pending Review</span>
                      <p className="text-2xl font-bold text-amber-800 font-mono mt-1">
                        {pendingRequests}
                      </p>
                      <span className="text-[11px] text-amber-600 font-medium">Needs reception call</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-emerald-200 shadow-xs bg-emerald-50/20">
                      <span className="text-xs text-emerald-700 font-semibold">Confirmed Slots</span>
                      <p className="text-2xl font-bold text-emerald-800 font-mono mt-1">
                        {confirmedRequests}
                      </p>
                      <span className="text-[11px] text-emerald-600 font-medium">Scheduled in operatory</span>
                    </div>

                    <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs">
                      <span className="text-xs text-slate-400 font-semibold">Inquiries</span>
                      <p className="text-2xl font-bold text-slate-900 font-mono mt-1">
                        {inquiriesList.length}
                      </p>
                      <span className="text-[11px] text-slate-500 font-medium">General patient questions</span>
                    </div>
                  </div>

                  {/* Recent Activity Quick Table */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900">High-Priority Pending Queue</h4>
                      <button
                        onClick={() => setActiveTab('appointments')}
                        className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                      >
                        Open Full Manager →
                      </button>
                    </div>

                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                          <tr>
                            <th className="py-2.5 px-3">Reference</th>
                            <th className="py-2.5 px-3">Patient</th>
                            <th className="py-2.5 px-3">Treatment</th>
                            <th className="py-2.5 px-3">Preferred Date</th>
                            <th className="py-2.5 px-3">Action</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {appointmentsList
                            .filter((a) => a.status === 'pending')
                            .slice(0, 4)
                            .map((a) => (
                              <tr key={a.id} className="hover:bg-slate-50/80">
                                <td className="py-2.5 px-3 font-mono font-semibold text-teal-700">
                                  {a.referenceCode}
                                </td>
                                <td className="py-2.5 px-3 font-medium text-slate-800">{a.patientName}</td>
                                <td className="py-2.5 px-3 text-slate-600">{a.treatmentTitle}</td>
                                <td className="py-2.5 px-3 text-slate-600">{a.preferredDate}</td>
                                <td className="py-2.5 px-3">
                                  <button
                                    onClick={() => handleStatusChange(a.id, 'confirmed')}
                                    className="px-2 py-1 bg-teal-600 text-white rounded text-[11px] font-bold hover:bg-teal-700"
                                  >
                                    Confirm
                                  </button>
                                </td>
                              </tr>
                            ))}
                          {pendingRequests === 0 && (
                            <tr>
                              <td colSpan={5} className="py-6 text-center text-slate-400">
                                No pending appointments. Operatories up to date!
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 2: Appointments Management */}
              {activeTab === 'appointments' && (
                <div className="space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 font-display">
                        Appointment Management
                      </h3>
                      <p className="text-xs text-slate-500">
                        Search, verify, update clinical notes, and export appointment records
                      </p>
                    </div>
                    <button
                      onClick={handleExportCSV}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold shadow-xs transition-colors self-start sm:self-auto cursor-pointer"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Export Appointments (CSV)</span>
                    </button>
                  </div>

                  {/* Filter & Search Bar */}
                  <div className="bg-white p-3 rounded-xl border border-slate-200 flex flex-col sm:flex-row gap-3 items-center">
                    <div className="relative flex-1 w-full">
                      <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by patient name, phone, email, or reference code..."
                        className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                      />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                      <Filter className="w-4 h-4 text-slate-400" />
                      <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs bg-white"
                      >
                        <option value="all">All Statuses ({totalRequests})</option>
                        <option value="pending">Pending ({pendingRequests})</option>
                        <option value="confirmed">Confirmed ({confirmedRequests})</option>
                        <option value="rescheduled">Rescheduled</option>
                        <option value="cancelled">Cancelled ({cancelledRequests})</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>

                  {/* Appointments Table */}
                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                          <tr>
                            <th className="py-3 px-3">Reference</th>
                            <th className="py-3 px-3">Patient</th>
                            <th className="py-3 px-3">Contact</th>
                            <th className="py-3 px-3">Treatment</th>
                            <th className="py-3 px-3">Date & Slot</th>
                            <th className="py-3 px-3">Status</th>
                            <th className="py-3 px-3 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {appointmentsList.map((a) => (
                            <tr
                              key={a.id}
                              className={`hover:bg-slate-50/80 transition-colors ${
                                selectedAppointment?.id === a.id ? 'bg-teal-50/40' : ''
                              }`}
                            >
                              <td className="py-3 px-3 font-mono font-bold text-teal-700">
                                {a.referenceCode}
                              </td>
                              <td className="py-3 px-3">
                                <p className="font-semibold text-slate-900">{a.patientName}</p>
                                <span className="text-[10px] text-slate-400 capitalize">
                                  {a.patientType} Patient
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-600">
                                <p>{a.phone}</p>
                                <p className="text-[10px] text-slate-400">{a.email || 'No email'}</p>
                              </td>
                              <td className="py-3 px-3">
                                <p className="font-medium text-slate-800">{a.treatmentTitle}</p>
                                <span className="text-[10px] text-slate-500">
                                  {a.dentistName || 'First Available'}
                                </span>
                              </td>
                              <td className="py-3 px-3 text-slate-600">
                                <p className="font-medium">{a.preferredDate}</p>
                                <p className="text-[10px] capitalize text-slate-400">{a.preferredTimeSlot}</p>
                              </td>
                              <td className="py-3 px-3">
                                <select
                                  value={a.status}
                                  onChange={(e) =>
                                    handleStatusChange(a.id, e.target.value as AppointmentStatus)
                                  }
                                  disabled={updatingId === a.id}
                                  className={`px-2 py-1 rounded text-[11px] font-bold border ${
                                    a.status === 'confirmed'
                                      ? 'bg-emerald-50 text-emerald-800 border-emerald-300'
                                      : a.status === 'pending'
                                      ? 'bg-amber-50 text-amber-800 border-amber-300'
                                      : a.status === 'cancelled'
                                      ? 'bg-rose-50 text-rose-800 border-rose-300'
                                      : 'bg-slate-100 text-slate-800 border-slate-300'
                                  }`}
                                >
                                  <option value="pending">Pending</option>
                                  <option value="confirmed">Confirmed</option>
                                  <option value="rescheduled">Rescheduled</option>
                                  <option value="completed">Completed</option>
                                  <option value="cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="py-3 px-3 text-right">
                                <button
                                  onClick={() => {
                                    setSelectedAppointment(a);
                                    setNoteText(a.internalNotes || '');
                                  }}
                                  className="px-2.5 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-[11px]"
                                >
                                  Notes & Details
                                </button>
                              </td>
                            </tr>
                          ))}
                          {appointmentsList.length === 0 && (
                            <tr>
                              <td colSpan={7} className="py-10 text-center text-slate-400">
                                No appointments match your current filters.
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  {/* Selected Appointment Inspector Panel */}
                  {selectedAppointment && (
                    <div className="bg-white rounded-xl border border-teal-200 p-5 space-y-4 shadow-sm animate-fadeIn">
                      <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                        <div>
                          <span className="text-xs font-mono font-bold text-teal-700">
                            {selectedAppointment.referenceCode}
                          </span>
                          <h4 className="text-base font-bold text-slate-900">
                            Patient Record: {selectedAppointment.patientName}
                          </h4>
                        </div>
                        <button
                          onClick={() => setSelectedAppointment(null)}
                          className="p-1 rounded text-slate-400 hover:text-slate-600"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                        <div className="space-y-2 bg-slate-50 p-3.5 rounded-lg border border-slate-200">
                          <p className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                            Patient Request Details
                          </p>
                          <p>
                            <strong>Phone:</strong> {selectedAppointment.phone}
                          </p>
                          <p>
                            <strong>Email:</strong> {selectedAppointment.email || 'Not provided'}
                          </p>
                          <p>
                            <strong>Treatment:</strong> {selectedAppointment.treatmentTitle}
                          </p>
                          <p>
                            <strong>Doctor:</strong> {selectedAppointment.dentistName}
                          </p>
                          <p>
                            <strong>Patient Notes/Symptoms:</strong>{' '}
                            {selectedAppointment.notes || 'None submitted'}
                          </p>
                        </div>

                        {/* Internal Clinical Staff Notes */}
                        <div className="space-y-2">
                          <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                            Internal Clinical / Reception Notes (Confidential)
                          </label>
                          <textarea
                            rows={3}
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                            placeholder="Add notes: e.g. Pre-medication required, verified Delta Dental PPO, called patient on 10/10."
                            className="w-full p-2.5 rounded-lg border border-slate-300 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
                          />
                          <button
                            onClick={handleSaveNotes}
                            className="px-3.5 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs transition-colors flex items-center gap-1.5"
                          >
                            <Save className="w-3.5 h-3.5" />
                            <span>Save Internal Notes</span>
                          </button>
                        </div>
                      </div>

                      {/* Status History Trail */}
                      <div className="pt-2">
                        <p className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-1.5">
                          Audit Trail for this Appointment:
                        </p>
                        <div className="space-y-1 text-[11px] text-slate-600">
                          {selectedAppointment.statusHistory?.map((h, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <span className="text-slate-400 font-mono">
                                {new Date(h.timestamp).toLocaleTimeString([], {
                                  hour: '2-digit',
                                  minute: '2-digit',
                                })}
                              </span>
                              <span className="font-semibold capitalize text-teal-800">[{h.status}]</span>
                              <span>by {h.changedBy}</span>
                              {h.comment && <span className="text-slate-500 italic">— {h.comment}</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Tab 3: Inquiries */}
              {activeTab === 'inquiries' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">Contact Inquiries</h3>
                    <p className="text-xs text-slate-500">
                      Messages received from the contact form and patient inquiries
                    </p>
                  </div>

                  <div className="space-y-3">
                    {inquiriesList.map((inq) => (
                      <div
                        key={inq.id}
                        className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs space-y-2 text-xs"
                      >
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-sm text-slate-900">{inq.name}</span>
                          <span className="text-slate-400 font-mono text-[11px]">
                            {new Date(inq.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-3 text-slate-500">
                          <span>Email: {inq.email}</span>
                          {inq.phone && <span>Phone: {inq.phone}</span>}
                          <span className="font-semibold text-slate-700">Subject: {inq.subject}</span>
                        </div>
                        <p className="p-3 bg-slate-50 rounded-lg text-slate-700 leading-relaxed border border-slate-100">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                    {inquiriesList.length === 0 && (
                      <div className="p-10 text-center text-slate-400 bg-white rounded-xl border border-slate-200">
                        No contact inquiries in inbox.
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Tab 4: Content & FAQs Editor */}
              {activeTab === 'content' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Website Content Management
                    </h3>
                    <p className="text-xs text-slate-500">
                      Manage FAQs, clinical pricing guidelines, and treatments
                    </p>
                  </div>

                  {/* Add New FAQ Form */}
                  <div className="bg-white p-5 rounded-xl border border-slate-200 space-y-3 shadow-xs">
                    <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                      <Plus className="w-4 h-4 text-teal-600" />
                      Add New Patient FAQ
                    </h4>
                    <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <div className="sm:col-span-2">
                          <label className="block font-semibold text-slate-700 mb-1">Question</label>
                          <input
                            type="text"
                            required
                            value={newFaqQuestion}
                            onChange={(e) => setNewFaqQuestion(e.target.value)}
                            placeholder="e.g. Do you offer parking validation?"
                            className="w-full px-3 py-2 rounded-lg border border-slate-300"
                          />
                        </div>
                        <div>
                          <label className="block font-semibold text-slate-700 mb-1">Category</label>
                          <select
                            value={newFaqCategory}
                            onChange={(e) =>
                              setNewFaqCategory(
                                e.target.value as 'General' | 'Booking' | 'Treatments'
                              )
                            }
                            className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white"
                          >
                            <option value="General">General</option>
                            <option value="Booking">Booking</option>
                            <option value="Treatments">Treatments</option>
                          </select>
                        </div>
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Detailed Answer</label>
                        <textarea
                          rows={2}
                          required
                          value={newFaqAnswer}
                          onChange={(e) => setNewFaqAnswer(e.target.value)}
                          placeholder="Provide clear, patient-friendly guidance..."
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <button
                        type="submit"
                        className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors cursor-pointer"
                      >
                        Publish FAQ Item
                      </button>
                    </form>
                  </div>

                  {/* Existing FAQs Table */}
                  <div className="bg-white rounded-xl border border-slate-200 p-4 space-y-3 shadow-xs">
                    <h4 className="text-sm font-bold text-slate-900">Live FAQs ({faqs.length} items)</h4>
                    <div className="space-y-2">
                      {faqs.map((f) => (
                        <div
                          key={f.id}
                          className="p-3 rounded-lg border border-slate-100 bg-slate-50/60 flex items-start justify-between gap-4 text-xs"
                        >
                          <div className="space-y-1 flex-1">
                            <span className="inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-200 text-slate-700">
                              {f.category}
                            </span>
                            <p className="font-bold text-slate-900">{f.question}</p>
                            <p className="text-slate-600">{f.answer}</p>
                          </div>
                          <button
                            onClick={() => handleDeleteFaq(f.id)}
                            className="p-1.5 text-rose-500 hover:bg-rose-50 rounded"
                            title="Delete FAQ"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Tab 5: Clinic Settings & Hours */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Clinic Information & Hours
                    </h3>
                    <p className="text-xs text-slate-500">
                      Configure public business details, phone lines, and operating schedule
                    </p>
                  </div>

                  {settingsSaved && (
                    <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold">
                      Clinic settings updated successfully!
                    </div>
                  )}

                  <form
                    onSubmit={handleSaveSettings}
                    className="bg-white p-5 rounded-xl border border-slate-200 space-y-4 text-xs shadow-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Clinic Name</label>
                        <input
                          type="text"
                          value={settingsForm.name}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, name: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Homepage Banner Announcement
                        </label>
                        <input
                          type="text"
                          value={settingsForm.announcement}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, announcement: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Main Phone</label>
                        <input
                          type="text"
                          value={settingsForm.phone}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, phone: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          24/7 Emergency Line
                        </label>
                        <input
                          type="text"
                          value={settingsForm.emergencyPhone}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, emergencyPhone: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
                        <input
                          type="email"
                          value={settingsForm.email}
                          onChange={(e) =>
                            setSettingsForm({ ...settingsForm, email: e.target.value })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">
                          Monday – Friday Hours
                        </label>
                        <input
                          type="text"
                          value={settingsForm.hours.mondayFriday}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              hours: { ...settingsForm.hours, mondayFriday: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Saturday Hours</label>
                        <input
                          type="text"
                          value={settingsForm.hours.saturday}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              hours: { ...settingsForm.hours, saturday: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                      <div>
                        <label className="block font-semibold text-slate-700 mb-1">Sunday Hours</label>
                        <input
                          type="text"
                          value={settingsForm.hours.sunday}
                          onChange={(e) =>
                            setSettingsForm({
                              ...settingsForm,
                              hours: { ...settingsForm.hours, sunday: e.target.value },
                            })
                          }
                          className="w-full px-3 py-2 rounded-lg border border-slate-300"
                        />
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-bold transition-all shadow-md cursor-pointer flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Clinic Settings</span>
                      </button>
                    </div>
                  </form>
                </div>
              )}

              {/* Tab 6: Security Audit Trail */}
              {activeTab === 'audit' && (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 font-display">
                      Security & Administrative Audit Logs
                    </h3>
                    <p className="text-xs text-slate-500">
                      Immutable trail recording all authentication events, status adjustments, and record modifications
                    </p>
                  </div>

                  <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-xs">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 text-slate-600 font-semibold border-b border-slate-200">
                        <tr>
                          <th className="py-2.5 px-3">Timestamp</th>
                          <th className="py-2.5 px-3">Staff / Actor</th>
                          <th className="py-2.5 px-3">Role</th>
                          <th className="py-2.5 px-3">Action</th>
                          <th className="py-2.5 px-3">Target</th>
                          <th className="py-2.5 px-3">Details</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 font-mono text-[11px]">
                        {auditLogsList.map((log) => (
                          <tr key={log.id} className="hover:bg-slate-50">
                            <td className="py-2 px-3 text-slate-400">
                              {new Date(log.timestamp).toLocaleString()}
                            </td>
                            <td className="py-2 px-3 font-semibold text-slate-800 font-sans">
                              {log.userName}
                            </td>
                            <td className="py-2 px-3 text-slate-600 font-sans">{log.userRole}</td>
                            <td className="py-2 px-3 font-bold text-teal-700">{log.action}</td>
                            <td className="py-2 px-3 text-slate-600">{log.target}</td>
                            <td className="py-2 px-3 text-slate-500 font-sans">{log.details}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
