import { useState, useEffect } from 'react';
import { ResumeContentStore } from '../stores/ResumeContentStore';
import { ResumeData } from '../types/resume';

export function useResumeContent(): {
  content: ResumeData;
  updatePersonalInfo: typeof ResumeContentStore.updatePersonalInfo;
  updateSummary: typeof ResumeContentStore.updateSummary;
  addExperience: typeof ResumeContentStore.addExperience;
  updateExperience: typeof ResumeContentStore.updateExperience;
  removeExperience: typeof ResumeContentStore.removeExperience;
  addEducation: typeof ResumeContentStore.addEducation;
  updateEducation: typeof ResumeContentStore.updateEducation;
  removeEducation: typeof ResumeContentStore.removeEducation;
  addProject: typeof ResumeContentStore.addProject;
  updateProject: typeof ResumeContentStore.updateProject;
  removeProject: typeof ResumeContentStore.removeProject;
  addSkill: typeof ResumeContentStore.addSkill;
  removeSkill: typeof ResumeContentStore.removeSkill;
  setSkills: typeof ResumeContentStore.setSkills;
} {
  const [content, setContent] = useState<ResumeData>(ResumeContentStore.getState());

  useEffect(() => {
    return ResumeContentStore.subscribe((newContent) => {
      setContent({ ...newContent });
    });
  }, []);

  return {
    content,
    updatePersonalInfo: ResumeContentStore.updatePersonalInfo,
    updateSummary: ResumeContentStore.updateSummary,
    addExperience: ResumeContentStore.addExperience,
    updateExperience: ResumeContentStore.updateExperience,
    removeExperience: ResumeContentStore.removeExperience,
    addEducation: ResumeContentStore.addEducation,
    updateEducation: ResumeContentStore.updateEducation,
    removeEducation: ResumeContentStore.removeEducation,
    addProject: ResumeContentStore.addProject,
    updateProject: ResumeContentStore.updateProject,
    removeProject: ResumeContentStore.removeProject,
    addSkill: ResumeContentStore.addSkill,
    removeSkill: ResumeContentStore.removeSkill,
    setSkills: ResumeContentStore.setSkills
  };
}
