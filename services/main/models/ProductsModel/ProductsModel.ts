import { Product } from "./Product.ts"
import type { Model } from "sequelize"

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

class ProductsModel {

    async findAll(): Promise<TProduct[]> {
        return await Product.findAll({ raw: true }) as unknown as TProduct[]
    }

    async findOne(id: number): Promise<Model<TProduct> | null> {
        return await Product.findOne({raw: true, where: { id }})
    }



}

export default new ProductsModel()