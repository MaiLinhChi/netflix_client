import { useState } from 'react';

import { LanguageContext } from './Context';

const LanguageMultipleProvider = ({ children }) => {
    const [language, setLanguage] = useState('en');

    return <LanguageContext.Provider value={{ language, setLanguage }}>{children}</LanguageContext.Provider>;
};

export default LanguageMultipleProvider;
