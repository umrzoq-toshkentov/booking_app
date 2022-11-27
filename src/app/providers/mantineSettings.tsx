import 'dayjs/locale/uz-latn'

import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  Paper,
} from '@mantine/core'
import { useHotkeys, useLocalStorage } from '@mantine/hooks'
import React from 'react'

const mantineSettings = (component: () => React.ReactNode) => () => {
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: 'mantine-color-scheme',
    defaultValue: 'light',
  })

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === 'dark' ? 'light' : 'dark'))

  useHotkeys([['mod+J', () => toggleColorScheme()]])
  return (
    <ColorSchemeProvider
      colorScheme={colorScheme}
      toggleColorScheme={toggleColorScheme}
    >
      <MantineProvider theme={{ colorScheme }} withGlobalStyles>
        <Paper>{component()}</Paper>
      </MantineProvider>
    </ColorSchemeProvider>
  )
}
export default mantineSettings
