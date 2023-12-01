// Register
export const registerSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const registerFailure = () => ({
    type: 'LOGIN_FAILURE',
});

// Login
export const loginSuccess = (user) => ({
    type: 'LOGIN_SUCCESS',
    payload: user,
});

export const loginFailure = () => ({
    type: 'LOGIN_FAILURE',
});

// Logout
export const logout = () => ({
    type: 'LOGOUT',
});
