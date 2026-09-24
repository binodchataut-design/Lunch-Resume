/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import BLOG_POSTS from '../../content/blogs.json';
import { BlogPost } from '../../types/content';
import { SEO } from '../components/SEO';
import seoJson from '../../content/seo.json';

const typedBlogPosts = BLOG_POSTS as BlogPost[];

export const BlogPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6">
      <SEO 
        title={seoJson.blog.title} 
        description={seoJson.blog.description} 
        canonical={seoJson.blog.canonical} 
      />
      <div className="max-w-3xl mx-auto text-center mb-16">
        <div className="inline-flex items-center gap-1.5 mb-3 px-3 py-1 bg-[#8cfbd4]/10 text-stone-800 text-[10px] tracking-widest uppercase font-extrabold rounded-full border border-[#8cfbd4]/20">
          📚 RECRUITER INSIGHTS BLOGS
        </div>
        <h1 className="font-serif text-3xl md:text-5xl text-stone-900 mb-4 font-normal">The LunchResume Library</h1>
        <p className="text-stone-600 text-sm md:text-base leading-relaxed">
          Actionable guides on navigating ATS algorithm filters, structuring quantified accomplishments, and commanding attention in under six seconds.
        </p>
      </div>

      {/* Grid representation */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {typedBlogPosts.map((post) => (
          <div 
            key={post.id} 
            className="bg-white rounded-2xl border border-stone-200/80 p-6 shadow-xs flex flex-col justify-between hover:shadow-md hover:border-stone-300 transition-all text-left"
          >
            <div>
              <div className="flex items-center gap-2 text-[10px] font-mono font-bold text-[#3ea884] uppercase mb-3.5">
                <span>{post.category}</span>
                <span>•</span>
                <span>{post.readTime}</span>
              </div>
              <h3 
                className="font-serif text-xl font-bold text-stone-900 mb-3 hover:text-stone-750 cursor-pointer" 
                onClick={() => {
                  navigate(`/blog/${post.id}`);
                  window.scrollTo(0, 0);
                }}
              >
                {post.title}
              </h3>
              <p className="text-stone-500 text-xs leading-relaxed mb-6">
                {post.excerpt}
              </p>
            </div>
            <button 
              onClick={() => {
                navigate(`/blog/${post.id}`);
                window.scrollTo(0, 0);
              }}
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#2a8767] hover:text-[#1d6148] transition-colors mt-auto font-mono uppercase tracking-wider text-left cursor-pointer"
            >
              Read article <ChevronRight size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
