import React, { useState } from 'react';
import { Copy, Check, Download, Info, ChevronRight, FileCode, Sparkles } from 'lucide-react';
import { PYTHON_CODE_LEVELS, PythonCodeLevel, CodeExplanation } from '../data/pythonCodes';

interface CodeViewerProps {
  onTestInTerminal?: (level: PythonCodeLevel) => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onTestInTerminal }) => {
  const [selectedLevelId, setSelectedLevelId] = useState<'basic' | 'menu' | 'advanced'>('basic');
  const [copied, setCopied] = useState(false);
  const [activeExplanation, setActiveExplanation] = useState<CodeExplanation | null>(null);

  const currentLevel = PYTHON_CODE_LEVELS.find((l) => l.id === selectedLevelId) || PYTHON_CODE_LEVELS[0];

  const handleCopy = () => {
    navigator.clipboard.writeText(currentLevel.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownload = () => {
    const filename = `calculadora_${currentLevel.id}.py`;
    const blob = new Blob([currentLevel.code], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const codeLines = currentLevel.code.split('\n');

  // Check if a line is within active explanation range
  const isLineHighlighted = (lineIndex: number) => {
    if (!activeExplanation) return false;
    const lineNumber = lineIndex + 1;
    return lineNumber >= activeExplanation.lineRange[0] && lineNumber <= activeExplanation.lineRange[1];
  };

  // Syntax highlighting helper for Python
  const renderHighlightedLine = (line: string) => {
    // Comments
    if (line.trim().startsWith('#')) {
      return <span className="text-emerald-400 italic">{line}</span>;
    }

    // Replace strings
    const parts = line.split(/("[^"]*"|'[^']*')/g);

    return parts.map((part, i) => {
      if (part.startsWith('"') || part.startsWith("'")) {
        return <span key={i} className="text-amber-300">{part}</span>;
      }

      // Keyword highlighting
      const words = part.split(/\b/);
      return words.map((word, wIdx) => {
        if (/^(def|return|if|elif|else|while|break|try|except|finally|raise|in|import|from|as|True|False|None)$/.test(word)) {
          return <span key={wIdx} className="text-sky-400 font-semibold">{word}</span>;
        }
        if (/^(float|int|str|input|print|range|len|sum)$/.test(word)) {
          return <span key={wIdx} className="text-purple-400">{word}</span>;
        }
        if (/^\d+(\.\d+)?$/.test(word)) {
          return <span key={wIdx} className="text-orange-300">{word}</span>;
        }
        if (/^(somar|subtrair|multiplicar|dividir|calcular|ler_numero)$/.test(word)) {
          return <span key={wIdx} className="text-teal-300">{word}</span>;
        }
        return <span key={wIdx}>{word}</span>;
      });
    });
  };

  return (
    <div className="space-y-6">
      {/* Level selector tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-2 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex flex-wrap items-center gap-1.5">
          {PYTHON_CODE_LEVELS.map((level) => (
            <button
              key={level.id}
              onClick={() => {
                setSelectedLevelId(level.id);
                setActiveExplanation(null);
              }}
              className={`px-4 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedLevelId === level.id
                  ? 'bg-amber-400 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800'
              }`}
            >
              {level.title}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg transition-colors whitespace-nowrap"
            title="Copiar código para a área de transferência"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-slate-400" />
                <span>Copiar Código</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-colors whitespace-nowrap shadow-sm"
            title="Baixar arquivo .py para executar no seu computador"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar .py</span>
          </button>
        </div>
      </div>

      {/* Description banner */}
      <div className="p-4 bg-slate-900/60 border border-slate-800/80 rounded-xl flex items-start gap-3">
        <div className="p-2 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
          <FileCode className="w-5 h-5" />
        </div>
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-slate-200">{currentLevel.subtitle}</h2>
          <p className="text-xs text-slate-400 leading-relaxed">{currentLevel.description}</p>
        </div>
      </div>

      {/* Split layout: Code on Left, Interactive Breakdown on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Code Block Container */}
        <div className="lg:col-span-7 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
          {/* Editor Header Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block"></span>
              <span className="ml-2 font-medium text-slate-300">calculadora.py</span>
            </div>
            <span className="text-slate-500">Python 3.12</span>
          </div>

          {/* Code Lines Display */}
          <div className="p-4 overflow-x-auto text-xs font-mono leading-relaxed max-h-[580px] overflow-y-auto">
            {codeLines.map((line, idx) => {
              const highlighted = isLineHighlighted(idx);
              return (
                <div
                  key={idx}
                  className={`flex items-start transition-colors py-0.5 px-2 rounded ${
                    highlighted ? 'bg-sky-950/60 text-sky-200 border-l-2 border-sky-400' : 'hover:bg-slate-900/40 text-slate-300'
                  }`}
                >
                  <span className="w-8 shrink-0 text-right pr-3 select-none text-slate-600 tabular-nums">
                    {idx + 1}
                  </span>
                  <pre className="flex-1 font-mono">{renderHighlightedLine(line)}</pre>
                </div>
              );
            })}
          </div>
        </div>

        {/* Explanations & Component Anatomy Column */}
        <div className="lg:col-span-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              Anatomia do Código: O que cada parte faz
            </h3>
            <span className="text-[11px] text-slate-400">Clique para destacar</span>
          </div>

          <div className="space-y-3">
            {currentLevel.explanations.map((exp, idx) => {
              const isSelected = activeExplanation?.title === exp.title;
              return (
                <div
                  key={idx}
                  onClick={() => setActiveExplanation(isSelected ? null : exp)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all ${
                    isSelected
                      ? 'bg-slate-900 border-sky-500/80 shadow-md ring-1 ring-sky-500/30'
                      : 'bg-slate-900/50 hover:bg-slate-900/80 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-semibold text-slate-100 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky-400"></span>
                      {exp.title}
                    </span>
                    <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                      Linhas {exp.lineRange[0]}–{exp.lineRange[1]}
                    </span>
                  </div>

                  <p className="text-[11px] text-sky-400 font-medium mb-1.5">{exp.concept}</p>
                  <p className="text-xs text-slate-400 leading-relaxed">{exp.explanation}</p>

                  <div className="mt-2.5 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px]">
                    <span className="font-mono text-amber-300/90 text-[10px]">{exp.tag}</span>
                    <span className={`flex items-center gap-1 ${isSelected ? 'text-sky-400 font-medium' : 'text-slate-500'}`}>
                      {isSelected ? 'Destacado no código' : 'Ver no código'}
                      <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Quick tip box for beginners */}
          <div className="p-3.5 bg-amber-400/10 border border-amber-400/20 rounded-xl flex items-start gap-2.5">
            <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="text-xs text-amber-200/90 leading-relaxed">
              <span className="font-semibold text-amber-300">Dica de Ouro em Python: </span>
              A indentação (o recuo de 4 espaços dentro das funções e do <code>if</code>) é obrigatória. Em Python, são os espaços que dizem onde um bloco começa e termina!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
