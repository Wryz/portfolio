import {
  Space_Grotesk,
  DM_Sans,
  Merienda,
  Inter,
  Caveat,
  Fredoka,
  DynaPuff,
  Lato,
  IBM_Plex_Mono,
  IBM_Plex_Sans,
  Chakra_Petch,
  Pixelify_Sans,
} from 'next/font/google';

/* Site fonts */
const heading = Space_Grotesk({ variable: '--font-heading', subsets: ['latin'], weight: ['400', '500', '600', '700'] });
const body = DM_Sans({ variable: '--font-body', subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

/* Project fonts. Each project page is set in the typefaces its own product uses.
   None are preloaded: the browser only downloads a face when a page renders text in it. */
const merienda = Merienda({ variable: '--font-merienda', subsets: ['latin'], weight: ['400', '700'], preload: false });
const inter = Inter({ variable: '--font-inter', subsets: ['latin'], weight: ['400', '500', '600'], preload: false });
const caveat = Caveat({ variable: '--font-caveat', subsets: ['latin'], weight: ['600'], preload: false });
const fredoka = Fredoka({ variable: '--font-fredoka', subsets: ['latin'], weight: ['400', '500', '600', '700'], preload: false });
const dynaPuff = DynaPuff({ variable: '--font-dynapuff', subsets: ['latin'], weight: ['400', '600', '700'], preload: false });
const lato = Lato({ variable: '--font-lato', subsets: ['latin'], weight: ['400', '700'], preload: false });
const plexMono = IBM_Plex_Mono({ variable: '--font-plex-mono', subsets: ['latin'], weight: ['400', '500', '600'], preload: false });
const plexSans = IBM_Plex_Sans({ variable: '--font-plex-sans', subsets: ['latin'], weight: ['400', '500', '600'], preload: false });
const chakra = Chakra_Petch({ variable: '--font-chakra', subsets: ['latin'], weight: ['400', '500', '600', '700'], preload: false });
const pixelify = Pixelify_Sans({ variable: '--font-pixelify', subsets: ['latin'], weight: ['400', '600', '700'], preload: false });

export const fontVariables = [
  heading, body, merienda, inter, caveat, fredoka, dynaPuff, lato, plexMono, plexSans, chakra, pixelify,
]
  .map((f) => f.variable)
  .join(' ');
