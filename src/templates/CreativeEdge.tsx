import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, Award, Briefcase, BookOpen, Star } from 'lucide-react';

export default function CreativeEdge({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, projects, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in' }}>
      <div className="flex min-h-full">
        {/* Left Sidebar - Gradient */}
        <aside className="w-[220px] bg-gradient-to-b from-pink-600 via-pink-500 to-orange-500 text-white p-5" style={{ minHeight: '11in' }}>
          {/* Photo */}
          {personalInfo.photo ? (
            <div className="mb-5">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-24 h-24 rounded-2xl mx-auto object-cover shadow-lg rotate-3"
              />
            </div>
          ) : (
            <div className="w-24 h-24 rounded-2xl mx-auto bg-white/20 flex items-center justify-center mb-5">
              <Star className="w-10 h-10 text-white/60" />
            </div>
          )}

          {/* Name in sidebar */}
          <div className="text-center mb-6">
            <h1 className="text-xl font-bold mb-1">{personalInfo.fullName}</h1>
            <p className="text-sm text-white/80">{personalInfo.title}</p>
          </div>

          {/* Contact */}
          <div className="mb-6 space-y-2 text-xs">
            {personalInfo.email && (
              <div className="flex items-center gap-2">
                <Mail className="w-3 h-3" />
                <span className="break-all">{personalInfo.email}</span>
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-center gap-2">
                <Phone className="w-3 h-3" />
                <span>{personalInfo.phone}</span>
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-center gap-2">
                <MapPin className="w-3 h-3" />
                <span>{personalInfo.location}</span>
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-center gap-2">
                <Globe className="w-3 h-3" />
                <span className="break-all">{personalInfo.website}</span>
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-center gap-2">
                <Linkedin className="w-3 h-3" />
                <span className="break-all">{personalInfo.linkedin}</span>
              </div>
            )}
          </div>

          {/* Skills - Creative Style */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <Award className="w-3 h-3" />
              Skills
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {skills.map((skill) => (
                <span
                  key={skill.name}
                  className="text-xs bg-white/20 px-2 py-0.5 rounded-full"
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="mb-6">
            <h3 className="text-xs font-bold uppercase tracking-wider mb-3 flex items-center gap-2">
              <BookOpen className="w-3 h-3" />
              Education
            </h3>
            {education.map((edu) => (
              <div key={edu.id} className="mb-3 text-xs">
                <p className="font-semibold">{edu.degree}</p>
                <p className="text-white/80">{edu.field}</p>
                <p className="text-white/60">{edu.institution}</p>
                <p className="text-white/50 text-xs">{edu.graduationDate}</p>
              </div>
            ))}
          </div>

          {/* Languages */}
          {languages && languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2">Languages</h3>
              <ul className="space-y-0.5 text-xs text-white/80">
                {languages.map((lang) => (
                  <li key={lang.name} className="capitalize">{lang.name} • {lang.proficiency}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Awards Preview */}
          {achievements && achievements.length > 0 && (
            <div className="mt-auto">
              <h3 className="text-xs font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Award className="w-3 h-3" />
                Awards
              </h3>
              <ul className="space-y-1 text-xs text-white/80">
                {achievements.slice(0, 3).map((a) => (
                  <li key={a.id}>{a.title}</li>
                ))}
              </ul>
            </div>
          )}
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Profile Summary */}
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-1 bg-pink-500 rounded"></div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Profile</h2>
            </div>
            <p className="text-sm leading-relaxed text-gray-700">{summary}</p>
          </section>

          {/* Experience */}
          <section className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-1 bg-orange-500 rounded"></div>
              <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Experience</h2>
              <Briefcase className="w-4 h-4 text-gray-400" />
            </div>
            {experience.map((exp, index) => (
              <div key={exp.id} className={`mb-5 ${index > 0 ? 'pt-4 border-t-2 border-dashed border-pink-200' : ''}`}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-gray-900">{exp.title}</h3>
                  <span className="text-xs text-gray-400 font-medium">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-pink-600 font-medium mb-2">{exp.company}, {exp.location}</p>
                <ul className="space-y-1.5 text-sm text-gray-600">
                  {exp.highlights.slice(0, 4).map((highlight, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="text-pink-400">◆</span>
                      <span className="leading-relaxed">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Featured Work */}
          {projects && projects.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-1 bg-pink-500 rounded"></div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Featured Work</h2>
              </div>
              <div className="grid gap-4">
                {projects.map((project) => (
                  <div key={project.id} className="p-4 bg-gradient-to-r from-pink-50 to-orange-50 rounded-lg border border-pink-100">
                    <h4 className="font-bold text-gray-900 mb-1">{project.name}</h4>
                    <p className="text-xs text-gray-600 mb-2">{project.description}</p>
                    {project.technologies && (
                      <div className="flex flex-wrap gap-1 mb-2">
                        {project.technologies.map((tech, i) => (
                          <span key={i} className="text-xs bg-white text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}
                    {project.highlights && (
                      <div className="flex gap-2">
                        {project.highlights.map((h, i) => (
                          <span key={i} className="text-xs text-pink-600 font-medium">{h}</span>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Awards & Recognition */}
          {achievements && achievements.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-1 bg-orange-500 rounded"></div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Recognition</h2>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {achievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start gap-2 p-3 bg-gray-50 rounded-lg">
                    <Award className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{achievement.title}</p>
                      <p className="text-xs text-gray-500">{achievement.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Certifications */}
          {certifications && certifications.length > 0 && (
            <section className="mb-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-1 bg-pink-500 rounded"></div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Certifications</h2>
              </div>
              <ul className="flex flex-wrap gap-2 text-xs text-gray-700">
                {certifications.map((cert) => (
                  <li key={cert.id} className="bg-pink-50 text-pink-700 px-3 py-1 rounded-full">
                    {cert.name}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Community & Memberships */}
          {(volunteer && volunteer.length > 0) || (memberships && memberships.length > 0) ? (
            <section>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-1 bg-orange-500 rounded"></div>
                <h2 className="text-xs font-bold uppercase tracking-widest text-gray-500">Community</h2>
              </div>
              <ul className="space-y-1 text-xs text-gray-600">
                {volunteer?.map((v) => (
                  <li key={v.id}>{v.role}, {v.organization}</li>
                ))}
                {memberships?.map((m) => (
                  <li key={m.id}>{m.organization}</li>
                ))}
              </ul>
            </section>
          ) : null}

          {/* References */}
          {references && references.length > 0 && (
            <footer className="mt-5 pt-3 border-t border-gray-200 text-xs text-gray-500">
              References: {references.slice(0, 2).map(r => `${r.name}, ${r.title}`).join('; ')}
            </footer>
          )}
        </main>
      </div>
    </article>
  );
}
