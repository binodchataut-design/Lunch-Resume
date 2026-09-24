export interface Experience {
  id: string;
  company: string;
  role: string;
  period: string;
  description: string;
  employmentType?: string;
  location?: string;
  achievements?: string[];
}

export interface Education {
  id: string;
  school: string;
  degree: string;
  period: string;
  location?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string;
  github?: string;
  website?: string;
  achievements?: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  credentialUrl?: string;
}

export interface Language {
  id: string;
  name: string;
  proficiency: 'Native' | 'Fluent' | 'Professional' | 'Conversational' | 'Beginner';
}

export interface Award {
  id: string;
  title: string;
  issuer: string;
  date: string;
  description: string;
}

export interface Reference {
  id: string;
  name: string;
  company: string;
  position: string;
  email?: string;
  phone?: string;
  text?: string;
}

export interface ResumeData {
  personalInfo: {
    fullName: string;
    title: string;
    email: string;
    phone: string;
    location: string;
    website: string;
    photo?: string;
  };
  summary: string;
  experiences: Experience[];
  educations: Education[];
  projects: Project[];
  skills: string[];
  certifications?: Certification[];
  languages?: Language[];
  awards?: Award[];
  references?: Reference[];
}

export type TemplateType = 
  | 'executive-elite'
  | 'corporate-pro'
  | 'finance-authority'
  | 'healthcare-professional'
  | 'legal-professional'
  | 'education-leader'
  | 'government-professional'
  | 'modern-tech'
  | 'creative-edge'
  | 'personal-brand'
  | 'classic'
  | 'modern'
  | 'minimalist'
  | 'creative';

export interface StyleConfig {
  template: TemplateType;
  primaryColor: string;
  fontFamily: 'serif' | 'sans' | 'mono' | 'elegant' | 'slab' | 'space' | 'outfit';
  spacing: 'compact' | 'normal' | 'relaxed';
  lengthTarget: 'auto' | '1-page' | '2-page';
  enableAutoFit?: boolean;
  autoFitMode?: 'strict' | 'preferred';
  paperSize: 'letter' | 'A4';
  fontSize?: number;
  lineHeight?: number;
  sectionSpacing?: number;
  pageMargin?: number;
  marginTop?: number;
  marginBottom?: number;
  marginLeft?: number;
  marginRight?: number;
  borderRadius?: number;
  layout?: 'single' | 'two-column' | 'sidebar-left' | 'sidebar-right' | 'hybrid';
  headerStyle?: 'centered' | 'left' | 'executive' | 'minimal' | 'modern' | 'classic';
  iconStyle?: 'visible' | 'hidden';
  photoStyle?: 'circle' | 'rounded' | 'square' | 'hidden';
  backgroundColor?: string;
  themePreset?: string;
  secondaryColor?: string;
  accentColor?: string;
  headingColor?: string;
  bodyTextColor?: string;
  linkColor?: string;
  dividerColor?: string;
  sidebarColor?: string;
  skillChipColor?: string;
  timelineColor?: string;
  bulletColor?: string;
  sectionLabelColor?: string;
  fontHeading?: string;
  fontBody?: string;
  fontName?: string;
  headingSize?: number;
  bodySize?: number;
  sectionSize?: number;
  nameSize?: number;
  letterSpacing?: number;
  wordSpacing?: number;
  paragraphSpacing?: number;
  fontWeight?: string;
  textTransformHeading?: string;
  fontStyleHeading?: string;
  textTransformName?: string;
  customHeaders?: {
    summary?: string;
    experience?: string;
    education?: string;
    skills?: string;
    projects?: string;
    certifications?: string;
    achievements?: string;
  };
  visibleSections?: {
    summary?: boolean;
    experience?: boolean;
    education?: boolean;
    skills?: boolean;
    projects?: boolean;
    certifications?: boolean;
    achievements?: boolean;
    references?: boolean;
    languages?: boolean;
  };
}

export interface TemplateProps {
  data: any;
  className?: string;
}

export interface TemplateMetadata {
  id: string;
  name: string;
  category: string;
  atsScore: number;
  bestFor: string[];
  targetAudience: string[];
  pagesSupported: number[];
  photoSupported: boolean;
  description: string;
  defaultColors?: { primary: string; secondary: string; background: string };
  defaultTypography?: { heading: string; body: string };
}

