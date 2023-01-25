import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import { createStyleImportPlugin, AntdResolve } from 'vite-plugin-style-import'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    createStyleImportPlugin({
      resolves: [AntdResolve()]
    })
  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '~': fileURLToPath(new URL('./types', import.meta.url))
    }
  },
  server: {
    proxy: {
      '/dev': {
        target: 'http://127.0.0.1:8001',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/dev/, '')
      }
    }
  }
})
