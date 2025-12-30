import { defineCollection, defineConfig } from '@content-collections/core'
import { z } from 'zod'

const posts = defineCollection({
  name: 'posts',
  directory: './src/content/posts',
  include: '*.md',
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().date(),
    tags: z.array(z.string()),
    readingTime: z.string(),
    image: z.string().optional(),
  }),
  transform: ({ content, ...post }) => ({
    ...post,
    slug: post._meta.path,
    content: content.trim(),
    image: post.image,
  }),
})

export default defineConfig({
  collections: [posts],
})
