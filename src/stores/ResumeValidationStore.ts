import { ResumeContentStore } from './ResumeContentStore';

export interface ValidationError {
  field: string;
  message: string;
  severity: 'error' | 'warning' | 'info';
}

type Listener = (errors: ValidationError[]) => void;

class ValidationStore {
  private listeners = new Set<Listener>();

  getErrors = (): ValidationError[] => {
    const errors: ValidationError[] = [];
    const data = ResumeContentStore.getState();
    const p = data.personalInfo;

    // Personal Info Errors
    if (!p.fullName?.trim()) {
      errors.push({ field: 'personalInfo.fullName', message: 'Full Name is required', severity: 'error' });
    }
    if (!p.email?.trim()) {
      errors.push({ field: 'personalInfo.email', message: 'Email Address is required', severity: 'error' });
    } else if (!/\S+@\S+\.\S+/.test(p.email)) {
      errors.push({ field: 'personalInfo.email', message: 'Email Address format is invalid', severity: 'warning' });
    }
    if (!p.phone?.trim()) {
      errors.push({ field: 'personalInfo.phone', message: 'Phone Number is required', severity: 'warning' });
    }

    // Work Experience Warnings
    if (!data.experiences || data.experiences.length === 0) {
      errors.push({ field: 'experiences', message: 'Adding professional work history is highly recommended', severity: 'warning' });
    } else {
      data.experiences.forEach((exp, idx) => {
        if (!exp.company?.trim()) {
          errors.push({ field: `experiences[${idx}].company`, message: 'Company Name is missing', severity: 'error' });
        }
        if (!exp.role?.trim()) {
          errors.push({ field: `experiences[${idx}].role`, message: 'Job Role is missing', severity: 'error' });
        }
        if (!exp.description?.trim()) {
          errors.push({ field: `experiences[${idx}].description`, message: 'Job description is empty', severity: 'warning' });
        }
      });
    }

    // Education Warnings
    if (!data.educations || data.educations.length === 0) {
      errors.push({ field: 'educations', message: 'Adding at least one educational background is recommended', severity: 'warning' });
    }

    // Skills
    if (!data.skills || data.skills.length < 5) {
      errors.push({ field: 'skills', message: 'Add at least 5 key skills for better ATS readability', severity: 'info' });
    }

    return errors;
  };

  recalculate = () => {
    this.notify();
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    const errs = this.getErrors();
    this.listeners.forEach(l => l(errs));
  }
}

export const ResumeValidationStore = new ValidationStore();
