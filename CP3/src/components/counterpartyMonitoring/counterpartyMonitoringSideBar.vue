<template>
  <div class="grid-sidebar"> <!-- sidebar -->
    <nav class="menu">
      <button 
        v-for="item in menuItems" 
        :key="item.id" 
        :class="['menu-item', { active: activeTab === item.id }]" 
        @click="selectTab(item.id)"
      >
        {{ item.label }}
      </button>
    </nav>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  activeTab: {
    type: String,
    default: 'upload'
  }
})

const emit = defineEmits(['select'])

const menuItems = [
  { id: 'upload', label: 'Загрузить' },
  { id: 'view', label: 'Посмотреть' },
  { id: 'export', label: 'Выгрузить' }
]

const selectTab = (tabId) => {
  emit('select', tabId)
}
</script>

<style scoped>
/*
.sidebar {
  width: 200px;
  padding: 20px;
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}*/
/* перенес в основу
.menu-item {
  width: 100%;
  padding: 12px 16px;
  margin-bottom: 8px;
  border: none;
  border-radius: 4px;
  background-color: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
}

.menu-item:hover {
  background-color: #e0e0e0;
}

.menu-item.active {
  background-color: #007bff;
  color: white;
} */
</style>
