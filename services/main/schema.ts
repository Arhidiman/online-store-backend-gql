import gql from "graphql-tag"

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
                    price: Int, 
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
            
        }

        type Mutation {
            createOrder(user_id: ID!, product_id: ID!, product_count: Int!): Order,
            addOrderItem(order_id: ID!, product_id: ID!, product_count: Int!): OrderItem
            deleteOrder(id: ID!): ID!
        }

        type Category {
            id: ID!
            name: String
        },

        type Product {
            id: ID!
            name: String,
            price: Int,
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
            products_count: ID,
            id: ID,
            name: String,
            image: String
        }

`