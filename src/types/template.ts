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
  defaultColors?: {
    primary: string;
    secondary: string;
    background: string;
  };
  defaultTypography?: {
    heading: string;
    body: string;
  };
  previewImage?: string;
}
