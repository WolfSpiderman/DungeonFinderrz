import { gql } from '@apollo/client';

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

export const ADD_REQUEST = gql`
  mutation addRequest($userId: ID!, $gameId: ID!, $role: String!) {
    addRequest(userId: $userId, gameId: $gameId, role: $role) {
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

export const APPROVE_REQUEST = gql`
  mutation approveRequest($requestId: ID!) {
    approveRequest(requestId: $requestId) {
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

export const DENY_REQUEST = gql`
  mutation denyRequest($requestId: ID!) {
    denyRequest(requestId: $requestId) {
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

export const ADD_GAME = gql`
  mutation addGame($title: String!, $location: String!, $description: String!, $date: String!, $totalPlayers: Int!) {
    addGame(title: $title, location: $location, description: $description, date: $date, totalPlayers: $totalPlayers) {
      _id
      title
      location
      description
      date
      totalPlayers
      slots
    }
  }
`;

export const REMOVE_GAME = gql`
  mutation removeGame($id: ID!) {
    removeGame(id: $id) {
      _id
      title
      location
      description
      date
      totalPlayers
      players
      requests
      slots
    }
  }
`;
