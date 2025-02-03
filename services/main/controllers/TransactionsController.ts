import TransactionsModel from "../models/TransactionsModel/TransactionsModel.ts"
import type { CreateTransactionDto, TransactionDto } from "../dto/Transactions/index.ts"
import type { ValidateTokenDto } from "../dto/User/index.ts"
import type { TransactionsDataDto } from "../dto/Transactions/index.ts"



export const TransactionsController = {

    Queries: {
        async getTransactionsItemsData(_: any, { jwt_token }: ValidateTokenDto): Promise<TransactionsDataDto | void> {
            try {
                return await TransactionsModel.getAll({jwt_token }) as unknown as TransactionsDataDto
            } catch(err: any) {
                throw new Error(`Ошибка при получении списка покупок. ${err.message}`)
            }
        }
    }, 

    Mutations: {
        async createTransaction(_: any, { order_id, full_price, order_items, city, street, building }: CreateTransactionDto): Promise<TransactionDto | null> {
            return await TransactionsModel.create({ order_id, full_price, order_items, city, street, building }) as unknown as TransactionDto
        }
    }

    

}

