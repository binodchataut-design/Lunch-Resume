import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function FinanceAuthority({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.65in' }}>
      {/* Header - Underlined Finance Style */}
      <header className="mb-5 pb-4 border-b-4 border-emerald-700">
        <h1 className="text-3xl font-light text-gray-900 mb-1 tracking-tight">
          {personalInfo.fullName}
        </h1>
        <p className="text-sm font-medium text-emerald-700 tracking-wide uppercase mb-3">
          {personalInfo.title}
        </p>
        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
          <div className="flex items-center gap-2">
            <Mail className="w-3.5 h-3.5 text-emerald-700" />
            <span>{personalInfo.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-emerald-700" />
            <span>{personalInfo.phone}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>{personalInfo.location}</span>
          </div>
          {personalInfo.linkedin && (
            <div className="flex items-center gap-2">
              <Linkedin className="w-3.5 h-3.5 text-emerald-700" />
              <span>{personalInfo.linkedin}</span>
            </div>
          )}
        </div>
      </header>

      {/* Summary */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 bg-emerald-50 px-2 py-1 inline-block">
          Professional Profile
        </h2>
        <p className="text-sm leading-relaxed text-gray-700">
          {summary}
        </p>
      </section>

      {/* Core Competencies - Table Style */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 bg-emerald-50 px-2 py-1 inline-block">
          Core Competencies
        </h2>
        <div className="grid grid-cols-4 gap-x-4 gap-y-1.5 text-sm">
          {skills.map((skill) => (
            <span key={skill.name} className="text-gray-700">• {skill.name}</span>
          ))}
        </div>
      </section>

      {/* Experience - Timeline Style */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-3 bg-emerald-50 px-2 py-1 inline-block">
          Professional Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`relative pl-4 ${index > 0 ? 'mt-4' : ''}`}>
            <div className="absolute left-0 top-1 bottom-0 w-0.5 bg-emerald-200"></div>
            <div className="absolute left-0 top-1.5 w-2 h-2 bg-emerald-700 rounded-full -translate-x-0.5"></div>
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-semibold text-gray-900">{exp.title}</h3>
              <span className="text-xs text-gray-500 font-mono">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm text-emerald-700 font-medium mb-1.5">{exp.company} | {exp.location}</p>
            <ul className="space-y-1 text-sm text-gray-700 ml-1">
              {exp.highlights.slice(0, 4).map((highlight, i) => (
                <li key={i} className="leading-relaxed before:content-['▸'] before:text-emerald-600 before:mr-2 before:text-xs">
                  {highlight}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education & Certifications Side by Side */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 bg-emerald-50 px-2 py-1 inline-block">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <p className="font-semibold text-sm text-gray-900">{edu.degree}</p>
              <p className="text-xs text-gray-600">{edu.field}</p>
              <p className="text-xs text-gray-600">{edu.institution}, {edu.location}</p>
              <p className="text-xs text-gray-500 mt-0.5">{edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 bg-emerald-50 px-2 py-1 inline-block">
            Certifications
          </h2>
          <ul className="space-y-1">
            {certifications?.map((cert) => (
              <li key={cert.id} className="text-xs">
                <span className="font-medium text-gray-900">{cert.name}</span>
                <br />
                <span className="text-gray-600">{cert.issuer} | {cert.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Key Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 bg-emerald-50 px-2 py-1 inline-block">
            Key Projects
          </h2>
          {projects.map((project) => (
            <div key={project.id} className="mb-2 p-3 bg-gray-50 border-l-2 border-emerald-600">
              <h4 className="font-semibold text-sm text-gray-900">{project.name}</h4>
              <p className="text-xs text-gray-600 mt-0.5">{project.description}</p>
              {project.highlights && (
                <p className="text-xs text-emerald-700 mt-1">→ {project.highlights.join(' | ')}</p>
              )}
            </div>
          ))}
        </section>
      )}

      {/* Awards & Recognition */}
      {achievements && achievements.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-emerald-700 mb-2 bg-emerald-50 px-2 py-1 inline-block">
            Awards & Recognition
          </h2>
          <div className="flex flex-wrap gap-2">
            {achievements.map((achievement) => (
              <span key={achievement.id} className="text-xs border border-emerald-200 text-emerald-800 px-2 py-1 rounded">
                {achievement.title} ({achievement.date})
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Footer Section */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
        {languages && languages.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Languages</h4>
            <ul className="text-xs space-y-0.5 text-gray-600">
              {languages.map((l) => (
                <li key={l.name}>{l.name}: {l.proficiency}</li>
              ))}
            </ul>
          </div>
        )}

        {memberships && memberships.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Memberships</h4>
            <ul className="text-xs space-y-0.5 text-gray-600">
              {memberships.map((m) => (
                <li key={m.id}>{m.organization}</li>
              ))}
            </ul>
          </div>
        )}

        {volunteer && volunteer.length > 0 && (
          <div>
            <h4 className="text-xs font-bold text-gray-500 uppercase mb-1">Community</h4>
            <ul className="text-xs space-y-0.5 text-gray-600">
              {volunteer.slice(0, 2).map((v) => (
                <li key={v.id}>{v.role}, {v.organization}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* References */}
      {references && references.length > 0 && (
        <div className="mt-4 text-xs text-gray-500">
          <span className="font-semibold">References:</span> {references.slice(0, 2).map(r => `${r.name}, ${r.title} at ${r.company}`).join('; ')}
        </div>
      )}
    </article>
  );
}
