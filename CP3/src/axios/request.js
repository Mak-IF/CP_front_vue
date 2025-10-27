import axios from 'axios'
import router from '../router'

const requestAxios = axios.create({
    baseURL: import.meta.env.VITE_VUE_APP_API_REQUEST // vite работает с .env через  import.meta.env но переменные должны начинаться с VITE_VUE_APP_
    
})

// проверка токена на дейтвительность - с помощью interceptors, если срок действия кончился - то перекидывать на авторизацию
requestAxios.interceptors.response.use(null, error => {
    if (error.response.status === 401) {
        router.push('/auth?message=auth') // ТУТ проверить когда будет апи
    }
    
    return Promise.reject(error)
})

export default requestAxios