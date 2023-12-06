import config from '@/config';
import { getLocalStorage } from '@/utils/function';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const user = getLocalStorage('user');
    return user ? children : <Navigate to={config.routes.login} />;
};

export default ProtectedRoute;
