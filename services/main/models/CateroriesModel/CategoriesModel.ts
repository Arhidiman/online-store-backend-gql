import { Category } from "../initModels.js"

export type TCategory = {
    id: Number, 
    name: string
}

class CategoriesModel {
    async getAll(): Promise<TCategory[]> {
        const categories = await Category.findAll({ raw: true })
        return categories as unknown as TCategory[]
    }
}

export default new CategoriesModel()