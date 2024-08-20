import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import '@/assets/app.css'
import router from './router'
import axios from "axios";
import store from './store'


/*todo: Видео для настройки CSRF-Token */
// https://www.youtube.com/watch?v=2zKoS8GsKK8


/*todo: Указываем по умолчанию путь для axios чтобы потом не использовать при каждом запросе пример '/api/posts' без пути сервер*/
axios.defaults.baseURL = 'http://localhost:8000';

/*todo: Подключаем для Laravel Sanctum */

axios.defaults.withCredentials = true;
axios.defaults.withXSRFToken = true;



/* todo: Чтобы при обновлении браузера наши куки не исчезали всё заносим в наш метод авторизации*/
store.dispatch('authenticate').then(()=> {
    createApp(App).use(router).use(store).mount('#app')
})
