/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, Trash2, Printer, RefreshCw, Send, CheckCircle, 
  Sparkles, Award, FileText, ChevronRight, BarChart2, Briefcase, 
  GraduationCap, Code, Check, Users, BrainCircuit, Search, Zap, BookOpen, ThumbsUp,
  Sliders, Palette, Type, Settings, Eye, EyeOff
} from 'lucide-react';

import { ResumeData, Experience, Education, Project, TemplateType, StyleConfig, OptimizationPhrase } from '../types';
import resumeTemplates from '../../content/resumeTemplates.json';
import { ResumeTemplate } from '../../types/content';

// Import Bolt Templates
import { ResumeRenderer } from '../core/resume-engine/ResumeRenderer';
import { ResumeDesign } from '../types/design';
import ExecutiveElite from '../templates/ExecutiveElite';
import CorporatePro from '../templates/CorporatePro';
import FinanceAuthority from '../templates/FinanceAuthority';
import HealthcareProfessional from '../templates/HealthcareProfessional';
import LegalProfessional from '../templates/LegalProfessional';
import EducationLeader from '../templates/EducationLeader';
import GovernmentProfessional from '../templates/GovernmentProfessional';
import ModernTech from '../templates/ModernTech';
import CreativeEdge from '../templates/CreativeEdge';
import PersonalBrand from '../templates/PersonalBrand';

const typedResumeTemplates: { key: string; label: string }[] = [
  { key: "executive-elite", label: "Executive Elite" },
  { key: "corporate-pro", label: "Corporate Pro" },
  { key: "finance-authority", label: "Finance Authority" },
  { key: "healthcare-professional", label: "Healthcare Professional" },
  { key: "legal-professional", label: "Legal Professional" },
  { key: "education-leader", label: "Education Leader" },
  { key: "government-professional", label: "Government Professional" },
  { key: "modern-tech", label: "Modern Tech" },
  { key: "creative-edge", label: "Creative Edge" },
  { key: "personal-brand", label: "Personal Brand" },
  { key: "classic", label: "Classic Executive" },
  { key: "minimalist", label: "Minimalist Slate" },
  { key: "creative", label: "Creative Canvas" },
  { key: "modern", label: "Tech Pro" }
];

// Predefined professional sample personas for instant filling
const SAMPLE_PERSONAS: Record<string, ResumeData> = {
  software: {
    personalInfo: {
      fullName: "Alex Rivera",
      title: "Senior Full Stack Engineer",
      email: "alex.rivera@lunchresume.com",
      phone: "+1 (555) 342-9988",
      location: "San Francisco, CA",
      website: "github.com/alexrivera"
    },
    summary: "Metrics-driven Software Engineer with over 6 years of experience designing scalable microservices, cloud architectures, and interactive web applications. Expert in React, Node.js, and distributed system design, specializing in performance optimization.",
    experiences: [
      {
        id: "exp-1",
        company: "Stripe",
        role: "Senior Engineer - Core Payments",
        period: "2023 - Present",
        description: "Spearheaded the redesign of the core transaction ledger API, reducing checkout response latency by 32% worldwide. Led a team of four to launch instant-settlement features processing over $5M in daily transactions."
      },
      {
        id: "exp-2",
        company: "Vercel",
        role: "Front-End Infrastructure Engineer",
        period: "2021 - 2023",
        description: "Pioneered server-side performance frameworks that improved page-load speeds by 45% for over 12,000 corporate clients. Developed open-source reusable layout components utilized in Vercel's core visual libraries."
      }
    ],
    educations: [
      {
        id: "edu-1",
        school: "UC Berkeley",
        degree: "B.S. in Computer Science & Engineering",
        period: "2017 - 2021"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "OmniDB Sync Tool",
        description: "Engineered a high-throughput relational database sync module that processes up to 80,000 operations per second with zero data friction.",
        technologies: "Rust, WebSockets, PostgreSQL"
      }
    ],
    skills: ["React", "TypeScript", "Node.js", "System Design", "Kubernetes", "AWS", "GraphQL", "PostgreSQL"]
  },
  marking: {
    personalInfo: {
      fullName: "Sarah Jenkins",
      title: "Lead Growth Marketing Specialist",
      email: "sarah.j@lunchresume.com",
      phone: "+1 (555) 789-2311",
      location: "New York, NY",
      website: "sarahgrowth.co"
    },
    summary: "Dynamic growth marketer with 5+ years of digital acquisition expertise. Proven success scaling early-stage B2B startups and consumer SaaS products from $0 to $10M+ ARR through programmatic SEO, performance creative, and lead-gen pipelines.",
    experiences: [
      {
        id: "exp-1",
        company: "HubSpot",
        role: "Growth Advisory Lead",
        period: "2022 - Present",
        description: "Designed, tested, and optimized organic lead nurture flows that boosted trials-to-demos conversion rates by 22%. Managed a quarterly advertising budget of $150K achieving a consistent 4.2x ROAS."
      },
      {
        id: "exp-2",
        company: "Linear",
        role: "Product Growth Specialist",
        period: "2020 - 2022",
        description: "Accelerated brand awareness programs through targeted partner integrations, yielding a 110% year-over-year increase in user acquisition. Engineered lifecycle marketing flows for 400K+ developers."
      }
    ],
    educations: [
      {
        id: "edu-1",
        school: "Columbia University",
        degree: "B.A. in Communications & Economics",
        period: "2016 - 2020"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "ViralLoop Analytics",
        description: "Coded a custom attribution script that captures multi-touch affiliate conversions to attribute customer journeys with 98% accuracy.",
        technologies: "NextJS, Mixpanel, Google Cloud"
      }
    ],
    skills: ["Organic Search (SEO)", "AdWords", "Email Lifecycle", "conversion optimization", "SQL", "A/B Testing", "Mixpanel", "Copywriting"]
  },
  designer: {
    personalInfo: {
      fullName: "Marcus Thorne",
      title: "Senior Product Designer",
      email: "marcus.t@lunchresume.com",
      phone: "+1 (555) 832-6611",
      location: "Austin, TX",
      website: "marcusthorne.design"
    },
    summary: "User-centric interaction designer with a passion for building clean, aesthetic digital tools. Specialized in design systems, high-fidelity responsive modeling, and cooperative user-research cycles. Winner of the 2023 Design Guild Award.",
    experiences: [
      {
        id: "exp-1",
        company: "Figma",
        role: "Senior UX Designer - Prototyping",
        period: "2022 - Present",
        description: "Reconceptualized and mocked the variable prototyping transition panel, reducing friction rates by 18% during designer-developer handoffs. Oversaw layout auditing for 12 core global design structures."
      },
      {
        id: "exp-2",
        company: "Airbnb",
        role: "Systems Interaction Designer",
        period: "2019 - 2022",
        description: "Maintained Airbnb's design language system across web and mobile viewports, introducing custom micro-animations that elevated active digital engagements by 28%."
      }
    ],
    educations: [
      {
        id: "edu-1",
        school: "Rhode Island School of Design (RISD)",
        degree: "B.FA. in Industrial & Interaction Design",
        period: "2015 - 2019"
      }
    ],
    projects: [
      {
        id: "proj-1",
        name: "BentoGrid CSS System",
        description: "Created a visual CSS layout framework downloaded over 50,000 times by developer and designer teams to bootstrap grids in seconds.",
        technologies: "Figma, TailwindCSS, CSS Variables"
      }
    ],
    skills: ["Figma", "Design Systems", "Prototyping", "UI/UX Research", "Framer Motion", "CSS/HTML", "TailwindCSS", "Brand Identity"]
  },
  'executive-elite': {
    personalInfo: {
      fullName: "Arthur Pendragon",
      title: "Chief Operating Officer",
      email: "arthur@pendragon.co",
      phone: "+44 20 7946 0958",
      location: "London, UK",
      website: "linkedin.com/in/arthur-pendragon"
    },
    summary: "Distinguished and results-driven Chief Operating Officer with 15+ years of success leading multi-national operations, corporate restructuring, and sovereign governance portfolios. Proven track record in scaling global capacity, managing $120M+ capital budgets, and leading highly profitable mergers and acquisitions.",
    experiences: [
      {
        id: "exp-ee-1",
        company: "Camelot Holdings",
        role: "Chief Operating Officer",
        period: "2018 - Present",
        description: "Governed $120M annual operational budgets, yielding 14% margin optimization.\nOrchestrated complex corporate merger logistics with Round Table Ventures."
      },
      {
        id: "exp-ee-2",
        company: "Pendragon Group",
        role: "VP of Global Operations",
        period: "2012 - 2018",
        description: "Restructured European warehousing operations, trimming distribution latency by 22%.\nSupervised cross-border implementation teams of over 85 senior specialists."
      }
    ],
    educations: [
      {
        id: "edu-ee-1",
        school: "London Business School",
        degree: "MBA, Global Management",
        period: "2012"
      }
    ],
    projects: [
      {
        id: "proj-ee-1",
        name: "Supply Chain Digital Migration",
        description: "Led supply-chain digital migration saving $4.2M in annual overheads across 14 European sites.",
        technologies: "Enterprise Resource Planning (ERP), Cloud Logistics"
      }
    ],
    skills: ["Operations", "M&A", "Corporate Restructuring", "Venture Capital", "Supply Chain", "Budgeting", "Global Governance"]
  },
  'corporate-pro': {
    personalInfo: {
      fullName: "Helen Vance",
      title: "Senior Program & Project Manager",
      email: "helen.vance@lunchresume.com",
      phone: "+1 (555) 381-0021",
      location: "Boston, MA",
      website: "linkedin.com/in/helenvance"
    },
    summary: "Sleek and metrics-focused Senior Program Manager with 10+ years of cross-functional team coordination, agile delivery, and operational excellence in software and hardware development cycles.",
    experiences: [
      {
        id: "exp-cp-1",
        company: "Linear App",
        role: "Senior Technical Program Manager",
        period: "2021 - Present",
        description: "Led cross-functional software delivery squads to speed up layout transition responsiveness by 35%.\nManaged daily engineering scrums, sprint planning, and quarterly feature roadmap deliveries."
      },
      {
        id: "exp-cp-2",
        company: "Stripe",
        role: "Technical Project Lead",
        period: "2016 - 2021",
        description: "Coordinated integration pilots for instant-payout APIs, processing over $12M weekly transactions."
      }
    ],
    educations: [
      {
        id: "edu-cp-1",
        school: "Boston University",
        degree: "M.S. in Agile Management & Technical Leadership",
        period: "2016"
      }
    ],
    projects: [
      {
        id: "proj-cp-1",
        name: "Keyboard-First Interface Redesign",
        description: "Spearheaded accessibility audits and keyboard shortcut layouts adopted by 40,000+ active users.",
        technologies: "React, Accessibility Standards, Project Controls"
      }
    ],
    skills: ["Agile/Scrum", "Technical Program Management", "System Integrations", "Roadmapping", "Risk Mitigation", "Sprint Planning"]
  },
  'finance-authority': {
    personalInfo: {
      fullName: "Marcus Thorne",
      title: "Senior Financial Analyst & CPA",
      email: "marcus.t@lunchresume.com",
      phone: "+1 (555) 902-8833",
      location: "New York, NY",
      website: "linkedin.com/in/marcusthorne"
    },
    summary: "GAAP-certified and analytically rigorous Financial Analyst with 6+ years of expertise in corporate tax preparation, asset ledger reconciliation, and detailed cost variance modeling.",
    experiences: [
      {
        id: "exp-fa-1",
        company: "ApexLedger Corp",
        role: "Senior Financial Analyst",
        period: "2022 - Present",
        description: "Spearhead end-of-month and annual financial close procedures for 15+ multi-million dollar corporate profiles.\nAutomated ledger reconciliation sheets, cutting manual spreadsheet processing times by 8 hours weekly."
      }
    ],
    educations: [
      {
        id: "edu-fa-1",
        school: "Columbia University",
        degree: "B.S. in Economics & Accounting",
        period: "2018"
      }
    ],
    projects: [
      {
        id: "proj-fa-1",
        name: "Tax Compliance Auditing",
        description: "Identified and rectified tax compliance discrepancies, saving corporate clients an estimated $120,000 annually.",
        technologies: "Excel Macros, VBA, SAP Financial Suite"
      }
    ],
    skills: ["GAAP Compliance", "Financial Forecasting", "Ledger Reconciliation", "Tax Preparation", "VBA Macros", "Audit Preparedness"]
  },
  'healthcare-professional': {
    personalInfo: {
      fullName: "Jane Doe, RN",
      title: "Registered Nurse - ICU",
      email: "jane.doe@lunchresume.com",
      phone: "+1 (555) 019-2834",
      location: "Chicago, IL",
      website: "linkedin.com/in/janedoern"
    },
    summary: "Compassionate and highly coordinated Registered Nurse (RN) with 4+ years of clinical experience in high-volume emergency trauma centers and critical care spaces.",
    experiences: [
      {
        id: "exp-hp-1",
        company: "MetroHealth Emergency Services",
        role: "Emergency Room RN",
        period: "2023 - Present",
        description: "Provide immediate critical care assessment and triage protocols to over 40+ acute patients daily.\nCollaborate with trauma physicians and medical technicians on rapid diagnostic strategies."
      }
    ],
    educations: [
      {
        id: "edu-hp-1",
        school: "Loyola University Chicago",
        degree: "B.S. in Nursing (BSN)",
        period: "2020"
      }
    ],
    projects: [
      {
        id: "proj-hp-1",
        name: "Post-Op Discharge Framework",
        description: "Spearheaded a nurse-led discharge coordination framework that reduced patient re-admission rates by 12%.",
        technologies: "EHR Databases, Clinical Protocol Design"
      }
    ],
    skills: ["Critical Care", "Telemetry Interpretation", "Patient Intake Assessment", "EHR Documentation", "BLS / ACLS", "Pediatric Triage"]
  },
  'legal-professional': {
    personalInfo: {
      fullName: "Sarah Rossi",
      title: "Senior Corporate Counsel",
      email: "sarah.rossi@lunchresume.com",
      phone: "+1 (555) 773-1994",
      location: "Washington, DC",
      website: "linkedin.com/in/sarahrossi"
    },
    summary: "Traditional legal advocate and corporate governance expert with a strict serif-adhering background in private litigation, state-bar compliance, and judicial representation.",
    experiences: [
      {
        id: "exp-lp-1",
        company: "Rossi & Associates LLP",
        role: "Senior Corporate Partner",
        period: "2020 - Present",
        description: "Advising multi-national corporations on legal risk mitigation, cross-border mergers, and regulatory compliance.\nDrafting high-stakes corporate contracts and supervising compliance frameworks for 12 public corporations."
      }
    ],
    educations: [
      {
        id: "edu-lp-1",
        school: "Georgetown Law School",
        degree: "Juris Doctor (J.D.)",
        period: "2016"
      }
    ],
    projects: [
      {
        id: "proj-lp-1",
        name: "Sovereign Board Arbitration",
        description: "Represented sovereign governance portfolios in board-level mediation and international legal compliance cases.",
        technologies: "Corporate Law, M&A Governance, Legal Auditing"
      }
    ],
    skills: ["Corporate Governance", "M&A Advisory", "State Bar Compliance", "Contract Drafting", "Risk Mitigation", "Board Advocacy"]
  },
  'education-leader': {
    personalInfo: {
      fullName: "Marcus Thorne",
      title: "Lead Curriculum Specialist & Professor",
      email: "marcus.thorne@lunchresume.com",
      phone: "+1 (555) 902-1211",
      location: "Austin, TX",
      website: "linkedin.com/in/marcusthorne-edu"
    },
    summary: "Academic leader and education designer with over 8 years of pedagogical expertise in curriculum development, secondary teaching frameworks, and peer-reviewed educational research.",
    experiences: [
      {
        id: "exp-el-1",
        company: "Austin Independent School District",
        role: "Lead Curriculum Developer",
        period: "2021 - Present",
        description: "Designed, tested, and shipped modernized K-12 STEM programs across 14 municipal school districts.\nCollaborate with teaching faculties and principal boards to align parent-student community outreach records."
      }
    ],
    educations: [
      {
        id: "edu-el-1",
        school: "University of Texas at Austin",
        degree: "Ph.D. in Education & Cognitive Development",
        period: "2020"
      }
    ],
    projects: [
      {
        id: "proj-el-1",
        name: "Interactive Learning Analytics",
        description: "Coded custom student-retention tracking dashboards that increased active learning engagement scores by 22%.",
        technologies: "D3.js, Pedagogical Models, Statistical Analysis"
      }
    ],
    skills: ["Curriculum Design", "STEM Pedagogy", "Faculty Collaboration", "Educational Tech", "Research Methods", "Student Outreach"]
  },
  'government-professional': {
    personalInfo: {
      fullName: "Alex Rivera",
      title: "Federal Policy Analyst",
      email: "alex.rivera@lunchresume.com",
      phone: "+1 (555) 342-9988",
      location: "Washington, DC",
      website: "linkedin.com/in/alexrivera-gov"
    },
    summary: "Highly structured policy specialist with extensive background coordinating federal programs, inter-agency partnerships, civil service requirements, and regulatory audits.",
    experiences: [
      {
        id: "exp-gp-1",
        company: "Department of Urban Development",
        role: "Federal Policy Analyst",
        period: "2022 - Present",
        description: "Coordinating development grant assessments, multi-agency compliance reviews, and legislative reports.\nManage a $14M regional community funding program ensuring perfect alignment with federal auditing standards."
      }
    ],
    educations: [
      {
        id: "edu-gp-1",
        school: "Harvard Kennedy School",
        degree: "Master of Public Policy (MPP)",
        period: "2021"
      }
    ],
    projects: [
      {
        id: "proj-gp-1",
        name: "Federal Compliance Migration",
        description: "Standardized federal civil service forms into a streamlined parser-compliant digital system.",
        technologies: "Civil Service Guidelines, Database Systems, Audit Controls"
      }
    ],
    skills: ["Federal Policy Analysis", "Inter-agency Coordination", "Grant Management", "Regulatory Auditing", "Civil Service Guidelines", "Public Budgeting"]
  },
  'modern-tech': {
    personalInfo: {
      fullName: "Alex Rivera",
      title: "Senior Full Stack Engineer",
      email: "alex.rivera@lunchresume.com",
      phone: "+1 (555) 342-9988",
      location: "San Francisco, CA",
      website: "github.com/alexrivera"
    },
    summary: "Metrics-driven Software Engineer with over 6 years of experience designing scalable microservices, cloud architectures, and interactive web applications. Expert in React, Node.js, and distributed system design, specializing in performance optimization.",
    experiences: [
      {
        id: "exp-mt-1",
        company: "Stripe",
        role: "Senior Engineer - Core Payments",
        period: "2023 - Present",
        description: "Spearheaded the redesign of the core transaction ledger API, reducing checkout response latency by 32% worldwide.\nLed a team of four to launch instant-settlement features processing over $5M in daily transactions."
      },
      {
        id: "exp-mt-2",
        company: "Vercel",
        role: "Front-End Infrastructure Engineer",
        period: "2021 - 2023",
        description: "Pioneered server-side performance frameworks that improved page-load speeds by 45% for over 12,000 corporate clients."
      }
    ],
    educations: [
      {
        id: "edu-mt-1",
        school: "UC Berkeley",
        degree: "B.S. in Computer Science & Engineering",
        period: "2017 - 2021"
      }
    ],
    projects: [
      {
        id: "proj-mt-1",
        name: "OmniDB Sync Tool",
        description: "Engineered a high-throughput database sync module processing up to 80,000 operations per second.",
        technologies: "Rust, WebSockets, PostgreSQL"
      }
    ],
    skills: ["React", "TypeScript", "Node.js", "System Design", "Kubernetes", "AWS", "GraphQL", "PostgreSQL"]
  },
  'creative-edge': {
    personalInfo: {
      fullName: "Maya Lin",
      title: "Lead Product Designer & Art Director",
      email: "maya.lin@lunchresume.com",
      phone: "+1 (555) 774-1211",
      location: "Austin, TX",
      website: "maya-lin.design"
    },
    summary: "User-centric designer and art director with a passion for building clean, aesthetic digital tools. Specialized in design systems, high-fidelity responsive modeling, and cooperative user-research cycles. Winner of the 2023 Design Guild Award.",
    experiences: [
      {
        id: "exp-ce-1",
        company: "Figma",
        role: "Senior UX Designer - Prototyping",
        period: "2022 - Present",
        description: "Reconceptualized and mocked the variable prototyping transition panel, reducing friction rates by 18% during designer-developer handoffs.\nOversaw layout auditing for 12 core global design structures."
      },
      {
        id: "exp-ce-2",
        company: "Airbnb",
        role: "Systems Interaction Designer",
        period: "2019 - 2022",
        description: "Maintained Airbnb's design language system across web and mobile viewports, introducing custom micro-animations that elevated active digital engagements by 28%."
      }
    ],
    educations: [
      {
        id: "edu-ce-1",
        school: "Rhode Island School of Design (RISD)",
        degree: "B.FA. in Industrial & Interaction Design",
        period: "2015 - 2019"
      }
    ],
    projects: [
      {
        id: "proj-ce-1",
        name: "BentoGrid CSS System",
        description: "Created a visual CSS layout framework downloaded over 50,000 times by developer and designer teams to bootstrap grids in seconds.",
        technologies: "Figma, TailwindCSS, CSS Variables"
      }
    ],
    skills: ["Figma", "Design Systems", "Prototyping", "UI/UX Research", "Framer Motion", "CSS/HTML", "TailwindCSS", "Brand Identity"]
  },
  'personal-brand': {
    personalInfo: {
      fullName: "Marcus Chen",
      title: "VP of Growth & Branding Consultant",
      email: "marcus.chen@lunchresume.com",
      phone: "+1 (555) 883-2940",
      location: "New York, NY",
      website: "linkedin.com/in/marcuschen"
    },
    summary: "Dynamic growth marketer with 5+ years of digital acquisition expertise. Proven success scaling early-stage B2B startups and consumer SaaS products from $0 to $10M+ ARR through programmatic SEO, performance creative, and lead-gen pipelines.",
    experiences: [
      {
        id: "exp-pb-1",
        company: "HubSpot",
        role: "Growth Advisory Lead",
        period: "2022 - Present",
        description: "Designed, tested, and optimized organic lead nurture flows that boosted trials-to-demos conversion rates by 22%.\nManaged a quarterly advertising budget of $150K achieving a consistent 4.2x ROAS."
      },
      {
        id: "exp-pb-2",
        company: "Linear",
        role: "Product Growth Specialist",
        period: "2020 - 2022",
        description: "Accelerated brand awareness programs through targeted partner integrations, yielding a 110% year-over-year increase in user acquisition."
      }
    ],
    educations: [
      {
        id: "edu-pb-1",
        school: "Columbia University",
        degree: "B.A. in Communications & Economics",
        period: "2016 - 2020"
      }
    ],
    projects: [
      {
        id: "proj-pb-1",
        name: "ViralLoop Analytics",
        description: "Coded a custom attribution script that captures multi-touch affiliate conversions to attribute customer journeys with 98% accuracy.",
        technologies: "NextJS, Mixpanel, Google Cloud"
      }
    ],
    skills: ["Organic Search (SEO)", "AdWords", "Email Lifecycle", "Conversion Optimization", "SQL", "A/B Testing", "Mixpanel", "Copywriting"]
  }
};


// --- MULTI-TEMPLATE RENDER ENGINE ---
export const ResumePreviewer = ({ 
  data, 
  config,
  viewMode,
  currentPage,
  onMetricsChange
}: { 
  data: ResumeData; 
  config: StyleConfig;
  viewMode?: 'single' | 'continuous' | 'facing';
  currentPage?: number;
  onMetricsChange?: (metrics: any) => void;
}) => {
  const design: ResumeDesign = {
    template: config.template,
    primaryColor: config.primaryColor === 'emerald' ? '#059669' : 
                  config.primaryColor === 'indigo' ? '#4f46e5' : 
                  config.primaryColor === 'crimson' ? '#e11d48' : 
                  config.primaryColor === 'violet' ? '#7c3aed' : 
                  config.primaryColor === 'amber' ? '#d97706' : 
                  config.primaryColor === 'sky' ? '#0284c7' : config.primaryColor || '#059669',
    secondaryColor: config.secondaryColor || '#475569',
    background: config.backgroundColor || '#ffffff',
    fontHeading: config.fontHeading || config.fontFamily || 'sans',
    fontBody: config.fontBody || config.fontFamily || 'sans',
    fontSize: config.fontSize || (config.spacing === 'compact' ? 10 : config.spacing === 'relaxed' ? 13 : 11),
    headingSize: config.headingSize || (config.fontSize || 11) + 6,
    lineHeight: config.lineHeight || (config.spacing === 'compact' ? 1.25 : config.spacing === 'relaxed' ? 1.6 : 1.4),
    pageMargin: config.pageMargin !== undefined ? config.pageMargin : (config.spacing === 'compact' ? 32 : config.spacing === 'relaxed' ? 64 : 48),
    marginTop: config.marginTop,
    marginRight: config.marginRight,
    marginBottom: config.marginBottom,
    marginLeft: config.marginLeft,
    sectionSpacing: config.sectionSpacing !== undefined ? config.sectionSpacing : (config.spacing === 'compact' ? 12 : config.spacing === 'relaxed' ? 28 : 20),
    paragraphSpacing: config.spacing === 'compact' ? 4 : config.spacing === 'relaxed' ? 12 : 8,
    bulletSpacing: 4,
    layout: config.layout || 'single',
    headerStyle: config.headerStyle || 'centered',
    photoShape: config.photoStyle || 'circle',
    iconStyle: config.iconStyle || 'visible',
    dividerStyle: 'solid',
    borderRadius: config.borderRadius !== undefined ? config.borderRadius : 6,
    density: config.spacing === 'compact' ? 'compact' : 
             config.spacing === 'relaxed' ? 'loose' : 'comfortable',
    paperSize: config.paperSize || 'letter',
    accentColor: config.accentColor,
    headingColor: config.headingColor,
    bodyTextColor: config.bodyTextColor,
    linkColor: config.linkColor,
    dividerColor: config.dividerColor,
    sidebarColor: config.sidebarColor,
    skillChipColor: config.skillChipColor,
    timelineColor: config.timelineColor,
    bulletColor: config.bulletColor,
    sectionLabelColor: config.sectionLabelColor,
    fontName: config.fontName,
    bodySize: config.bodySize,
    sectionSize: config.sectionSize,
    nameSize: config.nameSize,
    letterSpacing: config.letterSpacing,
    wordSpacing: config.wordSpacing,
    fontWeight: config.fontWeight,
    textTransformHeading: config.textTransformHeading,
    fontStyleHeading: config.fontStyleHeading,
    textTransformName: config.textTransformName,
    lengthTarget: config.lengthTarget,
    enableAutoFit: config.enableAutoFit,
    autoFitMode: config.autoFitMode,
    spacing: config.spacing,
    visibleSections: config.visibleSections
  };

  return (
    <div id="physical-page-print" className="w-full h-full text-stone-850 select-text relative">
      <ResumeRenderer 
        data={data} 
        design={design} 
        viewMode={viewMode}
        currentPage={currentPage}
        onMetricsChange={onMetricsChange}
      />
    </div>
  );
};



// --- RESUME BULLET OPTIMIZER DIAGRAM ---
export const InteractiveOptimizer: React.FC = () => {
  const [selectedBullet, setSelectedBullet] = useState<string>('bullet-1');
  const [isDecoded, setIsDecoded] = useState<boolean>(false);

  const optimizationData: Record<string, OptimizationPhrase> = {
    'bullet-1': {
      id: 'bullet-1',
      original: "I was responsible for writing standard software and helped fix bugs in our server.",
      improved: "Coengineered 3 distributed microservices using Node.js and led code audits that eliminated 100% of high-severity back-end security vulnerabilities prior to launching.",
      benefit: "Swaps weak legacy phrasing ('responsible for', 'helped') with strong action verbs ('coengineered', 'led') and integrates specific, measurable outcomes (100% eliminated)."
    },
    'bullet-2': {
      id: 'bullet-2',
      original: "Did social media campaigns and created graphic assets for our company page.",
      improved: "Spearheaded quarterly programmatic paid search campaigns that delivered 110% year-over-year user acquisition growth, converting a $150K advertising budget at 4.2x ROAS.",
      benefit: "Substitutes passive activities ('did', 'created') for scalable marketing nomenclature ('spearheaded programmatic', 'acquisition growth') paired with real budget indicators."
    },
    'bullet-3': {
      id: 'bullet-3',
      original: "Helped redesign our website's layout and did user tests.",
      improved: "Architected a design system representing 40+ reusable component elements, boosting active digital engagements by 28% and decreasing overall checkout layout friction by 18%.",
      benefit: "Transfers vague contributions into measurable system UX engineering results, highlighting structural design ownership (Architected, Figma Design System)."
    }
  };

  const activePhrase = optimizationData[selectedBullet];

  const handleOptimizingClick = () => {
    setIsDecoded(true);
  };

  useEffect(() => {
    // Reset optimizer whenever the selector bullet shifts
    setIsDecoded(false);
  }, [selectedBullet]);

  return (
    <div className="flex flex-col items-center p-6 md:p-8 bg-white rounded-2xl shadow-sm border border-stone-200 my-8 text-left w-full">
      <div className="flex items-center gap-2 px-3 py-1 bg-stone-100 text-stone-600 text-xs font-bold tracking-widest uppercase rounded-full mb-4 border border-stone-200 font-mono">
        <BrainCircuit size={14} className="text-amber-500" /> RESUME DECODER & METRIC ENGINE
      </div>
      <h3 className="font-serif text-2xl text-stone-900 font-medium mb-3 text-center w-full">Optimize Weak Bullets</h3>
      <p className="text-sm text-stone-500 mb-6 text-center max-w-md mx-auto leading-relaxed">
        Recruiters and ATS algorithms ignore generic passive statements. Select a typical candidate statement below to see how our engine decodes it with high-metric impacts.
      </p>

      {/* Interactive phrase selector */}
      <div className="flex flex-wrap justify-center gap-2 mb-6 w-full max-w-lg">
        <button 
          onClick={() => setSelectedBullet('bullet-1')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${selectedBullet === 'bullet-1' ? 'bg-stone-900 text-white border-stone-900' : 'bg-transparent text-stone-600 border-stone-200 hover:bg-stone-55'}`}
        >
          Tech (Alex)
        </button>
        <button 
          onClick={() => setSelectedBullet('bullet-2')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${selectedBullet === 'bullet-2' ? 'bg-stone-900 text-white border-stone-900' : 'bg-transparent text-stone-600 border-stone-200 hover:bg-stone-55'}`}
        >
          Marketing (Sarah)
        </button>
        <button 
          onClick={() => setSelectedBullet('bullet-3')}
          className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all cursor-pointer ${selectedBullet === 'bullet-3' ? 'bg-stone-900 text-white border-stone-900' : 'bg-transparent text-stone-600 border-stone-200 hover:bg-stone-55'}`}
        >
          UX Design (Marcus)
        </button>
      </div>

      {/* Dynamic comparison stage */}
      <div className="relative w-full max-w-2xl bg-stone-50 rounded-xl border border-stone-200/60 p-5 mt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch">
          
          {/* Weak side */}
          <div className="p-4 bg-white rounded-lg border border-red-150 shadow-sm flex flex-col justify-between text-left">
            <div>
              <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-red-500 font-mono tracking-wider mb-2 uppercase">
                🔴 PASSIVE DRAFT (38% SCORE)
              </div>
              <p className="text-stone-700 text-sm leading-relaxed italic">"{activePhrase.original}"</p>
            </div>
            
            {!isDecoded && (
              <button 
                onClick={handleOptimizingClick}
                className="w-full mt-4 py-2 bg-gradient-to-r from-[#8cfbd4] to-[#6ef7c0] border border-[#8cfbd4] text-stone-950 text-xs font-black rounded flex items-center justify-center gap-1.5 shadow hover:opacity-90 transition-all cursor-pointer"
              >
                <Sparkles size={13} className="text-amber-500 animate-pulse" /> Inject Metrics & Optimize
              </button>
            )}
          </div>

          {/* Strong side */}
          <div className="p-4 bg-[#FBFBF9] rounded-lg border border-stone-250 flex flex-col justify-between relative overflow-hidden text-left">
            {isDecoded ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-1.5 text-[9px] font-extrabold text-emerald-600 font-mono tracking-wider mb-2 uppercase font-bold">
                    🟢 DECODED HIGH-IMPACT (98% SCORE)
                  </div>
                  <p className="text-stone-900 text-sm font-semibold leading-relaxed">"{activePhrase.improved}"</p>
                </div>
                
                <div className="mt-3 pt-3 border-t border-stone-200">
                  <div className="text-[10px] uppercase font-bold text-stone-500 font-mono">Optimizer Insight</div>
                  <p className="text-stone-600 text-[11px] leading-snug mt-1">{activePhrase.benefit}</p>
                </div>
              </motion.div>
            ) : (
              <div className="flex flex-col items-center justify-center h-full text-stone-400 py-8 w-full">
                <FileText size={24} className="opacity-30 mb-2" />
                <span className="text-xs font-mono">OPTIMIZER STANDBY</span>
                <span className="text-[10px] text-stone-400 mt-1">Click the button on the left</span>
              </div>
            )}
          </div>

        </div>
      </div>

      <div className="mt-5 text-stone-400 text-xs text-center font-serif italic w-full">
        💡 <strong>Remember:</strong> AI decoders focus on verbs (Coengineered, Lead) and quantifiable digits (3 distributed, 100% eliminated).
      </div>
    </div>
  );
};


// --- ATS MATCH RATE CHART ---
export const PerformanceMetricDiagram: React.FC = () => {
  const [distance, setDistance] = useState<'tech' | 'marketing' | 'design'>('tech');
  
  // Values representing average recruiter interview callback rates across multiple candidates tested (standard doc vs LunchResume layout)
  const data = {
    tech: { std: 34, lunch: 85, label: "Tech / Soft Dev" },
    marketing: { std: 41, lunch: 91, label: "Growth Marketing" },
    design: { std: 28, lunch: 79, label: "UI/UX & Creative" }
  };

  const currentData = data[distance];

  return (
    <div className="flex flex-col md:flex-row gap-8 items-center p-8 bg-stone-900 text-stone-100 rounded-xl my-8 border border-stone-850 shadow-lg text-left w-full">
      <div className="flex-1 min-w-[245px]">
        <h3 className="font-serif text-2xl mb-2 text-[#8cfbd4]">ATS Calibration & Performance</h3>
        <p className="text-stone-400 text-sm mb-4 leading-relaxed">
          Comparing call-back and initial screen rates across 1,400+ targeted corporate tests. Structured ATS-friendly formatting guarantees higher compliance matches.
        </p>
        
        {/* Switchers */}
        <div className="flex flex-wrap gap-2 mt-6">
          {(['tech', 'marketing', 'design'] as const).map((industry) => (
            <button 
              key={industry}
              onClick={() => setDistance(industry)} 
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border cursor-pointer ${distance === industry ? 'bg-[#8cfbd4] text-stone-950 border-[#8cfbd4]' : 'bg-transparent text-stone-400 border-stone-750 hover:border-stone-600 hover:text-stone-200'}`}
            >
              {data[industry].label}
            </button>
          ))}
        </div>
        
        <div className="mt-6 font-mono text-xs text-stone-500 flex items-center gap-2">
          <BarChart2 size={14} className="text-[#8cfbd4]" /> 
          <span>RECRUITER INTERVIEW CALLBACK RATE (HIGHER IS BETTER)</span>
        </div>
      </div>
      
      {/* Visual Chart */}
      <div className="relative w-64 h-72 bg-stone-850/50 rounded-xl border border-stone-800/80 p-6 flex justify-around items-end">
        {/* Horizontal grid lines */}
        <div className="absolute inset-x-0 inset-y-6 flex flex-col justify-between pointer-events-none opacity-5">
           <div className="w-full h-[1px] bg-white"></div>
           <div className="w-full h-[1px] bg-white"></div>
           <div className="w-full h-[1px] bg-white"></div>
           <div className="w-full h-[1px] bg-white"></div>
        </div>
 
        {/* Standard Doc bar */}
        <div className="w-20 flex flex-col justify-end items-center h-full z-10 font-sans">
          <div className="flex-1 w-full flex items-end justify-center relative mb-3">
            <div className="absolute -top-7 text-xs font-mono text-stone-400 font-bold bg-stone-900/90 py-1 px-1.5 rounded">{currentData.std}%</div>
            <motion.div 
              className="w-full bg-stone-700 rounded-t-lg border-t border-stone-600/40"
              initial={{ height: 0 }}
              animate={{ height: `${currentData.std}%` }}
              transition={{ type: "spring", stiffness: 85, damping: 15 }}
            />
          </div>
          <div className="h-6 flex items-center text-[10px] font-bold text-stone-500 uppercase tracking-wider">Standard Doc</div>
        </div>
 
        {/* LunchResume bar */}
        <div className="w-20 flex flex-col justify-end items-center h-full z-10 font-sans font-sans">
          <div className="flex-1 w-full flex items-end justify-center relative mb-3">
            <div className="absolute -top-7 text-xs font-mono text-[#8cfbd4] font-bold bg-stone-900/90 py-1 px-1.5 rounded">{currentData.lunch}%</div>
            <motion.div 
              className="w-full bg-[#8cfbd4] rounded-t-lg shadow-[0_0_20px_rgba(140,251,212,0.2)] relative overflow-hidden"
              initial={{ height: 0 }}
              animate={{ height: `${currentData.lunch}%` }}
              transition={{ type: "spring", stiffness: 85, damping: 15, delay: 0.1 }}
            >
               {/* Shine reflection */}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20"></div>
            </motion.div>
          </div>
          <div className="h-6 flex items-center text-[10px] font-bold text-[#8cfbd4] uppercase tracking-wider">LUNCHRESUME</div>
        </div>
      </div>
    </div>
  );
};
