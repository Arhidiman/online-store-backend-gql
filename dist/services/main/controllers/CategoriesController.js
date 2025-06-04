import categoriesModel from "../models/CateroriesModel/CategoriesModel.js";
export const CategoriesController = {
    categories: async () => {
        try {
            return await categoriesModel.getAll();
        }
        catch (err) {
            console.error(err.message, 'Ошибка при получении списка категорий товаров');
        }
    }
};
