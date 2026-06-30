// Import the available languages from src/i18n/index.ts
import { locales, type LocaleCode, type MessageKey } from './index'

// Spanish is the default language
const defaultLocale: LocaleCode = 'es'

// Create the t function, short for translate.
// It receives one message key and one optional language code.
export function t(key: MessageKey, locale: LocaleCode = defaultLocale) {
    // Return the text that matches the selected language and key.
    return locales[locale][key]
}