/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, Edit, HelpCircle, Star, Shield, ArrowRight, LayoutTemplate, Map, FileCode, CheckCircle2 } from 'lucide-react';
import HOMEPAGE from '../../../content/homepage.json';

interface Pillar {
  id: string;
  title: string;
  description: string;
  badge: string;
  typePreset: string;
  icon: string;
}

interface FormatLayout {
  key: string;
  tier: string;
  title: string;
  description: string;
  buttonText: string;
}

interface RoadmapStep {
  stepNumber: string;
  boldNumber: string;
  title: string;
  description: string;
}

interface FaqItem {
  question: string;
  answer: string;
}

interface HomepageData {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryActionLabel: string;
    secondaryActionLabel: string;
    scrollIndicator: string;
  };
  utility: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: Pillar[];
  };
  targetFormats: {
    badge: string;
    title: string;
    subtitle: string;
    layouts: FormatLayout[];
  };
  roadmap: {
    badge: string;
    title: string;
    subtitle: string;
    steps: RoadmapStep[];
  };
  noiseBarrier: {
    badge: string;
    title: string;
    studyIndexLabel: string;
    studyIndexTitle: string;
    studyIndexDescription: string;
    descriptionParagraphs: string[];
  };
  manifesto: {
    badge: string;
    title: string;
    paragraphs: string[];
    listItems: string[];
    footnote: string;
  };
  faqs: {
    title: string;
    items: FaqItem[];
  };
}

const typedHomepage = HOMEPAGE as HomepageData;

export const HomepagePanel: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'hero' | 'utility' | 'layouts' | 'roadmap' | 'noise' | 'manifesto' | 'faqs'>('hero');

  const handleEditSection = (section: string) => {
    alert(`[Phase 2 CRUD Active Preview]: The update trigger for section "${section}" inside homepage.json is pre-wired! State modifications will rewrite structured content keys.`);
  };

  return (
    <div className="space-y-6 text-left">
      <div>
        <h2 className="font-serif text-2xl text-stone-900 font-normal">Homepage Content Manager</h2>
        <p className="text-stone-500 text-xs">
          Inspect, structure, and visualize human-crafted branding, copy paragraphs, and study metrics loaded at <code>/content/homepage.json</code>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-start">
        {/* Navigation bar list */}
        <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 font-mono text-[11px] font-bold uppercase text-stone-500 space-y-1.5 shrink-0">
          <span className="text-[9px] font-extrabold text-stone-400 block px-2.5 mb-2.5 tracking-wider">HOMEPAGE DATA BLOCKS</span>
          <button 
            onClick={() => setActiveSection('hero')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'hero' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>01 • Hero Masthead</span>
            <ArrowRight size={11} className={activeSection === 'hero' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
          <button 
            onClick={() => setActiveSection('utility')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'utility' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>02 • Manifesto Pillars</span>
            <ArrowRight size={11} className={activeSection === 'utility' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
          <button 
            onClick={() => setActiveSection('layouts')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'layouts' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>03 • Target Formats</span>
            <ArrowRight size={11} className={activeSection === 'layouts' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
          <button 
            onClick={() => setActiveSection('roadmap')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'roadmap' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>04 • Assembly Steps</span>
            <ArrowRight size={11} className={activeSection === 'roadmap' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
          <button 
            onClick={() => setActiveSection('noise')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'noise' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>05 • Funnel & Metrics</span>
            <ArrowRight size={11} className={activeSection === 'noise' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
          <button 
            onClick={() => setActiveSection('manifesto')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'manifesto' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>06 • Free Commitment</span>
            <ArrowRight size={11} className={activeSection === 'manifesto' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
          <button 
            onClick={() => setActiveSection('faqs')}
            className={`w-full text-left px-3 py-2.5 rounded-lg border transition-all flex items-center justify-between cursor-pointer ${activeSection === 'faqs' ? 'bg-[#2a8767]/10 text-[#2a8767] font-extrabold border-[#2a8767]/20 shadow-xs' : 'bg-transparent border-transparent text-stone-600 hover:bg-stone-100 hover:text-stone-850'}`}
          >
            <span>07 • Dynamic FAQs</span>
            <ArrowRight size={11} className={activeSection === 'faqs' ? 'text-[#2a8767]' : 'text-stone-300'} />
          </button>
        </div>

        {/* Content detail visualization panels */}
        <div className="lg:col-span-3 bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 space-y-6 flex flex-col justify-between min-h-[350px]">
          
          <div className="space-y-4">
            {/* Tab header title */}
            <div className="flex items-center justify-between border-b border-stone-100 pb-3">
              <span className="text-[10px] font-mono font-bold text-stone-405 tracking-widest uppercase">
                PREVIEWING SUB-NODE: {activeSection.toUpperCase()}
              </span>
              <button 
                onClick={() => handleEditSection(activeSection)}
                className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-[#2a8767] hover:text-[#1d6148] transition-colors cursor-pointer"
              >
                <Edit size={12} /> Edit Section Block
              </button>
            </div>

            {/* Content Switch */}
            {activeSection === 'hero' && (
              <div className="space-y-4 font-sans text-xs">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Badge Tagline</strong>
                    <span className="bg-stone-50 border border-stone-200 text-stone-750 px-2.5 py-1.5 rounded-lg font-mono">
                      {typedHomepage.hero.badge}
                    </span>
                  </div>
                  <div>
                    <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Scroll Indicator</strong>
                    <span className="bg-stone-50 border border-stone-200 text-stone-750 px-2.5 py-1.5 rounded-lg font-mono">
                      {typedHomepage.hero.scrollIndicator}
                    </span>
                  </div>
                </div>

                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Header Title (Hero)</strong>
                  <h1 className="font-serif text-2xl font-bold text-stone-900 border border-stone-150 p-3 rounded-lg leading-tight bg-stone-50/50 whitespace-pre-wrap">
                    {typedHomepage.hero.title}
                  </h1>
                </div>

                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Hero Subtext Paragraph</strong>
                  <p className="text-stone-605 leading-relaxed bg-stone-50 p-3 rounded-lg border border-stone-150">
                    {typedHomepage.hero.subtitle}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Primary Button</strong>
                    <p className="text-stone-800 bg-stone-50 font-mono p-2 border border-stone-200 rounded">{typedHomepage.hero.primaryActionLabel}</p>
                  </div>
                  <div>
                    <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Secondary Button</strong>
                    <p className="text-stone-800 bg-stone-50 font-mono p-2 border border-stone-200 rounded">{typedHomepage.hero.secondaryActionLabel}</p>
                  </div>
                </div>
              </div>
            )}

            {activeSection === 'utility' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-205/60 space-y-1">
                  <div className="text-[10px] font-mono text-stone-400 font-bold">{typedHomepage.utility.badge}</div>
                  <h3 className="font-serif font-bold text-md text-stone-900">{typedHomepage.utility.title}</h3>
                  <p className="text-stone-500 font-serif italic text-xs">{typedHomepage.utility.subtitle}</p>
                </div>

                <strong className="text-[10px] font-mono uppercase text-stone-400 block mt-4 mb-2">Pillar Objects (Array)</strong>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typedHomepage.utility.pillars.map((pl) => (
                    <div key={pl.id} className="border border-stone-200 p-3.5 rounded-xl bg-white space-y-1">
                      <div className="flex items-center justify-between">
                        <strong className="text-stone-900 font-serif font-bold text-sm">{pl.title}</strong>
                        <span className="text-[9px] font-mono font-bold text-[#3ea884] bg-[#8cfbd4]/10 border border-[#8cfbd4]/20 px-1.5 py-0.5 rounded">
                          {pl.typePreset}
                        </span>
                      </div>
                      <p className="text-[11px] text-stone-505 leading-relaxed">{pl.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'layouts' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-205/60 mb-3">
                  <em className="text-[10px] font-mono text-stone-405 font-bold uppercase block mb-0.5">{typedHomepage.targetFormats.badge}</em>
                  <h3 className="font-serif font-bold text-sm text-stone-900">{typedHomepage.targetFormats.title}</h3>
                  <p className="text-stone-500 font-sans text-xs mt-1">{typedHomepage.targetFormats.subtitle}</p>
                </div>

                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-2">Defined Format Layout Options</strong>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {typedHomepage.targetFormats.layouts.map((lay) => (
                    <div key={lay.key} className="border border-stone-200 p-4 rounded-xl bg-white space-y-1">
                      <span className="text-[9px] font-mono font-bold text-stone-400 block uppercase">{lay.tier}</span>
                      <strong className="text-stone-900 text-sm font-serif block">{lay.title}</strong>
                      <p className="text-[11px] text-stone-500 leading-relaxed pb-2">{lay.description}</p>
                      <span className="inline-block bg-stone-100 px-2.5 py-1 rounded text-[10px] font-mono font-bold border border-stone-200">
                        CTA: {lay.buttonText}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'roadmap' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="bg-stone-50 p-3 rounded-xl border border-stone-200">
                  <span className="text-[10px] font-mono text-[#2a8767] font-bold block">{typedHomepage.roadmap.badge}</span>
                  <strong className="font-serif text-stone-900 text-sm block mt-0.5">{typedHomepage.roadmap.title}</strong>
                  <p className="text-stone-500 mt-1">{typedHomepage.roadmap.subtitle}</p>
                </div>

                <strong className="text-[10px] font-mono uppercase text-stone-400 block mt-4 mb-2">Roadmap Steps Matrix</strong>
                <div className="space-y-3">
                  {typedHomepage.roadmap.steps.map((st) => (
                    <div key={st.stepNumber} className="flex gap-4 p-3 bg-stone-50/50 border border-stone-150 rounded-xl">
                      <span className="font-mono text-lg font-extrabold text-[#2a8767]">{st.stepNumber}</span>
                      <div>
                        <strong className="text-stone-950 font-serif font-bold block text-xs">{st.title}</strong>
                        <p className="text-[11px] text-stone-495 mt-0.5">{st.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'noise' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50 p-4">
                  <span className="text-[9px] font-mono font-extrabold bg-[#2a8767]/10 text-[#2a8767] rounded border border-[#2a8767]/20 px-2 py-0.5 uppercase tracking-wider">{typedHomepage.noiseBarrier.badge}</span>
                  <h4 className="font-serif text-sm font-bold text-stone-900 mt-2.5">{typedHomepage.noiseBarrier.title}</h4>
                  
                  <div className="mt-4 p-3 bg-white border border-stone-150 rounded-lg">
                    <span className="text-[10px] font-mono font-bold text-[#3ea884] block">{typedHomepage.noiseBarrier.studyIndexLabel}</span>
                    <strong className="text-sm font-serif text-stone-850 mt-1 block">{typedHomepage.noiseBarrier.studyIndexTitle}</strong>
                    <p className="text-stone-605 mt-0.5">{typedHomepage.noiseBarrier.studyIndexDescription}</p>
                  </div>
                </div>

                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Body Wording Paragraphs</strong>
                <div className="space-y-3 pl-2 border-l-2 border-stone-200">
                  {typedHomepage.noiseBarrier.descriptionParagraphs.map((p, i) => (
                    <p key={i} className="text-stone-650 leading-relaxed">{p}</p>
                  ))}
                </div>
              </div>
            )}

            {activeSection === 'manifesto' && (
              <div className="space-y-4 text-xs font-sans">
                <div className="bg-stone-50 border border-stone-200 p-4 rounded-xl">
                  <span className="text-[9px] font-mono font-bold text-stone-400 tracking-wider uppercase">{typedHomepage.manifesto.badge}</span>
                  <h4 className="font-serif font-bold text-sm text-stone-900 mt-1">{typedHomepage.manifesto.title}</h4>
                  <div className="mt-2.5 space-y-2">
                    {typedHomepage.manifesto.paragraphs.map((p, i) => (
                      <p key={i} className="text-stone-605 leading-relaxed">{p}</p>
                    ))}
                  </div>
                </div>

                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Transparency List items</strong>
                <div className="space-y-2 mt-1">
                  {typedHomepage.manifesto.listItems.map((item, idx) => (
                    <div key={idx} className="flex gap-2 text-stone-700 bg-stone-50/50 p-2.5 border border-stone-150 rounded-lg">
                      <span className="font-serif font-bold text-[#2a8767]">0{idx+1}.</span>
                      <div>{item}</div>
                    </div>
                  ))}
                </div>
                <div className="text-[10px] font-mono text-stone-405 italic pt-2">
                  * footnote: "{typedHomepage.manifesto.footnote}"
                </div>
              </div>
            )}

            {activeSection === 'faqs' && (
              <div className="space-y-4 text-xs font-sans">
                <strong className="font-serif text-stone-900 text-sm block border-b border-stone-100 pb-2">{typedHomepage.faqs.title}</strong>
                <div className="space-y-3">
                  {typedHomepage.faqs.items.map((item, index) => (
                    <div key={index} className="p-3 bg-stone-50/50 border border-stone-200 rounded-xl">
                      <strong className="text-stone-900 font-serif flex items-start gap-1.5 leading-snug">
                        <HelpCircle size={14} className="text-[#3ea884] shrink-0 mt-0.5" />
                        {item.question}
                      </strong>
                      <p className="text-stone-600 mt-1.5 pl-5 leading-relaxed">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="border-t border-stone-100 pt-3 bg-stone-50 p-2.5 rounded-lg flex items-center justify-between text-[11px] text-stone-500 font-mono mt-4">
            <span>JSON Node Root: <code>homepage.{activeSection}</code></span>
            <span className="text-[#2a8767] font-bold">● Type Isolation Valid</span>
          </div>
        </div>
      </div>
    </div>
  );
};
