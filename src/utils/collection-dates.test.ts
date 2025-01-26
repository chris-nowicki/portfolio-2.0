import { describe, it, expect } from 'vitest'
import {
  formatDate,
  groupEntriesByYear,
  getSortedYears,
} from './collection-dates'
import type { CollectionEntry } from 'astro:content'

describe('formatDate', () => {
  it('should format date correctly', () => {
    const date = '2023-10-05T12:00:00Z'
    const formattedDate = formatDate(date)
    expect(formattedDate).toBe('October 05, 2023')
  })
})

describe('groupEntriesByYear', () => {
  it('should group entries by year', () => {
    const entries: CollectionEntry<'speaking'>[] = [
      {
        id: '3',
        data: {
          id: 3,
          date: '2023-05-08',
          title: 'Speaking 3',
          description: 'Speaking 3 Description',
          videoUrl: 'https://youtu.be/dummylink',
        },
        collection: 'speaking',
      },
      {
        id: '2',
        data: {
          id: 2,
          date: '2023-02-14',
          title: 'Speaking 2',
          description: 'Speaking 2 Description',
          videoUrl: 'https://youtu.be/dummylink',
        },
        collection: 'speaking',
      },
      {
        id: '1',
        data: {
          id: 1,
          date: '2022-08-30',
          title: 'Speaking 1',
          description: 'Speaking 1 Description',
          videoUrl: 'https://youtu.be/dummylink',
        },
        collection: 'speaking',
      },
    ]
    const groupedEntries = groupEntriesByYear(entries)
    expect(groupedEntries['2023']).toHaveLength(2)
    expect(groupedEntries['2022']).toHaveLength(1)
  })
})

describe('getSortedYears', () => {
  it('should return sorted years in descending order', () => {
    const entries = {
      '2023': [],
      '2021': [],
      '2022': [],
    }
    const sortedYears = getSortedYears(entries)
    expect(sortedYears).toEqual(['2023', '2022', '2021'])
  })
})
