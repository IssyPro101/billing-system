import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const LoginPage = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
        axios
        .post('http://localhost:3001/api/create', {
            email,
            password
        })
        .then((response) => {
            console.log(response.data.user)
            localStorage.setItem('user', response.data.user.id);
            setUser(response.data.user.id.toString());
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="login-page">
      <form className="login-form" onSubmit={handleFormSubmit}>
        <h2>Login or Sign Up</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={handleEmailChange}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LoginPage;
