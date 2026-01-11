import { createClient } from '@sanity/client'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: '8jhw3vic',
  dataset: 'production',
  useCdn: true, // Enable CDN for faster response times
  apiVersion: '2024-01-01'
})

// Helper for generating image URLs
const builder = createImageUrlBuilder(client)

export function urlFor(source) {
  // Use 'max' fit to prevent upscaling, but allow high-res requests
  // auto('format') converts to WebP/AVIF
  return builder.image(source).auto('format').fit('max')
}

// Special helper for Hero images to ensure max quality
export function urlForHero(source) {
  // force format to webp for better quality/size ratio, quality 90
  return builder.image(source).auto('format').quality(90).fit('max')
}

// Fetch all projects (optionally excluding one ID)
export async function getProjects(excludeId = null) {
  const query = excludeId 
    ? `*[_type == "project" && _id != $excludeId && showInWorkList != false] | order(order asc, year desc) {
        _id,
        title,
        slug,
        category,
        year,
        showInWorkList,
        sliderHoverStatus,
        "image": image.asset->url,
        "hoverVideo": hoverVideo.asset->url,
        "heroImage": heroImage.asset->url,
        "rawImage": image,
        "rawHeroImage": heroImage
      }`
    : `*[_type == "project" && showInWorkList != false] | order(order asc, year desc) {
        _id,
        title,
        slug,
        category,
        year,
        showInWorkList,
        sliderHoverStatus,
        "image": image.asset->url,
        "hoverVideo": hoverVideo.asset->url,
        "heroImage": heroImage.asset->url,
        "rawImage": image,
        "rawHeroImage": heroImage
      }`;
      
  return client.fetch(query, excludeId ? { excludeId } : {});
}

// Fetch single project by slug + related projects
export async function getProjectBySlug(slug) {
  const project = await client.fetch(`
    *[_type == "project" && slug.current == $slug][0] {
      _id,
      title,
      slug,
      category,
      year,
      description,
      link,
      client,
      services,
      challenge,
      solution,
      result,
      content,
      testimonial,
      sliderHoverStatus,
      "image": image.asset->url,
      "hoverVideo": hoverVideo.asset->url,
      "detailHeroImage": detailHeroImage.asset->url,
      "heroImage": heroImage.asset->url,
      "challengeImage": challengeImage.asset->url,
      "solutionImage": solutionImage.asset->url,
      "rawDetailHeroImage": detailHeroImage,
      "rawChallengeImage": challengeImage,
      "rawSolutionImage": solutionImage,
      "rawImage": image
    }
  `, { slug });

  // If project found, fetch related (random 3-5 for now, or just next ones)
  // For simplicity, let's just fetch 2 random other projects
  if (project) {
    const related = await client.fetch(`
      *[_type == "project" && _id != $currentId && showInWorkList != false] | order(_createdAt desc)[0...2] {
        _id,
        title,
        slug,
        category,
        year,
        "image": image.asset->url
      }
    `, { currentId: project._id });
    project.relatedProjects = related;
  }

  return project;
}

// Fetch all testimonials
export async function getTestimonials() {
  return client.fetch(`
    *[_type == "testimonial"] {
      _id,
      quote,
      author,
      role,
      marqueeRow
    }
  `)
}
