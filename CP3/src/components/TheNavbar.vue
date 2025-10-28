<template>
    <nav class="grid-navbar"> <!-- navbar--> 
        <h3>CP</h3>
        
        <ul class="navbar-menu"> <!--потом передлать на выадающее меню-->
            <li>
                <router-link to="/">Заявки</router-link>
            </li>
            <li>
                <router-link to="/counterpartyMonitoring">Мониторинг Контрагентов</router-link>
            </li>
            
        </ul>

        <div class="navbar-userinfo">
            <!--TODO: потом вставить ФИО -->
            <p>{{userFIO}}</p>
            <ul class="navbar-menu-userinfo"> <!--потом передлать на выадающее меню-->
                <li>
                    <a href="#">Сообщения</a>
                </li>
                
                <li>
                    <a href="#" @click.prevent="logout">Выход</a>
                </li>
            </ul>
        </div>

    </nav>
</template>

<script>
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import { computed, ref } from 'vue';

export default {
    setup() {
        const router = useRouter() // подключем роут и стор
        const store = useStore()
        const userFIO = ref('') //localStorage.getItem(jwt-token)

        if (localStorage.getItem("user")) {  
            const user = JSON.parse(localStorage.getItem("user") )
            if (user["userFIO"]) {
               userFIO.value = user["userFIO"]
            } else {
                userFIO.value = user["username"]
                
            }
            //userFIO.value = localStorage.getItem("userFIO")
        }else{
            userFIO.value = "Тут будет ФИО"
        }
        
        //console.log(userFIO)

        return {
            logout: () => {
                store.commit('auth/logout')  // !!! разобраться в отличии диспатч от комита
                router.push('/auth')
            },
            userFIO
        }
    }
}
</script>

<style scoped>
/* Навбар 
.navbar {
  height: 60px;
  
  
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}
  */
</style>