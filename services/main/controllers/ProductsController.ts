import productsModel from "@main/models/ProductsModel.ts"

export const productsController = {

    products(): {name: string, id: number}[] {

        return productsModel.products()            

    },

    singleProduct(_: any, { id }: {id: number}): {name: string, id: number} | undefined {
        if (!id) throw new Error('Отсутствует id пользователя')
        return productsModel.singleProduct(id)
    }
}

