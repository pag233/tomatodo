import { createApp } from 'vue'
import App from './App.vue'
import store, { key } from './store'

import '@icon-park/vue-next/styles/index.css';
// import 'element-plus/dist/index.css';

import './element-variables.scss'

createApp(App).use(store, key).mount('#app')