export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  badge: string;
  typePreset: string;
  icon: string;
}

export interface RunwayLayout {
  key: string;
  tier: string;
  title: string;
  description: string;
  buttonText: string;
}

export interface RoadmapStep {
  stepNumber: string;
  boldNumber: string;
  title: string;
  description: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface HomepageContent {
  hero: {
    badge: string;
    title: string;
    subtitle: string;
    primaryActionLabel: string;
    secondaryActionLabel: string;
    scrollIndicator: string;
  };
  utility: {
    badge: string;
    title: string;
    subtitle: string;
    pillars: Pillar[];
  };
  targetFormats: {
    badge: string;
    title: string;
    subtitle: string;
    layouts: RunwayLayout[];
  };
  roadmap: {
    badge: string;
    title: string;
    subtitle: string;
    steps: RoadmapStep[];
  };
  noiseBarrier: {
    badge: string;
    title: string;
    studyIndexLabel: string;
    studyIndexTitle: string;
    studyIndexDescription: string;
    descriptionParagraphs: string[];
  };
  manifesto: {
    badge: string;
    title: string;
    paragraphs: string[];
    listItems: string[];
    footnote: string;
  };
  faqs: {
    title: string;
    items: FAQItem[];
  };
}

export interface ResumeTemplate {
  key: string;
  label: string;
}

export interface CoverLetterTemplate {
  key: string;
  label: string;
}

export interface SiteConfig {
  name: string;
  nameSuffix: string;
  logoAcronym: string;
  noPaywallsBadge: string;
  tagline: string;
  subheading: string;
  links: {
    templates: string;
    builder: string;
    coverletter: string;
    blogs: string;
    login: string;
    cta: string;
  };
  footer: {
    title: string;
    titleColored: string;
    description: string;
    sandboxedLabel: string;
    copyright: string;
  };
}

export interface SeoPageMetadata {
  title: string;
  description: string;
  canonical: string;
}

export interface SeoMetadataConfig {
  home: SeoPageMetadata;
  resumeBuilder: SeoPageMetadata;
  coverLetterBuilder: SeoPageMetadata;
  blog: SeoPageMetadata;
  default: SeoPageMetadata;
}

export interface ResumeExample {
  slug: string;
  jobTitle: string;
  industry: string;
  summary: string;
  sampleExperience: string[];
  sampleSkills: string[];
  keyAchievements: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface ResumeTemplatePage {
  slug: string;
  templateName: string;
  bestFor: string;
  description: string;
  strengths: string[];
  recommendedIndustries: string[];
  seoTitle: string;
  seoDescription: string;
}

export interface CoverLetterExample {
  slug: string;
  jobTitle: string;
  industry: string;
  introduction: string;
  bodyParagraphs: string[];
  closingParagraph: string;
  keyStrengths: string[];
  seoTitle: string;
  seoDescription: string;
}

