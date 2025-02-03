import { sequelizeInstance } from "../../db/sequelizeInstance.ts"
import { Transaction } from "./Transaction.ts"
import { OrderItems } from "../OrderItemsModel/OrderItems.ts"
import { Order } from "../OrdersModel/Order.ts"
import UserModel from "../UserModel/UserModel.ts"
import type { Model } from "sequelize"
import type { CreateTransactionDto, TransactionDto, GetAllTransactionsDto, TransactionsDataDto } from "../../dto/Transactions/index.ts"
import type { VerifiedUserDataDto } from "../../dto/User/index.ts"


class TransactionsModel {
    
    async create({ order_id, full_price, order_items }: CreateTransactionDto ): Promise<Model<TransactionDto> | null> {
        for (const item of order_items) {
            const { id, product_count} = item
            await OrderItems.update({ product_count }, { where: { id }})
        }

        await Order.update({ is_current: false }, { where: { id: order_id } })
        return await Transaction.create({ order_id, full_price})
    }

    async getAll({ jwt_token }: GetAllTransactionsDto): Promise<TransactionsDataDto | void> {

        const userData: VerifiedUserDataDto = await UserModel.validateToken({ jwt_token })

        const { id } = userData || {}

        if (!id) throw new Error(`Не найдены данные о заказе`)

        const query = `
            select 
                transactions.full_price, 
                transactions.created_at, 
                delivery_data.city,
                delivery_data.street,
                delivery_data.building
            from delivery_data
            join transactions on delivery_data.transaction_id = transactions.id 
            join orders on transactions.order_id = orders.id
            join store_users on orders.user_id = store_users.id and store_users.id = ${id}
        `

        const data = await sequelizeInstance.query(query)

        console.log(data[0], 'data')

        return data && data[0] as unknown as TransactionsDataDto
    }

}


export default new TransactionsModel()