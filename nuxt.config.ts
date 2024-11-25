// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },

  runtimeConfig: {
    public: {
      DB_WUT: 'WHAT IS WUT',
      baseUrl: process.env.NUXT_APP_BASE_URL,
    },
    private: {
      SUPABASE_URL: process.env.SUPABASE_URL,
      SUPABASE_KEY: process.env.SUPABASE_KEY,
    }
  },

  modules: [
    '@nuxtjs/supabase',
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@nuxtjs/color-mode',
    '@nuxt/fonts'
  ],

  colorMode: {
    classSuffix: "",
  },

  supabase: {
    redirectOptions: {
      login: '/login',
      callback: '/confirm',
      include: undefined,
      exclude: ["/signup", "/about", "/posts/*", "/profile/*", "/api/search/*"],
      cookieRedirect: true,
    }
  },

  shadcn: {
    /**
     * Prefix for all the imported component
     */
    prefix: '',
    /**
     * Directory that the component lives in.
     * @default "./components/ui"
     */
    componentDir: './components/ui'
  }

})
