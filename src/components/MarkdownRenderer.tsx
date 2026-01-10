import * as React from 'react'
import { codeToHtml } from 'shiki'

interface MarkdownRendererProps {
  content: string
}

export function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const [elements, setElements] = React.useState<React.ReactNode[]>(() =>
    parseContentSync(content)
  )

  React.useEffect(() => {
    let cancelled = false
    parseContent(content).then((parsed) => {
      if (!cancelled) {
        setElements(parsed)
      }
    })
    return () => {
      cancelled = true
    }
  }, [content])

  return <div>{elements}</div>
}

function looksLikeHtml(content: string): boolean {
  const hasHtml =
    /<(p|h1|h2|h3|ul|ol|blockquote|figure|pre|img|a|iframe|code|strong|em|s|br)\b/i.test(
      content
    )
  const hasMarkdown = /(^|\n)\s*(#{1,6}\s|```|[-*]\s|\d+\.\s|!\[|\[.+\]\(.+\))/m.test(
    content
  )
  return hasHtml && !hasMarkdown
}

async function parseContent(content: string): Promise<React.ReactNode[]> {
  if (looksLikeHtml(content)) {
    return parseHtml(content)
  }
  return parseMarkdown(content)
}

function parseContentSync(content: string): React.ReactNode[] {
  if (looksLikeHtml(content)) {
    return [
      <div
        key="html"
        dangerouslySetInnerHTML={{ __html: content }}
      />
    ]
  }
  return parseMarkdownSync(content)
}

function parseMarkdownSync(content: string): React.ReactNode[] {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent: string[] = []
  let codeLanguage = ''
  let blockStartIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim() || 'text'
        codeContent = []
        blockStartIndex = i
      } else {
        const code = codeContent.join('\n')
        const highlighted = highlightCodeSync(code)
        elements.push(
          <div
            key={blockStartIndex}
            className="my-4 rounded border border-theme overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-tertiary border-b border-theme">
              <span className="text-xs text-muted font-medium uppercase">{codeLanguage}</span>
            </div>
            <div
              className="p-4 overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )
        inCodeBlock = false
        codeContent = []
        codeLanguage = ''
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    if (!line.trim()) {
      continue
    }

    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
      elements.push(
        <div
          key={`html-${i}`}
          dangerouslySetInnerHTML={{ __html: trimmedLine }}
        />
      )
      continue
    }

    const twitterMatch = line.match(/^\{%\s*twitter\s+(\d+)\s*%\}$/)
    if (twitterMatch) {
      const tweetId = twitterMatch[1]
      elements.push(<TwitterEmbed key={i} tweetId={tweetId} />)
      continue
    }

    const youtubeMatch = line.match(/^\{%\s*youtube\s+(.+?)\s*%\}$/)
    if (youtubeMatch) {
      const embedUrl = buildYouTubeEmbedUrl(youtubeMatch[1])
      if (embedUrl) {
        elements.push(
          <div key={i} className="my-6 w-full overflow-hidden rounded border border-theme">
            <iframe
              src={embedUrl}
              width="100%"
              height="375"
              title="YouTube video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        )
        continue
      }
    }

    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      const [, alt, src] = imageMatch
      elements.push(
        <figure key={i} className="my-6">
          <img
            src={src}
            alt={alt}
            className="rounded border border-theme max-w-full"
            loading="lazy"
          />
          {alt && (
            <figcaption className="text-sm text-muted mt-2 text-center">
              {alt}
            </figcaption>
          )}
        </figure>
      )
      continue
    }

    if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-accent pl-4 my-4 italic text-secondary"
        >
          {renderInlineElements(line.slice(2))}
        </blockquote>
      )
      continue
    }

    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold text-primary mt-8 mb-4">
          {line.slice(2)}
        </h1>
      )
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-semibold text-primary mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
      continue
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-medium text-primary mt-6 mb-2">
          {line.slice(4)}
        </h3>
      )
      continue
    }

    if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="text-secondary ml-4 my-1 list-disc">
          {renderInlineElements(line.slice(2))}
        </li>
      )
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '')
      elements.push(
        <li key={i} className="text-secondary ml-4 my-1 list-decimal">
          {renderInlineElements(text)}
        </li>
      )
      continue
    }

    elements.push(
      <p key={i} className="text-secondary my-4 leading-relaxed">
        {renderInlineElements(line)}
      </p>
    )
  }

  return elements
}

async function parseMarkdown(content: string): Promise<React.ReactNode[]> {
  const lines = content.trim().split('\n')
  const elements: React.ReactNode[] = []
  let inCodeBlock = false
  let codeContent: string[] = []
  let codeLanguage = ''
  let blockStartIndex = 0

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]

    // Handle code blocks
    if (line.startsWith('```')) {
      if (!inCodeBlock) {
        inCodeBlock = true
        codeLanguage = line.slice(3).trim() || 'text'
        codeContent = []
        blockStartIndex = i
      } else {
        const code = codeContent.join('\n')
        const highlighted = await highlightCode(code, codeLanguage)
        elements.push(
          <div
            key={blockStartIndex}
            className="my-4 rounded border border-theme overflow-hidden"
          >
            <div className="flex items-center justify-between px-4 py-2 bg-tertiary border-b border-theme">
              <span className="text-xs text-muted font-medium uppercase">{codeLanguage}</span>
            </div>
            <div
              className="p-4 overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0"
              dangerouslySetInnerHTML={{ __html: highlighted }}
            />
          </div>
        )
        inCodeBlock = false
        codeContent = []
        codeLanguage = ''
      }
      continue
    }

    if (inCodeBlock) {
      codeContent.push(line)
      continue
    }

    // Skip empty lines
    if (!line.trim()) {
      continue
    }

    const trimmedLine = line.trim()
    if (trimmedLine.startsWith('<') && trimmedLine.endsWith('>')) {
      const htmlElements = await parseHtmlFragment(trimmedLine, `html-${i}`)
      elements.push(...htmlElements)
      continue
    }

    // Handle Twitter/X embeds: {% twitter 1234567890 %}
    const twitterMatch = line.match(/^\{%\s*twitter\s+(\d+)\s*%\}$/)
    if (twitterMatch) {
      const tweetId = twitterMatch[1]
      elements.push(<TwitterEmbed key={i} tweetId={tweetId} />)
      continue
    }

    // Handle YouTube embeds: {% youtube https://www.youtube.com/watch?v=... %}
    const youtubeMatch = line.match(/^\{%\s*youtube\s+(.+?)\s*%\}$/)
    if (youtubeMatch) {
      const embedUrl = buildYouTubeEmbedUrl(youtubeMatch[1])
      if (embedUrl) {
        elements.push(
          <div key={i} className="my-6 w-full overflow-hidden rounded border border-theme">
            <iframe
              src={embedUrl}
              width="100%"
              height="375"
              title="YouTube video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full"
            />
          </div>
        )
        continue
      }
    }

    // Handle images: ![alt](url)
    const imageMatch = line.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      const [, alt, src] = imageMatch
      elements.push(
        <figure key={i} className="my-6">
          <img
            src={src}
            alt={alt}
            className="rounded border border-theme max-w-full"
            loading="lazy"
          />
          {alt && (
            <figcaption className="text-sm text-muted mt-2 text-center">
              {alt}
            </figcaption>
          )}
        </figure>
      )
      continue
    }

    // Handle blockquotes
    if (line.startsWith('> ')) {
      elements.push(
        <blockquote
          key={i}
          className="border-l-4 border-accent pl-4 my-4 italic text-secondary"
        >
          {renderInlineElements(line.slice(2))}
        </blockquote>
      )
      continue
    }

    // Handle headings
    if (line.startsWith('# ')) {
      elements.push(
        <h1 key={i} className="text-2xl font-bold text-primary mt-8 mb-4">
          {line.slice(2)}
        </h1>
      )
      continue
    }

    if (line.startsWith('## ')) {
      elements.push(
        <h2 key={i} className="text-xl font-semibold text-primary mt-8 mb-3">
          {line.slice(3)}
        </h2>
      )
      continue
    }

    if (line.startsWith('### ')) {
      elements.push(
        <h3 key={i} className="text-lg font-medium text-primary mt-6 mb-2">
          {line.slice(4)}
        </h3>
      )
      continue
    }

    // Handle list items
    if (line.startsWith('- ')) {
      elements.push(
        <li key={i} className="text-secondary ml-4 my-1 list-disc">
          {renderInlineElements(line.slice(2))}
        </li>
      )
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const text = line.replace(/^\d+\.\s/, '')
      elements.push(
        <li key={i} className="text-secondary ml-4 my-1 list-decimal">
          {renderInlineElements(text)}
        </li>
      )
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-secondary my-4 leading-relaxed">
        {renderInlineElements(line)}
      </p>
    )
  }

  return elements
}

async function parseHtml(content: string): Promise<React.ReactNode[]> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  return renderHtmlNodes(Array.from(doc.body.childNodes), 'html')
}

async function parseHtmlFragment(
  content: string,
  keyPrefix: string
): Promise<React.ReactNode[]> {
  const parser = new DOMParser()
  const doc = parser.parseFromString(content, 'text/html')
  return renderHtmlNodes(Array.from(doc.body.childNodes), keyPrefix)
}

async function renderHtmlNodes(
  nodes: ChildNode[],
  keyPrefix: string
): Promise<React.ReactNode[]> {
  const elements: React.ReactNode[] = []
  let index = 0

  for (const node of nodes) {
    const rendered = await renderHtmlNode(node, `${keyPrefix}-${index}`)
    index += 1
    if (rendered === null || rendered === undefined) {
      continue
    }
    elements.push(rendered)
  }

  return elements
}

async function renderHtmlNode(
  node: ChildNode,
  key: string
): Promise<React.ReactNode | null> {
  if (node.nodeType === Node.TEXT_NODE) {
    const text = node.textContent ?? ''
    if (!text.trim()) {
      return null
    }
    return text
  }

  if (node.nodeType !== Node.ELEMENT_NODE) {
    return null
  }

  const element = node as HTMLElement
  const tag = element.tagName.toLowerCase()

  switch (tag) {
    case 'p': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <p key={key} className="text-secondary my-4 leading-relaxed">
          {children}
        </p>
      )
    }
    case 'h1':
      return (
        <h1
          key={key}
          id={element.getAttribute('id') || undefined}
          className="text-2xl font-bold text-primary mt-8 mb-4"
        >
          {element.textContent?.trim()}
        </h1>
      )
    case 'h2':
      return (
        <h2
          key={key}
          id={element.getAttribute('id') || undefined}
          className="text-xl font-semibold text-primary mt-8 mb-3"
        >
          {element.textContent?.trim()}
        </h2>
      )
    case 'h3':
      return (
        <h3
          key={key}
          id={element.getAttribute('id') || undefined}
          className="text-lg font-medium text-primary mt-6 mb-2"
        >
          {element.textContent?.trim()}
        </h3>
      )
    case 'ul': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <ul key={key} className="my-4 pl-5 list-disc space-y-1 text-secondary">
          {children}
        </ul>
      )
    }
    case 'ol': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <ol key={key} className="my-4 pl-5 list-decimal space-y-1 text-secondary">
          {children}
        </ol>
      )
    }
    case 'li': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <li key={key} className="text-secondary">
          {children}
        </li>
      )
    }
    case 'blockquote': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <blockquote
          key={key}
          className="border-l-4 border-accent pl-4 my-4 italic text-secondary"
        >
          {children}
        </blockquote>
      )
    }
    case 'cite': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <cite key={key} className="block text-sm text-muted mt-2">
          {children}
        </cite>
      )
    }
    case 'figure': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (children.length === 0) {
        return null
      }
      return (
        <figure key={key} className="my-6">
          {children}
        </figure>
      )
    }
    case 'img': {
      const src = element.getAttribute('src') || ''
      if (!src) {
        return null
      }
      const alt = element.getAttribute('alt') || ''
      return (
        <img
          key={key}
          src={src}
          alt={alt}
          className="rounded border border-theme max-w-full"
          loading="lazy"
        />
      )
    }
    case 'a': {
      const rawHref = element.getAttribute('href') || ''
      const href = rawHref.trim()
      const target = element.getAttribute('target') || undefined
      const rel = element.getAttribute('rel') || (target === '_blank' ? 'noreferrer noopener' : undefined)
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      if (!href) {
        return children.length ? <span key={key}>{children}</span> : null
      }
      return (
        <a key={key} href={href} target={target} rel={rel} className="text-accent hover:underline">
          {children.length ? children : href}
        </a>
      )
    }
    case 'pre': {
      const codeElement = element.querySelector('code')
      const code = codeElement?.textContent ?? element.textContent ?? ''
      const className = codeElement?.getAttribute('class') || element.getAttribute('class') || ''
      const langMatch = className.match(/language-([a-z0-9-]+)/i)
      const codeLanguage = langMatch ? langMatch[1] : 'text'
      const highlighted = await highlightCode(code, codeLanguage)
      return (
        <div key={key} className="my-4 rounded border border-theme overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2 bg-tertiary border-b border-theme">
            <span className="text-xs text-muted font-medium uppercase">{codeLanguage}</span>
          </div>
          <div
            className="p-4 overflow-x-auto text-sm [&_pre]:!bg-transparent [&_pre]:!m-0 [&_pre]:!p-0"
            dangerouslySetInnerHTML={{ __html: highlighted }}
          />
        </div>
      )
    }
    case 'iframe': {
      const src = element.getAttribute('src') || ''
      if (!src) {
        return null
      }
      const width = element.getAttribute('width') || '100%'
      const height = element.getAttribute('height') || undefined
      const title = element.getAttribute('title') || 'Embedded content'
      const loadingAttr = element.getAttribute('loading')
      const loading = loadingAttr === 'lazy' || loadingAttr === 'eager' ? loadingAttr : undefined
      const allow = element.getAttribute('allow') || undefined
      const frameBorder = element.getAttribute('frameborder') || undefined
      const allowFullScreen = element.hasAttribute('allowfullscreen')
      return (
        <div key={key} className="my-6 w-full overflow-hidden rounded border border-theme">
          <iframe
            src={src}
            width={width}
            height={height}
            title={title}
            loading={loading}
            allow={allow}
            frameBorder={frameBorder}
            allowFullScreen={allowFullScreen}
            className="w-full"
          />
        </div>
      )
    }
    case 'code': {
      const text = element.textContent ?? ''
      return (
        <code key={key} className="px-1.5 py-0.5 bg-tertiary rounded text-sm text-accent">
          {text}
        </code>
      )
    }
    case 'strong': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      return (
        <strong key={key} className="font-semibold text-primary">
          {children}
        </strong>
      )
    }
    case 'em': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      return (
        <em key={key} className="italic">
          {children}
        </em>
      )
    }
    case 's': {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      return <s key={key}>{children}</s>
    }
    case 'br':
      return <br key={key} />
    default: {
      const children = await renderHtmlNodes(Array.from(element.childNodes), key)
      return children.length ? <span key={key}>{children}</span> : null
    }
  }
}

async function highlightCode(code: string, lang: string): Promise<string> {
  try {
    // Map common language aliases
    const langMap: Record<string, string> = {
      js: 'javascript',
      ts: 'typescript',
      tsx: 'tsx',
      jsx: 'jsx',
      sh: 'bash',
      shell: 'bash',
      yml: 'yaml',
      text: 'text',
    }

    const language = langMap[lang] || lang

    const html = await codeToHtml(code, {
      lang: language,
      themes: {
        light: 'github-light',
        dark: 'github-dark',
      },
      defaultColor: false,
    })

    return html
  } catch {
    // Fallback for unsupported languages
    return `<pre><code>${escapeHtml(code)}</code></pre>`
  }
}

function highlightCodeSync(code: string): string {
  return `<pre><code>${escapeHtml(code)}</code></pre>`
}

function escapeHtml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;')
}

function buildYouTubeEmbedUrl(rawUrl: string): string | null {
  const trimmed = rawUrl.trim()
  if (!trimmed) {
    return null
  }

  try {
    const url = trimmed.startsWith('//') ? new URL(`https:${trimmed}`) : new URL(trimmed)
    let videoId = ''

    if (url.hostname.includes('youtu.be')) {
      videoId = url.pathname.replace('/', '')
    } else if (url.hostname.includes('youtube.com')) {
      if (url.pathname.startsWith('/embed/')) {
        videoId = url.pathname.split('/embed/')[1] || ''
      } else {
        videoId = url.searchParams.get('v') || ''
      }
    }

    if (!videoId) {
      return null
    }

    const startParam = url.searchParams.get('t') || url.searchParams.get('start')
    const startTime = startParam ? parseYouTubeTime(startParam) : null
    const embedUrl = new URL(`https://www.youtube.com/embed/${videoId}`)

    if (startTime && startTime > 0) {
      embedUrl.searchParams.set('start', String(startTime))
    }

    return embedUrl.toString()
  } catch {
    return null
  }
}

function parseYouTubeTime(value: string): number | null {
  if (/^\d+$/.test(value)) {
    return Number.parseInt(value, 10)
  }

  const match = value.match(/(?:(\d+)h)?(?:(\d+)m)?(?:(\d+)s)?/i)
  if (!match) {
    return null
  }

  const hours = match[1] ? Number.parseInt(match[1], 10) : 0
  const minutes = match[2] ? Number.parseInt(match[2], 10) : 0
  const seconds = match[3] ? Number.parseInt(match[3], 10) : 0

  const total = hours * 3600 + minutes * 60 + seconds
  return total > 0 ? total : null
}

function TwitterEmbed({ tweetId }: { tweetId: string }) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const script = document.createElement('script')
    script.src = 'https://platform.twitter.com/widgets.js'
    script.async = true
    script.charset = 'utf-8'

    const existingScript = document.querySelector(
      'script[src="https://platform.twitter.com/widgets.js"]'
    )

    if (!existingScript) {
      document.body.appendChild(script)
    } else if ((window as unknown as { twttr?: { widgets?: { load?: (el?: HTMLElement) => void } } }).twttr?.widgets?.load) {
      ;(window as unknown as { twttr: { widgets: { load: (el?: HTMLElement) => void } } }).twttr.widgets.load(containerRef.current || undefined)
    }

    script.onload = () => {
      if ((window as unknown as { twttr?: { widgets?: { load?: (el?: HTMLElement) => void } } }).twttr?.widgets?.load) {
        ;(window as unknown as { twttr: { widgets: { load: (el?: HTMLElement) => void } } }).twttr.widgets.load(containerRef.current || undefined)
      }
    }

    return () => {
      if (!document.querySelector('script[src="https://platform.twitter.com/widgets.js"]')) {
        script.remove()
      }
    }
  }, [tweetId])

  return (
    <div ref={containerRef} className="my-6 flex justify-center">
      <blockquote className="twitter-tweet" data-theme="dark">
        <a href={`https://twitter.com/x/status/${tweetId}`}>Loading tweet...</a>
      </blockquote>
    </div>
  )
}

function renderInlineElements(text: string): React.ReactNode {
  // Split by inline code, images, and links
  const parts = text.split(/(!\[[^\]]*\]\([^)]+\)|\[[^\]]+\]\([^)]+\)|`[^`]+`)/)

  return parts.map((part, i) => {
    // Handle inline images: ![alt](url)
    const imageMatch = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/)
    if (imageMatch) {
      const [, alt, src] = imageMatch
      return (
        <img
          key={i}
          src={src}
          alt={alt}
          className="inline-block rounded max-w-full my-2"
          loading="lazy"
        />
      )
    }

    // Handle links: [text](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/)
    if (linkMatch) {
      const [, linkText, href] = linkMatch
      return (
        <a
          key={i}
          href={href}
          target={href.startsWith('http') ? '_blank' : undefined}
          rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
          className="text-accent hover:underline"
        >
          {linkText}
        </a>
      )
    }

    // Handle inline code
    if (part.startsWith('`') && part.endsWith('`')) {
      return (
        <code key={i} className="px-1.5 py-0.5 bg-tertiary rounded text-sm text-accent">
          {part.slice(1, -1)}
        </code>
      )
    }

    // Handle bold, italics, and other text
    const emphasisParts = part.split(/(\*\*[^*]+\*\*|\*[^*]+\*|_[^_]+_)/)
    return emphasisParts.map((ep, j) => {
      if (ep.startsWith('**') && ep.endsWith('**')) {
        return (
          <strong key={`${i}-${j}`} className="font-semibold text-primary">
            {ep.slice(2, -2)}
          </strong>
        )
      }
      if (
        (ep.startsWith('*') && ep.endsWith('*')) ||
        (ep.startsWith('_') && ep.endsWith('_'))
      ) {
        return (
          <em key={`${i}-${j}-em`} className="italic">
            {ep.slice(1, -1)}
          </em>
        )
      }
      return ep
    })
  })
}
