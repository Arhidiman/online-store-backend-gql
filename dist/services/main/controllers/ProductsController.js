import ProductsModel from "../models/ProductsModel/ProductsModel.js";
export const ProductsController = {
    async products() {
        return ProductsModel.findAll();
    },
    async product(_, { id }) {
        if (!id)
            throw new Error('Отсутствует id пользователя');
        return await ProductsModel.findOne(id);
    },
    async sortedProducts(_, filters) {
        try {
            return await ProductsModel.sortedProducts(filters);
        }
        catch (err) {
            console.error(err.message, 'Ошибка при получении фильтрованного списка товаров');
        }
    }
};
