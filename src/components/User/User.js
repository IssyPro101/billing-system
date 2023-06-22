import React, { useState } from 'react';
import './User.css';
import { useEffect, useCallback } from 'react';
import axios from "axios";

/**
 * User component displays user profile information and order history.
 *
 * @param {string} user - User ID.
 * @param {function} setUser - Function to set the user state.
 */
const User = ({ user, setUser }) => {
  // State variables
  const [userInfo, setUserInfo] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);

  /**
   * Requests user information from the API.
   */
  const requestUserInfo = useCallback(async () => {
    try {
      const userBase = await axios.get(`${process.env.REACT_APP_API_URL}/api/getFromId/${user}`);
      const userPoints = await axios.get(`${process.env.REACT_APP_API_URL}/api/points/${user}`);
      const userFunds = await axios.get(`${process.env.REACT_APP_API_URL}/api/funds/${user}`);
      const userOrders = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/${user}`);

      const userInfo = {
        email: userBase.data.user.email,
        funds: userFunds.data.funds,
        orderHistory: userOrders.data.userOrders,
        points: userPoints.data.points,
      };

      setUserInfo(userInfo);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    // Load user information if user is logged in
    if (user) {
      requestUserInfo();
    }
  }, [user, requestUserInfo]);

  /**
   * Handles the logout action.
   */
  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
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

  /**
   * Adds funds to the user's account.
   */
  const addFunds = async () => {
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/funds/${user}`, {
        funds: 100,
      });
      requestUserInfo();
      displayMessage(response.data.message, "green");
    } catch (error) {
      displayMessage(error.response.data.error, "red");
      console.error(error);
    }
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profile</h2>
        <div className="user-info">
          <div>
            <strong>Email:</strong> {userInfo && userInfo.email}
          </div>
          <div>
            <strong>Funds:</strong> ${userInfo && userInfo.funds.toFixed(2)}
          </div>
          <div>
            <strong>Points:</strong> {userInfo && userInfo.points}
          </div>
        </div>
        <h2>Order History</h2>
        <div className="order-history">
          {userInfo && (userInfo.orderHistory.length === 0 ? (
            <p>No order history found.</p>
          ) : (
            userInfo.orderHistory.map((order, index) => (
              <div key={index} className="order-item">
                {order.discount && (
                  <div className="order-item-discount">{`${order.discount}% discount applied.`}</div>
                )}
                <div className="order-item-name">{order.item.name}</div>
                <div className="order-item-price">${order.price}</div>
                <div className="order-item-date">Order Date: {new Date(order.date).toLocaleDateString()}</div>
              </div>
            ))
          ))}
        </div>
        <br />
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        &nbsp;
        <button className="logout-button" onClick={addFunds}>
          Add 100+ Funds
        </button>
        {actionMessage && (
          <p className="message" style={{ color: actionMessage.color }}>
            {actionMessage.text}
          </p>
        )}
      </div>
    </div>
  );
};

export default User;
