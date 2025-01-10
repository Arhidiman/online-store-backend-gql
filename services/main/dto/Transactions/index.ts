export type CreateTransactionDto = {
    order_id: number,
    full_price: number
}

export type TransactionDto = {
    id: string, 
    order_id: number,
    full_price: number,
    timestamp: string
}