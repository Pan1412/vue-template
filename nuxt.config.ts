// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  app: {
    // !Deploy use route /psystem/
    baseURL: process.env.BASE_URL,
    head: {
      // link: [
      //   {
      //     rel: 'stylesheet',
      //     href: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css'
      //   }
      // ],
      script: [
        {
          src: 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js',
          type: 'text/javascript'
        }
      ]
    }
  },

  devServer: {
    host: 'localhost',
    port: 4892,
  },

  modules: [
    "nuxt-icon",
  ],

  css: [
    "bootstrap/dist/css/bootstrap.min.css",
    "~/assets/css/style.css",
  ],

  plugins: [
    { src: '~/plugins/createStore.js', mode: 'client' },
    { src: '~/plugins/createStructure.js' },
    { src: '~/plugins/bootstrap.client.js', mode: 'client' }
  ],

  build: {
    transpile: ["tslib"],
  },

  // runtimeConfig: {
  //   public:{
  //     baseURL: process.env.BASE_URL,
  //     baseMainURL: 'http://localhost:4530/pmain/'
      
  //   }
  // }
})
