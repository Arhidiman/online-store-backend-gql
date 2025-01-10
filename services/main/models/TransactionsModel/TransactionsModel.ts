import { Transaction } from "./Transaction.ts"
import type { Model } from "sequelize"
import type { CreateTransactionDto, TransactionDto } from "../../dto/Transactions/index.ts"


class TransactionsModel {
    
    async create({ order_id, full_price }: CreateTransactionDto): Promise<Model<TransactionDto> | null> {
        return await Transaction.create({ order_id, full_price})
    }

}


export default new TransactionsModel()