// хук для формы RequestModal
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(fn_submit){
    console.log('enter use request form')
    const {isSubmitting, handleSubmit} = useForm({
        initialValues: {
            executiveDepartment: 'oit' // определяем предопределенные значения селектов - тут еще подумать если есть зависимость от предыдущих выбранных  оплей или отпользователя
        }
    }

    )   
    // currentUser,     executiveDepartment,     category,     subcategory,     way,     urgency,     cabinet,     phoneNumber,     requestText

    const {value: currentUser, errorMessage: userError, handleBlur: userBlur}       = useField(
                                                                                                'currentUser',
                                                                                                yup.string()
                                                                                                .required('текст ошибки'))
    const {value: category}                                                         = useField('category') // там где селект доп параметры ерормесаджи а хендблур не нужны так как выбираем из списка
    const {value: executiveDepartment}                                              = useField('executiveDepartment')
    const {value: subcategory}                                                      = useField('subcategory')
    const {value: way}                                                              = useField('way')
    const {value: urgency}                                                          = useField('urgency')
    const {value: cabinet, errorMessage: cabinetError, handleBlur: cabinetBlur}      = useField('cabinet', yup.string().trim().required())
    const {value: phoneNumber, errorMessage: phoneError, handleBlur: phoneBlur}      = useField('phoneNumber', yup.string().trim().required())
    const {value: requestText, errorMessage: requestError, handleBlur: requestBlur}  = useField('requestText', yup.string().trim().required())

    const onSubmit = handleSubmit(fn_submit)// отработка нажатия


    return {
        isSubmitting,
        onSubmit,
        
        currentUser, 
        userError,
        userBlur,

        executiveDepartment,     
        category,     
        subcategory,     
        way,     
        urgency, 

        cabinet, 
        cabinetError,
        cabinetBlur,

        phoneError,
        phoneBlur,
        phoneNumber,   

        requestText,
        requestError,
        requestBlur
    }
}