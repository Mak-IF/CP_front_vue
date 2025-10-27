<template>
    <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
    <table v-else class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Дата</th>
          <th>От сотрудника</th>
          <th>Исполнитель</th>
          <th>Категория</th>Подкатегория
          <th>Подкатегория</th>
          <th>Способ подачи</th>
          <th>Срочность</th>
          <th>Номер кабинета</th>
          <th>Внутренный номер</th>
          <th>Заявка</th>
          <th>Открыть</th>
        </tr>
      </thead> 
      <tbody>
        <tr v-for="(requests, idx) in requests" :key="requests.id">
            <td>{{ idx + 1 }}</td>
            <td>{{ requests.date }}</td>
            <td>{{ requests.currentUser }}</td>
            <td>{{ requests.executiveDepartment }}</td>
            <td>{{ requests.category }}</td>
            <td>{{ requests.subcategory }}</td>
            <td>{{ requests.way }}</td>
            <td>{{ requests.urgency }}</td>
            <td>{{ requests.cabinet }}</td>
            <td>{{ requests.phoneNumber }}</td>
            <td>{{ requests.requestText }}</td>
            <td>
              <router-link v-slot="{navigate}" custom :to="{name: 'Request', params: {id: requests.id}} ">
                <button class="btn primary" @click="navigate">Открыть</button>
              </router-link>
            </td>
        </tr>
      </tbody>
    </table>
    
    

</template>

<script>
export default {
    props: ['requests']
}
</script>