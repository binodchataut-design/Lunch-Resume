/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CoverLetterSandbox } from '../components/CoverLetterSandbox';
import { SEO } from '../components/SEO';
import seoJson from '../../content/seo.json';

export const CoverLetterPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#0F766E0a_1px,transparent_1px)] [background-size:18px_18px] pt-24 pb-20 relative overflow-hidden font-sans text-[#1C2B33]">
      <SEO 
        title={seoJson.coverLetterBuilder.title} 
        description={seoJson.coverLetterBuilder.description} 
        canonical={seoJson.coverLetterBuilder.canonical} 
      />

      {/* Backside soft glowing orbs to enhance the glassmorphic backdrop-blur */}
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-2/4 left-1/3 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ================= SECTION 1: COMPACT INTRO ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 mb-10">
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col items-center justify-center text-center gap-6">
          {/* Decorative interior subtle glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-indigo-500/5 to-transparent rounded-tl-full pointer-events-none" />

          {/* Titles & Display Badge */}
          <div className="space-y-2.5 text-center flex flex-col items-center justify-center relative z-10 w-full">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 backdrop-blur-md text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-500/15 shadow-[0_4px_12px_rgba(16,185,129,0.05)] shrink-0">
                ✉️ COVER LETTER GENERATOR
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#1C2B33] tracking-tight text-center">
              Cover Letter Workspace
            </h1>
            <p className="text-[#46504D] text-xs sm:text-sm max-w-2xl leading-relaxed text-center">
              Draft outcomes-focused cover letters aligned perfectly to your resume branding. Select an industry profile, write custom outcomes, and print your matching PDF file.
            </p>
          </div>
        </div>
      </section>
      
      {/* Cover letter builder */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <CoverLetterSandbox />
      </div>
    </div>
  );
};
