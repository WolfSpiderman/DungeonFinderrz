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
    reliabilityRating: Int
}
 
 type Game {
    _id: ID!
    location: String!
    description: String
    totalPlayers: Int!
    players: [Request]
    requests: [Request]
    date: String
 }

 type Request {
    _id: ID!
    player: String!
    role: String!
    approved: Boolean
    game:[Game]
    user:[User]
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
   addGame(title: String!): Game
   removeGame(_id: ID!): Game
   addRequest(userId: ID!, gameID: ID!): Request
   approveRequest(userId: ID!, gameId: ID!): Request
   denyRequest(userId: ID!, gameId: ID!): Request
   updateProfile: Auth
 }
`

module.exports = typeDefs;