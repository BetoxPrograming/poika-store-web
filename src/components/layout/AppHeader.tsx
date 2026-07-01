import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

function AppHeader() {
    // Get the translate function from the language context.
    const { translate } = useLanguage()

    return (
        <header className="border-b border-slate-200 bg-white px-8 py-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                <div>
            <h1 className="text-4xl font-bold text-slate-900">
                {translate('aplicacion.titulo')}
            </h1>

            <p className="mt-2 text-lg text-slate-600">
                {translate('plantilla.suTienda')}
            </p>
                </div>

                <LanguageSwitcher />
            </div>
        </header>
    )
}

export default AppHeader