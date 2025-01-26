import type { CollectionEntry } from 'astro:content'

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    month: 'long',
    day: '2-digit',
    year: 'numeric',
  })
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
