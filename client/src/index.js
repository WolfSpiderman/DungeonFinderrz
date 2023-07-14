import React from 'react';
import ReactDOM from 'react-dom';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom"
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import './index.css';
import Root from './pages/Root';
import ErrorPage from './pages/ErrorPage';
import Home from './pages/Home';
import GameList from './pages/GameList';
import Profile from './pages/Profile';

const client = new ApolloClient({
  uri: '/graphql',
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
            element: <Home />
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