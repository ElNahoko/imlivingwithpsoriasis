import { createTheme, type MantineColorsTuple } from '@mantine/core'

/** Brand blue: clinical, trustworthy, and nowhere near the red of a flare. */
const brand: MantineColorsTuple = [
  '#EFF6FF',
  '#DBEAFE',
  '#BFDBFE',
  '#93C5FD',
  '#60A5FA',
  '#3B82F6',
  '#2563EB',
  '#1D4ED8',
  '#1E40AF',
  '#1E3A8A',
]

const ink: MantineColorsTuple = [
  '#F4F6F8',
  '#E6EDF4',
  '#D6E1EB',
  '#B7C6D4',
  '#8FA3B5',
  '#6C8397',
  '#4F6577',
  '#374F63',
  '#22394B',
  '#0B1320',
]

export const theme = createTheme({
  primaryColor: 'brand',
  primaryShade: 6,
  colors: { brand, ink },
  white: '#FFFFFF',
  black: '#0B1320',
  fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
  headings: {
    fontFamily: '"Plus Jakarta Sans", ui-sans-serif, system-ui, sans-serif',
    fontWeight: '700',
    sizes: {
      h1: { fontSize: '1.75rem', lineHeight: '1.2' },
      h2: { fontSize: '1.4rem', lineHeight: '1.25' },
      h3: { fontSize: '1.125rem', lineHeight: '1.3' },
    },
  },
  fontSizes: {
    xs: '0.8125rem',
    sm: '0.9375rem',
    md: '1rem',
    lg: '1.0625rem',
    xl: '1.25rem',
  },
  lineHeights: { md: '1.55' },
  defaultRadius: 'md',
  radius: { md: '0.75rem', lg: '1.125rem' },
  components: {
    Card: { defaultProps: { withBorder: true, radius: 'md', padding: 'md' } },
    Paper: { defaultProps: { radius: 'lg' } },
    Button: { defaultProps: { radius: 'md' } },
  },
})

/** Semantic colours used for medical meaning, kept apart from the brand blue. */
export const SEMANTIC = {
  inflammation: '#D9434A',
  caution: '#C98A08',
  calm: '#0F9E9A',
} as const
