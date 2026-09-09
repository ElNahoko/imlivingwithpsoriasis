export type SkinMode = 'healthy' | 'psoriasis'

export type LayerId = 'dermis' | 'basal' | 'spinous' | 'granular' | 'corneum'

export type SkinLayer = {
  id: LayerId
  name: string
  color: string
  /** Layer thickness in scene units, per mode. */
  height: Record<SkinMode, number>
  role: string
  /** What changes about this layer in psoriasis. */
  inPsoriasis: string
}

/**
 * Thicknesses are proportional rather than literal micrometres: they are set so
 * the epidermis reads correctly against the dermis, and so the psoriatic
 * changes (acanthosis, a lost granular layer, retained scale) are visible at a
 * glance.
 */
export const SKIN_LAYERS: SkinLayer[] = [
  {
    id: 'dermis',
    name: 'Dermis',
    color: '#D98A95',
    height: { healthy: 0.5, psoriasis: 0.5 },
    role: 'The living support underneath: blood vessels, nerves and collagen.',
    inPsoriasis:
      'Capillaries widen and grow taller into the epidermis. Scratch the scale off and those vessels bleed in pinpoints, the sign doctors call Auspitz.',
  },
  {
    id: 'basal',
    name: 'Basal layer',
    color: '#BE6879',
    height: { healthy: 0.07, psoriasis: 0.1 },
    role: 'The factory floor. Every skin cell you will ever have is born here.',
    inPsoriasis:
      'IL-17 and friends order these cells to divide far too often, so the production line never slows down.',
  },
  {
    id: 'spinous',
    name: 'Spinous layer',
    color: '#EDB2B9',
    height: { healthy: 0.3, psoriasis: 0.84 },
    role: 'Cells mature here while they are pushed upward by the ones behind them.',
    inPsoriasis:
      'It swells to several times its normal depth. This thickening is most of what you feel when a plaque is raised.',
  },
  {
    id: 'granular',
    name: 'Granular layer',
    color: '#F4CFC9',
    height: { healthy: 0.15, psoriasis: 0.03 },
    role: 'Cells drop their nucleus here and release the lipids that waterproof you.',
    inPsoriasis:
      'Almost gone. Cells are rushed past this step, so the barrier is never finished and the skin leaks water and cracks.',
  },
  {
    id: 'corneum',
    name: 'Stratum corneum',
    color: '#F7E6DC',
    height: { healthy: 0.16, psoriasis: 0.46 },
    role: 'The dead, flattened barrier. Normally it sheds as flakes too small to see.',
    inPsoriasis:
      'Immature cells arrive still carrying their nucleus and stay stuck together. They stack into silvery scale instead of falling away.',
  },
]

export const TURNOVER_DAYS: Record<SkinMode, number> = { healthy: 28, psoriasis: 4 }

/** Seconds of animation standing in for one full trip through the epidermis. */
export const TRANSIT_SECONDS: Record<SkinMode, number> = { healthy: 14, psoriasis: 2 }
