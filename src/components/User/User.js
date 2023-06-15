import React, { useState } from 'react';
import './User.css';
import { useEffect, useCallback } from 'react';
import axios from "axios";

const User = ({ user, setUser }) => {

  const [userInfo, setUserInfo] = useState(null);
  const [actionMessage, setActionMessage] = useState(null)


  const requestUserInfo = useCallback(async () => {
    try {

      const userBase = await axios.get(`http://localhost:3001/api/getFromId/${user}`)
      const userPoints = await axios.get(`http://localhost:3001/api/points/${user}`)
      const userFunds = await axios.get(`http://localhost:3001/api/funds/${user}`)
      const userDiscount = await axios.get(`http://localhost:3001/api/discount/${user}`)
      const userOrders = await axios.get(`http://localhost:3001/api/order/${user}`)

      console.log(userOrders.data.userOrders)

      const userInfo = {
        email: userBase.data.user.email,
        funds: userFunds.data.funds,
        orderHistory: userOrders.data.userOrders,
        points: userPoints.data.points,
        discount: userDiscount.data.discount
      };

      setUserInfo(userInfo)

    } catch (error) {
      console.error(error)
    }
  }, [user])

  useEffect(() => {
    if (user) {
      requestUserInfo();
    }

  }, [user, requestUserInfo])


  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  const displayMessage = (text, color) => {
    setActionMessage({
      text: text,
      color: color
    })
    setTimeout(() => {
      setActionMessage(null)
    }, 5000)
  }

  const addFunds = async () => {
    try {
      await axios.put(`http://localhost:3001/api/funds/${user}`, {
        "points": 100,
      })
      requestUserInfo()
      displayMessage("$100 funds added!", "green")

    } catch (error) {

      displayMessage(error.response.data.error, "red")
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
            <strong>Funds:</strong> ${userInfo && userInfo.funds}
          </div>
          <div>
            <strong>Points:</strong> {userInfo && userInfo.points}
          </div>
          <div>
            <strong>Discount:</strong> {userInfo && (userInfo.discount === 0 ? "Not eligible for discount." : `${userInfo.discount}% off every order.`)}
          </div>
        </div>
        <h2>Order History</h2>
        <div className="order-history">
          {userInfo && (userInfo.orderHistory.length === 0 ? <p>No order history found.</p> : userInfo.orderHistory.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-item-name">{order.item.name}</div>
              <div className="order-item-price">${order.item.price}</div>
              <div className="order-item-date">Order Date: {(new Date(order.date)).toLocaleDateString()}</div>
            </div>
          )))}
        </div>
        <br/>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
        &nbsp;
        <button className="logout-button" onClick={addFunds}>
          Add 100+ Funds
        </button>
        {actionMessage && <p className="message" style={{color: actionMessage.color}}>{actionMessage.text}</p>}
      </div>
    </div>
  );
};

export default User;
