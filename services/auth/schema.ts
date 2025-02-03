import gql from "graphql-tag"

export const schema = gql`
    extend schema
        @link(
            url: "https://specs.apollo.dev/federation/v2.9"
            import: ["@key", "@shareable", "@external"]
        )

        type Query {
            validate(jwt_token: String!): VefifiedUser
        }
        

        type Mutation {
            signIn(username: String!, password: String!): Token
            signUp(username: String!, password: String!): Token
        }
     
        type User {
            id: ID
            username: String,
            password: String,
            jwt_token: String
        },

        type VefifiedUser {
            id: ID!,
            username: String!,
        }

        type Token {
            jwt_token: String!
        }

`