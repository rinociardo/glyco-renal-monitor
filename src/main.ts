import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // ✅ keep this
import '../style.css' // ✅ keep this

const app = createApp(App)
app.use(createPinia())
app.use(router) // ✅ keep this
app.mount('#app')