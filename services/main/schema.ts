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
            sortedProducts(in_stock: Boolean, discount: Boolean, price: String, rating: String): [Product],
            getOrder(id: Int!): Order,
            createOrder(user_id: ID!, product_id: Int, product_count: Int!): Order,
            addOrderItem(order_id: Int!, product_id: Int!, product_count: Int!): OrderItem
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

`