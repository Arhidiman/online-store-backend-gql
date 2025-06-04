import TransactionsModel from "../models/TransactionsModel/TransactionsModel.js";
export const TransactionsController = {
    Queries: {
        async getTransactionsItemsData(_, { jwt_token }) {
            try {
                return await TransactionsModel.getAll({ jwt_token });
            }
            catch (err) {
                throw new Error(`Ошибка при получении списка покупок. ${err.message}`);
            }
        }
    },
    Mutations: {
        async createTransaction(_, { order_id, full_price, order_items, city, street, building }) {
            return await TransactionsModel.create({ order_id, full_price, order_items, city, street, building });
        }
    }
};
