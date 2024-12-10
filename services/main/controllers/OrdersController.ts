import OrdersModel from "../models/OrdersModel/OrdersModel.ts"
import type { GetOrderDto } from "../dto/GetOrderDto.ts"
import type { CreateOrderDto } from "../dto/CreateOrderDto.ts"
import type { AddOrderItemDto } from "../dto/AddOrderItemDto.ts"
import type { DeleteOrderDto } from "../dto/DeleteOrderDto.ts"
import type { TOrderItem } from "../models/OrderItemsModel/OrderItemsModel.ts"
import type { TOrder } from "../models/OrdersModel/OrdersModel.ts"


export const OrdersController = {

    Queries: {
        async getOrder(_: any, { id }: GetOrderDto): Promise<TOrder> {
            try {
                return await OrdersModel.getOrder({ id })
            } catch(err: any) {
                throw new Error(`Ошибка при получении данных о заказе. ${err.message}`)
            }
        }
    },

    Mutations: {

        async createOrder(_: any, { user_id, product_id, product_count }: CreateOrderDto): Promise<TOrder> {
            try {
                return await OrdersModel.createNew({ user_id, product_id, product_count })
            } catch(err: any) {
                throw new Error(`Ошибка при создании заказа. ${err.message}`)
            }
        },
    
        async addOrderItem(_: any, { order_id, product_id, product_count }: AddOrderItemDto): Promise<TOrderItem> {
            try {
                return await OrdersModel.addOrderItem({ order_id, product_id, product_count })
            } catch(err: any) {
                throw new Error(`Ошибка при добавлении товара к заказу. ${err.message}`)
            }
        },
    
        async deleteOrder(_: any, { id }: DeleteOrderDto): Promise<number> {
            try {    
                return await OrdersModel.deleteOrder({ id })
            } catch(err: any) {
                throw new Error(`Ошибка при удалении заказа. ${err.message}`)
            }
        }
    }
}