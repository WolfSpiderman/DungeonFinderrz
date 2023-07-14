import React, { useState } from 'react';
import AuthService from '../utils/auth';

function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });

  const handleFormSubmit = async event => {
    event.preventDefault();
    // We call the API here 
  };

  const handleChange = event => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={handleChange}
          value={formState.email}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          onChange={handleChange}
          value={formState.password}
        />
        <input type="submit" value="Login" />
      </form>
    </div>
  );
}

export default Login;

