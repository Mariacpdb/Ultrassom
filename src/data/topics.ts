export type TopicContent = {
  id: string;
  heading: string;
  paragraphs?: string[];
  points?: string[];
};

export type TopicReference = {
  citation: string;
  href: string;
};

export type TopicResource = {
  title: string;
  description: string;
  href: string;
};

export type TopicVisual = "introduction" | "parameters" | "effects" | "practice";

export type TopicSelfCheck = {
  question: string;
  answer: string;
};

export type Topic = {
  id: string;
  label: string;
  title: string;
  summary: string;
  content: TopicContent[];
  note?: string;
  references: TopicReference[];
  resources?: TopicResource[];
  visual?: TopicVisual;
  selfChecks?: TopicSelfCheck[];
};

const references = {
  itakura: {
    citation:
      "Itakura et al. (2012). Alteração da temperatura nos tecidos biológicos com a aplicação do ultrassom terapêutico: uma revisão.",
    href: "https://doi.org/10.1590/S0103-51502012000400019",
  },
  draper: {
    citation:
      "Draper, Castel & Castel (1995). Rate of Temperature Increase in Human Muscle During 1 MHz and 3 MHz Continuous Ultrasound.",
    href: "https://doi.org/10.2519/jospt.1995.22.4.142",
  },
  houghton: {
    citation:
      "Houghton et al. (2010). Electrophysical Agents—Contraindications and Precautions: An Evidence-Based Approach to Clinical Decision Making in Physical Therapy.",
    href: "https://doi.org/10.3138/ptc.62.5",
  },
  leite: {
    citation:
      "Leite et al. (2013). Efetividade e segurança do ultrassom terapêutico nas afecções musculoesqueléticas: overview de revisões sistemáticas Cochrane.",
    href: "https://doi.org/10.5935/0104-7795.20130026",
  },
  guan: {
    citation:
      "Guan et al. (2024). Ultrasound therapy for pain reduction in musculoskeletal disorders: a systematic review and meta-analysis.",
    href: "https://doi.org/10.1177/20406223241267217",
  },
  dantas: {
    citation:
      "Dantas, Osani & Bannuru (2021). Therapeutic ultrasound for knee osteoarthritis: a systematic review and meta-analysis with GRADE quality assessment.",
    href: "https://doi.org/10.1016/j.bjpt.2021.07.003",
  },
  luo: {
    citation:
      "Luo et al. (2024). Effects of therapeutic ultrasound in patients with knee osteoarthritis: a systematic review and meta-analysis.",
    href: "https://doi.org/10.1016/j.heliyon.2024.e30874",
  },
  niceFreshLowRisk: {
    citation:
      "NICE (2018). Low-intensity pulsed ultrasound for fresh fractures at low risk of non-healing (HTG479).",
    href: "https://www.nice.org.uk/guidance/htg479/chapter/1-Recommendations",
  },
  niceFreshHighRisk: {
    citation:
      "NICE (2018). Low-intensity pulsed ultrasound for fresh fractures at high risk of non-healing (HTG480).",
    href: "https://www.nice.org.uk/guidance/htg480/chapter/1-Recommendations",
  },
  niceDelayed: {
    citation:
      "NICE (2018). Low-intensity pulsed ultrasound for delayed-union and non-union fractures (HTG481).",
    href: "https://www.nice.org.uk/guidance/htg481/chapter/1-Recommendations",
  },
};

export const topics: Topic[] = [
  {
    id: "introducao",
    label: "Introdução",
    title: "Ultrassom terapêutico: conceitos fundamentais",
    summary:
      "O ultrassom terapêutico (UST) utiliza ondas acústicas de alta frequência para transferir energia mecânica aos tecidos. A resposta depende das propriedades do tecido, da frequência, da intensidade, do modo de emissão, da técnica e do equipamento.",
    content: [
      {
        id: "conceito-ust",
        heading: "O que é e como a onda é produzida",
        paragraphs: [
          "O som é uma vibração mecânica que se propaga por um meio material. No UST, um cristal piezoelétrico no transdutor converte energia elétrica em vibrações acústicas. Um agente de acoplamento, geralmente gel, ajuda a transmitir a onda entre o cabeçote e a pele.",
          "Frequências de 1 MHz e 3 MHz são comuns em equipamentos de fisioterapia. Elas estão muito acima do limite superior da audição humana, em torno de 20 kHz. Como o ultrassom é uma onda mecânica, não é radiação eletromagnética ionizante.",
        ],
      },
      {
        id: "interacao-tecidos",
        heading: "Como a energia interage com os tecidos",
        paragraphs: [
          "Durante a propagação, a onda encontra tecidos com propriedades acústicas diferentes. A energia pode ser absorvida, refletida nas interfaces ou desviada e dispersada. Esses fenômenos podem ocorrer simultaneamente.",
        ],
        points: [
          "Absorção: parte da energia acústica é transferida ao tecido e pode ser convertida em calor. A absorção varia entre tecidos e depende também da frequência.",
          "Reflexão: acontece nas interfaces entre materiais com impedâncias acústicas diferentes. Uma interface entre tecido mole e osso pode refletir parte da onda e alterar a distribuição local de energia.",
          "Dispersão: a onda muda de direção ao encontrar interfaces irregulares ou variações na estrutura dos tecidos.",
          "Acoplamento: o gel preenche o espaço entre o cabeçote e a pele. Uma camada de ar prejudica fortemente a transmissão da onda.",
        ],
      },
      {
        id: "atenuacao-profundidade",
        heading: "Atenuação e profundidade",
        paragraphs: [
          "A intensidade da onda diminui à medida que ela atravessa os tecidos; essa redução é chamada atenuação. A profundidade de meia-valor descreve a distância em que a intensidade cai para metade do valor inicial.",
          "Não existe uma profundidade fixa que se aplique a todas as pessoas ou regiões. A frequência, a composição e a espessura dos tecidos, a área tratada e as características do equipamento modificam a energia que chega a cada estrutura.",
        ],
      },
    ],
    note:
      "Efeitos térmicos e mecânicos podem ocorrer em conjunto. O modo contínuo ou pulsado, isoladamente, não determina a resposta biológica nem garante um resultado clínico.",
    references: [references.itakura],
    visual: "introduction",
    selfChecks: [
      {
        question:
          "Uma pessoa não sente aquecimento durante a aplicação. Isso confirma que a dose é segura e eficaz?",
        answer:
          "Não. A ausência de sensação de calor não comprova segurança nem eficácia. A resposta depende dos parâmetros, dos tecidos, da técnica e da sensibilidade da pessoa; a aplicação deve seguir a avaliação e o protocolo.",
      },
      {
        question:
          "Por que não basta medir a profundidade do alvo e escolher a frequência apenas com base nessa medida?",
        answer:
          "A frequência influencia a absorção, mas a energia que chega ao alvo também depende da composição e da espessura dos tecidos no trajeto, do equipamento e da técnica. As faixas de profundidade são aproximações, não garantias.",
      },
    ],
  },
  {
    id: "parametros",
    label: "Parâmetros",
    title: "Parâmetros e dosimetria",
    summary:
      "A resposta ao UST depende da combinação entre frequência, intensidade, modo de emissão, área, duração, técnica, tecido e equipamento. Nenhum parâmetro isolado descreve toda a energia recebida pelo tecido.",
    content: [
      {
        id: "frequencia-profundidade",
        heading: "Frequência e distribuição da energia",
        paragraphs: [
          "A frequência influencia a absorção da onda. Em termos gerais, 1 MHz sofre menor absorção ao atravessar os tecidos e costuma ser escolhido para alvos relativamente mais profundos; 3 MHz é absorvido mais rapidamente e costuma ser usado para alvos mais superficiais.",
        ],
        points: [
          "Essas relações são tendências, não limites anatômicos. A espessura e a composição dos tecidos entre o cabeçote e o alvo também interferem.",
          "As faixas de profundidade citadas em protocolos são aproximações e não garantem que uma estrutura específica receberá determinada dose.",
        ],
      },
      {
        id: "intensidade",
        heading: "Intensidade",
        paragraphs: [
          "Expressa em W/cm², a intensidade descreve potência acústica por área. O valor depende de como o equipamento apresenta a média espacial e temporal do feixe; consulte o manual para saber exatamente o que o indicador representa. Ele não informa, sozinho, a energia absorvida por um tecido nem permite prever a temperatura alcançada.",
          "A frequência, o tempo, o ciclo de trabalho, a área, a uniformidade do feixe, o movimento do cabeçote e as propriedades dos tecidos também influenciam a exposição.",
        ],
      },
      {
        id: "era-bnr",
        heading: "ERA e BNR: características do transdutor",
        points: [
          "ERA (Área Efetiva de Radiação) é a área efetiva do cabeçote que emite energia acústica. Consulte o valor especificado pelo fabricante para o aparelho utilizado.",
          "BNR (Razão de Não Uniformidade do Feixe) compara a intensidade máxima local à média espacial do feixe. Um feixe menos uniforme pode produzir regiões locais de maior intensidade.",
          "ERA, BNR e calibração variam entre equipamentos. Verifique a documentação técnica e não presuma que aparelhos com valores nominais semelhantes distribuem energia da mesma forma.",
        ],
      },
      {
        id: "modo-emissao",
        heading: "Modo contínuo, pulsado e ciclo de trabalho",
        points: [
          "Contínuo: a emissão ocorre sem pausas durante a aplicação; o ciclo de trabalho é 100%. Pode favorecer maior acúmulo de calor, dependendo dos demais parâmetros.",
          "Pulsado: períodos de emissão se alternam com pausas. O ciclo de trabalho (duty cycle) expressa a parcela do tempo em que há emissão: 20% significa que há emissão durante um quinto de cada ciclo.",
          "O ciclo de trabalho não é a mesma coisa que frequência do ultrassom. A frequência descreve as oscilações acústicas; o ciclo de trabalho descreve a proporção entre emissão e pausa.",
          "As pausas podem reduzir a potência média temporal, mas não tornam a aplicação automaticamente atérmica. A resposta depende da dose e das condições de exposição.",
        ],
      },
      {
        id: "tempo-area-tecnica",
        heading: "Área, duração e técnica",
        paragraphs: [
          "O tempo de aplicação depende da área, da ERA, da dose pretendida, do modo de emissão, da técnica e do protocolo adotado. Dividir a área pela ERA aparece em algumas propostas didáticas, mas não é uma fórmula universal de prescrição.",
        ],
        points: [
          "Regiões extensas podem precisar ser divididas em áreas menores conforme o protocolo e a capacidade de manter uma aplicação uniforme.",
          "O movimento e o acoplamento do cabeçote devem seguir a técnica indicada pelo fabricante e pelo protocolo clínico.",
          "Confirme as unidades e os critérios de qualquer cálculo na fonte técnica utilizada. Não use uma fórmula isolada para definir o tratamento de uma pessoa.",
        ],
      },
    ],
    note:
      "As relações entre parâmetros ajudam a compreender a física do UST; a seleção de dose e técnica exige avaliação profissional e consulta ao manual do equipamento.",
    references: [references.itakura, references.draper],
    visual: "parameters",
    selfChecks: [
      {
        question:
          "Dois aparelhos exibem 1 W/cm², mas um está em modo contínuo e o outro em modo pulsado a 20%. É possível concluir que entregam a mesma potência média? O que você verificaria?",
        answer:
          "Não. O ciclo pulsado reduz o tempo de emissão, mas é preciso conferir no manual o que o visor representa, além do ciclo de trabalho, da ERA, do BNR e da calibração. Valores nominais iguais não garantem exposições iguais.",
      },
      {
        question:
          "Um alvo é considerado profundo, mas há uma camada espessa de tecido adiposo no trajeto. Escolher 1 MHz garante que a energia adequada chegará ao alvo?",
        answer:
          "Não. 1 MHz tende a sofrer menor absorção que 3 MHz, mas isso não garante uma dose específica em uma estrutura. Espessura e composição dos tecidos, transdutor, técnica e equipamento também interferem.",
      },
      {
        question:
          "Por que a ERA e o BNR devem ser considerados ao interpretar a intensidade indicada pelo aparelho?",
        answer:
          "A ERA descreve a área efetiva emissora, e o BNR indica a não uniformidade do feixe. Um feixe menos uniforme pode ter pontos locais de intensidade maior que a média; consulte os dados do aparelho e mantenha a técnica recomendada.",
      },
    ],
  },
  {
    id: "efeitos",
    label: "Efeitos",
    title: "Efeitos térmicos e mecânicos",
    summary:
      "O campo acústico pode produzir aquecimento e fenômenos mecânicos nos tecidos. A magnitude desses efeitos depende da energia efetivamente absorvida e não pode ser inferida apenas pelo modo selecionado no aparelho.",
    content: [
      {
        id: "efeitos-termicos",
        heading: "Aquecimento e respostas térmicas",
        paragraphs: [
          "A absorção de energia pode elevar a temperatura local. Estudos associam diferentes níveis de aquecimento a respostas fisiológicas distintas, mas esses valores não são metas universais nem garantem benefício terapêutico.",
          "O aquecimento varia com a frequência, a intensidade, a duração, a área, a circulação local, as propriedades dos tecidos e as características do equipamento. Uma intensidade nominal, sozinha, não permite estimar a temperatura.",
        ],
      },
      {
        id: "taxa-aquecimento",
        heading: "Frequência e velocidade de aquecimento",
        paragraphs: [
          "Em um estudo experimental com músculo humano, Draper e colaboradores (1995) compararam o aquecimento produzido por ultrassom contínuo de 1 MHz e 3 MHz. Nas condições testadas, o aquecimento foi mais rápido com 3 MHz. Esse resultado ilustra a influência da frequência, mas não prevê a temperatura em outros tecidos, equipamentos ou protocolos.",
        ],
      },
      {
        id: "efeitos-mecanicos",
        heading: "Cavitação e fluxo acústico",
        points: [
          "Cavitação acústica descreve a formação, a oscilação ou o colapso de pequenas bolhas de gás em fluidos sob a ação do campo acústico. Os fenômenos dependem das condições de exposição e não devem ser presumidos em toda aplicação clínica.",
          "Fluxo acústico é o movimento de fluidos provocado pela onda. Esses mecanismos são investigados por possíveis efeitos em processos celulares, mas a relevância clínica depende da evidência de desfechos em pessoas.",
          "A plausibilidade de um mecanismo físico não demonstra, por si só, que o tratamento melhora uma condição clínica específica.",
        ],
      },
      {
        id: "lipus",
        heading: "Ultrassom pulsado de baixa intensidade (LIPUS)",
        paragraphs: [
          "LIPUS é uma modalidade e um tipo de dispositivo próprios, estudados principalmente para consolidação óssea. Não é sinônimo do ultrassom terapêutico convencional de 1 ou 3 MHz usado em fisioterapia; resultados de um não devem ser transferidos automaticamente ao outro.",
          "Para fraturas, a NICE distingue fraturas recentes com baixo risco, recentes com alto risco e casos de consolidação atrasada ou não união. As recomendações variam conforme o grupo e apontam incerteza ou ausência de eficácia, em vez de apoiar o uso indiscriminado.",
        ],
      },
    ],
    note:
      "Dor, queimação ou desconforto durante uma aplicação exigem atenção imediata do profissional e reavaliação da técnica e dos parâmetros.",
    references: [
      references.itakura,
      references.draper,
      references.niceFreshLowRisk,
      references.niceFreshHighRisk,
      references.niceDelayed,
    ],
    visual: "effects",
    selfChecks: [
      {
        question:
          "Um estudo experimental observou aquecimento mais rápido com 3 MHz do que com 1 MHz. Isso prova que 3 MHz sempre aquece mais e deve ser preferido?",
        answer:
          "Não. O achado vale para as condições estudadas. A resposta em outra região ou pessoa depende de tecidos, parâmetros, técnica e equipamento; um resultado experimental não define sozinho uma escolha clínica.",
      },
      {
        question:
          "Cavitação e fluxo acústico são mecanismos plausíveis. Isso basta para concluir que o ultrassom reduz a dor em uma condição específica?",
        answer:
          "Não. Mecanismos físicos ajudam a formular hipóteses, mas o benefício precisa ser avaliado em estudos clínicos com desfechos relevantes para aquela condição.",
      },
      {
        question:
          "As recomendações sobre LIPUS para fraturas podem ser transferidas diretamente para o ultrassom convencional de 1 ou 3 MHz?",
        answer:
          "Não. LIPUS é uma modalidade de baixa intensidade com dispositivos e protocolos próprios. As recomendações para fraturas não devem ser generalizadas para o ultrassom convencional.",
      },
    ],
  },
  {
    id: "seguranca",
    label: "Segurança",
    title: "Segurança e avaliação antes da aplicação",
    summary:
      "A segurança começa com a avaliação clínica, a identificação de contraindicações e a consulta ao manual do equipamento. As condições abaixo exigem decisão profissional; a lista não substitui protocolos atualizados.",
    content: [
      {
        id: "contraindicacoes",
        heading: "Regiões e condições que exigem evitar a aplicação ou avaliação especializada",
        points: [
          "Gestação: não aplicar sobre o útero, o abdômen ou a região lombar durante a gestação.",
          "Malignidade conhecida ou suspeita: evitar aplicação diretamente sobre o tumor ou a região suspeita.",
          "Dispositivos eletrônicos implantados: verificar as restrições do dispositivo e do equipamento; não aplicar na região sem avaliação profissional.",
          "Sangramento ativo, trombose venosa profunda ou tromboflebite na região: não aplicar sem avaliação clínica.",
          "Olhos, seio carotídeo e região anterior do pescoço, gônadas e áreas com miosite ossificante exigem atenção específica e devem seguir as contraindicações do protocolo utilizado.",
        ],
      },
      {
        id: "precaucoes",
        heading: "Situações que pedem precaução",
        points: [
          "Sensibilidade térmica ou dolorosa reduzida, ou dificuldade para comunicar desconforto.",
          "Comprometimento circulatório importante na região tratada.",
          "Pele frágil, lesionada ou com alterações que exijam adaptação da técnica.",
          "Crianças e adolescentes: considerar a presença de placas de crescimento e as orientações específicas para a faixa etária.",
          "Inflamação ou lesão muscular aguda: avaliar cuidadosamente o objetivo e a possibilidade de aquecimento antes de escolher os parâmetros.",
        ],
      },
      {
        id: "checklist",
        heading: "O que conferir antes, durante e depois",
        paragraphs: [
          "Antes: confirmar indicação e estrutura-alvo, investigar contraindicações, inspecionar a pele e avaliar sensibilidade. Conferir o transdutor, a calibração, os parâmetros e as instruções do fabricante.",
          "Durante: manter o acoplamento e a técnica indicados, observar a resposta e perguntar sobre dor, queimação ou desconforto. Interromper e reavaliar diante de uma reação inesperada.",
          "Depois: encerrar a emissão conforme o manual, inspecionar a pele, higienizar o transdutor e registrar os parâmetros e a resposta observada.",
        ],
      },
    ],
    note:
      "A ausência de eventos adversos relatados em estudos não significa risco zero. Confirme contraindicações e precauções no manual, nas normas institucionais e em fontes clínicas atualizadas.",
    references: [references.houghton, references.leite],
    selfChecks: [
      {
        question:
          "Uma pessoa tem sensibilidade térmica reduzida e dificuldade para comunicar desconforto. É adequado aumentar a intensidade para compensar uma resposta que não consegue relatar?",
        answer:
          "Não. A dificuldade de perceber ou comunicar desconforto exige cautela, não aumento automático da intensidade. Reavalie riscos, indicação e alternativas, e siga o protocolo e o manual do equipamento.",
      },
      {
        question:
          "Durante a aplicação, a pessoa relata queimação e a pele fica muito desconfortável. Qual deve ser a conduta imediata?",
        answer:
          "Interrompa a emissão, avalie a pele e a resposta da pessoa, confira acoplamento, movimento e parâmetros, e reavalie a indicação antes de decidir qualquer nova aplicação.",
      },
      {
        question:
          "A pessoa tem um dispositivo eletrônico implantado próximo à região pretendida. O que deve ser confirmado antes de considerar o ultrassom?",
        answer:
          "Verifique as restrições do dispositivo implantado, as instruções dos fabricantes e o protocolo clínico. Não aplique na região sem avaliação profissional específica.",
      },
    ],
  },
  {
    id: "evidencias",
    label: "Evidências",
    title: "O que a pesquisa clínica mostra?",
    summary:
      "A evidência deve ser analisada por condição, modalidade, comparador e desfecho. Revisões diferentes podem chegar a resultados distintos quando incluem estudos e protocolos diferentes.",
    content: [
      {
        id: "revisoes-clinicas",
        heading: "Revisões sistemáticas e condições musculoesqueléticas",
        paragraphs: [
          "Uma revisão sistemática busca e avalia estudos sobre uma pergunta específica. Quando os dados permitem, uma meta-análise combina quantitativamente os resultados; essa média não apaga as diferenças entre os estudos.",
          "Em 2013, Leite e colaboradores publicaram uma revisão de seis revisões sistemáticas Cochrane sobre ultrassom terapêutico em condições musculoesqueléticas. O trabalho reuniu 37 ensaios e 1.636 participantes. Como é uma síntese antiga, seus resultados devem ser lidos junto de pesquisas mais recentes, não como a resposta definitiva sobre a efetividade atual.",
        ],
        points: [
          "Osteoartrite de joelho: a síntese encontrou sinal de redução da dor em comparação ao placebo.",
          "Síndrome do túnel do carpo: os ensaios analisados não demonstraram diferença significativa entre ultrassom ativo e placebo para sintomas ou função no curto prazo.",
          "Entorse agudo de tornozelo: a revisão não encontrou superioridade sobre placebo para melhora geral ou capacidade de marcha após sete dias.",
          "Fraturas agudas em adultos: nos estudos de LIPUS incluídos, não foi observada diferença significativa no tempo de consolidação radiográfica ou no retorno às atividades.",
          "Para outras condições incluídas nas revisões, a evidência foi insuficiente ou inconclusiva para sustentar conclusões firmes.",
        ],
      },
      {
        id: "osteoartrite-joelho-atual",
        heading: "Osteoartrite de joelho: resultados promissores, mas incertos",
        paragraphs: [
          "Em 2021, Dantas, Osani e Bannuru publicaram uma revisão sistemática com meta-análise sobre ultrassom terapêutico para osteoartrite do joelho. Eles reuniram quatro ensaios que compararam o tratamento com placebo, totalizando 234 participantes.",
          "Em média, os estudos apontaram pequenas melhoras de dor e função no curto prazo. O método GRADE, usado para avaliar a confiança na evidência, classificou a certeza desses resultados como muito baixa. Por isso, eles não sustentam recomendações clínicas firmes.",
          "Em 2024, uma equipe liderada por Luo publicou outra revisão sistemática com meta-análise sobre ultrassom para osteoartrite do joelho. A busca por estudos terminou em abril de 2023 e incluiu 21 ensaios, com 1.315 participantes.",
          "Os resultados combinados favoreceram o ultrassom para dor e função, mas a heterogeneidade estatística (I²) foi alta: 71% para dor e 67% para função. Isso indica que os resultados variaram bastante entre os estudos e limita a confiança no valor médio; ele não define uma dose universal nem prevê o benefício para cada pessoa.",
        ],
      },
      {
        id: "meta-analise-recente",
        heading: "Outras condições do joelho e do ombro",
        paragraphs: [
          "Em uma revisão sistemática com meta-análise publicada em 2024, Guan e colaboradores reuniram dez estudos sobre condições musculoesqueléticas do joelho e do ombro.",
          "A análise encontrou diferença estatística favorável ao ultrassom para o grupo do joelho, mas não para o grupo do ombro. Como os estudos sobre ombro variaram muito entre si (I² = 93%), essa comparação deve ser interpretada com cautela.",
        ],
      },
      {
        id: "lipus-fraturas-evidencia",
        heading: "LIPUS e fraturas: recomendações específicas",
        paragraphs: [
          "A NICE (Reino Unido, 2018) recomenda não usar LIPUS para fraturas recentes com baixo risco de não consolidação, pois a evidência não demonstra eficácia. Para fraturas recentes com alto risco, recomenda uso somente em pesquisa. Para atraso de consolidação ou não união, considera a qualidade da evidência de eficácia inadequada e exige governança, consentimento e auditoria. Essas orientações se referem a LIPUS para fraturas, não ao ultrassom convencional usado em outros contextos.",
        ],
      },
      {
        id: "limites-evidencia",
        heading: "Como interpretar esses resultados",
        points: [
          "Uma diferença estatística não significa necessariamente um benefício importante para cada pessoa.",
          "Resultados de laboratório ou de estudos com animais não podem ser transferidos automaticamente para o tratamento de pessoas.",
          "Diferenças de dose, parâmetros, aparelhos e qualidade metodológica dificultam comparar estudos e definir um protocolo universal.",
          "A ausência de eventos adversos relatados em uma revisão não comprova que o risco seja inexistente.",
        ],
      },
    ],
    note:
      "Uma diferença estatística não demonstra, sozinha, que o efeito seja importante para a pessoa ou que a intervenção deva ser priorizada. Considere certeza, tamanho do efeito, riscos, alternativas e preferências.",
    references: [
      references.leite,
      references.dantas,
      references.luo,
      references.guan,
      references.niceFreshLowRisk,
      references.niceFreshHighRisk,
      references.niceDelayed,
    ],
    selfChecks: [
      {
        question:
          "Uma meta-análise encontra um resultado médio favorável, mas os estudos diferem bastante entre si. Por que isso não basta para recomendar o tratamento a todas as pessoas?",
        answer:
          "A média pode esconder diferenças de população, protocolo, comparador e qualidade metodológica. É necessário considerar a certeza da evidência, a relevância clínica do efeito, riscos, alternativas e preferências.",
      },
      {
        question:
          "Na revisão sobre osteoartrite, I² foi 71% para dor. O que esse número sugere — e o que ele não informa?",
        answer:
          "Sugere heterogeneidade substancial entre os resultados dos estudos. Não é o tamanho do benefício nem a probabilidade de uma pessoa responder; a heterogeneidade reduz a confiança em interpretar a estimativa combinada como um efeito único.",
      },
      {
        question:
          "Uma pessoa com osteoartrite pergunta se o ultrassom vai resolver a dor. Como explicar a evidência sem prometer um resultado?",
        answer:
          "Explique que algumas revisões encontraram pequenas melhoras médias, mas a certeza e a consistência são limitadas. Converse sobre objetivos, alternativas, preferências e o plano de reabilitação, sem garantir benefício individual.",
      },
    ],
  },
  {
    id: "consideracoes",
    label: "Na prática",
    title: "Aplicação responsável na prática",
    summary:
      "O ultrassom terapêutico pode ser considerado como parte de um plano de reabilitação. Sua escolha depende da avaliação da pessoa, dos objetivos clínicos, das contraindicações e da evidência disponível para a condição.",
    content: [
      {
        id: "uso-responsavel",
        heading: "Individualize e acompanhe a resposta",
        points: [
          "Considere a profundidade estimada do alvo e os tecidos entre o transdutor e a região.",
          "Defina frequência, intensidade, modo, ciclo de trabalho, área e duração em conjunto, com base na avaliação, no equipamento e em um protocolo adequado.",
          "Considere o UST como possível recurso complementar, não como substituto automático de exercício terapêutico ou de outras intervenções indicadas.",
          "Acompanhe a resposta durante e após a aplicação; reavalie diante de dor crescente, queimação ou reação inesperada.",
        ],
      },
      {
        id: "limites-material",
        heading: "Escopo deste conteúdo",
        paragraphs: [
          "Este conteúdo apresenta conceitos de física, parâmetros, segurança e resultados de pesquisas para fins educativos. Valores observados em estudos descrevem condições específicas e não constituem uma prescrição universal.",
          "A decisão terapêutica cabe a um fisioterapeuta habilitado, considerando a pessoa, o equipamento, as contraindicações e as evidências clínicas atuais.",
        ],
      },
    ],
    references: [
      references.itakura,
      references.houghton,
      references.leite,
      references.dantas,
      references.luo,
      references.guan,
      references.niceFreshLowRisk,
      references.niceFreshHighRisk,
      references.niceDelayed,
    ],
    resources: [
      {
        title:
          "Módulo interativo: Beyond the Waves (University of Nebraska Medical Center)",
        description:
          "Em inglês. Inclui terminologia, parâmetros, precauções, um caso e vídeo demonstrativo de aplicação. Criado por uma equipe de Allied Health e atualizado em 2026; use como apoio visual, não como diretriz clínica.",
        href: "https://www.unmc.edu/elearning/egallery/a-guide-to-therapeutic-ultrasound/",
      },
    ],
    visual: "practice",
    selfChecks: [
      {
        question:
          "A pessoa não percebe melhora após algumas sessões. O que deve ser revisto antes de simplesmente repetir o mesmo protocolo?",
        answer:
          "Reavalie os objetivos e desfechos, a resposta da pessoa, a indicação, os parâmetros e a técnica. Considere alternativas e ajuste o plano com base na avaliação, em vez de manter o recurso sem benefício observado.",
      },
      {
        question:
          "Por que o ultrassom não deve substituir automaticamente o exercício terapêutico em um plano de reabilitação?",
        answer:
          "A escolha depende da condição, dos objetivos, das evidências e das preferências da pessoa. O ultrassom pode ser considerado como recurso complementar, mas não substitui automaticamente intervenções ativas indicadas.",
      },
      {
        question:
          "Quais informações ajudam a tornar a aplicação rastreável e a orientar a reavaliação?",
        answer:
          "Registre a indicação e o alvo, aparelho e transdutor, frequência, intensidade, modo e ciclo de trabalho, área e duração, técnica utilizada e resposta observada durante e após a aplicação.",
      },
    ],
  },
];
