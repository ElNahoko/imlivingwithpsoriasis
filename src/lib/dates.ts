/** Local calendar day as `YYYY-MM-DD`, which is what diary entries are keyed by. */
export const dayKey = (date = new Date()) => {
  const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000)
  return local.toISOString().slice(0, 10)
}

/** The last `count` day keys, oldest first, ending with today. */
export const lastDays = (count: number, from = new Date()): string[] =>
  Array.from({ length: count }, (_, i) => {
    const day = new Date(from)
    day.setDate(day.getDate() - (count - 1 - i))
    return dayKey(day)
  })

export const average = (values: number[]): number | null =>
  values.length ? values.reduce((sum, value) => sum + value, 0) / values.length : null
