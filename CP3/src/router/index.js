import { createRouter, createWebHistory } from 'vue-router'
import store from '../store'
import Home from '../../src/views/Home.vue'
import jwt from 'vue-jwt-decode' // для работы с токеном - декодировать  и прочее
//import {jwt} from 'jsonwebtoken'


const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
        layout: 'main',
        auth: true // по этому параметру будем определять нужна ли авторизация для посещения этой страницы

    }
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
    meta: {
        layout: 'main',
        auth: true
    }
  },
  
  {
    path: '/counterpartyMonitoring',
    name: 'counterpartyMonitoring',
    component: () => import('../views/counterpartyMonitoring.vue'),
    meta: {
        layout: 'main',
        auth: true
    }
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/Auth.vue'),
    meta: {
        layout: 'auth',
        auth: false
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  linkActiveClass: 'active',
  linkExactActiveClass: 'active'
})

router.beforeEach( (to, from, next) =>{ // проверка перед роутингом нужна ли авторизация
  const requiereAuth = to.meta.auth
  
  const token = localStorage.getItem('jwt-token');
  console.log('token', token);
  if (token) {
    const decodedToken = jwt.decode(token);
    console.log('decodedToken', decodedToken);
    console.log('Role', decodedToken.role); 
  }
    if (requiereAuth && store.getters['auth/isAuthenticated']) { // если нужна авторизация и пользователь авторизован то пропускаем дальше
        
      next()    
    } else if (requiereAuth && !store.getters['auth/isAuthenticated']) {  // если нужна авторизация и пользователь не авторизован отправаляем на auth - можно в параметре кинуть сообщение
        next('/auth?message=auth')
    }  else {
        next()
    }
}

)
export default router
