/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Eye, Edit, PlusCircle, Trash, RefreshCw, X, Award, CheckCircle } from 'lucide-react';
import TEMPLATES from '../../../content/templatePages.json';

interface TemplatePage {
  slug: string;
  templateName: string;
  bestFor: string;
  description: string;
  strengths: string[];
  recommendedIndustries: string[];
  seoTitle: string;
  seoDescription: string;
}

const typedTemplates = TEMPLATES as TemplatePage[];

export const TemplatesPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<TemplatePage | null>(null);

  // Filter & Search Logic
  const filteredTemplates = typedTemplates.filter(tp => {
    return (
      tp.templateName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.bestFor.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tp.recommendedIndustries.some(ind => ind.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  const handleEditUnsupported = (title: string) => {
    alert(`[Phase 2 CRUD Active Preview]: The update trigger for "${title}" is pre-wired! In Phase 2, this modal will dispatch a JSON-overwrite payload back to '/api/admin/templates'.`);
  };

  const handleCreateUnsupported = () => {
    alert(`[Phase 2 CRUD Active Preview]: Preparing a blank template profile schema mapped to TemplatePage interface...`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-stone-900 font-normal">Resume System Templates</h2>
          <p className="text-stone-500 text-xs">
            Inspect core visual resume templates currently loaded at <code>/content/templatePages.json</code>.
          </p>
        </div>
        <button 
          onClick={handleCreateUnsupported}
          className="inline-flex items-center gap-1.5 bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <PlusCircle size={14} /> Add New Template
        </button>
      </div>

      {/* Control bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-stone-50 p-4 border border-stone-200 rounded-2xl">
        <div className="relative md:col-span-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
          <input 
            type="text"
            placeholder="Search templates by Name, Target Audience, Strengths or Industries..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-[#3ea884]"
          />
        </div>

        <div className="md:col-span-4 flex items-center justify-end text-right">
          <span className="text-[10px] font-mono text-stone-500 font-bold bg-white border border-stone-200 px-3 py-1.5 rounded-xl">
            SHOWN: {filteredTemplates.length} / {typedTemplates.length} TEMPLATES
          </span>
        </div>
      </div>

      {/* Grid listing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {filteredTemplates.length > 0 ? (
          filteredTemplates.map((tp) => (
            <div 
              key={tp.slug} 
              className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between hover:border-stone-300 transition-all shadow-xs"
            >
              <div>
                <div className="flex items-center justify-between mb-3 text-[10px] font-mono font-bold text-[#3ea884]">
                  <span>/{tp.slug}</span>
                  <span className="bg-stone-50 border border-stone-200 px-2 py-0.5 rounded text-stone-600 font-mono">
                    Template Core
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-900 mb-2">
                  {tp.templateName}
                </h3>
                <p className="text-stone-500 text-[11px] leading-relaxed mb-4">
                  <strong className="text-stone-700 block mb-0.5">Best For:</strong> {tp.bestFor}
                </p>
                <p className="text-stone-605 text-xs inline-block mb-6 line-clamp-3">
                  {tp.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <button
                  onClick={() => setSelectedTemplate(tp)}
                  className="inline-flex items-center gap-1 text-xs font-bold text-stone-800 hover:text-stone-950 font-mono uppercase cursor-pointer"
                >
                  <Eye size={13} /> View JSON
                </button>
                <div className="flex gap-1.5 font-mono text-[10px]">
                  <button
                    onClick={() => handleEditUnsupported(tp.templateName)}
                    className="p-1 px-2.5 border border-stone-255 hover:bg-stone-50 text-stone-700 rounded transition-colors"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => alert(`[Phase 2 CRUD Active]: Record deletion will remove associated template attributes at "${tp.slug}".`)}
                    className="p-1 px-2.5 border border-red-200/50 hover:bg-red-50 text-red-650 rounded transition-colors"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 py-16 text-center text-stone-400 font-mono text-xs border border-dashed border-stone-250 rounded-2xl bg-stone-50/50">
            No matching design templates found for input query.
          </div>
        )}
      </div>

      {/* Inspect Draw/Detail Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-stone-150 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-[9px] font-mono font-bold text-stone-400 block tracking-widest uppercase">
                  TEMPLATE SCHEMATIC ATTRIBUTES
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  📐 {selectedTemplate.templateName} Model
                </h3>
              </div>
              <button 
                onClick={() => setSelectedTemplate(null)}
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
                    /{selectedTemplate.slug}
                  </span>
                </div>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Target Persona</strong>
                  <span className="font-serif text-stone-900 font-bold">{selectedTemplate.bestFor}</span>
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1 font-bold">Meta-Description</strong>
                <p className="text-stone-750 bg-stone-50 p-3 leading-relaxed">
                  {selectedTemplate.description}
                </p>
              </div>

              {/* Strengths */}
              <div>
                <strong className="text-[10px] font-mono uppercase text-[#3ea884] block mb-2 font-bold">Strengths & Capabilities (String Array)</strong>
                <div className="space-y-2 pl-1">
                  {selectedTemplate.strengths.map((s, idx) => (
                    <div key={idx} className="flex gap-2 text-stone-700 bg-stone-50/50 p-2 border border-stone-150 rounded-lg">
                      <CheckCircle size={13} className="text-[#3ea884] shrink-0 mt-0.5" />
                      <div>{s}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Industries */}
              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-2">Recommended Industries (String Array)</strong>
                <div className="flex flex-wrap gap-2">
                  {selectedTemplate.recommendedIndustries.map((ind, i) => (
                    <span key={i} className="bg-stone-50 border border-stone-200 text-stone-750 px-3 py-1 rounded-lg font-mono flex items-center gap-1.5">
                      <Award size={11} className="text-stone-400" />
                      {ind}
                    </span>
                  ))}
                </div>
              </div>

              <div className="border-t border-stone-150 pt-4 space-y-3 bg-stone-50 p-4 rounded-xl">
                <span className="text-[10px] font-mono font-extrabold text-stone-450 block uppercase tracking-wider">
                  Programmatic SEO Coordinates
                </span>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-450 block mb-0.5">Seo Title</strong>
                  <p className="text-stone-750 font-serif font-semibold">{selectedTemplate.seoTitle}</p>
                </div>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-450 block mb-0.5">Seo Description</strong>
                  <p className="text-stone-700">{selectedTemplate.seoDescription}</p>
                </div>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="p-4 border-t border-stone-150 bg-stone-50 flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setSelectedTemplate(null)}
                className="bg-white border border-stone-250 hover:bg-stone-50 text-stone-700 font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close Inspect
              </button>
              <button 
                onClick={() => {
                  setSelectedTemplate(null);
                  handleEditUnsupported(selectedTemplate.templateName);
                }}
                className="bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> Edit Template
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
