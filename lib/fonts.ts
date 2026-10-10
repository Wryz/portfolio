import {
  Space_Grotesk,
  DM_Sans,
  Inter,
  Caveat,
  Fredoka,
  DynaPuff,
  Lato,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Chakra_Petch,
  Pixelify_Sans,
  Young_Serif,
  Figtree,
} from 'next/font/google';
import localFont from 'next/font/local';

/* Site fonts */
const heading = Space_Grotesk({ variable: '--font-heading', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const body = DM_Sans({ variable: '--font-body', subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

/* Project fonts. Each project page is set in the typefaces its own product uses.
   None are preloaded: the browser only downloads a face when a page renders text in it. */
/* Merienda is bundled (app/fonts, SIL Open Font License) rather than fetched: Turbopack cannot
   resolve the URLs Google Fonts serves for it ("next/font/google queries have exactly one entry"). */
const merienda = localFont({
  variable: '--font-merienda',
  preload: false,
  src: [
    { path: '../app/fonts/Merienda-Regular.woff2', weight: '400', style: 'normal' },
    { path: '../app/fonts/Merienda-Bold.woff2', weight: '700', style: 'normal' },
  ],
});
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], weight: ['400', '500', '600'], preload: false });
const caveat = Caveat({ variable: '--font-caveat', subsets: ['latin'], weight: ['600'], preload: false });
const fredoka = Fredoka({ variable: '--font-fredoka', subsets: ['latin'], weight: ['400', '500', '600', '700'], preload: false });
const dynaPuff = DynaPuff({ variable: '--font-dynapuff', subsets: ['latin'], weight: ['400', '600', '700'], preload: false });
const lato = Lato({ variable: '--font-lato', subsets: ['latin'], weight: ['400', '700'], preload: false });
const plexMono = IBM_Plex_Mono({ variable: '--font-plex-mono', subsets: ['latin'], weight: ['400', '500', '600'], preload: false });
const plexSans = IBM_Plex_Sans({ variable: '--font-plex-sans', subsets: ['latin'], weight: ['400', '500', '600'], preload: false });
const chakra = Chakra_Petch({ variable: '--font-chakra', subsets: ['latin'], weight: ['400', '500', '600', '700'], preload: false });
const pixelify = Pixelify_Sans({ variable: '--font-pixelify', subsets: ['latin'], weight: ['400', '600', '700'], preload: false });
const youngSerif = Young_Serif({ variable: '--font-young-serif', subsets: ['latin'], weight: ['400'], preload: false });
const figtree = Figtree({ variable: '--font-figtree', subsets: ['latin'], weight: ['400', '500', '600', '700'], preload: false });

export const fontVariables = [
  heading, body, merienda, inter, caveat, fredoka, dynaPuff, lato, plexMono, plexSans, chakra, pixelify, youngSerif, figtree,
]
  .map((f) => f.variable)
  .join(' ');
