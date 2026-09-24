/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 *
 * SimpleResumeBuilder
 * --------------------
 * A deliberately simple rebuild of the resume builder page:
 *   - Left panel  : fill-in-the-blanks form
 *   - Right panel : live preview that updates as you type
 *   - Header      : font family, font size, and color tools
 *
 * Design notes (why this file looks the way it does):
 *   - ONE state tree (`data`) + a small `design` object. No global stores,
 *     no dual undo/redo systems, no keyboard-shortcut listeners fighting
 *     each other. If you want undo later, add ONE mechanism, in ONE place.
 *   - Every field is a plain controlled input that calls a small update
 *     helper. No hidden sync effects.
 *   - Font choices reuse the font families already loaded in index.css
 *     (font-sans / font-serif / font-mono / font-elegant / font-space).
 */

import React, { useState } from 'react';
import {
  Plus, Trash2, Type, Palette, Download, ChevronDown, GripVertical,
} from 'lucide-react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
}

interface EducationItem {
  id: string;
  school: string;
  degree: string;
  period: string;
}

interface ResumeData {
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

type FontChoice = 'sans' | 'serif' | 'elegant' | 'mono' | 'space';

interface DesignConfig {
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
// Small form primitives (kept local so the file stays self-contained)
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
          className="flex items-center gap-1 text-[11px] font-semibold text-teal-700 hover:text-teal-800"
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
  const [data, setData] = useState<ResumeData>(EMPTY_DATA);
  const [design, setDesign] = useState<DesignConfig>(DEFAULT_DESIGN);
  const [skillInput, setSkillInput] = useState('');

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

  const p = data.personalInfo;

  return (
    <div className="w-full min-h-screen bg-[#FAFAF9] text-stone-900 flex flex-col">
      {/* ---------------------------------------------------------------- */}
      {/* HEADER: title + formatting toolbar                               */}
      {/* ---------------------------------------------------------------- */}
      <header className="no-print h-16 shrink-0 border-b border-stone-200/80 bg-white flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-stone-900 text-[#8cfbd4] rounded-lg flex items-center justify-center font-bold text-xs">
            LR
          </div>
          <span className="font-extrabold text-sm tracking-tight hidden sm:inline">
            Lunch<span className="text-teal-600 font-normal">Resume</span>
          </span>
        </div>

        <div className="flex items-center gap-4">
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
            className="flex items-center gap-1.5 text-xs font-bold px-3 py-2 bg-stone-900 text-white rounded-lg hover:bg-stone-800 transition-colors"
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
                    <button onClick={() => removeExperience(exp.id)} className="text-stone-400 hover:text-rose-600">
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
                    <button onClick={() => removeEducation(edu.id)} className="text-stone-400 hover:text-rose-600">
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
              <button onClick={addSkill} className="px-3 py-2 bg-stone-900 text-white text-xs font-bold rounded-lg hover:bg-stone-800">
                Add
              </button>
            </div>
            {data.skills.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {data.skills.map((sk) => (
                  <span key={sk} className="flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 rounded-full">
                    {sk}
                    <button onClick={() => removeSkill(sk)} className="hover:text-rose-600">×</button>
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
            className={`${FONT_CLASS[design.font]} bg-white shadow-lg w-[8.5in] min-h-[11in] p-[0.75in]`}
            style={{ fontSize: `${design.fontSize}px`, color: design.textColor, lineHeight: 1.5 }}
          >
            {/* Header */}
            <div className="mb-6 pb-4 border-b" style={{ borderColor: design.accentColor }}>
              <h1 className="font-bold" style={{ fontSize: `${design.fontSize + 15}px`, color: design.accentColor }}>
                {p.fullName || 'Your Name'}
              </h1>
              {p.title && <p className="font-medium mt-0.5" style={{ fontSize: `${design.fontSize + 2}px` }}>{p.title}</p>}
              <p className="text-stone-500 mt-1" style={{ fontSize: `${design.fontSize - 1.5}px` }}>
                {[p.email, p.phone, p.location, p.website].filter(Boolean).join('   •   ')}
              </p>
            </div>

            {/* Summary */}
            {data.summary && (
              <section className="mb-5">
                <h2 className="font-bold uppercase tracking-wide mb-1.5" style={{ fontSize: `${design.fontSize + 1}px`, color: design.accentColor }}>
                  Summary
                </h2>
                <p style={{ whiteSpace: 'pre-wrap' }}>{data.summary}</p>
              </section>
            )}

            {/* Experience */}
            {data.experiences.length > 0 && (
              <section className="mb-5">
                <h2 className="font-bold uppercase tracking-wide mb-2" style={{ fontSize: `${design.fontSize + 1}px`, color: design.accentColor }}>
                  Experience
                </h2>
                <div className="space-y-3">
                  {data.experiences.map((exp) => (
                    <div key={exp.id}>
                      <div className="flex justify-between items-baseline">
                        <span className="font-bold">{exp.role || 'Role'} {exp.company && <span className="font-normal">— {exp.company}</span>}</span>
                        <span className="text-stone-500" style={{ fontSize: `${design.fontSize - 1.5}px` }}>{exp.period}</span>
                      </div>
                      {exp.description && <p className="whitespace-pre-wrap mt-0.5">{exp.description}</p>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Education */}
            {data.educations.length > 0 && (
              <section className="mb-5">
                <h2 className="font-bold uppercase tracking-wide mb-2" style={{ fontSize: `${design.fontSize + 1}px`, color: design.accentColor }}>
                  Education
                </h2>
                <div className="space-y-2">
                  {data.educations.map((edu) => (
                    <div key={edu.id} className="flex justify-between items-baseline">
                      <span><span className="font-bold">{edu.school || 'School'}</span>{edu.degree && ` — ${edu.degree}`}</span>
                      <span className="text-stone-500" style={{ fontSize: `${design.fontSize - 1.5}px` }}>{edu.period}</span>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Skills */}
            {data.skills.length > 0 && (
              <section>
                <h2 className="font-bold uppercase tracking-wide mb-2" style={{ fontSize: `${design.fontSize + 1}px`, color: design.accentColor }}>
                  Skills
                </h2>
                <p>{data.skills.join('  •  ')}</p>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleResumeBuilder;
