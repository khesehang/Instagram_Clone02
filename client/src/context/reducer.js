import { createContext, useContext, useReducer } from "react";

// Create a separate context for user reducer
export const StoreContext = createContext();

const initialState = {
    user: null,
    posts: null,
    loading: true,
}

export const storeReducer = (state, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.data,
                loading: false,
            };
        case 'SET_POSTS':
            return {
                ...state,
                posts: action.data,
                loading: false,
            };
        case 'SET_ERROR':
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }

}

// StoreProvider compoent to wrap the ectire application and profice the store context
export const StoreProvider = ({ children }) => {
    const [state, dispatch] = useReducer(storeReducer, initialState)

    return (
        <StoreContext.Provider value={{ state, dispatch }} >
            {children}
        </StoreContext.Provider>
    )
}

// Custom hook to use the store context in components
export const useStore = () => useContext(StoreContext)