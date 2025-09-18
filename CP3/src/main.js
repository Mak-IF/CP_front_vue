import { createApp } from 'vue'
//import './style.css'
import App from './App.vue'
//import './registerServiceWorker'
import router from './router'
import store from './store'
import './theme.css'


createApp(App).use(store).use(router).mount('#app')

//.use(store).use(router)
