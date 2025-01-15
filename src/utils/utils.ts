import type { CollectionEntry } from 'astro:content'
import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function groupEntriesByYear<T extends 'blog' | 'speaking'>(
  entries: CollectionEntry<T>[]
): Record<string, CollectionEntry<T>[]> {
  return entries.reduce(
    (acc, entry) => {
      const year = new Date(entry.data.date).getFullYear().toString()
      if (!acc[year]) {
        acc[year] = []
      }
      acc[year].push(entry)
      return acc
    },
    {} as Record<string, CollectionEntry<T>[]>
  )
}

export function getSortedYears(entries: Record<string, any[]>) {
  return Object.keys(entries).sort((a, b) => parseInt(b) - parseInt(a))
}
