import { Order } from "../initModels.js"
import { sequelizeInstance } from "../../db/sequelizeInstance.js"
import OrderItemsModel from "../OrderItemsModel/OrderItemsModel.js"
import type { TOrderItem } from "../OrderItemsModel/OrderItemsModel.js"
import type { CreateOrderDto } from "../../dto/Orders/CreateOrderDto.js"
import type { GetOrderDto } from "../../dto/Orders/GetOrderDto.js"
import type { AddOrderItemDto } from "../../dto/Orders/AddOrderItemDto.js"
import type { GetOrderItemDto } from "../../dto/Orders/GetOrderItemDto.js"
import type { DeleteOrderDto } from "../../dto/Orders/DeleteOrderDto.js"
import type { GetOrderByUserIdDto } from "../../dto/Orders/GetOrderByUserIdDto.js"
import type { GetOrderItemsInfoDto } from "../../dto/Orders/GetOrderItemsInfoDto.js"
import type { DeleteOrderItemDto } from "../../dto/Orders/DeleteOrderItemDto.js"


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
                products.id as product_id, 
                products.name, 
                products.image,
                products.price 
            from order_items join products
            on order_items.product_id = products.id and order_items.order_id = ${order_id}
        `

        const orderItemsInfo = await sequelizeInstance.query(query) 
        return orderItemsInfo[0] as unknown as GetOrderItemsInfoDto[]
    }

}

export default new OrderModels()