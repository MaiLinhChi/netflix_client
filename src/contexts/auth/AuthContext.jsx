import { createContext, useEffect, useReducer } from 'react';

import AuthReducer from './AuthReducer';
import { getLocalStorage, setLocalStorage } from '@/utils/function';

const INITIAL_STATE = {
    user: getLocalStorage('user') || null,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    useEffect(() => {
        setLocalStorage('user', state.user);
    }, [state.user]);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                error: state.error,
                dispatch,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
