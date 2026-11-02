import { useState } from 'react'
import {
  Alert,
  Anchor,
  Button,
  Card,
  Container,
  Select,
  SimpleGrid,
  Stack,
  Text,
  TextInput,
  Textarea,
  Title,
} from '@mantine/core'
import { IconBrandGithub, IconInfoCircle, IconMail } from '@tabler/icons-react'
import { SITE } from '../data/site'
import { PageHeader } from './SiteLayout'

const TOPICS = [
  'General question',
  'Share my story',
  'List a clinic, group or event',
  'Partnership',
  'Press',
  'Report a correction',
]

export function Contact() {
  const [name, setName] = useState('')
  const [topic, setTopic] = useState<string | null>(TOPICS[0])
  const [message, setMessage] = useState('')
  const [tried, setTried] = useState(false)
  const missing = !message.trim()

  // ponytail: no backend, so the form hands off to the visitor's own email app.
  // Swap for a form service (Formspree, Vercel function) when replies need tracking.
  const send = (e: React.FormEvent) => {
    e.preventDefault()
    setTried(true)
    if (missing) return
    const subject = `[${topic}] ${name ? `from ${name}` : 'from the website'}`
    window.location.href = `mailto:${SITE.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(message)}`
  }

  return (
    <>
      <PageHeader eyebrow="Contact" title="Get in touch">
        Questions, story ideas, partnerships or corrections are all welcome.
      </PageHeader>

      <Container size="lg">
        <SimpleGrid cols={{ base: 1, md: 3 }} spacing={40}>
          <Stack gap="lg" className="contact-form">
            <Alert
              variant="light"
              color="brand"
              radius="lg"
              icon={<IconInfoCircle />}
              title="I am not a doctor"
            >
              I can&apos;t give medical advice about your skin. If you need urgent help, call your
              local emergency number.
            </Alert>
            <form onSubmit={send} noValidate>
              <Stack gap="md">
                <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="md">
                  <TextInput
                    label="Name"
                    autoComplete="name"
                    size="md"
                    value={name}
                    onChange={(e) => setName(e.currentTarget.value)}
                  />
                  <Select
                    label="What is it about?"
                    data={TOPICS}
                    size="md"
                    value={topic}
                    onChange={setTopic}
                    allowDeselect={false}
                  />
                </SimpleGrid>
                <Textarea
                  label="Message"
                  description="Leave out health details you would rather keep private."
                  required
                  autosize
                  minRows={6}
                  size="md"
                  value={message}
                  onChange={(e) => setMessage(e.currentTarget.value)}
                  error={tried && missing ? 'Please write a short message.' : undefined}
                />
                <Button
                  type="submit"
                  size="lg"
                  radius="xl"
                  w="fit-content"
                  leftSection={<IconMail size={18} />}
                >
                  Write the email
                </Button>
                <Text size="sm" c="ink.6">
                  This opens your email app with the message filled in, so nothing is stored on this
                  site.
                </Text>
              </Stack>
            </form>
          </Stack>

          <Stack gap="md">
            <Card radius="lg" padding="lg">
              <Title order={3} fz={17} fw={800}>
                Email
              </Title>
              <Anchor href={`mailto:${SITE.email}`} mt={4}>
                {SITE.email}
              </Anchor>
            </Card>
            <Card radius="lg" padding="lg">
              <Title order={3} fz={17} fw={800}>
                Open source
              </Title>
              <Text size="sm" c="ink.6" mt={4}>
                Found a mistake in the guide? Open an issue or a pull request.
              </Text>
              <Button
                component="a"
                href={SITE.repo}
                target="_blank"
                rel="noopener noreferrer"
                variant="default"
                radius="xl"
                mt="sm"
                leftSection={<IconBrandGithub size={18} />}
                w="fit-content"
              >
                View on GitHub
              </Button>
            </Card>
            <Card radius="lg" padding="lg" bg="brand.0" withBorder={false}>
              <Title order={3} fz={17} fw={800}>
                Clinic, group or event organiser?
              </Title>
              <Text size="sm" c="ink.7" mt={4}>
                Choose &ldquo;List a clinic, group or event&rdquo; and tell me where you are.
              </Text>
            </Card>
          </Stack>
        </SimpleGrid>
      </Container>
    </>
  )
}
