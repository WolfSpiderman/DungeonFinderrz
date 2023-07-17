const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID!
    userName: String!
    email: String!
    password: String!
    attendedGames: [Request]
    reliabilityRating: Float
}
 
 type Game {
    _id: ID!
    location: String!
    description: String
    totalPlayers: Int!
    players: Int
 }

 type Request {
    _id: ID!
    player: String!
    role: String!
    approved: Boolean
    game:[Game]
 }

 type Query {
    users: [User]
    games: [Game]
    requests:[Request]
 }
`

module.exports = typeDefs;