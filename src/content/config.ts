import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()).optional(),
    publishDate: z.string().or(z.date()).optional(),
    description: z.string().optional().default(''),
    keywords: z.array(z.string()).optional().default([]),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional(),
    author: z.string().optional(),
  }).refine(data => data.date || data.publishDate, {
    message: "Either 'date' or 'publishDate' is required"
  })
});

export const collections = {
  'posts': postsCollection
};
