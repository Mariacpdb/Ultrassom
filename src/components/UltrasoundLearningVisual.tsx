import frequencyDepthImage from "../assets/1mhz 3mhz.jpeg";
import emissionModesImage from "../assets/Ultrassompulsadocontinuo.png";
import introductionPhoto from "../assets/Ultrassom.jpg";
import practicePhoto from "../assets/Ultrassom2.jpg";
import tissueIntensityImage from "../assets/ultrassom-efeitos-NAO-APAGAR.png";
import type { TopicVisual } from "../data/topics";

type Props = {
  visual: TopicVisual;
};

type VisualCard = {
  src: string;
  alt: string;
  caption: string;
};

const visualCards: Record<TopicVisual, VisualCard[]> = {
  introduction: [
    {
      src: introductionPhoto,
      alt: "Fisioterapeuta aplicando ultrassom terapêutico em uma pessoa deitada",
      caption:
        "Exemplo de atendimento com ultrassom terapêutico. A fotografia não permite inferir indicação, parâmetros ou resultado clínico.",
    },
  ],
  parameters: [
    {
      src: frequencyDepthImage,
      alt: "Ilustração de uma perna com transdutores de 1 MHz e 3 MHz e faixas aproximadas de profundidade indicadas no desenho",
      caption:
        "A imagem fornecida compara 1 MHz e 3 MHz e indica faixas aproximadas. Elas são ilustrativas, não limites anatômicos nem garantia da profundidade atingida.",
    },
    {
      src: emissionModesImage,
      alt: "Ilustração que compara ultrassom contínuo e pulsado, rotulados na imagem como 5 MHz, com camadas de tecido",
      caption:
        "A imagem fornecida usa o exemplo de 5 MHz e inclui outros valores no desenho. A comparação ilustra os modos de emissão; os números não são uma prescrição nem devem ser generalizados para outros aparelhos.",
    },
  ],
  effects: [
    {
      src: tissueIntensityImage,
      alt: "Diagrama de transdutores de 1 MHz e 3 MHz mostrando intensidades relativas ao longo de camadas de tecido",
      caption:
        "Representação qualitativa da distribuição de intensidade com a profundidade. Não mostra uma dose clínica nem a energia real absorvida por cada tecido.",
    },
  ],
  practice: [
    {
      src: practicePhoto,
      alt: "Aplicação de ultrassom terapêutico na região do joelho de uma pessoa",
      caption:
        "Exemplo de aplicação na região do joelho. A fotografia ilustra uma prática, mas não estabelece indicação ou protocolo.",
    },
  ],
};

export default function UltrasoundLearningVisual({ visual }: Props) {
  return (
    <div className="space-y-4">
      {visualCards[visual].map((card) => (
        <figure
          key={card.src}
          className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
        >
          <img
            src={card.src}
            alt={card.alt}
            className="mx-auto max-h-80 w-full object-contain"
            loading="lazy"
          />
          <figcaption className="px-4 py-3 text-sm leading-6 text-slate-700">
            {card.caption}
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
