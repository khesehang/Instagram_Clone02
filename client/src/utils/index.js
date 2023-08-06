export const getAuthenticationToken = () => {
    return JSON.parse(localStorage.getItem('token'))
}