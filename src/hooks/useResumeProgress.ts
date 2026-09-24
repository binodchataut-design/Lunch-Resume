import { useState, useEffect } from 'react';
import { ResumeProgressStore, ProgressState } from '../stores/ResumeProgressStore';

export function useResumeProgress() {
  const [progress, setProgress] = useState<ProgressState>(ResumeProgressStore.getState());

  useEffect(() => {
    return ResumeProgressStore.subscribe((newProgress) => {
      setProgress({ ...newProgress });
    });
  }, []);

  return {
    progress,
    setCurrentStep: ResumeProgressStore.setCurrentStep,
    recalculateProgress: ResumeProgressStore.recalculateProgress
  };
}
