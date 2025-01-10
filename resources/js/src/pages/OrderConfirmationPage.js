// OrderConfirmationPage.js

import React from 'react';

const OrderConfirmationPage = () => {
  // Sample order data, replace with actual data
  const order = {
    orderNumber: '123456789',
    items: [
      { id: 1, name: 'Product 1', price: 19.99, quantity: 2 },
      { id: 2, name: 'Product 2', price: 29.99, quantity: 1 },
      // Add more items as needed
    ],
    total: 79.97, // Total price of the order
    estimatedDelivery: 'December 25, 2023', // Replace with actual estimated delivery date
  };

  return (
    <div className="container">
      <h2>Order Confirmation</h2>

      <div className="alert alert-success" role="alert">
        Thank you for your order! Your order has been placed successfully.
      </div>

      <div className="mt-4">
        <h3>Order Details</h3>
        <p>
          Order Number: <strong>{order.orderNumber}</strong>
        </p>

        <h4>Items</h4>
        <ul className="list-group">
          {order.items.map((item) => (
            <li key={item.id} className="list-group-item">
              {item.name} - ${item.price.toFixed(2)} (Quantity: {item.quantity})
            </li>
          ))}
        </ul>

        <div className="mt-3">
          <p>
            <strong>Total:</strong> ${order.total.toFixed(2)}
          </p>
          <p>
            <strong>Estimated Delivery:</strong> {order.estimatedDelivery}
          </p>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
