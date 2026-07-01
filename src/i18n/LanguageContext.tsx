import {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from 'react'

import { locales, type LocaleCode, type MessageKey } from './index'

// This type defines the data that the language context will share.
type LanguageContextValue = {
    locale: LocaleCode
    setLocale: (locale: LocaleCode) => void
    translate: (key: MessageKey) => string
}

// Spanish is the default language for the application.
const defaultLocale: LocaleCode = 'es'

// The context starts as null because it will receive its real value inside the provider.
const LanguageContext = createContext<LanguageContextValue | null>(null)

type LanguageProviderProps = {
    children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    // The active language is stored in state.
    // If the user already selected a language before, it is loaded from localStorage.
    const [locale, setLocale] = useState<LocaleCode>(() => {
        const savedLocale = localStorage.getItem('poika-locale')

        if (savedLocale && savedLocale in locales) {
            return savedLocale as LocaleCode
        }

        return defaultLocale
    })

    // Every time the selected language changes, it is saved in localStorage.
    useEffect(() => {
        localStorage.setItem('poika-locale', locale)
    }, [locale])

    // This function receives a message key and returns the text in the active language.
    function translate(key: MessageKey) {
        return locales[locale][key]
    }

    return (
        <LanguageContext.Provider value={{ locale, setLocale, translate }}>
            {children}
        </LanguageContext.Provider>
    )
}

// This custom hook allows any component to access the active language,
// change the language, and translate message keys.
export function useLanguage() {
    const context = useContext(LanguageContext)

    if (!context) {
        throw new Error('useLanguage must be used inside LanguageProvider')
    }

    return context
}