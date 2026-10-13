import Image from 'next/image';
import Link from 'next/link';
import { getProject, sections } from '@/lib/projects';
import { SiteNav } from '../SiteNav';
import { Footer } from '../Footer';
import { figures } from '../project/pages/AustinFounders';
import { AiRankBadge, AiRankCard } from './AiRank';

/* Photos from the community's gallery, arranged as a collage */
const collage = [
  { src: '/projects/austin-founders/gallery/05.webp', alt: 'A packed meetup at Capital Factory', className: 'col-span-2 row-span-2' },
  { src: '/projects/austin-founders/gallery/03.webp', alt: 'Three founders at a meetup', className: '' },
  { src: '/projects/austin-founders/gallery/08.webp', alt: 'Founders on laptops in a café', className: '' },
  { src: '/projects/austin-founders/gallery/14.webp', alt: 'A talk on stage at Capital Factory', className: '' },
  { src: '/projects/austin-founders/gallery/15.webp', alt: 'Founders talking on a patio', className: '' },
];

/** /communities: the communities I run, led by Austin Founders Community. */
export function CommunitiesPage() {
  const section = sections.find((s) => s.slug === 'communities')!;
  const afc = getProject('austin-founders')!;
  const site = afc.links[0];

  return (
    <>
      <SiteNav />
      <main className="mx-auto min-h-[70vh] max-w-6xl px-4 pb-24 pt-14 sm:px-6 sm:pt-20 lg:px-8">
        <h1 className="mb-2 text-4xl font-bold sm:text-5xl" style={{ color: 'var(--text)' }}>
          {section.title}
        </h1>
        <div className="mb-5 h-1 w-16 rounded-full" style={{ backgroundColor: '#D4834A' }} />
        <p className="mb-12 max-w-xl text-base sm:text-lg" style={{ color: 'var(--text-secondary)' }}>
          {section.intro}
        </p>

        <article
          className="grid overflow-hidden rounded-3xl lg:grid-cols-[1.1fr_1fr]"
          style={{ backgroundColor: '#222222', color: '#FFFFFF', border: '1px solid #424242' }}
        >
          <div className="grid aspect-[4/3] grid-cols-3 grid-rows-2 gap-1 lg:aspect-auto">
            {collage.map((p) => (
              <div key={p.src} className={`relative min-h-0 overflow-hidden ${p.className}`}>
                <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 400px, 66vw" className="object-cover" />
              </div>
            ))}
          </div>

          <div className="p-6 sm:p-10" style={{ fontFamily: 'var(--font-lato), ui-sans-serif, system-ui, sans-serif' }}>
            <Image src="/projects/austin-founders/logo.webp" alt="" width={144} height={144} className="h-14 w-14" />
            <AiRankBadge className="mt-5" />
            <h2 className="mt-4 text-3xl leading-tight sm:text-4xl" style={{ fontFamily: 'var(--font-merienda), ui-serif, Georgia, serif', fontWeight: 700 }}>
              {afc.name}
            </h2>
            <div className="mt-4 h-1 w-28 rounded-full" style={{ background: 'linear-gradient(to right, #BF5700, #4A90A4, #F25C54)' }} aria-hidden />
            <p className="mt-4 text-lg leading-relaxed" style={{ color: 'rgba(255,255,255,0.85)' }}>
              {afc.tile.blurb}
            </p>
            <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4">
              {figures.map((f) => (
                <div key={f.label} className="flex flex-col-reverse">
                  <dt className="text-sm" style={{ color: '#AFAFAF' }}>{f.label}</dt>
                  <dd className="text-2xl font-bold sm:text-3xl">{f.value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/austin-founders" className="rounded-md px-5 py-3 font-bold" style={{ backgroundColor: '#BF5700', color: '#FFFFFF' }}>
                Inside the community
              </Link>
              <Link href="/austin-founders#gallery" className="rounded-md px-5 py-3 font-bold" style={{ border: '1px solid #5A5A5A' }}>
                Photos
              </Link>
              <a href={site.href} target="_blank" rel="noopener noreferrer" className="rounded-md px-5 py-3 font-bold" style={{ border: '1px solid #5A5A5A' }}>
                Visit the site ↗
              </a>
            </div>
          </div>
        </article>

        <div className="mt-8">
          <AiRankCard />
        </div>
      </main>
      <Footer />
    </>
  );
}
