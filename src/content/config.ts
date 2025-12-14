import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string().or(z.date()),
    description: z.string().optional().default(''),
    tags: z.array(z.string()).optional().default([]),
    category: z.string().optional(),
    author: z.string().optional(),
  })
});

export const collections = {
  'posts': postsCollection
};
