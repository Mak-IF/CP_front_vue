<template>
  <h2>Просмотр данных</h2>
  <!-- TODO: далее надо проверить когда будет апи  и  разделить на js и css-->  
  <!-- TODO: так же попробывать реализовать выгрузку именно  отфильтрованных данных-->        
  <!-- Фильтры -->
  <div class="filters">
    <div v-for="(header, index) in headers" :key="index" class="filter-group">
      <label :for="`filter-${index}`">{{ header }}</label>
      <input 
        :id="`filter-${index}`"
        type="text" 
        :placeholder="`Фильтр по ${header}`"
        v-model="filters[index]"
        @input="debounceFilter"
      >
    </div>
  </div>
          
  <!-- Состояние загрузки -->
  <div v-if="loading" class="loading">Загрузка данных...</div>
          
  <!-- Ошибка -->
  <div v-if="error" class="error">{{ error }}</div>
          
  <!-- Таблица -->
  <div v-if="tableData && tableData.length > 0" class="table-container">
    <table class="data-table">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header }}
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- Виртуальный рендеринг -->
        <tr 
          v-for="row in visibleRows" 
          :key="row.id || row[0]" 
          class="table-row"
        >
          <td v-for="(cell, cellIndex) in row" :key="cellIndex">
            {{ cell }}
          </td>
        </tr>
      </tbody>
    </table>
            
    <!-- Пагинация -->
    <div class="pagination">
      <button 
        @click="prevPage" 
        :disabled="currentPage === 1"
      >
        ← Назад
      </button>
              
      <span>Страница {{ currentPage }} из {{ totalPages }}</span>
              
        <button 
          @click="nextPage" 
          :disabled="currentPage === totalPages"
        >
          Вперед →
        </button>
    </div>
  </div>
          
  <p v-if="!loading && !error && (!tableData || tableData.length === 0)">
    Нет данных для отображения
  </p>

      
      
</template>

<script setup>
import { ref, onMounted, computed, watch } from 'vue'
import axios from 'axios'

  // Состояния
const activeTab = ref('upload')
const loading = ref(false)
const error = ref(null)
const tableData = ref([])
const headers = ref([])
const filters = ref([])
const currentPage = ref(1)
const pageSize = ref(50)
const debouncedFilter = ref(null)

// Получение данных
const fetchData = async () => {
  loading.value = true
  error.value = null
  
  try {
    const response = await axios.get('/api/get-excel-data', {
      headers: {
        'Content-Type': 'application/json'
      }
    })
    
    // Обработка успешного ответа
    if (Array.isArray(response.data)) {
      // Первый ряд как заголовки
      headers.value = response.data[0] || []
      
      // Остальные строки как данные
      tableData.value = response.data.slice(1) || []
      
      // Инициализация фильтров
      filters.value = Array(headers.value.length).fill('')
      
      // Сброс пагинации
      currentPage.value = 1
    } else {
      throw new Error('Неверный формат данных')
    }
  } catch (err) {
    // Обработка ошибок
    if (err.response?.status === 401) {
      error.value = 'Требуется авторизация'
    } else if (err.response?.status === 404) {
      error.value = 'Данные не найдены'
    } else {
      error.value = err.message || 'Ошибка загрузки данных'
    }
    console.error(err)
  } finally {
    loading.value = false
  }
}

// Обработка выбора вкладки
const handleTabSelect = (tab) => {
  activeTab.value = tab
  if (tab === 'view') {
    fetchData()
  }
}

// Вычисляемые свойства
const filteredData = computed(() => {
  if (!tableData.value.length) return []
  
  return tableData.value.filter(row => {
    return filters.value.every((filter, index) => {
      if (!filter) return true
      return String(row[index] || '').toLowerCase().includes(filter.toLowerCase())
    })
  })
})

const totalPages = computed(() => {
  return Math.max(1, Math.ceil(filteredData.value.length / pageSize.value))
})

const visibleRows = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filteredData.value.slice(start, end)
})

// Управление пагинацией
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

// Дебаунс фильтрации
const debounceFilter = () => {
  if (debouncedFilter.value) clearTimeout(debouncedFilter.value)
  
  debouncedFilter.value = setTimeout(() => {
    currentPage.value = 1
  }, 300)
}


</script>

<style scoped>
/* Стили для таблицы */
.table-container {
  max-height: 600px;
  overflow-x: auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 20px;
  position: relative;
}

.data-table {
  width: 100%;
  min-width: 1200px; /* Минимальная ширина для 20 колонок */
  border-collapse: collapse;
}

.data-table th,
.data-table td {
  padding: 12px 8px;
  border-bottom: 1px solid #eee;
  text-align: left;
  white-space: nowrap;
}

.data-table th {
  background-color: #f5f5f5;
  position: sticky;
  top: 0;
  z-index: 1;
}

/* Стили для фильтров */
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  overflow-x: auto;
}

.filter-group {
  flex: 1 1 200px;
  min-width: 150px;
}

.filter-group label {
  display: block;
  margin-bottom: 4px;
  font-size: 0.9rem;
}

.filter-group input {
  width: 100%;
  padding: 6px 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

/* Стили для пагинации */
.pagination {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 6px 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;
}

.pagination button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Состояния */
.loading {
  margin-top: 20px;
  padding: 15px;
  background-color: #e6f7ff;
  color: #1890ff;
  border-radius: 4px;
}

.error {
  margin-top: 20px;
  padding: 15px;
  background-color: #fff1f0;
  color: #ff4d4f;
  border-radius: 4px;
}
</style>