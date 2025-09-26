import {computed, watch} from 'vue'
import * as yup from 'yup'
import {useField, useForm} from 'vee-validate'
import {useStore} from 'vuex'
import {useRouter} from 'vue-router'

export function useLoginForm() {
    const store = useStore() // получаем стор 
    const router = useRouter() // используем роутер
    const {handleSubmit, isSubmitting, submitCount} = useForm()

        const {value: username, errorMessage: uError, handleBlur: uBlur} = useField(
            'username',
            yup
                .string()
                .trim()
                .required('Введите имя доменного пользователя')
        )
        const {value: password, errorMessage: pError, handleBlur: pBlur} = useField(
            'password',
            yup
                .string()
                .trim()
                .required('Введите пароль')
                .min(6)
        )
        const isTooManyAttempts = computed(() => submitCount.value >=3)

        watch(isTooManyAttempts, val =>[
            setTimeout(() => submitCount.value = 0, 2000)
        ])
        const onSubmit = handleSubmit(async values =>{
            try{
                await store.dispatch('auth/login', values)  // тк метод логин в экшнах используем диспатч, values передаем чтобы потом засылать на сервер
                router.push('/')  // и преброс на главную страницу
            } catch (e) {
                
            }
        })
        return {
            username,
            uError,
            uBlur,
            password,
            pError,
            pBlur,
            onSubmit,
            isSubmitting,
            isTooManyAttempts
        }
}