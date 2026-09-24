type ExportStatus = 'idle' | 'preparing' | 'generating' | 'success' | 'failed';

type Listener = (state: { status: ExportStatus; lastExportTime: Date | null }) => void;

class ExportStore {
  private status: ExportStatus = 'idle';
  private lastExportTime: Date | null = null;
  private listeners = new Set<Listener>();

  getState = () => {
    return {
      status: this.status,
      lastExportTime: this.lastExportTime
    };
  };

  triggerExport = async (format: 'pdf' | 'json' | 'txt' = 'pdf') => {
    this.status = 'preparing';
    this.notify();

    try {
      if (format === 'pdf') {
        this.status = 'generating';
        this.notify();
        
        // Wait 1.5s to simulate visual render rendering process
        await new Promise(resolve => setTimeout(resolve, 1200));
        
        if (typeof window !== 'undefined') {
          window.print();
        }
      } else if (format === 'json') {
        const { ResumeContentStore } = await import('./ResumeContentStore');
        const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(ResumeContentStore.getState(), null, 2));
        const downloadAnchor = document.createElement('a');
        downloadAnchor.setAttribute("href", dataStr);
        downloadAnchor.setAttribute("download", "resume_content.json");
        document.body.appendChild(downloadAnchor);
        downloadAnchor.click();
        downloadAnchor.remove();
      }

      this.status = 'success';
      this.lastExportTime = new Date();
      this.notify();
      
      setTimeout(() => {
        this.status = 'idle';
        this.notify();
      }, 3000);
      
    } catch (e) {
      console.error('Export failed', e);
      this.status = 'failed';
      this.notify();
      
      setTimeout(() => {
        this.status = 'idle';
        this.notify();
      }, 4000);
    }
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

export const ResumeExportStore = new ExportStore();
