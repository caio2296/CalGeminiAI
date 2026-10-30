export interface CodeExplanation {
  lineRange: [number, number];
  title: string;
  concept: string;
  explanation: string;
  tag: string;
}

export interface PythonCodeLevel {
  id: 'basic' | 'menu' | 'advanced';
  title: string;
  subtitle: string;
  description: string;
  code: string;
  explanations: CodeExplanation[];
}

export const PYTHON_CODE_LEVELS: PythonCodeLevel[] = [
  {
    id: 'basic',
    title: 'Nível 1: Essencial & Direto',
    subtitle: 'Funções simples, input() e condicionais if/elif/else',
    description: 'A versão ideal para quem está escrevendo suas primeiras linhas de código em Python. Mostra claramente cada uma das 5 operações em funções separadas.',
    code: `# ==========================================
# CALCULADORA BÁSICA EM PYTHON (NÍVEL 1)
# ==========================================

# 1. DEFINIÇÃO DAS FUNÇÕES MATEMÁTICAS
def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    # Proteção: nunca podemos dividir por zero!
    if b == 0:
        return "Erro: Não é possível dividir por zero!"
    return a / b

def porcentagem(a, b):
    # Calcula b% de a: exemplo: 15% de 200 = (200 * 15) / 100 = 30
    return (a * b) / 100

# 2. ENTRADA DE DADOS DO USUÁRIO
print("=== CALCULADORA SIMPLES ===")
num1 = float(input("Digite o primeiro número: "))
operacao = input("Digite a operação (+, -, *, /, %): ")
num2 = float(input("Digite o segundo número: "))

# 3. VERIFICAÇÃO DA OPERAÇÃO E CÁLCULO
if operacao == '+':
    resultado = somar(num1, num2)
elif operacao == '-':
    resultado = subtrair(num1, num2)
elif operacao == '*':
    resultado = multiplicar(num1, num2)
elif operacao == '/':
    resultado = dividir(num1, num2)
elif operacao == '%':
    resultado = porcentagem(num1, num2)
else:
    resultado = "Operação inválida!"

# 4. EXIBIÇÃO DO RESULTADO FINAL
print("---------------------------")
print(f"Resultado de {num1} {operacao} {num2} = {resultado}")
print("===========================")`,
    explanations: [
      {
        lineRange: [6, 23],
        title: 'Funções com def e return',
        concept: 'Modularização e Reutilização de Código',
        tag: 'def & return',
        explanation: 'A palavra-chave "def" cria uma função. Cada função recebe dois parâmetros (a e b) e usa "return" para devolver o valor calculado a quem a chamou. Separar cada operação em sua própria função deixa o código limpo, fácil de testar e bem organizado.'
      },
      {
        lineRange: [16, 19],
        title: 'Proteção contra Divisão por Zero',
        concept: 'Validação Matemática',
        tag: 'if b == 0',
        explanation: 'Na matemática e na computação, dividir qualquer número por 0 é indefinido e geraria um erro fatal (ZeroDivisionError) que travaria o programa. Por isso, checamos antes com "if b == 0:" e retornamos uma mensagem amigável.'
      },
      {
        lineRange: [21, 23],
        title: 'Cálculo de Porcentagem',
        concept: 'Lógica Matemática em Funções',
        tag: 'porcentagem(a, b)',
        explanation: 'A função porcentagem(a, b) calcula "b porcento de a" através da fórmula (a * b) / 100. Por exemplo, porcentagem(200, 15) calcula 15% de 200, retornando 30.0.'
      },
      {
        lineRange: [26, 29],
        title: 'Entrada de Dados com input() e float()',
        concept: 'Conversão de Tipos (Type Casting)',
        tag: 'input() & float()',
        explanation: 'A função input() sempre lê dados do teclado como texto (string). Se somássemos "5" + "3", o resultado seria "53" (concatenação de texto!). A função float() converte o texto para número decimal com vírgula (ponto flutuante), permitindo operações com inteiros (4) e decimais (4.5).'
      },
      {
        lineRange: [32, 43],
        title: 'Estrutura Condicional (if / elif / else)',
        concept: 'Tomada de Decisão',
        tag: 'if / elif / else',
        explanation: 'O programa precisa saber qual função chamar com base no símbolo digitado pelo usuário. O "if" testa a primeira opção (+), os "elif" (else if) testam as alternativas subsequentes (-, *, /, %), e o "else" captura qualquer entrada não reconhecida.'
      },
      {
        lineRange: [46, 48],
        title: 'Saída com f-string',
        concept: 'Formatação Moderna de Texto',
        tag: 'f"..."',
        explanation: 'A letra "f" antes das aspas indica uma f-string (format string), introduzida no Python 3.6. Ela permite colocar variáveis diretamente dentro de chaves {num1}, {operacao} e {resultado}, tornando a leitura do código muito mais natural do que usar vírgulas ou o operador +.'
      }
    ]
  },
  {
    id: 'menu',
    title: 'Nível 2: Menu com Loop Contínuo',
    subtitle: 'Com while True, opções numéricas e comando break para sair',
    description: 'Adiciona um menu interativo que permite realizar múltiplos cálculos consecutivos sem precisar reiniciar o script no terminal.',
    code: `# ==========================================
# CALCULADORA EM PYTHON COM MENU (NÍVEL 2)
# ==========================================

def somar(a, b):
    return a + b

def subtrair(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Erro: Impossível dividir por zero!"
    return a / b

def porcentagem(a, b):
    return (a * b) / 100

# LOOP PRINCIPAL: O programa roda até o usuário escolher sair
while True:
    print("\\n" + "=" * 30)
    print("      CALCULADORA PYTHON")
    print("=" * 30)
    print("1. Adição (+)")
    print("2. Subtração (-)")
    print("3. Multiplicação (*)")
    print("4. Divisão (/)")
    print("5. Porcentagem (%)")
    print("6. Sair do Programa")
    print("=" * 30)
    
    opcao = input("Escolha uma opção (1 a 6): ")
    
    if opcao == '6':
        print("\\nObrigado por usar a calculadora! Até logo.")
        break  # Interrompe o loop while imediatamente
        
    if opcao in ['1', '2', '3', '4', '5']:
        num1 = float(input("Digite o 1º número: "))
        num2 = float(input("Digite o 2º número: "))
        
        if opcao == '1':
            print(f"\\n>>> {num1} + {num2} = {somar(num1, num2)}")
        elif opcao == '2':
            print(f"\\n>>> {num1} - {num2} = {subtrair(num1, num2)}")
        elif opcao == '3':
            print(f"\\n>>> {num1} * {num2} = {multiplicar(num1, num2)}")
        elif opcao == '4':
            print(f"\\n>>> {num1} / {num2} = {dividir(num1, num2)}")
        elif opcao == '5':
            print(f"\\n>>> {num2}% de {num1} = {porcentagem(num1, num2)}")
    else:
        print("\\n[!] Opção inválida! Digite um número de 1 a 6.")`,
    explanations: [
      {
        lineRange: [23, 23],
        title: 'Loop infinito com while True',
        concept: 'Estrutura de Repetição',
        tag: 'while True',
        explanation: '"while True" cria um loop que se repete infinitamente até encontrar uma instrução "break". Isso é comum em menus de console, jogos e ferramentas interativas, pois mantém a aplicação ativa até que o usuário decida encerrar.'
      },
      {
        lineRange: [37, 39],
        title: 'Comando break para sair',
        concept: 'Controle de Fluxo',
        tag: 'break',
        explanation: 'Quando o usuário digita "6", a instrução "break" é executada. Ela sai do bloco "while" imediatamente e encerra a execução do script com segurança.'
      },
      {
        lineRange: [41, 41],
        title: 'Validação com o operador in',
        concept: 'Operador de Pertencimento (in)',
        tag: 'opcao in [...]',
        explanation: 'Em vez de escrever "if opcao == 1 or opcao == 2 or ...", usamos a lista "if opcao in [\'1\', \'2\', \'3\', \'4\', \'5\']:". É um jeito pythônico, elegante e muito mais legível de validar se um valor está dentro de um grupo permitido.'
      }
    ]
  },
  {
    id: 'advanced',
    title: 'Nível 3: Tratamento de Erros Profissional',
    subtitle: 'Com try/except para capturar letras ou divisões inválidas',
    description: 'Ensina como programadores experientes protegem o código contra entradas inesperadas (como digitar "dez" em vez do número 10) usando blocos try e except.',
    code: `# ==========================================
# CALCULADORA COM TRATAMENTO DE ERROS (NÍVEL 3)
# ==========================================

def calcular(num1, operacao, num2):
    """Executa a operação matemática com proteção de erros."""
    if operacao == '+':
        return num1 + num2
    elif operacao == '-':
        return num1 - num2
    elif operacao == '*':
        return num1 * num2
    elif operacao == '/':
        if num2 == 0:
            raise ZeroDivisionError("Não é permitido dividir por zero.")
        return num1 / num2
    elif operacao == '%':
        return (num1 * num2) / 100
    else:
        raise ValueError(f"Operação '{operacao}' não reconhecida.")

def ler_numero(mensagem):
    """Lê um número garantindo que o usuário não digite letras."""
    while True:
        try:
            return float(input(mensagem))
        except ValueError:
            print("[Erro] Entrada inválida! Digite apenas números.")

# PROGRAMA PRINCIPAL
print("=== CALCULADORA ROBUSTA EM PYTHON ===")
try:
    n1 = ler_numero("Digite o primeiro número: ")
    op = input("Operação desejada (+, -, *, /, %): ").strip()
    n2 = ler_numero("Digite o segundo número: ")
    
    resultado = calcular(n1, op, n2)
    print(f"\\nSucesso: {n1} {op} {n2} = {resultado:.4g}")

except ZeroDivisionError as erro:
    print(f"\\n[Falha Matemática] {erro}")
except ValueError as erro:
    print(f"\\n[Falha de Entrada] {erro}")
except Exception as erro:
    print(f"\\n[Erro Inesperado] {erro}")
finally:
    print("\\nFim da operação.")`,
    explanations: [
      {
        lineRange: [14, 20],
        title: 'Lançando Exceções com raise',
        concept: 'Disparo de Erros Semânticos',
        tag: 'raise',
        explanation: 'O comando "raise" gera intencionalmente uma exceção específica quando uma regra de negócio ou matemática é violada (ex: ZeroDivisionError ou ValueError), permitindo que a camada de exibição trate o problema.'
      },
      {
        lineRange: [24, 28],
        title: 'Capturando Erros de Conversão com try/except',
        concept: 'Tratamento de Exceções',
        tag: 'try...except',
        explanation: 'Se o usuário digitar a palavra "olá" quando o programa espera um float, o Python normalmente dispararia um "ValueError" e abortaria o programa. Com o bloco "try ... except ValueError:", interceptamos o erro e pedimos educadamente que ele digite novamente.'
      },
      {
        lineRange: [40, 47],
        title: 'Captura Específica e Bloco finally',
        concept: 'Resiliência e Limpeza',
        tag: 'except & finally',
        explanation: 'Ter blocos "except" específicos para cada tipo de erro permite mensagens personalizadas. O bloco opcional "finally" sempre é executado, independentemente de ter ocorrido erro ou sucesso.'
      }
    ]
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  codeSnippet?: string;
  options: {
    letter: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que acontece se executarmos o código abaixo e digitarmos 5 e 3?",
    codeSnippet: `a = input("Número 1: ")
b = input("Número 2: ")
print(a + b)`,
    options: [
      { letter: "A", text: "Imprime 8 (faz a soma numérica normal)", isCorrect: false },
      { letter: "B", text: "Imprime 53 (concatena como texto, pois input() retorna string)", isCorrect: true },
      { letter: "C", text: "Dá erro de sintaxe no Python", isCorrect: false },
      { letter: "D", text: "Imprime 5+3", isCorrect: false }
    ],
    explanation: "Por padrão, input() sempre lê os dados digitados como texto (string ou 'str'). Quando usamos o operador '+' entre duas strings em Python, ele junta os textos (concatenação). Para somar como números, precisamos converter usando float(input()) ou int(input())."
  },
  {
    id: 2,
    question: "Qual é a principal função do comando 'return' dentro de uma função em Python?",
    options: [
      { letter: "A", text: "Imprimir o resultado colorido na tela do terminal", isCorrect: false },
      { letter: "B", text: "Devolver o valor calculado para quem chamou a função e encerrar sua execução", isCorrect: true },
      { letter: "C", text: "Reiniciar o programa desde o início", isCorrect: false },
      { letter: "D", text: "Apagar todas as variáveis da memória", isCorrect: false }
    ],
    explanation: "O 'return' encerra a execução da função e devolve o valor calculado para a linha de código que chamou a função. Isso permite guardar o resultado em uma variável (ex: 'resultado = somar(4, 5)') e reutilizá-lo."
  },
  {
    id: 3,
    question: "Por que devemos testar 'if b == 0:' antes de realizar uma divisão no Python?",
    options: [
      { letter: "A", text: "Porque dividir por zero sempre resulta em zero no computador", isCorrect: false },
      { letter: "B", text: "Porque o Python não aceita números menores que 1", isCorrect: false },
      { letter: "C", text: "Porque divisão por zero é matematicamente indefinida e trava o programa com ZeroDivisionError", isCorrect: true },
      { letter: "D", text: "É apenas uma convenção opcional que não afeta a execução", isCorrect: false }
    ],
    explanation: "Tentar calcular 'x / 0' faz o interpretador Python disparar uma exceção chamada ZeroDivisionError. Se não tratarmos essa condição antes, o programa trava abruptamente com uma mensagem de erro vermelha."
  },
  {
    id: 4,
    question: "Em Python, qual é o papel dos 4 espaços de indentação no início das linhas?",
    options: [
      { letter: "A", text: "São opcionais e servem apenas para deixar o código bonito", isCorrect: false },
      { letter: "B", text: "Definem quais linhas pertencem ao bloco da função, if ou loop", isCorrect: true },
      { letter: "C", text: "Indica que a linha é um comentário", isCorrect: false },
      { letter: "D", text: "Aumenta a velocidade do processador ao rodar o script", isCorrect: false }
    ],
    explanation: "Ao contrário de outras linguagens como C ou JavaScript que usam chaves { }, o Python usa a indentação (espaçamento) para determinar a estrutura dos blocos de código. Uma linha com 4 espaços após 'def somar():' pertence àquela função."
  },
  {
    id: 5,
    question: "Qual é o operador em Python para divisão que retorna apenas o quociente inteiro (sem casas decimais)?",
    options: [
      { letter: "A", text: "Operador // (dupla barra)", isCorrect: true },
      { letter: "B", text: "Operador % (porcentagem)", isCorrect: false },
      { letter: "C", text: "Operador / (barra simples)", isCorrect: false },
      { letter: "D", text: "Operador div", isCorrect: false }
    ],
    explanation: "A barra simples (/) faz a divisão decimal padrão (ex: 7 / 2 = 3.5). A dupla barra (//) faz a divisão inteira (7 // 2 = 3). E a porcentagem (%) retorna o resto da divisão (7 % 2 = 1)."
  }
];

export interface ConceptCard {
  title: string;
  pythonSyntax: string;
  summary: string;
  detailedNotes: string[];
  exampleCode: string;
}

export const CORE_CONCEPTS: ConceptCard[] = [
  {
    title: "1. Funções (def & return)",
    pythonSyntax: "def nome_funcao(param1, param2):",
    summary: "Blocos de código reutilizáveis que realizam uma tarefa específica.",
    detailedNotes: [
      "Uma função evita duplicação de código. Em vez de reescrever a lógica de soma ou divisão em vários lugares, você chama a função.",
      "Os parâmetros entre parênteses funcionam como variáveis temporárias que recebem os valores enviados.",
      "O comando 'return' devolve o resultado final para o programa principal."
    ],
    exampleCode: `def somar(a, b):
    resultado = a + b
    return resultado

# Usando a função:
total = somar(10, 5) # total agora guarda 15`
  },
  {
    title: "2. Entrada de Dados & Conversão de Tipos",
    pythonSyntax: "numero = float(input('Texto'))",
    summary: "Como ler o que o usuário digita e converter texto para número.",
    detailedNotes: [
      "input() suspende a execução e espera o usuário digitar algo e teclar Enter.",
      "Tudo lido pelo input() é SEMPRE do tipo string (texto).",
      "float() converte texto em número decimal com ponto flutuante (ex: '3.14' vira 3.14).",
      "int() converte para número inteiro (ex: '10' vira 10)."
    ],
    exampleCode: `valor_texto = input("Digite o preço: ") # ex: "45.90"
preco = float(valor_texto)           # número 45.90
dobro = preco * 2                    # 91.8`
  },
  {
    title: "3. Estruturas Condicionais (if / elif / else)",
    pythonSyntax: "if condicao: ... elif outra: ... else: ...",
    summary: "O cérebro do programa que decide quais instruções executar.",
    detailedNotes: [
      "O 'if' avalia uma expressão booleana (Verdadeiro ou Falso).",
      "'elif' é a abreviação de 'else if', permitindo testar várias alternativas em cadeia.",
      "'else' é o plano B: executa se nenhuma das condições anteriores for atendida.",
      "O operador de comparação de igualdade no Python é '==' (dois iguais). Um único '=' é atribuição de variável!"
    ],
    exampleCode: `if operacao == '+':
    print("Você escolheu soma")
elif operacao == '-':
    print("Você escolheu subtração")
else:
    print("Operação não reconhecida")`
  },
  {
    title: "4. Tratamento do Erro de Divisão por Zero",
    pythonSyntax: "if divisor == 0: ... ou try/except ZeroDivisionError",
    summary: "Prevenção do erro mais comum em calculadoras de computador.",
    detailedNotes: [
      "Computadores não conseguem calcular a divisão por zero porque o limite matemático tende ao infinito ou é indefinido.",
      "Se você tentar rodar 10 / 0 em Python, o terminal emitirá ZeroDivisionError: division by zero.",
      "Checar preventivamente com 'if b == 0' é a melhor prática para iniciantes.",
      "Mais adiante, o bloco 'try ... except ZeroDivisionError' é usado para interceptar exceções."
    ],
    exampleCode: `def dividir(a, b):
    if b == 0:
        return "Erro: não existe divisão por 0!"
    return a / b`
  },
  {
    title: "5. Formatação Moderna com f-strings",
    pythonSyntax: 'f"Texto {variavel} texto"',
    summary: "O jeito mais legível e profissional de misturar texto com variáveis.",
    detailedNotes: [
      "Basta colocar a letra 'f' minúscula logo antes de abrir as aspas da string.",
      "Dentro das chaves { }, você pode colocar qualquer variável, cálculo ou até chamada de função.",
      "Permite especificar casas decimais com {valor:.2f} (2 casas após o ponto)."
    ],
    exampleCode: `nome = "Maria"
nota = 9.876
print(f"Aluna {nome} tirou nota {nota:.2f}")
# Saída: Aluna Maria tirou nota 9.88`
  },
  {
    title: "6. Loops e Menus Contínuos (while True)",
    pythonSyntax: "while True: ... if sair: break",
    summary: "Mantém a calculadora aberta para várias contas consecutivas.",
    detailedNotes: [
      "Sem um loop, o programa faz uma única conta e fecha imediatamente a janela do terminal.",
      "O loop 'while True' roda sem parar até que o código encontre a palavra 'break'.",
      "É a base para interfaces de linha de comando (CLI) interativas."
    ],
    exampleCode: `while True:
    opcao = input("Deseja continuar? (s/n): ")
    if opcao.lower() == 'n':
        print("Saindo...")
        break # Sai do loop agora!`
  }
];
