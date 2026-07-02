import { useState } from 'react'
import { useLanguage } from '../../i18n/LanguageContext'
import type { Category } from '../../types/category'

interface CategoryTableProps {
    // Categories received from the parent page.
    categories: Category[]
}

interface CategoryImageProps {
    // Relative path of the category image.
    src: string

    // Accessible description of the image.
    alt: string

    // Text displayed when the image cannot be loaded.
    fallbackLabel: string
}

function CategoryImage({
                           src,
                           alt,
                           fallbackLabel,
                       }: CategoryImageProps) {
    // Track whether the image failed to load.
    const [hasImageError, setHasImageError] = useState(false)

    // Display a fallback element when the path is empty or invalid.
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

function CategoryTable({ categories }: CategoryTableProps) {
    // Get translated interface texts.
    const { translate } = useLanguage()

    return (
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
    )
}

export default CategoryTable