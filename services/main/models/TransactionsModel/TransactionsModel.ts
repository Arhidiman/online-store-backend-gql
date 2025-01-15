import { Transaction } from "./Transaction.ts"
import type { Model } from "sequelize"
import { OrderItems } from "../OrderItemsModel/OrderItems.ts"
import { Order } from "../OrdersModel/Order.ts"
import type { CreateTransactionDto, TransactionDto } from "../../dto/Transactions/index.ts"


class TransactionsModel {
    
    async create({ order_id, full_price, order_items }: CreateTransactionDto ): Promise<Model<TransactionDto> | null> {
        for (const item of order_items) {

            console.log(item, 'item')
            const { id, product_count} = item
            await OrderItems.update({ product_count }, { where: { id }})
        }

        await Order.update({ is_current: false }, { where: { id: order_id } })
        return await Transaction.create({ order_id, full_price})
    }

}


export default new TransactionsModel()