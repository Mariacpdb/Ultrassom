
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import type { Topic } from "../data/topics";
import type { SavedHighlight } from "../lib/highlights";

type Props = {
  topics: Topic[];
  userId?: string;
  onSelectTopic: (id: string) => void;
  highlights: SavedHighlight[];
  highlightsLoading: boolean;
  highlightsError: string;
  deletingHighlightId: string | null;
  onSelectHighlight: (topicId: string, blockId: string) => void;
  onDeleteHighlight: (id: string) => void;
};

export default function TopicosFavoritos({
  topics,
  userId,
  onSelectTopic,
  highlights,
  highlightsLoading,
  highlightsError,
  deletingHighlightId,
  onSelectHighlight,
  onDeleteHighlight,
}: Props) {
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const [visao, setVisao] = useState<"todos" | "favoritos" | "destaques">(
    "todos"
  );
  const [carregando, setCarregando] = useState(Boolean(userId));
  const [alterando, setAlterando] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  useEffect(() => {
    if (!userId) return;

    const usuarioAtual = userId;
    let ativo = true;

    async function carregarFavoritos() {
      setCarregando(true);
      setFavoritos([]);
      setErro("");

      try {
        const { data, error } = await supabase
          .from("favorites")
          .select("topic_id")
          .eq("user_id", usuarioAtual);

        if (!ativo) return;

        if (error) {
          setErro(error.message);
        } else {
          setFavoritos(data.map((item) => item.topic_id));
        }
      } catch (error) {
        if (!ativo) return;
        setErro(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os favoritos."
        );
      } finally {
        if (ativo) setCarregando(false);
      }
    }

    void carregarFavoritos();

    return () => {
      ativo = false;
    };
  }, [userId]);

  async function alternarFavorito(topicId: string) {
    if (!userId || alterando || carregando) return;

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

  const topicosVisiveis = visao === "favoritos"
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
            className="text-2xl font-semibold text-slate-950"
          >
            Explore os tópicos
          </h2>

          <p className="mt-2 text-base text-slate-700">
            {userId
              ? "Salve assuntos e trechos importantes para encontrá-los depois."
              : "Explore os conteúdos gratuitamente. Entre na sua conta para salvar favoritos."}
          </p>
        </div>

        {userId && (
          <div
            aria-label="Suas coleções"
            className="flex flex-wrap gap-2"
            role="group"
          >
            <button
              type="button"
              onClick={() => setVisao("favoritos")}
              disabled={carregando}
              aria-pressed={visao === "favoritos"}
              className={`rounded-xl border px-4 py-2 text-base font-semibold transition disabled:opacity-50 ${
                visao === "favoritos"
                  ? "border-emerald-800 bg-emerald-800 text-white"
                  : "border-slate-400 bg-white text-slate-900 hover:bg-emerald-50"
              }`}
            >
              ♥ Meus favoritos ({favoritos.length})
            </button>
            <button
              type="button"
              onClick={() => setVisao("destaques")}
              disabled={highlightsLoading}
              aria-pressed={visao === "destaques"}
              className={`rounded-xl border px-4 py-2 text-base font-semibold transition disabled:opacity-50 ${
                visao === "destaques"
                  ? "border-amber-500 bg-amber-300 text-slate-950"
                  : "border-slate-400 bg-white text-slate-900 hover:bg-amber-50"
              }`}
            >
              Meus destaques ({highlights.length})
            </button>
            {visao !== "todos" && (
              <button
                type="button"
                onClick={() => setVisao("todos")}
                className="rounded-xl border border-slate-400 bg-white px-4 py-2 text-base font-semibold text-slate-900 hover:bg-slate-100"
              >
                Explorar todos
              </button>
            )}
          </div>
        )}
      </div>

      {erro && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-base text-red-800"
        >
          Não foi possível carregar os favoritos: {erro}
        </p>
      )}

      {highlightsError && visao === "destaques" && (
        <p
          role="alert"
          className="mb-4 rounded-lg bg-red-50 p-3 text-base text-red-800"
        >
          Não foi possível carregar os destaques: {highlightsError}
        </p>
      )}

      {visao === "destaques" ? (
        highlightsLoading ? (
          <p className="text-base text-slate-700">Carregando destaques...</p>
        ) : highlights.length === 0 ? (
          <div className="rounded-xl border border-slate-300 bg-white p-6 text-center">
            <p className="text-base text-slate-700">
              Você ainda não salvou nenhum trecho. Selecione uma passagem em um
              tópico para destacá-la.
            </p>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {highlights.map((highlight) => {
              const topic = topics.find(
                (item) => item.id === highlight.topic_id
              );

              return (
                <article
                  key={highlight.id}
                  className="rounded-2xl border border-slate-300 bg-white p-5 shadow-sm"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="rounded-full bg-amber-100 px-3 py-1 text-sm font-semibold text-slate-900">
                      {topic?.label ?? "Tópico"}
                    </span>
                    <button
                      type="button"
                      onClick={() => onDeleteHighlight(highlight.id)}
                      disabled={deletingHighlightId !== null}
                      aria-label={`Remover destaque: ${highlight.selected_text}`}
                      className="rounded-lg px-2 py-1 text-sm font-semibold text-red-800 hover:bg-red-50 disabled:opacity-50"
                    >
                      Remover
                    </button>
                  </div>
                  <blockquote className="rounded-xl bg-amber-50 p-4 text-base leading-7 text-slate-900">
                    <mark className="bg-amber-200 px-1 text-slate-950">
                      {highlight.selected_text}
                    </mark>
                  </blockquote>
                  <button
                    type="button"
                    onClick={() =>
                      onSelectHighlight(
                        highlight.topic_id,
                        highlight.block_id
                      )
                    }
                    className="mt-4 text-base font-semibold text-emerald-800 hover:underline"
                  >
                    Ir ao trecho
                  </button>
                </article>
              );
            })}
          </div>
        )
      ) : carregando ? (
        <p className="text-base text-slate-700">Carregando favoritos...</p>
      ) : topicosVisiveis.length === 0 ? (
        <div className="rounded-xl border border-slate-300 bg-white p-6 text-center">
          <p className="text-base text-slate-700">
            Você ainda não salvou nenhum tópico favorito.
          </p>

          <button
            type="button"
            onClick={() => setVisao("todos")}
            className="mt-3 text-base font-semibold text-emerald-800 hover:underline"
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
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-900">
                    {topic.label}
                  </span>

                  {userId && (
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
                          : "text-slate-600 hover:text-rose-700"
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
                  )}
                </div>

                <h3 className="mb-2 text-lg font-semibold leading-6 text-slate-900">
                  {topic.title}
                </h3>

                <p className="mb-5 flex-1 text-base leading-7 text-slate-700">
                  {topic.summary}
                </p>

                <a
                  href={`#${topic.id}`}
                  onClick={() => onSelectTopic(topic.id)}
                  className="text-base font-semibold text-emerald-800 hover:underline"
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
