import ProductsModel from "../models/ProductsModel/ProductsModel.ts"
import type { TProduct } from "../models/ProductsModel/ProductsModel.ts"
import type { Model } from "sequelize"
import type { ProductsFiltersDto } from "../dto/Products/ProductsFiltersDto.ts"



export const ProductsController = {

    async products(): Promise<TProduct[]> {
        return ProductsModel.findAll()
    },

    async product(_: any, { id }: {id: number}): Promise<Model<TProduct> | null> {
        if (!id) throw new Error('Отсутствует id пользователя')
        return await ProductsModel.findOne(id)
    },

    async sortedProducts(_: any, filters: ProductsFiltersDto): Promise<Model<TProduct>[] | null | undefined> {
        try {
            return await ProductsModel.sortedProducts(filters)
        } catch(err: any) {
            console.error(err.message, 'Ошибка при получении фильтрованного списка товаров')
        }
    }
}

