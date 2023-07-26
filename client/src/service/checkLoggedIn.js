import React, { useEffect } from 'react'

const checkLoggedIn = () => {
    const authToken = JSON.parse(localStorage.getItem('token'))
    return !!authToken
}

export default checkLoggedIn