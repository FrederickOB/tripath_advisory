import { describe, it, expect } from 'vitest'
import { cn } from './utils'

describe('cn', () => {
  it('merges simple class strings', () => {
    expect(cn('foo', 'bar')).toBe('foo bar')
  })

  it('ignores falsy values', () => {
    expect(cn('foo', false && 'bar', undefined, 'baz')).toBe('foo baz')
  })

  it('handles conditional classes', () => {
    expect(cn('foo', { bar: true, baz: false })).toBe('foo bar')
  })
})
