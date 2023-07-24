import { gql } from '@apollo/client';

export const QUERY_USERS = gql`
  query users {
    users {
      _id
      username
      email
      requests {
        _id
        userId
        gameId
        status
        role
        class
      }
    }
  }
`;

export const QUERY_USER = gql`
  query user($userId: ID!) {
    user(id: $userId) {
      _id
      username
      email
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
      date
      maxPlayers
      players {
        _id
      }
      requests {
        _id
      }
      slots
    }
  }
`;

export const QUERY_GAME = gql`
  query game($gameId: ID!) {
    game(id: $gameId) {
      _id
      title
      location
      description
      date
      maxPlayers
      players {
        _id
        username
      }
      requests {
        _id
        userId {
          _id
          username
        }
        role
        class
        status
      }
      slots
    }
  }
`;

export const QUERY_REQUESTS = gql`
  query requests {
    requests {
      _id
      userId
      gameId
      status
      role
      class
    }
  }
`;

export const QUERY_REQUEST = gql`
  query request($id: ID!) {
    request(id: $id) {
      _id
      userId
      gameId
      status
      role
      class
    }
  }
`;