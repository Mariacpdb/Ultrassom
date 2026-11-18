import { useEffect, useState } from "react";
import BackToTopButton from "./components/BackToTopButton";
import SidebarToggleButton from "./components/SidebarToggleButton";
import TopicPill from "./components/TopicPill";
import TopicSearch from "./components/TopicSearch";
import TopicSidebar from "./components/TopicSidebar";
import TopicSection from "./components/TopicSection";
import { topics } from "./data/topics";

export default function App() {
  const [activeTopic, setActiveTopic] = useState(topics[0]?.id ?? "");
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <div className="min-h-screen bg-[#f3fafb] text-slate-800">
      <SidebarToggleButton
        label={sidebarOpen ? "Fechar menu lateral" : "Abrir menu lateral"}
        expanded={sidebarOpen}
        controls="topic-sidebar mobile-topic-sidebar"
        className="fixed left-4 top-4 z-[60] shadow-md"
        onClick={() => setSidebarOpen((open) => !open)}
      />

      <div
        className={`mx-auto grid max-w-7xl gap-8 px-5 pb-20 pt-8 sm:px-8 ${
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
            <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-900 sm:text-4xl">
              Ultrassom Terapêutico
            </h1>
            <p className="mx-auto mb-7 max-w-3xl text-base leading-7 text-slate-600">
              Um guia organizado por assunto para entender como o ultrassom
              terapêutico interage com os tecidos, como seus parâmetros são
              definidos e o que as pesquisas mostram sobre seus efeitos.
            </p>

            <div className="mx-auto w-full max-w-2xl">
              <TopicSearch topics={topics} onSelectTopic={setActiveTopic} />
            </div>
          </section>

          <nav
            aria-label="Assuntos principais"
            className="sticky top-0 z-20 -mx-5 border-y border-slate-200 bg-[#f3fafb]/95 px-5 py-3 backdrop-blur sm:-mx-8 sm:px-8"
          >
            <div className="relative mx-auto max-w-7xl">
              <div className="scrollbar-none flex snap-x snap-proximity gap-2 overflow-x-auto pb-1 pl-12 pr-8 lg:justify-center lg:pl-0">
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

          <div className="space-y-7">
            {topics.map((topic, index) => (
              <TopicSection
                key={topic.id}
                id={topic.id}
                title={topic.title}
                summary={topic.summary}
                content={topic.content}
                note={topic.note}
                source={topic.source}
                imageOnLeft={index % 2 === 1}
              />
            ))}
          </div>
          <footer className="mt-10 border-t border-slate-200 pt-6 text-sm leading-6 text-slate-500">
            Conteúdo educativo baseado nos materiais de referência fornecidos.
            Não substitui avaliação fisioterapêutica, protocolo clínico ou
            manual do equipamento.
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
    </div>
  );
}
