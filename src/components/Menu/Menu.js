import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './Menu.css';
import { useNavigate } from "react-router-dom";

const Menu = ({user}) => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [funds, setFunds] = useState(100);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://localhost:3001/api/menu/items')
      .then((response) => {
        setMenuItems(response.data.items);
      })
      .catch((error) => {
        console.log(error);
      });

      
      
  }, []);

  const handleBuy = (item) => {
    setSelectedItem(item);
  };

  const handleConfirmPurchase = (shippingAddress) => {
    // Process the purchase logic here
    console.log('Purchase confirmed:', selectedItem.name);
    console.log('Shipping Address:', shippingAddress);
    // Deduct item price from funds
    setFunds(funds - selectedItem.price);
    setSelectedItem(null); // Clear selected item and close the modal
  };

  const handleCloseModal = () => {
    setSelectedItem(null); // Clear selected item and close the modal
  };

  return (
    <div className="menu-container">
      {menuItems.map((item) => (
        <div key={item.id} className="menu-item">
          <div className="item-name">{item.name}</div>
          <div className="item-description">{item.description}</div>
          <div className="item-price">${item.price}</div>
          {user ? <button className="buy-button" onClick={() => handleBuy(item)}>
            Buy
          </button> : <button className="buy-button" onClick={() => navigate("/profile")}>
            Login to Buy
          </button>}

        </div>
      ))}

      {selectedItem && (
        <div className="confirm-overlay">
          <div className="confirm-content">
            <div className="confirm-header">
              <h3>Confirm Purchase</h3>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="confirm-body">
              <p>
                Current funds: ${funds}
              </p>
              <p>
                Funds after purchase: ${funds - selectedItem.price}
              </p>
              <label htmlFor="shipping-address">Shipping Address:</label>
              <input type="text" id="shipping-address" />
            </div>
            <div className="confirm-footer">
              <button
                className="confirm-button"
                onClick={() => handleConfirmPurchase(document.getElementById('shipping-address').value)}
              >
                Confirm Purchase
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Menu;
