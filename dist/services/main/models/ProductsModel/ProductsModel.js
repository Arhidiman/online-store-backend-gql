import { Product } from "../initModels.js";
import { Op } from "sequelize";
class ProductsModel {
    async findAll() {
        return await Product.findAll({ raw: true });
    }
    async findOne(id) {
        return await Product.findOne({ raw: true, where: { id } });
    }
    async sortedProducts({ price, in_stock, discount, priceSort, ratingSort, showCount, category }) {
        const price_filter = price ? { [Op.lt]: price } : { [Op.not]: null };
        const in_stock_filter = !in_stock ? { [Op.or]: { [Op.is]: null, [Op.gt]: 0 } } : { [Op.not]: null };
        const discount_filter = !discount ? { [Op.or]: { [Op.is]: null, [Op.gt]: 0 } } : { [Op.not]: null };
        const order = [];
        priceSort && order.push(['price', priceSort]);
        ratingSort && order.push(['rating', ratingSort]);
        return await Product.findAll({
            raw: true,
            where: {
                price: price_filter,
                in_stock: in_stock_filter,
                discount: discount_filter,
                category_id: category || { [Op.not]: null }
            },
            order: order,
            limit: showCount
        });
    }
}
export default new ProductsModel();
