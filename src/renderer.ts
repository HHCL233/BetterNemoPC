import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './renderer/App.vue';
import router from './renderer/router/index'
import 'mdui/mdui.css';
import 'mdui';
import './utils/codemaoApi';
import 'sober/carousel'
import { setColorScheme } from 'mdui/functions/setColorScheme.js';

const pinia = createPinia()
setColorScheme('#ce83fd');
createApp(App).use(router).use(pinia).mount('#app');