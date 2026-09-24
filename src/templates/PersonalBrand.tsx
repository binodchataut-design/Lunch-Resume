import type { TemplateProps } from '../types/resume';
import { Mail, Phone, MapPin, Globe, Linkedin, BookOpen, Users, Trophy } from 'lucide-react';

export default function PersonalBrand({ data, className = '' }: TemplateProps) {
  const { personalInfo, summary, experience, education, skills, certifications, achievements, languages, memberships, volunteer, references } = data;

  return (
    <article className={`bg-white text-gray-900 font-sans ${className}`} style={{ width: '8.5in', minHeight: '11in' }}>
      {/* Hero Section */}
      <header className="relative bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white px-8 py-8">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-amber-600 rounded-full blur-3xl"></div>
        </div>

        <div className="relative flex items-start gap-6">
          {/* Photo */}
          {personalInfo.photo ? (
            <div className="shrink-0">
              <img
                src={personalInfo.photo}
                alt={personalInfo.fullName}
                className="w-28 h-28 rounded-2xl object-cover border-4 border-amber-400/50 shadow-xl"
              />
            </div>
          ) : (
            <div className="w-28 h-28 rounded-2xl bg-amber-500/20 flex items-center justify-center shrink-0 border-4 border-amber-400/50">
              <Users className="w-12 h-12 text-amber-400/60" />
            </div>
          )}

          {/* Name & Title */}
          <div className="flex-1">
            <h1 className="text-3xl font-bold mb-1 tracking-tight">{personalInfo.fullName}</h1>
            <p className="text-lg text-amber-400 font-medium mb-4">{personalInfo.title}</p>
            <p className="text-sm text-slate-300 leading-relaxed max-w-lg">{summary}</p>
          </div>

          {/* Contact */}
          <div className="text-right text-xs space-y-1.5 text-slate-400 shrink-0">
            {personalInfo.email && <div className="flex items-center justify-end gap-2"><span>{personalInfo.email}</span><Mail className="w-3 h-3 text-amber-500" /></div>}
            {personalInfo.phone && <div className="flex items-center justify-end gap-2"><span>{personalInfo.phone}</span><Phone className="w-3 h-3 text-amber-500" /></div>}
            {personalInfo.location && <div className="flex items-center justify-end gap-2"><span>{personalInfo.location}</span><MapPin className="w-3 h-3 text-amber-500" /></div>}
            {personalInfo.website && <div className="flex items-center justify-end gap-2"><span>{personalInfo.website}</span><Globe className="w-3 h-3 text-amber-500" /></div>}
            {personalInfo.linkedin && <div className="flex items-center justify-end gap-2"><span>{personalInfo.linkedin}</span><Linkedin className="w-3 h-3 text-amber-500" /></div>}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8">
        {/* Expertise - Tag Style */}
        <section className="mb-6">
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
            <Trophy className="w-4 h-4 text-amber-500" />
            Areas of Expertise
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.name}
                className="text-sm bg-slate-100 text-slate-700 px-3 py-1 rounded-full border border-slate-200"
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-3 gap-6">
          {/* Experience - 2 columns */}
          <section className="col-span-2 mb-6">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-4 flex items-center gap-2">
              Career Journey
            </h2>
            {experience.map((exp, index) => (
              <div key={exp.id} className={`relative pl-4 ${index > 0 ? 'mt-5 pt-4 border-t border-slate-100' : ''}`}>
                <div className="absolute left-0 top-1 w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                <div className="absolute left-0.5 top-3 w-0.5 h-full bg-slate-100"></div>
                <div className="flex justify-between items-baseline mb-0.5">
                  <h3 className="font-bold text-slate-900">{exp.title}</h3>
                  <span className="text-xs text-slate-400">{exp.startDate} – {exp.current ? 'Present' : exp.endDate}</span>
                </div>
                <p className="text-sm text-amber-600 font-medium mb-1.5">{exp.company} • {exp.location}</p>
                <ul className="space-y-1 text-sm text-slate-600">
                  {exp.highlights.slice(0, 3).map((highlight, i) => (
                    <li key={i} className="leading-relaxed">- {highlight}</li>
                  ))}
                </ul>
              </div>
            ))}
          </section>

          {/* Right Column - Education & Accolades */}
          <div className="col-span-1">
            {/* Education */}
            <section className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-amber-500" />
                Education
              </h2>
              {education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-semibold text-sm text-slate-900">{edu.degree}</p>
                  <p className="text-xs text-slate-600">{edu.field}</p>
                  <p className="text-xs text-slate-500">{edu.institution}</p>
                  <p className="text-xs text-slate-400">{edu.graduationDate}</p>
                </div>
              ))}
            </section>

            {/* Recognition */}
            {achievements && achievements.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-amber-500" />
                  Recognition
                </h2>
                <ul className="space-y-2">
                  {achievements.slice(0, 4).map((achievement) => (
                    <li key={achievement.id} className="text-xs">
                      <span className="font-semibold text-slate-900">{achievement.title}</span>
                      <br />
                      <span className="text-slate-500">{achievement.date}</span>
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Certifications */}
            {certifications && certifications.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Credentials
                </h2>
                <ul className="space-y-1 text-xs text-slate-600">
                  {certifications.map((cert) => (
                    <li key={cert.id}>{cert.name}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Languages */}
            {languages && languages.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2">
                  Languages
                </h2>
                <ul className="space-y-0.5 text-xs text-slate-600">
                  {languages.map((lang) => (
                    <li key={lang.name} className="capitalize">{lang.name} — {lang.proficiency}</li>
                  ))}
                </ul>
              </section>
            )}

            {/* Affiliations */}
            {memberships && memberships.length > 0 && (
              <section className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-2 flex items-center gap-2">
                  <Users className="w-3 h-3 text-amber-500" />
                  Affiliations
                </h2>
                <ul className="space-y-0.5 text-xs text-slate-600">
                  {memberships.map((m) => (
                    <li key={m.id}>{m.organization}</li>
                  ))}
                </ul>
              </section>
            )}
          </div>
        </div>

        {/* Community & Giving Back */}
        {volunteer && volunteer.length > 0 && (
          <section className="mb-5 mt-4 pt-4 border-t border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-500 mb-3 flex items-center gap-2">
              Giving Back
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {volunteer.map((v) => (
                <div key={v.id} className="bg-slate-50 p-3 rounded-lg">
                  <p className="font-semibold text-sm text-slate-900">{v.role}</p>
                  <p className="text-xs text-slate-600">{v.organization}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* References */}
        {references && references.length > 0 && (
          <footer className="mt-5 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">References</h3>
              <p className="text-xs text-slate-500">Available upon request</p>
            </div>
          </footer>
        )}
      </main>
    </article>
  );
}
