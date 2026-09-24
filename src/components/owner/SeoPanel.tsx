/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Globe, Eye, Edit, PlusCircle, RefreshCw, X } from 'lucide-react';
import SEO_METRICS from '../../../content/seo.json';

interface SEOItem {
  title: string;
  description: string;
  canonical: string;
}

interface SEOData {
  [key: string]: SEOItem;
}

const typedSeoData = SEO_METRICS as SEOData;

export const SeoPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSeoKey, setSelectedSeoKey] = useState<string | null>(null);

  // Convert schema record map inside arrays for easier programmatic filtration
  const seoItems = Object.keys(typedSeoData).map((key) => ({
    keyName: key,
    ...typedSeoData[key],
  }));

  const filteredItems = seoItems.filter(item => {
    return (
      item.keyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.canonical.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleEditUnsupported = (key: string) => {
    alert(`[Phase 2 CRUD Active Preview]: The update trigger for seo key "${key}" is pre-wired! In Phase 2, this modal will dispatch a JSON-overwrite payload back to '/api/admin/seo'.`);
  };

  const handleCreateUnsupported = () => {
    alert(`[Phase 2 CRUD Active Preview]: Preparing a blank template profile schema mapped to SEOItem interface...`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-stone-900 font-normal">Global SEO Coordinates</h2>
          <p className="text-stone-500 text-xs">
            Administer critical metadata structures dynamically serving site-crawler routes mapped in <code>/content/seo.json</code>.
          </p>
        </div>
        <button 
          onClick={handleCreateUnsupported}
          className="inline-flex items-center gap-1.5 bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <PlusCircle size={14} /> Add SEO Pathway
        </button>
      </div>

      {/* Control bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-stone-50 p-4 border border-stone-200 rounded-2xl">
        <div className="relative md:col-span-8">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
          <input 
            type="text"
            placeholder="Search pathways by key, Meta Title, Description, or canonical URLs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-[#3ea884]"
          />
        </div>

        <div className="md:col-span-4 flex items-center justify-end text-right">
          <span className="text-[10px] font-mono text-stone-500 font-bold bg-white border border-stone-200 px-3 py-1.5 rounded-xl">
            TOTAL PATHWAYS: {seoItems.length}
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-150 text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3.5">Page Identifier Key</th>
                <th className="px-6 py-3.5">Canonical Coordinates</th>
                <th className="px-6 py-3.5">Meta Title</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans text-stone-800">
              {filteredItems.length > 0 ? (
                filteredItems.map((item) => (
                  <tr key={item.keyName} className="hover:bg-stone-50/50 transition-all">
                    <td className="px-6 py-4 font-mono text-[11px] text-stone-900 font-bold">
                      {item.keyName}
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-[#2a8767] max-w-xs truncate">
                      {item.canonical}
                    </td>
                    <td className="px-6 py-4 font-serif text-stone-850">
                      {item.title}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedSeoKey(item.keyName)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Inspect JSON Attributes"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => handleEditUnsupported(item.keyName)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Wired Edit Button (Phase 2)"
                        >
                          <Edit size={14} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-12 text-center text-stone-400 font-mono text-xs">
                    No matching SEO attributes found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedSeoKey && typedSeoData[selectedSeoKey] && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-xl w-full shadow-xl flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-stone-150 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-[9px] font-mono font-bold text-stone-400 block tracking-widest uppercase">
                  META SCHEMATIC ATTRIBUTES
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  <Globe size={16} className="text-[#3ea884]" /> Key: "{selectedSeoKey}" Map
                </h3>
              </div>
              <button 
                onClick={() => setSelectedSeoKey(null)}
                className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-5 text-left text-xs leading-relaxed">
              
              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Title Element (&lt;title&gt;)</strong>
                <p className="text-stone-900 font-serif font-semibold text-sm bg-stone-50 p-3 rounded-lg border border-stone-150">
                  {typedSeoData[selectedSeoKey].title}
                </p>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Meta Description (&lt;meta name="description"&gt;)</strong>
                <p className="text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-150 leading-relaxed font-sans">
                  {typedSeoData[selectedSeoKey].description}
                </p>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-[#3ea884] block mb-1 font-bold">Canonical Anchor (&lt;link rel="canonical"&gt;)</strong>
                <p className="text-stone-605 bg-stone-100 p-2.5 rounded font-mono text-[11px] border border-stone-200">
                  {typedSeoData[selectedSeoKey].canonical}
                </p>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="p-4 border-t border-stone-150 bg-stone-50 flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setSelectedSeoKey(null)}
                className="bg-white border border-stone-250 hover:bg-stone-50 text-stone-700 font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close Inspect
              </button>
              <button 
                onClick={() => {
                  setSelectedSeoKey(null);
                  handleEditUnsupported(selectedSeoKey);
                }}
                className="bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> Edit Meta Elements
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
