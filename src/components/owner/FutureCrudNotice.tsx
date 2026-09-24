/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Database, FileCode, Key, ArrowRight, ShieldCheck, Check } from 'lucide-react';

export const FutureCrudNotice: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'api' | 'security' | 'io'>('api');

  return (
    <div className="bg-white border border-stone-200 rounded-2xl p-6 sm:p-8 text-left space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-150 pb-5">
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-[#2a8767]/10 text-[#2a8767] text-[10px] tracking-widest font-mono font-bold rounded-full border border-[#2a8767]/20 uppercase">
            🛠️ Architecture Blueprint
          </div>
          <h2 className="font-serif text-2xl text-stone-900 mt-2 font-normal">Phase 2 CRUD Migration Blueprint</h2>
          <p className="text-stone-500 text-xs mt-1">
            Standard operating procedure to upscale this dashboard from static JSON read-only representation to server-authoritative file writing.
          </p>
        </div>
        <div className="flex items-center gap-2 text-stone-400 font-mono text-[10px] bg-stone-50 border border-stone-200 px-3 py-1.5 rounded-lg shrink-0">
          <Database size={13} className="text-[#3ea884]" /> STATUS: READY_FOR_SERVER_SYNC
        </div>
      </div>

      {/* Grid of Steps */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="border border-stone-150 rounded-xl p-4 space-y-2 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white font-mono text-xs font-bold rounded-full">1</span>
            <strong className="text-sm text-stone-900 font-serif">State Reconciliation</strong>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Replace current static states with custom React swr/React Query hooks connected directly to backend API routes, enabling optimism-biased cache validation.
          </p>
        </div>

        <div className="border border-stone-150 rounded-xl p-4 space-y-2 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white font-mono text-xs font-bold rounded-full">2</span>
            <strong className="text-sm text-stone-900 font-serif">Transaction Safety</strong>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Use atomic filesystem checks on the Node side (e.g., `fs.promises.writeFile` to a temp file, followed by a rename) to prevent incomplete writes during active requests.
          </p>
        </div>

        <div className="border border-stone-150 rounded-xl p-4 space-y-2 bg-stone-50/50">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 flex items-center justify-center bg-stone-900 text-white font-mono text-xs font-bold rounded-full">3</span>
            <strong className="text-sm text-stone-900 font-serif">Audit Logs Hook</strong>
          </div>
          <p className="text-xs text-stone-600 leading-relaxed">
            Record file edits, author name, timestamp metadata, and pre-change state into `/content/history-log.json` to allow rollback operations dynamically.
          </p>
        </div>
      </div>

      {/* Code / Architecture Tabs */}
      <div className="border border-stone-150 rounded-xl overflow-hidden">
        {/* Tab Headers */}
        <div className="flex border-b border-stone-150 bg-stone-50 scrollbar-none overflow-x-auto text-[11px] font-mono font-bold uppercase text-stone-500">
          <button 
            onClick={() => setActiveTab('api')}
            className={`flex items-center gap-1.5 px-5 py-3 border-r border-stone-150 text-left whitespace-nowrap cursor-pointer ${activeTab === 'api' ? 'bg-white text-[#2a8767] border-b-2 border-b-[#2a8767] font-extrabold' : 'hover:bg-stone-100 hover:text-stone-800'}`}
          >
            <FileCode size={14} /> Express API Handler
          </button>
          <button 
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-1.5 px-5 py-3 border-r border-stone-150 text-left whitespace-nowrap cursor-pointer ${activeTab === 'security' ? 'bg-white text-[#2a8767] border-b-2 border-b-[#2a8767] font-extrabold' : 'hover:bg-stone-100 hover:text-stone-800'}`}
          >
            <Key size={14} /> Password Validation & JWT
          </button>
          <button 
            onClick={() => setActiveTab('io')}
            className={`flex items-center gap-1.5 px-5 py-3 text-left whitespace-nowrap cursor-pointer ${activeTab === 'io' ? 'bg-white text-[#2a8767] border-b-2 border-b-[#2a8767] font-extrabold' : 'hover:bg-stone-100 hover:text-stone-800'}`}
          >
            <ShieldCheck size={14} /> Atomic Overwrite Core
          </button>
        </div>

        {/* Tab Contents */}
        <div className="p-5 bg-stone-950 text-stone-100 font-mono text-xs overflow-x-auto leading-relaxed max-h-96">
          {activeTab === 'api' && (
            <pre className="text-emerald-400">
{`// server/routes/admin.ts
import express from 'express';
import fs from 'fs/promises';
import path from 'path';
import { authenticateAdminJWTCookie } from '../middleware/auth';

const router = express.Router();

// PUT handler to update resumeExamples.json safely
router.put('/api/admin/resume-examples', authenticateAdminJWTCookie, async (req, res) => {
  try {
    const updatedContent = req.body; // Array validation using zod schemas recommended
    const filePath = path.join(process.cwd(), 'content', 'resumeExamples.json');
    
    // Perform transient transaction write
    const tempPath = \`\${filePath}.tmp\`;
    await fs.writeFile(tempPath, JSON.stringify(updatedContent, null, 2), 'utf8');
    await fs.rename(tempPath, filePath);
    
    // Trigger static site re-generations or sitemap updates
    res.json({ success: true, message: "resumeExamples.json successfully synced" });
  } catch (error) {
    res.status(500).json({ error: "Atomic overwrite failed", details: error.message });
  }
});`}
            </pre>
          )}

          {activeTab === 'security' && (
            <pre className="text-cyan-400">
{`// server/middleware/auth.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const OWNER_JWT_SECRET = process.env.OWNER_JWT_SECRET || 'lunch-secret-2026';

export function authenticateAdminJWTCookie(req: Request, res: Response, next: NextFunction) {
  const token = req.cookies?.admin_session;
  
  if (!token) {
    return res.status(401).json({ error: "Access denied. Action requires valid session ticket" });
  }

  try {
    const decoded = jwt.verify(token, OWNER_JWT_SECRET);
    req.admin = decoded;
    next();
  } catch (err) {
    res.clearCookie('admin_session');
    return res.status(403).json({ error: "Ticket signature expired or invalid. Please reauthenticate" });
  }
}`}
            </pre>
          )}

          {activeTab === 'io' && (
            <pre className="text-amber-400">
{`// client/hooks/useAdminMutation.ts
import { useState } from 'react';

export function useAdminMutation(endpoint: string) {
  const [isSyncing, setIsSyncing] = useState(false);

  const mutateContent = async (payload: any) => {
    setIsSyncing(true);
    try {
      const response = await fetch(endpoint, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error('API server reported overwrite error');
      alert('Content successfully compiled on-disk!');
    } catch (err) {
      console.error(err);
    } finally {
      setIsSyncing(false);
    }
  };

  return { mutateContent, isSyncing };
}`}
            </pre>
          )}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-4 bg-stone-50 border border-stone-200 rounded-xl text-xs text-stone-600">
        <div className="space-y-1">
          <p className="font-semibold text-stone-900 flex items-center gap-1.5">
            <Check size={14} className="text-[#3ea884]" /> Perfect Schema Isolation
          </p>
          <p>
            All Phase 1 pages list content strictly based on TypeScript interfaces exported directly from <code>src/types/content.ts</code>, keeping properties identical.
          </p>
        </div>
        <button 
          onClick={() => alert("This blueprint details Phase 2 server file-writing structure. Active server CRUD will boot upon client integration.")}
          className="inline-flex items-center gap-1 font-mono font-bold text-stone-800 hover:text-stone-950 border border-stone-300 hover:border-stone-400 px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
        >
          Inspect API Spec <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
};
