import categoriesModel from "../models/CateroriesModel/CategoriesModel.ts"
import type { TCategory } from "../models/CateroriesModel/CategoriesModel.ts"

export const categoriesController = {
    categories: async (): Promise<TCategory[] | undefined> => {
        try {
            return await categoriesModel.getAll()
        } catch (err: any) {
            console.error(err.message, 'Ошибка при получении списка категорий товаров')
        }
    }
}
  
