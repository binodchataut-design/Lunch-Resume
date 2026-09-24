import { useResumeContent } from './useResumeContent';
import { useResumeDesign } from './useResumeDesign';

export function useResumeRenderer() {
  const { content } = useResumeContent();
  const { design, setTemplate, setPrimaryColor, setFont, setMargins, setSpacing } = useResumeDesign();

  return {
    content,
    design,
    setTemplate,
    setPrimaryColor,
    setFont,
    setMargins,
    setSpacing
  };
}
