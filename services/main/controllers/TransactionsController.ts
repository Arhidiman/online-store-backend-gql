import TransactionsModel from "../models/TransactionsModel/TransactionsModel.ts"
import type { TProduct } from "../models/ProductsModel/ProductsModel.ts"
import type { Model } from "sequelize"
import type { CreateTransactionDto, TransactionDto } from "../dto/Transactions/index.ts"



export const TransactionsController = {


    Queries: {

    }, 

    Mutations: {
        async createTransaction(_: any, { order_id, full_price, order_items }: CreateTransactionDto): Promise<TransactionDto | null> {
            return await TransactionsModel.create({ order_id, full_price, order_items }) as unknown as TransactionDto
        }
    }

    

}

