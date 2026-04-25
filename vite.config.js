import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { exec } from 'child_process'

function netlifyAutoDeployPlugin() {
  return {
    name: 'netlify-auto-deploy',
    closeBundle() {
      if (!process.env.AUTO_DEPLOY) return
      console.log('\n[deploy] Build tamamlandi, Netlify\'e yukleniyor...')
      exec(
        'netlify deploy --prod --dir=dist --site=80b93a49-7c98-4eb8-8c37-b41c2e664853',
        (err, stdout, stderr) => {
          if (err) {
            console.error('[deploy] Hata:', stderr)
          } else {
            const url = stdout.match(/Production URL:\s*<?(https?:\/\/[^\s>]+)>?/)?.[1]
            console.log('[deploy] Yayinda:', url ?? 'https://lostenadem.netlify.app')
          }
        }
      )
    },
  }
}

export default defineConfig({
  plugins: [react(), tailwindcss(), netlifyAutoDeployPlugin()],
})
