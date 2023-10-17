import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
    const [state, setState] = useState({
        error: null,
        isLoading: null
    });
    const {error, isLoading} = state;
    const {dispatch} = useAuthContext();

    const login = async (credentials) => {
        setState((prev) => ({...prev, error: null, isLoading: true}));
        const response = await fetch('/api/v1/auth/login', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
        });
        const data = await response.json();
        if(!response) {
            setState((prev) => ({...prev, error: json.error, isLoading: false}));
        }
        if(!data.success) {
            setState((prev) => ({...prev, error: data.error, isLoading: false}));
        }
        if(response && data.success) {
            dispatch({
                type: 'LOGIN', 
                payload: {email: credentials.email, token: data.token}
            });
            localStorage.setItem('user', JSON.stringify({email: credentials.email, token: data.token}));
            setState((prev) => ({...prev, isLoading: false}));
        }
    }
    return {login, isLoading, error};
}