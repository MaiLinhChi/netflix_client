import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './contexts/auth/AuthContext.jsx';
import GlobalStyle from './components/GlobalStyle';
import LanguageMultipleProvider from './components/MultipleLanguage';
import { LoadingContextProvider } from './contexts/loading/LoadingContext.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <GlobalStyle>
            <AuthContextProvider>
                <LoadingContextProvider>
                    <LanguageMultipleProvider>
                        <App />
                    </LanguageMultipleProvider>
                </LoadingContextProvider>
            </AuthContextProvider>
        </GlobalStyle>
    </React.StrictMode>,
);
