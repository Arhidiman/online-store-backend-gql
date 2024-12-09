import { Order } from "./Order.ts"
import OrderItemsModel from "../OrderItemsModel/OrderItemsModel.ts"
import type { TOrderItem } from "../OrderItemsModel/OrderItemsModel.ts"
import type { CreateOrderDto } from "../../dto/CreateOrderDto.ts"

export type TOrder = {
    id: number, 
    user_id: number
}

class OrderModels {

    async createNew({ user_id, product_id, product_count }: CreateOrderDto): Promise<TOrder> {

        const order = await Order.create({ user_id }) as unknown as TOrder
        const { id: order_id } = order
        await OrderItemsModel.create({ order_id, product_id, product_count } as TOrderItem)

        return order
    }

}

export default new OrderModels()