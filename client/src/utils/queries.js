import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
    query AllUsers {
        allUsers {
            _id
            userName
            email
            reliabilityRating
        }
    }
`;

export const QUERY_USER = gql`
    query GetUser($userId: ID!) {
        user(userId: $userId) {
            _id
            userName
            email
            reliabilityRating
        }
    }
`;

export const QUERY_GAMES = gql`
    query GetAllGames {
        games {
            _id
            title
            location
            description
            maxPlayers
            players {
                _id
            }
        }
    }
`;

export const QUERY_GAME = gql`
    query GetGame($gameId: ID!) {
        game(gameId: $gameId) {
            _id
            title
            location
            description
            maxPlayers
            players {
                _id
            }
        }
    }
`;