import config from '@/config';
import { getLocalStorage } from '@/utils/function';
import { Navigate } from 'react-router-dom';

const PublicRoute = ({ children }) => {
    const accessToken = getLocalStorage('access_token');
    if (accessToken) {
        return <Navigate to={config.routes.movies} />;
    }
    return children;
};

export default PublicRoute;
