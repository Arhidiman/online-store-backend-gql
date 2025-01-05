import { Order } from "./Order.ts"
import { sequelizeInstance } from "../../db/sequelizeInstance.ts"
import OrderItemsModel from "../OrderItemsModel/OrderItemsModel.ts"
import type { TOrderItem } from "../OrderItemsModel/OrderItemsModel.ts"
import type { CreateOrderDto } from "../../dto/Orders/CreateOrderDto.ts"
import type { GetOrderDto } from "../../dto/Orders/GetOrderDto.ts"
import type { AddOrderItemDto } from "../../dto/Orders/AddOrderItemDto.ts"
import type { GetOrderItemDto } from "../../dto/Orders/GetOrderItemDto.ts"
import type { DeleteOrderDto } from "../../dto/Orders/DeleteOrderDto.ts"
import type { GetOrderByUserIdDto } from "../../dto/Orders/GetOrderByUserIdDto.ts"
import type { GetOrderItemsInfoDto } from "../../dto/Orders/GetOrderItemsInfoDto.ts"
import type { DeleteOrderItemDto } from "../../dto/Orders/DeleteOrderItemDto.ts"


export type TOrder = {
    id: number, 
    user_id: number
}

class OrderModels {

    async getOrder({ id }:  GetOrderDto): Promise<TOrder> {
        return await Order.findOne({ where:  { id } }) as unknown as TOrder
    }

    async getCurrentOrderByUserId( { user_id }: GetOrderByUserIdDto): Promise<TOrder> {
        return await Order.findOne({ where: { user_id, is_current: true } }) as unknown as TOrder
    }

    async findOrderItem({ order_id, product_id }: GetOrderItemDto): Promise<TOrderItem> {
        const orderItem = await OrderItemsModel.findOne({ order_id, product_id })
        return orderItem as unknown as TOrderItem
    }

    async createNew({ user_id, product_id, product_count }: CreateOrderDto): Promise<TOrder> {

        const order = await Order.create({ user_id, is_current: true }) as unknown as TOrder
        const { id: order_id } = order
        await OrderItemsModel.create({ order_id, product_id, product_count } as TOrderItem)

        return order
    }

    async addOrderItem({ order_id, product_id, product_count }: AddOrderItemDto): Promise<TOrderItem> {
        return await OrderItemsModel.create({ order_id, product_id, product_count }) as unknown as TOrderItem
    }

    async deleteOrderItem({ id }: DeleteOrderItemDto): Promise<void> {
        await OrderItemsModel.deleteOrderItem({ id })
    }

    async deleteOrder({ id }: DeleteOrderDto): Promise<number> {
        await Order.destroy({ where: { id }})
        return id
    }

    async getOrderItemsInfo({ order_id }: { order_id: number}): Promise<GetOrderItemsInfoDto[]> {
        const query = `
            select 
                order_items.order_id, 
                order_items.product_count, 
                order_items.id, 
                products.name, 
                products.image 
            from order_items join products
            on order_items.product_id = products.id and order_items.order_id = ${order_id}
        `

        const orderItemsInfo = await sequelizeInstance.query(query) 
        return orderItemsInfo[0] as unknown as GetOrderItemsInfoDto[]
    }

}

export default new OrderModels()