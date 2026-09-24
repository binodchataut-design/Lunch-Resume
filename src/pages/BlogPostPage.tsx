/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import BLOG_POSTS from '../../content/blogs.json';
import { BlogPost } from '../../types/content';
import { SEO } from '../components/SEO';
import { ArticleSchema, BreadcrumbSchema } from '../components/Schema';

const typedBlogPosts = BLOG_POSTS as BlogPost[];

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const post = typedBlogPosts.find(p => p.id === slug);

  const handleBackToBlog = () => {
    navigate('/blog');
    window.scrollTo(0, 0);
  };

  const handleOpenBuilder = () => {
    navigate('/resume-builder');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!post) {
    return (
      <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 text-center">
        <SEO 
          title="Post Not Found | LunchResume" 
          description="The requested recruiter insights article could not be found." 
          canonical="https://lunchresume.com/blog" 
        />
        <h2 className="font-serif text-2xl text-stone-900 mb-4">Post not found</h2>
        <button 
          onClick={handleBackToBlog}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Library
        </button>
      </div>
    );
  }

  return (
    <div className="pt-28 pb-24 max-w-7xl mx-auto px-6 animate-fade-in">
      <SEO 
        title={`${post.title} | LunchResume`} 
        description={post.excerpt} 
        canonical={`https://lunchresume.com/blog/${slug || post.id}`} 
      />
      <ArticleSchema 
        title={post.title}
        excerpt={post.excerpt}
        datePublished={post.date}
        canonicalUrl={`https://lunchresume.com/blog/${slug || post.id}`}
      />
      <BreadcrumbSchema 
        items={[
          { name: 'Home', item: 'https://lunchresume.com/' },
          { name: 'Blog', item: 'https://lunchresume.com/blog' },
          { name: post.title, item: `https://lunchresume.com/blog/${slug || post.id}` }
        ]}
      />
      <div className="max-w-3xl mx-auto bg-white border border-stone-200 rounded-2xl p-6 sm:p-12 shadow-sm text-left">
        <button 
          onClick={handleBackToBlog}
          className="inline-flex items-center gap-2 text-xs font-mono font-bold text-stone-500 hover:text-stone-900 transition-colors uppercase mb-8 cursor-pointer"
        >
          <ArrowLeft size={14} /> Back to Insights
        </button>
        
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-[#3ea884] uppercase mb-4">
          <span>{post.category}</span>
          <span>•</span>
          <span>{post.readTime}</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4.5xl text-stone-900 leading-tight mb-6 font-bold">{post.title}</h2>
        
        <div className="border-b border-stone-100 pb-4 mb-8 text-stone-400 text-xs font-mono">
          Published: {post.date}
        </div>

        <div className="prose prose-stone prose-sm max-w-none text-stone-700 leading-relaxed text-sm whitespace-pre-line space-y-6">
          {post.content}
        </div>

        <div className="mt-12 pt-8 border-t border-stone-150 flex justify-between items-center bg-stone-50 p-6 rounded-xl border border-stone-200">
          <div>
            <h4 className="font-serif text-base text-stone-900 font-bold mb-1">Ready to calibrate?</h4>
            <p className="text-stone-500 text-xs">Load validated, highly parseable profiles directly inside our free editor.</p>
          </div>
          <button 
            onClick={handleOpenBuilder}
            className="px-4 py-2.5 bg-[#8cfbd4] text-stone-950 font-bold text-xs uppercase tracking-wider rounded-lg hover:bg-[#6ef7c0] transition-all cursor-pointer"
          >
            Open Creator Sandbox
          </button>
        </div>
      </div>
    </div>
  );
};
