import type { TopicContent } from "../data/topics";

type TopicSectionProps = {
  id: string;
  title: string;
  summary: string;
  content: TopicContent[];
  note?: string;
  source: string;
  imageOnLeft: boolean;
};

export default function TopicSection({
  id,
  title,
  summary,
  content,
  note,
  source,
  imageOnLeft,
}: TopicSectionProps) {
  const textContent = (
    <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
      <h2 className="mb-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl">
        {title}
      </h2>
      <p className="mb-8 max-w-prose text-base leading-7 text-slate-600">
        {summary}
      </p>
      <div className="space-y-8">
        {content.map((section) => (
          <section key={section.id} id={section.id} className="scroll-mt-36">
            <h3 className="mb-3 text-lg font-semibold leading-7 text-slate-800">
              {section.heading}
            </h3>
            {section.paragraphs?.map((paragraph) => (
              <p
                key={paragraph}
                className="mb-3 max-w-prose text-[15px] leading-7 text-slate-600 last:mb-0"
              >
                {paragraph}
              </p>
            ))}
            {section.points && (
              <ul className="list-disc space-y-3 pl-5 text-[15px] leading-7 text-slate-600 marker:text-emerald-600">
                {section.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>
      {note && (
        <aside className="mt-8 rounded-xl border-l-4 border-emerald-500 bg-emerald-50 px-4 py-4 text-[15px] leading-7 text-slate-700">
          {note}
        </aside>
      )}
      <p className="mt-5 text-xs leading-5 text-slate-500">{source}</p>
    </div>
  );

  return (
    <article
      id={id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm"
    >
      <div className="grid md:grid-cols-2">
        <div className={imageOnLeft ? "md:order-2" : ""}>{textContent}</div>
        <div className={imageOnLeft ? "md:order-1" : ""}></div>
      </div>
    </article>
  );
}
