const { gql } = require("apollo-server-express");

const typeDefs = gql`
    type User {
        id: Int!
        login: String!
    }

    type Dao {
        id: Int!
        name: String!
        treasury: String
        activeMembers: Int
    }

    type Query {
        current: User
        daos(id: Int!): Dao
        daoName(name: String!): [Dao]
    }

    type Mutation {
        register(login: String!, password: String!): String
        login(login: String!, password: String!): String
    }
`;

module.exports = typeDefs;