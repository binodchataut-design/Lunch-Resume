import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Trash2, Printer, RefreshCw, Send, CheckCircle, Sparkles, FileText, ChevronRight, Check } from 'lucide-react';
import coverLetterTemplates from '../../content/coverLetterTemplates.json';
import { CoverLetterTemplate } from '../../types/content';

const typedCoverLetterTemplates = coverLetterTemplates as CoverLetterTemplate[];

interface CoverLetterData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
  };
  recipientInfo: {
    name: string;
    title: string;
    company: string;
    address: string;
  };
  date: string;
  salutation: string;
  body: string;
  signOff: string;
}

const COVER_LETTER_PRESETS: Record<string, CoverLetterData> = {
  software: {
    personalInfo: {
      fullName: "Alex Rivera",
      title: "Senior Full Stack Engineer",
      email: "alex.rivera@lunchresume.com",
      phone: "+1 (555) 342-9988",
      location: "San Francisco, CA"
    },
    recipientInfo: {
      name: "Sarah Jenkins",
      title: "Director of Engineering",
      company: "Linear App",
      address: "100 Brannan St, San Francisco, CA"
    },
    date: "June 20, 2026",
    salutation: "Dear Ms. Jenkins,",
    body: "I am writing to express my eager interest in the Senior Full Stack Engineer position at Linear. Having used Linear's toolsets daily for years, I have developed an immense appreciation for your team's relentless pursuit of high-speed performance, absolute design precision, and keyboard-first accessibility.\n\nIn my previous role at Stripe as a Senior Engineer with Core Payments, I spearheaded the structural optimization of payment routing microservices. By auditing memory allocations and pre-compiling network schemas, I achieved a 32% global latency reduction, directly improving checkout success percentages. Later during my tenure at Vercel, I engineered reusable server-rendered template engines that enhanced page-load responsiveness by 45% for over 12,000 corporate tenants.\n\nAt Linear, product craftsmanship and raw technical efficiency are core values. My focus has consistently been at the intersection of high-fidelity user experiences and solid back-end architecture. I am confident my performance-tuning experience and devotion to polished visual detailing will enable me to hit the ground running.\n\nThank you for your time, consideration, and for continuing to raise the bar for software design. I look forward to exploring how my background in latency control can support Linear's long-term product trajectory.",
    signOff: "Sincerely,"
  },
  marketing: {
    personalInfo: {
      fullName: "Marcus Chen",
      title: "VP of Growth & Digital Marketing",
      email: "marcus.chen@lunchresume.com",
      phone: "+1 (555) 883-2940",
      location: "New York, NY"
    },
    recipientInfo: {
      name: "David Vance",
      title: "Chief Marketing Officer",
      company: "Figma Inc.",
      address: "760 Market St, San Francisco, CA"
    },
    date: "June 20, 2026",
    salutation: "Dear Mr. Vance,",
    body: "I am writing to express my strong interest in the VP of Growth & Digital Marketing opening at Figma. Having built campaigns around design collaboration, I am deeply inspired by Figma’s ability to turn a technical browser experience into an active global community of millions of creators.\n\nIn my past role as VP of Growth at Notion, I designed a multi-channel viral engine that scaled self-serve organic signups by 55% using search-ranking optimizations and interactive template galleries. Over three years, we improved enterprise trial conversions by 42% and secured millions in self-serve pipeline. Furthermore, by restructuring our performance analytics stack, I lowered customer acquisition spend (CAC) by 24% while scaling qualified lead volumes by 2.2x year-over-year.\n\nFigma operates at a unique scale where community advocacy is the primary driver of digital growth. I specialize in engineering automated loops and performance-driven content templates that leverage community behavior. I would love the chance to discuss how my data frameworks can help Figma onboard the next generation of creative teams.\n\nThank you for reviewing my credentials. I welcome the opportunity for a discussion regarding your growth roadmap.",
    signOff: "Warmest regards,"
  },
  designer: {
    personalInfo: {
      fullName: "Maya Lin",
      title: "Lead Product Designer",
      email: "maya.lin@lunchresume.com",
      phone: "+1 (555) 774-1211",
      location: "Austin, TX"
    },
    recipientInfo: {
      name: "Sophia Rossi",
      title: "VP of Product Experience",
      company: "Arc Browser (The Browser Company)",
      address: "99 Hudson St, New York, NY"
    },
    date: "June 20, 2026",
    salutation: "Dear Ms. Rossi,",
    body: "I am writing to apply for the Lead Product Designer position at The Browser Company. I have closely watched your team question decades-old assumptions about what an internet browser should feel like. Arc's focus on micro-interactions, spaces, and fluid layouts is exactly the kind of design-driven product development I thrive in.\n\nOver the last five years, I have worked as a Lead Product Designer at Airbnb and Duolingo. At Airbnb, I was tasked with redesigning the host checkout flow, focusing on reducing friction in multi-step visual forms. By implementing tactile drag-and-drop mechanics and micro-animations, we increased checkout completion rates by 18%, saving millions of dollars in abandoned listings. At Duolingo, I designed gamified rewards widgets that boosted weekly retention metrics by 22% across 14 million daily learners.\n\nDesigning for a browser means designing an entire OS of people's digital lives. My philosophy is that software should be joyful, quiet, yet incredibly responsive. I bring a combination of rapid interactive prototyping, exhaustive user testing, and frontend-adjacent viewport constraints to the table.\n\nThank you for considering my application. I would be thrilled to show you my interactive prototypes and talk about the future of digital organization.",
    signOff: "Best regards,"
  },
  'registered-nurse': {
    personalInfo: {
      fullName: "Jane Doe, RN",
      title: "Registered Nurse",
      email: "jane.doe@lunchresume.com",
      phone: "+1 (555) 019-2834",
      location: "Chicago, IL"
    },
    recipientInfo: {
      name: "Dr. Robert Carter",
      title: "Chief Medical Officer",
      company: "Metro Health Emergency Services",
      address: "450 Medical Plaza, Chicago, IL"
    },
    date: "June 20, 2026",
    salutation: "Dear Dr. Carter,",
    body: "I am writing to declare my passionate interest in joining your critical healthcare team as a Registered Nurse (RN). Combining four years of refined nursing practices in acute care facilities with a patient-first advocacy framework, I am dedicated to delivering clinical excellence.\n\nIn my current role at MetroHealth Emergency Services, I manage intake evaluations, telemetry assessments, and pediatric critical-care triages for a high-intensity unit serving over 50 clients daily. Through proactive coordination with physicians and medical technicians, I've successfully streamlined clinical workflow times by 15% and upheld perfect clinical protocol alignment.\n\nI also recognize the imperative nature of electronic health documentation and nurse-led transitional plans. By introducing a streamlined post-op discharge template, I helped reduce hospital re-admission rates by 12% while boosting satisfaction ratings among patient caregivers.",
    signOff: "Sincerely,"
  },
  'accountant': {
    personalInfo: {
      fullName: "Staff Accountant",
      title: "Certified Public Accountant",
      email: "finance@lunchresume.com",
      phone: "+1 (555) 923-4567",
      location: "Boston, MA"
    },
    recipientInfo: {
      name: "Alice Vance",
      title: "VP of Finance",
      company: "ApexLedger Corp",
      address: "100 Financial Way, Boston, MA"
    },
    date: "June 20, 2026",
    salutation: "Dear Ms. Vance,",
    body: "I am writing to express my eager interest in the Staff Accountant role for your corporate accounting division. Bringing a proven history of ledger integration, precise monthly close coordination, and advanced GAAP compliance knowledge, I am well-prepared to secure your accounting accuracy.\n\nAt ApexLedger Corporation, I am fully responsible for reconciling assets, reviewing depreciation indices, and preparing compliance documents for fifteen million-dollar corporate clients. By engineering macros inside Microsoft Excel, I successfully automated redundant journal auditing, cutting down manual bookkeeping durations by eight hours every week.\n\nFurthermore, I maintain comprehensive readiness for annual IRS and corporate audits. My deep understanding of balance sheets, cost modeling, and SOX frameworks ensures zero-discrepancy reports and helps protect corporate bottom lines.",
    signOff: "Best regards,"
  }
};

export const CoverLetterSandbox: React.FC = () => {
  const location = useLocation();
  const [selectedPersona, setSelectedPersona] = useState<string>('software');
  const [letterData, setLetterData] = useState<CoverLetterData>(COVER_LETTER_PRESETS.software);
  const [activeFormTab, setActiveFormTab] = useState<'sender' | 'recipient' | 'content'>('sender');
  const [styleConfig, setStyleConfig] = useState<{
    template: 'classic' | 'modern' | 'minimalist';
    primaryColor: string;
    fontFamily: 'sans' | 'serif' | 'mono' | 'elegant' | 'slab' | 'space' | 'outfit';
    spacing: 'compact' | 'normal' | 'relaxed';
  }>({
    template: 'classic',
    primaryColor: 'gold',
    fontFamily: 'serif',
    spacing: 'normal'
  });

  const [showPrintOverlay, setShowPrintOverlay] = useState<boolean>(false);
  const [isDownloading, setIsDownloading] = useState<boolean>(false);

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const templateParam = searchParams.get('template') || searchParams.get('preset') || searchParams.get('slug');
    if (templateParam) {
      let matchedKey = '';
      if (templateParam === 'software-engineer' || templateParam === 'software') {
        matchedKey = 'software';
      } else if (templateParam === 'registered-nurse' || templateParam === 'nurse' || templateParam === 'registered-nurse') {
        matchedKey = 'registered-nurse';
      } else if (templateParam === 'accountant') {
        matchedKey = 'accountant';
      } else if (templateParam === 'marketing') {
        matchedKey = 'marketing';
      } else if (templateParam === 'designer') {
        matchedKey = 'designer';
      }

      if (matchedKey && COVER_LETTER_PRESETS[matchedKey]) {
        setSelectedPersona(matchedKey);
        setLetterData(JSON.parse(JSON.stringify(COVER_LETTER_PRESETS[matchedKey])));
      }
    }

    // Capture and apply design style variables from selected template parameters
    const styleParam = searchParams.get('style') || searchParams.get('design') || searchParams.get('template');
    const colorParam = searchParams.get('color') || searchParams.get('primaryColor');
    const fontParam = searchParams.get('font') || searchParams.get('fontFamily');
    const spacingParam = searchParams.get('spacing');

    setStyleConfig(prev => {
      let updatedTemplate = prev.template;
      let updatedColor = prev.primaryColor;
      let updatedFont = prev.fontFamily;
      let updatedSpacing = prev.spacing;

      if (styleParam) {
        if (['classic', 'modern', 'minimalist'].includes(styleParam)) {
          updatedTemplate = styleParam as any;
        } else if (styleParam === 'executive-elite' || styleParam === 'legal-professional') {
          updatedTemplate = 'classic';
          updatedFont = 'serif';
          updatedColor = 'gold';
        } else if (styleParam === 'corporate-pro' || styleParam === 'modern-tech' || styleParam === 'government-professional') {
          updatedTemplate = 'modern';
          updatedFont = 'sans';
          updatedColor = 'emerald';
        } else if (styleParam === 'finance-authority' || styleParam === 'personal-brand' || styleParam === 'healthcare-professional' || styleParam === 'education-leader') {
          updatedTemplate = 'minimalist';
          updatedFont = 'sans';
          updatedColor = 'emerald';
        } else if (styleParam === 'creative-edge') {
          updatedTemplate = 'modern';
          updatedFont = 'sans';
          updatedColor = 'amber';
        }
      }

      if (colorParam) {
        if (['gold', 'emerald', 'indigo', 'crimson', 'violet', 'amber', 'sky'].includes(colorParam)) {
          updatedColor = colorParam;
        }
      }

      if (fontParam) {
        if (['sans', 'serif', 'mono', 'elegant', 'slab', 'space', 'outfit'].includes(fontParam)) {
          updatedFont = fontParam as any;
        }
      }

      if (spacingParam) {
        if (['compact', 'normal', 'relaxed'].includes(spacingParam)) {
          updatedSpacing = spacingParam as any;
        }
      }

      return {
        template: updatedTemplate,
        primaryColor: updatedColor,
        fontFamily: updatedFont,
        spacing: updatedSpacing
      };
    });
  }, [location.search]);

  const handleLoadPersona = (personaKey: string) => {
    setSelectedPersona(personaKey);
    const data = COVER_LETTER_PRESETS[personaKey];
    if (data) {
      setLetterData(JSON.parse(JSON.stringify(data)));
    }
  };

  const handleFieldChange = (section: 'personalInfo' | 'recipientInfo' | 'root', field: string, value: string) => {
    setLetterData(prev => {
      if (section === 'root') {
        return { ...prev, [field]: value };
      }
      return {
        ...prev,
        [section]: {
          ...prev[section],
          [field]: value
        }
      };
    });
  };

  const triggerPDFExport = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setShowPrintOverlay(true);
    }, 1200);
  };

  const handleSystemPrint = () => {
    window.print();
  };

  const getAccentStyle = () => {
    switch (styleConfig.primaryColor) {
      case 'emerald': return { bg: 'bg-emerald-600', text: 'text-emerald-700', border: 'border-emerald-500', hex: '#059669' };
      case 'indigo': return { bg: 'bg-indigo-600', text: 'text-indigo-700', border: 'border-[#4f46e5]', hex: '#4f46e5' };
      case 'crimson': return { bg: 'bg-rose-600', text: 'text-rose-700', border: 'border-rose-500', hex: '#e11d48' };
      case 'violet': return { bg: 'bg-violet-600', text: 'text-violet-700', border: 'border-violet-500', hex: '#7c3aed' };
      case 'amber': return { bg: 'bg-amber-500', text: 'text-amber-700', border: 'border-amber-500', hex: '#f59e0b' };
      case 'sky': return { bg: 'bg-sky-500', text: 'text-sky-700', border: 'border-sky-500', hex: '#0ea5e9' };
      case 'gold':
      default:
        return { bg: 'bg-[#8cfbd4]', text: 'text-stone-900', border: 'border-[#8cfbd4]', hex: '#8cfbd4' };
    }
  };

  const fontClass = () => {
    switch (styleConfig.fontFamily) {
      case 'serif': return 'font-serif';
      case 'mono': return 'font-mono';
      case 'elegant': return 'font-elegant';
      case 'slab': return 'font-slab';
      case 'space': return 'font-space';
      case 'outfit': return 'font-outfit';
      case 'sans':
      default:
        return 'font-sans';
    }
  };

  const getSpacingStyle = () => {
    switch (styleConfig.spacing) {
      case 'compact':
        return {
          p: 'p-6 sm:p-8',
          mbHeader: 'pb-3 mb-4',
          mbSection: 'mb-4',
          spaceBody: 'space-y-2.5',
          mbSig: 'mt-5 pt-2'
        };
      case 'relaxed':
        return {
          p: 'p-12 sm:p-14',
          mbHeader: 'pb-7 mb-10',
          mbSection: 'mb-8',
          spaceBody: 'space-y-6',
          mbSig: 'mt-10 pt-5'
        };
      case 'normal':
      default:
        return {
          p: 'p-10 sm:p-12',
          mbHeader: 'pb-5 mb-8',
          mbSection: 'mb-6',
          spaceBody: 'space-y-4',
          mbSig: 'mt-8 pt-4'
        };
    }
  };

  const accent = getAccentStyle();
  const spacingVals = getSpacingStyle();

  return (
    <div className="w-full bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden p-1 sm:p-4 my-8 relative z-10">
      
      {/* Sandbox Header */}
      <div className="px-6 py-5 bg-gradient-to-r from-teal-900 via-[#0F766E] to-[#0A5C56] text-white flex flex-col md:flex-row justify-between items-center gap-4 rounded-2xl border border-white/10 shadow-[0_12px_25px_-4px_rgba(15,118,110,0.25)] relative overflow-hidden">
        {/* Subtle header glass layer glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
        
        <div className="z-10 text-left">
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-[#8cfbd4] uppercase">
            <Sparkles size={14} className="text-[#8cfbd4]" />
            <span>Interactive sandbox</span>
          </div>
          <h3 className="text-xl font-serif font-black text-white mt-1">Design & Write Your Cover Letter</h3>
        </div>
        <div className="flex items-center gap-2 bg-white/10 p-1.5 rounded-xl border border-white/10 backdrop-blur-md z-10">
          <span className="text-[10px] font-bold text-teal-100 font-mono tracking-wider ml-1">PROFILE:</span>
          {Object.keys(COVER_LETTER_PRESETS).map((key) => (
            <button 
              key={key}
              onClick={() => handleLoadPersona(key)} 
              className={`px-3 py-1 rounded-lg text-xs font-bold tracking-wide transition-all cursor-pointer ${selectedPersona === key ? 'bg-[#8cfbd4] text-[#1C2B33] font-black shadow-[0_4px_12px_rgba(140,251,212,0.25)]' : 'bg-teal-950/40 text-teal-100 hover:bg-teal-950/60 hover:text-white'}`}
            >
              {key === 'software' ? 'Engineering' : key === 'marketing' ? 'Marketing' : key === 'designer' ? 'Designer' : key === 'registered-nurse' ? 'Nurse' : 'Accountant'}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 p-4">
        
        {/* LEFT COLUMN: EDITOR FORM CONTAINER */}
        <div className="xl:col-span-5 flex flex-col bg-white/75 backdrop-blur-md rounded-2xl border border-[#E2E8E6] p-5 shadow-[0_10px_40px_rgba(0,0,0,0.015)] max-h-[85vh] overflow-y-auto text-left">
          
          {/* Layout controls */}
          <div className="mb-6 pb-6 border-b border-[#E2E8E6]">
            <div className="text-xs font-bold font-mono text-[#46504D] uppercase tracking-wider mb-3">LETTER BRANDING STYLE</div>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-[10px] font-bold text-[#1C2B33] block mb-1">Typography</label>
                <select 
                  value={styleConfig.fontFamily}
                  onChange={(e) => setStyleConfig(prev => ({ ...prev, fontFamily: e.target.value as any }))}
                  className="w-full text-xs bg-white/60 border border-[#E2E8E6] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/20 transition-all rounded-xl p-2.5 font-bold outline-none text-[#1C2B33]"
                >
                  <option value="sans">Minimalist Inter Sans</option>
                  <option value="serif">Classic Editorial Serif</option>
                  <option value="mono">Technical Space Mono</option>
                  <option value="elegant">EB Garamond Elegant</option>
                  <option value="slab">Arvo Retro Slab</option>
                  <option value="space">Space Grotesk Bold</option>
                  <option value="outfit">Outfit Modern Tech</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-[#1C2B33] block mb-1">Layout Preset</label>
                <select 
                  value={styleConfig.template}
                  onChange={(e) => setStyleConfig(prev => ({ ...prev, template: e.target.value as any }))}
                  className="w-full text-xs bg-white/60 border border-[#E2E8E6] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/20 transition-all rounded-xl p-2.5 font-bold outline-none text-[#1C2B33]"
                >
                  {typedCoverLetterTemplates.map((t) => (
                    <option key={t.key} value={t.key}>{t.label}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] font-bold text-[#1C2B33] block mb-1">Branding Accent</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { key: 'gold', color: 'bg-[#8cfbd4]', label: 'Mint' },
                    { key: 'emerald', color: 'bg-emerald-600', label: 'Emerald' },
                    { key: 'indigo', color: 'bg-indigo-600', label: 'Indigo' },
                    { key: 'crimson', color: 'bg-rose-600', label: 'Crimson' },
                    { key: 'violet', color: 'bg-violet-600', label: 'Violet' },
                    { key: 'amber', color: 'bg-amber-500', label: 'Amber' },
                    { key: 'sky', color: 'bg-sky-500', label: 'Sky Blue' }
                  ].map((c) => (
                    <button
                      key={c.key}
                      onClick={() => setStyleConfig(prev => ({ ...prev, primaryColor: c.key }))}
                      title={c.label}
                      className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all cursor-pointer ${c.color} ${styleConfig.primaryColor === c.key ? 'border-[#1C2B33] scale-110 shadow-[0_4px_12px_rgba(0,0,0,0.15)] ring-2 ring-white' : 'border-transparent hover:scale-105'}`}
                    >
                      {styleConfig.primaryColor === c.key && <Check size={11} className={styleConfig.primaryColor === 'gold' ? 'text-stone-900 font-extrabold' : 'text-white font-bold'} />}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-[10px] font-bold text-[#1C2B33] block mb-1">Density Spacing</label>
                <select 
                  value={styleConfig.spacing}
                  onChange={(e) => setStyleConfig(prev => ({ ...prev, spacing: e.target.value as any }))}
                  className="w-full text-xs bg-white/60 border border-[#E2E8E6] focus:border-[#0F766E] focus:ring-1 focus:ring-[#0F766E]/20 transition-all rounded-xl p-2.5 font-bold outline-none text-[#1C2B33]"
                >
                  <option value="compact">Compact (Dense)</option>
                  <option value="normal">Standard (Classic)</option>
                  <option value="relaxed">Relaxed (Spacious)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Tabs Navigation Bar */}
          <div className="flex border-b border-[#E2E8E6] mb-4 overflow-x-auto gap-1">
            <button 
              type="button"
              onClick={() => setActiveFormTab('sender')} 
              className={`py-2 px-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${activeFormTab === 'sender' ? 'border-[#0F766E] text-[#0F766E]' : 'border-transparent text-stone-500 hover:text-[#1C2B33]'}`}
            >
              1. Sender Details
            </button>
            <button 
              type="button"
              onClick={() => setActiveFormTab('recipient')} 
              className={`py-2 px-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${activeFormTab === 'recipient' ? 'border-[#0F766E] text-[#0F766E]' : 'border-transparent text-stone-500 hover:text-[#1C2B33]'}`}
            >
              2. Recipient / Co
            </button>
            <button 
              type="button"
              onClick={() => setActiveFormTab('content')} 
              className={`py-2 px-3 text-xs font-bold whitespace-nowrap transition-all border-b-2 cursor-pointer ${activeFormTab === 'content' ? 'border-[#0F766E] text-[#0F766E]' : 'border-transparent text-stone-500 hover:text-[#1C2B33]'}`}
            >
              3. Letter Body
            </button>
          </div>

          {/* Form fields */}
          <div className="space-y-4">
                       {/* Sender Information */}
            {activeFormTab === 'sender' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="text-[10px] font-mono font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-500/5 py-1 px-2.5 rounded-md inline-block">1. Your Sender Details</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Your Name</label>
                    <input 
                      type="text" 
                      value={letterData.personalInfo.fullName}
                      onChange={(e) => handleFieldChange('personalInfo', 'fullName', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-bold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Your Title</label>
                    <input 
                      type="text" 
                      value={letterData.personalInfo.title}
                      onChange={(e) => handleFieldChange('personalInfo', 'title', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-semibold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Email</label>
                    <input 
                      type="text" 
                      value={letterData.personalInfo.email}
                      onChange={(e) => handleFieldChange('personalInfo', 'email', e.target.value)}
                      className="w-full p-2 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-medium outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Phone</label>
                    <input 
                      type="text" 
                      value={letterData.personalInfo.phone}
                      onChange={(e) => handleFieldChange('personalInfo', 'phone', e.target.value)}
                      className="w-full p-2 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-medium outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Location</label>
                    <input 
                      type="text" 
                      value={letterData.personalInfo.location}
                      onChange={(e) => handleFieldChange('personalInfo', 'location', e.target.value)}
                      className="w-full p-2 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-medium outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                </div>

                {/* CTA Next Section */}
                <div className="pt-3 border-t border-[#E2E8E6] flex justify-end">
                  <button
                    type="button"
                    onClick={() => setActiveFormTab('recipient')}
                    className="px-4 py-2.5 bg-[#0F766E] hover:bg-[#0D5C56] text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all shadow-[0_4px_12px_rgba(15,118,110,0.15)] active:scale-95 cursor-pointer"
                  >
                    Next: Recipient Details <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Recipient Details */}
            {activeFormTab === 'recipient' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="text-[10px] font-mono font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-500/5 py-1 px-2.5 rounded-md inline-block">2. Recipient & Company</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Recipient Name</label>
                    <input 
                      type="text" 
                      value={letterData.recipientInfo.name}
                      onChange={(e) => handleFieldChange('recipientInfo', 'name', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-bold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Recipient Title</label>
                    <input 
                      type="text" 
                      value={letterData.recipientInfo.title}
                      onChange={(e) => handleFieldChange('recipientInfo', 'title', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-semibold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Company Name</label>
                    <input 
                      type="text" 
                      value={letterData.recipientInfo.company}
                      onChange={(e) => handleFieldChange('recipientInfo', 'company', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-bold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Company Address</label>
                    <input 
                      type="text" 
                      value={letterData.recipientInfo.address}
                      onChange={(e) => handleFieldChange('recipientInfo', 'address', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-semibold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                </div>

                {/* Back and Next CTAs */}
                <div className="pt-3 border-t border-[#E2E8E6] flex justify-between items-center">
                  <button
                    type="button"
                    onClick={() => setActiveFormTab('sender')}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveFormTab('content')}
                    className="px-4 py-2.5 bg-[#0F766E] hover:bg-[#0D5C56] text-white text-xs font-bold rounded-xl flex items-center gap-1 transition-all shadow-[0_4px_12px_rgba(15,118,110,0.15)] active:scale-95 cursor-pointer"
                  >
                    Next: Letter Body <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            )}

            {/* Letter Content */}
            {activeFormTab === 'content' && (
              <div className="space-y-4 animate-fade-in text-left">
                <div className="text-[10px] font-mono font-bold text-[#0F766E] uppercase tracking-wider bg-emerald-500/5 py-1 px-2.5 rounded-md inline-block">3. Cover Letter Frame</div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Date</label>
                    <input 
                      type="text" 
                      value={letterData.date}
                      onChange={(e) => handleFieldChange('root', 'date', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-medium outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Salutation</label>
                    <input 
                      type="text" 
                      value={letterData.salutation}
                      onChange={(e) => handleFieldChange('root', 'salutation', e.target.value)}
                      className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-bold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Letter Body (Outcomes Oriented)</label>
                  <textarea 
                    rows={8} 
                    value={letterData.body}
                    onChange={(e) => handleFieldChange('root', 'body', e.target.value)}
                    className="w-full p-3 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-medium outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all leading-relaxed font-sans"
                  />
                </div>

                <div>
                  <label className="text-[9px] font-bold text-[#46504D] uppercase tracking-wider mb-1 block">Sign Off</label>
                  <input 
                    type="text" 
                    value={letterData.signOff}
                    onChange={(e) => handleFieldChange('root', 'signOff', e.target.value)}
                    className="w-full p-2.5 text-xs bg-white/60 border border-[#E2E8E6] rounded-xl text-[#1C2B33] font-bold outline-none focus:ring-1 focus:ring-[#0F766E]/20 focus:border-[#0F766E] transition-all"
                  />
                </div>

                {/* Back and PDF Preview and Download CTAs */}
                <div className="pt-3 border-t border-[#E2E8E6] flex justify-between items-center bg-white/40 p-2.5 rounded-xl border border-[#E2E8E6] backdrop-blur-xs">
                  <button
                    type="button"
                    onClick={() => setActiveFormTab('recipient')}
                    className="px-3.5 py-2 bg-stone-100 hover:bg-stone-200 text-stone-600 text-xs font-bold rounded-xl transition-all cursor-pointer"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={triggerPDFExport}
                    className="px-4 py-2.5 bg-gradient-to-r from-teal-800 to-[#0F766E] hover:from-teal-700 hover:to-[#0D5C56] text-white text-xs font-bold rounded-xl flex items-center gap-1.5 transition-all shadow-[0_4px_12px_rgba(15,118,110,0.15)] hover:shadow-[0_6px_16px_rgba(15,118,110,0.25)] cursor-pointer"
                  >
                    {isDownloading ? (
                      <span className="flex items-center gap-1">⏱ Loading...</span>
                    ) : (
                      <>
                        <CheckCircle size={14} /> Download & Preview
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

          </div>

          {/* Bottom Primary Generate Action */}
          <div className="mt-6 pt-5 border-t border-[#E2E8E6]">
            <button
              onClick={triggerPDFExport}
              disabled={isDownloading}
              className="w-full py-4 bg-gradient-to-r from-teal-900 via-[#0F766E] to-[#0A5C56] hover:from-teal-850 hover:to-[#094F49] text-white text-xs font-black uppercase tracking-wider rounded-xl transition-all shadow-[0_10px_25px_-5px_rgba(15,118,110,0.3)] hover:shadow-[0_12px_30px_-5px_rgba(15,118,110,0.4)] hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            >
              {isDownloading ? (
                <>
                  <RefreshCw className="animate-spin" size={16} />
                  Calibrating Margins...
                </>
              ) : (
                <>
                  <Printer size={16} />
                  Compile & Print Letter
                </>
              )}
            </button>
          </div>
        </div>

        {/* RIGHT COLUMN: REFINED LIVE PREVIEW */}
        <div className="xl:col-span-7 bg-slate-100/60 rounded-3xl border border-[#E2E8E6] p-6 flex justify-center items-start overflow-y-auto max-h-[85vh] select-none shadow-[inset_0_2px_10px_rgba(0,0,0,0.02)] relative">
          
          <div className="absolute top-4 left-4 bg-[#0F766E]/5 border border-[#0F766E]/15 text-[#0F766E] px-2.5 py-1 rounded-md text-[9px] font-mono uppercase tracking-wider font-bold backdrop-blur-md z-10">
            Real-time Page Layout Output
          </div>

          {/* Letter Sheet */}
          <div 
            id="cover-letter-preview" 
            className={`w-[8.5in] min-h-[11in] bg-white text-stone-850 leading-relaxed shadow-[0_15px_40px_rgba(0,0,0,0.06)] rounded-sm max-w-full select-text my-4 text-left border border-stone-200/40 ${fontClass()} ${spacingVals.p}`}
            style={{ fontSize: '14.5px' }}
          >
            {/* Elegant Header Layout Style Choice */}
            {styleConfig.template === 'classic' && (
              <div className={`border-b border-stone-200 ${spacingVals.mbHeader}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <h1 className="text-3xl font-bold tracking-tight text-stone-900">{letterData.personalInfo.fullName}</h1>
                    <div className="text-sm font-semibold tracking-wide text-stone-500 mt-1 uppercase">{letterData.personalInfo.title}</div>
                  </div>
                  <div className="text-right text-[11px] font-medium text-stone-500 space-y-0.5">
                    <div>📍 {letterData.personalInfo.location}</div>
                    <div>✉️ {letterData.personalInfo.email}</div>
                    <div>📞 {letterData.personalInfo.phone}</div>
                  </div>
                </div>
              </div>
            )}

            {styleConfig.template === 'modern' && (
              <div className={`flex gap-4 border-l-4 pl-5 ${spacingVals.mbHeader}`} style={{ borderColor: accent.hex }}>
                <div className="flex-1">
                  <h1 className="text-2xl font-bold tracking-tight text-stone-900">{letterData.personalInfo.fullName}</h1>
                  <span className="text-xs font-semibold text-stone-500 uppercase">{letterData.personalInfo.title}</span>
                </div>
                <div className="text-right text-[10px] text-stone-500 font-mono flex flex-col gap-1">
                  <span>{letterData.personalInfo.location} • {letterData.personalInfo.email} • {letterData.personalInfo.phone}</span>
                </div>
              </div>
            )}

            {styleConfig.template === 'minimalist' && (
              <div className={`${styleConfig.spacing === 'compact' ? 'mb-6' : styleConfig.spacing === 'relaxed' ? 'mb-12' : 'mb-10'} text-stone-800`}>
                <h1 className="text-xl font-bold tracking-wider uppercase">{letterData.personalInfo.fullName}</h1>
                <div className="text-xs tracking-widest text-stone-400 font-mono border-b border-stone-100 pb-3 mt-1 mb-3">{letterData.personalInfo.title.toUpperCase()}</div>
                <div className="text-[11px] text-stone-500 flex gap-4 uppercase font-mono tracking-wider">
                  <span>{letterData.personalInfo.location}</span>
                  <span>{letterData.personalInfo.email}</span>
                  <span>{letterData.personalInfo.phone}</span>
                </div>
              </div>
            )}

            {/* Date */}
            <div className={`text-stone-500 text-xs font-medium tracking-wide ${spacingVals.mbSection}`}>
              {letterData.date}
            </div>

            {/* Recipient Details */}
            <div className={`text-stone-700 text-xs flex flex-col gap-0.5 uppercase tracking-wide ${spacingVals.mbSection}`}>
              <span className="font-bold text-stone-900 text-sm normal-case tracking-normal">{letterData.recipientInfo.name}</span>
              <span>{letterData.recipientInfo.title}</span>
              <span className="font-semibold text-stone-800">{letterData.recipientInfo.company}</span>
              <span>{letterData.recipientInfo.address}</span>
            </div>

            {/* Salutation */}
            <div className="mb-4 font-semibold text-stone-900 text-[14px]">
              {letterData.salutation}
            </div>

            {/* Body */}
            <div className={`text-[13.5px] text-stone-700 leading-relaxed whitespace-pre-line text-justify font-normal pr-2 ${spacingVals.spaceBody}`}>
              {letterData.body}
            </div>

            {/* Signature Block */}
            <div className={`${spacingVals.mbSig}`}>
              <div className="text-stone-700 font-medium">{letterData.signOff}</div>
              <div className="text-stone-900 font-bold text-lg mt-6 leading-tight">{letterData.personalInfo.fullName}</div>
              <div className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider font-mono">{letterData.personalInfo.title}</div>
            </div>

          </div>

        </div>

      </div>

      {/* RENDER SYSTEM OVERLAY MODAL ON EXPORT */}
      <AnimatePresence>
        {showPrintOverlay && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-[#1C2B33]/65 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-slate-100 max-w-4xl w-full rounded-3xl shadow-[0_30px_70px_rgba(0,0,0,0.15)] overflow-hidden border border-[#E2E8E6] flex flex-col max-h-[92vh]"
            >
              <div className="bg-gradient-to-r from-teal-900 via-[#0F766E] to-[#0A5C56] text-white px-6 py-5 border-b border-white/10 flex justify-between items-center relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent rounded-bl-full pointer-events-none" />
                <div className="z-10 text-left">
                  <div className="text-xs uppercase font-extrabold tracking-widest text-[#8cfbd4] font-mono">PRINT PIPELINE</div>
                  <h4 className="text-lg font-serif font-black text-white mt-0.5">Your Structured Cover Letter file is active</h4>
                </div>
                <div className="flex gap-2 z-10">
                  <button 
                    onClick={handleSystemPrint}
                    className="px-4 py-2.5 bg-[#8cfbd4] text-[#1C2B33] border border-[#8cfbd4] hover:bg-[#a3ffd9] hover:border-[#a3ffd9] text-xs font-extrabold uppercase rounded-xl shadow-[0_4px_12px_rgba(140,251,212,0.25)] transition-all flex items-center gap-1.5 cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <Printer size={14} /> Open System Print Mode (PDF)
                  </button>
                  <button 
                    onClick={() => setShowPrintOverlay(false)}
                    className="px-4 py-2.5 bg-white/10 text-white hover:bg-white/20 text-xs font-bold uppercase rounded-xl border border-white/15 transition-all cursor-pointer"
                  >
                    Keep Editing
                  </button>
                </div>
              </div>

              {/* Real Print frame */}
              <div className="flex-1 p-6 overflow-y-auto flex justify-center bg-slate-200/50">
                <div id="physical-page-print" className={`w-[8.5in] min-h-[11in] max-w-full bg-white shadow-2xl text-stone-850 select-text scale-90 sm:scale-100 origin-top ${spacingVals.p}`}>
                  
                  {/* Embedded matching styled printable layout */}
                  <div className={`w-full text-stone-850 leading-relaxed text-left ${fontClass()}`}>
                    
                    {styleConfig.template === 'classic' && (
                      <div className={`border-b border-stone-200 ${spacingVals.mbHeader}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <h1 className="text-3xl font-bold tracking-tight text-stone-900">{letterData.personalInfo.fullName}</h1>
                            <div className="text-sm font-semibold tracking-wide text-stone-500 mt-1 uppercase">{letterData.personalInfo.title}</div>
                          </div>
                          <div className="text-right text-[11px] font-medium text-stone-500 space-y-0.5 animate-none">
                            <div>📍 {letterData.personalInfo.location}</div>
                            <div>✉️ {letterData.personalInfo.email}</div>
                            <div>📞 {letterData.personalInfo.phone}</div>
                          </div>
                        </div>
                      </div>
                    )}

                    {styleConfig.template === 'modern' && (
                      <div className={`flex gap-4 border-l-4 pl-5 ${spacingVals.mbHeader}`} style={{ borderColor: accent.hex }}>
                        <div className="flex-1">
                          <h1 className="text-2xl font-bold tracking-tight text-stone-900">{letterData.personalInfo.fullName}</h1>
                          <span className="text-xs font-semibold text-stone-500 uppercase">{letterData.personalInfo.title}</span>
                        </div>
                        <div className="text-right text-[10px] text-stone-500 font-mono">
                          <div>{letterData.personalInfo.location} • {letterData.personalInfo.email} • {letterData.personalInfo.phone}</div>
                        </div>
                      </div>
                    )}

                    {styleConfig.template === 'minimalist' && (
                      <div className={`${styleConfig.spacing === 'compact' ? 'mb-6' : styleConfig.spacing === 'relaxed' ? 'mb-12' : 'mb-10'} text-stone-800`}>
                        <h1 className="text-xl font-bold tracking-wider uppercase">{letterData.personalInfo.fullName}</h1>
                        <div className="text-xs tracking-widest text-stone-400 font-mono border-b border-stone-100 pb-3 mt-1 mb-3">{letterData.personalInfo.title.toUpperCase()}</div>
                        <div className="text-[11px] text-stone-500 flex gap-4 uppercase font-mono tracking-wider">
                          <span>{letterData.personalInfo.location}</span>
                          <span>{letterData.personalInfo.email}</span>
                          <span>{letterData.personalInfo.phone}</span>
                        </div>
                      </div>
                    )}

                    {/* Date */}
                    <div className={`text-stone-500 text-xs font-medium ${spacingVals.mbSection}`}>
                      {letterData.date}
                    </div>

                    {/* Recipient Details */}
                    <div className={`text-stone-700 text-xs flex flex-col gap-0.5 uppercase tracking-wide ${spacingVals.mbSection}`}>
                      <span className="font-bold text-stone-900 text-sm normal-case tracking-normal">{letterData.recipientInfo.name}</span>
                      <span>{letterData.recipientInfo.title}</span>
                      <span className="font-semibold text-stone-800">{letterData.recipientInfo.company}</span>
                      <span>{letterData.recipientInfo.address}</span>
                    </div>

                    {/* Salutation */}
                    <div className="mb-4 font-semibold text-stone-900 text-[14px]">
                      {letterData.salutation}
                    </div>

                    {/* Body */}
                    <div className={`text-[13.5px] text-stone-700 leading-relaxed whitespace-pre-line text-justify ${spacingVals.spaceBody}`}>
                      {letterData.body}
                    </div>

                    {/* Signature */}
                    <div className={`${spacingVals.mbSig}`}>
                      <div className="text-stone-700 font-medium">{letterData.signOff}</div>
                      <div className="text-stone-900 font-bold text-lg mt-6">{letterData.personalInfo.fullName}</div>
                      <div className="text-[11px] text-stone-400 mt-1 uppercase tracking-wider font-mono">{letterData.personalInfo.title}</div>
                    </div>

                  </div>

                </div>
              </div>

              {/* Instructions footer */}
              <div className="p-4 bg-[#1C2B33] text-[#AEB7B4] text-xs text-center flex flex-col sm:flex-row justify-between items-center gap-2 border-t border-white/5">
                <span>💡 <strong>Tip:</strong> In the browser Print window, enable "Background graphics" and disable "Headers and footers" for perfect results.</span>
                <span className="text-[#8cfbd4] font-mono font-bold tracking-wider">LUNCHRESUME.COM</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};
