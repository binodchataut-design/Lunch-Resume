import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Linkedin } from 'lucide-react';

export default function HealthcareProfessional({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.6in' }}>
      {/* Header - Medical/Healthcare Style */}
      <header className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-10 h-10 bg-teal-600 rounded-full flex items-center justify-center">
            <span className="text-white font-bold text-lg">+</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
              {personalInfo.fullName}
            </h1>
            <p className="text-sm text-teal-700 font-medium">
              {personalInfo.title}
            </p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4 text-xs text-gray-600 border-t border-gray-200 pt-3">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3 text-teal-600" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3 text-teal-600" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3 text-teal-600" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3 text-teal-600" />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      {/* Professional Summary */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-teal-600"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Professional Summary
          </h2>
        </div>
        <p className="text-sm leading-relaxed text-gray-700 pl-3">
          {summary}
        </p>
      </section>

      {/* Key Skills - Badge Style */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-2">
          <div className="w-1 h-4 bg-teal-600"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Areas of Expertise
          </h2>
        </div>
        <div className="flex flex-wrap gap-1.5 pl-3">
          {skills.map((skill) => (
            <span key={skill.name} className="text-xs bg-teal-50 text-teal-800 px-2 py-0.5 rounded border border-teal-100">
              {skill.name}
            </span>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-teal-600"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Professional Experience
          </h2>
        </div>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`pl-3 ${index > 0 ? 'mt-4 pt-4 border-t border-dashed border-gray-200' : ''}`}>
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-semibold text-gray-900">{exp.title}</h3>
              <span className="text-xs text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm text-teal-700 mb-2">{exp.company}, {exp.location}</p>
            <ul className="space-y-1 text-sm text-gray-700">
              {exp.highlights.slice(0, 5).map((highlight, i) => (
                <li key={i} className="leading-relaxed flex gap-2">
                  <span className="text-teal-500 mt-0.5">●</span>
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education & Credentials */}
      <section className="mb-5">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-1 h-4 bg-teal-600"></div>
          <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
            Education & Credentials
          </h2>
        </div>
        <div className="pl-3 space-y-3">
          {education.map((edu) => (
            <div key={edu.id}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-semibold text-sm text-gray-900">{edu.degree}</h3>
                <span className="text-xs text-gray-500">{edu.graduationDate}</span>
              </div>
              <p className="text-xs text-gray-600">{edu.field}</p>
              <p className="text-xs text-gray-600">{edu.institution}, {edu.location}</p>
              {edu.honors && edu.honors.length > 0 && (
                <p className="text-xs text-teal-700 mt-0.5">{edu.honors.join(' • ')}</p>
              )}
            </div>
          ))}

          {certifications && certifications.length > 0 && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <h4 className="text-xs font-semibold text-gray-700 mb-1.5">Professional Certifications</h4>
              <ul className="space-y-1">
                {certifications.map((cert) => (
                  <li key={cert.id} className="text-xs text-gray-600">
                    <span className="font-medium text-gray-800">{cert.name}</span> — {cert.issuer}, {cert.date}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>

      {/* Projects & Programs */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-1 h-4 bg-teal-600"></div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Key Programs & Projects
            </h2>
          </div>
          <div className="pl-3 grid gap-2">
            {projects.map((project) => (
              <div key={project.id} className="p-3 bg-teal-50/50 rounded">
                <h4 className="font-semibold text-sm text-gray-900">{project.name}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{project.description}</p>
                {project.highlights && (
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="text-xs bg-white text-teal-700 px-1.5 py-0.5 rounded">{h}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Awards & Honors */}
      {achievements && achievements.length > 0 && (
        <section className="mb-5">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-1 h-4 bg-teal-600"></div>
            <h2 className="text-xs font-bold uppercase tracking-wider text-teal-700">
              Awards & Honors
            </h2>
          </div>
          <ul className="pl-3 space-y-1 text-xs text-gray-700">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <span className="font-medium">{achievement.title}</span> — {achievement.description} ({achievement.date})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Bottom Info */}
      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200 text-xs">
        {languages && languages.length > 0 && (
          <div>
            <h4 className="font-bold text-teal-700 uppercase mb-1">Languages</h4>
            <ul className="space-y-0.5 text-gray-600">
              {languages.map((l) => (
                <li key={l.name}>{l.name} ({l.proficiency})</li>
              ))}
            </ul>
          </div>
        )}

        {memberships && memberships.length > 0 && (
          <div>
            <h4 className="font-bold text-teal-700 uppercase mb-1">Affiliations</h4>
            <ul className="space-y-0.5 text-gray-600">
              {memberships.map((m) => (
                <li key={m.id}>{m.organization}{m.role ? ` — ${m.role}` : ''}</li>
              ))}
            </ul>
          </div>
        )}

        {volunteer && volunteer.length > 0 && (
          <div>
            <h4 className="font-bold text-teal-700 uppercase mb-1">Volunteer Work</h4>
            <ul className="space-y-0.5 text-gray-600">
              {volunteer.map((v) => (
                <li key={v.id}>{v.role}, {v.organization}</li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* References */}
      {references && references.length > 0 && (
        <footer className="mt-4 pt-3 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            <span className="font-semibold">References available:</span> {references.slice(0, 2).map(r => `${r.name}, ${r.title}`).join('; ')}
          </p>
        </footer>
      )}
    </article>
  );
}
