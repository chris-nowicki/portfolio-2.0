import { describe, it, expect } from 'vitest'
import { formatCloudinaryText } from './cloudinary-text'

describe('formatCloudinaryText', () => {
  it('should return the same text if there are no commas', () => {
    const input = 'Hello World'
    const output = formatCloudinaryText(input)
    expect(output).toBe(input)
  })

  it('should replace commas with the Cloudinary comma code', () => {
    const input = 'Hello, World'
    const expectedOutput = 'Hello%E2%80%9A World'
    const output = formatCloudinaryText(input)
    expect(output).toBe(expectedOutput)
  })

  it('should replace multiple commas with the Cloudinary comma code', () => {
    const input = 'Hello, World, How, Are, You'
    const expectedOutput =
      'Hello%E2%80%9A World%E2%80%9A How%E2%80%9A Are%E2%80%9A You'
    const output = formatCloudinaryText(input)
    expect(output).toBe(expectedOutput)
  })

  it('should handle an empty string', () => {
    const input = ''
    const output = formatCloudinaryText(input)
    expect(output).toBe(input)
  })
})
