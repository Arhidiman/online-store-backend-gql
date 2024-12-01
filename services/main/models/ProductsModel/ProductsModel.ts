import { Product } from "./Product.ts"

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

    singleProduct(id: number): {name: string, id: number} | undefined {
        return mockProducts.find(product => product.id === id)
    }

}

export default new ProductsModel()