import type {
    CategoriesResponse,
    Category,
} from '../types/category'

// Read the API base URL from the Vite environment variables.
const API_URL = import.meta.env.VITE_API_URL

/**
 * Retrieves categories from the Poika Store API.
 *
 * @param activeOnly Indicates whether the API should return only active categories.
 * @returns A promise containing the category list.
 */
export async function getCategories(
    activeOnly = false,
): Promise<Category[]> {
    // Stop the request early when the API URL has not been configured.
    if (!API_URL) {
        throw new Error('VITE_API_URL is not configured')
    }

    // Build the endpoint using the activeOnly query parameter.
    const endpoint = `${API_URL}/api/categories?activeOnly=${activeOnly}`

    // Send an HTTP GET request to the backend.
    const response = await fetch(endpoint)

    // Fetch only rejects network errors, so HTTP errors must be checked manually.
    if (!response.ok) {
        throw new Error(
            `Failed to fetch categories. HTTP status: ${response.status}`,
        )
    }

    // Convert the JSON response into the expected TypeScript structure.
    const result: CategoriesResponse = await response.json()

    // Validate that the API returned the expected data array.
    if (!Array.isArray(result.data)) {
        throw new Error('The categories response has an invalid format')
    }

    return result.data
}