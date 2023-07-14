const { gql } = require('apollo-server-express');

const typeDefs = gql `
type User {
    _id: ID
    userName: String
    email: String
    password: String
    attendedGames: [Game]
    reliabilityRating: Float
}
 
 type Game {
    _id: ID
    location: String
    description: String
    totalPlayers: Int
    players: Int
 }
`

module.exports = typeDefs;