import { Navigate } from 'react-router-dom';

import config from '@/config';
import DefaultLayout from '@/layouts/DefaultLayout';
import NotHeaderLayout from '@/layouts/NotHeaderLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Watch from '@/pages/Watch';

const publicRoutes = [
    { path: config.routes.home, component: <Navigate to={config.routes.register} /> },
    { path: config.routes.register, component: <Register />, layout: DefaultLayout },
    { path: config.routes.login, component: <Login />, layout: NotHeaderLayout },
];

const privateRoutes = [
    { path: config.routes.home, component: <Home type="movies" />, layout: DefaultLayout },
    { path: config.routes.movies, component: <Home type="movies" />, layout: DefaultLayout },
    { path: config.routes.series, component: <Home type="series" />, layout: DefaultLayout },
    { path: config.routes.watch, component: <Watch />, layout: NotHeaderLayout },
];

export { publicRoutes, privateRoutes };
