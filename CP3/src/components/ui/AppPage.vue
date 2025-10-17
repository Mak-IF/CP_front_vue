<template>
    <div class="card">
        <h1 class="card-title">
            {{ title }}
            <slot name="header" /> <!-- тут вставляем что то - например кнопку создать заявку в заявках-->
        </h1>
        
        <slot />
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String,
            required: true
            
        }
    },
    setup(props) {
        document.title = `${props.title} | Корпоративный портал`    
    }    
}
</script>