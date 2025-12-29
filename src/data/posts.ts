import { allPosts } from 'content-collections'

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  content: string
  date: string
  tags: string[]
  readingTime: string
}

export const blogPosts: BlogPost[] = allPosts
  .map((post) => ({
    id: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    content: post.content,
    date: post.date,
    tags: post.tags,
    readingTime: post.readingTime,
  }))
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
