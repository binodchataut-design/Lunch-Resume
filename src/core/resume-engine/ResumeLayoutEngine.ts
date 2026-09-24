import { ResumeDesign } from '../../types/design';

export class ResumeLayoutEngine {
  // Returns styling properties calculated from density presets
  static calculateDensitySettings(density: 'compact' | 'comfortable' | 'loose') {
    switch (density) {
      case 'compact':
        return {
          fontSize: 10,
          headingSize: 15,
          lineHeight: 1.25,
          sectionSpacing: 12,
          paragraphSpacing: 4
        };
      case 'loose':
        return {
          fontSize: 12,
          headingSize: 20,
          lineHeight: 1.6,
          sectionSpacing: 24,
          paragraphSpacing: 12
        };
      case 'comfortable':
      default:
        return {
          fontSize: 11,
          headingSize: 18,
          lineHeight: 1.45,
          sectionSpacing: 18,
          paragraphSpacing: 8
        };
    }
  }

  // Returns dimension configurations based on paper size
  static getPaperDimensions(paperSize: string) {
    const normalized = paperSize.toLowerCase();
    if (normalized === 'us-letter') {
      return { width: '8.5in', height: '11in' };
    }
    // A4 default
    return { width: '210mm', height: '297mm' };
  }
}
