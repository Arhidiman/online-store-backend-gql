import { gql } from "graphql-tag"

export const schema = gql`
    extend schema
        @link(
            url: "https://specs.apollo.dev/federation/v2.9"
            import: ["@key", "@shareable", "@external"]
        )

        type Query {
            categories: [Category]
            products: [Product],
            product(id: ID!): Product,
            sortedProducts(
                    price: Float, 
                    in_stock: Boolean, 
                    discount: Boolean, 
                    priceSort: String, 
                    ratingSort: String, 
                    showCount: Int,
                    category: ID
                ): [Product],
                
            getOrder(id: ID!): Order,
            getCurrentOrderByUserId(user_id: ID!): Order,
            orderItem(order_id: ID, product_id: ID!): OrderItem
            getOrderItemsInfo(order_id: ID!): [OrderItemInfo]
            getTransactionsItemsData(jwt_token: String!): [TransactionItemData]
            
        }

        type Mutation {
            createOrder(user_id: ID!, product_id: ID!, product_count: Int!): Order,
            addOrderItem(order_id: ID!, product_id: ID!, product_count: Int!): OrderItem
            deleteOrder(id: ID!): ID!
            deleteOrderItem(id: ID!): ID!
            createTransaction(
                order_id: ID!, 
                full_price: Float!, 
                order_items: [UpdatedOrderItem]!,
                city: String!,
                street: String!,
                building: String!
            ): Transaction
        }

        type Category {
            id: ID!
            name: String
        },

        type Product {
            id: ID!
            name: String,
            price: Float,
            image: String,
            discount: Float,
            in_stock: Int,
            rating: Int,
        },

        type Order {
            id: ID!,
            user_id: ID!
        }

        type OrderItem {
            id: ID!,
            order_id: ID!,
            product_id: ID!,
            product_count: Int!
        }

        type OrderItemInfo {
            order_id: ID,
            product_count: Int,
            id: ID,
            product_id: ID,
            name: String,
            image: String,
            price: Float
        }

        input UpdatedOrderItem {
            id: ID!, 
            product_count: Int!
        }

        type Transaction {
            id: ID!,
            order_id: ID!,
            full_price: Int!,
            timestamp: String!
        }

        type TransactionItemData {
            full_price: Float!,
            created_at: String!,
            city: String!,
            street: String!,
            building: String!
        }


`