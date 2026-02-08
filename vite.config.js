import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { configDotenv } from 'dotenv'
configDotenv()
import { defineConfig } from 'vite'



// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/api': {
                target: 'process.env.backend_url',
                changeOrigin: true,
            }
        }, watch: {
            usePolling: true,
            interval: 300
        }
    }
})
