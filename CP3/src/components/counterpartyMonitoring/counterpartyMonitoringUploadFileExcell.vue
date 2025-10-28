<template>
  <div class="excel-uploader">
      <input 
        class="card"
        type="file" 
        accept=".xlsx,.xls" 
        @change="handleFileUpload"
      >
      <!--<div v-if="fileName" >{{ fileName }}</div> --> <!-- TODO тут потом переделать чтоб с инпутом в одной строке был -->
    
    <button @click="uploadFile" class="btn-upload">Загрузить</button>
    
    <div v-if="loading" class="loading">Загрузка...</div>
    <div v-if="success" class="success">Файл успешно загружен!</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const file = ref(null);
const fileName = ref(''); // для отображения имени файла
const loading = ref(false);
const success = ref(false);
const error = ref(null);

const handleFileUpload = (event) => {
  file.value = event.target.files[0];
  fileName.value = file.value.name;
  console.log("file", file.value.name)
  success.value = false;
  error.value = null;
};

const uploadFile = async () => {
  if (!file.value) {
    error.value = 'Выберите файл';
    return;
  }
  
  loading.value = true;
  
  const formData = new FormData();
  formData.append('excelFile', file.value);
  
  try {
    const response = await axios.post('/api/upload-excel', formData, { // TODO переписать когда будет известен апи
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    if (response.status === 200) {
      success.value = true;
    } else {
      throw new Error('Ошибка загрузки файла');
    }
  } catch (err) {
    error.value = err.response?.data?.message || 'Не удалось загрузить файл';
    console.error(err);
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.excel-uploader {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.loading, .success, .error {
  margin-top: 10px;
  padding: 8px;
  border-radius: 4px;
}

.loading { background-color: #e6f7ff; color: #1890ff; }
.success { background-color: #f6ffed; color: #52c41a; }
.error { background-color: #fff1f0; color: #ff4d4f; }
</style>