import { useStore } from '../store'
import type { SectionId } from '../sections/registry'

export type TourStep = {
  message: string
  /** What the "Show me" button does. */
  show: () => void
  /** The tour only advances once the person has actually done it. */
  done: (state: ReturnType<typeof useStore.getState>) => boolean
}

const open = (id: SectionId) => () => useStore.getState().openSection(id)

export const TOUR: TourStep[] = [
  {
    message:
      'Hi, I’m Nova. Every red patch on this body is a place psoriasis likes to live. Click one to see what it looks like there and why it happens. Start with the scalp, the most common first sign.',
    show: () => useStore.getState().selectSite('scalp'),
    done: (s) => s.exploredSites.length > 0,
  },
  {
    message:
      'Now the why. “How it works” shows the same skin on two clocks: one rebuilding in 28 days, one in 4.',
    show: open('how'),
    done: (s) => s.visitedSections.includes('how'),
  },
  {
    message:
      'Flares rarely have one cause. In “Flare triggers”, switch on what is true for you this week and watch the risk move.',
    show: open('triggers'),
    done: (s) => s.visitedSections.includes('triggers'),
  },
  {
    message:
      'Stress is the trigger people report most. There is a two-minute breathing exercise waiting in “Stress & skin”.',
    show: open('stress'),
    done: (s) => s.visitedSections.includes('stress'),
  },
  {
    message:
      'Food cannot cure this, but it can calm it. “Food & drink” is organised by category; tap any food to read the reasoning.',
    show: open('food'),
    done: (s) => s.visitedSections.includes('food'),
  },
  {
    message:
      '“Daily habits” is the routine that keeps flares short. Tick what you already do; two habits carry most of the weight.',
    show: open('habits'),
    done: (s) => s.visitedSections.includes('habits'),
  },
  {
    message:
      'You do not need to memorise drug names. In “Treatments”, find the step you are on and read the one above it.',
    show: open('treatments'),
    done: (s) => s.visitedSections.includes('treatments'),
  },
  {
    message:
      'Last one. The “Skin diary” takes twenty seconds a day and turns into the chart your doctor actually wants to see.',
    show: open('diary'),
    done: (s) => s.visitedSections.includes('diary'),
  },
]
