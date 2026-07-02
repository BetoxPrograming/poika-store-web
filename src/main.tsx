import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router'
import App from './App'
import { LanguageProvider } from './i18n/LanguageContext'
import './index.css'

// Find the HTML element where React will render the application.
const rootElement = document.getElementById('root')

if (!rootElement) {
    throw new Error('Root element was not found')
}

createRoot(rootElement).render(
    <StrictMode>
        {/* Enable client-side routing for the entire application. */}
        <BrowserRouter>
            {/* Make the selected language available to every component. */}
            <LanguageProvider>
                <App />
            </LanguageProvider>
        </BrowserRouter>
    </StrictMode>,
)