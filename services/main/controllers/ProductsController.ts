import ProductsModel from "../models/ProductsModel/ProductsModel.ts"
import type { TProduct } from "..//models/ProductsModel/ProductsModel.ts"

export const productsController = {

    async products(): Promise<TProduct[]> {
        return ProductsModel.findAll()
    },

    singleProduct(_: any, { id }: {id: number}): {name: string, id: number} | undefined {
        if (!id) throw new Error('Отсутствует id пользователя')
        return ProductsModel.singleProduct(id)
    }
}

