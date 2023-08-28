import { createApp } from 'vue'
import axios from "axios";
import store from '../src/store.js'
import App from '../src/components/Index.vue'
import '../src/assets/sass/main.sass'

if (!window.axios) {
    window.axios = axios
}

export default createApp(App)
    .use(store, 'textEditor')
    .mount('#app');
