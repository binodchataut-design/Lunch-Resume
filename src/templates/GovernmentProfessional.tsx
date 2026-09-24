import type { TemplateProps } from '../types/resume';

export default function GovernmentProfessional({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in', padding: '0.65in' }}>
      {/* Header - Government Style (Centered, Formal) */}
      <header className="text-center mb-5 pb-4 border-b-2 border-gray-800">
        <h1 className="text-2xl font-bold text-gray-900 uppercase tracking-wider mb-1">
          {personalInfo.fullName}
        </h1>
        <p className="text-sm text-gray-600 uppercase tracking-wide mb-3">
          {personalInfo.title}
        </p>
        <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-xs text-gray-600 max-w-md mx-auto">
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>{personalInfo.phone}</span>}
          {personalInfo.location && <span>{personalInfo.location}</span>}
          {personalInfo.linkedin && <span>{personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Executive Summary */}
      <section className="mb-5">
        <div className="bg-gray-100 p-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2">
            Professional Summary
          </h2>
          <p className="text-sm leading-relaxed text-gray-700">
            {summary}
          </p>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
          Core Competencies
        </h2>
        <div className="grid grid-cols-3 gap-x-4 gap-y-1 text-sm text-gray-700">
          {skills.map((skill) => (
            <span key={skill.name}>• {skill.name}</span>
          ))}
        </div>
      </section>

      {/* Professional Experience */}
      <section className="mb-5">
        <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
          Professional Experience
        </h2>
        {experience.map((exp, index) => (
          <div key={exp.id} className={`mb-4 ${index > 0 ? 'pt-3 border-t border-gray-200' : ''}`}>
            <div className="flex justify-between items-baseline mb-0.5">
              <h3 className="font-bold text-gray-900 uppercase text-sm">{exp.title}</h3>
              <span className="text-xs text-gray-600">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
            </div>
            <p className="text-sm text-gray-700 font-medium mb-2">{exp.company} | {exp.location}</p>
            <ul className="list-disc ml-4 space-y-1 text-sm text-gray-700">
              {exp.highlights.slice(0, 4).map((highlight, i) => (
                <li key={i} className="leading-relaxed">{highlight}</li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* Key Programs */}
      {projects && projects.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
            Key Programs Managed
          </h2>
          <div className="grid gap-3">
            {projects.map((project) => (
              <div key={project.id} className="border-l-2 border-gray-400 pl-3">
                <h4 className="font-bold text-sm text-gray-900">{project.name}</h4>
                <p className="text-xs text-gray-600 mt-0.5">{project.description}</p>
                {project.highlights && project.highlights.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.highlights.map((h, i) => (
                      <span key={i} className="text-xs bg-gray-100 px-2 py-0.5 text-gray-700">{h}</span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education & Certifications */}
      <div className="grid grid-cols-2 gap-6 mb-5">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
            Education
          </h2>
          {education.map((edu) => (
            <div key={edu.id} className="mb-2">
              <h3 className="font-bold text-sm text-gray-900">{edu.degree}</h3>
              <p className="text-xs text-gray-600">{edu.field}</p>
              <p className="text-xs text-gray-600">{edu.institution}, {edu.graduationDate}</p>
            </div>
          ))}
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-3 border-b border-gray-300 pb-1">
            Certifications & Training
          </h2>
          <ul className="space-y-1">
            {certifications?.map((cert) => (
              <li key={cert.id} className="text-xs text-gray-700">
                <span className="font-medium">{cert.name}</span>
                <br />
                <span className="text-gray-500">{cert.issuer}, {cert.date}</span>
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* Awards & Recognition */}
      {achievements && achievements.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
            Awards & Recognition
          </h2>
          <ul className="space-y-1 text-sm text-gray-700">
            {achievements.map((achievement) => (
              <li key={achievement.id}>
                <span className="font-medium">{achievement.title}</span> — {achievement.description} ({achievement.date})
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Languages */}
      {languages && languages.length > 0 && (
        <section className="mb-5">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
            Language Proficiency
          </h2>
          <div className="flex flex-wrap gap-3 text-sm text-gray-700">
            {languages.map((lang) => (
              <span key={lang.name}>{lang.name}: <span className="capitalize">{lang.proficiency}</span></span>
            ))}
          </div>
        </section>
      )}

      {/* Professional Affiliations & Volunteer */}
      <div className="grid grid-cols-2 gap-6">
        {memberships && memberships.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
              Professional Affiliations
            </h2>
            <ul className="space-y-0.5 text-xs text-gray-700">
              {memberships.map((mem) => (
                <li key={mem.id}>
                  {mem.organization}
                  {mem.role && <span className="text-gray-500"> — {mem.role}</span>}
                </li>
              ))}
            </ul>
          </section>
        )}

        {volunteer && volunteer.length > 0 && (
          <section>
            <h2 className="text-xs font-bold uppercase tracking-wider text-gray-700 mb-2 border-b border-gray-300 pb-1">
              Community Engagement
            </h2>
            <ul className="space-y-0.5 text-xs text-gray-700">
              {volunteer.map((v) => (
                <li key={v.id}>{v.role}, {v.organization}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      {/* References */}
      {references && references.length > 0 && (
        <footer className="mt-5 pt-3 border-t-2 border-gray-800 text-center text-xs text-gray-600">
          References available upon request from: {references.slice(0, 2).map(r => `${r.name} (${r.title})`).join('; ')}
        </footer>
      )}
    </article>
  );
}
