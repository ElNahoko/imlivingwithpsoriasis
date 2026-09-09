import { siteById, type SiteId } from '../data/sites'
import { TRIGGERS } from '../data/triggers'
import { HABITS } from '../data/habits'
import { DOCTOR_CHECKLIST_BASE } from '../data/clinical'
import type { DiaryEntry } from '../store'
import { average, lastDays } from './dates'

/**
 * Everything the summary needs, passed in rather than read from the store, so
 * this stays a pure function that can be tested and reused.
 */
export type SummaryInput = {
  exploredSites: SiteId[]
  activeTriggers: number[]
  bsa: number
  diary: Record<string, DiaryEntry>
  habits: number[]
  today?: Date
}

export const severityForBsa = (bsa: number) =>
  bsa < 3 ? 'mild' : bsa <= 10 ? 'moderate' : 'severe'

/** Points earned today out of a possible 100, from the daily habit list. */
export const habitScore = (habits: number[]) =>
  HABITS.reduce((sum, habit, index) => sum + (habits.includes(index) ? habit.points : 0), 0)

/**
 * Turns logged app data into something a person can read out in a two-minute
 * appointment. Written in the first person because they are the one saying it.
 */
export function buildDoctorSummary(input: SummaryInput): string {
  const { exploredSites, activeTriggers, bsa, diary, habits, today = new Date() } = input

  const sites = exploredSites.map((id) => siteById(id).name.toLowerCase())
  const triggers = activeTriggers.map((index) => TRIGGERS[index].label.toLowerCase())

  const week = lastDays(7, today)
    .map((day) => diary[day])
    .filter((entry): entry is DiaryEntry => Boolean(entry))
  const meanItch = average(week.map((entry) => entry.itch))
  const roughDays = lastDays(14, today).filter((day) => diary[day] && diary[day].flare >= 2).length
  const shield = habitScore(habits)

  const dateLabel = today.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return [
    `Psoriasis summary, ${dateLabel}`,
    `Sites affected: ${sites.length ? sites.join(', ') : 'not logged yet (tap the plaques on the body map)'}.`,
    `Extent: about ${bsa} palm${bsa === 1 ? '' : 's'} of skin, roughly ${bsa}% of body surface area, which is ${severityForBsa(bsa)}.`,
    `Likely triggers this month: ${triggers.length ? triggers.join(', ') : 'none switched on in the flare simulator'}.`,
    meanItch === null
      ? 'Skin diary: no entries yet.'
      : `Skin diary, last 7 days: average itch ${meanItch.toFixed(1)} out of 10, with ${roughDays} moderate-or-severe day${roughDays === 1 ? '' : 's'} in the last 14.`,
    `Daily routine today: ${shield}% of the habit shield (${habits.includes(0) ? 'moisturised' : 'not yet moisturised'}, ${habits.includes(1) ? 'treatment taken' : 'treatment not yet taken'}).`,
    'What bothers me most: ________________',
  ].join('\n')
}

/**
 * The standard questions, plus the ones this person's own logs make worth
 * asking. Appointments are short; the list should reflect their situation.
 */
export function buildQuestions(
  input: Pick<SummaryInput, 'exploredSites' | 'activeTriggers' | 'bsa'>,
) {
  const { exploredSites, activeTriggers, bsa } = input
  const questions = [...DOCTOR_CHECKLIST_BASE]

  if (exploredSites.includes('nails') || exploredSites.includes('lowback')) {
    questions.push(
      'I have nail or lower-back involvement. Should I be screened for psoriatic arthritis?',
    )
  }
  if (bsa > 10) {
    questions.push('With more than 10% of my skin involved, is a tablet or a biologic appropriate?')
  }
  if (exploredSites.includes('folds') || exploredSites.includes('face')) {
    questions.push('For my face and folds, which non-steroid options are safe long term?')
  }
  if (activeTriggers.some((index) => TRIGGERS[index].label === 'A new medicine')) {
    questions.push('Could one of my other medicines be worsening my psoriasis? Can we review them?')
  }
  if (activeTriggers.includes(0)) {
    questions.push('Stress is a trigger for me. What support is available?')
  }
  return questions
}
