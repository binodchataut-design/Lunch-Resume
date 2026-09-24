import { TemplateMetadata } from '../types/template';

export const templatesList: TemplateMetadata[] = [
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    category: 'Executive',
    atsScore: 99,
    bestFor: ['Executive', 'Finance', 'Leadership', 'C-Suite'],
    targetAudience: ['CEO', 'CFO', 'Director', 'Vice President'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Classic executive resume with centered header, serif typography, and traditional formatting. Ideal for senior leadership positions.',
    defaultColors: { primary: '#0f172a', secondary: '#475569', background: '#ffffff' },
    defaultTypography: { heading: 'Playfair Display', body: 'Inter' }
  },
  {
    id: 'corporate-pro',
    name: 'Corporate Pro',
    category: 'Professional',
    atsScore: 99,
    bestFor: ['Project Management', 'Operations', 'Program Management'],
    targetAudience: ['Operations Manager', 'Project Manager', 'Program Manager'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Modern professional template with accent bars, skill level indicators, and project highlights. Perfect for operations and project professionals.',
    defaultColors: { primary: '#1e3a8a', secondary: '#334155', background: '#ffffff' },
    defaultTypography: { heading: 'Inter', body: 'Inter' }
  },
  {
    id: 'finance-authority',
    name: 'Finance Authority',
    category: 'Professional',
    atsScore: 98,
    bestFor: ['Accounting', 'Financial Analysis', 'Auditing', 'Finance'],
    targetAudience: ['Accountant', 'Financial Analyst', 'Auditor', 'Finance Manager'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Finance-focused template with timeline-style experience, competency grid, and clean emerald accents. Optimized for financial roles.',
    defaultColors: { primary: '#064e3b', secondary: '#1e293b', background: '#ffffff' },
    defaultTypography: { heading: 'Cinzel', body: 'Source Sans' }
  },
  {
    id: 'healthcare-professional',
    name: 'Healthcare Professional',
    category: 'Professional',
    atsScore: 98,
    bestFor: ['Healthcare', 'Medical', 'Public Health', 'Clinical'],
    targetAudience: ['Doctor', 'Nurse', 'Public Health Specialist', 'Medical Administrator'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Healthcare-focused template with medical styling, certification emphasis, and program/project highlights. Ideal for medical professionals.',
    defaultColors: { primary: '#0891b2', secondary: '#334155', background: '#ffffff' },
    defaultTypography: { heading: 'Outfit', body: 'Inter' }
  },
  {
    id: 'legal-professional',
    name: 'Legal Professional',
    category: 'Professional',
    atsScore: 99,
    bestFor: ['Law', 'Legal', 'Compliance', 'Corporate Counsel'],
    targetAudience: ['Lawyer', 'Legal Officer', 'Compliance Manager', 'Attorney'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Traditional legal resume with serif typography, bar admissions section, and pro bono highlights. Perfect for legal professionals.',
    defaultColors: { primary: '#1e1b4b', secondary: '#475569', background: '#ffffff' },
    defaultTypography: { heading: 'Lora', body: 'Lora' }
  },
  {
    id: 'education-leader',
    name: 'Education Leader',
    category: 'Professional',
    atsScore: 98,
    bestFor: ['Education', 'Academic', 'Teaching', 'Administration'],
    targetAudience: ['Teacher', 'Professor', 'School Principal', 'Education Specialist'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Academic-focused template with research highlights, teaching experience, and professional affiliations. Ideal for educators.',
    defaultColors: { primary: '#581c87', secondary: '#475569', background: '#ffffff' },
    defaultTypography: { heading: 'Merriweather', body: 'Inter' }
  },
  {
    id: 'government-professional',
    name: 'Government Professional',
    category: 'Professional',
    atsScore: 99,
    bestFor: ['Government', 'Public Sector', 'Development', 'Policy'],
    targetAudience: ['Government Officer', 'Development Sector Professional', 'Policy Analyst', 'Project Coordinator'],
    pagesSupported: [1, 2],
    photoSupported: false,
    description: 'Formal government-style template with program highlights, language proficiency, and community engagement. Perfect for public sector roles.',
    defaultColors: { primary: '#1e3a8a', secondary: '#334155', background: '#ffffff' },
    defaultTypography: { heading: 'Arimo', body: 'Arimo' }
  },
  {
    id: 'modern-tech',
    name: 'Modern Tech',
    category: 'Tech',
    atsScore: 95,
    bestFor: ['Software Engineering', 'Data Science', 'DevOps', 'Technology'],
    targetAudience: ['Software Engineer', 'Data Analyst', 'DevOps Engineer', 'Technical Lead'],
    pagesSupported: [1, 2],
    photoSupported: true,
    description: 'Two-column tech template with dark sidebar, technical skill bars, featured projects, and photo support. Perfect for tech professionals.',
    defaultColors: { primary: '#0f172a', secondary: '#06b6d4', background: '#f8fafc' },
    defaultTypography: { heading: 'JetBrains Mono', body: 'Inter' }
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    category: 'Creative',
    atsScore: 94,
    bestFor: ['Design', 'Marketing', 'Creative', 'Branding'],
    targetAudience: ['UI Designer', 'Graphic Designer', 'Marketing Specialist', 'Creative Director'],
    pagesSupported: [1, 2],
    photoSupported: true,
    description: 'Vibrant creative template with gradient sidebar, featured work section, and award showcase. Ideal for creative professionals.',
    defaultColors: { primary: '#ec4899', secondary: '#8b5cf6', background: '#fdf2f8' },
    defaultTypography: { heading: 'Space Grotesk', body: 'Space Grotesk' }
  },
  {
    id: 'personal-brand',
    name: 'Personal Brand',
    category: 'Creative',
    atsScore: 95,
    bestFor: ['Consulting', 'Entrepreneurship', 'Freelance', 'Advisory'],
    targetAudience: ['Consultant', 'Entrepreneur', 'Freelancer', 'Advisor'],
    pagesSupported: [1, 2],
    photoSupported: true,
    description: 'Premium personal branding template with hero section, expertise tags, and three-column layout. Perfect for consultants and entrepreneurs.',
    defaultColors: { primary: '#b45309', secondary: '#1e293b', background: '#fffbeb' },
    defaultTypography: { heading: 'Cinzel', body: 'Inter' }
  }
];

type Listener = (state: { currentTemplateId: string; templates: TemplateMetadata[] }) => void;

class TemplateStore {
  private currentTemplateId = 'executive-elite';
  private listeners = new Set<Listener>();

  getState = () => {
    return {
      currentTemplateId: this.currentTemplateId,
      templates: templatesList
    };
  };

  getCurrentTemplate = (): TemplateMetadata => {
    return templatesList.find(t => t.id === this.currentTemplateId) || templatesList[0];
  };

  setTemplate = (templateId: string) => {
    this.currentTemplateId = templateId;
    this.notify();

    // Sync to ResumeDesignStore as well
    import('./ResumeDesignStore').then(m => {
      m.ResumeDesignStore.setTemplate(templateId);
    });
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    const s = this.getState();
    this.listeners.forEach(l => l(s));
  }
}

export const ResumeTemplateStore = new TemplateStore();
