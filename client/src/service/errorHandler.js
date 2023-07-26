import { toast } from "react-toastify"

const extractDbErrMessage = (errObj) => {
    if (errObj.code === 11000) {
        let key = Object.keys(errObj.keyPattern)[0]
        return `${key} should be unique}`
    }
    return null
}

export const errorHandler = err => {
    let errMsg = 'Something went wrong'
    let error = err?.response?.data  // Optional chaining to sagely access nested properties
    if (error) {
        errMsg = typeof error.msg === 'string' ? error.msg : extractDbErrMessage(error.msg)
    }
    toast.error(errMsg)
}