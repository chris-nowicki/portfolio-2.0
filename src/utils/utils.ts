import type { CollectionEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupEntriesByYear<T extends 'blog'>(
  entries: CollectionEntry<T>[]
): Record<number, CollectionEntry<T>[]> {
  return entries.reduce(
    (acc, entry) => {
      const year = new Date(entry.data.date).getFullYear()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(entry)
      return acc
    },
    {} as Record<number, CollectionEntry<T>[]>
  )
}

export function getSortedYears(posts: Record<string, any[]>) {
  return Object.keys(posts).sort((a, b) => parseInt(b) - parseInt(a))
}
