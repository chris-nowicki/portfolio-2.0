import type { CollectionEntry } from 'astro:content'

export type Site = {
  NAME: string
  EMAIL: string
}

export type Metadata = {
  TITLE: string
  DESCRIPTION: string
}

export type Socials = {
  NAME: string
  URL: string
}

export type Project = CollectionEntry<'projects'>
export type Blog = CollectionEntry<'blog'>
export type Speaking = CollectionEntry<'speaking'>
