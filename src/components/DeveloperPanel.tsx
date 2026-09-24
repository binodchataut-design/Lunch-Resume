import React, { useState, useEffect } from 'react';
import { Terminal, Copy, Check, Eye, EyeOff, Play, RefreshCw } from 'lucide-react';
import { ResumeContentStore } from '../stores/ResumeContentStore';
import { ResumeDesignStore } from '../stores/ResumeDesignStore';
import { ResumeProgressStore } from '../stores/ResumeProgressStore';
import { ResumeValidationStore } from '../stores/ResumeValidationStore';
import { ResumeHistoryStore } from '../stores/ResumeHistoryStore';

export function DeveloperPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const [content, setContent] = useState(ResumeContentStore.getState());
  const [design, setDesign] = useState(ResumeDesignStore.getState());
  const [progress, setProgress] = useState(ResumeProgressStore.getState());
  const [validation, setValidation] = useState(ResumeValidationStore.getErrors());
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'content' | 'design' | 'progress' | 'validation'>('content');
  const [renderTime, setRenderTime] = useState(0);

  useEffect(() => {
    // Only display in development environment
    if (process.env.NODE_ENV === 'production') return;

    const start = performance.now();
    
    const unsubContent = ResumeContentStore.subscribe((c) => {
      setContent({ ...c });
      setRenderTime(Math.round(performance.now() - start));
    });
    
    const unsubDesign = ResumeDesignStore.subscribe((d) => {
      setDesign({ ...d });
      setRenderTime(Math.round(performance.now() - start));
    });

    const unsubProgress = ResumeProgressStore.subscribe((p) => {
      setProgress({ ...p });
    });

    const unsubValidation = ResumeValidationStore.subscribe((v) => {
      setValidation([...v]);
    });

    return () => {
      unsubContent();
      unsubDesign();
      unsubProgress();
      unsubValidation();
    };
  }, []);

  if (process.env.NODE_ENV === 'production') return null;

  const copyState = () => {
    let targetState: any = content;
    if (activeTab === 'design') targetState = design;
    if (activeTab === 'progress') targetState = progress;
    if (activeTab === 'validation') targetState = validation;

    navigator.clipboard.writeText(JSON.stringify(targetState, null, 2));
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 z-[9999] font-mono no-print">
      {!isOpen ? (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-2 bg-stone-900 hover:bg-stone-850 text-[#8cfbd4] px-4 py-2.5 rounded-full shadow-2xl border border-stone-800 text-xs font-bold transition-all transform hover:scale-105"
        >
          <Terminal size={14} className="animate-pulse" />
          <span>Fidelity DevTools</span>
        </button>
      ) : (
        <div className="w-[480px] bg-stone-950 text-stone-200 rounded-2xl border border-stone-800 shadow-2xl overflow-hidden flex flex-col h-[520px]">
          {/* Header */}
          <div className="flex justify-between items-center bg-stone-900 px-4 py-3 border-b border-stone-800">
            <div className="flex items-center gap-2">
              <Terminal size={14} className="text-[#8cfbd4]" />
              <span className="text-xs font-bold uppercase tracking-wider text-stone-300">Fidelity Diagnostics Panel</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] bg-stone-800 text-stone-400 px-2 py-0.5 rounded-md">
                ⚡️ {renderTime}ms render
              </span>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-stone-400 hover:text-white text-xs px-1.5 py-0.5 hover:bg-stone-800 rounded transition-all"
              >
                Close
              </button>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 px-3 py-2 bg-stone-900/50 border-b border-stone-800 text-[11px]">
            <button
              onClick={() => ResumeHistoryStore.undo()}
              className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded transition-all"
            >
              ↩ Undo
            </button>
            <button
              onClick={() => ResumeHistoryStore.redo()}
              className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded transition-all"
            >
              ↪ Redo
            </button>
            <button
              onClick={() => {
                ResumeContentStore.setState(content);
                ResumeValidationStore.recalculate();
              }}
              className="px-2 py-1 bg-stone-800 hover:bg-stone-700 rounded transition-all flex items-center gap-1 ml-auto"
            >
              <RefreshCw size={10} /> Recalc Validation
            </button>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-stone-800 text-xs bg-stone-900/20">
            {(['content', 'design', 'progress', 'validation'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-2.5 text-center font-bold capitalize transition-all border-b-2 ${
                  activeTab === tab
                    ? 'border-[#8cfbd4] text-[#8cfbd4] bg-stone-900/40'
                    : 'border-transparent text-stone-500 hover:text-stone-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* State Viewer Container */}
          <div className="flex-1 p-4 overflow-auto bg-stone-950 text-[11px] leading-relaxed relative">
            <button
              onClick={copyState}
              className="absolute top-3 right-3 p-1.5 bg-stone-900 hover:bg-stone-800 text-stone-400 hover:text-white rounded-md border border-stone-800 transition-all"
              title="Copy State JSON"
            >
              {copied ? <Check size={12} className="text-green-400" /> : <Copy size={12} />}
            </button>

            {activeTab === 'content' && (
              <pre className="text-stone-300 overflow-x-auto selection:bg-stone-800">
                {JSON.stringify(content, null, 2)}
              </pre>
            )}

            {activeTab === 'design' && (
              <pre className="text-stone-300 overflow-x-auto selection:bg-stone-800">
                {JSON.stringify(design, null, 2)}
              </pre>
            )}

            {activeTab === 'progress' && (
              <pre className="text-stone-300 overflow-x-auto selection:bg-stone-800">
                {JSON.stringify(progress, null, 2)}
              </pre>
            )}

            {activeTab === 'validation' && (
              <div>
                {validation.length === 0 ? (
                  <div className="text-green-400 flex items-center gap-2">
                    <span>✓</span> No active validation alerts. ATS and structure are fully optimal!
                  </div>
                ) : (
                  <div className="space-y-2">
                    {validation.map((err, idx) => (
                      <div 
                        key={idx} 
                        className={`p-2.5 rounded-lg border flex flex-col gap-0.5 ${
                          err.severity === 'error' 
                            ? 'bg-rose-950/20 border-rose-900/50 text-rose-300' 
                            : err.severity === 'warning'
                            ? 'bg-amber-950/20 border-amber-900/50 text-amber-300'
                            : 'bg-blue-950/20 border-blue-900/50 text-blue-300'
                        }`}
                      >
                        <span className="font-extrabold uppercase text-[9px] tracking-wider opacity-80">
                          {err.severity} – {err.field}
                        </span>
                        <span className="font-sans text-xs">{err.message}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
