import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { SiteId } from './data/sites'
import type { SectionId } from './sections/registry'

export type DiaryEntry = {
  itch: number
  flare: 0 | 1 | 2 | 3
  sleep: number
  note: string
}

export const todayKey = () => new Date().toISOString().slice(0, 10)

type State = {
  /** section currently open in the side panel, null when the panel is closed */
  section: SectionId | null
  selectedSite: SiteId | null
  exploredSites: SiteId[]
  visitedSections: SectionId[]
  activeTriggers: number[]
  bsa: number
  habitDate: string
  habits: number[]
  diary: Record<string, DiaryEntry>
  tourStep: number
  tourVisible: boolean

  openSection: (id: SectionId) => void
  closePanel: () => void
  selectSite: (id: SiteId | null) => void
  toggleTrigger: (i: number) => void
  setBsa: (v: number) => void
  toggleHabit: (i: number) => void
  resetHabits: () => void
  saveDiary: (entry: DiaryEntry) => void
  setTourStep: (n: number) => void
  setTourVisible: (v: boolean) => void
}

export const useStore = create<State>()(
  persist(
    (set, get) => ({
      section: null,
      selectedSite: null,
      exploredSites: [],
      visitedSections: [],
      activeTriggers: [],
      bsa: 2,
      habitDate: todayKey(),
      habits: [],
      diary: {},
      tourStep: 0,
      tourVisible: true,

      openSection: (id) =>
        set((s) => ({
          section: id,
          visitedSections: s.visitedSections.includes(id)
            ? s.visitedSections
            : [...s.visitedSections, id],
        })),
      closePanel: () => set({ section: null, selectedSite: null }),
      selectSite: (id) =>
        set((s) => ({
          selectedSite: id,
          section: id ? 'body' : s.section,
          exploredSites:
            id && !s.exploredSites.includes(id) ? [...s.exploredSites, id] : s.exploredSites,
        })),
      toggleTrigger: (i) =>
        set((s) => ({
          activeTriggers: s.activeTriggers.includes(i)
            ? s.activeTriggers.filter((x) => x !== i)
            : [...s.activeTriggers, i],
        })),
      setBsa: (v) => set({ bsa: v }),
      toggleHabit: (i) => {
        const today = todayKey()
        const stale = get().habitDate !== today
        const current = stale ? [] : get().habits
        set({
          habitDate: today,
          habits: current.includes(i) ? current.filter((x) => x !== i) : [...current, i],
        })
      },
      resetHabits: () => set({ habits: [], habitDate: todayKey() }),
      saveDiary: (entry) => set((s) => ({ diary: { ...s.diary, [todayKey()]: entry } })),
      setTourStep: (n) => set({ tourStep: n }),
      setTourVisible: (v) => set({ tourVisible: v }),
    }),
    {
      name: 'ilwp',
      // Only the things a person would be upset to lose are kept on their device.
      partialize: (s) => ({
        diary: s.diary,
        habits: s.habits,
        habitDate: s.habitDate,
        exploredSites: s.exploredSites,
        bsa: s.bsa,
        tourStep: s.tourStep,
      }),
    },
  ),
)

/** Habits expire at midnight: yesterday's ticks should not flatter today. */
export const useTodayHabits = () => {
  const { habits, habitDate } = useStore()
  return habitDate === todayKey() ? habits : []
}
