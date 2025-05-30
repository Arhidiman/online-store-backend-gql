import { sequelizeInstance } from "../../db/sequelizeInstance.js";
import { Order, OrderItems, Transaction, DeliveryData } from "../initModels.js";
import UserModel from "../UserModel/UserModel.js";
class TransactionsModel {
    async create({ order_id, full_price, order_items, city, street, building }) {
        for (const item of order_items) {
            const { id, product_count } = item;
            await OrderItems.update({ product_count }, { where: { id } });
        }
        await Order.update({ is_current: false }, { where: { id: order_id } });
        const transaction = await Transaction.create({ order_id, full_price });
        const { id: transaction_id } = transaction;
        await DeliveryData.create({ city, street, building, transaction_id });
        return transaction;
    }
    async getAll({ jwt_token }) {
        const userData = await UserModel.validateToken({ jwt_token });
        const { id } = userData || {};
        if (!id)
            throw new Error(`Не найдены данные о заказе`);
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
        `;
        const data = await sequelizeInstance.query(query);
        return data && data[0];
    }
}
export default new TransactionsModel();
