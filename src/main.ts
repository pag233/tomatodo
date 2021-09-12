import { createApp } from 'vue'
import App from './App.vue'
import store, { key } from './store'

import '@icon-park/vue-next/styles/index.css';

createApp(App).use(store, key).mount('#app')