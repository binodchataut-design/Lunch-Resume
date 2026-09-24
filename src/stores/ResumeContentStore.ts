import { ResumeData, Experience, Education, Project, Certification, Language, Award, Reference } from '../types/resume';

export const EMPTY_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: '',
    title: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    photo: ''
  },
  summary: '',
  experiences: [],
  educations: [],
  projects: [],
  skills: [],
  certifications: [],
  languages: [],
  awards: [],
  references: []
};

export const SEED_RESUME_DATA: ResumeData = {
  personalInfo: {
    fullName: 'Alexander Wright',
    title: 'Senior Software Architect',
    email: 'alexander.wright@techspace.io',
    phone: '+1 (555) 019-2834',
    location: 'San Francisco, CA',
    website: 'https://wrightarchitects.dev',
    photo: ''
  },
  summary: 'A highly strategic, performance-driven Software Architect with 8+ years of dedicated expertise building high-scale cloud platforms and interactive modern interfaces. Proven champion of robust architectural paradigms, team leadership, and accelerating sprint delivery lifecycles.',
  experiences: [
    {
      id: 'exp-1',
      company: 'Stripe, Inc.',
      role: 'Lead Full-Stack Engineer',
      period: '2023 - Present',
      description: '• Spearheaded architectural migration of global payment gateway integrations to high-performance microservices, slashing transaction response latency by 35%.\n• Governed dynamic agile sprints for an 11-member engineering squad, delivering high-priority checkout redesign 2 weeks ahead of target launch.\n• Implemented automated visual regression testing cycles and strict TypeScript type boundaries, decreasing runtime bugs in production environment by 48%.'
    },
    {
      id: 'exp-2',
      company: 'Notion Labs',
      role: 'Senior UI Engineer',
      period: '2020 - 2023',
      description: '• Engineered and optimized critical block-editor workspace components using highly optimized custom rendering pipelines in React, saving 150ms on document loading state.\n• Led collaborative effort with core product design systems, formulating standard component library adopted by 40+ engineering groups.\n• Slashed client bundle load sizing by 22% through aggressive code-splitting, tree-shaking, and lazy asset serialization.'
    }
  ],
  educations: [
    {
      id: 'edu-1',
      school: 'Stanford University',
      degree: 'M.S. in Computer Science',
      period: '2018 - 2020'
    },
    {
      id: 'edu-2',
      school: 'UC Berkeley',
      degree: 'B.S. in Computer Science & Engineering',
      period: '2014 - 2018'
    }
  ],
  projects: [
    {
      id: 'proj-1',
      name: 'OmniCanvas Design Workspace',
      description: 'A fully infinite-canvas vector design platform constructed with raw Canvas API and React, utilizing strict state memoization for sub-millisecond drawing updates.',
      technologies: 'React, TypeScript, WebGL, Canvas API, TailwindCSS',
      github: 'https://github.com/wright/omnicanvas',
      website: 'https://omnicanvas.dev'
    },
    {
      id: 'proj-2',
      name: 'ZenQuery Database Middleware',
      description: 'An asynchronous database query cache middleware that optimizes Postgres query execution by pre-compiling parameterized schemas, managing up to 10k requests per second.',
      technologies: 'Node.js, TypeScript, PostgreSQL, Redis, Docker',
      github: 'https://github.com/wright/zenquery'
    }
  ],
  skills: ["React", "TypeScript", "JavaScript", "Next.js", "Node.js", "System Design", "GraphQL", "TailwindCSS", "PostgreSQL", "Docker", "AWS", "Framer Motion"],
  certifications: [
    {
      id: 'cert-1',
      name: 'AWS Certified Solutions Architect – Professional',
      issuer: 'Amazon Web Services',
      date: 'June 2025',
      credentialId: 'AWS-SAP-88349',
      credentialUrl: 'https://aws.amazon.com/verify/aws-sap'
    },
    {
      id: 'cert-2',
      name: 'Certified ScrumMaster (CSM)',
      issuer: 'Scrum Alliance',
      date: 'March 2024'
    }
  ],
  languages: [
    { id: 'lang-1', name: 'English', proficiency: 'Native' },
    { id: 'lang-2', name: 'Spanish', proficiency: 'Conversational' }
  ],
  awards: [
    {
      id: 'aw-1',
      title: 'Outstanding Technical Leadership Award',
      issuer: 'Stripe Engineering Council',
      date: 'December 2025',
      description: 'Awarded for leading the migration of checkout pipelines with flawless 99.999% uptime.'
    }
  ],
  references: [
    {
      id: 'ref-1',
      name: 'Sarah Jenkins',
      company: 'Stripe, Inc.',
      position: 'Director of Engineering',
      email: 'sjenkins@stripe.com',
      text: 'Alexander possesses an outstanding combination of rigorous technical precision and excellent product leadership. Highly recommended.'
    }
  ]
};

const initialContent: ResumeData = EMPTY_RESUME_DATA;

type Listener = (state: ResumeData) => void;

class ContentStore {
  private state: ResumeData = initialContent;
  private listeners = new Set<Listener>();

  constructor() {
    // Try to load from localStorage if available
    try {
      const saved = localStorage.getItem('lunch_resume_content');
      if (saved) {
        this.state = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load resume content from localStorage', e);
    }
  }

  getState = (): ResumeData => {
    return this.state;
  };

  setState = (nextState: ResumeData | ((prev: ResumeData) => ResumeData)) => {
    const prev = this.state;
    this.state = typeof nextState === 'function' ? nextState(this.state) : nextState;
    
    // Save to localStorage
    try {
      localStorage.setItem('lunch_resume_content', JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save content state', e);
    }

    this.notify();
    
    // Trigger history state addition
    import('./ResumeHistoryStore').then(m => {
      m.ResumeHistoryStore.pushState(this.state, null);
    });
  };

  updatePersonalInfo = (info: Partial<ResumeData['personalInfo']>) => {
    this.setState(prev => ({
      ...prev,
      personalInfo: {
        ...prev.personalInfo,
        ...info
      }
    }));
  };

  updateSummary = (summary: string) => {
    this.setState(prev => ({
      ...prev,
      summary
    }));
  };

  addExperience = (exp: Experience) => {
    this.setState(prev => ({
      ...prev,
      experiences: [...(prev.experiences || []), exp]
    }));
  };

  updateExperience = (id: string, updated: Partial<Experience>) => {
    this.setState(prev => ({
      ...prev,
      experiences: (prev.experiences || []).map(exp => exp.id === id ? { ...exp, ...updated } : exp)
    }));
  };

  removeExperience = (id: string) => {
    this.setState(prev => ({
      ...prev,
      experiences: (prev.experiences || []).filter(exp => exp.id !== id)
    }));
  };

  addEducation = (edu: Education) => {
    this.setState(prev => ({
      ...prev,
      educations: [...(prev.educations || []), edu]
    }));
  };

  updateEducation = (id: string, updated: Partial<Education>) => {
    this.setState(prev => ({
      ...prev,
      educations: (prev.educations || []).map(edu => edu.id === id ? { ...edu, ...updated } : edu)
    }));
  };

  removeEducation = (id: string) => {
    this.setState(prev => ({
      ...prev,
      educations: (prev.educations || []).filter(edu => edu.id !== id)
    }));
  };

  addProject = (proj: Project) => {
    this.setState(prev => ({
      ...prev,
      projects: [...(prev.projects || []), proj]
    }));
  };

  updateProject = (id: string, updated: Partial<Project>) => {
    this.setState(prev => ({
      ...prev,
      projects: (prev.projects || []).map(proj => proj.id === id ? { ...proj, ...updated } : proj)
    }));
  };

  removeProject = (id: string) => {
    this.setState(prev => ({
      ...prev,
      projects: (prev.projects || []).filter(proj => proj.id !== id)
    }));
  };

  addSkill = (skill: string) => {
    this.setState(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills : [...prev.skills, skill]
    }));
  };

  removeSkill = (skill: string) => {
    this.setState(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  setSkills = (skills: string[]) => {
    this.setState(prev => ({
      ...prev,
      skills
    }));
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    this.listeners.forEach(l => l(this.state));
    // Trigger progress update
    import('./ResumeProgressStore').then(m => {
      m.ResumeProgressStore.recalculateProgress();
    });
  }
}

export const ResumeContentStore = new ContentStore();
