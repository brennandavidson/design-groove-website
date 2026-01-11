import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { client } from './src/lib/sanity.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

// Find and read the CSS file for inlining
const cssFileName = fs.readdirSync(toAbsolute('dist/assets')).find(f => f.endsWith('.css'))
const cssContent = cssFileName ? fs.readFileSync(toAbsolute(`dist/assets/${cssFileName}`), 'utf-8') : ''

// Base routes
let routes = [
  '/',
  '/work',
  '/services',
  '/process',
  '/about',
  '/contact',
  '/book',
]

// Store LCP image URLs for homepage preload
let lcpPreloads = []

;(async () => {
  // Fetch dynamic routes and LCP images
  try {
    console.log('Fetching project slugs...')
    const projects = await client.fetch(`*[_type == "project" && showInWorkList != false] | order(order asc, year desc) {
      "slug": slug.current,
      "heroImageId": heroImage.asset._ref,
      "imageId": image.asset._ref
    }`)
    const projectRoutes = projects.map(p => `/work/${p.slug}`)
    routes = [...routes, ...projectRoutes]
    console.log(`Added ${projectRoutes.length} project routes.`)

    // Preload first 3 VerticalSlider images (these are the actual LCP on mobile)
    // VerticalSlider uses heroImage (or image as fallback)
    for (let i = 0; i < Math.min(3, projects.length); i++) {
      const project = projects[i]
      // VerticalSlider prioritizes heroImage, falls back to image
      const imageRef = project.heroImageId || project.imageId
      if (imageRef) {
        const match = imageRef.match(/image-([a-zA-Z0-9]+)-(\d+x\d+)/)
        if (match) {
          const [, id, dimensions] = match
          // Mobile viewport (393px) with 2x DPR = 786px → browser picks 800w from srcSet
          const url = `https://cdn.sanity.io/images/8jhw3vic/production/${id}-${dimensions}.webp?w=800&fm=webp&q=100`
          lcpPreloads.push(url)
          console.log(`LCP preload ${i + 1}:`, url)
        }
      }
    }
  } catch (error) {
    console.error('Failed to fetch project routes:', error)
  }

  // Generate Sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes.map(route => `
  <url>
    <loc>https://designgroove.io${route}</loc>
    <changefreq>${route === '/' ? 'daily' : 'weekly'}</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`).join('')}
</urlset>`

  fs.writeFileSync(toAbsolute('dist/sitemap.xml'), sitemap)
  console.log('Generated sitemap.xml')

  // Prerender pages
  for (const url of routes) {
    const context = {}
    const { html, helmet } = render(url, context)

    const appHtml = html

    // Add LCP preloads for homepage only
    const lcpPreload = (url === '/' && lcpPreloads.length > 0)
      ? lcpPreloads.map(imgUrl => `<link rel="preload" as="image" href="${imgUrl}" fetchpriority="high" />`).join('\n      ')
      : ''

    const helmetHtml = `
      ${helmet.title ? helmet.title.toString() : ''}
      ${helmet.meta ? helmet.meta.toString() : ''}
      ${helmet.link ? helmet.link.toString() : ''}
      ${helmet.script ? helmet.script.toString() : ''}
      ${lcpPreload}
      ${cssContent ? `<style>${cssContent}</style>` : ''}
    `

    const htmlFile = template
      .replace(`<!--app-head-->`, helmetHtml)
      .replace(`<!--app-html-->`, appHtml)
      .replace(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"[^>]*>/, '') // Remove external CSS link

    const filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`
    const dirPath = path.dirname(filePath)
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    
    fs.writeFileSync(toAbsolute(filePath), htmlFile)
    console.log('pre-rendered:', filePath)
  }

  // Generate 404.html
  console.log('Generating 404.html...')
  const context = {}
  // Render a non-existent route to trigger the NotFound component in App.jsx
  const { html, helmet } = render('/404', context) 
  
  const appHtml = html
  const helmetHtml = `
    ${helmet.title ? helmet.title.toString() : ''}
    ${helmet.meta ? helmet.meta.toString() : ''}
    ${helmet.link ? helmet.link.toString() : ''}
    ${helmet.script ? helmet.script.toString() : ''}
    <script>window.__IS_404__ = true;</script>
    ${cssContent ? `<style>${cssContent}</style>` : ''}
  `

  const htmlFile = template
    .replace(`<!--app-head-->`, helmetHtml)
    .replace(`<!--app-html-->`, appHtml)
    .replace(/<link rel="stylesheet"[^>]*href="\/assets\/[^"]+\.css"[^>]*>/, '') // Remove external CSS link

  fs.writeFileSync(toAbsolute('dist/404.html'), htmlFile)
  console.log('pre-rendered: dist/404.html')

})()