import type { CollectionEntry } from 'astro:content'
import type { ImageMetadata } from 'astro'

export type Site = {
  NAME: string
  EMAIL: string
}

export type Metadata = {
  TITLE: string
  DESCRIPTION: string
}

export type Socials = {
  ICON: ImageMetadata
  URL: string
}

export type Project = CollectionEntry<'projects'>
export type Blog = CollectionEntry<'blog'>
export type Speaking = CollectionEntry<'speaking'>
