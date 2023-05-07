// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.png' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin:'' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;900&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
        { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.0/dist/css/bootstrap-grid.min.css' }
      ],
    }
  },
  css: ['~/assets/css/reset.css'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/scss/import.scss";'
        }
      }
    }
  },
  runtimeConfig: {
    apiBaseUrl: process.env.API_BASE_URL,
    apiKey: process.env.API_KEY,
    backendBaseUrl: process.env.BACKEND_BASE_URL,

    public: {
      base_url_img: 'https://image.tmdb.org/t/p'
    }
  },
  modules: [
    'nuxt-socket-io'
  ],
  io: {
    sockets: [{
      name: 'main',
      default: true,
      url: 'http://localhost:5000'
    }]
  }
})
