import OrdersModel from "../models/OrdersModel/OrdersModel.ts"

export const OrdersController = {

    async createOrder(_: any, { user_id }: { user_id: number }) {
        try {
            return await OrdersModel.create(user_id)
        } catch(err: any) {
            throw new Error(`Ошибка при создании заказа. ${err.message}`)
        }
    }
    
}