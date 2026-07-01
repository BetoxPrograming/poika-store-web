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

// Spanish is used only as a fallback when the browser language is not supported.
const fallbackLocale: LocaleCode = 'es'

// This key is used to save the selected language in the browser.
const localeStorageKey = 'poika-locale'

// This function checks if a language code exists in the available locales.
function isSupportedLocale(locale: string): locale is LocaleCode {
    return locale in locales
}

// This function tries to detect the browser language.
// Example: "en-US" becomes "en".
function getBrowserLocale(): LocaleCode {
    const browserLanguages = navigator.languages.length
        ? navigator.languages
        : [navigator.language]

    for (const language of browserLanguages) {
        const normalizedLanguage = language.toLowerCase().split('-')[0]

        if (isSupportedLocale(normalizedLanguage)) {
            return normalizedLanguage
        }
    }

    return fallbackLocale
}

// The context starts as null because it will receive its real value inside the provider.
const LanguageContext = createContext<LanguageContextValue | null>(null)

type LanguageProviderProps = {
    children: ReactNode
}

export function LanguageProvider({ children }: LanguageProviderProps) {
    // The active language is stored in state.
    // First, it tries to load the saved language from localStorage.
    // If there is no saved language, it uses the browser language.
    const [locale, setLocale] = useState<LocaleCode>(() => {
        const savedLocale = localStorage.getItem(localeStorageKey)

        if (savedLocale && isSupportedLocale(savedLocale)) {
            return savedLocale
        }

        return getBrowserLocale()
    })

    // Every time the selected language changes, it is saved in localStorage.
    useEffect(() => {
        localStorage.setItem(localeStorageKey, locale)
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