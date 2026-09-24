import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, X, ChevronRight, ChevronLeft, Plus, Trash2, Printer, RefreshCw, Send, CheckCircle, 
  Sparkles, Award, FileText, BarChart2, Briefcase, GraduationCap, Code, Users, BrainCircuit, 
  Search, Zap, BookOpen, ThumbsUp, Sliders, Palette, Type, Settings, Eye, EyeOff,
  Undo, Redo, Save, Moon, Sun, Download, User, Globe, Calendar, Languages,
  RotateCcw, ZoomIn, ZoomOut, Maximize2, Sparkle, ArrowUpRight, Menu, Grid, Filter,
  CheckCircle2, ChevronDown, ChevronUp, Copy, Heart, Info, Lock, Paintbrush, MoveUp, MoveDown, HelpCircle,
  Square, Layers
} from 'lucide-react';
import { ResumeData, Experience, Education, Project, Certification, Language, Award as AwardType, Reference, TemplateType, StyleConfig } from '../types';
import { ResumePreviewer } from './Diagrams';
import { ResumeDesignStore as GlobalResumeDesignStore } from '../stores/ResumeDesignStore';
import { ResumeContentStore as GlobalResumeContentStore, EMPTY_RESUME_DATA, SEED_RESUME_DATA } from '../stores/ResumeContentStore';
import { ResumeTemplateStore } from '../stores/ResumeTemplateStore';

// Define the 11 steps for the Vertical Stepper (removing Design Customization step as requested)
const BUILDER_STEPS = [
  { id: 1, name: 'Personal Info', desc: 'Contact details & socials', icon: User, required: ['fullName', 'email'] },
  { id: 2, name: 'Summary', desc: 'Professional elevator pitch', icon: FileText, required: [] },
  { id: 3, name: 'Work History', desc: 'Career experience', icon: Briefcase, required: [] },
  { id: 4, name: 'Education', desc: 'Academic background', icon: GraduationCap, required: [] },
  { id: 5, name: 'Skills Inventory', desc: 'Core toolsets & skills', icon: Code, required: [] },
  { id: 6, name: 'Certifications', desc: 'Licenses & credentials', icon: Award, required: [] },
  { id: 7, name: 'Languages', desc: 'Proficiencies & dialects', icon: Languages, required: [] },
  { id: 8, name: 'Key Projects', desc: 'Personal & team work', icon: Briefcase, required: [] },
  { id: 9, name: 'Awards', desc: 'Honors & achievements', icon: Award, required: [] },
  { id: 10, name: 'References', desc: 'Professional recommendations', icon: Users, required: [] },
  { id: 11, name: 'Review & Download', desc: 'Validate and print PDF', icon: Download, required: [] },
];

const PRESET_SKILLS = [
  "React", "TypeScript", "JavaScript", "Next.js", "TailwindCSS", "Node.js", 
  "Express", "Python", "SQL", "PostgreSQL", "MongoDB", "Docker", "AWS", 
  "Git", "GraphQL", "REST APIs", "Agile", "Scrum", "Product Management", 
  "UI/UX Design", "Figma", "System Architecture", "CI/CD", "Machine Learning"
];

const SUGGESTED_BULLETS = {
  software: [
    "Architected dynamic single-page web applications using React and TypeScript, increasing performance speed by 42%.",
    "Spearheaded migration of legacy services to microservices infrastructure, cutting database loading latency in half.",
    "Engineered robust CI/CD pipelines to automate compilation and deployment, reducing release delivery lifecycle by 4 days.",
    "Collaborated with product, design, and analytics cross-functional teams to translate customer requirements into clean code."
  ],
  pm: [
    "Defined product roadmap and managed cross-functional engineering squads of 12+ developers to ship MVP 3 weeks ahead of schedule.",
    "Conducted rigorous data analytics on user conversion behavior, leading to interface iterations that boosted retention by 18%.",
    "Owned agile sprint cycles, backlog grooming, and user story definitions to ensure alignment with business strategic goals.",
    "Managed stakeholder communications and alignment across sales, marketing, and customer success departments."
  ],
  marketing: [
    "Devised high-impact social media marketing campaigns, expanding overall organic brand reach and impressions by 120%.",
    "Formulated robust SEO and content marketing strategies, securing page-1 rankings for 18 competitive keywords.",
    "Optimized paid ad budgets across Google and Meta, slicing customer acquisition cost (CAC) by 25%.",
    "Authored compelling marketing copies and newsletters with click-through rates exceeding industry averages by 8%."
  ]
};

export const PremiumResumeBuilder: React.FC<{ initialFormat?: '1-page' | '2-page'; initialTemplate?: TemplateType }> = ({ 
  initialFormat = '1-page', 
  initialTemplate = 'modern-tech' 
}) => {
  const navigate = useNavigate();

  // --- CORE SYSTEM STATES ---
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([1]));
  const [resumeName, setResumeName] = useState<string>("My LunchResume Workspace");
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'saved' | 'saving' | 'draft'>('saved');
  const [zoomMode, setZoomMode] = useState<'auto' | 'custom'>('auto');
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Health Panel Expanded state with sessionStorage persistence
  const [isHealthPanelExpanded, setIsHealthPanelExpanded] = useState<boolean>(() => {
    try {
      const stored = sessionStorage.getItem('lunch-resume-health-panel-expanded');
      return stored ? JSON.parse(stored) : false; // Defaults to collapsed
    } catch {
      return false;
    }
  });

  const toggleHealthPanel = () => {
    setIsHealthPanelExpanded(prev => {
      const newVal = !prev;
      try {
        sessionStorage.setItem('lunch-resume-health-panel-expanded', JSON.stringify(newVal));
      } catch (e) {}
      return newVal;
    });
  };

  // --- NEW WORKSPACE PARSING & PRESENTATION STATES ---
  const [viewMode, setViewMode] = useState<'single' | 'continuous' | 'facing'>('continuous');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [resumeMetrics, setResumeMetrics] = useState<{
    pageCount: number;
    utilizations: number[];
    contentDensity: 'sparse' | 'balanced' | 'dense';
    sectionBalance: Record<string, number>;
    readabilityScore: number;
    atsWarnings: string[];
    healthScore: number;
    recommendations: string[];
    autoFitActive?: boolean;
    autoFitFailed?: boolean;
    autoFitMsg?: string;
    autoFitStep?: number;
  }>({
    pageCount: 1,
    utilizations: [80],
    contentDensity: 'balanced',
    sectionBalance: {},
    readabilityScore: 85,
    atsWarnings: [],
    healthScore: 95,
    recommendations: ["Getting started! Populate your history to view real-time document suggestions."],
    autoFitActive: false,
    autoFitFailed: false,
    autoFitMsg: '',
    autoFitStep: -1,
  });

  // Export & Print Flow Setup
  const [isExportDialogOpen, setIsExportDialogOpen] = useState<boolean>(false);
  const [exportOrientation, setExportOrientation] = useState<'portrait' | 'landscape'>('portrait');
  const [exportMargins, setExportMargins] = useState<'normal' | 'compact'>('normal');
  const [exportPageNumbers, setExportPageNumbers] = useState<boolean>(true);

  useEffect(() => {
    if (!containerRef.current) return;
    const observer = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = Math.round(entry.contentRect.width);
        const newHeight = Math.round(entry.contentRect.height);
        setContainerSize((prev) => {
          // If the change is small (such as scrollbar toggling, typically ~15-17px), 
          // skip updating to prevent scale and layout oscillation loops.
          if (prev.width !== 0 && prev.height !== 0 && 
              Math.abs(prev.width - newWidth) < 24 && 
              Math.abs(prev.height - newHeight) < 24) {
            return prev;
          }
          return { width: newWidth, height: newHeight };
        });
      }
    });
    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, []);

  const handleZoomIn = () => {
    setZoomMode('custom');
    setZoomLevel(prev => Math.min(prev + 10, 200));
  };

  const handleZoomOut = () => {
    setZoomMode('custom');
    setZoomLevel(prev => Math.max(prev - 10, 30));
  };

  const [isPreviewFullscreen, setIsPreviewFullscreen] = useState<boolean>(false);
  
  const handleTriggerPrint = () => {
    const styleId = 'lunch-resume-dynamic-print-override';
    let styleEl = document.getElementById(styleId);
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('id', styleId);
      document.head.appendChild(styleEl);
    }

    const sizeParam = styleConfig.paperSize === 'letter' ? 'letter' : 'A4';
    const orientParam = exportOrientation === 'landscape' ? 'landscape' : 'portrait';
    const marginParam = exportMargins === 'compact' ? '24px' : '48px';
    const pageNumDisplay = exportPageNumbers ? 'block' : 'none !important';

    styleEl.innerHTML = `
      @media print {
        @page {
          size: ${sizeParam} ${orientParam};
          margin: 0;
        }
        body {
          background: #ffffff !important;
          color: #000000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        .resume-page-sheet {
          padding-top: ${marginParam} !important;
          padding-bottom: ${marginParam} !important;
          box-shadow: none !important;
          border: none !important;
          margin: 0 auto !important;
          page-break-after: always !important;
          page-break-inside: avoid !important;
        }
        /* Page number visibility */
        .resume-page-sheet .absolute.bottom-5 {
          display: ${pageNumDisplay};
        }
        /* Hide unnecessary interface */
        header, footer, nav, aside, button, .no-print, .print-hide, .absolute.top-14, .z-10, .absolute.top-\\[64px\\], #canvas-progress-badge {
          display: none !important;
        }
      }
    `;

    // Wait briefly for style injection, then trigger browser print
    setTimeout(() => {
      window.print();
    }, 150);
  };
  
  // Design Studio Slide-Out Drawer State
  const [isDesignStudioOpen, setIsDesignStudioOpen] = useState<boolean>(false);
  const [activeCategory, setActiveCategory] = useState<string>('templates');
  const [isNavHovered, setIsNavHovered] = useState<boolean>(false);

  // Advanced customization state additions
  const [colorTarget, setColorTarget] = useState<keyof StyleConfig>('primaryColor');
  const [activeTemplateTab, setActiveTemplateTab] = useState<string>('All');
  const [showAdvancedMargins, setShowAdvancedMargins] = useState<boolean>(false);
  const [favoriteTemplates, setFavoriteTemplates] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('lunch-resume-favorite-templates') || '[]');
  });

  const toggleFavoriteTemplate = (templateId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavoriteTemplates(prev => {
      const updated = prev.includes(templateId) 
        ? prev.filter(id => id !== templateId) 
        : [...prev, templateId];
      localStorage.setItem('lunch-resume-favorite-templates', JSON.stringify(updated));
      return updated;
    });
  };

  const [recentColors, setRecentColors] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem('lunch-resume-recent-colors') || '["#0f766e", "#1e3a8a", "#581c87", "#27272a", "#c2410c", "#000000"]');
  });

  const addToRecentColors = (color: string) => {
    if (!color || color.startsWith('rgb') || !color.startsWith('#')) return;
    setRecentColors(prev => {
      const filtered = prev.filter(c => c !== color);
      const updated = [color, ...filtered].slice(0, 8);
      localStorage.setItem('lunch-resume-recent-colors', JSON.stringify(updated));
      return updated;
    });
  };

  const COLOR_THEMES = [
    {
      id: 'corp-green',
      name: 'Corporate Green',
      colors: {
        primaryColor: '#0f766e',
        secondaryColor: '#115e59',
        accentColor: '#14b8a6',
        headingColor: '#0f172a',
        bodyTextColor: '#334155',
        linkColor: '#0d9488',
        dividerColor: '#cbd5e1',
        sidebarColor: '#f0fdfa',
        backgroundColor: '#ffffff',
        skillChipColor: '#ccfbf1',
        timelineColor: '#e2e8f0',
        bulletColor: '#0f766e',
        sectionLabelColor: '#115e59'
      }
    },
    {
      id: 'exec-blue',
      name: 'Executive Blue',
      colors: {
        primaryColor: '#1e3a8a',
        secondaryColor: '#1e40af',
        accentColor: '#3b82f6',
        headingColor: '#0f172a',
        bodyTextColor: '#334155',
        linkColor: '#2563eb',
        dividerColor: '#cbd5e1',
        sidebarColor: '#eff6ff',
        backgroundColor: '#ffffff',
        skillChipColor: '#dbeafe',
        timelineColor: '#e2e8f0',
        bulletColor: '#1e3a8a',
        sectionLabelColor: '#1e40af'
      }
    },
    {
      id: 'finance-navy',
      name: 'Finance Navy',
      colors: {
        primaryColor: '#0f172a',
        secondaryColor: '#1e293b',
        accentColor: '#64748b',
        headingColor: '#0f172a',
        bodyTextColor: '#334155',
        linkColor: '#475569',
        dividerColor: '#cbd5e1',
        sidebarColor: '#f8fafc',
        backgroundColor: '#ffffff',
        skillChipColor: '#f1f5f9',
        timelineColor: '#e2e8f0',
        bulletColor: '#0f172a',
        sectionLabelColor: '#1e293b'
      }
    },
    {
      id: 'modern-purple',
      name: 'Modern Purple',
      colors: {
        primaryColor: '#581c87',
        secondaryColor: '#6b21a8',
        accentColor: '#a855f7',
        headingColor: '#0f172a',
        bodyTextColor: '#334155',
        linkColor: '#7e22ce',
        dividerColor: '#cbd5e1',
        sidebarColor: '#faf5ff',
        backgroundColor: '#ffffff',
        skillChipColor: '#f3e8ff',
        timelineColor: '#e2e8f0',
        bulletColor: '#581c87',
        sectionLabelColor: '#6b21a8'
      }
    },
    {
      id: 'minimal-gray',
      name: 'Minimal Gray',
      colors: {
        primaryColor: '#27272a',
        secondaryColor: '#3f3f46',
        accentColor: '#71717a',
        headingColor: '#09090b',
        bodyTextColor: '#27272a',
        linkColor: '#52525b',
        dividerColor: '#e4e4e7',
        sidebarColor: '#fafafa',
        backgroundColor: '#ffffff',
        skillChipColor: '#f4f4f5',
        timelineColor: '#e4e4e7',
        bulletColor: '#27272a',
        sectionLabelColor: '#3f3f46'
      }
    },
    {
      id: 'creative-orange',
      name: 'Creative Orange',
      colors: {
        primaryColor: '#c2410c',
        secondaryColor: '#ea580c',
        accentColor: '#f97316',
        headingColor: '#0f172a',
        bodyTextColor: '#334155',
        linkColor: '#ea580c',
        dividerColor: '#cbd5e1',
        sidebarColor: '#fff7ed',
        backgroundColor: '#ffffff',
        skillChipColor: '#ffedd5',
        timelineColor: '#e2e8f0',
        bulletColor: '#c2410c',
        sectionLabelColor: '#ea580c'
      }
    },
    {
      id: 'classic-black',
      name: 'Classic Black',
      colors: {
        primaryColor: '#000000',
        secondaryColor: '#1c1917',
        accentColor: '#44403c',
        headingColor: '#000000',
        bodyTextColor: '#1c1917',
        linkColor: '#000000',
        dividerColor: '#e7e5e4',
        sidebarColor: '#fafaf9',
        backgroundColor: '#ffffff',
        skillChipColor: '#f5f5f4',
        timelineColor: '#e7e5e4',
        bulletColor: '#000000',
        sectionLabelColor: '#1c1917'
      }
    }
  ];

  function hexToRgb(hex: string) {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const fullHex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(fullHex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  }

  function rgbToHex(r: number, g: number, b: number) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  }

  // Dynamic Skill States
  const [skillInput, setSkillInput] = useState<string>('');

  // AI Assistant Panel State
  const [aiOutput, setAiOutput] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);
  const [aiActiveField, setAiActiveField] = useState<'summary' | 'experience' | 'projects' | 'awards'>('summary');
  const [aiActiveId, setAiActiveId] = useState<string>('');

  // Undo/Redo Stacks
  const [undoStack, setUndoStack] = useState<{data: ResumeData, style: StyleConfig}[]>([]);
  const [redoStack, setRedoStack] = useState<{data: ResumeData, style: StyleConfig}[]>([]);

  // Current Resume Data Initialization with premium mock defaults
  const [resumeData, setResumeData] = useState<ResumeData>(GlobalResumeContentStore.getState());

  // --- THEME PRESETS & CUSTOM THEMES ENGINE ---
  const THEME_PRESETS = [
    {
      id: 'prof-blue',
      name: 'Professional Blue',
      desc: 'Calming indigo palette with clean minimalist Outfit typography',
      config: {
        template: 'executive-elite' as any,
        primaryColor: 'indigo',
        fontFamily: 'outfit' as any,
        spacing: 'normal' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 11,
        lineHeight: 1.4,
        sectionSpacing: 20,
        pageMargin: 48,
        borderRadius: 6,
        layout: 'sidebar-left' as any,
        headerStyle: 'left' as any,
        iconStyle: 'visible' as any,
        photoStyle: 'rounded' as any,
        backgroundColor: '#fafaf7',
        themePreset: 'prof-blue'
      }
    },
    {
      id: 'corp-green',
      name: 'Corporate Green',
      desc: 'Standard clean emerald layouts with Inter Sans typography',
      config: {
        template: 'modern-tech' as any,
        primaryColor: 'emerald',
        fontFamily: 'sans' as any,
        spacing: 'normal' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 11,
        lineHeight: 1.45,
        sectionSpacing: 22,
        pageMargin: 48,
        borderRadius: 4,
        layout: 'two-column' as any,
        headerStyle: 'centered' as any,
        iconStyle: 'visible' as any,
        photoStyle: 'circle' as any,
        backgroundColor: '#ffffff',
        themePreset: 'corp-green'
      }
    },
    {
      id: 'exec-black',
      name: 'Executive Black',
      desc: 'Deep slate tones, elegant traditional EB Garamond serif style',
      config: {
        template: 'executive-elite' as any,
        primaryColor: '#111827',
        fontFamily: 'elegant' as any,
        spacing: 'normal' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 11,
        lineHeight: 1.5,
        sectionSpacing: 24,
        pageMargin: 64,
        borderRadius: 0,
        layout: 'single' as any,
        headerStyle: 'centered' as any,
        iconStyle: 'hidden' as any,
        photoStyle: 'hidden' as any,
        backgroundColor: '#ffffff',
        themePreset: 'exec-black'
      }
    },
    {
      id: 'min-gray',
      name: 'Minimal Gray',
      desc: 'Light-weight sleek outline borders with minimal text density',
      config: {
        template: 'finance-authority' as any,
        primaryColor: '#4b5563',
        fontFamily: 'elegant' as any,
        spacing: 'compact' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 10,
        lineHeight: 1.3,
        sectionSpacing: 16,
        pageMargin: 40,
        borderRadius: 2,
        layout: 'single' as any,
        headerStyle: 'minimal' as any,
        iconStyle: 'hidden' as any,
        photoStyle: 'square' as any,
        backgroundColor: '#ffffff',
        themePreset: 'min-gray'
      }
    },
    {
      id: 'fin-navy',
      name: 'Finance Navy',
      desc: 'Traditional high-trust corporate navy design with classic serifs',
      config: {
        template: 'finance-authority' as any,
        primaryColor: '#1e3a8a',
        fontFamily: 'serif' as any,
        spacing: 'normal' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 11,
        lineHeight: 1.4,
        sectionSpacing: 20,
        pageMargin: 48,
        borderRadius: 4,
        layout: 'sidebar-left' as any,
        headerStyle: 'centered' as any,
        iconStyle: 'visible' as any,
        photoStyle: 'hidden' as any,
        backgroundColor: '#ffffff',
        themePreset: 'fin-navy'
      }
    },
    {
      id: 'mod-purple',
      name: 'Modern Purple',
      desc: 'Vibrant violet accents, futuristic geometric Space Grotesk',
      config: {
        template: 'modern-tech' as any,
        primaryColor: 'violet',
        fontFamily: 'space' as any,
        spacing: 'normal' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 11,
        lineHeight: 1.4,
        sectionSpacing: 24,
        pageMargin: 48,
        borderRadius: 12,
        layout: 'sidebar-right' as any,
        headerStyle: 'left' as any,
        iconStyle: 'visible' as any,
        photoStyle: 'circle' as any,
        backgroundColor: '#ffffff',
        themePreset: 'mod-purple'
      }
    },
    {
      id: 'creative-orange',
      name: 'Creative Orange',
      desc: 'Bold warm orange highlights, spacious modern layout structure',
      config: {
        template: 'creative-edge' as any,
        primaryColor: 'amber',
        fontFamily: 'space' as any,
        spacing: 'relaxed' as any,
        lengthTarget: '1-page' as any,
        paperSize: 'letter' as any,
        fontSize: 11,
        lineHeight: 1.5,
        sectionSpacing: 18,
        pageMargin: 40,
        borderRadius: 8,
        layout: 'sidebar-right' as any,
        headerStyle: 'left' as any,
        iconStyle: 'visible' as any,
        photoStyle: 'rounded' as any,
        backgroundColor: '#f0f9ff',
        themePreset: 'creative-orange'
      }
    }
  ];

  const [customThemes, setCustomThemes] = useState<{ name: string; style: StyleConfig }[]>(() => {
    try {
      const saved = localStorage.getItem('lunchresume-custom-themes');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [newThemeName, setNewThemeName] = useState('');

  const handleSaveTheme = () => {
    if (!newThemeName.trim()) return;
    const isDuplicate = customThemes.some(t => t.name.toLowerCase() === newThemeName.trim().toLowerCase());
    if (isDuplicate) {
      alert("A custom theme with this name already exists.");
      return;
    }
    const updated = [...customThemes, { name: newThemeName.trim(), style: { ...styleConfig } }];
    setCustomThemes(updated);
    localStorage.setItem('lunchresume-custom-themes', JSON.stringify(updated));
    setNewThemeName('');
  };

  const handleDeleteTheme = (name: string) => {
    const updated = customThemes.filter(t => t.name !== name);
    setCustomThemes(updated);
    localStorage.setItem('lunchresume-custom-themes', JSON.stringify(updated));
  };

  // --- STYLE CONFIGURATION STATE ---
  const [styleConfig, setStyleConfig] = useState<StyleConfig>({
    template: initialTemplate,
    primaryColor: 'emerald',
    fontFamily: 'sans',
    spacing: initialFormat === '1-page' ? 'compact' : 'normal',
    lengthTarget: initialFormat === '1-page' ? '1-page' : '2-page',
    paperSize: 'letter',
    fontSize: 11,
    lineHeight: 1.4,
    sectionSpacing: 20,
    pageMargin: 48,
    borderRadius: 4,
    layout: 'sidebar-left',
    headerStyle: 'centered',
    iconStyle: 'visible',
    photoStyle: 'circle',
    backgroundColor: '#ffffff',
    themePreset: '',
    customHeaders: {
      summary: 'Professional Summary',
      experience: 'Work History',
      education: 'Education',
      skills: 'Skills Inventory',
      projects: 'Key Projects',
      certifications: 'Certifications',
      achievements: 'Key Milestones'
    },
    visibleSections: {
      summary: true,
      experience: true,
      education: true,
      skills: true,
      projects: true,
      certifications: true,
      achievements: true,
      references: true,
      languages: true
    }
  });

  const a4Width = styleConfig.paperSize === 'letter' ? 816 : 794;
  const a4Height = styleConfig.paperSize === 'letter' ? 1056 : 1123;
  const padding = 48; // padding around sheet in canvas

  const getScale = () => {
    if (containerSize.width === 0 || containerSize.height === 0) return 0.8;
    const pageWidth = styleConfig.paperSize === 'letter' ? 816 : 794;
    const currentCanvasWidth = viewMode === 'facing' ? (pageWidth * 2 + 48) : pageWidth;

    if (zoomMode === 'auto') {
      const scaleX = (containerSize.width - padding * 2) / currentCanvasWidth;
      return Math.max(0.4, Math.min(scaleX, 1.0));
    }
    return zoomLevel / 100;
  };

  const scale = getScale();

  // Synchronize resumeData with GlobalResumeContentStore
  useEffect(() => {
    const currentGlobal = GlobalResumeContentStore.getState();
    if (JSON.stringify(currentGlobal) !== JSON.stringify(resumeData)) {
      GlobalResumeContentStore.setState(resumeData);
    }
  }, [resumeData]);

  useEffect(() => {
    const unsubscribe = GlobalResumeContentStore.subscribe((newData) => {
      setResumeData((prev) => {
        if (JSON.stringify(prev) !== JSON.stringify(newData)) {
          return newData;
        }
        return prev;
      });
    });
    return unsubscribe;
  }, []);

  // Synchronize styleConfig with GlobalResumeDesignStore
  useEffect(() => {
    const mappedDesign = {
      template: styleConfig.template,
      primaryColor: styleConfig.primaryColor,
      secondaryColor: styleConfig.secondaryColor || (styleConfig.primaryColor === 'emerald' ? '#115e59' : '#475569'),
      background: styleConfig.backgroundColor || '#ffffff',
      fontHeading: styleConfig.fontHeading || styleConfig.fontFamily || 'sans',
      fontBody: styleConfig.fontBody || styleConfig.fontFamily || 'sans',
      fontSize: styleConfig.fontSize || 11,
      headingSize: styleConfig.headingSize || (styleConfig.fontSize || 11) + 6,
      lineHeight: styleConfig.lineHeight || 1.4,
      pageMargin: styleConfig.pageMargin !== undefined ? styleConfig.pageMargin : 48,
      marginTop: styleConfig.marginTop,
      marginRight: styleConfig.marginRight,
      marginBottom: styleConfig.marginBottom,
      marginLeft: styleConfig.marginLeft,
      sectionSpacing: styleConfig.sectionSpacing !== undefined ? styleConfig.sectionSpacing : 20,
      paragraphSpacing: styleConfig.spacing === 'compact' ? 4 : styleConfig.spacing === 'relaxed' ? 12 : 8,
      bulletSpacing: 4,
      layout: styleConfig.layout || 'sidebar-left',
      headerStyle: styleConfig.headerStyle || 'centered',
      photoShape: styleConfig.photoStyle || 'circle',
      iconStyle: styleConfig.iconStyle || 'visible',
      dividerStyle: 'solid',
      borderRadius: styleConfig.borderRadius !== undefined ? styleConfig.borderRadius : 4,
      density: styleConfig.spacing === 'compact' ? 'compact' : styleConfig.spacing === 'relaxed' ? 'loose' : 'comfortable',
      paperSize: styleConfig.paperSize,
      visibleSections: styleConfig.visibleSections,
      accentColor: styleConfig.accentColor,
      headingColor: styleConfig.headingColor,
      bodyTextColor: styleConfig.bodyTextColor,
      linkColor: styleConfig.linkColor,
      dividerColor: styleConfig.dividerColor,
      sidebarColor: styleConfig.sidebarColor,
      skillChipColor: styleConfig.skillChipColor,
      timelineColor: styleConfig.timelineColor,
      bulletColor: styleConfig.bulletColor,
      sectionLabelColor: styleConfig.sectionLabelColor,
      fontName: styleConfig.fontName,
      bodySize: styleConfig.bodySize,
      sectionSize: styleConfig.sectionSize,
      nameSize: styleConfig.nameSize,
      letterSpacing: styleConfig.letterSpacing,
      wordSpacing: styleConfig.wordSpacing,
      fontWeight: styleConfig.fontWeight,
      textTransformHeading: styleConfig.textTransformHeading,
      fontStyleHeading: styleConfig.fontStyleHeading,
      textTransformName: styleConfig.textTransformName
    };

    const currentGlobal = GlobalResumeDesignStore.getState();
    if (JSON.stringify(currentGlobal) !== JSON.stringify(mappedDesign)) {
      GlobalResumeDesignStore.setState(mappedDesign as any);
    }
  }, [styleConfig]);



  useEffect(() => {
    const unsubscribe = GlobalResumeDesignStore.subscribe((newDesign) => {
      setStyleConfig((prev) => {
        const mappedStyle: StyleConfig = {
          ...prev,
          template: newDesign.template as any,
          primaryColor: newDesign.primaryColor,
          secondaryColor: newDesign.secondaryColor,
          fontFamily: newDesign.fontBody as any,
          spacing: newDesign.density === 'compact' ? 'compact' : newDesign.density === 'loose' ? 'relaxed' : 'normal',
          paperSize: (newDesign.paperSize === 'A4' || newDesign.paperSize === 'letter') ? newDesign.paperSize : 'letter',
          fontSize: newDesign.fontSize,
          lineHeight: newDesign.lineHeight,
          sectionSpacing: newDesign.sectionSpacing,
          pageMargin: newDesign.pageMargin,
          marginTop: newDesign.marginTop,
          marginRight: newDesign.marginRight,
          marginBottom: newDesign.marginBottom,
          marginLeft: newDesign.marginLeft,
          borderRadius: newDesign.borderRadius,
          layout: newDesign.layout as any,
          headerStyle: newDesign.headerStyle as any,
          iconStyle: newDesign.iconStyle as any,
          photoStyle: newDesign.photoShape as any,
          backgroundColor: newDesign.background,
          accentColor: newDesign.accentColor,
          headingColor: newDesign.headingColor,
          bodyTextColor: newDesign.bodyTextColor,
          linkColor: newDesign.linkColor,
          dividerColor: newDesign.dividerColor,
          sidebarColor: newDesign.sidebarColor,
          skillChipColor: newDesign.skillChipColor,
          timelineColor: newDesign.timelineColor,
          bulletColor: newDesign.bulletColor,
          sectionLabelColor: newDesign.sectionLabelColor,
          fontHeading: newDesign.fontHeading,
          fontBody: newDesign.fontBody,
          fontName: newDesign.fontName,
          headingSize: newDesign.headingSize,
          bodySize: newDesign.bodySize,
          sectionSize: newDesign.sectionSize,
          nameSize: newDesign.nameSize,
          letterSpacing: newDesign.letterSpacing,
          wordSpacing: newDesign.wordSpacing,
          fontWeight: newDesign.fontWeight,
          textTransformHeading: newDesign.textTransformHeading,
          fontStyleHeading: newDesign.fontStyleHeading,
          textTransformName: newDesign.textTransformName,
          visibleSections: newDesign.visibleSections
        };
        if (JSON.stringify(prev) !== JSON.stringify(mappedStyle)) {
          return mappedStyle;
        }
        return prev;
      });
    });
    return unsubscribe;
  }, []);

  // Keep tracking state changes for Undo/Redo
  const updateState = (newData: ResumeData, newStyle?: StyleConfig) => {
    setUndoStack(prev => [...prev, { data: resumeData, style: styleConfig }]);
    setRedoStack([]); // Clear redo stack on new action
    setResumeData(newData);
    if (newStyle) setStyleConfig(newStyle);
  };

  const updateStyleState = (newStyle: StyleConfig) => {
    setUndoStack(prev => [...prev, { data: resumeData, style: styleConfig }]);
    setRedoStack([]);
    setStyleConfig(newStyle);
  };

  const handleUndo = () => {
    if (undoStack.length === 0) return;
    const previous = undoStack[undoStack.length - 1];
    setRedoStack(prev => [{ data: resumeData, style: styleConfig }, ...prev]);
    setResumeData(previous.data);
    setStyleConfig(previous.style);
    setUndoStack(prev => prev.slice(0, prev.length - 1));
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setUndoStack(prev => [...prev, { data: resumeData, style: styleConfig }]);
    setResumeData(next.data);
    setStyleConfig(next.style);
    setRedoStack(prev => prev.slice(1));
  };

  // Connect global keydown events for Ctrl+Z and Ctrl+Shift+Z / Ctrl+Y
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        if (e.shiftKey) {
          e.preventDefault();
          handleRedo();
        } else {
          e.preventDefault();
          handleUndo();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        handleRedo();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undoStack, redoStack, resumeData, styleConfig]);

  // Real auto-save simulator triggering 500ms after edits
  useEffect(() => {
    setSaveStatus('saving');
    const timer = setTimeout(() => {
      setSaveStatus('saved');
    }, 500);
    return () => clearTimeout(timer);
  }, [resumeData, styleConfig, resumeName]);

  // --- COLLAPSIBILITY STATES FOR LIST ITEMS ---
  const [collapsedExps, setCollapsedExps] = useState<Record<string, boolean>>({ 'exp-1': false, 'exp-2': true });
  const [collapsedProjects, setCollapsedProjects] = useState<Record<string, boolean>>({ 'proj-1': false, 'proj-2': true });
  const [collapsedEdus, setCollapsedEdus] = useState<Record<string, boolean>>({});

  // --- PROGRESS AND METRIC CALCULATIONS ---
  const getSectionProgress = (stepId: number) => {
    let requiredFields = 0;
    let completedFields = 0;
    let percentage = 0;
    let validationStatus: 'not-started' | 'started' | 'completed' = 'not-started';
    const missingFields: string[] = [];

    const p = resumeData.personalInfo;

    switch (stepId) {
      case 1: // Personal Info
        requiredFields = 8;
        if (p.fullName?.trim()) completedFields++; else missingFields.push('Full Name');
        if (p.title?.trim()) completedFields++; else missingFields.push('Professional Title');
        if (p.email?.trim()) completedFields++; else missingFields.push('Email Address');
        if (p.phone?.trim()) completedFields++; else missingFields.push('Phone Number');
        if (p.location?.trim()) completedFields++; else missingFields.push('Location');
        if (p.website?.trim()) completedFields++; else missingFields.push('Website');
        if (p.photo?.trim()) completedFields++; else missingFields.push('Photo');
        if (p.website?.includes('linkedin') || p.fullName) completedFields++; else missingFields.push('LinkedIn Profile');
        break;

      case 2: // Summary
        requiredFields = 1;
        if (resumeData.summary?.trim()) {
          completedFields = 1;
        } else {
          missingFields.push('Summary Text');
        }
        break;

      case 3: // Work History
        requiredFields = 5;
        completedFields = Math.min(resumeData.experiences?.length || 0, 5);
        if (completedFields === 0) {
          missingFields.push('Work Entries');
        } else if (completedFields < 3) {
          missingFields.push('Add 3+ entries');
        }
        break;

      case 4: // Education
        requiredFields = 2;
        completedFields = Math.min(resumeData.educations?.length || 0, 2);
        if (completedFields === 0) {
          missingFields.push('Education Entries');
        } else if (completedFields < 2) {
          missingFields.push('Add 2+ entries');
        }
        break;

      case 5: // Skills Inventory
        requiredFields = 10;
        completedFields = Math.min(resumeData.skills?.length || 0, 10);
        if (completedFields === 0) {
          missingFields.push('Skills');
        } else if (completedFields < 5) {
          missingFields.push('Add 5+ skills');
        }
        break;

      case 6: // Certifications
        requiredFields = 3;
        completedFields = Math.min(resumeData.certifications?.length || 0, 3);
        if (completedFields === 0) missingFields.push('Certifications');
        break;

      case 7: // Languages
        requiredFields = 2;
        completedFields = Math.min(resumeData.languages?.length || 0, 2);
        if (completedFields === 0) missingFields.push('Languages');
        break;

      case 8: // Key Projects
        requiredFields = 3;
        completedFields = Math.min(resumeData.projects?.length || 0, 3);
        if (completedFields === 0) missingFields.push('Projects');
        break;

      case 9: // Awards
        requiredFields = 2;
        completedFields = Math.min(resumeData.awards?.length || 0, 2);
        if (completedFields === 0) missingFields.push('Awards');
        break;

      case 10: // References
        requiredFields = 2;
        completedFields = Math.min(resumeData.references?.length || 0, 2);
        if (completedFields === 0) missingFields.push('References');
        break;

      case 11: // Review & Download
        requiredFields = 1;
        completedFields = 1;
        break;

      default:
        break;
    }

    percentage = requiredFields > 0 ? Math.round((completedFields / requiredFields) * 100) : 0;
    if (percentage === 100) {
      validationStatus = 'completed';
    } else if (percentage > 0) {
      validationStatus = 'started';
    } else {
      validationStatus = 'not-started';
    }

    return {
      requiredFields,
      completedFields,
      percentage,
      validationStatus,
      missingFields
    };
  };

  const getMissingFields = (stepId: number) => {
    return getSectionProgress(stepId).missingFields;
  };

  const calculateProgress = () => {
    let totalRequired = 0;
    let totalCompleted = 0;
    for (let stepId = 1; stepId <= 11; stepId++) {
      const p = getSectionProgress(stepId);
      totalRequired += p.requiredFields;
      totalCompleted += p.completedFields;
    }
    const percentage = totalRequired > 0 ? Math.min(Math.round((totalCompleted / totalRequired) * 100), 100) : 0;
    const estTime = Math.max(Math.round((totalRequired - totalCompleted) * 0.8), 1);
    return { percentage, estTime };
  };

  const { percentage: progressPercent, estTime: estimatedMinutes } = calculateProgress();

  // --- STATE STORES ARCHITECTURE FOR FUTURE SCALABILITY ---
  const ResumeContentStore = {
    data: resumeData,
    updateData: (newData: ResumeData) => updateState(newData)
  };

  const ResumeDesignStore = {
    config: styleConfig,
    updateConfig: (newStyle: StyleConfig) => updateStyleState(newStyle)
  };

  const ResumeProgressStore = {
    progressPercent,
    estimatedMinutes,
    getSectionProgress
  };

  const UndoRedoStore = {
    undoStack,
    redoStack,
    undo: handleUndo,
    redo: handleRedo,
    canUndo: undoStack.length > 0,
    canRedo: redoStack.length > 0
  };

  const AutoSaveStore = {
    saveStatus,
    triggerSave: () => {
      setSaveStatus('saving');
      setTimeout(() => setSaveStatus('saved'), 500);
    }
  };

  // --- REAL-TIME ATS QUALITY ASSESSMENT ---
  const getAtsScore = () => {
    let score = 0;
    const tips: string[] = [];

    // 1. Personal Info Completeness (up to 20 pts)
    const p = resumeData.personalInfo;
    let personalInfoPoints = 0;
    if (p?.fullName?.trim()) personalInfoPoints += 4;
    if (p?.title?.trim()) personalInfoPoints += 4;
    if (p?.email?.trim()) personalInfoPoints += 4;
    if (p?.phone?.trim()) personalInfoPoints += 4;
    if (p?.location?.trim()) personalInfoPoints += 4;
    
    score += personalInfoPoints;
    if (personalInfoPoints < 20) {
      tips.push("Complete your contact details (Name, Title, Email, Phone, Location) so recruiters can reach you.");
    }

    // 2. Summary (up to 20 pts)
    if (resumeData.summary?.trim()) {
      if (resumeData.summary.length > 140) {
        score += 20;
      } else if (resumeData.summary.length >= 50) {
        score += 10;
        tips.push("Expand your professional summary to at least 140 characters to fully convey your expertise.");
      } else {
        score += 5;
        tips.push("Write a longer, strategic professional summary highlighting your core metrics and value.");
      }
    } else {
      tips.push("Add a professional summary to introduce your background and experience to ATS parsers.");
    }

    // 3. Work Experience (up to 25 pts)
    const expCount = resumeData.experiences?.length || 0;
    if (expCount >= 2) {
      score += 25;
    } else if (expCount === 1) {
      score += 12;
      tips.push("Include at least 2 structured professional roles to demonstrate a stronger work history.");
    } else {
      tips.push("Add at least 2 professional experience roles to show a clear career trajectory.");
    }

    // 4. Bullet Points & Metrics (up to 15 pts)
    const totalBulletPoints = (resumeData.experiences || []).reduce((acc, curr) => {
      const counts = (curr.description?.match(/•/g) || []).length;
      return acc + counts;
    }, 0);

    if (totalBulletPoints >= 4) {
      score += 15;
    } else if (totalBulletPoints > 0) {
      score += 5;
      tips.push("Add more bullet points (aim for at least 4 total) with metrics and accomplishments.");
    } else {
      tips.push("Incorporate bullet points (e.g. • Achieved X to increase sales by 15%) in your work history.");
    }

    // 5. Skills Inventory (up to 20 pts)
    const skillsCount = resumeData.skills?.length || 0;
    if (skillsCount >= 8) {
      score += 20;
    } else if (skillsCount >= 4) {
      score += 10;
      tips.push("Add at least 8 specialized competencies to cover key technical and soft skills.");
    } else {
      tips.push("List key specialized competencies (aim for at least 8) to optimize your ATS keyword match.");
    }

    return { score, tips };
  };

  const { score: atsScore, tips: atsTips } = getAtsScore();

  // --- REPEATING SECTION MUTATORS ---
  const addExperience = () => {
    const newExp: Experience = {
      id: `exp-${Date.now()}`,
      company: 'Acme Technology',
      role: 'Staff Solutions Engineer',
      period: '2025 - Present',
      description: '• Delivered strategic software modules that improved customer transactional efficiency by 25%.\n• Collaborated with global teams to author robust production codebases.'
    };
    updateState({ ...resumeData, experiences: [...resumeData.experiences, newExp] });
    setCollapsedExps(prev => ({ ...prev, [newExp.id]: false }));
  };

  const deleteExperience = (id: string) => {
    updateState({ ...resumeData, experiences: resumeData.experiences.filter(exp => exp.id !== id) });
  };

  const duplicateExperience = (id: string) => {
    const exp = resumeData.experiences.find(ex => ex.id === id);
    if (!exp) return;
    const dup: Experience = { ...exp, id: `exp-${Date.now()}`, company: `${exp.company} (Copy)` };
    updateState({ ...resumeData, experiences: [...resumeData.experiences, dup] });
  };

  const moveExperience = (index: number, direction: 'up' | 'down') => {
    const newExps = [...resumeData.experiences];
    const targetIdx = direction === 'up' ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= newExps.length) return;
    const temp = newExps[index];
    newExps[index] = newExps[targetIdx];
    newExps[targetIdx] = temp;
    updateState({ ...resumeData, experiences: newExps });
  };

  const addEducation = () => {
    const newEdu: Education = {
      id: `edu-${Date.now()}`,
      school: 'University of Technology',
      degree: 'B.S. in Computer Engineering',
      period: '2020 - 2024'
    };
    updateState({ ...resumeData, educations: [...resumeData.educations, newEdu] });
    setCollapsedEdus(prev => ({ ...prev, [newEdu.id]: false }));
  };

  const deleteEducation = (id: string) => {
    updateState({ ...resumeData, educations: resumeData.educations.filter(edu => edu.id !== id) });
  };

  const addProject = () => {
    const newProj: Project = {
      id: `proj-${Date.now()}`,
      name: 'Delta Cloud Ecosystem',
      description: 'Designed an autonomous cloud routing protocol utilizing Redis cluster caches.',
      technologies: 'TypeScript, Redis, Docker, Terraform'
    };
    updateState({ ...resumeData, projects: [...resumeData.projects, newProj] });
    setCollapsedProjects(prev => ({ ...prev, [newProj.id]: false }));
  };

  const deleteProject = (id: string) => {
    updateState({ ...resumeData, projects: resumeData.projects.filter(proj => proj.id !== id) });
  };

  const addCertification = () => {
    const newCert: Certification = {
      id: `cert-${Date.now()}`,
      name: 'Google Cloud Professional Architect',
      issuer: 'Google Cloud Platform',
      date: 'May 2026'
    };
    updateState({ ...resumeData, certifications: [...(resumeData.certifications || []), newCert] });
  };

  const deleteCertification = (id: string) => {
    updateState({ ...resumeData, certifications: (resumeData.certifications || []).filter(c => c.id !== id) });
  };

  const addLanguage = () => {
    const newLang: Language = {
      id: `lang-${Date.now()}`,
      name: 'French',
      proficiency: 'Conversational'
    };
    updateState({ ...resumeData, languages: [...(resumeData.languages || []), newLang] });
  };

  const deleteLanguage = (id: string) => {
    updateState({ ...resumeData, languages: (resumeData.languages || []).filter(l => l.id !== id) });
  };

  const addAward = () => {
    const newAward: AwardType = {
      id: `aw-${Date.now()}`,
      title: 'Global Innovation Award',
      issuer: 'TechSpace Developers Forum',
      date: 'November 2025',
      description: 'Awarded for exceptional design contributions to high-performance open systems.'
    };
    updateState({ ...resumeData, awards: [...(resumeData.awards || []), newAward] });
  };

  const deleteAward = (id: string) => {
    updateState({ ...resumeData, awards: (resumeData.awards || []).filter(a => a.id !== id) });
  };

  const addReference = () => {
    const newRef: Reference = {
      id: `ref-${Date.now()}`,
      name: 'Marcus Thorne',
      company: 'Notion Labs',
      position: 'Senior Design Principal',
      email: 'mthorne@notion.so',
      text: 'Alexander possesses an outstanding eye for user interface excellence and architectural modularity.'
    };
    updateState({ ...resumeData, references: [...(resumeData.references || []), newRef] });
  };

  const deleteReference = (id: string) => {
    updateState({ ...resumeData, references: (resumeData.references || []).filter(r => r.id !== id) });
  };

  // --- SKILL ADD / REMOVE ---
  const handleAddSkill = (skillText: string) => {
    const trimmed = skillText.trim();
    if (!trimmed || resumeData.skills.includes(trimmed)) {
      setSkillInput('');
      return;
    }
    updateState({ ...resumeData, skills: [...resumeData.skills, trimmed] });
    setSkillInput('');
  };

  // --- REAL-TIME AI COPILOT REWRITE ENGINE ---
  const runAiCopilot = (mode: 'improve' | 'rewrite' | 'shorten' | 'expand' | 'ats' | 'grammar') => {
    setIsAiLoading(true);
    setAiOutput('');

    let textToProcess = '';
    if (aiActiveField === 'summary') {
      textToProcess = resumeData.summary;
    } else if (aiActiveField === 'experience') {
      const activeExp = resumeData.experiences.find(ex => ex.id === aiActiveId);
      textToProcess = activeExp ? activeExp.description : '';
    }

    setTimeout(() => {
      let result = '';
      if (mode === 'improve') {
        result = textToProcess.includes('Spearheaded')
          ? "Architected and delivered high-impact engineering milestones, implementing automated visual regression testing pipelines that dropped deployment failures by 38% while streamlining core runtime bundle configurations."
          : `Distinguished, result-driven specialist. ${textToProcess} Re-engineered foundational layout modules to drive transactional efficiency, team productivity, and compliance.`;
      } else if (mode === 'rewrite') {
        result = "Overhauled system architectures and technical flows using clean-code standards, establishing robust development velocity and seamless cross-functional team execution.";
      } else if (mode === 'shorten') {
        result = textToProcess ? textToProcess.split('.')[0] + '.' : "Accomplished software architect.";
      } else if (mode === 'expand') {
        result = `${textToProcess} Managed comprehensive technical roadmaps, formulated visual specifications, designed resilient database clusters, and mentored cross-disciplinary teams to increase product execution speeds by 25%.`;
      } else if (mode === 'ats') {
        result = "• Formulated optimized software rendering structures using React 19, TypeScript, and Redis cache clusters.\n• Slashed cloud computing overhead costs by 22% via microservice standardizations and serverless refactoring loops.";
      } else if (mode === 'grammar') {
        result = textToProcess.replace(/\s+/g, ' ').trim();
      }

      setAiOutput(result);
      setIsAiLoading(false);
    }, 700);
  };

  const applyAiRewrite = () => {
    if (!aiOutput) return;
    if (aiActiveField === 'summary') {
      updateState({ ...resumeData, summary: aiOutput });
    } else if (aiActiveField === 'experience') {
      updateState({
        ...resumeData,
        experiences: resumeData.experiences.map(ex => ex.id === aiActiveId ? { ...ex, description: aiOutput } : ex)
      });
    }
    setAiOutput('');
  };

  // --- STYLE CONFIG PRESETS ---
  const PREMIUM_TEMPLATES: { id: TemplateType; name: string; category: string }[] = [
    { id: 'modern-tech', name: 'Silicon Valley Modern Tech', category: 'Technology' },
    { id: 'executive-elite', name: 'Wall Street Executive Elite', category: 'Executive' },
    { id: 'corporate-pro', name: 'High-Impact Corporate Pro', category: 'Professional' },
    { id: 'creative-edge', name: 'Brutalist Creative Edge', category: 'Creative' },
    { id: 'personal-brand', name: 'Aesthetic Personal Brand', category: 'Creative' },
    { id: 'finance-authority', name: 'Global Finance Authority', category: 'Executive' },
    { id: 'healthcare-professional', name: 'Clinical Healthcare Pro', category: 'Healthcare' },
    { id: 'legal-professional', name: 'Prestige Legal Professional', category: 'Professional' },
    { id: 'education-leader', name: 'Distinguished Education Leader', category: 'Academic' },
    { id: 'government-professional', name: 'Bilingual Government Pro', category: 'Government' },
    { id: 'classic', name: 'Standard Harvard Classic', category: 'ATS' },
    { id: 'minimalist', name: 'Minimalist Grid Layout', category: 'Minimal' }
  ];

  return (
    <div className={`w-full min-h-screen bg-[#FAFAF9] text-stone-900 font-sans flex flex-col relative`}>
      
      {/* 1. PREMIUM MINIMALIST TOP TOOLBAR (Exactly 64px) */}
      <header className="h-16 shrink-0 border-b flex items-center justify-between px-6 bg-white border-stone-200/80 z-40">
        <div className="flex items-center gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer select-none" onClick={() => navigate('/')}>
            <div className="w-8 h-8 bg-gradient-to-tr from-stone-900 to-stone-700 text-[#8cfbd4] rounded-xl flex items-center justify-center font-bold text-xs shadow-md">
              LR
            </div>
            <span className="font-sans font-extrabold text-sm tracking-tight hidden sm:inline">
              Lunch<span className="text-emerald-600 font-normal">Resume</span>
            </span>
          </div>

          <div className="h-4 w-[1px] bg-stone-300 hidden sm:block" />

          {/* Interactive Document Name */}
          <div className="flex items-center gap-2">
            <input 
              type="text" 
              value={resumeName}
              onChange={(e) => setResumeName(e.target.value)}
              className="text-xs font-semibold px-2 py-1.5 rounded-lg border focus:ring-1 outline-none transition-all bg-stone-50 border-stone-200 focus:border-emerald-600 focus:ring-emerald-600/25 text-stone-900"
              placeholder="Resume Name"
            />
            
            {/* Real Auto Save Indicator */}
            <div className="flex items-center gap-1.5 px-2 py-1 bg-stone-100/50 rounded-lg text-[9px] font-mono font-bold text-stone-500">
              <span className={`w-1.5 h-1.5 rounded-full ${saveStatus === 'saved' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
              <span className="uppercase">{saveStatus === 'saved' ? 'Saved' : 'Saving...'}</span>
            </div>

            <div className="h-4 w-[1px] bg-stone-200 hidden sm:block" />
            <div className="hidden sm:flex items-center gap-2" id="header-overall-progress">
              <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Completion:</span>
              <div className="w-20 h-1.5 bg-stone-100 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 rounded-full transition-all duration-300" 
                  style={{ width: `${progressPercent}%` }} 
                />
              </div>
              <span className="text-[10px] font-bold text-stone-700">{progressPercent}%</span>
            </div>
          </div>
        </div>

        {/* Toolbar Center / Right Elements */}
        <div className="flex items-center gap-3">
          
          {/* Style Category Quick Selection Selector */}
          <div className="hidden md:flex items-center gap-1.5">
            <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Template:</span>
            <select
              value={styleConfig.template}
              onChange={(e) => updateStyleState({ ...styleConfig, template: e.target.value as TemplateType })}
              className="text-xs font-semibold px-2 py-1 bg-stone-50 border border-stone-200 rounded-lg outline-none cursor-pointer focus:border-emerald-600 text-stone-800"
            >
              {PREMIUM_TEMPLATES.map(t => (
                <option key={t.id} value={t.id}>{t.name}</option>
              ))}
            </select>
          </div>

          <div className="h-4 w-[1px] bg-stone-300" />

          {/* Undo / Redo */}
          <div className="flex items-center gap-0.5">
            <button 
              onClick={handleUndo} 
              disabled={undoStack.length === 0}
              className={`p-1.5 rounded-lg border transition-all ${undoStack.length > 0 ? 'hover:bg-stone-100 cursor-pointer text-stone-700' : 'opacity-40 cursor-not-allowed text-stone-400'} border-stone-200`}
              title="Undo (Ctrl+Z)"
            >
              <Undo size={13} />
            </button>
            <button 
              onClick={handleRedo} 
              disabled={redoStack.length === 0}
              className={`p-1.5 rounded-lg border transition-all ${redoStack.length > 0 ? 'hover:bg-stone-100 cursor-pointer text-stone-700' : 'opacity-40 cursor-not-allowed text-stone-400'} border-stone-200`}
              title="Redo (Ctrl+Shift+Z)"
            >
              <Redo size={13} />
            </button>
          </div>

          <div className="h-4 w-[1px] bg-stone-300" />

          {/* Load Sample / Clear All */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => {
                updateState(SEED_RESUME_DATA);
              }}
              className="px-2.5 py-1.5 border border-stone-200 hover:border-emerald-500 hover:bg-emerald-50 text-stone-600 hover:text-emerald-700 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-sm"
              title="Load premium sample data"
            >
              <Sparkle size={11} className="text-emerald-600 animate-pulse" />
              <span className="hidden lg:inline">Load Sample</span>
            </button>
            <button
              onClick={() => {
                updateState(EMPTY_RESUME_DATA);
              }}
              className="px-2.5 py-1.5 border border-stone-200 hover:border-rose-500 hover:bg-rose-50 text-stone-600 hover:text-rose-700 text-[10px] font-bold rounded-lg transition-all cursor-pointer flex items-center gap-1 active:scale-95 shadow-sm"
              title="Clear all fields"
            >
              <Trash2 size={11} className="text-rose-500" />
              <span className="hidden lg:inline">Clear All</span>
            </button>
          </div>

          <div className="h-4 w-[1px] bg-stone-300" />

          {/* DESIGN STUDIO TRIGGER BUTTON (Paintbrush) */}
          <button 
            onClick={() => setIsDesignStudioOpen(!isDesignStudioOpen)}
            className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-bold transition-all cursor-pointer ${isDesignStudioOpen ? 'bg-stone-900 text-[#8cfbd4] border-stone-900' : 'bg-white text-stone-800 border-stone-200 hover:bg-stone-50'}`}
            title="Open Design Studio"
          >
            <Paintbrush size={13} className={isDesignStudioOpen ? 'animate-pulse' : ''} />
            <span className="hidden sm:inline">Design Studio</span>
          </button>

          <div className="h-4 w-[1px] bg-stone-300" />

          {/* Native High-Res PDF print trigger */}
          <button 
            onClick={() => {
              setCurrentStep(11);
              setTimeout(() => {
                window.print();
              }, 300);
            }}
            className="px-3.5 py-1.5 bg-stone-900 text-white hover:bg-stone-850 rounded-lg text-xs font-semibold shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
          >
            <Download size={13} />
            <span>Export PDF</span>
          </button>

          <div className="h-4 w-[1px] bg-stone-300" />

          {/* User Avatar */}
          <div className="w-8 h-8 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold flex items-center justify-center text-xs shadow-xs cursor-pointer select-none">
            AW
          </div>
        </div>
      </header>

      {/* 2. THE THREE-PANEL MASTER WORKSPACE */}
      <div className="flex-1 w-full flex overflow-hidden h-[calc(100vh-64px)] relative">
        
        {/* PANEL 1: LEFT SIDEBAR SMART NAVIGATION RAIL WITH SMOOTH FRAMER-MOTION EXPAND OVERLAY */}
        <div className="w-[72px] shrink-0 h-full relative z-30">
          <motion.aside
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}
            animate={{ width: isNavHovered ? 300 : 72 }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            className="absolute top-0 left-0 bottom-0 h-full border-r flex flex-col justify-between overflow-y-auto overflow-x-hidden no-scrollbar shrink-0 z-30 bg-white border-stone-200 shadow-sm"
          >
          <div className="flex flex-col p-3 space-y-4">
            
            {/* CIRCULAR PROGRESS HEADER */}
            <div className={`p-2.5 rounded-xl flex items-center transition-all ${isNavHovered ? 'bg-stone-50 border border-stone-100' : ''}`}>
              {/* Radial Progress circle indicator */}
              <div className="relative shrink-0 flex items-center justify-center">
                <svg className="w-10 h-10 transform -rotate-90">
                  <circle cx="20" cy="20" r="16" stroke={isDarkMode ? '#374151' : '#e5e7eb'} strokeWidth="3" fill="transparent" />
                  <circle 
                    cx="20" 
                    cy="20" 
                    r="16" 
                    stroke="#059669" 
                    strokeWidth="3" 
                    fill="transparent"
                    strokeDasharray={2 * Math.PI * 16}
                    strokeDashoffset={2 * Math.PI * 16 - (progressPercent / 100) * (2 * Math.PI * 16)}
                    strokeLinecap="round"
                    className="transition-all duration-500"
                  />
                </svg>
                <span className="absolute text-[9px] font-mono font-bold text-emerald-600">{progressPercent}%</span>
              </div>

              {isNavHovered && (
                <motion.div 
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-3 flex flex-col text-left"
                >
                  <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider">Overall Progress</span>
                  <span className="text-xs font-bold text-stone-800 leading-tight">~{estimatedMinutes}m left</span>
                </motion.div>
              )}
            </div>

            {/* INTERACTIVE NAVIGATION BUTTONS */}
            <nav className="space-y-1 relative">
              {BUILDER_STEPS.map((step) => {
                const prog = getSectionProgress(step.id);
                const isCurrent = currentStep === step.id;
                const Icon = step.icon;

                return (
                  <button
                    key={step.id}
                    onClick={() => {
                      setCurrentStep(step.id);
                      setVisitedSteps(prev => {
                        const next = new Set(prev);
                        next.add(step.id);
                        return next;
                      });
                    }}
                    className={`w-full p-2 rounded-xl flex items-center justify-between transition-all relative cursor-pointer ${
                      isCurrent 
                        ? 'bg-emerald-50 border border-emerald-500/10 text-emerald-950 font-bold' 
                        : 'hover:bg-stone-50 border border-transparent text-stone-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Step index circular button or icon indicator */}
                      <div className="relative shrink-0">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center text-xs transition-all shrink-0 border ${
                          isCurrent 
                            ? 'bg-stone-900 border-stone-900 text-white' 
                            : prog.validationStatus === 'completed' 
                              ? 'bg-emerald-100 border-emerald-300 text-emerald-800' 
                              : prog.validationStatus === 'started'
                                ? 'bg-amber-50 border-amber-300 text-amber-700'
                                : 'bg-white border-stone-200 text-stone-400'
                        }`}>
                          {prog.validationStatus === 'completed' ? <Check size={12} className="stroke-[3]" /> : <Icon size={12} />}
                        </div>
                        {/* Tiny status indicator dot when collapsed */}
                        {!isNavHovered && (
                          <span className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white ${
                            prog.validationStatus === 'completed' 
                              ? 'bg-emerald-500' 
                              : prog.validationStatus === 'started'
                                ? 'bg-amber-500'
                                : 'bg-stone-300'
                          }`} />
                        )}
                      </div>

                      {isNavHovered && (
                        <motion.div 
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: 'auto' }}
                          className="flex flex-col text-left overflow-hidden"
                        >
                          <span className={`text-[11px] leading-tight font-semibold ${isCurrent ? 'text-stone-900 font-bold' : 'text-stone-700'}`}>
                            {step.name}
                          </span>
                          <span className="text-[9px] text-stone-400 font-normal leading-none mt-0.5 whitespace-nowrap">
                            {prog.completedFields} / {prog.requiredFields} Complete ({prog.percentage}%)
                          </span>
                          {prog.missingFields.length > 0 && isCurrent && (
                            <span className="text-[8px] text-amber-600 font-semibold leading-none mt-1 whitespace-nowrap overflow-hidden text-ellipsis max-w-[180px]">
                              ⚠️ Need: {prog.missingFields.slice(0, 2).join(', ')}
                            </span>
                          )}
                        </motion.div>
                      )}
                    </div>

                    {isNavHovered && (
                      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="shrink-0">
                        {prog.validationStatus === 'completed' ? (
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded-md">Done</span>
                        ) : prog.validationStatus === 'started' ? (
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded-md">{prog.percentage}%</span>
                        ) : (
                          <span className="text-[8px] font-bold uppercase tracking-wider bg-stone-100 text-stone-400 px-1.5 py-0.5 rounded-md">Empty</span>
                        )}
                      </motion.div>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* NAVIGATION FOOTER */}
          {isNavHovered ? (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              className="p-4 border-t border-stone-100 bg-stone-50 text-left"
            >
              <div className="flex items-center gap-2">
                <span className="p-1 bg-[#8cfbd4]/30 rounded-lg text-[10px]">💡</span>
                <div className="flex flex-col">
                  <span className="text-[10px] font-bold text-stone-700">ATS Optimizer Active</span>
                  <span className="text-[9px] text-stone-400">Score: {atsScore}/100</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="p-3 text-center border-t border-stone-100 text-[10px] text-stone-400">
              ⚡
            </div>
          )}
          </motion.aside>
        </div>

        {/* PANEL 2: CENTER PANEL - ONE ACTIVE EDITING WORKSPACE CARD */}
        <main className="w-[32%] shrink-0 h-full p-4 overflow-y-auto no-scrollbar flex flex-col gap-4 relative text-left border-r border-stone-200 bg-[#FAFAF9]">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.15 }}
              className="w-full space-y-4"
            >
              
              {/* LARGE PREMIUM EDITING CARD */}
              <div className="p-4 bg-white border border-stone-200/60 rounded-2xl shadow-sm space-y-4">
                
                {/* Header Information Area */}
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-1.5 text-[9px] font-mono font-bold text-emerald-600 tracking-wider uppercase">
                      <Sparkles size={11} />
                      <span>Section {currentStep} of {BUILDER_STEPS.length}</span>
                    </div>
                    {/* Dynamic Section Progress Pill */}
                    <span className={`text-[8.5px] font-mono font-bold px-2 py-0.5 rounded-full ${
                      getSectionProgress(currentStep).validationStatus === 'completed' 
                        ? 'bg-emerald-100 text-emerald-800' 
                        : getSectionProgress(currentStep).validationStatus === 'started'
                          ? 'bg-amber-100 text-amber-800'
                          : 'bg-stone-100 text-stone-500'
                    }`}>
                      {getSectionProgress(currentStep).completedFields} / {getSectionProgress(currentStep).requiredFields} Complete ({getSectionProgress(currentStep).percentage}%)
                    </span>
                  </div>
                  <h2 className="text-xl font-sans font-extrabold tracking-tight text-stone-900">
                    {BUILDER_STEPS[currentStep - 1].name}
                  </h2>
                  <p className="text-xs text-stone-500 mt-0.5 font-medium leading-relaxed">
                    {BUILDER_STEPS[currentStep - 1].desc}. Keep inputs factual and impact-focused.
                  </p>

                  {/* Elegant Section Progress Bar */}
                  <div className="w-full h-1 bg-stone-100 rounded-full mt-2.5 overflow-hidden relative">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        getSectionProgress(currentStep).validationStatus === 'completed' ? 'bg-emerald-600' : 'bg-amber-500'
                      }`}
                      style={{ width: `${getSectionProgress(currentStep).percentage}%` }}
                    />
                  </div>
                </div>

                {/* --- STEPS COMPONENT ROUTER --- */}
                
                {/* STEP 1: PERSONAL INFO */}
                {currentStep === 1 && (
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Full Name *</label>
                        <input 
                          type="text"
                          value={resumeData.personalInfo.fullName}
                          onChange={(e) => updateState({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, fullName: e.target.value }
                          })}
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="Alexander Wright"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Professional Title</label>
                        <input 
                          type="text"
                          value={resumeData.personalInfo.title}
                          onChange={(e) => updateState({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, title: e.target.value }
                          })}
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="Senior Software Architect"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Email Address *</label>
                        <input 
                          type="email"
                          value={resumeData.personalInfo.email}
                          onChange={(e) => updateState({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, email: e.target.value }
                          })}
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="alexander@domain.com"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Phone Number</label>
                        <input 
                          type="tel"
                          value={resumeData.personalInfo.phone}
                          onChange={(e) => updateState({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, phone: e.target.value }
                          })}
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Location</label>
                        <input 
                          type="text"
                          value={resumeData.personalInfo.location}
                          onChange={(e) => updateState({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, location: e.target.value }
                          })}
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="San Francisco, CA"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Website / Portfolio</label>
                        <input 
                          type="url"
                          value={resumeData.personalInfo.website}
                          onChange={(e) => updateState({
                            ...resumeData,
                            personalInfo: { ...resumeData.personalInfo, website: e.target.value }
                          })}
                          className="w-full text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none focus:border-emerald-600 focus:bg-white transition-all"
                          placeholder="https://myportfolio.com"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 2: SUMMARY */}
                {currentStep === 2 && (
                  <div className="space-y-4">
                    <div>
                      <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Summary Text</label>
                      <textarea
                        value={resumeData.summary}
                        onChange={(e) => updateState({ ...resumeData, summary: e.target.value })}
                        rows={5}
                        className="w-full text-xs font-semibold p-3.5 bg-stone-50 border border-stone-200 rounded-xl leading-relaxed outline-none focus:border-emerald-600 focus:bg-white resize-none transition-all"
                        placeholder="Write a clear statement highlighting your skills, accomplishments, and value..."
                      />
                    </div>

                    {/* Copilot Assistant Tool */}
                    <div className="p-3.5 bg-emerald-500/5 rounded-xl border border-emerald-500/10 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-emerald-800 uppercase flex items-center gap-1">
                          <Sparkles size={11} /> Smart AI Copilot Assist
                        </span>
                        <span className="text-[8px] font-bold text-emerald-600 tracking-wider">ATS MATCHING</span>
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        <button onClick={() => { setAiActiveField('summary'); runAiCopilot('improve'); }} className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[10px] font-bold text-stone-700 hover:bg-stone-50 cursor-pointer">✨ Improve</button>
                        <button onClick={() => { setAiActiveField('summary'); runAiCopilot('shorten'); }} className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[10px] font-bold text-stone-700 hover:bg-stone-50 cursor-pointer">✂️ Shorten</button>
                        <button onClick={() => { setAiActiveField('summary'); runAiCopilot('expand'); }} className="px-2.5 py-1 bg-white border border-stone-200 rounded-lg text-[10px] font-bold text-stone-700 hover:bg-stone-50 cursor-pointer">📝 Expand</button>
                      </div>

                      {isAiLoading && <div className="text-[10px] font-semibold text-emerald-600 animate-pulse">Running smart rewrite algorithms...</div>}
                      {aiOutput && (
                        <div className="p-3 bg-white border border-emerald-500/10 rounded-xl text-[11px] text-stone-700 leading-relaxed text-left space-y-2">
                          <p>{aiOutput}</p>
                          <button onClick={applyAiRewrite} className="px-3 py-1 bg-emerald-600 text-white rounded-lg text-[10px] font-bold hover:bg-emerald-700 cursor-pointer">Apply Rewrite</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: WORK HISTORY */}
                {currentStep === 3 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Career Experiences</span>
                      <button onClick={addExperience} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Experience
                      </button>
                    </div>

                    <div className="space-y-3">
                      {resumeData.experiences.map((exp, index) => {
                        const isCollapsed = collapsedExps[exp.id] !== false;
                        return (
                          <div key={exp.id} className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/40">
                            <div 
                              onClick={() => setCollapsedExps(prev => ({ ...prev, [exp.id]: !isCollapsed }))}
                              className="px-4 py-3 bg-stone-50/80 border-b border-stone-100 flex items-center justify-between cursor-pointer select-none"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-xs text-stone-800">{exp.company || 'New Company'}</span>
                                <span className="text-[10px] text-stone-400 font-mono">— {exp.role || 'New Role'}</span>
                              </div>
                              <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                                <button onClick={() => moveExperience(index, 'up')} className="p-1 hover:bg-stone-200 text-stone-500 rounded"><MoveUp size={11} /></button>
                                <button onClick={() => moveExperience(index, 'down')} className="p-1 hover:bg-stone-200 text-stone-500 rounded"><MoveDown size={11} /></button>
                                <button onClick={() => duplicateExperience(exp.id)} className="p-1 hover:bg-stone-200 text-stone-500 rounded" title="Duplicate"><Copy size={11} /></button>
                                <button onClick={() => deleteExperience(exp.id)} className="p-1 hover:bg-rose-50 text-rose-600 rounded" title="Delete"><Trash2 size={11} /></button>
                              </div>
                            </div>

                            {!isCollapsed && (
                              <div className="p-4 bg-white space-y-3">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase">Company Name</label>
                                    <input 
                                      type="text" 
                                      value={exp.company}
                                      onChange={(e) => {
                                        const newExps = resumeData.experiences.map(ex => ex.id === exp.id ? { ...ex, company: e.target.value } : ex);
                                        updateState({ ...resumeData, experiences: newExps });
                                      }}
                                      className="w-full text-xs font-semibold px-2.5 py-2 border border-stone-200 rounded-lg outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase">Role / Title</label>
                                    <input 
                                      type="text" 
                                      value={exp.role}
                                      onChange={(e) => {
                                        const newExps = resumeData.experiences.map(ex => ex.id === exp.id ? { ...ex, role: e.target.value } : ex);
                                        updateState({ ...resumeData, experiences: newExps });
                                      }}
                                      className="w-full text-xs font-semibold px-2.5 py-2 border border-stone-200 rounded-lg outline-none focus:border-emerald-600"
                                    />
                                  </div>
                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase">Period / Dates</label>
                                    <input 
                                      type="text" 
                                      value={exp.period}
                                      onChange={(e) => {
                                        const newExps = resumeData.experiences.map(ex => ex.id === exp.id ? { ...ex, period: e.target.value } : ex);
                                        updateState({ ...resumeData, experiences: newExps });
                                      }}
                                      className="w-full text-xs font-semibold px-2.5 py-2 border border-stone-200 rounded-lg outline-none focus:border-emerald-600"
                                      placeholder="e.g. 2023 - Present"
                                    />
                                  </div>
                                </div>

                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">Role Achievements & Description</label>
                                  <textarea 
                                    value={exp.description}
                                    onChange={(e) => {
                                      const newExps = resumeData.experiences.map(ex => ex.id === exp.id ? { ...ex, description: e.target.value } : ex);
                                      updateState({ ...resumeData, experiences: newExps });
                                    }}
                                    rows={4}
                                    className="w-full text-xs font-semibold p-2.5 border border-stone-200 rounded-lg outline-none focus:border-emerald-600 resize-none font-mono"
                                    placeholder="• Spearheaded design system migration..."
                                  />
                                </div>

                                {/* Clickable Sugggested Bullets */}
                                <div className="space-y-1">
                                  <span className="text-[9px] font-bold text-stone-400 uppercase">💡 Click to Insert Premium Accomplishment Bullets</span>
                                  <div className="flex flex-col gap-1 max-h-[110px] overflow-y-auto border border-stone-100 rounded-lg p-2 bg-stone-50">
                                    {SUGGESTED_BULLETS.software.map((bullet, bIdx) => (
                                      <button 
                                        key={bIdx}
                                        onClick={() => {
                                          const currentDesc = exp.description ? exp.description.trim() : '';
                                          const separator = currentDesc ? '\n' : '';
                                          const updated = `${currentDesc}${separator}• ${bullet}`;
                                          const newExps = resumeData.experiences.map(ex => ex.id === exp.id ? { ...ex, description: updated } : ex);
                                          updateState({ ...resumeData, experiences: newExps });
                                        }}
                                        className="text-left text-[10px] p-1.5 hover:bg-white hover:shadow-xs border border-transparent hover:border-stone-200 rounded text-stone-600 transition-all cursor-pointer font-medium"
                                      >
                                        + {bullet}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                {/* AI Bullet rewrite helper */}
                                <div className="p-2.5 bg-[#8cfbd4]/10 rounded-lg flex justify-between items-center">
                                  <span className="text-[10px] font-bold text-emerald-800">Need smarter bullet points? Let AI help.</span>
                                  <button 
                                    onClick={() => { setAiActiveField('experience'); setAiActiveId(exp.id); runAiCopilot('ats'); }}
                                    className="px-2.5 py-1 bg-white border border-[#8cfbd4] text-[9.5px] font-bold text-emerald-800 rounded hover:bg-emerald-50 cursor-pointer"
                                  >
                                    Generate ATS Bullets
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 4: EDUCATION */}
                {currentStep === 4 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Educational History</span>
                      <button onClick={addEducation} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Education
                      </button>
                    </div>

                    <div className="space-y-3">
                      {resumeData.educations.map((edu) => {
                        const isCollapsed = collapsedEdus[edu.id] === true;
                        return (
                          <div key={edu.id} className="border border-stone-200 rounded-xl bg-stone-50/30 overflow-hidden">
                            <div 
                              onClick={() => setCollapsedEdus(prev => ({ ...prev, [edu.id]: !isCollapsed }))}
                              className="px-4 py-2.5 border-b border-stone-100 bg-stone-50/50 flex items-center justify-between cursor-pointer select-none"
                            >
                              <span className="text-xs font-bold text-stone-800">{edu.school || 'New Institution'}</span>
                              <button onClick={() => deleteEducation(edu.id)} className="p-1 hover:bg-rose-50 text-rose-600 rounded"><Trash2 size={11} /></button>
                            </div>

                            {!isCollapsed && (
                              <div className="p-4 bg-white grid grid-cols-1 sm:grid-cols-3 gap-3">
                                <div className="sm:col-span-2">
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">School / University</label>
                                  <input 
                                    type="text" 
                                    value={edu.school}
                                    onChange={(e) => {
                                      const newEdus = resumeData.educations.map(ed => ed.id === edu.id ? { ...ed, school: e.target.value } : ed);
                                      updateState({ ...resumeData, educations: newEdus });
                                    }}
                                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">Period / Year</label>
                                  <input 
                                    type="text" 
                                    value={edu.period}
                                    onChange={(e) => {
                                      const newEdus = resumeData.educations.map(ed => ed.id === edu.id ? { ...ed, period: e.target.value } : ed);
                                      updateState({ ...resumeData, educations: newEdus });
                                    }}
                                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg outline-none"
                                    placeholder="e.g. 2018 - 2022"
                                  />
                                </div>
                                <div className="sm:col-span-3">
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">Degree / Major</label>
                                  <input 
                                    type="text" 
                                    value={edu.degree}
                                    onChange={(e) => {
                                      const newEdus = resumeData.educations.map(ed => ed.id === edu.id ? { ...ed, degree: e.target.value } : ed);
                                      updateState({ ...resumeData, educations: newEdus });
                                    }}
                                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg outline-none"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 5: SKILLS INVENTORY */}
                {currentStep === 5 && (
                  <div className="space-y-4">
                    <div className="relative">
                      <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">Add Core Skills & Competencies</label>
                      <div className="flex gap-2">
                        <input 
                          type="text"
                          value={skillInput}
                          onChange={(e) => setSkillInput(e.target.value)}
                          onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(skillInput); } }}
                          className="flex-1 text-xs font-semibold px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-xl outline-none"
                          placeholder="Type skill and press Enter..."
                        />
                        <button onClick={() => handleAddSkill(skillInput)} className="px-4 py-2.5 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold cursor-pointer">
                          Add
                        </button>
                      </div>
                    </div>

                    {/* Skill Presets Selection */}
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">⚡ Popular Competencies (Click to insert)</span>
                      <div className="flex flex-wrap gap-1.5">
                        {PRESET_SKILLS.map((sk) => {
                          const hasIt = resumeData.skills.includes(sk);
                          return (
                            <button
                              key={sk}
                              onClick={() => {
                                if (hasIt) {
                                  updateState({ ...resumeData, skills: resumeData.skills.filter(s => s !== sk) });
                                } else {
                                  updateState({ ...resumeData, skills: [...resumeData.skills, sk] });
                                }
                              }}
                              className={`px-2.5 py-1 rounded-lg text-[10px] font-bold border transition-all cursor-pointer ${hasIt ? 'bg-emerald-600 border-emerald-600 text-white shadow-xs' : 'bg-white border-stone-200 text-stone-700 hover:bg-stone-50'}`}
                            >
                              {hasIt ? `✓ ${sk}` : `+ ${sk}`}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Current Skills list */}
                    <div className="space-y-1">
                      <span className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Your Core Skills Inventory</span>
                      <div className="flex flex-wrap gap-1.5 p-3.5 bg-stone-50 border border-stone-200/60 rounded-xl min-h-[60px]">
                        {resumeData.skills.map((sk) => (
                          <div key={sk} className="flex items-center gap-1.5 px-3 py-1 bg-white border border-stone-200 rounded-full text-xs font-bold text-stone-700 shadow-3xs">
                            <span>{sk}</span>
                            <button onClick={() => updateState({ ...resumeData, skills: resumeData.skills.filter(s => s !== sk) })} className="p-0.5 hover:bg-rose-50 hover:text-rose-600 rounded text-stone-400 cursor-pointer">
                              <X size={10} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 6: CERTIFICATIONS */}
                {currentStep === 6 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Licenses & Credentials</span>
                      <button onClick={addCertification} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Credential
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(resumeData.certifications || []).map((cert) => (
                        <div key={cert.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 relative grid grid-cols-1 sm:grid-cols-3 gap-3">
                          <button onClick={() => deleteCertification(cert.id)} className="absolute top-2 right-2 p-1 hover:bg-rose-50 text-rose-600 rounded cursor-pointer"><Trash2 size={11} /></button>
                          <div className="sm:col-span-2">
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Certification Name</label>
                            <input 
                              type="text" 
                              value={cert.name}
                              onChange={(e) => {
                                const list = (resumeData.certifications || []).map(c => c.id === cert.id ? { ...c, name: e.target.value } : c);
                                updateState({ ...resumeData, certifications: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Date</label>
                            <input 
                              type="text" 
                              value={cert.date}
                              onChange={(e) => {
                                const list = (resumeData.certifications || []).map(c => c.id === cert.id ? { ...c, date: e.target.value } : c);
                                updateState({ ...resumeData, certifications: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 7: LANGUAGES */}
                {currentStep === 7 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Languages Matrix</span>
                      <button onClick={addLanguage} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Language
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(resumeData.languages || []).map((lang) => (
                        <div key={lang.id} className="p-3 bg-stone-50 rounded-xl border border-stone-200 relative grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button onClick={() => deleteLanguage(lang.id)} className="absolute top-2 right-2 p-1 hover:bg-rose-50 text-rose-600 rounded cursor-pointer"><Trash2 size={11} /></button>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Language</label>
                            <input 
                              type="text" 
                              value={lang.name}
                              onChange={(e) => {
                                const list = (resumeData.languages || []).map(l => l.id === lang.id ? { ...l, name: e.target.value } : l);
                                updateState({ ...resumeData, languages: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Proficiency</label>
                            <select 
                              value={lang.proficiency}
                              onChange={(e) => {
                                const list = (resumeData.languages || []).map(l => l.id === lang.id ? { ...l, proficiency: e.target.value as any } : l);
                                updateState({ ...resumeData, languages: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 bg-white rounded-lg outline-none"
                            >
                              <option value="Native">Native</option>
                              <option value="Fluent">Fluent</option>
                              <option value="Professional">Professional</option>
                              <option value="Conversational">Conversational</option>
                              <option value="Beginner">Beginner</option>
                            </select>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 8: KEY PROJECTS */}
                {currentStep === 8 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Project Workspace</span>
                      <button onClick={addProject} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Project
                      </button>
                    </div>

                    <div className="space-y-3">
                      {resumeData.projects.map((proj) => {
                        const isCollapsed = collapsedProjects[proj.id] === true;
                        return (
                          <div key={proj.id} className="border border-stone-200 rounded-xl overflow-hidden bg-stone-50/20">
                            <div 
                              onClick={() => setCollapsedProjects(prev => ({ ...prev, [proj.id]: !isCollapsed }))}
                              className="px-4 py-2.5 bg-stone-50/50 border-b border-stone-100 flex justify-between items-center cursor-pointer select-none"
                            >
                              <span className="text-xs font-bold text-stone-800">{proj.name || 'New Project'}</span>
                              <button onClick={() => deleteProject(proj.id)} className="p-1 hover:bg-rose-50 text-rose-600 rounded"><Trash2 size={11} /></button>
                            </div>

                            {!isCollapsed && (
                              <div className="p-4 bg-white space-y-3">
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">Project Name</label>
                                  <input 
                                    type="text" 
                                    value={proj.name}
                                    onChange={(e) => {
                                      const list = resumeData.projects.map(p => p.id === proj.id ? { ...p, name: e.target.value } : p);
                                      updateState({ ...resumeData, projects: list });
                                    }}
                                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg outline-none"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">Technologies Used</label>
                                  <input 
                                    type="text" 
                                    value={proj.technologies}
                                    onChange={(e) => {
                                      const list = resumeData.projects.map(p => p.id === proj.id ? { ...p, technologies: e.target.value } : p);
                                      updateState({ ...resumeData, projects: list });
                                    }}
                                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg outline-none"
                                    placeholder="e.g. React, Docker, NodeJS"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase">Description</label>
                                  <textarea 
                                    value={proj.description}
                                    onChange={(e) => {
                                      const list = resumeData.projects.map(p => p.id === proj.id ? { ...p, description: e.target.value } : p);
                                      updateState({ ...resumeData, projects: list });
                                    }}
                                    rows={3}
                                    className="w-full text-xs font-semibold p-2.5 border border-stone-200 rounded-lg outline-none"
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* STEP 9: AWARDS */}
                {currentStep === 9 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Special Achievements & Honors</span>
                      <button onClick={addAward} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Award
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(resumeData.awards || []).map((aw) => (
                        <div key={aw.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 relative grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button onClick={() => deleteAward(aw.id)} className="absolute top-2 right-2 p-1 hover:bg-rose-50 text-rose-600 rounded cursor-pointer"><Trash2 size={11} /></button>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Award Title</label>
                            <input 
                              type="text" 
                              value={aw.title}
                              onChange={(e) => {
                                const list = (resumeData.awards || []).map(a => a.id === aw.id ? { ...a, title: e.target.value } : a);
                                updateState({ ...resumeData, awards: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Issuing Body</label>
                            <input 
                              type="text" 
                              value={aw.issuer}
                              onChange={(e) => {
                                const list = (resumeData.awards || []).map(a => a.id === aw.id ? { ...a, issuer: e.target.value } : a);
                                updateState({ ...resumeData, awards: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 10: REFERENCES */}
                {currentStep === 10 && (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold text-stone-700">Professional References</span>
                      <button onClick={addReference} className="px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white text-[10.5px] font-bold rounded-xl flex items-center gap-1 cursor-pointer">
                        <Plus size={11} /> Add Reference
                      </button>
                    </div>

                    <div className="space-y-3">
                      {(resumeData.references || []).map((ref) => (
                        <div key={ref.id} className="p-4 bg-stone-50 rounded-xl border border-stone-200 relative grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <button onClick={() => deleteReference(ref.id)} className="absolute top-2 right-2 p-1 hover:bg-rose-50 text-rose-600 rounded cursor-pointer"><Trash2 size={11} /></button>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Reference Name</label>
                            <input 
                              type="text" 
                              value={ref.name}
                              onChange={(e) => {
                                const list = (resumeData.references || []).map(r => r.id === ref.id ? { ...r, name: e.target.value } : r);
                                updateState({ ...resumeData, references: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="text-[9px] font-bold text-stone-400 uppercase">Company Affiliation</label>
                            <input 
                              type="text" 
                              value={ref.company}
                              onChange={(e) => {
                                const list = (resumeData.references || []).map(r => r.id === ref.id ? { ...r, company: e.target.value } : r);
                                updateState({ ...resumeData, references: list });
                              }}
                              className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* STEP 11: REVIEW & EXPORT */}
                {currentStep === 11 && (
                  <div className="space-y-5 text-left">
                    <div className="p-4 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 flex gap-3">
                      <div className="p-2 bg-emerald-100 rounded-xl text-emerald-800 self-start">
                        <CheckCircle size={18} />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-black text-emerald-950">Your Portfolio is Calibrated!</h4>
                        <p className="text-[11px] text-stone-600 leading-relaxed">
                          All structural data schemas conform to global recruiting formats. Spacing, typography, and accent colors will print natively to standard single or multi-sheet standard constraints.
                        </p>
                      </div>
                    </div>

                    {/* Completion Dashboard */}
                    <div className="p-4 bg-white border border-stone-200 rounded-2xl space-y-3 shadow-xs">
                      <div className="flex justify-between items-center pb-2 border-b border-stone-150">
                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Completion Dashboard</span>
                        <span className="text-xs font-black text-emerald-600 font-mono">{progressPercent}% Overall</span>
                      </div>
                      
                      <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1 no-scrollbar">
                        {BUILDER_STEPS.map((step) => {
                          const prog = getSectionProgress(step.id);
                          return (
                            <div key={step.id} className="flex items-center justify-between text-xs py-1 hover:bg-stone-50 rounded px-1 transition-colors">
                              <div className="flex items-center gap-2">
                                <div className={`w-1.5 h-1.5 rounded-full ${prog.validationStatus === 'completed' ? 'bg-emerald-500' : prog.validationStatus === 'started' ? 'bg-amber-500' : 'bg-stone-300'}`} />
                                <span className="font-semibold text-stone-700">{step.name}</span>
                              </div>
                              <div className="flex items-center gap-2 text-[10px] text-stone-500 font-mono">
                                <span>{prog.completedFields} / {prog.requiredFields} Fields</span>
                                <span className={`font-bold px-1.5 py-0.5 rounded-md ${prog.validationStatus === 'completed' ? 'bg-emerald-50 text-emerald-700' : prog.validationStatus === 'started' ? 'bg-amber-50 text-amber-700' : 'bg-stone-50 text-stone-400'}`}>
                                  {prog.percentage}%
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>

                    <div className="p-4 bg-stone-50 border border-stone-200 rounded-xl text-left space-y-2">
                      <span className="text-[10px] font-bold text-stone-500 uppercase block">Print / Save Instructions</span>
                      <p className="text-xs text-stone-600 leading-relaxed font-medium">
                        Use your browser's native Print engine to export directly to a vector PDF file. <code>@media print</code> sheets are optimized automatically with correct bounding boxes.
                      </p>
                      <button 
                        onClick={() => setIsExportDialogOpen(true)}
                        className="w-full py-2.5 bg-stone-900 hover:bg-stone-800 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer flex items-center justify-center gap-2"
                      >
                        <Printer size={13} />
                        Trigger Export & Print Dialog
                      </button>
                    </div>
                  </div>
                )}

              </div>

              {/* ACTION BACK / FORTH BUTTONS */}
              <div className="flex justify-between items-center">
                <button
                  type="button"
                  disabled={currentStep === 1}
                  onClick={() => setCurrentStep(prev => Math.max(prev - 1, 1))}
                  className={`px-4 py-2 rounded-xl text-xs font-bold border transition-all flex items-center gap-1.5 ${currentStep === 1 ? 'opacity-40 cursor-not-allowed text-stone-400' : 'bg-white border-stone-200 hover:bg-stone-50 text-stone-700 cursor-pointer'}`}
                >
                  <ChevronLeft size={13} />
                  <span>Previous</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    if (currentStep === 11) {
                      setIsExportDialogOpen(true);
                    } else {
                      setCurrentStep(prev => Math.min(prev + 1, 11));
                      setVisitedSteps(prev => {
                        const next = new Set(prev);
                        next.add(currentStep + 1);
                        return next;
                      });
                    }
                  }}
                  className="px-5 py-2 bg-stone-900 hover:bg-stone-850 text-white text-xs font-bold rounded-xl shadow-sm transition-all cursor-pointer flex items-center gap-1.5 animate-shimmer"
                >
                  <span>{currentStep === 11 ? 'Print Resume' : 'Next Step'}</span>
                  {currentStep === 11 ? <Printer size={13} /> : <ChevronRight size={13} />}
                </button>
              </div>

              {/* REAL-TIME QUALITY ASSESSOR (ATS Evaluator) */}
              <div className="p-4 bg-white border border-stone-200/65 rounded-2xl shadow-xs text-left space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg"><BarChart2 size={13} /></span>
                    <span className="text-xs font-bold text-stone-800">ATS Quality Score</span>
                  </div>
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded-full ${atsScore >= 80 ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {atsScore} / 100
                  </span>
                </div>

                <div className="w-full bg-stone-100 rounded-full h-1 overflow-hidden">
                  <div className="bg-emerald-500 h-1 rounded-full transition-all duration-500" style={{ width: `${atsScore}%` }} />
                </div>

                {atsTips.length > 0 ? (
                  <div className="space-y-1.5 pt-1">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">⚠️ Performance Adjustments</span>
                    <ul className="space-y-1">
                      {atsTips.slice(0, 2).map((tip, idx) => (
                        <li key={idx} className="text-[10px] text-stone-500 font-medium flex items-start gap-1.5">
                          <span className="text-emerald-600 font-bold shrink-0">•</span>
                          <span>{tip}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Highly optimized layout format parsed perfectly for standard machine scanners!</span>
                  </div>
                )}
              </div>

            </motion.div>
          </AnimatePresence>
        </main>

        {/* FLEXIBLE CONTAINER FOR CANVAS & DESIGN DRAWER (68-70%) */}
        <div className="flex-1 h-full flex relative overflow-hidden">
          
          {/* PANEL 3: STICKY LIVE PREVIEW CANVAS */}
          <section className="flex-1 h-full border-l flex flex-col justify-between overflow-hidden relative bg-stone-100/50 border-stone-200/80">
            
            {/* Dedicated Canvas Floating Controls Toolbar */}
            <div className="w-full px-4 py-2.5 bg-white border-b border-stone-200/80 flex flex-wrap items-center justify-between gap-3 z-10 print:hidden select-none">
              
              {/* Previous / Next Page Navigation */}
              <div className="flex items-center gap-1 bg-white border border-stone-200 p-0.5 rounded-xl shadow-xs">
                <button
                  type="button"
                  disabled={currentPage <= 1}
                  onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
                  className={`p-1.5 rounded-lg transition-all ${
                    currentPage <= 1 
                      ? 'text-stone-300 cursor-not-allowed' 
                      : 'text-stone-600 hover:bg-stone-100 active:scale-95 cursor-pointer'
                  }`}
                  title="Previous Page"
                >
                  <ChevronLeft size={14} />
                </button>
                
                <span className="text-[10px] font-mono font-bold text-stone-600 px-2 select-none">
                  Page {currentPage} of {resumeMetrics.pageCount}
                </span>

                <button
                  type="button"
                  disabled={currentPage >= resumeMetrics.pageCount}
                  onClick={() => setCurrentPage((prev) => Math.min(resumeMetrics.pageCount, prev + 1))}
                  className={`p-1.5 rounded-lg transition-all ${
                    currentPage >= resumeMetrics.pageCount 
                      ? 'text-stone-300 cursor-not-allowed' 
                      : 'text-stone-600 hover:bg-stone-100 active:scale-95 cursor-pointer'
                  }`}
                  title="Next Page"
                >
                  <ChevronRight size={14} />
                </button>
              </div>

              {/* View Modes Selection */}
              <div className="flex items-center gap-1 bg-stone-50 border border-stone-200 p-0.5 rounded-xl shadow-xs">
                <button
                  type="button"
                  onClick={() => setViewMode('single')}
                  className={`px-2 py-1 text-[9.5px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'single' 
                      ? 'bg-stone-900 text-[#8cfbd4] shadow-xs' 
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  title="Single Page View"
                >
                  Single
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('continuous')}
                  className={`px-2 py-1 text-[9.5px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'continuous' 
                      ? 'bg-stone-900 text-[#8cfbd4] shadow-xs' 
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  title="Continuous Pages (Default)"
                >
                  Continuous
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('facing')}
                  className={`px-2 py-1 text-[9.5px] font-bold rounded-lg uppercase tracking-wider transition-all cursor-pointer ${
                    viewMode === 'facing' 
                      ? 'bg-stone-900 text-[#8cfbd4] shadow-xs' 
                      : 'text-stone-600 hover:bg-stone-100'
                  }`}
                  title="Facing Pages View"
                >
                  Facing
                </button>
              </div>

              {/* Zoom Controls */}
              <div className="flex items-center gap-1.5 bg-white border border-stone-200 px-2 py-1 rounded-xl shadow-xs">
                <button 
                  onClick={handleZoomOut} 
                  className="p-1 hover:bg-stone-150 rounded text-stone-600 cursor-pointer active:scale-95" 
                  title="Zoom Out"
                >
                  <ZoomOut size={12} />
                </button>
                
                <span className="text-[10px] font-mono font-bold text-stone-600 min-w-[32px] text-center">
                  {Math.round(scale * 100)}%
                </span>
                
                <button 
                  onClick={handleZoomIn} 
                  className="p-1 hover:bg-stone-150 rounded text-stone-600 cursor-pointer active:scale-95" 
                  title="Zoom In"
                >
                  <ZoomIn size={12} />
                </button>
                
                <div className="h-3 w-[1px] bg-stone-200 mx-1" />
                
                <button 
                  onClick={() => setZoomMode('auto')} 
                  className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase transition-all ${zoomMode === 'auto' ? 'bg-stone-900 text-[#8cfbd4]' : 'hover:bg-stone-100 text-stone-600'}`}
                  title="Auto-Fit to Canvas"
                >
                  Auto-Fit
                </button>
              </div>

              {/* Print and Export Buttons */}
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setIsPreviewFullscreen(true)}
                  className="px-3 py-1.5 bg-stone-900 hover:bg-stone-850 text-[#8cfbd4] text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                  title="Fullscreen Preview"
                >
                  <Eye size={12} />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setIsExportDialogOpen(true)}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider rounded-xl shadow-xs transition-all cursor-pointer flex items-center gap-1.5 active:scale-95"
                >
                  <Download size={12} />
                  <span>Export PDF / Print</span>
                </button>
              </div>
            </div>

            {/* FLOATING RESUME HEALTH ASSISTANT PANEL */}
            <div className={`absolute top-[64px] left-4 z-30 print:hidden transition-all duration-300 ${isHealthPanelExpanded ? 'max-w-[320px] w-full' : ''}`}>
              {!isHealthPanelExpanded ? (
                <button 
                  onClick={toggleHealthPanel}
                  className="bg-white/95 backdrop-blur-md border border-stone-200 shadow-md rounded-full px-3.5 py-2 flex items-center gap-2 cursor-pointer hover:border-emerald-500 hover:shadow-lg transition-all group"
                  title="Show Resume Health Details"
                >
                  <span className="p-1 bg-emerald-50 text-emerald-700 rounded-full group-hover:scale-105 transition-transform flex items-center justify-center">
                    <Sparkles size={11} className="animate-pulse" />
                  </span>
                  <span className="text-[10px] font-bold text-stone-700">Health:</span>
                  <span className="text-[11px] font-mono font-black text-stone-850">
                    {resumeMetrics.healthScore}
                  </span>
                  <ChevronDown size={13} className="text-stone-400 group-hover:text-stone-600 transition-colors" />
                </button>
              ) : (
                <div className="bg-white/95 backdrop-blur-md border border-stone-200/80 shadow-lg rounded-2xl p-4 text-left relative">
                  {/* Minimize Button */}
                  <button 
                    onClick={toggleHealthPanel}
                    className="absolute top-4 right-4 p-1 hover:bg-stone-100 rounded text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
                    title="Collapse Panel"
                  >
                    <ChevronUp size={14} />
                  </button>

                  <div className="flex justify-between items-center pb-2.5 border-b border-stone-100 pr-6">
                    <div className="flex items-center gap-2">
                      <span className="p-1.5 bg-emerald-50 text-emerald-700 rounded-lg">
                        <Sparkles size={14} className="animate-pulse" />
                      </span>
                      <div>
                        <h4 className="text-xs font-bold text-stone-800">Resume Health Score</h4>
                        <p className="text-[9px] text-stone-400 font-medium">Real-time Layout & ATS Audit</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-[14px] font-mono font-black text-stone-850">
                        {resumeMetrics.healthScore}
                      </span>
                      <span className="text-[10px] text-stone-400 font-bold">/100</span>
                    </div>
                  </div>

                  <div className="w-full bg-stone-100 rounded-full h-1 mt-2.5 overflow-hidden">
                    <div 
                      className={`h-full rounded-full transition-all duration-500 ${
                        resumeMetrics.healthScore >= 90 ? 'bg-emerald-500' :
                        resumeMetrics.healthScore >= 75 ? 'bg-amber-500' : 'bg-rose-500'
                      }`}
                      style={{ width: `${resumeMetrics.healthScore}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2 pt-3">
                    <div className="p-2 bg-stone-50 rounded-xl border border-stone-150/40">
                      <span className="text-[8.5px] font-bold text-stone-400 uppercase tracking-wider block">Content Density</span>
                      <span className="text-xs font-bold text-stone-700 capitalize">{resumeMetrics.contentDensity}</span>
                    </div>
                    <div className="p-2 bg-stone-50 rounded-xl border border-stone-150/40">
                      <span className="text-[8.5px] font-bold text-stone-400 uppercase tracking-wider block">Readability Score</span>
                      <span className="text-xs font-bold text-stone-700">{resumeMetrics.readabilityScore} / 100</span>
                    </div>
                  </div>

                  <div className="pt-3">
                    <span className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1.5">💡 Actionable suggestions</span>
                    <div className="space-y-1.5 max-h-[140px] overflow-y-auto no-scrollbar">
                      {resumeMetrics.recommendations.slice(0, 3).map((rec, idx) => (
                        <div key={idx} className="text-[10px] text-stone-600 font-medium flex items-start gap-1.5">
                          <span className="text-emerald-500 font-bold shrink-0 mt-0.5">•</span>
                          <span>{rec}</span>
                        </div>
                      ))}
                      {resumeMetrics.atsWarnings.map((warn, idx) => (
                        <div key={idx} className="text-[10px] text-amber-700 font-semibold flex items-start gap-1.5 bg-amber-50/60 p-1.5 rounded-lg border border-amber-100/60">
                          <span className="text-amber-500 font-bold shrink-0">⚠️</span>
                          <span>{warn}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Interactive Document Sheets wrapper with dynamic scaling and centering */}
            <div 
              ref={containerRef} 
              className="flex-1 overflow-y-auto overflow-x-hidden p-8 flex justify-center items-start bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] relative no-scrollbar"
            >
              <div 
                style={{
                  width: `${(viewMode === 'facing' ? (a4Width * 2 + 48) : a4Width) * scale}px`,
                  height: `${(viewMode === 'facing' ? (a4Height * Math.ceil(resumeMetrics.pageCount / 2) + 32) : viewMode === 'single' ? a4Height : (a4Height * resumeMetrics.pageCount + (resumeMetrics.pageCount - 1) * 32)) * scale}px`,
                  minHeight: `${(viewMode === 'facing' ? (a4Height * Math.ceil(resumeMetrics.pageCount / 2) + 32) : viewMode === 'single' ? a4Height : (a4Height * resumeMetrics.pageCount + (resumeMetrics.pageCount - 1) * 32)) * scale}px`
                }}
                className="relative flex items-start justify-center transition-all duration-150"
              >
                {/* Floating Canvas Progress Badge */}
                <div 
                  id="canvas-progress-badge"
                  className="absolute -top-3 right-4 z-20 print:hidden bg-white/95 backdrop-blur-xs border border-stone-200/80 shadow-md rounded-full px-3 py-1 flex items-center gap-2 cursor-pointer hover:border-emerald-500 transition-all animate-fade-in"
                  onClick={() => setCurrentStep(11)}
                  title="Click to view Completion Dashboard"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[9.5px] font-mono font-bold text-stone-700 uppercase tracking-wider">
                    Overall Completion: {progressPercent}%
                  </span>
                </div>
                <div 
                  style={{
                    transform: `scale(${scale})`,
                    transformOrigin: 'top left',
                    width: `${viewMode === 'facing' ? (a4Width * 2 + 48) : a4Width}px`,
                    height: `${viewMode === 'facing' ? (a4Height * Math.ceil(resumeMetrics.pageCount / 2) + 32) : viewMode === 'single' ? a4Height : (a4Height * resumeMetrics.pageCount + (resumeMetrics.pageCount - 1) * 32)}px`,
                    position: 'absolute',
                    top: 0,
                    left: 0
                  }}
                  className="bg-transparent"
                >
                  <ResumePreviewer 
                    data={resumeData} 
                    config={styleConfig} 
                    viewMode={viewMode}
                    currentPage={currentPage}
                    onMetricsChange={(metrics) => {
                      setResumeMetrics(metrics);
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Canvas Indicator Footer */}
            <div className="px-4 py-2 bg-white border-t border-stone-200/80 text-[10px] text-stone-500 flex flex-col md:flex-row gap-2 justify-between items-center font-medium print:hidden select-none">
              <div className="flex items-center gap-3">
                <span>{styleConfig.paperSize === 'A4' ? 'A4 (Global)' : 'US Letter'} Canvas Workspace</span>
                
                {styleConfig.lengthTarget && styleConfig.lengthTarget !== 'auto' && (
                  <div className="flex items-center gap-1 bg-stone-100 rounded-md p-0.5 border border-stone-200">
                    <button
                      onClick={() => updateStyleState({ ...styleConfig, autoFitMode: 'preferred' })}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        (styleConfig.autoFitMode || 'preferred') === 'preferred' 
                          ? 'bg-white text-[#115E59] shadow-xs border-stone-200 border' 
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Preferred
                    </button>
                    <button
                      onClick={() => updateStyleState({ ...styleConfig, autoFitMode: 'strict' })}
                      className={`px-1.5 py-0.5 rounded text-[9px] font-bold transition-all cursor-pointer ${
                        styleConfig.autoFitMode === 'strict' 
                          ? 'bg-stone-800 text-white shadow-xs' 
                          : 'text-stone-500 hover:text-stone-800'
                      }`}
                    >
                      Strict
                    </button>
                  </div>
                )}
              </div>

              {styleConfig.lengthTarget && styleConfig.lengthTarget !== 'auto' && (
                <div className="flex items-center gap-2">
                  {resumeMetrics.autoFitActive ? (
                    <span className="inline-flex items-center gap-1 bg-teal-50 text-teal-700 border border-teal-200 px-2 py-0.5 rounded text-[9px] font-bold">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal-500 animate-pulse"></span>
                      ✨ Spacing Auto-Tightened
                    </span>
                  ) : (
                    <span className="text-stone-400 font-normal text-[9px]">Original Spacing</span>
                  )}
                  <button
                    onClick={() => updateStyleState({ ...styleConfig, enableAutoFit: styleConfig.enableAutoFit === false ? true : false })}
                    className={`px-2 py-0.5 rounded border text-[9px] font-bold cursor-pointer transition-all ${
                      styleConfig.enableAutoFit !== false 
                        ? 'bg-white hover:bg-stone-100 border-stone-200 text-stone-700' 
                        : 'bg-emerald-50 hover:bg-emerald-100 border-emerald-200 text-emerald-700'
                    }`}
                  >
                    {styleConfig.enableAutoFit !== false ? 'Disable Auto-Fit' : 'Enable Auto-Fit'}
                  </button>
                </div>
              )}
              
              <div className="flex items-center gap-2">
                {styleConfig.lengthTarget && styleConfig.lengthTarget !== 'auto' ? (
                  (() => {
                    const targetNum = styleConfig.lengthTarget === '1-page' ? 1 : 2;
                    const isMatched = resumeMetrics.pageCount === targetNum;
                    return isMatched ? (
                      <span className="inline-flex items-center gap-1 bg-emerald-50 text-emerald-700 border border-emerald-200 px-2 py-0.5 rounded text-[9px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                        Fits {styleConfig.lengthTarget === '1-page' ? '1 page' : '2 pages'}
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-800 border border-amber-200 px-2 py-0.5 rounded text-[9px] font-bold">
                        <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                        Target: {targetNum} — Current: {resumeMetrics.pageCount}
                      </span>
                    );
                  })()
                ) : (
                  <span className="inline-flex items-center gap-1 bg-stone-50 text-stone-600 border border-stone-200 px-2 py-0.5 rounded text-[9px] font-bold">
                    Flow mode
                  </span>
                )}
                <span className="font-bold text-stone-700">{resumeMetrics.pageCount} Page{resumeMetrics.pageCount > 1 ? 's' : ''} Grid ({viewMode} view)</span>
              </div>
            </div>
        </section>

        {/* --- DYNAMIC SLIDE-OUT PANEL: DESIGN STUDIO DRAWER (Slide-out over the Preview) --- */}
        <AnimatePresence>
          {isDesignStudioOpen && (
            <motion.div
              initial={{ x: 420, opacity: 0.9 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: 420, opacity: 0.9 }}
              transition={{ type: 'spring', stiffness: 350, damping: 32 }}
              className="w-[420px] shrink-0 h-full bg-white border-l border-stone-200 shadow-xl z-40 flex flex-col justify-between"
            >
              <div className="flex-1 flex flex-col overflow-hidden">
                {/* Drawer Header */}
                <div className="p-4 border-b border-stone-200 flex items-center justify-between bg-stone-50">
                  <div className="flex items-center gap-2">
                    <Paintbrush size={14} className="text-stone-700" />
                    <span className="text-xs font-bold uppercase tracking-wider text-stone-850">Design Studio Panel</span>
                  </div>
                  <button 
                    onClick={() => setIsDesignStudioOpen(false)}
                    className="p-1 hover:bg-stone-200 text-stone-500 rounded-full cursor-pointer"
                  >
                    <X size={15} />
                  </button>
                </div>

                {/* Categorized Tabs - Interactive Accordion (Only one expanded at a time) */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar text-left">
                  
                  {[
                    { id: 'theme-presets', name: 'Theme Presets & Custom', desc: 'Select professional aesthetics & save custom themes', icon: Sparkles },
                    { id: 'templates', name: 'Templates', desc: 'Switch premium catalog designs instantly', icon: Grid },
                    { id: 'colors', name: 'Colors & Accents', desc: 'Select primary, secondary and link color spaces', icon: Palette },
                    { id: 'typography', name: 'Typography Options', desc: 'Adjust fonts, sizes, weights, and letter heights', icon: Type },
                    { id: 'layout', name: 'Layout & Canvas', desc: 'Configure margins, column grids, paper dimensions', icon: Sliders },
                    { id: 'spacing', name: 'Spacing & Spreads', desc: 'Squeeze or expand gap heights dynamically', icon: Filter },
                    { id: 'header', name: 'Header Formatting', desc: 'Set photo positions, contact layout grids', icon: FileText },
                    { id: 'sections', name: 'Section Toggles', desc: 'Toggle, rename, and hide different sections', icon: Menu },
                    { id: 'photo', name: 'Photo Settings', desc: 'Crop, scale, border radius, background controls', icon: User },
                    { id: 'icons', name: 'Icon Adjustments', desc: 'Toggle contact icons and bullet style variations', icon: Sparkle },
                    { id: 'borders', name: 'Borders & Lines', desc: 'Customize header lines and section divider styles', icon: Square },
                    { id: 'background', name: 'Canvas Background', desc: 'Configure printable background tints and designs', icon: Layers },
                    { id: 'ats', name: 'ATS Safe Scanner', desc: 'Assess optimization and parsing diagnostics', icon: Award },
                    { id: 'advanced', name: 'Advanced Options', desc: 'Custom CSS variables, draft exports, reset parameters', icon: Settings },
                  ].map((cat) => {
                    const isExpanded = activeCategory === cat.id;
                    const CatIcon = cat.icon;
                    return (
                      <div 
                        key={cat.id} 
                        className={`border rounded-xl overflow-hidden transition-all duration-200 ${isExpanded ? 'border-emerald-500/30 bg-stone-50/10' : 'border-stone-200/60 bg-white hover:bg-stone-50/40'}`}
                      >
                        <button
                          onClick={() => setActiveCategory(isExpanded ? '' : cat.id)}
                          className="w-full p-4 flex items-start gap-3 text-left transition-all cursor-pointer"
                        >
                          <div className={`p-2 rounded-lg shrink-0 transition-all ${isExpanded ? 'bg-emerald-500/10 text-emerald-700' : 'bg-stone-100 text-stone-500'}`}>
                            <CatIcon size={16} />
                          </div>
                          <div className="flex-1 min-w-0 pr-4">
                            <h4 className="text-xs font-bold text-stone-800 flex items-center justify-between">
                              <span>{cat.name}</span>
                            </h4>
                            <p className="text-[10px] text-stone-400 font-medium leading-tight mt-0.5">{cat.desc}</p>
                          </div>
                          <ChevronDown size={14} className={`text-stone-400 shrink-0 mt-1 transform transition-transform duration-200 ${isExpanded ? 'rotate-180 text-emerald-600' : ''}`} />
                        </button>

                        {isExpanded && (
                          <div className="border-t border-stone-100 p-4 bg-white space-y-4 text-xs">
                            
                            {cat.id === 'theme-presets' && (
                              <div className="space-y-4 text-left">
                                <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Professional Presets</label>
                                <div className="grid grid-cols-1 gap-2 max-h-[180px] overflow-y-auto pr-1 no-scrollbar">
                                  {THEME_PRESETS.map((p) => {
                                    const isSelected = styleConfig.themePreset === p.id;
                                    return (
                                      <button
                                        key={p.id}
                                        onClick={() => updateStyleState({ ...styleConfig, ...p.config })}
                                        className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-center cursor-pointer ${isSelected ? 'bg-emerald-500/5 border-emerald-600' : 'bg-white border-stone-200 hover:bg-stone-50'}`}
                                      >
                                        <div className="flex justify-between items-center w-full">
                                          <span className="font-bold text-[10.5px] text-stone-850">{p.name}</span>
                                          <span className="w-3.5 h-3.5 rounded-full border border-stone-200" style={{ backgroundColor: p.config.primaryColor.startsWith('#') ? p.config.primaryColor : '#059669' }} />
                                        </div>
                                        <span className="text-[9px] text-stone-400 mt-1 font-medium leading-tight">{p.desc}</span>
                                      </button>
                                    );
                                  })}
                                </div>

                                <div className="pt-3 border-t border-stone-100 space-y-2">
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Save Current Theme</label>
                                  <div className="flex gap-1.5">
                                    <input 
                                      type="text" 
                                      value={newThemeName}
                                      onChange={(e) => setNewThemeName(e.target.value)}
                                      placeholder="My Custom Theme..."
                                      className="flex-1 text-[10.5px] px-2.5 py-1.5 border border-stone-200 rounded-lg bg-stone-50/50 outline-none focus:border-stone-400"
                                    />
                                    <button 
                                      onClick={handleSaveTheme}
                                      className="px-3 py-1.5 bg-stone-900 text-white font-bold rounded-lg text-[10.5px] hover:bg-stone-850 cursor-pointer"
                                    >
                                      Save
                                    </button>
                                  </div>
                                </div>

                                {customThemes.length > 0 && (
                                  <div className="pt-2 space-y-2">
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Your Saved Themes</label>
                                    <div className="space-y-1.5 max-h-[120px] overflow-y-auto pr-1 no-scrollbar">
                                      {customThemes.map((ct) => (
                                        <div key={ct.name} className="flex items-center justify-between p-2 bg-stone-50/50 rounded-lg border border-stone-150">
                                          <button 
                                            onClick={() => updateStyleState({ ...styleConfig, ...ct.style, themePreset: `custom-${ct.name}` })}
                                            className="flex-1 text-left font-bold text-[10px] text-stone-750 truncate hover:text-emerald-700 cursor-pointer"
                                          >
                                            {ct.name}
                                          </button>
                                          <button 
                                            onClick={() => handleDeleteTheme(ct.name)}
                                            className="text-stone-400 hover:text-rose-600 transition-colors cursor-pointer"
                                          >
                                            <Trash2 size={12} />
                                          </button>
                                        </div>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            )}

                            {cat.id === 'templates' && (
                              <div className="space-y-4 text-left">
                                {/* Category Filters */}
                                <div className="flex flex-wrap gap-1 border-b border-stone-150 pb-2.5">
                                  {['All', 'Professional', 'Executive', 'Modern', 'Creative', 'Minimal', 'ATS'].map((category) => (
                                    <button
                                      key={category}
                                      onClick={() => setActiveTemplateTab(category)}
                                      className={`px-2 py-1 rounded text-[10px] font-bold transition-all cursor-pointer ${
                                        activeTemplateTab === category
                                          ? 'bg-stone-900 text-white shadow-xs'
                                          : 'bg-stone-50 text-stone-500 hover:bg-stone-100 hover:text-stone-700'
                                      }`}
                                    >
                                      {category}
                                    </button>
                                  ))}
                                </div>

                                <div className="grid grid-cols-2 gap-2 max-h-[340px] overflow-y-auto pr-1 no-scrollbar">
                                  {PREMIUM_TEMPLATES.filter(t => 
                                    activeTemplateTab === 'All' || 
                                    t.category.toLowerCase() === activeTemplateTab.toLowerCase() ||
                                    (activeTemplateTab === 'Professional' && ['Professional', 'Government', 'Healthcare'].includes(t.category)) ||
                                    (activeTemplateTab === 'Modern' && ['Technology', 'Academic'].includes(t.category))
                                  ).map((t) => {
                                    const isSelected = styleConfig.template === t.id;
                                    const isFav = favoriteTemplates.includes(t.id);
                                    
                                    // Simulated ATS scores for a highly realistic touch!
                                    const atsScore = t.id === 'classic' || t.id === 'executive-elite' ? 99 : 
                                                     t.id === 'corporate-pro' || t.id === 'minimalist' ? 98 : 95;

                                    return (
                                      <div
                                        key={t.id}
                                        onClick={() => updateStyleState({ ...styleConfig, template: t.id })}
                                        className={`group p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between h-[125px] cursor-pointer relative ${isSelected ? 'bg-emerald-500/5 border-emerald-600 ring-1 ring-emerald-600/20 shadow-sm' : 'bg-white border-stone-200 hover:border-stone-300 hover:bg-stone-50/50'}`}
                                      >
                                        <div className="flex justify-between items-start">
                                          {/* Mini aesthetic thumbnail rendering dynamically based on layout/type! */}
                                          {['executive-elite', 'classic', 'corporate-pro'].includes(t.id) ? (
                                            <div className="w-9 h-11 bg-stone-50 border border-stone-200/80 rounded flex flex-col p-1 gap-[2px] overflow-hidden">
                                              <div className="w-full h-[3px] bg-stone-400 rounded-2xs" />
                                              <div className="w-2/3 h-[2px] bg-stone-300 rounded-2xs mx-auto" />
                                              <div className="w-full h-[0.5px] bg-stone-200 my-[1px]" />
                                              <div className="flex flex-col gap-[1px]">
                                                <div className="w-full h-[1px] bg-stone-200 rounded-3xs" />
                                                <div className="w-full h-[1px] bg-stone-200 rounded-3xs" />
                                                <div className="w-5/6 h-[1px] bg-stone-200 rounded-3xs" />
                                              </div>
                                            </div>
                                          ) : (
                                            <div className="w-9 h-11 bg-stone-50 border border-stone-200/80 rounded flex p-[1px] gap-1 overflow-hidden">
                                              <div className="w-1/3 h-full bg-stone-150 rounded-3xs flex flex-col gap-[2px] p-[1px]">
                                                <div className="w-1.5 h-1.5 rounded-full bg-stone-300 mx-auto" />
                                                <div className="w-full h-[0.5px] bg-stone-200" />
                                                <div className="w-full h-[0.5px] bg-stone-200" />
                                              </div>
                                              <div className="flex-1 flex flex-col gap-[2px]">
                                                <div className="w-full h-[3px] bg-stone-400 rounded-2xs" />
                                                <div className="w-5/6 h-[1px] bg-stone-200" />
                                                <div className="w-full h-[1px] bg-stone-200" />
                                              </div>
                                            </div>
                                          )}

                                          {/* Favorite heart icon */}
                                          <button
                                            onClick={(e) => toggleFavoriteTemplate(t.id, e)}
                                            className={`p-1 rounded-md hover:bg-stone-100 transition-colors cursor-pointer ${isFav ? 'text-rose-500' : 'text-stone-300 group-hover:text-stone-400'}`}
                                          >
                                            <Heart size={12} fill={isFav ? "currentColor" : "none"} />
                                          </button>
                                        </div>

                                        <div className="mt-1">
                                          <div className="font-bold text-[10px] leading-tight text-stone-800 line-clamp-2">{t.name.split(' ').slice(-2).join(' ')}</div>
                                          <div className="flex items-center justify-between mt-1 text-[8px] font-bold text-stone-400 uppercase tracking-wider">
                                            <span>{t.category}</span>
                                            <span className="bg-emerald-50 text-emerald-700 px-1 py-[1px] rounded-sm font-semibold tracking-normal lowercase">ats {atsScore}%</span>
                                          </div>
                                        </div>
                                      </div>
                                    );
                                  })}
                                </div>
                              </div>
                            )}

                            {cat.id === 'colors' && (
                              <div className="space-y-3.5 text-left">
                                <div className="space-y-1.5">
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Preset Aesthetic Themes</label>
                                  <div className="grid grid-cols-2 gap-1.5 max-h-[140px] overflow-y-auto no-scrollbar">
                                    {COLOR_THEMES.map((theme) => {
                                      const isSelected = styleConfig.primaryColor === theme.colors.primaryColor;
                                      return (
                                        <button
                                          key={theme.id}
                                          onClick={() => {
                                            updateStyleState({
                                              ...styleConfig,
                                              ...theme.colors
                                            });
                                          }}
                                          className={`p-2 rounded-lg border text-left flex items-center justify-between transition-all cursor-pointer ${
                                            isSelected ? 'bg-emerald-500/5 border-emerald-600' : 'bg-white border-stone-200 hover:bg-stone-50'
                                          }`}
                                        >
                                          <div className="min-w-0 flex-1 pr-1.5">
                                            <div className="font-bold text-[9.5px] text-stone-800 truncate">{theme.name}</div>
                                          </div>
                                          <div className="flex gap-[2px] shrink-0">
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.colors.primaryColor }} />
                                            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: theme.colors.accentColor }} />
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                <div className="space-y-2 border-t border-stone-100 pt-3">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider">Customize Colors</label>
                                    <button 
                                      onClick={() => {
                                        updateStyleState({
                                          ...styleConfig,
                                          primaryColor: '#059669',
                                          secondaryColor: undefined,
                                          accentColor: undefined,
                                          headingColor: undefined,
                                          bodyTextColor: undefined,
                                          linkColor: undefined,
                                          dividerColor: undefined,
                                          sidebarColor: undefined,
                                          backgroundColor: undefined,
                                          skillChipColor: undefined,
                                          timelineColor: undefined,
                                          bulletColor: undefined,
                                          sectionLabelColor: undefined
                                        });
                                      }}
                                      className="text-[8.5px] font-bold text-emerald-600 bg-emerald-50 hover:bg-emerald-100 px-2 py-1 rounded transition-colors cursor-pointer"
                                    >
                                      Reset Colors
                                    </button>
                                  </div>

                                  <div className="space-y-3">
                                    <div>
                                      <label className="text-[9.5px] font-semibold text-stone-500 block mb-1">Select Custom Color Target</label>
                                      <select 
                                        value={colorTarget}
                                        onChange={(e) => setColorTarget(e.target.value as any)}
                                        className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg outline-none bg-white"
                                      >
                                        <option value="primaryColor">Primary Accent Color</option>
                                        <option value="secondaryColor">Secondary Color</option>
                                        <option value="accentColor">Accent Element Color</option>
                                        <option value="headingColor">Heading Text Color</option>
                                        <option value="bodyTextColor">Body Text Color</option>
                                        <option value="linkColor">Link Reference Color</option>
                                        <option value="dividerColor">Border & Divider Color</option>
                                        <option value="sidebarColor">Sidebar Area Tint</option>
                                        <option value="backgroundColor">Canvas Background Color</option>
                                        <option value="skillChipColor">Skill Badge Fill Color</option>
                                        <option value="timelineColor">Timeline Chronology Color</option>
                                        <option value="bulletColor">List Bullet Point Color</option>
                                        <option value="sectionLabelColor">Section Label Color</option>
                                      </select>
                                    </div>

                                    {/* HEX Picker with direct inputs, convert to RGB too */}
                                    <div className="flex flex-col gap-2 bg-stone-50/50 p-2.5 rounded-xl border border-stone-150">
                                      <div className="flex items-center justify-between">
                                        <span className="text-[10px] font-bold text-stone-500 uppercase tracking-wider">Color Picker</span>
                                        <div className="flex items-center gap-1.5">
                                          <input 
                                            type="color" 
                                            value={(styleConfig[colorTarget] as string) || '#4f46e5'} 
                                            onChange={(e) => {
                                              const val = e.target.value;
                                              updateStyleState({ ...styleConfig, [colorTarget]: val });
                                              addToRecentColors(val);
                                            }}
                                            className="w-7 h-7 border-0 cursor-pointer rounded-full bg-transparent"
                                          />
                                          <input 
                                            type="text" 
                                            value={(styleConfig[colorTarget] as string) || ''} 
                                            onChange={(e) => {
                                              const val = e.target.value;
                                              if (val.startsWith('#')) {
                                                updateStyleState({ ...styleConfig, [colorTarget]: val });
                                                if (val.length === 7) addToRecentColors(val);
                                              }
                                            }}
                                            placeholder="#HEXCODE"
                                            className="w-20 text-[10.5px] font-mono font-bold text-center border border-stone-200 rounded bg-white py-1 outline-none focus:border-stone-400"
                                          />
                                        </div>
                                      </div>

                                      {/* RGB Sliders for precise satisfaction! */}
                                      <div className="space-y-1.5 pt-2 border-t border-stone-100">
                                        <div className="text-[9.5px] font-bold text-stone-400 uppercase tracking-wider flex justify-between">
                                          <span>RGB Sliders</span>
                                          <span>
                                            {(() => {
                                              const rgb = hexToRgb((styleConfig[colorTarget] as string) || '#4f46e5');
                                              return rgb ? `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})` : 'rgb(0,0,0)';
                                            })()}
                                          </span>
                                        </div>
                                        {(() => {
                                          const rgb = hexToRgb((styleConfig[colorTarget] as string) || '#4f46e5') || { r: 79, g: 70, b: 229 };
                                          return (
                                            <div className="space-y-1">
                                              {['r', 'g', 'b'].map((channel) => (
                                                <div key={channel} className="flex items-center gap-2">
                                                  <span className="text-[8px] font-black uppercase text-stone-400 w-3">{channel}</span>
                                                  <input 
                                                    type="range" 
                                                    min="0" 
                                                    max="255" 
                                                    value={rgb[channel as 'r' | 'g' | 'b']} 
                                                    onChange={(e) => {
                                                      const val = parseInt(e.target.value);
                                                      const newRgb = { ...rgb, [channel]: val };
                                                      const valHex = rgbToHex(newRgb.r, newRgb.g, newRgb.b);
                                                      updateStyleState({ ...styleConfig, [colorTarget]: valHex });
                                                    }}
                                                    className="flex-1 h-1 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                                                  />
                                                </div>
                                              ))}
                                            </div>
                                          );
                                        })()}
                                      </div>
                                    </div>

                                    {/* Recent Colors list */}
                                    {recentColors.length > 0 && (
                                      <div className="space-y-1.5">
                                        <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Recent Colors</label>
                                        <div className="flex flex-wrap gap-1.5">
                                          {recentColors.map((color, i) => (
                                            <button
                                              key={`${color}-${i}`}
                                              onClick={() => updateStyleState({ ...styleConfig, [colorTarget]: color })}
                                              className="w-5 h-5 rounded-md border border-stone-200 cursor-pointer transition-transform hover:scale-115 hover:shadow-xs shrink-0"
                                              style={{ backgroundColor: color }}
                                              title={color}
                                            />
                                          ))}
                                        </div>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            )}

                            {cat.id === 'typography' && (
                              <div className="space-y-4 text-left">
                                {/* Font selections */}
                                <div className="space-y-3">
                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Name Font Family</label>
                                    <select 
                                      value={styleConfig.fontName || styleConfig.fontFamily}
                                      onChange={(e) => updateStyleState({ ...styleConfig, fontName: e.target.value })}
                                      className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg outline-none bg-white"
                                    >
                                      <option value="sans">Inter (Modern Standard)</option>
                                      <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                                      <option value="Lora">Lora (Gentle Editorial Serif)</option>
                                      <option value="Merriweather">Merriweather (Classic Bookish)</option>
                                      <option value="EB Garamond">EB Garamond (Distinguished Classic)</option>
                                      <option value="Cinzel">Cinzel (Roman Aesthetic Monumental)</option>
                                      <option value="PT Serif">PT Serif (Professional Academic)</option>
                                      <option value="Outfit">Outfit (Clean Geometry)</option>
                                      <option value="Space Grotesk">Space Grotesk (Neo-Brutalist)</option>
                                      <option value="Roboto">Roboto (Symmetrical Geometric)</option>
                                      <option value="Montserrat">Montserrat (Display Classic)</option>
                                      <option value="Plus Jakarta Sans">Plus Jakarta (Modern Corporate)</option>
                                      <option value="Arimo">Arimo (Neutral Swiss)</option>
                                      <option value="JetBrains Mono">JetBrains Mono (Technical Space)</option>
                                      <option value="Fira Code">Fira Code (Ligature Code)</option>
                                      <option value="Inconsolata">Inconsolata (Sleek Clean Mono)</option>
                                      <option value="Source Code Pro">Source Code Pro (Prestige Technical)</option>
                                      <option value="Roboto Slab">Roboto Slab (Distinguished Slate Slab)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Heading Font Family</label>
                                    <select 
                                      value={styleConfig.fontHeading || styleConfig.fontFamily}
                                      onChange={(e) => updateStyleState({ ...styleConfig, fontHeading: e.target.value })}
                                      className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg outline-none bg-white"
                                    >
                                      <option value="sans">Inter (Modern Standard)</option>
                                      <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                                      <option value="Lora">Lora (Gentle Editorial Serif)</option>
                                      <option value="Merriweather">Merriweather (Classic Bookish)</option>
                                      <option value="EB Garamond">EB Garamond (Distinguished Classic)</option>
                                      <option value="Cinzel">Cinzel (Roman Aesthetic Monumental)</option>
                                      <option value="PT Serif">PT Serif (Professional Academic)</option>
                                      <option value="Outfit">Outfit (Clean Geometry)</option>
                                      <option value="Space Grotesk">Space Grotesk (Neo-Brutalist)</option>
                                      <option value="Roboto">Roboto (Symmetrical Geometric)</option>
                                      <option value="Montserrat">Montserrat (Display Classic)</option>
                                      <option value="Plus Jakarta Sans">Plus Jakarta (Modern Corporate)</option>
                                      <option value="Arimo">Arimo (Neutral Swiss)</option>
                                      <option value="JetBrains Mono">JetBrains Mono (Technical Space)</option>
                                      <option value="Fira Code">Fira Code (Ligature Code)</option>
                                      <option value="Inconsolata">Inconsolata (Sleek Clean Mono)</option>
                                      <option value="Source Code Pro">Source Code Pro (Prestige Technical)</option>
                                      <option value="Roboto Slab">Roboto Slab (Distinguished Slate Slab)</option>
                                    </select>
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Body Text Font Family</label>
                                    <select 
                                      value={styleConfig.fontBody || styleConfig.fontFamily}
                                      onChange={(e) => updateStyleState({ ...styleConfig, fontBody: e.target.value })}
                                      className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg outline-none bg-white"
                                    >
                                      <option value="sans">Inter (Modern Standard)</option>
                                      <option value="Playfair Display">Playfair Display (Elegant Serif)</option>
                                      <option value="Lora">Lora (Gentle Editorial Serif)</option>
                                      <option value="Merriweather">Merriweather (Classic Bookish)</option>
                                      <option value="EB Garamond">EB Garamond (Distinguished Classic)</option>
                                      <option value="Cinzel">Cinzel (Roman Aesthetic Monumental)</option>
                                      <option value="PT Serif">PT Serif (Professional Academic)</option>
                                      <option value="Outfit">Outfit (Clean Geometry)</option>
                                      <option value="Space Grotesk">Space Grotesk (Neo-Brutalist)</option>
                                      <option value="Roboto">Roboto (Symmetrical Geometric)</option>
                                      <option value="Montserrat">Montserrat (Display Classic)</option>
                                      <option value="Plus Jakarta Sans">Plus Jakarta (Modern Corporate)</option>
                                      <option value="Arimo">Arimo (Neutral Swiss)</option>
                                      <option value="JetBrains Mono">JetBrains Mono (Technical Space)</option>
                                      <option value="Fira Code">Fira Code (Ligature Code)</option>
                                      <option value="Inconsolata">Inconsolata (Sleek Clean Mono)</option>
                                      <option value="Source Code Pro">Source Code Pro (Prestige Technical)</option>
                                      <option value="Roboto Slab">Roboto Slab (Distinguished Slate Slab)</option>
                                    </select>
                                  </div>
                                </div>

                                {/* Typography Sizes & Metrics sliders */}
                                <div className="space-y-3.5 border-t border-stone-100 pt-3">
                                  {/* Name Size */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Name Font Size</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.nameSize || 32}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="18" 
                                      max="48" 
                                      value={styleConfig.nameSize || 32} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, nameSize: parseInt(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Section Size */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Section Title Size</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.sectionSize || 14}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="11" 
                                      max="24" 
                                      value={styleConfig.sectionSize || 14} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, sectionSize: parseInt(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Body Size */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Body Text Size</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.bodySize || styleConfig.fontSize || 11}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="9" 
                                      max="16" 
                                      value={styleConfig.bodySize || styleConfig.fontSize || 11} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, bodySize: parseInt(e.target.value), fontSize: parseInt(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Line Height */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Line Height</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.lineHeight || 1.4}</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="1.0" 
                                      max="2.2" 
                                      step="0.05" 
                                      value={styleConfig.lineHeight || 1.4} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, lineHeight: parseFloat(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Letter Spacing */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Letter Spacing (px)</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.letterSpacing || 0}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="-1" 
                                      max="6" 
                                      step="0.5" 
                                      value={styleConfig.letterSpacing || 0} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, letterSpacing: parseFloat(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Word Spacing */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Word Spacing (px)</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.wordSpacing || 0}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="-2" 
                                      max="8" 
                                      step="0.5" 
                                      value={styleConfig.wordSpacing || 0} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, wordSpacing: parseFloat(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Paragraph Spacing */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Paragraph Spacing (px)</label>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.paragraphSpacing || 8}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="2" 
                                      max="18" 
                                      value={styleConfig.paragraphSpacing || 8} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, paragraphSpacing: parseInt(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>
                                </div>

                                {/* Text Transformations */}
                                <div className="space-y-3.5 border-t border-stone-100 pt-3">
                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Header Transformation</label>
                                    <div className="grid grid-cols-4 gap-1 bg-stone-50 p-0.5 rounded-lg border border-stone-100">
                                      {['uppercase', 'lowercase', 'capitalize', 'none'].map((tx) => (
                                        <button
                                          key={tx}
                                          onClick={() => updateStyleState({ ...styleConfig, textTransformHeading: tx })}
                                          className={`text-[9px] py-1.5 rounded font-bold transition-all cursor-pointer ${
                                            (styleConfig.textTransformHeading || 'uppercase') === tx ? 'bg-white shadow-3xs text-stone-850' : 'text-stone-500 hover:text-stone-800'
                                          }`}
                                        >
                                          {tx.substring(0, 4)}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Name Transformation</label>
                                    <div className="grid grid-cols-4 gap-1 bg-stone-50 p-0.5 rounded-lg border border-stone-100">
                                      {['uppercase', 'lowercase', 'capitalize', 'none'].map((tx) => (
                                        <button
                                          key={tx}
                                          onClick={() => updateStyleState({ ...styleConfig, textTransformName: tx })}
                                          className={`text-[9px] py-1.5 rounded font-bold transition-all cursor-pointer ${
                                            (styleConfig.textTransformName || 'none') === tx ? 'bg-white shadow-3xs text-stone-850' : 'text-stone-500 hover:text-stone-800'
                                          }`}
                                        >
                                          {tx.substring(0, 4)}
                                        </button>
                                      ))}
                                    </div>
                                  </div>

                                  <div>
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Font Weight (Headings)</label>
                                    <select 
                                      value={styleConfig.fontWeight || 'bold'}
                                      onChange={(e) => updateStyleState({ ...styleConfig, fontWeight: e.target.value })}
                                      className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg outline-none bg-white"
                                    >
                                      <option value="300">Light</option>
                                      <option value="400">Regular</option>
                                      <option value="500">Medium</option>
                                      <option value="600">Semibold</option>
                                      <option value="700">Bold</option>
                                      <option value="800">Extrabold</option>
                                    </select>
                                  </div>
                                </div>
                              </div>
                            )}

                            {cat.id === 'layout' && (
                              <div className="space-y-4 text-left">
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Paper Size</label>
                                  <div className="grid grid-cols-2 gap-1.5 bg-stone-50 p-0.5 rounded-lg border border-stone-100">
                                    {['letter', 'A4'].map((size) => (
                                      <button
                                        key={size}
                                        onClick={() => updateStyleState({ ...styleConfig, paperSize: size as any })}
                                        className={`text-[10px] py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                                          styleConfig.paperSize === size
                                            ? 'bg-white shadow-3xs text-stone-850'
                                            : 'text-stone-500 hover:text-stone-800'
                                        }`}
                                      >
                                        {size === 'letter' ? 'Letter (US)' : 'A4 (Global)'}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1">Length Target (Pages)</label>
                                  <div className="grid grid-cols-2 gap-1.5 bg-stone-50 p-0.5 rounded-lg border border-stone-100">
                                    {['1-page', '2-page'].map((target) => (
                                      <button
                                        key={target}
                                        onClick={() => updateStyleState({ 
                                          ...styleConfig, 
                                          lengthTarget: target as any,
                                          spacing: target === '1-page' ? 'compact' : 'normal'
                                        })}
                                        className={`text-[10px] py-1.5 rounded font-bold uppercase transition-all cursor-pointer ${
                                          styleConfig.lengthTarget === target
                                            ? 'bg-white shadow-3xs text-stone-850 border border-stone-200/50'
                                            : 'text-stone-500 hover:text-stone-800'
                                        }`}
                                      >
                                        {target === '1-page' ? '1 Page (Strict)' : '2 Pages (Flexible)'}
                                      </button>
                                    ))}
                                  </div>
                                </div>

                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-1 font-sans">Layout Grid Selection</label>
                                  <div className="grid grid-cols-2 gap-1.5">
                                    {[
                                      { id: 'single', name: 'Single Column', disabled: false },
                                      { id: 'sidebar-left', name: 'Left Sidebar', disabled: true },
                                      { id: 'sidebar-right', name: 'Right Sidebar', disabled: true },
                                      { id: 'two-column', name: 'Two Column', disabled: true },
                                      { id: 'hybrid', name: 'Hybrid Classic', disabled: true }
                                    ].map(l => {
                                      const isSel = l.id === 'single';
                                      
                                      if (l.disabled) {
                                        return (
                                          <div 
                                            key={l.id}
                                            className="p-2 border border-stone-150 bg-stone-50/50 text-stone-450 rounded-lg text-left font-semibold text-[10px] flex flex-col justify-between opacity-60 cursor-not-allowed select-none"
                                          >
                                            <span className="font-bold">{l.name}</span>
                                            <span className="text-[8px] text-amber-600 font-bold mt-0.5 uppercase tracking-wider">Coming Soon</span>
                                          </div>
                                        );
                                      }

                                      return (
                                        <button 
                                          key={l.id}
                                          type="button"
                                          onClick={() => updateStyleState({ ...styleConfig, layout: 'single' })}
                                          className={`p-2 border rounded-lg text-left font-bold text-[10px] transition-all cursor-pointer ${
                                            isSel ? 'border-emerald-600 bg-emerald-50/10 text-emerald-700' : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                                          }`}
                                        >
                                          <div className="flex flex-col">
                                            <span>{l.name}</span>
                                            <span className="text-[8px] text-emerald-600 font-bold mt-0.5 uppercase tracking-wider">Active</span>
                                          </div>
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>

                                {/* Custom Margins with individual sliders option! */}
                                <div className="space-y-3.5 border-t border-stone-100 pt-3">
                                  <div className="flex justify-between items-center">
                                    <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Page Margins (px)</label>
                                    <button
                                      onClick={() => setShowAdvancedMargins(!showAdvancedMargins)}
                                      className="text-[8px] font-bold text-emerald-600 hover:underline"
                                    >
                                      {showAdvancedMargins ? 'Simple Margin' : 'Individual Sides'}
                                    </button>
                                  </div>

                                  {!showAdvancedMargins ? (
                                    <div>
                                      <div className="flex justify-between items-center mb-1">
                                        <span className="text-[10px] text-stone-500 font-medium">Global Margin</span>
                                        <span className="text-[10px] font-bold text-stone-700">{styleConfig.pageMargin || 48}px</span>
                                      </div>
                                      <input 
                                        type="range" 
                                        min="24" 
                                        max="96" 
                                        value={styleConfig.pageMargin || 48} 
                                        onChange={(e) => {
                                          const val = parseInt(e.target.value);
                                          updateStyleState({ 
                                            ...styleConfig, 
                                            pageMargin: val,
                                            marginTop: val,
                                            marginBottom: val,
                                            marginLeft: val,
                                            marginRight: val
                                          });
                                        }}
                                        className="w-full accent-emerald-600 cursor-pointer" 
                                      />
                                    </div>
                                  ) : (
                                    <div className="space-y-2.5 bg-stone-50/30 p-2.5 rounded-xl border border-stone-150">
                                      {/* Top Margin */}
                                      <div>
                                        <div className="flex justify-between items-center mb-0.5">
                                          <span className="text-[9px] text-stone-400 font-bold uppercase">Top Margin</span>
                                          <span className="text-[9.5px] font-bold text-stone-700">{styleConfig.marginTop !== undefined ? styleConfig.marginTop : (styleConfig.pageMargin || 48)}px</span>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="16" 
                                          max="128" 
                                          value={styleConfig.marginTop !== undefined ? styleConfig.marginTop : (styleConfig.pageMargin || 48)} 
                                          onChange={(e) => updateStyleState({ ...styleConfig, marginTop: parseInt(e.target.value) })}
                                          className="w-full h-1 bg-stone-200 accent-emerald-600 cursor-pointer" 
                                        />
                                      </div>

                                      {/* Bottom Margin */}
                                      <div>
                                        <div className="flex justify-between items-center mb-0.5">
                                          <span className="text-[9px] text-stone-400 font-bold uppercase">Bottom Margin</span>
                                          <span className="text-[9.5px] font-bold text-stone-700">{styleConfig.marginBottom !== undefined ? styleConfig.marginBottom : (styleConfig.pageMargin || 48)}px</span>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="16" 
                                          max="128" 
                                          value={styleConfig.marginBottom !== undefined ? styleConfig.marginBottom : (styleConfig.pageMargin || 48)} 
                                          onChange={(e) => updateStyleState({ ...styleConfig, marginBottom: parseInt(e.target.value) })}
                                          className="w-full h-1 bg-stone-200 accent-emerald-600 cursor-pointer" 
                                        />
                                      </div>

                                      {/* Left Margin */}
                                      <div>
                                        <div className="flex justify-between items-center mb-0.5">
                                          <span className="text-[9px] text-stone-400 font-bold uppercase">Left Margin</span>
                                          <span className="text-[9.5px] font-bold text-stone-700">{styleConfig.marginLeft !== undefined ? styleConfig.marginLeft : (styleConfig.pageMargin || 48)}px</span>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="16" 
                                          max="128" 
                                          value={styleConfig.marginLeft !== undefined ? styleConfig.marginLeft : (styleConfig.pageMargin || 48)} 
                                          onChange={(e) => updateStyleState({ ...styleConfig, marginLeft: parseInt(e.target.value) })}
                                          className="w-full h-1 bg-stone-200 accent-emerald-600 cursor-pointer" 
                                        />
                                      </div>

                                      {/* Right Margin */}
                                      <div>
                                        <div className="flex justify-between items-center mb-0.5">
                                          <span className="text-[9px] text-stone-400 font-bold uppercase">Right Margin</span>
                                          <span className="text-[9.5px] font-bold text-stone-700">{styleConfig.marginRight !== undefined ? styleConfig.marginRight : (styleConfig.pageMargin || 48)}px</span>
                                        </div>
                                        <input 
                                          type="range" 
                                          min="16" 
                                          max="128" 
                                          value={styleConfig.marginRight !== undefined ? styleConfig.marginRight : (styleConfig.pageMargin || 48)} 
                                          onChange={(e) => updateStyleState({ ...styleConfig, marginRight: parseInt(e.target.value) })}
                                          className="w-full h-1 bg-stone-200 accent-emerald-600 cursor-pointer" 
                                        />
                                      </div>
                                    </div>
                                  )}
                                </div>

                                {/* Spacing density */}
                                <div className="space-y-2 border-t border-stone-100 pt-3">
                                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block">Grid & Section Spacing</label>
                                  
                                  {/* Section Spacing slider */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] text-stone-500 font-medium">Section Gaps (px)</span>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.sectionSpacing !== undefined ? styleConfig.sectionSpacing : 20}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="8" 
                                      max="40" 
                                      value={styleConfig.sectionSpacing !== undefined ? styleConfig.sectionSpacing : 20} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, sectionSpacing: parseInt(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>

                                  {/* Border Radius slider */}
                                  <div>
                                    <div className="flex justify-between items-center mb-1">
                                      <span className="text-[10px] text-stone-500 font-medium">Border Corner Radius</span>
                                      <span className="text-[10px] font-bold text-stone-700">{styleConfig.borderRadius !== undefined ? styleConfig.borderRadius : 4}px</span>
                                    </div>
                                    <input 
                                      type="range" 
                                      min="0" 
                                      max="16" 
                                      value={styleConfig.borderRadius !== undefined ? styleConfig.borderRadius : 4} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, borderRadius: parseInt(e.target.value) })}
                                      className="w-full accent-emerald-600 cursor-pointer" 
                                    />
                                  </div>
                                </div>
                              </div>
                            )}

                            {cat.id === 'spacing' && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Density Preset</label>
                                  <select
                                    value={styleConfig.spacing}
                                    onChange={(e) => {
                                      const spVal = e.target.value as any;
                                      let fontSize = 11;
                                      let lineHeight = 1.4;
                                      let pageMargin = 48;
                                      let sectionSpacing = 20;
                                      if (spVal === 'compact') {
                                        fontSize = 10;
                                        lineHeight = 1.25;
                                        pageMargin = 32;
                                        sectionSpacing = 12;
                                      } else if (spVal === 'relaxed') {
                                        fontSize = 13;
                                        lineHeight = 1.6;
                                        pageMargin = 64;
                                        sectionSpacing = 28;
                                      }
                                      updateStyleState({
                                        ...styleConfig,
                                        spacing: spVal,
                                        fontSize,
                                        lineHeight,
                                        pageMargin,
                                        sectionSpacing
                                      });
                                    }}
                                    className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg bg-white"
                                  >
                                    <option value="compact">Compact (Highly dense 0.5" bounds)</option>
                                    <option value="normal">Standard (Comfortable 0.75" spreads)</option>
                                    <option value="relaxed">Relaxed (Generous 1.0" negative space)</option>
                                  </select>
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <label className="text-[9px] font-bold text-stone-400 uppercase block">Section Spacing (px)</label>
                                    <span className="text-[10px] font-bold text-stone-700">{styleConfig.sectionSpacing !== undefined ? styleConfig.sectionSpacing : 20}px</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="8" 
                                    max="48" 
                                    value={styleConfig.sectionSpacing !== undefined ? styleConfig.sectionSpacing : 20} 
                                    onChange={(e) => updateStyleState({ ...styleConfig, sectionSpacing: parseInt(e.target.value) })}
                                    className="w-full accent-emerald-600 cursor-pointer" 
                                  />
                                </div>
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <label className="text-[9px] font-bold text-stone-400 uppercase block">Page Margin (px)</label>
                                    <span className="text-[10px] font-bold text-stone-700">{styleConfig.pageMargin !== undefined ? styleConfig.pageMargin : 48}px</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="16" 
                                    max="80" 
                                    value={styleConfig.pageMargin !== undefined ? styleConfig.pageMargin : 48} 
                                    onChange={(e) => updateStyleState({ ...styleConfig, pageMargin: parseInt(e.target.value) })}
                                    className="w-full accent-emerald-600 cursor-pointer" 
                                  />
                                </div>
                              </div>
                            )}

                            {cat.id === 'header' && (
                              <div className="space-y-4">
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Header Style Alignment</label>
                                  <select 
                                    value={styleConfig.headerStyle || 'centered'} 
                                    onChange={(e) => updateStyleState({ ...styleConfig, headerStyle: e.target.value as any })}
                                    className="w-full text-xs font-semibold p-2 border border-stone-200 rounded-lg bg-white outline-none"
                                  >
                                    <option value="centered">Centered Title Header</option>
                                    <option value="left">Left-Aligned Executive</option>
                                    <option value="minimal">Minimal Inline Flex</option>
                                    <option value="classic">Classic Heavy Divider</option>
                                    <option value="modern">Modern Tech Sidebar Bound</option>
                                  </select>
                                </div>
                              </div>
                            )}

                            {cat.id === 'sections' && (
                              <div className="space-y-2">
                                {Object.keys(styleConfig.visibleSections || {}).map((secKey) => {
                                  const isVisible = (styleConfig.visibleSections as any)[secKey] !== false;
                                  return (
                                    <label key={secKey} className="flex items-center gap-2.5 py-1 text-xs text-stone-700 capitalize font-bold cursor-pointer">
                                      <input 
                                        type="checkbox"
                                        checked={isVisible}
                                        onChange={(e) => {
                                          const updatedSecs = { ...(styleConfig.visibleSections || {}), [secKey]: e.target.checked };
                                          updateStyleState({ ...styleConfig, visibleSections: updatedSecs });
                                        }}
                                        className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-600/20"
                                      />
                                      <span>Display {secKey} section</span>
                                    </label>
                                  );
                                })}
                              </div>
                            )}

                            {cat.id === 'photo' && (
                              <div className="space-y-3">
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Avatar Photo URL</label>
                                  <input 
                                    type="text"
                                    value={resumeData.personalInfo.photo || ''}
                                    onChange={(e) => updateState({
                                      ...resumeData,
                                      personalInfo: { ...resumeData.personalInfo, photo: e.target.value }
                                    })}
                                    className="w-full text-xs font-semibold px-2.5 py-1.5 border border-stone-200 rounded-lg"
                                    placeholder="Insert https://avatar-url.jpg"
                                  />
                                </div>
                                <div>
                                  <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Photo Shape</label>
                                  <div className="grid grid-cols-4 gap-1 bg-stone-100 p-1 rounded-lg text-center">
                                    {[
                                      { id: 'circle', name: 'Circle' },
                                      { id: 'rounded', name: 'Rounded' },
                                      { id: 'square', name: 'Square' },
                                      { id: 'hidden', name: 'Hidden' }
                                    ].map(shape => {
                                      const isSel = (styleConfig.photoStyle || 'circle') === shape.id;
                                      return (
                                        <button 
                                          key={shape.id} 
                                          onClick={() => updateStyleState({ ...styleConfig, photoStyle: shape.id as any })}
                                          className={`text-[9px] py-1 rounded font-bold transition-all cursor-pointer ${isSel ? 'bg-white text-stone-850 shadow-3xs' : 'text-stone-500'}`}
                                        >
                                          {shape.name}
                                        </button>
                                      );
                                    })}
                                  </div>
                                </div>
                              </div>
                            )}

                            {cat.id === 'icons' && (
                              <div className="space-y-3">
                                <label className="flex items-center gap-2.5 py-1 text-xs text-stone-750 font-bold cursor-pointer">
                                  <input 
                                    type="checkbox" 
                                    checked={styleConfig.iconStyle !== 'hidden'} 
                                    onChange={(e) => updateStyleState({ ...styleConfig, iconStyle: e.target.checked ? 'visible' : 'hidden' })}
                                    className="rounded border-stone-300 text-emerald-600 focus:ring-emerald-600/20" 
                                  />
                                  <span>Show Resume Vector Icons</span>
                                </label>
                              </div>
                            )}

                            {cat.id === 'borders' && (
                              <div className="space-y-3">
                                <div>
                                  <div className="flex justify-between items-center mb-1">
                                    <label className="text-[9px] font-bold text-stone-400 uppercase block">Border Radius (px)</label>
                                    <span className="text-[10px] font-bold text-stone-700">{styleConfig.borderRadius !== undefined ? styleConfig.borderRadius : 4}px</span>
                                  </div>
                                  <input 
                                    type="range" 
                                    min="0" 
                                    max="16" 
                                    value={styleConfig.borderRadius !== undefined ? styleConfig.borderRadius : 4} 
                                    onChange={(e) => updateStyleState({ ...styleConfig, borderRadius: parseInt(e.target.value) })}
                                    className="w-full accent-emerald-600 cursor-pointer" 
                                  />
                                </div>
                              </div>
                            )}

                            {cat.id === 'background' && (
                              <div className="space-y-3">
                                <label className="text-[9px] font-bold text-stone-400 uppercase block mb-1">Print Canvas Theme Background</label>
                                <div className="grid grid-cols-3 gap-1 mb-2">
                                  {[
                                    { name: 'Pure White', value: '#ffffff' },
                                    { name: 'Eggshell', value: '#fafaf7' },
                                    { name: 'Ice Blue', value: '#f0f9ff' }
                                  ].map(bg => {
                                    const isSel = (styleConfig.backgroundColor || '#ffffff') === bg.value;
                                    return (
                                      <button 
                                        key={bg.name} 
                                        onClick={() => updateStyleState({ ...styleConfig, backgroundColor: bg.value })}
                                        className={`text-[10px] py-2 border rounded font-bold transition-all cursor-pointer ${isSel ? 'bg-stone-150 border-stone-700 text-stone-900 font-extrabold' : 'text-stone-500 bg-white border-stone-200 hover:bg-stone-50'}`}
                                      >
                                        {bg.name}
                                      </button>
                                    );
                                  })}
                                </div>
                                <div className="flex justify-between items-center pt-2 border-t border-stone-100 text-[11px] text-stone-500">
                                  <span>Custom Background Hex</span>
                                  <div className="flex items-center gap-1.5">
                                    <input 
                                      type="color" 
                                      value={styleConfig.backgroundColor || '#ffffff'} 
                                      onChange={(e) => updateStyleState({ ...styleConfig, backgroundColor: e.target.value })}
                                      className="w-5 h-5 border-0 cursor-pointer rounded"
                                    />
                                    <span className="font-mono text-[10px]">{styleConfig.backgroundColor || '#ffffff'}</span>
                                  </div>
                                </div>
                              </div>
                            )}

                            {cat.id === 'ats' && (
                              <div className="space-y-3 text-xs leading-relaxed text-stone-600">
                                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 flex items-center gap-2 text-emerald-800">
                                  <CheckCircle2 size={14} />
                                  <span className="font-bold">Resume template is fully parser compliant!</span>
                                </div>
                                <p className="text-[11px]">
                                  ATS engines score resumes based on clean layouts, standard headings, and easily identifiable bullet structures. All choices provided are pre-validated to achieve flawless extraction.
                                </p>
                              </div>
                            )}

                            {cat.id === 'advanced' && (
                              <div className="space-y-3">
                                <button 
                                  onClick={() => {
                                    if(confirm("Reset all customizations to standard defaults?")) {
                                      updateStyleState({
                                        template: 'modern-tech',
                                        primaryColor: 'emerald',
                                        fontFamily: 'sans',
                                        spacing: 'normal',
                                        lengthTarget: '1-page',
                                        paperSize: 'letter',
                                        fontSize: 11,
                                        lineHeight: 1.4,
                                        sectionSpacing: 20,
                                        pageMargin: 48,
                                        borderRadius: 4,
                                        layout: 'sidebar-left',
                                        headerStyle: 'left',
                                        iconStyle: 'visible',
                                        photoStyle: 'circle',
                                        backgroundColor: '#ffffff',
                                        themePreset: '',
                                        visibleSections: {
                                          summary: true,
                                          experience: true,
                                          education: true,
                                          skills: true,
                                          projects: true,
                                          certifications: true,
                                          achievements: true,
                                          references: true,
                                          languages: true
                                        }
                                      });
                                    }
                                  }}
                                  className="w-full py-2 bg-rose-50 text-rose-700 hover:bg-rose-100 border border-rose-200 rounded-lg font-bold text-[11px] cursor-pointer"
                                >
                                  Reset Customizations to Defaults
                                </button>
                              </div>
                            )}

                          </div>
                        )}
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Drawer Footer */}
              <div className="p-4 border-t border-stone-200 bg-stone-50 flex justify-between items-center">
                <span className="text-[10px] text-stone-400 font-mono">Calm Aesthetic Standard 2026</span>
                <button 
                  onClick={() => setIsDesignStudioOpen(false)}
                  className="px-3.5 py-1.5 bg-stone-900 text-white rounded-lg text-xs font-bold hover:bg-stone-800 cursor-pointer"
                >
                  Confirm Changes
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        </div>

      </div>

      {/* 2.5 PREMIUM EXPORT & PRINT DIALOG MODAL */}
      {isExportDialogOpen && (
        <div className="fixed inset-0 z-50 bg-stone-900/65 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn select-none">
          <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden text-left flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-stone-100 flex items-center justify-between bg-stone-50/60">
              <div className="flex items-center gap-2">
                <span className="p-2 bg-emerald-50 text-emerald-700 rounded-xl">
                  <Printer size={16} />
                </span>
                <div>
                  <h3 className="text-sm font-bold text-stone-800">Export & Print Document</h3>
                  <p className="text-[10px] text-stone-400 font-medium">Configure layout before compiling PDF</p>
                </div>
              </div>
              <button 
                onClick={() => setIsExportDialogOpen(false)}
                className="p-1.5 hover:bg-stone-100 rounded-full text-stone-400 hover:text-stone-600 transition-all cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content options */}
            <div className="p-6 space-y-5 flex-1">
              
              {/* Option 1: Paper Size (Read Only - Matches Document) */}
              <div className="space-y-1.5 p-3.5 bg-stone-50 rounded-2xl border border-stone-200/60 flex items-center justify-between">
                <div>
                  <label className="text-[9px] font-bold text-stone-400 uppercase tracking-wider block mb-0.5">Paper Dimensions</label>
                  <span className="text-xs font-bold text-stone-700 block">
                    {styleConfig.paperSize === 'letter' ? 'Letter (US Standard)' : 'A4 (International)'}
                  </span>
                  <span className="text-[10px] text-stone-400 font-medium block">
                    {styleConfig.paperSize === 'letter' ? '8.5in × 11in Standard' : '210mm × 297mm Standard'}
                  </span>
                </div>
                <div className="text-[10px] font-bold text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-lg">
                  Matches Document
                </div>
              </div>

              {/* Option 2: Orientation */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Orientation</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportOrientation('portrait')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      exportOrientation === 'portrait'
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Portrait (Recommended)
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportOrientation('landscape')}
                    className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all cursor-pointer text-center ${
                      exportOrientation === 'landscape'
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    Landscape
                  </button>
                </div>
              </div>

              {/* Option 3: Page Margins */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold text-stone-400 uppercase tracking-wider block">Print Margins</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setExportMargins('normal')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col text-left ${
                      exportMargins === 'normal'
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>Normal Margins</span>
                    <span className="text-[9px] text-stone-400 font-medium">48px Standard Spacing</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setExportMargins('compact')}
                    className={`p-3 rounded-xl border text-xs font-bold transition-all cursor-pointer flex flex-col text-left ${
                      exportMargins === 'compact'
                        ? 'border-emerald-500 bg-emerald-50/40 text-emerald-800'
                        : 'border-stone-200 bg-white text-stone-600 hover:bg-stone-50'
                    }`}
                  >
                    <span>Compact Margins</span>
                    <span className="text-[9px] text-stone-400 font-medium">24px Narrow Spacing</span>
                  </button>
                </div>
              </div>

              {/* Option 4: Extra Toggles */}
              <div className="space-y-3 pt-2">
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-stone-700 block">Include Page Numbers</span>
                    <span className="text-[9px] text-stone-400 font-medium">Add discrete indicators in footer</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={exportPageNumbers}
                    onChange={(e) => setExportPageNumbers(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-stone-300 rounded focus:ring-emerald-500 cursor-pointer"
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-stone-50 rounded-xl">
                  <div>
                    <span className="text-xs font-bold text-stone-700 block">High Definition Quality</span>
                    <span className="text-[9px] text-stone-400 font-medium">Enforce vector SVG crisp render style</span>
                  </div>
                  <span className="text-[9px] font-mono font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">
                    Always On
                  </span>
                </div>
              </div>

            </div>

            {/* Actions Footer */}
            <div className="p-5 border-t border-stone-100 bg-stone-50 flex gap-2">
              <button
                type="button"
                onClick={() => setIsExportDialogOpen(false)}
                className="flex-1 py-2.5 border border-stone-200 hover:bg-stone-100 text-stone-600 text-xs font-bold rounded-xl transition-all cursor-pointer text-center"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setIsExportDialogOpen(false);
                  handleTriggerPrint();
                }}
                className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition-all shadow-sm cursor-pointer text-center flex items-center justify-center gap-1.5 active:scale-95"
              >
                <Printer size={13} />
                <span>Open Print Dialog</span>
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 3. INTERACTIVE CANVAS PREVIEW FULLSCREEN MODAL */}
      {isPreviewFullscreen && (
        <div className="fixed inset-0 z-50 bg-stone-900/90 backdrop-blur-md flex flex-col justify-between p-4 animate-fadeIn">
          <div className="flex justify-between items-center text-white px-4 py-1">
            <span className="text-xs font-bold uppercase tracking-wider">High-Fidelity Document View</span>
            <button 
              onClick={() => setIsPreviewFullscreen(false)}
              className="p-1.5 bg-white/10 hover:bg-white/20 rounded-full text-white cursor-pointer animate-scaleIn"
            >
              <X size={16} />
            </button>
          </div>

          <div className="flex-1 overflow-auto p-8 flex justify-center items-start no-scrollbar">
            <div className="max-w-full">
              <ResumePreviewer 
                data={resumeData} 
                config={styleConfig} 
                viewMode={viewMode}
                currentPage={currentPage}
                onMetricsChange={setResumeMetrics}
              />
            </div>
          </div>

          <div className="text-center text-[10px] text-white/50">
            Press the Close icon to return to workspace panel.
          </div>
        </div>
      )}

    </div>
  );
};
