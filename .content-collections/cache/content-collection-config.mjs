// content-collections.ts
import { defineCollection, defineConfig } from "@content-collections/core";
import { z } from "zod";
var posts = defineCollection({
  name: "posts",
  directory: "./src/content/posts",
  include: "*.md",
  schema: z.object({
    title: z.string(),
    excerpt: z.string(),
    date: z.string().date(),
    tags: z.array(z.string()),
    readingTime: z.string()
  }),
  transform: ({ content, ...post }) => ({
    ...post,
    slug: post._meta.path,
    content: content.trim()
  })
});
var content_collections_default = defineConfig({
  collections: [posts]
});
export {
  content_collections_default as default
};
