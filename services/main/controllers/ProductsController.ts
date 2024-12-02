import ProductsModel from "../models/ProductsModel/ProductsModel.ts"
import type { TProduct, TSortParams } from "..//models/ProductsModel/ProductsModel.ts"
import type { Model } from "sequelize"



export const productsController = {

    async products(): Promise<TProduct[]> {
        return ProductsModel.findAll()
    },

    async product(_: any, { id }: {id: number}): Promise<Model<TProduct> | null> {
        if (!id) throw new Error('Отсутствует id пользователя')
        return await ProductsModel.findOne(id)
    },

    async sortedProducts(_: any, { in_stock, discount, price, rating }: TSortParams): Promise<Model<TProduct>[] | null | undefined> {
        try {
            return await ProductsModel.sortedProducts({ in_stock, discount, price, rating })
        } catch(err: any) {
            console.error(err.message, 'Ошибка при получении фильтрованного списка товаров')
        }
    }
}

