import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import '@mantine/core/styles.css'
import './styles.css'
import { theme } from './theme'
import { App } from './App'
import { langFromPath, loadLang } from './data/i18n'

// Translated articles load before the first render, so the prerendered page
// stays on screen until the app can show the same language.
await loadLang(langFromPath(window.location.pathname))

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light" forceColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>,
)
