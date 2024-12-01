import { Category } from "./Category.ts";

class CategoriesModel {
    async getAll() {
        const categories = await Category.findAll({ raw: true })
        return categories
    }
}

export default new CategoriesModel()