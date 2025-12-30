// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var extractFirstImage = (content) => {
  const htmlMatch = content.match(/<img[^>]+src=["']([^"']+)["']/i);
  if (htmlMatch?.[1]) return htmlMatch[1];
  const markdownMatch = content.match(/!\[[^\]]*]\(([^)\s]+)(?:\s+["'][^"']*["'])?\)/);
  if (markdownMatch?.[1]) return markdownMatch[1];
  return void 0;
};
var posts = defineCollection({
  name: "posts",
  directory: "./src/content/posts",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().date(),
    tags: z.array(z.string()),
    readingTime: z.string(),
    image: z.string().optional()
  }),
  transform: ({ content, ...post }) => ({
    ...post,
    slug: post._meta.path,
    content: content.trim(),
    image: post.image ?? extractFirstImage(content)
  })
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
