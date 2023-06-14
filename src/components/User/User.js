import React from 'react';
import './User.css';

const User = ({setUser}) => {
  const user = {
    fullName: 'John Doe',
    username: 'johndoe',
    email: 'johndoe@example.com',
    funds: '$1000',
    orderHistory: [
      { item: 'Item 1', date: '2023-06-01' },
      { item: 'Item 2', date: '2023-06-05' },
      { item: 'Item 3', date: '2023-06-10' },
    ],
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <h2>Profile</h2>
        <div className="user-info">
          <div>
            <strong>Full Name:</strong> {user.fullName}
          </div>
          <div>
            <strong>Username:</strong> {user.username}
          </div>
          <div>
            <strong>Email:</strong> {user.email}
          </div>
          <div>
            <strong>Funds:</strong> {user.funds}
          </div>
        </div>
        <h2>Order History</h2>
        <div className="order-history">
          {user.orderHistory.map((order, index) => (
            <div key={index} className="order-item">
              <div className="order-item-name">{order.item}</div>
              <div className="order-item-date">Order Date: {order.date}</div>
            </div>
          ))}
        </div>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default User;
