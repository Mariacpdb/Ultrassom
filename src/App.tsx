import { useEffect, useState } from "react";
import BackToTopButton from "./components/BackToTopButton";
import SidebarToggleButton from "./components/SidebarToggleButton";
import TopicPill from "./components/TopicPill";
import TopicSearch from "./components/TopicSearch";
import TopicSidebar from "./components/TopicSidebar";
import TopicSection from "./components/TopicSection";
import { topics } from "./data/topics";
import TopicosFavoritos from "./components/TopicosFavoritos";
import AccessibilityWidget from "./components/AccessibilityWidget";
import { supabase } from "./lib/supabase";
import type { SavedHighlight, TextScale } from "./lib/highlights";

type PendingHighlightSelection = Pick<
  SavedHighlight,
  | "topic_id"
  | "section_id"
  | "block_id"
  | "block_text"
  | "selected_text"
  | "start_offset"
  | "end_offset"
>;

type PendingHighlight = {
  selections: PendingHighlightSelection[];
  left: number;
  top: number;
};

export default function App({ userId }: { userId?: string }) {
  const [activeTopic, setActiveTopic] = useState(topics[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [textScale, setTextScale] = useState<TextScale>(() => {
    const stored = window.localStorage.getItem("ultrassom_text_scale");
    return stored === "large" || stored === "larger" ? stored : "normal";
  });
  const [highContrast, setHighContrast] = useState(
    () => window.localStorage.getItem("ultrassom_high_contrast") === "true"
  );
  const [highlights, setHighlights] = useState<SavedHighlight[]>([]);
  const [highlightsLoading, setHighlightsLoading] = useState(Boolean(userId));
  const [highlightsError, setHighlightsError] = useState("");
  const [highlightRefresh, setHighlightRefresh] = useState(0);
  const [pendingHighlight, setPendingHighlight] =
    useState<PendingHighlight | null>(null);
  const [savingHighlight, setSavingHighlight] = useState(false);
  const [deletingHighlightId, setDeletingHighlightId] = useState<string | null>(
    null
  );
  const [highlightNotice, setHighlightNotice] = useState<{
    message: string;
    isError: boolean;
  } | null>(null);

  useEffect(() => {
    window.localStorage.setItem("ultrassom_text_scale", textScale);
  }, [textScale]);

  useEffect(() => {
    window.localStorage.setItem(
      "ultrassom_high_contrast",
      String(highContrast)
    );
  }, [highContrast]);

  useEffect(() => {
    if (!userId) return;

    let active = true;

    async function loadHighlights() {
      setHighlightsLoading(true);
      setHighlightsError("");

      try {
        const { data, error } = await supabase
          .from("highlights")
          .select(
            "id, topic_id, section_id, block_id, block_text, selected_text, start_offset, end_offset, created_at"
          )
          .eq("user_id", userId)
          .order("created_at", { ascending: false });

        if (!active) return;

        if (error) {
          setHighlights([]);
          setHighlightsError(error.message);
        } else {
          setHighlights(data ?? []);
        }
      } catch (error) {
        if (!active) return;
        setHighlights([]);
        setHighlightsError(
          error instanceof Error
            ? error.message
            : "Não foi possível carregar os destaques."
        );
      } finally {
        if (active) setHighlightsLoading(false);
      }
    }

    void loadHighlights();

    return () => {
      active = false;
    };
  }, [userId, highlightRefresh]);

  useEffect(() => {
    if (!userId) return;

    function captureSelection() {
      const selection = window.getSelection();

      if (!selection || selection.isCollapsed || selection.rangeCount === 0) {
        setPendingHighlight(null);
        return;
      }

      const range = selection.getRangeAt(0);
      const findBlock = (node: Node) => {
        const element = node instanceof Element ? node : node.parentElement;
        return element?.closest("[data-highlight-block-id]") as
          | HTMLElement
          | null;
      };
      const startBlock = findBlock(range.startContainer);
      const endBlock = findBlock(range.endContainer);

      if (!startBlock || !endBlock) {
        setPendingHighlight(null);
        return;
      }

      const article = startBlock.closest("article[id]");
      if (
        !article ||
        article !== endBlock.closest("article[id]") ||
        !topics.some((topic) => topic.id === article.id)
      ) {
        setPendingHighlight(null);
        return;
      }

      const selections = Array.from(
        article.querySelectorAll<HTMLElement>("[data-highlight-block-id]")
      ).flatMap((block) => {
        if (!range.intersectsNode(block)) return [];

        const blockRange = document.createRange();
        blockRange.selectNodeContents(block);
        const blockSelection = range.cloneRange();

        if (
          blockSelection.compareBoundaryPoints(
            Range.START_TO_START,
            blockRange
          ) < 0
        ) {
          blockSelection.setStart(
            blockRange.startContainer,
            blockRange.startOffset
          );
        }

        if (
          blockSelection.compareBoundaryPoints(Range.END_TO_END, blockRange) > 0
        ) {
          blockSelection.setEnd(blockRange.endContainer, blockRange.endOffset);
        }

        const rawSelection = blockSelection.toString();
        const selectedText = rawSelection.trim();
        if (!selectedText) return [];

        const offsetRange = document.createRange();
        offsetRange.selectNodeContents(block);
        offsetRange.setEnd(
          blockSelection.startContainer,
          blockSelection.startOffset
        );
        const rawStart = offsetRange.toString().length;
        const startOffset =
          rawStart + rawSelection.length - rawSelection.trimStart().length;
        const endOffset = startOffset + selectedText.length;
        const blockId = block.dataset.highlightBlockId || block.id;

        if (
          highlights.some(
            (highlight) =>
              highlight.block_id === blockId &&
              highlight.start_offset === startOffset &&
              highlight.end_offset === endOffset
          )
        ) {
          return [];
        }

        return [
          {
            topic_id: article.id,
            section_id: block.closest("section[id]")?.id ?? "",
            block_id: blockId,
            block_text: block.textContent ?? "",
            selected_text: selectedText,
            start_offset: startOffset,
            end_offset: endOffset,
          },
        ];
      });

      if (selections.length === 0) {
        setPendingHighlight(null);
        return;
      }

      const rect = range.getBoundingClientRect();

      setPendingHighlight({
        selections,
        left: Math.max(
          100,
          Math.min(window.innerWidth - 100, rect.left + rect.width / 2)
        ),
        top: Math.max(54, rect.top - 8),
      });
    }

    function handleKeyUp(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setPendingHighlight(null);
        return;
      }
      captureSelection();
    }

    document.addEventListener("mouseup", captureSelection);
    document.addEventListener("selectionchange", captureSelection);
    document.addEventListener("keyup", handleKeyUp);

    return () => {
      document.removeEventListener("mouseup", captureSelection);
      document.removeEventListener("selectionchange", captureSelection);
      document.removeEventListener("keyup", handleKeyUp);
    };
  }, [highlights, userId]);

  async function saveHighlight() {
    if (!userId || !pendingHighlight || savingHighlight) return;

    const newSelections = pendingHighlight.selections.filter(
      (selection) =>
        !highlights.some(
          (highlight) =>
            highlight.block_id === selection.block_id &&
            highlight.start_offset === selection.start_offset &&
            highlight.end_offset === selection.end_offset
        )
    );

    if (newSelections.length === 0) {
      setPendingHighlight(null);
      setHighlightNotice({
        message: "Esses trechos já estão em Meus destaques.",
        isError: false,
      });
      return;
    }

    setSavingHighlight(true);
    setHighlightNotice(null);

    try {
      const { error } = await supabase
        .from("highlights")
        .insert(
          newSelections.map((selection) => ({
            user_id: userId,
            ...selection,
          }))
        );

      if (error) {
        setHighlightNotice({
          message:
            error.code === "23505"
              ? "Um ou mais trechos já estão em Meus destaques. Atualize e tente novamente."
              : error.message,
          isError: error.code !== "23505",
        });
      } else {
        setHighlightRefresh((current) => current + 1);
        setPendingHighlight(null);
        window.getSelection()?.removeAllRanges();
        setHighlightNotice({
          message:
            newSelections.length === 1
              ? "Trecho salvo em Meus destaques."
              : `${newSelections.length} trechos salvos em Meus destaques.`,
          isError: false,
        });
      }
    } catch (error) {
      setHighlightNotice({
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível salvar o trecho selecionado.",
        isError: true,
      });
    } finally {
      setSavingHighlight(false);
    }
  }

  async function deleteHighlight(highlightId: string) {
    if (!userId || deletingHighlightId) return;

    setDeletingHighlightId(highlightId);
    setHighlightNotice(null);

    try {
      const { error } = await supabase
        .from("highlights")
        .delete()
        .eq("id", highlightId)
        .eq("user_id", userId);

      if (error) {
        setHighlightNotice({ message: error.message, isError: true });
      } else {
        setHighlights((current) =>
          current.filter((highlight) => highlight.id !== highlightId)
        );
      }
    } catch (error) {
      setHighlightNotice({
        message:
          error instanceof Error
            ? error.message
            : "Não foi possível remover o destaque.",
        isError: true,
      });
    } finally {
      setDeletingHighlightId(null);
    }
  }

  function navigateToHighlight(topicId: string, blockId: string) {
    setActiveTopic(topicId);
    document
      .getElementById(blockId)
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
  }

  function navigateToTopic(topicId: string) {
    setActiveTopic(topicId);
    if (!window.matchMedia("(min-width: 1024px)").matches) {
      setSidebarOpen(false);
    }
  }

  useEffect(() => {
    let animationFrame: number | undefined;

    const updateActiveTopic = () => {
      animationFrame = undefined;
      const readingLine = window.scrollY + 180;
      let currentTopicId = topics[0]?.id ?? "";

      for (const topic of topics) {
        const element = document.getElementById(topic.id);
        if (
          element &&
          element.getBoundingClientRect().top + window.scrollY <= readingLine
        ) {
          currentTopicId = topic.id;
        }
      }

      setActiveTopic((current) =>
        current === currentTopicId ? current : currentTopicId,
      );
    };

    const scheduleUpdate = () => {
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
      animationFrame = requestAnimationFrame(updateActiveTopic);
    };

    updateActiveTopic();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame !== undefined) {
        cancelAnimationFrame(animationFrame);
      }
      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, []);

  return (
    <div
      className={`reading-content reading-size-${textScale} min-h-screen bg-[#f3fafb] text-slate-900 ${
        highContrast ? "high-contrast" : ""
      }`}
    >
      <SidebarToggleButton
        label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
        expanded={sidebarOpen}
        controls="topic-sidebar mobile-topic-sidebar"
        className="fixed left-4 top-4 z-[60] shadow-md"
        onClick={() => setSidebarOpen((open) => !open)}
      />

      <div
        className={`mx-auto grid max-w-7xl gap-8 px-5 pb-24 pt-8 sm:px-8 lg:pb-20 ${
          sidebarOpen
            ? "lg:grid-cols-[16rem_minmax(0,1fr)] lg:gap-10"
            : "lg:grid-cols-1"
        }`}
      >
        <aside
          id="topic-sidebar"
          className={sidebarOpen ? "hidden lg:block" : "hidden"}
        >
          <div className="sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto rounded-xl border border-slate-200 bg-white p-3">
            <TopicSidebar
              topics={topics}
              activeTopicId={activeTopic}
              onNavigate={navigateToTopic}
            />
          </div>
        </aside>

        <main className="min-w-0">
          <section className="mx-auto max-w-4xl pb-7 pt-4 text-center sm:pt-8">
            <div className="mx-auto mb-6 h-1 w-16 rounded-full bg-emerald-500" />
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
              Ultrassom Terapêutico
            </h1>
            <p className="mx-auto mb-7 max-w-3xl text-lg leading-8 text-slate-700">
              Aprenda como o ultrassom terapêutico interage com os tecidos,
              como seus parâmetros são definidos e o que as pesquisas mostram
              sobre seus efeitos.
            </p>

            <div className="mx-auto w-full max-w-2xl">
              <TopicSearch topics={topics} onSelectTopic={setActiveTopic} />
            </div>
          </section>

          {userId && (
            <p className="mx-auto mb-6 max-w-4xl text-sm text-slate-700">
              Selecione um trecho de um parágrafo ou item de lista para
              salvá-lo em Meus destaques.
            </p>
          )}

          <TopicosFavoritos
            topics={topics}
            userId={userId}
            onSelectTopic={setActiveTopic}
            highlights={highlights}
            highlightsLoading={highlightsLoading}
            highlightsError={highlightsError}
            deletingHighlightId={deletingHighlightId}
            onSelectHighlight={navigateToHighlight}
            onDeleteHighlight={deleteHighlight}
          />

          <div className="flex flex-col">
            <div className="order-1 space-y-7 lg:order-2">
              {topics.map((topic, index) => (
                <TopicSection
                  key={topic.id}
                  id={topic.id}
                  title={topic.title}
                  summary={topic.summary}
                  content={topic.content}
                  note={topic.note}
                  references={topic.references}
                  resources={topic.resources}
                  visual={topic.visual}
                  selfChecks={topic.selfChecks}
                  imageOnLeft={index % 2 === 1}
                  highlights={highlights.filter(
                    (highlight) => highlight.topic_id === topic.id
                  )}
                  textScale={textScale}
                  onDeleteHighlight={deleteHighlight}
                />
              ))}
            </div>

            <nav
              aria-label="Assuntos principais"
              className="fixed inset-x-0 bottom-0 z-30 order-2 border-t border-slate-200 bg-[#f3fafb]/95 px-3 py-3 backdrop-blur lg:sticky lg:inset-x-auto lg:bottom-auto lg:top-0 lg:order-1 lg:-mx-8 lg:border-y lg:px-8"
            >
              <div className="relative mx-auto max-w-7xl">
                <div className="scrollbar-none flex snap-x snap-proximity gap-2 overflow-x-auto pb-1 pr-8 lg:justify-center">
                  {topics.map((topic) => (
                    <TopicPill
                      key={topic.id}
                      href={`#${topic.id}`}
                      active={activeTopic === topic.id}
                      onClick={() => setActiveTopic(topic.id)}
                    >
                      {topic.label}
                    </TopicPill>
                  ))}
                </div>
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-y-0 right-0 flex items-center bg-gradient-to-l from-[#f3fafb] via-[#f3fafb]/95 to-transparent pl-4 text-slate-500 md:hidden"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="h-4 w-4"
                  >
                    <path d="m9 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </nav>
          </div>
          <footer className="mt-10 border-t border-slate-300 pt-6 text-base leading-7 text-slate-700">
            Conteúdo educativo com referências acadêmicas indicadas por
            assunto. Não substitui avaliação fisioterapêutica, protocolo
            clínico ou manual do equipamento.
          </footer>
        </main>
      </div>

      <div
        className={`fixed inset-0 z-50 lg:hidden ${
          sidebarOpen ? "" : "hidden"
        }`}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-slate-950/40" />
        <aside
          id="mobile-topic-sidebar"
          aria-label="Menu lateral"
          className="absolute inset-y-0 left-0 w-[min(88vw,21rem)] overflow-y-auto bg-white p-4 shadow-xl"
        >
          <div className="mb-4 border-b border-slate-200 pb-4">
            <span className="font-semibold text-slate-900">
              Menu de conteúdo
            </span>
          </div>
          <TopicSidebar
            topics={topics}
            activeTopicId={activeTopic}
            onNavigate={navigateToTopic}
          />
        </aside>
      </div>
      <BackToTopButton />
      <AccessibilityWidget
        textScale={textScale}
        onTextScaleChange={setTextScale}
        highContrast={highContrast}
        onHighContrastChange={() => setHighContrast((current) => !current)}
      />

      {pendingHighlight && (
        <button
          type="button"
          onMouseDown={(event) => event.preventDefault()}
          onClick={() => void saveHighlight()}
          disabled={savingHighlight || highlightsLoading}
          aria-label={`Salvar ${pendingHighlight.selections.length} ${
            pendingHighlight.selections.length === 1 ? "trecho" : "trechos"
          } em Meus destaques`}
          className="fixed z-[80] -translate-x-1/2 -translate-y-full rounded-lg bg-amber-300 px-4 py-2 text-sm font-semibold text-slate-950 shadow-lg ring-1 ring-amber-500 hover:bg-amber-200 disabled:opacity-60"
          style={{
            left: pendingHighlight.left,
            top: pendingHighlight.top,
          }}
        >
          {highlightsLoading
            ? "Carregando..."
            : savingHighlight
              ? "Salvando..."
              : pendingHighlight.selections.length === 1
                ? "✎ Salvar trecho"
                : `✎ Salvar ${pendingHighlight.selections.length} trechos`}
        </button>
      )}

      {highlightNotice && (
        <div
          role={highlightNotice.isError ? "alert" : "status"}
          className={`fixed bottom-5 right-5 z-[90] max-w-sm rounded-xl border p-4 shadow-lg ${
            highlightNotice.isError
              ? "border-red-300 bg-white text-red-800"
              : "border-emerald-300 bg-white text-emerald-900"
          }`}
        >
          <div className="flex items-start gap-3">
            <p className="text-sm font-medium">{highlightNotice.message}</p>
            <button
              type="button"
              onClick={() => setHighlightNotice(null)}
              aria-label="Fechar mensagem"
              className="rounded px-1 font-semibold hover:bg-slate-100"
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
