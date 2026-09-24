import React, { ReactNode } from 'react';
import { Mail, Phone, MapPin, Globe, Linkedin, Award, Briefcase, GraduationCap, Code, Languages, FileText } from 'lucide-react';
import { IResumeTemplateRenderer } from '../../types/renderer';
import { ResumeData } from '../../types/resume';
import { ResumeDesign } from '../../types/design';

// Helper to resolve font family style
export function getFontFamilyStyle(fontName: string): string {
  if (!fontName) return 'Inter, sans-serif';
  const googleFonts = [
    'Inter', 'Playfair Display', 'Lora', 'Merriweather', 'EB Garamond', 
    'Cinzel', 'PT Serif', 'Outfit', 'Space Grotesk', 'Roboto', 
    'Montserrat', 'Plus Jakarta Sans', 'Arimo', 'JetBrains Mono', 
    'Fira Code', 'Inconsolata', 'Source Code Pro', 'Roboto Slab'
  ];
  if (googleFonts.includes(fontName)) {
    return `"${fontName}", sans-serif`;
  }
  
  const normalized = fontName.toLowerCase();
  if (normalized.includes('serif') || normalized.includes('playfair') || normalized.includes('lora') || normalized.includes('merriweather')) {
    return `"${fontName}", Georgia, serif`;
  }
  if (normalized.includes('mono') || normalized.includes('jetbrains') || normalized.includes('fira')) {
    return `"${fontName}", "JetBrains Mono", Courier, monospace`;
  }
  if (normalized.includes('space') || normalized.includes('grotesk')) {
    return `"${fontName}", "Space Grotesk", sans-serif`;
  }
  if (normalized.includes('outfit')) {
    return `"${fontName}", "Outfit", sans-serif`;
  }
  return `"${fontName}", Inter, sans-serif`;
}

// Helper for section container with dynamic spacing
const SectionContainer = ({ children, design, title, icon: Icon }: { children: ReactNode; design: ResumeDesign; title: string; icon: any }) => {
  const borderStyle = design.dividerStyle === 'double' ? 'border-b-4 border-double' : 'border-b';
  return (
    <div style={{ marginBottom: `${design.sectionSpacing}px` }}>
      <h2 
        className="flex items-center gap-2 font-bold uppercase pb-1 mb-2.5"
        style={{ 
          fontFamily: getFontFamilyStyle(design.fontHeading),
          fontSize: `${design.sectionSize || design.headingSize}px`,
          color: design.sectionLabelColor || design.headingColor || design.primaryColor,
          borderColor: design.dividerColor || `${design.primaryColor}20`,
          borderBottomWidth: design.dividerStyle === 'none' ? 0 : '1px',
          letterSpacing: design.letterSpacing !== undefined ? `${design.letterSpacing}px` : '0.05em',
          textTransform: design.textTransformHeading ? (design.textTransformHeading as any) : 'uppercase',
          fontWeight: design.fontWeight || 'bold'
        }}
      >
        {design.iconStyle !== 'hidden' && <Icon size={(design.sectionSize || design.headingSize) - 2} style={{ color: design.accentColor || design.primaryColor }} />}
        <span>{title}</span>
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

// --- EXECUTIVE ELITE TEMPLATE RENDERER ---
class ExecutiveEliteRenderer implements IResumeTemplateRenderer {
  id = 'executive-elite';
  name = 'Executive Elite';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div 
        className="text-center pb-5 border-b"
        style={{ 
          borderColor: `${design.primaryColor}40`,
          marginBottom: `${design.sectionSpacing}px`
        }}
      >
        <h1 
          className="text-3xl font-extrabold tracking-tight mb-1"
          style={{ 
            fontFamily: getFontFamilyStyle(design.fontHeading),
            color: design.primaryColor 
          }}
        >
          {personalInfo.fullName}
        </h1>
        <p 
          className="text-md uppercase tracking-widest font-semibold mb-3.5"
          style={{ 
            fontFamily: getFontFamilyStyle(design.fontHeading),
            color: design.secondaryColor 
          }}
        >
          {personalInfo.title}
        </p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1.5 text-xs text-stone-600">
          {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</span>}
          {personalInfo.website && <span className="flex items-center gap-1"><Globe size={12} /> {personalInfo.website}</span>}
        </div>
      </div>
    );
  }

  renderSummary(data: ResumeData, design: ResumeDesign): ReactNode {
    if (!data.summary) return null;
    return (
      <SectionContainer design={design} title="Executive Summary" icon={FileText}>
        <p className="text-justify whitespace-pre-wrap">{data.summary}</p>
      </SectionContainer>
    );
  }

  renderExperience(data: ResumeData, design: ResumeDesign): ReactNode {
    if (!data.experiences || data.experiences.length === 0) return null;
    return (
      <SectionContainer design={design} title="Professional Experience" icon={Briefcase}>
        <div className="space-y-4">
          {data.experiences.map((exp) => (
            <div key={exp.id} className="relative">
              <div className="flex justify-between items-baseline font-bold">
                <span className="text-stone-950 font-sans" style={{ color: design.primaryColor }}>{exp.role}</span>
                <span className="text-stone-500 font-mono text-[11px]">{exp.period}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-stone-600 italic mb-1.5">
                <span>{exp.company}</span>
                <span>{exp.location}</span>
              </div>
              <p className="text-stone-700 whitespace-pre-wrap leading-relaxed">{exp.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  renderEducation(data: ResumeData, design: ResumeDesign): ReactNode {
    if (!data.educations || data.educations.length === 0) return null;
    return (
      <SectionContainer design={design} title="Education" icon={GraduationCap}>
        <div className="space-y-3">
          {data.educations.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline font-bold">
                <span className="text-stone-900" style={{ color: design.primaryColor }}>{edu.degree}</span>
                <span className="text-stone-500 font-mono text-[11px]">{edu.period}</span>
              </div>
              <div className="flex justify-between items-baseline text-xs text-stone-600 italic">
                <span>{edu.school}</span>
                <span>{edu.location}</span>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  renderSkills(data: ResumeData, design: ResumeDesign): ReactNode {
    if (!data.skills || data.skills.length === 0) return null;
    return (
      <SectionContainer design={design} title="Expertise & Skills" icon={Code}>
        <div className="flex flex-wrap gap-2">
          {data.skills.map((skill, index) => (
            <span 
              key={index} 
              className="px-2.5 py-1 text-xs font-semibold rounded-md"
              style={{ 
                backgroundColor: `${design.primaryColor}10`,
                color: design.primaryColor,
                borderRadius: `${design.borderRadius}px`
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </SectionContainer>
    );
  }

  renderProjects(data: ResumeData, design: ResumeDesign): ReactNode {
    if (!data.projects || data.projects.length === 0) return null;
    return (
      <SectionContainer design={design} title="Key Projects" icon={Briefcase}>
        <div className="space-y-3">
          {data.projects.map((proj) => (
            <div key={proj.id}>
              <div className="flex justify-between items-baseline font-bold mb-0.5">
                <span className="text-stone-900" style={{ color: design.primaryColor }}>{proj.name}</span>
                {proj.website && <span className="text-xs text-stone-500 font-mono">{proj.website}</span>}
              </div>
              <p className="text-stone-600 italic text-[11px] mb-1">Technologies: {proj.technologies}</p>
              <p className="text-stone-700">{proj.description}</p>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  renderLanguages(data: ResumeData, design: ResumeDesign): ReactNode {
    if (!data.languages || data.languages.length === 0) return null;
    return (
      <SectionContainer design={design} title="Languages" icon={Languages}>
        <div className="flex flex-wrap gap-4">
          {data.languages.map((lang) => (
            <div key={lang.id} className="flex items-center gap-1.5">
              <span className="font-bold text-stone-800">{lang.name}</span>
              <span className="text-stone-500 text-xs font-mono">({lang.proficiency})</span>
            </div>
          ))}
        </div>
      </SectionContainer>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="text-center text-[10px] text-stone-400 font-mono pt-4 mt-8 border-t border-stone-100">
        Generated via LunchResume Fidelity Render Engine
      </div>
    );
  }
}

// --- MODERN TECH TEMPLATE RENDERER ---
class ModernTechRenderer extends ExecutiveEliteRenderer {
  id = 'modern-tech';
  name = 'Modern Tech';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div 
        className="flex flex-col sm:flex-row justify-between items-start pb-5 border-b"
        style={{ 
          borderColor: `${design.primaryColor}40`,
          marginBottom: `${design.sectionSpacing}px`
        }}
      >
        <div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: design.primaryColor }} />
            <h1 
              className="text-3xl font-black tracking-tight"
              style={{ 
                fontFamily: getFontFamilyStyle(design.fontHeading),
                color: design.primaryColor 
              }}
            >
              {personalInfo.fullName}
            </h1>
          </div>
          <p 
            className="text-md font-mono font-bold uppercase tracking-wider mt-1 ml-4"
            style={{ color: design.secondaryColor || '#64748b' }}
          >
            &lt; {personalInfo.title} /&gt;
          </p>
        </div>
        <div className="mt-3 sm:mt-0 text-left sm:text-right text-xs font-mono text-stone-600 space-y-1">
          {personalInfo.email && <div className="flex items-center sm:justify-end gap-1.5"><Mail size={11} /> {personalInfo.email}</div>}
          {personalInfo.phone && <div className="flex items-center sm:justify-end gap-1.5"><Phone size={11} /> {personalInfo.phone}</div>}
          {personalInfo.location && <div className="flex items-center sm:justify-end gap-1.5"><MapPin size={11} /> {personalInfo.location}</div>}
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="flex justify-between items-center text-[9px] text-stone-400 font-mono pt-4 mt-8 border-t border-stone-200">
        <span>// DEVELOPER ENGINE CERTIFIED</span>
        <span>SYS_RENDER: SUCCESS</span>
      </div>
    );
  }
}

// --- CREATIVE EDGE TEMPLATE RENDERER ---
class CreativeEdgeRenderer extends ExecutiveEliteRenderer {
  id = 'creative-edge';
  name = 'Creative Edge';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div 
        className="p-6 rounded-2xl mb-6 text-white relative overflow-hidden shadow-sm"
        style={{ 
          backgroundImage: `linear-gradient(135deg, ${design.primaryColor}, ${design.secondaryColor || '#8b5cf6'})`,
          borderRadius: `${design.borderRadius * 2.5}px`
        }}
      >
        <div className="relative z-10">
          <h1 
            className="text-4.5xl font-black tracking-tight"
            style={{ fontFamily: getFontFamilyStyle(design.fontHeading) }}
          >
            {personalInfo.fullName}
          </h1>
          <p 
            className="text-lg opacity-90 font-medium mt-1 uppercase tracking-widest"
            style={{ fontFamily: getFontFamilyStyle(design.fontHeading) }}
          >
            {personalInfo.title}
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-1.5 mt-4 text-xs opacity-85 pt-3.5 border-t border-white/20">
            {personalInfo.email && <span className="flex items-center gap-1"><Mail size={12} /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1"><Phone size={12} /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={12} /> {personalInfo.location}</span>}
          </div>
        </div>
        {/* Abstract design elements representation */}
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-white/5 rounded-full transform translate-x-10 translate-y-10" />
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="flex justify-between items-center text-[10px] text-stone-400 pt-4 mt-8 border-t border-dashed border-stone-200">
        <span>Creative Edge Design Studio Layout</span>
        <span className="font-semibold uppercase text-stone-300">Brand First Series</span>
      </div>
    );
  }
}

// --- CORPORATE PRO TEMPLATE RENDERER ---
class CorporateProRenderer extends ExecutiveEliteRenderer {
  id = 'corporate-pro';
  name = 'Corporate Pro';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div className="pb-4" style={{ marginBottom: `${design.sectionSpacing}px` }}>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-4">
          <div>
            <h1 
              className="text-3.5xl font-black tracking-tight text-stone-900"
              style={{ 
                fontFamily: getFontFamilyStyle(design.fontHeading),
                color: design.primaryColor 
              }}
            >
              {personalInfo.fullName}
            </h1>
            <p 
              className="text-sm font-bold uppercase tracking-widest mt-1.5"
              style={{ 
                fontFamily: getFontFamilyStyle(design.fontHeading),
                color: design.secondaryColor || '#4b5563'
              }}
            >
              {personalInfo.title}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end text-xs text-stone-600 gap-1 mt-3 md:mt-0">
            {personalInfo.location && <span className="flex items-center gap-1"><MapPin size={11} /> {personalInfo.location}</span>}
            {personalInfo.website && <span className="flex items-center gap-1"><Globe size={11} /> {personalInfo.website}</span>}
          </div>
        </div>
        
        {/* Sleek inline contact grid under name */}
        <div className="flex flex-wrap gap-x-5 gap-y-1.5 text-xs text-stone-600 border-t pt-3 pb-2.5" style={{ borderColor: `${design.primaryColor}20` }}>
          {personalInfo.email && <span className="flex items-center gap-1.5 font-medium"><Mail size={12} style={{ color: design.primaryColor }} /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5 font-medium"><Phone size={12} style={{ color: design.primaryColor }} /> {personalInfo.phone}</span>}
        </div>
        
        {/* Full-width colored accent bar representing strong corporate standing */}
        <div className="h-1 w-full rounded-full" style={{ backgroundColor: design.primaryColor }}></div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="flex justify-between items-center text-[10px] text-stone-400 font-sans pt-4 mt-8 border-t border-stone-200">
        <span>CONFIDENTIAL CORPORATE PORTFOLIO</span>
        <span>Corporate Pro Standard Layout</span>
      </div>
    );
  }
}

// --- FINANCE AUTHORITY TEMPLATE RENDERER ---
class FinanceAuthorityRenderer extends ExecutiveEliteRenderer {
  id = 'finance-authority';
  name = 'Finance Authority';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div className="text-center pb-4" style={{ marginBottom: `${design.sectionSpacing}px` }}>
        {/* Upper double border */}
        <div className="border-t-2 border-b border-stone-800 py-4 mb-3.5" style={{ borderColor: design.primaryColor }}>
          <h1 
            className="text-3.5xl font-bold tracking-normal uppercase"
            style={{ 
              fontFamily: getFontFamilyStyle(design.fontHeading),
              color: design.primaryColor 
            }}
          >
            {personalInfo.fullName}
          </h1>
          <p 
            className="text-xs tracking-widest uppercase italic mt-1 font-semibold text-stone-600"
            style={{ 
              fontFamily: getFontFamilyStyle(design.fontHeading),
            }}
          >
            {personalInfo.title}
          </p>
        </div>
        
        {/* Clean, iconless contact row with divider dots */}
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-stone-700 font-medium">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.website && <span>• {personalInfo.website}</span>}
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="text-center text-[10px] text-stone-500 tracking-wider font-semibold pt-4 mt-8 border-t-2 border-stone-800" style={{ borderColor: design.primaryColor }}>
        FINANCIAL SERVICES EXECUTIVE RECORD // STRICTLY CONFIDENTIAL
      </div>
    );
  }
}

// --- HEALTHCARE PROFESSIONAL TEMPLATE RENDERER ---
class HealthcareProfessionalRenderer extends ExecutiveEliteRenderer {
  id = 'healthcare-professional';
  name = 'Healthcare Professional';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div className="flex flex-col sm:flex-row justify-between items-start pb-5 border-b" style={{ borderColor: `${design.primaryColor}20`, marginBottom: `${design.sectionSpacing}px` }}>
        <div className="max-w-md">
          <h1 
            className="text-3xl font-bold tracking-tight text-stone-900"
            style={{ 
              fontFamily: getFontFamilyStyle(design.fontHeading),
              color: design.primaryColor 
            }}
          >
            {personalInfo.fullName}
          </h1>
          <p 
            className="text-sm font-semibold tracking-wide mt-1"
            style={{ 
              fontFamily: getFontFamilyStyle(design.fontHeading),
              color: design.secondaryColor || '#0d9488'
            }}
          >
            {personalInfo.title}
          </p>
          <div className="w-12 h-1 rounded-full mt-3" style={{ backgroundColor: design.primaryColor }}></div>
        </div>
        
        {/* Clinically clean, soft background card for contact details */}
        <div 
          className="mt-4 sm:mt-0 p-3.5 border text-xs text-stone-600 space-y-1.5 self-stretch sm:self-auto"
          style={{ 
            backgroundColor: `${design.primaryColor}08`,
            borderColor: `${design.primaryColor}20`,
            borderRadius: `${design.borderRadius || 8}px`
          }}
        >
          {personalInfo.email && <div className="flex items-center gap-2"><Mail size={12} className="text-stone-400" /> <span className="font-medium">{personalInfo.email}</span></div>}
          {personalInfo.phone && <div className="flex items-center gap-2"><Phone size={12} className="text-stone-400" /> <span>{personalInfo.phone}</span></div>}
          {personalInfo.location && <div className="flex items-center gap-2"><MapPin size={12} className="text-stone-400" /> <span>{personalInfo.location}</span></div>}
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="flex items-center justify-between text-[10px] text-stone-400 pt-4 mt-8 border-t border-dashed" style={{ borderColor: `${design.primaryColor}30` }}>
        <span className="flex items-center gap-1">⚕️ Healthcare Registry Portfolio</span>
        <span>Clinical Track Record Standard</span>
      </div>
    );
  }
}

// --- LEGAL PROFESSIONAL TEMPLATE RENDERER ---
class LegalProfessionalRenderer extends ExecutiveEliteRenderer {
  id = 'legal-professional';
  name = 'Legal Professional';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div className="text-center pb-5 border-b border-stone-300" style={{ marginBottom: `${design.sectionSpacing}px` }}>
        <h1 
          className="text-3.5xl font-normal tracking-wide text-stone-900 mb-1"
          style={{ 
            fontFamily: getFontFamilyStyle(design.fontHeading || 'Playfair Display'),
            color: design.primaryColor || '#1c1917'
          }}
        >
          {personalInfo.fullName}
        </h1>
        <p 
          className="text-xs uppercase tracking-widest font-semibold text-stone-500 mb-4"
          style={{ 
            fontFamily: getFontFamilyStyle(design.fontHeading || 'Playfair Display'),
          }}
        >
          {personalInfo.title}
        </p>
        
        {/* Purely typographical contact bar, no icons */}
        <div className="flex justify-center flex-wrap gap-x-3 gap-y-1 text-xs text-stone-600 font-serif">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span className="text-stone-300">|</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span className="text-stone-300">|</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.website && <span className="text-stone-300">|</span>}
          {personalInfo.website && <span>{personalInfo.website}</span>}
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="text-center text-[9px] uppercase tracking-widest text-stone-400 font-serif pt-4 mt-8 border-t border-stone-200">
        Legal Counsel Dossier • Professional Record Standard
      </div>
    );
  }
}

// --- EDUCATION LEADER TEMPLATE RENDERER ---
class EducationLeaderRenderer extends ExecutiveEliteRenderer {
  id = 'education-leader';
  name = 'Education Leader';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div className="pb-5 border-b border-dotted border-stone-300" style={{ marginBottom: `${design.sectionSpacing}px` }}>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <h1 
              className="text-3.5xl font-serif font-bold text-stone-900"
              style={{ 
                fontFamily: getFontFamilyStyle(design.fontHeading || 'Lora'),
                color: design.primaryColor 
              }}
            >
              {personalInfo.fullName}
            </h1>
            <p 
              className="text-sm font-serif italic text-stone-600 mt-1"
              style={{ 
                fontFamily: getFontFamilyStyle(design.fontHeading || 'Lora'),
              }}
            >
              {personalInfo.title}
            </p>
          </div>
          <div className="mt-3 sm:mt-0 flex flex-col items-start sm:items-end text-xs text-stone-600 space-y-1">
            {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} className="text-stone-400" /> {personalInfo.email}</span>}
            {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} className="text-stone-400" /> {personalInfo.phone}</span>}
            {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-stone-400" /> {personalInfo.location}</span>}
          </div>
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="text-center text-[10px] text-stone-400 italic pt-4 mt-8 border-t border-stone-100">
        Educational Portfolio and Academic Vitae Record
      </div>
    );
  }
}

// --- GOVERNMENT PROFESSIONAL TEMPLATE RENDERER ---
class GovernmentProfessionalRenderer extends ExecutiveEliteRenderer {
  id = 'government-professional';
  name = 'Government Professional';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    return (
      <div className="border border-stone-300 p-4 mb-4 text-center" style={{ marginBottom: `${design.sectionSpacing}px`, borderRadius: `${design.borderRadius}px` }}>
        <h1 
          className="text-3xl font-black uppercase tracking-wide text-stone-900"
          style={{ 
            fontFamily: getFontFamilyStyle(design.fontHeading),
            color: design.primaryColor 
              }}
            >
              {personalInfo.fullName}
            </h1>
            <p 
          className="text-xs uppercase tracking-widest font-extrabold text-stone-600 mt-1 mb-3"
          style={{ 
            fontFamily: getFontFamilyStyle(design.fontHeading),
            color: design.secondaryColor
          }}
        >
          {personalInfo.title}
        </p>
        
        {/* Rigid grid-like structural layout */}
        <div className="grid grid-cols-2 gap-2 text-left border-t pt-3 text-[11px] text-stone-700 font-mono">
          <div>
            {personalInfo.email && <p><span className="font-bold text-stone-900">EMAIL:</span> {personalInfo.email}</p>}
            {personalInfo.phone && <p><span className="font-bold text-stone-900">PHONE:</span> {personalInfo.phone}</p>}
          </div>
          <div className="text-right">
            {personalInfo.location && <p><span className="font-bold text-stone-900">LOCATION:</span> {personalInfo.location}</p>}
            {personalInfo.website && <p><span className="font-bold text-stone-900">PORTFOLIO:</span> {personalInfo.website}</p>}
          </div>
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="text-center text-[9px] font-mono tracking-widest text-stone-500 pt-4 mt-8 border-t border-stone-300">
        OFFICIAL GOVERNMENT AND PUBLIC SERVICE RESUME STANDARD
      </div>
    );
  }
}

// --- PERSONAL BRAND TEMPLATE RENDERER ---
class PersonalBrandRenderer extends ExecutiveEliteRenderer {
  id = 'personal-brand';
  name = 'Personal Brand';

  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode {
    const { personalInfo } = data;
    const nameParts = personalInfo.fullName.split(' ');
    const firstName = nameParts[0] || '';
    const lastName = nameParts.slice(1).join(' ') || '';
    
    return (
      <div 
        className="pl-4 border-l-4 py-1 flex flex-col md:flex-row justify-between items-start md:items-center" 
        style={{ 
          borderLeftColor: design.primaryColor,
          marginBottom: `${design.sectionSpacing}px`
        }}
      >
        <div>
          <h1 
            className="text-4xl tracking-tight leading-none text-stone-950"
            style={{ fontFamily: getFontFamilyStyle(design.fontHeading || 'Space Grotesk') }}
          >
            <span className="font-light">{firstName} </span>
            <span className="font-black" style={{ color: design.primaryColor }}>{lastName}</span>
          </h1>
          <p 
            className="text-sm font-bold uppercase tracking-wider text-stone-600 mt-2"
            style={{ 
              fontFamily: getFontFamilyStyle(design.fontHeading),
              color: design.secondaryColor
            }}
          >
            {personalInfo.title}
          </p>
        </div>
        
        <div className="mt-4 md:mt-0 flex flex-wrap md:flex-col gap-x-4 gap-y-1 text-xs text-stone-600 font-medium">
          {personalInfo.email && <span className="flex items-center gap-1.5"><Mail size={12} className="text-stone-400" /> {personalInfo.email}</span>}
          {personalInfo.phone && <span className="flex items-center gap-1.5"><Phone size={12} className="text-stone-400" /> {personalInfo.phone}</span>}
          {personalInfo.location && <span className="flex items-center gap-1.5"><MapPin size={12} className="text-stone-400" /> {personalInfo.location}</span>}
        </div>
      </div>
    );
  }

  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode {
    return (
      <div className="flex justify-between items-center text-[10px] text-stone-400 pt-4 mt-8 border-t border-stone-200">
        <span>Personal Brand Identity Portfolio</span>
        <span className="font-mono text-stone-300">ID: {data.personalInfo.fullName.replace(/\s+/g, '-').toLowerCase()}</span>
      </div>
    );
  }
}

// --- GENERAL FACTORY REGISTER ---
export class ResumeRendererFactory {
  static getRenderer(templateId: string): IResumeTemplateRenderer {
    switch (templateId) {
      case 'modern-tech':
        return new ModernTechRenderer();
      case 'creative-edge':
        return new CreativeEdgeRenderer();
      case 'executive-elite':
        return new ExecutiveEliteRenderer();
      case 'corporate-pro':
        return new CorporateProRenderer();
      case 'finance-authority':
        return new FinanceAuthorityRenderer();
      case 'healthcare-professional':
        return new HealthcareProfessionalRenderer();
      case 'legal-professional':
        return new LegalProfessionalRenderer();
      case 'education-leader':
        return new EducationLeaderRenderer();
      case 'government-professional':
        return new GovernmentProfessionalRenderer();
      case 'personal-brand':
        return new PersonalBrandRenderer();
      default:
        // Use general high-fidelity layout defaults mapping
        return new ExecutiveEliteRenderer();
    }
  }
}
