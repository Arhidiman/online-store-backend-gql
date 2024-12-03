import gql from "graphql-tag"

export const schema = gql`
    extend schema
        @link(
            url: "https://specs.apollo.dev/federation/v2.9"
            import: ["@key", "@shareable", "@external"]
        )

        type Query {
            auth: User
        }
     
        type User {
            id: ID!
            username: String,
            password: String,
        }

`