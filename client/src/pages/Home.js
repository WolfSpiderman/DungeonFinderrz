import React from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';

export default function Home() {
  return (
    <div>
      <h1>Dungeon Finderrz Home Page</h1>
      <Login />
      <Signup />
    </div>
  );
}