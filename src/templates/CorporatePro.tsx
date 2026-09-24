import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function CorporatePro({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, references } = data;

  const formatSkillLevel = (level?: string) => {
    if (!level) return '';
    const levels: Record<string, string> = {
      expert: '████',
      advanced: '███░',
      intermediate: '██░░',
      beginner: '█░░░'
    };
    return levels[level] || '';
  };

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.6in' }}>
      {/* Header - Left-aligned with accent bar */}
      <header className="mb-6">
        <div className="flex items-start gap-4">
          <div className="w-1.5 bg-blue-600 h-24 rounded"></div>
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-1">
              {personalInfo.fullName}
            </h1>
            <p className="text-lg text-blue-600 font-medium mb-3">
              {personalInfo.title}
            </p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-4 h-4 text-blue-600" />
                  {personalInfo.email}
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-4 h-4 text-blue-600" />
                  {personalInfo.phone}
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-4 h-4 text-blue-600" />
                  {personalInfo.location}
                </span>
              )}
              {personalInfo.linkedin && (
                <span className="flex items-center gap-1">
                  <Linkedin className="w-4 h-4 text-blue-600" />
                  {personalInfo.linkedin}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Professional Summary with accent */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Professional Summary
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-gray-700 pl-2 border-l-2 border-gray-200">
          {summary}
        </p>
      </section>

      {/* Skills Grid - Prominent */}
      <section className="mb-5 bg-gray-50 p-4 rounded">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Skills & Competencies
          </h2>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
          {skills.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between text-sm">
              <span className="text-gray-800">{skill.name}</span>
              <span className="font-mono text-blue-600 text-xs">{formatSkillLevel(skill.level)}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Professional Experience
          </h2>
        </div>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`mb-4 pl-2 border-l-2 ${index === 0 ? 'border-blue-600' : 'border-gray-200'}`}>
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-gray-900">{exp.title}</h3>
              <span className="text-sm text-gray-500 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm text-blue-600 font-medium mb-1.5">{exp.company} | {exp.location}</p>
            <ul className="list-none space-y-1 text-sm text-gray-700">
              {exp.highlights.slice(0, 5).map((highlight, i) => (
                <li key={i} className="flex gap-2">
                  <span className="text-blue-600 mt-1">▸</span>
                  <span className="leading-relaxed">{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Projects */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Key Projects
            </h2>
          </div>
          <div className="grid gap-3">
            {projects.map((project) => (
              <div key={project.id} className="bg-gray-50 p-3 rounded">
                <h4 className="font-bold text-gray-900 text-sm">{project.name}</h4>
                <p className="text-xs text-gray-600 mt-1">{project.description}</p>
                {project.technologies && (
                  <p className="text-xs text-blue-600 mt-1">{project.technologies.join(' • ')}</p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications && certifications.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-0.5 bg-blue-600"></div>
            <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
              Certifications
            </h2>
          </div>
          <div className="flex flex-wrap gap-2">
            {certifications.map((cert) => (
              <span key={cert.id} className="text-xs bg-gray-100 px-3 py-1.5 rounded text-gray-700">
                {cert.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-8 h-0.5 bg-blue-600"></div>
          <h2 className="text-sm font-bold uppercase tracking-wider text-blue-600">
            Education
          </h2>
        </div>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-gray-900">{edu.degree}</h3>
              <span className="text-sm text-gray-500">{edu.graduationDate}</span>
            </div>
            <p className="text-sm text-gray-600">{edu.field}, {edu.institution}</p>
          </div>
        ))}
      </section>

      {/* Bottom Section */}
      <div className="grid grid-cols-3 gap-4 text-xs">
        {achievements && achievements.length > 0 && (
          <section>
            <h4 className="font-bold text-blue-600 uppercase mb-1">Awards</h4>
            <ul className="space-y-0.5 text-gray-600">
              {achievements.map((a) => (
                <li key={a.id}>{a.title} ({a.date})</li>
              ))}
            </ul>
          </section>
        )}

        {languages && languages.length > 0 && (
          <section>
            <h4 className="font-bold text-blue-600 uppercase mb-1">Languages</h4>
            <ul className="space-y-0.5 text-gray-600">
              {languages.map((l) => (
                <li key={l.name}>{l.name} — {l.proficiency}</li>
              ))}
            </ul>
          </section>
        )}

        {memberships && memberships.length > 0 && (
          <section>
            <h4 className="font-bold text-blue-600 uppercase mb-1">Affiliations</h4>
            <ul className="space-y-0.5 text-gray-600">
              {memberships.map((m) => (
                <li key={m.id}>{m.organization}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* References */}
      {references && references.length > 0 && (
        <footer className="mt-5 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500 italic">References available upon request</p>
        </footer>
      )}
    </article>
  );
}
