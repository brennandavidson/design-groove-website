import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
const { render } = await import('./dist/server/entry-server.js')

const routesToPrerender = fs.readdirSync(toAbsolute('src/pages')).map((file) => {
  const name = file.replace(/\\.jsx$/, '').toLowerCase()
  return name === 'home' ? '/' : `/${name}`
})

// Add dynamic routes or specific manual routes
const routes = [
  '/',
  '/work',
  '/services',
  '/process',
  '/about',
  '/contact',
  '/book',
]

;(async () => {
  for (const url of routes) {
    const context = {}
    const { html, helmet } = render(url, context)

    const appHtml = html
    const helmetHtml = `
      ${helmet.title ? helmet.title.toString() : ''}
      ${helmet.meta ? helmet.meta.toString() : ''}
      ${helmet.link ? helmet.link.toString() : ''}
      ${helmet.script ? helmet.link.toString() : ''}
    `

    const htmlFile = template
      .replace(`<!--app-head-->`, helmetHtml)
      .replace(`<!--app-html-->`, appHtml)

    const filePath = `dist${url === '/' ? '/index.html' : `${url}/index.html`}`
    const dirPath = path.dirname(filePath)
    
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true })
    }
    
    fs.writeFileSync(toAbsolute(filePath), htmlFile)
    console.log('pre-rendered:', filePath)
  }
})()
