import { promises as fs } from 'node:fs'
import path from 'node:path'

const rootDir = process.cwd()
const postsDir = path.join(rootDir, 'src', 'content', 'posts')
const outputDir = path.join(rootDir, 'public', 'og')

const svgWidth = 1200
const svgHeight = 630
const titleMaxChars = 28
const titleMaxLines = 3
const titleFontSize = 64
const titleLineHeight = 72
const paddingX = 80
const titleY = 190
const shouldForce = process.argv.includes('--force')

const escapeXml = (value = '') => {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

const extractFrontmatterValue = (content, key) => {
  const match = content.match(new RegExp(`^${key}:\\s*["']?([^"'\n]+)["']?\\s*$`, 'm'))
  return match ? match[1].trim() : undefined
}

const wrapText = (text, maxChars, maxLines) => {
  const words = text.split(/\s+/).filter(Boolean)
  const lines = []
  let line = ''
  let index = 0

  while (index < words.length && lines.length < maxLines) {
    const word = words[index]
    const candidate = line ? `${line} ${word}` : word

    if (candidate.length <= maxChars) {
      line = candidate
      index += 1
      continue
    }

    if (!line) {
      line = word.slice(0, maxChars)
      index += 1
    }

    lines.push(line)
    line = ''
  }

  if (line && lines.length < maxLines) {
    lines.push(line)
  }

  const hasOverflow = index < words.length
  if (hasOverflow && lines.length > 0) {
    const lastIndex = Math.min(lines.length - 1, maxLines - 1)
    const ellipsis = '...'
    let lastLine = lines[lastIndex]

    if (lastLine.length + ellipsis.length > maxChars) {
      lastLine = lastLine.slice(0, Math.max(0, maxChars - ellipsis.length)).trimEnd()
    }

    lines[lastIndex] = `${lastLine}${ellipsis}`
  }

  return lines
}

const buildSvg = ({ title, readingTime }) => {
  const lines = wrapText(title, titleMaxChars, titleMaxLines)
  const metaParts = []

  if (readingTime) {
    metaParts.push(readingTime)
  }

  metaParts.push('By: Ruben Casas')

  const metaLine = metaParts.join(' | ')

  const titleSpans = lines
    .map((line, index) => {
      const dy = index === 0 ? 0 : titleLineHeight
      return `<tspan x="${paddingX}" dy="${dy}">${escapeXml(line)}</tspan>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="${svgWidth}" height="${svgHeight}" viewBox="0 0 ${svgWidth} ${svgHeight}">
  <defs>
    <linearGradient id="accent" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="#0f172a" />
      <stop offset="100%" stop-color="#334155" />
    </linearGradient>
  </defs>

  <rect width="${svgWidth}" height="${svgHeight}" fill="#ffffff" />
  <circle cx="1040" cy="90" r="260" fill="#f1f5f9" opacity="0.9" />
  <circle cx="140" cy="560" r="240" fill="#e2e8f0" opacity="0.75" />
  <rect x="${paddingX}" y="110" width="220" height="6" rx="3" fill="url(#accent)" />

  <text x="${paddingX}" y="${titleY}" font-size="${titleFontSize}" fill="#0f172a" font-weight="600" font-family="'Fira Code', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace">
    ${titleSpans}
  </text>

  <text x="${paddingX}" y="520" font-size="28" fill="#1f2937" font-family="'Fira Code', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace">
    ${escapeXml(metaLine)}
  </text>

  <text x="1120" y="582" font-size="24" fill="#111827" text-anchor="end" font-family="'Fira Code', 'Fira Mono', 'Menlo', 'Monaco', 'Consolas', 'Courier New', monospace">
    infoxicator.com
  </text>
</svg>
`
}

const files = await fs.readdir(postsDir)
const postFiles = files.filter((file) => file.endsWith('.md'))

await fs.mkdir(outputDir, { recursive: true })

let createdCount = 0
let skippedCount = 0

for (const file of postFiles) {
  const slug = path.basename(file, '.md')
  const outputPath = path.join(outputDir, `${slug}.svg`)

  if (!shouldForce) {
    try {
      await fs.access(outputPath)
      skippedCount += 1
      continue
    } catch (error) {
      // File does not exist yet, continue to generate it.
    }
  }

  const content = await fs.readFile(path.join(postsDir, file), 'utf8')
  const title = extractFrontmatterValue(content, 'title') ?? slug
  const readingTime = extractFrontmatterValue(content, 'readingTime')
  const svg = buildSvg({ title, readingTime })

  await fs.writeFile(outputPath, svg)
  createdCount += 1
}

console.log(`Generated ${createdCount} OG images. Skipped ${skippedCount} existing images.`)
