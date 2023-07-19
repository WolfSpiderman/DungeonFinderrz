import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import AuthService from '../utils/auth';
import { LOGIN_USER } from '../utils/mutations';
import '../styles/Login.css'; 


function Login() {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async event => {
    // this part my change based on the mutations we created. 
    // This is a generic template to handle the mutations
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      AuthService.login(data.login.token);
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
    <div className="login-container">
      <form onSubmit={handleFormSubmit}>
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
        <input type="submit" value="Login" />
      </form>
      {error && <div>Login failed</div>}
    </div>
  );
}

export default Login;