import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const LoginPage = ({setUser}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [actionMessage, setActionMessage] = useState(null)

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        // Send request to login or signup
        const response = await axios.post('http://localhost:3001/api/create', {
            email,
            password
        })
        localStorage.setItem('user', response.data.user.id);
        setUser(response.data.user.id.toString());
      } catch (error) {
        console.error(error)
        displayMessage(error.response.data.error, "red")
      }

    }
  };

  const displayMessage = (text, color) => {
    setActionMessage({
      text: text,
      color: color
    })
    setTimeout(() => {
      setActionMessage(null)
    }, 750)
  }

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
        {actionMessage && <p className="message" style={{color: actionMessage.color}}>{actionMessage.text}</p>}
      </form>
    </div>
  );
};

export default LoginPage;
