import type { TemplateMetadata } from '../types/resume';

export const templateMetadata: TemplateMetadata[] = [
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    category: 'professional',
    atsScore: 99,
    bestFor: ['Executive', 'Finance', 'Leadership', 'C-Suite'],
    targetAudience: ['CEO', 'CFO', 'Director', 'Vice President'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Classic executive resume with centered header, serif typography, and traditional formatting. Ideal for senior leadership positions.'
  },
  {
    id: 'corporate-pro',
    name: 'Corporate Pro',
    category: 'professional',
    atsScore: 99,
    bestFor: ['Project Management', 'Operations', 'Program Management'],
    targetAudience: ['Operations Manager', 'Project Manager', 'Program Manager'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Modern professional template with accent bars, skill level indicators, and project highlights. Perfect for operations and project professionals.'
  },
  {
    id: 'finance-authority',
    name: 'Finance Authority',
    category: 'professional',
    atsScore: 98,
    bestFor: ['Accounting', 'Financial Analysis', 'Auditing', 'Finance'],
    targetAudience: ['Accountant', 'Financial Analyst', 'Auditor', 'Finance Manager'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Finance-focused template with timeline-style experience, competency grid, and clean emerald accents. Optimized for financial roles.'
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    category: 'professional',
    atsScore: 98,
    bestFor: ['Healthcare', 'Medical', 'Public Health', 'Clinical'],
    targetAudience: ['Doctor', 'Nurse', 'Public Health Specialist', 'Medical Administrator'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Healthcare-focused template with medical styling, certification emphasis, and program/project highlights. Ideal for medical professionals.'
  },
  {
    id: 'legal-professional',
    name: 'Legal Professional',
    category: 'professional',
    atsScore: 99,
    bestFor: ['Law', 'Legal', 'Compliance', 'Corporate Counsel'],
    targetAudience: ['Lawyer', 'Legal Officer', 'Compliance Manager', 'Attorney'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Traditional legal resume with serif typography, bar admissions section, and pro bono highlights. Perfect for legal professionals.'
  },
  {
    id: 'education-leader',
    name: 'Education Leader',
    category: 'professional',
    atsScore: 98,
    bestFor: ['Education', 'Academic', 'Teaching', 'Administration'],
    targetAudience: ['Teacher', 'Professor', 'School Principal', 'Education Specialist'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Academic-focused template with research highlights, teaching experience, and professional affiliations. Ideal for educators.'
  },
  {
    id: 'government-professional',
    name: 'Government Professional',
    category: 'professional',
    atsScore: 99,
    bestFor: ['Government', 'Public Sector', 'Development', 'Policy'],
    targetAudience: ['Government Officer', 'Development Sector Professional', 'Policy Analyst', 'Project Coordinator'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Formal government-style template with program highlights, language proficiency, and community engagement. Perfect for public sector roles.'
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    category: 'modern',
    atsScore: 95,
    bestFor: ['Software Engineering', 'Data Science', 'DevOps', 'Technology'],
    targetAudience: ['Software Engineer', 'Data Analyst', 'DevOps Engineer', 'Technical Lead'],
    pagesSupported: [1, 2],
    photoSupported: true,
    description: 'Two-column tech template with dark sidebar, technical skill bars, featured projects, and photo support. Perfect for tech professionals.'
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    category: 'modern',
    atsScore: 94,
    bestFor: ['Design', 'Marketing', 'Creative', 'Branding'],
    targetAudience:['UI Designer', 'Graphic Designer', 'Marketing Specialist', 'Creative Director'],
    pagesSupported: [1, 2],
    photoSupported: true,
    description: 'Vibrant creative template with gradient sidebar, featured work section, and award showcase. Ideal for creative professionals.'
  },
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    category: 'modern',
    atsScore: 95,
    bestFor: ['Consulting', 'Entrepreneurship', 'Freelance', 'Advisory'],
    targetAudience: ['Consultant', 'Entrepreneur', 'Freelancer', 'Advisor'],
    pagesSupported: [1, 2],
    photoSupported: true,
    description: 'Premium personal branding template with hero section, expertise tags, and three-column layout. Perfect for consultants and entrepreneurs.'
  }
];

export function getTemplateById(id: string) {
  return templateMetadata.find(t => t.id === id);
}

export function getTemplatesByCategory(category: 'professional' | 'modern') {
  return templateMetadata.filter(t => t.category === category);
}

export function getTemplatesForRole(role: string) {
  return templateMetadata.filter(t =>
    t.targetAudience.some(a => a.toLowerCase().includes(role.toLowerCase())) ||
    t.bestFor.some(b => b.toLowerCase().includes(role.toLowerCase()))
  );
}
