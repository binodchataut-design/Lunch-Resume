/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Eye, Filter, Edit, PlusCircle, Trash, RefreshCw, X } from 'lucide-react';
import RESUME_EXAMPLES from '../../../content/resumeExamples.json';
import { ResumeExample } from '../../../types/content';

const typedResumeExamples = RESUME_EXAMPLES as ResumeExample[];

export const ResumeExamplesPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('All');
  const [selectedExample, setSelectedExample] = useState<ResumeExample | null>(null);

  // Derive all unique industries
  const industries = ['All', ...Array.from(new Set(typedResumeExamples.map(e => e.industry)))];

  // Filter & Search Logic
  const filteredExamples = typedResumeExamples.filter(ex => {
    const matchesSearch = 
      ex.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ex.sampleSkills.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesIndustry = selectedIndustry === 'All' || ex.industry === selectedIndustry;

    return matchesSearch && matchesIndustry;
  });

  const handleEditUnsupported = (title: string) => {
    alert(`[Phase 2 CRUD Active Preview]: The update trigger for "${title}" is pre-wired! In Phase 2, this modal will dispatch a JSON-overwrite payload back to '/api/admin/resume-examples'.`);
  };

  const handleCreateUnsupported = () => {
    alert(`[Phase 2 CRUD Active Preview]: Preparing a blank template profile schema mapped to ResumeExample interface...`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-stone-900 font-normal">Resume Examples Archive</h2>
          <p className="text-stone-500 text-xs">
            Inspect core metrics-driven templates currently loaded at <code>/content/resumeExamples.json</code>.
          </p>
        </div>
        <button 
          onClick={handleCreateUnsupported}
          className="inline-flex items-center gap-1.5 bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <PlusCircle size={14} /> Add Resume Profile
        </button>
      </div>

      {/* Control bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-stone-50 p-4 border border-stone-200 rounded-2xl">
        <div className="relative md:col-span-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
          <input 
            type="text"
            placeholder="Search by Title, Industry, Summary, or Skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-[#3ea884]"
          />
        </div>

        <div className="relative md:col-span-3 flex items-center gap-1.5">
          <Filter className="text-stone-400 shrink-0" size={14} />
          <select 
            value={selectedIndustry}
            onChange={(e) => setSelectedIndustry(e.target.value)}
            className="w-full text-xs p-2 bg-white border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-[#3ea884]"
          >
            {industries.map(ind => (
              <option key={ind} value={ind}>{ind}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 flex items-center justify-end text-right">
          <span className="text-[10px] font-mono text-stone-500 font-bold bg-white border border-stone-200 px-3 py-1.5 rounded-xl">
            SHOWN: {filteredExamples.length} / {typedResumeExamples.length} RECORDS
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-150 text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Slug</th>
                <th className="px-6 py-3.5">Job Title</th>
                <th className="px-6 py-3.5">Industry</th>
                <th className="px-6 py-3.5">Skills Snippet</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans text-stone-800">
              {filteredExamples.length > 0 ? (
                filteredExamples.map((ex) => (
                  <tr key={ex.slug} className="hover:bg-stone-50/50 transition-all">
                    <td className="px-6 py-4 font-mono text-[11px] text-[#2a8767] font-bold">
                      /{ex.slug}
                    </td>
                    <td className="px-6 py-4 font-serif font-bold text-sm text-stone-900">
                      {ex.jobTitle}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 bg-stone-100 border border-stone-200 rounded-md text-[10px] font-mono text-stone-650">
                        {ex.industry}
                      </span>
                    </td>
                    <td className="px-6 py-4 max-w-xs truncate font-mono text-[10px] text-stone-500">
                      {ex.sampleSkills.slice(0, 3).join(', ')}...
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedExample(ex)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Inspect JSON Attributes"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => handleEditUnsupported(ex.jobTitle)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Wired Edit Button (Phase 2)"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => alert(`[Phase 2 CRUD Active]: Record deletion will dispatch file restructuring logs to remove ${ex.slug}.`)}
                          className="p-1.5 text-stone-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                          title="Wired Delete Button (Phase 2)"
                        >
                          <Trash size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-stone-400 font-mono text-xs">
                    No matching resume examples found for keywords.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Drawer/Modal */}
      {selectedExample && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-stone-150 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-[9px] font-mono font-bold text-stone-400 block tracking-widest uppercase">
                  ACTIVE LOOKUP SCHEMA INSPECTION
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  📁 {selectedExample.jobTitle} Attributes
                </h3>
              </div>
              <button 
                onClick={() => setSelectedExample(null)}
                className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-5 text-left text-xs leading-relaxed overflow-y-auto">
              
              <div className="grid grid-cols-2 gap-4 border-b border-stone-100 pb-4">
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Crawl Slug</strong>
                  <span className="font-mono bg-stone-100 px-2.5 py-1 rounded border border-stone-200 text-[#2a8767] font-semibold">
                    /{selectedExample.slug}
                  </span>
                </div>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Industry</strong>
                  <span className="font-serif text-stone-900 font-bold">{selectedExample.industry}</span>
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Professional Summary</strong>
                <p className="text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-150">
                  {selectedExample.summary}
                </p>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">sampleExperience (String API Array)</strong>
                <div className="space-y-2 mt-2 pl-2 border-l-2 border-stone-250">
                  {selectedExample.sampleExperience.map((exp, idx) => (
                    <div key={idx} className="text-stone-605">
                     * <span className="font-serif font-bold text-stone-800">{exp.split(':')[0]}:</span> {exp.split(':').slice(1).join(':')}
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">sampleSkills</strong>
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {selectedExample.sampleSkills.map((s, i) => (
                    <span key={i} className="bg-stone-50 border border-stone-200 px-2.5 py-0.5 rounded text-[10px] font-mono text-stone-600">
                      {s}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">keyAchievements</strong>
                <ul className="list-disc pl-4 space-y-1 mt-1 text-stone-605">
                  {selectedExample.keyAchievements.map((ach, i) => (
                    <li key={i}>{ach}</li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-stone-150 pt-4 space-y-3 bg-stone-50 p-4 rounded-xl">
                <span className="text-[10px] font-mono font-extrabold text-stone-450 block uppercase tracking-wider">
                  Programmatic SEO Coordinates
                </span>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-450 block mb-0.5">Seo Title</strong>
                  <p className="text-stone-750 font-serif font-semibold">{selectedExample.seoTitle}</p>
                </div>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-450 block mb-0.5">Seo Description</strong>
                  <p className="text-stone-700">{selectedExample.seoDescription}</p>
                </div>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="p-4 border-t border-stone-150 bg-stone-50 flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setSelectedExample(null)}
                className="bg-white border border-stone-250 hover:bg-stone-50 text-stone-700 font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close Inspect
              </button>
              <button 
                onClick={() => {
                  setSelectedExample(null);
                  handleEditUnsupported(selectedExample.jobTitle);
                }}
                className="bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> Edit Record
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
