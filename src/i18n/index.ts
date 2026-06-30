import { es } from './locales/es'
import { en } from './locales/en'
import { fr } from './locales/fr'
import { pt } from './locales/pt'
import { ja } from './locales/ja'

export const locales = {
    es,
    en,
    fr,
    pt,
    ja,
} as const

export type LocaleCode = keyof typeof locales

export type MessageKey = keyof typeof es

export type Messages = typeof es

export { es, en, fr, pt, ja }