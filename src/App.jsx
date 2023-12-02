import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import { AuthContext } from './contexts/auth/AuthContext';
import DefaultLayout from './layouts/DefaultLayout';
import NotHeaderLayout from './layouts/NotHeaderLayout';
import config from './config';
import Register from './pages/Register';
import Login from './pages/Login';
import Home from './pages/Home';
import Watch from './pages/Watch';
import { LoadingContext } from './contexts/loading/LoadingContext';
import Loading from './components/Loading';

function App() {
    const { user } = useContext(AuthContext);
    const { loading } = useContext(LoadingContext);
    return (
        <Router>
            {loading && <Loading />}
            <Routes>
                <Route
                    path={config.routes.register}
                    element={
                        !user ? (
                            <DefaultLayout>
                                <Register />
                            </DefaultLayout>
                        ) : (
                            <Navigate to={config.routes.home} />
                        )
                    }
                />
                <Route
                    path={config.routes.login}
                    element={
                        !user ? (
                            <NotHeaderLayout>
                                <Login />
                            </NotHeaderLayout>
                        ) : (
                            <Navigate to={config.routes.home} />
                        )
                    }
                />
                <Route
                    path={config.routes.home}
                    element={
                        !user ? (
                            <Navigate to={config.routes.register} />
                        ) : (
                            <DefaultLayout>
                                <Home type="movies" />
                            </DefaultLayout>
                        )
                    }
                />
                {user && (
                    <>
                        <Route
                            path={config.routes.movies}
                            element={
                                <DefaultLayout>
                                    <Home type="movies" />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.series}
                            element={
                                <DefaultLayout>
                                    <Home type="series" />
                                </DefaultLayout>
                            }
                        />
                        <Route
                            path={config.routes.watch}
                            element={
                                <NotHeaderLayout>
                                    <Watch />
                                </NotHeaderLayout>
                            }
                        />
                    </>
                )}
            </Routes>
        </Router>
    );
}

export default App;
