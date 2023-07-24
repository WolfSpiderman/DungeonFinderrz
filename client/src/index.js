import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ApolloClient, ApolloProvider, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import './index.css';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home, { loader as homeLoader } from './pages/Home';
import GameList from './pages/GameList';
import Profile from './pages/Profile';
import GamePage from './pages/GamePage';
import Auth from './utils/auth';

const httpLink = createHttpLink({
  uri: '/graphql',
});

const authLink = setContext((_, { headers }) => {
  const token = Auth.getToken();
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        errorElement: <ErrorPage />,
        children: [
          { 
            index: true, 
            element: <Home />,
            loader: homeLoader,
          },
          {
            path: "games",
            element: <GameList />
          },
          {
            path: "games/:gameId",
            element: <GamePage />,
          },
          {
            path: "profile",
            element: <Profile />
          },
        ],
      },
    ],
  },
]);

ReactDOM
  .render(
    <React.StrictMode>
      <ApolloProvider client={client}>
        <RouterProvider router={router} />
      </ApolloProvider>
    </React.StrictMode>,
    document.getElementById('root')
  );