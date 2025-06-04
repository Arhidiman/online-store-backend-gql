import { sequelizeInstance } from '../db/sequelizeInstance.js'

// Импорты фабрик
import { Product as ProductFactory } from './ProductsModel/Product.js'
import { Category as CategoryFactory } from './CateroriesModel/Category.js'
import { DeliveryData as DeliveryDataFactory } from './DeliveryDataModel/DeliveryData.js'
import { OrderItems as OrderItemsFactory } from './OrderItemsModel/OrderItems.js'
import { Order as OrderFactory } from './OrdersModel/Order.js'
import { Transaction as TransactionFactory } from './TransactionsModel/Transaction.js'
import { User as UserFactory } from './UserModel/User.js'

// Инициализация моделей
export const User = UserFactory(sequelizeInstance)
export const Product = ProductFactory(sequelizeInstance)
export const Category = CategoryFactory(sequelizeInstance)
export const Order = OrderFactory(sequelizeInstance)
export const OrderItems = OrderItemsFactory(sequelizeInstance)
export const Transaction = TransactionFactory(sequelizeInstance)
export const DeliveryData = DeliveryDataFactory(sequelizeInstance)
