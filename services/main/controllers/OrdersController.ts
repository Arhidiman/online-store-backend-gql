import OrdersModel from "../models/OrdersModel/OrdersModel.ts"
import type { CreateOrderDto } from "../dto/CreateOrderDto.ts"


export const OrdersController = {

    async createOrder(_: any, { user_id, product_id, product_count }: CreateOrderDto) {
        try {
            return OrdersModel.createNew({ user_id, product_id, product_count })
        } catch(err: any) {
            throw new Error(`Ошибка при создании заказа. ${err.message}`)
        }
    }
}