import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export default function EducationLeader({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-serif ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.7in' }}>
      {/* Header - Academic/Centers Style */}
      <header className="text-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          {personalInfo.fullName}
        </h1>
        <p className="text-base text-gray-600 mb-3">
          {personalInfo.title}
        </p>
        <div className="flex justify-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
        </div>
        <div className="flex justify-center gap-x-4 mt-1 text-xs text-gray-500">
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      {/* Horizontal Rule */}
      <hr className="border-t border-gray-300 mb-5" />

      {/* Academic Profile */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 mb-2 text-center">
          Academic Profile
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 text-justify">
          {summary}
        </p>
      </section>

      {/* Academic Positions */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-3">
          Academic Positions
        </h2>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`${index > 0 ? 'mt-4 pt-3 border-t border-gray-100' : ''}`}>
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-bold text-sm text-gray-900">{exp.title}</h3>
              <span className="text-xs text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm italic text-gray-600 mb-2">{exp.company}, {exp.location}</p>
            <ul className="list-disc ml-5 space-y-1 text-sm text-gray-700">
              {exp.highlights.slice(0, 5).map((highlight, i) => (
                <li key={i} className="leading-relaxed">{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-3">
          Education
        </h2>
        {education.map((edu) => (
          <div key={edu.id} className="mb-2">
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
              <span className="text-xs text-gray-500">{edu.graduationDate}</span>
            </div>
            <p className="text-sm text-gray-700">{edu.field}</p>
            <p className="text-sm text-gray-600">{edu.institution}, {edu.location}</p>
            {edu.honors && edu.honors.length > 0 && (
              <p className="text-xs text-gray-500 mt-0.5"><em>{edu.honors.join(' • ')}</em></p>
            )}
          </div>
        ))}
      </section>

      {/* Areas of Expertise */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-3">
          Areas of Expertise
        </h2>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-sm text-gray-700">
          {skills.map((skill) => (
            <span key={skill.name}>• {skill.name}</span>
          ))}
        </div>
      </section>

      {/* Selected Research & Publications */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-3">
          Selected Research & Projects
        </h2>
        {projects?.map((project, index) => (
          <div key={project.id} className={`mb-2 ${index > 0 ? 'mt-3 pt-3 border-t border-gray-100' : ''}`}>
            <h4 className="font-semibold text-sm text-gray-900">{project.name}</h4>
            <p className="text-xs text-gray-600 mt-0.5">{project.description}</p>
            {project.highlights && project.highlights.length > 0 && (
              <ul className="mt-1 text-xs text-gray-600">
                {project.highlights.map((h, i) => (
                  <li key={i} className="before:content-['▸'] before:mr-1">{h}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </section>

      {/* Awards & Recognition */}
      {achievements && achievements.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-3">
            Awards & Recognition
          </h2>
          <ul className="space-y-1 text-sm text-gray-700">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <span className="font-medium">{achievement.title}</span>
                <span className="text-gray-600"> — {achievement.description} ({achievement.date})</span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Professional Development */}
      {certifications && certifications.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-3">
            Professional Development
          </h2>
          <ul className="space-y-0.5 text-xs text-gray-700">
            {certifications.map((cert) => (
              <li key={cert.id}>{cert.name}, {cert.issuer} ({cert.date})</li>
            ))}
          </ul>
        </section>
      )}

      {/* Professional Affiliations & Service */}
      <div className="grid grid-cols-2 gap-6">
        {memberships && memberships.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-2">
              Professional Affiliations
            </h2>
            <ul className="space-y-0.5 text-xs text-gray-700">
              {memberships.map((mem) => (
                <li key={mem.id}>
                  {mem.organization}
                  {mem.role && <span className="text-gray-500"> ({mem.role})</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {volunteer && volunteer.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-gray-700 border-b border-gray-300 pb-1 mb-2">
              University & Community Service
            </h2>
            <ul className="space-y-0.5 text-xs text-gray-700">
              {volunteer.map((v) => (
                <li key={v.id}>{v.role}, {v.organization}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mt-4 text-xs text-gray-600">
          <span className="font-semibold text-gray-700">Languages:</span> {languages.map(l => `${l.name} (${l.proficiency})`).join(', ')}
        </section>
      )}

      {/* References */}
      {references && references.length > 0 && (
        <footer className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
          <span className="font-semibold">References available upon request</span>
        </footer>
      )}
    </article>
  );
}
