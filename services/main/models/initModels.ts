import { sequelizeInstance } from '../db/sequelizeInstance.ts'

// Импорты фабрик
import { Product as ProductFactory } from './ProductsModel/Product.ts'
import { Category as CategoryFactory } from './CateroriesModel/Category.ts'
import { DeliveryData as DeliveryDataFactory } from './DeliveryDataModel/DeliveryData.ts'
import { OrderItems as OrderItemsFactory } from './OrderItemsModel/OrderItems.ts'
import { Order as OrderFactory } from './OrdersModel/Order.ts'
import { Transaction as TransactionFactory } from './TransactionsModel/Transaction.ts'
import { User as UserFactory } from './UserModel/User.ts'

// Инициализация моделей
export const User = UserFactory(sequelizeInstance)
export const Product = ProductFactory(sequelizeInstance)
export const Category = CategoryFactory(sequelizeInstance)
export const Order = OrderFactory(sequelizeInstance)
export const OrderItems = OrderItemsFactory(sequelizeInstance)
export const Transaction = TransactionFactory(sequelizeInstance)
export const DeliveryData = DeliveryDataFactory(sequelizeInstance)
