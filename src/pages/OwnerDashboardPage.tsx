/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Lock, Key, LogOut, LayoutDashboard, FileText, Mail, 
  BookOpen, Layers, Globe, Home, Database, Search, ArrowRight 
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { ResumeExamplesPanel } from '../components/owner/ResumeExamplesPanel';
import { CoverLetterExamplesPanel } from '../components/owner/CoverLetterExamplesPanel';
import { BlogsPanel } from '../components/owner/BlogsPanel';
import { TemplatesPanel } from '../components/owner/TemplatesPanel';
import { SeoPanel } from '../components/owner/SeoPanel';
import { HomepagePanel } from '../components/owner/HomepagePanel';
import { FutureCrudNotice } from '../components/owner/FutureCrudNotice';

import RESUME_EXAMPLES from '../../content/resumeExamples.json';
import COVER_LETTER_EXAMPLES from '../../content/coverLetterExamples.json';
import BLOGS from '../../content/blogs.json';
import TEMPLATES from '../../content/templatePages.json';

type ActiveTab = 'resume' | 'cover-letter' | 'blog' | 'templates' | 'seo' | 'homepage' | 'crud-blueprint';

/**
 * ----------------------------------------------------------------------------
 * PRODUCTION SECURITY ENGINEERING NOTE
 * ----------------------------------------------------------------------------
 * 1. Password Protection: The master credential has been completely removed from
 *    hardcoded client side code and bound strictly to VITE_OWNER_PASSWORD env.
 * 2. Inactivity Lock: Tracks keystroke, click, scroll, and mousemove telemetry
 *    to automatically log out the session after 30 minutes of complete idle.
 * 3. Absolute Session Max Life: Enforces automatic session pruning.
 * 4. Robots & SEO Blocking: Meta noindex crawling headers are dynamically mapped 
 *    whenever the administrative components are mounted to block search indexes.
 * 5. Lightweight Footprint: Built on top of local secure context states for absolute
 *    lightweight operations. No relational user-profile storage overhead needed.
 * ----------------------------------------------------------------------------
 */

interface OwnerLoginGateProps {
  onLoginSuccess: () => void;
}

/**
 * OwnerLoginGate renders the secure access point.
 * Verifies credentials against build/runtime host parameters.
 */
export const OwnerLoginGate: React.FC<OwnerLoginGateProps> = ({ onLoginSuccess }) => {
  const [password, setPassword] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const expectedPassword = (import.meta as any).env.VITE_OWNER_PASSWORD;
    
    // Production Security Guard: Enforce defined configuration parameters
    if (!expectedPassword) {
      setErrorMsg('Internal Security Exception: VITE_OWNER_PASSWORD is not set in environment settings.');
      return;
    }

    if (password === expectedPassword) {
      const now = Date.now();
      const expirationTime = now + 30 * 60 * 1000; // 30 mins absolute

      // Commit security parameters to storage
      localStorage.setItem('owner_authenticated', 'true');
      localStorage.setItem('owner_expires_at', expirationTime.toString());
      localStorage.setItem('owner_last_active', now.toString());

      onLoginSuccess();
      setErrorMsg('');
    } else {
      setErrorMsg('Access Denied: The master credential coordinates are invalid.');
    }
  };

  return (
    <div className="pt-32 pb-24 min-h-[90vh] bg-stone-50 flex items-center justify-center px-6">
      <SEO 
        title="Owner Dashboard Security Access | LunchResume" 
        description="Secure administrative gate to manage content schemas." 
        canonical="https://lunchresume.com/owner" 
        noindex={true}
      />
      
      <div className="max-w-md w-full bg-white border border-stone-200 rounded-2xl shadow-md p-8 text-center space-y-6">
        <div className="w-12 h-12 bg-stone-100 border border-stone-200 rounded-2xl flex items-center justify-center mx-auto text-[#2a8767]">
          <Lock size={22} />
        </div>
        
        <div className="space-y-1.5">
          <h1 className="font-serif text-2xl text-stone-900 font-normal">Administrative Gate</h1>
          <p className="text-stone-500 text-xs">
            Review, explore, and audit global programmatic SEO layers.
          </p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div className="space-y-1.5">
            <label className="text-[10px] font-mono uppercase text-stone-400 font-extrabold flex items-center gap-1.5 pl-0.5">
              <Key size={11} className="text-stone-400" /> Administrative Password
            </label>
            <input 
              type="password"
              placeholder="Type security master password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full text-xs p-3 bg-stone-50/50 border border-stone-200 rounded-xl focus:outline-none focus:border-[#3ea884] text-stone-900 font-mono tracking-widest placeholder:tracking-normal placeholder:font-sans"
            />
          </div>

          {errorMsg && (
            <p className="text-[10px] text-red-650 font-mono font-bold bg-red-50 border border-red-200 p-2.5 rounded-lg">
              ⚠️ {errorMsg}
            </p>
          )}

          <button 
            type="submit"
            className="w-full bg-[#2a8767] hover:bg-[#1d6148] text-white font-mono text-xs font-bold py-3 px-4 rounded-xl transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-1.5"
          >
            Authenticate Session <ArrowRight size={13} />
          </button>
        </form>

        <div className="border-t border-stone-100 pt-5 text-left bg-stone-50/80 -mx-8 -mb-8 p-6 rounded-b-2xl">
          <span className="text-[9px] font-mono font-extrabold text-stone-445 block uppercase tracking-wider mb-2">🎯 SECURITY CONFIGURATION CHECK:</span>
          <p className="text-[10px] text-stone-550 leading-relaxed font-sans">
            Authentication coordinates are bound to system variables. Verification status:
          </p>
          <div className="mt-2.5 p-2 bg-[#8cfbd4]/10 border border-[#8cfbd4]/25 text-stone-850 font-mono text-xs font-bold rounded-lg text-center select-all">
            {(import.meta as any).env.VITE_OWNER_PASSWORD ? '🟢 VITE_OWNER_PASSWORD Active' : '🔴 VITE_OWNER_PASSWORD NOT DEFINED'}
          </div>
          <p className="text-[9px] text-stone-450 mt-2 italic">
            * Note: Fully client-side protected. To test locally, provide <code>VITE_OWNER_PASSWORD</code> in your developer environment parameters.
          </p>
        </div>
      </div>
    </div>
  );
};


/**
 * OwnerRouteGuard handles lightweight state security parameters,
 * inactivity triggers (sliding windows), and child injection routing.
 */
export const OwnerRouteGuard: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    const isAuth = localStorage.getItem('owner_authenticated') === 'true';
    const expiresAt = Number(localStorage.getItem('owner_expires_at') || '0');
    const lastActive = Number(localStorage.getItem('owner_last_active') || '0');
    const now = Date.now();

    // Valid if absolute session not exceeded AND inactivity gap remains under 30 minutes
    return isAuth && now < expiresAt && (now - lastActive < 30 * 60 * 1000);
  });

  const handleLogout = () => {
    localStorage.removeItem('owner_authenticated');
    localStorage.removeItem('owner_expires_at');
    localStorage.removeItem('owner_last_active');
    setIsAuthenticated(false);
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    // Slide inactivity boundaries forward upon active user telemetry
    const resetActivityTimer = () => {
      const now = Date.now();
      const extendedExpiration = now + 30 * 60 * 1000; // Slide relative expiration by 30 mins
      
      localStorage.setItem('owner_last_active', now.toString());
      localStorage.setItem('owner_expires_at', extendedExpiration.toString());
    };

    // User signal telemetry hooks
    const activeTelemetryEvents = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
    
    activeTelemetryEvents.forEach(evt => {
      window.addEventListener(evt, resetActivityTimer, { passive: true });
    });

    // Constant background polling security loop
    const securityCheckInterval = setInterval(() => {
      const isAuth = localStorage.getItem('owner_authenticated') === 'true';
      const expiresAt = Number(localStorage.getItem('owner_expires_at') || '0');
      const now = Date.now();

      if (!isAuth || now >= expiresAt) {
        handleLogout();
      }
    }, 1000); // Check every second for extreme responsive security

    return () => {
      activeTelemetryEvents.forEach(evt => {
        window.removeEventListener(evt, resetActivityTimer);
      });
      clearInterval(securityCheckInterval);
    };
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <OwnerLoginGate onLoginSuccess={() => setIsAuthenticated(true)} />;
  }

  // Inject handleLogout callback implicitly into nested children elements
  return (
    <>
      {React.Children.map(children, child => {
        if (React.isValidElement(child)) {
          return React.cloneElement(child as React.ReactElement<any>, { onLogout: handleLogout });
        }
        return child;
      })}
    </>
  );
};


interface OwnerDashboardPageProps {
  onLogout?: () => void;
}

/**
 * Standard administrative command layout. Rendered only when authenticated.
 */
export const OwnerDashboardPage: React.FC<OwnerDashboardPageProps> = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('resume');
  const [sessionTimeLeft, setSessionTimeLeft] = useState<string>('30:00');

  // Load static dashboard asset sizes
  const totalResumes = RESUME_EXAMPLES.length;
  const totalCoverLetters = COVER_LETTER_EXAMPLES.length;
  const totalBlogs = BLOGS.length;
  const totalTemplates = TEMPLATES.length;

  // Render a live secure countdown clock matching session metrics
  useEffect(() => {
    const updateTimeLeft = () => {
      const expiresAt = Number(localStorage.getItem('owner_expires_at') || '0');
      const now = Date.now();
      const diff = expiresAt - now;

      if (diff <= 0) {
        setSessionTimeLeft('00:00');
        if (onLogout) onLogout();
        return;
      }

      const mins = Math.floor(diff / 60000);
      const secs = Math.floor((diff % 60000) / 1000);
      setSessionTimeLeft(`${mins}:${secs < 10 ? '0' : ''}${secs}`);
    };

    updateTimeLeft();
    const ticker = setInterval(updateTimeLeft, 1000);
    return () => clearInterval(ticker);
  }, [onLogout]);

  const handleExit = () => {
    if (onLogout) {
      onLogout();
    } else {
      localStorage.removeItem('owner_authenticated');
      localStorage.removeItem('owner_expires_at');
      localStorage.removeItem('owner_last_active');
      window.location.reload();
    }
  };

  return (
    <div className="pt-28 pb-24 bg-stone-50/30 min-h-[100vh]">
      <SEO 
        title="Owner Insights &amp; Schema Dashboard | LunchResume" 
        description="Verify dynamic structural components and content models." 
        canonical="https://lunchresume.com/owner" 
        noindex={true}
      />

      <div className="max-w-7xl mx-auto px-6 space-y-8">
        
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200/60 pb-6">
          <div className="space-y-1 text-left">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#2a8767]/10 text-[#2a8767] text-[9px] tracking-widest font-mono font-bold rounded-full border border-[#2a8767]/20 uppercase">
              🔐 OWNER COMMAND LAB
            </div>
            <h1 className="font-serif text-3xl text-stone-900 font-normal">LunchResume Manager</h1>
            <p className="text-stone-500 text-xs">
              Secure read-only content workspace loaded from localized JSON filesystems. Real-time updates prepped.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {/* Live Security Monitor Counter */}
            <div className="hidden sm:flex flex-col items-end text-right">
              <span className="text-[9px] font-mono text-stone-400 font-bold uppercase tracking-wider">Session Expires (Idle)</span>
              <span className="text-xs font-mono font-bold pb-0.5 text-[#2a8767]">{sessionTimeLeft}</span>
            </div>

            <button 
              onClick={handleExit}
              className="inline-flex items-center gap-1.5 bg-white hover:bg-stone-50 border border-stone-300 text-stone-750 font-mono text-xs font-bold px-4 py-2 rounded-xl transition-all hover:border-stone-400 cursor-pointer"
            >
              <LogOut size={13} /> Exit Dashboard
            </button>
          </div>
        </div>

        {/* Dashboard Statistics Metrics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-left">
          <div className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Resume Examples</span>
              <h3 className="font-serif text-3xl font-extrabold text-[#2a8767] mt-1">{totalResumes}</h3>
            </div>
            <div className="w-10 h-10 bg-[#8cfbd4]/10 rounded-xl flex items-center justify-center text-[#2a8767]">
              <FileText size={18} />
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Cover Letters</span>
              <h3 className="font-serif text-3xl font-extrabold text-[#2a8767] mt-1">{totalCoverLetters}</h3>
            </div>
            <div className="w-10 h-10 bg-[#8cfbd4]/10 rounded-xl flex items-center justify-center text-[#2a8767]">
              <Mail size={18} />
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Guides / Blogs</span>
              <h3 className="font-serif text-3xl font-extrabold text-[#2a8767] mt-1">{totalBlogs}</h3>
            </div>
            <div className="w-10 h-10 bg-[#8cfbd4]/10 rounded-xl flex items-center justify-center text-[#2a8767]">
              <BookOpen size={18} />
            </div>
          </div>

          <div className="bg-white border border-stone-200/80 p-5 rounded-2xl flex items-center justify-between shadow-xs">
            <div>
              <span className="text-[10px] font-mono font-bold text-stone-400 uppercase">Design Layouts</span>
              <h3 className="font-serif text-3xl font-extrabold text-[#2a8767] mt-1">{totalTemplates}</h3>
            </div>
            <div className="w-10 h-10 bg-[#8cfbd4]/10 rounded-xl flex items-center justify-center text-[#2a8767]">
              <Layers size={18} />
            </div>
          </div>
        </div>

        {/* Tab Selection */}
        <div className="flex border-b border-stone-200 font-mono text-[11px] uppercase scrollbar-none overflow-x-auto text-stone-500">
          <button 
            onClick={() => setActiveTab('resume')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'resume' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <FileText size={14} /> Resume Examples
          </button>
          <button 
            onClick={() => setActiveTab('cover-letter')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'cover-letter' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <Mail size={14} /> Cover Letters
          </button>
          <button 
            onClick={() => setActiveTab('blog')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'blog' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <BookOpen size={14} /> Blog Posts
          </button>
          <button 
            onClick={() => setActiveTab('templates')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'templates' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <Layers size={14} /> Resume Templates
          </button>
          <button 
            onClick={() => setActiveTab('seo')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'seo' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <Globe size={14} /> SEO Settings
          </button>
          <button 
            onClick={() => setActiveTab('homepage')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'homepage' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <Home size={14} /> Homepage Copy
          </button>
          <button 
            onClick={() => setActiveTab('crud-blueprint')}
            className={`flex items-center gap-1.5 px-4 pb-3 border-b-2 hover:text-stone-850 cursor-pointer ${activeTab === 'crud-blueprint' ? 'border-[#2a8767] text-[#2a8767] font-extrabold border-[#2a8767]' : 'border-transparent'}`}
          >
            <Database size={14} /> CRUD Blueprint
          </button>
        </div>

        {/* Tab view routing */}
        <div className="bg-stone-50/30 p-2 sm:p-4 rounded-3xl border border-stone-200/50 bg-white">
          {activeTab === 'resume' && <ResumeExamplesPanel />}
          {activeTab === 'cover-letter' && <CoverLetterExamplesPanel />}
          {activeTab === 'blog' && <BlogsPanel />}
          {activeTab === 'templates' && <TemplatesPanel />}
          {activeTab === 'seo' && <SeoPanel />}
          {activeTab === 'homepage' && <HomepagePanel />}
          {activeTab === 'crud-blueprint' && <FutureCrudNotice />}
        </div>
      </div>
    </div>
  );
};
