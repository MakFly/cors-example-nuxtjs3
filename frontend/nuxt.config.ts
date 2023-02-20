// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    runtimeConfig: {
        baseUrlApi: "http://localhost:5173",
        apiSecret: 123,
        public: {
            api: 'http://localhost:3000'
        }
    },
    modules: [
        '@nuxt/ui'
    ]
})
