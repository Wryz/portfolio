import type { Project } from '@/lib/projects';

/** Renders text with **bold** segments as <strong> */
export function RichText({ text }: { text: string }) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} style={{ color: 'var(--p-ink)', fontWeight: 700 }}>
            {part.slice(2, -2)}
          </strong>
        ) : (
          part
        ),
      )}
    </>
  );
}

/** The project's outbound links as buttons: the first is the main action. */
export function ProjectLinks({ project, className = '' }: { project: Project; className?: string }) {
  if (project.links.length === 0) return null;
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {project.links.map((link, i) => (
        <a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={i === 0 ? 'p-btn' : 'p-btn p-btn-ghost'}
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}

export function Section({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <section className={`mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20 lg:px-8 ${className}`}>{children}</section>;
}
