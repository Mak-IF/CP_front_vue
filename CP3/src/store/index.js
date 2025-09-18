import {createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'

const plugins = []  // пустой массив для плагинов - 

if (process.env.NODE_ENV === 'development') { // если идет прооцесс разработки  то на авторизацию пох
  plugins.push(createLogger())
}
export default createStore({
  plugins,
  state: {

  },

  mutations: {

  },

  actions: {

  },

  modules: {
    auth
  }
})
