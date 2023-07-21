const { gql } = require('apollo-server-express');

const typeDefs = gql `
type Auth {
    token: ID!
    user: User
  }

type User {
    _id: ID!
    username: String!
    email: String!
    password: String!
    attendedGames: [Request]
#     reliabilityRating: Float
#     gameCount: Int
}
 
 type Game {
    _id: ID!
    title: String!
    location: String!
    description: String
    totalPlayers: Int!
    players: [Request]
    requests: [Request]
    date: String
    slots: Int
 }

 type Request {
    _id: ID!
    player: String!
    role: String!
    approved: Boolean
    gameId: ID!
    userId: ID!
    game: String!
 }

 type Query {
    users: [User]
    games: [Game]
    requests:[Request]
    user(id: ID!): User
    game(id: ID!): Game
    request(id: ID!): Request
 }

 type Mutation {
   addUser(username: String!, email: String!, password: String!): Auth
   login(email: String!, password: String!): Auth
   addGame(title: String!, location: String!, description: String, date: String!, totalPlayers: Int!): Game
   removeGame(_id: ID!): Game
   addRequest(userId: ID!, gameId: ID!, role: String!): Request
   approveRequest(requestId: ID!): Request
   denyRequest(requestId: ID!): Request
   updateProfile: Auth
 }
`

module.exports = typeDefs;