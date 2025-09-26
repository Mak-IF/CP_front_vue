import axios from 'axios'
import error from '../../utils/error'
const TOKEN_KEY = 'jwt-token'

export default {
    namespaced: true,
    state() {
        return {  // первоначальна инициализация токена
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: { // синхронный код изменяющий стейт
        setToken(state, token) {
            state.token = token  // сохраняем токен в стейт
            localStorage.setItem(TOKEN_KEY,token) // сохраняем токен в локал сторедж - вроде в другое место надо класть - потом глянуть
        },
        logout(state) {
            state.token = null  // при выходе сносим токен, и с локалсторадж тоже
            localStorage.removeItem(TOKEN_KEY)
        }
    },
    actions: {
        

        async login({ commit, dispatch }, payload) {   // выполнение запроса к серверу логина,  в пейлоад лежит вальюз из формы логина
            try {
                console.log(payload)
                const url_login = "http://127.0.0.1:8000/api/auth/login/"
                const {data} = await axios.post(url_login, payload)
                console.log('Data', data)
                commit('setToken', data.access)
                commit('clearMessage', null, {root: true}) // очищает собщения ошибок если удачно перешел
            } catch (e) {
                dispatch('setMessage', {
                    value: error(e.response.data.message),
                    type: 'danger'
                }, {root: true})
                console.log(error(e.response.data.message)) //      !TODO дописать потом обработку ошибок под то что возвращает апи   console.dir(e.response.data.error.message) //
                throw new Error(e)
            }
            
            //console.log(payload, import.meta.env.VITE_VUE_APP_API_KEY)
            //commit('setToken', 'TEST TOKEN')  // !TODO потом сюда норм токен запихнуть
        }
    },
    getters: {
        token(state) { // возвращает токен по гет запросу
            return state.token 
        },
        isAuthenticated(_, getters){  // тут можем восользоваться готовым геттерсом, первый параметр стейт не используем поэтому вместо него _
            return !!getters.token
        }
    }
}