/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { 
  Menu, X, ChevronRight, ShieldCheck, ChevronDown, BookOpen, FileText, Layout, Layers, Briefcase
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import siteConfig from '../content/siteConfig.json';
import { SiteConfig } from '../types/content';

import { HomePage } from './pages/HomePage';
import { ResumeBuilderPage } from './pages/ResumeBuilderPage';
import { CoverLetterPage } from './pages/CoverLetterPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ResumeExamplesIndexPage } from './pages/ResumeExamplesIndexPage';
import { ResumeExamplePage } from './pages/ResumeExamplePage';
import { ResumeTemplatesIndexPage } from './pages/ResumeTemplatesIndexPage';
import { ResumeTemplatePage } from './pages/ResumeTemplatePage';
import { CoverLetterExamplesIndexPage } from './pages/CoverLetterExamplesIndexPage';
import { CoverLetterExamplePage } from './pages/CoverLetterExamplePage';
import { OwnerDashboardPage, OwnerRouteGuard } from './pages/OwnerDashboardPage';
import { DeveloperPanel } from './components/DeveloperPanel';

const typedSiteConfig = siteConfig as SiteConfig;

const App: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const isWorkspaceRoute = location.pathname === '/resume-builder' || location.pathname === '/cover-letter-builder';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (path: string, sectionId?: string) => (e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setMenuOpen(false);
    
    if (location.pathname !== path) {
      navigate(path);
      if (sectionId) {
        setTimeout(() => {
          const element = document.getElementById(sectionId);
          if (element) {
            const headerOffset = 80;
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
            window.scrollTo({
              top: offsetPosition,
              behavior: 'smooth'
            });
          }
        }, 300);
      } else {
        window.scrollTo(0, 0);
      }
    } else {
      if (sectionId) {
        const element = document.getElementById(sectionId);
        if (element) {
          const headerOffset = 85;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-white text-[#1A1F1E] font-sans selection:bg-[#0F766E]/20 selection:text-[#1A1F1E]">
      
      {/* Floating premium sticky navigation bar */}
      {!isWorkspaceRoute && (
        <nav className={`fixed left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 md:px-8 ${scrolled ? 'top-2' : 'top-4'}`}>
        <div className={`mx-auto max-w-7xl w-full rounded-full border transition-all duration-300 flex justify-between items-center ${
          scrolled 
            ? 'bg-white/85 border-[#E2E8E6] shadow-[0_12px_45px_rgba(0,0,0,0.08)] backdrop-blur-xl py-2.5 px-5 md:px-7' 
            : 'bg-white/95 border-[#E2E8E6]/60 shadow-[0_4px_20px_rgba(0,0,0,0.02)] backdrop-blur-md py-3.5 px-6 md:px-8'
        }`}>
          
          {/* Logo & Brand Container */}
          <div className="flex items-center gap-2 cursor-pointer group" onClick={handleNavigation('/')}>
            <div className="w-8.5 h-8.5 bg-gradient-to-tr from-teal-800 to-emerald-600 text-white rounded-xl flex items-center justify-center font-bold text-[14.5px] shadow-[0_4px_12px_rgba(15,118,110,0.22)] group-hover:scale-105 transition-all">
              {typedSiteConfig.logoAcronym}
            </div>
            <span className="font-serif text-base md:text-lg tracking-tight text-[#1C2B33] flex items-center font-black group-hover:text-emerald-700 transition-colors">
              {typedSiteConfig.name.substring(0, 5)}<span className="text-[#1C2B33]/80 font-normal">{typedSiteConfig.nameSuffix}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 ml-1 group-hover:scale-125 transition-transform"></span>
            </span>
          </div>

          {/* Desktop Center Links grouped into premium dropdowns */}
          <div className="hidden lg:flex items-center gap-7 text-[13.5px] font-medium text-[#46504D]">
            
            {/* Templates Category Dropdown */}
            <div className="relative group py-2">
              <button 
                onClick={handleNavigation('/resume-templates')}
                className="flex items-center gap-1 hover:text-[#0F766E] transition-colors py-1 cursor-pointer font-semibold text-[13.5px]"
              >
                <span>Templates</span>
                <ChevronDown size={13} className="text-[#46504D]/70 transition-transform duration-250 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[380px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="bg-white border border-[#E2E8E6] rounded-2xl shadow-[0_20px_50px_rgba(15,118,110,0.12)] p-4">
                  <div className="flex flex-col gap-1.5">
                    <a 
                      href="/resume-templates" 
                      onClick={handleNavigation('/resume-templates')}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F7F9F8] transition-colors group/item"
                    >
                      <div className="p-2.5 bg-emerald-500/5 text-emerald-700 rounded-xl border border-emerald-500/10 group-hover/item:bg-emerald-500/10 transition-colors">
                        <Layout size={17} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[13.5px] text-[#1C2B33] group-hover/item:text-[#0F766E] transition-colors">Resume Templates</h4>
                        <p className="text-[12px] text-[#46504D] leading-normal mt-0.5">Browse professional ATS-friendly resume designs.</p>
                      </div>
                    </a>

                    <a 
                      href="/resume-examples" 
                      onClick={handleNavigation('/resume-examples')}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F7F9F8] transition-colors group/item"
                    >
                      <div className="p-2.5 bg-indigo-500/5 text-indigo-700 rounded-xl border border-indigo-500/10 group-hover/item:bg-indigo-500/10 transition-colors">
                        <Briefcase size={17} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[13.5px] text-[#1C2B33] group-hover/item:text-[#0F766E] transition-colors">Resume Examples</h4>
                        <p className="text-[12px] text-[#46504D] leading-normal mt-0.5">Explore real resume examples for different careers.</p>
                      </div>
                    </a>

                    <a 
                      href="/cover-letter-examples" 
                      onClick={handleNavigation('/cover-letter-examples')}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F7F9F8] transition-colors group/item"
                    >
                      <div className="p-2.5 bg-violet-500/5 text-violet-700 rounded-xl border border-violet-500/10 group-hover/item:bg-violet-500/10 transition-colors">
                        <FileText size={17} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[13.5px] text-[#1C2B33] group-hover/item:text-[#0F766E] transition-colors">Cover Letter Examples</h4>
                        <p className="text-[12px] text-[#46504D] leading-normal mt-0.5">See proven cover letter examples and formats.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Builders Category Dropdown */}
            <div className="relative group py-2">
              <button 
                onClick={handleNavigation('/resume-builder')}
                className="flex items-center gap-1 hover:text-[#0F766E] transition-colors py-1 cursor-pointer font-semibold text-[13.5px]"
              >
                <span>Builders</span>
                <ChevronDown size={13} className="text-[#46504D]/70 transition-transform duration-250 group-hover:rotate-180" />
              </button>
              
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 w-[380px] opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-all duration-300 transform origin-top scale-95 group-hover:scale-100 z-50">
                <div className="bg-white border border-[#E2E8E6] rounded-2xl shadow-[0_20px_50px_rgba(15,118,110,0.12)] p-4">
                  <div className="flex flex-col gap-1.5">
                    <a 
                      href="/resume-builder" 
                      onClick={handleNavigation('/resume-builder')}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F7F9F8] transition-colors group/item"
                    >
                      <div className="p-2.5 bg-teal-500/5 text-teal-700 rounded-xl border border-teal-500/10 group-hover/item:bg-teal-500/10 transition-colors">
                        <Layers size={17} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[13.5px] text-[#1C2B33] group-hover/item:text-[#0F766E] transition-colors">Resume Builder</h4>
                        <p className="text-[12px] text-[#46504D] leading-normal mt-0.5">Create an industry-standard resume in minutes.</p>
                      </div>
                    </a>

                    <a 
                      href="/cover-letter-builder" 
                      onClick={handleNavigation('/cover-letter-builder')}
                      className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-[#F7F9F8] transition-colors group/item"
                    >
                      <div className="p-2.5 bg-amber-500/5 text-amber-700 rounded-xl border border-amber-500/10 group-hover/item:bg-amber-500/10 transition-colors">
                        <BookOpen size={17} />
                      </div>
                      <div className="text-left">
                        <h4 className="font-bold text-[13.5px] text-[#1C2B33] group-hover/item:text-[#0F766E] transition-colors">Cover Letter Builder</h4>
                        <p className="text-[12px] text-[#46504D] leading-normal mt-0.5">Write a matching cover letter that lands interviews.</p>
                      </div>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Blog Navigation Link */}
            <div className="relative group py-2">
              <a 
                href="/blog" 
                onClick={handleNavigation('/blog')} 
                className={`hover:text-[#0F766E] transition-colors flex items-center gap-1 cursor-pointer py-1 font-semibold text-[13.5px] ${location.pathname === '/blog' || location.pathname.startsWith('/blog/') ? 'text-[#1C2B33] font-bold' : ''}`}
              >
                Blog
              </a>
              <div className={`absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 transition-transform duration-200 ${location.pathname === '/blog' || location.pathname.startsWith('/blog/') ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'}`}></div>
            </div>

          </div>
          
          {/* Desktop Right Conversion CTA Button */}
          <div className="hidden lg:flex items-center gap-6">
            <button 
              onClick={handleNavigation('/resume-builder')}
              className="relative overflow-hidden group px-6 py-3 rounded-full font-sans font-bold text-[12.5px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 text-white border border-teal-500/20 shadow-[0_12px_25px_-4px_rgba(15,118,110,0.3)] bg-gradient-to-r from-teal-800 via-[#0F766E] to-emerald-700 hover:from-teal-700 hover:to-emerald-600"
            >
              <div className="absolute inset-0 bg-white/18 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
              <span className="relative z-10 flex items-center justify-center gap-1.5">
                <span>Create My Resume</span>
                <svg className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
            </button>
          </div>

          {/* Mobile buttons: always visible primary conversion CTA and burger */}
          <div className="flex items-center gap-2.5 lg:hidden">
            <button 
              onClick={handleNavigation('/resume-builder')}
              className="relative overflow-hidden group px-4 py-2 rounded-full font-sans font-bold text-[11.5px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 transform active:translate-y-0 text-white border border-teal-500/10 shadow-[0_8px_16px_rgba(15,118,110,0.2)] bg-gradient-to-r from-teal-800 via-[#0F766E] to-emerald-700"
            >
              <span className="relative z-10">Create Resume</span>
            </button>
            <button 
              className="text-[#1C2B33] p-2 hover:bg-emerald-500/5 rounded-full transition-colors cursor-pointer" 
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <X size={21} className="text-[#1C2B33]" /> : <Menu size={21} className="text-[#1C2B33]" />}
            </button>
          </div>
        </div>
      </nav>
      )}

      {/* Mobile Premium Slider Panel overlay */}
      {!isWorkspaceRoute && (
        <AnimatePresence>
        {menuOpen && (
          <>
            {/* Soft backdrop blur filter */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 z-45 bg-slate-900/40 backdrop-blur-md"
            />

            {/* Sliding Drawer Body */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 26, stiffness: 220 }}
              className="fixed right-0 top-0 bottom-0 w-full max-w-[390px] z-50 bg-white shadow-2xl flex flex-col justify-between p-6 overflow-y-auto"
            >
              <div className="flex flex-col gap-7">
                {/* Top header area */}
                <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                  <div className="flex items-center gap-2 cursor-pointer" onClick={() => { setMenuOpen(false); navigate('/'); }}>
                    <div className="w-8 h-8 bg-gradient-to-tr from-teal-800 to-emerald-600 text-white rounded-lg flex items-center justify-center font-bold text-[13px]">
                      {typedSiteConfig.logoAcronym}
                    </div>
                    <span className="font-serif text-base tracking-tight text-[#1C2B33] flex items-center font-bold">
                      {typedSiteConfig.name.substring(0, 5)}<span className="font-normal text-[#1C2B33]/80">{typedSiteConfig.nameSuffix}</span>
                    </span>
                  </div>
                  
                  <button 
                    onClick={() => setMenuOpen(false)}
                    className="text-[#1C2B33] p-2 hover:bg-gray-100 rounded-full transition-colors cursor-pointer"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Logical grouping panels */}
                <div className="flex flex-col gap-5">
                  
                  {/* Category: Templates */}
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 mb-2.5 px-1">
                      Templates
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <a 
                        href="/resume-templates" 
                        onClick={handleNavigation('/resume-templates')}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                      >
                        <div className="p-2 bg-emerald-50 text-emerald-700 rounded-lg">
                          <Layout size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-[#1C2B33]">Resume Templates</div>
                          <div className="text-[11px] text-gray-500">Professional ATS-friendly designs.</div>
                        </div>
                      </a>

                      <a 
                        href="/resume-examples" 
                        onClick={handleNavigation('/resume-examples')}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                      >
                        <div className="p-2 bg-indigo-50 text-indigo-700 rounded-lg">
                          <Briefcase size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-[#1C2B33]">Resume Examples</div>
                          <div className="text-[11px] text-gray-500">Real resume examples by careers.</div>
                        </div>
                      </a>

                      <a 
                        href="/cover-letter-examples" 
                        onClick={handleNavigation('/cover-letter-examples')}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                      >
                        <div className="p-2 bg-violet-50 text-violet-700 rounded-lg">
                          <FileText size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-[#1C2B33]">Cover Letter Examples</div>
                          <div className="text-[11px] text-gray-500">Proven cover letter formats.</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Category: Builders */}
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 mb-2.5 px-1">
                      Builders
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <a 
                        href="/resume-builder" 
                        onClick={handleNavigation('/resume-builder')}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                      >
                        <div className="p-2 bg-teal-50 text-teal-700 rounded-lg">
                          <Layers size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-[#1C2B33]">Resume Builder</div>
                          <div className="text-[11px] text-gray-500">Build standard resume in minutes.</div>
                        </div>
                      </a>

                      <a 
                        href="/cover-letter-builder" 
                        onClick={handleNavigation('/cover-letter-builder')}
                        className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors text-left"
                      >
                        <div className="p-2 bg-amber-50 text-amber-700 rounded-lg">
                          <BookOpen size={15} />
                        </div>
                        <div>
                          <div className="font-bold text-[13px] text-[#1C2B33]">Cover Letter Builder</div>
                          <div className="text-[11px] text-gray-500">Write high-converting cover letters.</div>
                        </div>
                      </a>
                    </div>
                  </div>

                  {/* Category: Insights */}
                  <div>
                    <div className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-700 mb-2 px-1">
                      Resource Hub
                    </div>
                    <a 
                      href="/blog" 
                      onClick={handleNavigation('/blog')}
                      className="flex items-center justify-between p-2.5 rounded-xl hover:bg-gray-50 active:bg-gray-100 transition-colors font-bold text-[13px] text-[#1C2B33]"
                    >
                      <span>Blog & Articles</span>
                      <ChevronRight size={15} className="text-gray-400" />
                    </a>
                  </div>

                </div>
              </div>

              {/* Action Footer easily within touch range */}
              <div className="mt-8 pt-4 border-t border-gray-100">
                <button 
                  onClick={(e) => {
                    setMenuOpen(false);
                    handleNavigation('/resume-builder')(e);
                  }}
                  className="w-full relative overflow-hidden group py-3.5 rounded-2xl font-sans font-bold text-[13.5px] tracking-wider uppercase cursor-pointer text-center transition-all duration-300 text-white border border-teal-500/20 shadow-[0_12px_25px_rgba(15,118,110,0.25)] bg-gradient-to-r from-teal-800 via-[#0F766E] to-emerald-700"
                >
                  <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    <span>Create My Resume</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                    </svg>
                  </span>
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
      )}

      {/* --- DECLARATIVE ROUTER VIEW AREA --- */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/resume-builder" element={<ResumeBuilderPage />} />
        <Route path="/cover-letter-builder" element={<CoverLetterPage />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPostPage />} />
        <Route path="/resume-examples" element={<ResumeExamplesIndexPage />} />
        <Route path="/resume-examples/:slug" element={<ResumeExamplePage />} />
        <Route path="/resume-templates" element={<ResumeTemplatesIndexPage />} />
        <Route path="/resume-templates/:slug" element={<ResumeTemplatePage />} />
        <Route path="/cover-letter-examples" element={<CoverLetterExamplesIndexPage />} />
        <Route path="/cover-letter-examples/:slug" element={<CoverLetterExamplePage />} />
        <Route path="/owner" element={
          <OwnerRouteGuard>
            <OwnerDashboardPage />
          </OwnerRouteGuard>
        } />
      </Routes>
      <DeveloperPanel />

      {/* FOOTER */}
      {!isWorkspaceRoute && (
        <footer className="bg-[#1C2B33] text-[#F2F7F5]/80 py-16 border-t border-[#E2E8E6]/20">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
            {/* Brand column */}
            <div className="lg:col-span-2 text-left">
              <div className="text-[#F2F7F5] font-sans font-bold text-xl mb-4 tracking-wide cursor-pointer flex items-center gap-1.5" onClick={handleNavigation('/')}>
                {typedSiteConfig.footer.title}<span className="text-[#8CFBD4]">{typedSiteConfig.footer.titleColored}</span>
              </div>
              <p className="text-[13.5px] text-[#F2F7F5]/70 max-w-sm leading-relaxed mb-6">
                {typedSiteConfig.footer.description}
              </p>
            </div>

            {/* Column 1: Build */}
            <div className="text-left">
              <h5 className="text-[#F2F7F5] font-sans font-semibold text-[14px] uppercase tracking-wider mb-4">Build</h5>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><a href="/resume-builder" onClick={handleNavigation('/resume-builder')} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Resume Builder</a></li>
                <li><a href="/cover-letter-builder" onClick={handleNavigation('/cover-letter-builder')} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Cover Letter Builder</a></li>
              </ul>
            </div>

            {/* Column 2: Explore */}
            <div className="text-left">
              <h5 className="text-[#F2F7F5] font-sans font-semibold text-[14px] uppercase tracking-wider mb-4">Explore</h5>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><a href="/resume-templates" onClick={handleNavigation('/resume-templates')} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Resume Templates</a></li>
                <li><a href="/resume-examples" onClick={handleNavigation('/resume-examples')} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Resume Examples</a></li>
                <li><a href="/cover-letter-examples" onClick={handleNavigation('/cover-letter-examples')} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Cover Letter Examples</a></li>
              </ul>
            </div>

            {/* Column 3: Company & Legal */}
            <div className="text-left font-sans">
              <h5 className="text-[#F2F7F5] font-sans font-semibold text-[14px] uppercase tracking-wider mb-4">Company</h5>
              <ul className="space-y-2.5 text-[13.5px] mb-6">
                <li><a href="/blog" onClick={handleNavigation('/blog')} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Blog</a></li>
                <li><a href="#contact" onClick={(e) => { e.preventDefault(); alert("Contact: support@lunchresume.com"); }} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Contact</a></li>
              </ul>
              <h5 className="text-[#F2F7F5] font-sans font-semibold text-[14px] uppercase tracking-wider mb-4">Legal</h5>
              <ul className="space-y-2.5 text-[13.5px]">
                <li><a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Privacy Policy</a></li>
                <li><a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-[#8CFBD4] transition-colors cursor-pointer">Terms of Use</a></li>
              </ul>
            </div>
          </div>
          
          {/* Verification Seals */}
          <div className="mt-8 pt-8 border-t border-[#E2E8E6]/20 flex flex-col sm:flex-row justify-between items-center gap-4 text-[13px] text-[#F2F7F5]/60 animate-none">
            <div className="flex items-center gap-1.5 font-sans">
              <ShieldCheck size={14} className="text-[#8CFBD4]" />
              <span>{typedSiteConfig.footer.sandboxedLabel}</span>
            </div>
            <div className="text-center sm:text-right font-sans">
              <span>{typedSiteConfig.footer.copyright}</span>
            </div>
          </div>
        </div>
      </footer>
      )}

    </div>
  );
};

export default App;
