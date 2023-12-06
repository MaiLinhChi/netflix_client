import config from '@/config';
import DefaultLayout from '@/layouts/DefaultLayout';
import NotHeaderLayout from '@/layouts/NotHeaderLayout';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Watch from '@/pages/Watch';

const { routes } = config;

const publicRoutes = [
    { path: routes.home, component: Register, layout: DefaultLayout },
    { path: routes.register, component: Register, layout: DefaultLayout },
    { path: routes.login, component: Login, layout: NotHeaderLayout },
];

const privateRoutes = [
    { path: routes.movies, component: Home, props: { type: 'movies' }, layout: DefaultLayout },
    { path: routes.series, component: Home, props: { type: 'series' }, layout: DefaultLayout },
    { path: routes.watch, component: Watch, layout: NotHeaderLayout },
];

export { publicRoutes, privateRoutes };
