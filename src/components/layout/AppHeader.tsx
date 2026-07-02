import { Link, NavLink } from 'react-router'
import { useLanguage } from '../../i18n/LanguageContext'
import LanguageSwitcher from './LanguageSwitcher'

function AppHeader() {
    // Get the translation function from the language context.
    const { translate } = useLanguage()

    return (
        <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto w-full max-w-6xl px-4 py-6">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        {/* Use the store title as a link to the home page. */}
                        <Link
                            to="/"
                            className="inline-block"
                        >
                            <h1 className="text-4xl font-bold text-slate-900 transition hover:text-slate-700">
                                {translate('aplicacion.titulo')}
                            </h1>
                        </Link>

                        <p className="mt-2 text-lg text-slate-600">
                            {translate('plantilla.suTienda')}
                        </p>
                    </div>

                    <LanguageSwitcher />
                </div>

                {/* Provide navigation between the application pages. */}
                <nav
                    className="mt-6 flex items-center gap-2 border-t border-slate-200 pt-4"
                    aria-label="Main navigation"
                >
                    <NavLink
                        to="/"
                        end
                        className={({ isActive }) =>
                            [
                                'rounded-md px-4 py-2 text-sm font-semibold transition',
                                isActive
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-700 hover:bg-slate-100',
                            ].join(' ')
                        }
                    >
                        {translate('aplicacion.titulo')}
                    </NavLink>

                    <NavLink
                        to="/categories"
                        className={({ isActive }) =>
                            [
                                'rounded-md px-4 py-2 text-sm font-semibold transition',
                                isActive
                                    ? 'bg-slate-900 text-white'
                                    : 'text-slate-700 hover:bg-slate-100',
                            ].join(' ')
                        }
                    >
                        {translate('plantilla.categorias')}
                    </NavLink>
                </nav>
            </div>
        </header>
    )
}

export default AppHeader