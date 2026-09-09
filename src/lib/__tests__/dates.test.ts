import { describe, expect, it } from 'vitest'
import { average, dayKey, lastDays } from '../dates'

describe('dayKey', () => {
  it('formats a date as YYYY-MM-DD', () => {
    expect(dayKey(new Date(2026, 0, 9, 12))).toBe('2026-01-09')
  })

  it('uses the local calendar day, not UTC', () => {
    // Late evening local time is already tomorrow in UTC for positive offsets,
    // which would put a diary entry on the wrong day.
    const lateEvening = new Date(2026, 5, 30, 23, 30)
    expect(dayKey(lateEvening)).toBe('2026-06-30')
  })
})

describe('lastDays', () => {
  it('returns the requested number of days, oldest first', () => {
    const days = lastDays(3, new Date(2026, 2, 3, 9))
    expect(days).toEqual(['2026-03-01', '2026-03-02', '2026-03-03'])
  })

  it('crosses a month boundary', () => {
    expect(lastDays(2, new Date(2026, 3, 1, 9))).toEqual(['2026-03-31', '2026-04-01'])
  })
})

describe('average', () => {
  it('averages values', () => {
    expect(average([2, 4, 6])).toBe(4)
  })

  it('returns null for an empty set rather than NaN', () => {
    expect(average([])).toBeNull()
  })
})
