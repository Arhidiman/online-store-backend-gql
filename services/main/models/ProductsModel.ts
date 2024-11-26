

const mockProducts = [{name: 'phone', id: 1}, {name: 'table', id: 5}]


class ProductsController {

    products(): {name: string, id: number}[] {
        return mockProducts
    }

    singleProduct(id: number): {name: string, id: number} | undefined {
        return mockProducts.find(product => product.id === id)
    }

}

export default new ProductsController()