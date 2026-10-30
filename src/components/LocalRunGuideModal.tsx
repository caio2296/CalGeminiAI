import React from 'react';
import { X, Laptop, Terminal, ExternalLink, Check, Copy, AlertCircle } from 'lucide-react';

interface LocalRunGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LocalRunGuideModal: React.FC<LocalRunGuideModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = React.useState<string | null>(null);

  if (!isOpen) return null;

  const copyText = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCmd(id);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-amber-400/10 border border-amber-400/20 text-amber-400 rounded-lg">
              <Laptop className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white">Como Executar o Código no seu Computador</h2>
              <p className="text-xs text-slate-400">Passo a passo simples para quem está começando hoje</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps */}
        <div className="space-y-5 text-xs text-slate-300">
          {/* Step 1 */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">1</span>
              <h3 className="font-semibold text-slate-100">Instale o Python no seu Computador</h3>
            </div>
            <p className="text-slate-400 leading-relaxed pl-7">
              Acesse o site oficial <strong className="text-sky-400">python.org</strong> e baixe a versão mais recente.
            </p>
            <div className="pl-7 pt-1">
              <div className="p-2.5 rounded bg-amber-950/30 border border-amber-600/40 text-amber-200 text-[11px] flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Atenção no Windows:</strong> Na primeira tela do instalador, marque a caixinha{' '}
                  <code className="text-amber-300">"Add python.exe to PATH"</code> antes de clicar em Install Now. Isso é essencial para o comando funcionar no terminal!
                </span>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">2</span>
              <h3 className="font-semibold text-slate-100">Baixe o Arquivo da Calculadora</h3>
            </div>
            <p className="text-slate-400 leading-relaxed pl-7">
              Clique no botão verde <strong className="text-emerald-400">"Baixar .py"</strong> aqui no applet. O arquivo será salvo na sua pasta de Downloads com o nome <code className="text-slate-200">calculadora_basic.py</code>.
            </p>
          </div>

          {/* Step 3 */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">3</span>
              <h3 className="font-semibold text-slate-100">Abra o Terminal ou Prompt de Comando</h3>
            </div>
            <ul className="list-disc pl-11 space-y-1 text-slate-400">
              <li><strong>No Windows:</strong> Pressione a tecla Windows, digite <code className="text-slate-200">cmd</code> ou <code className="text-slate-200">PowerShell</code> e dê Enter.</li>
              <li><strong>No Mac / Linux:</strong> Abra o aplicativo <code className="text-slate-200">Terminal</code>.</li>
            </ul>
            <div className="pl-7 pt-2">
              <p className="text-slate-400 mb-1">Navegue até a pasta de Downloads digitando:</p>
              <div className="flex items-center justify-between p-2 rounded bg-slate-900 border border-slate-800 font-mono text-[11px] text-amber-300">
                <code>cd Downloads</code>
                <button
                  onClick={() => copyText('cd Downloads', 'cd')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCmd === 'cd' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="space-y-2 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex items-center gap-2">
              <span className="w-5 h-5 rounded-full bg-amber-400 text-slate-950 font-bold text-xs flex items-center justify-center">4</span>
              <h3 className="font-semibold text-slate-100">Execute o Script</h3>
            </div>
            <p className="text-slate-400 leading-relaxed pl-7">
              Digite o comando abaixo e aperte Enter:
            </p>
            <div className="pl-7 pt-1">
              <div className="flex items-center justify-between p-2.5 rounded bg-slate-900 border border-slate-800 font-mono text-xs text-emerald-400">
                <code>python calculadora_basic.py</code>
                <button
                  onClick={() => copyText('python calculadora_basic.py', 'pyrun')}
                  className="text-slate-400 hover:text-white"
                >
                  {copiedCmd === 'pyrun' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                </button>
              </div>
              <p className="text-[11px] text-slate-500 mt-1.5">
                (No Mac ou Linux, se "python" não funcionar, tente <code className="text-slate-400">python3 calculadora_basic.py</code>).
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
          <span className="text-[11px] text-slate-500">
            Dúvidas? Você também pode rodar diretamente na aba "Terminal Python" deste applet!
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold transition-colors"
          >
            Entendi, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
