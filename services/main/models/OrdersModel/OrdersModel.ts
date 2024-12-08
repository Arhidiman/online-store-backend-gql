import { Model } from "sequelize"
import { Order } from "./Order.ts"

export type Order = {
    id: number, 
    user_id: number
}

class OrderModels {

    async create(user_id: number): Promise<Model<Order>> {
        return await Order.create({ raw: true, user_id})
    }

}

export default new OrderModels()