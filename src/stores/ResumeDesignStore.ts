import { ResumeDesign } from '../types/design';

export const initialDesign: ResumeDesign = {
  template: 'executive-elite',
  primaryColor: 'indigo',
  secondaryColor: '#222222',
  background: '#ffffff',
  fontHeading: 'Inter',
  fontBody: 'Inter',
  fontSize: 11,
  headingSize: 18,
  lineHeight: 1.45,
  pageMargin: 24,
  sectionSpacing: 18,
  paragraphSpacing: 8,
  bulletSpacing: 5,
  layout: 'single',
  headerStyle: 'modern',
  photoShape: 'circle',
  iconStyle: 'outline',
  dividerStyle: 'solid',
  borderRadius: 6,
  density: 'comfortable',
  paperSize: 'A4'
};

type Listener = (state: ResumeDesign) => void;

class DesignStore {
  private state: ResumeDesign = initialDesign;
  private listeners = new Set<Listener>();

  constructor() {
    try {
      const saved = localStorage.getItem('lunch_resume_design');
      if (saved) {
        this.state = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to load design from localStorage', e);
    }
  }

  getState = (): ResumeDesign => {
    return this.state;
  };

  setState = (nextState: ResumeDesign | ((prev: ResumeDesign) => ResumeDesign)) => {
    this.state = typeof nextState === 'function' ? nextState(this.state) : nextState;
    try {
      localStorage.setItem('lunch_resume_design', JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save design state', e);
    }
    this.notify();

    import('./ResumeHistoryStore').then(m => {
      m.ResumeHistoryStore.pushState(null, this.state);
    });
  };

  setPrimaryColor = (color: string) => {
    this.setState(prev => ({ ...prev, primaryColor: color }));
  };

  setSecondaryColor = (color: string) => {
    this.setState(prev => ({ ...prev, secondaryColor: color }));
  };

  setFont = (font: string) => {
    this.setState(prev => ({ ...prev, fontBody: font, fontHeading: font }));
  };

  setTemplate = (template: string) => {
    this.setState(prev => ({ ...prev, template }));
  };

  setMargins = (margin: number) => {
    this.setState(prev => ({ ...prev, pageMargin: margin }));
  };

  setSpacing = (spacing: number) => {
    this.setState(prev => ({ ...prev, sectionSpacing: spacing }));
  };

  setLayout = (layout: string) => {
    this.setState(prev => ({ ...prev, layout }));
  };

  setHeaderStyle = (headerStyle: string) => {
    this.setState(prev => ({ ...prev, headerStyle }));
  };

  setPhotoStyle = (photoShape: string) => {
    this.setState(prev => ({ ...prev, photoShape }));
  };

  resetTheme = () => {
    this.setState(initialDesign);
  };

  saveTheme = () => {
    try {
      localStorage.setItem('lunch_resume_saved_theme', JSON.stringify(this.state));
    } catch (e) {
      console.error('Failed to save theme preset', e);
    }
  };

  loadTheme = () => {
    try {
      const saved = localStorage.getItem('lunch_resume_saved_theme');
      if (saved) {
        this.setState(JSON.parse(saved));
      }
    } catch (e) {
      console.error('Failed to load theme preset', e);
    }
  };

  exportTheme = (): string => {
    return JSON.stringify(this.state, null, 2);
  };

  importTheme = (jsonString: string) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && typeof parsed === 'object') {
        this.setState({ ...this.state, ...parsed });
      }
    } catch (e) {
      console.error('Failed to import theme preset', e);
    }
  };

  subscribe = (listener: Listener) => {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  };

  private notify() {
    this.listeners.forEach(l => l(this.state));
  }
}

export const ResumeDesignStore = new DesignStore();
