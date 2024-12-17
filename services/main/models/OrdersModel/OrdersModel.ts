import { Order } from "./Order.ts"
import OrderItemsModel from "../OrderItemsModel/OrderItemsModel.ts"
import type { TOrderItem } from "../OrderItemsModel/OrderItemsModel.ts"
import type { CreateOrderDto } from "../../dto/Orders/CreateOrderDto.ts"
import type { GetOrderDto } from "../../dto/Orders/GetOrderDto.ts"
import type { AddOrderItemDto } from "../../dto/Orders/AddOrderItemDto.ts"
import type { DeleteOrderDto } from "../../dto/Orders/DeleteOrderDto.ts"
import type { GetOrderByUserIdDto } from "../../dto/Orders/GetOrderByUserIdDto.ts"


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

    async createNew({ user_id, product_id, product_count }: CreateOrderDto): Promise<TOrder> {

        const order = await Order.create({ user_id }) as unknown as TOrder
        const { id: order_id } = order
        await OrderItemsModel.create({ order_id, product_id, product_count } as TOrderItem)

        return order
    }

    async addOrderItem({ order_id, product_id, product_count }: AddOrderItemDto): Promise<TOrderItem> {
        return await OrderItemsModel.create({ order_id, product_id, product_count }) as unknown as TOrderItem
    }

    async deleteOrder({ id }: DeleteOrderDto): Promise<number> {

        await Order.destroy({ where: { id }})
        return id
    }

}

export default new OrderModels()