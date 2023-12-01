import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { AuthContextProvider } from './authContext/AuthContext';
import GlobalStyle from './components/GlobalStyle';
import LanguageMultipleProvider from './components/MultipleLanguage';
import { LoadingContextProvider } from './contexts/LoadingContext';

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
