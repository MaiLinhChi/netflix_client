const getLocalStorage = (key) => {
    const value = JSON.parse(localStorage.getItem(key));
    return value;
};

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

const getSessionStorage = (key) => {
    const value = JSON.parse(sessionStorage.getItem(key));
    return value;
};

const setSessionStorage = (key, value) => {
    sessionStorage.setItem(key, JSON.stringify(value));
};

const clearAuthData = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
};

const redirectToLogin = () => {
    window.location.href = '/login';
};

export { getLocalStorage, setLocalStorage, getSessionStorage, setSessionStorage, clearAuthData, redirectToLogin };
