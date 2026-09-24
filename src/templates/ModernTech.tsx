import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Github, Code } from 'lucide-react';

export default function ModernTech({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in' }}>
      {/* Main Layout - Two Column */}
      <div className="flex min-h-full">
        {/* Left Sidebar - Dark */}
        <aside className="w-[240px] bg-slate-900 text-white p-5 flex flex-col" style={{ minHeight: '11in' }}>
          {/* Photo Section */}
          {personalInfo.photo ? (
            <div className="mb-5">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-slate-700"
              />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-full mx-auto bg-slate-700 flex items-center justify-center mb-5">
              <Code className="w-12 h-12 text-slate-500" />
            </div>
          )}

          {/* Contact Info */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Contact</h3>
            <div className="space-y-2 text-xs text-slate-300">
              {personalInfo.email && (
                <div className="flex items-start gap-2">
                  <Mail className="w-3.5 h-3.5 mt-0.5 text-cyan-400" />
                  <span className="break-all">{personalInfo.email}</span>
                </div>
              )}
              {personalInfo.phone && (
                <div className="flex items-start gap-2">
                  <Phone className="w-3.5 h-3.5 mt-0.5 text-cyan-400" />
                  <span>{personalInfo.phone}</span>
                </div>
              )}
              {personalInfo.location && (
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 mt-0.5 text-cyan-400" />
                  <span>{personalInfo.location}</span>
                </div>
              )}
              {personalInfo.website && (
                <div className="flex items-start gap-2">
                  <Globe className="w-3.5 h-3.5 mt-0.5 text-cyan-400" />
                  <span className="break-all">{personalInfo.website}</span>
                </div>
              )}
              {personalInfo.linkedin && (
                <div className="flex items-start gap-2">
                  <Linkedin className="w-3.5 h-3.5 mt-0.5 text-cyan-400" />
                  <span className="break-all">{personalInfo.linkedin}</span>
                </div>
              )}
            </div>
          </div>

          {/* Technical Skills */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Technical Skills</h3>
            <div className="space-y-1.5">
              {skills.slice(0, 12).map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between text-xs text-slate-300 mb-0.5">
                    <span>{skill.name}</span>
                  </div>
                  <div className="w-full h-1 bg-slate-700 rounded">
                    <div
                      className="h-full bg-cyan-500 rounded"
                      style={{
                        width: skill.level === 'expert' ? '100%' :
                               skill.level === 'advanced' ? '75%' :
                               skill.level === 'intermediate' ? '50%' : '25%'
                      }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Education</h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 text-xs text-slate-300">
                <p className="font-semibold text-white">{edu.degree}</p>
                <p>{edu.field}</p>
                <p className="text-slate-400">{edu.institution}</p>
                <p className="text-slate-500">{edu.graduationDate}</p>
              </div>
            ))}
          </div>

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Certifications</h3>
              <ul className="space-y-1 text-xs text-slate-300">
                {certifications.map((cert) => (
                  <li key={cert.id} className="flex items-start gap-1.5">
                    <span className="text-cyan-400">▸</span>
                    <span>{cert.name}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Languages</h3>
              <ul className="space-y-1 text-xs text-slate-300">
                {languages.map((lang) => (
                  <li key={lang.name} className="capitalize">{lang.name} • {lang.proficiency}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-auto pt-4">
            {/* GitHub Link indicator */}
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <Github className="w-3.5 h-3.5" />
              <span>github.com/mzhang</span>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Header */}
          <header className="mb-6 border-b-2 border-cyan-500 pb-4">
            <h1 className="text-3xl font-bold text-slate-900 mb-1">{personalInfo.fullName}</h1>
            <p className="text-lg text-cyan-600 font-medium">{personalInfo.title}</p>
          </header>

          {/* Summary */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-2 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-cyan-600"></span>
              About Me
            </h2>
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-3 flex items-center gap-2">
              <span className="w-8 h-0.5 bg-cyan-600"></span>
              Experience
            </h2>
            {experience.map((exp, index) => (
              <div key={exp.id} className={`mb-4 ${index > 0 ? 'pt-4 border-t border-gray-100' : ''}`}>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-500">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-cyan-700 font-medium mb-2">{exp.company} • {exp.location}</p>
                <ul className="space-y-1.5 text-sm text-gray-700">
                  {exp.highlights.slice(0, 4).map((highlight, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-cyan-500 mt-1">›</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Projects */}
          {projects && projects.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-3 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-cyan-600"></span>
                Featured Projects
              </h2>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs bg-slate-200 text-slate-700 px-2 py-0.5 rounded">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.highlights && (
                      <ul className="mt-2 space-y-0.5 text-xs text-gray-600">
                        {project.highlights.map((h, i) => (
                          <li key={i}>• {h}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Achievements */}
          {achievements && achievements.length > 0 && (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-2 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-cyan-600"></span>
                Recognition
              </h2>
              <ul className="space-y-1 text-sm text-gray-700">
                {achievements.map((achievement) => (
                  <li key={achievement.id}>
                    <span className="font-semibold">{achievement.title}</span> — {achievement.date}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Community */}
          {(volunteer && volunteer.length > 0) || (memberships && memberships.length > 0) ? (
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider text-cyan-600 mb-2 flex items-center gap-2">
                <span className="w-8 h-0.5 bg-cyan-600"></span>
                Community
              </h2>
              <ul className="space-y-1 text-xs text-gray-600">
                {volunteer?.map((v) => (
                  <li key={v.id}>{v.role} at {v.organization}</li>
                ))}
                {memberships?.map((m) => (
                  <li key={m.id}>{m.organization}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* References */}
          {references && references.length > 0 && (
            <footer className="mt-4 pt-3 border-t border-gray-200 text-xs text-gray-500">
              References: {references.slice(0, 2).map(r => `${r.name} (${r.title})`).join(', ')}
            </footer>
          )}
        </main>
      </div>
    </article>
  );
}
