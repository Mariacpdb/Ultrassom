import { useState } from "react";
import type { Topic } from "../data/topics";

type TopicSearchProps = {
  topics: Topic[];
  onSelectTopic: (topicId: string) => void;
};

function normalizeText(value: string) {
  return value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

export default function TopicSearch({
  topics,
  onSelectTopic,
}: TopicSearchProps) {
  const [query, setQuery] = useState("");
  const normalizedQuery = normalizeText(query.trim());
  const results = normalizedQuery
    ? topics.flatMap((topic) =>
        topic.content
          .filter((section) => {
            const searchableText = [
              topic.label,
              topic.title,
              topic.summary,
              section.heading,
              ...(section.paragraphs ?? []),
              ...(section.points ?? []),
            ]
              .map(normalizeText)
              .join(" ");

            return searchableText.includes(normalizedQuery);
          })
          .map((section) => ({
            topicId: topic.id,
            topicLabel: topic.label,
            sectionId: section.id,
            heading: section.heading,
          })),
      )
    : [];
  const visibleResults = results.slice(0, 8);

  return (
    <div className="relative mb-7 max-w-2xl">
      <label htmlFor="topic-search" className="sr-only">
        Pesquisar nos títulos e no conteúdo
      </label>
      <input
        id="topic-search"
        type="search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        onKeyDown={(event) => {
          if (event.key === "Escape") setQuery("");
        }}
        placeholder="Pesquisar um subtítulo ou assunto..."
        className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 pr-11 text-sm text-slate-800 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-100"
      />
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        className="pointer-events-none absolute right-4 top-3.5 h-5 w-5 text-slate-400"
      >
        <circle cx="10.8" cy="10.8" r="6.3" />
        <path d="m15.5 15.5 4 4" />
      </svg>

      {normalizedQuery && (
        <div
          role="region"
          aria-label="Resultados da pesquisa"
          className="absolute inset-x-0 top-full z-30 mt-2 max-h-80 overflow-y-auto rounded-xl border border-slate-200 bg-white p-2 shadow-lg"
        >
          {visibleResults.length > 0 ? (
            <ul className="space-y-1">
              {visibleResults.map((result) => (
                <li key={result.sectionId}>
                  <a
                    href={`#${result.sectionId}`}
                    onClick={() => {
                      onSelectTopic(result.topicId);
                      setQuery("");
                    }}
                    className="block rounded-lg px-3 py-2.5 hover:bg-emerald-50 focus-visible:bg-emerald-50 focus-visible:outline-none"
                  >
                    <span className="block text-sm font-medium text-slate-800">
                      {result.heading}
                    </span>
                    <span className="mt-0.5 block text-xs text-slate-500">
                      {result.topicLabel}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <p role="status" className="m-0 px-3 py-3 text-sm text-slate-600">
              Nenhum tópico encontrado.
            </p>
          )}
          {results.length > visibleResults.length && (
            <p className="m-0 px-3 py-2 text-xs text-slate-500">
              Mostrando os primeiros {visibleResults.length} resultados.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
