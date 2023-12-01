import * as authService from '../services/auth';
import { loginFailure, loginSuccess, registerFailure, registerSuccess } from './AuthActions';

export const register = async (user, dispatch, setLoading) => {
    try {
        setLoading(true);
        const res = await authService.register(user);
        dispatch(registerSuccess(res.data));
        setLoading(false);
    } catch (error) {
        dispatch(registerFailure);
        setLoading(false);
    }
};

export const login = async (user, dispatch, setLoading) => {
    try {
        setLoading(true);
        const res = await authService.login(user);
        dispatch(loginSuccess(res.data));
        setLoading(false);
    } catch (error) {
        dispatch(loginFailure);
        setLoading(false);
    }
};
