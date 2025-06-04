import { sequelizeInstance } from "../../../auth/db/sequelizeInstance.js"
import { OrderItems } from "../initModels.js"
import type { Model } from "sequelize"
import type { AddOrderItemDto } from "../../dto/Orders/AddOrderItemDto.js"
import type { GetOrderItemDto } from "../../dto/Orders/GetOrderItemDto.js"
import type { DeleteOrderItemDto } from "../../dto/Orders/DeleteOrderItemDto.js"


export type TOrderItem = {

    id: number, 
    order_id: number,
    product_id: number,
    product_count: number

}

class OrderItemsModel {

    async create({ order_id, product_id, product_count }: AddOrderItemDto): Promise<Model<TOrderItem>> {
        return await OrderItems.create({ order_id, product_id, product_count })
    }

    async findOne({ order_id, product_id }: GetOrderItemDto): Promise<Model<TOrderItem>> {
        return await OrderItems.findOne({ where: { order_id, product_id }}) as unknown as Promise<Model<TOrderItem>>
    }

    async deleteOrderItem({ id }: DeleteOrderItemDto): Promise<void> {
        await OrderItems.destroy({ where: { id }})
    }

}

export default new OrderItemsModel()