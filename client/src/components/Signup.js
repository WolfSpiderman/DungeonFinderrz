import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

function Signup() {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [signup, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async event => {
    event.preventDefault();
    try {
      const { data } = await signup({
        variables: { ...formState },
      });

      AuthService.login(data.addUser.token);
      const { token, user } = data.addUser;
      console.log(user);
      AuthService.login(token);
    } catch (e) {
      console.error(e);
    }
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div  className="signup-container">
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          name="username"
          onChange={handleChange}
          value={formState.username}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleChange}
          value={formState.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleChange}
          value={formState.password}
        />
        <input type="submit" value="Signup" />
      </form>
      {error && <div>Signup failed</div>}
    </div>
  );
}

export default Signup;