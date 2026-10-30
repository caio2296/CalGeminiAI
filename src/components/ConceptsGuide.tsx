import React, { useState } from 'react';
import { BookOpen, Copy, Check, ChevronDown, ChevronUp, Code, Lightbulb, AlertOctagon } from 'lucide-react';
import { CORE_CONCEPTS, ConceptCard } from '../data/pythonCodes';

export const ConceptsGuide: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const toggleExpand = (idx: number) => {
    setExpandedIndex(expandedIndex === idx ? null : idx);
  };

  const copySnippet = (code: string, idx: number, e: React.MouseEvent) => {
    e.stopPropagation();
    navigator.clipboard.writeText(code);
    setCopiedIndex(idx);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
        <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-amber-400" />
          Guia dos Conceitos Fundamentais de Python
        </h2>
        <p className="text-xs text-slate-400 leading-relaxed">
          Tudo o que você precisa dominar para entender essa calculadora e dar seus primeiros passos sólidos na programação.
        </p>
      </div>

      <div className="space-y-4">
        {CORE_CONCEPTS.map((concept, idx) => {
          const isExpanded = expandedIndex === idx;
          return (
            <div
              key={idx}
              className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                isExpanded
                  ? 'bg-slate-900/90 border-slate-700 shadow-lg'
                  : 'bg-slate-900/40 hover:bg-slate-900/70 border-slate-800/80'
              }`}
            >
              {/* Header */}
              <div
                onClick={() => toggleExpand(idx)}
                className="p-4 cursor-pointer flex items-center justify-between gap-4 select-none"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-slate-100">{concept.title}</span>
                    <span className="font-mono text-[11px] px-2 py-0.5 rounded bg-slate-800 text-sky-400 border border-slate-700">
                      {concept.pythonSyntax}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{concept.summary}</p>
                </div>

                <div className="p-1 rounded-lg bg-slate-800 text-slate-400">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </div>
              </div>

              {/* Collapsible Content */}
              {isExpanded && (
                <div className="px-4 pb-5 pt-2 border-t border-slate-800/80 space-y-4">
                  {/* Notes List */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-semibold text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
                      <Lightbulb className="w-3.5 h-3.5 text-amber-400" />
                      Pontos Importantes para Iniciantes:
                    </span>
                    <ul className="space-y-1.5 text-xs text-slate-300">
                      {concept.detailedNotes.map((note, nIdx) => (
                        <li key={nIdx} className="flex items-start gap-2 leading-relaxed">
                          <span className="text-sky-400 font-bold">•</span>
                          <span>{note}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Code Example */}
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
                      <span className="flex items-center gap-1">
                        <Code className="w-3.5 h-3.5 text-slate-500" />
                        Exemplo Prático:
                      </span>
                      <button
                        onClick={(e) => copySnippet(concept.exampleCode, idx, e)}
                        className="flex items-center gap-1 text-[11px] hover:text-white transition-colors"
                      >
                        {copiedIndex === idx ? (
                          <>
                            <Check className="w-3 h-3 text-emerald-400" />
                            <span className="text-emerald-400">Copiado</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3" />
                            <span>Copiar</span>
                          </>
                        )}
                      </button>
                    </div>

                    <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-xs text-emerald-400/90 overflow-x-auto">
                      <pre>{concept.exampleCode}</pre>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
