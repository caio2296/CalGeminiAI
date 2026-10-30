import React, { useState, useRef, useEffect } from 'react';
import { Terminal, Play, RotateCcw, CornerDownLeft, AlertCircle, Cpu, CheckCircle2 } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'system' | 'prompt' | 'input' | 'output' | 'error' | 'success';
  text: string;
}

type ExecutionStep = 'idle' | 'waiting_num1' | 'waiting_op' | 'waiting_num2' | 'finished';

export const InteractiveTerminal: React.FC = () => {
  const [step, setStep] = useState<ExecutionStep>('idle');
  const [currentInput, setCurrentInput] = useState('');
  const [lines, setLines] = useState<TerminalLine[]>([
    { id: '1', type: 'system', text: 'Python 3.12.2 (tags/v3.12.2:6abddd9, GCC 12.2.0)' },
    { id: '2', type: 'system', text: 'Digite os valores no terminal abaixo para testar a calculadora em tempo real.' },
    { id: '3', type: 'system', text: 'Clique em "Executar Script" ou use um dos exemplos rápidos.' }
  ]);

  // Memory inspector state
  const [memory, setMemory] = useState<{
    num1: number | null;
    operacao: string | null;
    num2: number | null;
    resultado: string | number | null;
    funcaoAtiva: string | null;
  }>({
    num1: null,
    operacao: null,
    num2: null,
    resultado: null,
    funcaoAtiva: null
  });

  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines, step]);

  const startScript = () => {
    setLines([
      { id: Date.now().toString() + '-1', type: 'system', text: '$ python calculadora.py' },
      { id: Date.now().toString() + '-2', type: 'output', text: '=== CALCULADORA SIMPLES ===' },
      { id: Date.now().toString() + '-3', type: 'prompt', text: 'Digite o primeiro número: ' }
    ]);
    setMemory({
      num1: null,
      operacao: null,
      num2: null,
      resultado: null,
      funcaoAtiva: null
    });
    setStep('waiting_num1');
    setCurrentInput('');
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const val = currentInput.trim();
    if (!val && step !== 'waiting_op') return;

    if (step === 'waiting_num1') {
      const parsed = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed)) {
        setLines((prev) => [
          ...prev,
          { id: Date.now() + '-inp', type: 'input', text: val },
          { id: Date.now() + '-err', type: 'error', text: 'ValueError: poderia não ser convertido para float. Tente um número como 10 ou 4.5.' },
          { id: Date.now() + '-p', type: 'prompt', text: 'Digite o primeiro número: ' }
        ]);
        setCurrentInput('');
        return;
      }

      setMemory((prev) => ({ ...prev, num1: parsed }));
      setLines((prev) => [
        ...prev,
        { id: Date.now() + '-inp', type: 'input', text: val },
        { id: Date.now() + '-p', type: 'prompt', text: 'Digite a operação (+, -, *, /, %): ' }
      ]);
      setStep('waiting_op');
      setCurrentInput('');
    } else if (step === 'waiting_op') {
      const validOps = ['+', '-', '*', '/', '%'];
      setMemory((prev) => ({ ...prev, operacao: val }));
      
      const nextLines: TerminalLine[] = [
        ...lines,
        { id: Date.now() + '-inp', type: 'input', text: val }
      ];

      if (!validOps.includes(val)) {
        nextLines.push({
          id: Date.now() + '-warn',
          type: 'error',
          text: `Aviso: '${val}' não é uma das 5 operações padrão (+, -, *, /, %). O script prosseguirá para mostrar a validação do 'else'.`
        });
      }

      nextLines.push({ id: Date.now() + '-p', type: 'prompt', text: 'Digite o segundo número: ' });
      setLines(nextLines);
      setStep('waiting_num2');
      setCurrentInput('');
    } else if (step === 'waiting_num2') {
      const parsed2 = parseFloat(val.replace(',', '.'));
      if (isNaN(parsed2)) {
        setLines((prev) => [
          ...prev,
          { id: Date.now() + '-inp', type: 'input', text: val },
          { id: Date.now() + '-err', type: 'error', text: 'ValueError: digite um número válido.' },
          { id: Date.now() + '-p', type: 'prompt', text: 'Digite o segundo número: ' }
        ]);
        setCurrentInput('');
        return;
      }

      const n1 = memory.num1 ?? 0;
      const op = memory.operacao ?? '+';
      const n2 = parsed2;

      let res: string | number = '';
      let funcName = '';

      if (op === '+') {
        funcName = 'somar(a, b)';
        res = n1 + n2;
      } else if (op === '-') {
        funcName = 'subtrair(a, b)';
        res = n1 - n2;
      } else if (op === '*') {
        funcName = 'multiplicar(a, b)';
        res = n1 * n2;
      } else if (op === '/') {
        funcName = 'dividir(a, b)';
        if (n2 === 0) {
          res = 'Erro: Não é possível dividir por zero!';
        } else {
          res = n1 / n2;
        }
      } else if (op === '%') {
        funcName = 'porcentagem(a, b)';
        res = (n1 * n2) / 100;
      } else {
        funcName = 'else (operação inválida)';
        res = 'Operação inválida!';
      }

      setMemory({
        num1: n1,
        operacao: op,
        num2: n2,
        resultado: res,
        funcaoAtiva: funcName
      });

      const isError = typeof res === 'string' && (res.includes('Erro') || res.includes('inválida'));

      setLines((prev) => [
        ...prev,
        { id: Date.now() + '-inp', type: 'input', text: val },
        { id: Date.now() + '-sep', type: 'output', text: '---------------------------' },
        {
          id: Date.now() + '-res',
          type: isError ? 'error' : 'success',
          text: `Resultado de ${n1} ${op} ${n2} = ${res}`
        },
        { id: Date.now() + '-end', type: 'output', text: '===========================' },
        { id: Date.now() + '-info', type: 'system', text: 'Script finalizado com código de saída 0. Clique em "Executar Novamente" para outra conta.' }
      ]);

      setStep('finished');
      setCurrentInput('');
    }
  };

  const runPreset = (num1: number, op: string, num2: number) => {
    let res: string | number = '';
    let funcName = '';

    if (op === '+') {
      funcName = 'somar(a, b)';
      res = num1 + num2;
    } else if (op === '-') {
      funcName = 'subtrair(a, b)';
      res = num1 - num2;
    } else if (op === '*') {
      funcName = 'multiplicar(a, b)';
      res = num1 * num2;
    } else if (op === '/') {
      funcName = 'dividir(a, b)';
      if (num2 === 0) {
        res = 'Erro: Não é possível dividir por zero!';
      } else {
        res = num1 / num2;
      }
    } else if (op === '%') {
      funcName = 'porcentagem(a, b)';
      res = (num1 * num2) / 100;
    }

    setMemory({
      num1,
      operacao: op,
      num2,
      resultado: res,
      funcaoAtiva: funcName
    });

    const isError = typeof res === 'string' && res.includes('Erro');

    setLines([
      { id: Date.now() + '-1', type: 'system', text: '$ python calculadora.py' },
      { id: Date.now() + '-2', type: 'output', text: '=== CALCULADORA SIMPLES ===' },
      { id: Date.now() + '-3', type: 'prompt', text: `Digite o primeiro número: ${num1}` },
      { id: Date.now() + '-4', type: 'prompt', text: `Digite a operação (+, -, *, /, %): ${op}` },
      { id: Date.now() + '-5', type: 'prompt', text: `Digite o segundo número: ${num2}` },
      { id: Date.now() + '-6', type: 'output', text: '---------------------------' },
      { id: Date.now() + '-7', type: isError ? 'error' : 'success', text: `Resultado de ${num1} ${op} ${num2} = ${res}` },
      { id: Date.now() + '-8', type: 'output', text: '===========================' },
      { id: Date.now() + '-9', type: 'system', text: 'Script finalizado com código de saída 0.' }
    ]);

    setStep('finished');
  };

  return (
    <div className="space-y-6">
      {/* Top control bar with execution triggers */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-3 bg-slate-900 border border-slate-800 rounded-xl">
        <div className="flex items-center gap-2">
          <button
            onClick={startScript}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold bg-amber-400 hover:bg-amber-300 text-slate-950 rounded-lg transition-colors whitespace-nowrap shadow-sm"
          >
            {step === 'idle' ? <Play className="w-3.5 h-3.5 fill-current" /> : <RotateCcw className="w-3.5 h-3.5" />}
            <span>{step === 'idle' ? 'Executar Script Python' : 'Reiniciar Execução'}</span>
          </button>

          <span className="text-xs text-slate-400 hidden md:inline">
            Status: {step === 'idle' ? 'Aguardando início' : step === 'finished' ? 'Finalizado' : 'Aguardando entrada'}
          </span>
        </div>

        {/* Quick presets */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-slate-400 text-[11px] mr-1 hidden sm:inline">Exemplos rápidos:</span>
          <button
            onClick={() => runPreset(25, '+', 75)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] whitespace-nowrap"
          >
            25 + 75
          </button>
          <button
            onClick={() => runPreset(100, '/', 4)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] whitespace-nowrap"
          >
            100 / 4
          </button>
          <button
            onClick={() => runPreset(15, '/', 0)}
            className="px-2.5 py-1 rounded bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 border border-rose-800/80 text-[11px] whitespace-nowrap font-medium"
          >
            15 / 0 (Zero)
          </button>
          <button
            onClick={() => runPreset(3.5, '*', 4)}
            className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 text-[11px] whitespace-nowrap"
          >
            3.5 * 4
          </button>
          <button
            onClick={() => runPreset(200, '%', 15)}
            className="px-2.5 py-1 rounded bg-amber-950/60 hover:bg-amber-900/60 text-amber-300 border border-amber-800/80 text-[11px] whitespace-nowrap font-medium"
            title="Calcular 15% de 200"
          >
            200 % 15 (30)
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Terminal Window (Left 8 cols) */}
        <div className="lg:col-span-8 bg-slate-950 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col min-h-[460px]">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/90 border-b border-slate-800 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-amber-500/80"></span>
              <span className="w-3 h-3 rounded-full bg-emerald-500/80"></span>
              <span className="ml-2 font-medium text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-slate-400" />
                bash — python calculadora.py
              </span>
            </div>
            <span className="text-[11px] text-slate-500">Terminal Interativo</span>
          </div>

          {/* Terminal Output Area */}
          <div className="p-4 flex-1 font-mono text-xs overflow-y-auto space-y-1.5 max-h-[380px]">
            {lines.map((l) => (
              <div key={l.id} className="leading-relaxed">
                {l.type === 'system' && (
                  <span className="text-slate-500">{l.text}</span>
                )}
                {l.type === 'output' && (
                  <span className="text-slate-300 font-medium">{l.text}</span>
                )}
                {l.type === 'prompt' && (
                  <span className="text-sky-400 font-semibold">{l.text}</span>
                )}
                {l.type === 'input' && (
                  <span className="text-amber-300 font-bold ml-1">{l.text}</span>
                )}
                {l.type === 'success' && (
                  <span className="text-emerald-400 font-bold bg-emerald-950/40 px-1 py-0.5 rounded">
                    {l.text}
                  </span>
                )}
                {l.type === 'error' && (
                  <span className="text-rose-400 font-bold bg-rose-950/40 px-1 py-0.5 rounded flex items-center gap-1.5 my-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                    {l.text}
                  </span>
                )}
              </div>
            ))}

            {/* Active prompt input line when waiting for user */}
            {step !== 'idle' && step !== 'finished' && (
              <form onSubmit={handleInputSubmit} className="flex items-center gap-2 pt-2 text-xs">
                <span className="text-emerald-400 font-bold select-none">{'>'}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={currentInput}
                  onChange={(e) => setCurrentInput(e.target.value)}
                  placeholder={
                    step === 'waiting_num1'
                      ? 'Digite um número (ex: 12)'
                      : step === 'waiting_op'
                      ? 'Digite +, -, *, / ou %'
                      : 'Digite o segundo número (ex: 4)'
                  }
                  className="flex-1 bg-slate-900 text-amber-300 border border-slate-700 rounded px-2.5 py-1.5 outline-none focus:border-amber-400 font-mono text-xs placeholder:text-slate-600"
                  autoFocus
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-mono flex items-center gap-1 border border-slate-700"
                >
                  <span>Enter</span>
                  <CornerDownLeft className="w-3 h-3 text-slate-400" />
                </button>
              </form>
            )}

            <div ref={terminalEndRef} />
          </div>

          {/* Terminal Bottom Hint */}
          <div className="px-4 py-2 bg-slate-900/50 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between font-mono">
            <span>Variáveis em memória monitoradas em tempo real</span>
            <span className="text-slate-500">UTF-8</span>
          </div>
        </div>

        {/* Live Memory & Python Call Stack Inspector (Right 4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          <div className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-3">
            <div className="flex items-center gap-2 text-slate-200">
              <Cpu className="w-4 h-4 text-sky-400" />
              <h3 className="text-xs font-semibold">Inspetor de Variáveis (Memória)</h3>
            </div>

            <div className="space-y-2 text-xs font-mono">
              {/* num1 */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-sky-400">num1</span>
                  <span className="text-[10px] text-slate-500 ml-1.5">(float)</span>
                </div>
                <span className="text-amber-300 font-semibold tabular-nums">
                  {memory.num1 !== null ? memory.num1 : '<não definido>'}
                </span>
              </div>

              {/* operacao */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-sky-400">operacao</span>
                  <span className="text-[10px] text-slate-500 ml-1.5">(str)</span>
                </div>
                <span className="text-amber-300 font-semibold">
                  {memory.operacao ? `"${memory.operacao}"` : '<não definido>'}
                </span>
              </div>

              {/* num2 */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-sky-400">num2</span>
                  <span className="text-[10px] text-slate-500 ml-1.5">(float)</span>
                </div>
                <span className="text-amber-300 font-semibold tabular-nums">
                  {memory.num2 !== null ? memory.num2 : '<não definido>'}
                </span>
              </div>

              {/* resultado */}
              <div className="p-2.5 rounded-lg bg-slate-950 border border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-emerald-400">resultado</span>
                  <span className="text-[10px] text-slate-500 ml-1.5">
                    {typeof memory.resultado === 'number' ? '(float)' : '(str/mensagem)'}
                  </span>
                </div>
                <span className="text-emerald-300 font-semibold tabular-nums">
                  {memory.resultado !== null ? String(memory.resultado) : '<não calculado>'}
                </span>
              </div>
            </div>

            {/* Active function call stack */}
            <div className="pt-2 border-t border-slate-800">
              <span className="text-[11px] text-slate-400 block mb-1">Função Python Invocada:</span>
              <div className="p-2 bg-slate-950 rounded border border-slate-800 text-xs font-mono text-purple-300">
                {memory.funcaoAtiva ? (
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{memory.funcaoAtiva}</span>
                  </div>
                ) : (
                  <span className="text-slate-600">Nenhuma função ativa</span>
                )}
              </div>
            </div>
          </div>

          {/* Explanatory card */}
          <div className="p-4 bg-slate-900/40 border border-slate-800/60 rounded-xl space-y-2 text-xs text-slate-300">
            <h4 className="font-semibold text-slate-200">Como funciona o fluxo?</h4>
            <p className="text-slate-400 leading-relaxed text-[11px]">
              1. O Python para no <code>input()</code> e aguarda o teclado.<br />
              2. Converte a resposta com <code>float()</code>.<br />
              3. Entra na cadeia de <code>if / elif / else</code> para decidir qual função executar.<br />
              4. A função devolve o valor com <code>return</code>.<br />
              5. O <code>print()</code> projeta na tela.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
