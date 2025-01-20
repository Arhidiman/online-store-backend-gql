export type CreateTransactionDto = {
    order_id: number,
    full_price: number
    order_items: { id: number, product_count: number}[]
}

export type TransactionDto = {
    id: string, 
    order_id: number,
    full_price: number,
    timestamp: string
}

export type GetAllTransactionsDto = {
    jwt_token: string
}

export type TransactionsDataDto = {
    id: number,
    full_price: number, 
    created_at: string, 
    username: string
}