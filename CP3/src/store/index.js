import {createStore, createLogger } from 'vuex'
import auth from './modules/auth.module'

const plugins = []  // пустой массив для плагинов - 

if (process.env.NODE_ENV === 'development') { // если идет прооцесс разработки  то на авторизацию пох
  plugins.push(createLogger())
}
export default createStore({
  plugins,
  state() {
      return {
        message: null
      }
  },

  mutations: {
    setMessage(state, message) { // показывает сообщение об ошибке
      state.message = message
    },
    clearMessage(state) {   // обнуляет сообщение об ошибке
      state.message = null
    }
  },

  actions: {
    setMessage({commit}, message){  //управляет показом сообщения об оошибке по интервалу
      commit('setMessage', message)
      setTimeout( () => {
        commit('clearMessage')
      }, 5000)
    }
  },

  modules: {
    auth
  }
})
