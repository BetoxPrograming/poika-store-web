export interface Category {
    idCategory: number
    description: string
    imagePath: string
    active: boolean
    createdAt: string
    updatedAt: string
}

export interface CategoriesResponse {
    data: Category[]
}