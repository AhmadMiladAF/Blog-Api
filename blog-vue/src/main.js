import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/app.css'
import router from './router'
import axios from "axios";


/*todo: Указываем по умолчанию путь для axios чтобы потом не использовать при каждом запросе пример '/api/posts' без пути сервер*/
axios.defaults.baseURL = 'http://127.0.0.1:8000'

createApp(App).use(router).mount('#app')
