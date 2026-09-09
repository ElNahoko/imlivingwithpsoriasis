import { describe, expect, it } from 'vitest'
import { TRIGGERS, riskLevel } from '../triggers'
import { HABITS, shieldMessage } from '../habits'
import { FOODS } from '../foods'
import { SITES } from '../sites'

describe('trigger weights', () => {
  it('can exceed 100 combined, so the gauge has to clamp', () => {
    const total = TRIGGERS.reduce((sum, t) => sum + t.weight, 0)
    expect(total).toBeGreaterThan(100)
  })

  it('moves through every risk band as weights stack', () => {
    expect(riskLevel(0).label).toBe('calm')
    expect(riskLevel(20).label).toBe('low')
    expect(riskLevel(40).label).toBe('elevated')
    expect(riskLevel(60).label).toBe('high')
    expect(riskLevel(100).label).toBe('very high')
  })

  it('reserves red for the two worst bands only', () => {
    expect(riskLevel(49).color).not.toBe('red')
    expect(riskLevel(50).color).toBe('red')
  })
})

describe('daily habits', () => {
  it('adds up to exactly 100 points', () => {
    expect(HABITS.reduce((sum, h) => sum + h.points, 0)).toBe(100)
  })

  it('gives a different message at each stage', () => {
    const messages = [0, 20, 50, 90, 100].map(shieldMessage)
    expect(new Set(messages).size).toBe(messages.length)
  })
})

describe('content integrity', () => {
  it('has a unique name for every food', () => {
    const names = FOODS.map((f) => f.name)
    expect(new Set(names).size).toBe(names.length)
  })

  it('explains the reasoning for every food', () => {
    expect(FOODS.every((f) => f.why.length > 40)).toBe(true)
  })

  it('gives every body site a plausible frequency and at least two care steps', () => {
    for (const site of SITES) {
      expect(site.frequency).toBeGreaterThan(0)
      expect(site.frequency).toBeLessThanOrEqual(100)
      expect(site.care.length).toBeGreaterThanOrEqual(2)
      expect(site.points.length).toBeGreaterThan(0)
    }
  })
})
