/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import RESUME_EXAMPLES from '../../content/resumeExamples.json';
import { ResumeExample } from '../../types/content';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/Schema';

const typedResumeExamples = RESUME_EXAMPLES as ResumeExample[];

export const ResumeExamplesIndexPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#0F766E0a_1px,transparent_1px)] [background-size:18px_18px] pt-24 pb-20 relative overflow-hidden font-sans text-[#1C2B33]">
      <SEO 
        title="ATS-Calibrated Resume Examples Library | LunchResume" 
        description="Explore our archive of professionally written resume examples tailored for competitive industries like tech, healthcare, and finance. Completely free of paywalls." 
        canonical="https://lunchresume.com/resume-examples" 
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: 'https://lunchresume.com/' },
          { name: 'Resume Examples', item: 'https://lunchresume.com/resume-examples' }
        ]}
      />

      {/* Backside soft glowing orbs to enhance the glassmorphic backdrop-blur */}
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-2/4 left-1/3 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ================= SECTION 1: COMPACT INTRO ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2 mb-16">
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col items-center justify-center text-center gap-6">
          {/* Decorative interior subtle glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-indigo-500/5 to-transparent rounded-tl-full pointer-events-none" />

          {/* Titles & Display Badge */}
          <div className="space-y-2.5 text-center flex flex-col items-center justify-center relative z-10 w-full">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-500/10 backdrop-blur-md text-emerald-800 text-[11px] font-bold rounded-full border border-emerald-500/15 shadow-[0_4px_12px_rgba(16,185,129,0.05)] shrink-0">
                💼 RESUME ARCHIVE
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-serif font-black text-[#1C2B33] tracking-tight text-center">
              Recruiter-Calibrated Resume Examples
            </h1>
            <p className="text-[#46504D] text-xs sm:text-sm max-w-2xl leading-relaxed text-center">
              Unlock high-converting, ATS-parseable resumes. Analyze structure, spacing priorities, and numbers-driven statements crafted specifically for your target industry.
            </p>
          </div>
        </div>
      </section>

      {/* Grid listing */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {typedResumeExamples.map((example, idx) => {
            let glassStyle = {
              glow: "from-emerald-500/12 to-transparent/5",
              borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
              glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.03)]",
              badgeClass: "text-emerald-700 bg-emerald-500/10 border-emerald-500/15",
              buttonBg: "from-emerald-500/8 via-emerald-600/5 to-teal-500/8 hover:from-emerald-500/20 hover:to-teal-500/20 border-white/60 hover:border-emerald-500/30 text-emerald-800 hover:text-emerald-900",
              hoverGlowShadow: "rgba(16, 185, 129, 0.15)"
            };

            if (idx % 3 === 1) {
              glassStyle = {
                glow: "from-indigo-500/12 to-transparent/5",
                borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.03)]",
                badgeClass: "text-indigo-700 bg-indigo-500/10 border-indigo-500/15",
                buttonBg: "from-indigo-500/8 via-indigo-600/5 to-violet-500/8 hover:from-indigo-500/20 hover:to-violet-500/20 border-white/60 hover:border-indigo-500/30 text-indigo-800 hover:text-indigo-900",
                hoverGlowShadow: "rgba(99, 102, 241, 0.15)"
              };
            } else if (idx % 3 === 2) {
              glassStyle = {
                glow: "from-violet-500/12 to-transparent/5",
                borderColor: "border-violet-500/15 group-hover:border-violet-500/40",
                glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(139,92,246,0.03)]",
                badgeClass: "text-violet-700 bg-violet-500/10 border-violet-500/15",
                buttonBg: "from-violet-500/8 via-violet-600/5 to-purple-500/8 hover:from-violet-500/20 hover:to-purple-500/20 border-white/60 hover:border-violet-500/30 text-violet-800 hover:text-violet-900",
                hoverGlowShadow: "rgba(139, 92, 246, 0.15)"
              };
            }

            return (
              <motion.div 
                key={example.slug}
                initial={{ opacity: 0, scale: 0.96, y: 25 }}
                whileInView={{ opacity: 1, scale: 1, y: 0 }}
                whileHover={{ 
                  y: -6, 
                  scale: 1.02,
                  boxShadow: `0 20px 40px -15px ${glassStyle.hoverGlowShadow}`,
                }}
                viewport={{ once: true, margin: "-40px" }}
                onClick={() => {
                  navigate(`/resume-examples/${example.slug}`);
                  window.scrollTo(0, 0);
                }}
                className={`text-left p-6.5 rounded-3xl border ${glassStyle.glassBg} ${glassStyle.borderColor} backdrop-blur-md transition-all duration-300 group flex flex-col justify-between min-h-[260px] relative overflow-hidden cursor-pointer`}
              >
                {/* Inner crystal reflection / shine effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/18 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Gradient subtle glow */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glassStyle.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125 pointer-events-none`} />

                <div className="space-y-4 flex-1 flex flex-col">
                  {/* Category & Badge */}
                  <div className="flex justify-between items-center w-full">
                    <span className="inline-block px-2.5 py-1 bg-emerald-500/10 text-emerald-800 text-[10px] font-black rounded-lg uppercase tracking-wider">
                      {example.industry}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-serif text-[18px] md:text-[20px] font-black text-[#1C2B33] leading-tight group-hover:text-emerald-850 transition-colors flex items-center gap-2">
                    <FileText size={18} className="text-[#0F766E]/60 group-hover:text-[#0F766E] transition-colors shrink-0" />
                    <span>{example.jobTitle}</span>
                  </h3>

                  {/* Summary */}
                  <p className="text-[#46504D] text-[12.5px] leading-relaxed line-clamp-3">
                    {example.summary}
                  </p>
                </div>

                {/* Button container */}
                <div className="mt-6 pt-4 border-t border-stone-200/20">
                  <div className={`inline-flex items-center gap-1.5 text-xs font-bold font-mono uppercase tracking-wider text-left transition-all duration-300 group-hover:translate-x-1 ${idx % 3 === 0 ? 'text-[#0F766E]' : idx % 3 === 1 ? 'text-indigo-700' : 'text-violet-700'}`}>
                    <span>Analyze Template</span>
                    <ChevronRight size={14} className="group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Call to action section to flow back into system */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-8 text-center shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden">
          {/* Decorative subtle glows */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-indigo-500/5 to-transparent rounded-tl-full pointer-events-none" />

          <h3 className="font-serif text-2xl font-black text-[#1C2B33] mb-2 tracking-tight">Need to construct your own custom resume?</h3>
          <p className="text-[#46504D] text-xs sm:text-sm mb-6 max-w-xl mx-auto leading-relaxed">
            Our browser-sandboxed interactive sandbox helps you construct fully ATS-parseable templates instantly. Zero signup or email required.
          </p>
          <button
            onClick={() => {
              navigate('/resume-builder');
              window.scrollTo(0, 0);
            }}
            className="relative overflow-hidden group px-8 py-3.5 rounded-full font-sans font-bold text-[12px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-white border border-teal-500/20 shadow-[0_12px_25px_-4px_rgba(15,118,110,0.3)] bg-gradient-to-r from-teal-800 via-[#0F766E] to-emerald-700 hover:from-teal-700 hover:to-emerald-600 inline-flex items-center gap-2"
          >
            Open Resume Builder <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
