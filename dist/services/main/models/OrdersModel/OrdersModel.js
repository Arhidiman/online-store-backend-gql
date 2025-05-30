import { Order } from "../initModels.js";
import { sequelizeInstance } from "../../db/sequelizeInstance.js";
import OrderItemsModel from "../OrderItemsModel/OrderItemsModel.js";
class OrderModels {
    async getOrder({ id }) {
        return await Order.findOne({ where: { id } });
    }
    async getCurrentOrderByUserId({ user_id }) {
        return await Order.findOne({ where: { user_id, is_current: true } });
    }
    async findOrderItem({ order_id, product_id }) {
        const orderItem = await OrderItemsModel.findOne({ order_id, product_id });
        return orderItem;
    }
    async createNew({ user_id, product_id, product_count }) {
        const order = await Order.create({ user_id, is_current: true });
        const { id: order_id } = order;
        await OrderItemsModel.create({ order_id, product_id, product_count });
        return order;
    }
    async addOrderItem({ order_id, product_id, product_count }) {
        return await OrderItemsModel.create({ order_id, product_id, product_count });
    }
    async deleteOrderItem({ id }) {
        await OrderItemsModel.deleteOrderItem({ id });
    }
    async deleteOrder({ id }) {
        await Order.destroy({ where: { id } });
        return id;
    }
    async getOrderItemsInfo({ order_id }) {
        const query = `
            select 
                order_items.order_id, 
                order_items.product_count, 
                order_items.id, 
                products.id as product_id, 
                products.name, 
                products.image,
                products.price 
            from order_items join products
            on order_items.product_id = products.id and order_items.order_id = ${order_id}
        `;
        const orderItemsInfo = await sequelizeInstance.query(query);
        return orderItemsInfo[0];
    }
}
export default new OrderModels();
