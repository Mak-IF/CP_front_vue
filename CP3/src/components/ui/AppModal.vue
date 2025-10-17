<!-- модальное окно для страницы-->
<template>
    <div class="modal-backdrop" @click="$emit('close')"></div>
    <div class="modal">
        <h3 v-if="title">{{title}}</h3>

        <slot /> <!-- с помощью слотов добавляем разные элементы на форму-->
    </div>
</template>

<script>
export default {
    emits: ['close'], // эмитим событие close для формы home
    props: {
        title: {
            type: String
        }
    }
}
</script>