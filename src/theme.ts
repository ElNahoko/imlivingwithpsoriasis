import { createTheme, type MantineColorsTuple } from '@mantine/core'

/** Brand green: calm, clinical, and the colour of psoriasis awareness. */
const green: MantineColorsTuple = [
  '#ECF8F2',
  '#D8F0E4',
  '#B0E1C8',
  '#85D1AA',
  '#5FC391',
  '#43BA80',
  '#1B8A5A',
  '#17784E',
  '#126343',
  '#0C4E34',
]

const ink: MantineColorsTuple = [
  '#F4F7FA',
  '#E6EDF4',
  '#D6E1EB',
  '#B7C6D4',
  '#8FA3B5',
  '#6C8397',
  '#4F6577',
  '#374F63',
  '#22394B',
  '#122A3D',
]

export const theme = createTheme({
  primaryColor: 'green',
  primaryShade: 6,
  colors: { green, ink },
  white: '#FFFFFF',
  black: '#122A3D',
  fontFamily: '"Source Sans 3", ui-sans-serif, system-ui, sans-serif',
  headings: {
    fontFamily: 'Lexend, ui-sans-serif, system-ui, sans-serif',
    fontWeight: '600',
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

/** Semantic colours used for medical meaning, kept apart from the brand green. */
export const SEMANTIC = {
  inflammation: '#D9434A',
  caution: '#C98A08',
  calm: '#0F9E9A',
} as const
