import { Model } from "sequelize"
import { Order } from "./Order.ts"

export type TOrder = {
    id: number, 
    user_id: number
}

class OrderModels {

    async create(user_id: number): Promise<TOrder> {
        return await Order.create({ user_id}) as unknown as TOrder
    }

}

export default new OrderModels()