/**
 * A small seeded generator (mulberry32).
 *
 * The scenes scatter cells, capillaries and flakes randomly, but doing that
 * with `Math.random()` makes a render impure: the same component would draw
 * something different every time React re-ran it. Seeding keeps every render
 * identical and the scenes reproducible.
 */
export function createRandom(seed: number): () => number {
  let state = seed >>> 0
  return () => {
    state = (state + 0x6d2b79f5) >>> 0
    let t = Math.imul(state ^ (state >>> 15), 1 | state)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Convenience for the common "a number between a and b" case. */
export const between = (random: () => number, a: number, b: number) => a + random() * (b - a)
