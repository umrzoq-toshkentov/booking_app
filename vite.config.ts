import path from 'path'
import react from '@vitejs/plugin-react'
import { AliasOptions, defineConfig } from 'vite'

const getAlias = (aliases: string[]): AliasOptions =>
  aliases.map((alias) => ({
    find: alias,
    replacement: path.resolve(__dirname, 'src', alias),
  }))

const alias: AliasOptions = getAlias([
  'components',
  'types',
  'mocks',
  'assets',
  'pages',
  'api',
  'forms',
  'utils',
  'shared',
  'app',
])

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias,
  },
  server: {
    port: 3000,
  },
})
