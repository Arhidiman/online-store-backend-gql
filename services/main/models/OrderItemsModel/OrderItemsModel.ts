import { sequelizeInstance } from "../../../auth/db/sequelizeInstance.ts"
import { OrderItems } from "./OrderItems.ts"
import type { Model } from "sequelize"
import type { AddOrderItemDto } from "../../dto/AddOrderItemDto.ts"


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

}

export default new OrderItemsModel()