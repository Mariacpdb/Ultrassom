import type { Topic } from "../data/topics";

type TopicSidebarProps = {
  topics: Topic[];
  activeTopicId: string;
  onNavigate: (topicId: string) => void;
};

export default function TopicSidebar({
  topics,
  activeTopicId,
  onNavigate,
}: TopicSidebarProps) {
  return (
    <nav aria-label="Menu de conteúdo" className="space-y-5">
      {topics.map((topic) => (
        <div key={topic.id}>
          <a
            href={`#${topic.id}`}
            onClick={() => onNavigate(topic.id)}
            aria-current={activeTopicId === topic.id ? "location" : undefined}
            className={`block rounded-lg px-3 py-2 text-sm font-semibold ${
              activeTopicId === topic.id
                ? "bg-emerald-50 text-emerald-800"
                : "text-slate-800 hover:bg-slate-50"
            }`}
          >
            {topic.label}
          </a>
          <ul className="mt-1 space-y-0.5 border-l border-slate-200 pl-3">
            {topic.content.map((section) => (
              <li key={section.id}>
                <a
                  href={`#${section.id}`}
                  onClick={() => onNavigate(topic.id)}
                  className="block rounded-md px-3 py-1.5 text-xs leading-5 text-slate-600 hover:bg-slate-50 hover:text-emerald-800"
                >
                  {section.heading}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}
