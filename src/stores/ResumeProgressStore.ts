import { ResumeContentStore } from './ResumeContentStore';

export interface SectionProgress {
  requiredFields: number;
  completedFields: number;
  percentage: number;
  validationStatus: 'not-started' | 'started' | 'completed';
  missingFields: string[];
}

export interface ProgressState {
  currentStep: number;
  progressPercent: number;
  estimatedMinutes: number;
  sectionProgress: Record<number, SectionProgress>;
}

type Listener = (state: ProgressState) => void;

class ProgressStore {
  private currentStep = 1;
  private listeners = new Set<Listener>();

  constructor() {
    // Initial calculate
  }

  getCurrentStep = () => this.currentStep;

  setCurrentStep = (step: number) => {
    this.currentStep = step;
    this.notify();
  };

  getSectionProgress = (stepId: number): SectionProgress => {
    const data = ResumeContentStore.getState();
    let requiredFields = 0;
    let completedFields = 0;
    let percentage = 0;
    let validationStatus: 'not-started' | 'started' | 'completed' = 'not-started';
    const missingFields: string[] = [];

    const p = data.personalInfo;

    switch (stepId) {
      case 1: // Personal Info
        requiredFields = 8;
        if (p.fullName?.trim()) completedFields++; else missingFields.push('Full Name');
        if (p.title?.trim()) completedFields++; else missingFields.push('Professional Title');
        if (p.email?.trim()) completedFields++; else missingFields.push('Email Address');
        if (p.phone?.trim()) completedFields++; else missingFields.push('Phone Number');
        if (p.location?.trim()) completedFields++; else missingFields.push('Location');
        if (p.website?.trim()) completedFields++; else missingFields.push('Website');
        if (p.photo?.trim()) completedFields++; else missingFields.push('Photo');
        if (p.website?.includes('linkedin') || p.fullName) completedFields++; else missingFields.push('LinkedIn Profile');
        break;

      case 2: // Summary
        requiredFields = 1;
        if (data.summary?.trim()) {
          completedFields = 1;
        } else {
          missingFields.push('Summary Text');
        }
        break;

      case 3: // Work History
        requiredFields = 5;
        completedFields = Math.min(data.experiences?.length || 0, 5);
        if (completedFields === 0) {
          missingFields.push('Work Entries');
        } else if (completedFields < 3) {
          missingFields.push('Add 3+ entries');
        }
        break;

      case 4: // Education
        requiredFields = 2;
        completedFields = Math.min(data.educations?.length || 0, 2);
        if (completedFields === 0) {
          missingFields.push('Education Entries');
        } else if (completedFields < 2) {
          missingFields.push('Add 2+ entries');
        }
        break;

      case 5: // Skills Inventory
        requiredFields = 10;
        completedFields = Math.min(data.skills?.length || 0, 10);
        if (completedFields === 0) {
          missingFields.push('Skills');
        } else if (completedFields < 5) {
          missingFields.push('Add 5+ skills');
        }
        break;

      case 6: // Certifications
        requiredFields = 3;
        completedFields = Math.min(data.certifications?.length || 0, 3);
        if (completedFields === 0) missingFields.push('Certifications');
        break;

      case 7: // Languages
        requiredFields = 2;
        completedFields = Math.min(data.languages?.length || 0, 2);
        if (completedFields === 0) missingFields.push('Languages');
        break;

      case 8: // Key Projects
        requiredFields = 3;
        completedFields = Math.min(data.projects?.length || 0, 3);
        if (completedFields === 0) missingFields.push('Projects');
        break;

      case 9: // Awards
        requiredFields = 2;
        completedFields = Math.min(data.awards?.length || 0, 2);
        if (completedFields === 0) missingFields.push('Awards');
        break;

      case 10: // References
        requiredFields = 2;
        completedFields = Math.min(data.references?.length || 0, 2);
        if (completedFields === 0) missingFields.push('References');
        break;

      case 11: // Review & Download
        requiredFields = 1;
        completedFields = 1;
        break;

      default:
        break;
    }

    percentage = requiredFields > 0 ? Math.round((completedFields / requiredFields) * 100) : 0;
    if (percentage === 100) {
      validationStatus = 'completed';
    } else if (percentage > 0) {
      validationStatus = 'started';
    } else {
      validationStatus = 'not-started';
    }

    return {
      requiredFields,
      completedFields,
      percentage,
      validationStatus,
      missingFields
    };
  };

  getState = (): ProgressState => {
    let totalRequired = 0;
    let totalCompleted = 0;
    const sectionProgress: Record<number, SectionProgress> = {};

    for (let i = 1; i <= 11; i++) {
      const sp = this.getSectionProgress(i);
      sectionProgress[i] = sp;
      totalRequired += sp.requiredFields;
      totalCompleted += sp.completedFields;
    }

    const progressPercent = totalRequired > 0 ? Math.min(Math.round((totalCompleted / totalRequired) * 100), 100) : 0;
    const estimatedMinutes = Math.max(Math.round((totalRequired - totalCompleted) * 0.8), 1);

    return {
      currentStep: this.currentStep,
      progressPercent,
      estimatedMinutes,
      sectionProgress
    };
  };

  recalculateProgress = () => {
    this.notify();
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

export const ResumeProgressStore = new ProgressStore();
