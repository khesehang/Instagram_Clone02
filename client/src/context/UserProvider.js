import React, { useEffect } from 'react'
import { toast } from 'react-toastify'
import { getAllPosts, getUserData } from './reducerFunction'
import { useStore } from './reducer'

const UserProvider = ({ children }) => {
    const { state, dispatch } = useStore()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userData = await getUserData()
                dispatch({ type: 'SET_USER', data: userData })

                const postsData = await getAllPosts()
                dispatch({ type: "SET_POSTS", data:postsData })
            } catch (error) {
                dispatch({ type: 'SET_ERROR' })
                toast.error('Failed to load posts. Please try again')
            }
        }
        fetchData();
    }, [dispatch])

    return (
        <>{!state.loading ? children : <div>Loading...</div>}</>
    )
}

export default UserProvider
