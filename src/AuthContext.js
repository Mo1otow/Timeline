import React from 'react'
import { AccessToken } from 'react-native-fbsdk'

export const AuthContext = React.createContext()

const initialState = {
    userData: null
}

function reducer(state, action) {
    switch (action.type) {
        case "ADD_TOKEN":
            return {
                ...state,
                userData: action.payload
            }
        case "REMOVE_TOKEN": 
            return {
                ...state,
                userData: null
            }

        default:
            throw new Error();
    }
}

export default function AuthProvider({ children }) {

    const [state, dispatch] = React.useReducer(reducer, initialState)

    const [loading, setLoading] = React.useState(false)

    const addToken = React.useCallback((payload) => {
        dispatch({ type: 'ADD_TOKEN', payload })
    }, [dispatch])

    const removeToken = React.useCallback(() => {
        setLoading(true)
        dispatch({type: 'REMOVE_TOKEN'})
        setLoading(false)
    }, [dispatch, setLoading])

    const getToken = React.useCallback(async () => {
        setLoading(true)
        const token = (await AccessToken.getCurrentAccessToken())
        if (token) {
            addToken(token)
        }
        setLoading(false)
    }, [addToken, setLoading])

    React.useEffect(() => {
        getToken()
    }, [getToken])


    const value = React.useMemo(() => ({
        loading,
        user: state.userData,
        getToken,
        removeToken
    }), [state, getToken, removeToken, loading])

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}