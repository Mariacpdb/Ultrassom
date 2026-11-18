export type TopicContent = {
  id: string;
  heading: string;
  paragraphs?: string[];
  points?: string[];
};

export type Topic = {
  id: string;
  label: string;
  title: string;
  summary: string;
  content: TopicContent[];
  note?: string;
  source: string;
};

export const topics: Topic[] = [
  {
    id: "introducao",
    label: "Introdução",
    title: "Introdução: o que é o ultrassom terapêutico?",
    summary:
      "O ultrassom terapêutico (UST) é um recurso não invasivo usado em fisioterapia. Ele transmite energia mecânica por ondas acústicas de alta frequência, inaudíveis para as pessoas, para interagir com os tecidos.",
    content: [
      {
        id: "conceito-ust",
        heading: "O que é e como a onda é produzida",
        paragraphs: [
          "O som é uma vibração mecânica que precisa de um meio para se propagar. No UST, o transdutor converte energia elétrica em vibrações acústicas e as transmite ao corpo por meio de um agente de acoplamento, normalmente gel.",
          "As frequências terapêuticas usadas com mais frequência são 1 MHz e 3 MHz — muito acima do limite superior da audição humana, de aproximadamente 20 kHz. Por ser energia mecânica, o ultrassom não é radiação eletromagnética ionizante.",
        ],
      },
      {
        id: "interacao-tecidos",
        heading: "Como a energia interage com os tecidos",
        paragraphs: [
          "Ao atravessar o corpo, a onda encontra tecidos com propriedades diferentes. Parte da energia é absorvida, parte pode ser refletida nas interfaces entre tecidos e parte é desviada ou dispersada.",
        ],
        points: [
          "Absorção: a energia acústica é convertida em outras formas de energia, inclusive calor. Tecidos ricos em colágeno, como tendões, ligamentos e cápsulas articulares, tendem a absorver mais energia do que o tecido adiposo.",
          "Reflexão: ocorre nas interfaces entre materiais com impedâncias acústicas diferentes. A interface entre tecido mole e osso pode refletir energia e favorecer aquecimento localizado.",
          "Dispersão: desvio da onda ao encontrar interfaces irregulares ou variações na estrutura e densidade dos tecidos.",
        ],
      },
      {
        id: "atenuacao-profundidade",
        heading: "Atenuação e profundidade de meia-valor",
        paragraphs: [
          "À medida que a onda se propaga, sua intensidade diminui: esse processo é chamado atenuação. A profundidade de meia-valor é a distância em que a intensidade cai para metade do valor medido na superfície do transdutor.",
          "A profundidade alcançada não é uma linha rígida nem igual para todos. Ela varia com a frequência, a composição e a espessura dos tecidos, a região tratada e as características do equipamento.",
        ],
      },
    ],
    note:
      "O ultrassom pode produzir efeitos térmicos e mecânicos ao mesmo tempo. O modo escolhido, isoladamente, não permite prever a resposta clínica.",
    source:
      "Guia explicativo fornecido; fundamentos de física acústica citados no documento.",
  },
  {
    id: "parametros",
    label: "Parâmetros",
    title: "Parâmetros operacionais e dosimetria",
    summary:
      "A resposta ao UST resulta da combinação entre frequência, intensidade, modo de emissão, área, tempo, técnica e características do paciente e do equipamento. A dosimetria deve ser definida por profissional habilitado.",
    content: [
      {
        id: "frequencia-profundidade",
        heading: "Frequência e profundidade de atuação",
        paragraphs: [
          "A frequência influencia a velocidade de absorção da energia: frequências maiores tendem a concentrar mais energia em tecidos superficiais; frequências menores costumam alcançar alvos mais profundos.",
        ],
        points: [
          "1 MHz: o guia cita, como referência aproximada, alvos entre 2,5 e 5 cm.",
          "3 MHz: o guia cita alvos superficiais até cerca de 2 a 2,5 cm e aquecimento mais rápido nas camadas externas.",
          "Essas faixas não garantem que uma estrutura específica será atingida. A espessura dos tecidos que recobrem a região também importa.",
        ],
      },
      {
        id: "intensidade",
        heading: "Intensidade",
        paragraphs: [
          "Expressa em W/cm², a intensidade representa a densidade de potência acústica transmitida por unidade de área do transdutor. O guia descreve valores usados em contextos terapêuticos entre 0,1 e 2,0 W/cm², com valores maiores em situações específicas.",
          "Uma intensidade maior pode aumentar o aporte energético, mas não determina sozinha a temperatura nem o resultado. O tempo, o modo, o ciclo de trabalho, a frequência, a área, o tecido e o movimento do cabeçote também interferem.",
        ],
      },
      {
        id: "era-bnr",
        heading: "ERA e BNR: características do transdutor",
        points: [
          "ERA (Área Efetiva de Radiação) é a área efetiva do cabeçote que emite energia acústica. Consulte o valor do aparelho no manual ou na documentação técnica.",
          "BNR (Razão de Não Uniformidade do Feixe) compara a intensidade máxima local à média espacial do feixe. Um feixe menos uniforme pode criar pontos de maior intensidade, chamados hot spots.",
          "ERA, BNR e calibração variam entre equipamentos. Números nominais semelhantes não garantem distribuição ou aquecimento idênticos.",
        ],
      },
      {
        id: "modo-emissao",
        heading: "Modo contínuo, pulsado e ciclo de trabalho",
        points: [
          "Contínuo: emissão sem pausas durante a aplicação; ciclo de trabalho de 100%. Pode favorecer maior acúmulo de calor.",
          "Pulsado: intercala emissão e pausas; o ciclo de trabalho representa a porcentagem do tempo em que há emissão. Um ciclo de 20% significa emissão durante uma parte menor do ciclo; 50%, durante metade.",
          "As pausas podem reduzir o aquecimento médio, mas não tornam o tratamento automaticamente atérmico. A dose média temporal e os demais parâmetros importam.",
        ],
      },
      {
        id: "tempo-area-tecnica",
        heading: "Área, tempo e técnica de aplicação",
        paragraphs: [
          "O guia apresenta como estimativa didática a divisão da área tratada pela ERA do transdutor para estimar o tempo em minutos. Também cita tratar, por vez, áreas de aproximadamente 2 a 4 vezes a ERA e manter o cabeçote em movimento contínuo.",
          "O material menciona velocidades de 2 a 4 cm/s e um limite sugerido de 20 minutos por área. Esses números são referências do documento, não regras universais: o protocolo, o aparelho, o objetivo e a avaliação profissional devem ser confirmados.",
        ],
        points: [
          "A área tratada deve permitir que a energia seja distribuída de forma homogênea; regiões extensas podem exigir divisão em zonas.",
          "O cabeçote deve permanecer acoplado à pele e em movimento conforme a técnica indicada, evitando deixá-lo parado sobre um ponto.",
          "A fórmula, a unidade de tempo e o número de minutos por ERA podem variar entre protocolos. Confirme a equação na fonte técnica e no manual antes de usá-la; não a utilize como prescrição automática.",
        ],
      },
    ],
    note:
      "As faixas numéricas são apresentadas para explicar o documento de referência, não para orientar a regulagem de um aparelho ou o tratamento de uma condição individual.",
    source:
      "Guia explicativo fornecido; parâmetros devem ser conferidos no manual do equipamento e no protocolo clínico adotado.",
  },
  {
    id: "efeitos",
    label: "Efeitos",
    title: "Efeitos fisiológicos térmicos e mecânicos",
    summary:
      "A interação acústica pode alterar a temperatura local e também produzir fenômenos mecânicos. A intensidade desses efeitos depende da dose efetivamente recebida pelo tecido.",
    content: [
      {
        id: "efeitos-termicos",
        heading: "Aquecimento e respostas térmicas",
        paragraphs: [
          "O guia organiza os efeitos de acordo com o aumento aproximado da temperatura local. São relações discutidas na literatura, não resultados garantidos para uma pessoa ou aplicação.",
        ],
        points: [
          "Próximo de +1 °C: aquecimento leve, associado a mudanças na taxa metabólica local.",
          "+2 a +3 °C: aquecimento moderado, que pode estar associado a maior fluxo sanguíneo e redução de dor ou espasmo.",
          "+4 °C ou mais: aquecimento vigoroso, associado a maior extensibilidade do colágeno e redução da rigidez articular.",
          "A revisão citada discute 40–45 °C mantidos por aproximadamente cinco minutos como uma faixa terapêutica de referência; temperaturas acima de 45 °C podem causar dano tecidual.",
        ],
      },
      {
        id: "taxa-aquecimento",
        heading: "Frequência e velocidade de aquecimento",
        paragraphs: [
          "O guia cita estudos em músculo humano nos quais o aquecimento foi mais rápido com 3 MHz do que com 1 MHz, para a mesma intensidade nominal. A tabela abaixo resume os valores relatados por Draper et al. (1995):",
        ],
        points: [
          "0,5 W/cm²: cerca de 0,04 °C/min em 1 MHz e 0,30 °C/min em 3 MHz.",
          "1,0 W/cm²: cerca de 0,16 °C/min em 1 MHz e 0,58 °C/min em 3 MHz.",
          "1,5 W/cm²: cerca de 0,33 °C/min em 1 MHz e 0,89 °C/min em 3 MHz.",
          "2,0 W/cm²: cerca de 0,38 °C/min em 1 MHz e 1,40 °C/min em 3 MHz.",
        ],
      },
      {
        id: "efeitos-mecanicos",
        heading: "Cavitação e fluxo acústico",
        points: [
          "Cavitação acústica descreve a formação e a oscilação de pequenas bolhas de gás nos fluidos sob a ação do campo acústico. Seus efeitos dependem das condições de exposição.",
          "Fluxo acústico é o movimento de fluidos próximo às membranas celulares provocado pela onda. Pesquisas investigam possíveis respostas celulares, como alterações de permeabilidade e atividade de síntese.",
          "Esses mecanismos ajudam a explicar hipóteses biológicas, mas não comprovam, por si sós, benefício clínico para uma doença específica.",
        ],
      },
      {
        id: "lipus",
        heading: "Ultrassom pulsado de baixa intensidade (LIPUS)",
        paragraphs: [
          "O LIPUS é uma modalidade de baixa intensidade investigada em estudos de reparo tecidual e consolidação óssea. O guia cita protocolos de pesquisa, mas a evidência clínica resumida no próprio documento não encontrou melhora significativa da consolidação em adultos com fraturas agudas.",
        ],
      },
    ],
    note:
      "A temperatura real não pode ser deduzida apenas pela frequência ou pelo modo. Desconforto, dor ou queimação durante uma aplicação exigem atenção imediata do profissional.",
    source:
      "Guia explicativo fornecido; Itakura et al. (2012); Draper et al. (1995).",
  },
  {
    id: "seguranca",
    label: "Segurança",
    title: "Segurança, contraindicações e checklist",
    summary:
      "O uso seguro começa com avaliação clínica e consulta às contraindicações do equipamento e do protocolo local. As listas abaixo resumem o guia e não substituem julgamento profissional.",
    content: [
      {
        id: "contraindicacoes",
        heading: "Contraindicações descritas no guia",
        points: [
          "Gestação: não aplicar sobre abdômen, útero ou região lombar de gestantes.",
          "Malignidade conhecida ou suspeita: não aplicar diretamente sobre o tecido tumoral.",
          "Dispositivos eletrônicos implantados: não aplicar diretamente sobre marcapassos, desfibriladores ou neuroestimuladores.",
          "Sangramento ativo ou coagulopatia grave; trombose venosa profunda ou tromboflebite na região afetada.",
          "Olhos, seio carotídeo/pescoço anterior, gônadas ou órgãos reprodutivos, tecidos com tuberculose ativa e áreas com miosite ossificante.",
        ],
      },
      {
        id: "precaucoes",
        heading: "Precauções e avaliação de risco",
        points: [
          "Sensibilidade térmica ou dolorosa reduzida, ou dificuldade para comunicar desconforto.",
          "Insuficiência arterial grave e comprometimento circulatório na região.",
          "Placas de crescimento em crianças e adolescentes; pele frágil, lesionada ou com alterações que exijam protocolo específico.",
          "Inflamação ou lesão muscular aguda: o guia recomenda cautela, sobretudo com aquecimento contínuo, e decisão individualizada.",
        ],
      },
      {
        id: "checklist",
        heading: "Checklist antes, durante e depois",
        paragraphs: [
          "Antes: confirmar indicação e estrutura-alvo, investigar contraindicações, inspecionar a pele e avaliar sensibilidade; conferir transdutor, calibração e parâmetros.",
          "Durante: usar gel condutor adequado, manter contato uniforme e movimento contínuo do cabeçote, e perguntar sobre dor, queimação ou desconforto. Interromper e reavaliar se houver reação inesperada.",
          "Depois: reduzir a intensidade a zero e desligar a emissão antes de afastar o cabeçote, conforme o manual; remover o gel, inspecionar a pele, higienizar o transdutor e registrar parâmetros e resposta.",
        ],
      },
    ],
    note:
      "A ausência de eventos adversos graves em estudos não significa risco zero. Confirme contraindicações e precauções no manual do equipamento, nas normas institucionais e em fontes clínicas atualizadas.",
    source:
      "Guia explicativo fornecido; Houghton et al. (2010); Leite et al. (2013).",
  },
  {
    id: "evidencias",
    label: "Evidências",
    title: "Efetividade clínica: o que mostram os estudos?",
    summary:
      "A plausibilidade dos mecanismos físicos não garante benefício para todas as condições. O guia relata resultados clínicos variados, dependentes da doença, do protocolo e da qualidade dos estudos.",
    content: [
      {
        id: "revisoes-clinicas",
        heading: "Revisões sistemáticas e condições musculoesqueléticas",
        paragraphs: [
          "A síntese de Leite et al. (2013), conforme descrita no guia, reuniu seis revisões Cochrane, com 37 ensaios clínicos e 1.636 participantes. Os resultados variaram conforme a condição avaliada:",
        ],
        points: [
          "Osteoartrite de joelho: uma metanálise de cinco ensaios encontrou redução de dor favorável ao ultrassom ativo em comparação ao placebo.",
          "Síndrome do túnel do carpo: a metanálise de dois ensaios não encontrou diferença significativa entre ultrassom ativo e placebo para sintomas ou função no curto prazo.",
          "Entorse agudo de tornozelo: a revisão não encontrou superioridade sobre placebo para melhora geral ou capacidade de marcha após sete dias.",
          "Fraturas agudas em adultos: a revisão de 12 ensaios não encontrou diferença significativa no tempo de consolidação radiográfica ou no retorno às atividades.",
          "Para outras condições, como síndrome femoropatelar e artrite reumatoide, o guia relata evidência insuficiente para sustentar o uso rotineiro.",
        ],
      },
      {
        id: "meta-analise-recente",
        heading: "Meta-análise de Guan et al. (2024)",
        paragraphs: [
          "O documento também resume uma meta-análise de dez ensaios sobre osteoartrite do joelho e disfunções do ombro. Ela relata resultado favorável para dor na osteoartrite do joelho, mas não identificou benefício estatisticamente significativo do ultrassom isolado para as disfunções do ombro analisadas.",
        ],
      },
      {
        id: "lesao-muscular-evidencia",
        heading: "Lesão muscular: estudos animais e estudos em pessoas",
        paragraphs: [
          "A revisão de Bruning et al. (2016) encontrou resultados promissores em modelos animais, incluindo sinais de regeneração e menor fibrose. Nos estudos clínicos humanos resumidos pelo guia, com 28 participantes, o ultrassom não mostrou diferença significativa para dor muscular tardia, força ou amplitude de movimento em comparação ao placebo.",
        ],
      },
      {
        id: "limites-evidencia",
        heading: "Como interpretar a evidência",
        points: [
          "Resultados positivos em laboratório ou em animais não equivalem automaticamente a benefício clínico em pessoas.",
          "Diferenças de dose, parâmetros, aparelhos e qualidade metodológica dificultam comparar estudos e definir um protocolo universal.",
          "O resumo .doc fornecido traz faixas de parâmetros para condições específicas; elas não devem ser tratadas como prescrição, especialmente quando as referências completas ou a evidência clínica são divergentes.",
        ],
      },
    ],
    note:
      "O guia relata que as revisões analisadas não registraram eventos adversos graves, mas isso não elimina riscos nem substitui vigilância e aplicação correta.",
    source:
      "Leite et al. (2013); Guan et al. (2024); Bruning et al. (2016), conforme o guia fornecido.",
  },
  {
    id: "consideracoes",
    label: "Na prática",
    title: "Considerações finais para a prática",
    summary:
      "O ultrassom pode ser considerado como um recurso dentro de um plano de reabilitação, mas sua escolha depende da avaliação, dos objetivos e da evidência disponível para cada situação.",
    content: [
      {
        id: "uso-responsavel",
        heading: "Individualização e integração ao tratamento",
        points: [
          "Selecionar a frequência considerando a profundidade estimada do alvo e os tecidos que o recobrem.",
          "Definir intensidade, modo, ciclo de trabalho, área e duração em conjunto, com base na avaliação, no equipamento e em um protocolo validado.",
          "Utilizar o ultrassom como possível recurso adjuvante, não como substituto automático de exercício terapêutico, terapia manual ou outras intervenções indicadas.",
          "Reavaliar a resposta e interromper a aplicação diante de dor crescente, queimação ou reação inesperada.",
        ],
      },
      {
        id: "limites-material",
        heading: "Limites deste material",
        paragraphs: [
          "Este conteúdo organiza informações dos documentos fornecidos para fins educativos. Alguns valores são apresentados como referências de estudos ou propostas de protocolo e não se aplicam universalmente.",
          "A decisão terapêutica deve ser tomada por fisioterapeuta habilitado, considerando a pessoa, o equipamento, as contraindicações e as evidências clínicas atuais.",
        ],
      },
    ],
    source:
      "Síntese educativa do guia explicativo e dos demais materiais fornecidos.",
  },
];
