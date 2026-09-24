/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { Search, Eye, Filter, Edit, PlusCircle, Trash, RefreshCw, X, FileText, Calendar, Clock } from 'lucide-react';
import BLOGS from '../../../content/blogs.json';

interface Blog {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  readTime: string;
  date: string;
  content: string;
}

const typedBlogs = BLOGS as Blog[];

export const BlogsPanel: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBlog, setSelectedBlog] = useState<Blog | null>(null);

  const categories = ['All', ...Array.from(new Set(typedBlogs.map(b => b.category)))];

  const filteredBlogs = typedBlogs.filter(blog => {
    const matchesSearch = 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.content.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'All' || blog.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleEditUnsupported = (title: string) => {
    alert(`[Phase 2 CRUD Active Preview]: The update trigger for "${title}" is pre-wired! In Phase 2, this modal will dispatch a JSON-overwrite payload back to '/api/admin/blogs'.`);
  };

  const handleCreateUnsupported = () => {
    alert(`[Phase 2 CRUD Active Preview]: Preparing a blank template profile schema mapped to Blog interface...`);
  };

  return (
    <div className="space-y-6 text-left">
      {/* Title block */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="font-serif text-2xl text-stone-900 font-normal">Candidate Blogs & Guides</h2>
          <p className="text-stone-500 text-xs">
            Inspect core educational posts loaded at <code>/content/blogs.json</code>.
          </p>
        </div>
        <button 
          onClick={handleCreateUnsupported}
          className="inline-flex items-center gap-1.5 bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-xs font-bold px-4 py-2.5 rounded-xl transition-all cursor-pointer whitespace-nowrap active:scale-95"
        >
          <PlusCircle size={14} /> Add Blog Post
        </button>
      </div>

      {/* Control bar */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-stone-50 p-4 border border-stone-200 rounded-2xl">
        <div className="relative md:col-span-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" size={15} />
          <input 
            type="text"
            placeholder="Search by Title, Excerpt, Content body..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-white border border-stone-200 rounded-xl text-xs text-stone-850 placeholder-stone-400 focus:outline-none focus:border-[#3ea884]"
          />
        </div>

        <div className="relative md:col-span-3 flex items-center gap-1.5">
          <Filter className="text-stone-400 shrink-0" size={14} />
          <select 
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full text-xs p-2 bg-white border border-stone-200 rounded-xl text-stone-800 focus:outline-none focus:border-[#3ea884]"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="md:col-span-3 flex items-center justify-end text-right">
          <span className="text-[10px] font-mono text-stone-500 font-bold bg-white border border-stone-200 px-3 py-1.5 rounded-xl">
            SHOWN: {filteredBlogs.length} / {typedBlogs.length} POSTS
          </span>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white border border-stone-200 rounded-2xl overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs text-stone-600">
            <thead className="bg-stone-50 border-b border-stone-150 text-stone-500 font-mono text-[10px] uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-3.5">ID / URL</th>
                <th className="px-6 py-3.5">Post Title</th>
                <th className="px-6 py-3.5">Category</th>
                <th className="px-6 py-3.5">Stats</th>
                <th className="px-6 py-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-sans text-stone-800">
              {filteredBlogs.length > 0 ? (
                filteredBlogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-stone-50/50 transition-all">
                    <td className="px-6 py-4 font-mono text-[11px] text-[#2a8767] font-bold">
                      /{blog.id}
                    </td>
                    <td className="px-6 py-4 font-serif font-bold text-sm text-stone-900 max-w-sm">
                      <div className="line-clamp-2">{blog.title}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-2.5 py-0.5 bg-stone-100 border border-stone-200 rounded-md text-[10px] font-mono text-stone-650">
                        {blog.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-mono text-[10px] text-stone-500 space-y-1">
                      <div className="flex items-center gap-1"><Calendar size={11} /> {blog.date}</div>
                      <div className="flex items-center gap-1"><Clock size={11} /> {blog.readTime}</div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <button 
                          onClick={() => setSelectedBlog(blog)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Inspect JSON Attributes"
                        >
                          <Eye size={14} />
                        </button>
                        <button 
                          onClick={() => handleEditUnsupported(blog.title)}
                          className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-stone-100 rounded-lg transition-colors cursor-pointer"
                          title="Wired Edit Button (Phase 2)"
                        >
                          <Edit size={14} />
                        </button>
                        <button 
                          onClick={() => alert(`[Phase 2 CRUD Active]: Record deletion will dispatch file restructuring logs to remove blog ID "${blog.id}".`)}
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
                    No matching blog posts found for selected queries.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Modal */}
      {selectedBlog && (
        <div className="fixed inset-0 z-50 bg-stone-900/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white border border-stone-200 rounded-2xl max-w-2xl w-full max-h-[85vh] overflow-y-auto shadow-xl flex flex-col">
            
            {/* Header */}
            <div className="p-5 border-b border-stone-150 flex items-center justify-between bg-stone-50">
              <div>
                <span className="text-[9px] font-mono font-bold text-stone-400 block tracking-widest uppercase">
                  ACTIVE DEPLOYED BLOG CONTENT
                </span>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-1.5 mt-0.5">
                  📝 {selectedBlog.id} Details
                </h3>
              </div>
              <button 
                onClick={() => setSelectedBlog(null)}
                className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full transition-colors cursor-pointer"
              >
                <X size={15} />
              </button>
            </div>

            {/* Content body */}
            <div className="p-6 space-y-5 text-left text-xs leading-relaxed overflow-y-auto">
              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Post Title</strong>
                <h2 className="font-serif text-xl font-bold text-stone-900">{selectedBlog.title}</h2>
              </div>

              <div className="grid grid-cols-3 gap-4 border-b border-stone-100 pb-4 bg-stone-50/50 p-3 rounded-lg border border-stone-150/80">
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5">Crawl Slug</strong>
                  <span className="font-mono text-[#2a8767] font-bold">/blog/{selectedBlog.id}</span>
                </div>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5">Publish Date</strong>
                  <span className="text-stone-850">{selectedBlog.date}</span>
                </div>
                <div>
                  <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-0.5">Read Estimation</strong>
                  <span className="text-stone-850 font-mono">{selectedBlog.readTime}</span>
                </div>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-1">Summary / Excerpt</strong>
                <p className="text-stone-700 bg-stone-50 p-3 rounded-lg border border-stone-150 italic">
                  "{selectedBlog.excerpt}"
                </p>
              </div>

              <div>
                <strong className="text-[10px] font-mono uppercase text-stone-400 block mb-2">Extended Markdown Content Body</strong>
                <div className="bg-stone-950 text-[#8cfbd4] font-mono p-4 rounded-xl max-h-60 overflow-y-auto border border-stone-800 text-[11px] whitespace-pre-wrap leading-relaxed">
                  {selectedBlog.content}
                </div>
              </div>
            </div>

            {/* Footer triggers */}
            <div className="p-4 border-t border-stone-150 bg-stone-50 flex items-center justify-end gap-2.5">
              <button 
                onClick={() => setSelectedBlog(null)}
                className="bg-white border border-stone-250 hover:bg-stone-50 text-stone-700 font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-colors cursor-pointer"
              >
                Close Inspect
              </button>
              <button 
                onClick={() => {
                  setSelectedBlog(null);
                  handleEditUnsupported(selectedBlog.title);
                }}
                className="bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-[10px] font-bold px-4 py-2 rounded-lg transition-all cursor-pointer flex items-center gap-1.5"
              >
                <RefreshCw size={12} /> Edit Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
