import OrdersModel from "../models/OrdersModel/OrdersModel.ts"
import OrderItemsModel from "../models/OrderItemsModel/OrderItemsModel.ts"
import type { TOrderItem } from "../models/OrderItemsModel/OrderItemsModel.ts"

export const OrdersController = {

    async createOrder(_: any, { user_id, product_id, product_count }: { user_id: number, product_id: number, product_count: number }) {
        try {
            const order = await OrdersModel.create(user_id)
            const { id: order_id } = order
            const orderItem = await OrderItemsModel.create({ order_id, product_id, product_count } as TOrderItem)

            return order

        } catch(err: any) {
            throw new Error(`Ошибка при создании заказа. ${err.message}`)
        }
    }
}