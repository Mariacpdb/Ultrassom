import { Fragment, type ReactNode } from "react";
import type {
  TopicContent,
  TopicReference,
  TopicResource,
  TopicSelfCheck,
  TopicVisual,
} from "../data/topics";
import type { SavedHighlight, TextScale } from "../lib/highlights";
import UltrasoundLearningVisual from "./UltrasoundLearningVisual";

type TopicSectionProps = {
  id: string;
  title: string;
  summary: string;
  content: TopicContent[];
  note?: string;
  references: TopicReference[];
  resources?: TopicResource[];
  visual?: TopicVisual;
  selfChecks?: TopicSelfCheck[];
  imageOnLeft: boolean;
  highlights: SavedHighlight[];
  textScale: TextScale;
  onDeleteHighlight: (id: string) => void;
};

function renderMarkedText(
  text: string,
  blockId: string,
  highlights: SavedHighlight[],
  onDeleteHighlight: (id: string) => void
): ReactNode {
  const matches = highlights
    .filter((highlight) => highlight.block_id === blockId)
    .map((highlight) => {
      let startOffset = highlight.start_offset;
      let endOffset = highlight.end_offset;

      if (
        startOffset < 0 ||
        endOffset > text.length ||
        startOffset >= endOffset ||
        text.slice(startOffset, endOffset) !== highlight.selected_text
      ) {
        startOffset = text.indexOf(highlight.selected_text);
        if (
          startOffset < 0 ||
          text.indexOf(
            highlight.selected_text,
            startOffset + highlight.selected_text.length
          ) !== -1
        ) {
          return null;
        }
        endOffset = startOffset + highlight.selected_text.length;
      }

      return { highlight, startOffset, endOffset };
    })
    .filter(
      (
        match
      ): match is {
        highlight: SavedHighlight;
        startOffset: number;
        endOffset: number;
      } => match !== null
    )
    .sort((a, b) => a.startOffset - b.startOffset);

  if (matches.length === 0) return text;

  const parts: ReactNode[] = [];
  let cursor = 0;

  for (const match of matches) {
    if (match.startOffset < cursor) continue;

    if (match.startOffset > cursor) {
      parts.push(
        <Fragment key={`text-${cursor}`}>
          {text.slice(cursor, match.startOffset)}
        </Fragment>
      );
    }

    parts.push(
      <mark
        key={match.highlight.id}
        role="button"
        tabIndex={0}
        aria-pressed="true"
        aria-label={`Remover destaque: ${match.highlight.selected_text}`}
        title="Clique para remover este destaque"
        onClick={() => onDeleteHighlight(match.highlight.id)}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            onDeleteHighlight(match.highlight.id);
          }
        }}
        className="cursor-pointer rounded-sm bg-yellow-300 px-0.5 text-slate-950 hover:bg-yellow-400 focus-visible:outline"
      >
        {text.slice(match.startOffset, match.endOffset)}
      </mark>
    );
    cursor = match.endOffset;
  }

  if (cursor < text.length) {
    parts.push(
      <Fragment key={`text-${cursor}`}>{text.slice(cursor)}</Fragment>
    );
  }

  return parts;
}

export default function TopicSection({
  id,
  title,
  summary,
  content,
  note,
  references,
  resources,
  visual,
  selfChecks,
  imageOnLeft,
  highlights,
  textScale,
  onDeleteHighlight,
}: TopicSectionProps) {
  const subheadingSize = {
    normal: "text-lg",
    large: "text-xl",
    larger: "text-2xl",
  }[textScale];
  const textContent = (
    <div className="flow-root p-6 sm:p-8 lg:p-10">
      <h2 className="mb-3 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">
        {title}
      </h2>
      <p
        id={`${id}--summary`}
        data-highlight-block-id={`${id}--summary`}
        className={`mb-8 ${visual ? "max-w-prose" : "max-w-none"} text-slate-700`}
      >
        {renderMarkedText(
          summary,
          `${id}--summary`,
          highlights,
          onDeleteHighlight
        )}
      </p>
      {visual && (
        <aside
          className={`mb-6 md:mb-8 md:w-[44%] lg:w-[42%] ${
            imageOnLeft ? "md:float-left md:mr-8" : "md:float-right md:ml-8"
          }`}
        >
          <UltrasoundLearningVisual visual={visual} />
        </aside>
      )}
      <div className="space-y-8">
        {content.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-36">
            <h3
              className={`mb-3 font-semibold leading-7 text-slate-900 ${subheadingSize}`}
            >
              {section.heading}
            </h3>
            {section.paragraphs?.map((paragraph, index) => {
              const blockId = `${id}--${section.id}--p-${index}`;

              return (
                <p
                  key={blockId}
                  id={blockId}
                  data-highlight-block-id={blockId}
                  className="mb-3 max-w-none text-slate-700 last:mb-0"
                >
                  {renderMarkedText(
                    paragraph,
                    blockId,
                    highlights,
                    onDeleteHighlight
                  )}
                </p>
              );
            })}
            {section.points && (
              <ul
                className="list-disc space-y-3 pl-5 text-slate-700 marker:text-emerald-700"
              >
                {section.points.map((point, index) => {
                  const blockId = `${id}--${section.id}--li-${index}`;

                  return (
                    <li
                      key={blockId}
                      id={blockId}
                      data-highlight-block-id={blockId}
                    >
                      {renderMarkedText(
                        point,
                        blockId,
                        highlights,
                        onDeleteHighlight
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </section>
        ))}
      </div>
      {note && (
        <aside
          className="clear-both mt-8 rounded-xl border-l-4 border-emerald-600 bg-emerald-50 px-4 py-4 text-slate-800"
        >
          {note}
        </aside>
      )}
      {selfChecks && selfChecks.length > 0 && (
        <section
          aria-labelledby={`${id}-self-check-title`}
          className="clear-both mt-6 rounded-xl border border-sky-200 bg-sky-50 p-4"
        >
          <h3
            id={`${id}-self-check-title`}
            className="text-lg font-semibold text-slate-950"
          >
            Pratique o raciocínio clínico
          </h3>
          <ol className="mt-3 space-y-4">
            {selfChecks.map((selfCheck, index) => (
              <li
                key={`${id}-self-check-${index}`}
                className="rounded-lg border border-sky-100 bg-white p-3"
              >
                <p className="text-slate-900">
                  <strong className="mr-1">
                    Pergunta {index + 1} -
                  </strong>
                  {selfCheck.question}
                </p>
                <details className="mt-2">
                  <summary className="cursor-pointer font-semibold text-sky-900 underline underline-offset-2">
                    Revelar resposta comentada
                  </summary>
                  <p className="mb-0 mt-2 text-slate-800">
                    <strong>Resposta:</strong> {selfCheck.answer}
                  </p>
                </details>
              </li>
            ))}
          </ol>
        </section>
      )}
      {resources && resources.length > 0 && (
        <section
          aria-labelledby={`${id}-resources-title`}
          className="clear-both mt-6 rounded-xl border border-indigo-200 bg-indigo-50 p-4"
        >
          <h3
            id={`${id}-resources-title`}
            className="mb-2 text-base font-semibold text-slate-950"
          >
            Recurso complementar
          </h3>
          <ul className="space-y-3">
            {resources.map((resource) => (
              <li key={resource.href}>
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold text-indigo-900 underline underline-offset-2 hover:text-indigo-700"
                >
                  {resource.title}
                </a>
                <p className="mb-0 mt-1 text-slate-700">
                  {resource.description}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}
      {references.length > 0 && (
        <details className="clear-both mt-6 rounded-xl border border-slate-200 bg-white p-4">
          <summary className="cursor-pointer font-semibold text-slate-900">
            Referências ({references.length})
          </summary>
          <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-6 text-slate-700 marker:text-emerald-700">
            {references.map((reference) => (
              <li key={reference.href}>
                <a
                  href={reference.href}
                  target="_blank"
                  rel="noreferrer"
                  className="underline decoration-emerald-700 underline-offset-2 hover:text-emerald-900"
                >
                  {reference.citation}
                </a>
              </li>
            ))}
          </ul>
        </details>
      )}
    </div>
  );

  return (
    <article
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      {textContent}
    </article>
  );
}
