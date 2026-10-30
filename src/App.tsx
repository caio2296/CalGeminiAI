import React, { useState } from 'react';
import { 
  Code2, 
  Terminal, 
  Calculator, 
  HelpCircle, 
  BookOpen, 
  Download, 
  Play, 
  Laptop, 
  Sparkles,
  CheckCircle2,
  FileCode2
} from 'lucide-react';
import { CodeViewer } from './components/CodeViewer';
import { InteractiveTerminal } from './components/InteractiveTerminal';
import { VisualCalculator } from './components/VisualCalculator';
import { ConceptsGuide } from './components/ConceptsGuide';
import { QuizSection } from './components/QuizSection';
import { LocalRunGuideModal } from './components/LocalRunGuideModal';
import { PYTHON_CODE_LEVELS } from './data/pythonCodes';

type ActiveTab = 'code' | 'terminal' | 'calc' | 'guide' | 'quiz';

export default function App() {
  const [activeTab, setActiveTab] = useState<ActiveTab>('code');
  const [showRunGuide, setShowRunGuide] = useState(false);

  const downloadStarterCode = () => {
    const starter = PYTHON_CODE_LEVELS[0];
    const blob = new Blob([starter.code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calculadora_simples.py');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-amber-400 selection:text-slate-950">
      {/* 
        TOP BAR CONTRACT:
        Zone 1: Single text wordmark
        Zone 2: 4-5 single-line clean nav links
        Zone 3: 1 primary action
      */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark */}
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-slate-950 font-bold flex items-center justify-center font-mono text-sm shadow-sm">
              Py
            </div>
            <a 
              href="#top" 
              onClick={(e) => { e.preventDefault(); setActiveTab('code'); }}
              className="text-base font-bold tracking-tight text-white whitespace-nowrap hover:text-amber-400 transition-colors"
            >
              PyCalc Lab
            </a>
          </div>

          {/* Zone 2: Navigation Links / Tab Selectors */}
          <nav className="hidden md:flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-xl">
            <button
              onClick={() => setActiveTab('code')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'code' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Código & Explicação</span>
            </button>

            <button
              onClick={() => setActiveTab('terminal')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'terminal' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Terminal Python</span>
            </button>

            <button
              onClick={() => setActiveTab('calc')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'calc' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Calculator className="w-3.5 h-3.5" />
              <span>Calculadora Visual</span>
            </button>

            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'guide' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Conceitos Chave</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`px-3 py-1.5 text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 flex items-center gap-1.5 ${
                activeTab === 'quiz' ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm' : 'text-slate-400 hover:text-white'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5" />
              <span>Quiz</span>
            </button>
          </nav>

          {/* Zone 3: Primary Action */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowRunGuide(true)}
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-200 bg-slate-900 hover:bg-slate-800 border border-slate-700 rounded-lg transition-colors whitespace-nowrap shrink-0"
              title="Guia passo a passo para rodar no seu computador"
            >
              <Laptop className="w-3.5 h-3.5 text-amber-400" />
              <span className="hidden sm:inline">Como Rodar no PC</span>
            </button>

            <button
              onClick={downloadStarterCode}
              className="flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 shadow-sm"
              title="Baixar arquivo calculadora_simples.py"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar .py</span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Row (under header on small screens) */}
        <div className="md:hidden flex items-center gap-1 px-4 py-2 border-t border-slate-800/80 overflow-x-auto bg-slate-950">
          <button
            onClick={() => setActiveTab('code')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'code' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Código
          </button>
          <button
            onClick={() => setActiveTab('terminal')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'terminal' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Terminal
          </button>
          <button
            onClick={() => setActiveTab('calc')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'calc' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Calculadora
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'guide' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Conceitos
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap shrink-0 ${
              activeTab === 'quiz' ? 'bg-amber-400 text-slate-950 font-bold' : 'text-slate-400'
            }`}
          >
            Quiz
          </button>
        </div>
      </header>

      {/* Main Content Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Hero Section */}
        <div className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span className="font-medium text-amber-400">Guia Didático para Iniciantes</span>
            <span aria-hidden="true">·</span>
            <span>Python 3</span>
            <span aria-hidden="true">·</span>
            <span>4 Operações Básicas: Soma, Subtração, Multiplicação e Divisão</span>
          </div>

          <div className="max-w-3xl space-y-2">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight leading-tight">
              Calculadora Simples em Python
            </h1>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              Aprenda a estruturar seu primeiro projeto em Python do zero. Explore como funcionam funções com 
              <code className="text-sky-300 bg-slate-900 px-1.5 py-0.5 rounded mx-1 text-xs">def</code>, 
              leitura de dados com 
              <code className="text-purple-300 bg-slate-900 px-1.5 py-0.5 rounded mx-1 text-xs">float(input())</code>, 
              decisões com 
              <code className="text-amber-300 bg-slate-900 px-1.5 py-0.5 rounded mx-1 text-xs">if / elif / else</code>, 
              e proteção contra divisão por zero.
            </p>
          </div>

          {/* Quick Operations Indicator Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-emerald-950/80 border border-emerald-800 text-emerald-400 font-mono font-bold flex items-center justify-center">
                +
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">Adição</span>
                <span className="text-slate-500 font-mono">def somar(a, b)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-sky-950/80 border border-sky-800 text-sky-400 font-mono font-bold flex items-center justify-center">
                −
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">Subtração</span>
                <span className="text-slate-500 font-mono">def subtrair(a, b)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-purple-950/80 border border-purple-800 text-purple-400 font-mono font-bold flex items-center justify-center">
                ×
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">Multiplicação</span>
                <span className="text-slate-500 font-mono">def multiplicar(a, b)</span>
              </div>
            </div>

            <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-amber-950/80 border border-amber-800 text-amber-400 font-mono font-bold flex items-center justify-center">
                ÷
              </div>
              <div className="text-xs">
                <span className="font-semibold text-slate-200 block">Divisão</span>
                <span className="text-slate-500 font-mono">def dividir(a, b)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tab View Content */}
        <div className="pt-2">
          {activeTab === 'code' && <CodeViewer />}
          {activeTab === 'terminal' && <InteractiveTerminal />}
          {activeTab === 'calc' && <VisualCalculator />}
          {activeTab === 'guide' && <ConceptsGuide />}
          {activeTab === 'quiz' && <QuizSection />}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">PyCalc Lab</span>
            <span aria-hidden="true">·</span>
            <span>Aprenda Python na prática</span>
            <span aria-hidden="true">·</span>
            <span>Livre e aberto para estudantes</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => setShowRunGuide(true)}
              className="hover:text-amber-400 transition-colors"
            >
              Guia de Instalação do Python
            </button>
            <button
              onClick={downloadStarterCode}
              className="text-amber-400 hover:text-amber-300 transition-colors font-medium flex items-center gap-1"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar Script</span>
            </button>
          </div>
        </div>
      </footer>

      {/* Local Run Guide Modal */}
      <LocalRunGuideModal
        isOpen={showRunGuide}
        onClose={() => setShowRunGuide(false)}
      />
    </div>
  );
}
