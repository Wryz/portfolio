'use client';

interface ProjectLink {
  label: string;
  href: string;
}

function getGitHubPath(url: string): string | null {
  const match = url.match(/github\.com\/([^/]+\/[^/?]+)/);
  return match ? match[1] : null;
}

export function GitHubReposEmbed({ repos }: { repos: { label: string; href: string }[] }) {
  return (
    <div
      className="rounded-xl overflow-hidden border"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      <div className="px-3 py-2 border-b flex items-center gap-2" style={{ borderColor: 'var(--border)' }}>
        <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
          <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
        </svg>
        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>GitHub</span>
      </div>
      <div className="divide-y" style={{ borderColor: 'var(--border)' }}>
        {repos.map((repo) => {
          const path = getGitHubPath(repo.href);
          return (
            <a
              key={repo.href}
              href={repo.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 px-3 py-2.5 transition-colors hover:bg-black/5"
              style={{ color: 'var(--text)' }}
            >
              <span className="text-sm font-medium shrink-0">{repo.label}</span>
              <span className="text-xs font-mono truncate flex-1 min-w-0" style={{ color: 'var(--text-muted)' }}>
                {path ?? repo.href}
              </span>
              <svg className="w-4 h-4 shrink-0 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          );
        })}
      </div>
    </div>
  );
}

function getYouTubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([a-zA-Z0-9_-]+)/);
  return match ? `https://www.youtube.com/embed/${match[1]}` : null;
}

export function LinkEmbed({ link }: { link: ProjectLink }) {
  const youtubeEmbed = getYouTubeEmbedUrl(link.href);
  const githubPath = getGitHubPath(link.href);

  // YouTube embed
  if (youtubeEmbed) {
    return (
      <div
        className="rounded-xl overflow-hidden border"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div className="px-3 py-2 border-b text-sm font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
          {link.label}
        </div>
        <div className="relative aspect-video w-full">
          <iframe
            src={youtubeEmbed}
            title={link.label}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="absolute inset-0 w-full h-full"
          />
        </div>
      </div>
    );
  }

  // GitHub — blocks iframe, show window-style card
  if (githubPath) {
    return (
      <a
        href={link.href}
        target="_blank"
        rel="noopener noreferrer"
        className="block rounded-xl overflow-hidden border transition-opacity hover:opacity-90"
        style={{
          borderColor: 'var(--border)',
          backgroundColor: 'var(--bg-card)',
        }}
      >
        <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
          <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{link.label}</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
        </div>
        <div className="p-4 flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-lg flex items-center justify-center"
            style={{ backgroundColor: 'var(--bg-muted)' }}
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-mono truncate" style={{ color: 'var(--text-secondary)' }}>{githubPath}</p>
            <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Click to open repository</p>
          </div>
        </div>
      </a>
    );
  }

  // Website — window-style card (most sites block iframe embedding)
  if (link.href.startsWith('http') && !link.href.includes('#')) {
    try {
      const url = new URL(link.href);
      const displayHost = url.hostname.replace('www.', '');
      return (
        <a
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className="block rounded-xl overflow-hidden border transition-opacity hover:opacity-90"
          style={{
            borderColor: 'var(--border)',
            backgroundColor: 'var(--bg-card)',
          }}
        >
          <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
            <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{link.label}</span>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
          <div className="p-4 flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-muted)' }}
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate" style={{ color: 'var(--text-secondary)' }}>{displayHost}</p>
              <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>Click to open website</p>
            </div>
          </div>
        </a>
      );
    } catch {
      // Invalid URL, fall through to fallback
    }
  }

  // Fallback for placeholder links (#)
  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      className="block rounded-xl overflow-hidden border transition-opacity hover:opacity-90"
      style={{
        borderColor: 'var(--border)',
        backgroundColor: 'var(--bg-card)',
      }}
    >
      <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border)' }}>
        <span className="text-sm font-medium" style={{ color: 'var(--text)' }}>{link.label}</span>
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
        </svg>
      </div>
      <div className="p-4 text-sm" style={{ color: 'var(--text-secondary)' }}>
        {link.href === '#' ? 'Coming soon' : link.href}
      </div>
    </a>
  );
}
