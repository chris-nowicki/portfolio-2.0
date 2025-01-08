import { defineCollection, z } from 'astro:content'
import { file, glob } from 'astro/loaders'

const projects = defineCollection({
  loader: file('src/content/projects/projects.json'),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    gitHubUrl: z.string(),
    liveSiteUrl: z.string(),
  }),
})

const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: 'src/content/blog' }),
  schema: z.object({
    date: z.date(),
    title: z.string(),
    description: z.string(),
    image: z.string().optional(),
    draft: z.boolean(),
  }),
})

const speaking = defineCollection({
  loader: file('src/content/speaking/speaking.json'),
  schema: z.object({
    id: z.number(),
    date: z.string(),
    title: z.string(),
    description: z.string(),
    videoUrl: z.string(),
  }),
})

export const collections = { projects, blog, speaking }
