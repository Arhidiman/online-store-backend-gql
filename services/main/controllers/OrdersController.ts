import OrdersModel from "../models/OrdersModel/OrdersModel.ts"
import type { GetOrderDto } from "../dto/Orders/GetOrderDto.ts"
import type { CreateOrderDto } from "../dto/Orders/CreateOrderDto.ts"
import type { AddOrderItemDto } from "../dto/Orders/AddOrderItemDto.ts"
import type { DeleteOrderDto } from "../dto/Orders/DeleteOrderDto.ts"
import type { GetOrderByUserIdDto } from "../dto/Orders/GetOrderByUserIdDto.ts"
import type { GetOrderItemDto } from "../dto/Orders/GetOrderItemDto.ts"
import type { TOrderItem } from "../models/OrderItemsModel/OrderItemsModel.ts"
import type { TOrder } from "../models/OrdersModel/OrdersModel.ts"
import type { GetOrderItemsInfoDto } from "../dto/Orders/GetOrderItemsInfoDto.ts"
import { DeleteOrderItemDto } from "../dto/Orders/DeleteOrderItemDto.ts"


export const OrdersController = {

    Queries: {
        async getOrder(_: any, { id }: GetOrderDto): Promise<TOrder> {
            try {
                return await OrdersModel.getOrder({ id })
            } catch(err: any) {
                throw new Error(`Ошибка при получении данных о заказе. ${err.message}`)
            }
        },

        async getCurrentOrderByUserId(_: any, { user_id, is_current}: GetOrderByUserIdDto): Promise<TOrder> {
            try {
                return await OrdersModel.getCurrentOrderByUserId({ user_id, is_current })
            } catch(err: any) {
                throw new Error(`Ошибка при получении данных о заказе. ${err.message}`)
            }
        },

        async orderItem(_: any, { order_id, product_id}: GetOrderItemDto): Promise<TOrderItem> {
            try {
                return await OrdersModel.findOrderItem({ order_id, product_id })
            } catch(err: any) {
                throw new Error(`Ошибка при получении данных о товаре из заказа. ${err.message}`)
            }
        },

        async getOrderItemsInfo(_: any, { order_id }: { order_id: number}): Promise<GetOrderItemsInfoDto[]> {
            try {
                return await OrdersModel.getOrderItemsInfo({ order_id })
            } catch(err: any) {
                throw new Error(`Ошибка при получении списка товаров заказа. ${err.message}`)
            }
        },
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

        async deleteOrderItem(_: any, { id }: DeleteOrderItemDto): Promise<number> {
            try {
                await OrdersModel.deleteOrderItem({ id })
                return id
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