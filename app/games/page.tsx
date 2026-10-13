import type { Metadata } from 'next';
import { SectionPage } from '@/components/SectionPage';

export const metadata: Metadata = {
  title: 'Games | My Phung',
  description: 'Games by My Phung, free to play in your browser.',
};

export default function Page() {
  return <SectionPage slug="games" />;
}
