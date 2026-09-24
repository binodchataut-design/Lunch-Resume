import { ResumeData } from '../types/resume';
import { ResumeDesign } from '../types/design';

interface HistoryState {
  content: ResumeData;
  design: ResumeDesign;
}

type Listener = (state: { canUndo: boolean; canRedo: boolean }) => void;

class HistoryStore {
  private undoStack: HistoryState[] = [];
  private redoStack: HistoryState[] = [];
  private listeners = new Set<Listener>();
  private isApplying = false;

  pushState = (content: ResumeData | null, design: ResumeDesign | null) => {
    if (this.isApplying) return;

    // We fetch latest states from store to ensure we have full state
    import('./ResumeContentStore').then(mContent => {
      import('./ResumeDesignStore').then(mDesign => {
        const currentContent = content || mContent.ResumeContentStore.getState();
        const currentDesign = design || mDesign.ResumeDesignStore.getState();

        // Check if different from top of undoStack to avoid duplicates
        const top = this.undoStack[this.undoStack.length - 1];
        if (top && 
            JSON.stringify(top.content) === JSON.stringify(currentContent) && 
            JSON.stringify(top.design) === JSON.stringify(currentDesign)) {
          return;
        }

        // Push previous state
        this.undoStack.push({
          content: JSON.parse(JSON.stringify(currentContent)),
          design: JSON.parse(JSON.stringify(currentDesign))
        });

        // Limit stack to 50 items
        if (this.undoStack.length > 50) {
          this.undoStack.shift();
        }

        this.redoStack = [];
        this.notify();
      });
    });
  };

  undo = async () => {
    if (this.undoStack.length <= 1) return; // Must have at least 1 previous state to go back

    this.isApplying = true;
    const current = this.undoStack.pop();
    if (current) {
      this.redoStack.push(current);
    }

    const previous = this.undoStack[this.undoStack.length - 1];
    if (previous) {
      const { ResumeContentStore } = await import('./ResumeContentStore');
      const { ResumeDesignStore } = await import('./ResumeDesignStore');
      
      ResumeContentStore.setState(JSON.parse(JSON.stringify(previous.content)));
      ResumeDesignStore.setState(JSON.parse(JSON.stringify(previous.design)));
    }
    this.isApplying = false;
    this.notify();
  };

  redo = async () => {
    if (this.redoStack.length === 0) return;

    this.isApplying = true;
    const next = this.redoStack.pop();
    if (next) {
      this.undoStack.push(next);
      
      const { ResumeContentStore } = await import('./ResumeContentStore');
      const { ResumeDesignStore } = await import('./ResumeDesignStore');

      ResumeContentStore.setState(JSON.parse(JSON.stringify(next.content)));
      ResumeDesignStore.setState(JSON.parse(JSON.stringify(next.design)));
    }
    this.isApplying = false;
    this.notify();
  };

  getState = () => {
    return {
      canUndo: this.undoStack.length > 1,
      canRedo: this.redoStack.length > 0
    };
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

export const ResumeHistoryStore = new HistoryStore();

// Setup Keyboard shortcuts
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
      if (e.shiftKey) {
        ResumeHistoryStore.redo();
      } else {
        ResumeHistoryStore.undo();
      }
    }
  });
}
