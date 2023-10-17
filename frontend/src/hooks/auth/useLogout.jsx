import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
    const [state, setState] = useState({
        error: null,
        isLoading: null
    });
    const {error, isLoading} = state;
    const {dispatch} = useAuthContext();

    const logout = async () => {
        setState((prev) => ({...prev, error: null, isLoading: true}));
        const response = await fetch('/api/v1/auth/logout', {
            method: 'GET'
        });
        const data = await response.json();
        if(!response) {
            setState((prev) => ({...prev, error: json.error, isLoading: false}));
        }
        if(!data.success) {
            setState((prev) => ({...prev, error: data.error, isLoading: false}));
        }
        if(response && data.success) {
            dispatch({type: 'LOGOUT'});
            localStorage.setItem('user', null);
            setState((prev) => ({...prev, isLoading: false}));
        }
    }
    return {logout, isLoading, error};
}