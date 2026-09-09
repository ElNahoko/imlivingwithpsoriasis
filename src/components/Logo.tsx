import { Box, Text } from '@mantine/core'

export function LogoMark({ size = 44 }: { size?: number }) {
  return (
    <Box
      component="svg"
      viewBox="0 0 48 48"
      w={size}
      h={size}
      style={{ flex: 'none', filter: 'drop-shadow(0 6px 14px rgba(27,138,90,.28))' }}
      aria-hidden="true"
    >
      <rect width="48" height="48" rx="14" fill="#1B8A5A" />
      <path
        d="M14 30c3-9 8-13 12-13 3 0 4 2 4 5s-2 5-4 5c-3 0-4-3-3-6 1-4 5-7 9-7"
        fill="none"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <circle cx="33" cy="15" r="3" fill="#fff" />
    </Box>
  )
}

export function Wordmark({ size = 20 }: { size?: number }) {
  return (
    <Text ff="Lexend" fz={size} fw={500} lh={1.1} style={{ letterSpacing: '-0.02em' }}>
      I&apos;m living{' '}
      <Text span fw={700} c="green.6" inherit>
        with psoriasis
      </Text>
    </Text>
  )
}
