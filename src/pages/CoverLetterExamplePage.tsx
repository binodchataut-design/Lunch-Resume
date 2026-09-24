/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Mail, Sparkles, Building, ListTodo, FileText } from 'lucide-react';
import COVER_LETTER_EXAMPLES from '../../content/coverLetterExamples.json';
import { CoverLetterExample } from '../../types/content';
import { SEO } from '../components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '../components/Schema';

const typedLetterExamples = COVER_LETTER_EXAMPLES as CoverLetterExample[];

export const CoverLetterExamplePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const example = typedLetterExamples.find(ex => ex.slug === slug);

  const handleBackToArchive = () => {
    navigate('/cover-letter-examples');
    window.scrollTo(0, 0);
  };

  const currentSlug = slug || '';

  // Requirement 8: Related Cover Letter Examples
  const relatedExamples = typedLetterExamples.filter(ex => ex.slug !== currentSlug);

  if (!example) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 text-center">
        <SEO 
          title="Cover Letter Example Not Found | LunchResume" 
          description="The requested cover letter example could not be found." 
          canonical="https://lunchresume.com/cover-letter-examples" 
        />
        <BreadcrumbSchema 
          items={[
            { name: 'Home', item: 'https://lunchresume.com/' },
            { name: 'Cover Letter Examples', item: 'https://lunchresume.com/cover-letter-examples' },
            { name: 'Not Found', item: 'https://lunchresume.com/cover-letter-examples' }
          ]}
        />
        <h2 className="font-serif text-2xl text-stone-900 mb-4 font-normal">Cover Letter not found</h2>
        <p className="text-stone-600 mb-6 max-w-md mx-auto text-sm">
          We could not locate the requested industry profile cover letter. Browse our archive to see all templates.
        </p>
        <button 
          onClick={handleBackToArchive}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2a8767] hover:text-[#1d6148] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Cover Letter Archive
        </button>
      </div>
    );
  }

  const canonicalUrl = `https://lunchresume.com/cover-letter-examples/${example.slug}`;

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#0F766E0a_1px,transparent_1px)] [background-size:18px_18px] pt-24 pb-20 relative overflow-hidden font-sans text-[#1C2B33]">
      <SEO 
        title={example.seoTitle} 
        description={example.seoDescription} 
        canonical={canonicalUrl} 
      />
      <ArticleSchema 
        title={example.seoTitle}
        excerpt={example.seoDescription}
        datePublished="2026-06-21"
        canonicalUrl={canonicalUrl}
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: 'https://lunchresume.com/' },
          { name: 'Cover Letter Examples', item: 'https://lunchresume.com/cover-letter-examples' },
          { name: example.jobTitle, item: canonicalUrl }
        ]}
      />

      {/* Backside soft glowing orbs to enhance the glassmorphic backdrop-blur */}
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-2/4 left-1/3 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Back Link */}
        <button 
          onClick={handleBackToArchive}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#0F766E] hover:text-[#0D5C56] transition-all duration-300 transform active:scale-95 hover:translate-x-[-2px] mb-8 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Archive
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Draft Outline */}
          <div className="lg:col-span-2 space-y-8 text-left">
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/85 rounded-3xl p-6 sm:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden">
              {/* Decorative subtle glass effect glow */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/5 to-transparent rounded-bl-full pointer-events-none" />

              {/* Profile Header */}
              <div className="border-b border-[#E2E8E6] pb-6 mb-6">
                <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-emerald-500/10 backdrop-blur-md text-emerald-800 text-[10px] font-bold rounded-full border border-emerald-500/15 shadow-[0_4px_12px_rgba(16,185,129,0.05)]">
                  {example.industry}
                </div>
                <h1 className="font-serif text-3xl sm:text-4xl text-[#1C2B33] font-black tracking-tight leading-tight">
                  {example.jobTitle} Cover Letter
                </h1>
                <p className="text-emerald-700 text-[10px] font-mono font-bold tracking-wider mt-2.5 bg-emerald-500/5 py-1 px-2.5 rounded-md inline-block">
                  CALIBRATED ATS PHRASINGS & OUTLINES
                </p>
              </div>

              {/* Dynamic Letter Sections */}
              <div className="space-y-6">
                {/* Introduction Paragraph */}
                <div>
                  <h3 className="font-serif text-lg font-black text-[#1C2B33] mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#0F766E]" />
                    The Hook (Introductory Paragraph)
                  </h3>
                  <p className="text-[#46504D] text-xs sm:text-sm leading-relaxed bg-white/30 backdrop-blur-md p-5 rounded-2xl border border-stone-200/40 shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
                    {example.introduction}
                  </p>
                </div>

                {/* Body Paragraphs */}
                <div>
                  <h3 className="font-serif text-lg font-black text-[#1C2B33] mb-3 flex items-center gap-2">
                    <Building size={16} className="text-[#0F766E]/75" />
                    Value Propositions (Body Paragraphs)
                  </h3>
                  <div className="space-y-3.5 bg-white/20 backdrop-blur-xs p-5 rounded-2xl border border-stone-200/20">
                    {example.bodyParagraphs.map((para, index) => (
                      <div key={index} className="flex gap-3 text-xs sm:text-sm items-start">
                        <span className="text-[#0F766E] font-bold font-mono text-xs mt-0.5">0{index + 1}.</span>
                        <p className="text-[#46504D] leading-relaxed">{para}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Key Strengths Matrix */}
                <div>
                  <h3 className="font-serif text-lg font-black text-[#1C2B33] mb-2 flex items-center gap-2">
                    <ListTodo size={16} className="text-[#0F766E]/75" />
                    Target Accomplishments List
                  </h3>
                  <p className="text-[#46504D] text-xs mb-3.5 leading-relaxed">
                    Bypass applicant screening filters by strategically weaving these key milestones into your narrative:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {example.keyStrengths.map((strength, index) => (
                      <span 
                        key={index}
                        className="text-[#1C2B33] bg-white/50 border border-[#E2E8E6] px-3 py-1 rounded-xl text-xs font-mono shadow-xs hover:border-emerald-500/30 transition-colors"
                      >
                        {strength}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Closing Paragraph */}
                <div>
                  <h3 className="font-serif text-lg font-black text-[#1C2B33] mb-3 flex items-center gap-2">
                    <Mail size={16} className="text-[#0F766E]/75" />
                    The Close (Call to Action)
                  </h3>
                  <p className="text-[#46504D] text-xs sm:text-sm leading-relaxed p-5 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                    {example.closingParagraph}
                  </p>
                </div>
              </div>
            </div>

            {/* CTA Option: REQUIREMENT 10 - Create Your Cover Letter opens the Cover Letter Builder */}
            <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-[0_15px_35px_rgba(15,118,110,0.04)] overflow-hidden">
              <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-full pointer-events-none" />
              
              <div className="text-center sm:text-left z-10">
                <h4 className="font-serif text-lg font-black text-[#1C2B33] tracking-tight">Deploy this cover letter style today</h4>
                <p className="text-[#46504D] text-xs mt-1">
                  Adjust, customize and export this layout instantly inside our secured builder workspace.
                </p>
              </div>
              <button
                onClick={() => {
                  navigate(`/cover-letter-builder?template=${example.slug}`);
                  window.scrollTo(0, 0);
                }}
                className="relative overflow-hidden group px-6 py-3 rounded-full font-sans font-bold text-[11px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-white border border-teal-500/20 shadow-[0_12px_25px_-4px_rgba(15,118,110,0.3)] bg-gradient-to-r from-teal-800 via-[#0F766E] to-emerald-700 hover:from-teal-700 hover:to-emerald-600 whitespace-nowrap z-10"
              >
                Create Your Cover Letter
              </button>
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="space-y-6 text-left">
            {/* Requirement 9: Cross-linking (Resume Example ↔ Cover Letter Example) */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              <h3 className="font-serif text-md font-black text-[#1C2B33] mb-3 pb-2 border-b border-[#E2E8E6] tracking-tight">
                Matching Resume Layouts
              </h3>
              <p className="text-[#46504D] text-xs mb-4 leading-relaxed">
                Verify absolute alignment by pairing this letter draft with its custom chronological resume standard:
              </p>
              <div 
                onClick={() => {
                  navigate(`/resume-examples/${example.slug}`);
                  window.scrollTo(0, 0);
                }}
                className="group cursor-pointer block p-3.5 bg-white/50 border border-[#E2E8E6] hover:border-emerald-500/30 hover:bg-white/85 rounded-2xl transition-all shadow-xs"
              >
                <div className="text-[9px] font-mono font-bold text-[#0F766E] uppercase mb-1 transition-colors">
                  Active Pairing
                </div>
                <h4 className="text-xs font-bold text-[#1C2B33] group-hover:text-emerald-850 flex items-center justify-between transition-colors">
                  <span className="flex items-center gap-1.5 leading-snug">
                    <FileText size={13} className="text-[#0F766E]/60 group-hover:text-[#0F766E] transition-colors" />
                    {example.jobTitle} Resume
                  </span>
                  <ChevronRight size={13} className="text-stone-300 group-hover:text-stone-500 transition-colors" />
                </h4>
              </div>
            </div>

            {/* Requirement 8: Related Cover Letter Examples */}
            <div className="bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-6 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
              <h3 className="font-serif text-md font-black text-[#1C2B33] mb-4 pb-2 border-b border-[#E2E8E6] tracking-tight">
                Related Cover Letters
              </h3>
              <div className="space-y-3.5">
                {relatedExamples.map((ex) => (
                  <div 
                    key={ex.slug}
                    onClick={() => {
                      navigate(`/cover-letter-examples/${ex.slug}`);
                      window.scrollTo(0, 0);
                    }}
                    className="group cursor-pointer block p-3.5 bg-white/50 border border-[#E2E8E6] hover:border-emerald-500/30 hover:bg-white/85 rounded-2xl transition-all shadow-xs"
                  >
                    <div className="text-[9px] font-mono font-bold text-stone-400 group-hover:text-[#0F766E] uppercase mb-1 transition-colors">
                      {ex.industry}
                    </div>
                    <h4 className="text-xs font-bold text-[#1C2B33] group-hover:text-emerald-850 flex items-center justify-between transition-colors">
                      <span className="flex items-center gap-1.5 leading-snug">
                        <Mail size={13} className="text-[#0F766E]/60 group-hover:text-[#0F766E] transition-colors" />
                        {ex.jobTitle}
                      </span>
                      <ChevronRight size={13} className="text-stone-300 group-hover:text-stone-500 transition-colors" />
                    </h4>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
