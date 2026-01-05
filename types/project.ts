export type Discipline = 'Software' | 'Hardware' | 'Events';

export interface Project {
  id: string;
  title: string;
  date: string;
  discipline: Discipline;
  thumbnail: string;
  content: {
    paragraphs: string[];
    videos?: string[];
    images?: string[];
  };
}

