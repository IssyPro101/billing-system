import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react';

/**
 * Menu component displays a list of menu items and allows users to make purchases.
 *
 * @param {object} user - User object containing user information.
 */
const Menu = ({ user }) => {
  // State variables
  const [selectedItem, setSelectedItem] = useState(null);
  const [actionMessage, setActionMessage] = useState(null);
  const [userFunds, setUserFunds] = useState(null);
  const [userPoints, setUserPoints] = useState(null);
  const [pointsPerOrder, setPointsPerOrder] = useState(null);
  const [menuItems, setMenuItems] = useState(null);
  const [requiredPoints, setRequiredPoints] = useState(null);
  const [discount, setDiscount] = useState(null);

  // Navigation hook
  const navigate = useNavigate();

  useEffect(() => {
    // Load menu items, points per order, and required points from the API
    const loadItems = async () => {
      const items = await axios.get(`${process.env.REACT_APP_API_URL}/api/menu/items`);
      const points = await axios.get(`${process.env.REACT_APP_API_URL}/api/order/points`);
      const requiredPoints = await axios.get(`${process.env.REACT_APP_API_URL}/api/requiredPoints`);

      setMenuItems(items.data.items);
      setPointsPerOrder(points.data.points);
      setRequiredPoints(requiredPoints.data.requiredPoints);
    };
    loadItems();
  }, []);

  const getUserInfo = useCallback(async () => {
    try {
      // Retrieve user funds and points from the API
      const userFunds = await axios.get(`${process.env.REACT_APP_API_URL}/api/funds/${user}`);
      const userPoints = await axios.get(`${process.env.REACT_APP_API_URL}/api/points/${user}`);

      setUserFunds(userFunds.data.funds);
      setUserPoints(userPoints.data.points);
    } catch (error) {
      console.error(error);
    }
  }, [user]);

  useEffect(() => {
    // Load user information if user is logged in
    if (user) {
      getUserInfo();
    }
  }, [user, getUserInfo]);

  /**
   * Handles the buy action for a selected item.
   *
   * @param {object} item - The selected item to be purchased.
   */
  const handleBuy = (item) => {
    setSelectedItem(item);
  };

  /**
   * Displays an action message temporarily.
   *
   * @param {string} text - The message text to display.
   * @param {string} itemName - The name of the item associated with the message.
   */
  const displayMessage = (text, itemName) => {
    setActionMessage({
      text: text,
      itemName: itemName
    });
    setTimeout(() => {
      setActionMessage(null);
    }, 750);
  };

  /**
   * Handles the confirmation of a purchase.
   */
  const handleConfirmPurchase = async () => {
    try {
      // Deduct item price from funds and create an order
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/order/create`,
        {
          userId: user,
          item: selectedItem,
          discount: discount
        }
      );
      getUserInfo();
      displayMessage("Purchase successful!", selectedItem.name);
    } catch (error) {
      displayMessage(error.response.data.error, selectedItem.name);
      console.error(error);
    }

    setSelectedItem(null); // Clear selected item and close the modal
    setDiscount(null);
  };

  /**
   * Closes the purchase confirmation modal.
   */
  const handleCloseModal = () => {
    setSelectedItem(null); // Clear selected item and close the modal
    setDiscount(null);
  };

  return (
    <div>
      <h2 className="heading">Drinks</h2>
      <div className="menu-container">
        {menuItems && menuItems["drinks"].map((item, key) => {
          return (
            <div key={key} className="menu-item">
              <div className="item-name">{item.name}</div>
              <div className="item-description">{item.description}</div>
              <div className="item-price">${item.price}</div>
              {user ? (
                <button
                  className="buy-button"
                  onClick={() => handleBuy(item)}
                  disabled={actionMessage || userFunds < item.price}
                  style={{ backgroundColor: actionMessage || userFunds < item.price ? "#93c7ff" : "#007bff" }}
                >
                  {(actionMessage && item.name === actionMessage.itemName) && actionMessage.text}
                  {!(actionMessage && item.name === actionMessage.itemName) && userFunds >= item.price && "Buy"}
                  {!(actionMessage && item.name === actionMessage.itemName) && userFunds < item.price && "Insufficient funds"}
                </button>
              ) : (
                <button className="buy-button" onClick={() => navigate("/profile")}>
                  Login to Buy
                </button>
              )}
            </div>
          );
        })}
      </div>
      <h2 className="heading">Food</h2>
      <div className="menu-container">
        {menuItems && menuItems["food"].map((item, key) => {
          return (
            <div key={key} className="menu-item">
              <div className="item-name">{item.name}</div>
              <div className="item-description">{item.description}</div>
              <div className="item-price">${item.price}</div>
              {user ? (
                <button
                  className="buy-button"
                  onClick={() => handleBuy(item)}
                  disabled={actionMessage || userFunds < item.price}
                  style={{ backgroundColor: actionMessage || userFunds < item.price ? "#93c7ff" : "#007bff" }}
                >
                  {(actionMessage && item.name === actionMessage.itemName) && actionMessage.text}
                  {!(actionMessage && item.name === actionMessage.itemName) && userFunds >= item.price && "Buy"}
                  {!(actionMessage && item.name === actionMessage.itemName) && userFunds < item.price && "Insufficient funds"}
                </button>
              ) : (
                <button className="buy-button" onClick={() => navigate("/profile")}>
                  Login to Buy
                </button>
              )}
            </div>
          );
        })}
      </div>
      <h2 className="heading">Dessert</h2>
      <div className="menu-container">
        {menuItems && menuItems["dessert"].map((item, key) => {
          return (
            <div key={key} className="menu-item">
              <div className="item-name">{item.name}</div>
              <div className="item-description">{item.description}</div>
              <div className="item-price">${item.price}</div>
              {user ? (
                <button
                  className="buy-button"
                  onClick={() => handleBuy(item)}
                  disabled={actionMessage || userFunds < item.price}
                  style={{ backgroundColor: actionMessage || userFunds < item.price ? "#93c7ff" : "#007bff" }}
                >
                  {(actionMessage && item.name === actionMessage.itemName) && actionMessage.text}
                  {!(actionMessage && item.name === actionMessage.itemName) && userFunds >= item.price && "Buy"}
                  {!(actionMessage && item.name === actionMessage.itemName) && userFunds < item.price && "Insufficient funds"}
                </button>
              ) : (
                <button className="buy-button" onClick={() => navigate("/profile")}>
                  Login to Buy
                </button>
              )}
            </div>
          );
        })}
      </div>

      {selectedItem && (
        <div className="confirm-overlay">
          <div className="confirm-content">
            <div className="confirm-header">
              <h3>Confirm Purchase</h3>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>

            <div style={{ margin: "0 auto", marginBottom: "20px" }} className="menu-item">
              <div className="item-name">{selectedItem.name}</div>
              <div className="item-description">{selectedItem.description}</div>
              {discount && discount > 0 ? (
                <div className="item-price"><s>${selectedItem.price}</s></div>
              ) : (
                <div className="item-price">${selectedItem.price}</div>
              )}
              {discount > 0 && <div className="item-price">${(selectedItem.price - selectedItem.price * discount / 100)}</div>}
            </div>

            <div className="confirm-body">
              {discount > 0 && <p>Discount: {discount}% off</p>}
              {userPoints >= 10 && (
                <button
                  className="discount-button"
                  style={{ backgroundColor: discount === 5 ? "#93c7ff" : "#007bff" }}
                  onClick={discount !== 5 ? () => setDiscount(5) : () => setDiscount(null)}
                >
                  {discount === 5 ? "5% discount applied." : "Apply 5% discount"}
                </button>
              )}
              {userPoints >= 20 && (
                <button
                  className="discount-button"
                  style={{ backgroundColor: discount === 10 ? "#93c7ff" : "#007bff" }}
                  onClick={discount !== 10 ? () => setDiscount(10) : () => setDiscount(null)}
                >
                  {discount === 10 ? "10% discount applied." : "Apply 10% discount"}
                </button>
              )}
              {userPoints >= 50 && (
                <button
                  className="discount-button"
                  style={{ backgroundColor: discount === 20 ? "#93c7ff" : "#007bff" }}
                  onClick={discount !== 20 ? () => setDiscount(20) : () => setDiscount(null)}
                >
                  {discount === 20 ? "20% discount applied." : "Apply 20% discount"}
                </button>
              )}
              <p>Current funds: ${userFunds.toFixed(2)}</p>
              <p>Funds after purchase: ${(userFunds - (selectedItem.price - (discount && discount > 0 ? (selectedItem.price * discount / 100) : 0))).toFixed(2)}</p>
              <p>Current points: {userPoints} points</p>
              <p>Points after purchase: {!discount ? userPoints + pointsPerOrder : userPoints - requiredPoints[discount]} points</p>
            </div>
            <div className="confirm-footer">
              {userFunds ? (
                <button className="confirm-button" onClick={handleConfirmPurchase}>
                  Confirm Purchase
                </button>
              ) : (
                <button className="confirm-button">
                  Loading Funds...
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
