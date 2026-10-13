import type { Metadata } from 'next';
import { SectionPage } from '@/components/SectionPage';

export const metadata: Metadata = {
  title: 'Websites | My Phung',
  description: 'Websites designed, built and run by My Phung.',
};

export default function Page() {
  return <SectionPage slug="websites" />;
}
