import React, { useState, useEffect, ReactNode } from 'react';
import { 
  Briefcase, GraduationCap, Code, Languages, FileText 
} from 'lucide-react';
import { ResumeRendererFactory, getFontFamilyStyle } from './ResumeRendererFactory';
import { ResumeData } from '../../types/resume';
import { ResumeDesign } from '../../types/design';

export interface ResumeRendererProps {
  data: ResumeData;
  design: ResumeDesign;
  viewMode?: 'single' | 'continuous' | 'facing';
  currentPage?: number;
  onMetricsChange?: (metrics: any) => void;
}

// Local SectionContainer matching the templates exactly with custom heading styling per template
const SectionContainer = ({ 
  children, 
  design, 
  title, 
  icon: Icon 
}: { 
  children: ReactNode; 
  design: ResumeDesign; 
  title: string; 
  icon: any;
}) => {
  const template = design.template || 'executive-elite';
  
  // Custom Styles by Template for Heading
  let headingClassName = "flex items-center gap-2 font-bold pb-1 mb-2.5";
  let headingStyle: React.CSSProperties = {
    fontFamily: getFontFamilyStyle(design.fontHeading),
    fontSize: `${design.sectionSize || design.headingSize || 14}px`,
    color: design.sectionLabelColor || design.headingColor || design.primaryColor,
    fontWeight: design.fontWeight || 'bold',
    letterSpacing: design.letterSpacing !== undefined ? `${design.letterSpacing}px` : '0.05em',
    textTransform: design.textTransformHeading ? (design.textTransformHeading as any) : 'uppercase',
  };

  // Differentiate Heading Typography & Border Style based on Template
  if (template === 'healthcare-professional') {
    // Left-accent colored bar, no bottom border, Title Case
    headingClassName = "flex items-center gap-2 font-bold pl-2 border-l-4 mb-2.5";
    headingStyle.borderLeftColor = design.primaryColor;
    headingStyle.textTransform = 'none'; // Title Case
    headingStyle.letterSpacing = '0.02em';
  } else if (template === 'legal-professional') {
    // Ultra-clean editorial bottom border, serif look, Title Case
    headingClassName = "flex items-center gap-1 font-semibold pb-1 mb-2.5 border-b border-stone-200";
    headingStyle.textTransform = 'none'; // Title case
    headingStyle.letterSpacing = '0.04em';
  } else if (template === 'finance-authority') {
    // Double line divider representing accounting accuracy
    headingClassName = "flex items-center gap-2 font-bold pb-1 mb-2.5 border-b-4 border-double";
    headingStyle.borderColor = design.dividerColor || `${design.primaryColor}30`;
    headingStyle.textTransform = 'uppercase';
  } else if (template === 'education-leader') {
    // Academic styled dotted underline
    headingClassName = "flex items-center gap-2 font-bold pb-1 mb-2.5 border-b border-dotted";
    headingStyle.borderColor = design.dividerColor || `${design.primaryColor}40`;
    headingStyle.textTransform = 'none';
  } else if (template === 'government-professional') {
    // Official grid banner chip
    headingClassName = "flex items-center gap-2 font-black uppercase px-2 py-1 mb-2.5 rounded-sm";
    headingStyle.backgroundColor = `${design.primaryColor}10`;
    headingStyle.color = design.primaryColor;
    headingStyle.letterSpacing = '0.08em';
  } else if (template === 'personal-brand') {
    // Asymmetric bold tracking with bottom line
    headingClassName = "flex items-center gap-2 font-black pb-1 mb-2.5 border-b-2";
    headingStyle.borderColor = design.primaryColor;
    headingStyle.letterSpacing = '0.08em';
  } else if (template === 'modern-tech') {
    // Terminal technical look, prepending with "// " or wrap in square brackets
    headingClassName = "flex items-center gap-2 font-mono font-bold pb-1 mb-2.5 border-b";
    headingStyle.borderColor = design.dividerColor || `${design.primaryColor}15`;
    headingStyle.letterSpacing = '0.1em';
  } else if (template === 'corporate-pro') {
    // Solid thick corporate border
    headingClassName = "flex items-center gap-2 font-extrabold uppercase pb-1 mb-2.5 border-b-2";
    headingStyle.borderColor = design.primaryColor;
    headingStyle.letterSpacing = '0.06em';
  } else if (template === 'creative-edge') {
    // Modern bold creative block
    headingClassName = "flex items-center gap-2 font-bold pb-1 mb-2.5 border-b-2 border-dashed";
    headingStyle.borderColor = design.primaryColor;
    headingStyle.letterSpacing = '0.06em';
  } else {
    // Executive Elite or other defaults
    headingClassName = "flex items-center gap-2 font-bold uppercase pb-1 mb-2.5 border-b";
    headingStyle.borderColor = design.dividerColor || `${design.primaryColor}20`;
    headingStyle.borderBottomWidth = design.dividerStyle === 'none' ? 0 : '1px';
  }

  // Prepend modern tech renderer headings with a visual symbol for extra flair
  const headingTitle = template === 'modern-tech' ? `// ${title}` : title;
  const showIcon = design.iconStyle !== 'hidden' && template !== 'legal-professional' && template !== 'finance-authority';

  return (
    <div style={{ marginBottom: `${design.sectionSpacing}px` }}>
      <h2 className={headingClassName} style={headingStyle}>
        {showIcon && <Icon size={(design.sectionSize || design.headingSize || 14) - 2} style={{ color: design.accentColor || design.primaryColor }} />}
        <span>{headingTitle}</span>
      </h2>
      <div 
        style={{ 
          fontFamily: getFontFamilyStyle(design.fontBody),
          fontSize: `${design.bodySize || design.fontSize}px`,
          lineHeight: design.lineHeight,
          color: design.bodyTextColor || '#374151',
          wordSpacing: design.wordSpacing !== undefined ? `${design.wordSpacing}px` : undefined
        }}
      >
        {children}
      </div>
    </div>
  );
};

export function ResumeRenderer({ 
  data, 
  design, 
  viewMode = 'continuous', 
  currentPage = 1,
  onMetricsChange 
}: ResumeRendererProps) {
  // ARCHITECTURAL DESIGN DECISION (Option B):
  // The active template's dedicated renderer class determines its distinct visual identity
  // by rendering custom headers and footers with unique layout and typography structures.
  // Section-body layouts are styled cohesively using shared design tokens (fontSize, margins,
  // spacing) in ResumeRenderer.tsx to ensure the dynamic DOM-based pagination and height measurement
  // system remains perfectly calibrated and mathematically accurate across all 10 templates.
  const renderer = ResumeRendererFactory.getRenderer(design.template);

  // States for dynamic auto-fit progressive tightening
  const [tighteningIndex, setTighteningIndex] = useState<number>(-1);
  const [lastFitResult, setLastFitResult] = useState<{
    failedToFit: boolean;
    excessSectionName?: string;
    excessSectionPercentage?: number;
    msg?: string;
  } | null>(null);

  const [isWarningDismissed, setIsWarningDismissed] = useState<boolean>(false);
  const [renderTrigger, setRenderTrigger] = useState<number>(0);

  useEffect(() => {
    let active = true;

    // 1. Listen for fonts ready
    if (typeof document !== 'undefined' && document.fonts) {
      document.fonts.ready.then(() => {
        if (active) setRenderTrigger((prev) => prev + 1);
      });
    }

    // 2. Setup short-term delayed updates for any late-mounted resources (slow Google Fonts/images)
    const t1 = setTimeout(() => {
      if (active) setRenderTrigger((prev) => prev + 1);
    }, 250);

    const t2 = setTimeout(() => {
      if (active) setRenderTrigger((prev) => prev + 1);
    }, 750);

    // 3. Listen to window resize so widths and scales recalculate accurately
    const handleResize = () => {
      if (active) setRenderTrigger((prev) => prev + 1);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      active = false;
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const baseFontSize = design.fontSize || 11;
  const baseLineHeight = design.lineHeight || 1.4;
  const baseSectionSpacing = design.sectionSpacing || 20;
  const basePageMargin = design.pageMargin || 48;
  const baseSpacing = design.spacing || 'normal';

  const serializedData = JSON.stringify(data);
  const targetKey = `${design.lengthTarget}_${design.enableAutoFit !== false}_${design.autoFitMode || 'preferred'}`;
  const baseStylesKey = `${baseFontSize}_${baseLineHeight}_${baseSectionSpacing}_${basePageMargin}_${baseSpacing}`;

  useEffect(() => {
    setTighteningIndex(-1);
    setLastFitResult(null);
    setIsWarningDismissed(false);
  }, [serializedData, targetKey, baseStylesKey]);

  // Base values for our tightening sequence
  const baseValues = {
    sectionSpacing: baseSectionSpacing,
    paragraphSpacing: baseSpacing === 'compact' ? 12 : baseSpacing === 'relaxed' ? 24 : 16,
    pageMargin: basePageMargin,
    lineHeight: baseLineHeight,
    fontSize: baseFontSize,
  };

  const sequence: typeof baseValues[] = [];
  const isAutoFitEnabled = design.lengthTarget && design.lengthTarget !== 'auto' && design.enableAutoFit !== false;

  if (isAutoFitEnabled) {
    let current = { ...baseValues };

    // a. Reduce sectionSpacing in small decrements, down to a floor of about 8px.
    while (current.sectionSpacing > 8) {
      current = { ...current, sectionSpacing: Math.max(8, current.sectionSpacing - 2) };
      sequence.push({ ...current });
    }

    // b. Reduce paragraphSpacing down to a floor of about 2px.
    while (current.paragraphSpacing > 2) {
      current = { ...current, paragraphSpacing: Math.max(2, current.paragraphSpacing - 2) };
      sequence.push({ ...current });
    }

    // c. Reduce pageMargin down to a floor of 32px (ATS print/scan limit floor).
    while (current.pageMargin > 32) {
      current = { ...current, pageMargin: Math.max(32, current.pageMargin - 4) };
      sequence.push({ ...current });
    }

    // d. Reduce lineHeight down to a floor of about 1.15.
    while (current.lineHeight > 1.15) {
      current = { ...current, lineHeight: Math.round((current.lineHeight - 0.05) * 100) / 100 };
      if (current.lineHeight < 1.15) current.lineHeight = 1.15;
      sequence.push({ ...current });
    }

    // e. As a last resort only, reduce fontSize down to a floor of 9.5px.
    while (current.fontSize > 9.5) {
      current = { ...current, fontSize: Math.max(9.5, current.fontSize - 0.25) };
      sequence.push({ ...current });
    }
  }

  // Get currently applied styling overlay
  const currentStep = (isAutoFitEnabled && tighteningIndex >= 0 && tighteningIndex < sequence.length) 
    ? sequence[tighteningIndex] 
    : null;

  const baseBottomMargin = design.marginBottom !== undefined ? design.marginBottom : (design.pageMargin !== undefined ? design.pageMargin : 48);

  const appliedDesign: ResumeDesign = {
    ...design,
    fontSize: currentStep ? currentStep.fontSize : baseFontSize,
    lineHeight: currentStep ? currentStep.lineHeight : baseLineHeight,
    sectionSpacing: currentStep ? currentStep.sectionSpacing : baseSectionSpacing,
    pageMargin: currentStep ? currentStep.pageMargin : basePageMargin,
    marginTop: currentStep ? currentStep.pageMargin : baseBottomMargin,
    marginBottom: currentStep ? currentStep.pageMargin : baseBottomMargin,
    marginLeft: currentStep ? currentStep.pageMargin : (design.marginLeft !== undefined ? design.marginLeft : design.pageMargin),
    marginRight: currentStep ? currentStep.pageMargin : (design.marginRight !== undefined ? design.marginRight : design.pageMargin),
  };

  const appliedParagraphSpacing = currentStep ? currentStep.paragraphSpacing : (baseSpacing === 'compact' ? 12 : baseSpacing === 'relaxed' ? 24 : 16);

  // Single shared source of truth representing the reserved bottom visual space (0px to match the top page margin exactly)
  const RESERVED_BOTTOM_SPACE = 0;

  // Independent of RESERVED_BOTTOM_SPACE (which is a hard safety ceiling baked into H_printable).
  // COMFORT_MARGIN is a soft aesthetic threshold: it does not change how much space is available,
  // it only informs the break/stop decisions below so content isn't packed flush against the ceiling
  // when a natural break point is available nearby.
  const COMFORT_MARGIN = 40;

  // Obtain margin settings
  const bMargin = appliedDesign.marginBottom !== undefined ? appliedDesign.marginBottom : appliedDesign.pageMargin;
  const tMargin = bMargin; // Force top margin to match bottom margin exactly for perfect vertical symmetry
  const rMargin = appliedDesign.marginRight !== undefined ? appliedDesign.marginRight : appliedDesign.pageMargin;
  const lMargin = appliedDesign.marginLeft !== undefined ? appliedDesign.marginLeft : appliedDesign.pageMargin;

  // Determine paper specifications
  const isLetter = appliedDesign.paperSize?.toLowerCase() === 'letter';
  const pageWidth = isLetter ? 816 : 794; // Standard letter (8.5in) or A4 (210mm) at 96 DPI
  const pageHeight = isLetter ? 1056 : 1123; // Standard letter (11in) or A4 (297mm) at 96 DPI
  const H_printable = pageHeight - tMargin - bMargin - RESERVED_BOTTOM_SPACE;

  // Define atomic layout blocks
  const activeBlocks: { id: string; type: string; category: string; render: () => ReactNode }[] = [];

  // 1. Header Area
  activeBlocks.push({
    id: 'header',
    type: 'header',
    category: 'Header',
    render: () => renderer.renderHeader(data, appliedDesign),
  });

  // =========================================================================
  // NOTE ON TEMPLATE DIFFERENTIATION:
  // The sections below (Summary, Skills, Experience, Projects, Education, etc.)
  // utilize a shared, generic rendering pattern to ensure rigid, layout-proof
  // alignment across all documents.
  // Template differentiation is achieved selectively per design identity 
  // via their specific 'renderHeader()' and 'renderFooter()' methods
  // implemented inside 'ResumeRendererFactory.tsx'.
  // =========================================================================

  // 2. Executive Summary
  if (data.summary && appliedDesign.visibleSections?.summary !== false) {
    activeBlocks.push({
      id: 'summary',
      type: 'summary',
      category: 'Summary',
      render: () => (
        <SectionContainer design={appliedDesign} title="Executive Summary" icon={FileText}>
          <p className="text-justify whitespace-pre-wrap leading-relaxed">{data.summary}</p>
        </SectionContainer>
      ),
    });
  }

  // 3. Skills Section
  if (data.skills && data.skills.length > 0 && appliedDesign.visibleSections?.skills !== false) {
    activeBlocks.push({
      id: 'skills',
      type: 'skills',
      category: 'Skills',
      render: () => (
        <SectionContainer design={appliedDesign} title="Expertise & Skills" icon={Code}>
          <div className="flex flex-wrap gap-2">
            {data.skills.map((skill, index) => {
              const skillName = typeof skill === 'string' ? skill : (skill as any).name || '';
              return (
                <span 
                  key={index} 
                  className="px-2.5 py-1 text-xs font-semibold rounded-md"
                  style={{ 
                    backgroundColor: `${appliedDesign.primaryColor}10`,
                    color: appliedDesign.primaryColor,
                    borderRadius: `${appliedDesign.borderRadius}px`
                  }}
                >
                  {skillName}
                </span>
              );
            })}
          </div>
        </SectionContainer>
      ),
    });
  }

  // 4. Professional Experience
  if (data.experiences && data.experiences.length > 0 && appliedDesign.visibleSections?.experience !== false) {
    activeBlocks.push({
      id: 'experience-heading',
      type: 'heading',
      category: 'Experience',
      render: () => (
        <h2 
          className="flex items-center gap-2 font-bold uppercase pb-1 mb-2.5 border-b"
          style={{ 
            fontFamily: getFontFamilyStyle(appliedDesign.fontHeading),
            fontSize: `${appliedDesign.sectionSize || appliedDesign.headingSize}px`,
            color: appliedDesign.sectionLabelColor || appliedDesign.headingColor || appliedDesign.primaryColor,
            borderColor: appliedDesign.dividerColor || `${appliedDesign.primaryColor}20`,
            borderBottomWidth: appliedDesign.dividerStyle === 'none' ? 0 : '1px',
            letterSpacing: appliedDesign.letterSpacing !== undefined ? `${appliedDesign.letterSpacing}px` : '0.05em',
            textTransform: appliedDesign.textTransformHeading ? (appliedDesign.textTransformHeading as any) : 'uppercase',
            fontWeight: appliedDesign.fontWeight || 'bold'
          }}
        >
          {appliedDesign.iconStyle !== 'hidden' && <Briefcase size={(appliedDesign.sectionSize || appliedDesign.headingSize) - 2} style={{ color: appliedDesign.accentColor || appliedDesign.primaryColor }} />}
          <span>Professional Experience</span>
        </h2>
      )
    });

    data.experiences.forEach((exp, idx) => {
      // 1. Experience header block (containing role, period, company, location)
      activeBlocks.push({
        id: `experience-item-${idx}-header`,
        type: 'item-header',
        category: 'Experience',
        render: () => (
          <div className="relative pl-1" style={{ paddingTop: idx > 0 ? `${appliedParagraphSpacing}px` : '0px' }}>
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-stone-900 font-sans text-sm md:text-base" style={{ color: appliedDesign.primaryColor }}>{exp.role || (exp as any).title}</span>
              <span className="text-stone-500 font-mono text-[11px]">{exp.period || `${(exp as any).startDate || ''} - ${(exp as any).endDate || ''}`}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs text-stone-600 italic" style={{ marginBottom: `${Math.max(2, Math.round(appliedParagraphSpacing * 0.4))}px` }}>
              <span>{exp.company}</span>
              <span>{exp.location}</span>
            </div>
          </div>
        )
      });

      // 2. Experience content/highlights block
      const highlights = Array.isArray(exp.description) ? exp.description : exp.description?.split('\n').filter(Boolean) || [];
      if (highlights.length > 1) {
        highlights.forEach((item, bIdx) => {
          activeBlocks.push({
            id: `experience-item-${idx}-bullet-${bIdx}`,
            type: 'item-bullet',
            category: 'Experience',
            render: () => (
              <div className="relative pl-1">
                <ul className="list-disc list-inside text-stone-700 leading-relaxed text-xs" style={{ marginBottom: bIdx === highlights.length - 1 ? `${appliedParagraphSpacing}px` : `${Math.max(1, Math.min(4, Math.round(appliedParagraphSpacing * 0.15)))}px` }}>
                  <li>{item.replace(/^[-•]\s*/, '')}</li>
                </ul>
              </div>
            )
          });
        });
      } else {
        activeBlocks.push({
          id: `experience-item-${idx}-body`,
          type: 'item-body',
          category: 'Experience',
          render: () => (
            <div className="relative pl-1" style={{ marginBottom: `${appliedParagraphSpacing}px` }}>
              <p className="text-stone-700 whitespace-pre-wrap leading-relaxed text-xs">{exp.description}</p>
            </div>
          )
        });
      }
    });
  }

  // 5. Key Projects
  if (data.projects && data.projects.length > 0 && appliedDesign.visibleSections?.projects !== false) {
    activeBlocks.push({
      id: 'projects-heading',
      type: 'heading',
      category: 'Projects',
      render: () => (
        <h2 
          className="flex items-center gap-2 font-bold uppercase pb-1 mb-2.5 border-b"
          style={{ 
            fontFamily: getFontFamilyStyle(appliedDesign.fontHeading),
            fontSize: `${appliedDesign.sectionSize || appliedDesign.headingSize}px`,
            color: appliedDesign.sectionLabelColor || appliedDesign.headingColor || appliedDesign.primaryColor,
            borderColor: appliedDesign.dividerColor || `${appliedDesign.primaryColor}20`,
            borderBottomWidth: appliedDesign.dividerStyle === 'none' ? 0 : '1px',
            letterSpacing: appliedDesign.letterSpacing !== undefined ? `${appliedDesign.letterSpacing}px` : '0.05em',
            textTransform: appliedDesign.textTransformHeading ? (appliedDesign.textTransformHeading as any) : 'uppercase',
            fontWeight: appliedDesign.fontWeight || 'bold'
          }}
        >
          {appliedDesign.iconStyle !== 'hidden' && <Briefcase size={(appliedDesign.sectionSize || appliedDesign.headingSize) - 2} style={{ color: appliedDesign.accentColor || appliedDesign.primaryColor }} />}
          <span>Key Projects</span>
        </h2>
      )
    });

    data.projects.forEach((proj, idx) => {
      activeBlocks.push({
        id: `projects-item-${idx}`,
        type: 'item',
        category: 'Projects',
        render: () => (
          <div className="last:mb-0" style={{ marginBottom: `${appliedParagraphSpacing}px` }}>
            <div className="flex justify-between items-baseline font-bold mb-0.5">
              <span className="text-stone-900 text-sm" style={{ color: appliedDesign.primaryColor }}>{proj.name}</span>
              {proj.website && <span className="text-xs text-stone-500 font-mono">{proj.website}</span>}
            </div>
            {proj.technologies && (
              <p className="text-stone-600 italic text-[11px]" style={{ marginBottom: `${Math.max(1, Math.round(appliedParagraphSpacing * 0.25))}px` }}>
                Technologies: {Array.isArray(proj.technologies) ? proj.technologies.join(', ') : proj.technologies}
              </p>
            )}
            <p className="text-stone-700 text-xs">{proj.description}</p>
          </div>
        )
      });
    });
  }

  // 6. Education
  if (data.educations && data.educations.length > 0 && appliedDesign.visibleSections?.education !== false) {
    activeBlocks.push({
      id: 'education-heading',
      type: 'heading',
      category: 'Education',
      render: () => (
        <h2 
          className="flex items-center gap-2 font-bold uppercase pb-1 mb-2.5 border-b"
          style={{ 
            fontFamily: getFontFamilyStyle(appliedDesign.fontHeading),
            fontSize: `${appliedDesign.sectionSize || appliedDesign.headingSize}px`,
            color: appliedDesign.sectionLabelColor || appliedDesign.headingColor || appliedDesign.primaryColor,
            borderColor: appliedDesign.dividerColor || `${appliedDesign.primaryColor}20`,
            borderBottomWidth: appliedDesign.dividerStyle === 'none' ? 0 : '1px',
            letterSpacing: appliedDesign.letterSpacing !== undefined ? `${appliedDesign.letterSpacing}px` : '0.05em',
            textTransform: appliedDesign.textTransformHeading ? (appliedDesign.textTransformHeading as any) : 'uppercase',
            fontWeight: appliedDesign.fontWeight || 'bold'
          }}
        >
          {appliedDesign.iconStyle !== 'hidden' && <GraduationCap size={(appliedDesign.sectionSize || appliedDesign.headingSize) - 2} style={{ color: appliedDesign.accentColor || appliedDesign.primaryColor }} />}
          <span>Education</span>
        </h2>
      )
    });

    data.educations.forEach((edu, idx) => {
      activeBlocks.push({
        id: `education-item-${idx}`,
        type: 'item',
        category: 'Education',
        render: () => (
          <div className="last:mb-0" style={{ marginBottom: `${appliedParagraphSpacing}px` }}>
            <div className="flex justify-between items-baseline font-bold">
              <span className="text-stone-900 text-sm" style={{ color: appliedDesign.primaryColor }}>{edu.degree}</span>
              <span className="text-stone-500 font-mono text-[11px]">{edu.period || (edu as any).graduationDate}</span>
            </div>
            <div className="flex justify-between items-baseline text-xs text-stone-600 italic">
              <span>{edu.school || (edu as any).institution}</span>
              <span>{edu.location}</span>
            </div>
          </div>
        )
      });
    });
  }

  // 7. Languages
  if (data.languages && data.languages.length > 0 && appliedDesign.visibleSections?.languages !== false) {
    activeBlocks.push({
      id: 'languages',
      type: 'languages',
      category: 'Languages',
      render: () => (
        <SectionContainer design={appliedDesign} title="Languages" icon={Languages}>
          <div className="flex flex-wrap gap-4">
            {data.languages.map((lang) => (
              <div key={lang.id} className="flex items-center gap-1.5 text-xs">
                <span className="font-bold text-stone-800">{lang.name}</span>
                <span className="text-stone-500 text-[11px] font-mono">({lang.proficiency})</span>
              </div>
            ))}
          </div>
        </SectionContainer>
      ),
    });
  }

  // 8. Footer Info
  activeBlocks.push({
    id: 'footer',
    type: 'footer',
    category: 'Footer',
    render: () => renderer.renderFooter(data, appliedDesign),
  });

  const [pages, setPages] = useState<string[][]>([]);

  useEffect(() => {
    const sandbox = document.getElementById('resume-measure-sandbox');
    if (!sandbox) return;

    const blockEls = Array.from(sandbox.querySelectorAll('.resume-block-measure'));
    const computedPages: string[][] = [];
    let currentPageBlocks: string[] = [];
    let currentPageHeight = 0;

    const getUnscaledHeight = (element: Element): number => {
      return (element as HTMLElement).offsetHeight || element.getBoundingClientRect().height;
    };

    const getHeightToConsider = (startIndex: number): number => {
      let totalHeight = 0;
      let idx = startIndex;
      while (idx < blockEls.length) {
        const nextEl = blockEls[idx] as HTMLDivElement;
        if (!nextEl) break;
        const nextId = nextEl.getAttribute('data-id') || '';
        totalHeight += getUnscaledHeight(nextEl);
        if (nextId.endsWith('-heading') || nextId.endsWith('-header')) {
          idx++;
        } else {
          break;
        }
      }
      return totalHeight;
    };

    console.log('[PAGINATION DEBUG] --- START SEGMENTATION ---');
    console.log(`[PAGINATION DEBUG] H_printable: ${H_printable}px, Paper: ${design.paperSize || 'A4'}, PageHeight: ${pageHeight}px`);

    for (let i = 0; i < blockEls.length; i++) {
      const el = blockEls[i] as HTMLDivElement;
      const id = el.getAttribute('data-id');
      if (!id) continue;
      const height = getUnscaledHeight(el);

      const heightToConsider = getHeightToConsider(i);
      const remainingSpace = H_printable - (currentPageHeight + heightToConsider);
      const wouldOverflow = (currentPageHeight + heightToConsider > H_printable) && currentPageBlocks.length > 0;

      // Comfort-margin preference: this block technically fits, but only just — accepting it would
      // leave less than COMFORT_MARGIN of breathing room above the safe area. If there is a natural
      // break point here (i.e. we're between blocks, not mid-block) and more content still follows
      // (so nothing is lost, it simply flows to the next page), prefer breaking now for a visually
      // balanced page instead of maximizing how much we cram onto this one.
      const isLastBlock = i === blockEls.length - 1;
      const wouldBeCramped = !wouldOverflow && currentPageBlocks.length > 0 && remainingSpace >= 0 && remainingSpace < COMFORT_MARGIN && !isLastBlock;

      const shouldBreak = wouldOverflow || wouldBeCramped;

      console.log(`[PAGINATION DEBUG] Block: "${id}" | height: ${height.toFixed(1)}px | heightToConsider: ${heightToConsider.toFixed(1)}px | currentAccHeight: ${currentPageHeight.toFixed(1)}px | remainingSpace: ${remainingSpace.toFixed(1)}px | shouldBreak? ${shouldBreak ? 'YES' : 'NO'}${wouldBeCramped ? ' (comfort-margin break)' : ''}`);

      if (shouldBreak) {
        console.log(`[PAGINATION DEBUG] >>> PAGE BREAK TRIGGERED at block: "${id}" <<<`);
        computedPages.push(currentPageBlocks);
        currentPageBlocks = [id];
        currentPageHeight = height;
      } else {
        currentPageBlocks.push(id);
        currentPageHeight += height;
      }
    }
    if (currentPageBlocks.length > 0) {
      computedPages.push(currentPageBlocks);
    }
    console.log('[PAGINATION DEBUG] --- END SEGMENTATION --- computedPages:', computedPages);

    // Height remaining on the final page, used below to check Auto-Fit's comfort margin.
    const lastPageBlockIds = computedPages[computedPages.length - 1] || [];
    let lastPageHeight = 0;
    lastPageBlockIds.forEach((blockId) => {
      const el = sandbox.querySelector(`[data-id="${blockId}"]`);
      if (el) lastPageHeight += getUnscaledHeight(el);
    });
    const lastPageRemaining = H_printable - lastPageHeight;
    const meetsComfortMargin = lastPageRemaining >= COMFORT_MARGIN;

    // Check if we need to auto-tighten
    const targetNum = design.lengthTarget === '1-page' ? 1 : design.lengthTarget === '2-page' ? 2 : 0;
    // Fits the page-count target, but the last page is still packed tighter than COMFORT_MARGIN allows.
    // Treat this the same as "doesn't fit yet" as long as further tightening steps remain — the goal is
    // readability within the target page count, not merely hitting the page count at any cost.
    const needsMoreTighteningForComfort =
      isAutoFitEnabled && targetNum > 0 && computedPages.length <= targetNum && !meetsComfortMargin;

    if (isAutoFitEnabled && targetNum > 0 && (computedPages.length > targetNum || needsMoreTighteningForComfort)) {
      if (tighteningIndex < sequence.length - 1) {
        // Run tightening loop by advancing step
        setTighteningIndex(prev => prev + 1);
        return; // Break effect execution, wait for next render cycle with smaller style values
      } else if (computedPages.length > targetNum) {
        // Hit floors completely, calculate the detailed excess section suggestion
        if (!lastFitResult || !lastFitResult.failedToFit) {
          const contentCategories = ['Experience', 'Summary', 'Skills', 'Projects', 'Education', 'Languages'];
          let maxSection = '';
          let maxHeight = 0;
          activeBlocks.forEach((block) => {
            const el = sandbox.querySelector(`[data-id="${block.id}"]`);
            if (el && contentCategories.includes(block.category)) {
              const h = getUnscaledHeight(el);
              if (h > maxHeight) {
                maxHeight = h;
                maxSection = block.category;
              }
            }
          });
          const pct = Math.round((maxHeight / H_printable) * 100);
          const msg = `Your ${maxSection} section is using approximately ${pct}% of the page — consider shortening 1-2 bullet points to fit your ${targetNum}-page target.`;
          setLastFitResult({
            failedToFit: true,
            excessSectionName: maxSection,
            excessSectionPercentage: pct,
            msg
          });
        }
      } else {
        // Tightening sequence exhausted, but the page-count target is still met — this is the
        // best achievable result (comfort margin couldn't be fully satisfied on top of it), so
        // accept it rather than leaving the fit state undefined.
        if (!lastFitResult || lastFitResult.failedToFit) {
          setLastFitResult({ failedToFit: false });
        }
      }
    } else if (isAutoFitEnabled && targetNum > 0 && computedPages.length <= targetNum) {
      if (!lastFitResult || lastFitResult.failedToFit) {
        setLastFitResult({ failedToFit: false });
      }
    }

    setPages((prev) => {
      if (JSON.stringify(prev) === JSON.stringify(computedPages)) {
        return prev;
      }
      return computedPages;
    });

    // Calculate metrics and trigger state propagation
    if (onMetricsChange) {
      const utilizations = computedPages.map((pageBlockIds) => {
        let pageHeight = 0;
        pageBlockIds.forEach((blockId) => {
          const el = sandbox.querySelector(`[data-id="${blockId}"]`);
          if (el) pageHeight += getUnscaledHeight(el);
        });
        return Math.min(100, Math.round((pageHeight / H_printable) * 100));
      });

      const totalContentHeight = blockEls.reduce((sum, el) => sum + getUnscaledHeight(el), 0);
      const totalPrintableHeight = Math.max(1, computedPages.length) * H_printable;
      const densityRatio = totalContentHeight / totalPrintableHeight;
      const contentDensity = densityRatio < 0.6 ? 'sparse' : densityRatio > 0.9 ? 'dense' : 'balanced';

      const sectionHeights: Record<string, number> = {};
      activeBlocks.forEach((block) => {
        const el = sandbox.querySelector(`[data-id="${block.id}"]`);
        if (el) {
          sectionHeights[block.category] = (sectionHeights[block.category] || 0) + getUnscaledHeight(el);
        }
      });

      let readabilityScore = 80;
      let bulletCount = 0;
      data.experiences?.forEach(exp => {
        const desc = exp.description || '';
        const bullets = desc.split('\n').filter(l => l.trim().startsWith('-') || l.trim().startsWith('•') || l.trim().length > 30);
        bulletCount += bullets.length;
      });
      if (bulletCount > 6) readabilityScore += 10;
      if (bulletCount < 3) readabilityScore -= 10;
      if (data.summary && data.summary.length > 350) readabilityScore -= 5;
      const fSize = appliedDesign.fontSize || 11;
      if (fSize < 10) readabilityScore -= 10;
      readabilityScore = Math.min(100, Math.max(30, readabilityScore));

      const atsWarnings: string[] = [];
      if (appliedDesign.pageMargin < 32) {
        atsWarnings.push("Narrow margins (< 32px) might be truncated by standard physical printing margins or confuse simple scanner templates.");
      }
      if (fSize < 10) {
        atsWarnings.push("Extremely small font size (< 10px). Recruiter scanners recommend keeping body sizes above 10px for optimal contrast parsing.");
      }
      if (appliedDesign.dividerStyle === 'double') {
        atsWarnings.push("Overly stylized decorative double-borders are occasionally harder for robotic ATS engines to cleanly parse.");
      }

      let healthScore = 95;
      if (computedPages.length >= 4) healthScore -= 15;
      else if (computedPages.length === 3) healthScore -= 5;

      if (utilizations.length > 1) {
        const lastPageUtil = utilizations[utilizations.length - 1];
        if (lastPageUtil < 35) healthScore -= 10;
      }
      if (densityRatio < 0.5) healthScore -= 10;
      if (atsWarnings.length > 0) healthScore -= 5;
      healthScore = Math.min(100, Math.max(40, healthScore));

      const recommendations: string[] = [];
      if (computedPages.length === 1) {
        recommendations.push("🟢 Perfect 1-Page length. Highly concise, clean layout ideal for standard recruiter reviews.");
      } else if (computedPages.length === 2) {
        recommendations.push("🟢 Professional 2-Page length. Fits dense backgrounds and coordinates content with excellent structural alignment.");
      } else if (computedPages.length === 3) {
        recommendations.push("🟡 3-Page layout. Consider tightening design spacing, margins, or trimming wordy bullet points to compress into a premium 2-page document.");
      } else {
        recommendations.push("🔴 Too Long (4+ Pages). Recruiters recommend shortening. Reduce roles, bullets, or compress padding levels.");
      }

      // Add fit suggestions/results to recommendations
      if (isAutoFitEnabled) {
        if (lastFitResult?.failedToFit) {
          recommendations.push(`⚠️ Auto-fit floor reached: ${lastFitResult.msg}`);
        } else if (tighteningIndex >= 0) {
          recommendations.push(`✨ Spacing dynamically adjusted to fit your ${targetNum}-page target perfectly.`);
        }
      }

      utilizations.forEach((util, idx) => {
        if (util < 35 && idx === utilizations.length - 1 && utilizations.length > 1) {
          recommendations.push(`⚠️ Page ${idx + 1} has very low usage (${util}% full). Try adjusting page margins, font sizes, or spacing to distribute content evenly.`);
        } else if (util > 95) {
          recommendations.push(`🔥 Page ${idx + 1} is heavily packed (${util}% full). Consider a slightly smaller font size or custom line height to relieve page bounds.`);
        } else {
          recommendations.push(`🟢 Page ${idx + 1} utilization is excellent (${util}% full).`);
        }
      });

      if (!data.projects || data.projects.length === 0) {
        recommendations.push("💡 Section suggestion: Adding projects helps demonstrate applied experience with modern software workflows.");
      }

      // Merge the failure message if any
      const finalAtsWarnings = [...atsWarnings];
      if (isAutoFitEnabled && lastFitResult?.failedToFit && lastFitResult.msg) {
        finalAtsWarnings.push(`[Auto-Fit Warning] ${lastFitResult.msg}`);
      }

      onMetricsChange({
        pageCount: computedPages.length,
        utilizations,
        contentDensity,
        sectionBalance: sectionHeights,
        readabilityScore,
        atsWarnings: finalAtsWarnings,
        healthScore,
        recommendations,
        autoFitActive: tighteningIndex >= 0,
        autoFitFailed: !!lastFitResult?.failedToFit,
        autoFitMsg: lastFitResult?.msg || '',
        autoFitStep: tighteningIndex,
      });
    }
  }, [
    serializedData,
    targetKey,
    baseStylesKey,
    tighteningIndex,
    activeBlocks.length,
    H_printable,
    renderTrigger,
  ]);

  let pagesToRender = pages.length > 0 ? pages : [activeBlocks.map((b) => b.id)];

  const isStrict = design.autoFitMode === 'strict';
  const targetNum = design.lengthTarget === '1-page' ? 1 : design.lengthTarget === '2-page' ? 2 : 0;

  const hasStrictOverflow = isAutoFitEnabled && isStrict && targetNum > 0 && pagesToRender.length > targetNum;

  // Only slice if user has explicitly dismissed/acknowledged the overflow warning
  if (hasStrictOverflow && isWarningDismissed) {
    pagesToRender = pagesToRender.slice(0, targetNum);
  }

  return (
    <div className="resume-document-workspace flex flex-col items-center w-full relative print:bg-white select-text">
      {hasStrictOverflow && !isWarningDismissed && (
        <div className="w-full max-w-4xl mb-6 bg-red-50 border border-red-200 rounded-xl p-5 shadow-sm text-left print:hidden">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-red-700 font-bold text-sm mb-1">
                <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>Strict Mode: Content Overflow Alert</span>
              </div>
              <p className="text-xs text-red-600 font-medium leading-relaxed">
                Your content doesn't fit in {targetNum} {targetNum === 1 ? 'page' : 'pages'} even at minimum spacing — the following section(s) are being cut off in the export:{' '}
                <strong className="underline decoration-red-400 font-bold">
                  {pagesToRender.slice(targetNum).flat().map(id => activeBlocks.find(b => b.id === id)?.category || id).filter(Boolean).join(', ') || 'No sections'}
                </strong>
                . Shorten your content or switch to 2-page.
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setIsWarningDismissed(true)}
                className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white font-bold text-[11px] uppercase rounded-lg shadow-sm cursor-pointer transition-colors"
              >
                Acknowledge & Clip
              </button>
            </div>
          </div>
        </div>
      )}
      {/* 1. Offline sandbox for height calculation */}
      <div 
        id="resume-measure-sandbox"
        style={{
          position: 'absolute',
          top: '-9999px',
          left: '-9999px',
          width: `${pageWidth}px`,
          visibility: 'hidden',
          pointerEvents: 'none',
          boxSizing: 'border-box',
          fontFamily: getFontFamilyStyle(appliedDesign.fontBody),
          fontSize: `${appliedDesign.fontSize}px`,
          lineHeight: appliedDesign.lineHeight,
        }}
      >
        {activeBlocks.map((block) => (
          <div
            key={block.id}
            className="resume-block-measure"
            data-id={block.id}
            style={{
              paddingLeft: `${lMargin}px`,
              paddingRight: `${rMargin}px`,
              boxSizing: 'border-box',
              width: '100%',
              display: 'flow-root',
            }}
          >
            {block.render()}
          </div>
        ))}
      </div>

      {/* 2. Visual Document Sheet Layouts */}
      <div className={`w-full flex justify-center ${
        viewMode === 'facing' ? 'max-w-[1680px]' : 'max-w-4xl'
      }`}>
        {viewMode === 'facing' ? (
          <div className="grid grid-cols-2 gap-8 w-full justify-center print:grid-cols-1 print:gap-0">
            {pagesToRender.map((pageBlockIds, pageIdx) => (
              <div
                key={pageIdx}
                className="resume-page-sheet bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] print:shadow-none print:m-0 relative transition-all duration-300 print:page-break-after-always overflow-hidden"
                style={{
                  width: `${pageWidth}px`,
                  height: `${pageHeight}px`,
                  paddingTop: `${tMargin}px`,
                  paddingBottom: `${bMargin + RESERVED_BOTTOM_SPACE}px`,
                  boxSizing: 'border-box',
                  fontFamily: getFontFamilyStyle(appliedDesign.fontBody),
                  fontSize: `${appliedDesign.fontSize}px`,
                  lineHeight: appliedDesign.lineHeight,
                }}
              >
                {pageBlockIds.map((blockId) => {
                  const block = activeBlocks.find((b) => b.id === blockId);
                  if (!block) return null;
                  return (
                    <div
                      key={blockId}
                      style={{
                        paddingLeft: `${lMargin}px`,
                        paddingRight: `${rMargin}px`,
                        boxSizing: 'border-box',
                        display: 'flow-root',
                      }}
                    >
                      {block.render()}
                    </div>
                  );
                })}

                {/* Discrete Page Number */}
                {design.showPageNumbers !== false && (
                  <div className="absolute bottom-5 right-8 text-[9px] font-mono font-bold uppercase tracking-wider text-stone-400 select-none pointer-events-none print:text-stone-500">
                    Page {pageIdx + 1} of {pagesToRender.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : viewMode === 'single' ? (
          (() => {
            const pageIdx = Math.min(pagesToRender.length, Math.max(1, currentPage)) - 1;
            const pageBlockIds = pagesToRender[pageIdx] || [];
            return (
              <div
                className="resume-page-sheet bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] print:shadow-none print:m-0 relative transition-all duration-300 overflow-hidden"
                style={{
                  width: `${pageWidth}px`,
                  height: `${pageHeight}px`,
                  paddingTop: `${tMargin}px`,
                  paddingBottom: `${bMargin + RESERVED_BOTTOM_SPACE}px`,
                  boxSizing: 'border-box',
                  fontFamily: getFontFamilyStyle(appliedDesign.fontBody),
                  fontSize: `${appliedDesign.fontSize}px`,
                  lineHeight: appliedDesign.lineHeight,
                }}
              >
                {pageBlockIds.map((blockId) => {
                  const block = activeBlocks.find((b) => b.id === blockId);
                  if (!block) return null;
                  return (
                    <div
                      key={blockId}
                      style={{
                        paddingLeft: `${lMargin}px`,
                        paddingRight: `${rMargin}px`,
                        boxSizing: 'border-box',
                        display: 'flow-root',
                      }}
                    >
                      {block.render()}
                    </div>
                  );
                })}

                {/* Discrete Page Number */}
                {design.showPageNumbers !== false && (
                  <div className="absolute bottom-5 right-8 text-[9px] font-mono font-bold uppercase tracking-wider text-stone-400 select-none pointer-events-none print:text-stone-500">
                    Page {pageIdx + 1} of {pagesToRender.length}
                  </div>
                )}
              </div>
            );
          })()
        ) : (
          <div className="flex flex-col gap-8 items-center w-full print:gap-0">
            {pagesToRender.map((pageBlockIds, pageIdx) => (
              <div
                key={pageIdx}
                className="resume-page-sheet bg-white shadow-[0_12px_40px_rgba(0,0,0,0.08)] print:shadow-none print:m-0 relative transition-all duration-300 print:page-break-after-always overflow-hidden"
                style={{
                  width: `${pageWidth}px`,
                  height: `${pageHeight}px`,
                  paddingTop: `${tMargin}px`,
                  paddingBottom: `${bMargin + RESERVED_BOTTOM_SPACE}px`,
                  boxSizing: 'border-box',
                  fontFamily: getFontFamilyStyle(appliedDesign.fontBody),
                  fontSize: `${appliedDesign.fontSize}px`,
                  lineHeight: appliedDesign.lineHeight,
                }}
              >
                {pageBlockIds.map((blockId) => {
                  const block = activeBlocks.find((b) => b.id === blockId);
                  if (!block) return null;
                  return (
                    <div
                      key={blockId}
                      style={{
                        paddingLeft: `${lMargin}px`,
                        paddingRight: `${rMargin}px`,
                        boxSizing: 'border-box',
                        display: 'flow-root',
                      }}
                    >
                      {block.render()}
                    </div>
                  );
                })}

                {/* Discrete Page Number */}
                {design.showPageNumbers !== false && (
                  <div className="absolute bottom-5 right-8 text-[9px] font-mono font-bold uppercase tracking-wider text-stone-400 select-none pointer-events-none print:text-stone-500">
                    Page {pageIdx + 1} of {pagesToRender.length}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
