import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react'
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'

import { useLanguage } from '../../i18n/LanguageContext'
import type { LocaleCode } from '../../i18n'

// This type defines the structure of each language option.
type LanguageOption = {
    code: LocaleCode
    iso: string
    name: string
}

// These are the languages supported by Póika Store.
// The name is written in its own language.
const languageOptions: LanguageOption[] = [
    {
        code: 'es',
        iso: 'ES',
        name: 'Español',
    },
    {
        code: 'en',
        iso: 'EN',
        name: 'English',
    },
    {
        code: 'fr',
        iso: 'FR',
        name: 'Français',
    },
    {
        code: 'pt',
        iso: 'PT',
        name: 'Português',
    },
    {
        code: 'ja',
        iso: 'JA',
        name: '日本語',
    },
]

function LanguageSwitcher() {
    // Get the active language, the function to change it,
    // and the translate function from the language context.
    const { locale, setLocale, translate } = useLanguage()

    // Find the complete language object that matches the active locale.
    const selectedLanguage =
        languageOptions.find((language) => language.code === locale) ??
        languageOptions[0]

    return (
        <Listbox value={selectedLanguage.code} onChange={setLocale}>
            <div className="relative w-44">
                <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-full border border-slate-300 bg-white py-2 pr-10 pl-3 text-left text-sm text-slate-700 shadow-sm transition hover:bg-slate-50 focus:outline-2 focus:outline-offset-2 focus:outline-slate-900">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
              {selectedLanguage.iso}
            </span>

            <span className="block truncate">{selectedLanguage.name}</span>
          </span>

                    <ChevronUpDownIcon
                        aria-hidden="true"
                        className="col-start-1 row-start-1 size-5 self-center justify-self-end text-slate-400"
                    />
                </ListboxButton>

                <ListboxOptions
                    anchor="bottom end"
                    transition
                    className="z-20 mt-2 w-56 overflow-hidden rounded-xl border border-slate-200 bg-white py-1 text-sm shadow-lg outline-none transition duration-100 ease-in data-closed:opacity-0"
                >
                    <div className="border-b border-slate-100 px-4 py-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
                        {translate('plantilla.idioma')}
                    </div>

                    {languageOptions.map((language) => (
                        <ListboxOption
                            key={language.code}
                            value={language.code}
                            className="group relative cursor-pointer py-3 pr-10 pl-4 text-slate-700 select-none data-focus:bg-slate-100"
                        >
                            <div className="flex items-center gap-3">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                  {language.iso}
                </span>

                                <span className="block truncate font-normal group-data-selected:font-semibold">
                  {language.name}
                </span>
                            </div>

                            <span className="absolute inset-y-0 right-0 hidden items-center pr-4 text-slate-900 group-data-selected:flex">
                <CheckIcon aria-hidden="true" className="size-5" />
              </span>
                        </ListboxOption>
                    ))}
                </ListboxOptions>
            </div>
        </Listbox>
    )
}

export default LanguageSwitcher