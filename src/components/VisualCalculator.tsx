import React, { useState } from 'react';
import { Calculator, Play, RotateCcw, AlertTriangle, ArrowRight, Code2 } from 'lucide-react';

export const VisualCalculator: React.FC = () => {
  const [displayValue, setDisplayValue] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/' | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastEquation, setLastEquation] = useState<string>('');
  const [pythonTrace, setPythonTrace] = useState<{
    codeSnippet: string;
    explanation: string;
    functionCalled: string;
    returnValue: string;
    isError: boolean;
  }>({
    codeSnippet: `# Pressione os botões da calculadora para ver o código Python correspondente!
# Exemplo: digite um número, escolha o operador (+, -, *, /) e tecle =`,
    explanation: 'Aguardando operação...',
    functionCalled: 'Nenhuma',
    returnValue: '-',
    isError: false
  });

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplayValue(digit);
      setWaitingForOperand(false);
    } else {
      setDisplayValue(displayValue === '0' ? digit : displayValue + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplayValue('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!displayValue.includes('.')) {
      setDisplayValue(displayValue + '.');
    }
  };

  const clearAll = () => {
    setDisplayValue('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
    setLastEquation('');
    setPythonTrace({
      codeSnippet: `# Calculadora reiniciada
num1 = None
operacao = None
num2 = None`,
      explanation: 'Calculadora limpa. Digite uma nova conta.',
      functionCalled: 'reset()',
      returnValue: '0',
      isError: false
    });
  };

  const selectOperation = (op: '+' | '-' | '*' | '/') => {
    const current = parseFloat(displayValue);

    if (prevValue !== null && operation && !waitingForOperand) {
      performCalculation();
      return;
    }

    setPrevValue(current);
    setOperation(op);
    setWaitingForOperand(true);

    const funcMap = {
      '+': 'somar',
      '-': 'subtrair',
      '*': 'multiplicar',
      '/': 'dividir'
    };

    setPythonTrace({
      codeSnippet: `num1 = float("${current}")  # ${current}
operacao = "${op}"
# Aguardando segundo número para chamar: ${funcMap[op]}(num1, num2)`,
      explanation: `Operação selecionada: ${op}. O primeiro número (${current}) foi armazenado na variável num1.`,
      functionCalled: `${funcMap[op]}() pendente`,
      returnValue: 'Aguardando num2',
      isError: false
    });
  };

  const performCalculation = () => {
    if (prevValue === null || operation === null) return;

    const n1 = prevValue;
    const n2 = parseFloat(displayValue);
    let result = 0;
    let isZeroError = false;
    let funcName = '';

    switch (operation) {
      case '+':
        funcName = 'somar';
        result = n1 + n2;
        break;
      case '-':
        funcName = 'subtrair';
        result = n1 - n2;
        break;
      case '*':
        funcName = 'multiplicar';
        result = n1 * n2;
        break;
      case '/':
        funcName = 'dividir';
        if (n2 === 0) {
          isZeroError = true;
        } else {
          result = n1 / n2;
        }
        break;
    }

    setLastEquation(`${n1} ${operation} ${n2} =`);

    if (isZeroError) {
      setDisplayValue('Erro: div por 0');
      setPythonTrace({
        codeSnippet: `num1 = float("${n1}")
num2 = float("${n2}")
operacao = "/"

# Execução da função:
def dividir(a, b):
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

resultado = dividir(${n1}, ${n2})
# Retorno recebido: "Erro: Não é possível dividir por zero!"`,
        explanation: 'Aviso de Segurança: Divisão por 0 detectada! A condição "if b == 0" evitou uma falha do sistema (ZeroDivisionError).',
        functionCalled: 'dividir(a, b)',
        returnValue: '"Erro: divisão por zero"',
        isError: true
      });
    } else {
      const cleanResult = parseFloat(result.toFixed(8));
      setDisplayValue(String(cleanResult));
      setPythonTrace({
        codeSnippet: `num1 = float("${n1}")
num2 = float("${n2}")
operacao = "${operation}"

# Chamada da função correspondente:
def ${funcName}(a, b):
    return a ${operation} b

resultado = ${funcName}(${n1}, ${n2})
print(f"Resultado: {resultado}")  # Saída: ${cleanResult}`,
        explanation: `A função ${funcName}() foi executada com argumentos a=${n1} e b=${n2}, retornando ${cleanResult}.`,
        functionCalled: `${funcName}(${n1}, ${n2})`,
        returnValue: String(cleanResult),
        isError: false
      });
    }

    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="space-y-6">
      {/* Intro info bar */}
      <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Calculator className="w-4 h-4 text-amber-400" />
          <span>Calculadora Visual com Inspetor de Código Python ao Vivo</span>
        </div>
        <span className="text-slate-400 hidden sm:inline">Cada clique gera e inspeciona o código Python</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Physical-style Calculator Interface (5 cols) */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-2xl space-y-4">
          {/* LCD Display */}
          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 text-right">
            <div className="h-5 text-xs font-mono text-slate-500 truncate">
              {lastEquation || (prevValue !== null && operation ? `${prevValue} ${operation}` : '')}
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight truncate mt-1">
              {displayValue}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2.5">
            {/* Row 1 */}
            <button
              onClick={clearAll}
              className="col-span-2 py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 font-semibold text-sm transition-colors"
            >
              C (Limpar)
            </button>
            <button
              onClick={() => {
                if (displayValue.length > 1) {
                  setDisplayValue(displayValue.slice(0, -1));
                } else {
                  setDisplayValue('0');
                }
              }}
              className="py-3 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-medium text-sm transition-colors"
            >
              ⌫
            </button>
            <button
              onClick={() => selectOperation('/')}
              className={`py-3 px-4 rounded-xl font-bold text-base transition-colors ${
                operation === '/' ? 'bg-amber-400 text-slate-950' : 'bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60'
              }`}
            >
              ÷
            </button>

            {/* Row 2 */}
            <button
              onClick={() => inputDigit('7')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              7
            </button>
            <button
              onClick={() => inputDigit('8')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              8
            </button>
            <button
              onClick={() => inputDigit('9')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              9
            </button>
            <button
              onClick={() => selectOperation('*')}
              className={`py-3 px-4 rounded-xl font-bold text-base transition-colors ${
                operation === '*' ? 'bg-amber-400 text-slate-950' : 'bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60'
              }`}
            >
              ×
            </button>

            {/* Row 3 */}
            <button
              onClick={() => inputDigit('4')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              4
            </button>
            <button
              onClick={() => inputDigit('5')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              5
            </button>
            <button
              onClick={() => inputDigit('6')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              6
            </button>
            <button
              onClick={() => selectOperation('-')}
              className={`py-3 px-4 rounded-xl font-bold text-base transition-colors ${
                operation === '-' ? 'bg-amber-400 text-slate-950' : 'bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60'
              }`}
            >
              −
            </button>

            {/* Row 4 */}
            <button
              onClick={() => inputDigit('1')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              1
            </button>
            <button
              onClick={() => inputDigit('2')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              2
            </button>
            <button
              onClick={() => inputDigit('3')}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              3
            </button>
            <button
              onClick={() => selectOperation('+')}
              className={`py-3 px-4 rounded-xl font-bold text-base transition-colors ${
                operation === '+' ? 'bg-amber-400 text-slate-950' : 'bg-sky-950/80 hover:bg-sky-900/80 text-sky-300 border border-sky-800/60'
              }`}
            >
              +
            </button>

            {/* Row 5 */}
            <button
              onClick={() => inputDigit('0')}
              className="col-span-2 py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="py-3.5 px-4 rounded-xl bg-slate-800/90 hover:bg-slate-750 text-white font-semibold text-base transition-colors"
            >
              .
            </button>
            <button
              onClick={performCalculation}
              className="py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-lg shadow-md transition-all active:scale-95"
            >
              =
            </button>
          </div>
        </div>

        {/* Live Python Inspector (Right 7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 bg-slate-900/80 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-semibold text-slate-200">Tradução em Python em Tempo Real</span>
              </div>
              <span className="text-[11px] text-slate-500 font-mono">AST Live Visualizer</span>
            </div>

            {/* Code representation */}
            <div className="p-4 bg-slate-950 font-mono text-xs text-slate-300 overflow-x-auto min-h-[220px]">
              <pre className="text-emerald-400/90 leading-relaxed whitespace-pre-wrap">
                {pythonTrace.codeSnippet}
              </pre>
            </div>

            {/* Status breakdown bar */}
            <div className="p-4 bg-slate-900/50 border-t border-slate-800 space-y-3">
              <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Função Python Chamada:</span>
                  <span className="text-sky-300 font-semibold">{pythonTrace.functionCalled}</span>
                </div>
                <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">Valor Devolvido (return):</span>
                  <span className={`font-semibold ${pythonTrace.isError ? 'text-rose-400' : 'text-emerald-400'}`}>
                    {pythonTrace.returnValue}
                  </span>
                </div>
              </div>

              {/* Explanation message */}
              <div className={`p-3 rounded-xl border text-xs leading-relaxed flex items-start gap-2.5 ${
                pythonTrace.isError
                  ? 'bg-rose-950/40 border-rose-800 text-rose-200'
                  : 'bg-slate-900 border-slate-800 text-slate-300'
              }`}>
                {pythonTrace.isError ? (
                  <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
                ) : (
                  <ArrowRight className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                )}
                <span>{pythonTrace.explanation}</span>
              </div>
            </div>
          </div>

          {/* Quick learning tip */}
          <div className="p-4 bg-slate-900/40 border border-slate-800/70 rounded-xl space-y-2 text-xs text-slate-400">
            <span className="font-semibold text-slate-200">Como o Python processa:</span>
            <p className="leading-relaxed">
              No Python, operações matemáticas como <code>+</code> e <code>*</code> são executadas sob o capô por métodos especiais como <code>__add__</code> e <code>__mul__</code>. Ao criar funções como <code>somar(a, b)</code>, você está encapsulando essa lógica para tornar o código legível e reutilizável.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
