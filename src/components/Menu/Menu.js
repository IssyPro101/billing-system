import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react';

const Menu = ({ user }) => {
  const [menuItems, setMenuItems] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [funds, setFunds] = useState(null);
  const [discount, setDiscount] = useState(null);
  const [pointsPerOrder, setPointsPerOrder] = useState(null);
  const [actionMessage, setActionMessage] = useState(null)

  const navigate = useNavigate();

  const getUserInfo = useCallback(async () => {
    try {
      const userFunds = await axios.get(`http://localhost:3001/api/funds/${user}`)
      const discount = await axios.get(`http://localhost:3001/api/discount/${user}`)
      setFunds(userFunds.data.funds);
      setDiscount(discount.data.discount);
    } catch (error) {
      console.error(error)
    }
  }, [user]);

  useEffect(() => {

    if (user) {
      getUserInfo();
    }

  }, [user, getUserInfo]);

  useEffect(() => {
    const getData = async () => {
      try {
        const items = await axios.get('http://localhost:3001/api/menu/items');
        const points = await axios.get('http://localhost:3001/api/order/points');
        console.log(items.data.items)
        setMenuItems(items.data.items);

        setPointsPerOrder(points.data.points);
      } catch (error) {
        console.error(error)
      }
    }
    getData();
  }, []);

  const handleBuy = (item) => {
    setSelectedItem(item);
  };

  const displayMessage = (text, itemName) => {
    setActionMessage({
      text: text,
      itemName: itemName
    })
    setTimeout(() => {
      setActionMessage(null)
    }, 750)
  }

  const handleConfirmPurchase = async () => {
    // Deduct item price from funds
    try {
      await axios.post(
        'http://localhost:3001/api/order/create',
        {
          userId: user,
          item: selectedItem
        }
      );
      getUserInfo();
      displayMessage("Purchase successful!", selectedItem.name)

    } catch (error) {
      displayMessage(error.response.data.error, selectedItem.name)
      console.error(error)
    }

    setSelectedItem(null); // Clear selected item and close the modal

  };

  const handleCloseModal = () => {
    setSelectedItem(null); // Clear selected item and close the modal
  };

  return (
    <div>
      <h2 className="heading">Drinks</h2>
      <div className="menu-container">
        {menuItems && menuItems["drinks"].map((item, key) => {
          console.log(item)
          return (
            <div key={key} className="menu-item">
              <div className="item-name">{item.name}</div>
              <div className="item-description">{item.description}</div>
              <div className="item-price">${item.price}</div>
              {user ? <button className="buy-button" onClick={() => handleBuy(item)} disabled={actionMessage || funds < item.price ? true : false} style={{ backgroundColor: actionMessage || funds < item.price ? "#93c7ff" : "#007bff" }}>
                {(actionMessage && item.name === actionMessage.itemName) && actionMessage.text}
                {!(actionMessage && item.name === actionMessage.itemName) && funds >= item.price && "Buy"}
                {!(actionMessage && item.name === actionMessage.itemName) && funds < item.price && "Insufficient funds"}
              </button> : <button className="buy-button" onClick={() => navigate("/profile")}>
                Login to Buy
              </button>}
            </div>)
        })}
      </div>
      <h2 className="heading">Food</h2>
      <div className="menu-container">
        {menuItems && menuItems["food"].map((item, key) => {
            console.log(item)
            return (
              <div key={key} className="menu-item">
                <div className="item-name">{item.name}</div>
                <div className="item-description">{item.description}</div>
                <div className="item-price">${item.price}</div>
                {user ? <button className="buy-button" onClick={() => handleBuy(item)} disabled={actionMessage || funds < item.price ? true : false} style={{ backgroundColor: actionMessage || funds < item.price ? "#93c7ff" : "#007bff" }}>
                  {(actionMessage && item.name === actionMessage.itemName) && actionMessage.text}
                  {!(actionMessage && item.name === actionMessage.itemName) && funds >= item.price && "Buy"}
                  {!(actionMessage && item.name === actionMessage.itemName) && funds < item.price && "Insufficient funds"}
                </button> : <button className="buy-button" onClick={() => navigate("/profile")}>
                  Login to Buy
                </button>}
              </div>)
          })}
      </div>
      <h2 className="heading">Dessert</h2>
      <div className="menu-container">
        {menuItems && menuItems["dessert"].map((item, key) => {
            console.log(item)
            return (
              <div key={key} className="menu-item">
                <div className="item-name">{item.name}</div>
                <div className="item-description">{item.description}</div>
                <div className="item-price">${item.price}</div>
                {user ? <button className="buy-button" onClick={() => handleBuy(item)} disabled={actionMessage || funds < item.price ? true : false} style={{ backgroundColor: actionMessage || funds < item.price ? "#93c7ff" : "#007bff" }}>
                  {(actionMessage && item.name === actionMessage.itemName) && actionMessage.text}
                  {!(actionMessage && item.name === actionMessage.itemName) && funds >= item.price && "Buy"}
                  {!(actionMessage && item.name === actionMessage.itemName) && funds < item.price && "Insufficient funds"}
                </button> : <button className="buy-button" onClick={() => navigate("/profile")}>
                  Login to Buy
                </button>}
              </div>)
          })}
      </div>



      {
        selectedItem && (
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
                {discount && discount > 0 ? <div className="item-price"><s>${selectedItem.price}</s></div> : <div className="item-price">${selectedItem.price}</div>}
                {discount > 0 && <div className="item-price">${(selectedItem.price - selectedItem.price * discount / 100)}</div>}
              </div>

              <div className="confirm-body">
                {discount > 0 && <p>
                  Discount: {discount}% off
                </p>}
                <p>
                  Current funds: ${funds.toFixed(2)}
                </p>
                <p>
                  Funds after purchase: ${(funds - (selectedItem.price - (discount && discount > 0 ? (selectedItem.price * discount / 100) : 0))).toFixed(2)}
                </p>
                <p>
                  You receive: {pointsPerOrder} points
                </p>
              </div>
              <div className="confirm-footer">
                {funds ? <button
                  className="confirm-button"
                  onClick={handleConfirmPurchase}
                >
                  Confirm Purchase
                </button> : <button
                  className="confirm-button"
                >
                  Loading Funds...
                </button>}
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default Menu;
