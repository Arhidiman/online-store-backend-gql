import { Product } from "./Product.ts"
import type { Model } from "sequelize"
import  { Op } from "sequelize"

const mockProducts = [{name: 'phone', id: 1}, {name: 'table', id: 5}]

export type TProduct = {
    id: number,
    name: string,
    price: number,
    image: string,
    discount: number,
    in_stock: number,
    rating: number,
}

export type TSortParams = {
    in_stock: boolean,
    discount: boolean,
    price: 'ASC' | 'DESC'
    rating: 'ASC' | 'DESC'
}


class ProductsModel {

    async findAll(): Promise<TProduct[]> {
        return await Product.findAll({ raw: true }) as unknown as TProduct[]
    }

    async findOne(id: number): Promise<Model<TProduct> | null> {
        return await Product.findOne({raw: true, where: { id }})
    }


    async sortedProducts({ in_stock, discount, price, rating}: TSortParams): Promise<Model<TProduct>[] | null> {

        const in_stock_filter = !in_stock ?  { [Op.or]: { [Op.is]: null, [Op.gt]: 0 } } : { [Op.not]: null }
        const discount_filter = !discount ?  { [Op.or]: { [Op.is]: null, [Op.gt]: 0 } } : { [Op.not]: null }


        return await Product.findAll({
            raw: true, 
            where: {
                in_stock: in_stock_filter,
                discount: discount_filter
            },
            order: [['price', price || 'ASC'], ['rating',  rating || 'ASC']]
        })
    }


}

export default new ProductsModel()