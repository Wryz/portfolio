export type RevealSection = 'hero' | 'skills';

export interface RevealItem {
  section: RevealSection;
  content: string;
  globalIndex: number;
}

export const revealItems: RevealItem[] = [
  { section: 'hero', content: "UConn '24 — BS Economics, CS Minor", globalIndex: 0 },
  { section: 'skills', content: 'Blender', globalIndex: 1 },
  { section: 'skills', content: 'Google Analytics', globalIndex: 2 },
  { section: 'skills', content: 'Photoshop', globalIndex: 3 },
];

export function getItemsForSection(section: RevealSection): RevealItem[] {
  return revealItems.filter((item) => item.section === section);
}
