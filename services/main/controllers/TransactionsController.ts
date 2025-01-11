import TransactionsModel from "../models/TransactionsModel/TransactionsModel.ts"
import type { TProduct } from "../models/ProductsModel/ProductsModel.ts"
import type { Model } from "sequelize"
import type { CreateTransactionDto, TransactionDto } from "../dto/Transactions/index.ts"



export const TransactionsController = {


    Queries: {

    }, 

    Mutations: {
        async createTransaction(_: any, { order_id, full_price }: CreateTransactionDto): Promise<TransactionDto | null> {
            return await TransactionsModel.create({ order_id, full_price }) as unknown as TransactionDto
        }
    }

    

}

