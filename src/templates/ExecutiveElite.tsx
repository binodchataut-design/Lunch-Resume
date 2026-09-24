import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin } from 'lucide-react';

export default function ExecutiveElite({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-serif ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.75in' }}>
      {/* Header - Centered Executive Style */}
      <header className="text-center border-b-2 border-gray-900 pb-6 mb-6">
        <h1 className="text-3xl font-bold tracking-wide mb-1 text-gray-900">
          {personalInfo.fullName}
        </h1>
        <p className="text-lg text-gray-700 tracking-widest uppercase mb-4">
          {personalInfo.title}
        </p>
        <div className="flex justify-center flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600">
          {personalInfo.email && (
            <span className="flex items-center gap-1.5">
              <Mail className="w-3.5 h-3.5" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1.5">
              <Globe className="w-3.5 h-3.5" />
              {personalInfo.website}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1.5">
              <Linkedin className="w-3.5 h-3.5" />
              {personalInfo.linkedin}
            </span>
          )}
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
          Executive Summary
        </h2>
        <p className="text-sm leading-relaxed text-gray-700 text-justify">
          {summary}
        </p>
      </section>

      {/* Professional Experience */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-4 text-gray-900">
          Professional Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`${index > 0 ? 'mt-5' : ''}`}>
            <div className="flex justify-between items-baseline mb-1">
              <h3 className="font-bold text-gray-900">{exp.title}</h3>
              <span className="text-sm text-gray-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <div className="flex justify-between items-baseline mb-2">
              <p className="text-sm italic text-gray-700">{exp.company}</p>
              <p className="text-sm text-gray-600">{exp.location}</p>
            </div>
            <ul className="list-disc ml-5 space-y-1.5 text-sm text-gray-700">
              {exp.highlights.map((highlight, i) => (
                <li key={i} className="leading-relaxed">{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Education */}
      <section className="mb-6">
        <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
          Education
        </h2>
        {education.map((edu, index) => (
          <div key={edu.id} className={`${index > 0 ? 'mt-3' : ''}`}>
            <div className="flex justify-between items-baseline">
              <h3 className="font-bold text-gray-900">{edu.degree}, {edu.field}</h3>
              <span className="text-sm text-gray-600">{edu.graduationDate}</span>
            </div>
            <p className="text-sm text-gray-700">{edu.institution}, {edu.location}</p>
            {edu.honors && edu.honors.length > 0 && (
              <p className="text-xs text-gray-600 mt-0.5">{edu.honors.join(' • ')}</p>
            )}
          </div>
        ))}
      </section>

      {/* Two Column Layout for Skills & Certifications */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
            Core Competencies
          </h2>
          <ul className="space-y-1 text-sm text-gray-700">
            {skills.map((skill) => (
              <li key={skill.name} className="flex justify-between">
                <span>{skill.name}</span>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
            Certifications
          </h2>
          <ul className="space-y-1.5 text-sm text-gray-700">
            {certifications?.map((cert) => (
              <li key={cert.id}>
                <span className="font-medium">{cert.name}</span>
                <span className="text-gray-600"> — {cert.issuer}, {cert.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Achievements & Recognition */}
      {achievements && achievements.length > 0 && (
        <section className="mb-6">
          <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
            Achievements & Recognition
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <span className="font-medium">{achievement.title}</span>
                {' — '}{achievement.description} ({achievement.date})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Board Memberships & Volunteer Leadership */}
      <div className="grid grid-cols-2 gap-8 mb-6">
        {memberships && memberships.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
              Professional Memberships
            </h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {memberships.map((mem) => (
                <li key={mem.id}>
                  <span className="font-medium">{mem.organization}</span>
                  {mem.role && <span className="text-gray-600"> — {mem.role}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {volunteer && volunteer.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
              Board & Community Leadership
            </h2>
            <ul className="space-y-1.5 text-sm text-gray-700">
              {volunteer.map((v) => (
                <li key={v.id}>
                  <span className="font-medium">{v.role}</span>
                  <span className="text-gray-600"> — {v.organization}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* Languages & References */}
      <div className="grid grid-cols-2 gap-8">
        {languages && languages.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
              Languages
            </h2>
            <ul className="space-y-1 text-sm text-gray-700">
              {languages.map((lang) => (
                <li key={lang.name} className="flex justify-between">
                  <span>{lang.name}</span>
                  <span className="capitalize">{lang.proficiency}</span>
                </li>
              ))}
            </ul>
          </section>
        )}

        {references && references.length > 0 && (
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest border-b border-gray-300 pb-1 mb-3 text-gray-900">
              References
            </h2>
            <ul className="space-y-2 text-sm text-gray-700">
              {references.slice(0, 2).map((ref) => (
                <li key={ref.id}>
                  <span className="font-medium">{ref.name}</span>
                  <br />
                  <span className="text-xs">{ref.title}, {ref.company}</span>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}
