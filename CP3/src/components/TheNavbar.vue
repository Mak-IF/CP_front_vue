<template>
    <div class="navbar">
        <h3>CP</h3>
        
        <ul>
            <router-link to="/">Заявки</router-link>
        </ul>
        <ul>
            <router-link to="/counterpartyMonitoring">Мониторинг Контрагентов</router-link>
        </ul>
        <ul>
           <a href="#">Сообщения</a>
        </ul>
        <ul>
            <a href="#" @click.prevent="logout">Выход</a>
        </ul>

    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
    setup() {
        const router = useRouter() // подключем роут и стор
        const store = useStore()

        return {
            logout: () => {
                store.commit('auth/logout')  // !!! разобраться в отличии диспатч от комита
                router.push('/auth')
            }
        }
    }
}
</script>

<style scoped>

</style>