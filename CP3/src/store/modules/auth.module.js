import axios from 'axios'
import error from '../../utils/error'
const TOKEN_KEY = 'jwt-token'
const REFRESH_KEY = 'refresh-token'
const USER_KEY = 'user'



export default {
    namespaced: true,
    state() {
        return {  // первоначальна инициализация токена
            token: localStorage.getItem(TOKEN_KEY)
        }
    },
    mutations: { // синхронный код изменяющий стейт
        setToken(state, data) { //token
            // тут немного переделал - не только токен писать но и рефреш и роли и данные пользователя
            if (data.access) {
                state.token = data.access  // сохраняем токен в стейт 
                localStorage.setItem(TOKEN_KEY,data.access) // token // сохраняем токен в локал сторедж - вроде в другое место надо класть - потом глянуть   
            }
            if (data.refresh) {
                state.refreshToken = data.refresh 
                localStorage.setItem(REFRESH_KEY,data.refresh)   
            }
            // объединим данные пользователя  или из апи присылать объект
            //if (data.roles) {
            //    const userRoles = data.roles  
            //}else {
            //    const userRoles = []
            //}
            //if (data.userFIO) {
            //    const userFIO = data.userFIO 
            //}else {
            //    const userFIO = null
            //}
            //if (data.email) {
            //    const email = data.email 
            //}else {
            //    const email = null
            //}
            if (data.username) {
                //console.log('username', data.username)
                const user = {
                    "username": data.username,
                    "email": data.email,
                    "roles": data.roles,
                    "userFIO": data.userFIO
                }
                //console.log('user', user)
                state.user = user
                localStorage.setItem(USER_KEY, JSON.stringify(user))
            }

            
        },
        logout(state) {
            state.token = null  // при выходе сносим токен, и с локалсторадж тоже
            localStorage.removeItem(TOKEN_KEY)

            // тут добавлю удаление остальной добавленой инфы
            state.refreshToken = null 
            localStorage.removeItem(REFRESH_KEY)

            state.user = null 
            localStorage.removeItem(USER_KEY)

        }
    },
    actions: {
        

        async login({ commit, dispatch }, payload) {   // выполнение запроса к серверу логина,  в пейлоад лежит вальюз из формы логина
            try {
                //console.log('payload', payload)
                const url_login = "http://127.0.0.1:8000/api/auth/login/"
                const {data} = await axios.post(url_login, payload)
                console.log('Data', data)
                //console.log('payload', payload)
                commit('setToken', data) //data.access
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