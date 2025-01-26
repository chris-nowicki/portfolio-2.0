import { describe, it, expect } from 'vitest'
import { readingTime } from './reading-time'

describe('readingTime utility', () => {
  it('should return correct reading time for a short text', () => {
    const text = 'This is a short text.'
    const result = readingTime(text)
    expect(result).toEqual('1 min read')
  })
})
