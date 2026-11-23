
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Topic } from "../data/topics";

type Props = {
  topics: Topic[];
  userId: string;
  onSelectTopic: (id: string) => void;
};

export default function TopicosFavoritos({
  topics,
  userId,
  onSelectTopic,
}: Props) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [soFavoritos, setSoFavoritos] = useState(false);
  const [carregando, setCarregando] = useState(true);
  const [alterando, setAlterando] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    let ativo = true;

    async function carregarFavoritos() {
      setCarregando(true);
      setFavoritos([]);
      setErro("");

      const { data, error } = await supabase
        .from("favorites")
        .select("topic_id")
        .eq("user_id", userId);

      if (!ativo) return;

      if (error) {
        setErro("Não foi possível carregar os favoritos.");
      } else {
        setFavoritos(data.map((item) => item.topic_id));
      }

      setCarregando(false);
    }

    void carregarFavoritos();

    return () => {
      ativo = false;
    };
  }, [userId]);

  async function alternarFavorito(topicId: string) {
    if (alterando || carregando) return;

    const jaFavorito = favoritos.includes(topicId);

    setAlterando(topicId);
    setErro("");

    try {
      if (jaFavorito) {
        const { error } = await supabase
          .from("favorites")
          .delete()
          .eq("user_id", userId)
          .eq("topic_id", topicId);

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("favorites")
          .insert({
            user_id: userId,
            topic_id: topicId,
          });

        if (error) throw error;
      }

      setFavoritos((anteriores) =>
        jaFavorito
          ? anteriores.filter((id) => id !== topicId)
          : [...anteriores, topicId]
      );
    } catch (error) {
      setErro(
        error instanceof Error
          ? error.message
          : "Não foi possível atualizar o favorito."
      );
    } finally {
      setAlterando(null);
    }
  }

  // Decide quais cards devem aparecer
  const topicosVisiveis = soFavoritos
    ? topics.filter((topic) => favoritos.includes(topic.id))
    : topics;

  return (
    <section
      aria-labelledby="topic-cards-title"
      className="mx-auto mb-8 max-w-7xl"
    >
      <div className="mb-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2
            id="topic-cards-title"
            className="text-xl font-semibold text-slate-900 sm:text-2xl"
          >
            Explore os tópicos
          </h2>

          <p className="mt-2 text-sm text-slate-600">
            Salve seus assuntos preferidos para encontrá-los depois.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setSoFavoritos(!soFavoritos)}
          disabled={carregando}
          aria-pressed={soFavoritos}
          className={`rounded-xl border px-4 py-2 text-sm font-semibold transition disabled:opacity-50 ${
            soFavoritos
              ? "border-emerald-700 bg-emerald-700 text-white"
              : "border-emerald-200 bg-white text-emerald-700 hover:bg-emerald-50"
          }`}
        >
          {soFavoritos
            ? "Mostrar todos"
            : `♥ Meus favoritos (${favoritos.length})`}
        </button>
      </div>

      {erro && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
        >
          {erro}
        </p>
      )}

      {carregando ? (
        <p className="text-sm text-slate-600">
          Carregando favoritos...
        </p>
      ) : topicosVisiveis.length === 0 ? (
        <div className="rounded-xl border border-slate-200 bg-white p-6 text-center">
          <p className="text-slate-600">
            Você ainda não salvou nenhum tópico favorito.
          </p>

          <button
            type="button"
            onClick={() => setSoFavoritos(false)}
            className="mt-3 font-semibold text-emerald-700 hover:underline"
          >
            Explorar todos os tópicos
          </button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {topicosVisiveis.map((topic) => {
            const favorito = favoritos.includes(topic.id);

            return (
              <article
                key={topic.id}
                className="flex flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-emerald-400 hover:shadow-md"
              >
                <div className="mb-4 flex items-center justify-between gap-2">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                    {topic.label}
                  </span>

                  <button
                    type="button"
                    onClick={() => void alternarFavorito(topic.id)}
                    disabled={alterando !== null}
                    aria-pressed={favorito}
                    aria-label={
                      favorito
                        ? `Remover ${topic.title} dos favoritos`
                        : `Adicionar ${topic.title} aos favoritos`
                    }
                    title={
                      favorito
                        ? "Remover dos favoritos"
                        : "Adicionar aos favoritos"
                    }
                    className={`rounded-full p-2 transition hover:bg-rose-50 disabled:opacity-50 ${
                      favorito
                        ? "text-rose-600"
                        : "text-slate-400 hover:text-rose-600"
                    }`}
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      fill={favorito ? "currentColor" : "none"}
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-6 w-6"
                    >
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78Z" />
                    </svg>
                  </button>
                </div>

                <h3 className="mb-2 text-lg font-semibold leading-6 text-slate-900">
                  {topic.title}
                </h3>

                <p className="mb-5 flex-1 text-sm leading-6 text-slate-600">
                  {topic.summary}
                </p>

                <a
                  href={`#${topic.id}`}
                  onClick={() => onSelectTopic(topic.id)}
                  className="text-sm font-semibold text-emerald-700 hover:underline"
                >
                  Ler tópico
                </a>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
