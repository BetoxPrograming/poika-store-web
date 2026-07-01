import { useLanguage } from '../../i18n/LanguageContext'

function AppFooter() {
    // Get the translate function from the language context.
    const { translate } = useLanguage()

    return (
        <footer className="border-t border-slate-200 bg-white px-8 py-6 text-center text-sm text-slate-500">
            <p>{translate('plantilla.derechos')}</p>
        </footer>
    )
}

export default AppFooter