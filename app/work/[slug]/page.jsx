import ProjectDetail from '@/pages/ProjectDetail';
import { getProjectBySlug } from '@/lib/sanity';

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  return {
    title: project.title,
    description: project.description || `${project.title} - A ${project.category} project by Design Groove.`,
    openGraph: {
      title: `${project.title} | Design Groove`,
      description: project.description || `${project.title} - A ${project.category} project by Design Groove.`,
      url: `https://designgroove.io/work/${slug}`,
      images: project.heroImage || project.image ? [
        {
          url: project.heroImage || project.image,
          width: 1200,
          height: 630,
          alt: project.title,
        },
      ] : [],
    },
  };
}

export default function ProjectPage() {
  return <ProjectDetail />;
}
