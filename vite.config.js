import { defineConfig } from 'vite'
import { postsManifestPlugin } from './vite-plugin-posts.js'

// https://vitejs.dev/config/
export default defineConfig(({ command }) => ({
    base: command === 'build' ? '/doggydad/' : '/',
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
    },
    plugins: [postsManifestPlugin()],
}))
