import { ReactNode } from 'react';
import { ResumeData } from './resume';
import { ResumeDesign } from './design';

export interface IResumeTemplateRenderer {
  id: string;
  name: string;
  renderHeader(data: ResumeData, design: ResumeDesign): ReactNode;
  renderSummary(data: ResumeData, design: ResumeDesign): ReactNode;
  renderExperience(data: ResumeData, design: ResumeDesign): ReactNode;
  renderEducation(data: ResumeData, design: ResumeDesign): ReactNode;
  renderSkills(data: ResumeData, design: ResumeDesign): ReactNode;
  renderProjects(data: ResumeData, design: ResumeDesign): ReactNode;
  renderLanguages(data: ResumeData, design: ResumeDesign): ReactNode;
  renderFooter(data: ResumeData, design: ResumeDesign): ReactNode;
}
