import { createApp } from 'vue';
import { createPinia } from 'pinia'
import App from './renderer/App.vue';
import router from './renderer/router/index'
import 'mdui/mdui.css';
import 'mdui';
import './utils/codemaoApi';
import 'sober/carousel'
import { setColorScheme } from 'mdui/functions/setColorScheme.js';
import { createScheme } from 'sober-theme'

createScheme('#471E7F');
setColorScheme('#471E7F');
const pinia = createPinia();
createApp(App).use(router).use(pinia).mount('#app');