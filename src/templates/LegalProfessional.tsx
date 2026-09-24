import type { TemplateProps } from '../types/resume';

export default function LegalProfessional({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-slate-900 font-serif ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.7in' }}>
      {/* Header - Legal/Traditional Style */}
      <header className="text-center mb-6 pb-4 border-b-2 border-slate-800">
        <h1 className="text-3xl font-bold tracking-wide text-slate-900 mb-1">
          {personalInfo.fullName}
        </h1>
        <p className="text-sm uppercase tracking-[0.3em] text-slate-600 mb-4">
          {personalInfo.title}
        </p>
        <div className="flex justify-center flex-wrap gap-x-5 gap-y-1 text-xs text-slate-600">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
        </div>
        <div className="flex justify-center gap-x-5 mt-1 text-xs text-slate-600">
          {personalInfo.website && <span>{personalInfo.website}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
          Professional Summary
        </h2>
        <p className="text-sm leading-relaxed text-slate-700 text-justify">
          {summary}
        </p>
      </section>

      {/* Practice Areas / Skills */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
          Areas of Practice
        </h2>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-sm text-slate-700">
          {skills.map((skill) => (
            <span key={skill.name}>• {skill.name}</span>
          ))}
        </div>
      </section>

      {/* Legal Experience */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
          Legal Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`${index > 0 ? 'mt-5' : ''}`}>
            <div className="flex justify-between items-baseline border-b border-dotted border-slate-200 pb-0.5 mb-1">
              <h3 className="font-bold text-slate-900">{exp.title}</h3>
              <span className="text-sm text-slate-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm italic text-slate-600 mb-2">{exp.company}, {exp.location}</p>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-slate-700">
              {exp.highlights.slice(0, 4).map((highlight, i) => (
                <li key={i} className="leading-relaxed">{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-3">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-slate-900">{edu.degree}</h3>
              <span className="text-sm text-slate-500">{edu.graduationDate}</span>
            </div>
            <p className="text-sm text-slate-700">{edu.field}</p>
            <p className="text-sm italic text-slate-600">{edu.institution}, {edu.location}</p>
            {edu.honors && edu.honors.length > 0 && (
              <p className="text-xs text-slate-600 mt-0.5">{edu.honors.join(' • ')}</p>
            )}
          </div>
        ))}
      </section>

      {/* Bar Admissions / Certifications */}
      <section className="mb-6">
        <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
          Bar Admissions & Certifications
        </h2>
        <ul className="space-y-2 text-sm text-slate-700">
          {certifications?.map((cert) => (
            <li key={cert.id}>
              <span className="font-medium">{cert.name}</span>
              <span className="text-slate-500"> — {cert.issuer}, {cert.date}</span>
              {cert.credentialId && <span className="text-xs text-slate-400 ml-1">({cert.credentialId})</span>}
            </li>
          ))}
        </ul>
      </section>

      {/* Honors & Awards */}
      {achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
            Honors & Awards
          </h2>
          <ul className="space-y-1.5 text-sm text-slate-700">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <span className="font-medium">{achievement.title}</span>
                {' — '}{achievement.description} ({achievement.date})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Professional Associations */}
      {memberships && memberships.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
            Professional Associations
          </h2>
          <ul className="space-y-1.5 text-sm text-slate-700">
            {memberships.map((mem) => (
              <li key={mem.id}>
                <span className="font-medium">{mem.organization}</span>
                {mem.role && <span className="text-slate-500"> — {mem.role}</span>}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Pro Bono & Community Service */}
      {volunteer && volunteer.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
            Pro Bono & Community Service
          </h2>
          {volunteer.map((v) => (
            <div key={v.id} className="mb-2 text-sm text-slate-700">
              <div className="flex justify-between items-baseline">
                <span className="font-medium">{v.role}</span>
                <span className="text-xs text-slate-500">{v.startDate}{v.endDate ? ` – ${v.endDate}` : ''}</span>
              </div>
              <p className="text-slate-600">{v.organization}, {v.location}</p>
            </div>
          ))}
        </section>
      )}

      {/* Languages & References */}
      <div className="grid grid-cols-2 gap-8">
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
              Languages
            </h2>
            <ul className="space-y-0.5 text-sm text-slate-700">
              {languages.map((lang) => (
                <li key={lang.name} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="capitalize text-slate-500">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {references && references.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-slate-800 border-b border-slate-300 pb-1 mb-3">
              References
            </h2>
            <ul className="space-y-2 text-sm text-slate-700">
              {references.slice(0, 2).map((ref) => (
                <li key={ref.id}>
                  <span className="font-medium">{ref.name}</span>
                  <br />
                  <span className="text-xs text-slate-500">{ref.title}, {ref.company}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
