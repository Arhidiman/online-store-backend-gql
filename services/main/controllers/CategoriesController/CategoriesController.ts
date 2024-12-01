import categoriesModel from "../../models/CateroriesModel/CategoriesModel.ts"
import { Category } from "../../models/CateroriesModel/Category.ts"


export const categoriesController = {

    categories: async () => {

        const categories = await categoriesModel.getAll()

        console.log(categories, 'categories')

        return await categoriesModel.getAll()
    }

}
  
