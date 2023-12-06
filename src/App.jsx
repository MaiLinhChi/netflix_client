import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { LoadingContext } from './contexts/loading/LoadingContext';
import Loading from './components/Loading';
import ProtectedRoute from './routes/ProtectedRoute';
import PublicRoute from './routes/PublicRoute';
import { privateRoutes, publicRoutes } from './routes';

function App() {
    const { loading } = useContext(LoadingContext);
    return (
        <Router>
            {loading && <Loading />}
            <Routes>
                {publicRoutes.map((routeConfig, index) => {
                    let Layout = React.Fragment;
                    if (routeConfig) {
                        Layout = routeConfig.layout;
                    }
                    const Component = routeConfig.component;
                    return (
                        <Route
                            path={routeConfig.path}
                            key={index}
                            element={
                                <PublicRoute>
                                    <Layout>
                                        <Component />
                                    </Layout>
                                </PublicRoute>
                            }
                        />
                    );
                })}
                {privateRoutes.map((routeConfig, index) => {
                    let Layout = React.Fragment;
                    if (routeConfig.layout) {
                        Layout = routeConfig.layout;
                    }
                    const Component = routeConfig.component;
                    return (
                        <Route
                            path={routeConfig.path}
                            key={index}
                            element={
                                <ProtectedRoute>
                                    <Layout>
                                        <Component {...routeConfig.props} />
                                    </Layout>
                                </ProtectedRoute>
                            }
                        />
                    );
                })}
            </Routes>
        </Router>
    );
}

export default App;
