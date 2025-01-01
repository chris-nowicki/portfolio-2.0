import { defineCollection, z } from "astro:content";
import {file} from "astro/loaders"

const projects = defineCollection({
  loader: file("src/data/projects.json"),
  schema: z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    gitHubUrl: z.string(),
    liveSiteUrl: z.string(),
  })
})

const speaking = defineCollection({
  loader: file("src/data/speaking.json"),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    videoUrl: z.string(),
  })
})

export const collections = { projects, speaking }