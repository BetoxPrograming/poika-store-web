import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.tsx'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'

// React renders the application inside the HTML element with the id "root".
// LanguageProvider makes the selected language available to the whole app.
createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <LanguageProvider>
            <App />
        </LanguageProvider>
    </StrictMode>,
)