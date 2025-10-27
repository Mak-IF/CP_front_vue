
<template>
  
    <Sidebar 
      :active-tab="activeTab" 
      @select="handleTabSelect"
    />
    <!-- Основной контент -->
    <div class="content">
      <div v-if="activeTab === 'upload'">
        <UploadFileExcell />
      </div>
      
      <div v-if="activeTab === 'view'" class="view-section">
        <h2>Просмотр данных</h2>
        <p>Здесь будет отображаться содержимое загруженного файла</p>
      </div>
      
      <div v-if="activeTab === 'export'" class="export-section">
        <h2>Выгрузка данных</h2>
        <button @click="exportData">Скачать данные</button>
      </div>
    </div>
    
 

</template>

<script setup>
import { ref } from 'vue'
import Sidebar from '../components/counterpartyMonitoring/counterpartyMonitoringSideBar.vue'
import UploadFileExcell from '../components/counterpartyMonitoring/UploadFileExcell.vue'

const activeTab = ref('upload')

const handleTabSelect = (tab) => { // Обработчик переключения вкладок - разобраться как работает
  activeTab.value = tab
}

const exportData = () => {
  // Логика экспорта данных
  alert('Экспорт данных')
}

// TODO: разобраться как  сайдбар воткнуть чтоб остальные элементы (навбар и отображение ) не налезали друг на друга

</script>

<style scoped>
/*
.main-content {
  display: flex;
  flex: 1;
  overflow: hidden;
}
*/
/* Сайдбар + контент */
.content-wrapper {
  display: flex;
  flex: 1;
  overflow: hidden;
}

/* Сайдбар 
.sidebar {
  width: 30%;
  padding: 20px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}*/
/*
.content {
  flex: 1;
  padding: 20px;
  overflow-y: auto;
}*/
</style>