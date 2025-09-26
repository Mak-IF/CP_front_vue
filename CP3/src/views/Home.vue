<template>
  <app-page title="Список заявок">
    <template #header>
      <button class="btn primary" @click="modal = true">Создать заявку</button> <!-- тут .value не нужен т.к. в шаблоне-->
    </template>
    
    <request-table :requests="[]"></request-table>

    <teleport to="body">
      <app-modal v-if="modal" title="Создать заявку" @close="modal = false">  <!-- тут используем модальное окно-->
        <request-modal /> <!-- выводим модальное окно реквест модал-->
      </app-modal>
    </teleport>
  </app-page>
</template>

<script>
  import {ref} from 'vue';
//import RequestTableVue from '../components/request/RequestTable.vue';
  import AppPage from '../components/ui/AppPage.vue';
  import RequestTable  from '../components/request/RequestTable.vue';
  import AppModal from '../components/ui/AppModal.vue';
  import RequestModal from '../components/request/RequestModal.vue';
  


  export default {
    setup() {
      const modal = ref(false)

      return {
        modal 
      }
    },
    components: {AppPage, RequestTable, AppModal, RequestModal}
  }
  
</script>
