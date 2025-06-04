import categoriesModel from "../models/CateroriesModel/CategoriesModel.js"
import type { TCategory } from "../models/CateroriesModel/CategoriesModel.js"

export const CategoriesController = {
    categories: async (): Promise<TCategory[] | undefined> => {
        try {
            return await categoriesModel.getAll()
        } catch (err: any) {
            console.error(err.message, 'Ошибка при получении списка категорий товаров')
        }
    }
}
  
