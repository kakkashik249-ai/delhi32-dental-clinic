import React, { useState } from 'react';
import { BookOpen, Clock, User, ArrowRight, X, Sparkles } from 'lucide-react';
import { BlogPost } from '../../types/dental';

interface BlogSectionProps {
  posts: BlogPost[];
  onOpenBooking: () => void;
}

export const BlogSection: React.FC<BlogSectionProps> = ({ posts, onOpenBooking }) => {
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = [
    { id: 'all', label: 'All Articles' },
    { id: 'Preventive', label: 'Preventive' },
    { id: 'Treatment Guides', label: 'Treatment Guides' },
    { id: 'Post-Care', label: 'Post-Op Care' },
    { id: 'Pediatric', label: 'Pediatric Care' },
  ];

  const filtered = posts.filter((post) => {
    const matchCat = activeCategory === 'all' || post.category === activeCategory;
    const matchSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <section id="blog" className="py-20 bg-white border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-teal-50 border border-teal-200 text-teal-800 text-xs font-semibold">
            <BookOpen className="w-3.5 h-3.5 text-teal-600" />
            <span>Dental Health Education</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 font-display tracking-tight">
            Oral Health Guides & Clinical Advice
          </h2>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Written by our specialist dentists to empower patients with evidence-based dental facts.
          </p>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                  activeCategory === cat.id
                    ? 'bg-slate-900 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search clinical articles..."
            className="w-full sm:w-64 px-3.5 py-2 rounded-xl border border-slate-200 text-xs focus:ring-2 focus:ring-teal-500/20 focus:border-teal-500"
          />
        </div>

        {/* Blog Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map((post) => (
            <div
              key={post.id}
              onClick={() => setSelectedPost(post)}
              className="bg-white rounded-2xl border border-slate-200/90 overflow-hidden shadow-xs hover:shadow-md hover:border-teal-300 transition-all duration-300 flex flex-col cursor-pointer group"
            >
              <div className="h-44 w-full overflow-hidden relative">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md text-[10px] font-bold bg-white/90 text-slate-800 shadow-xs uppercase">
                  {post.category}
                </span>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                <div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-400 mb-1.5">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {post.readTime}
                    </span>
                    <span>·</span>
                    <span>{post.publishedDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-teal-700 transition-colors font-display line-clamp-2">
                    {post.title}
                  </h3>

                  <p className="text-slate-600 text-xs mt-2 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-[11px]">
                    <span className="font-semibold text-slate-800 block">{post.author}</span>
                    <span className="text-slate-400 text-[10px]">{post.authorRole}</span>
                  </div>
                  <span className="text-teal-600 group-hover:translate-x-1 transition-transform">
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Article Reader Modal */}
        {selectedPost && (
          <div
            className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6 animate-fadeIn"
            onClick={() => setSelectedPost(null)}
          >
            <div
              className="relative max-w-3xl w-full bg-white rounded-2xl overflow-hidden shadow-2xl max-h-[90vh] flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-56 sm:h-64 w-full shrink-0">
                <img
                  src={selectedPost.image}
                  alt={selectedPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/50 to-transparent" />
                <button
                  onClick={() => setSelectedPost(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-900/60 text-white hover:bg-slate-900 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
                  <span className="px-2.5 py-0.5 rounded text-[11px] font-bold bg-teal-500 uppercase">
                    {selectedPost.category}
                  </span>
                  <h3 className="text-xl sm:text-2xl font-bold font-display">{selectedPost.title}</h3>
                  <p className="text-xs text-slate-300">
                    By {selectedPost.author} ({selectedPost.authorRole}) · {selectedPost.publishedDate}
                  </p>
                </div>
              </div>

              <div className="p-6 sm:p-8 overflow-y-auto space-y-4 text-slate-700 text-sm leading-relaxed flex-1">
                {selectedPost.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}

                <div className="p-4 rounded-xl bg-teal-50 border border-teal-200 mt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-teal-900">
                    <p className="font-bold">Have questions regarding this topic?</p>
                    <p className="text-teal-700">Schedule a personalized consultation with our authors.</p>
                  </div>
                  <button
                    onClick={() => {
                      setSelectedPost(null);
                      onOpenBooking();
                    }}
                    className="px-4 py-2 rounded-xl bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold transition-colors whitespace-nowrap shadow-xs"
                  >
                    Book Consultation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
