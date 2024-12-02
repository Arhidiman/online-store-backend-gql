import ProductsModel from "../models/ProductsModel/ProductsModel.ts"
import type { TProduct } from "..//models/ProductsModel/ProductsModel.ts"
import type { Model } from "sequelize"

export const productsController = {

    async products(): Promise<TProduct[]> {
        return ProductsModel.findAll()
    },

    async product(_: any, { id }: {id: number}): Promise<Model<TProduct> | null> {
        if (!id) throw new Error('Отсутствует id пользователя')
        return await ProductsModel.findOne(id)
    }
}

