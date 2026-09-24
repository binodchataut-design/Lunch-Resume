import { ResumeData } from '../../types/resume';
import { ResumeDesign } from '../../types/design';

export class ResumeExportEngine {
  // Inject print-only styles dynamically to force pagination margins and strip headers/footers
  static injectPrintStyles(design: ResumeDesign) {
    const styleId = 'lunch-resume-print-override';
    let styleEl = document.getElementById(styleId);
    
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.setAttribute('id', styleId);
      document.head.appendChild(styleEl);
    }

    styleEl.innerHTML = `
      @media print {
        body {
          background: #ffffff !important;
          color: #000000 !important;
          margin: 0 !important;
          padding: 0 !important;
        }
        header, footer, nav, aside, button, .no-print {
          display: none !important;
        }
        .print-canvas {
          width: 100% !important;
          box-shadow: none !important;
          padding: ${design.pageMargin}px !important;
          margin: 0 !important;
        }
        @page {
          size: ${design.paperSize === 'A4' ? 'A4' : 'letter'};
          margin: 0;
        }
      }
    `;
  }

  // Exports data as standard JSON file
  static downloadJson(data: ResumeData, filename = 'resume-data.json') {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
    const dlAnchorElem = document.createElement('a');
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", filename);
    dlAnchorElem.click();
    dlAnchorElem.remove();
  }
}
