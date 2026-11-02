import { Container, Stack, Text, Title } from '@mantine/core'
import { SITE } from '../data/site'
import { PageHeader } from './SiteLayout'

type Doc = { title: string; intro: string; sections: [string, string][] }

const UPDATED = '2 November 2026'

// TODO(owner): have these reviewed for the country you operate in.
const LEGAL_DOCS: Record<string, Doc> = {
  '/privacy': {
    title: 'Privacy policy',
    intro:
      'This site is built to collect as little as possible. Here is exactly what happens to your data.',
    sections: [
      [
        'What stays on your device',
        'Your skin diary, daily habits, the body areas you have explored and your guided-tour progress are saved in your browser’s local storage, under the key “ilwp”. They are never sent to a server. Clearing your browser’s site data deletes them.',
      ],
      [
        'What we do not collect',
        'There are no accounts, no analytics, no advertising and no tracking cookies.',
      ],
      [
        'Third parties',
        'Fonts are loaded from Google Fonts, so Google receives your IP address when the page loads. The site is hosted by Vercel, whose servers keep standard access logs (such as IP address and pages requested) for security and operation.',
      ],
      [
        'If you contact us',
        'The contact form opens your own email app. What you send arrives as an ordinary email, which is used only to reply to you and deleted when no longer needed. Please do not send health details you would rather keep private.',
      ],
      [
        'Your rights',
        `You can ask what we hold about you, ask for it to be corrected or deleted, or complain to your local data protection authority. Write to ${SITE.email}.`,
      ],
    ],
  },
  '/terms': {
    title: 'Terms of use',
    intro: 'By using this site you agree to these terms.',
    sections: [
      [
        'Educational use only',
        'Everything here is general information. It is not medical advice and does not create a doctor–patient relationship. See the medical disclaimer.',
      ],
      [
        'Open source',
        'The code is published under the MIT licence on GitHub. Text and data are provided as is, without warranty of any kind.',
      ],
      [
        'Stories you send',
        'If you send a story for publication, you confirm it is yours to share, and we may edit it for length and clarity. Nothing is published without your agreement.',
      ],
      [
        'Acceptable use',
        'Do not use the site to break the law, to attack or overload it, or to pass off its content as professional medical advice.',
      ],
      ['Changes', 'These terms may change. The date at the top shows the latest version.'],
    ],
  },
  '/medical-disclaimer': {
    title: 'Medical disclaimer',
    intro: 'Please read this before acting on anything you find here.',
    sections: [
      [
        'Not medical advice',
        'This site explains psoriasis in general terms. It cannot diagnose you, and it is not a substitute for a doctor or dermatologist who has examined you.',
      ],
      [
        'Talk to a professional',
        'Do not start, stop or change a treatment because of something you read here. Always check with your doctor or pharmacist first.',
      ],
      [
        'Figures are approximate',
        'Percentages and numbers are rounded, come from the published sources listed in the guide, and describe populations, not you.',
      ],
      [
        'When it is urgent',
        'Widespread redness or pustules with fever or chills, sudden painful swollen joints, or thoughts of harming yourself need help now. Call your local emergency number or go to the nearest emergency department.',
      ],
    ],
  },
}

export function Legal({ path }: { path: string }) {
  const doc = LEGAL_DOCS[path]
  return (
    <>
      <PageHeader eyebrow={`Last updated ${UPDATED}`} title={doc.title}>
        {doc.intro}
      </PageHeader>
      <Container size="md">
        <Stack gap={36}>
          {doc.sections.map(([heading, body]) => (
            <Stack key={heading} gap={6}>
              <Title order={2} fz={22} fw={800}>
                {heading}
              </Title>
              <Text fz={17} lh={1.7} c="ink.8">
                {body}
              </Text>
            </Stack>
          ))}
        </Stack>
      </Container>
    </>
  )
}
