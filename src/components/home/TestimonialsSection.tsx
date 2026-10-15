import React, { useState } from 'react';
import { Star, ShieldCheck, MessageSquare, Plus, CheckCircle2 } from 'lucide-react';
import { Testimonial } from '../../types/dental';
import { submitTestimonial } from '../../services/api';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  onRefresh: () => void;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  onRefresh,
}) => {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [patientName, setPatientName] = useState('');
  const [treatmentName, setTreatmentName] = useState('Comprehensive Dental Care');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName.trim() || !comment.trim()) return;

    setSubmitting(true);
    try {
      await submitTestimonial({
        patientName,
        treatmentName,
        rating,
        comment,
      });
      setSubmitted(true);
      onRefresh();
      setTimeout(() => {
        setSubmitted(false);
        setShowReviewForm(false);
        setPatientName('');
        setComment('');
      }, 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="testimonials" className="py-20 bg-slate-50 border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12">
          <div className="space-y-3 max-w-2xl">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-teal-50 border border-teal-200 text-teal-800 uppercase tracking-wider">
              Patient Testimonials
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
              Genuine Experiences from Our Dental Family
            </h2>
            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Read authentic feedback from patients who trusted us for restorative, cosmetic,
              and pediatric dentistry.
            </p>
          </div>

          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-800 text-xs font-semibold shadow-xs transition-colors self-start md:self-auto cursor-pointer"
          >
            <Plus className="w-4 h-4 text-teal-600" />
            <span>Share Your Patient Experience</span>
          </button>
        </div>

        {/* Submit Review Form */}
        {showReviewForm && (
          <div className="mb-12 bg-white rounded-2xl border border-teal-200 p-6 shadow-md max-w-xl mx-auto animate-slideDown">
            {submitted ? (
              <div className="text-center py-6 space-y-2">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-slate-900">Thank You for Your Feedback!</h4>
                <p className="text-xs text-slate-600">
                  Your review has been recorded and submitted to our coordinator.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmitReview} className="space-y-4 text-xs">
                <h4 className="text-sm font-bold text-slate-900">Submit Your Patient Feedback</h4>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      placeholder="e.g. Rachel K."
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Treatment Received</label>
                    <input
                      type="text"
                      required
                      value={treatmentName}
                      onChange={(e) => setTreatmentName(e.target.value)}
                      placeholder="e.g. Porcelain Veneers"
                      className="w-full px-3 py-2 rounded-lg border border-slate-300"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Star Rating (1 - 5)</label>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        type="button"
                        key={num}
                        onClick={() => setRating(num)}
                        className="p-1 text-amber-400 hover:scale-110 transition-transform"
                      >
                        <Star
                          className={`w-5 h-5 ${num <= rating ? 'fill-amber-400' : 'text-slate-300'}`}
                        />
                      </button>
                    ))}
                    <span className="text-slate-600 font-bold ml-2">{rating} Stars</span>
                  </div>
                </div>

                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Your Feedback</label>
                  <textarea
                    rows={3}
                    required
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Describe your appointment, comfort level, and results..."
                    className="w-full px-3 py-2 rounded-lg border border-slate-300"
                  />
                </div>

                <div className="flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setShowReviewForm(false)}
                    className="px-3 py-1.5 rounded-lg text-slate-600 hover:bg-slate-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="px-4 py-1.5 rounded-lg bg-teal-600 hover:bg-teal-700 text-white font-bold transition-colors disabled:opacity-50"
                  >
                    {submitting ? 'Submitting...' : 'Post Testimonial'}
                  </button>
                </div>
              </form>
            )}
          </div>
        )}

        {/* Testimonial Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className="bg-white rounded-2xl border border-slate-200/90 p-6 shadow-xs flex flex-col justify-between space-y-4 hover:shadow-md transition-shadow"
            >
              <div className="space-y-3">
                {/* Rating Stars */}
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < t.rating ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                      }`}
                    />
                  ))}
                </div>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900">{t.patientName}</h4>
                  <p className="text-[11px] text-teal-700 font-medium">{t.treatmentName}</p>
                </div>

                {t.verifiedPatient && (
                  <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200/60">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    Verified
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
