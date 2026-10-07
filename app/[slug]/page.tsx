import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProjectPage } from '@/components/project/ProjectPage';
import { getProject, pagedProjects } from '@/lib/projects';

export const dynamicParams = false;

export function generateStaticParams() {
  return pagedProjects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.name} | My Phung`;
  return { title, description: project.tagline, openGraph: { title, description: project.tagline } };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} />;
}
