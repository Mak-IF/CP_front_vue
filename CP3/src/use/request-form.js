// хук для формы RequestModal
import {useField, useForm} from 'vee-validate'
import * as yup from 'yup'

export function useRequestForm(){
    const {isSubmitting, handleSubmit} = useForm()   
    // currentUser,     executiveDepartment,     category,     subcategory,     way,     urgency,     cabinet,     phoneNumber,     requestText

    const {value: currentUser, errorMessage: userError, handleBlur: userBlur}       = useField('currentUser', yup.string().required('текст ошибки'))
    const {value: category}                                                         = useField('category')
    const {value: executiveDepartment}                                              = useField('executiveDepartment')
    const {value: subcategory}                                                      = useField('subcategory')
    const {value: way}                                                              = useField('way')
    const {value: urgency}                                                          = useField('urgency')
    const {value: cabinet, errorMessage:cabinetError, handleBlur: cabinetBlur}      = useField('cabinet', yup.string().trim().required())
    const {value: phoneNumber, errorMessage:phoneError, handleBlur: phoneBlur}      = useField('phoneNumber', yup.string().trim().required())
    const {value: requestText, errorMessage:requestError, handleBlur: requestBlur}  = useField('requestText', yup.string().trim().required())

    const onSubmit = handleSubmit( async () => { // отработка нажатия

    })


    return {
        isSubmitting,
        onSubmit,
        currentUser,     
        executiveDepartment,     
        category,     
        subcategory,     
        way,     
        urgency,     
        cabinet,     
        phoneNumber,     
        requestText,
        userError,
        userBlur,
        cabinetError,
        cabinetBlur,
        phoneError,
        phoneBlur,
        requestError,
        requestBlur
    }
}