import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createPersistPlugin } from '@/stores/persistPlugin'


import App from './App.vue'
import router from './router'

const app = createApp(App)

const pinia = createPinia()
pinia.use(createPersistPlugin())
app.use(pinia)
app.use(router)

app.mount('#app')
