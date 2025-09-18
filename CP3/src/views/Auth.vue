<template>
    <form class="card" @submit.prevent="onSubmit">
        <h1> Войдите в систему</h1>

        <div :class="['form-control', {invalid: uError}]">
            <label for="username">Имя пользователя</label>
            <input type="username" id="username" v-model="username" @blur="uBlur">
            <small v-if="uError">{{ uError }}</small> 
        </div>

        <div :class="['form-control', {invalid: pError}]">
            <label for="password">Имя пользователя</label>
            <input type="password" id="password" v-model="password" @blur="pBlur">
            <small v-if="pError">{{ pError }}</small> 
        </div>

        <button class="btn-primary" type="submit" :disabled="isSubmitting || isTooManyAttempts">Войти</button>
        <div class="text-danger" v-if="isTooManyAttempts">Слишком много попыток. Попробуйте позже </div>
    </form>
</template>

<script>
import { useLoginForm } from '../../../test_router/src/use/login-form';


export default {
    setup() {
        return {...useLoginForm()}    
    }
}
</script>