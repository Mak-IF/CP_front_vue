<template>
    <h4 v-if="requests.length === 0" class="text-center">Заявок пока нет</h4>
    <table v-else class="table">
      <thead>
        <tr>
          <th>#</th>
          <th>Дата</th>
          <th>ФИО</th>
          <th>Телефон</th>
          <th>Номер кабинета</th>
          <th>Заявка</th>
        </tr>
      </thead> 
      <tbody>
        <tr>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
        </tr>
      </tbody>
    </table>
    
    

</template>

<script>
export default {
    props: ['requests']
}
</script>