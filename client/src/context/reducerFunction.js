import { httpClient } from "../utils/httpClient";

export const getUserData =async () => {
    try {
        const userData = await JSON.parse(localStorage.getItem('user'))
        return userData;
    } catch (error) {
        console.error(error)
        return null;
    }
}

export const getAllPosts = async () => {
    try {
        const response = await httpClient.GET('/post/allpost', true)
        const { data } = response;
        return data;
    } catch (error) {
        console.error(error)
        throw new Error
    }
}