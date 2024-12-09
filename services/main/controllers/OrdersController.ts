import OrdersModel from "../models/OrdersModel/OrdersModel.ts"
import type { GetOrderDto } from "../dto/GetOrderDto.ts"
import type { CreateOrderDto } from "../dto/CreateOrderDto.ts"
import type { AddOrderItemDto } from "../dto/AddOrderItemDto.ts"



export const OrdersController = {
    async getOrder(_: any, { id }: GetOrderDto) {
        try {
            return OrdersModel.getOrder({ id })
        } catch(err: any) {
            throw new Error(`Ошибка при создании заказа. ${err.message}`)
        }
    },


    async createOrder(_: any, { user_id, product_id, product_count }: CreateOrderDto) {
        try {
            return OrdersModel.createNew({ user_id, product_id, product_count })
        } catch(err: any) {
            throw new Error(`Ошибка при создании заказа. ${err.message}`)
        }
    },

    async addOrderItem(_: any, { order_id, product_id, product_count }: AddOrderItemDto) {
        try {
            return OrdersModel.addOrderItem({ order_id, product_id, product_count })
        } catch(err: any) {
            throw new Error(`Ошибка при создании заказа. ${err.message}`)
        }
    }
}