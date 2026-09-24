/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SimpleResumeBuilder
 * --------------------
 * A deliberately simple rebuild of the resume builder page:
 *   - Left panel  : fill-in-the-blanks form with sample loader
 *   - Right panel : live preview using template system
 *   - Header      : template picker, font family, font size, and color tools
 */

import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Plus, Trash2, Type, Palette, Download, ChevronDown, GripVertical, ArrowLeft, Layout, Sparkles
} from 'lucide-react';
import resumeExamples from '../../content/resumeExamples.json';
import {
  templateMetadata,
  ExecutiveElite,
  CorporatePro,
  FinanceAuthority,
  HealthcareProfessional,
  LegalProfessional,
  EducationLeader,
  GovernmentProfessional,
  ModernTech,
  CreativeEdge,
  PersonalBrand,
} from '../templates';
import type { ResumeDesign } from '../types/design';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

export interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  experiences: ExperienceItem[];
  educations: EducationItem[];
  skills: string[];
}

export type FontChoice = 'sans' | 'serif' | 'elegant' | 'mono' | 'space';

export interface DesignConfig {
  font: FontChoice;
  fontSize: number;      // base body size in px, 9–14
  accentColor: string;   // name + section headings + dividers
  textColor: string;     // body text color
}

const FONT_CLASS: Record<FontChoice, string> = {
  sans: 'font-sans',
  serif: 'font-serif',
  elegant: 'font-elegant',
  mono: 'font-mono',
  space: 'font-space',
};

const FONT_LABEL: Record<FontChoice, string> = {
  sans: 'Inter (Sans)',
  serif: 'Playfair (Serif)',
  elegant: 'EB Garamond (Elegant)',
  mono: 'JetBrains Mono',
  space: 'Space Grotesk',
};

const FONT_FAMILY_MAP: Record<FontChoice, string> = {
  sans: 'var(--font-sans, "Inter", ui-sans-serif, system-ui, sans-serif)',
  serif: 'var(--font-serif, "Playfair Display", ui-serif, Georgia, serif)',
  elegant: 'var(--font-elegant, "EB Garamond", Georgia, serif)',
  mono: 'var(--font-mono, "JetBrains Mono", ui-monospace, monospace)',
  space: 'var(--font-space, "Space Grotesk", sans-serif)',
};

const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'executive-elite': ExecutiveElite,
  'corporate-pro': CorporatePro,
  'finance-authority': FinanceAuthority,
  'healthcare-professional': HealthcareProfessional,
  'legal-professional': LegalProfessional,
  'education-leader': EducationLeader,
  'government-professional': GovernmentProfessional,
  'modern-tech': ModernTech,
  'creative-edge': CreativeEdge,
  'personal-brand': PersonalBrand,
};

// ---------------------------------------------------------------------------
// Defaults
// ---------------------------------------------------------------------------

const EMPTY_DATA: ResumeData = {
  personalInfo: { fullName: '', title: '', email: '', phone: '', location: '', website: '' },
  summary: '',
  experiences: [],
  educations: [],
  skills: [],
};

const DEFAULT_DESIGN: DesignConfig = {
  font: 'sans',
  fontSize: 11,
  accentColor: '#0f766e', // teal-700
  textColor: '#1f2937',   // stone-800
};

const uid = (prefix: string) => `${prefix}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

// ---------------------------------------------------------------------------
// Small form primitives
// ---------------------------------------------------------------------------

const Field: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}> = ({ label, value, onChange, placeholder, type = 'text' }) => (
  <div>
    <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">{label}</label>
    <input
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-teal-600 focus:bg-white transition-colors"
    />
  </div>
);

const TextArea: React.FC<{
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  rows?: number;
}> = ({ label, value, onChange, placeholder, rows = 4 }) => (
  <div>
    <label className="text-[10px] font-bold text-stone-400 uppercase block mb-1">{label}</label>
    <textarea
      value={value}
      placeholder={placeholder}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className="w-full text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-teal-600 focus:bg-white transition-colors resize-none"
    />
  </div>
);

const SectionCard: React.FC<{ title: string; children: React.ReactNode; onAdd?: () => void; addLabel?: string }> = ({
  title, children, onAdd, addLabel,
}) => (
  <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-3">
    <div className="flex items-center justify-between">
      <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide">{title}</h3>
      {onAdd && (
        <button
          onClick={onAdd}
          className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-800 cursor-pointer"
        >
          <Plus size={13} /> {addLabel || 'Add'}
        </button>
      )}
    </div>
    {children}
  </div>
);

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export const SimpleResumeBuilder: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // Template query param initialization
  const templateParam = searchParams.get('template');
  const initialTemplateId =
    templateParam && templateMetadata.some((t) => t.id === templateParam)
      ? templateParam
      : templateMetadata[0]?.id || 'executive-elite';

  const sampleParam = searchParams.get('sample');
  const initialSample = sampleParam
    ? resumeExamples.find((ex) => ex.slug === sampleParam)
    : null;

  const [data, setData] = useState<ResumeData>(() => {
    if (initialSample) {
      const achievementsSentence =
        initialSample.keyAchievements && initialSample.keyAchievements.length > 0
          ? ' ' + initialSample.keyAchievements.join(' ')
          : '';
      const fullSummary = (initialSample.summary || '') + achievementsSentence;

      const parsedExperiences: ExperienceItem[] = (initialSample.sampleExperience || []).map(
        (expStr, idx) => {
          const match = expStr.match(/^(.*?)\s+at\s+(.*?)\s*\((.*?)\):\s*([\s\S]*)$/);
          if (match) {
            return {
              id: uid(`exp-sample-${idx}`),
              role: match[1].trim(),
              company: match[2].trim(),
              period: match[3].trim(),
              description: match[4].trim(),
            };
          }
          return {
            id: uid(`exp-sample-${idx}`),
            role: '',
            company: '',
            period: '',
            description: expStr.trim(),
          };
        }
      );

      return {
        ...EMPTY_DATA,
        personalInfo: {
          ...EMPTY_DATA.personalInfo,
          title: initialSample.jobTitle,
        },
        summary: fullSummary,
        experiences: parsedExperiences,
        skills: [...initialSample.sampleSkills],
      };
    }
    return EMPTY_DATA;
  });

  const [design, setDesign] = useState<DesignConfig>(DEFAULT_DESIGN);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string>(initialTemplateId);
  const [skillInput, setSkillInput] = useState('');

  // Sync template if query param changes
  useEffect(() => {
    const tParam = searchParams.get('template');
    if (tParam && templateMetadata.some((t) => t.id === tParam)) {
      setSelectedTemplateId(tParam);
    }
  }, [searchParams]);

  // --- personal info -------------------------------------------------------
  const setPersonal = (field: keyof ResumeData['personalInfo'], value: string) =>
    setData((prev) => ({ ...prev, personalInfo: { ...prev.personalInfo, [field]: value } }));

  // --- experience ------------------------------------------------------------
  const addExperience = () =>
    setData((prev) => ({
      ...prev,
      experiences: [...prev.experiences, { id: uid('exp'), company: '', role: '', period: '', description: '' }],
    }));

  const updateExperience = (id: string, field: keyof ExperienceItem, value: string) =>
    setData((prev) => ({
      ...prev,
      experiences: prev.experiences.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    }));

  const removeExperience = (id: string) =>
    setData((prev) => ({ ...prev, experiences: prev.experiences.filter((exp) => exp.id !== id) }));

  // --- education ---------------------------------------------------------
  const addEducation = () =>
    setData((prev) => ({
      ...prev,
      educations: [...prev.educations, { id: uid('edu'), school: '', degree: '', period: '' }],
    }));

  const updateEducation = (id: string, field: keyof EducationItem, value: string) =>
    setData((prev) => ({
      ...prev,
      educations: prev.educations.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    }));

  const removeEducation = (id: string) =>
    setData((prev) => ({ ...prev, educations: prev.educations.filter((edu) => edu.id !== id) }));

  // --- skills --------------------------------------------------------------
  const addSkill = () => {
    const trimmed = skillInput.trim();
    if (!trimmed || data.skills.includes(trimmed)) {
      setSkillInput('');
      return;
    }
    setData((prev) => ({ ...prev, skills: [...prev.skills, trimmed] }));
    setSkillInput('');
  };

  const removeSkill = (skill: string) =>
    setData((prev) => ({ ...prev, skills: prev.skills.filter((s) => s !== skill) }));

  // --- design --------------------------------------------------------------
  const setDesignField = <K extends keyof DesignConfig>(field: K, value: DesignConfig[K]) =>
    setDesign((prev) => ({ ...prev, [field]: value }));

  // --- sample resume loader ------------------------------------------------
  const applySampleContent = (sample: typeof resumeExamples[0]) => {
    const achievementsSentence =
      sample.keyAchievements && sample.keyAchievements.length > 0
        ? ' ' + sample.keyAchievements.join(' ')
        : '';
    const fullSummary = (sample.summary || '') + achievementsSentence;

    const parsedExperiences: ExperienceItem[] = (sample.sampleExperience || []).map(
      (expStr, idx) => {
        const match = expStr.match(/^(.*?)\s+at\s+(.*?)\s*\((.*?)\):\s*([\s\S]*)$/);
        if (match) {
          return {
            id: uid(`exp-sample-${idx}`),
            role: match[1].trim(),
            company: match[2].trim(),
            period: match[3].trim(),
            description: match[4].trim(),
          };
        }
        return {
          id: uid(`exp-sample-${idx}`),
          role: '',
          company: '',
          period: '',
          description: expStr.trim(),
        };
      }
    );

    setData((prev) => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        title: sample.jobTitle,
      },
      summary: fullSummary,
      experiences: parsedExperiences,
      skills: [...sample.sampleSkills],
    }));
  };

  const handleLoadSample = (sample: typeof resumeExamples[0]) => {
    const hasExistingContent = Boolean(
      data.summary.trim() || data.experiences.length > 0
    );
    if (hasExistingContent) {
      const confirmed = window.confirm(
        'Loading this sample resume will overwrite your current summary, work experiences, and skills. Do you want to continue?'
      );
      if (!confirmed) return;
    }
    applySampleContent(sample);
  };

  // Sample query param on mount: load without confirm dialog
  useEffect(() => {
    const sampleParam = searchParams.get('sample');
    if (sampleParam) {
      const foundSample = resumeExamples.find((ex) => ex.slug === sampleParam);
      if (foundSample) {
        applySampleContent(foundSample);
      }
    }
  }, []);

  // --- mapped data & design for template components ------------------------
  const p = data.personalInfo;

  const mappedData = {
    personalInfo: {
      fullName: p.fullName || 'Your Name',
      title: p.title || 'Professional Title',
      email: p.email || '',
      phone: p.phone || '',
      location: p.location || '',
      website: p.website || '',
      linkedin: p.website || '',
    },
    summary: data.summary || '',
    experience: data.experiences.map((exp) => {
      const lines = exp.description
        ? exp.description
            .split('\n')
            .map((l) => l.replace(/^[•\-\*]\s*/, '').trim())
            .filter(Boolean)
        : [];
      const highlights = lines.length > 0 ? lines : (exp.description ? [exp.description] : []);

      return {
        id: exp.id,
        title: exp.role || 'Role',
        role: exp.role || 'Role',
        company: exp.company || '',
        period: exp.period || '',
        startDate: exp.period || '',
        endDate: '',
        current: exp.period ? exp.period.toLowerCase().includes('present') : false,
        location: '',
        description: exp.description || '',
        highlights,
      };
    }),
    experiences: data.experiences,
    education: data.educations.map((edu) => ({
      id: edu.id,
      school: edu.school || 'School / University',
      institution: edu.school || 'School / University',
      degree: edu.degree || 'Degree',
      field: '',
      period: edu.period || '',
      graduationDate: edu.period || '',
      location: '',
      honors: [],
    })),
    educations: data.educations,
    skills: data.skills.map((skill, idx) => ({
      id: `skill-${idx}`,
      name: skill,
      level: 'advanced',
      toString: () => skill,
    })),
    certifications: [],
    projects: [],
    achievements: [],
    languages: [],
    memberships: [],
    volunteer: [],
    references: [],
  };

  const mappedDesign: ResumeDesign = {
    template: selectedTemplateId,
    primaryColor: design.accentColor,
    secondaryColor: '#475569',
    background: '#ffffff',
    fontHeading: design.font,
    fontBody: design.font,
    fontName: design.font,
    fontSize: design.fontSize,
    bodySize: design.fontSize,
    headingSize: design.fontSize + 4,
    nameSize: design.fontSize + 14,
    lineHeight: 1.5,
    pageMargin: 0.75,
    sectionSpacing: 16,
    paragraphSpacing: 8,
    bulletSpacing: 4,
    layout: 'single',
    headerStyle: 'left',
    photoShape: 'circle',
    iconStyle: 'visible',
    dividerStyle: 'solid',
    borderRadius: 4,
    density: 'comfortable',
    paperSize: 'letter',
    accentColor: design.accentColor,
    headingColor: design.accentColor,
    bodyTextColor: design.textColor,
    dividerColor: design.accentColor,
    sidebarColor: '#0f172a',
    timelineColor: design.accentColor,
    bulletColor: design.accentColor,
    linkColor: design.accentColor,
    skillChipColor: design.accentColor,
    sectionLabelColor: design.accentColor,
  };

  const SelectedTemplateComponent =
    TEMPLATE_COMPONENTS[selectedTemplateId] ||
    TEMPLATE_COMPONENTS['executive-elite'] ||
    ExecutiveElite;

  const TemplateRenderer = SelectedTemplateComponent as React.ComponentType<any>;

  return (
    <div className="w-full h-screen bg-[#FAFAF9] text-stone-900 flex flex-col overflow-hidden">
      {/* ---------------------------------------------------------------- */}
      {/* HEADER: title + formatting toolbar                               */}
      {/* ---------------------------------------------------------------- */}
      <header className="no-print h-16 shrink-0 border-b border-stone-200/80 bg-white flex items-center justify-between px-6 z-10 sticky top-0">
        <div className="flex items-center gap-3">
          {/* Back to home button */}
          <button
            onClick={() => navigate('/')}
            className="p-2 -ml-2 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
            aria-label="Back to home"
            title="Back to home"
          >
            <ArrowLeft size={18} />
          </button>

          {/* Clickable Logo */}
          <div
            onClick={() => navigate('/')}
            className="flex items-center gap-2 cursor-pointer hover:opacity-85 transition-opacity"
            title="Go to homepage"
          >
            <div className="w-8 h-8 bg-stone-900 text-[#8cfbd4] rounded-lg flex items-center justify-center font-bold text-xs">
              LR
            </div>
            <span className="font-extrabold text-sm tracking-tight hidden sm:inline">
              Lunch<span className="text-teal-600 font-normal">Resume</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3.5">
          {/* Template selector */}
          <div className="flex items-center gap-1.5">
            <Layout size={14} className="text-stone-400" />
            <div className="relative">
              <select
                value={selectedTemplateId}
                onChange={(e) => setSelectedTemplateId(e.target.value)}
                className="appearance-none text-xs font-semibold pl-2 pr-6 py-1.5 bg-stone-50 border border-stone-200 rounded-lg outline-none cursor-pointer focus:border-teal-600 text-stone-800"
              >
                {templateMetadata.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.category.charAt(0).toUpperCase() + t.category.slice(1)})
                  </option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Font family */}
          <div className="flex items-center gap-1.5">
            <Type size={14} className="text-stone-400" />
            <div className="relative">
              <select
                value={design.font}
                onChange={(e) => setDesignField('font', e.target.value as FontChoice)}
                className="appearance-none text-xs font-semibold pl-2 pr-6 py-1.5 bg-stone-50 border border-stone-200 rounded-lg outline-none cursor-pointer focus:border-teal-600"
              >
                {(Object.keys(FONT_LABEL) as FontChoice[]).map((f) => (
                  <option key={f} value={f}>{FONT_LABEL[f]}</option>
                ))}
              </select>
              <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>

          {/* Font size */}
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-bold text-stone-400">Size</span>
            <input
              type="number"
              min={9}
              max={14}
              value={design.fontSize}
              onChange={(e) => setDesignField('fontSize', Math.min(14, Math.max(9, Number(e.target.value) || 11)))}
              className="w-12 text-xs font-semibold px-2 py-1.5 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-teal-600 text-center"
            />
          </div>

          {/* Colors */}
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer" title="Accent color (name & headings)">
              <Palette size={14} className="text-stone-400" />
              <input
                type="color"
                value={design.accentColor}
                onChange={(e) => setDesignField('accentColor', e.target.value)}
                className="w-6 h-6 rounded border border-stone-200 cursor-pointer bg-transparent"
              />
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer" title="Body text color">
              <span className="text-xs font-bold text-stone-400">Text</span>
              <input
                type="color"
                value={design.textColor}
                onChange={(e) => setDesignField('textColor', e.target.value)}
                className="w-6 h-6 rounded border border-stone-200 cursor-pointer bg-transparent"
              />
            </label>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors cursor-pointer"
          >
            <Download size={13} /> Download PDF
          </button>
        </div>
      </header>

      {/* ---------------------------------------------------------------- */}
      {/* BODY: left form / right live preview                             */}
      {/* ---------------------------------------------------------------- */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT — form */}
        <div className="no-print w-full md:w-[46%] lg:w-[42%] overflow-y-auto border-r border-stone-200 bg-[#FAFAF9] p-6 space-y-5">
          {/* Start from a Sample Resume */}
          <div className="bg-white border border-stone-200 rounded-xl p-4 space-y-2.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-teal-600" />
                <h3 className="text-xs font-bold text-stone-700 uppercase tracking-wide">
                  Start from a Sample Resume
                </h3>
              </div>
              <span className="text-[10px] text-stone-400 font-medium">Auto-fill content</span>
            </div>
            <p className="text-[11px] text-stone-500">
              Select an example to populate job title, summary, work experiences, and skills.
            </p>
            <div className="relative">
              <select
                defaultValue=""
                onChange={(e) => {
                  const slug = e.target.value;
                  if (!slug) return;
                  const sample = resumeExamples.find((ex) => ex.slug === slug);
                  if (sample) handleLoadSample(sample);
                  e.target.value = '';
                }}
                className="w-full text-xs font-medium pl-3 pr-8 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-teal-600 cursor-pointer appearance-none text-stone-700"
              >
                <option value="">Choose a sample resume role...</option>
                {resumeExamples.map((ex) => (
                  <option key={ex.slug} value={ex.slug}>
                    {ex.jobTitle} — {ex.industry}
                  </option>
                ))}
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none" />
            </div>
          </div>

          <SectionCard title="Personal Info">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Field label="Full Name" value={p.fullName} onChange={(v) => setPersonal('fullName', v)} placeholder="Alexander Wright" />
              </div>
              <div className="col-span-2">
                <Field label="Professional Title" value={p.title} onChange={(v) => setPersonal('title', v)} placeholder="Senior Software Architect" />
              </div>
              <Field label="Email" value={p.email} onChange={(v) => setPersonal('email', v)} placeholder="you@example.com" type="email" />
              <Field label="Phone" value={p.phone} onChange={(v) => setPersonal('phone', v)} placeholder="+1 555 123 4567" type="tel" />
              <Field label="Location" value={p.location} onChange={(v) => setPersonal('location', v)} placeholder="Kathmandu, Nepal" />
              <Field label="Website" value={p.website} onChange={(v) => setPersonal('website', v)} placeholder="https://yoursite.com" type="url" />
            </div>
          </SectionCard>

          <SectionCard title="Summary">
            <TextArea
              label="Professional Summary"
              value={data.summary}
              onChange={(v) => setData((prev) => ({ ...prev, summary: v }))}
              placeholder="A short paragraph on who you are and what you bring."
              rows={4}
            />
          </SectionCard>

          <SectionCard title="Experience" onAdd={addExperience} addLabel="Add Role">
            {data.experiences.length === 0 && (
              <p className="text-xs text-stone-400">No experience added yet.</p>
            )}
            <div className="space-y-4">
              {data.experiences.map((exp) => (
                <div key={exp.id} className="border border-stone-200 rounded-lg p-3 space-y-2 bg-stone-50/50">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1 text-[10px] font-bold text-stone-400 uppercase">
                      <GripVertical size={11} /> Role
                    </span>
                    <button onClick={() => removeExperience(exp.id)} className="text-stone-400 hover:text-rose-600 cursor-pointer">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Company" value={exp.company} onChange={(v) => updateExperience(exp.id, 'company', v)} placeholder="Acme Inc." />
                    <Field label="Role" value={exp.role} onChange={(v) => updateExperience(exp.id, 'role', v)} placeholder="Software Engineer" />
                  </div>
                  <Field label="Period" value={exp.period} onChange={(v) => updateExperience(exp.id, 'period', v)} placeholder="2023 – Present" />
                  <TextArea
                    label="Description"
                    value={exp.description}
                    onChange={(v) => updateExperience(exp.id, 'description', v)}
                    placeholder={'• Led the migration of...\n• Improved performance by...'}
                    rows={3}
                  />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Education" onAdd={addEducation} addLabel="Add School">
            {data.educations.length === 0 && (
              <p className="text-xs text-stone-400">No education added yet.</p>
            )}
            <div className="space-y-4">
              {data.educations.map((edu) => (
                <div key={edu.id} className="border border-stone-200 rounded-lg p-3 space-y-2 bg-stone-50/50">
                  <div className="flex justify-end">
                    <button onClick={() => removeEducation(edu.id)} className="text-stone-400 hover:text-rose-600 cursor-pointer">
                      <Trash2 size={13} />
                    </button>
                  </div>
                  <Field label="School" value={edu.school} onChange={(v) => updateEducation(edu.id, 'school', v)} placeholder="Stanford University" />
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Degree" value={edu.degree} onChange={(v) => updateEducation(edu.id, 'degree', v)} placeholder="B.S. Computer Science" />
                    <Field label="Period" value={edu.period} onChange={(v) => updateEducation(edu.id, 'period', v)} placeholder="2018 – 2022" />
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Skills">
            <div className="flex gap-2">
              <input
                type="text"
                value={skillInput}
                onChange={(e) => setSkillInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSkill(); } }}
                placeholder="Type a skill and press Enter"
                className="flex-1 text-sm px-3 py-2 bg-stone-50 border border-stone-200 rounded-lg outline-none focus:border-teal-600"
              />
              <button onClick={addSkill} className="px-3 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800 cursor-pointer">
                Add
              </button>
            </div>
            {data.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {data.skills.map((sk) => (
                  <span key={sk} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full">
                    {sk}
                    <button onClick={() => removeSkill(sk)} className="hover:text-rose-600 cursor-pointer">×</button>
                  </span>
                ))}
              </div>
            )}
          </SectionCard>
        </div>

        {/* RIGHT — live preview */}
        <div className="hidden md:flex flex-1 overflow-y-auto bg-stone-100 justify-center py-10 px-6">
          <div
            id="physical-page-print"
            className={`${FONT_CLASS[design.font]} bg-white shadow-lg`}
            style={{
              fontFamily: FONT_FAMILY_MAP[design.font],
              fontSize: `${design.fontSize}px`,
              color: design.textColor,
            }}
          >
            <div
              className="resume-template-container w-full h-full"
              style={{
                fontFamily: FONT_FAMILY_MAP[design.font],
                fontSize: `${design.fontSize}px`,
                color: design.textColor,
                ['--font-sans' as any]: FONT_FAMILY_MAP[design.font],
                ['--font-serif' as any]: FONT_FAMILY_MAP[design.font],
              }}
            >
              <TemplateRenderer
                data={mappedData}
                design={mappedDesign}
                className={FONT_CLASS[design.font]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleResumeBuilder;
