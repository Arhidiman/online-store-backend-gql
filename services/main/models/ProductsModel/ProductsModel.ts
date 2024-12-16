import { Product } from "./Product.ts"
import type { Model, Order } from "sequelize"
import  { Op } from "sequelize"
import type { ProductsFiltersDto } from "../../dto/Products/ProductsFiltersDto.ts"

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

    async sortedProducts({ price, in_stock, discount, priceSort, ratingSort, showCount, category}: ProductsFiltersDto): Promise<Model<TProduct>[] | null> {

        const price_filter = price ?  { [Op.lt]: price } : { [Op.not]: null }
        const in_stock_filter = !in_stock ?  { [Op.or]: { [Op.is]: null, [Op.gt]: 0 } } : { [Op.not]: null }
        const discount_filter = !discount ?  { [Op.or]: { [Op.is]: null, [Op.gt]: 0 } } : { [Op.not]: null }

        const order = []
        priceSort &&  order.push(['price', priceSort])
        ratingSort &&  order.push(['rating', ratingSort])

        return await Product.findAll({
            raw: true, 
            where: {
                price: price_filter,
                in_stock: in_stock_filter,
                discount: discount_filter,
                category_id: category || { [Op.not]: null}
            },
            order: order as Order,
            limit: showCount
        })
    }


}

export default new ProductsModel()