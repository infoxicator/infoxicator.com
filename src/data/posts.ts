export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readingTime: string
}

interface FrontMatter {
  title: string
  excerpt: string
  date: string
  tags: string[]
  readingTime: string
}

function parseFrontMatter(content: string): { frontMatter: FrontMatter; body: string } {
  const frontMatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/
  const match = content.match(frontMatterRegex)

  if (!match) {
    throw new Error('Invalid frontmatter format')
  }

  const [, frontMatterStr, body] = match
  const frontMatter: Partial<FrontMatter> = {}

  const lines = frontMatterStr.split('\n')
  let currentKey: string | null = null
  let inArray = false
  let arrayValues: string[] = []

  for (const line of lines) {
    if (line.startsWith('  - ')) {
      if (inArray && currentKey) {
        arrayValues.push(line.replace('  - ', '').trim())
      }
    } else if (line.includes(':')) {
      if (inArray && currentKey) {
        (frontMatter as Record<string, unknown>)[currentKey] = arrayValues
        arrayValues = []
        inArray = false
      }

      const colonIndex = line.indexOf(':')
      const key = line.slice(0, colonIndex).trim()
      const value = line.slice(colonIndex + 1).trim()

      if (value === '') {
        currentKey = key
        inArray = true
        arrayValues = []
      } else {
        (frontMatter as Record<string, unknown>)[key] = value.replace(/^["']|["']$/g, '')
      }
    }
  }

  if (inArray && currentKey) {
    (frontMatter as Record<string, unknown>)[currentKey] = arrayValues
  }

  return {
    frontMatter: frontMatter as FrontMatter,
    body: body.trim(),
  }
}

// Import all markdown files
const postFiles = import.meta.glob('../content/posts/*.md', {
  eager: true,
  query: '?raw',
  import: 'default',
}) as Record<string, string>

// Parse all posts
export const blogPosts: BlogPost[] = Object.entries(postFiles)
  .map(([path, content]) => {
    const fileName = path.split('/').pop()?.replace('.md', '') || ''
    const { frontMatter, body } = parseFrontMatter(content)

    return {
      id: fileName,
      title: frontMatter.title,
      excerpt: frontMatter.excerpt,
      content: body,
      date: frontMatter.date,
      tags: frontMatter.tags,
      readingTime: frontMatter.readingTime,
    }
  })
  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find((post) => post.id === id)
}

export function getRecentPosts(count: number = 3): BlogPost[] {
  return blogPosts.slice(0, count)
}

export function getAllPosts(): BlogPost[] {
  return blogPosts
}
