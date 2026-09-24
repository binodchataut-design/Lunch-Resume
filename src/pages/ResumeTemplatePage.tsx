/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ChevronRight, FileText, CheckCircle, Sparkles, HelpCircle } from 'lucide-react';
import TEMPLATE_PAGES from '../../content/templatePages.json';
import { ResumeTemplatePage as ResumeTemplateType } from '../../types/content';
import { SEO } from '../components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '../components/Schema';

const typedTemplates = TEMPLATE_PAGES as ResumeTemplateType[];

export const ResumeTemplatePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const template = typedTemplates.find(t => t.slug === slug);

  const handleBackToArchive = () => {
    navigate('/resume-templates');
    window.scrollTo(0, 0);
  };

  const currentSlug = slug || '';

  // Filter out the current one to show "Related Templates" in the sidebar
  const relatedTemplates = typedTemplates.filter(t => t.slug !== currentSlug);

  if (!template) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 text-center">
        <SEO 
          title="Resume Template Not Found | LunchResume" 
          description="The requested resume layout template could not be found." 
          canonical="https://lunchresume.com/resume-templates" 
        />
        <BreadcrumbSchema 
          items={[
            { name: 'Home', item: 'https://lunchresume.com/' },
            { name: 'Resume Templates', item: 'https://lunchresume.com/resume-templates' },
            { name: 'Not Found', item: 'https://lunchresume.com/resume-templates' }
          ]}
        />
        <h2 className="font-serif text-2xl text-stone-900 mb-4 font-normal">Template layout not found</h2>
        <p className="text-stone-600 mb-6 max-w-md mx-auto text-sm">
          Browse our curated resume template gallery to choose a design optimized for your career tier.
        </p>
        <button 
          onClick={handleBackToArchive}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2a8767] hover:text-[#1d6148] transition-colors"
        >
          <ArrowLeft size={14} /> Back to Resume Templates
        </button>
      </div>
    );
  }

  const canonicalUrl = `https://lunchresume.com/resume-templates/${template.slug}`;

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6">
      <SEO 
        title={template.seoTitle} 
        description={template.seoDescription} 
        canonical={canonicalUrl} 
      />
      <ArticleSchema 
        title={template.seoTitle}
        excerpt={template.seoDescription}
        datePublished="2026-06-21"
        canonicalUrl={canonicalUrl}
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: 'https://lunchresume.com/' },
          { name: 'Resume Templates', item: 'https://lunchresume.com/resume-templates' },
          { name: template.templateName, item: canonicalUrl }
        ]}
      />

      <div className="max-w-4xl mx-auto">
        {/* Back Link */}
        <button 
          onClick={handleBackToArchive}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#2a8767] hover:text-[#1d6148] transition-colors mb-6 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Templates
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Analysis Block */}
          <div className="lg:col-span-2 space-y-8 text-left">
            <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
              {/* Heading */}
              <div className="border-b border-stone-100 pb-6 mb-6">
                <span className="text-[10px] font-mono font-bold text-[#2a8767] bg-[#8cfbd4]/10 border border-[#8cfbd4]/20 px-2.5 py-1 rounded-md uppercase">
                  Layout Blueprint
                </span>
                <h1 className="font-serif text-3xl sm:text-4xl text-stone-900 mt-3 font-normal">
                  {template.templateName} Analysis
                </h1>
                <p className="text-stone-500 text-xs font-mono mt-1">
                  100% PARSEABLE CHRONOLOGICAL DESIGN blueprint
                </p>
              </div>

              {/* Dynamic Metadata Fields */}
              <div className="space-y-6">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-950 mb-1">Empirical Best Use</h3>
                  <p className="text-stone-600 text-sm leading-relaxed">
                    {template.bestFor}
                  </p>
                </div>

                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-950 mb-2">Architectural Description</h3>
                  <p className="text-stone-650 text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Key Strengths */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-950 mb-3 flex items-center gap-2">
                    <Sparkles size={16} className="text-[#3ea884]" />
                    Design Strengths & Advantages
                  </h3>
                  <div className="space-y-3">
                    {template.strengths.map((strength, index) => (
                      <div key={index} className="flex gap-2.5 items-start text-sm bg-stone-50 p-3.5 rounded-xl border border-stone-200/40">
                        <CheckCircle size={16} className="text-[#3ea884] shrink-0 mt-0.5" />
                        <span className="text-stone-700 leading-relaxed">{strength}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Advised Industries */}
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-950 mb-2.5">
                    Recommended Industry Sectors
                  </h3>
                  <p className="text-stone-500 text-xs mb-3">
                    Candidates applying to these highly competitive disciplines report superior call-back percentages with this specific template structure:
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {template.recommendedIndustries.map((ind, index) => (
                      <span 
                        key={index}
                        className="text-stone-800 bg-[#edf8fc] border border-[#d1effa] px-3.5 py-1.5 rounded-xl text-xs font-mono"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* CTA Option: REQUIREMENT 8 - Use This Template (Opens builder with template pre-selected) */}
            <div className="bg-[#2a8767] text-white border border-[#237055] rounded-2xl p-8 shadow-md">
              <h3 className="font-serif text-2xl mb-1 font-normal">Ready to use this blueprint?</h3>
              <p className="text-emerald-100 text-xs sm:text-sm mb-6 max-w-xl">
                Open our interactive workspace with the <strong className="text-white">{template.templateName}</strong> preset fully pre-selected, loaded, and ready to export.
              </p>
              <button 
                onClick={() => {
                  navigate(`/resume-builder?template=${template.slug}`);
                  window.scrollTo(0, 0);
                }}
                className="inline-flex items-center gap-2 bg-white text-stone-900 hover:bg-stone-100 font-mono text-xs font-extrabold px-6 py-3.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer uppercase tracking-wider"
              >
                Use This Template Design <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Right Sidebar: Related Templates & Info SUMMARY */}
          <div className="space-y-6 text-left">
            {/* REQUIREMENT 9 - Related Templates Section */}
            <div className="bg-stone-50 border border-stone-200/80 rounded-2xl p-6">
              <h3 className="font-serif text-md font-bold text-stone-900 mb-4 pb-2 border-b border-stone-200">
                Related Design Layouts
              </h3>
              <div className="space-y-4">
                {relatedTemplates.map((rel) => (
                  <div 
                    key={rel.slug}
                    onClick={() => {
                      navigate(`/resume-templates/${rel.slug}`);
                      window.scrollTo(0, 0);
                    }}
                    className="group cursor-pointer block p-3.5 bg-white border border-stone-200 hover:border-[#3ea884] rounded-xl transition-all"
                  >
                    <div className="text-[9px] font-mono font-bold text-stone-400 group-hover:text-[#3ea884] uppercase mb-1">
                      BEST FOR CEOS & PROS
                    </div>
                    <h4 className="text-sm font-semibold text-stone-800 group-hover:text-stone-950 flex items-center justify-between">
                      <span className="flex items-center gap-1.5">
                        <FileText size={13} className="text-stone-400 group-hover:text-[#3ea884]" />
                        {rel.templateName}
                      </span>
                      <ChevronRight size={13} className="text-stone-300 group-hover:text-stone-500" />
                    </h4>
                  </div>
                ))}
              </div>
            </div>

            {/* Informational sidebar box */}
            <div className="bg-white border border-stone-200 rounded-2xl p-6 text-xs text-stone-500 space-y-3">
              <h4 className="font-mono font-bold text-stone-800 uppercase tracking-wider flex items-center gap-1.5 mb-1">
                <HelpCircle size={13} className="text-stone-400" /> FAQ: Dynamic Presets
              </h4>
              <p>
                <strong>Is my draft secure?</strong> Yes. All resume configurations are preserved directly in your sandbox layout inside browser memory. 100% database-isolated and paywall-free.
              </p>
              <p>
                <strong>Can I shift templates mid-draft?</strong> Yes! Open the builder and easily shift styles on the fly, immediately preserving your custom writing achievements.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
