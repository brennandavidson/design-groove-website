import { getProjects } from '@/lib/sanity';

const siteUrl = 'https://designgroove.io';

export default async function sitemap() {
  // Static pages
  const staticPages = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${siteUrl}/work`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/process`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/book`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic project pages from Sanity
  let projectPages = [];
  try {
    const projects = await getProjects();
    if (projects && projects.length > 0) {
      projectPages = projects
        .filter(project => project.slug?.current)
        .map((project) => ({
          url: `${siteUrl}/work/${project.slug.current}`,
          lastModified: project._updatedAt ? new Date(project._updatedAt) : new Date(),
          changeFrequency: 'monthly',
          priority: 0.7,
        }));
    }
  } catch (error) {
    console.error('Error fetching projects for sitemap:', error);
  }

  return [...staticPages, ...projectPages];
}
