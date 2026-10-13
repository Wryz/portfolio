import type { Metadata } from 'next';
import { SectionPage } from '@/components/SectionPage';

export const metadata: Metadata = {
  title: 'Apps | My Phung',
  description: 'Apps by My Phung for iPhone and Chrome, and the app that drives a robot.',
};

export default function Page() {
  return <SectionPage slug="apps" />;
}
