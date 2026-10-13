import type { Metadata } from 'next';
import { CommunitiesPage } from '@/components/community/CommunitiesPage';

export const metadata: Metadata = {
  title: 'Communities | My Phung',
  description: 'Communities My Phung founded and runs, including Austin Founders Community.',
};

export default function Page() {
  return <CommunitiesPage />;
}
