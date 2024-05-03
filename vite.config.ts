import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'
import { TanStackRouterVite } from '@tanstack/router-vite-plugin'

// https://vitejs.dev/config/
export default defineConfig((mode) => {
  return {
    plugins: [react(),      
              TanStackRouterVite(),
    ],
    resolve: {
      alias: [
        {find: '@', replacement: path.resolve(__dirname, './src')},
        {find: '@@', replacement: path.resolve(__dirname, './test')}
      ]
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./test/setup.ts'],
      include: ['./test/**/*.test.ts', './test/**/*.test.tsx']
    }
  }
})
