import { useEffect, useState } from 'react'
import { useLanguage } from '../i18n/LanguageContext'
import { getCategories } from '../services/categoryService'
import type { Category } from '../types/category'

type CategoryImageProps = {
    src: string
    alt: string
    fallbackLabel: string
}

function CategoryImage({
                           src,
                           alt,
                           fallbackLabel,
                       }: CategoryImageProps) {
    // This state tracks whether the category image failed to load.
    const [hasImageError, setHasImageError] = useState(false)

    // Show a fallback container when the image path is empty or invalid.
    if (!src || hasImageError) {
        return (
            <div className="flex h-16 w-24 items-center justify-center rounded-md bg-gray-100 px-2 text-center text-xs text-gray-500">
                {fallbackLabel}
            </div>
        )
    }

    return (
        <img
            src={src}
            alt={alt}
            className="h-16 w-24 rounded-md object-cover"
            onError={() => setHasImageError(true)}
        />
    )
}

function CategoriesPage() {
    // Get the translation function from the language context.
    const { translate } = useLanguage()

    // Store the categories returned by the API.
    const [categories, setCategories] = useState<Category[]>([])

    // Track whether the request is still running.
    const [isLoading, setIsLoading] = useState(true)

    // Store an error message when the request fails.
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        // Prevent state updates after the component has been removed.
        let isCancelled = false

        async function loadCategories() {
            try {
                // Request all categories, including inactive categories.
                const categoryList = await getCategories(false)

                if (!isCancelled) {
                    setCategories(categoryList)
                }
            } catch (error) {
                if (!isCancelled) {
                    // Convert an unknown error into a readable message.
                    const message =
                        error instanceof Error
                            ? error.message
                            : 'An unknown error occurred'

                    setErrorMessage(message)
                }
            } finally {
                if (!isCancelled) {
                    setIsLoading(false)
                }
            }
        }

        // Start the asynchronous request without blocking the component.
        void loadCategories()

        // Mark the request as cancelled when the component is removed.
        return () => {
            isCancelled = true
        }
    }, [])

    return (
        <section className="mx-auto w-full max-w-6xl px-4 py-8">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <h1 className="text-3xl font-bold text-gray-900">
                    {translate('categoria.listado')}
                </h1>

                <p className="text-sm font-medium text-gray-600">
                    {translate('categoria.total')}: {categories.length}
                </p>
            </div>

            {isLoading && (
                <div
                    className="flex min-h-40 items-center justify-center"
                    aria-label="Loading categories"
                >
                    <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-gray-800" />
                </div>
            )}

            {!isLoading && errorMessage && (
                <div
                    role="alert"
                    className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700"
                >
                    <p className="font-semibold">{translate('error')}</p>
                    <p className="mt-1 text-sm">{errorMessage}</p>
                </div>
            )}

            {!isLoading &&
                !errorMessage &&
                categories.length === 0 && (
                    <div className="rounded-lg border border-gray-200 bg-gray-50 p-6 text-center text-gray-600">
                        {translate('lista.vacia')}
                    </div>
                )}

            {!isLoading &&
                !errorMessage &&
                categories.length > 0 && (
                    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-gray-200">
                                <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        ID
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        {translate('categoria.descripcion')}
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        {translate('categoria.imagen')}
                                    </th>

                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-600">
                                        {translate('categoria.activo')}
                                    </th>
                                </tr>
                                </thead>

                                <tbody className="divide-y divide-gray-200">
                                {categories.map((category) => (
                                    <tr
                                        key={category.idCategory}
                                        className="hover:bg-gray-50"
                                    >
                                        <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-gray-900">
                                            {category.idCategory}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {category.description}
                                        </td>

                                        <td className="px-6 py-4">
                                            <CategoryImage
                                                src={category.imagePath}
                                                alt={category.description}
                                                fallbackLabel={translate(
                                                    'categoria.imagen',
                                                )}
                                            />
                                        </td>

                                        <td className="whitespace-nowrap px-6 py-4">
                        <span
                            className={
                                category.active
                                    ? 'inline-flex rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700'
                                    : 'inline-flex rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold text-gray-700'
                            }
                        >
                          {category.active
                              ? translate('texto.si')
                              : translate('texto.no')}
                        </span>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
        </section>
    )
}

export default CategoriesPage