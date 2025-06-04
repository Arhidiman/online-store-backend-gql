import OrdersModel from "../models/OrdersModel/OrdersModel.js";
export const OrdersController = {
    Queries: {
        async getOrder(_, { id }) {
            try {
                return await OrdersModel.getOrder({ id });
            }
            catch (err) {
                throw new Error(`Ошибка при получении данных о заказе. ${err.message}`);
            }
        },
        async getCurrentOrderByUserId(_, { user_id, is_current }) {
            try {
                return await OrdersModel.getCurrentOrderByUserId({ user_id, is_current });
            }
            catch (err) {
                throw new Error(`Ошибка при получении данных о заказе. ${err.message}`);
            }
        },
        async orderItem(_, { order_id, product_id }) {
            try {
                return await OrdersModel.findOrderItem({ order_id, product_id });
            }
            catch (err) {
                throw new Error(`Ошибка при получении данных о товаре из заказа. ${err.message}`);
            }
        },
        async getOrderItemsInfo(_, { order_id }) {
            try {
                return await OrdersModel.getOrderItemsInfo({ order_id });
            }
            catch (err) {
                throw new Error(`Ошибка при получении списка товаров заказа. ${err.message}`);
            }
        },
    },
    Mutations: {
        async createOrder(_, { user_id, product_id, product_count }) {
            try {
                return await OrdersModel.createNew({ user_id, product_id, product_count });
            }
            catch (err) {
                throw new Error(`Ошибка при создании заказа. ${err.message}`);
            }
        },
        async addOrderItem(_, { order_id, product_id, product_count }) {
            try {
                return await OrdersModel.addOrderItem({ order_id, product_id, product_count });
            }
            catch (err) {
                throw new Error(`Ошибка при добавлении товара к заказу. ${err.message}`);
            }
        },
        async deleteOrderItem(_, { id }) {
            try {
                await OrdersModel.deleteOrderItem({ id });
                return id;
            }
            catch (err) {
                throw new Error(`Ошибка при удалении товара из заказа. ${err.message}`);
            }
        },
        async deleteOrder(_, { id }) {
            try {
                return await OrdersModel.deleteOrder({ id });
            }
            catch (err) {
                throw new Error(`Ошибка при удалении заказа. ${err.message}`);
            }
        }
    }
};
