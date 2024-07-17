import { createApp } from 'vue'
import Toaster from '@meforma/vue-toaster'
import App from './App.vue'
import axios from 'axios'

const app = createApp(App).use(Toaster)
app.config.globalProperties.axios = axios
axios.defaults.baseURL = 'http://localhost:5555'

app.mount('#app')
