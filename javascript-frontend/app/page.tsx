"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Lottie from 'lottie-react'
import { useRouter } from 'next/navigation' 
import { 
  IconActivity, 
  IconBolt, 
  IconTrendingUp, 
  IconChartBar, 
  IconX,
  IconPlus,
  IconCheck,
  IconMoneybag,
  IconArrowLeft, 
  IconTerminal, 
  IconPlayerPlay,
  IconRefresh,
  IconAlertTriangle,
  IconCode,
  IconFlame,
  IconArrowDownRight,
  IconCone, // For construction
  IconTrophy,
  IconGift,
  IconMedal,
  IconMenu2,
  IconFileDescription,
  IconDeviceFloppy
} from '@tabler/icons-react'

// ✅ Your Ngrok Backend URL
const BACKEND_URL = 'https://unnoting-tanya-boilingly.ngrok-free.dev'; 

// ==========================================
// TYPES & HELPERS
// ==========================================

interface Example {
  input: string | object;
  output: string | object;
  explanation?: string;
}

interface Problem {
  title: string;
  difficulty?: string;
  description: string;
  constraints: (string | object)[];
  examples: Example[];
}

interface CompilationResult {
  success: boolean;
  output: string;
  analysis: string;
}

// Safely renders objects as strings
const safeRender = (value: any) => {
  if (typeof value === 'object' && value !== null) {
    return JSON.stringify(value, null, 2);
  }
  return value;
};

// ==========================================
// DESKTOP MODAL 1: EASY MODE (BLITZCRANK - GREEN)
// ==========================================

function CodingTerminal({ onClose }: { onClose: () => void }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState<CompilationResult | null>(null);
  const [fetchingProblem, setFetchingProblem] = useState(true);
  const [compiling, setCompiling] = useState(false);

  const fetchProblem = async () => {
    setFetchingProblem(true);
    setProblem(null);
    setOutput(null);
    try {
      const res = await fetch('/api/dsa-question');
      const data = await res.json();
      setProblem(data);
    } catch (err) {
      console.error("Failed to load mission:", err);
    } finally {
      setFetchingProblem(false);
    }
  };

  useEffect(() => { fetchProblem(); }, []);

  const handleRun = async () => {
    if (!code || !problem) return;
    setCompiling(true);
    setOutput(null);
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problem })
      });
      const result = await res.json();
      setOutput(result);
    } catch (err) {
      setOutput({ success: false, output: "Network Error", analysis: "Check connection." });
    } finally {
      setCompiling(false);
    }
  };

  useEffect(() => {
    if (language === 'javascript') setCode('// Write your solution here\nfunction solve(input) {\n  \n}');
    if (language === 'python') setCode('# Write your solution here\ndef solve(input):\n    pass');
    if (language === 'cpp') setCode('// Write your solution here\n#include <iostream>\n\nvoid solve() {\n    \n}');
  }, [language]);

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-hidden font-sans flex flex-col p-6"
    >
      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-emerald-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <header className="flex-none mb-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <IconArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-widest group-hover:text-white">Exit</span>
          </button>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-white leading-none uppercase">
              BLITZ<span className="text-emerald-500">CRANK</span>
            </h1>
            <div className="text-[10px] font-mono tracking-[0.3em] text-emerald-500/50 uppercase mt-1 pl-0.5">Live Environment</div>
          </div>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <span className="text-xs font-mono text-emerald-500/80">ONLINE</span>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6 z-10">
        <div className="col-span-12 md:col-span-6 flex flex-col min-h-0 bg-[#080808]/80 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden relative group">
           {fetchingProblem && (
             <div className="absolute inset-0 z-20 bg-[#080808] flex flex-col items-center justify-center gap-4">
                <IconBolt className="text-emerald-500 animate-pulse" size={48} stroke={1.5} />
                <p className="text-emerald-500/50 font-mono text-xs tracking-widest animate-pulse">FETCHING MISSION...</p>
             </div>
           )}
           {problem && (
             <div className="flex-1 overflow-y-auto p-8 scrollbar-hide">
                <div className="flex items-start justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white leading-tight max-w-[80%]">{problem.title}</h2>
                  <span className="px-3 py-1.5 rounded text-[11px] font-black uppercase tracking-wider border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{problem.difficulty || 'MEDIUM'}</span>
                </div>
                <div className="prose prose-invert prose-base max-w-none">
                  <p className="text-gray-300 leading-relaxed text-base mb-8">{problem.description}</p>
                  <h3 className="text-xs font-mono uppercase text-white/50 mb-4 flex items-center gap-2"><IconCheck size={16} className="text-emerald-500" /> Examples</h3>
                  <div className="space-y-4 mb-8">
                    {problem.examples?.map((ex, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-5">
                        <div className="flex gap-4 text-sm font-mono mb-2"><span className="text-white/40 min-w-[60px]">IN:</span><span className="text-white">{safeRender(ex.input)}</span></div>
                        <div className="flex gap-4 text-sm font-mono"><span className="text-white/40 min-w-[60px]">OUT:</span><span className="text-emerald-400">{safeRender(ex.output)}</span></div>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xs font-mono uppercase text-white/50 mb-4 flex items-center gap-2"><IconAlertTriangle size={16} className="text-yellow-500" /> Constraints</h3>
                  <ul className="list-disc list-inside text-sm text-gray-400 font-mono space-y-2 pl-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {problem.constraints?.map((c, i) => <li key={i}>{safeRender(c)}</li>)}
                  </ul>
                </div>
             </div>
           )}
           <div className="p-4 border-t border-white/5 bg-black/20">
             <button onClick={fetchProblem} className="w-full py-3 rounded-lg text-xs font-black italic tracking-wider flex items-center justify-center gap-2 bg-gray-300 text-black hover:bg-emerald-400 transition-all">
                <IconRefresh size={14} /> NEW PROBLEM
             </button>
           </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col min-h-0 gap-4">
          <div className="flex-none bg-[#080808]/80 border border-white/5 rounded-xl p-2 flex justify-between items-center backdrop-blur-sm">
             <div className="flex gap-2">
               {['javascript', 'python', 'cpp'].map((lang) => (
                 <button key={lang} onClick={() => setLanguage(lang)} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${language === lang ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>{lang}</button>
               ))}
             </div>
             <button onClick={handleRun} disabled={compiling} className={`px-6 py-2 rounded-lg text-xs font-black italic tracking-wider flex items-center gap-2 transition-all ${compiling ? 'bg-white/10 text-white/30 cursor-wait' : 'bg-white text-black hover:bg-emerald-400 hover:scale-105'}`}>
               {compiling ? 'Running...' : <><IconPlayerPlay size={14} fill="currentColor" /> EXECUTE</>}
             </button>
          </div>
          <div className="flex-1 bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col relative group">
            <div className="absolute top-4 right-4 text-white/10 pointer-events-none"><IconCode size={100} /></div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 w-full h-full bg-transparent p-6 font-mono text-sm text-white/80 resize-none focus:outline-none z-10 placeholder:text-white/20" spellCheck="false" placeholder="// Initialize neural link..." />
          </div>
          <div className="h-[30%] bg-[#050505] border border-white/10 rounded-2xl p-4 overflow-y-auto font-mono text-xs relative">
            <div className="absolute top-2 right-3 text-[10px] text-white/20 uppercase tracking-widest">Terminal Output</div>
            {output ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                <div className={`mb-2 font-bold ${output.success ? 'text-emerald-400' : 'text-red-400'}`}>{output.success ? '> BUILD SUCCESSFUL' : '> COMPILATION FAILED'}</div>
                <div className="text-white/80 whitespace-pre-wrap mb-4 pl-2 border-l border-white/10">{output.output}</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/50 italic border border-white/5"><span className="text-blue-400 not-italic font-bold mr-2 uppercase">MASTER HENRY:</span>{output.analysis}</div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20 gap-2"><IconTerminal size={24} /><span>Waiting for execution...</span></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// DESKTOP MODAL 2: HARD MODE (RED)
// ==========================================

function HardModeTerminal({ onClose }: { onClose: () => void }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState<CompilationResult | null>(null);
  const [fetchingProblem, setFetchingProblem] = useState(true);
  const [compiling, setCompiling] = useState(false);

  const fetchProblem = async () => {
    setFetchingProblem(true);
    setProblem(null);
    setOutput(null);
    try {
      const res = await fetch('/api/dsa-hard');
      const data = await res.json();
      setProblem(data);
    } catch (err) {
      console.error("Failed to load hard mission:", err);
    } finally {
      setFetchingProblem(false);
    }
  };

  useEffect(() => { fetchProblem(); }, []);

  const handleRun = async () => {
    if (!code || !problem) return;
    setCompiling(true);
    setOutput(null);
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problem })
      });
      const result = await res.json();
      setOutput(result);
    } catch (err) {
      setOutput({ success: false, output: "Network Error", analysis: "Check connection." });
    } finally {
      setCompiling(false);
    }
  };

  useEffect(() => {
    if (language === 'javascript') setCode('// Write your solution here\nfunction solve(input) {\n  \n}');
    if (language === 'python') setCode('# Write your solution here\ndef solve(nums):\n    pass');
    if (language === 'cpp') setCode('// Write your solution here\n#include <iostream>\n\nvoid solve() {\n    \n}');
  }, [language]);

  return (
    <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-hidden font-sans flex flex-col p-6"
    >
      <style jsx global>{`
        ::-webkit-scrollbar { width: 8px; height: 8px; }
        ::-webkit-scrollbar-track { background: #0a0a0a; border-radius: 4px; }
        ::-webkit-scrollbar-thumb { background: #450a0a; border-radius: 4px; border: 1px solid #0a0a0a; }
        ::-webkit-scrollbar-thumb:hover { background: #7f1d1d; }
      `}</style>

      <div className="absolute top-[-20%] right-[-10%] w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-orange-950/20 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

      <header className="flex-none mb-6 flex items-center justify-between z-20">
        <div className="flex items-center gap-6">
          <button onClick={onClose} className="group flex items-center gap-2 text-white/40 hover:text-white transition-colors">
            <IconArrowLeft size={24} className="group-hover:-translate-x-1 transition-transform" />
            <span className="text-xs font-mono uppercase tracking-widest group-hover:text-white">Exit</span>
          </button>
          <div>
            <h1 className="text-4xl font-black italic tracking-tighter text-white leading-none uppercase">
              HARD<span className="text-red-600"> MODE</span>
            </h1>
            <div className="text-[10px] font-mono tracking-[0.3em] text-red-500/50 uppercase mt-1 pl-0.5">Advanced Environment</div>
          </div>
        </div>
        <div className="px-3 py-1 bg-white/5 border border-white/10 rounded-full flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
           <span className="text-xs font-mono text-red-500/80">ONLINE</span>
        </div>
      </header>

      <div className="flex-1 min-h-0 grid grid-cols-1 md:grid-cols-12 gap-6 z-10">
        <div className="col-span-12 md:col-span-6 flex flex-col min-h-0 bg-[#080808]/80 border border-white/5 rounded-2xl backdrop-blur-sm overflow-hidden relative group">
           {fetchingProblem && (
             <div className="absolute inset-0 z-20 bg-[#080808] flex flex-col items-center justify-center gap-4">
                <IconFlame className="text-red-500 animate-pulse" size={48} stroke={1.5} />
                <p className="text-red-500/50 font-mono text-xs tracking-widest animate-pulse">INITIATING HARD PROTOCOL...</p>
             </div>
           )}
           {problem && (
             <div className="flex-1 overflow-y-auto p-8">
                <div className="flex items-start justify-between mb-8">
                  <h2 className="text-3xl font-bold text-white leading-tight max-w-[80%]">{problem.title}</h2>
                  <span className="px-3 py-1.5 rounded text-[11px] font-black uppercase tracking-wider border bg-red-500/10 text-red-400 border-red-500/20">{problem.difficulty || 'HARD'}</span>
                </div>
                <div className="prose prose-invert prose-base max-w-none">
                  <p className="text-gray-300 leading-relaxed text-base mb-8">{problem.description}</p>
                  <h3 className="text-xs font-mono uppercase text-white/50 mb-4 flex items-center gap-2"><IconCheck size={16} className="text-red-500" /> Examples</h3>
                  <div className="space-y-4 mb-8">
                    {problem.examples?.map((ex, i) => (
                      <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-5 hover:border-red-500/20 transition-colors">
                        <div className="flex gap-4 text-sm font-mono mb-2"><span className="text-white/40 min-w-[60px]">IN:</span><span className="text-white">{safeRender(ex.input)}</span></div>
                        <div className="flex gap-4 text-sm font-mono"><span className="text-white/40 min-w-[60px]">OUT:</span><span className="text-red-400">{safeRender(ex.output)}</span></div>
                      </div>
                    ))}
                  </div>
                  <h3 className="text-xs font-mono uppercase text-white/50 mb-4 flex items-center gap-2"><IconAlertTriangle size={16} className="text-orange-500" /> Constraints</h3>
                  <ul className="list-disc list-inside text-sm text-gray-400 font-mono space-y-2 pl-2 bg-white/[0.02] p-4 rounded-xl border border-white/5">
                    {problem.constraints?.map((c, i) => <li key={i}>{safeRender(c)}</li>)}
                  </ul>
                </div>
             </div>
           )}
           <div className="p-4 border-t border-white/5 bg-black/20">
             <button onClick={fetchProblem} className="w-full py-3 rounded-lg text-xs font-black italic tracking-wider flex items-center justify-center gap-2 bg-white text-black hover:bg-red-500 hover:text-white transition-all">
               <IconRefresh size={14} /> NEW PROBLEM
             </button>
           </div>
        </div>
        <div className="col-span-12 md:col-span-6 flex flex-col min-h-0 gap-4">
          <div className="flex-none bg-[#080808]/80 border border-white/5 rounded-xl p-2 flex justify-between items-center backdrop-blur-sm">
             <div className="flex gap-2">
               {['javascript', 'python', 'cpp'].map((lang) => (
                 <button key={lang} onClick={() => setLanguage(lang)} className={`px-4 py-2 rounded-lg text-xs font-bold uppercase transition-all ${language === lang ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-white/30 hover:text-white hover:bg-white/5'}`}>{lang}</button>
               ))}
             </div>
             <button onClick={handleRun} disabled={compiling} className={`px-6 py-2 rounded-lg text-xs font-black italic tracking-wider flex items-center gap-2 transition-all ${compiling ? 'bg-white/10 text-white/30 cursor-wait' : 'bg-white text-black hover:bg-red-500 hover:text-white hover:scale-105'}`}>
               {compiling ? 'Running...' : <><IconPlayerPlay size={14} fill="currentColor" /> EXECUTE</>}
             </button>
          </div>
          <div className="flex-1 bg-[#0c0c0c] border border-white/10 rounded-2xl overflow-hidden flex flex-col relative group focus-within:border-red-500/30 transition-colors">
            <div className="absolute top-4 right-4 text-white/10 pointer-events-none"><IconCode size={100} /></div>
            <textarea value={code} onChange={(e) => setCode(e.target.value)} className="flex-1 w-full h-full bg-transparent p-6 font-mono text-sm text-white/80 resize-none focus:outline-none z-10 selection:bg-red-500/30 placeholder:text-white/20" spellCheck="false" placeholder="// Initialize neural link..." />
          </div>
          <div className="h-[30%] bg-[#050505] border border-white/10 rounded-2xl p-4 overflow-y-auto font-mono text-xs relative">
            <div className="absolute top-2 right-3 text-[10px] text-white/20 uppercase tracking-widest">Terminal Output</div>
            {output ? (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="pt-2">
                <div className={`mb-2 font-bold ${output.success ? 'text-green-400' : 'text-red-400'}`}>{output.success ? '> BUILD SUCCESSFUL' : '> COMPILATION FAILED'}</div>
                <div className="text-white/80 whitespace-pre-wrap mb-4 pl-2 border-l border-white/10">{output.output}</div>
                <div className="bg-white/5 p-3 rounded-lg text-white/50 italic border border-white/5"><span className="text-red-400 not-italic font-bold mr-2 uppercase">MASTER HENRY:</span>{output.analysis}</div>
              </motion.div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-white/20 gap-2"><IconTerminal size={24} /><span>Waiting for execution...</span></div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ==========================================
// ✅ NEW: MOBILE CODING TERMINAL (TABBED)
// ==========================================

function MobileCodingTerminal({ onClose }: { onClose: () => void }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState<CompilationResult | null>(null);
  const [fetchingProblem, setFetchingProblem] = useState(true);
  const [compiling, setCompiling] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'code'>('mission');

  const fetchProblem = async () => {
    setFetchingProblem(true);
    setProblem(null);
    setOutput(null);
    try {
      const res = await fetch('/api/dsa-question');
      const data = await res.json();
      setProblem(data);
    } catch (err) {
      console.error("Failed to load mission:", err);
    } finally {
      setFetchingProblem(false);
    }
  };

  useEffect(() => { fetchProblem(); }, []);

  const handleRun = async () => {
    if (!code || !problem) return;
    setCompiling(true);
    setOutput(null);
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problem })
      });
      const result = await res.json();
      setOutput(result);
    } catch (err) {
      setOutput({ success: false, output: "Network Error", analysis: "Check connection." });
    } finally {
      setCompiling(false);
    }
  };

  useEffect(() => {
    if (language === 'javascript') setCode('// Write your solution here\nfunction solve(input) {\n  \n}');
    if (language === 'python') setCode('# Write your solution here\ndef solve(input):\n    pass');
    if (language === 'cpp') setCode('// Write your solution here\n#include <iostream>\n\nvoid solve() {\n    \n}');
  }, [language]);

  return (
    <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-hidden font-sans flex flex-col"
    >
      {/* Header */}
      <div className="flex-none p-4 border-b border-white/10 flex items-center justify-between bg-[#080808]">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/20 text-emerald-500">
               <IconTerminal size={18} />
            </div>
            <div>
               <h3 className="font-black italic text-lg leading-none">BLITZCRANK</h3>
               <p className="text-[10px] text-white/40 font-mono">Mobile Environment</p>
            </div>
         </div>
         <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white/60"><IconX size={20} /></button>
      </div>

      {/* Tabs */}
      <div className="flex-none flex border-b border-white/5">
         <button 
           onClick={() => setActiveTab('mission')} 
           className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'mission' ? 'text-emerald-400 bg-emerald-500/10 border-b-2 border-emerald-500' : 'text-white/40'}`}
         >
           <IconFileDescription size={16} /> Mission
         </button>
         <button 
           onClick={() => setActiveTab('code')} 
           className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'code' ? 'text-emerald-400 bg-emerald-500/10 border-b-2 border-emerald-500' : 'text-white/40'}`}
         >
           <IconCode size={16} /> Console
         </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative">
         {activeTab === 'mission' && (
            <div className="h-full overflow-y-auto p-5 pb-20">
               {fetchingProblem ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3 text-emerald-500/50">
                     <IconRefresh className="animate-spin" size={32} />
                     <span className="text-xs font-mono uppercase tracking-widest">Loading Data...</span>
                  </div>
               ) : problem ? (
                  <div className="space-y-6">
                     <div>
                        <span className="px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border bg-emerald-500/10 text-emerald-400 border-emerald-500/20">{problem.difficulty || 'MEDIUM'}</span>
                        <h2 className="text-2xl font-black text-white mt-3 mb-2 leading-tight">{problem.title}</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">{problem.description}</p>
                     </div>
                     
                     <div className="space-y-3">
                        <h3 className="text-xs font-mono uppercase text-white/50 flex items-center gap-2"><IconCheck size={14} className="text-emerald-500" /> Examples</h3>
                        {problem.examples?.map((ex, i) => (
                          <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 text-xs font-mono">
                            <div className="flex gap-2 mb-1"><span className="text-white/40 min-w-[30px]">IN:</span><span className="text-white">{safeRender(ex.input)}</span></div>
                            <div className="flex gap-2"><span className="text-white/40 min-w-[30px]">OUT:</span><span className="text-emerald-400">{safeRender(ex.output)}</span></div>
                          </div>
                        ))}
                     </div>

                     <div className="space-y-2">
                        <h3 className="text-xs font-mono uppercase text-white/50 flex items-center gap-2"><IconAlertTriangle size={14} className="text-yellow-500" /> Constraints</h3>
                        <ul className="list-disc list-inside text-xs text-gray-400 font-mono space-y-1 pl-2 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                          {problem.constraints?.map((c, i) => <li key={i}>{safeRender(c)}</li>)}
                        </ul>
                     </div>
                     <div className="h-10" />
                  </div>
               ) : null}
            </div>
         )}

         {activeTab === 'code' && (
            <div className="h-full flex flex-col">
               <div className="flex-none p-2 border-b border-white/5 flex gap-2 overflow-x-auto">
                 {['javascript', 'python', 'cpp'].map((lang) => (
                   <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap ${language === lang ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-white/30 bg-white/5'}`}>{lang}</button>
                 ))}
               </div>
               
               <div className="flex-1 relative bg-[#0c0c0c]">
                 <textarea 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm text-white/80 resize-none focus:outline-none placeholder:text-white/20" 
                    spellCheck="false" 
                    placeholder="// Start coding..." 
                 />
               </div>

               <div className="flex-none h-[35%] bg-[#080808] border-t border-white/10 flex flex-col">
                  <div className="flex-none px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                     <span className="text-[10px] font-mono text-white/40 uppercase">Output Console</span>
                     <button onClick={handleRun} disabled={compiling} className={`px-4 py-1.5 rounded text-xs font-black italic tracking-wider flex items-center gap-2 ${compiling ? 'bg-white/10 text-white/30' : 'bg-emerald-500 text-black'}`}>
                        {compiling ? '...' : <><IconPlayerPlay size={12} fill="currentColor" /> RUN</>}
                     </button>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
                     {output ? (
                       <div>
                         <div className={`mb-2 font-bold ${output.success ? 'text-emerald-400' : 'text-red-400'}`}>{output.success ? '> SUCCESS' : '> FAILED'}</div>
                         <div className="text-white/80 whitespace-pre-wrap">{output.output}</div>
                         <div className="mt-2 pt-2 border-t border-white/10 text-white/40 italic">{output.analysis}</div>
                       </div>
                     ) : (
                       <div className="text-white/20 italic text-center mt-4">Run code to see output...</div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>

      {/* Floating Action for Mission Tab */}
      {activeTab === 'mission' && (
         <div className="absolute bottom-6 right-6">
            <button onClick={() => setActiveTab('code')} className="w-14 h-14 rounded-full bg-emerald-500 text-black shadow-lg shadow-emerald-500/20 flex items-center justify-center">
               <IconCode size={24} stroke={2.5} />
            </button>
         </div>
      )}
    </motion.div>
  )
}

// ==========================================
// ✅ NEW: MOBILE HARD MODE TERMINAL (TABBED)
// ==========================================

function MobileHardModeTerminal({ onClose }: { onClose: () => void }) {
  const [problem, setProblem] = useState<Problem | null>(null);
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [output, setOutput] = useState<CompilationResult | null>(null);
  const [fetchingProblem, setFetchingProblem] = useState(true);
  const [compiling, setCompiling] = useState(false);
  const [activeTab, setActiveTab] = useState<'mission' | 'code'>('mission');

  const fetchProblem = async () => {
    setFetchingProblem(true);
    setProblem(null);
    setOutput(null);
    try {
      const res = await fetch('/api/dsa-hard');
      const data = await res.json();
      setProblem(data);
    } catch (err) {
      console.error("Failed to load hard mission:", err);
    } finally {
      setFetchingProblem(false);
    }
  };

  useEffect(() => { fetchProblem(); }, []);

  const handleRun = async () => {
    if (!code || !problem) return;
    setCompiling(true);
    setOutput(null);
    try {
      const res = await fetch('/api/compile', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, language, problem })
      });
      const result = await res.json();
      setOutput(result);
    } catch (err) {
      setOutput({ success: false, output: "Network Error", analysis: "Check connection." });
    } finally {
      setCompiling(false);
    }
  };

  useEffect(() => {
    if (language === 'javascript') setCode('// Write your solution here\nfunction solve(input) {\n  \n}');
    if (language === 'python') setCode('# Write your solution here\ndef solve(nums):\n    pass');
    if (language === 'cpp') setCode('// Write your solution here\n#include <iostream>\n\nvoid solve() {\n    \n}');
  }, [language]);

  return (
    <motion.div 
        initial={{ y: '100%' }}
        animate={{ y: 0 }}
        exit={{ y: '100%' }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[200] bg-[#050505] text-white overflow-hidden font-sans flex flex-col"
    >
      <div className="absolute inset-0 bg-red-900/5 pointer-events-none" />

      {/* Header */}
      <div className="flex-none p-4 border-b border-white/10 flex items-center justify-between bg-[#080808] z-10">
         <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-red-500/10 flex items-center justify-center border border-red-500/20 text-red-500">
               <IconFlame size={18} />
            </div>
            <div>
               <h3 className="font-black italic text-lg leading-none">HARD MODE</h3>
               <p className="text-[10px] text-red-500/50 font-mono">Advanced Protocol</p>
            </div>
         </div>
         <button onClick={onClose} className="p-2 bg-white/5 rounded-full text-white/60"><IconX size={20} /></button>
      </div>

      {/* Tabs */}
      <div className="flex-none flex border-b border-white/5 z-10 bg-[#050505]">
         <button 
           onClick={() => setActiveTab('mission')} 
           className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'mission' ? 'text-red-400 bg-red-500/10 border-b-2 border-red-500' : 'text-white/40'}`}
         >
           <IconFileDescription size={16} /> Mission
         </button>
         <button 
           onClick={() => setActiveTab('code')} 
           className={`flex-1 py-3 text-xs font-bold uppercase tracking-widest flex items-center justify-center gap-2 ${activeTab === 'code' ? 'text-red-400 bg-red-500/10 border-b-2 border-red-500' : 'text-white/40'}`}
         >
           <IconCode size={16} /> Console
         </button>
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-hidden relative z-0">
         {activeTab === 'mission' && (
            <div className="h-full overflow-y-auto p-5 pb-20">
               {fetchingProblem ? (
                  <div className="flex flex-col items-center justify-center h-64 gap-3 text-red-500/50">
                     <IconRefresh className="animate-spin" size={32} />
                     <span className="text-xs font-mono uppercase tracking-widest">Retrieving...</span>
                  </div>
               ) : problem ? (
                  <div className="space-y-6">
                     <div>
                        <span className="px-2 py-1 rounded text-[10px] font-black uppercase tracking-wider border bg-red-500/10 text-red-400 border-red-500/20">{problem.difficulty || 'HARD'}</span>
                        <h2 className="text-2xl font-black text-white mt-3 mb-2 leading-tight">{problem.title}</h2>
                        <p className="text-sm text-gray-300 leading-relaxed">{problem.description}</p>
                     </div>
                     
                     <div className="space-y-3">
                        <h3 className="text-xs font-mono uppercase text-white/50 flex items-center gap-2"><IconCheck size={14} className="text-red-500" /> Examples</h3>
                        {problem.examples?.map((ex, i) => (
                          <div key={i} className="bg-white/5 border border-white/5 rounded-xl p-4 text-xs font-mono hover:border-red-500/30 transition-colors">
                            <div className="flex gap-2 mb-1"><span className="text-white/40 min-w-[30px]">IN:</span><span className="text-white">{safeRender(ex.input)}</span></div>
                            <div className="flex gap-2"><span className="text-white/40 min-w-[30px]">OUT:</span><span className="text-red-400">{safeRender(ex.output)}</span></div>
                          </div>
                        ))}
                     </div>

                     <div className="space-y-2">
                        <h3 className="text-xs font-mono uppercase text-white/50 flex items-center gap-2"><IconAlertTriangle size={14} className="text-orange-500" /> Constraints</h3>
                        <ul className="list-disc list-inside text-xs text-gray-400 font-mono space-y-1 pl-2 bg-white/[0.02] p-3 rounded-xl border border-white/5">
                          {problem.constraints?.map((c, i) => <li key={i}>{safeRender(c)}</li>)}
                        </ul>
                     </div>
                     <div className="h-10" />
                  </div>
               ) : null}
            </div>
         )}

         {activeTab === 'code' && (
            <div className="h-full flex flex-col">
               <div className="flex-none p-2 border-b border-white/5 flex gap-2 overflow-x-auto bg-[#080808]">
                 {['javascript', 'python', 'cpp'].map((lang) => (
                   <button key={lang} onClick={() => setLanguage(lang)} className={`px-3 py-1.5 rounded-lg text-[10px] font-bold uppercase whitespace-nowrap ${language === lang ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'text-white/30 bg-white/5'}`}>{lang}</button>
                 ))}
               </div>
               
               <div className="flex-1 relative bg-[#0c0c0c]">
                 <textarea 
                    value={code} 
                    onChange={(e) => setCode(e.target.value)} 
                    className="absolute inset-0 w-full h-full bg-transparent p-4 font-mono text-sm text-white/80 resize-none focus:outline-none placeholder:text-white/20 selection:bg-red-500/30" 
                    spellCheck="false" 
                    placeholder="// Initialize neural link..." 
                 />
               </div>

               <div className="flex-none h-[35%] bg-[#080808] border-t border-white/10 flex flex-col">
                  <div className="flex-none px-4 py-2 bg-white/5 border-b border-white/5 flex justify-between items-center">
                     <span className="text-[10px] font-mono text-white/40 uppercase">Output Console</span>
                     <button onClick={handleRun} disabled={compiling} className={`px-4 py-1.5 rounded text-xs font-black italic tracking-wider flex items-center gap-2 ${compiling ? 'bg-white/10 text-white/30' : 'bg-red-500 text-white hover:bg-red-600'}`}>
                        {compiling ? '...' : <><IconPlayerPlay size={12} fill="currentColor" /> RUN</>}
                     </button>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
                     {output ? (
                       <div>
                         <div className={`mb-2 font-bold ${output.success ? 'text-green-400' : 'text-red-400'}`}>{output.success ? '> BUILD SUCCESSFUL' : '> COMPILATION FAILED'}</div>
                         <div className="text-white/80 whitespace-pre-wrap">{output.output}</div>
                         <div className="mt-2 pt-2 border-t border-white/10 text-white/40 italic">{output.analysis}</div>
                       </div>
                     ) : (
                       <div className="text-white/20 italic text-center mt-4">Waiting for execution...</div>
                     )}
                  </div>
               </div>
            </div>
         )}
      </div>

      {/* Floating Action for Mission Tab */}
      {activeTab === 'mission' && (
         <div className="absolute bottom-6 right-6">
            <button onClick={() => setActiveTab('code')} className="w-14 h-14 rounded-full bg-red-500 text-white shadow-lg shadow-red-500/20 flex items-center justify-center">
               <IconCode size={24} stroke={2.5} />
            </button>
         </div>
      )}
    </motion.div>
  )
}

// ==========================================
// MAIN PAGE COMPONENT
// ==========================================

export default function Page() {
  const router = useRouter();

  // --- Animation States ---
  const [traderLottie, setTraderLottie] = useState(null);
  const [bullishLottie, setBullishLottie] = useState(null);
  const [bearLottie, setBearLottie] = useState(null); 
  const [bnbLottie, setBnbLottie] = useState(null); 
  
  // --- Modal & Form States ---
  const [showAlertModal, setShowAlertModal] = useState(false);
  const [showPortfolioModal, setShowPortfolioModal] = useState(false); 
  
  // ✅ TERMINAL MODALS
  const [showTerminal, setShowTerminal] = useState(false); // Easy Mode
  const [showHardTerminal, setShowHardTerminal] = useState(false); // Hard Mode
  
  // ✅ NEW MODALS (Leaderboard & Prizes)
  const [showLeaderboard, setShowLeaderboard] = useState(false);
  const [showPrizes, setShowPrizes] = useState(false);

  // ✅ MASTER HENRY STATE
  const [isHenryActive, setIsHenryActive] = useState(false);

  const [tgUsername, setTgUsername] = useState('');
  const [tgChatId, setTgChatId] = useState('');
  
  // New States for Watchlist
  const [isConnected, setIsConnected] = useState(false);
  const [watchlist, setWatchlist] = useState<string[]>([]);
  const [newKeyword, setNewKeyword] = useState('');
  
  const [status, setStatus] = useState('IDLE'); 
  const [errorMsg, setErrorMsg] = useState('');

  // ✅ MOBILE DETECTION
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 1024);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    fetch('/blockchain-technology.json').then((res) => res.json()).then((data) => setTraderLottie(data));
    fetch('/growth-analysis.json').then((res) => res.json()).then((data) => setBullishLottie(data));
    fetch('/email-marketing.json').then((res) => res.json()).then((data) => setBearLottie(data));
    fetch('/bnb-crypto-coin.json').then((res) => res.json()).then((data) => setBnbLottie(data));
  }, []);

  const handleActivateAlerts = async () => {
    if (!tgUsername || !tgChatId) {
      setErrorMsg("Please fill in both fields");
      return;
    }
    
    setStatus('LOADING');
    setErrorMsg('');

    try {
      const res = await fetch(`${BACKEND_URL}/api/connect`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'ngrok-skip-browser-warning': 'true' 
        },
        body: JSON.stringify({
          username: tgUsername.replace('@', ''), 
          chat_id: tgChatId
        })
      });

      const data = await res.json();

      if (data.success) {
        setStatus('SUCCESS');
        setIsConnected(true);
        if (data.user && data.user.watchlist) {
            setWatchlist(data.user.watchlist);
        }
      } else {
        setStatus('ERROR');
        setErrorMsg(data.error || "Connection refused");
      }
    } catch (err) {
      console.error(err);
      setStatus('ERROR');
      setErrorMsg("Server unreachable");
    }
  };

  const handleAddToWatchlist = async () => {
    if (!newKeyword) return;

    try {
        const res = await fetch(`${BACKEND_URL}/api/watchlist`, {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'ngrok-skip-browser-warning': 'true'
            },
            body: JSON.stringify({
              username: tgUsername.replace('@', ''),
              keyword: newKeyword
            })
        });

        const data = await res.json();
        
        if (data.success) {
            setWatchlist(data.watchlist); 
            setNewKeyword(''); 
        }
    } catch (err) {
        console.error("Failed to add keyword", err);
    }
  };

  const dsaUsers = [
    { name: "CODE_MONARCH", points: "2,450", change: "+12.2%", color: "text-green-400" },
    { name: "ALGO_ZENITH", points: "1,820", change: "+0.9%", color: "text-green-400" },
    { name: "RECURSION_GOD", points: "4,610", change: "-4.4%", color: "text-red-400" },
    { name: "GRAPH_MASTER", points: "2,750", change: "+2.1%", color: "text-green-400" },
    { name: "NULL_POINTER", points: "3,100", change: "-1.1%", color: "text-red-400" },
    { name: "TIME_COMPLEXITY", points: "812", change: "+5.5%", color: "text-green-400" },
  ];

  // ==========================================
  // SHARED MODAL RENDERER
  // ==========================================
  const renderModals = () => (
    <>
      <AnimatePresence>
        {showAlertModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAlertModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-black italic text-white tracking-tight">{isConnected ? 'MANAGE WATCHLIST' : 'CONFIGURE ALERTS'}</h3>
                <button onClick={() => setShowAlertModal(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors"><IconX size={20} className="text-white/40" /></button>
              </div>
              {!isConnected ? (
                <div className="space-y-4">
                  <div><label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1.5 block">Telegram Username</label><input type="text" value={tgUsername} onChange={(e) => setTgUsername(e.target.value)} placeholder="@trader_pro" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20" /></div>
                  <div><label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1.5 block">Chat ID (from @userinfobot)</label><input type="text" value={tgChatId} onChange={(e) => setTgChatId(e.target.value)} placeholder="987654321" className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors placeholder:text-white/20" /></div>
                  {status === 'ERROR' && (<div className="text-red-400 text-xs font-mono text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20">{errorMsg}</div>)}
                  <button onClick={handleActivateAlerts} disabled={status === 'LOADING'} className={`w-full mt-4 py-4 rounded-2xl font-black italic tracking-widest text-sm transition-all active:scale-[0.98] ${status === 'LOADING' ? 'bg-purple-900 text-white/50 cursor-wait' : 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white hover:opacity-90'}`}>{status === 'LOADING' ? 'CONNECTING...' : 'ACTIVATE WEBHOOK'}</button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 p-3 rounded-xl flex items-center gap-3"><div className="p-1 bg-green-500 text-black rounded-full"><IconCheck size={14} stroke={3} /></div><div className="text-xs text-green-300 font-mono">Connected as <span className="font-bold text-white">@{tgUsername.replace('@','')}</span></div></div>
                  <div><label className="text-[10px] font-mono text-purple-400 uppercase tracking-widest mb-1.5 block">Add Keyword to Monitor</label><div className="flex gap-2"><input type="text" value={newKeyword} onChange={(e) => setNewKeyword(e.target.value)} placeholder="e.g. Gold, Tesla, Bitcoin" className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-purple-500/50 transition-colors" /><button onClick={handleAddToWatchlist} className="bg-white/10 hover:bg-white/20 border border-white/10 text-white p-3 rounded-xl transition-colors"><IconPlus size={20} /></button></div></div>
                  <div><label className="text-[10px] font-mono text-white/30 uppercase tracking-widest mb-2 block">Active Watchlist</label><div className="flex flex-wrap gap-2">{watchlist.length > 0 ? watchlist.map((item, i) => (<span key={i} className="px-3 py-1 bg-purple-500/20 border border-purple-500/30 text-purple-300 text-xs rounded-lg font-bold">{item}</span>)) : (<span className="text-white/20 text-xs italic">No keywords added yet.</span>)}</div></div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPortfolioModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPortfolioModal(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} className="relative w-full max-w-md bg-[#111] border border-white/10 rounded-[2.5rem] p-8 shadow-2xl overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
              <div className="flex justify-between items-center mb-6"><h3 className="text-xl font-black italic text-white tracking-tight">ACTIVE PROGRESS</h3><button onClick={() => setShowPortfolioModal(false)} className="p-2 hover:bg-white/5 rounded-full"><IconX size={20} className="text-white/40" /></button></div>
              <div className="space-y-4">
                <div className="bg-white/5 p-4 rounded-2xl border border-white/5"><p className="text-[10px] font-mono text-blue-400 uppercase tracking-widest mb-1">Total Rank Points</p><p className="text-3xl font-black text-white italic tracking-tighter">42,690</p></div>
                <div className="space-y-2">{[{ name: "Dynamic Programming", sym: "DP", val: "820 XP", change: "+2.4%" }, { name: "Graph Theory", sym: "GRPH", val: "150 XP", change: "-0.8%" }, { name: "Sliding Window", sym: "SLW", val: "120 XP", change: "+12.1%" }].map((asset, i) => (<div key={i} className="flex justify-between items-center p-3 bg-white/[0.02] border border-white/5 rounded-xl"><div><p className="text-xs font-bold text-white">{asset.name}</p><p className="text-[10px] font-mono text-white/30">{asset.sym}</p></div><div className="text-right"><p className="text-xs font-mono text-white">{asset.val}</p><p className={`text-[10px] font-bold ${asset.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>{asset.change}</p></div></div>))}</div>
                <button className="w-full py-4 bg-white text-black font-black text-xs tracking-widest rounded-2xl hover:bg-blue-400 transition-colors">VIEW DETAILED ANALYTICS</button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showLeaderboard && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowLeaderboard(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-yellow-500 to-transparent opacity-50" />
                <div className="flex justify-between items-center mb-6"><div className="flex items-center gap-2"><IconTrophy size={20} className="text-yellow-500" /><h3 className="text-lg font-black italic text-white">LEADERBOARD</h3></div><button onClick={() => setShowLeaderboard(false)} className="p-1 hover:bg-white/10 rounded-full"><IconX size={18} className="text-white/50" /></button></div>
                <div className="space-y-3">{[{ rank: 1, name: "RecursionGod", pts: "12,450", color: "text-yellow-400", bg: "bg-yellow-500/10" }, { rank: 2, name: "GraphMaster", pts: "11,200", color: "text-gray-300", bg: "bg-white/10" }, { rank: 3, name: "AlgoZenith", pts: "10,890", color: "text-orange-400", bg: "bg-orange-500/10" }, { rank: 4, name: "BinaryTree", pts: "9,450", color: "text-white/60", bg: "bg-white/5" }, { rank: 5, name: "NullPointer", pts: "8,210", color: "text-white/60", bg: "bg-white/5" }].map((user, i) => (<div key={i} className={`flex items-center justify-between p-3 rounded-xl border border-white/5 ${user.bg}`}><div className="flex items-center gap-3"><span className={`font-black text-sm w-4 text-center ${user.color}`}>#{user.rank}</span><span className="text-sm font-bold text-white">{user.name}</span></div><span className="text-xs font-mono text-white/50">{user.pts}</span></div>))}</div>
                <div className="mt-4 pt-4 border-t border-white/5 text-center"><p className="text-[10px] text-white/30 uppercase tracking-widest">Season ends in 4 days</p></div>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showPrizes && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowPrizes(false)} className="absolute inset-0 bg-black/80 backdrop-blur-sm" />
             <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-[2.5rem] p-6 shadow-2xl">
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                <div className="flex justify-between items-center mb-6"><div className="flex items-center gap-2"><IconGift size={20} className="text-purple-400" /><h3 className="text-lg font-black italic text-white">REWARDS</h3></div><button onClick={() => setShowPrizes(false)} className="p-1 hover:bg-white/10 rounded-full"><IconX size={18} className="text-white/50" /></button></div>
                <div className="grid grid-cols-2 gap-3">{[{ name: "Keychron K2", type: "Hardware", sub: "Mechanical Keyboard", icon: <IconTerminal /> }, { name: "Google Internship", type: "Career", sub: "Fast-Track Referral", icon: <IconMedal /> }, { name: "System Design", type: "Course", sub: "Lifetime Access", icon: <IconCode /> }, { name: "Premium Badge", type: "Profile", sub: "Verified Status", icon: <IconCheck /> }].map((item, i) => (<div key={i} className="bg-white/5 border border-white/5 p-4 rounded-2xl flex flex-col items-center text-center gap-2 hover:bg-white/10 transition-colors cursor-default group"><div className="p-3 bg-purple-500/10 text-purple-400 rounded-full mb-1 group-hover:scale-110 transition-transform">{React.cloneElement(item.icon as any, { size: 20 })}</div><h4 className="text-xs font-bold text-white">{item.name}</h4><p className="text-[10px] text-white/40 font-mono">{item.sub}</p></div>))}</div>
                <button className="w-full mt-6 py-3 bg-white text-black font-black text-xs tracking-widest rounded-xl hover:bg-purple-400 transition-colors">CLAIM REWARDS</button>
             </motion.div>
          </div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showTerminal && (
          isMobile ? <MobileCodingTerminal onClose={() => setShowTerminal(false)} /> : <CodingTerminal onClose={() => setShowTerminal(false)} />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showHardTerminal && (
          isMobile ? <MobileHardModeTerminal onClose={() => setShowHardTerminal(false)} /> : <HardModeTerminal onClose={() => setShowHardTerminal(false)} />
        )}
      </AnimatePresence>
    </>
  )

  // ==========================================
  // MOBILE LAYOUT
  // ==========================================
  if (isMobile) {
    return (
      <main className="h-screen w-full bg-[#0a0a0a] flex flex-col overflow-hidden relative font-sans">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />

        {/* --- Header & Ticker --- */}
        <div className="w-full bg-[#111] border-b border-white/10 z-20 flex-none pb-2 pt-12 px-4 shadow-xl">
           <div className="flex justify-between items-center mb-4">
             <div className="flex items-center gap-3">
               <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center text-white font-bold text-xs">IO</div>
               <div>
                  <h1 className="text-lg font-black italic text-white leading-none">QOTDLE DASHBOARD</h1>
                  <p className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Always Anywhere</p>
               </div>
             </div>
           </div>
           
           <div className="w-full bg-black/40 border border-white/5 rounded-lg py-1.5 flex items-center overflow-hidden relative">
              <motion.div 
                animate={{ x: [0, -1000] }}
                transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                className="flex gap-8 items-center whitespace-nowrap px-4"
              >
                {[...dsaUsers, ...dsaUsers].map((user, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="font-black italic text-white/30 text-[10px] tracking-wide">{user.name}</span>
                    <span className={`text-[10px] font-bold ${user.color}`}>{user.change}</span>
                  </div>
                ))}
              </motion.div>
           </div>
        </div>

        {/* --- Scrollable Feed --- */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 z-10 pb-24">
           
           {/* 1. Hard Mode Card */}
           <div onClick={() => setShowHardTerminal(true)} className="w-full relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-lg active:scale-[0.98] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 to-transparent" />
              <div className="absolute top-0 right-0 p-4 opacity-50"><IconFlame className="text-red-500" size={32} /></div>
              <div className="relative p-6">
                 <span className="px-2 py-1 bg-red-500/10 text-red-500 text-[9px] font-bold rounded uppercase border border-red-500/20">Advanced</span>
                 <h2 className="text-4xl font-black italic text-white mt-2 mb-1">HARD MODE</h2>
                 <p className="text-xs text-white/50 mb-4 max-w-[70%]">High stakes algorithms. No hints allowed.</p>
                 <div className="flex items-center gap-2 text-red-400 text-xs font-bold uppercase tracking-widest">
                    <span>Enter Protocol</span> <IconArrowDownRight size={14} />
                 </div>
              </div>
           </div>

           {/* 2. Blitzcrank Card */}
           <div onClick={() => setShowTerminal(true)} className="w-full relative overflow-hidden rounded-2xl bg-[#0f0f0f] border border-white/10 shadow-lg active:scale-[0.98] transition-transform">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-transparent" />
              <div className="relative p-6 flex justify-between items-center">
                 <div>
                    <h2 className="text-3xl font-black italic text-white leading-none mb-1">BLITZ<span className="text-emerald-500">CRANK</span></h2>
                    <p className="text-xs text-emerald-500/60 font-mono">Daily Coding Drills</p>
                 </div>
                 <div className="w-16 h-16 relative">
                    {bullishLottie && <Lottie animationData={bullishLottie} loop={true} className="w-full h-full" />}
                 </div>
              </div>
              <div className="px-6 pb-6 pt-0">
                 <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden flex">
                    <div className="w-[65%] bg-emerald-500 h-full" />
                 </div>
                 <div className="flex justify-between mt-2 text-[10px] font-mono text-white/30 uppercase">
                    <span>Progress</span>
                    <span>65%</span>
                 </div>
              </div>
           </div>

           {/* 3. Grid for Actions */}
           <div className="grid grid-cols-2 gap-3">
              <button onClick={() => setShowLeaderboard(true)} className="bg-[#151515] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:bg-white/5 transition-colors">
                 <IconTrophy size={24} className="text-yellow-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-wide">Rankings</span>
              </button>
              <button onClick={() => setShowPrizes(true)} className="bg-[#151515] border border-white/5 p-4 rounded-2xl flex flex-col items-center justify-center gap-2 active:bg-white/5 transition-colors">
                 <IconGift size={24} className="text-purple-500" />
                 <span className="text-xs font-bold text-white uppercase tracking-wide">Rewards</span>
              </button>
           </div>

           {/* 4. Master Henry (Interactive) */}
           <div onClick={() => setIsHenryActive(!isHenryActive)} className="w-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-900/20 to-[#0f0f0f] border border-white/10 p-6 min-h-[160px] flex flex-col justify-center active:scale-[0.98] transition-transform">
              <AnimatePresence mode="wait">
                 {isHenryActive ? (
                    <motion.div key="m-active" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center text-center">
                        <IconCone className="text-yellow-500 mb-2" size={24} />
                        <h3 className="text-lg font-black text-white italic">MAINTENANCE</h3>
                        <p className="text-[10px] text-white/40 font-mono uppercase">Protocol H-99</p>
                    </motion.div>
                 ) : (
                    <motion.div key="m-inactive" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-4">
                        <div className="w-16 h-16 rounded-full bg-blue-500/10 flex items-center justify-center border border-blue-500/20">
                           {traderLottie && <Lottie animationData={traderLottie} loop={true} className="w-12 h-12 opacity-60 mix-blend-screen" />}
                        </div>
                        <div>
                           <h3 className="text-xl font-black italic text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-400">MASTER HENRY</h3>
                           <p className="text-xs text-blue-400/40">Voice your flaws.</p>
                        </div>
                    </motion.div>
                 )}
              </AnimatePresence>
           </div>
        </div>

        {/* --- Bottom Navigation --- */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 px-6 py-3 bg-white/10 backdrop-blur-md border border-white/10 rounded-full shadow-2xl z-30">
           <button onClick={() => setShowPortfolioModal(true)} className="p-2 text-white hover:text-blue-400 transition-colors"><IconActivity size={24} /></button>
           <div className="w-px h-6 bg-white/20" />
           <button onClick={() => setShowTerminal(true)} className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center font-black shadow-[0_0_15px_rgba(255,255,255,0.3)]"><IconCode size={24} /></button>
           <div className="w-px h-6 bg-white/20" />
           <button onClick={() => setShowLeaderboard(true)} className="p-2 text-white hover:text-yellow-400 transition-colors"><IconChartBar size={24} /></button>
        </div>

        {renderModals()}
      </main>
    )
  }

  // ==========================================
  // DESKTOP LAYOUT (UNTOUCHED)
  // ==========================================
  return (
    <main className="h-screen w-full max-w-full p-6 bg-[#1a1a1a] flex flex-col gap-6 overflow-hidden min-w-0 relative">
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none z-0 mix-blend-overlay"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />

      <div className="w-full bg-black/40 border border-white/10 rounded-2xl py-3 flex items-center z-10 shrink-0">
        <div className="px-4 border-r border-white/10 mr-4">
          <IconActivity className="text-white/50 w-5 h-5 animate-pulse" />
        </div>
        <div className="overflow-hidden flex-1 mask-linear-fade"> 
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-16 items-center whitespace-nowrap"
          >
            {[...dsaUsers, ...dsaUsers, ...dsaUsers].map((user, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="font-black italic text-white/40 tracking-wider text-sm">{user.name}</span>
                <span className="text-white font-mono text-sm">{user.points} PTS</span>
                <span className={`text-xs font-bold ${user.color} bg-white/5 px-1.5 py-0.5 rounded`}>{user.change}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-12 grid-rows-6 gap-6 min-h-0 z-10 w-full">
        
        {/* --- LEFT: HARD MODE --- */}
        <motion.div 
          onClick={() => setShowHardTerminal(true)}
          whileHover={{ scale: 0.99 }}
          whileTap={{ scale: 0.97 }}
          className="col-span-12 md:col-span-4 row-span-6 group relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-red-500/50 cursor-pointer"
        >
          <div className=" absolute inset-0 bg-gradient-to-b from-red-950/30 via-transparent to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 flex flex-col h-full p-8">
            <div className="flex justify-between items-start">
              <div className="bg-red-500/10 p-2 rounded-lg border border-red-500/20">
                <IconArrowDownRight className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-red-500/40 font-mono text-xs">BRAVE ONES CLICK</span>
            </div>
            <div className="mt-8">
              <h2 className="text-6xl lg:text-7xl font-black italic tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white/80 to-white/20 group-hover:from-red-400 group-hover:to-red-900 transition-all duration-500">
                HARD
              </h2>
              <p className="text-red-300/50 font-medium text-sm mt-2">DIFFICULT PROBLEMS</p>
            </div>
            <div className="my-auto relative w-full h-64 lg:h-96 flex items-center justify-center mix-blend-screen">
              {bearLottie ? (
                  <div className="w-full h-full drop-shadow-[0_0_20px_rgba(239,68,68,0.3)] filter contrast-125">
                     <Lottie animationData={bearLottie} loop={true} />
                  </div>
              ) : (
                  <div className="w-24 h-24 border-4 border-red-900 border-t-red-500 rounded-full animate-spin" />
              )}
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT TOP: EASY QUESTIONS (BLITZCRANK) --- */}
        <motion.div 
          onClick={() => setShowTerminal(true)}
          whileHover={{ scale: 0.99 }}
          whileTap={{ scale: 0.97 }}
          className="col-span-12 md:col-span-8 row-span-3 group relative overflow-hidden rounded-[2rem] bg-[#0a0a0a] border border-white/5 transition-all duration-500 hover:border-green-500/50 cursor-pointer"
        >
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-green-500/10 blur-[100px] rounded-full translate-x-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-60 transition-opacity duration-700" />
          <div className="relative z-10 p-8 flex flex-col justify-between h-full">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-5xl lg:text-7xl font-black italic tracking-tighter text-white group-hover:text-green-400 transition-colors duration-300">
                  BLITZCRANK
                </h2>
                <div className="flex gap-2 mt-2">
                  <span className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-[10px] font-bold tracking-widest border border-green-500/20 uppercase">
                    Quick Solves
                  </span>
                </div>
              </div>
              <div className="w-32 h-32 md:w-48 md:h-48 relative -mt-4">
                 {bullishLottie ? (
                   <div className="w-full h-full drop-shadow-[0_0_15px_rgba(74,222,128,0.3)]">
                      <Lottie animationData={bullishLottie} loop={true} />
                   </div>
                 ) : (
                   <div className="w-full h-full flex items-center justify-center"><div className="w-16 h-16 rounded-full border-2 border-green-500/30 border-t-green-500 animate-spin" /></div>
                 )}
              </div>
            </div>
            <div className="grid grid-cols-6 gap-2 mt-4 items-end h-80">
              {[40, 70, 50, 90, 60, 85].map((h, i) => (
                <div key={i} className="w-full bg-white/5 rounded-t-sm h-full flex items-end overflow-hidden relative">
                  <motion.div 
                    animate={{ height: [`${h}%`, `${h * 0.1}%`] }}
                    transition={{ duration: 1.5 + (i * 0.1), repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                    className="w-full bg-green-500"
                  />
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* --- RIGHT BOTTOM: FLASH DILEMMA (MASTER HENRY) - MODIFIED --- */}
        <motion.div 
          onClick={() => setIsHenryActive(true)}
          onMouseLeave={() => setIsHenryActive(false)}
          whileHover={{ scale: 0.99 }}
          whileTap={{ scale: 0.97 }}
          className="col-span-12 md:col-span-4 row-span-3 rounded-[2rem] bg-gradient-to-br from-indigo-950/40 via-[#111] to-blue-900/20 border border-white/5 p-6 flex flex-col relative group overflow-hidden transition-all duration-500 hover:border-blue-400/30 cursor-pointer"
        >
          {/* ✅ CONDITIONALLY RENDER CONTENT BASED ON CLICK */}
          <AnimatePresence mode="wait">
            {isHenryActive ? (
                // --- UNDER CONSTRUCTION STATE ---
                <motion.div 
                    key="construction"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50 p-6 text-center"
                >
                    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
                    <IconCone className="w-16 h-16 text-yellow-500 mb-4 animate-bounce" />
                    <h3 className="text-xl font-black italic text-white tracking-widest uppercase mb-2">
                        SYSTEM UNDER <br/> MAINTENANCE
                    </h3>
                    <p className="text-[10px] font-mono text-white/40 tracking-[0.2em] uppercase">
                        Protocol H-99 Initiated
                    </p>
                    <div className="w-32 h-1 bg-white/10 mt-6 rounded-full overflow-hidden">
                        <motion.div 
                            animate={{ x: [-128, 128] }}
                            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                            className="w-1/2 h-full bg-yellow-500"
                        />
                    </div>
                </motion.div>
            ) : (
                // --- NORMAL STATE ---
                <motion.div key="normal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col h-full w-full">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 blur-[80px] rounded-full group-hover:bg-indigo-500/20 transition-colors duration-700 pointer-events-none" />
                  <div className="absolute top-6 right-6 flex items-center gap-2 z-20">
                     <span className="text-[10px] font-mono text-blue-300/50 uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Beware, Not Kind</span>
                     <motion.div animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }} transition={{ duration: 3, repeat: Infinity }} className="w-3 h-3 rounded-full bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.5)]" />
                  </div>
                  <div className="relative z-10 flex flex-col h-full">
                    <div>
                      <h3 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-200 to-indigo-400 italic tracking-tighter">MASTER HENRY</h3>
                      <p className="text-blue-400/30 text-xs font-mono mt-1">voice your flaws</p>
                    </div>
                    <div className="flex-1 flex items-center justify-center -my-2 relative">
                       {traderLottie ? (
                         <div className="w-full h-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen grayscale group-hover:grayscale-0 contrast-125">
                           <Lottie animationData={traderLottie} loop={true} />
                         </div>
                       ) : (
                         <div className="animate-pulse w-24 h-24 rounded-full bg-blue-500/5 border border-blue-500/10" />
                       )}
                    </div>
                    <div className="mt-auto border-t border-white/5 pt-4 flex justify-between items-end">
                       <div className="flex gap-1">
                         {[1,2,3].map(i => (
                           <motion.div key={i} animate={{ height: [4, 12, 4] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.2 }} className="w-1 bg-blue-500/40 rounded-full" />
                         ))}
                       </div>
                       <IconTrendingUp className="text-blue-500/40 w-5 h-5" />
                    </div>
                  </div>
                </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* --- CARD 02: ACTIONS & ALERTS --- */}
        <div className="col-span-12 md:col-span-4 row-span-3 rounded-[2rem] bg-gradient-to-br from-purple-900/20 to-[#111] border border-white/5 p-6 flex flex-col relative group hover:border-purple-500/30 transition-all overflow-hidden">
          <div className="flex justify-between items-center mb-4 z-20">
            <div className="p-3 rounded-xl bg-purple-500/10 text-purple-400 border border-purple-500/20 group-hover:rotate-12 transition-transform">
              <IconBolt size={24} fill="currentColor" />
            </div>
            <span className="text-xs font-bold text-purple-400 bg-purple-500/10 px-2 py-1 rounded-md">TRACK POINTS</span>
          </div>
          <div className="flex-1 flex items-center gap-4 relative z-10">
             <div className="flex-1 flex items-center justify-center">
                 <div className="w-38 h-38 group-hover:scale-110 transition-transform duration-500 relative">
                    <div className="absolute inset-0 bg-purple-600/10 blur-[40px] rounded-full" />
                    {bnbLottie ? (
                        <div className="w-full h-full drop-shadow-[0_0_25px_rgba(168,85,247,0.25)]"><Lottie animationData={bnbLottie} loop={true} /></div>
                    ) : (
                        <div className="w-full h-full flex items-center justify-center"><div className="w-14 h-14 rounded-full border-4 border-purple-500/20 border-t-purple-500 animate-spin" /></div>
                    )}
                 </div>
             </div>
             <div className="flex flex-col gap-3 w-1/2">
                <button 
                  onClick={() => setShowPrizes(true)}
                  className="w-full py-3 rounded-xl bg-white text-black font-bold text-xs hover:bg-purple-400 hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
                >
                  <IconMoneybag size={16} /> Win Prizes
                </button>
                <button 
                  onClick={() => setShowLeaderboard(true)}
                  className="w-full py-3 rounded-xl bg-white/5 text-white font-bold text-xs hover:bg-white/10 border border-white/10 transition-all backdrop-blur-sm flex items-center justify-center gap-2"
                >
                   <IconChartBar size={16} /> Leaderboard
                </button>
             </div>
          </div>
        </div>
      </div>

      {renderModals()}

    </main>
  )
}