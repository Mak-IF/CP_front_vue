<template>
    <form @submit.prevent="onSubmit">
        <div class="form-control" :class="{invalid: userError}">
            <label for="currentUser">От сотрудника:</label>
            <input type="text" id="currentUser" v-model="currentUser" @blur="userBlur">
            <small v-if="userError">{{ userError }}</small>
        </div>

        <div class="form-control" >
            <label for="executiveDepartment">Исполнитель:</label>
            <select id="executiveDepartment" v-model="executiveDepartment">
                <option value="aho">АХО</option>
                <option value="oit">ОИТ</option>
            </select>
        </div>

        <div class="form-control" >
            <label for="category">Категория::</label>
            <select id="category">

            </select>
        </div>

        <div class="form-control" >
            <label for="subcategory">Подкатегория:</label>
            <select id="subcategory">

            </select>
        </div>

        <div class="form-control" >
            <label for="way">Способ подачи:</label>
            <select  id="way">

            </select>
        </div>

        <div class="form-control" >
            <label for="urgency">Срочность:</label>
            <select  id="urgency">

            </select>
        </div>

        <div class="form-control" :class="{invalid: cabinetError}">
            <label for="cabinet">Номер кабинета:</label>
            <input type="text" id="cabinet"  v-model="cabinet" @blur="cabinetBlur">
            <small v-if="cabinetError">{{ cabinetError }}</small>
        </div>

        <div class="form-control" :class="{invalid: phoneError}">
            <label for="phoneNumber">Внутренный номер:</label>
            <input type="text"  id="phoneNumber" v-model="phoneNumber" @blur="phoneBlur">
            <small v-if="phoneError">{{ phoneError }}</small>
        </div>

        <div class="form-control" :class="{invalid: requestError}">
            <label for="requestText">Текст заявки:</label>
            <input type="text"  id="requestText" v-model="requestText" @blur="requestBlur">
            <small v-if="requestError">{{ requestError }}</small>
        </div>
        <button class="btn primary" :disabled="isSubmitting">Подать заявку</button>

    </form>

</template>

<script>
import { useRequestForm } from '../../use/request-form';

export default {
    setup() {
        return {
            ...useRequestForm
        }
    }
}

</script>