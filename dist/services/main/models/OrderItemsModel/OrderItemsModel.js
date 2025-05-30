import { OrderItems } from "../initModels.js";
class OrderItemsModel {
    async create({ order_id, product_id, product_count }) {
        return await OrderItems.create({ order_id, product_id, product_count });
    }
    async findOne({ order_id, product_id }) {
        return await OrderItems.findOne({ where: { order_id, product_id } });
    }
    async deleteOrderItem({ id }) {
        await OrderItems.destroy({ where: { id } });
    }
}
export default new OrderItemsModel();
