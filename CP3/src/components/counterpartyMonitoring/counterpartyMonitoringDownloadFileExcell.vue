<template>
  <h2>Выгрузка данных</h2>
  <!-- Проверить как будет апи -->
  <button @click="exportData" :disabled="exportLoading">
    {{ exportLoading ? 'Скачивание...' : 'Скачать Excel' }}
  </button>
  <p v-if="exportSuccess" class="success">Файл успешно сохранен</p>
  <p v-if="exportError" class="error">{{ exportError }}</p>
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'

const exportLoading = ref(false)
const exportSuccess = ref(false)
const exportError = ref(null)


// Экспорт данных
const exportData = async () => {
  exportLoading.value = true
  exportSuccess.value = false
  exportError.value = null
  try {
    const response = await axios.get('/api/export-excel', {
      responseType: 'blob'
    })


    
    const url = window.URL.createObjectURL(new Blob([response.data]))
    const link = document.createElement('a')
    link.href = url
    link.setAttribute('download', 'export.xlsx')
    document.body.appendChild(link)
    link.click()
    link.remove()
  } catch (error) {
    exportError.value = 'Не удалось скачать файл'
    console.error('Ошибка экспорта:', error)
    alert('Не удалось скачать файл')
  } finally {
    exportLoading.value = false
  }
}
</script>