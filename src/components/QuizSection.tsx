import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw, Award } from 'lucide-react';
import { QUIZ_QUESTIONS, QuizQuestion } from '../data/pythonCodes';

export const QuizSection: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, string>>({});
  const [submitted, setSubmitted] = useState<Record<number, boolean>>({});

  const handleSelectOption = (questionId: number, letter: string) => {
    if (submitted[questionId]) return;
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: letter }));
  };

  const handleVerify = (questionId: number) => {
    if (!selectedAnswers[questionId]) return;
    setSubmitted((prev) => ({ ...prev, [questionId]: true }));
  };

  const handleResetQuiz = () => {
    setSelectedAnswers({});
    setSubmitted({});
  };

  // Calculate score
  const totalAnswered = Object.keys(submitted).length;
  const correctCount = QUIZ_QUESTIONS.filter((q) => {
    const chosenLetter = selectedAnswers[q.id];
    const correctOption = q.options.find((opt) => opt.isCorrect);
    return submitted[q.id] && chosenLetter === correctOption?.letter;
  }).length;

  return (
    <div className="space-y-6">
      {/* Quiz Banner & Score */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-slate-100 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400" />
            Quiz do Iniciante: Teste seus Conhecimentos em Python
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Responda as questões para fixar os conceitos de funções, conversão de tipos e operadores.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-slate-950 border border-slate-800 text-xs font-mono">
            <span className="text-slate-400">Pontuação: </span>
            <span className="text-amber-400 font-bold">{correctCount}</span>
            <span className="text-slate-500"> / {QUIZ_QUESTIONS.length}</span>
          </div>

          <button
            onClick={handleResetQuiz}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-750 text-slate-300 text-xs transition-colors border border-slate-700"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer</span>
          </button>
        </div>
      </div>

      {/* Quiz Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, idx) => {
          const isVerified = !!submitted[q.id];
          const chosenLetter = selectedAnswers[q.id];
          const correctOption = q.options.find((opt) => opt.isCorrect);
          const isCorrect = isVerified && chosenLetter === correctOption?.letter;

          return (
            <div
              key={q.id}
              className={`p-5 rounded-xl border transition-all ${
                isVerified
                  ? isCorrect
                    ? 'bg-emerald-950/20 border-emerald-800/80'
                    : 'bg-rose-950/20 border-rose-800/80'
                  : 'bg-slate-900/60 border-slate-800'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-slate-800 text-amber-400 font-bold text-xs flex items-center justify-center shrink-0 border border-slate-700">
                    {idx + 1}
                  </span>
                  <div className="flex-1 space-y-2">
                    <h3 className="text-sm font-semibold text-slate-100">{q.question}</h3>

                    {q.codeSnippet && (
                      <div className="p-3 bg-slate-950 border border-slate-800 rounded-lg font-mono text-xs text-amber-300">
                        <pre>{q.codeSnippet}</pre>
                      </div>
                    )}
                  </div>
                </div>

                {/* Options */}
                <div className="space-y-2 pt-2">
                  {q.options.map((opt) => {
                    const isSelected = chosenLetter === opt.letter;
                    let optionStyle = 'bg-slate-950/60 hover:bg-slate-800/60 border-slate-800 text-slate-300';

                    if (isVerified) {
                      if (opt.isCorrect) {
                        optionStyle = 'bg-emerald-950/70 border-emerald-600 text-emerald-200 font-medium';
                      } else if (isSelected && !opt.isCorrect) {
                        optionStyle = 'bg-rose-950/70 border-rose-600 text-rose-200';
                      } else {
                        optionStyle = 'bg-slate-950/40 border-slate-800/50 text-slate-500 opacity-60';
                      }
                    } else if (isSelected) {
                      optionStyle = 'bg-sky-950 border-sky-500 text-sky-200 shadow-sm';
                    }

                    return (
                      <div
                        key={opt.letter}
                        onClick={() => handleSelectOption(q.id, opt.letter)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer flex items-center justify-between transition-all select-none ${optionStyle}`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded font-mono font-bold text-xs flex items-center justify-center bg-slate-800/80 border border-slate-700/60 shrink-0">
                            {opt.letter}
                          </span>
                          <span>{opt.text}</span>
                        </div>

                        {isVerified && opt.isCorrect && (
                          <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                        )}
                        {isVerified && isSelected && !opt.isCorrect && (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Actions & Explanations */}
                <div className="pt-3 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  {!isVerified ? (
                    <button
                      onClick={() => handleVerify(q.id)}
                      disabled={!chosenLetter}
                      className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 disabled:opacity-40 disabled:hover:bg-sky-600 text-white text-xs font-medium transition-colors"
                    >
                      Confirmar Resposta
                    </button>
                  ) : (
                    <div className="text-xs leading-relaxed text-slate-300 bg-slate-950/80 p-3 rounded-lg border border-slate-800 flex-1">
                      <span className="font-semibold text-amber-300 block mb-1">Explicação:</span>
                      {q.explanation}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Completion Banner */}
      {totalAnswered === QUIZ_QUESTIONS.length && (
        <div className="p-5 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 text-center space-y-2">
          <Award className="w-8 h-8 text-amber-400 mx-auto" />
          <h4 className="text-base font-bold text-white">Quiz Concluído!</h4>
          <p className="text-xs text-slate-300">
            Você acertou <strong className="text-amber-400">{correctCount}</strong> de <strong>{QUIZ_QUESTIONS.length}</strong> perguntas.
            {correctCount === QUIZ_QUESTIONS.length
              ? ' Excelente! Você dominou todos os fundamentos essenciais da calculadora em Python!'
              : ' Bom trabalho! Revise os pontos onde teve dúvida na aba "Código & Explicação".'}
          </p>
        </div>
      )}
    </div>
  );
};
