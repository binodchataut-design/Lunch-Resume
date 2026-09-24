/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ChevronRight, 
  ShieldCheck, 
  Search, 
  Sparkles, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  Filter, 
  SlidersHorizontal, 
  Layers, 
  Award, 
  Briefcase, 
  GraduationCap, 
  X, 
  Info, 
  Zap, 
  Check, 
  ChevronDown, 
  ArrowUpRight,
  RefreshCw,
  UserCheck,
  Eye,
  TrendingUp,
  XCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { SEO } from '../components/SEO';
import { BreadcrumbSchema } from '../components/Schema';
import { resumeTemplates1Page, resumeTemplates2Page, SharedTemplateItem } from '../data/templatesData';
import { TwoPageSideBySidePreview } from '../components/TwoPageSideBySidePreview';

// Curated descriptors for each layout option to fuel the discovery marketplace filters
interface TemplateMeta {
  slug: string;
  type: '1-page' | '2-page';
  displayName: string;
  bestFor: string;
  bestForBadge: string;
  score: number;
  filters: string[];
  features: string[];
  popularityRank: number;
  releaseDate: string; 
}

const templateMetadata: Record<string, TemplateMeta> = {
  // 1-PAGE TEMPLATES
  '1-page-executive-elite': {
    slug: 'executive-elite',
    type: '1-page',
    displayName: 'Executive Elite',
    bestFor: 'C-Suite leaders, directors, and traditional corporate executives.',
    bestForBadge: 'Best for Leadership',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Corporate', 'Executive'],
    features: ['ATS Optimized', 'Recruiter Approved', 'Symmetric Centered Layout', 'Elite Serif Typography'],
    popularityRank: 3,
    releaseDate: '2025-08-12'
  },
  '1-page-corporate-pro': {
    slug: 'corporate-pro',
    type: '1-page',
    displayName: 'Corporate Pro',
    bestFor: 'Operations directors, program managers, and business leaders.',
    bestForBadge: 'Best for Operations',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Corporate'],
    features: ['ATS Optimized', 'Recruiter Approved', 'Sleek Sans-serif Type', 'Project Showcase Blocks'],
    popularityRank: 1,
    releaseDate: '2025-12-05'
  },
  '1-page-finance-authority': {
    slug: 'finance-authority',
    type: '1-page',
    displayName: 'Finance Authority',
    bestFor: 'Accountants, financial analysts, and portfolio managers.',
    bestForBadge: 'Best for Finance',
    score: 98,
    filters: ['ATS Friendly', 'Professional', 'Corporate'],
    features: ['ATS Optimized', 'Recruiter Approved', 'Emerald Accent Palette', 'Timeline Layout Grid'],
    popularityRank: 2,
    releaseDate: '2026-01-20'
  },
  '1-page-healthcare-professional': {
    slug: 'healthcare-professional',
    type: '1-page',
    displayName: 'Healthcare Professional',
    bestFor: 'Nurses, clinicians, doctors, and healthcare directors.',
    bestForBadge: 'Best for Healthcare',
    score: 98,
    filters: ['ATS Friendly', 'Professional', 'Healthcare'],
    features: ['ATS Optimized', 'Board Certified Structure', 'Teal Accent Styling', 'Certification Priority Block'],
    popularityRank: 5,
    releaseDate: '2025-10-15'
  },
  '1-page-legal-professional': {
    slug: 'legal-professional',
    type: '1-page',
    displayName: 'Legal Professional',
    bestFor: 'Attorneys, legal counsels, and compliance officers.',
    bestForBadge: 'Best for Legal',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Legal'],
    features: ['ATS Optimized', 'Law Firm Partner Standards', 'Dedicated State Bar Box', 'Formal Serif Layout'],
    popularityRank: 6,
    releaseDate: '2025-11-01'
  },
  '1-page-education-leader': {
    slug: 'education-leader',
    type: '1-page',
    displayName: 'Education Leader',
    bestFor: 'Teachers, professors, and educational administrators.',
    bestForBadge: 'Best for Education',
    score: 98,
    filters: ['ATS Friendly', 'Professional', 'Student'],
    features: ['ATS Optimized', 'Curriculum Design Highlights', 'Teaching Credentials First', 'Clean Warm Layout'],
    popularityRank: 7,
    releaseDate: '2025-09-15'
  },
  '1-page-government-professional': {
    slug: 'government-professional',
    type: '1-page',
    displayName: 'Government Professional',
    bestFor: 'Federal employees, civil servants, and policy analysts.',
    bestForBadge: 'Best for Civil Service',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Corporate'],
    features: ['ATS Optimized', 'Federal Compliance Formatted', 'Multi-Language Matrix', 'Strict Chronological Grid'],
    popularityRank: 8,
    releaseDate: '2025-07-20'
  },
  '1-page-modern-tech': {
    slug: 'modern-tech',
    type: '1-page',
    displayName: 'Modern Tech',
    bestFor: 'Software developers, data scientists, and system engineers.',
    bestForBadge: 'Best for Tech',
    score: 95,
    filters: ['Modern', 'Creative', 'ATS Friendly'],
    features: ['Asymmetric Split Sidebar', 'Technical Skill Meters', 'Interactive Portfolio Badges', 'Photo Silhouette Support'],
    popularityRank: 2,
    releaseDate: '2026-02-15'
  },
  '1-page-creative-edge': {
    slug: 'creative-edge',
    type: '1-page',
    displayName: 'Creative Edge',
    bestFor: 'UI/UX designers, art directors, and brand marketers.',
    bestForBadge: 'Best for Creative',
    score: 94,
    filters: ['Modern', 'Creative'],
    features: ['Vibrant Gradient Sidebar', 'Asymmetric Design Division', 'Award Showcase Box', 'Interactive Media Portfolio'],
    popularityRank: 4,
    releaseDate: '2025-07-02'
  },
  '1-page-personal-brand': {
    slug: 'personal-brand',
    type: '1-page',
    displayName: 'Personal Brand',
    bestFor: 'Independent consultants, entrepreneurs, and advisors.',
    bestForBadge: 'Best for Consulting',
    score: 95,
    filters: ['Modern', 'Creative'],
    features: ['Full-Width Bold Greeting', 'Advisory Skill Tags', 'Card-Style Portfolio Grid', 'Magazine Layout Feel'],
    popularityRank: 5,
    releaseDate: '2026-03-01'
  },

  // 2-PAGE TEMPLATES
  '2-page-executive-elite': {
    slug: 'executive-elite',
    type: '2-page',
    displayName: 'Executive Elite',
    bestFor: 'C-Suite leaders, directors, and traditional corporate executives.',
    bestForBadge: 'Best for Leadership',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Corporate', 'Executive'],
    features: ['ATS Optimized', 'Recruiter Approved', 'Symmetric Centered Layout', 'Elite Serif Typography'],
    popularityRank: 3,
    releaseDate: '2025-08-12'
  },
  '2-page-corporate-pro': {
    slug: 'corporate-pro',
    type: '2-page',
    displayName: 'Corporate Pro',
    bestFor: 'Operations directors, program managers, and business leaders.',
    bestForBadge: 'Best for Operations',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Corporate'],
    features: ['ATS Optimized', 'Recruiter Approved', 'Sleek Sans-serif Type', 'Project Showcase Blocks'],
    popularityRank: 1,
    releaseDate: '2025-12-05'
  },
  '2-page-finance-authority': {
    slug: 'finance-authority',
    type: '2-page',
    displayName: 'Finance Authority',
    bestFor: 'Accountants, financial analysts, and portfolio managers.',
    bestForBadge: 'Best for Finance',
    score: 98,
    filters: ['ATS Friendly', 'Professional', 'Corporate'],
    features: ['ATS Optimized', 'Recruiter Approved', 'Emerald Accent Palette', 'Timeline Layout Grid'],
    popularityRank: 2,
    releaseDate: '2026-01-20'
  },
  '2-page-healthcare-professional': {
    slug: 'healthcare-professional',
    type: '2-page',
    displayName: 'Healthcare Professional',
    bestFor: 'Nurses, clinicians, doctors, and healthcare directors.',
    bestForBadge: 'Best for Healthcare',
    score: 98,
    filters: ['ATS Friendly', 'Professional', 'Healthcare'],
    features: ['ATS Optimized', 'Board Certified Structure', 'Teal Accent Styling', 'Certification Priority Block'],
    popularityRank: 5,
    releaseDate: '2025-10-15'
  },
  '2-page-legal-professional': {
    slug: 'legal-professional',
    type: '2-page',
    displayName: 'Legal Professional',
    bestFor: 'Attorneys, legal counsels, and compliance officers.',
    bestForBadge: 'Best for Legal',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Legal'],
    features: ['ATS Optimized', 'Law Firm Partner Standards', 'Dedicated State Bar Box', 'Formal Serif Layout'],
    popularityRank: 6,
    releaseDate: '2025-11-01'
  },
  '2-page-education-leader': {
    slug: 'education-leader',
    type: '2-page',
    displayName: 'Education Leader',
    bestFor: 'Teachers, professors, and educational administrators.',
    bestForBadge: 'Best for Education',
    score: 98,
    filters: ['ATS Friendly', 'Professional', 'Student'],
    features: ['ATS Optimized', 'Curriculum Design Highlights', 'Teaching Credentials First', 'Clean Warm Layout'],
    popularityRank: 7,
    releaseDate: '2025-09-15'
  },
  '2-page-government-professional': {
    slug: 'government-professional',
    type: '2-page',
    displayName: 'Government Professional',
    bestFor: 'Federal employees, civil servants, and policy analysts.',
    bestForBadge: 'Best for Civil Service',
    score: 99,
    filters: ['ATS Friendly', 'Professional', 'Corporate'],
    features: ['ATS Optimized', 'Federal Compliance Formatted', 'Multi-Language Matrix', 'Strict Chronological Grid'],
    popularityRank: 8,
    releaseDate: '2025-07-20'
  },
  '2-page-modern-tech': {
    slug: 'modern-tech',
    type: '2-page',
    displayName: 'Modern Tech',
    bestFor: 'Software developers, data scientists, and system engineers.',
    bestForBadge: 'Best for Tech',
    score: 95,
    filters: ['Modern', 'Creative', 'ATS Friendly'],
    features: ['Asymmetric Split Sidebar', 'Technical Skill Meters', 'Interactive Portfolio Badges', 'Photo Silhouette Support'],
    popularityRank: 2,
    releaseDate: '2026-02-15'
  },
  '2-page-creative-edge': {
    slug: 'creative-edge',
    type: '2-page',
    displayName: 'Creative Edge',
    bestFor: 'UI/UX designers, art directors, and brand marketers.',
    bestForBadge: 'Best for Creative',
    score: 94,
    filters: ['Modern', 'Creative'],
    features: ['Vibrant Gradient Sidebar', 'Asymmetric Design Division', 'Award Showcase Box', 'Interactive Media Portfolio'],
    popularityRank: 4,
    releaseDate: '2025-07-02'
  },
  '2-page-personal-brand': {
    slug: 'personal-brand',
    type: '2-page',
    displayName: 'Personal Brand',
    bestFor: 'Independent consultants, entrepreneurs, and advisors.',
    bestForBadge: 'Best for Consulting',
    score: 95,
    filters: ['Modern', 'Creative'],
    features: ['Full-Width Bold Greeting', 'Advisory Skill Tags', 'Card-Style Portfolio Grid', 'Magazine Layout Feel'],
    popularityRank: 5,
    releaseDate: '2026-03-01'
  }
};

const faqData = [
  {
    question: "Should my resume be one page or two pages?",
    answer: "A one-page resume is best for students, recent grads, career changers, and candidates with under 5 years of relevant experience. It ensures maximum readability and forces you to catalog only high-impact metrics. A two-page resume is best for seasoned specialists, managers, executives, and consultants with 5+ years of comprehensive chronological highlights. It provides the breathing room to display publications, multiple professional roles, and large budgets."
  },
  {
    question: "Are these templates ATS friendly?",
    answer: "Yes, 100%. Our templates are explicitly built to comply with optical scanner specifications and parsing workflows used by major systems (Taleo, Workday, Greenhouse, etc.). We avoid complex tables, unreadable icons, multi-column nesting that scrambles reader orders, and text embedded inside images."
  },
  {
    question: "Which template is best for experienced professionals?",
    answer: "We highly recommend the \"Executive Elite\" (Classic) or \"ATS Prime\" (Modern) Two-Page templates. These templates allocate distinct priority sections for board credentials, multi-entity budgets, and deep hierarchical job descriptions that demonstrate progressive management."
  },
  {
    question: "Which template is best for students?",
    answer: "The \"Minimal Edge\" (Minimalist) or \"Career Launch\" (Creative) One-Page templates are perfect. They prioritize structured educational metrics, key course achievements, technical skills, and projects over dense career chronologies, ensuring the page feels beautifully balanced and full of potential."
  },
  {
    question: "Can I customize fonts and colors?",
    answer: "Absolutely. Once you click \"Use Template\", you will enter our responsive, sandboxed editor workspace where you can dynamically select from curated recruiter-approved font pairings, line heights, spacing increments, and primary color schemes instantly."
  },
  {
    question: "Can I create a matching cover letter?",
    answer: "Yes. All of our template blueprints are fully unified. In your workspace dashboard, you can click \"Create matching cover letter\" to instantly generate an aligned letter with identical headers, layouts, and typography palettes."
  }
];

export const TwoPageTemplateCard: React.FC<{
  t: any;
  idx: number;
  handlePreviewClick: (t: any) => void;
  navigate: ReturnType<typeof useNavigate>;
}> = ({ t, idx, handlePreviewClick, navigate }) => {
  const [isHovered, setIsHovered] = useState(false);

  let glassStyle = {
    glow: "from-emerald-500/12 to-transparent/5",
    borderColor: "border-stone-200/80 hover:border-emerald-500/30",
    glassBg: "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)]",
    badgeClass: "text-emerald-700 bg-emerald-500/10 border-emerald-500/15",
    buttonBg: "from-emerald-500 via-emerald-600 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-emerald-200/50",
    hoverGlowShadow: "rgba(16, 185, 129, 0.08)"
  };

  if (idx % 4 === 1) {
    glassStyle = {
      glow: "from-indigo-500/12 to-transparent/5",
      borderColor: "border-stone-200/80 hover:border-indigo-500/30",
      glassBg: "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)]",
      badgeClass: "text-indigo-700 bg-indigo-500/10 border-indigo-500/15",
      buttonBg: "from-indigo-500 via-indigo-600 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white shadow-indigo-200/50",
      hoverGlowShadow: "rgba(99, 102, 241, 0.08)"
    };
  } else if (idx % 4 === 2) {
    glassStyle = {
      glow: "from-violet-500/12 to-transparent/5",
      borderColor: "border-stone-200/80 hover:border-violet-500/30",
      glassBg: "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)]",
      badgeClass: "text-violet-700 bg-violet-500/10 border-violet-500/15",
      buttonBg: "from-violet-500 via-violet-600 to-purple-500 hover:from-violet-600 hover:to-purple-600 text-white shadow-violet-200/50",
      hoverGlowShadow: "rgba(139, 92, 246, 0.08)"
    };
  } else if (idx % 4 === 3) {
    glassStyle = {
      glow: "from-amber-500/12 to-transparent/5",
      borderColor: "border-stone-200/80 hover:border-amber-500/30",
      glassBg: "bg-white shadow-[0_4px_24px_rgba(0,0,0,0.02)]",
      badgeClass: "text-amber-800 bg-amber-500/10 border-amber-500/15",
      buttonBg: "from-amber-500 via-amber-600 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white shadow-amber-200/50",
      hoverGlowShadow: "rgba(245, 158, 11, 0.08)"
    };
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98, y: 15 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      whileHover={{ 
        y: -6, 
        scale: 1.01,
        boxShadow: `0 24px 48px -12px ${glassStyle.hoverGlowShadow}, 0 4px 16px -2px rgba(0,0,0,0.02)`,
      }}
      viewport={{ once: true, margin: "-10px" }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onClick={() => handlePreviewClick(t)}
      className={`relative text-left p-5 sm:p-6 rounded-[24px] border ${glassStyle.glassBg} ${glassStyle.borderColor} transition-all duration-500 group flex flex-col justify-between overflow-hidden cursor-pointer w-full mx-auto`}
      style={{ 
        width: '100%', 
        maxWidth: '680px', 
        height: '410px' 
      }}
    >
      {/* Subtle background glow relative to template type */}
      <div className={`absolute -top-12 -right-12 w-28 h-28 bg-gradient-to-bl ${glassStyle.glow} rounded-full opacity-75 blur-xl transition-transform duration-700 group-hover:scale-125 pointer-events-none`} />

      {/* 1. Template Preview Component (occupies exactly 80% height) */}
      <div className="h-[80%] relative rounded-2xl overflow-hidden mb-2">
        <TwoPageSideBySidePreview slug={t.slug} preview={t.preview} isHovered={isHovered} />
        
        {/* Quick Preview Button (Fades in slightly overlaying) */}
        <div className={`absolute inset-0 bg-stone-950/25 backdrop-blur-[0.5px] flex items-center justify-center transition-all duration-300 z-20 ${
          isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={(e) => {
              e.stopPropagation();
              handlePreviewClick(t);
            }}
            className="px-4 py-2 bg-white text-stone-900 font-sans font-bold text-xs rounded-xl shadow-lg border border-stone-200/50 flex items-center gap-1.5 cursor-pointer hover:bg-stone-50 transition-colors"
          >
            <Eye size={12} className="text-emerald-700" />
            Quick Preview
          </motion.button>
        </div>
      </div>

      {/* 2. Meta Information Section (occupies exactly 20% height) */}
      <div className="h-[20%] flex flex-col justify-between relative overflow-hidden select-none pt-1">
        
        {/* ALWAYS VISIBLE HEADER */}
        <div className="flex justify-between items-start gap-2 w-full pt-1">
          <div className="space-y-0.5">
            <h3 className="font-sans font-extrabold text-[13.5px] text-stone-900 leading-none group-hover:text-emerald-850 transition-colors">
              {t.meta.displayName}
            </h3>
            <span className="text-[9px] uppercase font-black text-stone-400 tracking-wider inline-block">
              Two Page Template
            </span>
          </div>
          
          {/* Animated ATS Badge on Hover */}
          <motion.div 
            animate={isHovered ? { scale: 1.04, y: -1 } : { scale: 1, y: 0 }}
            className="flex items-center gap-1 bg-emerald-50 border border-emerald-100 rounded-lg px-2 py-0.5 shrink-0 shadow-3xs"
          >
            <ShieldCheck size={11} className="text-emerald-600" />
            <span className="text-[10px] font-sans font-black text-emerald-800">
              {t.atsPercent}% ATS
            </span>
          </motion.div>
        </div>

        {/* METADATA SLIDE-UP DUAL PANEL (EXTREMELY PREMIUM INTERACTION) */}
        <div className="relative h-[32px] w-full overflow-hidden mt-1">
          {/* Default state: Industry tags (fades out and shifts up on hover) */}
          <div 
            className="absolute inset-0 flex items-center transition-all duration-300 ease-out"
            style={{
              opacity: isHovered ? 0 : 1,
              transform: isHovered ? 'translateY(-15px)' : 'translateY(0)'
            }}
          >
            <div className="flex flex-wrap gap-1 items-center w-full">
              <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-800 text-[10px] font-bold rounded-md border border-emerald-500/10">
                {t.meta.bestForBadge.replace('Best for ', '')}
              </span>
              {t.meta.filters.slice(0, 2).map((f: string, i: number) => (
                <span key={i} className="px-1.5 py-0.5 bg-stone-100 text-stone-600 text-[10px] font-bold rounded-md">
                  {f}
                </span>
              ))}
            </div>
          </div>

          {/* Hover state: Buttons slide up from the bottom */}
          <div 
            className="absolute inset-0 flex items-center gap-2 transition-all duration-300 ease-out"
            style={{
              opacity: isHovered ? 1 : 0,
              transform: isHovered ? 'translateY(0)' : 'translateY(15px)'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                handlePreviewClick(t);
              }}
              className="flex-1 py-1.5 rounded-lg font-sans font-bold text-[10px] tracking-wider uppercase bg-white hover:bg-stone-50 border border-stone-200 text-stone-600 transition-all cursor-pointer shadow-3xs text-center"
            >
              Preview
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate(`/resume-builder?template=${t.slug}&format=2-page`);
              }}
              className={`flex-1 py-1.5 rounded-lg font-sans font-bold text-[10px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1 shadow-sm border border-transparent bg-gradient-to-r ${glassStyle.buttonBg} cursor-pointer`}
            >
              <span>Use Template</span>
              <svg className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ResumeTemplatesIndexPage: React.FC = () => {
  const navigate = useNavigate();

  // Primary states
  const [activeTab, setActiveTab] = useState<'1-page' | '2-page'>('1-page');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');
  const [sortBy, setSortBy] = useState<'Popularity' | 'Newest' | 'ATS Score'>('Popularity');
  const [visibleCount, setVisibleCount] = useState(24);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Modal State for Full Template Preview Detail
  const [previewTemplate, setPreviewTemplate] = useState<{
    slug: string;
    type: '1-page' | '2-page';
    name: string;
    displayName: string;
    atsPercent: number;
    designDescription: string;
    preview: React.ReactNode;
    meta: TemplateMeta;
  } | null>(null);

  // Compile active layouts based on Tab selection
  const rawTemplates = useMemo(() => {
    return activeTab === '1-page' ? resumeTemplates1Page : resumeTemplates2Page;
  }, [activeTab]);

  // Combine raw templates with our advanced meta descriptors
  const enrichedTemplates = useMemo(() => {
    return rawTemplates.map((template) => {
      const key = `${activeTab}-${template.slug}`;
      const meta = templateMetadata[key] || {
        slug: template.slug,
        type: activeTab,
        displayName: template.name,
        bestFor: template.designDescription,
        bestForBadge: 'Best for Professionals',
        score: template.atsPercent,
        filters: ['ATS Friendly', 'Professional'],
        features: ['✓ ATS Optimized', '✓ Recruiter Approved'],
        popularityRank: 5,
        releaseDate: '2025-01-01'
      };
      return {
        ...template,
        meta
      };
    });
  }, [rawTemplates, activeTab]);

  // Handle live search & filtering
  const filteredTemplates = useMemo(() => {
    let result = enrichedTemplates.filter((t) => {
      // Search matching
      const matchesSearch = 
        t.meta.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.meta.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.tag.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Filter matching
      const matchesFilter = 
        selectedFilter === 'All' || 
        t.meta.filters.includes(selectedFilter) ||
        (selectedFilter === 'ATS Friendly' && t.atsPercent >= 98) ||
        (selectedFilter === 'Professional' && t.meta.filters.includes('Professional')) ||
        (selectedFilter === 'Modern' && t.meta.filters.includes('Modern')) ||
        (selectedFilter === 'Minimal' && t.meta.filters.includes('Minimal')) ||
        (selectedFilter === 'Executive' && t.meta.filters.includes('Executive')) ||
        (selectedFilter === 'Creative' && t.meta.filters.includes('Creative')) ||
        (selectedFilter === 'Student' && t.meta.filters.includes('Student')) ||
        (selectedFilter === 'Corporate' && t.meta.filters.includes('Corporate'));

      return matchesSearch && matchesFilter;
    });

    // Handle Sorting
    if (sortBy === 'ATS Score') {
      result.sort((a, b) => b.atsPercent - a.atsPercent);
    } else if (sortBy === 'Newest') {
      result.sort((a, b) => new Date(b.meta.releaseDate).getTime() - new Date(a.meta.releaseDate).getTime());
    } else {
      // Default: Popularity
      result.sort((a, b) => a.meta.popularityRank - b.meta.popularityRank);
    }

    return result;
  }, [enrichedTemplates, searchQuery, selectedFilter, sortBy]);

  // Slice based on Load More state
  const visibleTemplates = useMemo(() => {
    return filteredTemplates.slice(0, visibleCount);
  }, [filteredTemplates, visibleCount]);

  const handlePreviewClick = (template: any) => {
    setZoomLevel(1);
    setPreviewTemplate({
      slug: template.slug,
      type: activeTab,
      name: template.name,
      displayName: template.meta.displayName,
      atsPercent: template.atsPercent,
      designDescription: template.meta.bestFor,
      preview: template.preview,
      meta: template.meta
    });
  };

  return (
    <div className="min-h-screen bg-white bg-[radial-gradient(#0F766E0a_1px,transparent_1px)] [background-size:18px_18px] pt-24 pb-20 relative overflow-hidden font-sans text-[#1C2B33]">
      <SEO 
        title="ATS-Friendly Resume Templates | Discovery Library" 
        description="Browse premium, ATS-compliant resume templates designed to get interviews. Filter by page length or professional category. Free PDF export." 
        canonical="https://lunchresume.com/resume-templates" 
      />
      
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: 'https://lunchresume.com/' },
          { name: 'Resume Templates', item: 'https://lunchresume.com/resume-templates' }
        ]}
      />

      {/* Backside soft glowing orbs to enhance the glassmorphic backdrop-blur */}
      <div className="absolute top-12 left-1/4 w-80 h-80 bg-emerald-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '8s' }} />
      <div className="absolute top-1/4 right-1/4 w-[350px] h-[350px] bg-indigo-400/8 rounded-full blur-3xl pointer-events-none -z-10 animate-pulse" style={{ animationDuration: '10s' }} />
      <div className="absolute top-2/4 left-1/3 w-80 h-80 bg-violet-400/8 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-amber-400/6 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* ================= SECTION 1: COMPACT INTRO ================= */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 pt-6 pb-2">
        <div className="relative bg-white/40 backdrop-blur-xl border border-white/80 rounded-3xl p-6 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col items-center justify-center text-center gap-6">
          {/* Decorative interior subtle glow */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-emerald-500/10 to-transparent rounded-br-full pointer-events-none" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-gradient-to-tl from-indigo-500/5 to-transparent rounded-tl-full pointer-events-none" />

          {/* Left: Titles & Display Badge */}
          <div className="space-y-2.5 text-center flex flex-col items-center justify-center relative z-10 w-full">
            <div className="flex flex-wrap items-center justify-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-serif font-black text-[#1C2B33] tracking-tight text-center">
                Resume Templates
              </h1>
            </div>
            <p className="text-[#46504D] text-xs sm:text-sm max-w-xl leading-relaxed text-center">
              ATS-friendly resume templates designed for students, professionals, and executives. Select a template and create your own instantly.
            </p>
          </div>
        </div>

        {/* Tab/Category Toggle Slider */}
        <div className="flex items-center justify-center py-4 mt-4 text-center">
          <div className="flex items-center gap-1.5 bg-white/40 backdrop-blur-xl p-1.5 rounded-2xl border border-white/85 shadow-[0_10px_30px_rgba(0,0,0,0.02)]">
            <button
              onClick={() => {
                setActiveTab('1-page');
                setSelectedFilter('All');
                setVisibleCount(24);
              }}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-105 cursor-pointer uppercase tracking-wider ${
                activeTab === '1-page'
                  ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20 border-2 border-emerald-600 ring-2 ring-emerald-500/10'
                  : 'text-[#46504D] hover:text-[#1C2B33] bg-white/30 hover:bg-white/70 border border-[#E2E8E6] hover:border-stone-300/80 hover:shadow-sm'
              }`}
            >
              One Page Templates
            </button>
            <button
              onClick={() => {
                setActiveTab('2-page');
                setSelectedFilter('All');
                setVisibleCount(24);
              }}
              className={`px-5 py-2.5 text-xs font-bold rounded-xl transition-all duration-300 transform active:scale-95 hover:scale-105 cursor-pointer uppercase tracking-wider ${
                activeTab === '2-page'
                  ? 'bg-emerald-800 text-white shadow-lg shadow-emerald-800/20 border-2 border-emerald-600 ring-2 ring-emerald-500/10'
                  : 'text-[#46504D] hover:text-[#1C2B33] bg-white/30 hover:bg-white/70 border border-[#E2E8E6] hover:border-stone-300/80 hover:shadow-sm'
              }`}
            >
              Two Page Templates
            </button>
          </div>
        </div>
      </section>

      {/* ================= SECTION 2: STICKY FILTER BAR ================= */}
      <div className="sticky top-[72px] lg:top-[85px] z-30 bg-white/45 backdrop-blur-xl border-y border-white/80 py-4 px-6 shadow-[0_10px_40px_rgba(0,0,0,0.02),0_1px_1px_rgba(255,255,255,0.8)_inset] transition-all">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center md:justify-between gap-4 text-left">
          
          {/* Horizontal category scroll filters */}
          <div className="flex-1 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-1.5 pb-1 md:pb-0">
            <div className="flex items-center gap-1.5 px-1.5 text-[#0F766E] font-black text-[11px] uppercase tracking-wider shrink-0 mr-1.5 bg-emerald-500/8 rounded-lg py-1 border border-emerald-500/10">
              <Filter size={12} className="text-emerald-700 animate-pulse" />
              <span>Category</span>
            </div>
            {['All', 'ATS Friendly', 'Professional', 'Modern', 'Minimal', 'Executive', 'Creative', 'Student', 'Corporate'].map((filter) => {
              const isActive = selectedFilter === filter;
              return (
                <button
                  key={filter}
                  onClick={() => {
                    setSelectedFilter(filter);
                    setVisibleCount(24);
                  }}
                  className={`px-4.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer border ${
                    isActive
                      ? 'bg-emerald-800 border-emerald-700/40 text-white shadow-md scale-102'
                      : 'bg-white/50 border-[#E2E8E6]/80 text-[#46504D] hover:bg-white/95 hover:border-emerald-500/40 hover:text-[#1C2B33] shadow-[0_2px_8px_-2px_rgba(0,0,0,0.02)]'
                  }`}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Search controller & Sort selector */}
          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            {/* Sort Selector */}
            <div className="relative shrink-0 flex items-center bg-white/50 border border-[#E2E8E6] rounded-xl p-0.5 px-3.5 shadow-inner">
              <span className="text-[10px] font-extrabold text-emerald-700 uppercase tracking-wider mr-1.5 bg-emerald-500/5 px-1.5 py-0.5 rounded">Sort</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-transparent text-[#46504D] font-extrabold text-xs focus:outline-none py-2 cursor-pointer pr-1"
              >
                <option value="Popularity">Popularity</option>
                <option value="Newest">Newest</option>
                <option value="ATS Score">ATS Score</option>
              </select>
            </div>
          </div>

        </div>
      </div>

      {/* ================= SECTION 3: TEMPLATE GRID ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        {visibleTemplates.length > 0 ? (
          activeTab === '2-page' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 w-full">
              {visibleTemplates.map((t, idx) => (
                <TwoPageTemplateCard
                  key={t.slug}
                  t={t}
                  idx={idx}
                  handlePreviewClick={handlePreviewClick}
                  navigate={navigate}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleTemplates.map((t, idx) => {
                let glassStyle = {
                  glow: "from-emerald-500/12 to-transparent/5",
                  borderColor: "border-emerald-500/15 group-hover:border-emerald-500/40",
                  glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(16,185,129,0.03)]",
                  badgeClass: "text-emerald-700 bg-emerald-500/10 border-emerald-500/15",
                  buttonBg: "from-emerald-500/8 via-emerald-600/5 to-teal-500/8 hover:from-emerald-500/20 hover:to-teal-500/20 border-white/60 hover:border-emerald-500/30 text-emerald-800 hover:text-emerald-900",
                  hoverGlowShadow: "rgba(16, 185, 129, 0.15)"
                };

                if (idx % 4 === 1) {
                  glassStyle = {
                    glow: "from-indigo-500/12 to-transparent/5",
                    borderColor: "border-indigo-500/15 group-hover:border-indigo-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(99,102,241,0.03)]",
                    badgeClass: "text-indigo-700 bg-indigo-500/10 border-indigo-500/15",
                    buttonBg: "from-indigo-500/8 via-indigo-600/5 to-violet-500/8 hover:from-indigo-500/20 hover:to-violet-500/20 border-white/60 hover:border-indigo-500/30 text-indigo-800 hover:text-indigo-900",
                    hoverGlowShadow: "rgba(99, 102, 241, 0.15)"
                  };
                } else if (idx % 4 === 2) {
                  glassStyle = {
                    glow: "from-violet-500/12 to-transparent/5",
                    borderColor: "border-violet-500/15 group-hover:border-violet-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(139,92,246,0.03)]",
                    badgeClass: "text-violet-700 bg-violet-500/10 border-violet-500/15",
                    buttonBg: "from-violet-500/8 via-violet-600/5 to-purple-500/8 hover:from-violet-500/20 hover:to-purple-500/20 border-white/60 hover:border-violet-500/30 text-violet-800 hover:text-violet-900",
                    hoverGlowShadow: "rgba(139, 92, 246, 0.15)"
                  };
                } else if (idx % 4 === 3) {
                  glassStyle = {
                    glow: "from-amber-500/12 to-transparent/5",
                    borderColor: "border-amber-500/15 group-hover:border-amber-500/40",
                    glassBg: "bg-white/45 border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.07),0_4px_12px_-3px_rgba(245,158,11,0.03)]",
                    badgeClass: "text-amber-800 bg-amber-500/10 border-amber-500/15",
                    buttonBg: "from-amber-500/8 via-amber-600/5 to-orange-500/8 hover:from-amber-500/20 hover:to-orange-500/20 border-white/60 hover:border-amber-500/30 text-amber-800 hover:text-amber-900",
                    hoverGlowShadow: "rgba(245, 158, 11, 0.15)"
                  };
                }

                return (
                  <motion.div 
                    key={t.slug}
                    initial={{ opacity: 0, scale: 0.96, y: 25 }}
                    whileInView={{ opacity: 1, scale: 1, y: 0 }}
                    whileHover={{ 
                      y: -6, 
                      scale: 1.02,
                      boxShadow: `0 20px 40px -15px ${glassStyle.hoverGlowShadow}`,
                    }}
                    viewport={{ once: true, margin: "-40px" }}
                    onClick={() => handlePreviewClick(t)}
                    className={`text-left p-5 rounded-3xl border ${glassStyle.glassBg} ${glassStyle.borderColor} backdrop-blur-md transition-all duration-300 group flex flex-col justify-between min-h-[460px] relative overflow-hidden cursor-pointer`}
                  >
                    {/* Inner crystal reflection / shine effect */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/18 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    {/* Gradient subtle glow */}
                    <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl ${glassStyle.glow} rounded-bl-full opacity-60 transition-transform duration-500 group-hover:scale-125 pointer-events-none`} />

                    <div className="flex-1 flex flex-col gap-4">
                      {/* Document mini window */}
                      <div className="aspect-[210/297] bg-white/75 border border-white/90 rounded-2xl overflow-hidden p-2.5 group-hover:scale-[1.015] shadow-inner transition-all duration-300 relative" style={{ containerType: 'inline-size' }}>
                        {t.preview}

                        <div className="absolute inset-0 bg-black/2 backdrop-blur-[0.5px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                      </div>

                      {/* Header tags and text */}
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mt-1 text-left gap-2 w-full px-1">
                        <div className="space-y-1">
                          <span className="font-sans font-black text-[14.5px] text-[#1C2B33] leading-tight group-hover:text-black transition-colors block">
                            {t.meta.displayName}
                          </span>
                          <span className="inline-block px-1.5 py-0.5 bg-teal-50 text-teal-800 text-[9.5px] font-extrabold rounded-sm uppercase tracking-wider">
                            {t.meta.bestForBadge}
                          </span>
                        </div>
                        <span className={`text-[10.5px] font-sans font-bold px-2.5 py-0.5 rounded-full border ${glassStyle.badgeClass} shrink-0`}>
                          {t.atsPercent}% ATS
                        </span>
                      </div>
                    </div>

                    {/* Highly creative glass type button */}
                    <div className="mt-4 px-1 flex gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handlePreviewClick(t);
                        }}
                        className="flex-1 py-3 rounded-xl font-sans font-bold text-[11.5px] tracking-wider uppercase bg-white/60 hover:bg-white/95 border border-stone-200 text-stone-700 transition-all cursor-pointer shadow-[0_5px_15px_rgba(0,0,0,0.02)]"
                      >
                        Preview
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/resume-builder?template=${t.slug}&format=${activeTab}`);
                        }}
                        className={`flex-1 py-3 rounded-xl font-sans font-bold text-[11.5px] tracking-wider uppercase transition-all duration-300 flex items-center justify-center gap-1.5 shadow-[0_5px_15px_rgba(0,0,0,0.02)] border bg-gradient-to-r backdrop-blur-md ${glassStyle.buttonBg} cursor-pointer`}
                      >
                        <span>Use</span>
                        <svg className="w-3.5 h-3.5 transition-transform duration-350 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                        </svg>
                      </button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )
        ) : (
          <div className="py-16 text-center max-w-sm mx-auto space-y-3">
            <XCircle size={32} className="text-stone-300 mx-auto" />
            <h3 className="font-serif font-bold text-stone-950 text-base">No matching templates found</h3>
            <p className="text-xs text-stone-500 leading-relaxed">
              We couldn't find any blueprints fitting your search query or filters. Clear filters to see all available templates.
            </p>
            <button
              onClick={() => {
                setSelectedFilter('All');
                setSearchQuery('');
              }}
              className="mt-2 px-4 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-lg transition-colors cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        )}
      </section>

      {/* ================= SECTION 4: LOAD MORE / PAGINATION ================= */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 pb-16 text-center">
        {filteredTemplates.length > visibleCount ? (
          <div className="space-y-3">
            <button
              onClick={() => setVisibleCount((prev) => prev + 24)}
              className="px-8 py-3 bg-white hover:bg-stone-50 text-stone-800 font-extrabold text-xs rounded-xl border border-stone-200 shadow-xs transition-all uppercase tracking-wider inline-flex items-center gap-2 cursor-pointer"
              id="load-more-templates-btn"
            >
              <RefreshCw size={12} className="text-stone-500 animate-spin-hover" /> Load More Templates
            </button>
            <p className="text-[10.5px] text-stone-400 font-semibold uppercase tracking-wider">
              Showing {visibleTemplates.length} of {filteredTemplates.length} matches
            </p>
          </div>
        ) : filteredTemplates.length > 0 ? (
          <div className="bg-stone-50/60 border border-stone-200/40 rounded-2xl p-4 max-w-lg mx-auto">
            <p className="text-xs font-bold text-stone-600 flex items-center justify-center gap-1.5">
              <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
              <span>All available {filteredTemplates.length} premium blueprints loaded</span>
            </p>
            <p className="text-[11px] text-stone-400 mt-1 leading-relaxed">
              Need a completely custom format? Customize fonts, lines, margins, and templates in our sandboxed editor.
            </p>
          </div>
        ) : null}
      </section>

      {/* ================= SECTION 5: ONE PAGE VS TWO PAGE GUIDE ================= */}
      <section className="bg-white/15 backdrop-blur-md border-y border-white/60 py-12 px-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.02)]">
        <div className="max-w-4xl mx-auto space-y-8 text-left">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
              One Page vs. Two Page Resume Guide
            </h2>
            <p className="text-emerald-800 text-xs font-bold uppercase tracking-wider">
              Strategic real estate comparison for professional resumes
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            {/* One Page Column */}
            <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_12px_-3px_rgba(16,185,129,0.03)] hover:border-emerald-500/20 hover:shadow-[0_20px_40px_-15px_rgba(16,185,129,0.1)] transition-all duration-300 relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-emerald-500/8 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <span className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-800 font-extrabold flex items-center justify-center text-xs border border-emerald-500/10">1</span>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-sm">One Page Format</h3>
                  <p className="text-[11px] text-[#0F766E] font-bold uppercase tracking-wider">Strict Single-Page Real Estate</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed relative z-10">
                Best for students, early career professionals, or candidates transitioning paths. Single-page summaries force high density and quick chronological metrics that grab reviewer attention in under 6 seconds.
              </p>
              <div className="space-y-2 pt-3 border-t border-white/60 relative z-10">
                <span className="text-[10px] uppercase font-black text-stone-400 tracking-widest block">Best For:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Students</span>
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Graduates</span>
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Career Changers</span>
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Early Careers</span>
                </div>
              </div>
            </div>

            {/* Two Page Column */}
            <div className="bg-white/45 backdrop-blur-md p-6 rounded-3xl border border-white/70 shadow-[0_10px_30px_-5px_rgba(0,0,0,0.05),0_4px_12px_-3px_rgba(99,102,241,0.03)] hover:border-indigo-500/20 hover:shadow-[0_20px_40px_-15px_rgba(99,102,241,0.1)] transition-all duration-300 relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-indigo-500/8 to-transparent rounded-bl-full pointer-events-none" />
              <div className="flex items-center gap-2.5 relative z-10">
                <span className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-800 font-extrabold flex items-center justify-center text-xs border border-indigo-500/10">2</span>
                <div>
                  <h3 className="font-serif font-bold text-stone-900 text-sm">Two Page Format</h3>
                  <p className="text-[11px] text-indigo-800 font-bold uppercase tracking-wider">Expanded Double-Page Real Estate</p>
                </div>
              </div>
              <p className="text-xs text-stone-600 leading-relaxed relative z-10">
                Best for executives, seasoned directors, or deep technical managers with 5+ years of milestones. Allows ample room to display large scale projects, publications, budgets, and progressive titles.
              </p>
              <div className="space-y-2 pt-3 border-t border-white/60 relative z-10">
                <span className="text-[10px] uppercase font-black text-stone-400 tracking-widest block">Best For:</span>
                <div className="grid grid-cols-2 gap-2 text-xs font-bold text-stone-700">
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Managers</span>
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Executives</span>
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Senior Specialists</span>
                  <span className="flex items-center gap-1.5 text-stone-600">✓ Lead Consultants</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 6: ATS TRANSPARENCY ================= */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-left">
        <div className="bg-white/45 backdrop-blur-md border border-white/75 rounded-3xl p-6 md:p-8 space-y-4 shadow-[0_10px_30px_-5px_rgba(16,185,129,0.05)] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-emerald-500/10 to-transparent rounded-bl-full pointer-events-none" />
          <div className="flex items-center gap-2.5 relative z-10">
            <ShieldCheck className="text-emerald-700" size={21} />
            <h3 className="text-lg font-serif font-bold text-stone-900 tracking-tight">
              ATS Integrity & Parser Transparency
            </h3>
          </div>
          <p className="text-stone-600 text-xs leading-relaxed max-w-3xl relative z-10">
            Applicant Tracking Systems (ATS) scan resumes for plain text, matching keyword relevance and parsing credentials. To score highest, resumes must bypass scanner limitations.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 pt-4 border-t border-white/50 relative z-10">
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-stone-900">No Complex Nested Tables</h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">Many tracking systems read across columns, scrambling content. Simple grid layouts keep reading flow linear.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-stone-900">Standard Heading Formats</h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">Tracking algorithms search for standard terms like "Work Experience" or "Education". Cryptic titles fail.</p>
            </div>
            <div className="space-y-1">
              <h4 className="text-xs font-bold text-stone-900">Clean, Scalable Typography</h4>
              <p className="text-[11px] text-stone-500 leading-relaxed">Using standard Unicode fonts guarantees visual details convert cleanly into parser files.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= SECTION 7: FAQ ================= */}
      <section className="py-12 px-6 max-w-4xl mx-auto text-left">
        <div className="text-center max-w-2xl mx-auto space-y-2 mb-8">
          <HelpCircle className="text-emerald-700 mx-auto" size={24} />
          <h2 className="text-2xl font-serif font-bold text-stone-900 tracking-tight">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3 text-left max-w-3xl mx-auto">
          {faqData.map((faq, index) => {
            const isOpen = activeFaq === index;
            return (
              <div key={index} className="bg-white/40 backdrop-blur-md border border-white/70 rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-emerald-500/20 transition-all duration-300 relative">
                <button
                  onClick={() => setActiveFaq(isOpen ? null : index)}
                  className="w-full p-4 flex items-center justify-between text-left font-bold text-xs sm:text-sm text-stone-850 hover:bg-white/30 transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <ChevronDown size={14} className={`text-stone-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
                </button>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="border-t border-white/40 bg-white/10"
                    >
                      <p className="p-4 text-[12px] text-stone-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================= SECTION 8: FINAL CTA ================= */}
      <section className="py-16 px-6 max-w-4xl mx-auto text-center">
        <div className="bg-stone-950/90 backdrop-blur-md text-white rounded-[32px] p-8 md:p-12 relative overflow-hidden shadow-2xl border border-stone-800/80">
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/4 to-white/0 opacity-60 pointer-events-none" />
          <div className="absolute -top-12 -left-12 w-64 h-64 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '6s' }} />
          <div className="absolute -bottom-12 -right-12 w-64 h-64 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: '8s' }} />
          <div className="relative space-y-6 max-w-xl mx-auto z-10">
            <h2 className="text-2xl sm:text-3xl font-serif text-white tracking-tight font-normal">
              Ready to build your resume?
            </h2>
            <p className="text-stone-300 text-xs sm:text-sm leading-relaxed max-w-md mx-auto">
              Join thousands of successful candidates who used our ATS-friendly builder to design high-impact templates and land their dream interviews.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/resume-builder')}
                className="px-8 py-3.5 bg-[#8CFBD4] hover:bg-[#a5ffe0] text-stone-950 font-bold text-xs rounded-xl transition-all uppercase tracking-wider shadow-md hover:shadow-teal-400/10 inline-flex items-center gap-1.5 cursor-pointer"
              >
                Build My Resume <ArrowUpRight size={14} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ================= DETAILED TEMPLATE PREVIEW MODAL ================= */}
      <AnimatePresence>
        {previewTemplate && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark Backdrop Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setPreviewTemplate(null)}
              className="absolute inset-0 bg-stone-950/60 backdrop-blur-xs"
            />
            
            {/* Modal Dialog Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className={`relative w-full bg-white rounded-3xl overflow-hidden shadow-2xl border border-stone-200 flex flex-col md:flex-row max-h-[90vh] md:max-h-[85vh] z-10 transition-all ${
                previewTemplate.type === '2-page' ? 'max-w-6xl' : 'max-w-5xl'
              }`}
            >
              {/* Close Button */}
              <button
                onClick={() => setPreviewTemplate(null)}
                className="absolute top-4 right-4 text-stone-400 hover:text-stone-800 p-1.5 bg-stone-100 rounded-full hover:bg-stone-200 transition-colors z-20 cursor-pointer"
              >
                <X size={18} />
              </button>

              {/* Left Side: Layout Preview with Zoom Controls */}
              <div className={`w-full bg-stone-50 border-r border-stone-100 p-6 flex flex-col justify-between max-h-[55vh] md:max-h-none ${
                previewTemplate.type === '2-page' ? 'md:w-[60%]' : 'md:w-[55%]'
              }`}>
                {/* Zoom Control Panel */}
                <div className="flex items-center justify-between mb-4 bg-white/85 backdrop-blur-md px-4 py-2 rounded-xl border border-stone-200/50 shadow-3xs">
                  <span className="text-[10px] uppercase font-black text-stone-500 tracking-wider">Interactive Preview</span>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => setZoomLevel(prev => Math.max(0.75, prev - 0.25))}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="text-[11px] font-mono font-bold text-stone-500 w-12 text-center">{Math.round(zoomLevel * 100)}%</span>
                    <button 
                      onClick={() => setZoomLevel(prev => Math.min(2.5, prev + 0.25))}
                      className="w-7 h-7 rounded-lg bg-stone-100 hover:bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                    <button 
                      onClick={() => setZoomLevel(1)}
                      className="text-[10px] font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded-md transition-colors cursor-pointer ml-1"
                    >
                      Reset
                    </button>
                  </div>
                </div>

                {/* Scrollable Preview Area */}
                <div className="flex-1 overflow-auto p-4 flex items-center justify-center bg-stone-100/40 rounded-2xl border border-stone-200/30 relative min-h-[300px] md:min-h-[420px]">
                  <div 
                    className="transition-transform duration-200 w-full"
                    style={{ 
                      transform: `scale(${zoomLevel})`, 
                      transformOrigin: 'center center',
                      maxWidth: previewTemplate.type === '2-page' ? '780px' : '420px',
                    }}
                  >
                    {previewTemplate.type === '2-page' ? (
                      <div className="w-full aspect-[210/125] min-h-[240px] md:min-h-[340px]">
                        <TwoPageSideBySidePreview slug={previewTemplate.slug} preview={previewTemplate.preview} />
                      </div>
                    ) : (
                      <div className="w-full max-w-[400px] mx-auto aspect-[210/297] bg-white border border-stone-200 rounded-xl shadow-lg relative overflow-hidden" style={{ containerType: 'inline-size' }}>
                        <div className="absolute inset-0 p-4 bg-white h-full pointer-events-none select-none">
                          {previewTemplate.preview}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Meta Descriptor Panel */}
              <div className={`w-full p-6 md:p-8 flex flex-col justify-between overflow-y-auto text-left ${
                previewTemplate.type === '2-page' ? 'md:w-[40%]' : 'md:w-[45%]'
              }`}>
                <div className="space-y-5">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 bg-stone-100 text-stone-700 text-[10px] font-extrabold rounded-md">
                        {previewTemplate.type === '1-page' ? 'One Page Format' : 'Two Page Format'}
                      </span>
                      <span className="px-2.5 py-0.5 bg-emerald-50 text-emerald-800 text-[10px] font-extrabold rounded-md flex items-center gap-1 border border-emerald-100 shadow-3xs">
                        <ShieldCheck size={11.5} className="text-emerald-600 shrink-0" />
                        {previewTemplate.atsPercent}% ATS Score
                      </span>
                    </div>
                    <h2 className="text-2xl font-serif font-black text-stone-900 tracking-tight mt-1">
                      {previewTemplate.displayName}
                    </h2>
                    <span className="inline-block px-2 py-0.5 bg-teal-50 text-teal-800 text-[10.5px] font-bold rounded-sm uppercase tracking-wider">
                      {previewTemplate.meta.bestForBadge}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block">Design Description</span>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {previewTemplate.designDescription}
                    </p>
                  </div>

                  <div className="space-y-2 border-t border-stone-100 pt-4">
                    <span className="text-[10px] font-extrabold text-stone-400 uppercase tracking-widest block">Key Features</span>
                    <ul className="text-xs text-stone-700 space-y-2">
                      {previewTemplate.meta.features.map((f: string, i: number) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full shrink-0" />
                          <span>{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-8 pt-4 border-t border-stone-100/80 flex flex-col sm:flex-row gap-2.5">
                  <button
                    onClick={() => setPreviewTemplate(null)}
                    className="w-full sm:w-1/3 py-3 bg-stone-100 hover:bg-stone-200 text-stone-850 font-bold text-xs rounded-xl transition-all cursor-pointer text-center"
                  >
                    Back to Gallery
                  </button>
                  <button
                    onClick={() => navigate(`/resume-builder?template=${previewTemplate.slug}&format=${previewTemplate.type}`)}
                    className="w-full sm:w-2/3 py-3 bg-[#0F766E] hover:bg-[#0b5a54] text-white font-bold text-xs rounded-xl transition-all cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-md"
                  >
                    Use This Template <ArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
