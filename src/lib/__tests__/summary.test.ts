import { describe, expect, it } from 'vitest'
import { buildDoctorSummary, buildQuestions, habitScore, severityForBsa } from '../summary'
import type { SummaryInput } from '../summary'
import type { DiaryEntry } from '../../store'
import { dayKey } from '../dates'

const TODAY = new Date(2026, 8, 9, 10)

const base: SummaryInput = {
  exploredSites: [],
  activeTriggers: [],
  bsa: 2,
  diary: {},
  habits: [],
  today: TODAY,
}

const entry = (itch: number, flare: DiaryEntry['flare']): DiaryEntry => ({
  itch,
  flare,
  sleep: 7,
  note: '',
})

describe('severityForBsa', () => {
  it.each([
    [0, 'mild'],
    [2.9, 'mild'],
    [3, 'moderate'],
    [10, 'moderate'],
    [11, 'severe'],
  ])('calls %s%% %s', (bsa, expected) => {
    expect(severityForBsa(bsa)).toBe(expected)
  })
})

describe('habitScore', () => {
  it('is zero with nothing ticked', () => {
    expect(habitScore([])).toBe(0)
  })

  it('gives moisturising and treatment 40 points between them', () => {
    expect(habitScore([0, 1])).toBe(40)
  })
})

describe('buildDoctorSummary', () => {
  it('says plainly when nothing has been logged', () => {
    const summary = buildDoctorSummary(base)
    expect(summary).toContain('not logged yet')
    expect(summary).toContain('Skin diary: no entries yet.')
    expect(summary).toContain('none switched on')
  })

  it('lists logged sites and triggers', () => {
    const summary = buildDoctorSummary({
      ...base,
      exploredSites: ['scalp', 'knee'],
      activeTriggers: [0],
    })
    expect(summary).toContain('scalp, knees')
    expect(summary).toContain('a high-stress week')
  })

  it('averages only the last seven days of the diary', () => {
    const days = [0, 1, 2, 9].map((back) => {
      const day = new Date(TODAY)
      day.setDate(day.getDate() - back)
      return dayKey(day)
    })
    const diary = {
      [days[0]]: entry(6, 2),
      [days[1]]: entry(4, 1),
      [days[2]]: entry(2, 0),
      // Ten days ago: outside the window, and would drag the mean down.
      [days[3]]: entry(0, 0),
    }
    const summary = buildDoctorSummary({ ...base, diary })
    expect(summary).toContain('average itch 4.0 out of 10')
  })

  it('counts moderate-or-severe days over a fortnight, with correct grammar', () => {
    const yesterday = new Date(TODAY)
    yesterday.setDate(yesterday.getDate() - 1)
    const summary = buildDoctorSummary({
      ...base,
      diary: { [dayKey(yesterday)]: entry(5, 3) },
    })
    expect(summary).toContain('1 moderate-or-severe day ')
  })

  it('reports the habit shield and what is still outstanding', () => {
    expect(buildDoctorSummary({ ...base, habits: [0] })).toContain(
      'moisturised, treatment not yet taken',
    )
  })

  it('uses singular palm for one percent', () => {
    expect(buildDoctorSummary({ ...base, bsa: 1 })).toContain('about 1 palm of skin')
  })
})

describe('buildQuestions', () => {
  it('always includes the standard questions', () => {
    expect(buildQuestions({ exploredSites: [], activeTriggers: [], bsa: 2 })).toHaveLength(5)
  })

  it('adds a joint screening question for nail or lower-back involvement', () => {
    const questions = buildQuestions({ exploredSites: ['nails'], activeTriggers: [], bsa: 2 })
    expect(questions.some((q) => q.includes('psoriatic arthritis'))).toBe(true)
  })

  it('raises systemic treatment once more than a tenth of the skin is involved', () => {
    const questions = buildQuestions({ exploredSites: [], activeTriggers: [], bsa: 12 })
    expect(questions.some((q) => q.includes('biologic'))).toBe(true)
  })

  it('does not repeat itself when several conditions apply', () => {
    const questions = buildQuestions({
      exploredSites: ['nails', 'lowback', 'face', 'folds'],
      activeTriggers: [0],
      bsa: 15,
    })
    expect(new Set(questions).size).toBe(questions.length)
  })
})
