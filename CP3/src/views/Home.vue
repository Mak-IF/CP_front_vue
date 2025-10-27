<template>
  <app-loader v-if="loading" />
  <app-page title="Список заявок" v-else> 
    <template #header>
      <button class="btn primary" @click="modal = true">Создать заявку</button> <!-- тут .value не нужен т.к. в шаблоне-->
    </template>
    
    <request-table :requests="[]"></request-table> <!--"requests"-->

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">  <!-- тут используем модальное окно-->
        <request-modal @created="modal = false"/> <!-- выводим модальное окно реквест модал-->
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
  import {ref, computed, onMounted} from 'vue';
//import RequestTableVue from '../components/request/RequestTable.vue';
  import AppPage from '../components/ui/AppPage.vue';
  import RequestTable  from '../components/request/RequestTable.vue';
  import AppModal from '../components/ui/AppModal.vue';
  import RequestModal from '../components/request/RequestModal.vue';
  import {useStore} from 'vuex' // /dist/vuex.cjs.js
  import AppLoader from '../components/ui/AppLoader.vue';
  


  export default {
    setup() {
      const store = useStore()
      const modal = ref(false)
      const loading = ref(false)

      onMounted( async () => {
        loading.value = true 
        await store.dispatch('request/load') 
      })

      const requests = computed( () => store.getters['request/requests'])
      return {
        modal, requests, loading 
      }
    },
    components: {AppPage, RequestTable, AppModal, RequestModal, AppLoader}
  }
  
</script>
