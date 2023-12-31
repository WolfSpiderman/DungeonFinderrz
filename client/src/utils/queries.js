import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      requests {
        _id
        player
        role
        approved
        game
        gameId
        userId
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($id: ID!) {
    user(id: $id) {
      _id
      username
      email
      requests {
        _id
        player
        role
        approved
        game
        gameId
        userId
      }
    }
  }
`;

export const QUERY_GAMES = gql`
  query games {
    games {
      _id
      title
      location
      description
      totalPlayers
      players {
        _id
        player
        role
        approved
        gameId
        userId
        game
      }
      requests {
        _id
        player
        role
        approved
        gameId
        userId
        game
      }
      date
      slots
    }
  }
`;

export const QUERY_GAME = gql`
  query game($id: ID!) {
    game(id: $id) {
      _id
      title
      location
      description
      totalPlayers
      players {
        _id
        player
        role
        approved
        gameId
        userId
        game
      }
      requests {
        _id
        player
        role
        approved
        gameId
        userId
        game
      }
      date
      slots
    }
  }
`;

export const QUERY_REQUESTS = gql`
  query requests {
    requests {
      _id
      player
      role
      approved
      game
      gameId
      userId
    }
  }
`;

export const QUERY_REQUEST = gql`
  query request($id: ID!) {
    request(id: $id) {
      _id
      player
      role
      approved
      game
      gameId
      userId
    }
  }
`;

export const CHECK_REQUEST_EXISTS = gql`
  query CheckRequestExists($gameId: ID!, $userId: ID!) {
    checkRequestExists(gameId: $gameId, userId: $userId)
  }
`;