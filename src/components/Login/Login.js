import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

/**
 * LoginPage component handles user login and signup functionality.
 *
 * @param {function} setUser - Function to set the user state.
 */
const LoginPage = ({ setUser }) => {
  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [actionMessage, setActionMessage] = useState(null);

  /**
   * Handles the change event for the email input field.
   *
   * @param {object} e - The event object.
   */
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  /**
   * Handles the change event for the password input field.
   *
   * @param {object} e - The event object.
   */
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  /**
   * Handles the form submission.
   *
   * @param {object} e - The event object.
   */
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        // Send request to login or signup
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/create`, {
          email,
          password
        });
        localStorage.setItem('user', response.data.user.id);
        setUser(response.data.user.id.toString());
      } catch (error) {
        console.error(error);
        displayMessage(error.response.data.error, "red");
      }
    }
  };

  /**
   * Displays an action message temporarily.
   *
   * @param {string} text - The message text to display.
   * @param {string} color - The color of the message.
   */
  const displayMessage = (text, color) => {
    setActionMessage({
      text: text,
      color: color
    });
    setTimeout(() => {
      setActionMessage(null);
    }, 750);
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
        {actionMessage && (
          <p className="message" style={{ color: actionMessage.color }}>
            {actionMessage.text}
          </p>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
