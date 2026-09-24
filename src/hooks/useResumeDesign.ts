import { useState, useEffect } from 'react';
import { ResumeDesignStore } from '../stores/ResumeDesignStore';
import { ResumeDesign } from '../types/design';

export function useResumeDesign() {
  const [design, setDesign] = useState<ResumeDesign>(ResumeDesignStore.getState());

  useEffect(() => {
    return ResumeDesignStore.subscribe((newDesign) => {
      setDesign({ ...newDesign });
    });
  }, []);

  return {
    design,
    setPrimaryColor: ResumeDesignStore.setPrimaryColor,
    setSecondaryColor: ResumeDesignStore.setSecondaryColor,
    setFont: ResumeDesignStore.setFont,
    setTemplate: ResumeDesignStore.setTemplate,
    setMargins: ResumeDesignStore.setMargins,
    setSpacing: ResumeDesignStore.setSpacing,
    setLayout: ResumeDesignStore.setLayout,
    setHeaderStyle: ResumeDesignStore.setHeaderStyle,
    setPhotoStyle: ResumeDesignStore.setPhotoStyle,
    resetTheme: ResumeDesignStore.resetTheme,
    saveTheme: ResumeDesignStore.saveTheme,
    loadTheme: ResumeDesignStore.loadTheme,
    exportTheme: ResumeDesignStore.exportTheme,
    importTheme: ResumeDesignStore.importTheme,
    updateDesignState: ResumeDesignStore.setState
  };
}
